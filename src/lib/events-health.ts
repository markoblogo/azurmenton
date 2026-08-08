import type { EventSource } from "@/content/event-sources";
import type { RivieraEvent } from "@/content/riviera-events";
import { addDaysToDateKey, getEventDateStatus } from "@/lib/events";

export type EventHealthState = "CURRENT" | "STALE" | "EXPIRED" | "SOURCE_STALE" | "NEEDS_REVIEW" | "UNKNOWN";
export type SourceHealthState = "HEALTHY" | "SOURCE_STALE" | "UNKNOWN";
export type EventHealthSource = Pick<EventSource, "id" | "name" | "city" | "expectedUpdateFrequency"> & Partial<Pick<EventSource, "baseUrl" | "sourceUrl">>;
export type SourceObservation = string | { lastObservedAt?: string; error?: string };

type HealthEvent = Pick<RivieraEvent, "id" | "slug" | "title" | "location" | "city" | "dateLabel" | "startDate" | "endDate" | "dateStatus" | "sourceStatus" | "sourceUrl" | "lastChecked" | "lastVerifiedAt"> & { sourceId?: string };

const SOURCE_MAX_AGE_DAYS: Record<EventSource["expectedUpdateFrequency"], number | undefined> = {
  daily: 7,
  weekly: 21,
  seasonal: 120,
  "manual-review": undefined,
};

const DEFAULT_EVENT_MAX_AGE_DAYS = 90;

function dateKey(value: string | undefined) {
  return value && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : undefined;
}

function daysBetween(from: string, to: string) {
  return Math.floor((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86_400_000);
}

function sourceMaxAgeDays(source?: EventHealthSource) {
  return source ? SOURCE_MAX_AGE_DAYS[source.expectedUpdateFrequency] : DEFAULT_EVENT_MAX_AGE_DAYS;
}

function eventEvidenceDate(event: HealthEvent) {
  return dateKey(event.lastVerifiedAt) ?? dateKey(event.lastChecked);
}

export function classifyEventHealth(
  event: HealthEvent,
  options: { today: string; source?: EventHealthSource; staleAfterDays?: number },
): { state: EventHealthState; evidenceDate?: string; ageDays?: number; reason: string } {
  const status = getEventDateStatus(event, new Date(`${options.today}T12:00:00Z`));
  if (status === "past") return { state: "EXPIRED", reason: "event end date is before the observation date" };
  if (status === "dates_pending" || status === "estimated_annual_window") {
    return { state: "NEEDS_REVIEW", reason: "event has no confirmed date window" };
  }
  if (event.sourceStatus !== "verified" || !event.sourceUrl) {
    return { state: "NEEDS_REVIEW", reason: "event provenance is not fully verified" };
  }

  const evidenceDate = eventEvidenceDate(event);
  if (!evidenceDate) return { state: "UNKNOWN", reason: "no event observation or verification date is recorded" };
  const ageDays = daysBetween(evidenceDate, options.today);
  const staleAfterDays = options.staleAfterDays ?? sourceMaxAgeDays(options.source) ?? DEFAULT_EVENT_MAX_AGE_DAYS;
  if (ageDays > staleAfterDays) {
    return { state: "STALE", evidenceDate, ageDays, reason: `event evidence is ${ageDays} days old; threshold is ${staleAfterDays}` };
  }
  return { state: "CURRENT", evidenceDate, ageDays, reason: "confirmed event has recent source evidence" };
}

function sourceMatchesEvent(event: HealthEvent, source: EventHealthSource) {
  if (event.sourceId) return event.sourceId === source.id;
  if (event.sourceUrl && (source.baseUrl || source.sourceUrl)) {
    try {
      const eventHost = new URL(event.sourceUrl).host;
      return [source.baseUrl, source.sourceUrl].filter(Boolean).some((url) => new URL(url!).host === eventHost);
    } catch {
      return false;
    }
  }
  return event.city?.toLowerCase() === source.city.toLowerCase();
}

function normalizeObservation(value: SourceObservation | undefined) {
  const raw = typeof value === "string" ? value : value?.lastObservedAt;
  return dateKey(raw) ?? (raw && /^\d{4}-\d{2}-\d{2}T/.test(raw) ? raw.slice(0, 10) : undefined);
}

function sourceHealth(source: EventHealthSource, observation: SourceObservation | undefined, today: string) {
  const lastObservedAt = normalizeObservation(observation);
  const maxAgeDays = sourceMaxAgeDays(source);
  if (!lastObservedAt || maxAgeDays === undefined) return { state: "UNKNOWN" as const, lastObservedAt, ageDays: undefined };
  const ageDays = daysBetween(lastObservedAt, today);
  return { state: ageDays > maxAgeDays ? "SOURCE_STALE" as const : "HEALTHY" as const, lastObservedAt, ageDays };
}

function cityKey(event: HealthEvent) {
  const value = `${event.city ?? ""} ${event.location}`.toLowerCase();
  if (value.includes("menton")) return "menton";
  if (value.includes("monaco") || value.includes("monte-carlo")) return "monaco";
  if (value.includes("nice")) return "nice";
  if (value.includes("ventimiglia")) return "ventimiglia";
  if (value.includes("sanremo") || value.includes("san remo")) return "sanremo";
  return "unknown";
}

function overlaps(event: HealthEvent, from: string, to: string) {
  if (!event.startDate || getEventDateStatus(event, new Date(`${from}T12:00:00Z`)) === "dates_pending") return false;
  return event.startDate <= to && (event.endDate ?? event.startDate) >= from;
}

export function buildEventHealthReport(
  events: HealthEvent[],
  sources: EventHealthSource[],
  options: { today: string; observations: Record<string, SourceObservation | undefined>; generatedAt?: string },
) {
  const eventHealth = events.map((event) => ({
    id: event.id,
    slug: event.slug,
    title: event.title,
    city: cityKey(event),
    state: classifyEventHealth(event, { today: options.today, source: sources.find((source) => sourceMatchesEvent(event, source)) }),
  }));

  const sourceReports = sources.map((source) => {
    const matched = events.filter((event) => sourceMatchesEvent(event, source));
    const health = sourceHealth(source, options.observations[source.id], options.today);
    const future = matched.filter((event) => ["upcoming", "current", "dates_pending", "estimated_annual_window"].includes(getEventDateStatus(event, new Date(`${options.today}T12:00:00Z`))));
    const datedFuture = future.filter((event) => event.startDate);
    return {
      id: source.id,
      name: source.name,
      geography: source.city,
      state: health.state,
      lastObservation: health.lastObservedAt,
      observationAgeDays: health.ageDays,
      newestDiscoveredEventDate: datedFuture.map((event) => event.startDate!).sort().at(-1),
      futureEventCount: future.length,
      parsingError: typeof options.observations[source.id] === "object" ? (options.observations[source.id] as { error?: string } | undefined)?.error : undefined,
      coverageConclusion: future.length ? "EVIDENCE_OF_COVERAGE" : "NO_EVIDENCE_OF_FAILURE",
    };
  });

  const windows = { TODAY: 0, TOMORROW: 1, NEXT_7_DAYS: 6, NEXT_30_DAYS: 29 } as const;
  const coverage = Object.fromEntries(Object.entries(windows).map(([name, endOffset]) => {
    const from = addDaysToDateKey(options.today, name === "TOMORROW" ? 1 : 0);
    const to = addDaysToDateKey(from, name === "TOMORROW" ? 0 : endOffset);
    const selected = events.filter((event) => overlaps(event, from, to));
    const byCity = Object.fromEntries(["menton", "monaco", "nice", "ventimiglia", "sanremo"].map((city) => [city, selected.filter((event) => cityKey(event) === city).length]));
    return [name, { from, to, total: selected.length, byCity }];
  }));

  return {
    schemaVersion: "v1",
    generatedAt: options.generatedAt ?? new Date().toISOString(),
    observedDate: options.today,
    mode: "REPORT_ONLY",
    eventHealth,
    sources: sourceReports,
    coverage,
    summary: {
      eventCounts: Object.fromEntries(["CURRENT", "STALE", "EXPIRED", "SOURCE_STALE", "NEEDS_REVIEW", "UNKNOWN"].map((state) => [state, eventHealth.filter((item) => item.state.state === state).length])),
      sourceCounts: Object.fromEntries(["HEALTHY", "SOURCE_STALE", "UNKNOWN"].map((state) => [state, sourceReports.filter((source) => source.state === state).length])),
      noEventsMeans: "NO_EVIDENCE_OF_FAILURE",
    },
  };
}

import { promises as fs } from "node:fs";
import path from "node:path";
import type { EventCategory, RivieraEvent } from "@/content/riviera-events";
import type { EventDiscoveryLocation } from "@/lib/event-discovery";
import type { ImportedEventCandidate } from "@/lib/events-ingestion/types";

export type EventEditorialScope = "menton-local" | "destination-worthy" | "borderline" | "exclude";
export type PreparedEventImageStatus = "approved-source" | "manual-approved" | "remote-reference" | "fallback" | "missing";

export type PreparedEventImage = {
  status: PreparedEventImageStatus;
  originalUrl?: string;
  localPath?: string;
  sourceName?: string;
  sourceUrl?: string;
  credit?: string;
  rightsNote?: string;
  width?: number;
  height?: number;
  mimeType?: string;
  alt: string;
};

export type LocalizedEventContent = {
  title: string;
  summary: string;
  editorialNote?: string;
  venueDisplayName?: string;
  imageAlt: string;
  seoTitle?: string;
  seoDescription?: string;
};

export type EventManualOverrides = {
  fields: string[];
  updatedAt: string;
  note?: string;
};

export type PreparedEvent = {
  id: string;
  slug: string;
  sourceId: string;
  sourceEventId?: string;
  sourceName: string;
  sourceUrl: string;
  bookingUrl?: string;
  titleOriginal: string;
  titleCanonical: string;
  location: EventDiscoveryLocation;
  venue?: string;
  address?: string;
  googleMapsUrl?: string;
  startDate: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  timezone: "Europe/Paris";
  category: EventCategory[];
  tags: string[];
  editorialScope: EventEditorialScope;
  relevanceReason: string;
  relevanceScore?: number;
  isFree?: boolean | null;
  isFamilyFriendly?: boolean | null;
  isIndoor?: boolean | null;
  isOutdoor?: boolean | null;
  isRainyDayOption?: boolean | null;
  bookingRecommended?: boolean | null;
  accessibilityConfirmed?: boolean | null;
  priceText?: string;
  image: PreparedEventImage;
  localized: Record<"en" | "fr" | "it" | "uk", LocalizedEventContent>;
  firstSeenAt: string;
  lastSeenAt: string;
  lastVerifiedAt: string;
  warnings: string[];
  manualOverrides?: EventManualOverrides;
  publicationState: "prepared" | "published" | "unchanged" | "updated" | "cancelled";
};

export type EventCandidateSummary = {
  id: string;
  title: string;
  location?: EventDiscoveryLocation;
  sourceUrl: string;
  reason: string;
};

export type EventBatch = {
  id: string;
  createdAt: string;
  sourceRuns: Array<{ sourceId: string; fetchedAt?: string; candidateCount: number }>;
  candidates: PreparedEvent[];
  borderline: EventCandidateSummary[];
  excluded: EventCandidateSummary[];
  duplicates: Array<{ id: string; duplicateOf: string; title: string }>;
  warnings: Array<{ id?: string; message: string }>;
  statistics: {
    prepared: Record<string, number>;
    borderline: Record<string, number>;
    excluded: number;
    duplicates: number;
    missingApprovedImage: number;
    requiresFactualVerification: number;
    alreadyPublishedUnchanged: number;
    publishedWithSourceUpdates: number;
    cancelled: number;
  };
};

export type PublishSelection = {
  all?: boolean;
  city?: EventDiscoveryLocation;
  ids?: string[];
  exclude?: string[];
  dryRun?: boolean;
};

export type PublishSummary = {
  batchId: string;
  dryRun: boolean;
  selected: number;
  created: string[];
  updated: string[];
  skipped: string[];
  filesToWrite: string[];
  warnings: string[];
};

const acceptedDestinationKeywords = /\b(festival|grand prix|exhibition|museum|concert|jazz|opera|marathon|race|championship|yacht|masters|carnival|national|fireworks|major|international)\b/i;
const localMentonKeywords = /\b(concert|music|market|exhibition|guided|visit|workshop|children|family|wine|food|book|theatre|church|sport|beach|outdoor|festival|local)\b/i;

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function shortHash(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  return hash.toString(36);
}

function countByLocation(events: Array<{ location?: string }>) {
  return events.reduce<Record<string, number>>((accumulator, event) => {
    const key = event.location ?? "unknown";
    accumulator[key] = (accumulator[key] ?? 0) + 1;
    return accumulator;
  }, {});
}

export function eventBatchId(date = new Date()) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

export function evaluateEventRelevance(candidate: Pick<ImportedEventCandidate, "title" | "city" | "venue" | "category" | "startDate">): {
  scope: EventEditorialScope;
  reason: string;
  score: number;
} {
  const city = candidate.city;
  const corpus = `${candidate.title} ${candidate.venue ?? ""} ${(candidate.category ?? []).join(" ")}`;
  if (city === "menton") {
    const score = localMentonKeywords.test(corpus) ? 82 : 64;
    return {
      scope: "menton-local",
      score,
      reason: localMentonKeywords.test(corpus)
        ? "Accepted for Menton because it is a local activity a visitor staying in Menton could reasonably use."
        : "Accepted for Menton because local convenience has a lower publication threshold than surrounding destinations.",
    };
  }

  if (city && ["monaco", "nice", "ventimiglia", "sanremo"].includes(city)) {
    if (acceptedDestinationKeywords.test(corpus)) {
      return {
        scope: "destination-worthy",
        score: 78,
        reason: `Accepted for ${city} because it appears substantial enough to justify a dedicated trip from Menton.`,
      };
    }
    return {
      scope: "borderline",
      score: 48,
      reason: `Borderline for ${city} because routine local events outside Menton need stronger tourist value before publication.`,
    };
  }

  return { scope: "exclude", score: 20, reason: "Excluded because the event location is missing or outside the supported visitor area." };
}

export function buildGoogleMapsUrl(input: { venue?: string; address?: string; city?: string }) {
  const query = [input.venue, input.address, input.city].filter(Boolean).join(", ");
  if (!input.venue && !input.address) return undefined;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function eventImage(candidate: ImportedEventCandidate, sourceName: string): PreparedEventImage {
  const raw = candidate.rawPayload as { imageUrl?: string } | undefined;
  if (raw?.imageUrl) {
    return {
      status: "remote-reference",
      originalUrl: raw.imageUrl,
      sourceName,
      sourceUrl: candidate.sourceUrl,
      rightsNote: "Remote source image retained for editorial review only; not published automatically.",
      alt: `${candidate.title} event image reference`,
    };
  }

  return {
    status: "fallback",
    localPath: "/images/events/menton-lemon-festival.jpg",
    rightsNote: "Azur Menton fallback image; replace manually when a specific approved event image is available.",
    alt: `${candidate.title} event fallback image`,
  };
}

function localizedContent(candidate: ImportedEventCandidate, editorialNote: string): PreparedEvent["localized"] {
  const summary = candidate.publicSummary ?? candidate.editorialSuggestion.summary;
  return {
    en: {
      title: candidate.publicTitle ?? candidate.title,
      summary,
      editorialNote: candidate.editorialNote ?? editorialNote,
      venueDisplayName: candidate.venue,
      imageAlt: `${candidate.title} event near Menton`,
      seoTitle: `${candidate.title} | Azur Menton events`,
      seoDescription: summary.slice(0, 155),
    },
    fr: {
      title: candidate.publicTitle ?? candidate.title,
      summary,
      editorialNote: candidate.editorialNote ?? editorialNote,
      venueDisplayName: candidate.venue,
      imageAlt: `${candidate.title} près de Menton`,
    },
    it: {
      title: candidate.publicTitle ?? candidate.title,
      summary,
      editorialNote: candidate.editorialNote ?? editorialNote,
      venueDisplayName: candidate.venue,
      imageAlt: `${candidate.title} vicino a Mentone`,
    },
    uk: {
      title: candidate.publicTitle ?? candidate.title,
      summary,
      editorialNote: candidate.editorialNote ?? editorialNote,
      venueDisplayName: candidate.venue,
      imageAlt: `${candidate.title} біля Ментона`,
    },
  };
}

function publishedLocation(location: EventDiscoveryLocation): RivieraEvent["location"] {
  if (location === "menton") return "Menton";
  if (location === "monaco") return "Monaco";
  if (location === "nice") return "Nice";
  if (location === "ventimiglia" || location === "sanremo") return "Italian Riviera";
  return "French Riviera";
}

function candidateSummary(candidate: ImportedEventCandidate, reason: string): EventCandidateSummary {
  return {
    id: candidate.id,
    title: candidate.title,
    location: candidate.city as EventDiscoveryLocation | undefined,
    sourceUrl: candidate.sourceUrl,
    reason,
  };
}

export function prepareEventBatch(input: {
  candidates: ImportedEventCandidate[];
  sourceRuns?: EventBatch["sourceRuns"];
  existingEvents?: RivieraEvent[];
  createdAt?: string;
  id?: string;
  sourceNames?: Record<string, string>;
}): EventBatch {
  const createdAt = input.createdAt ?? new Date().toISOString();
  const id = input.id ?? eventBatchId(new Date(createdAt));
  const existingByIdentity = new Set(
    (input.existingEvents ?? []).flatMap((event) => [
      event.sourceUrl ? `${event.sourceUrl}|${event.startDate ?? ""}` : undefined,
      `${event.slug}|${event.startDate ?? ""}`,
    ].filter(Boolean) as string[]),
  );
  const seen = new Map<string, ImportedEventCandidate>();
  const prepared: PreparedEvent[] = [];
  const borderline: EventCandidateSummary[] = [];
  const excluded: EventCandidateSummary[] = [];
  const duplicates: EventBatch["duplicates"] = [];
  const warnings: EventBatch["warnings"] = [];
  let alreadyPublishedUnchanged = 0;
  let publishedWithSourceUpdates = 0;
  let cancelled = 0;

  for (const candidate of input.candidates) {
    const dedupeKey = `${candidate.normalizedTitle}|${candidate.city ?? ""}|${candidate.venue ?? ""}|${candidate.startDate ?? ""}`;
    const first = seen.get(dedupeKey);
    if (first) {
      duplicates.push({ id: candidate.id, duplicateOf: first.id, title: candidate.title });
      continue;
    }
    seen.set(dedupeKey, candidate);

    if (candidate.reviewStatus === "duplicate") {
      duplicates.push({ id: candidate.id, duplicateOf: candidate.duplicateCandidates[0] ?? "unknown", title: candidate.title });
      continue;
    }
    if (candidate.reviewStatus === "cancelled") {
      cancelled += 1;
      excluded.push(candidateSummary(candidate, "Cancelled by source."));
      continue;
    }

    const relevance = evaluateEventRelevance(candidate);
    if (relevance.scope === "borderline") {
      borderline.push(candidateSummary(candidate, relevance.reason));
      continue;
    }
    if (relevance.scope === "exclude") {
      excluded.push(candidateSummary(candidate, relevance.reason));
      continue;
    }

    const sourceName = input.sourceNames?.[candidate.sourceId] ?? candidate.sourceId;
    const slugBase = slugify(`${candidate.title}-${candidate.city ?? "riviera"}-${candidate.startDate ?? ""}`) || `event-${shortHash(candidate.id)}`;
    const existingKey = `${candidate.sourceUrl}|${candidate.startDate ?? ""}`;
    const publicationState = existingByIdentity.has(existingKey) ? "unchanged" : "prepared";
    if (publicationState === "unchanged") alreadyPublishedUnchanged += 1;
    if (candidate.materialChanges.length) publishedWithSourceUpdates += 1;

    if (!candidate.startDate) warnings.push({ id: candidate.id, message: "Missing startDate; not prepared for publication." });
    if (!candidate.sourceUrl.startsWith("https://")) warnings.push({ id: candidate.id, message: "Source URL should be HTTPS before publication." });

    if (!candidate.startDate) {
      excluded.push(candidateSummary(candidate, "Missing required event date."));
      continue;
    }

    const image = eventImage(candidate, sourceName);
    const editorialNote = candidate.editorialNote ?? relevance.reason;
    prepared.push({
      id: `${slugBase}-${shortHash(candidate.id)}`,
      slug: slugBase,
      sourceId: candidate.sourceId,
      sourceEventId: candidate.sourceEventId,
      sourceName,
      sourceUrl: candidate.sourceUrl,
      titleOriginal: candidate.rawTitle,
      titleCanonical: candidate.publicTitle ?? candidate.title,
      location: (candidate.city ?? "menton") as EventDiscoveryLocation,
      venue: candidate.venue,
      googleMapsUrl: buildGoogleMapsUrl({ venue: candidate.venue, city: candidate.city }),
      startDate: candidate.startDate,
      endDate: candidate.endDate,
      timezone: candidate.timezone,
      category: candidate.category ?? ["seasonal"],
      tags: candidate.editorialSuggestion.suggestedTags,
      editorialScope: relevance.scope,
      relevanceReason: relevance.reason,
      relevanceScore: relevance.score,
      isFamilyFriendly: candidate.editorialSuggestion.suitability.familyFriendly,
      isIndoor: candidate.editorialSuggestion.suitability.indoor,
      isOutdoor: candidate.editorialSuggestion.suitability.outdoor,
      isRainyDayOption: candidate.editorialSuggestion.suitability.rainyDayOption,
      bookingRecommended: candidate.editorialSuggestion.suitability.bookingRecommended,
      accessibilityConfirmed: null,
      image,
      localized: localizedContent(candidate, editorialNote),
      firstSeenAt: candidate.firstSeenAt,
      lastSeenAt: candidate.lastSeenAt,
      lastVerifiedAt: candidate.lastVerifiedAt.slice(0, 10),
      warnings: [...candidate.editorialSuggestion.warnings, ...(image.status === "remote-reference" ? ["Remote image requires manual rights approval before use."] : [])],
      publicationState,
    });
  }

  return {
    id,
    createdAt,
    sourceRuns: input.sourceRuns ?? [],
    candidates: prepared,
    borderline,
    excluded,
    duplicates,
    warnings,
    statistics: {
      prepared: countByLocation(prepared),
      borderline: countByLocation(borderline),
      excluded: excluded.length,
      duplicates: duplicates.length,
      missingApprovedImage: prepared.filter((event) => event.image.status !== "approved-source" && event.image.status !== "manual-approved").length,
      requiresFactualVerification: prepared.filter((event) => event.warnings.length > 0).length,
      alreadyPublishedUnchanged,
      publishedWithSourceUpdates,
      cancelled,
    },
  };
}

export function eventBatchReportMarkdown(batch: EventBatch) {
  const lines = [
    `# Event batch ${batch.id}`,
    "",
    `Created: ${batch.createdAt}`,
    "",
    "## Summary",
    "",
    `Prepared for publication: ${batch.candidates.length}`,
    `Borderline: ${batch.borderline.length}`,
    `Excluded: ${batch.excluded.length}`,
    `Probable duplicates: ${batch.duplicates.length}`,
    `Missing approved image: ${batch.statistics.missingApprovedImage}`,
    `Requires factual verification: ${batch.statistics.requiresFactualVerification}`,
    "",
    "## Prepared",
    "",
    ...batch.candidates.flatMap((event, index) => [
      `${index + 1}. [${event.location}] ${event.titleCanonical}`,
      `   Date: ${event.startDate}${event.endDate ? `-${event.endDate}` : ""}`,
      `   Venue: ${event.venue ?? "unknown"}`,
      `   Scope: ${event.editorialScope}`,
      `   Image: ${event.image.status}`,
      `   Source: ${event.sourceUrl}`,
      `   Warnings: ${event.warnings.length ? event.warnings.join("; ") : "none"}`,
    ]),
    "",
    "## Borderline",
    "",
    ...batch.borderline.map((event) => `- [${event.location ?? "unknown"}] ${event.title}: ${event.reason}`),
    "",
    "## Excluded",
    "",
    ...batch.excluded.slice(0, 50).map((event) => `- [${event.location ?? "unknown"}] ${event.title}: ${event.reason}`),
  ];
  return `${lines.join("\n")}\n`;
}

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(filePath, "utf8")) as T;
  } catch {
    return fallback;
  }
}

async function writeJsonFile(filePath: string, value: unknown) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

export function eventsContentRoot(rootDir = process.cwd()) {
  return path.join(rootDir, "src", "content", "events");
}

export async function writePreparedBatch(batch: EventBatch, rootDir = process.cwd()) {
  const batchDir = path.join(eventsContentRoot(rootDir), "batches", batch.id);
  await writeJsonFile(path.join(batchDir, "batch.json"), batch);
  await fs.writeFile(path.join(batchDir, "report.md"), eventBatchReportMarkdown(batch), "utf8");
  return {
    batchDir,
    jsonPath: path.join(batchDir, "batch.json"),
    reportPath: path.join(batchDir, "report.md"),
  };
}

export async function readPreparedBatch(batchId: string, rootDir = process.cwd()) {
  return readJsonFile<EventBatch | null>(path.join(eventsContentRoot(rootDir), "batches", batchId, "batch.json"), null);
}

export function preparedEventToPublishedRecord(event: PreparedEvent): RivieraEvent {
  const title = event.localized.en.title;
  const summary = event.localized.en.summary;
  const note = event.localized.en.editorialNote ?? event.relevanceReason;
  return {
    id: event.id,
    slug: event.slug,
    title,
    titleLocalized: {
      en: event.localized.en.title,
      fr: event.localized.fr.title,
      it: event.localized.it.title,
      uk: event.localized.uk.title,
    },
    location: publishedLocation(event.location),
    city: event.location === "all" ? undefined : event.location,
    monthGroup: event.startDate.slice(0, 7),
    dateLabel: event.endDate ? `${event.startDate}-${event.endDate}` : event.startDate,
    dateLabelLocalized: {
      en: event.endDate ? `${event.startDate}-${event.endDate}` : event.startDate,
      fr: event.endDate ? `${event.startDate}-${event.endDate}` : event.startDate,
      it: event.endDate ? `${event.startDate}-${event.endDate}` : event.startDate,
      uk: event.endDate ? `${event.startDate}-${event.endDate}` : event.startDate,
    },
    startDate: event.startDate,
    endDate: event.endDate,
    dateStatus: "confirmed",
    recurrence: "one_off",
    occurrenceYear: Number(event.startDate.slice(0, 4)),
    category: event.category,
    familySuitability: event.isFamilyFriendly ? "recommended_with_children" : "depends",
    audience: event.tags.length ? event.tags : ["visitors"],
    shortDescription: {
      en: summary,
      fr: event.localized.fr.summary,
      it: event.localized.it.summary,
      uk: event.localized.uk.summary,
    },
    whyShowOnSite: {
      en: note,
      fr: event.localized.fr.editorialNote ?? note,
      it: event.localized.it.editorialNote ?? note,
      uk: event.localized.uk.editorialNote ?? note,
    },
    bookingTip: {
      en: event.bookingRecommended ? "Check booking requirements on the official source before planning around this event." : "Check the official source close to travel before relying on final details.",
      fr: "Verifiez la source officielle pres du sejour avant de vous appuyer sur les details finaux.",
      it: "Controlla la fonte ufficiale vicino al viaggio prima di fare affidamento sui dettagli finali.",
      uk: "Перевіряйте офіційне джерело ближче до поїздки перед остаточним плануванням.",
    },
    sourceStatus: event.warnings.length ? "needs_verification" : "verified",
    sourceUrl: event.sourceUrl,
    ticketsUrl: event.bookingUrl,
    detailPage: true,
    searchIndexing: "standard",
    lastChecked: event.lastVerifiedAt,
    lastVerifiedAt: event.lastVerifiedAt,
    media: event.image.localPath
      ? {
          image: event.image.localPath,
          imageAlt: {
            en: event.localized.en.imageAlt,
            fr: event.localized.fr.imageAlt,
            it: event.localized.it.imageAlt,
            uk: event.localized.uk.imageAlt,
          },
          imageCaption: {
            en: event.image.rightsNote ?? "Azur Menton event image.",
            fr: event.image.rightsNote ?? "Image evenement Azur Menton.",
            it: event.image.rightsNote ?? "Immagine evento Azur Menton.",
            uk: event.image.rightsNote ?? "Зображення події Azur Menton.",
          },
          mediaType: "project_illustration",
          mediaStatus: event.image.status === "fallback" ? "needs_review" : "available",
        }
      : undefined,
  };
}

export async function publishEventBatch(input: { batch: EventBatch; rootDir?: string; selection?: PublishSelection; maxBatchAgeDays?: number }): Promise<PublishSummary> {
  const rootDir = input.rootDir ?? process.cwd();
  const selection = input.selection ?? {};
  const warnings: string[] = [];
  const batchAgeDays = Math.floor((Date.now() - new Date(input.batch.createdAt).getTime()) / 86_400_000);
  if (input.maxBatchAgeDays !== undefined && batchAgeDays > input.maxBatchAgeDays) warnings.push(`Batch is stale: ${batchAgeDays} days old.`);
  const hasExplicitSelection = selection.all || selection.city || selection.ids?.length;
  if (!hasExplicitSelection) {
    return {
      batchId: input.batch.id,
      dryRun: true,
      selected: 0,
      created: [],
      updated: [],
      skipped: input.batch.candidates.map((event) => event.id),
      filesToWrite: [],
      warnings: ["No explicit selection provided. Use --all, --city or --ids to publish."],
    };
  }

  const excluded = new Set(selection.exclude ?? []);
  const ids = new Set(selection.ids ?? []);
  const selectedEvents = input.batch.candidates.filter((event) => {
    if (excluded.has(event.id) || excluded.has(event.slug)) return false;
    if (selection.city && event.location !== selection.city) return false;
    if (ids.size && !ids.has(event.id) && !ids.has(event.slug)) return false;
    return selection.all || selection.city || ids.size > 0;
  });
  const publishedPath = path.join(eventsContentRoot(rootDir), "published", "events.json");
  const current = await readJsonFile<RivieraEvent[]>(publishedPath, []);
  const currentBySlug = new Map(current.map((event) => [event.slug, event]));
  const created: string[] = [];
  const updated: string[] = [];
  for (const event of selectedEvents) {
    const record = preparedEventToPublishedRecord(event);
    if (currentBySlug.has(record.slug)) updated.push(record.slug);
    else created.push(record.slug);
    currentBySlug.set(record.slug, { ...currentBySlug.get(record.slug), ...record });
  }
  const filesToWrite = [publishedPath];
  if (!selection.dryRun) {
    await writeJsonFile(publishedPath, [...currentBySlug.values()].sort((left, right) => left.slug.localeCompare(right.slug)));
  }
  return {
    batchId: input.batch.id,
    dryRun: Boolean(selection.dryRun),
    selected: selectedEvents.length,
    created,
    updated,
    skipped: input.batch.candidates.filter((event) => !selectedEvents.includes(event)).map((event) => event.id),
    filesToWrite,
    warnings,
  };
}

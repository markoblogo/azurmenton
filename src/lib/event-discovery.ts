import type { EventCategory, RivieraEvent } from "@/content/riviera-events";
import { eventOverlapsDateRange, getEventDateStatus, getParisDateRange, type EventPeriod } from "@/lib/events";

export type EventDiscoveryLocation = "all" | "menton" | "monaco" | "nice" | "ventimiglia" | "sanremo";
export type EventInterest =
  | "all"
  | "festivals"
  | "music"
  | "culture"
  | "family"
  | "markets"
  | "food-wine"
  | "sports"
  | "outdoors"
  | "nightlife"
  | "free"
  | "family-friendly"
  | "indoor"
  | "outdoor"
  | "rainy-day"
  | "booking-recommended";

export type EventDiscoveryFilters = {
  period: EventPeriod;
  from?: string;
  to?: string;
  location: EventDiscoveryLocation;
  interest: EventInterest;
  query: string;
};

export type RawEvent = {
  sourceId: string;
  sourceEventId?: string;
  title: string;
  sourceUrl: string;
  rawPayload?: unknown;
};

export type LocalEventCandidate = {
  sourceId: string;
  sourceEventId?: string;
  title: string;
  normalizedTitle: string;
  sourceUrl: string;
  city?: string;
  venue?: string;
  startDate?: string;
  endDate?: string;
  category?: EventCategory[];
  reviewRequired: boolean;
};

export interface EventAdapter {
  sourceId: string;
  fetch(): Promise<RawEvent[]>;
}

export interface EventNormalizer {
  normalize(raw: RawEvent): Promise<LocalEventCandidate>;
}

const validPeriods = new Set<EventPeriod>(["today", "tomorrow", "weekend", "next7", "next30", "custom"]);
const validLocations = new Set<EventDiscoveryLocation>(["all", "menton", "monaco", "nice", "ventimiglia", "sanremo"]);
const validInterests = new Set<EventInterest>([
  "all",
  "festivals",
  "music",
  "culture",
  "family",
  "markets",
  "food-wine",
  "sports",
  "outdoors",
  "nightlife",
  "free",
  "family-friendly",
  "indoor",
  "outdoor",
  "rainy-day",
  "booking-recommended",
]);

export function parseEventDiscoveryParams(params: URLSearchParams): EventDiscoveryFilters {
  const period = params.get("period") as EventPeriod | null;
  const location = params.get("location") as EventDiscoveryLocation | null;
  const interest = params.get("interest") as EventInterest | null;

  return {
    period: period && validPeriods.has(period) ? period : "next30",
    from: normalizedDateParam(params.get("from")),
    to: normalizedDateParam(params.get("to")),
    location: location && validLocations.has(location) ? location : "all",
    interest: interest && validInterests.has(interest) ? interest : "all",
    query: String(params.get("q") ?? "").trim().slice(0, 80),
  };
}

export function eventDiscoveryHref(basePath: string, filters: Partial<EventDiscoveryFilters>) {
  const params = new URLSearchParams();
  if (filters.period && filters.period !== "next30") params.set("period", filters.period);
  if (filters.from) params.set("from", filters.from);
  if (filters.to) params.set("to", filters.to);
  if (filters.location && filters.location !== "all") params.set("location", filters.location);
  if (filters.interest && filters.interest !== "all") params.set("interest", filters.interest);
  if (filters.query) params.set("q", filters.query);
  const query = params.toString();

  return query ? `${basePath}?${query}` : basePath;
}

function normalizedDateParam(value: string | null) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  return value;
}

function normalizedCity(event: Pick<RivieraEvent, "location" | "city">): EventDiscoveryLocation | null {
  const city = `${event.city ?? ""} ${event.location}`.toLowerCase();
  if (city.includes("menton")) return "menton";
  if (city.includes("monaco") || city.includes("monte-carlo")) return "monaco";
  if (city.includes("nice")) return "nice";
  if (city.includes("ventimiglia")) return "ventimiglia";
  if (city.includes("sanremo") || city.includes("san remo")) return "sanremo";
  return null;
}

function hasInterest(event: RivieraEvent, interest: EventInterest) {
  if (interest === "all") return true;
  const categories = new Set(event.category);
  const audience = event.audience.join(" ").toLowerCase();
  const corpus = `${event.title} ${event.shortDescription.en} ${event.whyShowOnSite.en} ${event.bookingTip.en} ${audience}`.toLowerCase();

  if (interest === "festivals") return event.recurrence === "annual" || categories.has("seasonal") || corpus.includes("festival") || corpus.includes("carnival");
  if (interest === "music") return categories.has("music") || categories.has("theatre") || corpus.includes("jazz") || corpus.includes("concert");
  if (interest === "culture") return categories.has("art") || categories.has("exhibition") || categories.has("theatre") || categories.has("food-local");
  if (interest === "family") return categories.has("family") || event.familySuitability === "recommended_with_children";
  if (interest === "markets") return corpus.includes("market") || corpus.includes("fair");
  if (interest === "food-wine") return categories.has("food-local") || corpus.includes("food") || corpus.includes("wine");
  if (interest === "sports") return categories.has("sport") || categories.has("prestige");
  if (interest === "outdoors") return categories.has("sport") || categories.has("maritime") || corpus.includes("outdoor") || corpus.includes("beach");
  if (interest === "nightlife") return categories.has("music") || categories.has("theatre") || corpus.includes("evening") || corpus.includes("night");
  if (interest === "free") return corpus.includes("free") || corpus.includes("gratuit");
  if (interest === "family-friendly") return event.familySuitability === "recommended_with_children" || event.familySuitability === "good_with_older_children";
  if (interest === "indoor") return categories.has("exhibition") || categories.has("theatre") || corpus.includes("indoor") || corpus.includes("museum");
  if (interest === "outdoor") return categories.has("sport") || categories.has("maritime") || corpus.includes("outdoor") || corpus.includes("beach");
  if (interest === "rainy-day") return categories.has("exhibition") || categories.has("theatre") || corpus.includes("indoor") || corpus.includes("museum");
  if (interest === "booking-recommended") return event.ticketsUrl !== undefined || corpus.includes("book") || corpus.includes("ticket");
  return false;
}

function includesQuery(event: RivieraEvent, query: string) {
  if (!query) return true;
  const needle = query.toLowerCase();
  const haystack = [
    event.title,
    event.city,
    event.location,
    event.dateLabel,
    event.shortDescription.en,
    event.whyShowOnSite.en,
    event.bookingTip.en,
    event.audience.join(" "),
    event.category.join(" "),
  ].join(" ").toLowerCase();

  return haystack.includes(needle);
}

export function filterDiscoverableEvents(events: RivieraEvent[], filters: EventDiscoveryFilters, today = new Date()) {
  const range = getParisDateRange(filters.period, today, { from: filters.from, to: filters.to });
  const exactDated = events.filter((event) => eventOverlapsDateRange(event, range));

  return exactDated
    .filter((event) => filters.location === "all" || normalizedCity(event) === filters.location)
    .filter((event) => hasInterest(event, filters.interest))
    .filter((event) => includesQuery(event, filters.query))
    .sort((left, right) => (left.startDate ?? "").localeCompare(right.startDate ?? ""));
}

export function getFeaturedEvents(events: RivieraEvent[], today = new Date(), limit = 6) {
  return events
    .filter((event) => {
      const status = getEventDateStatus(event, today);
      return (event.featured || event.searchIndexing === "priority" || (event.distanceFromMentonKm ?? 99) <= 32) && (status === "upcoming" || status === "current");
    })
    .sort((left, right) => {
      if (left.featured && !right.featured) return -1;
      if (right.featured && !left.featured) return 1;
      return (left.startDate ?? "9999-12-31").localeCompare(right.startDate ?? "9999-12-31");
    })
    .slice(0, limit);
}

export function eventDeduplicationKey(event: Pick<LocalEventCandidate, "normalizedTitle" | "city" | "venue" | "startDate" | "sourceUrl" | "sourceEventId">) {
  return [
    event.sourceEventId ?? "",
    event.normalizedTitle,
    event.venue?.toLowerCase().trim() ?? "",
    event.city?.toLowerCase().trim() ?? "",
    event.startDate ?? "",
    event.sourceUrl.toLowerCase().replace(/\/$/, ""),
  ].join("|");
}

export function findDuplicateEventCandidates(candidates: LocalEventCandidate[]) {
  const seen = new Map<string, LocalEventCandidate>();
  const duplicates: Array<{ first: LocalEventCandidate; duplicate: LocalEventCandidate; key: string }> = [];

  for (const candidate of candidates) {
    const key = eventDeduplicationKey(candidate);
    const first = seen.get(key);
    if (first) {
      duplicates.push({ first, duplicate: candidate, key });
    } else {
      seen.set(key, candidate);
    }
  }

  return duplicates;
}

import { createHash } from "node:crypto";
import type { EventCategory } from "@/content/riviera-events";
import { eventDeduplicationKey } from "@/lib/event-discovery";
import type { EventEditorialSuggestion, ImportedEventCandidate, RawIngestedEvent } from "@/lib/events-ingestion/types";

function normalizeTitle(title: string) {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function slugPart(value: string) {
  return normalizeTitle(value).replace(/\s+/g, "-").slice(0, 80);
}

function hashPayload(raw: RawIngestedEvent) {
  return createHash("sha256")
    .update(JSON.stringify({
      title: raw.title,
      sourceUrl: raw.sourceUrl,
      startDate: raw.startDate,
      endDate: raw.endDate,
      venue: raw.venue,
      city: raw.city,
      status: raw.status,
      categoryLabel: raw.categoryLabel,
    }))
    .digest("hex");
}

export function suggestEventCategory(raw: Pick<RawIngestedEvent, "title" | "categoryLabel">): EventCategory[] {
  const text = `${raw.title} ${raw.categoryLabel ?? ""}`.toLowerCase();
  if (/concert|jazz|music|festival|pina/.test(text)) return ["music"];
  if (/exhibition|museum|matisse|culture|historic|immersive|ruins/.test(text)) return ["exhibition"];
  if (/tour|marathon|ironman|sport|race|regatta|tennis|cycling/.test(text)) return ["sport"];
  if (/market|food|wine|gastronomy|cuisine/.test(text)) return ["food-local"];
  if (/carnival|fete|fête|festival/.test(text)) return ["seasonal"];
  return ["seasonal"];
}

export function buildEditorialSuggestion(raw: RawIngestedEvent): EventEditorialSuggestion {
  const category = suggestEventCategory(raw);
  const text = `${raw.title} ${raw.categoryLabel ?? ""}`.toLowerCase();
  return {
    summary: `${raw.title} is listed by ${raw.sourceId} for ${raw.city ?? "the Riviera"}. Verify the official page before publishing AzurMenton copy.`,
    editorialNote: raw.city ? `Check whether this ${raw.city} event is genuinely useful from a Menton base.` : undefined,
    category,
    suggestedTags: [
      raw.city,
      text.includes("festival") ? "festival" : undefined,
      text.includes("exhibition") ? "exhibition" : undefined,
      text.includes("sport") || text.includes("tour") ? "sports" : undefined,
    ].filter((value): value is string => Boolean(value)),
    suitability: {
      familyFriendly: null,
      indoor: text.includes("exhibition") || text.includes("museum") ? true : null,
      outdoor: text.includes("tour") || text.includes("market") || text.includes("festival") ? true : null,
      rainyDayOption: text.includes("exhibition") || text.includes("museum") ? true : null,
      bookingRecommended: null,
    },
    warnings: ["Editorial summary must be rewritten before publication.", "Do not assume price, booking requirements or child suitability."],
  };
}

export function validateRawEvent(raw: RawIngestedEvent) {
  const errors: string[] = [];
  if (!raw.title.trim()) errors.push("missing title");
  try {
    new URL(raw.sourceUrl);
  } catch {
    errors.push("invalid sourceUrl");
  }
  if (raw.startDate && !/^\d{4}-\d{2}-\d{2}$/.test(raw.startDate)) errors.push("invalid startDate");
  if (raw.endDate && !/^\d{4}-\d{2}-\d{2}$/.test(raw.endDate)) errors.push("invalid endDate");
  if (raw.startDate && raw.endDate && raw.endDate < raw.startDate) errors.push("endDate before startDate");
  return errors;
}

export function candidateFromRaw(raw: RawIngestedEvent, nowIso: string): ImportedEventCandidate {
  const normalizedTitle = normalizeTitle(raw.title);
  const sourceEventId = raw.sourceEventId ?? `${slugPart(raw.title)}:${raw.startDate ?? "undated"}`;
  const base = {
    sourceId: raw.sourceId,
    sourceEventId,
    title: raw.title.trim(),
    normalizedTitle,
    sourceUrl: raw.sourceUrl,
    city: raw.city,
    venue: raw.venue,
    startDate: raw.startDate,
    endDate: raw.endDate,
    category: suggestEventCategory(raw),
    reviewRequired: true,
  };
  const id = `${raw.sourceId}:${sourceEventId}`;
  return {
    ...base,
    id,
    sourceHash: hashPayload(raw),
    rawTitle: raw.title,
    rawPayload: raw.rawPayload,
    dateLabel: raw.dateLabel,
    timezone: "Europe/Paris",
    reviewStatus: raw.status === "cancelled" ? "cancelled" : "new",
    confidence: raw.startDate && raw.sourceUrl ? 0.82 : 0.52,
    duplicateCandidates: [],
    firstSeenAt: nowIso,
    lastSeenAt: nowIso,
    lastVerifiedAt: nowIso,
    missingRunCount: 0,
    materialChanges: [],
    editorialSuggestion: buildEditorialSuggestion(raw),
  };
}

export function candidateDedupeKey(candidate: ImportedEventCandidate) {
  return eventDeduplicationKey(candidate);
}

export function materialChanges(previous: ImportedEventCandidate, next: ImportedEventCandidate) {
  const changes: string[] = [];
  for (const field of ["title", "sourceUrl", "city", "venue", "startDate", "endDate"] as const) {
    if (previous[field] !== next[field]) changes.push(field);
  }
  if (previous.reviewStatus === "cancelled" || next.reviewStatus === "cancelled") changes.push("cancellation");
  return [...new Set(changes)];
}

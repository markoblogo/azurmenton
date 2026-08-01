import { promises as fs } from "node:fs";
import path from "node:path";
import type { EventCategory, RivieraEvent } from "@/content/riviera-events";
import type { EventDiscoveryLocation } from "@/lib/event-discovery";
import type { ImportedEventCandidate } from "@/lib/events-ingestion/types";

export type EventEditorialScope = "menton-local" | "destination-worthy" | "borderline" | "exclude";
export type PreparedEventImageStatus = "approved-source" | "manual-approved" | "remote-reference" | "fallback" | "missing";
export type EventImageKind =
  | "official-poster"
  | "official-photo"
  | "azur-editorial"
  | "category-fallback"
  | "location-fallback"
  | "remote-reference"
  | "missing";
export type EventImageRightsStatus = "approved" | "official-promotional" | "manual-approved" | "unknown" | "not-approved";
export type EventImageRecommendation =
  | "keep-official-poster"
  | "official-photo-suitable"
  | "generate-azur-editorial"
  | "manual-image-review"
  | "fallback-acceptable"
  | "publish-without-image";

export type PreparedEventImage = {
  id: string;
  status: PreparedEventImageStatus;
  kind: EventImageKind;
  rightsStatus: EventImageRightsStatus;
  recommendation: EventImageRecommendation;
  recommendationReason: string;
  originalUrl?: string;
  localPath?: string;
  sourceName?: string;
  sourceUrl?: string;
  credit?: string;
  rightsNote?: string;
  width?: number;
  height?: number;
  aspectRatio?: number;
  fileSize?: number;
  mimeType?: string;
  isCurrent?: boolean;
  manuallySelected?: boolean;
  locked?: boolean;
  discoveredAt?: string;
  approvedAt?: string;
  updatedAt?: string;
  alt: string;
};

export type PublishingQueueItem = {
  id: string;
  slug: string;
  title: string;
  location: EventDiscoveryLocation;
  startDate: string;
  sourceUrl: string;
  action: "publish" | "update-source" | "skip-unchanged";
  reason: string;
};

export type ImageQueueItem = {
  id: string;
  slug: string;
  title: string;
  status: PreparedEventImageStatus;
  kind: EventImageKind;
  rightsStatus: EventImageRightsStatus;
  recommendation: EventImageRecommendation;
  sourceUrl?: string;
  originalUrl?: string;
  reason: string;
};

export type VerificationQueueItem = {
  id: string;
  slug: string;
  title: string;
  sourceUrl: string;
  checks: string[];
};

export type EventQueues = {
  publishing: PublishingQueueItem[];
  images: ImageQueueItem[];
  verification: VerificationQueueItem[];
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

export type EventImageOverride = {
  eventSlug?: string;
  sourceEventId?: string;
  sourceUrl?: string;
  localPath: string;
  kind: Exclude<EventImageKind, "remote-reference" | "missing">;
  rightsStatus: Extract<EventImageRightsStatus, "approved" | "official-promotional" | "manual-approved">;
  alt?: string;
  sourceName?: string;
  sourceUrlForImage?: string;
  credit?: string;
  rightsNote?: string;
  width?: number;
  height?: number;
  fileSize?: number;
  mimeType?: string;
  approvedAt: string;
  updatedAt?: string;
  locked?: boolean;
};

type EventCandidateImagePayload = {
  localPath?: string;
  kind?: EventImageKind;
  rightsStatus?: EventImageRightsStatus;
  alt?: string;
  sourceName?: string;
  sourceUrl?: string;
  credit?: string;
  rightsNote?: string;
  width?: number;
  height?: number;
  fileSize?: number;
  mimeType?: string;
  originalUrl?: string;
  discoveredAt?: string;
  approvedAt?: string;
  locked?: boolean;
};

function isPublishableCandidateImage(
  image: EventCandidateImagePayload | undefined,
): image is EventCandidateImagePayload & {
  localPath: string;
  kind: Exclude<EventImageKind, "remote-reference" | "missing">;
  rightsStatus: "approved" | "official-promotional" | "manual-approved";
} {
  return Boolean(
    image?.localPath &&
      image.kind &&
      image.kind !== "remote-reference" &&
      image.kind !== "missing" &&
      (image.rightsStatus === "approved" ||
        image.rightsStatus === "official-promotional" ||
        image.rightsStatus === "manual-approved"),
  );
}

export type PreparedEvent = {
  id: string;
  slug: string;
  sourceId: string;
  sourceEventId?: string;
  sourceName: string;
  sourceUrl: string;
  programmeUrl?: string;
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
  travelNote?: RivieraEvent["travelNote"];
  detailContent?: RivieraEvent["detailContent"];
  relatedGuideSlugs?: string[];
  relatedPlaceIds?: string[];
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
  queues?: EventQueues;
};

function applyEventImageOverride(input: {
  image: PreparedEventImage;
  eventSlug: string;
  sourceEventId?: string;
  sourceUrl: string;
  title: string;
  override?: EventImageOverride;
}): PreparedEventImage {
  const override = input.override;
  if (!override) return input.image;
  const aspectRatio = override.width && override.height ? Number((override.width / override.height).toFixed(3)) : undefined;
  return {
    ...input.image,
    id: `${input.eventSlug}-manual-image`,
    status: "manual-approved",
    kind: override.kind,
    rightsStatus: override.rightsStatus,
    recommendation: override.kind === "official-poster" ? "keep-official-poster" : "official-photo-suitable",
    recommendationReason: "Owner-approved image override is locked for this event.",
    localPath: override.localPath,
    sourceName: override.sourceName,
    sourceUrl: override.sourceUrlForImage ?? input.sourceUrl,
    credit: override.credit,
    rightsNote: override.rightsNote ?? "Owner-approved event image.",
    width: override.width,
    height: override.height,
    aspectRatio,
    fileSize: override.fileSize,
    mimeType: override.mimeType,
    alt: override.alt ?? `${input.title} event image`,
    isCurrent: true,
    manuallySelected: true,
    locked: override.locked ?? true,
    approvedAt: override.approvedAt,
    updatedAt: override.updatedAt ?? override.approvedAt,
  };
}

function findEventImageOverride(overrides: EventImageOverride[] = [], input: { eventSlug: string; sourceEventId?: string; sourceUrl: string }) {
  return overrides.find((override) => {
    if (override.eventSlug && override.eventSlug === input.eventSlug) return true;
    if (override.sourceEventId && input.sourceEventId && override.sourceEventId === input.sourceEventId) return true;
    if (override.sourceUrl && override.sourceUrl === input.sourceUrl) return true;
    return false;
  });
}

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

const acceptedDestinationKeywords =
  /\b(festival|grand prix|exhibition|museum|concert|symphony|jazz|opera|marathon|triathlon|race|championship|chess|cycling|downhill|yacht|masters|carnival|national|fireworks|major|international)\b/i;
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
  const raw = candidate.rawPayload as { imageUrl?: string; eventImage?: EventCandidateImagePayload } | undefined;
  const candidateImage = raw?.eventImage;
  if (isPublishableCandidateImage(candidateImage)) {
    return {
      id: `${candidate.id}-candidate-image`,
      status: candidateImage.rightsStatus === "manual-approved" ? "manual-approved" : "approved-source",
      kind: candidateImage.kind,
      rightsStatus: candidateImage.rightsStatus,
      recommendation: candidateImage.kind === "official-poster" ? "keep-official-poster" : "official-photo-suitable",
      recommendationReason: "Approved source image supplied by the manual event intake.",
      originalUrl: candidateImage.originalUrl,
      localPath: candidateImage.localPath,
      sourceName: candidateImage.sourceName ?? sourceName,
      sourceUrl: candidateImage.sourceUrl ?? candidate.sourceUrl,
      credit: candidateImage.credit,
      rightsNote: candidateImage.rightsNote,
      width: candidateImage.width,
      height: candidateImage.height,
      aspectRatio: candidateImage.width && candidateImage.height ? candidateImage.width / candidateImage.height : undefined,
      fileSize: candidateImage.fileSize,
      mimeType: candidateImage.mimeType,
      manuallySelected: candidateImage.rightsStatus === "manual-approved",
      locked: candidateImage.locked ?? false,
      discoveredAt: candidateImage.discoveredAt ?? candidate.lastVerifiedAt,
      approvedAt: candidateImage.approvedAt,
      updatedAt: candidate.lastVerifiedAt,
      alt: candidateImage.alt ?? `${candidate.title} official event image`,
    };
  }

  if (raw?.imageUrl) {
    return {
      id: `${candidate.id}-remote-image`,
      status: "remote-reference",
      kind: "remote-reference",
      rightsStatus: "unknown",
      recommendation: "manual-image-review",
      recommendationReason: "A source image exists, but it must be checked for official promotional use or replaced with an Azur Menton illustration before publication.",
      originalUrl: raw.imageUrl,
      sourceName,
      sourceUrl: candidate.sourceUrl,
      rightsNote: "Remote source image retained for editorial review only; not published automatically.",
      discoveredAt: candidate.lastVerifiedAt,
      updatedAt: candidate.lastVerifiedAt,
      alt: `${candidate.title} event image reference`,
    };
  }

  return {
    id: `${candidate.id}-missing-image`,
    status: "missing",
    kind: "missing",
    rightsStatus: "not-approved",
    recommendation: "generate-azur-editorial",
    recommendationReason: "No approved event image is attached yet.",
    rightsNote: "No approved event image yet; leave the public card without an image until an owner-approved illustration or source image is attached.",
    discoveredAt: candidate.lastVerifiedAt,
    updatedAt: candidate.lastVerifiedAt,
    alt: `${candidate.title} event image placeholder`,
  };
}

export function canPublishEventImage(image: PreparedEventImage) {
  if (!image.localPath) return false;
  if (image.kind === "remote-reference" || image.kind === "missing") return false;
  return ["approved", "official-promotional", "manual-approved"].includes(image.rightsStatus);
}

function publishedMediaType(image: PreparedEventImage): NonNullable<NonNullable<RivieraEvent["media"]>["mediaType"]> {
  if (image.kind === "official-poster") return "official_poster";
  if (image.kind === "official-photo") return "official_photo";
  return "project_illustration";
}

export function buildEventQueues(batch: Pick<EventBatch, "candidates">): EventQueues {
  const publishing: PublishingQueueItem[] = [];
  const images: ImageQueueItem[] = [];
  const verification: VerificationQueueItem[] = [];

  for (const event of batch.candidates) {
    const action: PublishingQueueItem["action"] =
      event.publicationState === "unchanged" ? "skip-unchanged" : event.publicationState === "updated" ? "update-source" : "publish";
    publishing.push({
      id: event.id,
      slug: event.slug,
      title: event.titleCanonical,
      location: event.location,
      startDate: event.startDate,
      sourceUrl: event.sourceUrl,
      action,
      reason: event.relevanceReason,
    });

    if (!canPublishEventImage(event.image)) {
      images.push({
        id: event.id,
        slug: event.slug,
        title: event.titleCanonical,
        status: event.image.status,
        kind: event.image.kind,
        rightsStatus: event.image.rightsStatus,
        recommendation: event.image.recommendation,
        sourceUrl: event.image.sourceUrl,
        originalUrl: event.image.originalUrl,
        reason: event.image.recommendationReason,
      });
    }

    const checks = [
      event.sourceUrl.startsWith("https://") ? undefined : "replace non-HTTPS source URL",
      event.warnings.length ? "review ingestion/editorial warnings" : undefined,
      event.accessibilityConfirmed === null ? "avoid accessibility claims unless confirmed" : undefined,
      event.isFree === null || event.isFree === undefined ? "avoid free-entry claims unless confirmed" : undefined,
    ].filter(Boolean) as string[];

    if (checks.length) {
      verification.push({
        id: event.id,
        slug: event.slug,
        title: event.titleCanonical,
        sourceUrl: event.sourceUrl,
        checks,
      });
    }
  }

  return { publishing, images, verification };
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

function eventSearchText(event: Pick<PreparedEvent, "titleCanonical" | "venue" | "tags" | "category" | "location">) {
  return `${event.titleCanonical} ${event.venue ?? ""} ${event.tags.join(" ")} ${event.category.join(" ")} ${event.location}`.toLowerCase();
}

function inferRelatedGuideSlugs(event: Pick<PreparedEvent, "titleCanonical" | "venue" | "tags" | "category" | "location" | "relatedGuideSlugs">) {
  const slugs = new Set(event.relatedGuideSlugs ?? []);
  const text = eventSearchText(event);

  if (event.location === "menton") {
    slugs.add("menton-without-a-car");
    if (event.category.includes("family")) slugs.add("menton-with-kids-family-guide");
    if (event.category.includes("seasonal")) slugs.add("stay-cool-in-menton-summer");
    if (event.category.includes("food-local")) slugs.add("local-food-menton");
    if (text.includes("bibliothe") || text.includes("library") || text.includes("book")) slugs.add("bookshops-libraries-menton");
    if (text.includes("bibliothe") || text.includes("library")) slugs.add("menton-with-kids-family-guide");
    if (text.includes("train")) slugs.add("public-transport-in-menton");
    if (text.includes("rue saint") || text.includes("vieille") || text.includes("old town") || text.includes("surprise")) slugs.add("menton-old-town");
    if (text.includes("plage") || text.includes("beach") || text.includes("rondelli")) slugs.add("best-beaches-in-menton");
  } else if (event.location === "monaco") {
    slugs.add("monaco-events-from-menton");
    slugs.add("public-transport-in-menton");
  } else if (event.location === "nice") {
    slugs.add("day-trips-from-menton");
    slugs.add("public-transport-in-menton");
  } else if (event.location === "sanremo" || event.location === "ventimiglia") {
    slugs.add("italian-riviera-day-trip-from-menton");
    slugs.add("public-transport-in-menton");
  }

  return [...slugs].slice(0, 6);
}

function inferRelatedPlaceIds(event: Pick<PreparedEvent, "titleCanonical" | "venue" | "tags" | "category" | "location" | "relatedPlaceIds">) {
  const ids = new Set(event.relatedPlaceIds ?? []);
  const text = eventSearchText(event);

  if (text.includes("gannac")) ids.add("maison-gannac-menton");
  if (text.includes("maria serena")) ids.add("villa-maria-serena");
  if (text.includes("serre de la madone") || text.includes("fragonard")) ids.add("jardin-serre-de-la-madone");
  if (text.includes("bibliotheque a la plage") || text.includes("beach library")) ids.add("bibliotheque-a-la-plage-menton");
  if (text.includes("rue saint") || text.includes("surprise")) ids.add("rue-saint-michel-menton");
  if (text.includes("rondelli") || text.includes("grande roue") || text.includes("ferris wheel")) ids.add("plage-rondelli");
  if (text.includes("summer village") || text.includes("village d ete")) ids.add("promenade-du-soleil");

  return [...ids].slice(0, 6);
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

function multiDayIdentityKey(candidate: ImportedEventCandidate) {
  if (!candidate.startDate) return undefined;
  return [
    candidate.sourceId,
    candidate.normalizedTitle,
    candidate.sourceUrl.toLowerCase().replace(/\/$/, ""),
    candidate.city?.toLowerCase().trim() ?? "",
    candidate.venue?.toLowerCase().trim() ?? "",
  ].join("|");
}

function consolidateSourceFragmentedEvents(candidates: ImportedEventCandidate[]) {
  const byIdentity = new Map<string, ImportedEventCandidate[]>();
  const passthrough: ImportedEventCandidate[] = [];

  for (const candidate of candidates) {
    const key = multiDayIdentityKey(candidate);
    if (!key) {
      passthrough.push(candidate);
      continue;
    }
    const group = byIdentity.get(key) ?? [];
    group.push(candidate);
    byIdentity.set(key, group);
  }

  const consolidated: ImportedEventCandidate[] = [];
  const duplicates: EventBatch["duplicates"] = [];

  for (const group of byIdentity.values()) {
    const sorted = [...group].sort((left, right) => (left.startDate ?? "").localeCompare(right.startDate ?? ""));
    const first = sorted[0];
    if (!first) continue;
    const dateValues = sorted.flatMap((candidate) => [candidate.startDate, candidate.endDate].filter(Boolean) as string[]);
    const startDate = dateValues.sort()[0] ?? first.startDate;
    const endDate = dateValues.sort().at(-1);
    const merged: ImportedEventCandidate = {
      ...first,
      startDate,
      endDate: endDate && endDate !== startDate ? endDate : first.endDate,
      firstSeenAt: sorted.map((candidate) => candidate.firstSeenAt).sort()[0] ?? first.firstSeenAt,
      lastSeenAt: sorted.map((candidate) => candidate.lastSeenAt).sort().at(-1) ?? first.lastSeenAt,
      lastVerifiedAt: sorted.map((candidate) => candidate.lastVerifiedAt).sort().at(-1) ?? first.lastVerifiedAt,
      materialChanges: [...new Set(sorted.flatMap((candidate) => candidate.materialChanges))],
    };
    consolidated.push(merged);
    for (const duplicate of sorted.slice(1)) {
      duplicates.push({
        id: duplicate.id,
        duplicateOf: first.sourceEventId ?? first.id,
        title: duplicate.title,
      });
    }
  }

  return {
    candidates: [...passthrough, ...consolidated],
    duplicates,
  };
}

export function prepareEventBatch(input: {
  candidates: ImportedEventCandidate[];
  sourceRuns?: EventBatch["sourceRuns"];
  existingEvents?: RivieraEvent[];
  imageOverrides?: EventImageOverride[];
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
  const consolidatedInput = consolidateSourceFragmentedEvents(input.candidates);
  const duplicates: EventBatch["duplicates"] = [...consolidatedInput.duplicates];
  const warnings: EventBatch["warnings"] = [];
  let alreadyPublishedUnchanged = 0;
  let publishedWithSourceUpdates = 0;
  let cancelled = 0;

  for (const candidate of consolidatedInput.candidates) {
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

    const rawPayload = candidate.rawPayload as {
      isFree?: boolean | null;
      priceText?: string;
      programmeUrl?: string;
      bookingUrl?: string;
      relatedGuideSlugs?: string[];
      relatedPlaceIds?: string[];
    } | undefined;
    const image = applyEventImageOverride({
      image: eventImage(candidate, sourceName),
      eventSlug: slugBase,
      sourceEventId: candidate.sourceEventId,
      sourceUrl: candidate.sourceUrl,
      title: candidate.title,
      override: findEventImageOverride(input.imageOverrides, { eventSlug: slugBase, sourceEventId: candidate.sourceEventId, sourceUrl: candidate.sourceUrl }),
    });
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
      isFree: rawPayload?.isFree ?? null,
      priceText: rawPayload?.priceText,
      programmeUrl: rawPayload?.programmeUrl,
      bookingUrl: rawPayload?.bookingUrl,
      relatedGuideSlugs: rawPayload?.relatedGuideSlugs,
      relatedPlaceIds: rawPayload?.relatedPlaceIds,
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

  const queues = buildEventQueues({ candidates: prepared });

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
      missingApprovedImage: prepared.filter((event) => !canPublishEventImage(event.image)).length,
      requiresFactualVerification: prepared.filter((event) => event.warnings.length > 0).length,
      alreadyPublishedUnchanged,
      publishedWithSourceUpdates,
      cancelled,
    },
    queues,
  };
}

export function eventBatchReportMarkdown(batch: EventBatch) {
  const queues = batch.queues ?? buildEventQueues(batch);
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
    `Publishing queue: ${queues.publishing.length}`,
    `Image queue: ${queues.images.length}`,
    `Verification queue: ${queues.verification.length}`,
    "",
    "## Prepared",
    "",
    ...batch.candidates.flatMap((event, index) => [
      `${index + 1}. [${event.location}] ${event.titleCanonical}`,
      `   Date: ${event.startDate}${event.endDate ? `-${event.endDate}` : ""}`,
      `   Venue: ${event.venue ?? "unknown"}`,
      `   Scope: ${event.editorialScope}`,
      `   Image: ${event.image.status} / ${event.image.kind} / ${event.image.rightsStatus}`,
      `   Image action: ${event.image.recommendation}`,
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

function queueMarkdown(title: string, rows: Array<Record<string, unknown>>) {
  const lines = [`# ${title}`, ""];
  if (!rows.length) {
    lines.push("No items.");
    return `${lines.join("\n")}\n`;
  }
  for (const [index, row] of rows.entries()) {
    lines.push(`${index + 1}. ${String(row.title ?? row.slug ?? row.id)}`);
    for (const [key, value] of Object.entries(row)) {
      if (["title"].includes(key) || value === undefined) continue;
      lines.push(`   ${key}: ${Array.isArray(value) ? value.join("; ") : String(value)}`);
    }
  }
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
  const queues = batch.queues ?? buildEventQueues(batch);
  await writeJsonFile(path.join(batchDir, "batch.json"), { ...batch, queues });
  await fs.writeFile(path.join(batchDir, "report.md"), eventBatchReportMarkdown(batch), "utf8");
  await writeJsonFile(path.join(batchDir, "publishing-queue.json"), queues.publishing);
  await writeJsonFile(path.join(batchDir, "image-queue.json"), queues.images);
  await writeJsonFile(path.join(batchDir, "verification-queue.json"), queues.verification);
  await fs.writeFile(path.join(batchDir, "publishing-queue.md"), queueMarkdown("Publishing queue", queues.publishing), "utf8");
  await fs.writeFile(path.join(batchDir, "image-queue.md"), queueMarkdown("Image queue", queues.images), "utf8");
  await fs.writeFile(path.join(batchDir, "verification-queue.md"), queueMarkdown("Verification queue", queues.verification), "utf8");
  return {
    batchDir,
    jsonPath: path.join(batchDir, "batch.json"),
    reportPath: path.join(batchDir, "report.md"),
    queuePaths: [
      path.join(batchDir, "publishing-queue.json"),
      path.join(batchDir, "image-queue.json"),
      path.join(batchDir, "verification-queue.json"),
    ],
  };
}

export async function readPreparedBatch(batchId: string, rootDir = process.cwd()) {
  return readJsonFile<EventBatch | null>(path.join(eventsContentRoot(rootDir), "batches", batchId, "batch.json"), null);
}

export function preparedEventToPublishedRecord(event: PreparedEvent): RivieraEvent {
  const title = event.localized.en.title;
  const summary = event.localized.en.summary;
  const note = event.localized.en.editorialNote ?? event.relevanceReason;
  const sourceNeedsVerification = event.warnings.some((warning) => !/image|rights/i.test(warning));
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
    sourceStatus: sourceNeedsVerification ? "needs_verification" : "verified",
    sourceUrl: event.sourceUrl,
    programmeUrl: event.programmeUrl ?? event.sourceUrl,
    ticketsUrl: event.bookingUrl,
    travelNote: event.travelNote,
    detailContent: event.detailContent,
    detailPage: true,
    relatedApartmentKeys: [
      "sea-view-balcony-studio",
      "panoramic-sea-view-studio",
      "beachside-family-apartment",
    ],
    relatedGuideSlugs: inferRelatedGuideSlugs(event),
    relatedPlaceIds: inferRelatedPlaceIds(event),
    searchIndexing: "standard",
    lastChecked: event.lastVerifiedAt,
    lastVerifiedAt: event.lastVerifiedAt,
    media: canPublishEventImage(event.image)
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
          mediaType: publishedMediaType(event.image),
          mediaStatus: event.image.status === "fallback" ? "needs_review" : "available",
          mediaSourceName: event.image.sourceName,
          mediaRightsNote: event.image.rightsNote,
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

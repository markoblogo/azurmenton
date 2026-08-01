import type { EventCategory } from "@/content/riviera-events";
import type { EventDiscoveryLocation, LocalEventCandidate } from "@/lib/event-discovery";

export type IngestionStage = "fetch" | "parse" | "normalize" | "validate" | "dedupe" | "store";

export type IngestionError = {
  sourceId: string;
  sourceUrl?: string;
  stage: IngestionStage;
  message: string;
  recoverable: boolean;
};

export type IngestionContext = {
  now: Date;
  timeoutMs: number;
  userAgent: string;
  sourceId?: string;
  outputDir?: string;
};

export type RawIngestedEvent = {
  sourceId: string;
  sourceEventId?: string;
  title: string;
  sourceUrl: string;
  dateLabel?: string;
  startDate?: string;
  endDate?: string;
  city?: EventDiscoveryLocation;
  venue?: string;
  categoryLabel?: string;
  organiser?: string;
  status?: "scheduled" | "cancelled" | "postponed";
  imageUrl?: string;
  rawPayload?: unknown;
};

export type EventReviewStatus = "new" | "needs_review" | "approved" | "rejected" | "duplicate" | "outdated" | "cancelled" | "published";

export type EventEditorialSuggestion = {
  summary: string;
  editorialNote?: string;
  category: EventCategory[];
  suggestedTags: string[];
  suitability: {
    familyFriendly: boolean | null;
    indoor: boolean | null;
    outdoor: boolean | null;
    rainyDayOption: boolean | null;
    bookingRecommended: boolean | null;
  };
  warnings: string[];
};

export type ImportedEventCandidate = LocalEventCandidate & {
  id: string;
  sourceHash: string;
  rawTitle: string;
  rawPayload?: unknown;
  dateLabel?: string;
  timezone: "Europe/Paris";
  reviewStatus: EventReviewStatus;
  confidence: number;
  duplicateOf?: string;
  duplicateCandidates: string[];
  firstSeenAt: string;
  lastSeenAt: string;
  lastVerifiedAt: string;
  missingRunCount: number;
  materialChanges: string[];
  editorialSuggestion: EventEditorialSuggestion;
  publicTitle?: string;
  publicSummary?: string;
  editorialNote?: string;
};

export type IngestionResult = {
  sourceId: string;
  fetchedAt: string;
  rawCount: number;
  parsedCount: number;
  createdCount: number;
  updatedCount: number;
  duplicateCount: number;
  rejectedCount: number;
  durationMs: number;
  errors: IngestionError[];
};

export type SourceHealth = {
  sourceId: string;
  enabled: boolean;
  automated: boolean;
  lastSuccessAt?: string;
  lastFailureAt?: string;
  latestRawCount: number;
  latestCandidateCount: number;
  latestRejectedCount: number;
  latestDurationMs: number;
  consecutiveFailures: number;
  lastError?: string;
};

export interface EventSourceAdapter {
  sourceId: string;
  sourceUrl: string;
  fetchEvents(context: IngestionContext): Promise<RawIngestedEvent[]>;
}

export interface EventCandidateRepository {
  listCandidates(): Promise<ImportedEventCandidate[]>;
  findBySourceIdentity(sourceId: string, sourceEventId: string): Promise<ImportedEventCandidate | null>;
  upsertCandidate(candidate: ImportedEventCandidate): Promise<"created" | "updated" | "unchanged">;
  markMissingFromRun(sourceId: string, seenCandidateIds: string[], checkedAt: string): Promise<number>;
  recordSourceHealth(sourceId: string, health: SourceHealth): Promise<void>;
  listSourceHealth(): Promise<SourceHealth[]>;
}

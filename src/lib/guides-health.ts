import type { GuideCategory, SourceStatus } from "@/content/guide";
import { locales, type Locale } from "@/i18n/locales";
import type { GuideVerificationRecord } from "@/lib/guides-verification";

export type GuideVolatility = "LOW_VOLATILITY" | "MEDIUM_VOLATILITY" | "HIGH_VOLATILITY";
export type GuideHealthStatus = "CURRENT" | "REVIEW_DUE" | "STALE" | "PROVENANCE_WEAK" | "UNKNOWN";
export type GuideHealthInput = {
  id: string;
  slug: string;
  title: Partial<Record<Locale, string>>;
  category: GuideCategory;
  locationTags?: string[];
  sourceStatus?: SourceStatus;
  publishedOn?: string;
  lastVerifiedAt?: string;
  sections?: Array<{ heading?: Partial<Record<Locale, string>>; body?: Array<Partial<Record<Locale, string>>> }>;
};

const volatilityByCategory: Record<GuideCategory, GuideVolatility> = {
  "food-markets": "HIGH_VOLATILITY",
  beaches: "MEDIUM_VOLATILITY",
  "walks-views": "LOW_VOLATILITY",
  "with-children": "MEDIUM_VOLATILITY",
  "nightlife-drinks": "HIGH_VOLATILITY",
  "photo-spots": "LOW_VOLATILITY",
  itineraries: "MEDIUM_VOLATILITY",
  "day-trips": "HIGH_VOLATILITY",
  events: "HIGH_VOLATILITY",
  practical: "HIGH_VOLATILITY",
};

const reviewAfterDays: Record<GuideVolatility, number> = {
  LOW_VOLATILITY: 730,
  MEDIUM_VOLATILITY: 365,
  HIGH_VOLATILITY: 120,
};

const staleAfterDays: Record<GuideVolatility, number> = {
  LOW_VOLATILITY: 1095,
  MEDIUM_VOLATILITY: 730,
  HIGH_VOLATILITY: 240,
};

const statusOrder: Record<GuideHealthStatus, number> = {
  STALE: 0,
  PROVENANCE_WEAK: 1,
  REVIEW_DUE: 2,
  UNKNOWN: 3,
  CURRENT: 4,
};

function validDate(value?: string) {
  return value && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : undefined;
}

function ageDays(date: string | undefined, today: string) {
  if (!date) return undefined;
  return Math.floor((Date.parse(`${today}T00:00:00Z`) - Date.parse(`${date}T00:00:00Z`)) / 86_400_000);
}

function localizationHealth(guide: GuideHealthInput) {
  const missingLocales = locales.filter((locale) => !guide.title[locale]?.trim());
  return {
    status: missingLocales.length ? "INCOMPLETE" as const : "COMPLETE" as const,
    missingLocales,
    drift: "UNKNOWN" as const,
    reason: missingLocales.length ? "one or more localized titles are missing" : "no per-locale update or provenance metadata exists",
  };
}

export function classifyGuideHealth(guide: GuideHealthInput, options: { today: string; verificationRecords?: GuideVerificationRecord[] }) {
  const volatility = volatilityByCategory[guide.category];
  const contentDate = validDate(guide.publishedOn);
  const evidenceDate = validDate(guide.lastVerifiedAt);
  const contentAgeDays = ageDays(contentDate, options.today);
  const evidenceAgeDays = ageDays(evidenceDate, options.today);
  const localization = localizationHealth(guide);
  let status: GuideHealthStatus = "UNKNOWN";
  let reason = "no dated supporting evidence is recorded";
  const verification = options.verificationRecords?.find((record) => record.guideSlug === guide.slug);
  const verifiedClaims = verification?.claims.filter((claim) => claim.result === "CONFIRMED" && !claim.changeDetected && claim.confidence === "HIGH").length ?? 0;
  const hasCurrentPilotEvidence = Boolean(verification && verification.claims.length > 0 && verifiedClaims === verification.claims.length);

  if (localization.status === "INCOMPLETE") {
    status = "PROVENANCE_WEAK";
    reason = localization.reason;
  } else if (guide.sourceStatus === "needs_verification") {
    if (hasCurrentPilotEvidence) {
      status = "CURRENT";
      reason = `pilot verification confirms ${verifiedClaims} high-confidence claim${verifiedClaims === 1 ? "" : "s"}`;
    } else {
      status = "PROVENANCE_WEAK";
      reason = "guide is explicitly marked as needing verification";
    }
  } else if (guide.sourceStatus === "verified" && !evidenceDate) {
    status = "PROVENANCE_WEAK";
    reason = "source is marked verified but no verification date is recorded";
  } else if (guide.sourceStatus === "verified" && evidenceAgeDays !== undefined) {
    if (evidenceAgeDays > staleAfterDays[volatility]) {
      status = "STALE";
      reason = `verification evidence is ${evidenceAgeDays} days old`;
    } else if (evidenceAgeDays > reviewAfterDays[volatility]) {
      status = "REVIEW_DUE";
      reason = `verification evidence is ${evidenceAgeDays} days old for ${volatility}`;
    } else {
      status = "CURRENT";
      reason = "verified guide has recent dated evidence";
    }
  } else if (guide.sourceStatus === "editorial") {
    if (hasCurrentPilotEvidence) {
      status = "CURRENT";
      reason = `pilot verification confirms ${verifiedClaims} high-confidence claim${verifiedClaims === 1 ? "" : "s"}`;
    } else {
      status = "UNKNOWN";
      reason = "editorial content has no source verification metadata";
    }
  }

  const priority = status === "STALE" || status === "PROVENANCE_WEAK" || (status === "REVIEW_DUE" && volatility !== "LOW_VOLATILITY");
  return {
    id: guide.id,
    slug: guide.slug,
    category: guide.category,
    geography: guide.locationTags ?? [],
    volatility,
    sourceStatus: guide.sourceStatus ?? "editorial",
    contentDate,
    contentAgeDays,
    contentModificationSignal: "UNKNOWN_PER_GUIDE",
    evidenceDate,
    evidenceAgeDays,
    verification: verification ? { claimCount: verification.claims.length, confirmedClaimCount: verifiedClaims } : undefined,
    status,
    priority,
    reason,
    localization,
  };
}

export function buildGuideHealthReport(guides: GuideHealthInput[], options: { today: string; generatedAt?: string; verificationRecords?: GuideVerificationRecord[] }) {
  const inventory = guides.map((guide) => classifyGuideHealth(guide, options));
  const priorityReview = inventory
    .filter((item) => item.priority)
    .sort((left, right) => statusOrder[left.status] - statusOrder[right.status] || right.volatility.localeCompare(left.volatility) || left.slug.localeCompare(right.slug));
  const statuses = Object.fromEntries(["CURRENT", "REVIEW_DUE", "STALE", "PROVENANCE_WEAK", "UNKNOWN"].map((status) => [status, inventory.filter((item) => item.status === status).length]));

  return {
    schemaVersion: "v1",
    generatedAt: options.generatedAt ?? new Date().toISOString(),
    observedDate: options.today,
    mode: "REPORT_ONLY",
    claimLevelFreshness: "NOT_SUPPORTED_BY_CURRENT_GUIDE_MODEL",
    inventory,
    priorityReview,
    summary: { total: inventory.length, statuses },
    localization: {
      drift: "UNKNOWN",
      complete: inventory.filter((item) => item.localization.status === "COMPLETE").length,
      incomplete: inventory.filter((item) => item.localization.status === "INCOMPLETE").length,
      reason: "localized content has no per-locale verification or update provenance",
    },
    operatorNotes: [
      "Content age is not treated as proof that practical facts remain current.",
      "UNKNOWN and PROVENANCE_WEAK require editorial judgment; they are not automatic rewrite instructions.",
      "No external sources were fetched by this report.",
    ],
  };
}

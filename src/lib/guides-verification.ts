import type { GuideHealthInput } from "@/lib/guides-health";
import type { Locale } from "@/i18n/locales";

export const sourceTypes = ["OFFICIAL_PRIMARY", "FIRST_PARTY", "TRUSTED_SECONDARY", "DISCOVERY_ONLY", "UNKNOWN"] as const;
export type GuideSourceType = (typeof sourceTypes)[number];
export const verificationResults = ["CONFIRMED", "CHANGE_DETECTED", "UNVERIFIABLE", "SOURCE_UNAVAILABLE", "AMBIGUOUS", "HUMAN_REVIEW_REQUIRED"] as const;
export type GuideVerificationResult = (typeof verificationResults)[number];

export type GuideSource = {
  id: string;
  url: string;
  sourceType: GuideSourceType;
  authority: "HIGH" | "MEDIUM" | "LOW";
  classificationReason: string;
  checkedAt: string;
};

export type GuideClaimVerification = {
  id: string;
  kind: "CONTACT" | "TRANSPORT" | "ACCESS" | "PLACE_FACT" | "SERVICE_AVAILABILITY";
  currentValue: string;
  observedValue: string;
  sourceId: string;
  locales: Locale[];
  verifiedAt: string;
  verificationMethod: "MANUAL_READ_ONLY";
  confidence: "HIGH" | "MEDIUM" | "LOW";
  result: GuideVerificationResult;
  changeDetected: boolean;
  reviewer: "codex";
  notes?: string;
};

export type GuideVerificationRecord = {
  guideSlug: string;
  selectionReason: string;
  volatility: "LOW_VOLATILITY" | "MEDIUM_VOLATILITY" | "HIGH_VOLATILITY";
  sources: GuideSource[];
  claims: GuideClaimVerification[];
};

export type GuideVerificationDossier = {
  schemaVersion: "v1";
  observedDate: string;
  mode: "BOUNDED_READ_ONLY_PILOT";
  pilotGuides: GuideVerificationRecord[];
  policy: {
    autoApply: false;
    externalRequestsByDefault: false;
    contentMutation: false;
  };
};

export type GuideChangeProposal = {
  id: string;
  guideSlug: string;
  claimId: string;
  currentValue: string;
  observedValue: string;
  source: string;
  confidence: GuideClaimVerification["confidence"];
  action: "REVIEW_UPDATE";
  reason: string;
};

export function validateVerificationDossier(value: unknown): asserts value is GuideVerificationDossier {
  if (!value || typeof value !== "object") throw new Error("verification dossier must be an object");
  const dossier = value as Partial<GuideVerificationDossier>;
  if (dossier.schemaVersion !== "v1" || dossier.mode !== "BOUNDED_READ_ONLY_PILOT" || !Array.isArray(dossier.pilotGuides)) {
    throw new Error("verification dossier has an invalid schema version, mode, or pilotGuides");
  }
  for (const record of dossier.pilotGuides) {
    if (!record.guideSlug || !record.selectionReason || !Array.isArray(record.sources) || !Array.isArray(record.claims)) {
      throw new Error("verification record requires guideSlug, selectionReason, sources, and claims");
    }
    for (const claim of record.claims) {
      if (!claim.id || !claim.sourceId || !verificationResults.includes(claim.result) || claim.verificationMethod !== "MANUAL_READ_ONLY") {
        throw new Error(`invalid verification claim in ${record.guideSlug}`);
      }
    }
  }
}

export function buildChangeProposals(dossier: GuideVerificationDossier): GuideChangeProposal[] {
  return dossier.pilotGuides.flatMap((record) => record.claims.filter((claim) => claim.changeDetected || claim.result !== "CONFIRMED").map((claim) => ({
    id: `${record.guideSlug}:${claim.id}`,
    guideSlug: record.guideSlug,
    claimId: claim.id,
    currentValue: claim.currentValue,
    observedValue: claim.observedValue,
    source: record.sources.find((source) => source.id === claim.sourceId)?.url ?? claim.sourceId,
    confidence: claim.confidence,
    action: "REVIEW_UPDATE" as const,
    reason: claim.notes ?? claim.result,
  })));
}

export function verifiedGuideSlugs(dossier: GuideVerificationDossier): Set<string> {
  return new Set(dossier.pilotGuides.filter((record) => record.claims.length > 0 && record.claims.every((claim) => claim.result === "CONFIRMED" && !claim.changeDetected && claim.confidence === "HIGH")).map((record) => record.guideSlug));
}

export function buildGuideVerificationReport(guides: GuideHealthInput[], dossier: GuideVerificationDossier, selectedGuide?: string) {
  validateVerificationDossier(dossier);
  const records = dossier.pilotGuides.filter((record) => !selectedGuide || record.guideSlug === selectedGuide);
  const guideSlugs = new Set(guides.map((guide) => guide.slug));
  const unknownGuides = records.filter((record) => !guideSlugs.has(record.guideSlug)).map((record) => record.guideSlug);
  const proposals = buildChangeProposals({ ...dossier, pilotGuides: records });
  return {
    schemaVersion: "v1",
    observedDate: dossier.observedDate,
    mode: dossier.mode,
    guides: records.map((record) => ({
      guideSlug: record.guideSlug,
      selectionReason: record.selectionReason,
      claimCount: record.claims.length,
      confirmedClaimCount: record.claims.filter((claim) => claim.result === "CONFIRMED" && !claim.changeDetected).length,
      results: Object.fromEntries(verificationResults.map((result) => [result, record.claims.filter((claim) => claim.result === result).length])),
      sources: record.sources,
    })),
    changeProposals: proposals,
    unknownGuides,
    operatorNotes: [
      "Verification records are read-only evidence and do not mutate guide content.",
      "A guide is eligible for CURRENT only when every pilot claim is high-confidence CONFIRMED with no detected change.",
      "Shared claims list locales once; this pilot does not regenerate translations or measure locale drift.",
    ],
  };
}

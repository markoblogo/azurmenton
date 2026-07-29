import type { GuidePublicationPlaceMatchDecision, GuidePublicationPlanPlace, GuidePublicationPlaceTopMatch } from "@/lib/guide-check";
import type { RankedPlaceMatch } from "@/lib/guide-match";

export type GuideMatchMemorySource = {
  slug: string;
  plannedPlaces?: GuidePublicationPlanPlace[] | null;
};

export type GuideMatchMemoryRecord = {
  draftNameKey: string;
  candidateSignature: string | null;
  existingPlaceId: string | null;
  newPlaceId: string | null;
  sourceSlug: string;
};

export type GuideMatchMemory = {
  records: GuideMatchMemoryRecord[];
};

export type GuideMatchMemoryHint = {
  decision: GuidePublicationPlaceMatchDecision;
  existingPlaceId?: string | null;
  newPlaceId?: string | null;
  suggestedExistingPlaceId?: string | null;
  reason: string;
  source: "historical-signature" | "historical-name";
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’`]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function buildCandidateSignature(topMatches?: GuidePublicationPlaceTopMatch[] | RankedPlaceMatch[] | null) {
  const ids = (topMatches ?? [])
    .map((match) => ("place" in match ? match.place.id : match.id))
    .filter(Boolean)
    .slice(0, 3)
    .sort();

  return ids.length ? ids.join("|") : null;
}

export function buildGuideMatchMemory(sources: GuideMatchMemorySource[]): GuideMatchMemory {
  const records: GuideMatchMemoryRecord[] = [];

  for (const source of sources) {
    for (const plannedPlace of source.plannedPlaces ?? []) {
      if (!plannedPlace.existingPlaceId && !plannedPlace.newPlaceId) continue;

      records.push({
        draftNameKey: normalize(plannedPlace.draftName),
        candidateSignature: buildCandidateSignature(plannedPlace.topMatches),
        existingPlaceId: plannedPlace.existingPlaceId ?? null,
        newPlaceId: plannedPlace.newPlaceId ?? null,
        sourceSlug: source.slug,
      });
    }
  }

  return { records };
}

type StableResolution = {
  existingPlaceId: string | null;
  newPlaceId: string | null;
  count: number;
};

function summarizeStableResolution(records: GuideMatchMemoryRecord[]): StableResolution | null {
  if (!records.length) return null;

  const existingIds = [...new Set(records.map((record) => record.existingPlaceId).filter(Boolean))];
  const newIds = [...new Set(records.map((record) => record.newPlaceId).filter(Boolean))];

  if (existingIds.length === 1 && newIds.length === 0) {
    return {
      existingPlaceId: existingIds[0] ?? null,
      newPlaceId: null,
      count: records.length,
    };
  }

  if (existingIds.length === 0 && newIds.length === 1) {
    return {
      existingPlaceId: null,
      newPlaceId: newIds[0] ?? null,
      count: records.length,
    };
  }

  return null;
}

export function findGuideMatchMemoryHint(input: {
  draftName: string;
  rankedMatches: RankedPlaceMatch[];
  matchMemory?: GuideMatchMemory | null;
  fallbackNewPlaceId?: string | null;
}): GuideMatchMemoryHint | null {
  const records = input.matchMemory?.records ?? [];
  if (!records.length) return null;

  const draftNameKey = normalize(input.draftName);
  const currentSignature = buildCandidateSignature(input.rankedMatches);
  const currentCandidateIds = input.rankedMatches.map((match) => match.place.id);

  const signatureRecords = currentSignature
    ? records.filter((record) => record.draftNameKey === draftNameKey && record.candidateSignature === currentSignature)
    : [];
  const nameRecords = records.filter((record) => record.draftNameKey === draftNameKey);

  const signatureResolution = summarizeStableResolution(signatureRecords);
  if (signatureResolution?.existingPlaceId && currentCandidateIds.includes(signatureResolution.existingPlaceId)) {
    return {
      decision: "safe_existing",
      existingPlaceId: signatureResolution.existingPlaceId,
      suggestedExistingPlaceId: signatureResolution.existingPlaceId,
      reason: `historical-signature:${signatureResolution.count}`,
      source: "historical-signature",
    };
  }

  if (signatureResolution?.newPlaceId) {
    return {
      decision: "likely_new_place",
      newPlaceId: input.fallbackNewPlaceId ?? signatureResolution.newPlaceId,
      reason: `historical-signature-new:${signatureResolution.count}`,
      source: "historical-signature",
    };
  }

  const nameResolution = summarizeStableResolution(nameRecords);
  if (nameResolution?.existingPlaceId && currentCandidateIds.includes(nameResolution.existingPlaceId)) {
    const topCandidateId = currentCandidateIds[0];
    return {
      decision: topCandidateId === nameResolution.existingPlaceId ? "safe_existing" : "needs_human_choice",
      existingPlaceId: topCandidateId === nameResolution.existingPlaceId ? nameResolution.existingPlaceId : null,
      suggestedExistingPlaceId: nameResolution.existingPlaceId,
      reason: `historical-name:${nameResolution.count}`,
      source: "historical-name",
    };
  }

  if (nameResolution?.newPlaceId) {
    return {
      decision: "likely_new_place",
      newPlaceId: input.fallbackNewPlaceId ?? nameResolution.newPlaceId,
      reason: `historical-name-new:${nameResolution.count}`,
      source: "historical-name",
    };
  }

  return null;
}

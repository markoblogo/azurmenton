import type { GuidePublicationPlan, GuidePublicationPlanPlace } from "@/lib/guide-check";
import type { GuideIntake, GuidePlaceCandidate } from "@/lib/guide-intake";

export type PlaceSeedReference = {
  id: string;
  name: string;
  image?: string;
  requiresMapReview?: boolean;
  relatedArticleIds?: string[];
};

export type GuidePlaceMatchStatus = "existing_place" | "new_place_candidate" | "ambiguous_match";

export type GuidePlaceMatchCandidate = {
  id: string;
  name: string;
  score: number;
  reason: string;
};

export type RankedPlaceMatch = {
  place: PlaceSeedReference;
  score: number;
  reason: string;
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

function tokenize(value: string) {
  return normalize(value).split(/\s+/).filter(Boolean);
}

function tokenScore(input: string, candidate: string) {
  const inputTokens = new Set(tokenize(input));
  const candidateTokens = new Set(tokenize(candidate));
  if (!inputTokens.size || !candidateTokens.size) return 0;

  let overlap = 0;
  for (const token of inputTokens) {
    if (candidateTokens.has(token)) overlap += 1;
  }

  return overlap / Math.max(inputTokens.size, candidateTokens.size);
}

function phraseScore(input: string, candidate: string) {
  const normalizedInput = normalize(input);
  const normalizedCandidate = normalize(candidate);
  if (!normalizedInput || !normalizedCandidate) return 0;
  if (normalizedInput === normalizedCandidate) return 1;
  if (normalizedCandidate.startsWith(`${normalizedInput} `)) return 0.95;
  if (normalizedCandidate.includes(` ${normalizedInput} `)) return 0.9;
  if (normalizedCandidate.endsWith(` ${normalizedInput}`)) return 0.88;
  return tokenScore(input, candidate);
}

function extractAliases(name: string) {
  const aliases = new Set<string>([name]);
  const withoutParens = name.replace(/\(([^)]+)\)/g, " ").replace(/\s{2,}/g, " ").trim();
  if (withoutParens) aliases.add(withoutParens);

  for (const match of name.matchAll(/\(([^)]+)\)/g)) {
    const alias = match[1]?.trim();
    if (alias) aliases.add(alias);
  }

  return [...aliases];
}

function inferLocality(value: string) {
  const haystack = normalize(value);
  const known = ["menton", "monaco", "nice", "sanremo", "ventimiglia", "beausoleil", "bordighera", "dolceacqua", "eze", "roquebrune"];
  return known.find((locality) => haystack.includes(locality));
}

function roundScore(score: number) {
  return Math.round(score * 1000) / 1000;
}

export function rankPlaceMatches(input: GuidePlaceCandidate, references: PlaceSeedReference[], guideTitle?: string): RankedPlaceMatch[] {
  const aliases = extractAliases(input.name);
  const targetLocality = inferLocality(`${input.name} ${input.section ?? ""} ${guideTitle ?? ""}`);

  return references
    .map((place) => {
      let bestScore = 0;
      let reason = "token-overlap";

      for (const alias of aliases) {
        const aliasScore = phraseScore(alias, place.name);
        if (aliasScore > bestScore) {
          bestScore = aliasScore;
          reason = normalize(alias) === normalize(place.name) ? "exact-name-match" : "name-similarity";
        }

        const idScore = phraseScore(alias, place.id.replace(/-/g, " "));
        if (idScore > bestScore) {
          bestScore = idScore;
          reason = "id-similarity";
        }
      }

      if (targetLocality) {
        const placeLocality = inferLocality(`${place.id} ${place.name}`);
        if (placeLocality && placeLocality === targetLocality) {
          bestScore = Math.min(1, bestScore + 0.06);
          reason = reason === "exact-name-match" ? reason : `${reason}+locality`;
        }
      }

      return {
        place,
        score: roundScore(bestScore),
        reason,
      };
    })
    .filter((match) => match.score >= 0.2)
    .sort((a, b) => b.score - a.score || a.place.name.localeCompare(b.place.name))
    .slice(0, 3);
}

export function classifyPlaceMatch(matches: RankedPlaceMatch[]): GuidePlaceMatchStatus {
  const top = matches[0];
  const second = matches[1];
  if (!top) return "new_place_candidate";
  if (top.score >= 0.9 && (!second || top.score - second.score >= 0.1 || second.score < 0.76)) return "existing_place";
  if (top.score >= 0.6) return "ambiguous_match";
  return "new_place_candidate";
}

export function toMatchCandidates(matches: RankedPlaceMatch[]): GuidePlaceMatchCandidate[] {
  return matches.map((match) => ({
    id: match.place.id,
    name: match.place.name,
    score: match.score,
    reason: match.reason,
  }));
}

function plannedPlaceKey(place: GuidePublicationPlanPlace) {
  return normalize(place.draftName);
}

export function mergePublicationPlanWithMatches(input: {
  intake: GuideIntake;
  currentPlan: GuidePublicationPlan | null;
  seededPlan: GuidePublicationPlan;
}): GuidePublicationPlan {
  const currentPlan = input.currentPlan ?? {};
  const seededByDraft = new Map((input.seededPlan.plannedPlaces ?? []).map((place) => [plannedPlaceKey(place), place]));

  const mergedPlaces: GuidePublicationPlanPlace[] = input.intake.placeCandidates.map((candidate) => {
    const seeded = seededByDraft.get(normalize(candidate.name));
    const existing = (currentPlan.plannedPlaces ?? []).find((place) => plannedPlaceKey(place) === normalize(candidate.name));

    if (!seeded && !existing) {
      return {
        draftName: candidate.name,
      };
    }

    return {
      ...(seeded ?? {}),
      ...(existing ?? {}),
      draftName: candidate.name,
      suggestedExistingPlaceId: seeded?.suggestedExistingPlaceId ?? existing?.suggestedExistingPlaceId ?? null,
      matchStatus: seeded?.matchStatus ?? existing?.matchStatus ?? null,
      matchReason: seeded?.matchReason ?? existing?.matchReason ?? null,
      topMatches: seeded?.topMatches ?? existing?.topMatches ?? null,
      existingPlaceId: existing?.existingPlaceId ?? seeded?.existingPlaceId ?? null,
      newPlaceId: existing?.newPlaceId ?? seeded?.newPlaceId ?? null,
      imageStatus: existing?.imageStatus ?? seeded?.imageStatus ?? null,
      assetPath: existing?.assetPath ?? seeded?.assetPath ?? null,
      assetFileName: existing?.assetFileName ?? seeded?.assetFileName ?? null,
      requiresMapReview: existing?.requiresMapReview ?? seeded?.requiresMapReview ?? null,
      mapAction: existing?.mapAction ?? seeded?.mapAction ?? null,
      coverageGuideSlug: existing?.coverageGuideSlug ?? seeded?.coverageGuideSlug ?? null,
    };
  });

  return {
    ...input.seededPlan,
    ...currentPlan,
    slug: input.seededPlan.slug ?? currentPlan.slug ?? input.intake.slug,
    plannedPlaces: mergedPlaces,
    publishedOn: currentPlan.publishedOn ?? input.seededPlan.publishedOn ?? null,
    category: currentPlan.category ?? input.seededPlan.category ?? null,
    coverImageStatus: currentPlan.coverImageStatus ?? input.seededPlan.coverImageStatus ?? null,
    assetsDirectory: currentPlan.assetsDirectory ?? input.seededPlan.assetsDirectory ?? null,
    coverAssetPath: currentPlan.coverAssetPath ?? input.seededPlan.coverAssetPath ?? null,
    coverAssetFileName: currentPlan.coverAssetFileName ?? input.seededPlan.coverAssetFileName ?? null,
    relatedPlaceIds: currentPlan.relatedPlaceIds?.length ? currentPlan.relatedPlaceIds : input.seededPlan.relatedPlaceIds,
    relatedArticleSlugs: currentPlan.relatedArticleSlugs?.length ? currentPlan.relatedArticleSlugs : input.seededPlan.relatedArticleSlugs,
    relatedApartmentSlugs: currentPlan.relatedApartmentSlugs?.length ? currentPlan.relatedApartmentSlugs : input.seededPlan.relatedApartmentSlugs,
    canonicalGuideForPlaces: currentPlan.canonicalGuideForPlaces ?? input.seededPlan.canonicalGuideForPlaces,
  };
}

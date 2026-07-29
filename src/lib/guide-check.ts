import type { GuideCategory } from "@/content/guide";
import type { GuideIntake } from "@/lib/guide-intake";

export type GuideReference = {
  slug: string;
  title: string;
  publishedOn?: string;
};

export type PlaceReference = {
  id: string;
  name: string;
  type?: string;
  image?: string;
  requiresMapReview?: boolean;
  relatedArticleIds?: string[];
  guideCoverageSlugs?: string[];
};

export type GuidePublicationCategory = GuideCategory | "";
export type GuidePublicationImageStatus = "provided" | "pending" | "existing" | "not_needed";
export type GuidePublicationMapAction = "point" | "exclude" | "not_needed";
export type GuidePublicationPlaceMatchStatus = "existing_place" | "new_place_candidate" | "ambiguous_match";
export type GuidePublicationPlaceMatchDecision = "safe_existing" | "needs_human_choice" | "likely_new_place";
export type GuidePublicationPlaceTopMatch = {
  id: string;
  name: string;
  score: number;
  reason?: string;
};

export type GuidePublicationPlanPlace = {
  draftName: string;
  existingPlaceId?: string | null;
  newPlaceId?: string | null;
  suggestedExistingPlaceId?: string | null;
  matchStatus?: GuidePublicationPlaceMatchStatus | null;
  matchDecision?: GuidePublicationPlaceMatchDecision | null;
  matchReason?: string | null;
  topMatches?: GuidePublicationPlaceTopMatch[] | null;
  imageStatus?: GuidePublicationImageStatus | null;
  assetPath?: string | null;
  assetFileName?: string | null;
  requiresMapReview?: boolean | null;
  mapAction?: GuidePublicationMapAction | null;
  coverageGuideSlug?: string | null;
};

export type GuideLinkPlanPriority = "required" | "recommended" | "noise-risk";

export type GuidePublicationLinkSuggestion = {
  slug: string;
  priority: GuideLinkPlanPriority;
  source: string;
  reason: string;
  score?: number;
};

export type GuidePublicationBacklinkSuggestion = {
  draftName: string;
  existingPlaceId?: string | null;
  newPlaceId?: string | null;
  priority: GuideLinkPlanPriority;
  action: "add-related-article" | "already-linked" | "defer-until-place-created" | "skip";
  reason: string;
};

export type GuidePublicationCoverageSuggestion = {
  draftName: string;
  existingPlaceId?: string | null;
  newPlaceId?: string | null;
  priority: GuideLinkPlanPriority;
  action: "set-coverage-guide" | "already-covered" | "defer-until-place-created" | "skip";
  coverageGuideSlug: string;
  reason: string;
};

export type GuidePublicationLinkPlan = {
  matchedClusterIds: string[];
  matchedCollectionIds: string[];
  relatedArticles: GuidePublicationLinkSuggestion[];
  relatedApartments: GuidePublicationLinkSuggestion[];
  backlinkObligations: GuidePublicationBacklinkSuggestion[];
  specialistCoverageUpdates: GuidePublicationCoverageSuggestion[];
  autoAppliedRelatedArticles: string[];
  autoAppliedRelatedApartments: string[];
};

export type GuidePublicationPlan = {
  slug?: string | null;
  publishedOn?: string | null;
  category?: GuidePublicationCategory | null;
  coverImageStatus?: GuidePublicationImageStatus | null;
  assetsDirectory?: string | null;
  coverAssetPath?: string | null;
  coverAssetFileName?: string | null;
  relatedPlaceIds?: string[];
  relatedArticleSlugs?: string[];
  relatedApartmentSlugs?: string[];
  canonicalGuideForPlaces?: boolean;
  plannedPlaces?: GuidePublicationPlanPlace[];
  linkPlan?: GuidePublicationLinkPlan;
};

export type GuideCheckIssue = {
  severity: "error" | "warning";
  code: string;
  message: string;
};

export type GuideMatchSuggestion = {
  input: string;
  matches: { slug: string; title: string; score: number }[];
};

export type PlaceMatchSuggestion = {
  input: string;
  matches: { id: string; name: string; score: number }[];
};

export type GuideCheckReport = {
  slug: string;
  ok: boolean;
  errors: GuideCheckIssue[];
  warnings: GuideCheckIssue[];
  relatedGuideSuggestions: GuideMatchSuggestion[];
  placeSuggestions: PlaceMatchSuggestion[];
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

function isKebabCase(value: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

function isIsoDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
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

function topGuideMatches(input: string, references: GuideReference[]) {
  return references
    .map((reference) => ({ ...reference, score: tokenScore(input, reference.title) }))
    .filter((reference) => reference.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

function topPlaceMatches(input: string, references: PlaceReference[]) {
  return references
    .map((reference) => ({ ...reference, score: tokenScore(input, reference.name) }))
    .filter((reference) => reference.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

function guideRequiresApartmentCta(category: GuidePublicationCategory | null | undefined, slug: string) {
  if (category === "practical" || category === "beaches" || category === "with-children" || category === "day-trips") {
    return true;
  }

  return ["where-to-stay", "without-a-car", "stay-cool", "airport", "public-transport", "beaches"].some((token) => slug.includes(token));
}

export function buildGuideCheckReport(
  intake: GuideIntake,
  guides: GuideReference[],
  places: PlaceReference[],
  options?: {
    coverExists?: boolean;
    publicationPlan?: GuidePublicationPlan | null;
    apartmentSlugs?: string[];
    mapPointPlaceIds?: string[];
    mapExclusionPlaceIds?: string[];
  },
): GuideCheckReport {
  const errors: GuideCheckIssue[] = [];
  const warnings: GuideCheckIssue[] = [];
  const guideSlugSet = new Set(guides.map((guide) => guide.slug));
  const placeIdSet = new Set(places.map((place) => place.id));
  const apartmentSlugSet = new Set(options?.apartmentSlugs ?? []);
  const mapPointPlaceIds = new Set(options?.mapPointPlaceIds ?? []);
  const mapExclusionPlaceIds = new Set(options?.mapExclusionPlaceIds ?? []);
  const placeById = new Map(places.map((place) => [place.id, place]));
  const publicationPlan = options?.publicationPlan;

  if (!intake.title.trim()) errors.push({ severity: "error", code: "missing-title", message: "Draft title is missing." });
  if (!intake.slug.trim()) errors.push({ severity: "error", code: "missing-slug", message: "Suggested slug is missing." });
  if (intake.slug && !isKebabCase(intake.slug)) errors.push({ severity: "error", code: "invalid-slug", message: `Slug is not kebab-case: ${intake.slug}` });
  if (!intake.seoTitle?.trim()) errors.push({ severity: "error", code: "missing-seo-title", message: "SEO title is missing." });
  if (!intake.metaDescription?.trim()) errors.push({ severity: "error", code: "missing-meta-description", message: "Meta description is missing." });
  if (intake.coverPathHint && options?.coverExists === false && publicationPlan?.coverImageStatus !== "not_needed") {
    errors.push({ severity: "error", code: "missing-cover-file", message: `Cover path does not exist: ${intake.coverPathHint}` });
  }

  if (!publicationPlan) {
    errors.push({ severity: "error", code: "missing-publication-plan", message: "publication-plan.json is missing for this draft." });
  } else {
    if (!publicationPlan.publishedOn) {
      errors.push({ severity: "error", code: "missing-published-on", message: "publication-plan.json must define publishedOn." });
    } else if (!isIsoDate(publicationPlan.publishedOn)) {
      errors.push({ severity: "error", code: "invalid-published-on", message: `publishedOn must use YYYY-MM-DD: ${publicationPlan.publishedOn}` });
    }

    if (!publicationPlan.category) {
      errors.push({ severity: "error", code: "missing-category", message: "publication-plan.json must define the guide category." });
    }

    if (!publicationPlan.coverImageStatus) {
      errors.push({ severity: "error", code: "missing-cover-image-status", message: "publication-plan.json must define coverImageStatus." });
    } else if (publicationPlan.coverImageStatus === "provided" && options?.coverExists === false) {
      errors.push({ severity: "error", code: "cover-marked-provided-without-file", message: "Cover is marked as provided but the source cover file is missing." });
    }

    for (const slug of publicationPlan.relatedArticleSlugs ?? []) {
      if (!guideSlugSet.has(slug)) {
        errors.push({ severity: "error", code: "unresolved-related-article", message: `relatedArticleSlugs contains unknown guide slug: ${slug}` });
      }
    }

    for (const id of publicationPlan.relatedPlaceIds ?? []) {
      if (!placeIdSet.has(id)) {
        errors.push({ severity: "error", code: "unresolved-related-place", message: `relatedPlaceIds contains unknown place id: ${id}` });
      }
    }

    for (const slug of publicationPlan.relatedApartmentSlugs ?? []) {
      if (!apartmentSlugSet.has(slug)) {
        errors.push({ severity: "error", code: "unresolved-related-apartment", message: `relatedApartmentSlugs contains unknown apartment slug: ${slug}` });
      }
    }

    if (guideRequiresApartmentCta(publicationPlan.category, intake.slug) && !(publicationPlan.relatedApartmentSlugs ?? []).length) {
      errors.push({
        severity: "error",
        code: "missing-apartment-cta",
        message: "This guide pattern requires relatedApartmentSlugs before publication.",
      });
    }

    if (!(publicationPlan.relatedArticleSlugs ?? []).length) {
      warnings.push({ severity: "warning", code: "no-related-articles-planned", message: "publication-plan.json has no relatedArticleSlugs yet." });
    }

    if (!(publicationPlan.relatedPlaceIds ?? []).length && !(publicationPlan.plannedPlaces ?? []).length) {
      warnings.push({ severity: "warning", code: "no-related-places-planned", message: "publication-plan.json has no related places or planned new places yet." });
    }

    const latestPublishedOn = guides
      .filter((guide) => guide.slug !== intake.slug && guide.publishedOn && isIsoDate(guide.publishedOn))
      .map((guide) => guide.publishedOn as string)
      .sort()
      .at(-1);

    if (publicationPlan.publishedOn && isIsoDate(publicationPlan.publishedOn) && latestPublishedOn && publicationPlan.publishedOn < latestPublishedOn) {
      warnings.push({
        severity: "warning",
        code: "not-latest-landing-slot",
        message: `publishedOn ${publicationPlan.publishedOn} is older than current latest guide date ${latestPublishedOn}; this draft will not take the landing NEW slot.`,
      });
    }

    const seenPlanPlaceKeys = new Set<string>();
    for (const plannedPlace of publicationPlan.plannedPlaces ?? []) {
      const identityKey = plannedPlace.existingPlaceId ?? plannedPlace.newPlaceId ?? normalize(plannedPlace.draftName);
      if (seenPlanPlaceKeys.has(identityKey)) {
        warnings.push({ severity: "warning", code: "duplicate-planned-place", message: `Duplicate planned place entry: ${plannedPlace.draftName}` });
      }
      seenPlanPlaceKeys.add(identityKey);

      if (!plannedPlace.imageStatus) {
        errors.push({ severity: "error", code: "missing-place-image-status", message: `Place ${plannedPlace.draftName} is missing imageStatus in publication-plan.json.` });
      }

      if (!plannedPlace.existingPlaceId && !plannedPlace.newPlaceId) {
        errors.push({ severity: "error", code: "unresolved-planned-place", message: `Place ${plannedPlace.draftName} must declare existingPlaceId or newPlaceId.` });
      }

      if (plannedPlace.matchDecision === "safe_existing" && !plannedPlace.existingPlaceId) {
        errors.push({
          severity: "error",
          code: "safe-existing-without-id",
          message: `Place ${plannedPlace.draftName} is marked safe_existing but has no existingPlaceId.`,
        });
      }

      if (plannedPlace.matchDecision === "likely_new_place" && !plannedPlace.newPlaceId) {
        errors.push({
          severity: "error",
          code: "likely-new-without-id",
          message: `Place ${plannedPlace.draftName} is marked likely_new_place but has no newPlaceId.`,
        });
      }

      if (
        (plannedPlace.matchDecision === "needs_human_choice" || plannedPlace.matchStatus === "ambiguous_match") &&
        !plannedPlace.existingPlaceId &&
        !plannedPlace.newPlaceId
      ) {
        const suggested = plannedPlace.topMatches?.[0];
        warnings.push({
          severity: "warning",
          code: "ambiguous-place-match",
          message: suggested
            ? `Place ${plannedPlace.draftName} has an ambiguous existing match. Top suggestion: ${suggested.id} (${suggested.score}).`
            : `Place ${plannedPlace.draftName} has an ambiguous existing match and still needs manual resolution.`,
        });
      }

      if (plannedPlace.existingPlaceId && !placeIdSet.has(plannedPlace.existingPlaceId)) {
        errors.push({ severity: "error", code: "unknown-existing-place", message: `Place ${plannedPlace.draftName} references unknown existingPlaceId ${plannedPlace.existingPlaceId}.` });
      }

      if (plannedPlace.suggestedExistingPlaceId && !placeIdSet.has(plannedPlace.suggestedExistingPlaceId)) {
        errors.push({ severity: "error", code: "unknown-suggested-place", message: `Place ${plannedPlace.draftName} references unknown suggestedExistingPlaceId ${plannedPlace.suggestedExistingPlaceId}.` });
      }

      if (plannedPlace.newPlaceId && !isKebabCase(plannedPlace.newPlaceId)) {
        errors.push({ severity: "error", code: "invalid-new-place-id", message: `Place ${plannedPlace.draftName} has non-kebab newPlaceId ${plannedPlace.newPlaceId}.` });
      }

      if (plannedPlace.requiresMapReview && !plannedPlace.mapAction) {
        errors.push({ severity: "error", code: "missing-map-action", message: `Place ${plannedPlace.draftName} requires map review but has no mapAction.` });
      }

      if (plannedPlace.requiresMapReview && plannedPlace.mapAction !== "not_needed" && !plannedPlace.existingPlaceId && !plannedPlace.newPlaceId) {
        errors.push({ severity: "error", code: "missing-map-place-id", message: `Place ${plannedPlace.draftName} needs a stable place id before map review can be completed.` });
      }

      if (publicationPlan.canonicalGuideForPlaces && plannedPlace.coverageGuideSlug !== intake.slug) {
        errors.push({
          severity: "error",
          code: "missing-coverage-guide-slug",
          message: `Place ${plannedPlace.draftName} must declare coverageGuideSlug=${intake.slug} for this specialist guide.`,
        });
      }

      if (plannedPlace.existingPlaceId) {
        const existingPlace = placeById.get(plannedPlace.existingPlaceId);
        if (existingPlace && !existingPlace.image && plannedPlace.imageStatus === "pending") {
          warnings.push({
            severity: "warning",
            code: "existing-place-still-missing-image",
            message: `Existing place ${plannedPlace.existingPlaceId} still has no image; plan an illustration package or keep the placeholder intentionally.`,
          });
        }

        if (existingPlace && !existingPlace.image && plannedPlace.imageStatus === "existing") {
          errors.push({
            severity: "error",
            code: "existing-place-image-expected",
            message: `Place ${plannedPlace.existingPlaceId} is marked as already covered by an existing repo image, but the current place record has no image.`,
          });
        }

        if (existingPlace?.requiresMapReview && !mapPointPlaceIds.has(plannedPlace.existingPlaceId) && !mapExclusionPlaceIds.has(plannedPlace.existingPlaceId)) {
          errors.push({
            severity: "error",
            code: "existing-place-missing-map-coverage",
            message: `Existing place ${plannedPlace.existingPlaceId} requires map review but has neither a reviewed point nor an exclusion.`,
          });
        }

        if (
          publicationPlan.canonicalGuideForPlaces &&
          existingPlace &&
          (!existingPlace.relatedArticleIds?.includes(intake.slug) || !existingPlace.guideCoverageSlugs?.includes(intake.slug))
        ) {
          warnings.push({
            severity: "warning",
            code: "existing-place-needs-backlink-update",
            message: `Existing place ${plannedPlace.existingPlaceId} still needs relatedArticleIds/guideCoverageSlugs updated for ${intake.slug}.`,
          });
        }
      }
    }
  }

  const existingGuide = guides.find((guide) => guide.slug === intake.slug);
  if (existingGuide) {
    warnings.push({ severity: "warning", code: "existing-guide-slug", message: `Guide slug already exists in content: ${intake.slug}` });
  }

  if (!intake.sectionHeadings.length) {
    warnings.push({ severity: "warning", code: "no-sections", message: "No section headings were detected in the draft." });
  }

  if (!intake.placeCandidates.length) {
    warnings.push({ severity: "warning", code: "no-place-candidates", message: "No place candidates were detected in the draft." });
  }

  const duplicatePlaces = new Set<string>();
  const seenPlaces = new Set<string>();
  for (const candidate of intake.placeCandidates) {
    const key = normalize(candidate.name);
    if (seenPlaces.has(key)) duplicatePlaces.add(candidate.name);
    seenPlaces.add(key);
  }
  for (const duplicate of duplicatePlaces) {
    warnings.push({ severity: "warning", code: "duplicate-place-candidate", message: `Duplicate place candidate in draft: ${duplicate}` });
  }

  const relatedGuideSuggestions = intake.relatedGuideTitles.map((title) => ({
    input: title,
    matches: topGuideMatches(title, guides),
  }));

  for (const suggestion of relatedGuideSuggestions) {
    if (!suggestion.matches.length) {
      warnings.push({ severity: "warning", code: "unresolved-related-guide", message: `No related guide match found for: ${suggestion.input}` });
    }
  }

  const placeSuggestions = intake.placeCandidates.map((candidate) => ({
    input: candidate.name,
    matches: topPlaceMatches(candidate.name, places),
  }));

  if (publicationPlan?.relatedPlaceIds?.length) {
    for (const relatedPlaceId of publicationPlan.relatedPlaceIds) {
      const place = placeById.get(relatedPlaceId);
      if (place && !place.image) {
        warnings.push({
          severity: "warning",
          code: "related-place-missing-image",
          message: `Related place ${relatedPlaceId} has no image yet; verify that the placeholder is intentional before publication.`,
        });
      }
    }
  }

  return {
    slug: intake.slug,
    ok: errors.length === 0,
    errors,
    warnings,
    relatedGuideSuggestions,
    placeSuggestions,
  };
}

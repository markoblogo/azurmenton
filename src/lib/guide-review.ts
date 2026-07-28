import type { GuidePublicationPlan } from "@/lib/guide-check";

export type GuideReviewGuideReference = {
  slug: string;
  publishedOn?: string;
  category?: string;
  relatedPlaces?: string[];
  relatedArticles?: string[];
  relatedApartments?: string[];
  sections: Array<{ relatedPlaceIds?: string[] }>;
};

export type GuideReviewPlaceReference = {
  id: string;
  relatedArticleIds: string[];
  guideCoverageSlugs?: string[];
  requiresMapReview?: boolean;
  image?: string;
};

export type GuideReviewMapPointReference = {
  placeId: string;
  review?: {
    sourceUrl?: string;
    checkedOn?: string;
  };
};

export type GuideReviewMapExclusionReference = {
  placeId: string;
};

export type GuideReviewIssue = {
  severity: "error" | "warning";
  code: string;
  message: string;
};

export type GuideReviewPlaceStatus = {
  placeId: string;
  draftName: string;
  present: boolean;
  renderedByGuide: boolean;
  backlinkOk: boolean;
  coverageOk: boolean;
  mapOk: boolean;
};

export type GuideReviewReport = {
  slug: string;
  ok: boolean;
  errors: GuideReviewIssue[];
  warnings: GuideReviewIssue[];
  guide: {
    present: boolean;
    publishedOnOk: boolean;
    categoryOk: boolean;
    relatedArticlesOk: boolean;
    relatedApartmentsOk: boolean;
    relatedPlacesOk: boolean;
  };
  places: GuideReviewPlaceStatus[];
  summary: {
    plannedPlaceCount: number;
    reviewedPlaceCount: number;
    mapSatisfiedCount: number;
  };
};

function unique(values: string[]) {
  return [...new Set(values)];
}

function guideRenderedPlaceIds(guide: GuideReviewGuideReference) {
  return new Set(unique([...(guide.relatedPlaces ?? []), ...guide.sections.flatMap((section) => section.relatedPlaceIds ?? [])]));
}

export function buildGuideReviewReport(input: {
  slug: string;
  publicationPlan: GuidePublicationPlan;
  guides: GuideReviewGuideReference[];
  places: GuideReviewPlaceReference[];
  mapPoints: GuideReviewMapPointReference[];
  mapExclusions: GuideReviewMapExclusionReference[];
}): GuideReviewReport {
  const errors: GuideReviewIssue[] = [];
  const warnings: GuideReviewIssue[] = [];
  const guide = input.guides.find((item) => item.slug === input.slug);
  const placeById = new Map(input.places.map((place) => [place.id, place]));
  const pointById = new Map(input.mapPoints.map((point) => [point.placeId, point]));
  const exclusionIds = new Set(input.mapExclusions.map((exclusion) => exclusion.placeId));
  const plannedPlaces = input.publicationPlan.plannedPlaces ?? [];
  const plannedPlaceIds = plannedPlaces.map((plannedPlace) => plannedPlace.existingPlaceId ?? plannedPlace.newPlaceId).filter(Boolean) as string[];

  if (!guide) {
    errors.push({
      severity: "error",
      code: "missing-guide-article",
      message: `Guide slug ${input.slug} is not present in src/content/guide.ts.`,
    });
  }

  const renderedPlaceIds = guide ? guideRenderedPlaceIds(guide) : new Set<string>();
  const expectedGuidePlaceIds = unique([...(input.publicationPlan.relatedPlaceIds ?? []), ...plannedPlaceIds]);

  let publishedOnOk = false;
  let categoryOk = false;
  let relatedArticlesOk = false;
  let relatedApartmentsOk = false;
  let relatedPlacesOk = false;

  if (guide) {
    publishedOnOk = !input.publicationPlan.publishedOn || guide.publishedOn === input.publicationPlan.publishedOn;
    categoryOk = !input.publicationPlan.category || guide.category === input.publicationPlan.category;
    relatedArticlesOk = (input.publicationPlan.relatedArticleSlugs ?? []).every((slug) => guide.relatedArticles?.includes(slug));
    relatedApartmentsOk = (input.publicationPlan.relatedApartmentSlugs ?? []).every((slug) => guide.relatedApartments?.includes(slug));
    relatedPlacesOk = expectedGuidePlaceIds.every((placeId) => renderedPlaceIds.has(placeId));

    if (!publishedOnOk) {
      errors.push({
        severity: "error",
        code: "guide-published-on-mismatch",
        message: `Guide ${input.slug} does not carry publishedOn ${input.publicationPlan.publishedOn}.`,
      });
    }

    if (!categoryOk) {
      errors.push({
        severity: "error",
        code: "guide-category-mismatch",
        message: `Guide ${input.slug} does not carry category ${input.publicationPlan.category}.`,
      });
    }

    if (!relatedArticlesOk) {
      errors.push({
        severity: "error",
        code: "guide-related-articles-missing",
        message: `Guide ${input.slug} is missing one or more planned relatedArticles links.`,
      });
    }

    if (!relatedApartmentsOk) {
      errors.push({
        severity: "error",
        code: "guide-related-apartments-missing",
        message: `Guide ${input.slug} is missing one or more planned relatedApartments links.`,
      });
    }

    if (!relatedPlacesOk) {
      errors.push({
        severity: "error",
        code: "guide-related-places-missing",
        message: `Guide ${input.slug} does not render one or more planned place ids.`,
      });
    }
  }

  const placeStatuses: GuideReviewPlaceStatus[] = plannedPlaces.map((plannedPlace) => {
    const placeId = (plannedPlace.existingPlaceId ?? plannedPlace.newPlaceId) as string | undefined;
    const place = placeId ? placeById.get(placeId) : undefined;
    const renderedByGuide = placeId ? renderedPlaceIds.has(placeId) : false;
    const backlinkOk = placeId ? Boolean(place?.relatedArticleIds.includes(input.slug)) : false;
    const expectedCoverageSlug = plannedPlace.coverageGuideSlug ?? (input.publicationPlan.canonicalGuideForPlaces ? input.slug : null);
    const coverageOk = expectedCoverageSlug ? Boolean(place?.guideCoverageSlugs?.includes(expectedCoverageSlug)) : true;

    let mapOk = true;
    if (plannedPlace.requiresMapReview && placeId) {
      if (plannedPlace.mapAction === "point") {
        mapOk = Boolean(pointById.get(placeId)?.review?.sourceUrl);
      } else if (plannedPlace.mapAction === "exclude") {
        mapOk = exclusionIds.has(placeId);
      } else if (plannedPlace.mapAction === "not_needed") {
        mapOk = true;
      } else {
        mapOk = false;
      }
    }

    if (!placeId) {
      errors.push({
        severity: "error",
        code: "review-place-id-missing",
        message: `Planned place ${plannedPlace.draftName} still has no stable place id.`,
      });
    } else if (!place) {
      errors.push({
        severity: "error",
        code: "review-place-missing",
        message: `Planned place ${placeId} is not present in src/content/places.ts.`,
      });
    } else {
      if (!renderedByGuide) {
        errors.push({
          severity: "error",
          code: "review-place-not-rendered",
          message: `Guide ${input.slug} does not render place ${placeId}.`,
        });
      }

      if (!backlinkOk) {
        errors.push({
          severity: "error",
          code: "review-backlink-missing",
          message: `Place ${placeId} is missing relatedArticleIds backlink to ${input.slug}.`,
        });
      }

      if (!coverageOk) {
        errors.push({
          severity: "error",
          code: "review-coverage-missing",
          message: `Place ${placeId} is missing guideCoverageSlugs for ${expectedCoverageSlug}.`,
        });
      }

      if (!mapOk) {
        errors.push({
          severity: "error",
          code: "review-map-obligation-missing",
          message: `Place ${placeId} is missing its planned map point or exclusion.`,
        });
      }

      if (plannedPlace.imageStatus === "pending" && !place.image) {
        warnings.push({
          severity: "warning",
          code: "review-place-image-still-pending",
          message: `Place ${placeId} still has no image resolved after insertion.`,
        });
      }
    }

    return {
      placeId: placeId ?? "missing-place-id",
      draftName: plannedPlace.draftName,
      present: Boolean(place),
      renderedByGuide,
      backlinkOk,
      coverageOk,
      mapOk,
    };
  });

  return {
    slug: input.slug,
    ok: errors.length === 0,
    errors,
    warnings,
    guide: {
      present: Boolean(guide),
      publishedOnOk,
      categoryOk,
      relatedArticlesOk,
      relatedApartmentsOk,
      relatedPlacesOk,
    },
    places: placeStatuses,
    summary: {
      plannedPlaceCount: plannedPlaces.length,
      reviewedPlaceCount: placeStatuses.filter((place) => place.present).length,
      mapSatisfiedCount: placeStatuses.filter((place) => place.mapOk).length,
    },
  };
}

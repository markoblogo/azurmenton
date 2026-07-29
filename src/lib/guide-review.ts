import type { GuidePublicationPlan } from "@/lib/guide-check";

export type GuideReviewGuideReference = {
  slug: string;
  publishedOn?: string;
  category?: string;
  coverImage?: string;
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
  visualHandoff: {
    expectsLatestGuideSlot: boolean;
    inLatestGuideSlot: boolean;
    latestGuideSlug: string | null;
    localeSpotCheckUrls: string[];
    landingGuideUrl: string;
    coverExpected: boolean;
    coverResolved: boolean;
    placeImageChecks: Array<{
      placeId: string;
      draftName: string;
      expected: boolean;
      resolved: boolean;
    }>;
  };
  summary: {
    plannedPlaceCount: number;
    reviewedPlaceCount: number;
    mapSatisfiedCount: number;
  };
  operator: {
    status: "ok" | "needs-fix";
    headline: string;
    counts: {
      errors: number;
      warnings: number;
      reviewedPlaces: number;
      mapSatisfied: number;
    };
    inserted: string[];
    openItems: string[];
    ownerVisualCheck: string[];
    localeSpotChecks: string[];
  };
};

function unique(values: string[]) {
  return [...new Set(values)];
}

function guideRenderedPlaceIds(guide: GuideReviewGuideReference) {
  return new Set(unique([...(guide.relatedPlaces ?? []), ...guide.sections.flatMap((section) => section.relatedPlaceIds ?? [])]));
}

function getLatestGuideSlug(guides: GuideReviewGuideReference[]) {
  const published = guides
    .map((guide, index) => ({ guide, index }))
    .filter(({ guide }) => Boolean(guide.publishedOn));

  if (!published.length) return null;

  return published.reduce((latest, candidate) => {
    const latestDate = latest.guide.publishedOn ?? "";
    const candidateDate = candidate.guide.publishedOn ?? "";
    if (candidateDate > latestDate) return candidate;
    if (candidateDate === latestDate && candidate.index > latest.index) return candidate;
    return latest;
  }).guide.slug;
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
  const latestGuideSlug = getLatestGuideSlug(input.guides);

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

  const coverExpected = input.publicationPlan.coverImageStatus === "provided";
  const coverResolved = Boolean(guide?.coverImage);
  const visualPlaceChecks = placeStatuses.map((placeStatus) => {
    const plannedPlace = plannedPlaces.find(
      (place) => (place.existingPlaceId ?? place.newPlaceId ?? "missing-place-id") === placeStatus.placeId,
    );
    const place = placeById.get(placeStatus.placeId);
    const expected = plannedPlace?.imageStatus === "provided" || plannedPlace?.imageStatus === "existing";
    return {
      placeId: placeStatus.placeId,
      draftName: placeStatus.draftName,
      expected,
      resolved: Boolean(place?.image),
    };
  });

  const plannedPublishedOn = input.publicationPlan.publishedOn ?? null;
  const expectsLatestGuideSlot = Boolean(
    plannedPublishedOn &&
      input.guides.filter((item) => item.slug !== input.slug).every((item) => !item.publishedOn || item.publishedOn <= plannedPublishedOn),
  );

  if (coverExpected && !coverResolved) {
    errors.push({
      severity: "error",
      code: "review-guide-cover-missing",
      message: `Guide ${input.slug} expected a cover image but none is resolved on the published guide record.`,
    });
  }

  if (expectsLatestGuideSlot && latestGuideSlug !== input.slug) {
    warnings.push({
      severity: "warning",
      code: "review-latest-guide-slot-mismatch",
      message: `Guide ${input.slug} should occupy the landing NEW slot but latest guide logic currently resolves to ${latestGuideSlug ?? "n/a"}.`,
    });
  }

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
    visualHandoff: {
      expectsLatestGuideSlot,
      inLatestGuideSlot: latestGuideSlug === input.slug,
      latestGuideSlug,
      localeSpotCheckUrls: ["en", "fr", "it", "uk"].map((locale) => `/${locale}/guide/${input.slug}`),
      landingGuideUrl: "/en/guide",
      coverExpected,
      coverResolved,
      placeImageChecks: visualPlaceChecks,
    },
    summary: {
      plannedPlaceCount: plannedPlaces.length,
      reviewedPlaceCount: placeStatuses.filter((place) => place.present).length,
      mapSatisfiedCount: placeStatuses.filter((place) => place.mapOk).length,
    },
    operator: {
      status: errors.length === 0 ? "ok" : "needs-fix",
      headline:
        errors.length === 0
          ? `Post-merge review looks good for ${input.slug}. Guide graph, backlinks and map obligations are aligned.`
          : `Post-merge review still has ${errors.length} error${errors.length === 1 ? "" : "s"} for ${input.slug}.`,
      counts: {
        errors: errors.length,
        warnings: warnings.length,
        reviewedPlaces: placeStatuses.filter((place) => place.present).length,
        mapSatisfied: placeStatuses.filter((place) => place.mapOk).length,
      },
      inserted: [
        guide ? `Guide article present in src/content/guide.ts.` : `Guide article not yet present in src/content/guide.ts.`,
        ...placeStatuses
          .filter((place) => place.present)
          .slice(0, 5)
          .map((place) => `Place present: ${place.placeId}.`),
      ].slice(0, 6),
      openItems: [
        ...errors.slice(0, 5).map((issue) => `[${issue.code}] ${issue.message}`),
        ...(errors.length === 0 ? warnings.slice(0, 3).map((issue) => `[${issue.code}] ${issue.message}`) : []),
      ],
      ownerVisualCheck: [
        `Open ${`/en/guide/${input.slug}`} and confirm cover correctness.`,
        `Open build/guide-intake/${input.slug}/review/owner-checklist.md for the full visual checklist.`,
        guide && latestGuideSlug
          ? `Check guide landing NEW-slot expectation on /en/guide (${guide.publishedOn === input.publicationPlan.publishedOn ? "same-date/latest logic applies" : `latest guide is ${latestGuideSlug}`}).`
          : `Check guide landing position on /en/guide.`,
      ],
      localeSpotChecks: [
        ...["en", "fr", "it", "uk"].map((locale) => `/${locale}/guide/${input.slug}`),
      ],
    },
  };
}

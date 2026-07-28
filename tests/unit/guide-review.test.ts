import { describe, expect, it } from "vitest";

import { buildGuideReviewReport } from "../../src/lib/guide-review";
import type { GuidePublicationPlan } from "../../src/lib/guide-check";

function makePublicationPlan(): GuidePublicationPlan {
  return {
    publishedOn: "2026-07-28",
    category: "food-markets",
    relatedPlaceIds: ["alls-stars-menton"],
    relatedArticleSlugs: ["best-pizzerias-menton"],
    relatedApartmentSlugs: ["sea-view-balcony-studio"],
    canonicalGuideForPlaces: true,
    plannedPlaces: [
      {
        draftName: "All's Stars",
        existingPlaceId: "alls-stars-menton",
        imageStatus: "provided",
        requiresMapReview: true,
        mapAction: "point",
        coverageGuideSlug: "burgers-menton",
      },
    ],
  };
}

describe("guide review report", () => {
  it("passes when the inserted guide graph matches the publication plan", () => {
    const report = buildGuideReviewReport({
      slug: "burgers-menton",
      publicationPlan: makePublicationPlan(),
      guides: [
        {
          slug: "burgers-menton",
          publishedOn: "2026-07-28",
          category: "food-markets",
          relatedPlaces: ["alls-stars-menton"],
          relatedArticles: ["best-pizzerias-menton"],
          relatedApartments: ["sea-view-balcony-studio"],
          sections: [],
        },
      ],
      places: [
        {
          id: "alls-stars-menton",
          relatedArticleIds: ["burgers-menton"],
          guideCoverageSlugs: ["burgers-menton"],
          requiresMapReview: true,
        },
      ],
      mapPoints: [
        {
          placeId: "alls-stars-menton",
          review: { sourceUrl: "https://example.com", checkedOn: "2026-07-28" },
        },
      ],
      mapExclusions: [],
    });

    expect(report.ok).toBe(true);
    expect(report.errors).toEqual([]);
    expect(report.guide.relatedPlacesOk).toBe(true);
    expect(report.places[0]?.backlinkOk).toBe(true);
  });

  it("fails when the guide, place backlink and map obligations are missing", () => {
    const report = buildGuideReviewReport({
      slug: "burgers-menton",
      publicationPlan: makePublicationPlan(),
      guides: [],
      places: [
        {
          id: "alls-stars-menton",
          relatedArticleIds: [],
          guideCoverageSlugs: [],
          requiresMapReview: true,
        },
      ],
      mapPoints: [],
      mapExclusions: [],
    });

    expect(report.ok).toBe(false);
    expect(report.errors.map((issue) => issue.code)).toEqual(
      expect.arrayContaining(["missing-guide-article", "review-place-not-rendered", "review-backlink-missing", "review-coverage-missing", "review-map-obligation-missing"]),
    );
  });
});

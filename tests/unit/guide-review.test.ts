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
          coverImage: "/images/guide/burgers-menton.jpg",
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
    expect(report.visualHandoff.inLatestGuideSlot).toBe(true);
    expect(report.visualHandoff.expectsLatestGuideSlot).toBe(true);
    expect(report.visualHandoff.coverResolved).toBe(true);
    expect(report.visualHandoff.localeSpotCheckUrls).toEqual([
      "/en/guide/burgers-menton",
      "/fr/guide/burgers-menton",
      "/it/guide/burgers-menton",
      "/uk/guide/burgers-menton",
    ]);
    expect(report.operator.status).toBe("ok");
    expect(report.operator.inserted).toEqual(
      expect.arrayContaining([
        "Guide article present in src/content/guide.ts.",
        "Place present: alls-stars-menton.",
      ]),
    );
    expect(report.operator.openItems).toEqual([]);
    expect(report.operator.localeSpotChecks).toEqual([
      "/en/guide/burgers-menton",
      "/fr/guide/burgers-menton",
      "/it/guide/burgers-menton",
      "/uk/guide/burgers-menton",
    ]);
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
      expect.arrayContaining([
        "missing-guide-article",
        "review-place-not-rendered",
        "review-backlink-missing",
        "review-coverage-missing",
        "review-map-obligation-missing",
      ]),
    );
    expect(report.visualHandoff.inLatestGuideSlot).toBe(false);
    expect(report.visualHandoff.coverResolved).toBe(false);
    expect(report.operator.status).toBe("needs-fix");
    expect(report.operator.openItems).toEqual(
      expect.arrayContaining([
        expect.stringContaining("[missing-guide-article]"),
        expect.stringContaining("[review-backlink-missing]"),
      ]),
    );
  });

  it("warns when the guide should own the NEW slot but another guide still resolves as latest", () => {
    const report = buildGuideReviewReport({
      slug: "burgers-menton",
      publicationPlan: makePublicationPlan(),
      guides: [
        {
          slug: "burgers-menton",
          publishedOn: "2026-07-28",
          coverImage: "/images/guide/burgers-menton.jpg",
          category: "food-markets",
          relatedPlaces: ["alls-stars-menton"],
          relatedArticles: ["best-pizzerias-menton"],
          relatedApartments: ["sea-view-balcony-studio"],
          sections: [],
        },
        {
          slug: "later-guide",
          publishedOn: "2026-07-28",
          coverImage: "/images/guide/later-guide.jpg",
          relatedPlaces: [],
          relatedArticles: [],
          relatedApartments: [],
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

    expect(report.warnings.map((issue) => issue.code)).toContain("review-latest-guide-slot-mismatch");
    expect(report.operator.ownerVisualCheck[2]).toContain("/en/guide");
  });

  it("can review an intake slug against a published guide slug from the publication plan", () => {
    const plan = {
      ...makePublicationPlan(),
      slug: "cheap-eats-menton-budget-lunch",
    };

    const report = buildGuideReviewReport({
      slug: "cheap-eats-in-menton-best-budget-lunches-daily-menus-local-canteens",
      publicationPlan: plan,
      guides: [
        {
          slug: "cheap-eats-menton-budget-lunch",
          publishedOn: "2026-07-28",
          category: "food-markets",
          coverImage: "/images/guide/cheap-eats-menton-budget-lunch.jpg",
          relatedPlaces: ["alls-stars-menton"],
          relatedArticles: ["best-pizzerias-menton"],
          relatedApartments: ["sea-view-balcony-studio"],
          sections: [],
        },
      ],
      places: [
        {
          id: "alls-stars-menton",
          relatedArticleIds: ["cheap-eats-menton-budget-lunch"],
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
    expect(report.slug).toBe("cheap-eats-menton-budget-lunch");
    expect(report.visualHandoff.localeSpotCheckUrls[0]).toBe("/en/guide/cheap-eats-menton-budget-lunch");
  });
});

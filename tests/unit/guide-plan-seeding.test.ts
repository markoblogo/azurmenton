import { describe, expect, it } from "vitest";

import { buildSeededPublicationPlan, seedGuideIntake } from "../../src/lib/guide-plan-seeding";
import type { GuideIntake } from "../../src/lib/guide-intake";

describe("guide plan seeding", () => {
  it("autofills seo/meta/category and seeds publication plan from existing places", () => {
    const intake: GuideIntake = {
      title: "Italian Restaurants in Menton Beyond Pizza",
      slug: "italian-restaurants-in-menton-beyond-pizza",
      intro:
        "Living next to Italy has shaped Menton's food culture in a way few French towns can match. Cross-border families and Ligurian influence make Italian food part of daily life here.",
      sectionHeadings: ["Best Italian Restaurants in Menton", "Ventimiglia"],
      placeCandidates: [
        { name: "Gusto Italiano", section: "Best Italian Restaurants in Menton" },
        { name: "A Boire A Manger (ABAM)", section: "Best Italian Restaurants in Menton" },
        { name: "Le Napoli", section: "Best Italian Restaurants in Menton" },
      ],
      relatedGuideTitles: [],
    };

    const seededIntake = seedGuideIntake(intake);
    expect(seededIntake.seoTitle).toBe("Italian Restaurants in Menton Beyond Pizza");
    expect(seededIntake.metaDescription).toContain("Living next to Italy has shaped Menton's food culture");

    const plan = buildSeededPublicationPlan({
      intake: seededIntake,
      todayIso: "2026-07-28",
      guides: [
        { slug: "local-food-menton", title: "Local food in Menton: what to try first", category: "food-markets" },
        { slug: "best-pizzerias-menton", title: "Best pizzerias in Menton", category: "food-markets" },
      ],
      places: [
        {
          id: "gusto-italiano-menton",
          name: "Gusto Italiano Menton",
          image: "/images/guide/gusto-italiano-menton.jpg",
          requiresMapReview: true,
          relatedArticleIds: ["local-food-menton"],
        },
        {
          id: "abam-menton",
          name: "A BOIRE A MANGER (ABAM)",
          image: "/images/guide/abam-menton.png",
          requiresMapReview: false,
          relatedArticleIds: ["local-food-menton", "best-pizzerias-menton"],
        },
      ],
      mapPointPlaceIds: ["gusto-italiano-menton"],
      mapExclusionPlaceIds: [],
    });

    expect(plan.category).toBe("food-markets");
    expect(plan.relatedPlaceIds).toEqual(["gusto-italiano-menton", "abam-menton"]);
    expect(plan.relatedArticleSlugs).toEqual(["local-food-menton", "best-pizzerias-menton"]);
    expect(plan.plannedPlaces).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          draftName: "Gusto Italiano",
          existingPlaceId: "gusto-italiano-menton",
          imageStatus: "existing",
          mapAction: "point",
        }),
        expect.objectContaining({
          draftName: "A Boire A Manger (ABAM)",
          existingPlaceId: "abam-menton",
          imageStatus: "existing",
          mapAction: "not_needed",
        }),
        expect.objectContaining({
          draftName: "Le Napoli",
          existingPlaceId: null,
          newPlaceId: "le-napoli-menton",
          imageStatus: "pending",
          mapAction: "point",
        }),
      ]),
    );
  });
});

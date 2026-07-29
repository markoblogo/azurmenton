import { describe, expect, it } from "vitest";

import { buildSeededPublicationPlan, seedGuideIntake } from "../../src/lib/guide-plan-seeding";
import { mergePublicationPlanWithMatches } from "../../src/lib/guide-match";
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
          suggestedExistingPlaceId: "gusto-italiano-menton",
          matchStatus: "existing_place",
          matchDecision: "safe_existing",
          imageStatus: "existing",
          mapAction: "point",
          topMatches: expect.arrayContaining([
            expect.objectContaining({
              id: "gusto-italiano-menton",
            }),
          ]),
        }),
        expect.objectContaining({
          draftName: "A Boire A Manger (ABAM)",
          existingPlaceId: "abam-menton",
          suggestedExistingPlaceId: "abam-menton",
          matchStatus: "existing_place",
          matchDecision: "safe_existing",
          imageStatus: "existing",
          mapAction: "not_needed",
        }),
        expect.objectContaining({
          draftName: "Le Napoli",
          existingPlaceId: null,
          newPlaceId: "le-napoli-menton",
          matchStatus: "new_place_candidate",
          matchDecision: "likely_new_place",
          imageStatus: "pending",
          mapAction: "point",
        }),
      ]),
    );
  });

  it("marks ambiguous matches and preserves manual resolution when merging", () => {
    const intake: GuideIntake = {
      title: "Coffee in Menton",
      slug: "best-coffee-menton",
      intro: "Coffee guide",
      sectionHeadings: ["Coffee spots"],
      placeCandidates: [{ name: "Cafe Napoli", section: "Coffee spots" }],
      relatedGuideTitles: [],
    };

    const seededPlan = buildSeededPublicationPlan({
      intake,
      todayIso: "2026-07-29",
      guides: [{ slug: "local-food-menton", title: "Local food in Menton: what to try first", category: "food-markets" }],
      places: [
        { id: "cafe-napoli-menton", name: "Cafe Napoli Menton", requiresMapReview: true },
        { id: "cafe-napoli-monaco", name: "Cafe Napoli Monaco", requiresMapReview: true },
      ],
      mapPointPlaceIds: ["cafe-napoli-menton"],
      mapExclusionPlaceIds: [],
    });

    const ambiguous = seededPlan.plannedPlaces?.[0];
    expect(ambiguous).toEqual(
      expect.objectContaining({
        draftName: "Cafe Napoli",
        existingPlaceId: null,
        newPlaceId: null,
        suggestedExistingPlaceId: "cafe-napoli-menton",
        matchStatus: "ambiguous_match",
        matchDecision: "needs_human_choice",
      }),
    );
    expect(ambiguous?.topMatches?.length).toBeGreaterThan(1);

    const merged = mergePublicationPlanWithMatches({
      intake,
      seededPlan,
      currentPlan: {
        plannedPlaces: [
          {
            draftName: "Cafe Napoli",
            existingPlaceId: "cafe-napoli-menton",
            imageStatus: "existing",
            mapAction: "point",
            coverageGuideSlug: "best-coffee-menton",
          },
        ],
      },
    });

    expect(merged.plannedPlaces?.[0]).toEqual(
      expect.objectContaining({
        draftName: "Cafe Napoli",
        existingPlaceId: "cafe-napoli-menton",
        suggestedExistingPlaceId: "cafe-napoli-menton",
        matchStatus: "ambiguous_match",
        matchDecision: "needs_human_choice",
        imageStatus: "existing",
        mapAction: "point",
        coverageGuideSlug: "best-coffee-menton",
      }),
    );
  });

  it("reduces noisy postal false matches and can safely resolve central La Poste variants", () => {
    const intake: GuideIntake = {
      title: "Post Offices, Stamps & Parcel Services in Menton",
      slug: "post-offices-stamps-menton",
      intro: "Postal guide",
      sectionHeadings: ["Menton", "Nice"],
      placeCandidates: [
        { name: "Garavan Postal Branch", section: "Menton" },
        { name: "Central La Poste Nice", section: "Nice" },
      ],
      relatedGuideTitles: [],
    };

    const seededPlan = buildSeededPublicationPlan({
      intake,
      todayIso: "2026-07-29",
      guides: [],
      places: [
        { id: "la-poste-garavan-menton", name: "La Poste Garavan", requiresMapReview: true },
        { id: "menton-garavan-station", name: "Menton Garavan Station", requiresMapReview: true },
        { id: "la-poste-nice-centre", name: "La Poste Nice Centre", requiresMapReview: true },
        { id: "la-yogurteria-menton", name: "L.A. Yogurteria", requiresMapReview: true },
      ],
      mapPointPlaceIds: [],
      mapExclusionPlaceIds: [],
    });

    expect(seededPlan.plannedPlaces).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          draftName: "Garavan Postal Branch",
          existingPlaceId: "la-poste-garavan-menton",
          matchDecision: "safe_existing",
          suggestedExistingPlaceId: "la-poste-garavan-menton",
        }),
        expect.objectContaining({
          draftName: "Central La Poste Nice",
          existingPlaceId: "la-poste-nice-centre",
          matchDecision: "safe_existing",
          suggestedExistingPlaceId: "la-poste-nice-centre",
        }),
      ]),
    );

    const garavan = seededPlan.plannedPlaces?.find((place) => place.draftName === "Garavan Postal Branch");
    expect(garavan?.topMatches?.map((entry) => entry.id)).not.toContain("la-yogurteria-menton");
  });
});

import { describe, expect, it } from "vitest";

import { buildGuideMatchMemory } from "../../src/lib/guide-match-memory";
import { buildSeededPublicationPlan } from "../../src/lib/guide-plan-seeding";
import type { GuideIntake } from "../../src/lib/guide-intake";

describe("guide match memory", () => {
  it("reuses a stable historical manual resolution for repeated ambiguous names", () => {
    const matchMemory = buildGuideMatchMemory([
      {
        slug: "best-coffee-menton",
        plannedPlaces: [
          {
            draftName: "Cafe Napoli",
            existingPlaceId: "cafe-napoli-menton",
            suggestedExistingPlaceId: "cafe-napoli-menton",
            matchStatus: "ambiguous_match",
            matchDecision: "needs_human_choice",
            topMatches: [
              { id: "cafe-napoli-menton", name: "Cafe Napoli Menton", score: 0.88, reason: "name-similarity+locality" },
              { id: "cafe-napoli-monaco", name: "Cafe Napoli Monaco", score: 0.82, reason: "name-similarity+locality" },
            ],
          },
        ],
      },
      {
        slug: "italian-breakfast-near-menton",
        plannedPlaces: [
          {
            draftName: "Cafe Napoli",
            existingPlaceId: "cafe-napoli-menton",
            suggestedExistingPlaceId: "cafe-napoli-menton",
            matchStatus: "ambiguous_match",
            matchDecision: "needs_human_choice",
            topMatches: [
              { id: "cafe-napoli-menton", name: "Cafe Napoli Menton", score: 0.86, reason: "name-similarity+locality" },
              { id: "cafe-napoli-monaco", name: "Cafe Napoli Monaco", score: 0.8, reason: "name-similarity+locality" },
            ],
          },
        ],
      },
    ]);

    const intake: GuideIntake = {
      title: "Morning coffee in Menton",
      slug: "morning-coffee-menton",
      intro: "Coffee draft",
      sectionHeadings: ["Coffee"],
      placeCandidates: [{ name: "Cafe Napoli", section: "Coffee" }],
      relatedGuideTitles: [],
    };

    const plan = buildSeededPublicationPlan({
      intake,
      todayIso: "2026-07-29",
      guides: [],
      places: [
        { id: "cafe-napoli-menton", name: "Cafe Napoli Menton", image: "/images/guide/cafe-napoli-menton.jpg", requiresMapReview: true },
        { id: "cafe-napoli-monaco", name: "Cafe Napoli Monaco", requiresMapReview: true },
      ],
      mapPointPlaceIds: ["cafe-napoli-menton"],
      mapExclusionPlaceIds: [],
      matchMemory,
    });

    expect(plan.plannedPlaces?.[0]).toEqual(
      expect.objectContaining({
        draftName: "Cafe Napoli",
        existingPlaceId: "cafe-napoli-menton",
        suggestedExistingPlaceId: "cafe-napoli-menton",
        matchStatus: "existing_place",
        matchDecision: "safe_existing",
      }),
    );
    expect(plan.plannedPlaces?.[0]?.matchReason).toContain("historical-signature");
  });
});

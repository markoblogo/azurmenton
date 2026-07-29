import { describe, expect, it } from "vitest";

import { buildGuideLinkPlan } from "../../src/lib/guide-link-plan";
import type { GuideIntake } from "../../src/lib/guide-intake";

describe("guide link plan", () => {
  it("autofills cluster-backed related guides and apartments for practical transport guides", () => {
    const intake: GuideIntake = {
      title: "How to get from Nice Airport to Menton",
      slug: "how-to-get-to-menton-from-nice-airport",
      intro: "Airport, train and transfer planning for Menton stays.",
      sectionHeadings: ["Airport transfer options", "Train to Menton"],
      placeCandidates: [{ name: "Nice Airport", section: "Airport transfer options" }],
      relatedGuideTitles: ["Public transport in Menton"],
    };

    const plan = buildGuideLinkPlan({
      intake,
      publicationPlan: {
        slug: intake.slug,
        category: "practical",
        relatedPlaceIds: ["nice-cote-dazur-airport"],
        relatedArticleSlugs: [],
        relatedApartmentSlugs: [],
        canonicalGuideForPlaces: false,
        plannedPlaces: [
          {
            draftName: "Nice Airport",
            existingPlaceId: "nice-cote-dazur-airport",
            imageStatus: "existing",
            mapAction: "point",
          },
        ],
      },
      guides: [
        { slug: "public-transport-in-menton", title: "Public transport in Menton", category: "practical" },
        { slug: "menton-without-a-car", title: "Menton without a car", category: "practical" },
        { slug: "how-to-get-to-menton-from-nice-airport", title: "How to get from Nice Airport to Menton", category: "practical" },
      ],
      places: [
        {
          id: "nice-cote-dazur-airport",
          name: "Nice Cote d'Azur Airport",
          relatedArticleIds: ["public-transport-in-menton"],
        },
      ],
      apartments: [
        { slug: "sea-view-balcony-studio" },
        { slug: "beachside-family-apartment" },
        { slug: "panoramic-sea-view-studio" },
      ] as never,
      collections: [
        {
          id: "practical-stay",
          title: { en: "", fr: "", it: "", uk: "" },
          description: { en: "", fr: "", it: "", uk: "" },
          categories: ["practical"],
          priorityGuideSlugs: ["menton-without-a-car", "public-transport-in-menton"],
        },
      ],
      clusters: [
        {
          id: "menton-without-car",
          title: { en: "", fr: "", it: "", uk: "" },
          excerpt: { en: "", fr: "", it: "", uk: "" },
          canonicalGuideSlug: "menton-without-a-car",
          supportingGuideSlugs: ["public-transport-in-menton", "how-to-get-to-menton-from-nice-airport"],
          relatedPlaceIds: [],
          relatedApartmentKeys: ["sea-view-balcony-studio", "beachside-family-apartment", "panoramic-sea-view-studio"],
        },
      ],
    });

    expect(plan.autoAppliedRelatedArticles).toEqual(expect.arrayContaining(["public-transport-in-menton", "menton-without-a-car"]));
    expect(plan.autoAppliedRelatedApartments).toEqual([
      "beachside-family-apartment",
      "panoramic-sea-view-studio",
      "sea-view-balcony-studio",
    ]);
    expect(plan.relatedArticles.find((entry) => entry.slug === "public-transport-in-menton")?.priority).toBe("required");
  });

  it("creates required backlink and coverage obligations for canonical specialist guides", () => {
    const intake: GuideIntake = {
      title: "Best coffee in Menton",
      slug: "best-coffee-menton",
      intro: "Coffee bars and specialty spots.",
      sectionHeadings: ["Best coffee bars"],
      placeCandidates: [{ name: "Flowy Coffee", section: "Best coffee bars" }],
      relatedGuideTitles: [],
    };

    const plan = buildGuideLinkPlan({
      intake,
      publicationPlan: {
        slug: intake.slug,
        category: "food-markets",
        relatedPlaceIds: ["flowy-coffee-coworking-menton"],
        relatedArticleSlugs: [],
        relatedApartmentSlugs: [],
        canonicalGuideForPlaces: true,
        plannedPlaces: [
          {
            draftName: "Flowy Coffee",
            existingPlaceId: "flowy-coffee-coworking-menton",
            imageStatus: "existing",
            mapAction: "point",
          },
        ],
      },
      guides: [{ slug: "best-coffee-menton", title: "Best coffee in Menton", category: "food-markets" }],
      places: [
        {
          id: "flowy-coffee-coworking-menton",
          name: "Flowy Coffee Coworking Menton",
          relatedArticleIds: ["coworking-remote-work-menton"],
        },
      ],
      apartments: [] as never,
      collections: [],
      clusters: [],
    });

    expect(plan.backlinkObligations[0]).toEqual(
      expect.objectContaining({
        existingPlaceId: "flowy-coffee-coworking-menton",
        priority: "required",
        action: "add-related-article",
      }),
    );
    expect(plan.specialistCoverageUpdates[0]).toEqual(
      expect.objectContaining({
        existingPlaceId: "flowy-coffee-coworking-menton",
        priority: "required",
        action: "set-coverage-guide",
        coverageGuideSlug: "best-coffee-menton",
      }),
    );
  });

  it("marks weak title-only links as noise-risk instead of auto-applying them", () => {
    const intake: GuideIntake = {
      title: "CBD shops in Menton",
      slug: "cbd-shops-menton",
      intro: "CBD products in Menton.",
      sectionHeadings: ["CBD boutiques"],
      placeCandidates: [],
      relatedGuideTitles: [],
    };

    const plan = buildGuideLinkPlan({
      intake,
      publicationPlan: {
        slug: intake.slug,
        category: "practical",
        relatedPlaceIds: [],
        relatedArticleSlugs: [],
        relatedApartmentSlugs: [],
        canonicalGuideForPlaces: false,
        plannedPlaces: [],
      },
      guides: [
        { slug: "best-coffee-menton", title: "Best coffee in Menton", category: "food-markets" },
        { slug: "official-tourism-websites-menton-riviera", title: "Official tourism websites for Menton and the Riviera", category: "practical" },
      ],
      places: [],
      apartments: [
        { slug: "sea-view-balcony-studio" },
        { slug: "beachside-family-apartment" },
        { slug: "panoramic-sea-view-studio" },
      ] as never,
      collections: [],
      clusters: [],
    });

    expect(plan.relatedArticles.some((entry) => entry.priority === "noise-risk")).toBe(true);
    expect(plan.autoAppliedRelatedArticles).not.toContain("best-coffee-menton");
  });
});

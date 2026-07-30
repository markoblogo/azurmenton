import { describe, expect, it } from "vitest";

import { applyGuideLinkPlan, buildGuideLinkPlan } from "../../src/lib/guide-link-plan";
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

  it("does not treat one family section in a mixed-intent guide as a kids cluster requirement", () => {
    const intake: GuideIntake = {
      title: "Water sports in Menton",
      slug: "water-sports-in-menton-paddleboard-kayak-sailing-and-snorkelling",
      intro: "Practical water sports guide for Menton beaches and seafront planning.",
      sectionHeadings: ["Best beaches for paddleboarding", "Family-friendly water activities", "Where to rent gear"],
      placeCandidates: [],
      relatedGuideTitles: [],
    };

    const plan = buildGuideLinkPlan({
      intake,
      publicationPlan: {
        slug: intake.slug,
        category: "beaches",
        relatedPlaceIds: [],
        relatedArticleSlugs: [],
        relatedApartmentSlugs: [],
        canonicalGuideForPlaces: false,
        plannedPlaces: [],
      },
      guides: [
        { slug: "menton-with-kids-family-guide", title: "Menton with kids", category: "with-children" },
        { slug: "where-to-stay-in-menton", title: "Where to stay in Menton", category: "practical" },
        { slug: intake.slug, title: intake.title, category: "beaches" },
      ],
      places: [],
      apartments: [
        { slug: "sea-view-balcony-studio" },
        { slug: "beachside-family-apartment" },
        { slug: "panoramic-sea-view-studio" },
      ] as never,
      collections: [],
      clusters: [
        {
          id: "menton-with-kids",
          title: { en: "", fr: "", it: "", uk: "" },
          excerpt: { en: "", fr: "", it: "", uk: "" },
          canonicalGuideSlug: "menton-with-kids-family-guide",
          supportingGuideSlugs: [],
          relatedPlaceIds: [],
          relatedApartmentKeys: ["beachside-family-apartment"],
        },
        {
          id: "beachfront-stay",
          title: { en: "", fr: "", it: "", uk: "" },
          excerpt: { en: "", fr: "", it: "", uk: "" },
          canonicalGuideSlug: "where-to-stay-in-menton",
          supportingGuideSlugs: [],
          relatedPlaceIds: [],
          relatedApartmentKeys: ["sea-view-balcony-studio", "panoramic-sea-view-studio"],
        },
      ],
    });

    expect(plan.matchedClusterIds).toContain("beachfront-stay");
    expect(plan.matchedClusterIds).not.toContain("menton-with-kids");
    expect(plan.autoAppliedRelatedArticles).toContain("where-to-stay-in-menton");
    expect(plan.autoAppliedRelatedArticles).not.toContain("menton-with-kids-family-guide");
  });

  it("refreshes stale auto-applied related guides on rerun", () => {
    const intake: GuideIntake = {
      title: "Water sports in Menton",
      slug: "water-sports-in-menton-paddleboard-kayak-sailing-and-snorkelling",
      intro: "Practical water sports guide for Menton beaches and seafront planning.",
      sectionHeadings: ["Best beaches for paddleboarding", "Family-friendly water activities"],
      placeCandidates: [],
      relatedGuideTitles: [],
    };

    const linkPlan = buildGuideLinkPlan({
      intake,
      publicationPlan: {
        slug: intake.slug,
        category: "beaches",
        relatedPlaceIds: [],
        relatedArticleSlugs: [
          "menton-with-kids-family-guide",
          "where-to-stay-in-menton",
          "best-beaches-in-menton",
        ],
        relatedApartmentSlugs: ["beachside-family-apartment"],
        canonicalGuideForPlaces: false,
        plannedPlaces: [],
        linkPlan: {
          matchedClusterIds: ["menton-with-kids", "beachfront-stay"],
          matchedCollectionIds: ["beaches-and-seafront"],
          relatedArticles: [],
          relatedApartments: [],
          backlinkObligations: [],
          specialistCoverageUpdates: [],
          autoAppliedRelatedArticles: ["where-to-stay-in-menton", "best-beaches-in-menton"],
          autoAppliedRelatedApartments: ["beachside-family-apartment"],
        },
      },
      guides: [
        { slug: "menton-with-kids-family-guide", title: "Menton with kids", category: "with-children" },
        { slug: "where-to-stay-in-menton", title: "Where to stay in Menton", category: "practical" },
        { slug: "best-beaches-in-menton", title: "Best beaches in Menton", category: "beaches" },
        { slug: intake.slug, title: intake.title, category: "beaches" },
      ],
      places: [],
      apartments: [
        { slug: "sea-view-balcony-studio" },
        { slug: "beachside-family-apartment" },
        { slug: "panoramic-sea-view-studio" },
      ] as never,
      collections: [
        {
          id: "beaches-and-seafront",
          title: { en: "", fr: "", it: "", uk: "" },
          description: { en: "", fr: "", it: "", uk: "" },
          categories: ["beaches"],
          priorityGuideSlugs: ["best-beaches-in-menton"],
        },
      ],
      clusters: [
        {
          id: "menton-with-kids",
          title: { en: "", fr: "", it: "", uk: "" },
          excerpt: { en: "", fr: "", it: "", uk: "" },
          canonicalGuideSlug: "menton-with-kids-family-guide",
          supportingGuideSlugs: [],
          relatedPlaceIds: [],
          relatedApartmentKeys: ["beachside-family-apartment"],
        },
        {
          id: "beachfront-stay",
          title: { en: "", fr: "", it: "", uk: "" },
          excerpt: { en: "", fr: "", it: "", uk: "" },
          canonicalGuideSlug: "where-to-stay-in-menton",
          supportingGuideSlugs: [],
          relatedPlaceIds: [],
          relatedApartmentKeys: ["sea-view-balcony-studio", "panoramic-sea-view-studio"],
        },
      ],
    });

    const refreshed = applyGuideLinkPlan(
      {
        slug: intake.slug,
        category: "beaches",
        relatedPlaceIds: [],
        relatedArticleSlugs: [
          "menton-with-kids-family-guide",
          "where-to-stay-in-menton",
          "best-beaches-in-menton",
        ],
        relatedApartmentSlugs: ["beachside-family-apartment"],
        canonicalGuideForPlaces: false,
        plannedPlaces: [],
        linkPlan: {
          matchedClusterIds: ["menton-with-kids", "beachfront-stay"],
          matchedCollectionIds: ["beaches-and-seafront"],
          relatedArticles: [],
          relatedApartments: [],
          backlinkObligations: [],
          specialistCoverageUpdates: [],
          autoAppliedRelatedArticles: ["where-to-stay-in-menton", "best-beaches-in-menton"],
          autoAppliedRelatedApartments: ["beachside-family-apartment"],
        },
      },
      linkPlan,
    );

    expect(refreshed.relatedArticleSlugs).toContain("where-to-stay-in-menton");
    expect(refreshed.relatedArticleSlugs).not.toContain("menton-with-kids-family-guide");
  });

  it("keeps broad collection links tight for mixed-intent beach guides", () => {
    const intake: GuideIntake = {
      title: "Water sports in Menton",
      slug: "water-sports-in-menton-paddleboard-kayak-sailing-and-snorkelling",
      intro: "Practical guide to paddleboarding, kayaking and snorkelling.",
      sectionHeadings: ["Best beaches for paddleboarding", "Where to rent gear", "Sea conditions and safety"],
      placeCandidates: [],
      relatedGuideTitles: [],
    };

    const plan = buildGuideLinkPlan({
      intake,
      publicationPlan: {
        slug: intake.slug,
        category: "beaches",
        relatedPlaceIds: [],
        relatedArticleSlugs: [],
        relatedApartmentSlugs: [],
        canonicalGuideForPlaces: false,
        plannedPlaces: [],
      },
      guides: [
        { slug: intake.slug, title: intake.title, category: "beaches" },
        { slug: "best-beaches-in-menton", title: "Best beaches in Menton", category: "beaches" },
        { slug: "stay-cool-in-menton-summer", title: "How to stay cool in Menton in summer", category: "practical" },
        { slug: "where-to-stay-in-menton", title: "Where to stay in Menton", category: "practical" },
        { slug: "best-photo-spots-menton", title: "Best photo spots in Menton", category: "photo-spots" },
        { slug: "famous-paintings-of-menton", title: "Famous paintings of Menton", category: "photo-spots" },
        { slug: "films-shot-in-menton", title: "Films shot in Menton", category: "photo-spots" },
        { slug: "menton-hand-drawn-postcards", title: "Menton hand-drawn postcards", category: "photo-spots" },
        { slug: "music-videos-filmed-in-menton", title: "Music videos filmed in Menton", category: "photo-spots" },
      ],
      places: [],
      apartments: [] as never,
      collections: [
        {
          id: "beaches-and-seafront",
          title: { en: "", fr: "", it: "", uk: "" },
          description: { en: "", fr: "", it: "", uk: "" },
          categories: ["beaches", "photo-spots"],
          includeGuideSlugs: ["stay-cool-in-menton-summer", "where-to-stay-in-menton"],
          priorityGuideSlugs: ["best-beaches-in-menton", "stay-cool-in-menton-summer", "where-to-stay-in-menton"],
        },
      ],
      clusters: [],
    });

    const collectionSlugs = plan.relatedArticles.filter((entry) => entry.source === "content-collection").map((entry) => entry.slug);

    expect(collectionSlugs).toEqual(
      expect.arrayContaining(["best-beaches-in-menton", "stay-cool-in-menton-summer", "where-to-stay-in-menton"]),
    );
    expect(collectionSlugs).not.toEqual(
      expect.arrayContaining([
        "best-photo-spots-menton",
        "famous-paintings-of-menton",
        "films-shot-in-menton",
        "menton-hand-drawn-postcards",
        "music-videos-filmed-in-menton",
      ]),
    );
  });

  it("keeps cluster supporting guides tight for mixed-intent beach guides", () => {
    const intake: GuideIntake = {
      title: "Water sports in Menton",
      slug: "water-sports-in-menton-paddleboard-kayak-sailing-and-snorkelling",
      intro: "Practical guide to paddleboarding, kayaking and snorkelling.",
      sectionHeadings: ["Best beaches for paddleboarding", "Where to rent gear", "Sea conditions and safety"],
      placeCandidates: [],
      relatedGuideTitles: [],
    };

    const plan = buildGuideLinkPlan({
      intake,
      publicationPlan: {
        slug: intake.slug,
        category: "beaches",
        relatedPlaceIds: [],
        relatedArticleSlugs: [],
        relatedApartmentSlugs: [],
        canonicalGuideForPlaces: false,
        plannedPlaces: [],
      },
      guides: [
        { slug: intake.slug, title: intake.title, category: "beaches" },
        { slug: "where-to-stay-in-menton", title: "Where to stay in Menton", category: "practical" },
        { slug: "best-beaches-in-menton", title: "Best beaches in Menton", category: "beaches" },
        { slug: "stay-cool-in-menton-summer", title: "How to stay cool in Menton in summer", category: "practical" },
        { slug: "best-ice-cream-menton", title: "Best ice cream in Menton", category: "with-children" },
        { slug: "quiet-evening-in-menton", title: "Quiet evening in Menton", category: "nightlife-drinks" },
      ],
      places: [],
      apartments: [] as never,
      collections: [],
      clusters: [
        {
          id: "beachfront-stay",
          title: { en: "", fr: "", it: "", uk: "" },
          excerpt: { en: "", fr: "", it: "", uk: "" },
          canonicalGuideSlug: "where-to-stay-in-menton",
          supportingGuideSlugs: [
            "best-beaches-in-menton",
            "best-ice-cream-menton",
            "stay-cool-in-menton-summer",
            "quiet-evening-in-menton",
          ],
          relatedPlaceIds: [],
          relatedApartmentKeys: [],
        },
      ],
    });

    const clusterSlugs = plan.relatedArticles.filter((entry) => entry.source === "intent-cluster").map((entry) => entry.slug);

    expect(clusterSlugs).toEqual(expect.arrayContaining(["where-to-stay-in-menton", "best-beaches-in-menton"]));
    expect(clusterSlugs).not.toEqual(expect.arrayContaining(["best-ice-cream-menton", "quiet-evening-in-menton"]));
  });
});

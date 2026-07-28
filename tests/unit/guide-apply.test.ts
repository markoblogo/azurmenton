import { describe, expect, it } from "vitest";

import { buildGuideApplyArtifacts } from "../../src/lib/guide-apply";
import type { GuidePublicationPlan } from "../../src/lib/guide-check";
import type { GuideIntake } from "../../src/lib/guide-intake";

describe("guide apply artifacts", () => {
  it("builds patch-ready scaffolds from intake and publication plan", () => {
    const intake: GuideIntake = {
      title: "Burgers in Menton",
      slug: "burgers-menton",
      seoTitle: "Burgers in Menton",
      metaDescription: "Burger guide",
      intro: "Burger intro",
      sectionHeadings: ["Local burger restaurants", "Fast food fallback"],
      placeCandidates: [
        { name: "All's Stars", section: "Local burger restaurants" },
        { name: "New Burger Place", section: "Fast food fallback" },
      ],
      relatedGuideTitles: [],
    };

    const publicationPlan: GuidePublicationPlan = {
      publishedOn: "2026-07-28",
      category: "food-markets",
      coverImageStatus: "provided",
      relatedPlaceIds: ["alls-stars-menton"],
      relatedArticleSlugs: ["best-pizzerias-menton"],
      relatedApartmentSlugs: ["sea-view-balcony-studio", "beachside-family-apartment", "panoramic-sea-view-studio"],
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
        {
          draftName: "New Burger Place",
          newPlaceId: "new-burger-place-menton",
          imageStatus: "pending",
          requiresMapReview: true,
          mapAction: "exclude",
          coverageGuideSlug: "burgers-menton",
        },
      ],
    };

    const artifacts = buildGuideApplyArtifacts({
      intake,
      publicationPlan,
      guides: [{ slug: "best-pizzerias-menton", title: "Best Pizza in Menton" }],
      places: [{ id: "alls-stars-menton", name: "All's Stars", type: "restaurant", image: "/images/guide/alls-stars-menton.jpg" }],
      assets: {
        coverImage: "/images/guide/burgers-menton.png",
        placeImages: {
          "alls-stars-menton": "/images/guide/alls-stars-menton.jpg",
          "new-burger-place-menton": "/images/guide/new-burger-place-menton.png",
        },
      },
      checkErrors: [],
    });

    expect(artifacts.summary.ready).toBe(true);
    expect(artifacts.guideArticleSnippet).toContain('coverImage: "/images/guide/burgers-menton.png"');
    expect(artifacts.guideArticleSnippet).toContain('relatedPlaces: [');
    expect(artifacts.guideArticleSnippet).toContain('"new-burger-place-menton"');
    expect(artifacts.placesRawSnippet).toContain('id: "new-burger-place-menton"');
    expect(artifacts.placeVisualsSnippet).toContain('"new-burger-place-menton": {');
    expect(artifacts.integrationChecklist).toContain("create new-burger-place-menton");
  });
});

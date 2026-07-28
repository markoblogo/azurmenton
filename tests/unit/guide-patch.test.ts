import { describe, expect, it } from "vitest";

import { buildGuideApplyArtifacts } from "../../src/lib/guide-apply";
import { buildGuidePatchBundle } from "../../src/lib/guide-patch";
import type { GuidePublicationPlan } from "../../src/lib/guide-check";
import type { GuideIntake } from "../../src/lib/guide-intake";

function makeIntake(): GuideIntake {
  return {
    title: "Burgers in Menton",
    slug: "burgers-menton",
    seoTitle: "Burgers in Menton",
    metaDescription: "Burger guide",
    intro: "Burger intro",
    sectionHeadings: ["Local burger restaurants"],
    placeCandidates: [
      { name: "All's Stars", section: "Local burger restaurants" },
      { name: "New Burger Place", section: "Local burger restaurants" },
    ],
    relatedGuideTitles: [],
  };
}

function makePublicationPlan(): GuidePublicationPlan {
  return {
    publishedOn: "2026-07-28",
    category: "food-markets",
    coverImageStatus: "provided",
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
}

describe("guide patch bundle", () => {
  it("builds a unified bundle for ready-to-patch guides", () => {
    const intake = makeIntake();
    const publicationPlan = makePublicationPlan();
    const applyArtifacts = buildGuideApplyArtifacts({
      intake,
      publicationPlan,
      guides: [{ slug: "best-pizzerias-menton", title: "Best Pizza in Menton" }],
      places: [{ id: "alls-stars-menton", name: "All's Stars", type: "restaurant" }],
      assets: {
        coverImage: "/images/guide/burgers-menton.png",
        placeImages: {
          "alls-stars-menton": "/images/guide/alls-stars-menton.jpg",
          "new-burger-place-menton": "/images/guide/new-burger-place-menton.png",
        },
      },
      checkErrors: [],
    });

    const bundle = buildGuidePatchBundle({
      slug: intake.slug,
      publicationPlan,
      publishReport: {
        slug: intake.slug,
        ready: true,
        blockers: [],
        warnings: [],
        nextSteps: [],
        assets: {
          cover: { expected: true, resolved: true, publicPath: "/images/guide/burgers-menton.png" },
          places: [],
        },
        summary: {
          plannedPlaceCount: 2,
          newPlaceCount: 1,
          existingPlaceCount: 1,
          relatedArticleCount: 1,
          relatedApartmentCount: 1,
        },
      },
      applyArtifacts,
    });

    expect(bundle.ready).toBe(true);
    expect(bundle.targets.map((target) => target.file)).toEqual(expect.arrayContaining(["src/content/guide.ts", "src/content/places.ts"]));
    expect(bundle.targets[0]?.snippet).toContain("shortArticle({");
    expect(bundle.targets.some((target) => target.action === "update")).toBe(true);
  });

  it("refuses to build patch targets while publish blockers remain", () => {
    const bundle = buildGuidePatchBundle({
      slug: "burgers-menton",
      publicationPlan: makePublicationPlan(),
      publishReport: {
        slug: "burgers-menton",
        ready: false,
        blockers: [{ severity: "error", code: "missing-cover", message: "Cover missing." }],
        warnings: [],
        nextSteps: [],
        assets: {
          cover: { expected: true, resolved: false },
          places: [],
        },
        summary: {
          plannedPlaceCount: 2,
          newPlaceCount: 1,
          existingPlaceCount: 1,
          relatedArticleCount: 1,
          relatedApartmentCount: 1,
        },
      },
      applyArtifacts: {
        guideArticleSnippet: "shortArticle({})",
        placesRawSnippet: "// No new place objects are required",
        placeVisualsSnippet: "// No place visuals resolved yet from public/images/guide for this intake.",
        integrationChecklist: "",
        summary: {
          slug: "burgers-menton",
          ready: false,
          newPlaceIds: [],
          existingPlaceIds: [],
          relatedArticleSlugs: [],
          relatedApartmentSlugs: [],
        },
      },
    });

    expect(bundle.ready).toBe(false);
    expect(bundle.targets).toEqual([]);
    expect(bundle.blockers[0]?.code).toBe("missing-cover");
  });
});

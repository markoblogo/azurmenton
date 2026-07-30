import { describe, expect, it } from "vitest";

import { buildGuideApplyArtifacts } from "../../src/lib/guide-apply";
import { buildGuidePublishReport } from "../../src/lib/guide-publish";
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
    placeCandidates: [{ name: "All's Stars", section: "Local burger restaurants" }],
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
    ],
  };
}

describe("guide publish report", () => {
  it("marks guide ready when checks, apply artifacts and assets are resolved", () => {
    const intake = makeIntake();
    const publicationPlan = makePublicationPlan();
    const applyArtifacts = buildGuideApplyArtifacts({
      intake,
      publicationPlan,
      guides: [{ slug: "best-pizzerias-menton", title: "Best Pizza in Menton" }],
      places: [{ id: "alls-stars-menton", name: "All's Stars", type: "restaurant", image: "/images/guide/alls-stars-menton.jpg" }],
      assets: {
        coverImage: "/images/guide/burgers-menton.png",
        placeImages: { "alls-stars-menton": "/images/guide/alls-stars-menton.jpg" },
      },
      checkErrors: [],
    });

    const report = buildGuidePublishReport({
      slug: intake.slug,
      publicationPlan,
      checkReport: {
        slug: intake.slug,
        ok: true,
        errors: [],
        warnings: [],
        relatedGuideSuggestions: [],
        placeSuggestions: [],
      },
      applyArtifacts,
      assetsReport: { issues: [] },
      resolvedCoverImage: "/images/guide/burgers-menton.png",
      resolvedPlaceImages: { "alls-stars-menton": "/images/guide/alls-stars-menton.jpg" },
    });

    expect(report.ready).toBe(true);
    expect(report.blockers).toEqual([]);
    expect(report.assets.cover.resolved).toBe(true);
    expect(report.assets.places[0]?.resolved).toBe(true);
    expect(report.blocked).toEqual([]);
    expect(report.autoResolved).toEqual(
      expect.arrayContaining([
        "Cover resolved at /images/guide/burgers-menton.png.",
        "Place image resolved for alls-stars-menton at /images/guide/alls-stars-menton.jpg.",
        "Existing place match confirmed for alls-stars-menton.",
      ]),
    );
    expect(report.manualActions).toHaveLength(5);
    expect(report.manualActions[0]).toContain("guide-article.snippet.txt");
    expect(report.operator.status).toBe("ready");
    expect(report.operator.blockedTop).toEqual([]);
    expect(report.operator.autoResolvedTop).toEqual(
      expect.arrayContaining([
        "Cover resolved at /images/guide/burgers-menton.png.",
        "Existing place match confirmed for alls-stars-menton.",
      ]),
    );
    expect(report.operator.nextManualActions[0]).toContain("guide-article.snippet.txt");
  });

  it("blocks publish when provided assets are still unresolved", () => {
    const intake = makeIntake();
    const publicationPlan = makePublicationPlan();
    const applyArtifacts = buildGuideApplyArtifacts({
      intake,
      publicationPlan,
      guides: [{ slug: "best-pizzerias-menton", title: "Best Pizza in Menton" }],
      places: [{ id: "alls-stars-menton", name: "All's Stars", type: "restaurant" }],
      assets: {},
      checkErrors: [],
    });

    const report = buildGuidePublishReport({
      slug: intake.slug,
      publicationPlan,
      checkReport: {
        slug: intake.slug,
        ok: true,
        errors: [],
        warnings: [],
        relatedGuideSuggestions: [],
        placeSuggestions: [],
      },
      applyArtifacts,
      assetsReport: {
        issues: [{ severity: "error", code: "missing-place-asset", message: "Place asset missing." }],
      },
    });

    expect(report.ready).toBe(false);
    expect(report.blockers.map((issue) => issue.code)).toEqual(
      expect.arrayContaining(["missing-place-asset", "missing-published-cover-asset", "missing-published-place-asset"]),
    );
    expect(report.blocked.map((issue) => issue.code)).toEqual(
      expect.arrayContaining(["missing-place-asset", "missing-published-cover-asset", "missing-published-place-asset"]),
    );
    expect(report.manualActions).toEqual(
      expect.arrayContaining([
        "Resolve every blocked item listed in publish-report.json.",
        "Re-run npm run guide:publish -- --slug <slug> until ready becomes yes.",
      ]),
    );
    expect(report.operator.status).toBe("blocked");
    expect(report.operator.blockedTop).toEqual(
      expect.arrayContaining([
        expect.stringContaining("[missing-place-asset]"),
        expect.stringContaining("[missing-published-cover-asset]"),
      ]),
    );
    expect(report.operator.nextManualActions).toEqual(
      expect.arrayContaining([
        "Resolve every blocked item listed in publish-report.json.",
        "Re-run npm run guide:publish -- --slug <slug> until ready becomes yes.",
      ]),
    );
  });

  it("flags merged guides that still have expected cover input but no cover wiring", () => {
    const intake = makeIntake();
    const publicationPlan = {
      ...makePublicationPlan(),
      coverImageStatus: "pending" as const,
    };
    const applyArtifacts = buildGuideApplyArtifacts({
      intake,
      publicationPlan,
      guides: [{ slug: "best-pizzerias-menton", title: "Best Pizza in Menton" }],
      places: [{ id: "alls-stars-menton", name: "All's Stars", type: "restaurant" }],
      assets: {},
      checkErrors: [],
    });

    const report = buildGuidePublishReport({
      slug: intake.slug,
      publicationPlan,
      checkReport: {
        slug: intake.slug,
        ok: true,
        errors: [],
        warnings: [],
        relatedGuideSuggestions: [],
        placeSuggestions: [],
      },
      applyArtifacts,
      resolvedPlaceImages: {},
      expectedGuideCover: true,
      mergedGuidePresent: true,
    });

    expect(report.ready).toBe(false);
    expect(report.blockers.map((issue) => issue.code)).toEqual(
      expect.arrayContaining(["missing-published-cover-asset", "merged-guide-cover-wiring-missing"]),
    );
  });
});

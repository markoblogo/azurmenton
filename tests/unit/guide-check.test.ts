import { describe, expect, it } from "vitest";

import { buildGuideCheckReport } from "../../src/lib/guide-check";
import type { GuideIntake } from "../../src/lib/guide-intake";

describe("guide check report", () => {
  it("flags missing fields and suggests related guides and places", () => {
    const intake: GuideIntake = {
      title: "Burgers in Menton",
      slug: "burgers-menton",
      seoTitle: "Burgers in Menton",
      metaDescription: "Find burgers in Menton and nearby chain options.",
      intro: "Short intro",
      coverPathHint: "/tmp/cover.png",
      sectionHeadings: ["Local burger restaurants", "Related guides"],
      placeCandidates: [{ name: "All's Stars", section: "Local burger restaurants" }],
      relatedGuideTitles: ["Best Pizza in Menton"],
      rawSuggestedSlug: "/en/guide/burgers-menton",
    };

    const report = buildGuideCheckReport(
      intake,
      [{ slug: "best-pizzerias-menton", title: "Best pizzerias in Menton: restaurants, slices, takeaway and delivery", publishedOn: "2026-07-27" }],
      [{ id: "alls-stars-menton", name: "All's Stars Menton", image: "/images/guide/alls-stars.jpg" }],
      {
        coverExists: true,
        apartmentSlugs: ["sea-view-balcony-studio"],
        publicationPlan: {
          publishedOn: "2026-07-28",
          category: "food-markets",
          coverImageStatus: "provided",
          relatedPlaceIds: ["alls-stars-menton"],
          relatedArticleSlugs: ["best-pizzerias-menton"],
          relatedApartmentSlugs: [],
          plannedPlaces: [],
          canonicalGuideForPlaces: false,
        },
      },
    );

    expect(report.ok).toBe(true);
    expect(report.errors).toEqual([]);
    expect(report.relatedGuideSuggestions[0]?.matches[0]?.slug).toBe("best-pizzerias-menton");
    expect(report.placeSuggestions[0]?.matches[0]?.id).toBe("alls-stars-menton");
  });

  it("fails when required intake fields are missing", () => {
    const intake: GuideIntake = {
      title: "",
      slug: "Bad Slug",
      sectionHeadings: [],
      placeCandidates: [],
      relatedGuideTitles: [],
    };

    const report = buildGuideCheckReport(intake, [], [], { coverExists: false });

    expect(report.ok).toBe(false);
    expect(report.errors.map((issue) => issue.code)).toEqual(
      expect.arrayContaining(["missing-title", "invalid-slug", "missing-seo-title", "missing-meta-description", "missing-publication-plan"]),
    );
    expect(report.warnings.map((issue) => issue.code)).toEqual(
      expect.arrayContaining(["no-sections", "no-place-candidates"]),
    );
  });

  it("enforces publication-plan v2 rules for practical guides and new places", () => {
    const intake: GuideIntake = {
      title: "Airport guide",
      slug: "airport-arrivals-menton",
      seoTitle: "Airport guide",
      metaDescription: "Airport guide",
      sectionHeadings: ["Airports"],
      placeCandidates: [{ name: "Nice Airport", section: "Airports" }],
      relatedGuideTitles: [],
    };

    const report = buildGuideCheckReport(
      intake,
      [{ slug: "best-coffee-menton", title: "Best coffee in Menton", publishedOn: "2026-07-28" }],
      [{ id: "nice-cote-dazur-airport", name: "Nice Cote d'Azur Airport", requiresMapReview: true }],
      {
        coverExists: false,
        apartmentSlugs: ["sea-view-balcony-studio"],
        mapPointPlaceIds: [],
        mapExclusionPlaceIds: [],
        publicationPlan: {
          publishedOn: "2026-07-27",
          category: "practical",
          coverImageStatus: "provided",
          relatedPlaceIds: [],
          relatedArticleSlugs: [],
          relatedApartmentSlugs: [],
          canonicalGuideForPlaces: true,
          plannedPlaces: [
            {
              draftName: "Nice Airport",
              newPlaceId: "nice-cote-dazur-airport-new",
              imageStatus: "pending",
              requiresMapReview: true,
              mapAction: null,
              coverageGuideSlug: null,
            },
          ],
        },
      },
    );

    expect(report.ok).toBe(false);
    expect(report.errors.map((issue) => issue.code)).toEqual(
      expect.arrayContaining(["cover-marked-provided-without-file", "missing-apartment-cta", "missing-map-action", "missing-coverage-guide-slug"]),
    );
    expect(report.warnings.map((issue) => issue.code)).toEqual(
      expect.arrayContaining(["not-latest-landing-slot", "no-related-articles-planned"]),
    );
  });

  it("warns when a place remains in ambiguous match state without a manual resolution", () => {
    const intake: GuideIntake = {
      title: "Coffee in Menton",
      slug: "best-coffee-menton",
      seoTitle: "Coffee in Menton",
      metaDescription: "Coffee in Menton",
      sectionHeadings: ["Coffee spots"],
      placeCandidates: [{ name: "Cafe Napoli", section: "Coffee spots" }],
      relatedGuideTitles: [],
    };

    const report = buildGuideCheckReport(
      intake,
      [{ slug: "local-food-menton", title: "Local food in Menton", publishedOn: "2026-07-28" }],
      [{ id: "cafe-napoli-menton", name: "Cafe Napoli Menton", requiresMapReview: true }],
      {
        coverExists: true,
        apartmentSlugs: [],
        mapPointPlaceIds: ["cafe-napoli-menton"],
        publicationPlan: {
          publishedOn: "2026-07-29",
          category: "food-markets",
          coverImageStatus: "not_needed",
          relatedPlaceIds: [],
          relatedArticleSlugs: [],
          relatedApartmentSlugs: [],
          canonicalGuideForPlaces: false,
          plannedPlaces: [
            {
              draftName: "Cafe Napoli",
              suggestedExistingPlaceId: "cafe-napoli-menton",
              matchStatus: "ambiguous_match",
              matchReason: "name-similarity+locality",
              topMatches: [{ id: "cafe-napoli-menton", name: "Cafe Napoli Menton", score: 0.88, reason: "name-similarity+locality" }],
              imageStatus: "pending",
              requiresMapReview: true,
              mapAction: "point",
              coverageGuideSlug: null,
            },
          ],
        },
      },
    );

    expect(report.errors.map((issue) => issue.code)).toContain("unresolved-planned-place");
    expect(report.warnings.map((issue) => issue.code)).toContain("ambiguous-place-match");
  });

  it("ignores legacy intake cover path when publication plan marks cover as not needed", () => {
    const intake: GuideIntake = {
      title: "Burger update",
      slug: "burgers-menton",
      seoTitle: "Burger update",
      metaDescription: "Burger update",
      coverPathHint: "/missing/legacy-cover.png",
      sectionHeadings: ["Places"],
      placeCandidates: [],
      relatedGuideTitles: [],
    };

    const report = buildGuideCheckReport(intake, [], [], {
      coverExists: false,
      publicationPlan: {
        publishedOn: "2026-07-28",
        category: "food-markets",
        coverImageStatus: "not_needed",
        relatedPlaceIds: [],
        relatedArticleSlugs: [],
        relatedApartmentSlugs: [],
        plannedPlaces: [],
        canonicalGuideForPlaces: false,
      },
    });

    expect(report.errors.map((issue) => issue.code)).not.toContain("missing-cover-file");
  });

  it("fails when a place is marked existing but the repo still has no image", () => {
    const intake: GuideIntake = {
      title: "Burger update",
      slug: "burgers-menton",
      seoTitle: "Burger update",
      metaDescription: "Burger update",
      coverPathHint: undefined,
      sectionHeadings: ["Places"],
      placeCandidates: [],
      relatedGuideTitles: [],
    };

    const report = buildGuideCheckReport(
      intake,
      [],
      [{ id: "alls-stars-menton", name: "All's Stars", image: undefined }],
      {
        coverExists: true,
        apartmentSlugs: [],
        mapPointPlaceIds: [],
        mapExclusionPlaceIds: [],
        publicationPlan: {
          publishedOn: "2026-07-28",
          category: "food-markets",
          coverImageStatus: "not_needed",
          relatedPlaceIds: ["alls-stars-menton"],
          relatedArticleSlugs: [],
          relatedApartmentSlugs: [],
          canonicalGuideForPlaces: false,
          plannedPlaces: [
            {
              draftName: "All's Stars",
              existingPlaceId: "alls-stars-menton",
              imageStatus: "existing",
              requiresMapReview: false,
              mapAction: "not_needed",
              coverageGuideSlug: "burgers-menton",
            },
          ],
        },
      },
    );

    expect(report.errors.map((issue) => issue.code)).toContain("existing-place-image-expected");
  });
});

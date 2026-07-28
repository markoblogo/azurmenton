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
      [{ slug: "best-pizzerias-menton", title: "Best pizzerias in Menton: restaurants, slices, takeaway and delivery" }],
      [{ id: "alls-stars-menton", name: "All's Stars Menton" }],
      { coverExists: true },
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
      expect.arrayContaining(["missing-title", "invalid-slug", "missing-seo-title", "missing-meta-description"]),
    );
    expect(report.warnings.map((issue) => issue.code)).toEqual(
      expect.arrayContaining(["no-sections", "no-place-candidates"]),
    );
  });
});


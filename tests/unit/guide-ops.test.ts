import { describe, expect, it } from "vitest";

import { buildGuideOpsSummary } from "../../src/lib/guide-ops";

describe("guide ops summary", () => {
  it("classifies ready, blocked and incomplete intakes", () => {
    const summary = buildGuideOpsSummary([
      {
        slug: "ready-guide",
        hasIntake: true,
        hasPublicationPlan: true,
        hasCheckReport: true,
        publishReady: true,
        publishHeadline: "Publish ready.",
        reviewOk: true,
        reviewHeadline: "Review ok.",
      },
      {
        slug: "blocked-guide",
        hasIntake: true,
        hasPublicationPlan: true,
        hasCheckReport: true,
        publishReady: false,
        publishHeadline: "Publish blocked.",
        publishBlockers: ["[missing-cover] Cover missing."],
        reviewOk: null,
      },
      {
        slug: "incomplete-guide",
        hasIntake: true,
        hasPublicationPlan: true,
        hasCheckReport: false,
        publishReady: null,
        reviewOk: null,
      },
    ]);

    expect(summary.counts).toEqual({
      ready: 1,
      blocked: 1,
      incomplete: 1,
      total: 3,
    });

    expect(summary.items[0]).toEqual(
      expect.objectContaining({
        slug: "blocked-guide",
        status: "blocked",
      }),
    );
    expect(summary.items[1]).toEqual(
      expect.objectContaining({
        slug: "incomplete-guide",
        status: "incomplete",
      }),
    );
    expect(summary.items[2]).toEqual(
      expect.objectContaining({
        slug: "ready-guide",
        status: "ready",
      }),
    );
  });
});

import { describe, expect, it } from "vitest";
import { buildGuideHealthReport, classifyGuideHealth, type GuideHealthInput } from "../../src/lib/guides-health";

const guide = (overrides: Partial<GuideHealthInput> = {}): GuideHealthInput => ({
  id: "guide-1",
  slug: "sample-guide",
  title: { en: "Sample guide", fr: "Guide exemple", it: "Guida esempio", uk: "Приклад гіда" },
  category: "walks-views",
  sourceStatus: "editorial",
  publishedOn: "2024-01-01",
  sections: [],
  ...overrides,
});

describe("guide freshness observatory", () => {
  it("does not mark old low-volatility narrative content stale solely by age", () => {
    expect(classifyGuideHealth(guide(), { today: "2026-08-08" })).toMatchObject({
      volatility: "LOW_VOLATILITY",
      status: "UNKNOWN",
    });
  });

  it("surfaces high-volatility content without recent evidence", () => {
    expect(classifyGuideHealth(guide({ category: "practical", sourceStatus: "verified" }), { today: "2026-08-08" })).toMatchObject({
      volatility: "HIGH_VOLATILITY",
      status: "PROVENANCE_WEAK",
    });
  });

  it("does not turn missing provenance into CURRENT", () => {
    const result = classifyGuideHealth(guide({ category: "practical", publishedOn: "2026-08-01", sourceStatus: "needs_verification" }), { today: "2026-08-08" });
    expect(result.status).not.toBe("CURRENT");
    expect(result.reason).toMatch(/verification|provenance/i);
  });

  it("reports localization completeness separately from unknown localization drift", () => {
    const result = classifyGuideHealth(guide({ title: { en: "Only English" } as GuideHealthInput["title"] }), { today: "2026-08-08" });
    expect(result.localization).toMatchObject({ status: "INCOMPLETE", missingLocales: ["fr", "it", "uk"] });
    expect(result.localization.drift).toBe("UNKNOWN");
  });

  it("keeps human and machine report counts deterministic", () => {
    const report = buildGuideHealthReport(
      [guide({ slug: "low" }), guide({ slug: "high", category: "practical", sourceStatus: "needs_verification" })],
      { today: "2026-08-08", generatedAt: "2026-08-08T00:00:00.000Z" },
    );
    expect(report.generatedAt).toBe("2026-08-08T00:00:00.000Z");
    expect(report.summary.total).toBe(2);
    expect(report.summary.statuses.UNKNOWN).toBe(1);
    expect(report.summary.statuses.PROVENANCE_WEAK).toBe(1);
    expect(report.priorityReview[0].slug).toBe("high");
    expect(report.inventory[0].contentModificationSignal).toBe("UNKNOWN_PER_GUIDE");
  });
});

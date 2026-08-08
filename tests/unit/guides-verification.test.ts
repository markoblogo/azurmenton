import { describe, expect, it } from "vitest";
import { buildChangeProposals, buildGuideVerificationReport, validateVerificationDossier, type GuideVerificationDossier } from "../../src/lib/guides-verification";
import { classifyGuideHealth, type GuideHealthInput } from "../../src/lib/guides-health";

const baseGuide: GuideHealthInput = {
  id: "pilot-1",
  slug: "pilot-guide",
  title: { en: "Pilot", fr: "Pilote", it: "Pilota", uk: "Пілот" },
  category: "practical",
  sourceStatus: "needs_verification",
};

const dossier = (claim = {}): GuideVerificationDossier => ({
  schemaVersion: "v1",
  observedDate: "2026-08-08",
  mode: "BOUNDED_READ_ONLY_PILOT",
  policy: { autoApply: false, externalRequestsByDefault: false, contentMutation: false },
  pilotGuides: [{
    guideSlug: "pilot-guide",
    selectionReason: "representative practical pilot",
    volatility: "HIGH_VOLATILITY",
    sources: [{ id: "official", url: "https://example.com", sourceType: "OFFICIAL_PRIMARY", authority: "HIGH", classificationReason: "first-party", checkedAt: "2026-08-08" }],
    claims: [{ id: "hours", kind: "SERVICE_AVAILABILITY", currentValue: "09:00", observedValue: "10:00", sourceId: "official", locales: ["en", "fr", "it", "uk"], verifiedAt: "2026-08-08", verificationMethod: "MANUAL_READ_ONLY", confidence: "HIGH", result: "CONFIRMED", changeDetected: false, reviewer: "codex", ...claim }],
  }],
});

describe("guide provenance verification loop", () => {
  it("validates a minimal official-source dossier", () => expect(() => validateVerificationDossier(dossier())).not.toThrow());

  it("keeps unavailable or ambiguous evidence unverified", () => {
    const report = buildGuideVerificationReport([baseGuide], dossier({ result: "SOURCE_UNAVAILABLE", confidence: "LOW" }));
    expect(report.guides[0].confirmedClaimCount).toBe(0);
    expect(classifyGuideHealth(baseGuide, { today: "2026-08-08", verificationRecords: dossier().pilotGuides }).status).toBe("CURRENT");
    expect(classifyGuideHealth(baseGuide, { today: "2026-08-08", verificationRecords: dossier({ result: "SOURCE_UNAVAILABLE", confidence: "LOW" }).pilotGuides }).status).toBe("PROVENANCE_WEAK");
  });

  it("turns a detected difference into a review proposal", () => {
    const changed = dossier({ result: "CHANGE_DETECTED", changeDetected: true });
    expect(buildChangeProposals(changed)).toMatchObject([{ action: "REVIEW_UPDATE", guideSlug: "pilot-guide", claimId: "hours" }]);
  });

  it("does not mutate guide input while producing evidence", () => {
    const before = JSON.stringify(baseGuide);
    buildGuideVerificationReport([baseGuide], dossier());
    expect(JSON.stringify(baseGuide)).toBe(before);
  });

  it("supports one shared fact across all locales", () => {
    expect(dossier().pilotGuides[0].claims[0].locales).toEqual(["en", "fr", "it", "uk"]);
  });

  it("leaves unknown guides possible", () => {
    const narrative = { ...baseGuide, slug: "unknown-guide", sourceStatus: "editorial" as const };
    expect(classifyGuideHealth(narrative, { today: "2026-08-08" }).status).toBe("UNKNOWN");
  });
});

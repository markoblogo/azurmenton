import { describe, expect, it } from "vitest";
import { getGuideArticle } from "@/content/guide";
import { getGuideAuthorityProfile, guideAuthorityProfiles } from "@/content/guide-authority";
import { locales } from "@/i18n/locales";

describe("guide authority profiles", () => {
  it("covers exactly twenty published guides with valid review metadata", () => {
    expect(Object.keys(guideAuthorityProfiles)).toHaveLength(20);

    for (const [slug, profile] of Object.entries(guideAuthorityProfiles)) {
      expect(getGuideArticle(slug), `${slug} should resolve to a guide`).toBeDefined();
      expect(profile.reviewedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(profile.sources.length).toBeGreaterThan(0);
      expect(profile.sources.every((source) => source.url.startsWith("https://"))).toBe(true);
      expect(profile.plan.steps).toHaveLength(3);
    }
  });

  it("localizes authority details and practical plans in every public locale", () => {
    for (const slug of Object.keys(guideAuthorityProfiles)) {
      for (const locale of locales) {
        const profile = getGuideAuthorityProfile(slug, locale);
        expect(profile?.author.length).toBeGreaterThan(0);
        expect(profile?.reviewNote.length).toBeGreaterThan(0);
        expect(profile?.sources.every((source) => source.label.length > 0)).toBe(true);
        expect(profile?.plan.title.length).toBeGreaterThan(0);
        expect(profile?.plan.steps.every((step) => step.label.length > 0 && step.text.length > 0)).toBe(true);
      }
    }
  });
});

import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { royaGuide } from "../../src/content/roya-guide";
import { getLatestLandingGuideSlug } from "../../src/content/guide";
import { places } from "../../src/content/places";

describe("Roya guide publication", () => {
  it("keeps the complete outline, comparison tables and real translations", () => {
    expect(royaGuide.sections).toHaveLength(19);
    for (const locale of ["en", "fr", "it", "uk"] as const) {
      expect(royaGuide.sections.filter(section => /^\d+\./.test(section.heading[locale]))).toHaveLength(14);
      expect(royaGuide.sections.flatMap(section => section.tables?.[locale] ?? [])).toHaveLength(2);
      expect(royaGuide.sections[0].body[0][locale]).not.toContain("Recommended duration:");
      for (const section of royaGuide.sections) {
        expect(section.body[0][locale].length).toBeGreaterThan(80);
        if (locale === "uk") expect(section.heading.uk).toMatch(/[А-Яа-яІіЇїЄє]/);
      }
    }
    expect(royaGuide.sections[1].officialLinks?.some(link => link.url.includes("nice-monaco-vintimille-nice-breil-tende"))).toBe(true);
  });
  it("wires the cover, latest slot, apartment choices and reciprocal places", () => {
    expect(getLatestLandingGuideSlug([royaGuide])).toBe(royaGuide.slug);
    expect(existsSync(`public${royaGuide.coverImage}`)).toBe(true);
    expect(royaGuide.relatedApartments).toHaveLength(3);
    for (const id of royaGuide.sections.flatMap(section => section.relatedPlaceIds ?? [])) {
      expect(places.find(place => place.id === id)?.relatedArticleIds, id).toContain(royaGuide.slug);
    }
    const newIds = ["saorge", "fontan", "monastere-saorge", "notre-dame-fontaines-la-brigue", "santa-maria-in-albis-breil", "ecomusee-transports-breil"];
    for (const id of newIds) expect(places.find(place => place.id === id), id).toBeDefined();
  });
});

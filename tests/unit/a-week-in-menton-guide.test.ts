import { describe, expect, it } from "vitest";
import { aWeekInMentonGuide as guide } from "../../src/content/a-week-in-menton-guide";
import { getLatestLandingGuideSlug } from "../../src/content/guide";

describe("A Week in Menton literary route", () => {
  it("keeps the seven real places, separate Villefranche stop and the book images", () => {
    expect(guide.sections.slice(3, 10).map((section) => section.relatedPlaceIds?.[0])).toEqual([
      "promenade-du-soleil", "rue-saint-michel-menton", "halles-du-marche", "basilica-saint-michel-archange",
      "plage-sablettes", "cimetiere-vieux-chateau", "villefranche-sur-mer",
    ]);
    expect(guide.sections[0].imageLayout).toBe("portrait");
    expect(guide.sections[0].image).toContain("book-cover");
    expect(guide.sections[1].image).toContain("book-walking-route");
    expect(getLatestLandingGuideSlug([guide])).toBe(guide.slug);
  });
  it("links to the confirmed formats and contains substantial text in every locale", () => {
    const body = guide.sections[1].body.map((paragraph) => paragraph.en).join("\n");
    expect(body).toContain("[Kindle edition on Amazon](https://www.amazon.com/dp/B0HPKXPCPV)");
    expect(body).toContain("[Illustrated paperback on Amazon](https://www.amazon.com/dp/B0HPLDC157)");
    for (const locale of ["en", "fr", "it", "uk"] as const) {
      expect(guide.sections).toHaveLength(16);
      expect(guide.sections.map((section) => section.body.map((text) => text[locale]).join(" ")).join(" ").length).toBeGreaterThan(10000);
      expect(guide.sections[2].tables?.[locale]?.[0].rows).toHaveLength(6);
    }
  });
});

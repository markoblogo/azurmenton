import { describe, expect, it } from "vitest";
import { aWeekInMentonGuide as guide } from "../../src/content/a-week-in-menton-guide";
import { getLatestLandingGuideSlug, guideArticles } from "../../src/content/guide";

describe("A Week in Menton literary route", () => {
  it("keeps the seven real places, separate Villefranche stop and the book images", () => {
    expect(guide.sections.slice(3, 10).map((section) => section.relatedPlaceIds?.[0])).toEqual([
      "promenade-du-soleil", "rue-saint-michel-menton", "halles-du-marche", "basilica-saint-michel-archange",
      "plage-sablettes", "cimetiere-vieux-chateau", "villefranche-sur-mer",
    ]);
    expect(guide.sections[0].imageLayout).toBe("portrait");
    expect(guide.sections[0].image).toContain("book-cover");
    expect(guide.sections[1].image).toContain("book-walking-route");
    expect(getLatestLandingGuideSlug(guideArticles)).toBe(guide.slug);
  });
  it("links to the confirmed formats and contains substantial text in every locale", () => {
    const links = guide.sections[1].officialLinks ?? [];
    expect(links.find((link) => link.url.endsWith("B0HPKXPCPV"))?.label.en).toContain("Kindle");
    expect(links.find((link) => link.url.endsWith("B0HPLDC157"))?.label.en).toContain("paperback");
    for (const locale of ["en", "fr", "it", "uk"] as const) {
      expect(guide.sections).toHaveLength(16);
      expect(guide.sections.map((section) => section.body.map((text) => text[locale]).join(" ")).join(" ").length).toBeGreaterThan(10000);
      expect(guide.sections[2].tables?.[locale]?.[0].rows).toHaveLength(6);
    }
  });
});

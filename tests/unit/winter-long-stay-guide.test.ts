import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { guideArticles, localizeGuideArticle } from "../../src/content/guide";
import { places } from "../../src/content/places";
import { contentCollections } from "../../src/content/content-map";

const slug = "winter-in-menton-one-two-months";
describe("one or two winter months guide", () => {
  it("keeps eight aligned tables and clearly hypothetical housing budgets", () => {
    const guide = guideArticles.find(article => article.slug === slug)!;
    expect(guide.publishedOn).toBe("2026-11-05");
    for (const locale of ["en", "fr", "it", "uk"] as const) {
      const article = localizeGuideArticle(guide, locale);
      expect(article.sections).toHaveLength(18);
      expect(article.sections.flatMap(section => section.tables ?? []).map(table => table.rows.length)).toEqual([11, 4, 12, 5, 3, 3, 3, 7]);
      const text = article.sections.flatMap(section => section.body).join("\n");
      expect(text).not.toMatch(/SEO title:|Suggested URL:|1991.2020|91 mm|950.1,350|\[ \]\(/);
      expect(text).toContain("2027");
      expect(text).toContain("180");
      expect(text).toContain("90");
      expect(text).toContain("€38");
      expect(text).toContain("Azur Menton");
      expect(article.sections[5].tables?.map(table => table.rows.at(-1)?.at(-1))).toEqual(locale === "en" ? ["€1,960", "€2,500", "€4,460", "€8,920"] : locale === "it" ? ["€1.960", "€2.500", "€4.460", "€8.920"] : ["€1 960", "€2 500", "€4 460", "€8 920"]);
    }
  });
  it("reuses five illustrated places with reciprocal links and no new promises", () => {
    const guide = guideArticles.find(article => article.slug === slug)!;
    expect(existsSync(`public${guide.coverImage}`)).toBe(true);
    expect(guide.relatedPlaces).toHaveLength(5);
    for (const id of guide.relatedPlaces ?? []) {
      const place = places.find(place => place.id === id)!;
      expect(place.relatedArticleIds).toContain(slug);
      expect(place.image).toBeTruthy();
      expect(existsSync(`public${place.image}`)).toBe(true);
    }
    for (const id of guide.relatedArticles ?? []) expect(guideArticles.find(article => article.slug === id)?.relatedArticles).toContain(slug);
    expect(contentCollections.find(collection => collection.id === "practical-stay")?.includeGuideSlugs).toContain(slug);
    expect(guide.relatedApartments).toHaveLength(3);
    expect(guide.showTransportHelper).toBe(true);
  });
});

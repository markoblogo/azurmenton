import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { guideArticles, localizeGuideArticle } from "../../src/content/guide";
import { places } from "../../src/content/places";
import { contentCollections } from "../../src/content/content-map";

const slug = "rebecca-2020-riviera-filming-locations";
describe("Rebecca 2020 filming guide", () => {
  it("preserves the localized structure, tables and distinction from the novel", () => {
    const guide = guideArticles.find(article => article.slug === slug)!;
    expect(guide).toBeTruthy();
    for (const locale of ["en", "fr", "it", "uk"] as const) {
      const article = localizeGuideArticle(guide, locale);
      expect(article.sections).toHaveLength(20);
      expect(article.sections.flatMap(section => section.tables ?? []).map(table => table.rows.length)).toEqual([7, 3, 3, 6, 12]);
      const body = article.sections.flatMap(section => section.body).join("\n");
      for (const marker of ["1938", "2020", "2026", "Waddesdon", "Eilenroc", "12"]) expect(body).toContain(marker);
      expect(body).not.toMatch(/SEO title:|Suggested URL:|Рекомендация|Редакторская|future On Screen/);
      expect(body).toContain("https://www.jardin-exotique.mc/fr/preparer-ma-visite");
    }
    expect(contentCollections.find(item => item.id === "books-films-and-art")?.includeGuideSlugs).toContain(slug);
    expect(guide.relatedArticles).toContain("rebecca-monte-carlo-daphne-du-maurier-literary-walk");
  });
  it("uses illustrated places and reciprocal links without granting private access", () => {
    const guide = guideArticles.find(article => article.slug === slug)!;
    expect(guide).toBeTruthy();
    expect(existsSync(`public${guide.coverImage}`)).toBe(true);
    for (const id of guide.relatedPlaces ?? []) {
      const place = places.find(place => place.id === id)!;
      expect(place).toBeTruthy();
      expect(place.relatedArticleIds).toContain(slug);
      expect(place.image).toBeTruthy();
      expect(existsSync(`public${place.image}`)).toBe(true);
    }
    for (const id of guide.relatedArticles ?? []) expect(guideArticles.find(article => article.slug === id)?.relatedArticles).toContain(slug);
    expect(places.find(place => place.id === "le-regina-nice")?.visitorAccess).toBe("ask-first");
    expect(guide.relatedPlaces).toContain("villa-eilenroc-antibes");
    expect(guide.relatedPlaces).toContain("jardin-exotique-monaco");
  });
});

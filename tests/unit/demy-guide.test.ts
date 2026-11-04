import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { guideArticles, localizeGuideArticle } from "../../src/content/guide";
import { places } from "../../src/content/places";
import { contentCollections } from "../../src/content/content-map";

const slug = "la-baie-des-anges-jacques-demy-riviera-filming-locations";
describe("Demy Riviera guide", () => {
  it("keeps complete localized research boundaries and four comparison tables", () => {
    const guide = guideArticles.find(article => article.slug === slug)!;
    expect(guide).toBeTruthy();
    for (const locale of ["en", "fr", "it", "uk"] as const) {
      const article = localizeGuideArticle(guide, locale);
      expect(article.sections).toHaveLength(18);
      expect(article.sections.flatMap(section => section.tables ?? []).map(table => table.rows.length)).toEqual([7, 6, 3, 10]);
      const text = article.sections.flatMap(section => section.body).join("\n");
      for (const marker of ["1962", "1963", "84", "79", "90", "2027", "Enghien", "Villefranche", "403"]) expect(text).toContain(marker);
      expect(text).not.toMatch(/SEO title:|Suggested URL:|Что особенно важно|Карта прогулки|future On Screen/);
    }
    expect(existsSync(`public${guide.coverImage}`)).toBe(true);
    expect(contentCollections.find(item => item.id === "books-films-and-art")?.includeGuideSlugs).toContain(slug);
  });
  it("reuses real places and reciprocal guide links", () => {
    const guide = guideArticles.find(article => article.slug === slug)!;
    expect(guide).toBeTruthy();
    for (const id of guide.relatedPlaces ?? []) {
      const place = places.find(place => place.id === id)!;
      expect(place.relatedArticleIds).toContain(slug);
      expect(place.image).toBeTruthy();
      expect(existsSync(`public${place.image}`)).toBe(true);
    }
    for (const id of guide.relatedArticles ?? []) expect(guideArticles.find(article => article.slug === id)?.relatedArticles).toContain(slug);
    expect(guide.relatedPlaces).toContain("promenade-des-anglais-nice");
    expect(guide.relatedPlaces).not.toContain("jardin-albert-premier-christmas-nice");
  });
});

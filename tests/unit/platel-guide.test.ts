import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { guideArticles, localizeGuideArticle } from "../../src/content/guide";
import { places } from "../../src/content/places";
import { contentCollections } from "../../src/content/content-map";

const slug = "les-derniers-feux-de-la-royaute-menton";
const guide = guideArticles.find(article => article.slug === slug)!;

describe("Platel historical romance guide", () => {
  it("keeps four localized versions and aligned historical tables", () => {
    expect(guide.publishedOn).toBe("2026-11-04");
    for (const locale of ["en", "fr", "it", "uk"] as const) {
      const article = localizeGuideArticle(guide, locale);
      expect(article.sections).toHaveLength(16);
      expect(article.sections[3].tables?.[0].rows).toHaveLength(8);
      expect(article.sections[10].tables?.[0].rows).toHaveLength(9);
      const text = article.sections.flatMap(section => section.body).join("\n");
      expect(text).toContain("352");
      expect(text).toContain("1701");
      expect(text).toContain("1819");
      expect(text).not.toMatch(/SEO title:|Suggested URL:|Рекомендации для AzurMenton|1701–1702|damask|Forsani|Forcini|\[ \]/);
      expect(article.sections[15].body.join(" ")).toContain("2026");
    }
  });

  it("reuses five illustrated places and reciprocal editorial links", () => {
    expect(guide.relatedPlaces).toHaveLength(5);
    expect(guide.sections[7].relatedPlaceIds).toHaveLength(4);
    for (const id of guide.relatedPlaces ?? []) {
      const place = places.find(item => item.id === id)!;
      expect(place.relatedArticleIds).toContain(slug);
      expect(place.image).toBeTruthy();
      expect(existsSync(`public${place.image}`)).toBe(true);
    }
    for (const id of guide.relatedArticles ?? []) expect(guideArticles.find(item => item.slug === id)?.relatedArticles).toContain(slug);
    expect(contentCollections.find(item => item.id === "books-films-and-art")?.includeGuideSlugs).toContain(slug);
    expect(existsSync(`public${guide.coverImage}`)).toBe(true);
    expect(guide.bookRecommendation).toBeUndefined();
  });
});

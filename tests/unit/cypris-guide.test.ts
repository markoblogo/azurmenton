import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { guideArticles, localizeGuideArticle } from "../../src/content/guide";
import { places } from "../../src/content/places";
import { contentCollections } from "../../src/content/content-map";
import { placeMapExclusions } from "../../src/content/planning/place-map-exclusions";

const slug = "mortelle-randonnee-villa-cypris-filming-location";
const guide = guideArticles.find(article => article.slug === slug)!;
const villa = "villa-cypris-roquebrune-cap-martin";

describe("Villa Cypris cinema guide", () => {
  it("preserves four complete versions, comparison table and qualified source evidence", () => {
    expect(guide.publishedOn).toBe("2026-11-04");
    for (const locale of ["en", "fr", "it", "uk"] as const) {
      const article = localizeGuideArticle(guide, locale);
      expect(article.sections).toHaveLength(17);
      expect(article.sections[10].tables?.[0].rows).toHaveLength(7);
      const text = article.sections.flatMap(section => section.body).join("\n");
      for (const marker of ["1904", "1990", "120", "96", "101", "2026", "L2TC"]) expect(text).toContain(marker);
      expect(article.sections[7].body.join(" ")).toMatch(/4[.,]7/);
      expect(article.sections[7].body.join(" ")).toContain("2027");
      expect(article.sections[16].body.join(" ")).toContain("PA00080958");
      expect(text).not.toMatch(/SEO title:|Suggested URL:|Что я рекомендую|Где находится|images\.openai\.com|IMDb|\[ \]/);
    }
  });

  it("keeps the private estate illustrated, map-excluded and connected to a relevant older walk", () => {
    expect(guide.relatedPlaces).toHaveLength(3);
    for (const id of guide.relatedPlaces ?? []) {
      const place = places.find(item => item.id === id)!;
      expect(place.relatedArticleIds).toContain(slug);
      expect(place.image).toBeTruthy();
      expect(existsSync(`public${place.image}`)).toBe(true);
    }
    expect(places.find(item => item.id === villa)?.visitorAccess).toBe("ask-first");
    expect(placeMapExclusions.some(item => item.placeId === villa && item.reason === "coordinate_unverified")).toBe(true);
    expect(guideArticles.find(item => item.slug === "best-walks-and-hikes-around-menton")?.relatedPlaces).toContain(villa);
    for (const id of guide.relatedArticles ?? []) expect(guideArticles.find(item => item.slug === id)?.relatedArticles).toContain(slug);
    expect(contentCollections.find(item => item.id === "books-films-and-art")?.includeGuideSlugs).toContain(slug);
    expect(existsSync(`public${guide.coverImage}`)).toBe(true);
  });
});

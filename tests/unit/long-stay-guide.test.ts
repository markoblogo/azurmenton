import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { guideArticles, localizeGuideArticle } from "../../src/content/guide";
import { places } from "../../src/content/places";
import { contentCollections } from "../../src/content/content-map";

const slug = "long-stay-menton-apartment-living";
describe("long-stay apartment guide", () => {
  it("retains aligned weekly budgets and a repaired weekly plan in four locales", () => {
    const guide = guideArticles.find(article => article.slug === slug)!;
    expect(guide.publishedOn).toBe("2026-11-05");
    for (const locale of ["en", "fr", "it", "uk"] as const) {
      const article = localizeGuideArticle(guide, locale);
      expect(article.sections).toHaveLength(18);
      expect(article.sections.flatMap(section => section.tables ?? []).map(table => table.rows.length)).toEqual([11, 5, 5, 3, 7, 7, 6]);
      const body = article.sections.flatMap(section => section.body).join("\n");
      expect(body).not.toMatch(/<escape>|SEO title:|Suggested URL:|\[ \]\(/);
      expect(article.sections[11].body.join(" ")).toContain("Menton Garavan");
      expect(article.sections[11].body.join(" ")).toContain("19");
      expect(article.sections[17].body.join(" ")).toContain("https://www.zestbus.fr/tarifs/");
      expect(article.sections[4].tables?.[0].rows.at(-1)?.join(" ")).toContain("€700");
    }
    expect(localizeGuideArticle(guide, "en").sections[4].body.join(" ")).toContain("not a survey");
  });
  it("reuses illustrated places and reciprocal practical links", () => {
    const guide = guideArticles.find(article => article.slug === slug)!;
    expect(existsSync(`public${guide.coverImage}`)).toBe(true);
    expect(guide.relatedPlaces).toHaveLength(3);
    for (const id of guide.relatedPlaces ?? []) {
      const place = places.find(place => place.id === id)!;
      expect(place.relatedArticleIds).toContain(slug);
      expect(place.image).toBeTruthy();
      expect(existsSync(`public${place.image}`)).toBe(true);
    }
    for (const id of guide.relatedArticles ?? []) expect(guideArticles.find(article => article.slug === id)?.relatedArticles).toContain(slug);
    expect(contentCollections.find(collection => collection.id === "practical-stay")?.includeGuideSlugs).toContain(slug);
    expect(guide.relatedApartments).toHaveLength(3);
  });
});

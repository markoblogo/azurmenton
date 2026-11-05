import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { guideArticles, localizeGuideArticle } from "../../src/content/guide";
import { places } from "../../src/content/places";
import { contentCollections } from "../../src/content/content-map";

const slug = "katherine-mansfield-menton-stories-isola-bella";
describe("Katherine Mansfield literary guide", () => {
  it("preserves the chronology, story and reading tables in four languages", () => {
    const guide = guideArticles.find(article => article.slug === slug)!;
    expect(guide).toBeTruthy();
    expect(guide.publishedOn).toBe("2026-11-05");
    for (const locale of ["en", "fr", "it", "uk"] as const) {
      const article = localizeGuideArticle(guide, locale);
      expect(article.sections).toHaveLength(20);
      expect(article.sections.flatMap(section => section.tables ?? []).map(table => table.rows.length)).toEqual([7, 9, 6]);
      const body = article.sections.flatMap(section => section.body).join("\n");
      for (const marker of ["1888", "1923", "Ida", "1920", "1921", "1970", "1974", "2013"]) {
        if (marker !== "Ida" || locale !== "uk") expect(body).toContain(marker);
      }
      expect(body).toContain("https://katherinemansfieldsociety.org/katherine-mansfield-resources/stories/");
      expect(body).not.toMatch(/SEO title:|Suggested URL:|Что особенно важно|## Карта|Menton, Riviera & Merveilles Tourist Office\+2/);
      expect(article.sections[14].body.join(" ")).toMatch(/27/);
      expect(article.sections[11].body.join(" ")).toContain("The Garden Party");
    }
    expect(localizeGuideArticle(guide, "en").sections[3].body.join(" ")).toContain("before her move from Ospedaletti to Menton");
    expect(localizeGuideArticle(guide, "en").sections[14].body.join(" ")).toContain("2 to 27 November inclusive");
    expect(localizeGuideArticle(guide, "en").sections[19].body.join(" ")).toContain("not a verified published edition");
  });
  it("reuses only illustrated places with reciprocal links and no new private venue", () => {
    const guide = guideArticles.find(article => article.slug === slug)!;
    expect(existsSync(`public${guide.coverImage}`)).toBe(true);
    expect(guide.relatedPlaces).toHaveLength(5);
    for (const id of guide.relatedPlaces ?? []) {
      const place = places.find(place => place.id === id)!;
      expect(place.relatedArticleIds).toContain(slug);
      expect(place.image).toBeTruthy();
      expect(existsSync(`public${place.image}`)).toBe(true);
    }
    expect(places.find(place => place.id === "villa-isola-bella-menton")?.visitorAccess).toBe("ask-first");
    for (const id of guide.relatedArticles ?? []) expect(guideArticles.find(article => article.slug === id)?.relatedArticles).toContain(slug);
    expect(contentCollections.find(collection => collection.id === "books-films-and-art")?.includeGuideSlugs).toContain(slug);
    expect(guideArticles.find(article => article.slug === "janet-frame-menton-in-the-memorial-room")?.sections[3].guideLinkSlug).toBe(slug);
  });
});

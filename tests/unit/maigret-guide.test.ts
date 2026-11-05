import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { guideArticles, localizeGuideArticle } from "../../src/content/guide";
import { places } from "../../src/content/places";
import { contentCollections } from "../../src/content/content-map";
import { placeMapExclusions } from "../../src/content/planning/place-map-exclusions";

const slug = "maigret-liberty-bar-antibes-cannes";
describe("Maigret thematic Riviera guide", () => {
  it("preserves all sections, the distinction table and source limits in four languages", () => {
    const guide = guideArticles.find(article => article.slug === slug)!;
    expect(guide.publishedOn).toBe("2026-11-05");
    expect(existsSync(`public${guide.coverImage}`)).toBe(true);
    for (const locale of ["en", "fr", "it", "uk"] as const) {
      const article = localizeGuideArticle(guide, locale);
      expect(article.sections).toHaveLength(20);
      expect(article.sections.flatMap(section => section.tables ?? []).map(table => table.rows.length)).toEqual([3]);
      const body = article.sections.flatMap(section => section.body).join("\n");
      expect(body).not.toMatch(/SEO title:|Suggested URL:|Карта литературного|Редакторские рекомендации/);
      expect(article.sections[11].body.join(" ")).toContain("2026");
      expect(article.sections[14].body.join(" ")).toContain(locale === "uk" ? "Бруно" : "Bruno");
      expect(article.sections[19].body.join(" ")).toContain("simenon.com/events/");
    }
    expect(guide.showTransportHelper).toBe(true);
    expect(guide.transportHelperAfterSectionIndex).toBe(11);
  });
  it("links seven real places, not a fabricated bar, with explicit coordinate exclusions", () => {
    const guide = guideArticles.find(article => article.slug === slug)!;
    expect(guide.relatedPlaces).toHaveLength(7);
    for (const id of guide.relatedPlaces ?? []) {
      const place = places.find(place => place.id === id)!;
      expect(place.relatedArticleIds).toContain(slug);
      expect(place.image).toBeTruthy();
      if (place.requiresMapReview) expect(placeMapExclusions.find(entry => entry.placeId === id)?.reason).toBe("coordinate_unverified");
    }
    expect(guide.relatedPlaces?.some(id => id.includes("liberty-bar"))).toBe(false);
    for (const id of guide.relatedArticles ?? []) expect(guideArticles.find(article => article.slug === id)?.relatedArticles).toContain(slug);
    expect(contentCollections.find(collection => collection.id === "books-films-and-art")?.includeGuideSlugs).toContain(slug);
    expect(guideArticles.find(article => article.slug === "day-trips-from-menton")?.sections.some(section => section.guideLinkSlug === slug)).toBe(true);
  });
});

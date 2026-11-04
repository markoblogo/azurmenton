import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { guideArticles, localizeGuideArticle } from "../../src/content/guide";
import { places } from "../../src/content/places";
import { placeMapExclusions } from "../../src/content/planning/place-map-exclusions";

const slug = "joy-house-les-felins-villa-torre-clementina";
describe("Joy House guide", () => {
  it("preserves four localized structures, evidence tables and access boundaries", () => {
    const guide = guideArticles.find(article => article.slug === slug)!;
    expect(guide).toBeTruthy();
    expect(guide.publishedOn).toBe("2026-11-05");
    for (const locale of ["en", "fr", "it", "uk"] as const) {
      const article = localizeGuideArticle(guide, locale);
      expect(article.sections).toHaveLength(19);
      expect(article.sections.flatMap(section => section.tables ?? []).map(table => table.rows.length)).toEqual([7, 12]);
      const body = article.sections.flatMap(section => section.body).join("\n");
      expect(body).toContain("1963");
      expect(article.sections.flatMap(section => section.tables ?? []).flatMap(table => table.rows.flat()).join(" ")).toContain("1991");
      expect(body).toContain("https://www.oetkerhotels.com/media/66765/hotelducapedenroc-exposition-parismatch2023.pdf");
      expect(body).not.toMatch(/SEO title:|Suggested URL:|Редакторские рекомендации|## Карта:/);
    }
    expect(localizeGuideArticle(guide, "en").sections[12].body.join(" ")).toContain("season ended on 31 October");
    expect(localizeGuideArticle(guide, "en").sections[18].body.join(" ")).toContain("not the date of the photograph");
  });
  it("has complete image coverage and natural reciprocal place and guide links", () => {
    const guide = guideArticles.find(article => article.slug === slug)!;
    expect(existsSync(`public${guide.coverImage}`)).toBe(true);
    for (const id of guide.relatedPlaces ?? []) {
      const place = places.find(place => place.id === id)!;
      expect(place.relatedArticleIds).toContain(slug);
      expect(place.image).toBeTruthy();
      expect(existsSync(`public${place.image}`)).toBe(true);
    }
    for (const id of guide.relatedArticles ?? []) expect(guideArticles.find(article => article.slug === id)?.relatedArticles).toContain(slug);
    const villa = places.find(place => place.id === "villa-torre-clementina-roquebrune-cap-martin")!;
    expect(villa.visitorAccess).toBe("ask-first");
    expect(placeMapExclusions.some(entry => entry.placeId === villa.id && entry.reason === "coordinate_unverified")).toBe(true);
    const cypris = guideArticles.find(article => article.slug === "mortelle-randonnee-villa-cypris-filming-location")!;
    expect(cypris.sections[10].relatedPlaceIds).toContain(villa.id);
    expect(villa.relatedArticleIds).toContain(cypris.slug);
  });
});

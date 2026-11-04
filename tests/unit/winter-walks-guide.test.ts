import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { guideArticles, localizeGuideArticle } from "../../src/content/guide";
import { places } from "../../src/content/places";
import { guideIntentClusters } from "../../src/content/guide-intents";

const slug = "winter-walks-menton-sunshine-short-routes";
const guide = guideArticles.find(article => article.slug === slug)!;

describe("winter walks research guide", () => {
  it("preserves four aligned versions and separates survey plans from measured evidence", () => {
    expect(guide.publishedOn).toBe("2026-11-04");
    for (const locale of ["en", "fr", "it", "uk"] as const) {
      const article = localizeGuideArticle(guide, locale);
      expect(article.sections).toHaveLength(15);
      const tables = article.sections.flatMap(section => section.tables ?? []);
      expect(tables.map(table => table.rows.length)).toEqual([5, 3, 7]);
      expect(tables[0].rows.every(row => row.length === 5)).toBe(true);
      const text = article.sections.flatMap(section => section.body).join("\n");
      for (const marker of ["2026", "Biovès", "Météo-France"]) expect(text).toContain(marker);
      for (const marker of ["10:30", "12:30", "15:00"]) expect(JSON.stringify(tables[1].rows)).toContain(marker);
      expect(text).not.toMatch(/SEO title:|Suggested URL:|\[ \]/);
      const sources = article.sections[14].body.join(" ");
      expect(sources).toContain("CMI-Informations-pratiques.html");
      expect(sources).toContain("vigilance.meteofrance.fr/fr/alpes-maritimes");
      expect(article.sections[3].body.join(" ")).toMatch(/stairs|escaliers|scale|сход/);
      expect(article.sections[10].body.join(" ")).toMatch(/two separate dates|deux dates distinctes|due date distinte|дві різні дати/);
    }
    expect(guide.practicalTips?.[0].en).toContain("no field observation yet");
    expect(guide.coverImageAlt?.en).toContain("Artistic illustration");
  });

  it("reuses eight illustrated places and reciprocal relevant guide links", () => {
    expect(guide.relatedPlaces).toHaveLength(8);
    expect(guide.sections.flatMap(section => section.relatedPlaceIds ?? [])).toEqual(guide.relatedPlaces);
    for (const id of guide.relatedPlaces ?? []) {
      const place = places.find(item => item.id === id)!;
      expect(place.relatedArticleIds).toContain(slug);
      expect(place.image).toBeTruthy();
      expect(existsSync(`public${place.image}`)).toBe(true);
    }
    for (const id of guide.relatedArticles ?? []) expect(guideArticles.find(item => item.slug === id)?.relatedArticles).toContain(slug);
    expect(guideIntentClusters.find(item => item.id === "winter-autumn")?.supportingGuideSlugs).toContain(slug);
    expect(existsSync(`public${guide.coverImage}`)).toBe(true);
  });
});

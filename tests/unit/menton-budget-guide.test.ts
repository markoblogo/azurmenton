import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { guideArticles, localizeGuideArticle } from "../../src/content/guide";
import { places } from "../../src/content/places";

const slug = "menton-holiday-budget";
describe("Menton holiday budget", () => {
  it("preserves all localized budget tables and explicit planning boundaries", () => {
    const guide = guideArticles.find(article => article.slug === slug)!;
    expect(guide).toBeTruthy();
    for (const locale of ["en", "fr", "it", "uk"] as const) {
      const article = localizeGuideArticle(guide, locale);
      expect(article.sections).toHaveLength(14);
      const tables = article.sections.flatMap(section => section.tables ?? []);
      expect(tables.map(table => table.rows.length)).toEqual([4, 5, 9, 7, 7, 9, 5, 3, 3]);
      const amount = (s: string) => Number(s.replace(/[^0-9]/g, ""));
      const daily = [40, 85, 155];
      for (const [row, days] of [3, 7, 14].entries()) expect(tables[0].rows[row].slice(1).map(amount)).toEqual(daily.map(n => n * days));
      for (let column = 1; column <= 3; column++) expect(tables[1].rows.slice(0, 4).reduce((sum, row) => sum + amount(row[column]), 0)).toBe(daily[column - 1]);
      expect(tables[6].rows.slice(0, 4).reduce((sum, row) => sum + amount(row[1]), 0)).toBe(595);
      for (const [row, perDay] of daily.entries()) expect(tables[8].rows[row].slice(1).map(amount)).toEqual([3, 7, 14].map(days => perDay * days * 2));
      const text = article.sections.flatMap(section => section.body).join("\n");
      expect(text).toContain("2026");
      expect(text).toContain("Menton Garavan");
      expect(text).toContain("https://www.zestbus.fr/tarifs/");
      expect(text).not.toMatch(/<escape>|Suggested slug:|Meta title:|\]\(\[https/);
    }
  });
  it("reuses illustrated places with reciprocal contextual links", () => {
    const guide = guideArticles.find(article => article.slug === slug)!;
    expect(guide).toBeTruthy();
    expect(existsSync(`public${guide.coverImage}`)).toBe(true);
    for (const id of guide.relatedPlaces ?? []) {
      const place = places.find(place => place.id === id)!;
      expect(place.relatedArticleIds).toContain(slug);
      expect(place.image).toBeTruthy();
      expect(existsSync(`public${place.image}`)).toBe(true);
    }
    for (const id of guide.relatedArticles ?? []) expect(guideArticles.find(article => article.slug === id)?.relatedArticles).toContain(slug);
    expect(guide.relatedApartments).toHaveLength(3);
  });
});

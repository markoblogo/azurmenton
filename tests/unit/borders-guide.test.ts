import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { guideArticles, localizeGuideArticle } from "../../src/content/guide";
import { places } from "../../src/content/places";
import { guideIntentClusters } from "../../src/content/guide-intents";

const slug = "france-monaco-italy-travel-from-menton";
const guide = guideArticles.find(article => article.slug === slug)!;

describe("France Monaco Italy practical guide", () => {
  it("preserves four aligned versions, dated limitations and three complete tables", () => {
    expect(guide.publishedOn).toBe("2026-11-04");
    for (const locale of ["en", "fr", "it", "uk"] as const) {
      const article = localizeGuideArticle(guide, locale);
      expect(article.sections).toHaveLength(18);
      const tables = article.sections.flatMap(section => section.tables ?? []);
      expect(tables.map(table => table.rows.length)).toEqual([8, 3, 7]);
      expect(tables[0].rows.every(row => row.length === 4)).toBe(true);
      expect(JSON.stringify(tables[1].rows)).toMatch(/35.*50.*80/);
      const text = article.sections.flatMap(section => section.body).join("\n");
      for (const marker of ["2026", "2027", "Orange", "Sosh", "Trenitalia", "CLEISS"]) expect(text).toContain(marker);
      expect(article.sections[9].body.join(" ")).toMatch(/10 December 2027|10 décembre 2027|10 dicembre 2027|10 грудня 2027/);
      expect(article.sections[4].body.join(" ")).toMatch(/30 April 2027|30 avril 2027|30 aprile 2027|30 квітня 2027/);
      expect(article.sections[2].body.join(" ")).toMatch(/France-to-Europe|France–Europe|Francia–Europa|Франція–Європа/);
      expect(article.sections[17].body.join(" ")).toContain("digital-regional-ticket.html");
      expect(text).not.toMatch(/SEO title:|Meta description:|Suggested URL:|\[ \]|11 December 2026|27 October 2026/);
    }
    expect(guide.showTransportHelper).toBe(true);
    expect(guide.transportHelperAfterSectionIndex).toBe(9);
    expect(guide.coverImageAlt?.en).toContain("not a real border junction");
  });

  it("reuses seven illustrated places and relevant reciprocal links", () => {
    expect(guide.relatedPlaces).toHaveLength(7);
    for (const id of guide.relatedPlaces ?? []) {
      const place = places.find(item => item.id === id)!;
      expect(place.relatedArticleIds).toContain(slug);
      expect(place.image).toBeTruthy();
      expect(existsSync(`public${place.image}`)).toBe(true);
    }
    for (const id of guide.relatedArticles ?? []) expect(guideArticles.find(item => item.slug === id)?.relatedArticles).toContain(slug);
    expect(guideIntentClusters.find(item => item.id === "day-trips")?.supportingGuideSlugs).toContain(slug);
    expect(existsSync(`public${guide.coverImage}`)).toBe(true);
  });
});

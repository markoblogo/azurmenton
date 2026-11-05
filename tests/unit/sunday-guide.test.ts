import { existsSync } from "node:fs";
import { expect, it } from "vitest";
import { sundayGuide as guide } from "@/content/sunday-guide";
import records from "@/content/guide-data/menton-sundays-public-holidays.json";
import { guideArticles } from "@/content/guide";
import { getPlaces } from "@/content/places";
import { guideIntentClusters } from "@/content/guide-intents";

it("preserves eighteen aligned blocks, four tables and eight FAQ answers in every locale", () => {
  expect(guideArticles).toContain(guide);
  expect(records).toHaveLength(18);
  for (const locale of ["en", "fr", "it", "uk"] as const) {
    expect(records[15][locale].match(/^### /gm)).toHaveLength(8);
    expect(guide.sections[1].tables?.[locale]?.[0].rows).toHaveLength(11);
    expect(guide.sections[3].tables?.[locale]?.map(table => table.rows.length)).toEqual([2, 3]);
    expect(guide.sections[4].tables?.[locale]?.[0].rows).toHaveLength(11);
    for (const section of guide.sections) expect(section.heading[locale]).not.toMatch(/[*_]/);
    expect(records.map(record => record[locale]).join("\n")).not.toMatch(/SEO title:|Suggested URL:|Meta description:/);
  }
});

it("distinguishes ordinary hours, holiday exceptions, works closures and Sunday nights", () => {
  const en = records.map(record => record.en).join("\n");
  expect(en).toContain("7:00–21:00");
  expect(en).toContain("11 November 2026");
  expect(en.includes("2 through 27 November 2026 inclusive")).toBe(true);
  expect(en).toContain("10 December 2027");
  expect(en.includes("22:00 to 06:00 on nights Sunday–Thursday")).toBe(true);
  expect(en).toContain("Sunday");
  expect(en).toContain("13 December");
  expect(en).toContain("25 December 2026");
  expect(guide.coverImageAlt?.en).toContain("Artistic project illustration");
});

it("reuses illustrated places and reciprocal practical-stay guide links", () => {
  const places = getPlaces(guide.relatedPlaces ?? []);
  expect(places).toHaveLength(12);
  for (const place of places) {
    expect(place.relatedArticleIds).toContain(guide.slug);
    expect(guide.sections.some(section => section.relatedPlaceIds?.includes(place.id))).toBe(true);
    expect(place.image).toBeTruthy();
    expect(existsSync(`public${place.image}`)).toBe(true);
  }
  for (const slug of guide.relatedArticles ?? []) expect(guideArticles.find(article => article.slug === slug)?.relatedArticles).toContain(guide.slug);
  expect(guideIntentClusters.find(cluster => cluster.id === "practical-stay")?.supportingGuideSlugs).toContain(guide.slug);
});

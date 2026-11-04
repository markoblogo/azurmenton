import { existsSync, readFileSync } from "node:fs";
import { expect, it } from "vitest";
import { haleGuide as guide } from "@/content/hale-guide";
import records from "@/content/guide-data/julian-hale-french-riviera-cultural-history.json";
import { guideArticles } from "@/content/guide";
import { getPlaces } from "@/content/places";
import { placeMapExclusions } from "@/content/planning/place-map-exclusions";
import { contentCollections, resolveContentCollectionGuideSlugs } from "@/content/content-map";

it("keeps sixteen chapters, two aligned tables and ten FAQ answers in all four locales", () => {
  expect(guideArticles).toContain(guide);
  expect(guide.sections).toHaveLength(20);
  for (const locale of ["en", "fr", "it", "uk"] as const) {
    const source = records.map(record => record[locale]).join("\n");
    expect(source.split(/\s+/).length).toBeGreaterThan(locale === "en" ? 4000 : 1800);
    expect(source).not.toMatch(/SEO title:|Meta description:|Suggested URL:|<\/?escape>|Карта культурных|Редакторская рекомендация/);
    expect(records[17][locale].match(/^### /gm)).toHaveLength(10);
    expect(guide.sections[12].tables?.[locale]?.[0].rows).toHaveLength(5);
    expect(guide.sections[12].tables?.[locale]?.[0].headers).toHaveLength(4);
    expect(guide.sections[15].tables?.[locale]?.[0].rows).toHaveLength(4);
    expect(guide.sections[15].tables?.[locale]?.[0].headers).toHaveLength(3);
    expect(records[19][locale]).not.toMatch(/\]\((?:\/(?:en|fr|it|uk)\/guide|https:\/\/azurmenton\.com\/)/);
    for (const section of guide.sections) expect(section.heading[locale]).not.toMatch(/[*_]/);
  }
});

it("separates edition metadata, research limits and present-day admission", () => {
  const en = records.map(record => record.en).join("\n");
  expect(en).toContain("9780195398748");
  expect(en).toContain("9780722364086");
  expect(en).toContain("317 pages");
  expect(en).toContain("not evidence that the historical text was revised");
  expect(en).toContain("not a complete page-by-page reading");
  expect(en).toContain("closed through 27 November");
  expect(en).toContain("annual November–December closure");
  expect(en).toContain("11 November");
  expect(en).toContain("Sundays from 9 a.m. to noon");
  expect(en).toContain("season has ended; no later session is confirmed");
  expect(en).toContain("could not be retrieved again on 4 November");
  expect(en).toContain("not routes supplied by the author");
  expect(guide.coverImageAlt?.en).toContain("not the verified publisher's cover");
});

it("links 21 illustrated places reciprocally without guessing new map coordinates", () => {
  const places = getPlaces(guide.relatedPlaces ?? []);
  expect(places).toHaveLength(21);
  for (const place of places) {
    expect(place.relatedArticleIds).toContain(guide.slug);
    expect(guide.sections.some(section => section.relatedPlaceIds?.includes(place.id))).toBe(true);
    expect(existsSync(`public${place.image}`)).toBe(true);
    expect(place.image).not.toBe(guide.coverImage);
  }
  for (const slug of guide.relatedArticles ?? []) expect(guideArticles.find(article => article.slug === slug)?.relatedArticles).toContain(guide.slug);
  for (const id of ["trophee-auguste-la-turbie", "cathedrale-saint-nicolas-nice"]) {
    const place = places.find(item => item.id === id)!;
    expect(place.imageAlt?.en).toContain("Project illustration");
    expect(placeMapExclusions.find(item => item.placeId === id)).toMatchObject({ reason: "coordinate_unverified", checkedOn: "2026-11-04" });
    const manifest = JSON.parse(readFileSync("public/images/generated-manifest.json", "utf8"));
    expect(manifest.find((item: { source: string }) => item.source === `public${place.image}`).outputs).toHaveLength(2);
  }
  expect(resolveContentCollectionGuideSlugs(contentCollections.find(item => item.id === "books-films-and-art")!, guideArticles)).toContain(guide.slug);
});

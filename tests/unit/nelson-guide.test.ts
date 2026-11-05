import { existsSync } from "node:fs";
import { expect, it } from "vitest";
import { nelsonGuide as guide } from "@/content/nelson-guide";
import records from "@/content/guide-data/the-french-riviera-a-history-michael-nelson.json";
import { guideArticles } from "@/content/guide";
import { getPlaces } from "@/content/places";
import { placeMapExclusions } from "@/content/planning/place-map-exclusions";
import { contentCollections, resolveContentCollectionGuideSlugs } from "@/content/content-map";

it("retains seventeen numbered chapters, a six-row comparison and eleven FAQ answers in four locales", () => {
  expect(guideArticles).toContain(guide);
  expect(records).toHaveLength(21);
  for (const locale of ["en", "fr", "it", "uk"] as const) {
    const source = records.map(record => record[locale]).join("\n");
    expect(source.split(/\s+/).length).toBeGreaterThan(locale === "en" ? 4000 : 1500);
    expect(source).not.toMatch(/SEO title:|Meta description:|Suggested URL:|Редакторская рекомендация|Карта: история/);
    expect(records[18][locale].match(/^### /gm)).toHaveLength(11);
    expect(guide.sections[13].tables?.[locale]?.[0].rows).toHaveLength(6);
    expect(guide.sections[13].tables?.[locale]?.[0].headers).toHaveLength(3);
    expect(records[1][locale]).toContain("9781785898334");
    expect(records[11][locale]).toContain("1969");
    expect(records[11][locale]).toContain("1974");
    for (const section of guide.sections) expect(section.heading[locale]).not.toMatch(/[*_]/);
  }
});

it("keeps research limits, closure priority and independent editorial routes explicit", () => {
  const en = records.map(record => record.en).join("\n");
  expect(en).toContain("28 October 2016");
  expect(en).toContain("no confirmed reopening date");
  expect(en).toContain("ordinary hours shown below that notice do not override the closure");
  expect(en).toContain("11 November excluded");
  expect(en).toContain("could not be retrieved during this check");
  expect(en).not.toContain("questioned whether the book fully demonstrates");
  expect(en).toContain("not itineraries supplied by the author");
  expect(en).toContain("not a full-text, chapter-by-chapter analysis");
  expect(guide.coverImageAlt?.en).toContain("not the verified publisher's cover");
});

it("reuses thirteen places, attaches two illustrated museums and keeps reciprocal links", () => {
  const places = getPlaces(guide.relatedPlaces ?? []);
  expect(places).toHaveLength(15);
  for (const place of places) {
    expect(place.relatedArticleIds).toContain(guide.slug);
    expect(guide.sections.some(section => section.relatedPlaceIds?.includes(place.id))).toBe(true);
    expect(place.image).toBeTruthy();
    expect(existsSync(`public${place.image}`)).toBe(true);
    expect(place.image).not.toBe(guide.coverImage);
  }
  for (const slug of guide.relatedArticles ?? []) expect(guideArticles.find(article => article.slug === slug)?.relatedArticles).toContain(guide.slug);
  for (const id of ["musee-terra-amata-nice", "musee-resistance-azureenne-nice"]) {
    expect(placeMapExclusions.find(item => item.placeId === id)).toMatchObject({ reason: "coordinate_unverified", checkedOn: "2026-11-05" });
    expect(guideArticles.find(article => article.slug === "museums-in-menton-nice-monaco")?.sections.some(section => section.relatedPlaceIds?.includes(id))).toBe(true);
  }
  expect(resolveContentCollectionGuideSlugs(contentCollections.find(item => item.id === "books-films-and-art")!, guideArticles)).toContain(guide.slug);
});

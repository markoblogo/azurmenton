import { existsSync } from "node:fs";
import { expect, it } from "vitest";
import { rebeccaGuide as guide } from "@/content/rebecca-guide";
import records from "@/content/guide-data/rebecca-monte-carlo-daphne-du-maurier-literary-walk.json";
import { guideArticles, getLatestLandingGuideSlug } from "@/content/guide";
import { getPlaces } from "@/content/places";
import { contentCollections, resolveContentCollectionGuideSlugs } from "@/content/content-map";
import { placeMapExclusions } from "@/content/planning/place-map-exclusions";

it("publishes the full Rebecca guide in four locales without service metadata or the editorial appendix", () => {
  expect(guideArticles).toContain(guide);
  expect(guide.sections).toHaveLength(19);
  expect(getLatestLandingGuideSlug([guide])).toBe(guide.slug);
  expect(existsSync(`public${guide.coverImage}`)).toBe(true);
  for (const locale of ["en", "fr", "it", "uk"] as const) {
    const source = records.map(record => record[locale]).join("\n");
    expect(source.split(/\s+/).length).toBeGreaterThan(locale === "en" ? 4100 : 2300);
    expect(source).not.toMatch(/SEO title:|Meta description:|Suggested URL:|Spoiler policy:|Редакторские рекомендации/);
    expect(guide.sections[10].tables?.[locale]?.[0].rows).toHaveLength(5);
    expect(guide.sections[10].tables?.[locale]?.[0].headers).toHaveLength(3);
    expect(guide.sections[5].body[0][locale]).toContain("2020");
    expect(guide.sections[6].body[0][locale]).toContain("1864");
    expect(guide.sections[12].body[0][locale]).toContain("Waddesdon");
    for (const section of guide.sections) expect(section.heading[locale]).not.toMatch(/[*_]/);
  }
  const collection = contentCollections.find(item => item.id === "books-films-and-art")!;
  expect(resolveContentCollectionGuideSlugs(collection, guideArticles)).toContain(guide.slug);
});

it("separates thematic stops, fictional hotel, screen geography and access uncertainty", () => {
  expect(guide.sections[3].body[0].en).toContain("fictional literary hotel");
  expect(guide.sections[6].body[0].en).toContain("No confirmed evidence identifies");
  expect(guide.sections[7].body[0].en).toContain("current prices, hours and eligibility are not asserted");
  expect(guide.sections[8].body[0].en).toContain("thematic stop");
  expect(guide.sections[10].body[0].en).toContain("not a field-certified accessibility itinerary");
  expect(guide.sections[11].body[0].en).toContain("not door-to-door time");
  expect(guide.sections[12].body[0].en).toContain("not extra stops");
  expect(guide.relatedPlaces).not.toContain("hotel-cote-dazur");
  expect(guide.relatedPlaces).not.toContain("manderley");
});

it("reuses three images, adds only two real places, and links the nearby graph reciprocally", () => {
  const places = getPlaces(guide.relatedPlaces ?? []);
  expect(places).toHaveLength(5);
  expect(guide.relatedPlaces).toEqual([...new Set(guide.sections.flatMap(section => section.relatedPlaceIds ?? []))]);
  for (const place of places) expect(place.relatedArticleIds).toContain(guide.slug);
  for (const id of ["hotel-de-paris-monte-carlo", "jardins-petite-afrique-monaco"]) {
    const place = places.find(item => item.id === id)!;
    expect(place.image).toBeUndefined();
    expect(place.requiresMapReview).toBe(true);
    expect(placeMapExclusions.find(item => item.placeId === id)?.checkedOn).toBe("2026-11-03");
  }
  for (const id of ["casino-square-monaco", "casino-de-monte-carlo", "cafe-de-paris-monte-carlo"]) expect(places.find(item => item.id === id)?.image).toBeTruthy();
  for (const slug of guide.relatedArticles ?? []) expect(guideArticles.find(article => article.slug === slug)?.relatedArticles).toContain(guide.slug);
  const dayTrips = guideArticles.find(article => article.slug === "day-trips-from-menton")!;
  expect(dayTrips.sections.find(section => section.guideLinkSlug === guide.slug)?.relatedPlaceIds).toContain("jardins-petite-afrique-monaco");
});

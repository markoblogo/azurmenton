import { existsSync } from "node:fs";
import { expect, it } from "vitest";
import { fitzgeraldGuide as guide } from "@/content/fitzgerald-guide";
import records from "@/content/guide-data/tender-is-the-night-fitzgerald-french-riviera.json";
import { guideArticles, getLatestLandingGuideSlug } from "@/content/guide";
import { getPlaces } from "@/content/places";
import { placeMapExclusions } from "@/content/planning/place-map-exclusions";
import { contentCollections, resolveContentCollectionGuideSlugs } from "@/content/content-map";

it("publishes the complete Fitzgerald article with four locales, chronology and no editorial debris", () => {
  expect(guideArticles).toContain(guide);
  expect(guide.sections).toHaveLength(17);
  expect(getLatestLandingGuideSlug([guide])).toBe(guide.slug);
  expect(existsSync(`public${guide.coverImage}`)).toBe(true);
  for (const locale of ["en", "fr", "it", "uk"] as const) {
    const source = records.map(record => record[locale]).join("\n");
    expect(source.split(/\s+/).length).toBeGreaterThan(locale === "en" ? 3900 : 2100);
    expect(source).not.toMatch(/SEO title:|Meta description:|Suggested URL:|Карта литературной|Spoiler policy:|\[ \]\(/);
    expect(guide.sections[2].tables?.[locale]?.[0].headers).toHaveLength(2);
    expect(guide.sections[2].tables?.[locale]?.[0].rows).toHaveLength(5);
    expect(guide.sections[7].body[0][locale]).toContain("2027");
    expect(guide.sections[6].body[0][locale]).toContain("2026");
    for (const section of guide.sections) expect(section.heading[locale]).not.toMatch(/[*_]/);
  }
  const collection = contentCollections.find(item => item.id === "books-films-and-art")!;
  expect(resolveContentCollectionGuideSlugs(collection, guideArticles)).toContain(guide.slug);
});

it("separates fiction, private property, seasonal closure and the public excursion", () => {
  expect(guide.sections[7].body[0].en).toContain("18 April to 17 October 2027");
  expect(guide.sections[7].body[0].en).toContain("current closure");
  expect(guide.sections[6].body[0].en).toContain("only via the beach");
  expect(guide.sections[6].body[0].en).toContain("not a same-day site inspection");
  expect(guide.sections[8].body[0].en).toContain("fictional residence");
  expect(guide.sections[3].body[0].en).toContain("private residence");
  expect(guide.sections[10].body[0].en).toContain("separate transport");
  expect(guide.sections[13].body[0].en).toContain("Not all have a published AzurMenton guide yet");
  expect(guide.relatedPlaces).not.toContain("villa-america");
  expect(guide.relatedPlaces).not.toContain("villa-diana");
  expect(guide.sections[11].relatedPlaceIds).toEqual(["sentier-tirepoil-cap-antibes"]);
});

it("connects five illustrated real places without fabricated map points and links older guides reciprocally", () => {
  const places = getPlaces(guide.relatedPlaces ?? []);
  expect(places).toHaveLength(5);
  expect(guide.relatedPlaces).toEqual([...new Set(guide.sections.flatMap(section => section.relatedPlaceIds ?? []))]);
  for (const place of places) {
    expect(place.image).toBe(`/images/guide/${place.id}.png`);
    expect(existsSync(`public${place.image}`)).toBe(true);
    expect(existsSync(`public/images/guide/generated/${place.id}.avif`)).toBe(true);
    expect(existsSync(`public/images/guide/generated/${place.id}.webp`)).toBe(true);
    for (const locale of ["en", "fr", "it", "uk"] as const) expect(place.imageAlt?.[locale]?.length).toBeGreaterThan(30);
    expect(place.relatedArticleIds).toContain(guide.slug);
    expect(place.programmeUrl).toMatch(/^https:\/\//);
    if (place.type === "walk") {
      expect(place.requiresMapReview).toBe(false);
      expect(placeMapExclusions.find(item => item.placeId === place.id)).toBeUndefined();
    } else expect(placeMapExclusions.find(item => item.placeId === place.id)?.checkedOn).toBe("2026-11-02");
  }
  expect(places.find(place => place.id === "hotel-du-cap-eden-roc-antibes")?.visitorAccess).toBe("ask-first");
  expect(places.find(place => place.id === "hotel-du-cap-eden-roc-antibes")?.imageAlt?.en).toContain("not evidence of current opening");
  expect(places.find(place => place.id === "sentier-tirepoil-cap-antibes")?.imageAlt?.en).toContain("not a verified step count");
  for (const slug of guide.relatedArticles ?? []) expect(guideArticles.find(article => article.slug === slug)?.relatedArticles).toContain(guide.slug);
  const dayTrips = guideArticles.find(article => article.slug === "day-trips-from-menton")!;
  expect(dayTrips.sections.find(section => section.guideLinkSlug === guide.slug)?.relatedPlaceIds).toContain("juan-les-pins-seafront");
});

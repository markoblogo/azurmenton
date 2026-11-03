import { existsSync } from "node:fs";
import { expect, it } from "vitest";
import { heartbreakerGuide as guide } from "@/content/heartbreaker-guide";
import records from "@/content/guide-data/heartbreaker-larnacoeur-monaco-filming-locations.json";
import { guideArticles } from "@/content/guide";
import { getPlaces } from "@/content/places";
import { contentCollections, resolveContentCollectionGuideSlugs } from "@/content/content-map";
import { placeMapExclusions } from "@/content/planning/place-map-exclusions";

it("publishes the full film guide in four locales with aligned tables and twelve FAQ entries", () => {
  expect(guideArticles).toContain(guide);
  expect(guide.sections).toHaveLength(21);
  expect(existsSync(`public${guide.coverImage}`)).toBe(true);
  for (const locale of ["en", "fr", "it", "uk"] as const) {
    const source = records.map(record => record[locale]).join("\n");
    expect(source.split(/\s+/).length).toBeGreaterThan(locale === "en" ? 3900 : 1900);
    expect(source).not.toMatch(/SEO title:|Meta description:|Suggested URL:|Research updated:|Карта съёмочных/);
    for (const [index, rows, columns] of [[2, 8, 3], [11, 6, 3], [15, 13, 2]]) {
      expect(guide.sections[index].tables?.[locale]?.[0].rows).toHaveLength(rows);
      expect(guide.sections[index].tables?.[locale]?.[0].headers).toHaveLength(columns);
    }
    expect(records[18][locale].match(/^### /gm)).toHaveLength(12);
    for (const section of guide.sections) expect(section.heading[locale]).not.toMatch(/[*_]/);
  }
  const collection = contentCollections.find(item => item.id === "books-films-and-art")!;
  expect(resolveContentCollectionGuideSlugs(collection, guideArticles)).toContain(guide.slug);
});

it("preserves location, access and evidence boundaries", () => {
  expect(guide.showTransportHelper).toBe(true);
  expect(guide.transportHelperAfterSectionIndex).toBe(12);
  expect(guide.locationTags).toEqual(["monaco", "day-trip"]);
  expect(guide.sections[2].body[0].en).toContain("2021 interview");
  expect(guide.sections[7].body[0].en).toContain("not a verified filming stop");
  expect(guide.sections[8].body[0].en).toContain("Joinville-le-Pont");
  expect(guide.sections[9].body[0].en).toContain("Roquebrune-Cap-Martin, France");
  expect(guide.sections[3].body[0].en).toContain("not a currently confirmed offer");
  expect(guide.relatedPlaces).not.toContain("chez-gegene");
  expect(guide.relatedPlaces).not.toContain("quai-antoine-ier-monaco");
});

it("links five illustrated real places reciprocally without guessed map coordinates", () => {
  const places = getPlaces(guide.relatedPlaces ?? []);
  expect(places).toHaveLength(5);
  expect(guide.relatedPlaces).toEqual([...new Set(guide.sections.flatMap(section => section.relatedPlaceIds ?? []))]);
  for (const place of places) expect(place.relatedArticleIds).toContain(guide.slug);
  for (const place of places) expect(existsSync(`public${place.image}`)).toBe(true);
  for (const id of ["monte-carlo-bay-hotel-resort", "monte-carlo-beach-roquebrune-cap-martin"]) {
    const place = places.find(place => place.id === id)!;
    expect(place.image).toBe(`/images/guide/${id}.png`);
    for (const extension of ["avif", "webp"]) expect(existsSync(`public/images/guide/generated/${id}.${extension}`)).toBe(true);
    for (const locale of ["en", "fr", "it", "uk"] as const) expect(place.imageAlt?.[locale]?.length).toBeGreaterThan(35);
    expect(place.imageAlt?.en).toContain("Project illustration");
    expect(placeMapExclusions.find(item => item.placeId === id)?.checkedOn).toBe("2026-11-03");
  }
  for (const slug of guide.relatedArticles ?? []) expect(guideArticles.find(item => item.slug === slug)?.relatedArticles).toContain(guide.slug);
  expect(guideArticles.find(item => item.slug === "day-trips-from-menton")?.sections.find(section => section.guideLinkSlug === guide.slug)?.relatedPlaceIds).toContain("monte-carlo-bay-hotel-resort");
});

import { existsSync } from "node:fs";
import { expect, it } from "vitest";
import { fleaMarketsGuide as guide } from "@/content/flea-markets-guide";
import records from "@/content/guide-data/flea-markets-brocantes-vintage-menton.json";
import { guideArticles, getLatestLandingGuideSlug } from "@/content/guide";
import { getPlaces } from "@/content/places";
import { placeMapExclusions } from "@/content/planning/place-map-exclusions";
import { contentCollections, resolveContentCollectionGuideSlugs } from "@/content/content-map";

const newPlaceIds = ["menton-brocante-mail-du-bastion", "marche-aux-puces-nice", "ventimiglia-friday-market"];

it("publishes all twenty sections and three translated tables without service notes", () => {
  expect(guideArticles).toContain(guide);
  expect(guide.sections).toHaveLength(20);
  expect(getLatestLandingGuideSlug([guide])).toBe(guide.slug);
  expect(existsSync(`public${guide.coverImage}`)).toBe(true);
  for (const locale of ["en", "fr", "it", "uk"] as const) {
    const original = records.map(record => record[locale]).join("\n");
    expect(original.split(/\s+/).length).toBeGreaterThan(locale === "en" ? 4100 : 2400);
    expect(original).not.toMatch(/SEO title:|Meta description:|Suggested URL:|\[ \]\(/);
    for (const [index, columns, rows] of [[1, 3, 9], [2, 4, 6], [11, 2, 9]]) {
      expect(guide.sections[index].tables?.[locale]?.[0].headers).toHaveLength(columns);
      expect(guide.sections[index].tables?.[locale]?.[0].rows).toHaveLength(rows);
    }
    for (const section of guide.sections) expect(section.heading[locale]).not.toMatch(/[*_]/);
    expect(original).toContain("1928309");
    expect(original).toContain("2026");
    expect(guide.sections[14].body[0][locale]).toContain("https://www.douane.gouv.fr/demarche/exporter-des-biens-culturels");
  }
  const collection = contentCollections.find(item => item.id === "food-and-markets")!;
  expect(resolveContentCollectionGuideSlugs(collection, guideArticles)).toContain(guide.slug);
});

it("keeps conflicting hours, Italy's unknown dates and distinct market identities explicit", () => {
  expect(guide.sections[3].body[0].en).toContain("9 a.m. to 5 p.m.");
  expect(guide.sections[3].body[0].en).toContain("7 a.m. to 6 p.m.");
  expect(guide.sections[4].body[0].en).toContain("27–29 December 2026");
  expect(guide.sections[7].body[0].en).toContain("doesn't provide a sufficiently reliable recurring calendar");
  expect(guide.sections[7].body[0].en).toContain("isn't primarily an antiques");
  expect(guide.sections[6].body[0].en).toContain("Monday: Normally closed");
  expect(guide.relatedPlaces).not.toContain("mercato-coperto-ventimiglia");
  expect(guide.relatedPlaces).not.toContain("cours-saleya-nice");
});

it("reuses existing illustrations and records new places without invented cover images or coordinates", () => {
  const places = getPlaces(guide.relatedPlaces ?? []);
  expect(places).toHaveLength(7);
  expect(guide.relatedPlaces).toEqual([...new Set(guide.sections.flatMap(section => section.relatedPlaceIds ?? []))]);
  for (const place of places) expect(place.relatedArticleIds).toContain(guide.slug);
  for (const place of places.filter(place => !newPlaceIds.includes(place.id))) {
    expect(place.image).toBeTruthy();
    expect(existsSync(`public${place.image}`)).toBe(true);
  }
  for (const id of newPlaceIds) {
    const place = places.find(place => place.id === id)!;
    expect(place.requiresMapReview).toBe(true);
    expect(place.image).toBeFalsy();
    expect(place.programmeUrl).toMatch(/^https:\/\//);
    expect(placeMapExclusions.find(item => item.placeId === id)).toMatchObject({ reason: "coordinate_unverified", checkedOn: "2026-11-02" });
    expect(guideArticles.find(article => article.slug === "best-markets-near-menton-market-days-in-france-and-italy")?.relatedPlaces).toContain(id);
  }
  for (const slug of guide.relatedArticles ?? []) expect(guideArticles.find(article => article.slug === slug)?.relatedArticles).toContain(guide.slug);
});

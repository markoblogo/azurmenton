import { existsSync } from "node:fs";
import { expect, it } from "vitest";
import { dogGuide as guide } from "@/content/dog-guide";
import records from "@/content/guide-data/menton-with-a-dog.json";
import { guideArticles, getLatestLandingGuideSlug } from "@/content/guide";
import { getPlaces } from "@/content/places";
import { dogPlaces } from "@/content/dog-places";
import { placeMapExclusions } from "@/content/planning/place-map-exclusions";

it("includes the full dog guide, four locales and matched tables without Word metadata", () => {
  expect(guideArticles).toContain(guide);
  expect(guide.sections).toHaveLength(20);
  expect(getLatestLandingGuideSlug([guide])).toBe(guide.slug);
  expect(existsSync(`public${guide.coverImage}`)).toBe(true);
  for (const locale of ["en", "fr", "it", "uk"] as const) {
    const source = records.map(record => record[locale]).join("\n");
    expect(source.split(/\s+/).length).toBeGreaterThan(locale === "en" ? 4300 : 2500);
    expect(source).not.toMatch(/SEO title:|Meta description:|Suggested URL:|\[ \]\(/);
    for (const [section, rows, columns] of [[1, 9, 2], [3, 3, 3], [4, 3, 3], [14, 4, 3]]) {
      const table = guide.sections[section].tables?.[locale]?.[0];
      expect(table?.rows).toHaveLength(rows);
      expect(table?.headers).toHaveLength(columns);
    }
    expect(guide.sections[4].body[0][locale]).toContain("2023");
    expect(guide.sections[4].body[0][locale]).toContain("10");
    expect(guide.sections[11].body[0][locale]).toContain("21");
    expect(guide.sections[13].body[0][locale]).toContain("+33 4 93 71 21 41");
    for (const section of guide.sections) expect(section.heading[locale]).not.toMatch(/[*_]/);
  }
});

it("retains uncertainty for accommodation, Zest, beaches, borders and emergency availability", () => {
  expect(guide.relatedApartments).toEqual([]);
  expect(guide.sections[6].body[0].en).toContain("does not certify any AzurMenton apartment");
  expect(guide.sections[9].body[0].en).toContain("could not be independently confirmed");
  expect(guide.sections[8].body[0].en).toContain("Replacement coaches are more restrictive");
  expect(guide.sections[10].body[0].en).toContain("First-category dogs");
  expect(guide.sections[11].body[0].en).toContain("before 3 July 2011");
  expect(guide.sections[11].body[0].en).toContain("did not verify a specific currently operating dog beach");
  expect(guide.sections[13].body[0].en).toContain("Don't assume that a practice is open 24 hours");
  expect(guide.sections[3].body[0].en).toContain("blanket year-round permission");
});

it("resolves all eight illustrated places and aligns the nearby graph", () => {
  expect(guide.relatedPlaces).toEqual([...new Set(guide.sections.flatMap(section => section.relatedPlaceIds ?? []))]);
  const places = getPlaces(guide.relatedPlaces ?? []);
  expect(places).toHaveLength(8);
  for (const place of places) expect(place.relatedArticleIds).toContain(guide.slug);
  expect(dogPlaces).toHaveLength(5);
  for (const place of dogPlaces) {
    const resolved = places.find(candidate => candidate.id === place.id)!;
    expect(resolved.image).toBe(`/images/guide/${place.id}.png`);
    expect(existsSync(`public${resolved.image}`)).toBe(true);
    for (const extension of ["avif", "webp"]) expect(existsSync(`public/images/guide/generated/${place.id}.${extension}`)).toBe(true);
    for (const locale of ["en", "fr", "it", "uk"] as const) expect(resolved.imageAlt?.[locale]?.length).toBeGreaterThan(35);
    expect(place.requiresMapReview).toBe(true);
    expect(placeMapExclusions.find(entry => entry.placeId === place.id)?.checkedOn).toBe("2026-11-02");
  }
  for (const slug of guide.relatedArticles ?? []) expect(guideArticles.find(article => article.slug === slug)?.relatedArticles).toContain(guide.slug);
  const beaches = guideArticles.find(article => article.slug === "best-beaches-in-menton")!;
  expect(beaches.sections.find(section => section.guideLinkSlug === guide.slug)?.relatedPlaceIds).toEqual(guide.sections[3].relatedPlaceIds);
});

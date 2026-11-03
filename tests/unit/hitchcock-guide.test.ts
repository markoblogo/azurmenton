import { existsSync } from "node:fs";
import { expect, it } from "vitest";
import { hitchcockGuide as guide } from "@/content/hitchcock-guide";
import records from "@/content/guide-data/to-catch-a-thief-hitchcock-villefranche-sur-mer.json";
import { guideArticles } from "@/content/guide";
import { getPlaces } from "@/content/places";
import { contentCollections, resolveContentCollectionGuideSlugs } from "@/content/content-map";
import { placeMapExclusions } from "@/content/planning/place-map-exclusions";

it("includes the Hitchcock guide in four locales with aligned tables and twelve FAQ answers", () => {
  expect(guideArticles).toContain(guide);
  expect(guide.sections).toHaveLength(21);
  expect(existsSync(`public${guide.coverImage}`)).toBe(true);
  for (const locale of ["en", "fr", "it", "uk"] as const) {
    const source = records.map(record => record[locale]).join("\n");
    expect(source.split(/\s+/).length).toBeGreaterThan(locale === "en" ? 3500 : 1700);
    expect(source).not.toMatch(/SEO title:|Meta description:|Suggested URL:|Рекомендации для|Редакторские рекомендации|Research reviewed:/);
    for (const [index, rows, columns] of [[10, 7, 3], [13, 7, 3], [17, 9, 2]]) {
      expect(guide.sections[index].tables?.[locale]?.[0].rows).toHaveLength(rows);
      expect(guide.sections[index].tables?.[locale]?.[0].headers).toHaveLength(columns);
    }
    expect(records[18][locale].match(/^### /gm)).toHaveLength(12);
    for (const section of guide.sections) expect(section.heading[locale]).not.toMatch(/[*_]/);
  }
  expect(resolveContentCollectionGuideSlugs(contentCollections.find(item => item.id === "books-films-and-art")!, guideArticles)).toContain(guide.slug);
});

it("keeps historical attribution, closures, private access and modern journeys distinct", () => {
  expect(guide.sections[2].body[0].en).toContain("historical tourism attribution");
  expect(guide.sections[2].body[0].en).toContain("does not include Villa Agnelli");
  expect(guide.sections[8].body[0].en).toContain("mid-November to mid-December");
  expect(guide.sections[9].body[0].en).toContain("closed since January 2022");
  expect(guide.sections[9].body[0].en).toContain("2028, not guaranteed");
  expect(guide.sections[14].body[0].en).toContain("not a date-specific departure");
  expect(guide.coverImageAlt?.en).toContain("not a To Catch a Thief film still");
  expect(guide.relatedPlaces).not.toContain("port-de-la-darse-villefranche");
  expect(guide.showTransportHelper).toBe(true);
});

it("links six real places with reciprocal coverage and no invented coordinates", () => {
  const places = getPlaces(guide.relatedPlaces ?? []);
  expect(places).toHaveLength(6);
  for (const place of places) expect(place.relatedArticleIds).toContain(guide.slug);
  for (const place of places) expect(existsSync(`public${place.image}`)).toBe(true);
  for (const id of ["villefranche-sur-mer-station", "rue-obscure-villefranche", "chapelle-saint-pierre-villefranche", "citadelle-saint-elme-villefranche"]) {
    const place = places.find(place => place.id === id)!;
    expect(place.image).toBe(`/images/guide/${id}.png`);
    for (const extension of ["avif", "webp"]) expect(existsSync(`public/images/guide/generated/${id}.${extension}`)).toBe(true);
    for (const locale of ["en", "fr", "it", "uk"] as const) expect(place.imageAlt?.[locale]?.length).toBeGreaterThan(35);
  }
  for (const id of ["villefranche-sur-mer-station", "chapelle-saint-pierre-villefranche", "citadelle-saint-elme-villefranche"]) {
    expect(places.find(place => place.id === id)?.requiresMapReview).toBe(true);
    expect(placeMapExclusions.find(item => item.placeId === id)?.checkedOn).toBe("2026-11-03");
  }
  expect(places.find(place => place.id === "rue-obscure-villefranche")?.type).toBe("walk");
  for (const slug of guide.relatedArticles ?? []) expect(guideArticles.find(item => item.slug === slug)?.relatedArticles).toContain(guide.slug);
  const cocteau = guideArticles.find(item => item.slug === "jean-cocteau-menton-walking-route")!;
  expect(cocteau.relatedPlaces).toContain("chapelle-saint-pierre-villefranche");
  expect(cocteau.sections.find(section => section.guideLinkSlug === guide.slug)?.relatedPlaceIds).toContain("chapelle-saint-pierre-villefranche");
});

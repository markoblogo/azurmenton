import { existsSync } from "node:fs";
import { expect, it } from "vitest";
import { poirotGuide as guide } from "@/content/poirot-guide";
import records from "@/content/guide-data/poirot-blue-train-filming-locations-menton.json";
import { guideArticles } from "@/content/guide";
import { getPlaces } from "@/content/places";
import { contentCollections, resolveContentCollectionGuideSlugs } from "@/content/content-map";

it("includes sixteen aligned sections, three tables and eleven FAQ answers in four languages", () => {
  expect(guideArticles).toContain(guide);
  expect(guide.sections).toHaveLength(16);
  expect(existsSync(`public${guide.coverImage}`)).toBe(true);
  for (const locale of ["en", "fr", "it", "uk"] as const) {
    const source = records.map(record => record[locale]).join("\n");
    expect(source.split(/\s+/).length).toBeGreaterThan(locale === "en" ? 3000 : 1100);
    expect(source).not.toMatch(/SEO title:|Meta description:|Suggested URL:|<\/?escape>|Что я рекомендую|Карта съёмочных/);
    for (const [index, rows, columns] of [[2, 4, 3], [7, 3, 2], [12, 8, 3]]) {
      expect(guide.sections[index].tables?.[locale]?.[0].rows).toHaveLength(rows);
      expect(guide.sections[index].tables?.[locale]?.[0].headers).toHaveLength(columns);
    }
    expect(records[13][locale].match(/^### /gm)).toHaveLength(11);
    for (const section of guide.sections) expect(section.heading[locale]).not.toMatch(/[*_]/);
  }
  expect(resolveContentCollectionGuideSlugs(contentCollections.find(item => item.id === "books-films-and-art")!, guideArticles)).toContain(guide.slug);
});

it("separates episode attribution, first-broadcast uncertainty, access and exact camera positions", () => {
  expect(guide.sections[1].body[0].en).toContain("first-broadcast date is not independently verified");
  expect(guide.sections[3].body[0].en).toContain("weekends only");
  expect(guide.sections[3].body[0].en).toContain("Peterborough City Council");
  expect(guide.sections[6].body[0].en).toContain("does not identify this episode");
  expect(guide.sections[6].body[0].en).toContain("No later session is confirmed");
  expect(guide.sections[6].body[0].en).toContain("403");
  expect(guide.sections[9].body[0].en).toContain("half-day or longer");
  expect(guide.coverImageAlt?.en).toContain("not a Poirot film still");
});

it("reuses four illustrated places, reciprocal guide links and the existing cinema overview", () => {
  const places = getPlaces(guide.relatedPlaces ?? []);
  expect(places).toHaveLength(4);
  for (const [index, place] of places.entries()) {
    expect(place.relatedArticleIds).toContain(guide.slug);
    expect(guide.sections[index + 3].relatedPlaceIds).toContain(place.id);
    expect(existsSync(`public${place.image}`)).toBe(true);
    expect(place.image).not.toBe(guide.coverImage);
  }
  for (const slug of guide.relatedArticles ?? []) expect(guideArticles.find(item => item.slug === slug)?.relatedArticles).toContain(guide.slug);
  const overview = guideArticles.find(item => item.slug === "films-shot-in-menton")!;
  expect(overview.sections.find(section => section.guideLinkSlug === guide.slug)?.videoEmbeds?.[0].id).toBe("poirot-blue-train-preview");
});

import { existsSync } from "node:fs";
import { expect, it } from "vitest";
import { bonjourTristesseGuide as guide } from "@/content/bonjour-tristesse-guide";
import records from "@/content/guide-data/bonjour-tristesse-francoise-sagan-french-riviera.json";
import { guideArticles } from "@/content/guide";
import { getPlaces } from "@/content/places";
import { contentCollections, resolveContentCollectionGuideSlugs } from "@/content/content-map";

it("publishes the complete literary structure in four locales without intake metadata", () => {
  expect(guideArticles).toContain(guide);
  expect(guide.sections).toHaveLength(16);
  expect(existsSync(`public${guide.coverImage}`)).toBe(true);
  for (const locale of ["en", "fr", "it", "uk"] as const) {
    const source = records.map(record => record[locale]).join("\n");
    expect(source.split(/\s+/).length).toBeGreaterThan(locale === "en" ? 3600 : 2200);
    expect(source).not.toMatch(/SEO title:|Meta description:|Suggested URL:|Research reviewed:|Карта литературной/);
    expect(guide.sections[8].tables?.[locale]?.[0].rows).toHaveLength(4);
    expect(guide.sections[8].tables?.[locale]?.[0].headers).toHaveLength(4);
    expect(records[13][locale].match(/^### /gm)).toHaveLength(10);
    for (const section of guide.sections) expect(section.heading[locale]).not.toMatch(/[*_]/);
  }
  const collection = contentCollections.find(item => item.id === "books-films-and-art")!;
  expect(resolveContentCollectionGuideSlugs(collection, guideArticles)).toContain(guide.slug);
});

it("keeps thematic Menton stops distinct from fiction, film locations and guaranteed access", () => {
  expect(guide.showTransportHelper).toBe(false);
  expect(guide.sections[7].body[0].en).toContain("thematic literary walk");
  expect(guide.sections[8].body[0].en).toContain("not a documented Sagan address");
  expect(guide.sections[8].body[0].en).toContain("not been field-audited");
  expect(guide.sections[10].body[0].en).toContain("1958");
  expect(guide.sections[10].body[0].en).toContain("2024");
  expect(guide.relatedPlaces).toEqual(["promenade-du-soleil", "plage-casino", "royal-westminster-menton", "jardins-bioves"]);
  for (const place of getPlaces(guide.relatedPlaces ?? [])) {
    expect(place.relatedArticleIds).toContain(guide.slug);
    expect(place.image).toBeTruthy();
    expect(existsSync(`public${place.image}`)).toBe(true);
  }
  for (const slug of guide.relatedArticles ?? []) expect(guideArticles.find(item => item.slug === slug)?.relatedArticles).toContain(guide.slug);
});

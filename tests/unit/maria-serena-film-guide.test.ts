import { existsSync } from "node:fs";
import { expect, it } from "vitest";
import { mariaSerenaFilmGuide as guide } from "@/content/maria-serena-film-guide";
import { guidePackages } from "@/content/guide-packages";
import { guideArticles } from "@/content/guide";
import { getPlaces } from "@/content/places";
import { contentCollections, resolveContentCollectionGuideSlugs } from "@/content/content-map";

const records = guidePackages.find(pkg => pkg.article.slug === guide.slug)!.records;

it("retains twelve chapters, ten evidence rows and thirteen FAQ answers in four languages", () => {
  expect(guideArticles).toContain(guide);
  expect(records).toHaveLength(16);
  for (const locale of ["en", "fr", "it", "uk"] as const) {
    expect(records[13][locale].match(/^### /gm)).toHaveLength(13);
    expect(guide.sections[11].tables?.[locale]?.[0].rows).toHaveLength(10);
    expect(guide.sections[11].tables?.[locale]?.[0].headers).toHaveLength(3);
    expect(records.map(record => record[locale]).join("\n")).not.toMatch(/SEO title:|Suggested URL:|Редакторская рекомендация/);
    for (const section of guide.sections) expect(section.heading[locale]).not.toMatch(/[*_]/);
  }
});

it("keeps garden filming separate from private interiors, legal evidence and expired tours", () => {
  const en = records.map(record => record.en).join("\n");
  for (const text of ["not independently reconfirmed", "No future dated session", "31 October", "not proof of a bookable November session", "not a documentary or judicial record", "not a verified biographical address"]) expect(en.includes(text), text).toBe(true);
  expect(en.includes("In 2013, a film crew arrived")).toBe(false);
  expect(guide.coverImageAlt?.en).toContain("artistic illustration");
});

it("reuses four illustrated places with reciprocal guide and collection links", () => {
  const places = getPlaces(guide.relatedPlaces ?? []);
  expect(places).toHaveLength(4);
  for (const place of places) {
    expect(place.relatedArticleIds).toContain(guide.slug);
    expect(place.image).toBeTruthy();
    expect(existsSync(`public${place.image}`)).toBe(true);
    expect(guide.sections.some(section => section.relatedPlaceIds?.includes(place.id))).toBe(true);
  }
  for (const slug of guide.relatedArticles ?? []) expect(guideArticles.find(article => article.slug === slug)?.relatedArticles).toContain(guide.slug);
  expect(resolveContentCollectionGuideSlugs(contentCollections.find(item => item.id === "books-films-and-art")!, guideArticles)).toContain(guide.slug);
});

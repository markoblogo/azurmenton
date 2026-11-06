import { existsSync } from "node:fs";
import { expect, it } from "vitest";
import { guideArticles } from "@/content/guide";
import { guidePackages, packagedGuides } from "@/content/guide-packages";
import { places } from "@/content/places";
import { placeMapExclusions } from "@/content/planning/place-map-exclusions";
import { contentCollections } from "@/content/content-map";

const slug = "the-long-afternoon-giles-waterfield-menton";
const guide = packagedGuides.find(item => item.slug === slug)!;
const pkg = guidePackages.find(item => item.article.slug === slug)!;

it("publishes eleven chapters and ten FAQ answers in four aligned languages", () => {
  expect(guideArticles.filter(item => item.slug === slug)).toHaveLength(1);
  expect(pkg.records).toHaveLength(15);
  for (const locale of ["en", "fr", "it", "uk"] as const) {
    expect(pkg.records[12][locale].match(/^### /gm)).toHaveLength(10);
    expect(pkg.records.map(record => record[locale]).join("\n")).not.toMatch(/SEO title:|Suggested URL:|Books\+2|Карта литературной|Что особенно важно/);
    expect(guide.sections.every(section => Boolean(section.body[0][locale].trim()))).toBe(true);
  }
  expect(guide.publishedOn).toBe("2026-11-06");
  expect(existsSync(`public${guide.coverImage}`)).toBe(true);
});

it("distinguishes fiction, current access uncertainty and artistic media", () => {
  const en = pkg.records.map(record => record.en).join("\n");
  expect(en).toContain("not confirmation of a bookable November tour");
  expect(en).toContain("temporarily closed");
  expect(en).toContain("not a claim of a complete independent reading");
  expect(en).toContain("not a reconstruction");
  expect(guide.coverImageAlt?.en).toContain("artistic");
  const garden = places.find(place => place.id === "clos-du-peyronnet-menton")!;
  expect(garden.image).toBe("/images/guide/clos-du-peyronnet-menton.png");
  expect(existsSync(`public${garden.image}`)).toBe(true);
  expect(garden.requiresMapReview).toBe(true);
  expect(placeMapExclusions.some(item => item.placeId === garden.id)).toBe(true);
  expect(places.some(place => /lou-paradou/.test(place.id))).toBe(false);
});

it("derives reciprocal links and includes all six place illustrations", () => {
  const related = places.filter(place => guide.relatedPlaces?.includes(place.id));
  expect(related).toHaveLength(6);
  expect(related.filter(place => place.image)).toHaveLength(6);
  for (const place of related) {
    expect(place.relatedArticleIds).toContain(slug);
    expect(guide.sections.some(section => section.relatedPlaceIds?.includes(place.id))).toBe(true);
  }
  for (const other of guide.relatedArticles ?? []) expect(guideArticles.find(item => item.slug === other)?.relatedArticles).toContain(slug);
  expect(contentCollections.find(item => item.id === "books-films-and-art")?.includeGuideSlugs).toContain(slug);
});

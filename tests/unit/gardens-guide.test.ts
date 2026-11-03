import { existsSync } from "node:fs";
import { expect, it } from "vitest";
import { gardensGuide as guide } from "@/content/gardens-guide";
import records from "@/content/guide-data/best-gardens-menton.json";
import { guideArticles } from "@/content/guide";
import { getPlaces } from "@/content/places";

it("publishes four aligned garden comparisons, two tables and eight FAQ answers", () => {
  expect(guideArticles).toContain(guide);
  expect(guide.sections).toHaveLength(16);
  expect(existsSync(`public${guide.coverImage}`)).toBe(true);
  for (const locale of ["en", "fr", "it", "uk"] as const) {
    const source = records.map(record => record[locale]).join("\n");
    expect(source.split(/\s+/).length).toBeGreaterThan(locale === "en" ? 2800 : 1400);
    expect(source).not.toMatch(/SEO title:|Meta description:|Suggested URL:|Редакторские рекомендации/);
    for (const [index, rows, columns] of [[1, 7, 6], [10, 4, 3]]) {
      expect(guide.sections[index].tables?.[locale]?.[0].rows).toHaveLength(rows);
      expect(guide.sections[index].tables?.[locale]?.[0].headers).toHaveLength(columns);
    }
    expect(records[13][locale].match(/^### /gm)).toHaveLength(8);
    for (const section of guide.sections) expect(section.heading[locale]).not.toMatch(/[*_]/);
  }
});

it("keeps closures, conflicting schedules and unconfirmed sessions prominent", () => {
  const intro = guide.sections[0].body[0].en;
  expect(intro).toContain("through 27 November");
  expect(intro).toContain("November and December 2026");
  expect(intro).toContain("weekend-only");
  expect(intro).toContain("no available visits");
  expect(guide.coverImageAlt?.en).toContain("not a verified view");
  const serre = getPlaces(["jardin-serre-de-la-madone"])[0];
  expect(serre.address).toBe("74 Route du Val de Gorbio, 06500 Menton");
  expect(serre.googleMapsUrl).toContain("74");
  expect(serre.openingHoursLabel?.en).toContain("conflicting");
  expect(serre.bestFor?.map(item => item.en).join(" ")).not.toMatch(/rainy/i);
  expect(getPlaces(["palais-carnoles-menton"])[0].openingHoursLabel?.en).toContain("Museum closed");
});

it("reuses seven illustrated places and reciprocal related guides", () => {
  const places = getPlaces(guide.relatedPlaces ?? []);
  expect(places).toHaveLength(7);
  for (const [index, place] of places.entries()) {
    expect(place.relatedArticleIds).toContain(guide.slug);
    expect(guide.sections[index + 2].relatedPlaceIds).toContain(place.id);
    expect(existsSync(`public${place.image}`)).toBe(true);
    expect(place.image).not.toBe(guide.coverImage);
  }
  for (const slug of guide.relatedArticles ?? []) expect(guideArticles.find(item => item.slug === slug)?.relatedArticles).toContain(guide.slug);
  const autumn = guideArticles.find(item => item.slug === "menton-in-autumn")!;
  expect(autumn.sections.find(section => section.guideLinkSlug === guide.slug)?.body.at(-1)?.en).toContain("closed through 27 November");
});

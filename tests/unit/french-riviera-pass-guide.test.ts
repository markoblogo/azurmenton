import { existsSync } from "node:fs";
import { expect, it } from "vitest";
import { frenchRivieraPassGuide as guide } from "@/content/french-riviera-pass-guide";
import { guideArticles, getLatestLandingGuideSlug } from "@/content/guide";
import { getPlace } from "@/content/places";
import { placeMapExclusions } from "@/content/planning/place-map-exclusions";
import records from "@/content/guide-data/french-riviera-pass-worth-it-from-menton.json";

it("publishes the full pass comparison with four aligned locales and the supplied cover", () => {
  expect(guideArticles).toContain(guide);
  expect(guide.sections).toHaveLength(18);
  expect(getLatestLandingGuideSlug([guide])).toBe(guide.slug);
  expect(existsSync(`public${guide.coverImage}`)).toBe(true);
  for (const locale of ["en", "fr", "it", "uk"] as const) {
    const body = guide.sections.flatMap(section => section.body.map(item => item[locale])).join("\n");
    expect(records.map(record => record[locale]).join("\n").split(/\s+/).length).toBeGreaterThan(locale === "en" ? 4000 : 2900);
    expect(body).not.toMatch(/SEO title:|Meta description:|Suggested URL:|Редакторская рекомендация|Интерактивный расчёт|Copy comparison/);
    expect(guide.sections[5].tables?.[locale]?.[0].rows[0][1]).toBe("€18");
    expect(guide.sections[8].tables?.[locale]?.[0].rows.at(-1)?.slice(1)).toEqual(["€52", "€65"]);
    expect(guide.sections[9].tables?.[locale]?.[0].rows).toHaveLength(6);
    expect(guide.sections[10].tables?.[locale]?.[0].rows.map(row => row.slice(1))).toEqual([["€7.70", "€15.40"], ["€4.10", "€8.20"]]);
  }
  expect(guide.title.uk).toMatch(/[ЇїІіЄє]/);
});

it("illustrates all five venues and distinguishes the new Èze workshop from Grasse", () => {
  expect(guide.relatedPlaces).toHaveLength(5);
  for (const id of guide.relatedPlaces ?? []) expect(getPlace(id)?.relatedArticleIds).toContain(guide.slug);
  for (const id of ["villa-kerylos-beaulieu-sur-mer", "villa-ephrussi-de-rothschild", "musee-matisse-nice", "oceanographic-museum-monaco"]) expect(getPlace(id)?.image).toBeTruthy();
  const eze = getPlace("galimard-pause-cologne-eze")!;
  expect(eze.image).toBe("/images/guide/galimard-pause-cologne-eze.png");
  expect(existsSync(`public${eze.image}`)).toBe(true);
  expect(existsSync("public/images/guide/generated/galimard-pause-cologne-eze.webp")).toBe(true);
  expect(existsSync("public/images/guide/generated/galimard-pause-cologne-eze.avif")).toBe(true);
  expect(eze.address).toContain("Èze-Village");
  expect(eze.requiresMapReview).toBe(true);
  expect(placeMapExclusions.find(item => item.placeId === eze.id)?.reason).toBe("coordinate_unverified");
  expect(getPlace("galimard-studio-des-fragrances-grasse")?.image).toBeTruthy();
  const workshops = guideArticles.find(item => item.slug === "creative-workshops-menton-french-riviera")!;
  expect(workshops.sections[9].relatedPlaceIds).toContain(eze.id);
  for (const slug of guide.relatedArticles ?? []) expect(guideArticles.find(item => item.slug === slug)?.relatedArticles).toContain(guide.slug);
});

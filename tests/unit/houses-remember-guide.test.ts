import { existsSync } from "node:fs";
import { expect, it } from "vitest";
import { housesRememberGuide as guide } from "@/content/houses-remember-guide";
import { getPlaces } from "@/content/places";
import { getLatestLandingGuideSlug } from "@/content/guide";
import { placeMapExclusions } from "@/content/planning/place-map-exclusions";

it("preserves the book companion and real translations, with two aligned tables", () => {
  expect(guide.sections).toHaveLength(17);
  for (const locale of ["en", "fr", "it", "uk"] as const) {
    const body = guide.sections.flatMap(s => s.body.map(p => p[locale])).join("\n");
    expect(body.split(/\s+/).length).toBeGreaterThan(locale === "en" ? 3000 : 2200);
    expect(body).not.toMatch(/\[\s*\]\(/);
    expect(body).not.toMatch(/\[https?:\/\//);
    expect(body).not.toContain("SEO title:");
    expect(body).not.toContain("Редакторские рекомендации");
    expect(guide.sections.flatMap(s => s.tables?.[locale] ?? [])).toHaveLength(2);
    for (const section of guide.sections) {
      expect(section.body[0][locale].length).toBeGreaterThan(60);
      if (locale === "uk") expect(section.heading.uk).toMatch(/[А-Яа-яІіЇїЄє]/);
    }
    expect(guide.sections[1].body[0][locale]).toContain("B0HPWYK4DG");
    expect(guide.sections[1].body[0][locale]).toContain("B0HPXG3RQ4");
    expect(guide.sections[16].body[0][locale]).toContain("B0HPX2CWKP");
    expect(guide.sections[16].body[0][locale]).toContain("https://abvx.xyz/writing/the-houses-that-remember-new-azurbooks-book");
  }
  expect(guide.sections[2].tables?.en?.[0].rows).toHaveLength(8);
  expect(guide.sections[0].imageLayout).toBe("portrait");
  expect(existsSync(`public${guide.coverImage}`)).toBe(true);
  expect(existsSync(`public${guide.sections[0].image}`)).toBe(true);
  expect(getLatestLandingGuideSlug([guide])).toBe(guide.slug);
  expect(guide.relatedApartments).toHaveLength(3);
});

it("links nine real places without stealing illustrations for seven new cards", () => {
  const ids = guide.sections.flatMap(s => s.relatedPlaceIds ?? []);
  expect(new Set(ids).size).toBe(9);
  for (const place of getPlaces(ids)) {
    expect(place.relatedArticleIds).toContain(guide.slug);
    if (!["jardin-val-rahmeh", "musee-matisse-nice"].includes(place.id)) {
      expect(place.image).toBeUndefined();
      expect(placeMapExclusions.some(x => x.placeId === place.id)).toBe(true);
    } else expect(place.image).toBeTruthy();
  }
});

it("does not promise public access to private homes or future seasonal tours", () => {
  for (const place of getPlaces(["villa-isola-bella-menton", "le-regina-nice"])) expect(place.visitorAccess).toBe("ask-first");
  expect(guide.sections[3].body[0].en).toContain("Don't enter");
  expect(guide.sections[6].body[0].en).toContain("later visits require a newly confirmed programme");
  expect(guide.sections[7].body[0].en).toContain("Those dates have passed");
  expect(guide.sections[10].body[0].en).toContain("not the Musée Matisse");
});

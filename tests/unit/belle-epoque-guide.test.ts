import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { belleEpoqueGuide } from "../../src/content/belle-epoque-guide";
import { royaGuide } from "../../src/content/roya-guide";
import { getLatestLandingGuideSlug } from "../../src/content/guide";
import { places } from "../../src/content/places";

describe("Belle Époque guide publication", () => {
  it("preserves the route, architecture tables, translations and access limits", () => {
    expect(belleEpoqueGuide.sections).toHaveLength(19);
    for (const locale of ["en", "fr", "it", "uk"] as const) {
      expect(belleEpoqueGuide.sections.filter(section => /^\d+\./.test(section.heading[locale]))).toHaveLength(15);
      const tables = belleEpoqueGuide.sections.flatMap(section => section.tables?.[locale] ?? []);
      expect(tables.map(table => table.rows.length)).toEqual([7, 8]);
      expect(belleEpoqueGuide.sections[0].body[0][locale]).not.toContain("Duration:");
      if (locale === "uk") for (const section of belleEpoqueGuide.sections) expect(section.heading.uk).toMatch(/[А-Яа-яІіЇїЄє]/);
    }
    expect(belleEpoqueGuide.sections[13].body[0].en).toContain("Never follow residents");
    expect(belleEpoqueGuide.sections[12].body[0].en).toContain("Approximately 60–90 minutes");
    expect(belleEpoqueGuide.sections[12].body[0].en).toContain("Approximately 2–3 hours");
    expect(belleEpoqueGuide.sections[9].officialLinks?.some(link => link.url.includes("culture.gouv.fr"))).toBe(true);
  });
  it("keeps cover, same-day publication order and reciprocal place links valid", () => {
    expect(existsSync(`public${belleEpoqueGuide.coverImage}`)).toBe(true);
    // Use a fixed publication cohort so adding tomorrow's guide cannot break this test.
    expect(getLatestLandingGuideSlug([royaGuide, belleEpoqueGuide])).toBe(belleEpoqueGuide.slug);
    const ids = [...new Set(belleEpoqueGuide.sections.flatMap(section => section.relatedPlaceIds ?? []))];
    expect(ids).toHaveLength(13);
    expect(ids).toEqual(expect.arrayContaining(["villa-isola-bella-menton", "les-colombieres-menton", "boulevard-de-garavan-menton"]));
    for (const id of ids) expect(places.find(place => place.id === id)?.relatedArticleIds, id).toContain(belleEpoqueGuide.slug);
    expect(belleEpoqueGuide.relatedApartments).toHaveLength(3);
  });
});

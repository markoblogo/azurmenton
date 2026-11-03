import { existsSync } from "node:fs";
import { expect, it } from "vitest";
import { guideArticles } from "@/content/guide";
import { getPlaces } from "@/content/places";
import { guideIntentClusters } from "@/content/guide-intents";

const slug = "best-hilltop-villages-near-menton";

it("includes a complete four-locale village comparison with three aligned tables and nine FAQ entries", () => {
  const guide = guideArticles.find(article => article.slug === slug);
  expect(guide).toBeDefined();
  expect(guide?.category).toBe("day-trips");
  expect(guide?.sections).toHaveLength(16);
  expect(guide?.publishedOn).toBe("2026-11-03");
  expect(existsSync(`public${guide?.coverImage}`)).toBe(true);
  for (const locale of ["en", "fr", "it", "uk"] as const) {
    expect(guide!.title[locale].length).toBeGreaterThan(20);
    const source = guide!.sections.flatMap(section => section.body.map(text => text[locale])).join("\n");
    expect(source.split(/\s+/).length).toBeGreaterThan(locale === "en" ? 3700 : 1800);
    expect(source).not.toMatch(/SEO title:|Meta description:|Suggested URL:|Trip duration:|Last checked:/);
    for (const section of guide!.sections) expect(section.heading[locale]).not.toMatch(/[*_]/);
    for (const [index, columns] of [[1, 5], [6, 3], [7, 2]]) {
      expect(guide!.sections[index].tables?.[locale]?.[0].rows).toHaveLength(4);
      expect(guide!.sections[index].tables?.[locale]?.[0].headers).toHaveLength(columns);
    }
    expect(source.match(/\*\*[^\n]+\?\*\*/g)?.length).toBeGreaterThanOrEqual(9);
  }
});

it("corrects Gorbio to line 5 and qualifies fares, return travel and access", () => {
  const guide = guideArticles.find(article => article.slug === slug)!;
  expect(guide).toBeDefined();
  expect(guide.sections[1].tables?.en?.[0].rows[1][3]).toContain("Zest 5");
  expect(guide.sections[3].body[0].en).toContain("Line 7 is labelled Sigua");
  expect(guide.sections[7].body[0].en).toContain("not for a rolling 24 hours");
  expect(guide.sections[5].body[0].en).toContain("editorial planning estimate");
  expect(guide.sections[6].body[0].en).toContain("doesn't guarantee a step-free route");
  expect(guide.sections[15].body[0].en).toContain("not wheelchair-accessible");
  expect(guide.sections[4].body[0].en).toContain("not the whole village");
});

it("reuses four illustrated places, reciprocal guide links and the existing day-trip intent", () => {
  const guide = guideArticles.find(article => article.slug === slug)!;
  expect(guide).toBeDefined();
  expect(guide.relatedPlaces).toEqual(["sainte-agnes", "gorbio", "place-clemenceau-castellar", "roquebrune-medieval-village"]);
  expect(getPlaces(guide.relatedPlaces!)).toHaveLength(4);
  for (const place of getPlaces(guide.relatedPlaces!)) {
    expect(place.relatedArticleIds).toContain(slug);
    expect(existsSync(`public${place.image}`)).toBe(true);
  }
  for (const related of guide.relatedArticles ?? []) expect(guideArticles.find(article => article.slug === related)?.relatedArticles).toContain(slug);
  expect(guideIntentClusters.find(cluster => cluster.id === "day-trips")?.supportingGuideSlugs).toContain(slug);
  expect(guideArticles.find(article => article.slug === "day-trips-from-menton")?.sections.find(section => section.guideLinkSlug === slug)).toBeDefined();
});

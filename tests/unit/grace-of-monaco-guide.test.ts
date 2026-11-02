import { existsSync } from "node:fs";
import { expect, it } from "vitest";
import { graceOfMonacoGuide as guide } from "@/content/grace-of-monaco-guide";
import records from "@/content/guide-data/grace-of-monaco-filming-locations-menton.json";
import { guideArticles, getLatestLandingGuideSlug } from "@/content/guide";
import { getPlaces } from "@/content/places";
import { contentCollections, resolveContentCollectionGuideSlugs } from "@/content/content-map";

it("publishes the complete film walk in four languages without service notes or Markdown debris", () => {
  expect(guideArticles).toContain(guide);
  expect(guide.sections).toHaveLength(15);
  expect(getLatestLandingGuideSlug([guide])).toBe(guide.slug);
  expect(existsSync(`public${guide.coverImage}`)).toBe(true);
  for (const locale of ["en", "fr", "it", "uk"] as const) {
    const original = records.map(record => record[locale]).join("\n");
    expect(original.split(/\s+/).length).toBeGreaterThan(locale === "en" ? 3150 : 2200);
    expect(original).not.toMatch(/SEO title:|Meta description:|Suggested URL:|Редакторские замечания|Spoiler policy:/);
    expect(guide.sections[0].tables?.[locale]?.[0].rows).toHaveLength(3);
    expect(guide.sections[2].tables?.[locale]?.[0].rows).toHaveLength(5);
    expect(guide.sections[8].tables?.[locale]?.[0].rows).toHaveLength(7);
    expect(guide.sections[2].tables?.[locale]?.[0].rows[1][2]).not.toBe(guide.sections[2].tables?.[locale]?.[0].rows[0][2]);
    for (const section of guide.sections) expect(section.heading[locale]).not.toMatch(/[*_]/);
    expect(original).toContain("1963");
    expect(original).toContain("2014");
  }
  expect(guide.title.uk).toContain("Ментон");
  expect(guide.sections[4].body[0].en).toContain("not a suitable default destination for a step-free");
  expect(guide.sections[10].body[0].en).toContain("haven't completed a frame-by-frame audit");
});

it("reuses four illustrated places with reciprocal links and preserves the confirmed-site distinction", () => {
  const places = getPlaces(guide.relatedPlaces ?? []);
  expect(places).toHaveLength(4);
  for (const place of places) {
    expect(place.relatedArticleIds).toContain(guide.slug);
    expect(place.image).toBeTruthy();
    expect(existsSync(`public${place.image}`)).toBe(true);
  }
  for (const slug of guide.relatedArticles ?? []) expect(guideArticles.find(article => article.slug === slug)?.relatedArticles).toContain(guide.slug);
  const collection = contentCollections.find(item => item.id === "books-films-and-art")!;
  expect(resolveContentCollectionGuideSlugs(collection, guideArticles)).toContain(guide.slug);
  const overview = guideArticles.find(article => article.slug === "films-shot-in-menton")!;
  const section = overview.sections.find(item => item.heading.en.startsWith("The clearest old-town"))!;
  expect(overview.sections.find(item => item.heading.en === "A focused Grace of Monaco walk")?.guideLinkSlug).toBe(guide.slug);
  expect(section.guideLinkSlug).toBe("james-bond-menton-never-say-never-again-filming-locations");
  expect(section.body.find(item => item.en.startsWith("Grace of Monaco"))?.en).toContain("not independently verified scenes");
});

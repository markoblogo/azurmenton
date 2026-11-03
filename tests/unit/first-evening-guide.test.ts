import { existsSync } from "node:fs";
import { expect, it } from "vitest";
import { guideArticles } from "@/content/guide";
import { getPlaces } from "@/content/places";
import { getGuestGuide } from "@/content/guest-guides";
import { placeMapExclusions } from "@/content/planning/place-map-exclusions";

const slug = "first-evening-menton-late-arrival";
it("includes a full four-locale arrival guide, two tables and nine FAQs without intake metadata", () => {
  const guide = guideArticles.find(article => article.slug === slug);
  expect(guide).toBeDefined();
  expect(guide?.category).toBe("practical");
  expect(guide?.sections).toHaveLength(16);
  expect(existsSync(`public${guide?.coverImage}`)).toBe(true);
  for (const locale of ["en", "fr", "it", "uk"] as const) {
    const body = guide!.sections.flatMap(section => section.body.map(text => text[locale])).join("\n");
    expect(body.split(/\s+/).length).toBeGreaterThan(locale === "en" ? 2900 : 1650);
    expect(body).not.toMatch(/SEO title:|Meta description:|Suggested URL:|Time needed:|Last checked:/);
    expect(body.match(/\*\*[^\n]+\?\*\*/g)?.length).toBeGreaterThanOrEqual(9);
    for (const section of guide!.sections) expect(section.heading[locale]).not.toMatch(/[*_]/);
    expect(guide!.sections[1].tables?.[locale]?.[0].rows).toHaveLength(5);
    expect(guide!.sections[5].tables?.[locale]?.[0].rows).toHaveLength(4);
  }
});

it("keeps current source conflicts, private access and optional services explicit", () => {
  const guide = guideArticles.find(article => article.slug === slug)!;
  expect(guide).toBeDefined();
  expect(guide.sections[2].body[0].en).toContain("never post them publicly");
  expect(guide.sections[3].body[0].en).toContain("10 December 2027");
  expect(guide.sections[3].body[0].en).toContain("direction-specific restarts");
  const stores = guide.sections[5].tables!.en![0].rows;
  expect(stores[1][2]).toContain("21:00");
  expect(stores[2][2]).toContain("not a confirmed 23:00 option");
  expect(stores[3][2]).toContain("confirm directly");
  expect(guide.sections[15].body[0].en).toContain("unless explicitly confirmed");
  const transport = guideArticles.find(article => article.slug === "public-transport-in-menton")!;
  expect(transport.sections[0].body.map(text => text.en).join(" ")).toContain("10 December 2027");
  const christmas = guideArticles.find(article => article.slug === "christmas-french-riviera-from-menton")!;
  expect(christmas.sections.flatMap(section => section.body.map(text => text.en)).join(" ")).not.toContain("11 December 2026");
});

it("links eight illustrated places, older shopping content and apartment guest guides", () => {
  const guide = guideArticles.find(article => article.slug === slug)!;
  expect(guide).toBeDefined();
  const places = getPlaces(guide.relatedPlaces ?? []);
  expect(places).toHaveLength(8);
  for (const place of places) expect(place.relatedArticleIds).toContain(slug);
  const shopping = guideArticles.find(article => article.slug === "supermarkets-in-menton")!;
  for (const id of ["carrefour-city-thiers-menton", "carrefour-city-sospel-menton"]) {
    const place = places.find(item => item.id === id)!;
    expect(place.image).toBe(`/images/guide/${id}.png`);
    for (const locale of ["en", "fr", "it", "uk"] as const) expect(place.imageAlt?.[locale]).toBeTruthy();
    expect(place.guideCoverageSlugs).toContain(shopping.slug);
    expect(shopping.relatedPlaces).toContain(id);
    expect(placeMapExclusions.find(item => item.placeId === id)?.checkedOn).toBe("2026-11-03");
  }
  for (const related of guide.relatedArticles ?? []) expect(guideArticles.find(article => article.slug === related)?.relatedArticles).toContain(slug);
  for (const apartment of ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"]) expect(getGuestGuide(apartment)?.sections.find(section => section.id === "first-evening")?.guideSlugs).toContain(slug);
});

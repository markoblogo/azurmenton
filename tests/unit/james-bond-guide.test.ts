import { existsSync } from "node:fs";
import { expect, it } from "vitest";
import { jamesBondGuide as guide } from "@/content/james-bond-guide";
import { guideArticles, getLatestLandingGuideSlug } from "@/content/guide";
import { getPlace, getPlaces } from "@/content/places";
import { contentCollections, resolveContentCollectionGuideSlugs } from "@/content/content-map";
import { placeMapExclusions } from "@/content/planning/place-map-exclusions";

const slug = "james-bond-menton-never-say-never-again-filming-locations";
const newPlaces = ["port-de-la-darse-villefranche", "quai-amiral-courbet-villefranche"];

it("publishes the full Bond article in four aligned languages without service notes", () => {
  expect(guideArticles).toContain(guide);
  expect(guide.sections).toHaveLength(18);
  expect(guide.sourceStatus).toBe("editorial");
  expect(existsSync(`public${guide.coverImage}`)).toBe(true);
  for (const locale of ["en", "fr", "it", "uk"] as const) {
    const body = guide.sections.flatMap(section => section.body.map(value => value[locale])).join("\n");
    expect(body.split(/\s+/).length).toBeGreaterThan(locale === "en" ? 3100 : 2000);
    expect(body).not.toMatch(/SEO title:|Meta description:|Suggested URL:|Самое полезное|Что стоит усилить|images\.openai\.com|utm_source=chatgpt|\[\s*\]\(/);
    expect(guide.sections.flatMap(section => section.tables?.[locale] ?? []).map(table => [table.headers.length, table.rows.length])).toEqual([[3, 7], [3, 4], [3, 3], [2, 6], [2, 10]]);
    for (const section of guide.sections) {
      expect(section.body[0][locale].length).toBeGreaterThan(50);
      if (locale === "uk") expect(section.heading.uk).toMatch(/[А-Яа-яІіЇїЄє]/);
    }
    for (const timestamp of ["1:23:28", "1:23:46", "1:25:37"]) {
      expect(guide.sections[12].tables?.[locale]?.[0].rows.flat().join(" ")).toContain(timestamp);
    }
    expect(guide.sections[17].body[0][locale]).toContain("https://www.extstreet.com/Never_Say_Never_Again.html");
    expect(guide.sections[17].body[0][locale]).toContain("2026");
  }
});

it("excludes road and stunt movements from the pedestrian outing and avoids false verification", () => {
  expect(guide.relatedPlaces).not.toContain("tunnel-pascal-molinari");
  expect(guide.sections[9].relatedPlaceIds).toBeUndefined();
  expect(guide.sections[9].body[0].en).toContain("Don't enter the tunnel on foot");
  expect(guide.sections[12].body[0].en).toContain("not yet been verified independently");
  expect(guide.sections[13].body[0].en).toContain("unsuitable as a step-free itinerary");
  expect(guide.sections[13].guideLinkSlug).toBe("menton-accessible-step-free-walks");
  expect(guide.sections[10].body[0].en).toContain("separate half-day");
  expect(guide.coverImageAlt?.en).toContain("not a film still");
  const tunnel = getPlace("tunnel-pascal-molinari")!;
  expect(tunnel.type).not.toBe("walk");
  expect(tunnel.bestFor.map(value => value.en).join(" ")).not.toContain("walk finish");
  expect(tunnel.visitRules?.conditions?.[0].value.en).toContain("Never enter the tunnel on foot");
});

it("reuses illustrated Menton cards, leaves only the two new owner image tasks and links them back", () => {
  const places = getPlaces(guide.relatedPlaces ?? []);
  expect(places).toHaveLength(9);
  for (const place of places) {
    expect(place.relatedArticleIds).toContain(slug);
    if (newPlaces.includes(place.id)) {
      expect(place.image).toBeUndefined();
      expect(place.images?.length ?? 0).toBe(0);
      if (place.id === "port-de-la-darse-villefranche") expect(placeMapExclusions.find(value => value.placeId === place.id)?.sourceUrl).toBe(place.programmeUrl);
      else expect(placeMapExclusions.find(value => value.placeId === place.id)).toBeUndefined();
      expect(place.googleMapsUrl).toContain("Villefranche");
    } else {
      expect(place.image).toBeTruthy();
      expect(existsSync(`public${place.image}`)).toBe(true);
    }
  }
  const screen = guideArticles.find(article => article.slug === "films-shot-in-menton")!;
  for (const id of newPlaces) {
    expect(screen.sections.flatMap(section => section.relatedPlaceIds ?? [])).toContain(id);
    expect(getPlace(id)?.relatedArticleIds).toContain(screen.slug);
  }
  for (const related of guide.relatedArticles ?? []) expect(guideArticles.find(article => article.slug === related)?.relatedArticles).toContain(slug);
  const collection = contentCollections.find(item => item.id === "books-films-and-art")!;
  expect(resolveContentCollectionGuideSlugs(collection, guideArticles)).toContain(slug);
  expect(getLatestLandingGuideSlug(guideArticles.slice(0, guideArticles.indexOf(guide) + 1))).toBe(slug);
});

import { existsSync, readFileSync } from "node:fs";
import { expect, it } from "vitest";
import { stepFreeMentonGuide as guide } from "@/content/step-free-menton-guide";
import { guideArticles, getLatestLandingGuideSlug } from "@/content/guide";
import { getPlaces } from "@/content/places";
import { contentCollections, resolveContentCollectionGuideSlugs } from "@/content/content-map";
import { placeMapExclusions } from "@/content/planning/place-map-exclusions";

const locales = ["en", "fr", "it", "uk"] as const;
const newPlaceIds = ["esplanade-des-sablettes-menton", "promenade-de-la-mer-menton", "handiplage-menton", "plage-du-marche-menton"];

it("publishes the full step-free guide with aligned translations and practical tables", () => {
  expect(guideArticles).toContain(guide);
  expect(guide.sections).toHaveLength(17);
  expect(guide.sourceStatus).toBe("editorial");
  expect(guide.publishedOn).toBe("2026-11-01");
  expect(guide.category).toBe("practical");
  expect(existsSync(`public${guide.coverImage}`)).toBe(true);
  for (const locale of locales) {
    const text = guide.sections.flatMap(section => section.body.map(body => body[locale])).join("\n");
    expect(text.split(/\s+/).length).toBeGreaterThan(locale === "en" ? 3300 : 2500);
    expect(text).not.toMatch(/SEO title:|Meta description:|\[\s*\]\(/);
    const tables = guide.sections.flatMap(section => section.tables?.[locale] ?? []);
    expect(tables.map(table => [table.headers.length, table.rows.length])).toEqual([[5, 5], [3, 7]]);
    for (const section of guide.sections) {
      expect(section.body[0][locale].length).toBeGreaterThan(50);
      if (locale === "uk") expect(section.heading.uk).toMatch(/[А-Яа-яІіЇїЄє]/);
    }
    expect(guide.sections[8].body[0][locale]).toContain("2026");
    expect(guide.sections[11].body[0][locale]).toContain("27");
    expect(guide.sections[11].body[0][locale]).toContain("28");
    expect(guide.sections[16].body[0][locale]).toContain("https://www.zestbus.fr/service-mobizest");
    expect(guide.sections[16].body[0][locale]).toContain("https://acceslibre.beta.gouv.fr/");
  }
  const articlesThroughPublication = guideArticles.slice(0, guideArticles.indexOf(guide) + 1);
  expect(getLatestLandingGuideSlug(articlesThroughPublication)).toBe(guide.slug);
});

it("keeps operator claims separate from field measurements and apartment certification", () => {
  expect(guide.sections[1].body[0].en).toContain("none of the full routes");
  expect(guide.sections[1].body[0].en).toContain("personally inspected");
  expect(guide.sections[2].body[0].en).toContain("not measured wheelchair travel times");
  expect(guide.sections[10].body[0].en).toContain("requires an accepted application");
  expect(guide.sections[10].body[0].en).toContain("does not certify any apartment");
  expect(guide.practicalTips?.[0].en).toContain("ask the host");
  const handiplage = getPlaces(["handiplage-menton"])[0];
  expect(handiplage.visitorAccess).toBe("ask-first");
  expect(handiplage.openingHoursLabel?.en).toContain("has ended");
  expect(handiplage.visitRules?.steps).toBeUndefined();
});

it("renders distinct illustrated places with reciprocal editorial links and explicit map limits", () => {
  const places = getPlaces(guide.relatedPlaces ?? []);
  expect(places).toHaveLength(14);
  for (const place of places) {
    expect(place.relatedArticleIds).toContain(guide.slug);
    expect(place.image).toBeTruthy();
    expect(existsSync(`public${place.image}`)).toBe(true);
  }
  for (const place of getPlaces(newPlaceIds)) {
    expect(place.image).toBe(`/images/guide/${place.id}.png`);
    expect(placeMapExclusions.find(item => item.placeId === place.id)?.sourceUrl).toBe(place.programmeUrl);
  }
  for (const slug of guide.relatedArticles ?? []) expect(guideArticles.find(article => article.slug === slug)?.relatedArticles).toContain(guide.slug);
  const beach = guideArticles.find(article => article.slug === "best-beaches-in-menton")!;
  for (const id of newPlaceIds.filter(id => id !== "promenade-de-la-mer-menton")) {
    expect(beach.sections.flatMap(section => section.relatedPlaceIds ?? [])).toContain(id);
    expect(getPlaces([id])[0].relatedArticleIds).toContain(beach.slug);
  }
  for (const id of ["walks-and-views", "family-days", "practical-stay"]) {
    const collection = contentCollections.find(item => item.id === id)!;
    expect(resolveContentCollectionGuideSlugs(collection, guideArticles)).toContain(guide.slug);
  }
  const report = JSON.parse(readFileSync("reports/guide-assets-postpublish/menton-accessible-step-free-walks.json", "utf8"));
  expect(report.matchedPlaceIds.toSorted()).toEqual(newPlaceIds.toSorted());
  expect(report.postApplyVerify.verifiedPlaceIds.toSorted()).toEqual(newPlaceIds.toSorted());
  expect(report.postApplyVerify.failedPlaceIds).toEqual([]);
  expect(report.counts.stillMissing).toBe(0);
});

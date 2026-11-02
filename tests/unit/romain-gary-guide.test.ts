import { existsSync } from "node:fs";
import { expect, it } from "vitest";
import { romainGaryGuide as guide } from "@/content/romain-gary-guide";
import { guideArticles, getLatestLandingGuideSlug } from "@/content/guide";
import { getPlace, getPlaces } from "@/content/places";
import { contentCollections, resolveContentCollectionGuideSlugs } from "@/content/content-map";
import { placeMapExclusions } from "@/content/planning/place-map-exclusions";
import { mapPlaceTypes } from "@/content/planning/map-taxonomy";

const illustratedPlaces = ["rue-shakespeare-nice", "hotel-pension-mermonts-nice", "buffa-dante-neighbourhood-nice", "hotel-negresco-nice", "lycee-massena-nice", "promenade-des-anglais-nice"];

it("publishes the complete Gary article with aligned translations and no editorial preamble", () => {
  expect(guideArticles).toContain(guide);
  expect(guide.sections).toHaveLength(22);
  expect(guide.publishedOn).toBe("2026-11-02");
  expect(existsSync(`public${guide.coverImage}`)).toBe(true);
  for (const locale of ["en", "fr", "it", "uk"] as const) {
    const body = guide.sections.flatMap(section => section.body.map(text => text[locale])).join("\n");
    expect(body.split(/\s+/).length).toBeGreaterThan(locale === "en" ? 3600 : 2500);
    expect(body).not.toMatch(/SEO title:|Meta description:|Suggested URL:|<\/?escape>|Рекомендации для AzurMenton|Карта Ромена|rim\.univ-cotedazur\.fr\+1/);
    expect(guide.sections.flatMap(section => section.tables?.[locale] ?? []).map(table => [table.headers.length, table.rows.length])).toEqual([[3, 7]]);
    expect(guide.sections[21].body[0][locale]).toContain("https://rim.univ-cotedazur.fr/items/show/2923");
    expect(guide.sections[2].body[0][locale]).toContain("https://www.ndbooks.com/book/promise-at-dawn/");
    for (const section of guide.sections) {
      expect(section.heading[locale]).not.toMatch(/[*_]/);
      expect(section.body[0][locale]).not.toMatch(/\*{3}|\*Promise at Dawn\*|\[(?:\*|_)/);
      expect(section.body[0][locale].length).toBeGreaterThan(50);
      if (locale === "uk") expect(section.heading.uk).toMatch(/[А-Яа-яІіЇїЄє]/);
    }
  }
  expect(getLatestLandingGuideSlug(guideArticles)).toBe(guide.slug);
});

it("keeps all eight cards illustrated without replacing existing assets or inventing coordinates", () => {
  const places = getPlaces(guide.relatedPlaces ?? []);
  expect(places).toHaveLength(8);
  for (const place of places) expect(place.relatedArticleIds).toContain(guide.slug);
  for (const id of illustratedPlaces) {
    const place = getPlace(id)!;
    expect(place.image).toBe(`/images/guide/${id}.png`);
    expect(existsSync(`public${place.image}`)).toBe(true);
    expect(existsSync(`public/images/guide/generated/${id}.webp`)).toBe(true);
    expect(existsSync(`public/images/guide/generated/${id}.avif`)).toBe(true);
    expect(place.googleMapsUrl).toContain("Nice");
    if (mapPlaceTypes.has(place.type)) {
      expect(place.requiresMapReview).toBe(true);
      expect(placeMapExclusions.find(item => item.placeId === id)?.checkedOn).toBe("2026-11-02");
    } else {
      expect(place.requiresMapReview).toBe(false);
      expect(placeMapExclusions.find(item => item.placeId === id)).toBeUndefined();
    }
  }
  expect(getPlace("cours-saleya-nice")?.image).toBe("/images/guide/cours-saleya-nice.jpg");
  expect(getPlace("roquebrune-medieval-village")?.image).toBe("/images/guide/roquebrune-medieval-village.jpg");
  expect(getPlace("lycee-massena-nice")?.visitorAccess).toBe("ask-first");
  expect(getPlace("hotel-pension-mermonts-nice")?.shortNote.en).toContain("not a walk-in hotel or museum");
  expect(guide.sections[12].body[0].en).toContain("not measured GPS routes");
  expect(guide.sections[16].body[0].en).toContain("isn't automatically");
  expect(guide.showTransportHelper).toBe(true);
  expect(guide.transportHelperAfterSectionIndex).toBe(13);
});

it("links the literary collection, relevant guides and practical stay context reciprocally", () => {
  const collection = contentCollections.find(item => item.id === "books-films-and-art")!;
  expect(resolveContentCollectionGuideSlugs(collection, guideArticles)).toContain(guide.slug);
  for (const slug of guide.relatedArticles ?? []) expect(guideArticles.find(item => item.slug === slug)?.relatedArticles).toContain(guide.slug);
  const dayTrip = guideArticles.find(item => item.slug === "day-trips-from-menton")!;
  expect(dayTrip.sections.flatMap(section => section.relatedPlaceIds ?? [])).toContain("promenade-des-anglais-nice");
  expect(guide.relatedApartments).toHaveLength(3);
});

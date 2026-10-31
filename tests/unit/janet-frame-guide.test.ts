import { existsSync } from "node:fs";
import { expect, it } from "vitest";
import { janetFrameGuide as guide } from "@/content/janet-frame-guide";
import { guideArticles, getLatestLandingGuideSlug } from "@/content/guide";
import { contentCollections, resolveContentCollectionGuideSlugs } from "@/content/content-map";
import { getPlaces } from "@/content/places";
import { placeMapExclusions } from "@/content/planning/place-map-exclusions";

it("publishes a full, aligned literary guide in four real languages", () => {
  expect(guideArticles).toContain(guide);
  expect(guide.sections).toHaveLength(14);
  expect(existsSync(`public${guide.coverImage}`)).toBe(true);
  for (const locale of ["en", "fr", "it", "uk"] as const) {
    const body = guide.sections.flatMap(section => section.body.map(text => text[locale])).join("\n");
    expect(body.split(/\s+/).length).toBeGreaterThan(locale === "en" ? 3000 : 2000);
    expect(body).not.toMatch(/SEO title:|Meta description:|<\/?escape>|Редакторская рекомендация/);
    expect(body).not.toMatch(/\[\s*\]\(/);
    expect(guide.sections.flatMap(section => section.tables?.[locale] ?? [])).toHaveLength(2);
    for (const section of guide.sections) {
      expect(section.body[0][locale].length).toBeGreaterThan(60);
      if (locale === "uk") expect(section.heading.uk).toMatch(/[А-Яа-яІіЇїЄє]/);
    }
    expect(guide.sections[1].body[0][locale]).toContain("https://www.textpublishing.com.au/");
    expect(guide.sections[7].body[0][locale]).toContain("28");
    expect(guide.sections[7].body[0][locale]).toContain("2026");
  }
  expect(getLatestLandingGuideSlug(guideArticles)).toBe(guide.slug);
  expect(guide.relatedApartments).toHaveLength(3);
});

it("keeps real places, owner imagery and access limits distinct from fiction", () => {
  const places = getPlaces(guide.relatedPlaces ?? []);
  expect(places).toHaveLength(5);
  for (const place of places) {
    expect(place.relatedArticleIds).toContain(guide.slug);
    expect(place.image).toBeTruthy();
    expect(existsSync(`public${place.image}`)).toBe(true);
  }
  expect(places.find(place => place.id === "villa-isola-bella-menton")?.visitorAccess).toBe("ask-first");
  expect(placeMapExclusions.find(place => place.placeId === "boulevard-de-garavan-menton")?.reason).toBe("not_a_fixed_venue");
  expect(guide.sections[4].body[0].en).toContain("fictional");
  expect(guide.sections[7].body[0].en).toContain("not presented as a confirmed setting");
  for (const slug of guide.relatedArticles ?? []) expect(guideArticles.find(article => article.slug === slug)?.relatedArticles).toContain(guide.slug);
});

it("curates book, screen and art places without sweeping in unrelated walks", () => {
  const collection = contentCollections.find(item => item.id === "books-films-and-art")!;
  const slugs = resolveContentCollectionGuideSlugs(collection, guideArticles);
  for (const slug of [guide.slug, "a-week-in-menton-book-walking-route", "the-houses-that-remember-riviera-book-route", "jean-cocteau-menton-walking-route", "films-shot-in-menton", "famous-paintings-of-menton"]) expect(slugs).toContain(slug);
  expect(slugs).not.toContain("best-walks-and-hikes-around-menton");
  for (const locale of ["en", "fr", "it", "uk"] as const) expect(collection.description[locale].length).toBeGreaterThan(40);
});

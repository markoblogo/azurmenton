import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { guideArticles, getLatestLandingGuideSlug } from "@/content/guide";
import { mentonLemonsGuide as guide } from "@/content/menton-lemons-guide";
import { getPlaces } from "@/content/places";
import { placeMapExclusions } from "@/content/planning/place-map-exclusions";
import { rivieraEvents } from "@/content/riviera-events";

const newIds = ["domaine-gannac-menton", "emilie-citrons-de-pepe-menton", "sacchelli-citrus-growers-menton", "la-ferme-des-citrons-menton", "pasta-piemonte-menton"];

describe("Menton lemon growers guide", () => {
  it("preserves the full article and aligned translations, tables and useful links", () => {
    expect(guide.sections).toHaveLength(19);
    for (const locale of ["en", "fr", "it", "uk"] as const) {
      const body = guide.sections.flatMap(section => section.body.map(p => p[locale])).join("\n");
      expect(body.split(/\s+/).length).toBeGreaterThan(locale === "en" ? 3000 : 2200);
      expect(body).not.toMatch(/\[\s*\]\(/);
      expect(body).not.toContain("Meta description:");
      expect(guide.sections.flatMap(section => section.tables?.[locale] ?? [])).toHaveLength(5);
      for (const section of guide.sections) {
        expect(section.body[0][locale].length).toBeGreaterThan(80);
        if (locale === "uk") expect(section.heading.uk).toMatch(/[А-Яа-яІіЇїЄє]/);
      }
    }
    expect(guide.sections[3].body[0].en).toContain("31 October 2026");
    expect(guide.sections[3].body[0].en).toContain("confirm directly");
    expect(guide.sections[5].body[0].en).toContain("aren't available during the Fête du Citron");
  });

  it("keeps reciprocal links, a real cover and dedicated owner illustrations", () => {
    expect(guideArticles.some(article => article.slug === guide.slug)).toBe(true);
    expect(getLatestLandingGuideSlug([guide])).toBe(guide.slug);
    expect(guide.publishedOn).toBe("2026-10-31");
    expect(existsSync(`public${guide.coverImage}`)).toBe(true);
    expect(guide.relatedApartments).toHaveLength(3);
    const ids = guide.sections.flatMap(section => section.relatedPlaceIds ?? []);
    expect(new Set(ids).size).toBe(10);
    for (const place of getPlaces(ids)) {
      expect(place.relatedArticleIds, place.id).toContain(guide.slug);
      expect(place.image).not.toBe(guide.coverImage);
    }
    for (const place of getPlaces(newIds)) {
      expect(place.image).toBe(`/images/guide/${place.id}.png`);
      expect(existsSync(`public${place.image}`)).toBe(true);
      for (const locale of ["en", "fr", "it", "uk"] as const) expect(place.imageAlt?.[locale]).toBeTruthy();
      expect(place.guideCoverageSlugs).toContain(guide.slug);
      expect(placeMapExclusions.some(item => item.placeId === place.id)).toBe(true);
    }
    expect(rivieraEvents.find(event => event.id === "menton-lemon-festival-2027")?.relatedGuideSlugs).toContain(guide.slug);
  });

  it("distinguishes the working estate from its illustrated town-centre shop", () => {
    const [estate, shop] = getPlaces(["domaine-gannac-menton", "maison-gannac-menton"]);
    expect(estate.address).toContain("2970");
    expect(estate.visitorAccess).toBe("ask-first");
    expect(shop.address).toBe("10 Rue Saint-Michel, 06500 Menton");
    expect(shop.image).toBeTruthy();
    expect(shop.address).not.toContain("2970");
  });
});

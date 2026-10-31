import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { creativeWorkshopsGuide as guide } from "@/content/creative-workshops-guide";
import { guideArticles, getLatestLandingGuideSlug } from "@/content/guide";
import { getPlaces } from "@/content/places";
import { placeMapExclusions } from "@/content/planning/place-map-exclusions";
import { extractGuideIntake } from "@/lib/guide-intake";
import { mergePublicationPlanWithMatches } from "@/lib/guide-match";

describe("creative workshops publication", () => {
  it("preserves the complete English article and substantial aligned translations", () => {
    expect(guide.sections).toHaveLength(18);
    for (const locale of ["en", "fr", "it", "uk"] as const) {
      const body = guide.sections.flatMap(section => section.body.map(p => p[locale])).join("\n");
      expect(body.split(/\s+/).length).toBeGreaterThan(locale === "en" ? 2800 : 1700);
      expect(guide.sections.flatMap(section => section.tables?.[locale] ?? [])).toHaveLength(2);
      expect(body).not.toContain("Meta description:");
      for (const section of guide.sections) {
        expect(section.body[0][locale].length).toBeGreaterThan(40);
        if (locale === "uk") expect(section.heading.uk).toMatch(/[А-Яа-яІіЇїЄє]/);
      }
    }
    expect(guide.sections[3].body[0].en).toContain("reopening on 17 November");
    expect(guide.sections[2].body[0].en).toContain("€170");
    expect(guide.sections[5].body[0].en).toContain("€60");
  });

  it("links ten distinct venues, keeps the existing illustration and declares nine missing images", () => {
    expect(getLatestLandingGuideSlug(guideArticles)).toBe(guide.slug);
    expect(existsSync(`public${guide.coverImage}`)).toBe(true);
    expect(guide.relatedApartments).toHaveLength(3);
    const ids = guide.sections.flatMap(section => section.relatedPlaceIds ?? []);
    expect(new Set(ids).size).toBe(10);
    for (const place of getPlaces(ids)) {
      expect(place.relatedArticleIds).toContain(guide.slug);
      expect(place.guideCoverageSlugs).toContain(guide.slug);
      if (place.id === "pasta-piemonte-menton") expect(place.image).toBe("/images/guide/pasta-piemonte-menton.png");
      else {
        expect(place.image).toBeUndefined();
        expect(place.programmeUrl).toMatch(/^https:\/\//);
        expect(placeMapExclusions.some(item => item.placeId === place.id)).toBe(true);
      }
    }
    for (const id of ["menton-with-kids-family-guide", "best-souvenir-shops-menton-monaco-nice"]) {
      expect(guideArticles.find(article => article.slug === id)?.relatedArticles).toContain(guide.slug);
    }
  });

  it("preserves a manually split operator and does not assign existing and new IDs simultaneously", () => {
    const intake = extractGuideIntake("# Workshops\n\n## Fragonard: perfume\n\nAddress: Èze and Grasse\n\n### Practical details\n\nReserve.");
    const branches = ["eze", "grasse"].map(city => ({ draftName: `Fragonard ${city}`, sourceDraftName: "Fragonard", newPlaceId: `fragonard-${city}`, imageStatus: "pending" as const }));
    const currentPlan = { plannedPlaces: [...branches, { draftName: "Editorial extra", newPlaceId: "extra" }] };
    const seededPlan = { plannedPlaces: [{ draftName: "Fragonard", existingPlaceId: "wrong-parent" }] };
    const merged = mergePublicationPlanWithMatches({ intake, currentPlan, seededPlan });
    expect(merged.plannedPlaces).toEqual(currentPlan.plannedPlaces);
    const single = mergePublicationPlanWithMatches({ intake, currentPlan: { plannedPlaces: [{ draftName: "Fragonard", newPlaceId: "manual-choice" }] }, seededPlan });
    expect(single.plannedPlaces?.[0].existingPlaceId).toBeNull();
    expect(single.plannedPlaces?.[0].newPlaceId).toBe("manual-choice");
  });
});

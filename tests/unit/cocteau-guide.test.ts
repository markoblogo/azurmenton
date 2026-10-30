import { expect, it } from "vitest";
import { guideArticles, getLatestLandingGuideSlug } from "@/content/guide";
import { getPlaces } from "@/content/places";

it("keeps the Cocteau route translated and linked to seven distinct real places", () => {
  const guide = guideArticles.find(g => g.slug === "jean-cocteau-menton-walking-route")!;
  expect(guide.sections).toHaveLength(17);
  expect(getLatestLandingGuideSlug([guide])).toBe(guide.slug);
  const ids = guide.sections.flatMap(s => s.relatedPlaceIds ?? []);
  expect(new Set(ids).size).toBe(7);
  for (const section of guide.sections) {
    expect(section.body[0].uk).toMatch(/[іїєґІЇЄҐ]/);
    expect(section.body[0].uk).not.toBe(section.body[0].en);
  }
  for (const place of getPlaces(ids)) {
    expect(place.relatedArticleIds).toContain(guide.slug);
    expect(place.image).not.toBe(guide.coverImage);
  }
  expect(guide.sections[1].tables?.en?.[0].rows).toHaveLength(5);
  expect(guide.sections[8].tables?.fr?.[0].rows).toHaveLength(6);
  expect(guide.sections[12].tables?.uk?.[0].rows).toHaveLength(10);
});

it("distinguishes the closed Wunderman museum and the 1 November holiday closure", () => {
  const guide = guideArticles.find(g => g.slug === "jean-cocteau-menton-walking-route")!;
  const museum = getPlaces(["musee-jean-cocteau-wunderman-menton"])[0];
  expect(museum.openingHoursLabel?.en).toContain("Closed");
  const museumsGuide = guideArticles.find(g => g.slug === "museums-in-menton-nice-monaco")!;
  expect(museumsGuide.sections.flatMap(s => s.relatedPlaceIds ?? [])).toContain(museum.id);
  expect(museum.guideCoverageSlugs).toContain(museumsGuide.slug);
  expect(guide.sections[6].body[0].en).toContain("Sunday 1 November 2026");
  expect(guide.sections[6].body[0].en).toContain("takes precedence");
  expect(guide.sections[4].body[0].en).toContain("30 January 2027");
});

it("keeps owner illustrations attached to the two new Cocteau route places", () => {
  for (const id of ["musee-jean-cocteau-wunderman-menton", "vieux-port-menton"]) {
    const place = getPlaces([id])[0];
    expect(place.image).toBe(`/images/guide/${id}.png`);
    for (const locale of ["en", "fr", "it", "uk"] as const) {
      expect(place.imageAlt?.[locale]).toBeTruthy();
    }
    expect(place.imageAlt?.uk).toMatch(/[іїєґІЇЄҐ]/);
  }
});

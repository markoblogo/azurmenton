import { expect, it } from "vitest";
import { guideArticles } from "@/content/guide";
import { getPlaces } from "@/content/places";
import { rivieraEvents } from "@/content/riviera-events";

it("keeps the LGBTQ+ guide fully localized with real empty-image venue cards", () => {
  const guide = guideArticles.find(g => g.slug === "lgbtq-menton-nice-monaco-french-riviera")!;
  expect(guide.sections).toHaveLength(18);
  for (const section of guide.sections) {
    expect(section.body[0].uk).toMatch(/[іїєґІЇЄҐ]/);
    expect(section.body[0].uk).not.toBe(section.body[0].en);
  }
  const ids = guide.sections.flatMap(s => s.relatedPlaceIds ?? []);
  expect(new Set(ids).size).toBe(17);
  const newPlaces = getPlaces(ids).filter(p => p.guideCoverageSlugs?.includes(guide.slug));
  expect(newPlaces).toHaveLength(14);
  expect(newPlaces.every(p => !p.image && !p.images?.length)).toBe(true);
  expect(rivieraEvents.find(e => e.slug === "nice-carnival")!.relatedGuideSlugs).toContain(guide.slug);
});

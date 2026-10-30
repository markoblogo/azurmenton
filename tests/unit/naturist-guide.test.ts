import { expect, it } from "vitest";
import { guideArticles, getLatestLandingGuideSlug } from "@/content/guide";
import { getPlaces } from "@/content/places";
import { primaryNavItems, secondaryNavItems } from "@/content/navigation";

it("publishes a localized naturist guide without duplicating illustrated beach cards", () => {
  const guide = guideArticles.find(g => g.slug === "naturist-nudist-beaches-near-menton")!;
  expect(guide.sections).toHaveLength(17);
  const ids = guide.sections.flatMap(s => s.relatedPlaceIds ?? []);
  expect(new Set(ids).size).toBe(6);
  for (const place of getPlaces(ids)) {
    expect(place.relatedArticleIds).toContain(guide.slug);
    expect(place.image).toBeTruthy();
    expect(place.image).not.toBe(guide.coverImage);
  }
  for (const section of guide.sections) {
    expect(section.body[0].uk).toMatch(/[іїєґІЇЄҐ]/);
    expect(section.body[0].uk).not.toBe(section.body[0].en);
  }
  expect(guide.sections[1].tables?.en?.[0].rows).toHaveLength(4);
  expect(guide.sections[10].tables?.uk?.[0].rows).toHaveLength(6);
  expect(getLatestLandingGuideSlug([guide])).toBe(guide.slug);
  expect(guideArticles.find(g => g.slug === "lgbtq-menton-nice-monaco-french-riviera")!.relatedArticles).toContain(guide.slug);
});

it("separates the three main navigation destinations from utility links", () => {
  expect(primaryNavItems.map(item => item.key)).toEqual(["apartments", "guide", "events"]);
  expect(secondaryNavItems.map(item => item.key)).toEqual(["tools", "faq", "contact"]);
});

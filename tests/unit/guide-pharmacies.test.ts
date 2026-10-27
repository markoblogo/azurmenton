import { describe, expect, it } from "vitest";
import { getGuideArticle } from "@/content/guide";
import { getPlace } from "@/content/places";
import { locales } from "@/i18n/locales";

describe("pharmacy guide", () => {
  it("links the station, airport and Garavan pharmacy cards", () => {
    const guide = getGuideArticle("pharmacies-in-menton-and-nice-airport")!;
    for (const id of ["pharmacie-riviera-menton-station", "pharmacie-garavan-menton", "pharmacie-nice-airport-terminal-2"]) {
      expect(guide.sections.some((section) => section.relatedPlaceIds?.includes(id))).toBe(true);
      expect(getPlace(id)?.relatedArticleIds).toContain(guide.slug);
    }
    for (const locale of locales) expect(guide.title[locale].length).toBeGreaterThan(0);
  });
});

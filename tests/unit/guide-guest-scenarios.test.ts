import { describe, expect, it } from "vitest";
import { getGuideArticle } from "@/content/guide";
import { locales } from "@/i18n/locales";

describe("guest scenario guide improvements", () => {
  it.each([
    ["italian-riviera-day-trip-from-menton", "How to get to Italy from Menton"],
    ["menton-with-kids-family-guide", "A cool or rainy family day"],
    ["luggage-storage-in-menton-monaco-and-nice", "Choose storage for your arrival or departure"],
  ])("provides localized guidance in %s", (slug, heading) => {
    const section = getGuideArticle(slug)?.sections.find((item) => item.heading.en === heading);
    expect(section).toBeDefined();
    for (const locale of locales) {
      expect(section!.heading[locale].length).toBeGreaterThan(0);
      expect(section!.body.every((paragraph) => paragraph[locale].length > 0)).toBe(true);
    }
  });
});

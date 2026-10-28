import { describe, expect, it } from "vitest";
import { aWeekInMentonGuide } from "@/content/a-week-in-menton-guide";
import records from "@/content/guide-data/a-week-in-menton-book-walking-route.json";

describe("literary guide formatting", () => {
  it("preserves paragraphs and inline links in every locale without duplicating them as source links", () => {
    for (const locale of ["en", "fr", "it", "uk"] as const) {
      aWeekInMentonGuide.sections.forEach((section, index) => {
        const lines = records[index][locale].split("\n").slice(1).map(line => line.trim()).filter(line => line && !line.startsWith("|"));
        expect(section.formattedBody).toBe(true);
        expect(section.body.flatMap(paragraph => paragraph[locale].split("\n")).filter(Boolean)).toHaveLength(lines.length);
        expect(section.body.every(paragraph => Boolean(paragraph[locale]))).toBe(true);
      });
      for (const index of [1, 14]) {
        expect(aWeekInMentonGuide.sections[index].body.map(p => p[locale]).join("\n")).toContain("https://www.amazon.com/dp/B0HPKXPCPV");
        expect(aWeekInMentonGuide.sections[index].officialLinks?.some(link => link.url.includes("amazon.com"))).toBe(false);
      }
      expect(aWeekInMentonGuide.sections[15].body.map(p => p[locale]).join("\n")).toContain("https://abvx.xyz/");
      expect(aWeekInMentonGuide.sections[15].officialLinks).toBeUndefined();
    }
  });
});

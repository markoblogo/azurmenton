import { describe, expect, it } from "vitest";
import { getGuideArticle } from "@/content/guide";
import { locales } from "@/i18n/locales";

describe("luggage and airport taxi guide safeguards", () => {
  it("does not present the unsupported Menton taxi estimate in any locale", () => {
    const guide = getGuideArticle("how-to-get-to-menton-from-nice-airport")!;
    const taxi = guide.sections.find((section) => section.heading.en.includes("Taxi and private transfer"))!;
    for (const locale of locales) {
      expect(taxi.body.map((body) => body[locale]).join(" ")).not.toContain("95-120");
    }
    expect(taxi.officialLinks?.some((link) => link.url === "https://www.nice.aeroport.fr/en/directions/taxis")).toBe(true);
  });

  it("retains claim-level review status and a booking source for the locker", () => {
    const guide = getGuideArticle("luggage-storage-in-menton-monaco-and-nice")!;
    expect(guide.sourceStatus).toBe("needs_verification");
    expect(guide.sections.some((section) => section.officialLinks?.some((link) => link.url.includes("luggage-storage-intermarche-hyper-menton")))).toBe(true);
  });
});

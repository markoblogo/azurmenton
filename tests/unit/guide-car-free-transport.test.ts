import { describe, expect, it } from "vitest";
import { getGuideArticle } from "@/content/guide";
import { locales } from "@/i18n/locales";

describe("car-free transport references", () => {
  it("links to the current line 80 operator and qualifies the Menton service", () => {
    const guide = getGuideArticle("how-to-get-to-menton-from-nice-airport")!;
    const section = guide.sections.find((item) => item.heading.en.includes("Airport express bus"))!;
    expect(section.officialLinks?.some((link) => link.url === "https://www.niceairportxpress.com/en/")).toBe(true);
    for (const locale of locales) expect(section.body.some((body) => body[locale].includes("2026"))).toBe(true);
    expect(section.body[0].en).toContain("not every departure");
  });

  it("links local bus fares and rail works to official sources", () => {
    const local = getGuideArticle("public-transport-in-menton")!;
    const noCar = getGuideArticle("menton-without-a-car")!;
    expect(local.sections.some((section) => section.officialLinks?.some((link) => link.url.startsWith("https://www.zestbus.fr/")))).toBe(true);
    expect(noCar.sections.some((section) => section.officialLinks?.some((link) => link.url.includes("travaux-entre-nice-vintimille")))).toBe(true);
  });
});

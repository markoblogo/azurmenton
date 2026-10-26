import { describe, expect, it } from "vitest";
import { getGuideArticle } from "@/content/guide";
import { locales } from "@/i18n/locales";

describe("winter guide sources", () => {
  it("links mountain transport and seasonal museum information in all locales", () => {
    const mountain = getGuideArticle("mountains-snow-skiing-near-menton")!;
    const travel = mountain.sections.find((section) => section.heading.en === "Can you do it without a car?")!;
    expect(travel.officialLinks?.some((link) => link.url.startsWith("https://www.zestbus.fr/"))).toBe(true);
    expect(travel.officialLinks?.some((link) => link.url.includes("bus-ligne-91-nice-auron"))).toBe(true);
    for (const locale of locales) expect(travel.body.some((body) => body[locale].includes("25"))).toBe(true);

    const resorts = mountain.sections.find((section) => section.heading.en.startsWith("Family ski resorts"))!;
    expect(resorts.officialLinks?.some((link) => link.url === "https://colmiane.axess.shop/")).toBe(true);
    for (const locale of locales) expect(resorts.body.some((body) => body[locale].includes("2027"))).toBe(true);

    const museums = getGuideArticle("museums-in-menton-nice-monaco")!;
    const nice = museums.sections.find((section) => section.heading.en.startsWith("Nice: the strongest museum"))!;
    expect(nice.officialLinks?.some((link) => link.url.includes("/chagall/en/practical-information"))).toBe(true);
    for (const locale of locales) expect(nice.body.some((body) => body[locale].includes("2027"))).toBe(true);
  });
});

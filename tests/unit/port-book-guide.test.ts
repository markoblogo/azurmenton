import { existsSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement, Fragment } from "react";
import { describe, expect, it } from "vitest";
import { portBookGuide as guide } from "@/content/port-book-guide";
import { guideArticles, localizeGuideArticle } from "@/content/guide";
import { BookRecommendationArticle } from "@/components/guide/BookRecommendationArticle";
import { formattedGuideText } from "@/components/guide/FormattedGuideText";
import { contentCollections, resolveContentCollectionGuideSlugs } from "@/content/content-map";

describe("French holiday puzzle book recommendation", () => {
  it("retains independent French copy and localized international editions without fake places", () => {
    expect(guideArticles).toContain(guide);
    expect(guide.sections).toHaveLength(10);
    expect(guide.sections[2].tables?.fr[0].rows).toHaveLength(7);
    for (const locale of ["en", "it", "uk"] as const) expect(guide.sections[2].tables?.[locale][0].rows).toHaveLength(8);
    expect(guide.sections[0].body[0].fr).toContain("Un livre pour les moments");
    expect(guide.sections[6].body[0].en).toContain("intermediate or advanced French");
    expect(guide.bookRecommendation?.language).toBe("fr");
    expect(guide.relatedPlaces).toEqual([]);
    expect(resolveContentCollectionGuideSlugs(contentCollections.find(item => item.id === "books-films-and-art")!, guideArticles)).toContain(guide.slug);
    for (const slug of guide.relatedArticles!) expect(guideArticles.find(item => item.slug === slug)?.relatedArticles).toContain(guide.slug);
  });

  it("keeps all three answers out of ordinary body/search text and localizes native disclosures", () => {
    for (const locale of ["en", "fr", "it", "uk"] as const) {
      const article = localizeGuideArticle(guide, locale);
      expect(article.bookRecommendation?.languageNote).toBeTruthy();
      const body = article.sections.flatMap(section => section.body).join("\n");
      expect(body).not.toMatch(/<\/?escape>|SEO title|Meta description|URL suggérée|Suggested URL/);
      expect(body).not.toContain("10:42");
      const answers = article.sections.at(-1)!.disclosures!;
      expect(answers).toHaveLength(3);
      expect(answers[1].body.join("\n")).toMatch(/10[: ](?:h )?42|10 h 42/);
      const html = renderToStaticMarkup(createElement(BookRecommendationArticle, { article, locale }));
      expect(html.match(/<details /g)).toHaveLength(3);
      expect(html).not.toMatch(/<details[^>]*\sopen(?:=|\s|>)/);
      expect(html).toContain("B0HQ9MX1M9");
      expect(html).toContain("B0HQ7GMWJF");
      expect(html.indexOf("data-book-promo")).toBeLessThan(html.indexOf("data-book-card"));
      expect(html.indexOf("data-book-card")).toBeLessThan(html.indexOf('data-book-section="0"'));
    }
  });

  it("has the actual cover and two book illustrations, not a public manuscript download", () => {
    for (const image of [guide.coverImage, guide.bookRecommendation?.coverImage, guide.sections[1].image, guide.sections[5].image]) expect(existsSync(`public${image}`)).toBe(true);
    expect(guide.bookRecommendation?.coverImage).not.toBe(guide.coverImage);
    expect(guide.bookRecommendation?.paperbackUrl).toBe("https://www.amazon.fr/dp/B0HQ9MX1M9");
    expect(guide.bookRecommendation?.kindleUrl).toBe("https://www.amazon.fr/dp/B0HQ7GMWJF");
  });

  it("independently solves the postcard, timetable and truth-statement examples", () => {
    const permutations = <T,>(items: T[]): T[][] => items.length ? items.flatMap((item, index) => permutations(items.filter((_, i) => i !== index)).map(rest => [item, ...rest])) : [[]];
    const solutions = [];
    for (const colours of permutations(["blue", "green", "red"])) for (const destinations of permutations(["Menton", "Nice", "Monaco"])) {
      if (colours[2] === "red" && colours[destinations.indexOf("Nice")] === "green" && colours[1] !== "blue" && destinations[0] !== "Nice" && destinations[colours.indexOf("red")] === "Monaco") solutions.push({ colours, destinations });
    }
    expect(solutions).toEqual([{ colours: ["blue", "green", "red"], destinations: ["Menton", "Nice", "Monaco"] }]);
    const leave = 10 * 60 + 8, stop = leave + 11, departure = 600 + Math.ceil((stop - 600) / 18) * 18;
    expect({ walking: leave + 34, train: departure + 14 }).toEqual({ walking: 642, train: 650 });
    expect(["A", "B", "C"].filter(coin => [coin === "B", coin !== "B", coin !== "A"].filter(Boolean).length === 1)).toEqual(["A"]);
  });

  it("preserves shared formatted text behavior for ordinary guides", () => {
    const html = renderToStaticMarkup(createElement(Fragment, null, ...formattedGuideText("Read **the book** and _pause_. [Guide](https://azurmenton.com/en/guide/menton-old-town)", "uk")));
    expect(html).toContain("<strong");
    expect(html).toContain("<em>pause</em>");
    expect(html).toContain('href="/uk/guide/menton-old-town"');
    expect(html).not.toContain("**");
  });
});

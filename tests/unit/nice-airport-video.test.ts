import { expect, it } from "vitest";
import { getGuideArticle, localizeGuideArticle } from "@/content/guide";
import { locales } from "@/i18n/locales";

it("adds the supplied airport video once in the final section with localized labels and no autoplay", () => {
  const guide = getGuideArticle("how-to-get-to-menton-from-nice-airport")!;
  const media = guide.sections.flatMap(section => section.videoEmbeds ?? []);
  expect(media).toHaveLength(1);
  expect(guide.sections.at(-1)?.videoEmbeds).toEqual(media);
  expect(media[0]).toMatchObject({
    provider: "youtube",
    embedUrl: "https://www.youtube-nocookie.com/embed/ih43aF1zeaM",
    watchUrl: "https://www.youtube.com/watch?v=ih43aF1zeaM",
  });
  expect(media[0].embedUrl).not.toContain("autoplay");
  for (const locale of locales) {
    const section = localizeGuideArticle(guide, locale).sections.at(-1)!;
    expect(section.heading.length).toBeGreaterThan(10);
    expect(section.videoEmbeds?.[0].title.length).toBeGreaterThan(10);
    expect(section.videoEmbeds?.[0].watchLabel?.length).toBeGreaterThan(5);
  }
});

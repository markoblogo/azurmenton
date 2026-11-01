import { expect, it } from "vitest";
import { getGuideArticle, localizeGuideArticle } from "@/content/guide";
import { locales } from "@/i18n/locales";

it("embeds the supplied market video once in the final article section for every locale", () => {
  const guide = getGuideArticle("halles-du-marche-menton")!;
  const media = guide.sections.flatMap(section => section.videoEmbeds ?? []);
  expect(media).toHaveLength(1);
  expect(guide.sections.at(-1)?.videoEmbeds).toEqual(media);
  expect(media[0]).toMatchObject({
    provider: "youtube",
    embedUrl: "https://www.youtube-nocookie.com/embed/WEEGy8Ks3ig",
    watchUrl: "https://www.youtube.com/watch?v=WEEGy8Ks3ig",
  });
  expect(media[0].embedUrl).not.toContain("autoplay");
  for (const locale of locales) {
    const section = localizeGuideArticle(guide, locale).sections.at(-1)!;
    expect(section.heading.length).toBeGreaterThan(10);
    expect(section.videoEmbeds?.[0].title.length).toBeGreaterThan(10);
    expect(section.videoEmbeds?.[0].watchLabel?.length).toBeGreaterThan(5);
  }
});

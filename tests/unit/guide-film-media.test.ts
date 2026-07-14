import { describe, expect, it } from "vitest";
import { getGuideArticle, localizeGuideArticle } from "@/content/guide";
import { locales } from "@/i18n/locales";

describe("films shot in Menton media", () => {
  const guide = getGuideArticle("films-shot-in-menton");

  it("gives every named production an individual media or detail action", () => {
    expect(guide).toBeDefined();

    const media = guide?.sections.flatMap((section) => section.videoEmbeds ?? []) ?? [];
    expect(media).toHaveLength(13);
    expect(new Set(media.map((item) => item.id)).size).toBe(media.length);
    expect(media.every((item) => item.watchUrl.startsWith("https://"))).toBe(true);
  });

  it("keeps approved YouTube embeds on the privacy-enhanced domain", () => {
    const media = guide?.sections.flatMap((section) => section.videoEmbeds ?? []) ?? [];
    const embeds = media.filter((item) => item.provider === "youtube");

    expect(embeds).toHaveLength(5);
    expect(embeds.every((item) => /^https:\/\/www\.youtube-nocookie\.com\/embed\/[A-Za-z0-9_-]{11}$/.test(item.embedUrl ?? ""))).toBe(true);
  });

  it("localizes media titles and action labels for every published locale", () => {
    expect(guide).toBeDefined();

    for (const locale of locales) {
      const localized = localizeGuideArticle(guide!, locale);
      const media = localized.sections.flatMap((section) => section.videoEmbeds ?? []);
      expect(media).toHaveLength(13);
      expect(media.every((item) => item.title.length > 0 && item.watchLabel?.length)).toBe(true);
    }
  });
});

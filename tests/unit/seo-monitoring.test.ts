import { describe, expect, it } from "vitest";
import { apartments } from "../../src/content/apartments";
import { guideArticles } from "../../src/content/guide";
import { seoMonitoring } from "../../src/content/seo-monitoring";
import { getCanonicalEventDetailSlug, getRivieraEvent, isIndexableEventDetail } from "../../src/content/riviera-events";
import { stayPages } from "../../src/content/stay-pages";

describe("SEO priority monitoring", () => {
  it("keeps a bounded, canonical and resolvable Search Console review set", () => {
    const failures: string[] = [];
    const targets = seoMonitoring.targets;

    if (targets.length < 5 || targets.length > 10) failures.push("priority target count must stay between 5 and 10");
    if (new Set(targets.map((target) => target.id)).size !== targets.length) failures.push("priority target ids must be unique");
    if (new Set(targets.map((target) => target.canonicalPath)).size !== targets.length) failures.push("priority canonical paths must be unique");

    for (const target of targets) {
      if (target.kind === "apartment") {
        if (!apartments.some((apartment) => apartment.slug === target.slug)) failures.push(`${target.id} apartment missing`);
        if (target.canonicalPath !== `/en/apartments/${target.slug}`) failures.push(`${target.id} apartment path is not canonical`);
      }

      if (target.kind === "stay") {
        if (!stayPages.some((page) => page.slug === target.slug)) failures.push(`${target.id} stay page missing`);
        if (target.canonicalPath !== `/en/stay/${target.slug}`) failures.push(`${target.id} stay path is not canonical`);
      }

      if (target.kind === "guide") {
        if (!guideArticles.some((article) => article.slug === target.slug)) failures.push(`${target.id} guide missing`);
        if (target.canonicalPath !== `/en/guide/${target.slug}`) failures.push(`${target.id} guide path is not canonical`);
      }

      if (target.kind === "event") {
        const event = getRivieraEvent(target.slug);
        const canonicalSlug = getCanonicalEventDetailSlug(target.slug);
        if (!event || !canonicalSlug || !isIndexableEventDetail(event)) failures.push(`${target.id} event is unresolved or not indexable`);
        if (target.canonicalPath !== `/en/events/${canonicalSlug}`) failures.push(`${target.id} event path is not canonical`);
      }
    }

    expect(failures).toEqual([]);
  });
});

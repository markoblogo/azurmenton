import { createHash } from "node:crypto";
import { expect, it } from "vitest";
import { guidePackages, packagedGuides } from "@/content/guide-packages";
import { guideArticles } from "@/content/guide";
import { places } from "@/content/places";
import { contentCollections } from "@/content/content-map";

it("preserves the complete Maria Serena article from before migration", () => {
  const guide = packagedGuides.find(item => item.slug === "in-the-name-of-my-daughter-villa-maria-serena-menton");
  expect(createHash("sha256").update(JSON.stringify(guide)).digest("hex")).toBe("94d659c51e03a90379c1c8ca09887fb2c0a6383309a334d5c953c8c6d0563736");
});

it("registers packages and validates their explicit graph", () => {
  const slugs = guideArticles.map(guide => guide.slug);
  for (const [index, pkg] of guidePackages.entries()) {
    const guide = packagedGuides[index];
    expect(slugs.filter(slug => slug === guide.slug)).toHaveLength(1);
    for (const id of guide.relatedPlaces ?? []) {
      const place = places.find(item => item.id === id);
      expect(place, id).toBeDefined();
      expect(place?.relatedArticleIds).toContain(guide.slug);
    }
    for (const slug of guide.relatedArticles ?? []) {
      const related = guideArticles.find(item => item.slug === slug);
      expect(related, slug).toBeDefined();
      expect(related?.relatedArticles).toContain(guide.slug);
    }
    for (const section of guide.sections) if (section.guideLinkSlug) expect(slugs).toContain(section.guideLinkSlug);
    for (const id of pkg.collections) {
      const collection = contentCollections.find(item => item.id === id);
      expect(collection, id).toBeDefined();
      expect(collection?.includeGuideSlugs).toContain(guide.slug);
    }
  }
});

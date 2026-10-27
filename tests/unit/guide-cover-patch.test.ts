import { describe, expect, it } from "vitest";
import { createRequire } from "node:module";

const { applyGuideCover } = createRequire(import.meta.url)("../../scripts/lib/guide-cover-patch.cjs");
const title = { en: "Guide", fr: "Guide", it: "Guida", uk: "Гід" };
const source = 'const guides = [shortArticle({\n    id: "demo",\n    slug: "demo",\n    visualStatus: "editorial_placeholder",\n  })];';

describe("safe guide cover update", () => {
  it("adds localized cover metadata to the intended placeholder", () => {
    const result = applyGuideCover(source, "demo", "/images/guide/demo.jpg", title);
    expect(result).toContain('coverImage: "/images/guide/demo.jpg"');
    expect(result).toContain('visualStatus: "project_illustration"');
    expect(result).toContain("Ілюстрація: Гід");
  });
  it("refuses existing covers, ambiguous anchors and unsafe paths", () => {
    expect(() => applyGuideCover(source.replace('id: "demo",', 'id: "demo", coverImage: "old.jpg",'), "demo", "/images/guide/demo.jpg", title)).toThrow();
    expect(() => applyGuideCover(source + source, "demo", "/images/guide/demo.jpg", title)).toThrow();
    expect(() => applyGuideCover(source, "demo", "/images/guide/../bad.jpg", title)).toThrow();
  });
});

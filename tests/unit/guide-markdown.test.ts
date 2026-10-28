import { describe, expect, it } from "vitest";
import { compileGuideMarkdown, markdownGuideSections, parseGuideMarkdownBlock } from "../../src/lib/guide-markdown";

const en = "# Valley\n\nSEO title: hidden\n\nRecommended duration: one day\n\nA proper introduction.\n\n## 1. Travel\n\nCheck [operator](https://example.org/).\n\n| Place | Time |\n| --- | --- |\n| Village | One hour |";
const sources = { en, fr: en, it: en, uk: en };
describe("reviewed multilingual guide compilation", () => {
  it("preserves paragraphs, tables and source links while stripping service metadata", () => {
    const records = compileGuideMarkdown(sources);
    expect(records).toHaveLength(2);
    expect(records[0].en).not.toContain("Recommended duration");
    const sections = markdownGuideSections(records, { en: "Introduction", fr: "Introduction", it: "Introduzione", uk: "Вступ" });
    expect(sections[0].body[0].en).toBe("A proper introduction.");
    expect(sections[1].tables?.en[0].rows).toEqual([["Village", "One hour"]]);
    expect(sections[1].officialLinks?.[0].url).toBe("https://example.org/");
  });
  it("fails before writing if a locale loses a section, numbered heading or table row", () => {
    expect(() => compileGuideMarkdown({ ...sources, uk: "# Valley\n\nText" })).toThrow("section count");
    expect(() => compileGuideMarkdown({ ...sources, fr: en.replace("1. Travel", "2. Travel") })).toThrow("numbered section");
    expect(() => compileGuideMarkdown({ ...sources, it: en.replace("| Village | One hour |", "") })).toThrow("table structure");
  });
  it("handles escaped table separators and rejects uneven rows", () => {
    expect(parseGuideMarkdownBlock("## Table\nText\n| A | B |\n| --- | --- |\n| x\\|y | z |").tables[0].rows).toEqual([["x|y", "z"]]);
    expect(() => parseGuideMarkdownBlock("## Bad\nText\n| A | B |\n| x |")).toThrow("Malformed table");
  });
  it("keeps literal Word URLs clickable without duplicating unbreakable body text", () => {
    const url = "https://museedesmerveilles.departement06.fr/informations-pratiques";
    const block = parseGuideMarkdownBlock(`## Museum\nOfficial website:[ ](${url})[${url}](${url})`);
    expect(block.body).toEqual(["Official website:"]);
    expect(block.links).toEqual([{ label: "museedesmerveilles.departement06.fr", url }]);
  });
});

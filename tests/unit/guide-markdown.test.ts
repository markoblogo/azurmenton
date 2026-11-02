import { describe, expect, it } from "vitest";
import { compileGuideMarkdown, formattedMarkdownGuideBody, markdownGuideSections, parseGuideMarkdownBlock } from "../../src/lib/guide-markdown";

const en = "# Valley\n\nSEO title: hidden\n\nRecommended duration: one day\nDuration: two hours\nLast researched: 28 October 2026\n\nA proper introduction.\n\n## 1. Travel\n\nCheck [operator](https://example.org/).\n\n| Place | Time |\n| --- | --- |\n| Village | One hour |";
const sources = { en, fr: en, it: en, uk: en };
describe("reviewed multilingual guide compilation", () => {
  it("strips service fields only before the editorial body, not route durations later in the article", () => {
    const text = "# Architecture\nDuration: metadata\nLast researched: metadata\n\nEditorial introduction.\n\n## 1. Route\nDuration: 60–90 minutes.\nLast researched: an editorial note.";
    const records = compileGuideMarkdown({ en: text, fr: text, it: text, uk: text });
    expect(records[0].en).not.toContain("metadata");
    expect(records[1].en).toContain("Duration: 60–90 minutes.");
    expect(records[1].en).toContain("Last researched: an editorial note.");
  });
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
  it("removes emphasis delimiters from plain section headings", () => {
    expect(parseGuideMarkdownBlock("## 1. Discover *Promise at Dawn*\nText").heading).toBe("1. Discover Promise at Dawn");
    expect(parseGuideMarkdownBlock("## **Read _La Promesse_**\nText").heading).toBe("Read La Promesse");
  });
  it("flattens nested emphasis in subheadings and link labels without changing URLs or body emphasis", () => {
    const body = formattedMarkdownGuideBody("## Film\n### *Promise at Dawn* (2017)\n[*Promise at Dawn*, Film France](https://example.org/promise_at_dawn)\n[_La Promesse_, publisher](https://example.org/a_b)\nRead *the book* and **take a break**.");
    expect(body).toBe("**Promise at Dawn (2017)**\n[Promise at Dawn, Film France](https://example.org/promise_at_dawn)\n[La Promesse, publisher](https://example.org/a_b)\nRead _the book_ and **take a break**.");
    expect(parseGuideMarkdownBlock("## GPIO_PIN_NAME\nText").heading).toBe("GPIO_PIN_NAME");
  });
});

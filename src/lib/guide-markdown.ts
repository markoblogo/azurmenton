import type { LocalizedGuideSection, LocalizedText } from "@/content/guide";

const locales = ["en", "fr", "it", "uk"] as const;
export type GuideMarkdownRecord = Record<typeof locales[number], string>;
const field = /^(?:SEO title|Meta title|Meta description|Suggested URL|Category|Best for|Duration|Recommended duration|Season covered|Programme last checked|Last researched|Last transport and access check):/i;

function plainInlineEmphasis(text: string) {
  return text.replace(/\*\*([^*\n]+)\*\*/g, "$1")
    .replace(/__([^_\n]+)__/g, "$1")
    .replace(/\*([^*\n]+)\*/g, "$1")
    .replace(/(^|[^\p{L}\p{N}])_([^_\n]+)_(?=$|[^\p{L}\p{N}])/gu, "$1$2");
}

// The guide renderer supports flat emphasis, not nested Markdown inside titles or links.
export function formattedMarkdownGuideBody(markdown: string) {
  return markdown.split("\n").slice(1).map(line => line.trim())
    .filter(line => line && !line.startsWith("|"))
    .map(line => {
      const heading = line.match(/^#{3,6}\s+(.+)$/);
      if (heading) return `**${plainInlineEmphasis(heading[1])}**`;
      return line.replace(/^[-*]\s+/, "")
        .replace(/\[([^\]]+)\](?=\(https?:\/\/)/g, (_, label: string) => `[${plainInlineEmphasis(label)}]`)
        .replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, "_$1_");
    }).join("\n");
}

export function compileGuideMarkdown(sources: GuideMarkdownRecord): GuideMarkdownRecord[] {
  const split = (source: string) => {
    let preamble = true;
    return source.replace(/\r/g, "").split("\n").filter(line => {
      if (preamble && field.test(line)) return false;
      if (line.trim() && !/^# /.test(line)) preamble = false;
      return true;
    }).join("\n").split(/(?=^## )/m).map(block => block.trim()).filter(Boolean);
  };
  const blocks = Object.fromEntries(locales.map(locale => [locale, split(sources[locale])])) as Record<typeof locales[number], string[]>;
  if (!blocks.en.length || !blocks.en[0].startsWith("# ")) throw new Error("English source must begin with an H1");
  for (const locale of locales) {
    if (blocks[locale].length !== blocks.en.length) throw new Error(`${locale}: section count differs from English`);
    blocks[locale].forEach((block, index) => {
      const parsed = parseGuideMarkdownBlock(block);
      const en = parseGuideMarkdownBlock(blocks.en[index]);
      if (!parsed.body.length) throw new Error(`${locale}: section ${index} has no body`);
      if (JSON.stringify(parsed.tables.map(table => [table.headers.length, table.rows.length])) !== JSON.stringify(en.tables.map(table => [table.headers.length, table.rows.length]))) {
        throw new Error(`${locale}: section ${index} table structure differs from English`);
      }
      if (index && (parsed.heading.match(/^\d+\./)?.[0] ?? "") !== (en.heading.match(/^\d+\./)?.[0] ?? "")) throw new Error(`${locale}: numbered section ${index} differs from English`);
    });
  }
  return blocks.en.map((_, index) => Object.fromEntries(locales.map(locale => [locale, blocks[locale][index]])) as GuideMarkdownRecord);
}

export function parseGuideMarkdownBlock(text: string) {
  const lines = text.split("\n");
  const heading = plainInlineEmphasis(lines.shift()?.replace(/^#+\s*/, "") ?? "");
  const body: string[] = [];
  const tables: { headers: string[]; rows: string[][] }[] = [];
  const links: { label: string; url: string }[] = [];
  const clean = (value: string) => value.replace(/\[([^\]]*)\]\((https?:\/\/[^)]+)\)/g, (_, label: string, url: string) => {
    const rawUrlLabel = label.trim() === url;
    const linkLabel = rawUrlLabel ? new URL(url).hostname : label.trim();
    if (linkLabel && !links.some(link => link.url === url)) links.push({ label: linkLabel, url });
    // Literal Word URL labels are rendered once as source links, not as long body tokens.
    return rawUrlLabel ? "" : label.trim();
  }).replace(/^#+\s*/, "").replace(/\*\*/g, "").replace(/^[-*]\s*/, "").trim();
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(lines[i].trim().replace(/^\||\|$/g, "").split(/(?<!\\)\|/).map(cell => clean(cell.replace(/\\\|/g, "|"))));
        i++;
      }
      i--;
      const data = rows.slice(1).filter(row => !row.every(cell => /^:?-+:?$/.test(cell)));
      if (data.some(row => row.length !== rows[0].length)) throw new Error(`Malformed table in ${heading}`);
      tables.push({ headers: rows[0], rows: data });
    } else {
      const value = clean(lines[i]);
      if (value) body.push(value);
    }
  }
  return { heading, body, tables, links };
}

export function markdownGuideSections(records: GuideMarkdownRecord[], introHeading: LocalizedText): LocalizedGuideSection[] {
  return records.map((record, index) => {
    const parsed = Object.fromEntries(locales.map(locale => [locale, parseGuideMarkdownBlock(record[locale])])) as Record<typeof locales[number], ReturnType<typeof parseGuideMarkdownBlock>>;
    const localize = (select: (locale: typeof locales[number]) => string) => Object.fromEntries(locales.map(locale => [locale, select(locale)])) as LocalizedText;
    const urls = parsed.en.links.map(link => link.url).filter(url => !url.startsWith("https://azurmenton.com/"));
    return {
      heading: index === 0 ? introHeading : localize(locale => parsed[locale].heading),
      body: [localize(locale => parsed[locale].body.join("\n\n"))],
      tables: Object.fromEntries(locales.map(locale => [locale, parsed[locale].tables])) as LocalizedGuideSection["tables"],
      ...(urls.length ? { officialLinks: urls.map(url => ({ url, label: localize(locale => parsed[locale].links.find(link => link.url === url)?.label ?? parsed.en.links.find(link => link.url === url)?.label ?? url) })) } : {}),
    };
  });
}

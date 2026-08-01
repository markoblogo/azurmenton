export function decodeHtml(value: string) {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(Number.parseInt(code, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&ndash;/g, "-")
    .replace(/&mdash;/g, "-")
    .replace(/&nbsp;/g, " ");
}

export function stripTags(value: string) {
  return decodeHtml(value.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

export function attr(block: string, name: string) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = block.match(new RegExp(`${escaped}=["']([^"']+)["']`, "i"));
  return match ? decodeHtml(match[1]).trim() : undefined;
}

export function htmlBlocks(html: string, tagName: string, classNeedle: string) {
  const blocks: string[] = [];
  const regex = new RegExp(`<${tagName}\\b[^>]*${classNeedle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[^>]*>[\\s\\S]*?<\\/${tagName}>`, "gi");
  for (const match of html.matchAll(regex)) blocks.push(match[0]);
  return blocks;
}

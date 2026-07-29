export type GuidePlaceCandidate = {
  name: string;
  section?: string;
};

export type GuideIntake = {
  title: string;
  slug: string;
  seoTitle?: string;
  metaDescription?: string;
  intro?: string;
  coverPathHint?: string;
  categoryHint?: string;
  sectionHeadings: string[];
  placeCandidates: GuidePlaceCandidate[];
  relatedGuideTitles: string[];
  rawSuggestedSlug?: string;
};

type GuideHeading = {
  level: number;
  text: string;
  lineIndex: number;
};

function normalizeText(value: string) {
  return value.replace(/\r/g, "").trim();
}

function stripMarkdownDecoration(value: string) {
  return value
    .replace(/^#+\s*/, "")
    .replace(/^\d{1,2}[.)]\s*/, "")
    .replace(/^[IVXLCM]+[.)]\s+/i, "")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/`/g, "")
    .trim();
}

function toKebabCase(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function extractField(lines: string[], label: string) {
  const lowerLabel = label.toLowerCase();

  for (const line of lines) {
    const normalized = normalizeText(line);
    const index = normalized.toLowerCase().indexOf(lowerLabel);
    if (index !== 0) continue;
    const value = normalized.slice(label.length).trim().replace(/^[:\-]\s*/, "");
    if (value) return value;
  }

  return undefined;
}

function extractFirstField(lines: string[], labels: string[]) {
  for (const label of labels) {
    const value = extractField(lines, label);
    if (value) return value;
  }
  return undefined;
}

function normalizeHeadingText(value: string) {
  return stripMarkdownDecoration(value)
    .replace(/^\d{1,2}[.)]\s*/, "")
    .replace(/^[IVXLCM]+[.)]\s+/i, "")
    .replace(/^[-–—]\s*/, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function slugToTitle(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function isPreambleHeading(text: string) {
  return /^(seo|metadata|service(?:\s+preamble)?|publication notes?|operator notes?|editorial notes?)$/i.test(text);
}

function findPrimaryTitleLineIndex(lines: string[]) {
  for (let index = 0; index < lines.length; index += 1) {
    const normalized = normalizeText(lines[index]);
    if (!normalized.startsWith("#")) continue;
    const title = normalizeHeadingText(normalized);
    if (!title || isPreambleHeading(title)) continue;
    return index;
  }

  return -1;
}

function extractHeadings(lines: string[]) {
  return lines
    .map(normalizeText)
    .map((line, lineIndex) => {
      const match = line.match(/^(#{1,6})\s+/);
      if (!match) return null;

      const text = normalizeHeadingText(line);
      if (!text) return null;

      return {
        level: match[1].length,
        text,
        lineIndex,
      };
    })
    .filter(Boolean) as GuideHeading[];
}

function findPrimaryHeadingOffset(headings: GuideHeading[]) {
  const levelOne = headings.findIndex((heading) => heading.level === 1 && !isPreambleHeading(heading.text));
  if (levelOne !== -1) return levelOne;
  const firstNonPreamble = headings.findIndex((heading) => !isPreambleHeading(heading.text));
  return firstNonPreamble === -1 ? 0 : firstNonPreamble;
}

function extractTitle(lines: string[]) {
  const titleLineIndex = findPrimaryTitleLineIndex(lines);
  if (titleLineIndex !== -1) {
    const title = normalizeHeadingText(normalizeText(lines[titleLineIndex]));
    if (title) return title;
  }

  return "Untitled guide";
}

function isSuppressedHeading(text: string) {
  return /^our recommendations$/i.test(text) || /^recommendations$/i.test(text);
}

function findNearestAncestor(headings: GuideHeading[], index: number, maxLevel: number) {
  for (let cursor = index - 1; cursor >= 0; cursor -= 1) {
    const heading = headings[cursor];
    if (heading.level < maxLevel) return heading;
  }
  return undefined;
}

function hasDeeperDescendants(headings: GuideHeading[], index: number) {
  const current = headings[index];
  for (let cursor = index + 1; cursor < headings.length; cursor += 1) {
    const heading = headings[cursor];
    if (heading.level <= current.level) return false;
    if (heading.level > current.level) return true;
  }
  return false;
}

function sitsUnderSuppressedAncestor(headings: GuideHeading[], index: number) {
  let maxLevel = headings[index].level;
  for (let cursor = index - 1; cursor >= 0; cursor -= 1) {
    const heading = headings[cursor];
    if (heading.level < maxLevel) {
      if (isSuppressedHeading(heading.text)) return true;
      maxLevel = heading.level;
    }
  }
  return false;
}

function extractIntro(lines: string[]) {
  const titleLineIndex = findPrimaryTitleLineIndex(lines);
  if (titleLineIndex === -1) return undefined;
  const paragraphs: string[] = [];

  for (let index = titleLineIndex + 1; index < lines.length; index += 1) {
    const line = lines[index];
    const normalized = normalizeText(line);

    if (!normalized) {
      if (paragraphs.length) break;
      continue;
    }

    if (normalized.startsWith("##")) break;
    if (/^(SEO title|Meta description|Suggested slug|Cover image)/i.test(normalized)) continue;

    paragraphs.push(stripMarkdownDecoration(normalized));
  }

  return paragraphs.length ? paragraphs.join(" ") : undefined;
}

function extractSectionHeadings(lines: string[]) {
  const allHeadings = extractHeadings(lines);
  const headings = allHeadings.slice(findPrimaryHeadingOffset(allHeadings));
  const title = headings[0]?.text;
  const placeCandidateIndexes = new Set<number>();

  headings.forEach((heading, index) => {
    if (index === 0 || isSuppressedHeading(heading.text)) return;

    if (heading.level === 2) {
      const ancestor = findNearestAncestor(headings, index, heading.level);
      if (ancestor && ancestor.level === 1 && ancestor.text !== title && !hasDeeperDescendants(headings, index)) {
        placeCandidateIndexes.add(index);
      }
      return;
    }

    if (heading.level === 3) {
      const ancestor = findNearestAncestor(headings, index, heading.level);
      if (ancestor && ancestor.level === 2 && !isSuppressedHeading(ancestor.text)) {
        placeCandidateIndexes.add(index);
      }
    }
  });

  return headings
    .filter((heading, index) => index !== 0 && !placeCandidateIndexes.has(index) && !isSuppressedHeading(heading.text) && !sitsUnderSuppressedAncestor(headings, index))
    .map((heading) => heading.text);
}

function extractPlaceCandidates(lines: string[]) {
  const candidates: GuidePlaceCandidate[] = [];
  const allHeadings = extractHeadings(lines);
  const headings = allHeadings.slice(findPrimaryHeadingOffset(allHeadings));
  const title = headings[0]?.text;

  headings.forEach((heading, index) => {
    if (index === 0 || isSuppressedHeading(heading.text)) return;

    if (heading.level === 2) {
      const ancestor = findNearestAncestor(headings, index, heading.level);
      if (ancestor && ancestor.level === 1 && ancestor.text !== title && !hasDeeperDescendants(headings, index)) {
        candidates.push({ name: heading.text, section: ancestor.text });
      }
      return;
    }

    if (heading.level === 3) {
      const ancestor = findNearestAncestor(headings, index, heading.level);
      if (ancestor && ancestor.level === 2 && !isSuppressedHeading(ancestor.text)) {
        candidates.push({ name: heading.text, section: ancestor.text });
      }
    }
  });

  return candidates;
}

function extractRelatedGuideTitles(lines: string[]) {
  const titles: string[] = [];
  let inRelatedGuides = false;

  for (const line of lines) {
    const normalized = normalizeText(line);
    if (!normalized) {
      if (inRelatedGuides && titles.length) break;
      continue;
    }

    if (/^##\s*\**(related guides|related articles|relevant guides|useful related guides)\**/i.test(normalized)) {
      inRelatedGuides = true;
      continue;
    }

    if (inRelatedGuides && normalized.startsWith("##")) break;
    if (!inRelatedGuides) continue;

    const bulletMatch = normalized.match(/^- (.+)$/);
    if (!bulletMatch) continue;
    const bullet = stripMarkdownDecoration(bulletMatch[1]);
    const guideUrlMatch = bullet.match(/https?:\/\/[^)\s]+\/[a-z]{2}\/guide\/([a-z0-9-]+)/i);
    if (guideUrlMatch?.[1]) {
      titles.push(slugToTitle(guideUrlMatch[1]));
      continue;
    }

    titles.push(bullet);
  }

  return [...new Set(titles.map((title) => title.trim()).filter(Boolean))];
}

export function extractGuideIntake(raw: string, options?: { coverPathHint?: string }): GuideIntake {
  const lines = raw.replace(/\r/g, "").split("\n");
  const title = extractTitle(lines);
  const rawSuggestedSlug = extractFirstField(lines, ["Suggested slug", "Slug", "Suggested URL"]);
  const suggestedSlug = rawSuggestedSlug?.replace(/^\/[a-z]{2}\/guide\//i, "").replace(/^\/+/, "");

  return {
    title,
    slug: suggestedSlug ? toKebabCase(suggestedSlug) : toKebabCase(title),
    seoTitle: extractFirstField(lines, ["SEO title", "SEO Title", "Title tag"]),
    metaDescription: extractFirstField(lines, ["Meta description", "Meta Description", "Description"]),
    intro: extractIntro(lines),
    coverPathHint: options?.coverPathHint,
    sectionHeadings: extractSectionHeadings(lines),
    placeCandidates: extractPlaceCandidates(lines),
    relatedGuideTitles: extractRelatedGuideTitles(lines),
    rawSuggestedSlug,
  };
}

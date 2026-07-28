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
  sectionHeadings: string[];
  placeCandidates: GuidePlaceCandidate[];
  relatedGuideTitles: string[];
  rawSuggestedSlug?: string;
};

type GuideHeading = {
  level: number;
  text: string;
};

function normalizeText(value: string) {
  return value.replace(/\r/g, "").trim();
}

function stripMarkdownDecoration(value: string) {
  return value
    .replace(/^#+\s*/, "")
    .replace(/\*\*/g, "")
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

function extractTitle(lines: string[]) {
  for (const line of lines) {
    const normalized = normalizeText(line);
    if (!normalized.startsWith("#")) continue;
    const title = stripMarkdownDecoration(normalized);
    if (title) return title;
  }

  return "Untitled guide";
}

function extractHeadings(lines: string[]) {
  return lines
    .map(normalizeText)
    .map((line) => {
      const match = line.match(/^(#{1,6})\s+/);
      if (!match) return null;

      const text = stripMarkdownDecoration(line);
      if (!text) return null;

      return {
        level: match[1].length,
        text,
      };
    })
    .filter(Boolean) as GuideHeading[];
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
  let seenTitle = false;
  const paragraphs: string[] = [];

  for (const line of lines) {
    const normalized = normalizeText(line);

    if (!seenTitle) {
      if (normalized.startsWith("#")) seenTitle = true;
      continue;
    }

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
  const headings = extractHeadings(lines);
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
  const headings = extractHeadings(lines);
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

    if (/^##\s*\**related guides\**/i.test(normalized)) {
      inRelatedGuides = true;
      continue;
    }

    if (inRelatedGuides && normalized.startsWith("##")) break;
    if (!inRelatedGuides) continue;

    const bulletMatch = normalized.match(/^- (.+)$/);
    if (!bulletMatch) continue;
    titles.push(stripMarkdownDecoration(bulletMatch[1]));
  }

  return titles;
}

export function extractGuideIntake(raw: string, options?: { coverPathHint?: string }): GuideIntake {
  const lines = raw.replace(/\r/g, "").split("\n");
  const title = extractTitle(lines);
  const rawSuggestedSlug = extractField(lines, "Suggested slug");
  const suggestedSlug = rawSuggestedSlug?.replace(/^\/[a-z]{2}\/guide\//i, "").replace(/^\/+/, "");

  return {
    title,
    slug: suggestedSlug ? toKebabCase(suggestedSlug) : toKebabCase(title),
    seoTitle: extractField(lines, "SEO title"),
    metaDescription: extractField(lines, "Meta description"),
    intro: extractIntro(lines),
    coverPathHint: options?.coverPathHint,
    sectionHeadings: extractSectionHeadings(lines),
    placeCandidates: extractPlaceCandidates(lines),
    relatedGuideTitles: extractRelatedGuideTitles(lines),
    rawSuggestedSlug,
  };
}

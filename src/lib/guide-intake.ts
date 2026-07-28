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
  return lines
    .map(normalizeText)
    .filter((line) => /^##(?!#)\s/.test(line))
    .map(stripMarkdownDecoration)
    .filter(Boolean);
}

function extractPlaceCandidates(lines: string[]) {
  const candidates: GuidePlaceCandidate[] = [];
  let currentSection: string | undefined;

  for (const line of lines) {
    const normalized = normalizeText(line);
    if (!normalized) continue;

    if (normalized.startsWith("###")) {
      const name = stripMarkdownDecoration(normalized);
      if (name) candidates.push({ name, section: currentSection });
      continue;
    }

    if (/^##(?!#)\s/.test(normalized)) {
      currentSection = stripMarkdownDecoration(normalized);
      continue;
    }

    const bulletMatch = normalized.match(/^- (.+)$/);
    if (bulletMatch && currentSection?.toLowerCase().includes("related guide")) continue;
  }

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

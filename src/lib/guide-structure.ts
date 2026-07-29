import type { GuideIntake } from "@/lib/guide-intake";

export type GuideStructuredPlaceCard = {
  draftName: string;
  bodyParagraphs: string[];
};

export type GuideStructuredSectionKind = "place-group" | "practical" | "related-guides";

export type GuideStructuredSection = {
  heading: string;
  kind: GuideStructuredSectionKind;
  bodyParagraphs: string[];
  relatedPlaceDraftNames: string[];
  placeCards: GuideStructuredPlaceCard[];
};

export type GuideStructure = {
  slug: string;
  title: string;
  introParagraphs: string[];
  sections: GuideStructuredSection[];
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

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’`]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function toParagraphs(lines: string[]) {
  const paragraphs: string[] = [];
  let buffer: string[] = [];

  const flush = () => {
    if (!buffer.length) return;
    const paragraph = buffer.join(" ").replace(/\s+/g, " ").trim();
    if (paragraph) paragraphs.push(paragraph);
    buffer = [];
  };

  for (const rawLine of lines) {
    const line = normalizeText(rawLine);
    if (!line) {
      flush();
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      flush();
      const item = stripMarkdownDecoration(line.replace(/^[-*]\s+/, ""));
      if (item) paragraphs.push(item);
      continue;
    }

    buffer.push(stripMarkdownDecoration(line));
  }

  flush();
  return paragraphs;
}

function firstTitle(lines: string[]) {
  for (const line of lines) {
    const normalized = normalizeText(line);
    if (!normalized.startsWith("#")) continue;
    const text = stripMarkdownDecoration(normalized);
    if (text) return text;
  }

  return "Untitled guide";
}

function collectIntroParagraphs(lines: string[]) {
  let seenTitle = false;
  const introLines: string[] = [];

  for (const rawLine of lines) {
    const line = normalizeText(rawLine);

    if (!seenTitle) {
      if (line.startsWith("#")) seenTitle = true;
      continue;
    }

    if (line.startsWith("##")) break;
    if (/^(SEO title|Meta description|Suggested slug|Cover image)/i.test(line)) continue;

    introLines.push(rawLine);
  }

  return toParagraphs(introLines);
}

function isRelatedGuidesHeading(heading: string) {
  return normalize(heading) === "related guides";
}

function inferSectionKind(section: GuideStructuredSection): GuideStructuredSectionKind {
  if (isRelatedGuidesHeading(section.heading)) return "related-guides";
  if (section.placeCards.length) return "place-group";
  return "practical";
}

export function extractGuideStructure(raw: string, intake: GuideIntake): GuideStructure {
  const lines = raw.replace(/\r/g, "").split("\n");
  const title = firstTitle(lines);
  const candidateByName = new Map(intake.placeCandidates.map((candidate) => [normalize(candidate.name), candidate]));

  const sections = new Map<string, GuideStructuredSection>();
  for (const heading of intake.sectionHeadings) {
    sections.set(heading, {
      heading,
      kind: "practical",
      bodyParagraphs: [],
      relatedPlaceDraftNames: [],
      placeCards: [],
    });
  }

  let currentSectionHeading: string | null = null;
  let currentPlaceCard: GuideStructuredPlaceCard | null = null;
  let directLines: string[] = [];
  let cardLines: string[] = [];

  const flushCard = () => {
    if (!currentSectionHeading || !currentPlaceCard) {
      cardLines = [];
      currentPlaceCard = null;
      return;
    }

    const section = sections.get(currentSectionHeading);
    if (section) {
      currentPlaceCard.bodyParagraphs = toParagraphs(cardLines);
      section.placeCards.push(currentPlaceCard);
      if (!section.relatedPlaceDraftNames.includes(currentPlaceCard.draftName)) {
        section.relatedPlaceDraftNames.push(currentPlaceCard.draftName);
      }
    }

    cardLines = [];
    currentPlaceCard = null;
  };

  const flushSectionBody = () => {
    if (!currentSectionHeading) {
      directLines = [];
      return;
    }

    const section = sections.get(currentSectionHeading);
    if (section) {
      section.bodyParagraphs.push(...toParagraphs(directLines));
    }
    directLines = [];
  };

  for (const rawLine of lines) {
    const line = normalizeText(rawLine);
    if (!line) {
      if (currentPlaceCard) cardLines.push(rawLine);
      else if (currentSectionHeading) directLines.push(rawLine);
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const headingText = stripMarkdownDecoration(line);

      if (level === 2) {
        flushCard();
        flushSectionBody();
        currentSectionHeading = sections.has(headingText) ? headingText : null;
        continue;
      }

      if (level === 3 && currentSectionHeading) {
        flushCard();
        flushSectionBody();
        const candidate = candidateByName.get(normalize(headingText));
        if (candidate?.section && normalize(candidate.section) === normalize(currentSectionHeading)) {
          currentPlaceCard = { draftName: candidate.name, bodyParagraphs: [] };
          continue;
        }
      }

      continue;
    }

    if (/^(SEO title|Meta description|Suggested slug|Cover image)/i.test(line)) continue;
    if (!currentSectionHeading) continue;

    if (currentPlaceCard) cardLines.push(rawLine);
    else directLines.push(rawLine);
  }

  flushCard();
  flushSectionBody();

  const structuredSections = intake.sectionHeadings
    .map((heading) => sections.get(heading))
    .filter((section): section is GuideStructuredSection => Boolean(section))
    .map((section) => {
      section.kind = inferSectionKind(section);
      return section;
    })
    .filter((section) => section.kind !== "related-guides");

  return {
    slug: intake.slug,
    title,
    introParagraphs: collectIntroParagraphs(lines),
    sections: structuredSections,
  };
}

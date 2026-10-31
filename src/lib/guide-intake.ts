export type GuidePlaceCandidate = {
  name: string;
  section?: string;
};

export type GuideUtilityBlockHint = {
  type: "marineConditions" | "airportLiveBoard" | "localRadio";
  section?: string;
  providerHints?: string[];
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
  utilityBlockHints?: GuideUtilityBlockHint[];
  relatedGuideTitles: string[];
  rawSuggestedSlug?: string;
};

const ABSOLUTE_IMAGE_PATH_RE = /(\/(?:Users|Volumes)\/[^\s"')]+?\.(?:png|jpe?g|webp|avif))/i;

type GuideHeading = {
  level: number;
  text: string;
  lineIndex: number;
};

function normalizeText(value: string) {
  return value.replace(/\r/g, "").trim();
}

// Word plain-text exports lose heading styles. Only infer a title when an
// explicit SEO field immediately follows it; leave unrecognised drafts intact.
export function normalizePlainTextGuide(raw: string): string {
  const lines = raw.replace(/\r/g, "").split("\n");
  if (lines.some((line) => /^\s*#{1,6}\s+/.test(line))) return raw;
  const first = lines.findIndex((line) => line.trim());
  if (first < 0 || !lines[first + 1]?.trim().match(/^(?:SEO title|Meta title|Title tag)\s*:/i)) return raw;
  lines[first] = `# ${lines[first].trim()}`;
  for (let index = first + 2; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (/^\d{1,2}\.\s+[^\n]{3,120}$/.test(line)) lines[index] = `## ${line}`;
  }
  return lines.join("\n");
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

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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
  const pattern = new RegExp(`^${escapeRegExp(label)}\\s*[:\\-]?\\s*(.+)$`, "i");

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const normalized = stripMarkdownDecoration(normalizeText(line).replace(/^[-*]\s*/, ""));
    const match = normalized.match(pattern);
    if (match?.[1]?.trim()) return match[1].trim();

    if (normalized.toLowerCase() !== label.toLowerCase()) continue;
    for (let next = index + 1; next < lines.length; next += 1) {
      const value = stripMarkdownDecoration(normalizeText(lines[next]));
      if (value) return value;
    }
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

export function splitGuideDraftIntoPreambleAndBody(lines: string[]) {
  const titleLineIndex = findPrimaryTitleLineIndex(lines);
  if (titleLineIndex === -1) {
    return {
      preambleLines: lines,
      bodyLines: lines,
    };
  }

  return {
    preambleLines: lines.slice(0, titleLineIndex),
    bodyLines: lines.slice(titleLineIndex),
  };
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

function isGuideFieldLine(value: string) {
  const normalized = stripMarkdownDecoration(normalizeText(value).replace(/^[-*]\s*/, ""));
  return /^(SEO title|SEO Title|Meta title|Meta Title|Title tag|Meta description|Meta Description|Description|Suggested slug|Suggested URL|Guide slug|Canonical slug|URL slug|Cover image|Category|Best for|Duration|Recommended duration|Season covered|Programme last checked|Last researched|Last transport and access check)\s*[:\-]/i.test(normalized);
}

function isWidgetSectionHeading(text: string) {
  return /\b(widget|widgets|live board|live boards|radio streams?|listen live|weather tools?|sea tools?)\b/i.test(text);
}

function isDividerLine(text: string) {
  return /^[-_*]{3,}$/.test(text.trim());
}

function inferUtilityBlockType(sectionText: string, fullText: string): GuideUtilityBlockHint["type"] | null {
  const corpus = `${sectionText} ${fullText}`;

  if (
    /\b(windy|windfinder|surf-forecast|surf forecast|meteoblue|openweather|open-meteo|sea temperature|marine)\b/i.test(corpus) ||
    /\b(paddle|kayak|snorkel|snorkelling|sailing|wind sports|water sports)\b/i.test(corpus)
  ) {
    return "marineConditions";
  }

  if (/\b(airport|flight|arrivals|departures|live board|boarding)\b/i.test(corpus)) {
    return "airportLiveBoard";
  }

  if (/\b(radio|fm|stream|listen live)\b/i.test(corpus)) {
    return "localRadio";
  }

  return null;
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
  const explicitTitle = extractFirstField(lines, ["Title"]);
  if (explicitTitle) return explicitTitle;

  const titleLineIndex = findPrimaryTitleLineIndex(lines);
  if (titleLineIndex !== -1) {
    const title = normalizeHeadingText(normalizeText(lines[titleLineIndex]));
    if (title) return title;
  }

  return "Untitled guide";
}

function extractExplicitGuideSlug(lines: string[]) {
  const directField = extractFirstField(lines, ["Suggested slug", "Suggested URL", "Guide slug", "Canonical slug", "URL slug", "Slug"]);
  if (directField) return directField;

  for (const line of lines) {
    const normalized = stripMarkdownDecoration(normalizeText(line));
    const guidePathMatch = normalized.match(/\/[a-z]{2}\/guide\/([a-z0-9-]+)/i);
    if (guidePathMatch?.[1]) return guidePathMatch[1];
  }

  return undefined;
}

function extractCoverPathHint(lines: string[]) {
  for (const line of lines) {
    const normalized = normalizeText(line);
    if (!normalized) continue;
    if (!/cover|oblozhk|обложк|couverture|copertina/i.test(normalized)) continue;
    const match = normalized.match(ABSOLUTE_IMAGE_PATH_RE);
    if (match?.[1]) return match[1];
  }

  for (const line of lines) {
    const normalized = normalizeText(line);
    if (!normalized) continue;
    const match = normalized.match(ABSOLUTE_IMAGE_PATH_RE);
    if (match?.[1]) return match[1];
  }

  return undefined;
}

function isSuppressedHeading(text: string) {
  return /^our recommendations$/i.test(text) || /^recommendations$/i.test(text);
}

function isBroadLocalityHeading(text: string) {
  return /^(menton|monaco|nice|sanremo|ventimiglia|bordighera|beausoleil|roquebrune|cap martin|italy|france|french riviera|italian riviera)$/i.test(text.trim());
}

function isEditorialPlaceHeading(text: string) {
  if (/^(?:regular workshops|languages and age|practical details|what can you (?:make|learn)|what will you (?:make|do)|what do you take home|for (?:couples|families(?: with .+)?|food lovers|a rainy day|a two- to four-week stay))\??$/i.test(text)) return true;
  if (/^(?:(?:current )?access|what to look for|other (?:former hotels|historic villas)|the story (?:of|behind) .+|a race to .+|the (?:easy central|complete architectural) walk|the architecture and gardens experience|(?:generally|conditionally) accessible|normally private|published information for \d{4})$/i.test(text)) return true;
  if (/^(?:spring|summer|autumn|winter|admission and opening|visiting arrangements|walking difficulty|seasonal transport|discover local food|explore the historic village|a simple rule|a realistic .+ day|a critical .+ warning|road conditions can change quickly)$/i.test(text)) return true;
  if (/^(?:plan [a-z]:|option [a-z]:|if (?:your|road|a museum|you)|getting to (?:the|a) )/i.test(text)) return true;
  return /\?$/.test(text) || /^(?:our quick recommendations|best (?:for|plan)|how to |where to |getting (?:there|home)|hours and |children's highlights|walking considerations|travel considerations|evening [a-z]:|the (?:nice|monaco) festive afternoon|engineering works|christmas eve:|christmas day:|new year's eve:|frequently asked questions|official sources|final thoughts)/i.test(text);
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

function sitsUnderWidgetAncestor(headings: GuideHeading[], index: number) {
  let maxLevel = headings[index].level;
  for (let cursor = index - 1; cursor >= 0; cursor -= 1) {
    const heading = headings[cursor];
    if (heading.level < maxLevel) {
      if (isWidgetSectionHeading(heading.text)) return true;
      maxLevel = heading.level;
    }
  }
  return false;
}

function extractIntro(lines: string[]) {
  const titleLineIndex = findPrimaryTitleLineIndex(lines);
  if (titleLineIndex === -1) return undefined;
  const paragraphs: string[] = [];
  const title = extractTitle(lines);
  let skippedDuplicateTitle = false;

  for (let index = titleLineIndex + 1; index < lines.length; index += 1) {
    const line = lines[index];
    const normalized = normalizeText(line);

    if (!normalized) {
      if (paragraphs.length) break;
      continue;
    }

    if (isDividerLine(normalized)) continue;
    if (normalized.startsWith("#")) {
      const headingText = normalizeHeadingText(normalized);
      if (!skippedDuplicateTitle && headingText === title) {
        skippedDuplicateTitle = true;
        continue;
      }
      break;
    }
    if (normalized.startsWith("##")) break;
    if (isGuideFieldLine(normalized)) continue;

    paragraphs.push(stripMarkdownDecoration(normalized));
  }

  return paragraphs.length ? paragraphs.join(" ") : undefined;
}

function extractSectionHeadings(lines: string[]) {
  const allHeadings = extractHeadings(lines);
  const headings = allHeadings.slice(findPrimaryHeadingOffset(allHeadings));
  const title = headings[0]?.text;
  const placeCandidateIndexes = new Set<number>();
  const utilitySectionIndexes = new Set<number>();

  headings.forEach((heading, index) => {
    if (index === 0) return;
    if (isWidgetSectionHeading(heading.text)) utilitySectionIndexes.add(index);
  });

  headings.forEach((heading, index) => {
    if (index === 0 || isSuppressedHeading(heading.text)) return;
    if (utilitySectionIndexes.has(index)) return;
    if (heading.text === title) return;

    if (heading.level === 2) {
      const ancestor = findNearestAncestor(headings, index, heading.level);
      if (ancestor && ancestor.level === 1 && ancestor.text !== title && !hasDeeperDescendants(headings, index) && !isWidgetSectionHeading(ancestor.text)) {
        placeCandidateIndexes.add(index);
      }
      return;
    }

    if (heading.level === 3) {
      const ancestor = findNearestAncestor(headings, index, heading.level);
      if (ancestor && ancestor.level === 2 && !isSuppressedHeading(ancestor.text) && !isWidgetSectionHeading(ancestor.text)) {
        placeCandidateIndexes.add(index);
      }
    }
  });

  return headings
    .filter(
      (heading, index) =>
        index !== 0 &&
        heading.text !== title &&
        !utilitySectionIndexes.has(index) &&
        !isWidgetSectionHeading(heading.text) &&
        !sitsUnderWidgetAncestor(headings, index) &&
        !placeCandidateIndexes.has(index) &&
        !isSuppressedHeading(heading.text) &&
        !sitsUnderSuppressedAncestor(headings, index),
    )
    .map((heading) => heading.text);
}

function extractPlaceCandidates(lines: string[]) {
  const candidates: GuidePlaceCandidate[] = [];
  const allHeadings = extractHeadings(lines);
  const headings = allHeadings.slice(findPrimaryHeadingOffset(allHeadings));
  const title = headings[0]?.text;
  const venueSections=new Set<number>();
  const hasAddress=(heading:GuideHeading)=>lines.slice(heading.lineIndex+1).find(line=>line.trim())?.trim().match(/^(?:address|locations?):\s*\S/i);

  headings.forEach((heading, index) => {
    if (index === 0 || isSuppressedHeading(heading.text)) return;
    if (isEditorialPlaceHeading(heading.text)) return;
    if (heading.text === title) return;
    if (sitsUnderWidgetAncestor(headings, index) || isWidgetSectionHeading(heading.text)) return;

    if (heading.level === 2) {
      if(hasAddress(heading)){
        const name=heading.text.replace(/^\d+[.)]\s*/,"").replace(/^painting and drawing with\s+/i,"").split(/:\s/)[0];
        candidates.push({name,section:heading.text});venueSections.add(index);return;
      }
      const ancestor = findNearestAncestor(headings, index, heading.level);
      if (
        ancestor &&
        ancestor.level === 1 &&
        ancestor.text !== title &&
        !hasDeeperDescendants(headings, index) &&
        !isWidgetSectionHeading(ancestor.text) &&
        !isWidgetSectionHeading(heading.text) &&
        !isBroadLocalityHeading(heading.text)
      ) {
        candidates.push({ name: heading.text.replace(/^Visit (?:the )?/i, ""), section: ancestor.text });
      }
      return;
    }

    if (heading.level === 3) {
      const ancestor = findNearestAncestor(headings, index, heading.level);
      if(ancestor&&venueSections.has(headings.indexOf(ancestor)))return;
      if (ancestor && ancestor.level === 2 && !isSuppressedHeading(ancestor.text) && !isWidgetSectionHeading(ancestor.text)) {
        candidates.push({ name: heading.text.replace(/^Visit (?:the )?/i, ""), section: ancestor.text });
      }
    }
  });

  return candidates;
}

function extractUtilityBlockHints(lines: string[]) {
  const hints: GuideUtilityBlockHint[] = [];
  const allHeadings = extractHeadings(lines);
  const headings = allHeadings.slice(findPrimaryHeadingOffset(allHeadings));

  for (let index = 0; index < headings.length; index += 1) {
    const heading = headings[index];
    if (index === 0 || !isWidgetSectionHeading(heading.text) || sitsUnderWidgetAncestor(headings, index)) continue;

    let nextLineIndex = lines.length;
    for (let cursor = index + 1; cursor < headings.length; cursor += 1) {
      if (headings[cursor].level <= heading.level) {
        nextLineIndex = headings[cursor].lineIndex;
        break;
      }
    }
    const sectionLines = lines.slice(heading.lineIndex + 1, nextLineIndex);
    const sectionText = sectionLines.join("\n");
    const type = inferUtilityBlockType(heading.text, sectionText);
    if (!type) continue;

    const providerHints = Array.from(
      new Set(
        ["Windy", "Windfinder", "Surf-Forecast", "Meteoblue", "OpenWeather", "Open-Meteo"]
          .filter((provider) => new RegExp(provider.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i").test(sectionText)),
      ),
    );

    hints.push({
      type,
      section: heading.text,
      providerHints,
    });
  }

  return hints;
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
  const lines = normalizePlainTextGuide(raw).replace(/\r/g, "").split("\n");
  const { preambleLines, bodyLines } = splitGuideDraftIntoPreambleAndBody(lines);
  const title = extractTitle(lines);
  const metadataLines = [...preambleLines, ...bodyLines];
  const utilityBlockHints = extractUtilityBlockHints(bodyLines);
  const rawSuggestedSlug = extractExplicitGuideSlug(metadataLines);
  const suggestedSlug = rawSuggestedSlug?.replace(/^\/[a-z]{2}\/guide\//i, "").replace(/^\/+/, "");

  return {
    title,
    slug: suggestedSlug ? toKebabCase(suggestedSlug) : toKebabCase(title),
    seoTitle: extractFirstField(metadataLines, ["SEO title", "SEO Title", "Title tag", "Title"]),
    metaDescription: extractFirstField(metadataLines, ["Meta description", "Meta Description", "Description"]),
    intro: extractIntro(bodyLines),
    coverPathHint: options?.coverPathHint ?? extractCoverPathHint(preambleLines),
    categoryHint: /^seasonal guides?\b/i.test(extractFirstField(metadataLines, ["Category"]) ?? "") ? "practical" : undefined,
    sectionHeadings: extractSectionHeadings(bodyLines),
    placeCandidates: extractPlaceCandidates(bodyLines),
    utilityBlockHints,
    relatedGuideTitles: extractRelatedGuideTitles(bodyLines),
    rawSuggestedSlug,
  };
}

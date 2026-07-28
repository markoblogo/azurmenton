import type { GuideIntake } from "@/lib/guide-intake";

export type GuideReference = {
  slug: string;
  title: string;
};

export type PlaceReference = {
  id: string;
  name: string;
};

export type GuideCheckIssue = {
  severity: "error" | "warning";
  code: string;
  message: string;
};

export type GuideMatchSuggestion = {
  input: string;
  matches: { slug: string; title: string; score: number }[];
};

export type PlaceMatchSuggestion = {
  input: string;
  matches: { id: string; name: string; score: number }[];
};

export type GuideCheckReport = {
  slug: string;
  ok: boolean;
  errors: GuideCheckIssue[];
  warnings: GuideCheckIssue[];
  relatedGuideSuggestions: GuideMatchSuggestion[];
  placeSuggestions: PlaceMatchSuggestion[];
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’`]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function tokenize(value: string) {
  return normalize(value).split(/\s+/).filter(Boolean);
}

function isKebabCase(value: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

function tokenScore(input: string, candidate: string) {
  const inputTokens = new Set(tokenize(input));
  const candidateTokens = new Set(tokenize(candidate));
  if (!inputTokens.size || !candidateTokens.size) return 0;

  let overlap = 0;
  for (const token of inputTokens) {
    if (candidateTokens.has(token)) overlap += 1;
  }

  return overlap / Math.max(inputTokens.size, candidateTokens.size);
}

function topGuideMatches(input: string, references: GuideReference[]) {
  return references
    .map((reference) => ({ ...reference, score: tokenScore(input, reference.title) }))
    .filter((reference) => reference.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

function topPlaceMatches(input: string, references: PlaceReference[]) {
  return references
    .map((reference) => ({ ...reference, score: tokenScore(input, reference.name) }))
    .filter((reference) => reference.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

export function buildGuideCheckReport(
  intake: GuideIntake,
  guides: GuideReference[],
  places: PlaceReference[],
  options?: { coverExists?: boolean },
): GuideCheckReport {
  const errors: GuideCheckIssue[] = [];
  const warnings: GuideCheckIssue[] = [];

  if (!intake.title.trim()) errors.push({ severity: "error", code: "missing-title", message: "Draft title is missing." });
  if (!intake.slug.trim()) errors.push({ severity: "error", code: "missing-slug", message: "Suggested slug is missing." });
  if (intake.slug && !isKebabCase(intake.slug)) errors.push({ severity: "error", code: "invalid-slug", message: `Slug is not kebab-case: ${intake.slug}` });
  if (!intake.seoTitle?.trim()) errors.push({ severity: "error", code: "missing-seo-title", message: "SEO title is missing." });
  if (!intake.metaDescription?.trim()) errors.push({ severity: "error", code: "missing-meta-description", message: "Meta description is missing." });
  if (intake.coverPathHint && options?.coverExists === false) {
    errors.push({ severity: "error", code: "missing-cover-file", message: `Cover path does not exist: ${intake.coverPathHint}` });
  }

  const existingGuide = guides.find((guide) => guide.slug === intake.slug);
  if (existingGuide) {
    warnings.push({ severity: "warning", code: "existing-guide-slug", message: `Guide slug already exists in content: ${intake.slug}` });
  }

  if (!intake.sectionHeadings.length) {
    warnings.push({ severity: "warning", code: "no-sections", message: "No section headings were detected in the draft." });
  }

  if (!intake.placeCandidates.length) {
    warnings.push({ severity: "warning", code: "no-place-candidates", message: "No place candidates were detected in the draft." });
  }

  const duplicatePlaces = new Set<string>();
  const seenPlaces = new Set<string>();
  for (const candidate of intake.placeCandidates) {
    const key = normalize(candidate.name);
    if (seenPlaces.has(key)) duplicatePlaces.add(candidate.name);
    seenPlaces.add(key);
  }
  for (const duplicate of duplicatePlaces) {
    warnings.push({ severity: "warning", code: "duplicate-place-candidate", message: `Duplicate place candidate in draft: ${duplicate}` });
  }

  const relatedGuideSuggestions = intake.relatedGuideTitles.map((title) => ({
    input: title,
    matches: topGuideMatches(title, guides),
  }));

  for (const suggestion of relatedGuideSuggestions) {
    if (!suggestion.matches.length) {
      warnings.push({ severity: "warning", code: "unresolved-related-guide", message: `No related guide match found for: ${suggestion.input}` });
    }
  }

  const placeSuggestions = intake.placeCandidates.map((candidate) => ({
    input: candidate.name,
    matches: topPlaceMatches(candidate.name, places),
  }));

  return {
    slug: intake.slug,
    ok: errors.length === 0,
    errors,
    warnings,
    relatedGuideSuggestions,
    placeSuggestions,
  };
}


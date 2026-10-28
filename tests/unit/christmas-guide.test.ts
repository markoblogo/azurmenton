import { describe, expect, it } from 'vitest';
import { christmasGuide } from '../../src/content/christmas-guide';
import { getGuideArticle, getLatestLandingGuideSlug } from '../../src/content/guide';
import { places } from '../../src/content/places';

describe('Christmas guide publication', () => {
  it('retains the full English structure and all four comparison tables in each locale', () => {
    expect(christmasGuide.sections).toHaveLength(20);
    for (const locale of ['en', 'fr', 'it', 'uk'] as const) {
      const sections = christmasGuide.sections;
      expect(sections.filter(section => /^\d+\./.test(section.heading[locale]))).toHaveLength(16);
      expect(sections.flatMap(section => section.tables?.[locale] ?? [])).toHaveLength(4);
      for (const section of sections) {
        expect(section.body.map(body => body[locale]).join(' ').length).toBeGreaterThan(20);
        if (locale === 'uk') expect(section.heading.uk).toMatch(/[А-Яа-яІіЇїЄє]/);
      }
    }
    expect(christmasGuide.sections.map(section => section.body.map(body => body.en).join(' ')).join(' ')).toContain('Engineering works through 11 December 2026');
  });
  it('has a cover, apartment recommendations, sources, valid place cards and latest-slot eligibility', () => {
    expect(getGuideArticle(christmasGuide.slug)).toBe(christmasGuide);
    expect(getLatestLandingGuideSlug()).toBe(christmasGuide.slug);
    expect(christmasGuide.coverImage).toContain(christmasGuide.slug);
    expect(christmasGuide.relatedApartments).toHaveLength(3);
    for (const section of christmasGuide.sections) for (const id of section.relatedPlaceIds ?? []) {
      expect(places.some(place => place.id === id && place.relatedArticleIds?.includes(christmasGuide.slug)), id).toBe(true);
    }
    expect(christmasGuide.sections.at(-1)?.officialLinks?.length).toBeGreaterThan(5);
  });
});

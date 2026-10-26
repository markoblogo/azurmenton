import { describe, expect, it } from "vitest";
import { eventOccurrencePages } from "../../src/content/event-occurrences";
import { rivieraEvents } from "../../src/content/riviera-events";

describe("confirmed occurrence copy", () => {
  it("does not present confirmed events as awaiting dates", () => {
    for (const page of eventOccurrencePages) {
      const event = rivieraEvents.find((item) => item.occurrenceSlug === page.slug);
      if (event?.dateStatus !== "confirmed") continue;
      for (const field of [page.metaDescription, page.summary, page.dateNote, page.bookingAdvice]) {
        expect(field.en, page.slug).not.toMatch(/dates (?:are )?(?:still )?(?:to be confirmed|not confirmed)|wait for official dates/i);
      }
    }
  });

  it("keeps the Lemon Festival dates and localized copy aligned", () => {
    const page = eventOccurrencePages.find((item) => item.slug === "fete-du-citron-2027")!;
    for (const locale of ["en", "fr", "it", "uk"] as const) {
      expect(page.dateNote[locale]).toContain("2027");
      expect(page.dateNote[locale]).toContain("13");
      expect(page.dateNote[locale]).toContain("28");
    }
    expect(page.summary.uk).toMatch(/[а-яіїєґ]/i);
  });
});

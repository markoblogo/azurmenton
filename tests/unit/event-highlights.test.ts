import { describe, expect, it } from "vitest";
import { getRivieraEvent } from "../../src/content/riviera-events";
import { isSportsPrestigeHighlight } from "../../src/lib/event-highlights";
import { getEventDateStatus } from "../../src/lib/events";

describe("sports and prestige highlights", () => {
  it("includes the current Yacht Show edition after excluding its archived year", () => {
    const archive = getRivieraEvent("monaco-yacht-show-2026")!;
    const current = getRivieraEvent("monaco-yacht-show")!;
    const selected = [archive, current]
      .filter((event) => getEventDateStatus(event, new Date("2026-10-13T12:00:00Z")) !== "past")
      .filter(isSportsPrestigeHighlight);
    expect(selected.map((event) => event.id)).toEqual(["monaco-yacht-show-2027"]);
  });

  it("continues to select the same series when a future occurrence changes ID", () => {
    const current = getRivieraEvent("monaco-yacht-show")!;
    const future = { ...current, id: "monaco-yacht-show-2028" };
    expect(isSportsPrestigeHighlight(future)).toBe(true);
  });

  it("preserves other curated sports series and excludes unrelated family events", () => {
    for (const slug of ["monaco-grand-prix", "monaco-e-prix", "rolex-monte-carlo-masters"]) {
      expect(isSportsPrestigeHighlight(getRivieraEvent(slug)!)).toBe(true);
    }
    expect(isSportsPrestigeHighlight(getRivieraEvent("menton-lemon-festival")!)).toBe(false);
  });
});

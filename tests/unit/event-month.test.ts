import { expect, it } from "vitest";
import { getEventDetail } from "@/content/riviera-events";
import { monthEntries } from "@/lib/event-month";
it("shows confirmed dates with exclusive ends and canonical links", () => {
  const event = getEventDetail("stand-up-monaco-2026-11-09")!;
  const result = monthEntries([event, { ...event, dateStatus: "dates_pending" }, { ...event, dateStatusConflict: true }], "uk");
  expect(result).toHaveLength(1);
  expect(result[0].end).toBe("2026-11-10");
  expect(result[0].url).toBe(`/uk/events/${event.slug}`);
  expect(monthEntries([{ ...event, endDate: "2026-10-01" }], "en")).toEqual([]);
});

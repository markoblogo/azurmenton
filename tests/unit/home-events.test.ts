import { describe, expect, it } from "vitest";
import { getHomeEvents } from "@/lib/home-events";
import { rivieraEvents, type RivieraEvent } from "@/content/riviera-events";

describe("homepage event selection", () => {
  const base = rivieraEvents.find(event => event.dateStatus === "confirmed" && event.detailPage && event.sourceUrl)!;
  const event = (id: string, startDate: string, options: Partial<RivieraEvent> = {}): RivieraEvent => ({ ...base, id, slug: id, startDate, endDate: startDate, dateStatus: "confirmed", dateStatusConflict: false, sourceStatus: "verified", detailPage: true, ...options });

  it("shows current and nearest confirmed sourced detail pages, excluding past and uncertain events", () => {
    const items = [event("past", "2026-10-30"), event("later", "2026-11-08"), event("current", "2026-10-29", { endDate: "2026-11-02" }), event("next", "2026-11-02"), event("pending", "2026-11-01", { dateStatus: "dates_pending" }), event("conflict", "2026-11-01", { dateStatusConflict: true }), event("unsourced", "2026-11-01", { sourceUrl: undefined }), event("no-page", "2026-11-01", { detailPage: false })];
    expect(getHomeEvents(items, new Date("2026-10-31T12:00:00Z")).map(item => item.id)).toEqual(["current", "next", "later"]);
    expect(getHomeEvents(items, new Date("2026-11-09T12:00:00Z"))).toEqual([]);
  });
  it("uses the local Paris date at midnight", () => {
    const items = [event("last-day", "2026-10-31")];
    expect(getHomeEvents(items, new Date("2026-10-31T22:59:00Z"))).toHaveLength(1);
    expect(getHomeEvents(items, new Date("2026-10-31T23:00:00Z"))).toHaveLength(0);
  });
});

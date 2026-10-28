import type { RivieraEvent } from "@/content/riviera-events";
import { toParisDateKey } from "@/lib/events";

export function getHomeEvents(events: RivieraEvent[], now: Date, limit = 3): RivieraEvent[] {
  const today = toParisDateKey(now);
  return events.filter(event => event.detailPage && event.dateStatus === "confirmed" && !event.dateStatusConflict && event.sourceStatus === "verified" && event.sourceUrl && event.startDate && (event.endDate ?? event.startDate) >= today)
    .sort((a, b) => {
      const aDate = a.startDate! < today ? today : a.startDate!;
      const bDate = b.startDate! < today ? today : b.startDate!;
      return aDate.localeCompare(bDate) || (a.endDate ?? a.startDate!).localeCompare(b.endDate ?? b.startDate!) || a.id.localeCompare(b.id);
    }).slice(0, Math.max(0, limit));
}

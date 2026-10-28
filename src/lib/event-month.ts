import { DateTime } from "luxon";
import { getEventTitle, type RivieraEvent } from "@/content/riviera-events";
import type { Locale } from "@/i18n/locales";
export function monthEntries(events: RivieraEvent[], locale: Locale) {
  return events.flatMap(event => {
    if (event.dateStatus !== "confirmed" || event.dateStatusConflict || event.sourceStatus !== "verified" || !event.detailPage) return [];
    const start = DateTime.fromISO(event.startDate ?? "", { zone: "Europe/Paris" });
    const end = DateTime.fromISO(event.endDate ?? event.startDate ?? "", { zone: "Europe/Paris" });
    if (!start.isValid || !end.isValid || end < start) return [];
    return [{ id: event.id, title: getEventTitle(event, locale), start: start.toISODate()!, end: end.plus({ days: 1 }).toISODate()!, allDay: true, url: `/${locale}/events/${event.occurrenceSlug ?? event.slug}` }];
  });
}

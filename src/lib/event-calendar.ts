import { DateTime } from "luxon";
import { createEvent, type DateArray, type EventAttributes } from "ics";
import { getEventTitle, type RivieraEvent } from "@/content/riviera-events";
import type { Locale } from "@/i18n/locales";

export const calendarCopy = {
  en: { add: "Add to calendar", download: "Apple / Outlook (.ics)", note: "Saved copy only: changes and cancellations do not update automatically.", dateOnly: "Dates only; check the official programme for session times." },
  fr: { add: "Ajouter au calendrier", download: "Apple / Outlook (.ics)", note: "Copie enregistrée : les changements et annulations ne sont pas actualisés automatiquement.", dateOnly: "Dates uniquement ; consultez le programme officiel pour les horaires." },
  it: { add: "Aggiungi al calendario", download: "Apple / Outlook (.ics)", note: "Copia salvata: modifiche e annullamenti non si aggiornano automaticamente.", dateOnly: "Solo date; consulta il programma ufficiale per gli orari." },
  uk: { add: "Додати до календаря", download: "Apple / Outlook (.ics)", note: "Збережена копія: зміни та скасування не оновлюються автоматично.", dateOnly: "Лише дати; час сеансів перевіряйте в офіційній програмі." },
};

function date(value: string | undefined) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const parsed = DateTime.fromISO(value, { zone: "Europe/Paris" });
  return parsed.isValid && parsed.toISODate() === value ? parsed : null;
}

function wallTime(day: DateTime, time: string, zone: string) {
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time) || zone !== "Europe/Paris") return null;
  const value = DateTime.fromISO(`${day.toISODate()}T${time}`, { zone });
  // Reject DST gaps and repeated hours rather than silently choosing an instant.
  return value.isValid && value.toFormat("HH:mm") === time && value.getPossibleOffsets().length === 1 ? value : null;
}

export function getCalendarData(event: RivieraEvent, locale: Locale, sessionId?: string) {
  const originalId = event.id;
  if (event.sessions?.length) {
    if (!sessionId || event.sessions.filter(s => s.id === sessionId).length !== 1) return null;
    const session = event.sessions.find(s => s.id === sessionId)!;
    if (!/^[a-zA-Z0-9-]+$/.test(session.id) || !event.startDate || !event.endDate || session.date < event.startDate || (session.endDate ?? session.date) > event.endDate) return null;
    event = { ...event, startDate: session.date, endDate: session.endDate ?? session.date, schedule: session };
  } else if (sessionId) return null;
  if (event.dateStatus !== "confirmed" || event.dateStatusConflict || event.sourceStatus !== "verified" || !event.sourceUrl || !event.detailPage) return null;
  let start = date(event.startDate);
  let end: DateTime | null = date(event.endDate ?? event.startDate);
  if (!start || !end || end < start) return null;
  const timed = Boolean(event.schedule);
  if (event.schedule) {
    if (!event.schedule.sourceUrl || !date(event.schedule.lastVerifiedAt)) return null;
    start = wallTime(start, event.schedule.startTime, event.schedule.timeZone);
    end = event.schedule.endTime ? wallTime(end, event.schedule.endTime, event.schedule.timeZone) : null;
    if (!start || (event.schedule.endTime && (!end || end <= start))) return null;
  } else {
    end = end.plus({ days: 1 }); // Stored date ranges are inclusive; iCalendar DTEND is exclusive.
  }
  const slug = event.occurrenceSlug ?? event.slug;
  const url = `https://azurmenton.com/${locale}/events/${slug}`;
  const copy = calendarCopy[locale];
  const description = [sessionId && `${start.toISODate()} · ${start.toFormat("HH:mm")} · Europe/Paris`, event.shortDescription[locale], event.dateLabelLocalized?.[locale] ?? event.dateLabel, !timed && copy.dateOnly, copy.note, url, event.programmeUrl ?? event.sourceUrl].filter(Boolean).join("\n\n");
  return { slug, sessionId, uid: `${originalId}${sessionId ? `--${sessionId}` : ""}@azurmenton.com`, title: getEventTitle(event, locale), start, end, timed, url, description,
    location: event.venue ? [event.venue.name, event.venue.address].filter(Boolean).join(", ") : event.city ?? event.location };
}

export function googleCalendarUrl(data: NonNullable<ReturnType<typeof getCalendarData>>) {
  const format = (value: DateTime) => data.timed ? value.toUTC().toFormat("yyyyMMdd'T'HHmmss'Z'") : value.toFormat("yyyyMMdd");
  // Google requires both endpoints. Do not manufacture an end for start-only performances.
  if (data.timed && !data.end) return null;
  return `https://calendar.google.com/calendar/render?${new URLSearchParams({ action: "TEMPLATE", text: data.title, dates: `${format(data.start)}/${format(data.end!)}`, details: data.description, location: data.location, ctz: "Europe/Paris" })}`;
}

export function eventCalendarFile(event: RivieraEvent, locale: Locale, sessionId?: string) {
  const data = getCalendarData(event, locale, sessionId);
  if (!data) return null;
  const array = (value: DateTime): DateArray => {
    const d = data.timed ? value.toUTC() : value;
    return data.timed ? [d.year, d.month, d.day, d.hour, d.minute] : [d.year, d.month, d.day];
  };
  const attributes = { uid: data.uid, title: data.title,
    start: array(data.start), ...(data.end ? { end: array(data.end) } : {}),
    startInputType: "utc", startOutputType: "utc", endInputType: "utc", endOutputType: "utc",
    description: data.description, location: data.location, url: data.url, status: "CONFIRMED", busyStatus: "FREE", productId: "Azur Menton" };
  // RFC 5545 permits start-only events; ics runtime supports them but its types require an end/duration.
  const result = createEvent(attributes as EventAttributes);
  if (result.error) throw result.error;
  return result.value ?? null;
}

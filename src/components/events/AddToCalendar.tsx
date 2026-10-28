import type { RivieraEvent } from "@/content/riviera-events";
import type { Locale } from "@/i18n/locales";
import { calendarCopy, getCalendarData, googleCalendarUrl } from "@/lib/event-calendar";

export function AddToCalendar({ event, locale }: { event: RivieraEvent; locale: Locale }) {
  if (event.sessions?.length) {
    const sessions = event.sessions.filter(session => getCalendarData(event, locale, session.id));
    if (!sessions.length) return null;
    return <details className="mt-4 border-t border-[#dfd4c1] pt-3 text-[#173f36]">
      <summary className="min-h-11 cursor-pointer py-2 font-semibold">{calendarCopy[locale].add}</summary>
      <p className="py-2 font-semibold">{{ en: "Choose a performance", fr: "Choisir une séance", it: "Scegli uno spettacolo", uk: "Оберіть сеанс" }[locale]}</p>
      {sessions.map(session => <section key={session.id} aria-label={`${session.date} ${session.startTime}`} className="border-t border-[#dfd4c1] py-2">
        <p className="font-semibold">{new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Paris" }).format(new Date(`${session.date}T12:00:00+01:00`))} · {session.startTime}</p>
        <CalendarLinks event={event} locale={locale} sessionId={session.id} />
      </section>)}
    </details>;
  }
  return <CalendarLinks event={event} locale={locale} />;
}

function CalendarLinks({ event, locale, sessionId }: { event: RivieraEvent; locale: Locale; sessionId?: string }) {
  const data = getCalendarData(event, locale, sessionId);
  if (!data) return null;
  const copy = calendarCopy[locale];
  const google = googleCalendarUrl(data);
  const Wrapper = sessionId ? "div" : "details";
  return <Wrapper className="mt-4 max-w-full border-t border-[#dfd4c1] pt-3 text-[#173f36]">
    {!sessionId ? <summary className="min-h-11 cursor-pointer py-2 font-semibold focus-visible:outline-2">{copy.add}</summary> : null}
    <div className="flex flex-wrap gap-3 py-2">
      {google ? <a href={google} target="_blank" rel="noopener noreferrer" className="min-h-11 border border-[#173f36] px-3 py-2 underline underline-offset-4">Google Calendar</a> : null}
      <a href={`/api/events/${data.slug}/calendar?locale=${locale}${sessionId ? `&session=${encodeURIComponent(sessionId)}` : ""}`} className="min-h-11 border border-[#173f36] px-3 py-2 underline underline-offset-4">{copy.download}</a>
    </div>
    {!data.timed ? <p className="text-sm leading-6">{copy.dateOnly}</p> : <p className="text-sm leading-6">{data.start.toFormat("HH:mm")}{data.end ? `–${data.end.toFormat("HH:mm")}` : ""} · Europe/Paris</p>}
    {event.venue ? <p className="text-sm leading-6">{data.location}</p> : null}
    <p className="mt-1 text-sm leading-6 text-[#5f574c]">{copy.note}</p>
  </Wrapper>;
}

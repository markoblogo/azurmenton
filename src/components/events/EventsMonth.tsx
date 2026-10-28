"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import fr from "@fullcalendar/core/locales/fr";
import it from "@fullcalendar/core/locales/it";
import uk from "@fullcalendar/core/locales/uk";
import { useMemo } from "react";
import type { RivieraEvent } from "@/content/riviera-events";
import type { Locale } from "@/i18n/locales";
import { monthEntries } from "@/lib/event-month";
export default function EventsMonth({ events, locale, initialDate }: { events: RivieraEvent[]; locale: Locale; initialDate: string }) {
  const entries = useMemo(() => monthEntries(events, locale), [events, locale]);
  return <div className="events-month mt-5 min-w-0 overflow-x-auto">
    <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" initialDate={initialDate} locales={[fr, it, uk]} locale={locale} firstDay={1} headerToolbar={{ left: "prev,next", center: "title", right: "today" }} height="auto" fixedWeekCount={false} dayMaxEvents={3} events={entries} eventDidMount={info => { info.el.title = info.event.title; }} displayEventTime={false} />
  </div>;
}

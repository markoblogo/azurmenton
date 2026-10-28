"use client";

import { useEffect, useState, type RefObject } from "react";
import type { Locale } from "@/i18n/locales";
import { parseTrip, TRIP_CHANGED, TRIP_KEY, tripBookingValues, type MyTrip } from "@/lib/my-trip";
import { toParisDateKey } from "@/lib/events";
import { bookingFunnelEvents, trackBookingFunnelEvent } from "@/lib/analytics";

const copy = {
  en: { use: "Use my saved trip", done: "Dates and guest numbers filled in. Review before sending.", unavailable: "Update your trip dates or guest numbers before using them here.", edit: "My trip" },
  fr: { use: "Utiliser mon séjour enregistré", done: "Dates et nombre de voyageurs renseignés. Vérifiez avant l'envoi.", unavailable: "Actualisez les dates ou le nombre de voyageurs avant de les utiliser ici.", edit: "Mon séjour" },
  it: { use: "Usa il mio viaggio salvato", done: "Date e numero di ospiti inseriti. Controlla prima di inviare.", unavailable: "Aggiorna le date o il numero di ospiti prima di usarli qui.", edit: "Il mio viaggio" },
  uk: { use: "Використати збережену поїздку", done: "Дати та кількість гостей заповнено. Перевірте перед надсиланням.", unavailable: "Оновіть дати або кількість гостей перед використанням тут.", edit: "Моя поїздка" },
};

export function TripBookingPrefill({ locale, formRef, onApplied }: { locale: Locale; formRef: RefObject<HTMLFormElement | null>; onApplied: () => void }) {
  const [trip, setTrip] = useState<MyTrip | null>(null);
  const [applied, setApplied] = useState(false);
  useEffect(() => {
    const refresh = () => { try { setTrip(parseTrip(window.localStorage.getItem(TRIP_KEY))); setApplied(false); } catch { setTrip(null); } };
    const storage = (e: StorageEvent) => { if (e.key === TRIP_KEY || e.key === null) refresh(); };
    refresh();
    window.addEventListener("storage", storage);
    window.addEventListener(TRIP_CHANGED, refresh);
    return () => { window.removeEventListener("storage", storage); window.removeEventListener(TRIP_CHANGED, refresh); };
  }, []);
  if (!trip) return null;
  const values = tripBookingValues(trip, toParisDateKey(new Date()));
  const c = copy[locale];
  function apply() {
    if (!values || !formRef.current) return;
    for (const [name, value] of Object.entries(values)) {
      const field = formRef.current.elements.namedItem(name);
      if (field instanceof HTMLInputElement) {
        field.value = value;
        field.dispatchEvent(new Event("input", { bubbles: true }));
        field.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }
    setApplied(true);
    onApplied();
    trackBookingFunnelEvent(bookingFunnelEvents.tripPrefillUsed, { locale });
  }
  return <div className="flex flex-wrap items-center gap-3">
    <button type="button" disabled={!values} onClick={apply} className="min-h-11 border border-[#c6a66a] px-4 py-2 text-base font-semibold text-[#173f36] hover:bg-[#f3ead7] disabled:opacity-50">{c.use}</button>
    <a href={`/${locale}/my-trip`} className="text-sm underline underline-offset-4">{c.edit}</a>
    <p role="status" className="w-full text-sm text-[#5f574c]">{applied ? c.done : !values ? c.unavailable : ""}</p>
  </div>;
}

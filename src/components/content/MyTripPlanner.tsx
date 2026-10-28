"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/locales";
import { emptyTrip, parseTrip, saveTrip, TRIP_KEY, TRIP_CHANGED, tripInterests, type MyTrip } from "@/lib/my-trip";
import { rankTripGuides, tripOverlapsEvent } from "@/lib/trip-recommendations";

const copy = {
  en: { title: "My trip", from: "Arrival", to: "Departure", adults: "Adults", children: "Children", car: "Travelling with a car", interests: "Interests", save: "Save trip", reset: "Clear trip", saved: "Saved on this device", error: "Check your dates and group size, or allow storage on this device.", events: "On your dates", guides: "Ideas for your stay", empty: "No confirmed events match these dates.", booking: "Request availability", favourites: "Favourites" },
  fr: { title: "Mon séjour", from: "Arrivée", to: "Départ", adults: "Adultes", children: "Enfants", car: "Avec une voiture", interests: "Centres d'intérêt", save: "Enregistrer", reset: "Effacer", saved: "Enregistré sur cet appareil", error: "Vérifiez les dates et le nombre de voyageurs, ou autorisez le stockage sur cet appareil.", events: "Pendant votre séjour", guides: "Idées de sorties", empty: "Aucun événement confirmé à ces dates.", booking: "Demander les disponibilités", favourites: "Favoris" },
  it: { title: "Il mio viaggio", from: "Arrivo", to: "Partenza", adults: "Adulti", children: "Bambini", car: "Con un'auto", interests: "Interessi", save: "Salva viaggio", reset: "Cancella", saved: "Salvato su questo dispositivo", error: "Controlla le date e il gruppo, oppure consenti il salvataggio sul dispositivo.", events: "Nelle tue date", guides: "Idee per il soggiorno", empty: "Nessun evento confermato in queste date.", booking: "Richiedi disponibilità", favourites: "Preferiti" },
  uk: { title: "Моя поїздка", from: "Заїзд", to: "Виїзд", adults: "Дорослі", children: "Діти", car: "Подорожую автомобілем", interests: "Інтереси", save: "Зберегти", reset: "Очистити", saved: "Збережено на цьому пристрої", error: "Перевірте дати та кількість гостей або дозвольте збереження на пристрої.", events: "На ваші дати", guides: "Ідеї для відпочинку", empty: "На ці дати немає підтверджених подій.", booking: "Запитати доступність", favourites: "Обране" },
};
const visitNotes: Record<Locale, string> = {
  en: "Check opening times, transport and official programmes before visiting. Mountain and sea activities depend on conditions.",
  fr: "Vérifiez les horaires, les transports et les programmes officiels avant votre visite. Les activités en montagne et en mer dépendent des conditions.",
  it: "Verifica orari, trasporti e programmi ufficiali prima della visita. Le attività in montagna e in mare dipendono dalle condizioni.",
  uk: "Перед відвідуванням перевірте години роботи, транспорт та офіційні програми. Заняття в горах і на морі залежать від умов.",
};
export type TripSuggestion = { id: string; title: string; href: string; category?: string; start?: string; end?: string; date?: string };

export function MyTripPlanner({ locale, events, guides, interestLabels }: { locale: Locale; events: TripSuggestion[]; guides: TripSuggestion[]; interestLabels: Record<string, string> }) {
  const [trip, setTrip] = useState<MyTrip>(emptyTrip);
  const [saved, setSaved] = useState<MyTrip | null>(null);
  const [message, setMessage] = useState("");
  const [ready, setReady] = useState(false);
  const c = copy[locale];
  useEffect(() => {
    const refresh = () => { try { const value = parseTrip(window.localStorage.getItem(TRIP_KEY)); setTrip(value ?? emptyTrip); setSaved(value); } catch {} setReady(true); };
    const onStorage = (event: StorageEvent) => { if (event.key === TRIP_KEY || event.key === null) refresh(); };
    refresh();
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  const matching = saved ? events.filter(e => tripOverlapsEvent(saved, e)) : [];
  const ideas = rankTripGuides(guides, saved);
  const inputClass = "mt-2 block min-h-11 w-full border border-[#dfd4c1] bg-white px-3 py-2";
  return <div className="mx-auto max-w-5xl px-5 py-12 text-[#173f36]">
    <div className="flex flex-wrap items-center justify-between gap-4"><h1 className="serif-heading text-4xl">{c.title}</h1><a href={`/${locale}/favourites`} className="underline">{c.favourites}</a></div>
    <form className="mt-8" onSubmit={e => { e.preventDefault(); try { if (saveTrip(window.localStorage, trip)) { setSaved(trip); setMessage(c.saved); window.dispatchEvent(new Event(TRIP_CHANGED)); } else setMessage(c.error); } catch { setMessage(c.error); } }}>
      <fieldset disabled={!ready} className="min-w-0 border-0 p-0">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label>{c.from}<input required type="date" value={trip.checkIn} className={inputClass} onChange={e => setTrip({ ...trip, checkIn: e.target.value })} /></label>
        <label>{c.to}<input required type="date" min={trip.checkIn} value={trip.checkOut} className={inputClass} onChange={e => setTrip({ ...trip, checkOut: e.target.value })} /></label>
        <label>{c.adults}<input required type="number" min={1} max={12} value={trip.adults} className={inputClass} onChange={e => setTrip({ ...trip, adults: Number(e.target.value) })} /></label>
        <label>{c.children}<input required type="number" min={0} max={12} value={trip.children} className={inputClass} onChange={e => setTrip({ ...trip, children: Number(e.target.value) })} /></label>
      </div>
      <label className="mt-6 flex min-h-11 items-center gap-3"><input type="checkbox" checked={trip.car} onChange={e => setTrip({ ...trip, car: e.target.checked })} />{c.car}</label>
      <fieldset className="mt-4"><legend className="font-semibold">{c.interests}</legend><div className="mt-3 grid gap-2 sm:grid-cols-3">{tripInterests.map(id => <label key={id} className="flex min-h-11 items-center gap-3"><input type="checkbox" checked={trip.interests.includes(id)} onChange={e => setTrip({ ...trip, interests: e.target.checked ? [...trip.interests, id] : trip.interests.filter(i => i !== id) })} />{interestLabels[id]}</label>)}</div></fieldset>
      <div className="mt-6 flex flex-wrap gap-3"><button className="min-h-11 bg-[#173f36] px-5 py-3 text-white" type="submit">{c.save}</button><button className="min-h-11 border border-[#173f36] px-5 py-3" type="button" onClick={() => { try { window.localStorage.removeItem(TRIP_KEY); setTrip(emptyTrip); setSaved(null); setMessage(""); window.dispatchEvent(new Event(TRIP_CHANGED)); } catch { setMessage(c.error); } }}>{c.reset}</button></div><p role="status" className="mt-3">{message}</p>
      </fieldset>
    </form>
    {saved ? <section className="mt-10 border-t border-[#dfd4c1] pt-8"><h2 className="serif-heading text-3xl">{c.events}</h2><ul className="mt-5 space-y-4">{matching.map(e => <li key={e.id}><a href={e.href} className="font-semibold underline">{e.title}</a><p>{e.date}</p></li>)}</ul>{!matching.length ? <p className="mt-4">{c.empty}</p> : null}</section> : null}
    <section className="mt-10 border-t border-[#dfd4c1] pt-8"><h2 className="serif-heading text-3xl">{c.guides}</h2><ul className="mt-5 space-y-4">{ideas.map(g => <li key={g.id}><a href={g.href} className="underline">{g.title}</a></li>)}</ul><p className="mt-6 text-sm leading-6 text-[#5f574c]">{visitNotes[locale]}</p></section>
    {saved ? <a href={`/${locale}/check-availability`} className="mt-8 inline-flex min-h-11 items-center bg-[#173f36] px-5 py-3 text-white">{c.booking}</a> : null}
  </div>;
}

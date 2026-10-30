"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/locales";
import { emptyTrip, parseTrip, saveTrip, TRIP_KEY, TRIP_CHANGED, tripInterests, type MyTrip } from "@/lib/my-trip";
import { rankTripGuides, tripOverlapsEvent } from "@/lib/trip-recommendations";
import { SavedDayRoutes } from "./TripRouteControls";
import type { DayRouteOption } from "@/lib/trip-day-routes";
import type { PlanPlace } from "@/lib/trip-place-days";
import { PlaceDayPlanner } from "./PlaceDayPlanner";

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
const ageCopy = {
  en: {title:"Children's ages during the trip (optional)",child:"Child",note:"Saved on this device only, not sent with a booking enquiry or shared collection. Venue age rules still need checking."},
  fr: {title:"Âges des enfants pendant le séjour (facultatif)",child:"Enfant",note:"Enregistrés uniquement sur cet appareil, sans transmission avec une demande de réservation ou une collection partagée. Vérifiez les conditions d'âge des lieux."},
  it: {title:"Età dei bambini durante il viaggio (facoltative)",child:"Bambino",note:"Salvate solo sul dispositivo, non inviate con una richiesta di prenotazione o raccolta condivisa. Verifica i limiti d'età dei luoghi."},
  uk: {title:"Вік дітей під час поїздки (необов'язково)",child:"Дитина",note:"Зберігається лише на пристрої, не надсилається із запитом бронювання чи добіркою. Вікові умови закладів потрібно перевіряти."},
};

export function MyTripPlanner({ locale, events, guides, interestLabels, routes, places }: { locale: Locale; events: TripSuggestion[]; guides: TripSuggestion[]; interestLabels: Record<string, string>; routes: DayRouteOption[]; places: PlanPlace[] }) {
  const [trip, setTrip] = useState<MyTrip>(emptyTrip);
  const [saved, setSaved] = useState<MyTrip | null>(null);
  const [message, setMessage] = useState("");
  const [ready, setReady] = useState(false);
  const lastProfile = useRef<string | null>(null);
  const c = copy[locale];
  useEffect(() => {
    const refresh = () => {
      try {
        const value = parseTrip(window.localStorage.getItem(TRIP_KEY));
        const profile = JSON.stringify(value ? { ...value, dayRoutes: undefined, placeDays: undefined } : null);
        if (profile !== lastProfile.current) setTrip(value ?? emptyTrip);
        lastProfile.current = profile;
        setSaved(value);
      } catch {}
      setReady(true);
    };
    const onStorage = (event: StorageEvent) => { if (event.key === TRIP_KEY || event.key === null) refresh(); };
    refresh();
    window.addEventListener("storage", onStorage);
    window.addEventListener(TRIP_CHANGED, refresh);
    return () => { window.removeEventListener("storage", onStorage); window.removeEventListener(TRIP_CHANGED, refresh); };
  }, []);
  const matching = saved ? events.filter(e => tripOverlapsEvent(saved, e)) : [];
  const ideas = rankTripGuides(guides, saved);
  const inputClass = "mt-2 block min-h-11 w-full border border-[#dfd4c1] bg-white px-3 py-2";
  return <div className="mx-auto max-w-5xl px-5 py-12 text-[#173f36]">
    <div className="flex flex-wrap items-center justify-between gap-4"><h1 className="serif-heading text-4xl">{c.title}</h1><a href={`/${locale}/favourites`} className="underline">{c.favourites}</a></div>
    <form id="trip-dates" className="mt-8 scroll-mt-40" onSubmit={e => { e.preventDefault(); try { const current = parseTrip(window.localStorage.getItem(TRIP_KEY)); const next = { ...trip, dayRoutes: current?.dayRoutes, placeDays: current?.placeDays }; if (saveTrip(window.localStorage, next)) { setSaved(next); setMessage(c.saved); window.dispatchEvent(new Event(TRIP_CHANGED)); } else setMessage(c.error); } catch { setMessage(c.error); } }}>
      <fieldset disabled={!ready} className="min-w-0 border-0 p-0">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label>{c.from}<input required type="date" value={trip.checkIn} className={inputClass} onChange={e => setTrip({ ...trip, checkIn: e.target.value })} /></label>
        <label>{c.to}<input required type="date" min={trip.checkIn} value={trip.checkOut} className={inputClass} onChange={e => setTrip({ ...trip, checkOut: e.target.value })} /></label>
        <label>{c.adults}<input required type="number" min={1} max={12} value={trip.adults} className={inputClass} onChange={e => setTrip({ ...trip, adults: Number(e.target.value) })} /></label>
        <label>{c.children}<input required type="number" min={0} max={12} value={trip.children} className={inputClass} onChange={e => { const children=Number(e.target.value); const count=Number.isInteger(children)&&children>=0&&children<=12?children:0; setTrip({ ...trip, children, childAges:Array.from({length:count},(_,index)=>trip.childAges?.[index]??null) }); }} /></label>
      </div>
      {trip.children>0&&trip.children<=12 ? <fieldset className="mt-5 min-w-0" aria-describedby="trip-child-ages-note"><legend className="font-semibold">{ageCopy[locale].title}</legend><div className="mt-3 grid gap-4 sm:grid-cols-3">{Array.from({length:trip.children},(_,index)=><label key={index} className="min-w-0">{ageCopy[locale].child} {index+1}<input type="number" min={0} max={17} step={1} value={trip.childAges?.[index]??""} className={inputClass} onChange={event=>{const ages=Array.from({length:trip.children},(_,i)=>trip.childAges?.[i]??null);ages[index]=event.target.value===""?null:Number(event.target.value);setTrip({...trip,childAges:ages});}} /></label>)}</div><p id="trip-child-ages-note" className="mt-3 text-sm leading-6 text-[#586660]">{ageCopy[locale].note}</p></fieldset> : null}
      <label className="mt-6 flex min-h-11 items-center gap-3"><input type="checkbox" checked={trip.car} onChange={e => setTrip({ ...trip, car: e.target.checked })} />{c.car}</label>
      <fieldset className="mt-4"><legend className="font-semibold">{c.interests}</legend><div className="mt-3 grid gap-2 sm:grid-cols-3">{tripInterests.map(id => <label key={id} className="flex min-h-11 items-center gap-3"><input type="checkbox" checked={trip.interests.includes(id)} onChange={e => setTrip({ ...trip, interests: e.target.checked ? [...trip.interests, id] : trip.interests.filter(i => i !== id) })} />{interestLabels[id]}</label>)}</div></fieldset>
      <div className="mt-6 flex flex-wrap gap-3"><button className="min-h-11 bg-[#173f36] px-5 py-3 text-white" type="submit">{c.save}</button><button className="min-h-11 border border-[#173f36] px-5 py-3" type="button" onClick={() => { try { window.localStorage.removeItem(TRIP_KEY); setTrip(emptyTrip); setSaved(null); setMessage(""); window.dispatchEvent(new Event(TRIP_CHANGED)); } catch { setMessage(c.error); } }}>{c.reset}</button></div><p role="status" className="mt-3">{message}</p>
      </fieldset>
    </form>
    <SavedDayRoutes locale={locale} routes={routes} />
    <PlaceDayPlanner locale={locale} places={places} />
    {saved ? <section className="mt-10 border-t border-[#dfd4c1] pt-8"><h2 className="serif-heading text-3xl">{c.events}</h2><ul className="mt-5 space-y-4">{matching.map(e => <li key={e.id}><a href={e.href} className="font-semibold underline">{e.title}</a><p>{e.date}</p></li>)}</ul>{!matching.length ? <p className="mt-4">{c.empty}</p> : null}</section> : null}
    <section className="mt-10 border-t border-[#dfd4c1] pt-8"><h2 className="serif-heading text-3xl">{c.guides}</h2><ul className="mt-5 space-y-4">{ideas.map(g => <li key={g.id}><a href={g.href} className="underline">{g.title}</a></li>)}</ul><p className="mt-6 text-sm leading-6 text-[#5f574c]">{visitNotes[locale]}</p></section>
    {saved ? <a href={`/${locale}/check-availability`} className="mt-8 inline-flex min-h-11 items-center bg-[#173f36] px-5 py-3 text-white">{c.booking}</a> : null}
  </div>;
}

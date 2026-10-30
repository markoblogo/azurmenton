"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, CalendarCheck, CalendarPlus, ChevronDown, Trash2 } from "lucide-react";
import type { Locale } from "@/i18n/locales";
import type { MyTrip } from "@/lib/my-trip";
import { FAVOURITES_CHANGED, FAVOURITES_KEY, parseFavourites } from "@/lib/favourites";
import { addPlacesToDay, MAX_STOPS_PER_DAY, movePlaceDay, placeDayWarnings, removePlaceDay, removePlaceStop, reorderPlaceStop, type PlaceDay, type PlanPlace } from "@/lib/trip-place-days";
import { routeDateInTrip } from "@/lib/trip-day-routes";
import { toParisDateKey } from "@/lib/events";
import { tripDateWindow, useLocalTrip } from "./useLocalTrip";
import { DayPlanChecks } from "./DayPlanChecks";
import { applySuggestedPlaceOrder } from "@/lib/trip-order";

const labels = {
  en: { title: "Your own day plans", build: "Build a day from favourites", day: "Day of your trip", choose: "Choose places", add: "Add selected stops", added: "Stops saved on this device.", updated: "Day plan updated.", error: "Could not save. Check your trip dates and allow device storage. Limits: 12 stops per day, 30 days and 120 stops in total.", changed: "Your favourites changed. Review the selection before saving.", needTrip: "Save your trip dates first.", edit: "Trip dates", noPlaces: "No places in your favourites yet.", map: "Browse places", empty: "No personal day plans yet.", view: "Open my day plans", up: "Move earlier", down: "Move later", remove: "Remove stop", removeDay: "Remove day plan", move: "Change day", unknown: "Place no longer available", outside: "Outside your current trip dates. Change the day or remove this plan.", past: "This date has passed.", many: "Many stops: allow time for visits, breaks and the journey back.", readyRoute: "A ready-made route is also saved for this date. Check the combined programme.", caution: "Allow for travel and check opening times before setting out. Saving is not a booking.", privacy: "Saved on this device only. Removing a stop here leaves your favourites unchanged.", loading: "Loading day plans…" },
  fr: { title: "Vos journées personnalisées", build: "Composer une journée depuis les favoris", day: "Jour de votre séjour", choose: "Choisir les lieux", add: "Ajouter les étapes choisies", added: "Étapes enregistrées sur cet appareil.", updated: "Programme de la journée actualisé.", error: "Enregistrement impossible. Vérifiez les dates et autorisez le stockage. Limites : 12 étapes par jour, 30 jours et 120 étapes au total.", changed: "Vos favoris ont changé. Vérifiez la sélection avant d'enregistrer.", needTrip: "Enregistrez d'abord les dates du séjour.", edit: "Dates du séjour", noPlaces: "Aucun lieu dans vos favoris pour le moment.", map: "Découvrir les lieux", empty: "Aucune journée personnalisée enregistrée.", view: "Ouvrir mes journées", up: "Déplacer plus tôt", down: "Déplacer plus tard", remove: "Retirer l'étape", removeDay: "Supprimer la journée", move: "Changer de jour", unknown: "Lieu indisponible", outside: "En dehors des dates actuelles du séjour. Changez le jour ou supprimez ce programme.", past: "Cette date est passée.", many: "Nombreuses étapes : gardez du temps pour les visites, les pauses et le retour.", readyRoute: "Un parcours proposé est aussi enregistré à cette date. Vérifiez le programme combiné.", caution: "Prévoyez les déplacements et vérifiez les horaires avant de partir. Enregistrer n'est pas réserver.", privacy: "Enregistré uniquement sur cet appareil. Retirer une étape ne modifie pas vos favoris.", loading: "Chargement des journées…" },
  it: { title: "Le tue giornate personalizzate", build: "Crea una giornata dai preferiti", day: "Giorno del viaggio", choose: "Scegli i luoghi", add: "Aggiungi le tappe scelte", added: "Tappe salvate su questo dispositivo.", updated: "Programma della giornata aggiornato.", error: "Salvataggio non riuscito. Verifica le date e consenti il salvataggio. Limiti: 12 tappe al giorno, 30 giorni e 120 tappe totali.", changed: "I preferiti sono cambiati. Controlla la selezione prima di salvare.", needTrip: "Salva prima le date del viaggio.", edit: "Date del viaggio", noPlaces: "Non ci sono ancora luoghi nei preferiti.", map: "Scopri i luoghi", empty: "Nessuna giornata personalizzata salvata.", view: "Apri le mie giornate", up: "Sposta prima", down: "Sposta dopo", remove: "Rimuovi tappa", removeDay: "Rimuovi giornata", move: "Cambia giorno", unknown: "Luogo non più disponibile", outside: "Fuori dalle date attuali del viaggio. Cambia giorno o rimuovi il programma.", past: "Questa data è passata.", many: "Molte tappe: lascia tempo per visite, pause e ritorno.", readyRoute: "Un percorso proposto è già salvato per questa data. Controlla il programma complessivo.", caution: "Considera gli spostamenti e verifica gli orari prima di partire. Salvare non significa prenotare.", privacy: "Salvato solo su questo dispositivo. Rimuovere una tappa non modifica i preferiti.", loading: "Caricamento delle giornate…" },
  uk: { title: "Ваші власні плани на день", build: "Скласти день з обраних місць", day: "День вашої поїздки", choose: "Обрати місця", add: "Додати обрані зупинки", added: "Зупинки збережено на цьому пристрої.", updated: "План дня оновлено.", error: "Не вдалося зберегти. Перевірте дати й дозвольте збереження. Обмеження: 12 зупинок на день, 30 днів і 120 зупинок загалом.", changed: "Обране змінилося. Перегляньте вибір перед збереженням.", needTrip: "Спочатку збережіть дати поїздки.", edit: "Дати поїздки", noPlaces: "В обраному ще немає місць.", map: "Переглянути місця", empty: "Власних планів на день ще немає.", view: "Відкрити мої плани", up: "Перемістити раніше", down: "Перемістити пізніше", remove: "Прибрати зупинку", removeDay: "Видалити план дня", move: "Змінити день", unknown: "Місце більше недоступне", outside: "Поза поточними датами поїздки. Змініть день або видаліть план.", past: "Ця дата вже минула.", many: "Багато зупинок: залиште час на візити, перерви й повернення.", readyRoute: "На цю дату також збережено готовий маршрут. Перевірте спільну програму.", caution: "Залишайте час на дорогу й перевіряйте години перед виходом. Збереження не є бронюванням.", privacy: "Збережено лише на цьому пристрої. Видалення зупинки не змінює обране.", loading: "Завантаження планів…" },
} satisfies Record<Locale, Record<string, string>>;

const selectionLabels: Record<Locale, string> = { en: "Choose a day and places", fr: "Choisir un jour et des lieux", it: "Scegli giorno e luoghi", uk: "Обрати день і місця" };

export function PlaceDayPlanner({ locale, places, showPlans = true }: { locale: Locale; places: PlanPlace[]; showPlans?: boolean }) {
  const { trip, ready, storageError, update } = useLocalTrip();
  const [favouriteIds, setFavouriteIds] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [date, setDate] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [favouritesError, setFavouritesError] = useState(false);
  const c = labels[locale];
  const { min, max } = tripDateWindow(trip);
  useEffect(() => {
    const refresh = () => {
      try { setFavouriteIds(parseFavourites(window.localStorage.getItem(FAVOURITES_KEY)).filter(item => item.type === "place").map(item => item.id)); setFavouritesError(false); }
      catch { setFavouriteIds([]); setFavouritesError(true); }
    };
    const onStorage = (event: StorageEvent) => { if (event.key === FAVOURITES_KEY || event.key === null) refresh(); };
    refresh();
    window.addEventListener(FAVOURITES_CHANGED, refresh);
    window.addEventListener("storage", onStorage);
    return () => { window.removeEventListener(FAVOURITES_CHANGED, refresh); window.removeEventListener("storage", onStorage); };
  }, []);
  const favourites = favouriteIds.flatMap(id => { const place = places.find(item => item.id === id); return place ? [place] : []; });
  function mutate(transform: (current: MyTrip) => MyTrip | null) {
    const ok = update(transform);
    setMessage(ok ? c.updated : c.error);
    return ok;
  }

  return <section id="place-days" aria-labelledby="place-days-title" className="mt-10 min-w-0 scroll-mt-40 border-t-2 border-[#358392] pt-8 text-[#173f36]">
    <h2 id="place-days-title" className="serif-heading text-3xl">{showPlans ? c.title : c.build}</h2>
    {!ready ? <p className="mt-4">{c.loading}</p> : <>
      {storageError ? <p className="mt-4 text-sm text-[#7a302b]">{c.error}</p> : <>
        <details open={!showPlans} className="group mt-4" data-place-day-builder>
          <summary className="flex min-h-11 cursor-pointer list-none items-center gap-3 font-semibold text-[#155b6c] focus-visible:outline focus-visible:outline-2 [&::-webkit-details-marker]:hidden"><CalendarPlus aria-hidden="true" className="size-5 shrink-0" />{showPlans ? c.build : selectionLabels[locale]}<ChevronDown aria-hidden="true" className="ml-auto size-5 shrink-0 group-open:rotate-180" /></summary>
          {!trip || min > max ? <p className="mt-3 text-sm leading-6">{c.needTrip} <a href={`/${locale}/my-trip#trip-dates`} className="inline-block min-h-11 py-2 font-semibold underline">{c.edit}</a></p> : favouritesError ? <p className="mt-3 text-sm">{c.error}</p> : !favourites.length ? <p className="mt-3 text-sm">{c.noPlaces} <a href={`/${locale}/map`} className="inline-block min-h-11 py-2 font-semibold underline">{c.map}</a></p> : <form className="mt-4" onSubmit={event => {
            event.preventDefault();
            try {
              const current = new Set(parseFavourites(window.localStorage.getItem(FAVOURITES_KEY)).filter(item => item.type === "place").map(item => item.id));
              const valid = new Set(places.map(place => place.id));
              if (selected.some(id => !current.has(id) || !valid.has(id))) { setSelected(selected.filter(id => current.has(id) && valid.has(id))); setMessage(c.changed); return; }
              if (update(value => addPlacesToDay(value, date ?? min, selected, toParisDateKey(new Date())))) { setSelected([]); setMessage(c.added); }
              else setMessage(c.error);
            } catch { setMessage(c.error); }
          }}>
            <label className="block max-w-56 text-sm">{c.day}<input type="date" required min={min} max={max} value={date ?? min} onChange={event => { setDate(event.target.value); setMessage(""); }} className="mt-2 block min-h-11 w-full border border-[#9bb7b5] bg-white px-3 py-2 text-base" /></label>
            <fieldset className="mt-4"><legend className="font-semibold">{c.choose}{selected.length ? ` · ${selected.length}` : ""}</legend><div className="mt-2 grid gap-x-6 sm:grid-cols-2">{favourites.map(place => <label key={place.id} className="flex min-h-11 min-w-0 items-start gap-3 py-2 text-sm leading-6"><input type="checkbox" checked={selected.includes(place.id)} disabled={!selected.includes(place.id) && selected.length >= MAX_STOPS_PER_DAY} onChange={event => { setSelected(ids => event.target.checked ? [...ids, place.id] : ids.filter(id => id !== place.id)); setMessage(""); }} className="mt-1 size-4 shrink-0 accent-[#155b6c]" /><span>{place.title}</span></label>)}</div></fieldset>
            <button type="submit" disabled={!selected.length} className="mt-4 inline-flex min-h-11 items-center gap-2 bg-[#173f36] px-4 py-2 text-white disabled:opacity-50"><CalendarPlus aria-hidden="true" className="size-5 shrink-0" />{c.add}</button>
          </form>}
        </details>
        {showPlans ? !trip?.placeDays?.length ? <p className="mt-5 text-sm">{c.empty}</p> : <div className="mt-5 divide-y divide-[#dce4df]">{trip.placeDays.map(day => <PersonalPlaceDay key={day.date} day={day} trip={trip} locale={locale} places={places} mutate={mutate} />)}</div> : <a href={`/${locale}/my-trip#place-days`} className="mt-3 inline-block min-h-11 py-2 font-semibold underline">{c.view}</a>}
        <p className="mt-4 text-sm leading-6">{c.privacy}</p>
        <p className="mt-2 text-sm leading-6">{c.caution}</p>
      </>}
    </>}
    <p aria-live="polite" className="mt-3 text-sm leading-6">{message}</p>
  </section>;
}

function PersonalPlaceDay({ day, trip, locale, places, mutate }: { day: PlaceDay; trip: MyTrip; locale: Locale; places: PlanPlace[]; mutate: (transform: (current: MyTrip) => MyTrip | null) => boolean }) {
  const c = labels[locale];
  const [date, setDate] = useState(day.date);
  const { today, min, max } = tripDateWindow(trip);
  const warning = !routeDateInTrip(day.date, trip) ? c.outside : day.date < today ? c.past : "";
  const warnings = placeDayWarnings(trip, day);
  const formatted = new Intl.DateTimeFormat(locale === "uk" ? "uk-UA" : locale, { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Paris" }).format(new Date(`${day.date}T12:00:00Z`));
  const iconClass = "flex size-11 shrink-0 items-center justify-center border border-[#9bb7b5] text-[#155b6c] hover:bg-[#e3efee] disabled:opacity-35";
  return <div className="min-w-0 py-5" data-place-day={day.date}>
    <div className="flex items-center justify-between gap-3"><h3 className="text-lg font-semibold"><time dateTime={day.date}>{formatted}</time></h3><button type="button" title={c.removeDay} aria-label={`${c.removeDay}: ${formatted}`} className={iconClass} onClick={() => mutate(value => removePlaceDay(value, day.date))}><Trash2 aria-hidden="true" className="size-5" /></button></div>
    {min <= max ? <form className="mt-3 flex flex-wrap items-end gap-3" onSubmit={event => { event.preventDefault(); mutate(value => movePlaceDay(value, day.date, date, toParisDateKey(new Date()))); }}><label className="min-w-0 max-w-56 flex-1 text-sm">{c.day}<span className="sr-only">: {formatted}</span><input type="date" required min={min} max={max} value={date} onChange={event => setDate(event.target.value)} className="mt-1 block min-h-11 w-full border border-[#9bb7b5] bg-white px-3 py-2 text-base" /></label><button type="submit" title={c.move} aria-label={`${c.move}: ${formatted}`} className={iconClass}><CalendarCheck aria-hidden="true" className="size-5" /></button></form> : null}
    {warning ? <p className="mt-3 border-l-2 border-[#b88e43] pl-3 text-sm leading-6 text-[#765621]">{warning}</p> : null}
    {warnings.manyStops ? <p className="mt-3 text-sm leading-6 text-[#765621]">{c.many}</p> : null}
    {warnings.readyRoute ? <p className="mt-3 text-sm leading-6 text-[#765621]">{c.readyRoute}</p> : null}
    <ol className="mt-4 divide-y divide-[#dce4df]">{day.placeIds.map((id, index) => {
      const place = places.find(item => item.id === id);
      const title = place?.title ?? c.unknown;
      return <li key={id} data-plan-stop={id} className="flex min-w-0 flex-wrap items-center gap-3 py-3"><span aria-hidden="true" className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#e3efee] text-sm font-bold">{index + 1}</span><div className="min-w-0 flex-1 basis-40 text-sm font-semibold leading-6">{place ? <a href={place.href} className="underline underline-offset-4">{title}</a> : title}</div><div className="ml-auto flex gap-1"><button type="button" disabled={index === 0} title={c.up} aria-label={`${c.up}: ${title}`} className={iconClass} onClick={() => mutate(value => reorderPlaceStop(value, day.date, id, -1))}><ArrowUp aria-hidden="true" className="size-5" /></button><button type="button" disabled={index === day.placeIds.length - 1} title={c.down} aria-label={`${c.down}: ${title}`} className={iconClass} onClick={() => mutate(value => reorderPlaceStop(value, day.date, id, 1))}><ArrowDown aria-hidden="true" className="size-5" /></button><button type="button" title={c.remove} aria-label={`${c.remove}: ${title}`} className={iconClass} onClick={() => mutate(value => removePlaceStop(value, day.date, id))}><Trash2 aria-hidden="true" className="size-5" /></button></div></li>;
    })}</ol>
    <DayPlanChecks day={day} places={places} locale={locale} hasCar={trip.car} childCount={trip.children} childAges={trip.childAges} applyOrder={(before,after)=>mutate(value=>applySuggestedPlaceOrder(value,day.date,before,after))} />
  </div>;
}

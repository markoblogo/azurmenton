"use client";

import { useId, useState } from "react";
import { CalendarCheck, CalendarPlus, Trash2 } from "lucide-react";
import type { Locale } from "@/i18n/locales";
import type { MyTrip } from "@/lib/my-trip";
import { assignDayRoute, dayRouteKey, moveDayRoute, removeDayRoute, routeDateInTrip, type DayRouteOption, type SavedDayRoute } from "@/lib/trip-day-routes";
import { toParisDateKey } from "@/lib/events";
import { useLocalTrip, tripDateWindow as dateWindow } from "./useLocalTrip";

const labels = {
  en: { add: "Add to my trip", day: "Day of your trip", save: "Save route", done: "Route saved on this device.", view: "Open my trip", needTrip: "Save your trip dates first, then choose a day for this route.", updateTrip: "Update your trip dates before adding a route.", edit: "Choose trip dates", error: "Could not save. Choose a day within your current trip and allow storage on this device (up to 60 routes).", heading: "Your day routes", empty: "No routes saved yet.", browse: "Browse ready-made routes", move: "Change day", remove: "Remove route", unknown: "This route is no longer available.", outside: "Outside your current trip dates. Choose another day or remove this route.", past: "This date has passed.", caution: "Saving is not a booking. Check opening times, access and transport before visiting.", loading: "Loading your saved routes…", minutes: "min", private: "Saved with your trip on this device only. Clearing your trip also removes these routes." },
  fr: { add: "Ajouter à mon séjour", day: "Jour de votre séjour", save: "Enregistrer le parcours", done: "Parcours enregistré sur cet appareil.", view: "Ouvrir mon séjour", needTrip: "Enregistrez d'abord les dates du séjour, puis choisissez un jour pour ce parcours.", updateTrip: "Actualisez les dates du séjour avant d'ajouter un parcours.", edit: "Choisir les dates du séjour", error: "Enregistrement impossible. Choisissez un jour du séjour actuel et autorisez le stockage sur cet appareil (60 parcours maximum).", heading: "Vos parcours par jour", empty: "Aucun parcours enregistré.", browse: "Voir les parcours proposés", move: "Changer de jour", remove: "Supprimer le parcours", unknown: "Ce parcours n'est plus disponible.", outside: "En dehors des dates actuelles du séjour. Choisissez un autre jour ou supprimez ce parcours.", past: "Cette date est passée.", caution: "L'enregistrement n'est pas une réservation. Vérifiez horaires, accès et transports avant la visite.", loading: "Chargement des parcours…", minutes: "min", private: "Enregistrés avec votre séjour uniquement sur cet appareil. Effacer le séjour supprime aussi ces parcours." },
  it: { add: "Aggiungi al mio viaggio", day: "Giorno del viaggio", save: "Salva percorso", done: "Percorso salvato su questo dispositivo.", view: "Apri il mio viaggio", needTrip: "Salva prima le date del viaggio, poi scegli un giorno per questo percorso.", updateTrip: "Aggiorna le date del viaggio prima di aggiungere un percorso.", edit: "Scegli le date del viaggio", error: "Salvataggio non riuscito. Scegli un giorno del viaggio attuale e consenti il salvataggio sul dispositivo (massimo 60 percorsi).", heading: "I tuoi percorsi per giorno", empty: "Nessun percorso salvato.", browse: "Scopri i percorsi proposti", move: "Cambia giorno", remove: "Rimuovi percorso", unknown: "Questo percorso non è più disponibile.", outside: "Fuori dalle date attuali del viaggio. Scegli un altro giorno o rimuovi il percorso.", past: "Questa data è passata.", caution: "Salvare non significa prenotare. Verifica orari, accessi e trasporti prima della visita.", loading: "Caricamento dei percorsi…", minutes: "min", private: "Salvati con il viaggio solo su questo dispositivo. Cancellare il viaggio rimuove anche questi percorsi." },
  uk: { add: "Додати до моєї поїздки", day: "День вашої поїздки", save: "Зберегти маршрут", done: "Маршрут збережено на цьому пристрої.", view: "Відкрити мою поїздку", needTrip: "Спочатку збережіть дати поїздки, потім оберіть день для маршруту.", updateTrip: "Оновіть дати поїздки перед додаванням маршруту.", edit: "Обрати дати поїздки", error: "Не вдалося зберегти. Оберіть день у межах поточної поїздки й дозвольте збереження на пристрої (до 60 маршрутів).", heading: "Ваші маршрути за днями", empty: "Збережених маршрутів ще немає.", browse: "Переглянути готові маршрути", move: "Змінити день", remove: "Видалити маршрут", unknown: "Цей маршрут більше недоступний.", outside: "Поза поточними датами поїздки. Оберіть інший день або видаліть маршрут.", past: "Ця дата вже минула.", caution: "Збереження не є бронюванням. Перед візитом перевірте години, доступ і транспорт.", loading: "Завантаження маршрутів…", minutes: "хв", private: "Збережено разом із поїздкою лише на цьому пристрої. Очищення поїздки видаляє також ці маршрути." },
} satisfies Record<Locale, Record<string, string>>;

export function SaveDayRoute({ routeId, locale }: { routeId: string; locale: Locale }) {
  const { trip, ready, storageError, update } = useLocalTrip();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const controlId = useId();
  const c = labels[locale];
  const { min, max } = dateWindow(trip);
  return (
    <div className="mt-5 min-w-0" data-save-day-route={routeId}>
      <button type="button" disabled={!ready} aria-expanded={open} aria-controls={controlId} className="inline-flex min-h-11 items-center gap-2 border border-[#316d7a] px-4 py-2 font-semibold text-[#155b6c] hover:bg-[#e3efee] disabled:opacity-50" onClick={() => { setOpen(!open); setDate(min); setMessage(""); }}><CalendarPlus aria-hidden="true" className="size-5 shrink-0" />{c.add}</button>
      {open ? <div id={controlId} className="mt-3 border-l-2 border-[#358392] pl-4">
        {!trip || max < min ? <><p className="text-sm leading-6">{storageError ? c.error : trip ? c.updateTrip : c.needTrip}</p><a href={`/${locale}/my-trip`} className="mt-2 inline-block min-h-11 py-2 font-semibold underline underline-offset-4">{c.edit}</a></> : <form onSubmit={event => {
          event.preventDefault();
          const ok = update(current => assignDayRoute(current, { routeId, date }, toParisDateKey(new Date())));
          setMessage(ok ? c.done : c.error);
        }}>
          <div className="flex flex-wrap items-end gap-3">
            <label className="min-w-0 text-sm">{c.day}<input required type="date" min={min} max={max} value={date} onChange={event => { setDate(event.target.value); setMessage(""); }} className="mt-1 block min-h-11 w-full max-w-56 border border-[#9bb7b5] bg-white px-3 py-2 text-base" /></label>
            <button type="submit" className="inline-flex min-h-11 items-center gap-2 bg-[#173f36] px-4 py-2 font-semibold text-white"><CalendarCheck aria-hidden="true" className="size-5 shrink-0" />{c.save}</button>
          </div>
          <p role="status" className="mt-2 text-sm leading-6">{message}</p>
          <a href={`/${locale}/my-trip#saved-day-routes`} className="inline-block min-h-11 py-2 font-semibold underline underline-offset-4">{c.view}</a>
        </form>}
      </div> : null}
    </div>
  );
}

export function SavedDayRoutes({ locale, routes }: { locale: Locale; routes: DayRouteOption[] }) {
  const { trip, ready, storageError, update } = useLocalTrip();
  const c = labels[locale];
  return (
    <section id="saved-day-routes" aria-labelledby="saved-day-routes-title" className="mt-10 scroll-mt-40 border-t-2 border-[#358392] pt-8">
      <h2 id="saved-day-routes-title" className="serif-heading text-3xl">{c.heading}</h2>
      {!ready ? <p className="mt-4">{c.loading}</p> : <>
        {storageError ? <p role="status" className="mt-4">{c.error}</p> : <>
          {!trip?.dayRoutes?.length ? <p className="mt-4">{c.empty}</p> : <ul className="mt-5 divide-y divide-[#dce4df]">{trip.dayRoutes.map(entry => <SavedRouteRow key={dayRouteKey(entry)} entry={entry} option={routes.find(route => route.id === entry.routeId)} trip={trip} locale={locale} update={update} />)}</ul>}
          <p className="mt-4 text-sm leading-6">{c.private}</p>
          <p className="mt-2 text-sm leading-6">{c.caution}</p>
        </>}
        <a href={`/${locale}/stay`} className="mt-3 inline-block min-h-11 py-2 font-semibold text-[#155b6c] underline underline-offset-4">{c.browse}</a>
      </>}
    </section>
  );
}

function SavedRouteRow({ entry, option, trip, locale, update }: { entry: SavedDayRoute; option?: DayRouteOption; trip: MyTrip; locale: Locale; update: (transform: (current: MyTrip) => MyTrip | null) => boolean }) {
  const c = labels[locale];
  const [date, setDate] = useState(entry.date);
  const [error, setError] = useState(false);
  const { today, min, max } = dateWindow(trip);
  const title = option?.title ?? c.unknown;
  const formattedDate = new Intl.DateTimeFormat(locale === "uk" ? "uk-UA" : locale, { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Paris" }).format(new Date(`${entry.date}T12:00:00Z`));
  const warning = !routeDateInTrip(entry.date, trip) ? c.outside : entry.date < today ? c.past : "";
  return (
    <li className="min-w-0 py-5" data-saved-day-route={entry.routeId} data-route-date={entry.date}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0"><time dateTime={entry.date} className="text-sm font-semibold text-[#316d7a]">{formattedDate}</time><h3 className="mt-1 text-lg font-semibold">{option ? <a href={option.href} className="underline underline-offset-4">{title}</a> : title}</h3>{option ? <p className="mt-1 text-sm">{option.minutes.join("–")} {c.minutes}</p> : null}</div>
        <button type="button" aria-label={`${c.remove}: ${title}`} title={c.remove} className="flex size-11 shrink-0 items-center justify-center border border-[#9bb7b5] text-[#7a302b] hover:bg-[#faece7]" onClick={() => setError(!update(current => removeDayRoute(current, entry)))}><Trash2 aria-hidden="true" className="size-5" /></button>
      </div>
      {warning ? <p className="mt-3 border-l-2 border-[#b88e43] pl-3 text-sm leading-6 text-[#765621]">{warning}</p> : null}
      {option && min <= max ? <form className="mt-3 flex flex-wrap items-end gap-3" onSubmit={event => { event.preventDefault(); setError(!update(current => moveDayRoute(current, entry, date, toParisDateKey(new Date())))); }}>
        <label className="min-w-0 max-w-56 flex-1 text-sm">{c.day}<span className="sr-only">: {title}</span><input type="date" required min={min} max={max} value={date} onChange={event => { setDate(event.target.value); setError(false); }} className="mt-1 block min-h-11 w-full border border-[#9bb7b5] bg-white px-3 py-2 text-base" /></label>
        <button type="submit" title={c.move} aria-label={`${c.move}: ${title}`} className="flex size-11 shrink-0 items-center justify-center border border-[#316d7a] text-[#155b6c] hover:bg-[#e3efee]"><CalendarCheck aria-hidden="true" className="size-5" /></button>
      </form> : null}
      {error ? <p role="status" className="mt-2 text-sm text-[#7a302b]">{c.error}</p> : null}
    </li>
  );
}

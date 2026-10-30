import Link from "next/link";
import type { Route } from "next";
import { Accessibility, ChevronDown, Clock3, CloudRain, Footprints, Ticket, TrainFront } from "lucide-react";
import type { DayRouteDetails } from "@/content/planning/day-route-details";
import { getGuideArticle } from "@/content/guide";
import { getPlaces } from "@/content/places";
import type { Locale } from "@/i18n/locales";
import { placeSharePath } from "@/lib/place-share-target";
import { SaveDayRoute } from "./TripRouteControls";
import { PlaceVisitNotes } from "./PlaceVisitNotes";

const labels = {
  en: { route: "Day route", total: "Estimated total", minutes: "min", gentle: "Gentle pace", moderate: "Moderate effort", stairs: "Includes stairs", unknownStairs: "Stairs not assessed", optional: "Optional", practical: "Access, transport and plan B", access: "Access", partial: "Partly checked", unknown: "Not assessed", transport: "Getting there and back", booking: "Before booking", timing: "Choose your day", planB: "Rain or closure", alternative: "See alternatives", age: "Minimum ages and activity-specific conditions remain unverified unless stated for an individual stop. Check with the venue before booking for children.", estimates: "Durations and effort are editorial estimates, including pauses, not measured journey times. Stop times exclude travel between stops.", sources: "Sources reviewed", sourceLimit: "Source review is not an on-site accessibility audit or a live opening-hours check." },
  fr: { route: "Parcours d'une journée", total: "Durée totale estimée", minutes: "min", gentle: "Rythme tranquille", moderate: "Effort modéré", stairs: "Avec escaliers", unknownStairs: "Escaliers non évalués", optional: "Facultatif", practical: "Accès, transport et plan B", access: "Accès", partial: "Partiellement vérifié", unknown: "Non évalué", transport: "Aller et retour", booking: "Avant de réserver", timing: "Choisir le jour", planB: "Pluie ou fermeture", alternative: "Voir les alternatives", age: "Sauf précision pour une étape, les âges minimums et les conditions propres aux activités ne sont pas vérifiés. Contactez les lieux avant de réserver pour des enfants.", estimates: "Durées et effort : estimations éditoriales avec pauses, pas des trajets mesurés. Les temps d'étape excluent les déplacements entre étapes.", sources: "Sources consultées", sourceLimit: "La consultation des sources n'est ni un audit d'accessibilité sur place ni un contrôle des horaires en direct." },
  it: { route: "Percorso della giornata", total: "Durata totale stimata", minutes: "min", gentle: "Ritmo tranquillo", moderate: "Impegno moderato", stairs: "Include scale", unknownStairs: "Scale non valutate", optional: "Facoltativo", practical: "Accesso, trasporti e piano B", access: "Accesso", partial: "Verificato in parte", unknown: "Non valutato", transport: "Andata e ritorno", booking: "Prima di prenotare", timing: "Scegliere il giorno", planB: "Pioggia o chiusura", alternative: "Vedi alternative", age: "Salvo indicazione per una singola tappa, età minime e condizioni delle attività non sono verificate. Contatta le sedi prima di prenotare per bambini.", estimates: "Durate e impegno sono stime redazionali con pause, non tempi di navigazione misurati. I tempi delle tappe escludono gli spostamenti.", sources: "Fonti consultate", sourceLimit: "La verifica delle fonti non è un sopralluogo di accessibilità né un controllo degli orari in tempo reale." },
  uk: { route: "Маршрут на день", total: "Орієнтовний час загалом", minutes: "хв", gentle: "Спокійний темп", moderate: "Помірне навантаження", stairs: "Є сходи", unknownStairs: "Сходи не перевірені", optional: "За бажанням", practical: "Доступ, транспорт і план Б", access: "Доступність", partial: "Перевірено частково", unknown: "Не перевірено", transport: "Дорога туди й назад", booking: "Перед бронюванням", timing: "Вибір дня", planB: "Дощ або закриття", alternative: "Переглянути альтернативи", age: "Якщо для окремої зупинки не вказано інше, мінімальний вік та умови занять не перевірені. Уточніть у закладах перед бронюванням для дітей.", estimates: "Час і навантаження — редакційні оцінки з паузами, не виміряний час навігації. Час зупинок не включає переходи між ними.", sources: "Перевірка джерел", sourceLimit: "Перевірка джерел не є оглядом безбар'єрності на місці або перевіркою годин роботи наживо." },
} satisfies Record<Locale, Record<string, string>>;

export function DayRouteCard({ route, locale, id, compact = false }: { route: DayRouteDetails; locale: Locale; id: string; compact?: boolean }) {
  const copy = labels[locale];
  const Heading = compact ? "h3" : "h2";
  const range = ([min, max]: [number, number]) => `${min}–${max} ${copy.minutes}`;
  const date = new Intl.DateTimeFormat(locale === "uk" ? "uk-UA" : locale, { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Paris" }).format(new Date(`${route.reviewedOn}T12:00:00Z`));
  const alternative = getGuideArticle(route.planBGuideSlug);

  return (
    <section id={`day-route-${id}`} aria-labelledby={`day-route-heading-${id}`} data-day-route={id} className="min-w-0 scroll-mt-40 border-t-2 border-[#358392] pt-5 text-[#314c47]">
      <p className="text-xs font-bold uppercase text-[#316d7a]">{copy.route}</p>
      <Heading id={`day-route-heading-${id}`} className={`mt-2 serif-heading leading-tight text-[#173f36] ${compact ? "text-2xl" : "text-3xl"}`}>{route.title[locale]}</Heading>
      <div className={`mt-4 grid gap-3 text-sm ${compact ? "" : "sm:grid-cols-3"}`}>
        <div className="flex min-w-0 items-start gap-2"><Clock3 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-[#316d7a]" /><span><span className="block text-xs">{copy.total}</span><strong className="text-base">{range(route.durationMinutes)}</strong></span></div>
        <div className="flex min-w-0 items-center gap-2"><Footprints aria-hidden="true" className="size-5 shrink-0 text-[#316d7a]" /><span>{copy[route.effort]}</span></div>
        <p className="min-w-0 border-l-2 border-[#b88e43] pl-3">{route.steps === "present" ? copy.stairs : copy.unknownStairs}</p>
      </div>
      <SaveDayRoute routeId={id} locale={locale} />
      <details open={!compact} className="group mt-4 border-t border-[#dce4df] pt-3">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 font-semibold text-[#155b6c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 [&::-webkit-details-marker]:hidden">{copy.practical}<ChevronDown aria-hidden="true" className="size-5 shrink-0 transition-transform group-open:rotate-180" /></summary>
      <ol className="mt-3 divide-y divide-[#dce4df]">
        {route.stops.map((stop, index) => {
          const place = getPlaces([stop.placeId])[0];
          if (!place) return null;
          const href = placeSharePath(place.id, locale);
          return (
            <li key={stop.placeId} className="flex min-w-0 gap-3 py-3">
              <span aria-hidden="true" className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#e3efee] text-sm font-bold text-[#155b6c]">{index + 1}</span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  {href ? <Link href={href as Route} className="min-h-6 font-semibold underline decoration-[#88a6a8] underline-offset-4 hover:text-[#0b6f8f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">{place.name}</Link> : <strong>{place.name}</strong>}
                  <span className="shrink-0 text-sm">{range(stop.visitMinutes)}</span>
                </div>
                {stop.optional ? <span className="text-xs font-bold text-[#7c5c24]">{copy.optional}</span> : null}
                <p className="mt-1 text-sm leading-6">{stop.note[locale]}</p>
                <PlaceVisitNotes place={place} locale={locale} />
              </div>
            </li>
          );
        })}
      </ol>
      <p className="mt-3 text-sm leading-6 text-[#586660]">{copy.estimates}</p>
        <dl className={`mt-3 grid gap-x-6 gap-y-5 text-sm leading-6 ${compact ? "" : "sm:grid-cols-2"}`}>
          <div><dt className="flex items-center gap-2 font-bold"><Accessibility aria-hidden="true" className="size-5 shrink-0 text-[#316d7a]" />{copy.access} · {route.accessStatus === "partial" ? copy.partial : copy.unknown}</dt><dd className="mt-1">{route.accessNote[locale]}</dd></div>
          <div><dt className="flex items-center gap-2 font-bold"><TrainFront aria-hidden="true" className="size-5 shrink-0 text-[#316d7a]" />{copy.transport}</dt><dd className="mt-1">{route.transport[locale]}</dd></div>
          <div><dt className="flex items-center gap-2 font-bold"><Ticket aria-hidden="true" className="size-5 shrink-0 text-[#316d7a]" />{copy.booking}</dt><dd className="mt-1">{route.booking[locale]}</dd></div>
          <div><dt className="font-bold">{copy.timing}</dt><dd className="mt-1">{route.timing[locale]}</dd></div>
          <div className={compact ? "" : "sm:col-span-2"}><dt className="flex items-center gap-2 font-bold"><CloudRain aria-hidden="true" className="size-5 shrink-0 text-[#316d7a]" />{copy.planB}</dt><dd className="mt-1">{route.planB[locale]} {alternative ? <Link className="inline-block min-h-6 font-semibold underline underline-offset-4" href={`/${locale}/guide/${alternative.slug}` as Route}>{copy.alternative}</Link> : null}</dd></div>
        </dl>
        {route.childAgeStatus === "not-verified" ? <p className="mt-5 border-l-2 border-[#b88e43] pl-3 text-sm leading-6">{copy.age}</p> : null}
        <div className="mt-5 text-sm leading-6">
          <p className="font-semibold">{copy.sources}: <time dateTime={route.reviewedOn}>{date}</time></p>
          <ul className="mt-2 space-y-2">{route.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-block min-h-6 underline underline-offset-4">{source.label[locale]}</a></li>)}</ul>
          <p className="mt-3 text-[#586660]">{copy.sourceLimit}</p>
        </div>
      </details>
    </section>
  );
}

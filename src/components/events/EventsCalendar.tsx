"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { EventImage } from "@/components/events/EventImage";
import {
  eventCategoryLabels,
  eventDateStatusLabels,
  familySuitabilityLabels,
  getEventDateLabel,
  getEventTitle,
  monthFilterOptions,
  monthLabels,
  sourceStatusLabels,
  type RivieraEvent,
} from "@/content/riviera-events";
import type { Locale } from "@/i18n/locales";
import { bookingAttributionHref, bookingFunnelEvents, compactBookingAttributionProps, trackBookingFunnelEvent } from "@/lib/analytics";
import {
  eventDiscoveryHref,
  filterDiscoverableEvents,
  parseEventDiscoveryParams,
  type EventDiscoveryFilters,
  type EventDiscoveryLocation,
  type EventInterest,
} from "@/lib/event-discovery";
import { getEventDateStatus, type EventDateStatus } from "@/lib/events";

const quickPeriods: Array<{ id: EventDiscoveryFilters["period"]; label: Record<Locale, string> }> = [
  { id: "today", label: { en: "Today", fr: "Aujourd'hui", it: "Oggi", uk: "Сьогодні" } },
  { id: "tomorrow", label: { en: "Tomorrow", fr: "Demain", it: "Domani", uk: "Завтра" } },
  { id: "weekend", label: { en: "This weekend", fr: "Ce week-end", it: "Questo weekend", uk: "Ці вихідні" } },
  { id: "next7", label: { en: "Next 7 days", fr: "7 prochains jours", it: "Prossimi 7 giorni", uk: "Наступні 7 днів" } },
  { id: "next30", label: { en: "Next 30 days", fr: "30 prochains jours", it: "Prossimi 30 giorni", uk: "Наступні 30 днів" } },
];

const discoveryLocations: EventDiscoveryLocation[] = ["all", "menton", "monaco", "nice", "ventimiglia", "sanremo"];
const discoveryInterests: EventInterest[] = [
  "all",
  "festivals",
  "music",
  "culture",
  "family",
  "markets",
  "food-wine",
  "sports",
  "outdoors",
  "nightlife",
  "free",
  "family-friendly",
  "indoor",
  "outdoor",
  "rainy-day",
  "booking-recommended",
];

const copy = {
  en: {
    filters: "Find the right dates",
    whatsOn: "What's happening while you're here?",
    dateFilters: "Travel dates",
    chooseDates: "Choose dates",
    from: "From",
    to: "To",
    period: "Period",
    interest: "Interest",
    nearby: "Show seasonal highlights",
    official: "Official website",
    noResultsHelp: "Clear filters, widen the date range, show nearby cities or browse seasonal highlights below.",
    month: "Month",
    location: "Location",
    category: "Category",
    family: "Family suitability",
    city: "City",
    status: "Date status",
    radius: "Distance",
    within30: "Within 30 km",
    within60: "Within 60 km",
    lastChecked: "Last checked",
    all: "All",
    search: "Search events, places or interests",
    clear: "Clear filters",
    active: "Active filters",
    showing: "Showing",
    results: "event ideas",
    eventDetails: "Event details",
    availability: "Check availability",
    whyStay: "Why stay nearby",
    bookingTip: "Booking tip",
    timeline: "Month-by-month calendar",
    noResults: "No events match these filters yet.",
    noUpcoming: "No matching upcoming events. Try clearing filters or check the dates-to-confirm section.",
    datesPendingTitle: "Dates to confirm",
    datesPendingText:
      "These events are useful for planning, but exact dates or details should be checked with official sources before booking travel.",
    pastTitle: "Past events",
    showPast: "Show past events",
    hidePast: "Hide past events",
    current: "Current now",
    upcoming: "Upcoming",
    datesPending: "Dates to confirm",
    past: "Past event",
    familyTitle: "Family-friendly event ideas",
    familyText:
      "Choose daytime, colourful or low-pressure events for younger children. Monaco sports weekends can work better with older children who enjoy the theme.",
    sportsTitle: "Sports and prestige weekends",
    sportsText:
      "Monaco, Nice and the wider Riviera can become busy during major sport, yacht and prestige events. Menton gives a calmer seaside base.",
    calendarSelection: "Calendar selection",
    planningGuides: "Planning guides",
    seasonalRhythm: "Seasonal rhythm",
    families: "Families",
    rivieraCalendar: "Riviera calendar",
  },
  fr: {
    filters: "Trouver les bonnes dates",
    whatsOn: "Que se passe-t-il pendant votre sejour ?",
    dateFilters: "Dates de voyage",
    chooseDates: "Choisir dates",
    from: "Du",
    to: "Au",
    period: "Periode",
    interest: "Interet",
    nearby: "Afficher les temps forts saisonniers",
    official: "Site officiel",
    noResultsHelp: "Effacez les filtres, elargissez les dates, regardez les villes proches ou les temps forts saisonniers.",
    month: "Mois",
    location: "Lieu",
    category: "Categorie",
    family: "Adaptation famille",
    city: "Ville",
    status: "Statut date",
    radius: "Distance",
    within30: "Dans 30 km",
    within60: "Dans 60 km",
    lastChecked: "Derniere verification",
    all: "Tous",
    search: "Rechercher un evenement, lieu ou interet",
    clear: "Effacer filtres",
    active: "Filtres actifs",
    showing: "Affichage",
    results: "idees d'evenements",
    eventDetails: "Voir details",
    availability: "Verifier disponibilite",
    whyStay: "Pourquoi loger a proximite",
    bookingTip: "Conseil reservation",
    timeline: "Calendrier mois par mois",
    noResults: "Aucun evenement ne correspond a ces filtres.",
    noUpcoming: "Aucun evenement a venir ne correspond. Effacez les filtres ou consultez les dates a confirmer.",
    datesPendingTitle: "Dates a confirmer",
    datesPendingText:
      "Ces evenements sont utiles pour planifier, mais les dates ou details exacts doivent etre verifies aupres des sources officielles avant de reserver.",
    pastTitle: "Evenements passes",
    showPast: "Afficher evenements passes",
    hidePast: "Masquer evenements passes",
    current: "En cours",
    upcoming: "A venir",
    datesPending: "Dates a confirmer",
    past: "Evenement passe",
    familyTitle: "Idees d'evenements en famille",
    familyText:
      "Pour les enfants, privilegiez les evenements de jour, colores ou faciles. Les grands week-ends sportifs de Monaco conviennent mieux aux plus grands.",
    sportsTitle: "Week-ends sport et prestige",
    sportsText:
      "Monaco, Nice et la Riviera peuvent etre tres demandes pendant les grands evenements. Menton reste une base plus calme au bord de mer.",
    calendarSelection: "Selection du calendrier",
    planningGuides: "Guides de planification",
    seasonalRhythm: "Rythme saisonnier",
    families: "Familles",
    rivieraCalendar: "Calendrier Riviera",
  },
  it: {
    filters: "Trova le date giuste",
    whatsOn: "Cosa succede mentre sei qui?",
    dateFilters: "Date del viaggio",
    chooseDates: "Scegli date",
    from: "Da",
    to: "A",
    period: "Periodo",
    interest: "Interesse",
    nearby: "Mostra eventi stagionali",
    official: "Sito ufficiale",
    noResultsHelp: "Cancella i filtri, allarga le date, guarda le citta vicine o gli eventi stagionali.",
    month: "Mese",
    location: "Localita",
    category: "Categoria",
    family: "Adatto a famiglie",
    city: "Citta",
    status: "Stato date",
    radius: "Distanza",
    within30: "Entro 30 km",
    within60: "Entro 60 km",
    lastChecked: "Ultimo controllo",
    all: "Tutti",
    search: "Cerca eventi, luoghi o interessi",
    clear: "Cancella filtri",
    active: "Filtri attivi",
    showing: "Mostrati",
    results: "idee evento",
    eventDetails: "Dettagli evento",
    availability: "Controlla disponibilita",
    whyStay: "Perche restare vicino",
    bookingTip: "Consiglio prenotazione",
    timeline: "Calendario mese per mese",
    noResults: "Nessun evento corrisponde ai filtri.",
    noUpcoming: "Nessun evento futuro corrisponde. Cancella i filtri o controlla le date da confermare.",
    datesPendingTitle: "Date da confermare",
    datesPendingText:
      "Questi eventi sono utili per pianificare, ma date e dettagli esatti vanno verificati con fonti ufficiali prima di prenotare.",
    pastTitle: "Eventi passati",
    showPast: "Mostra eventi passati",
    hidePast: "Nascondi eventi passati",
    current: "In corso",
    upcoming: "In arrivo",
    datesPending: "Date da confermare",
    past: "Evento passato",
    familyTitle: "Idee per famiglie",
    familyText:
      "Per bambini piccoli scegli eventi diurni, colorati o facili. I weekend sportivi di Monaco sono migliori per ragazzi piu grandi.",
    sportsTitle: "Weekend sportivi e di prestigio",
    sportsText:
      "Monaco, Nizza e la Riviera sono piu richieste durante grandi eventi sportivi e nautici. Mentone resta una base piu calma sul mare.",
    calendarSelection: "Selezione calendario",
    planningGuides: "Guide di pianificazione",
    seasonalRhythm: "Ritmo stagionale",
    families: "Famiglie",
    rivieraCalendar: "Calendario Riviera",
  },
  uk: {
    filters: "Знайти правильні дати",
    whatsOn: "Що відбувається, поки ви тут?",
    dateFilters: "Дати подорожі",
    chooseDates: "Обрати дати",
    from: "З",
    to: "До",
    period: "Період",
    interest: "Інтерес",
    nearby: "Показати сезонні події",
    official: "Офіційний сайт",
    noResultsHelp: "Очистіть фільтри, розширте дати, перегляньте сусідні міста або сезонні події.",
    month: "Місяць",
    location: "Локація",
    category: "Категорія",
    family: "Для сімей",
    city: "Місто",
    status: "Статус дат",
    radius: "Відстань",
    within30: "До 30 км",
    within60: "До 60 км",
    lastChecked: "Остання перевірка",
    all: "Усі",
    search: "Шукати події, місця або інтереси",
    clear: "Очистити фільтри",
    active: "Активні фільтри",
    showing: "Показано",
    results: "ідей подій",
    eventDetails: "Деталі події",
    availability: "Перевірити доступність",
    whyStay: "Чому жити поруч",
    bookingTip: "Порада щодо бронювання",
    timeline: "Календар по місяцях",
    noResults: "За цими фільтрами подій немає.",
    noUpcoming: "Немає відповідних майбутніх подій. Очистіть фільтри або перегляньте дати для підтвердження.",
    datesPendingTitle: "Дати потрібно підтвердити",
    datesPendingText:
      "Ці події корисні для планування, але точні дати чи деталі варто перевірити в офіційних джерелах перед бронюванням подорожі.",
    pastTitle: "Минулі події",
    showPast: "Показати минулі події",
    hidePast: "Сховати минулі події",
    current: "Триває зараз",
    upcoming: "Майбутня подія",
    datesPending: "Дати підтверджуються",
    past: "Минула подія",
    familyTitle: "Ідеї подій для сімей",
    familyText:
      "Для молодших дітей краще обирати денні, яскраві та прості події. Спортивні вікенди Монако більше підходять старшим дітям.",
    sportsTitle: "Спортивні та престижні вікенди",
    sportsText:
      "Монако, Ніцца та Рив'єра стають завантаженими під час великих спортивних і яхтових подій. Ментон дає спокійнішу морську базу.",
    calendarSelection: "Вибір календаря",
    planningGuides: "Гіди для планування",
    seasonalRhythm: "Сезонний ритм",
    families: "Сім'ї",
    rivieraCalendar: "Календар Рив'єри",
  },
} satisfies Record<Locale, Record<string, string>>;

const discoveryLocationLabels: Record<Locale, Record<EventDiscoveryLocation, string>> = {
  en: { all: "All locations", menton: "Menton", monaco: "Monaco", nice: "Nice", ventimiglia: "Ventimiglia", sanremo: "Sanremo" },
  fr: { all: "Tous lieux", menton: "Menton", monaco: "Monaco", nice: "Nice", ventimiglia: "Vintimille", sanremo: "Sanremo" },
  it: { all: "Tutte le localita", menton: "Mentone", monaco: "Monaco", nice: "Nizza", ventimiglia: "Ventimiglia", sanremo: "Sanremo" },
  uk: { all: "Усі локації", menton: "Ментон", monaco: "Монако", nice: "Ніцца", ventimiglia: "Вентімілья", sanremo: "Санремо" },
};

const interestLabels: Record<Locale, Record<EventInterest, string>> = {
  en: {
    all: "All interests",
    festivals: "Festivals",
    music: "Music",
    culture: "Culture",
    family: "Family",
    markets: "Markets",
    "food-wine": "Food & Wine",
    sports: "Sports",
    outdoors: "Outdoors",
    nightlife: "Nightlife",
    free: "Free",
    "family-friendly": "Family-friendly",
    indoor: "Indoor",
    outdoor: "Outdoor",
    "rainy-day": "Rainy-day",
    "booking-recommended": "Booking recommended",
  },
  fr: {
    all: "Tous interets",
    festivals: "Festivals",
    music: "Musique",
    culture: "Culture",
    family: "Famille",
    markets: "Marches",
    "food-wine": "Cuisine & vin",
    sports: "Sports",
    outdoors: "Plein air",
    nightlife: "Soiree",
    free: "Gratuit",
    "family-friendly": "Famille",
    indoor: "Interieur",
    outdoor: "Exterieur",
    "rainy-day": "Jour de pluie",
    "booking-recommended": "Reservation conseillee",
  },
  it: {
    all: "Tutti interessi",
    festivals: "Festival",
    music: "Musica",
    culture: "Cultura",
    family: "Famiglia",
    markets: "Mercati",
    "food-wine": "Cibo e vino",
    sports: "Sport",
    outdoors: "Outdoor",
    nightlife: "Sera",
    free: "Gratis",
    "family-friendly": "Famiglie",
    indoor: "Al coperto",
    outdoor: "All'aperto",
    "rainy-day": "Pioggia",
    "booking-recommended": "Prenotazione consigliata",
  },
  uk: {
    all: "Усі інтереси",
    festivals: "Фестивалі",
    music: "Музика",
    culture: "Культура",
    family: "Сім'я",
    markets: "Ринки",
    "food-wine": "Їжа й вино",
    sports: "Спорт",
    outdoors: "На відкритому повітрі",
    nightlife: "Вечір",
    free: "Безкоштовно",
    "family-friendly": "Для сімей",
    indoor: "У приміщенні",
    outdoor: "Надворі",
    "rainy-day": "На дощ",
    "booking-recommended": "Бронювання бажане",
  },
};

type TimelineGroup = Exclude<(typeof monthFilterOptions)[number], "all">;

const timelineIntro = {
  en: {
    "2026-06": "Early summer starts strongly with Monaco, Nice culture and sport.",
    "2026-07": "July is music, sport, Monaco evenings and classic Riviera energy.",
    "2026-08": "Late summer brings cycling, beaches and high-season planning pressure.",
    "2026-09": "September is useful for Monaco prestige weekends and art trips.",
    "2026-10": "October is a flexible culture and exhibition month while programmes firm up.",
    "2026-11": "Autumn sports weekends can make the coast attractive beyond beach season.",
    "2026-12": "Winter is calmer, lighter and more local.",
    "2027-01": "January works for quiet seaside stays before the winter festivals.",
    "winter-highlights": "February and early March are the big family-friendly winter highlights.",
    "2027-03": "March is for spring culture, Italy day trips and race calendars to watch.",
    "2027-04": "April brings strong book-ahead sport around Monaco.",
    "2027-05": "May is a compact Monaco event month before peak summer.",
    "2027-06": "June is the key Formula 1 planning month for Monaco stays.",
  },
  fr: {
    "2026-06": "Le debut d'ete commence fort avec Monaco, Nice, culture et sport.",
    "2026-07": "Juillet concentre musique, sport, soirees a Monaco et energie Riviera.",
    "2026-08": "La fin d'ete melange cyclisme, plages et forte demande.",
    "2026-09": "Septembre est utile pour Monaco, art et week-ends prestige.",
    "2026-10": "Octobre reste flexible pour les expositions et la culture.",
    "2026-11": "Les week-ends sportifs d'automne prolongent l'interet de la cote.",
    "2026-12": "L'hiver est plus calme, lumineux et local.",
    "2027-01": "Janvier convient aux sejours tranquilles avant les festivals d'hiver.",
    "winter-highlights": "Fevrier et debut mars concentrent les grands temps forts familiaux.",
    "2027-03": "Mars mele culture de printemps, Italie et calendriers sportifs a suivre.",
    "2027-04": "Avril apporte un grand temps fort sportif autour de Monaco.",
    "2027-05": "Mai concentre des evenements monégasques avant le plein ete.",
    "2027-06": "Juin est le mois cle pour planifier la Formule 1 a Monaco.",
  },
  it: {
    "2026-06": "L'inizio estate parte forte con Monaco, Nizza, cultura e sport.",
    "2026-07": "Luglio porta musica, sport, serate a Monaco ed energia Riviera.",
    "2026-08": "Fine estate significa ciclismo, spiagge e molta domanda.",
    "2026-09": "Settembre e adatto a Monaco, arte e weekend di prestigio.",
    "2026-10": "Ottobre resta flessibile per mostre e cultura.",
    "2026-11": "I weekend sportivi autunnali tengono viva la costa.",
    "2026-12": "L'inverno e piu calmo, luminoso e locale.",
    "2027-01": "Gennaio e ideale per soggiorni tranquilli prima dei festival invernali.",
    "winter-highlights": "Febbraio e inizio marzo portano i grandi eventi invernali per famiglie.",
    "2027-03": "Marzo combina cultura di primavera, Italia e calendari sportivi da seguire.",
    "2027-04": "Aprile porta un grande appuntamento sportivo intorno a Monaco.",
    "2027-05": "Maggio concentra eventi monegaschi prima dell'estate piena.",
    "2027-06": "Giugno e il mese chiave per pianificare la Formula 1 a Monaco.",
  },
  uk: {
    "2026-06": "Початок літа сильний: Монако, Ніцца, культура і спорт.",
    "2026-07": "Липень - музика, спорт, вечори в Монако і енергія Рив'єри.",
    "2026-08": "Кінець літа приносить велоспорт, пляжі та високий попит.",
    "2026-09": "Вересень підходить для Монако, мистецтва та престижних вікендів.",
    "2026-10": "Жовтень гнучкий для виставок і культури.",
    "2026-11": "Осінні спортивні вікенди продовжують інтерес до узбережжя.",
    "2026-12": "Зима спокійніша, світліша і більш місцева.",
    "2027-01": "Січень підходить для тихого морського перебування перед зимовими фестивалями.",
    "winter-highlights": "Лютий і початок березня - головні зимові сімейні події.",
    "2027-03": "Березень поєднує весняну культуру, Італію й спортивні календарі для перевірки.",
    "2027-04": "Квітень приносить сильну спортивну подію біля Монако.",
    "2027-05": "Травень концентрує події Монако перед піком літа.",
    "2027-06": "Червень - ключовий місяць для планування Формули-1 у Монако.",
  },
} satisfies Record<Locale, Record<TimelineGroup, string>>;

function eventHref(locale: Locale, event: RivieraEvent) {
  return `/${locale}/events/${event.slug}` as Route;
}

function statusLabel(locale: Locale, status: EventDateStatus) {
  if (status === "current") return copy[locale].current;
  if (status === "past") return copy[locale].past;
  if (status === "dates_pending") return eventDateStatusLabels[locale].dates_pending;
  if (status === "estimated_annual_window") return eventDateStatusLabels[locale].estimated_annual_window;
  return copy[locale].upcoming;
}

function Badge({ children, tone = "light" }: { children: React.ReactNode; tone?: "light" | "gold" | "blue" | "dark" }) {
  const className =
    tone === "gold"
      ? "border-[#d2a748] bg-[#fff5d8] text-[#7b5515]"
      : tone === "blue"
        ? "border-[#9ac7d2] bg-[#edf8fb] text-[#245d6a]"
        : tone === "dark"
          ? "border-[#2b5a50] bg-[#173f36] text-white"
        : "border-[#dfd4c1] bg-[#fffdf8] text-[#4f5b57]";

  return (
    <span className={`inline-flex items-center border px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.12em] ${className}`}>
      {children}
    </span>
  );
}

function EventCard({ event, locale, status, compact = false }: { event: RivieraEvent; locale: Locale; status: EventDateStatus; compact?: boolean }) {
  const hasDetail = event.detailPage || event.slug === "summer-on-the-riviera";
  const statusTone = status === "current" ? "dark" : status === "dates_pending" || status === "past" ? "gold" : "blue";
  const title = getEventTitle(event, locale);
  const dateLabel = getEventDateLabel(event, locale);
  const officialHref = event.programmeUrl ?? event.ticketsUrl ?? event.sourceUrl;

  return (
    <article className={`group grid overflow-hidden border border-[#dfd4c1] bg-[#fffdf8] transition hover:border-[#c6a66a] ${compact ? "md:grid-cols-[0.34fr_1fr]" : "lg:grid-cols-[0.42fr_1fr]"}`}>
      <EventImage
        event={event}
        locale={locale}
        className={`${compact ? "min-h-40" : "min-h-56"} border-0 border-b lg:border-b-0 lg:border-r`}
        sizes={compact ? "(min-width: 1024px) 22vw, 92vw" : "(min-width: 1024px) 34vw, 92vw"}
      />
      <div className="flex flex-col p-4 sm:p-5">
        <div className="flex flex-wrap gap-2">
          <Badge tone={statusTone}>{statusLabel(locale, status)}</Badge>
          <Badge tone="blue">{event.location}</Badge>
          {event.city && event.city !== event.location ? <Badge>{event.city}</Badge> : null}
          <Badge tone="gold">{dateLabel}</Badge>
          {event.distanceFromMentonKm !== undefined ? <Badge>{event.distanceFromMentonKm} km</Badge> : null}
          <Badge>{familySuitabilityLabels[locale][event.familySuitability]}</Badge>
        </div>
        <h3 className={`${compact ? "text-2xl" : "text-3xl sm:text-4xl"} serif-heading mt-4 break-words leading-[0.98] text-[#173f36]`}>
          {hasDetail ? <Link href={eventHref(locale, event)}>{title}</Link> : title}
        </h3>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#5f574c]">{event.shortDescription[locale]}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {event.category.slice(0, 3).map((category) => (
            <Badge key={category}>{eventCategoryLabels[locale][category]}</Badge>
          ))}
          <Badge tone={event.sourceStatus === "verified" ? "blue" : "gold"}>
            {sourceStatusLabels[locale][event.sourceStatus]}
          </Badge>
          {event.lastChecked ? <Badge>{copy[locale].lastChecked}: {event.lastChecked}</Badge> : null}
        </div>
        <div className="mt-4 grid gap-2 border-t border-[#dfd4c1] pt-4 text-sm leading-6">
          <p className="line-clamp-2 font-serif text-base italic leading-6 text-[#315d53]">
            {event.whyShowOnSite[locale]}
          </p>
          {!compact ? (
            <p>
              <span className="font-bold text-[#173f36]">{copy[locale].bookingTip}: </span>
              <span className="text-[#5f574c]">{event.bookingTip[locale]}</span>
            </p>
          ) : null}
        </div>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          {hasDetail ? (
            <TrackedLink
              eventName={bookingFunnelEvents.eventOpened}
              href={eventHref(locale, event)}
              props={{ locale, eventSlug: event.slug, eventCity: event.city ?? event.location }}
              className="inline-flex min-h-10 items-center justify-center border border-[#c6a66a] px-3 py-2 text-[0.66rem] font-bold uppercase tracking-[0.14em] text-[#173f36] hover:bg-[#f3ead7]"
            >
              {copy[locale].eventDetails}
            </TrackedLink>
          ) : null}
          {officialHref ? (
            <TrackedLink
              eventName={bookingFunnelEvents.officialEventLinkClick}
              href={officialHref}
              target="_blank"
              props={{ locale, eventSlug: event.slug, eventCity: event.city ?? event.location }}
              className="inline-flex min-h-10 items-center justify-center border border-[#dfd4c1] px-3 py-2 text-[0.66rem] font-bold uppercase tracking-[0.14em] text-[#173f36] hover:bg-[#f3ead7]"
            >
              {copy[locale].official}
            </TrackedLink>
          ) : null}
          <TrackedLink
            eventName={bookingFunnelEvents.eventCtaClick}
            href={bookingAttributionHref(locale, {
              sourcePageType: "event",
              sourceSlug: event.slug,
              sourceEventSlug: event.slug,
            })}
            props={{
              locale,
              ...compactBookingAttributionProps({
                sourcePageType: "event",
                sourceSlug: event.slug,
                sourceEventSlug: event.slug,
              }),
            }}
            className="inline-flex min-h-10 items-center justify-center border border-[#173f36] bg-[#173f36] px-3 py-2 text-[0.66rem] font-bold uppercase tracking-[0.14em] text-white hover:bg-[#102f28]"
          >
            {copy[locale].availability}
          </TrackedLink>
        </div>
      </div>
    </article>
  );
}

type EventsCalendarProps = {
  events: RivieraEvent[];
  datesPendingEvents: RivieraEvent[];
  pastEvents: RivieraEvent[];
  locale: Locale;
};

export function EventsCalendar({ events, datesPendingEvents, pastEvents, locale }: EventsCalendarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [showPast, setShowPast] = useState(false);
  const labels = copy[locale];
  const filterSignature = searchParams.toString();
  const filters = parseEventDiscoveryParams(new URLSearchParams(searchParams.toString()));
  const currentHref = eventDiscoveryHref(pathname, filters);

  const filtered = useMemo(
    () => filterDiscoverableEvents(events, filters),
    [events, filters],
  );

  const filteredDatesPending = useMemo(
    () =>
      datesPendingEvents
        .filter((event) => filters.location === "all" || `${event.city ?? ""} ${event.location}`.toLowerCase().includes(filters.location))
        .filter((event) => filters.interest === "all" || filterDiscoverableEvents([event], { ...filters, period: "next30" }).length || event.category.join(" ").includes(filters.interest))
        .slice(0, 12),
    [datesPendingEvents, filters],
  );

  const filteredPast = useMemo(
    () => (showPast ? filterDiscoverableEvents(pastEvents, filters) : []),
    [filters, pastEvents, showPast],
  );

  useEffect(() => {
    if (!isPending && filtered.length === 0) {
      trackBookingFunnelEvent(bookingFunnelEvents.noEventResultsShown, {
        locale,
        period: filters.period,
        location: filters.location,
        interest: filters.interest,
        query: filters.query,
      });
    }
  }, [filterSignature, filtered.length, filters.interest, filters.location, filters.period, filters.query, isPending, locale]);

  const grouped = useMemo(
    () =>
      monthFilterOptions
        .filter((item) => item !== "all")
        .map((item) => ({
          id: item,
          events: [...filtered, ...filteredDatesPending].filter((event) => event.monthGroup === item),
        }))
        .filter((group) => group.events.length),
    [filtered, filteredDatesPending],
  );

  const activeFilters = [
    filters.period !== "next30" ? quickPeriods.find((period) => period.id === filters.period)?.label[locale] : null,
    filters.from && filters.to ? `${filters.from} - ${filters.to}` : null,
    filters.location !== "all" ? discoveryLocationLabels[locale][filters.location] : null,
    filters.interest !== "all" ? interestLabels[locale][filters.interest] : null,
    filters.query ? filters.query : null,
  ].filter(Boolean) as string[];

  const setFilters = (next: Partial<EventDiscoveryFilters>) => {
    const merged = { ...filters, ...next };
    const href = eventDiscoveryHref(pathname, merged);
    trackBookingFunnelEvent(bookingFunnelEvents.eventsFilterUsed, {
      locale,
      period: merged.period,
      location: merged.location,
      interest: merged.interest,
      customRange: Boolean(merged.from && merged.to),
    });
    startTransition(() => router.replace(href, { scroll: false }));
  };

  const familyHighlights = [...events, ...datesPendingEvents].filter((event) =>
    ["menton-lemon-festival-2027", "nice-carnival-2027", "menton-music-festival-2026", "monaco-grand-prix-2027"].includes(event.id),
  );

  const sportsPrestige = [...events, ...datesPendingEvents].filter((event) =>
    [
      "monaco-grand-prix-2027",
      "rolex-monte-carlo-masters-2027",
      "monaco-e-prix-2027",
      "monaco-run-2027",
      "nice-half-marathon-2027",
      "new-vision-nice-open-2026",
      "jumping-international-monte-carlo-2026",
      "meeting-herculis-ebs-2026",
      "la-vuelta-monaco-start-2026",
      "tour-de-france-femmes-nice-finish-2026",
      "nice-cannes-marathon-2026",
      "monaco-yacht-show-2026",
    ].includes(event.id),
  );

  return (
    <div className="grid gap-9">
      <section className="border border-[#dfd4c1] bg-[#fffdf8] p-4 shadow-[0_18px_60px_rgba(23,63,54,0.06)] sm:p-5" aria-label={labels.filters}>
        <div className="grid gap-4 border-b border-[#dfd4c1] pb-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="editorial-label">{labels.dateFilters}</p>
            <h2 className="serif-heading mt-2 text-3xl leading-none text-[#173f36] sm:text-4xl">{labels.whatsOn}</h2>
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            {quickPeriods.map((period) => {
              const selected = filters.period === period.id;
              return (
                <button
                  key={period.id}
                  type="button"
                  onClick={() => setFilters({ period: period.id, from: undefined, to: undefined })}
                  className={`min-h-10 border px-3 py-2 text-[0.64rem] font-bold uppercase tracking-[0.13em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b6f8f] ${
                    selected ? "border-[#173f36] bg-[#173f36] text-white" : "border-[#dfd4c1] bg-[#fffaf0] text-[#173f36] hover:border-[#c6a66a]"
                  }`}
                  aria-pressed={selected}
                >
                  {period.label[locale]}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-[0.75fr_0.75fr_1fr]">
          <div className="grid grid-cols-2 gap-2">
            <label className="grid gap-1 text-xs font-bold uppercase tracking-[0.14em] text-[#173f36]">
              {labels.from}
              <input
                className="min-h-11 border border-[#dfd4c1] bg-[#fffdf8] px-3 text-sm text-[#173f36] outline-none focus:border-[#0b6f8f] focus:ring-2 focus:ring-[#0b6f8f]/10"
                type="date"
                value={filters.from ?? ""}
                onChange={(event) => setFilters({ period: "custom", from: event.target.value || undefined })}
              />
            </label>
            <label className="grid gap-1 text-xs font-bold uppercase tracking-[0.14em] text-[#173f36]">
              {labels.to}
              <input
                className="min-h-11 border border-[#dfd4c1] bg-[#fffdf8] px-3 text-sm text-[#173f36] outline-none focus:border-[#0b6f8f] focus:ring-2 focus:ring-[#0b6f8f]/10"
                type="date"
                value={filters.to ?? ""}
                onChange={(event) => {
                  trackBookingFunnelEvent(bookingFunnelEvents.customStayDatesSelected, { locale, from: filters.from ?? "", to: event.target.value });
                  setFilters({ period: "custom", to: event.target.value || undefined });
                }}
              />
            </label>
          </div>
          <label className="grid gap-1 text-xs font-bold uppercase tracking-[0.14em] text-[#173f36]">
            {labels.location}
            <select
              className="min-h-11 border border-[#dfd4c1] bg-[#fffdf8] px-3 text-sm text-[#173f36] outline-none focus:border-[#0b6f8f] focus:ring-2 focus:ring-[#0b6f8f]/10"
              value={filters.location}
              onChange={(event) => setFilters({ location: event.target.value as EventDiscoveryLocation })}
            >
              {discoveryLocations.map((option) => (
                <option key={option} value={option}>{discoveryLocationLabels[locale][option]}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-1 text-xs font-bold uppercase tracking-[0.14em] text-[#173f36]">
            {labels.interest}
            <select
              className="min-h-11 border border-[#dfd4c1] bg-[#fffdf8] px-3 text-sm text-[#173f36] outline-none focus:border-[#0b6f8f] focus:ring-2 focus:ring-[#0b6f8f]/10"
              value={filters.interest}
              onChange={(event) => setFilters({ interest: event.target.value as EventInterest })}
            >
              {discoveryInterests.map((option) => (
                <option key={option} value={option}>{interestLabels[locale][option]}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-[1fr_auto_auto] md:items-center">
          <input
            className="min-h-11 w-full border border-[#dfd4c1] bg-[#fffdf8] px-4 text-sm outline-none transition placeholder:text-[#8a8072] focus:border-[#0b6f8f] focus:ring-2 focus:ring-[#0b6f8f]/10"
            defaultValue={filters.query}
            onBlur={(event) => setFilters({ query: event.target.value })}
            onKeyDown={(event) => {
              if (event.key === "Enter") setFilters({ query: event.currentTarget.value });
            }}
            placeholder={labels.search}
            type="search"
          />
          <Link
            href={currentHref as Route}
            className="inline-flex min-h-11 items-center justify-center border border-[#dfd4c1] px-4 text-xs font-bold uppercase tracking-[0.14em] text-[#173f36]"
            aria-live="polite"
          >
            {labels.showing} {filtered.length}
          </Link>
          <button
            type="button"
            onClick={() => setFilters({ period: "next30", from: undefined, to: undefined, location: "all", interest: "all", query: "" })}
            disabled={isPending}
            className="min-h-11 border border-[#173f36] px-4 text-xs font-bold uppercase tracking-[0.14em] text-[#173f36] transition hover:bg-[#173f36] hover:text-white"
          >
            {labels.clear}
          </button>
        </div>
        {pastEvents.length ? (
          <button
            type="button"
            onClick={() => setShowPast((value) => !value)}
            className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-[#0b6f8f] underline-offset-4 hover:underline"
          >
            {showPast ? labels.hidePast : labels.showPast}
          </button>
        ) : null}
        {activeFilters.length ? (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#6b5f50]">{labels.active}</span>
            {activeFilters.map((filter) => (
              <Badge key={filter} tone="dark">{filter}</Badge>
            ))}
          </div>
        ) : null}
      </section>

      <section aria-label={labels.results}>
        <div className="flex flex-col gap-3 border-b border-[#dfd4c1] pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="editorial-label">{labels.calendarSelection}</p>
            <h2 className="serif-heading mt-2 text-3xl text-[#173f36]">{filtered.length} {labels.results}</h2>
          </div>
        </div>
        {filtered.length ? (
          <div className="mt-5 grid gap-4 xl:grid-cols-2">
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} locale={locale} status={getEventDateStatus(event)} compact />
            ))}
          </div>
        ) : (
          <div className="mt-8 border border-[#dfd4c1] bg-[#fffdf8] p-6 text-[#5f574c]">
            <p className="serif-heading text-3xl leading-none text-[#173f36]">{labels.noResults}</p>
            <p className="mt-3 text-sm leading-7">{labels.noResultsHelp}</p>
          </div>
        )}
      </section>

      {filteredDatesPending.length ? (
        <section aria-labelledby="events-dates-pending" className="border-y border-[#dfd4c1] py-6">
          <div className="grid gap-5 md:grid-cols-[0.36fr_1fr] md:items-end">
            <div>
              <p className="editorial-label">{labels.planningGuides}</p>
              <h2 id="events-dates-pending" className="serif-heading mt-2 text-3xl text-[#173f36]">
                {labels.datesPendingTitle}
              </h2>
            </div>
            <p className="max-w-3xl text-sm leading-7 text-[#5f574c]">{labels.datesPendingText}</p>
          </div>
          <div className="mt-5 grid gap-4 xl:grid-cols-2">
            {filteredDatesPending.map((event) => (
              <EventCard key={event.id} event={event} locale={locale} status="dates_pending" compact />
            ))}
          </div>
        </section>
      ) : null}

      {showPast && filteredPast.length ? (
        <section aria-labelledby="events-past" className="border-y border-[#dfd4c1] py-8">
          <div className="border-b border-[#dfd4c1] pb-5">
            <p className="editorial-label">Archive</p>
            <h2 id="events-past" className="serif-heading mt-2 text-3xl text-[#173f36] sm:text-4xl">
              {labels.pastTitle}
            </h2>
          </div>
          <div className="mt-8 grid gap-5 opacity-85 xl:grid-cols-2">
            {filteredPast.map((event) => (
              <EventCard key={event.id} event={event} locale={locale} status="past" compact />
            ))}
          </div>
        </section>
      ) : null}

      <section aria-labelledby="events-timeline">
        <div className="border-b border-[#dfd4c1] pb-5">
          <p className="editorial-label">{labels.seasonalRhythm}</p>
          <h2 id="events-timeline" className="serif-heading mt-2 text-3xl text-[#173f36]">{labels.timeline}</h2>
        </div>
        <div className="mt-6 grid gap-0">
          {grouped.map((group) => (
            <div key={group.id} className="relative grid gap-4 border-l border-[#dfd4c1] pb-7 pl-5 last:pb-0 md:grid-cols-[0.28fr_1fr] md:pl-7">
              <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-[#b07820]" aria-hidden="true" />
              <div className="md:pr-8">
                <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#b07820]">
                  {monthLabels[locale][group.id]}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#5f574c]">{timelineIntro[locale][group.id]}</p>
              </div>
              <div className="grid gap-3">
                {group.events.map((event) => (
                  <Link
                    key={event.id}
                    href={event.detailPage ? eventHref(locale, event) : (`/${locale}/events` as Route)}
                    className="grid overflow-hidden border border-[#dfd4c1] bg-[#fffdf8] opacity-95 transition hover:border-[#c6a66a] sm:grid-cols-[7.5rem_1fr] md:grid-cols-[8rem_1fr_0.2fr]"
                  >
                    <EventImage event={event} locale={locale} className="min-h-28 border-0 border-b sm:border-b-0 sm:border-r" sizes="140px" />
                    <span className="grid gap-1.5 p-3">
                      <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#b07820]">{getEventDateLabel(event, locale)}</span>
                      <span className="serif-heading text-2xl leading-none text-[#173f36]">{getEventTitle(event, locale)}</span>
                      <span className="line-clamp-2 text-sm leading-6 text-[#5f574c]">{event.shortDescription[locale]}</span>
                    </span>
                    <span className="flex items-end p-4 text-xs font-bold uppercase tracking-[0.12em] text-[#0b6f8f]">{event.location}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border border-[#d9bf81] bg-[#fff3df] p-5">
          <p className="editorial-label text-[#d9b66b]">{labels.families}</p>
          <h2 className="serif-heading mt-3 text-3xl text-[#173f36]">{labels.familyTitle}</h2>
          <p className="mt-4 text-sm leading-7 text-[#5f574c]">{labels.familyText}</p>
          <div className="mt-5 grid gap-3">
            {familyHighlights.map((event) => (
              <Link
                key={event.id}
                href={event.detailPage ? eventHref(locale, event) : (`/${locale}/events` as Route)}
                className="grid overflow-hidden border border-[#e1c88d] bg-[#fffaf0] sm:grid-cols-[7.5rem_1fr]"
              >
                <EventImage event={event} locale={locale} className="min-h-24 border-0 border-b sm:border-b-0 sm:border-r" sizes="120px" />
                <span className="grid gap-1 p-3">
                  <span className="text-[0.64rem] font-bold uppercase tracking-[0.14em] text-[#b07820]">
                    {familySuitabilityLabels[locale][event.familySuitability]}
                  </span>
                  <span className="serif-heading break-words text-2xl leading-none text-[#173f36]">{getEventTitle(event, locale)}</span>
                  <span className="text-sm text-[#5f574c]">{getEventDateLabel(event, locale)}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div className="border border-[#dfd4c1] bg-[#173f36] p-5 text-white">
          <p className="editorial-label">{labels.rivieraCalendar}</p>
          <h2 className="serif-heading mt-3 text-3xl">{labels.sportsTitle}</h2>
          <p className="mt-4 text-sm leading-7 text-white/75">{labels.sportsText}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {sportsPrestige.map((event) => (
              <Link
                key={event.id}
                href={event.detailPage ? eventHref(locale, event) : (`/${locale}/events` as Route)}
                className="grid overflow-hidden border border-white/15 bg-white/[0.03] transition hover:border-[#d9b66b] sm:grid-cols-[6rem_1fr]"
              >
                <EventImage event={event} locale={locale} className="min-h-24 border-0 border-b border-white/15 sm:border-b-0 sm:border-r" sizes="110px" />
                <span className="p-3">
                  <span className="text-[0.64rem] font-bold uppercase tracking-[0.14em] text-[#d9b66b]">{event.location}</span>
                  <span className="mt-1 block text-sm font-semibold leading-5">{getEventTitle(event, locale)}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

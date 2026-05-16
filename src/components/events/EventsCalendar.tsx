"use client";

import Link from "next/link";
import type { Route } from "next";
import { useMemo, useState } from "react";
import {
  eventCategoryLabels,
  familySuitabilityLabels,
  monthFilterOptions,
  monthLabels,
  sourceStatusLabels,
  type EventCategory,
  type EventLocation,
  type FamilySuitability,
  type MonthFilter,
  type RivieraEvent,
} from "@/content/riviera-events";
import type { Locale } from "@/i18n/locales";
import { getEventDateStatus, type EventDateStatus } from "@/lib/events";

const locations: Array<"all" | EventLocation> = [
  "all",
  "Menton",
  "Monaco",
  "Nice",
  "French Riviera",
  "Italian Riviera",
];

const categories: Array<"all" | EventCategory> = [
  "all",
  "music",
  "sport",
  "art",
  "family",
  "prestige",
  "food-local",
  "maritime",
  "theatre",
  "exhibition",
];

const familyOptions: Array<"all" | FamilySuitability> = [
  "all",
  "recommended_with_children",
  "good_with_older_children",
  "mostly_adults",
  "depends",
];

const copy = {
  en: {
    filters: "Find the right dates",
    month: "Month",
    location: "Location",
    category: "Category",
    family: "Family suitability",
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
  },
  fr: {
    filters: "Trouver les bonnes dates",
    month: "Mois",
    location: "Lieu",
    category: "Categorie",
    family: "Adaptation famille",
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
  },
  it: {
    filters: "Trova le date giuste",
    month: "Mese",
    location: "Localita",
    category: "Categoria",
    family: "Adatto a famiglie",
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
  },
  uk: {
    filters: "Знайти правильні дати",
    month: "Місяць",
    location: "Локація",
    category: "Категорія",
    family: "Для сімей",
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
  },
} satisfies Record<Locale, Record<string, string>>;

type TimelineGroup = Exclude<MonthFilter, "all">;

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
  },
} satisfies Record<Locale, Record<TimelineGroup, string>>;

function includesSearch(event: RivieraEvent, locale: Locale, query: string) {
  if (!query) return true;

  const haystack = [
    event.title,
    event.location,
    event.dateLabel,
    event.shortDescription[locale],
    event.whyShowOnSite[locale],
    event.audience.join(" "),
    event.category.join(" "),
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query.toLowerCase());
}

function eventHref(locale: Locale, event: RivieraEvent) {
  return `/${locale}/events/${event.slug}` as Route;
}

function statusLabel(locale: Locale, status: EventDateStatus) {
  if (status === "current") return copy[locale].current;
  if (status === "past") return copy[locale].past;
  if (status === "dates_pending") return copy[locale].datesPending;
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
    <span className={`inline-flex items-center border px-2.5 py-1 text-[0.64rem] font-bold uppercase tracking-[0.12em] ${className}`}>
      {children}
    </span>
  );
}

function EventCard({ event, locale, status }: { event: RivieraEvent; locale: Locale; status: EventDateStatus }) {
  const hasDetail = event.detailPage || event.slug === "summer-on-the-riviera";
  const statusTone = status === "current" ? "dark" : status === "dates_pending" || status === "past" ? "gold" : "blue";

  return (
    <article className="group grid border-t border-[#dfd4c1] bg-[#fffdf8]/82 transition md:grid-cols-[0.28fr_1fr]">
      <div className="border-b border-[#dfd4c1] bg-[#f6efe3] p-5 md:border-b-0 md:border-r">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#b07820]">{event.location}</p>
        <p className="mt-4 max-w-36 text-2xl font-semibold leading-tight text-[#173f36]">{event.dateLabel}</p>
      </div>
      <div className="flex flex-col p-5">
        <div className="flex flex-wrap gap-2">
          <Badge tone={statusTone}>{statusLabel(locale, status)}</Badge>
          <Badge tone="blue">{event.location}</Badge>
          {event.category.slice(0, 3).map((category) => (
            <Badge key={category}>{eventCategoryLabels[locale][category]}</Badge>
          ))}
          <Badge>{familySuitabilityLabels[locale][event.familySuitability]}</Badge>
          <Badge tone={event.sourceStatus === "verified" ? "blue" : "gold"}>
            {sourceStatusLabels[locale][event.sourceStatus]}
          </Badge>
        </div>
        <h3 className="serif-heading mt-4 break-words text-3xl leading-[0.98] text-[#173f36] sm:text-4xl sm:leading-[0.95]">
          {hasDetail ? <Link href={eventHref(locale, event)}>{event.title}</Link> : event.title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-[#5f574c]">{event.shortDescription[locale]}</p>
        <div className="mt-5 grid gap-4 border-t border-[#dfd4c1] pt-5 text-sm leading-6">
          <p className="font-serif text-lg italic leading-7 text-[#315d53]">
            {event.whyShowOnSite[locale]}
          </p>
          <p>
            <span className="font-bold text-[#173f36]">{copy[locale].bookingTip}: </span>
            <span className="text-[#5f574c]">{event.bookingTip[locale]}</span>
          </p>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {hasDetail ? (
            <Link
              href={eventHref(locale, event)}
              className="inline-flex min-h-11 items-center justify-center border border-[#c6a66a] px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#173f36] hover:bg-[#f3ead7]"
            >
              {copy[locale].eventDetails}
            </Link>
          ) : null}
          <Link
            href={`/${locale}/check-availability` as Route}
            className="inline-flex min-h-11 items-center justify-center border border-[#173f36] bg-[#173f36] px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white hover:bg-[#102f28]"
          >
            {copy[locale].availability}
          </Link>
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

function filterEvents(events: RivieraEvent[], locale: Locale, filters: {
  month: MonthFilter;
  location: (typeof locations)[number];
  category: (typeof categories)[number];
  family: (typeof familyOptions)[number];
  query: string;
}) {
  return events.filter((event) => {
    const monthMatch = filters.month === "all" || event.monthGroup === filters.month;
    const locationMatch = filters.location === "all" || event.location === filters.location;
    const categoryMatch = filters.category === "all" || event.category.includes(filters.category);
    const familyMatch = filters.family === "all" || event.familySuitability === filters.family;

    return (
      monthMatch &&
      locationMatch &&
      categoryMatch &&
      familyMatch &&
      includesSearch(event, locale, filters.query.trim())
    );
  });
}

export function EventsCalendar({ events, datesPendingEvents, pastEvents, locale }: EventsCalendarProps) {
  const [month, setMonth] = useState<MonthFilter>("all");
  const [location, setLocation] = useState<(typeof locations)[number]>("all");
  const [category, setCategory] = useState<(typeof categories)[number]>("all");
  const [family, setFamily] = useState<(typeof familyOptions)[number]>("all");
  const [query, setQuery] = useState("");
  const [showPast, setShowPast] = useState(false);
  const labels = copy[locale];
  const selectClass =
    "min-h-11 w-full border border-[#dfd4c1] bg-[#fffdf8] px-3 text-sm text-[#173f36] outline-none transition focus:border-[#0b6f8f] focus:ring-2 focus:ring-[#0b6f8f]/10";
  const filters = useMemo(
    () => ({ month, location, category, family, query }),
    [category, family, location, month, query],
  );

  const filtered = useMemo(
    () => filterEvents(events, locale, filters),
    [events, filters, locale],
  );

  const filteredDatesPending = useMemo(
    () => filterEvents(datesPendingEvents, locale, filters),
    [datesPendingEvents, filters, locale],
  );

  const filteredPast = useMemo(
    () => (showPast ? filterEvents(pastEvents, locale, filters) : []),
    [filters, locale, pastEvents, showPast],
  );

  const grouped = useMemo(
    () =>
      monthFilterOptions
        .filter((item) => item !== "all")
        .map((item) => ({
          id: item,
          events: filtered.filter((event) => event.monthGroup === item),
        }))
        .filter((group) => group.events.length),
    [filtered],
  );

  const activeFilters = [
    month !== "all" ? monthLabels[locale][month] : null,
    location !== "all" ? location : null,
    category !== "all" ? eventCategoryLabels[locale][category] : null,
    family !== "all" ? familySuitabilityLabels[locale][family] : null,
    query.trim() ? query.trim() : null,
  ].filter(Boolean) as string[];

  const clearFilters = () => {
    setMonth("all");
    setLocation("all");
    setCategory("all");
    setFamily("all");
    setQuery("");
  };

  const familyHighlights = [...events, ...datesPendingEvents].filter((event) =>
    ["menton-lemon-festival-2027", "nice-carnival-2027", "menton-music-festival-2026", "monaco-grand-prix-2026"].includes(event.id),
  );

  const sportsPrestige = [...events, ...datesPendingEvents].filter((event) =>
    [
      "monaco-grand-prix-2026",
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
    <div className="grid gap-14">
      <section className="border-y border-[#dfd4c1] bg-[#fbf7ef] py-6" aria-label={labels.filters}>
        <div className="flex flex-col justify-between gap-4 border-b border-[#dfd4c1] pb-5 md:flex-row md:items-end">
          <div>
            <p className="editorial-label">{labels.filters}</p>
            <h2 className="serif-heading mt-2 text-3xl text-[#173f36] sm:text-4xl">{labels.timeline}</h2>
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#5f574c]">
            {labels.showing} {filtered.length} / {events.length}
          </p>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[1.15fr_0.85fr_0.85fr_1fr]">
          <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#173f36]">
            {labels.month}
            <select className={selectClass} value={month} onChange={(event) => setMonth(event.target.value as MonthFilter)}>
              {monthFilterOptions.map((option) => (
                <option key={option} value={option}>{monthLabels[locale][option]}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#173f36]">
            {labels.location}
            <select className={selectClass} value={location} onChange={(event) => setLocation(event.target.value as typeof location)}>
              {locations.map((option) => (
                <option key={option} value={option}>{option === "all" ? labels.all : option}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#173f36]">
            {labels.category}
            <select className={selectClass} value={category} onChange={(event) => setCategory(event.target.value as typeof category)}>
              {categories.map((option) => (
                <option key={option} value={option}>{option === "all" ? labels.all : eventCategoryLabels[locale][option]}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#173f36]">
            {labels.family}
            <select className={selectClass} value={family} onChange={(event) => setFamily(event.target.value as typeof family)}>
              {familyOptions.map((option) => (
                <option key={option} value={option}>{option === "all" ? labels.all : familySuitabilityLabels[locale][option]}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
          <input
            className="min-h-12 w-full border border-[#dfd4c1] bg-[#fffdf8] px-4 text-sm outline-none transition placeholder:text-[#8a8072] focus:border-[#0b6f8f] focus:ring-2 focus:ring-[#0b6f8f]/10"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={labels.search}
            type="search"
          />
          <button
            type="button"
            onClick={clearFilters}
            className="min-h-12 border border-[#173f36] px-4 text-xs font-bold uppercase tracking-[0.14em] text-[#173f36] transition hover:bg-[#173f36] hover:text-white"
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
        <div className="flex flex-col gap-3 border-b border-[#dfd4c1] pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="editorial-label">Calendar selection</p>
            <h2 className="serif-heading mt-2 text-3xl text-[#173f36] sm:text-4xl">{filtered.length} {labels.results}</h2>
          </div>
        </div>
        {filtered.length ? (
          <div className="mt-8 grid gap-x-8 gap-y-6">
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} locale={locale} status={getEventDateStatus(event)} />
            ))}
          </div>
        ) : (
          <p className="mt-8 border border-[#dfd4c1] bg-[#fffdf8] p-6 text-[#5f574c]">{labels.noUpcoming}</p>
        )}
      </section>

      {filteredDatesPending.length ? (
        <section aria-labelledby="events-dates-pending" className="border-y border-[#dfd4c1] py-8">
          <div className="grid gap-5 md:grid-cols-[0.36fr_1fr] md:items-end">
            <div>
              <p className="editorial-label">Planning guides</p>
              <h2 id="events-dates-pending" className="serif-heading mt-2 text-3xl text-[#173f36] sm:text-4xl">
                {labels.datesPendingTitle}
              </h2>
            </div>
            <p className="max-w-3xl text-sm leading-7 text-[#5f574c]">{labels.datesPendingText}</p>
          </div>
          <div className="mt-8 grid gap-x-8 gap-y-6">
            {filteredDatesPending.map((event) => (
              <EventCard key={event.id} event={event} locale={locale} status="dates_pending" />
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
          <div className="mt-8 grid gap-x-8 gap-y-6 opacity-85">
            {filteredPast.map((event) => (
              <EventCard key={event.id} event={event} locale={locale} status="past" />
            ))}
          </div>
        </section>
      ) : null}

      <section aria-labelledby="events-timeline">
        <div className="border-b border-[#dfd4c1] pb-6">
          <p className="editorial-label">Seasonal rhythm</p>
          <h2 id="events-timeline" className="serif-heading mt-2 text-3xl text-[#173f36] sm:text-4xl">{labels.timeline}</h2>
        </div>
        <div className="mt-8 grid gap-0">
          {grouped.map((group) => (
            <div key={group.id} className="relative grid gap-5 border-l border-[#dfd4c1] pb-10 pl-6 last:pb-0 md:grid-cols-[0.32fr_1fr] md:pl-8">
              <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-[#b07820]" aria-hidden="true" />
              <div className="md:pr-8">
                <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#b07820]">
                  {monthLabels[locale][group.id]}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#5f574c]">{timelineIntro[locale][group.id]}</p>
              </div>
              <div className="grid gap-3">
                {group.events.map((event, index) => (
                  <Link
                    key={event.id}
                    href={event.detailPage ? eventHref(locale, event) : (`/${locale}/events` as Route)}
                    className={`grid gap-2 border border-[#dfd4c1] bg-[#fffdf8] p-4 transition hover:border-[#c6a66a] md:grid-cols-[0.24fr_1fr_0.26fr] ${
                      index === 0 ? "md:py-5" : "opacity-90"
                    }`}
                  >
                    <span className="text-sm font-bold text-[#173f36]">{event.dateLabel}</span>
                    <span className={`text-sm text-[#5f574c] ${index === 0 ? "font-semibold text-[#173f36]" : ""}`}>{event.title}</span>
                    <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#0b6f8f]">{event.location}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border border-[#d9bf81] bg-[#fff3df] p-7">
          <p className="editorial-label text-[#d9b66b]">Families</p>
          <h2 className="serif-heading mt-3 text-3xl text-[#173f36] sm:text-4xl">{labels.familyTitle}</h2>
          <p className="mt-4 text-sm leading-7 text-[#5f574c]">{labels.familyText}</p>
          <div className="mt-6 grid gap-3">
            {familyHighlights.map((event) => (
              <Link
                key={event.id}
                href={event.detailPage ? eventHref(locale, event) : (`/${locale}/events` as Route)}
                className="grid gap-1 border-t border-[#d9bf81] pt-3"
              >
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#b07820]">
                  {familySuitabilityLabels[locale][event.familySuitability]}
                </span>
                <span className="serif-heading break-words text-2xl leading-none text-[#173f36]">{event.title}</span>
                <span className="text-sm text-[#5f574c]">{event.dateLabel}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="border border-[#dfd4c1] bg-[#173f36] p-7 text-white">
          <p className="editorial-label">Riviera calendar</p>
          <h2 className="serif-heading mt-3 text-3xl sm:text-4xl">{labels.sportsTitle}</h2>
          <p className="mt-4 text-sm leading-7 text-white/75">{labels.sportsText}</p>
          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            {sportsPrestige.map((event) => (
              <Link
                key={event.id}
                href={event.detailPage ? eventHref(locale, event) : (`/${locale}/events` as Route)}
                className="border border-white/15 bg-white/[0.03] p-3 transition hover:border-[#d9b66b]"
              >
                <span className="text-[0.64rem] font-bold uppercase tracking-[0.14em] text-[#d9b66b]">{event.location}</span>
                <span className="mt-1 block text-sm font-semibold leading-5">{event.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

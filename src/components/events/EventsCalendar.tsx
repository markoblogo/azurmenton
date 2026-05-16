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
    results: "event ideas",
    eventDetails: "Event details",
    availability: "Check availability",
    whyStay: "Why stay nearby",
    bookingTip: "Booking tip",
    timeline: "Month-by-month calendar",
    noResults: "No events match these filters yet.",
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
    results: "idees d'evenements",
    eventDetails: "Voir details",
    availability: "Verifier disponibilite",
    whyStay: "Pourquoi loger a proximite",
    bookingTip: "Conseil reservation",
    timeline: "Calendrier mois par mois",
    noResults: "Aucun evenement ne correspond a ces filtres.",
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
    results: "idee evento",
    eventDetails: "Dettagli evento",
    availability: "Controlla disponibilita",
    whyStay: "Perche restare vicino",
    bookingTip: "Consiglio prenotazione",
    timeline: "Calendario mese per mese",
    noResults: "Nessun evento corrisponde ai filtri.",
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
    results: "ідей подій",
    eventDetails: "Деталі події",
    availability: "Перевірити доступність",
    whyStay: "Чому жити поруч",
    bookingTip: "Порада щодо бронювання",
    timeline: "Календар по місяцях",
    noResults: "За цими фільтрами подій немає.",
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

function Badge({ children, tone = "light" }: { children: React.ReactNode; tone?: "light" | "gold" | "blue" }) {
  const className =
    tone === "gold"
      ? "border-[#d2a748] bg-[#fff5d8] text-[#7b5515]"
      : tone === "blue"
        ? "border-[#9ac7d2] bg-[#edf8fb] text-[#245d6a]"
        : "border-[#dfd4c1] bg-[#fffdf8] text-[#4f5b57]";

  return (
    <span className={`inline-flex border px-2.5 py-1 text-[0.66rem] font-bold uppercase tracking-[0.12em] ${className}`}>
      {children}
    </span>
  );
}

function EventCard({ event, locale }: { event: RivieraEvent; locale: Locale }) {
  const hasDetail = event.detailPage || event.slug === "summer-on-the-riviera";

  return (
    <article className="group grid border border-[#dfd4c1] bg-[#fffdf8]/88 transition hover:border-[#c6a66a] md:grid-rows-[auto_1fr]">
      <div className="border-b border-[#dfd4c1] bg-[#f6efe3] p-5">
        <div className="flex flex-wrap gap-2">
          <Badge tone="gold">{event.dateLabel}</Badge>
          <Badge tone="blue">{event.location}</Badge>
        </div>
        <h3 className="serif-heading mt-5 text-3xl leading-none text-[#173f36]">
          {hasDetail ? <Link href={eventHref(locale, event)}>{event.title}</Link> : event.title}
        </h3>
      </div>
      <div className="flex flex-col p-5">
        <div className="flex flex-wrap gap-2">
          {event.category.slice(0, 3).map((category) => (
            <Badge key={category}>{eventCategoryLabels[locale][category]}</Badge>
          ))}
          <Badge>{familySuitabilityLabels[locale][event.familySuitability]}</Badge>
          <Badge tone={event.sourceStatus === "verified" ? "blue" : "gold"}>
            {sourceStatusLabels[locale][event.sourceStatus]}
          </Badge>
        </div>
        <p className="mt-5 text-sm leading-7 text-[#5f574c]">{event.shortDescription[locale]}</p>
        <div className="mt-5 grid gap-4 border-t border-[#dfd4c1] pt-5 text-sm leading-6">
          <p>
            <span className="font-bold text-[#173f36]">{copy[locale].whyStay}: </span>
            <span className="text-[#5f574c]">{event.whyShowOnSite[locale]}</span>
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

export function EventsCalendar({ events, locale }: { events: RivieraEvent[]; locale: Locale }) {
  const [month, setMonth] = useState<MonthFilter>("all");
  const [location, setLocation] = useState<(typeof locations)[number]>("all");
  const [category, setCategory] = useState<(typeof categories)[number]>("all");
  const [family, setFamily] = useState<(typeof familyOptions)[number]>("all");
  const [query, setQuery] = useState("");
  const labels = copy[locale];

  const filtered = useMemo(
    () =>
      events.filter((event) => {
        const monthMatch = month === "all" || event.monthGroup === month;
        const locationMatch = location === "all" || event.location === location;
        const categoryMatch = category === "all" || event.category.includes(category);
        const familyMatch = family === "all" || event.familySuitability === family;
        return (
          monthMatch &&
          locationMatch &&
          categoryMatch &&
          familyMatch &&
          includesSearch(event, locale, query.trim())
        );
      }),
    [category, events, family, locale, location, month, query],
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

  return (
    <div className="grid gap-14">
      <section className="border border-[#dfd4c1] bg-[#f6efe3] p-5 sm:p-6" aria-label={labels.filters}>
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr_1fr]">
          <label className="grid gap-2 text-sm font-semibold text-[#173f36]">
            {labels.month}
            <select className="min-h-11 border border-[#dfd4c1] bg-white px-3 text-sm" value={month} onChange={(event) => setMonth(event.target.value as MonthFilter)}>
              {monthFilterOptions.map((option) => (
                <option key={option} value={option}>{monthLabels[locale][option]}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-[#173f36]">
            {labels.location}
            <select className="min-h-11 border border-[#dfd4c1] bg-white px-3 text-sm" value={location} onChange={(event) => setLocation(event.target.value as typeof location)}>
              {locations.map((option) => (
                <option key={option} value={option}>{option === "all" ? labels.all : option}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-[#173f36]">
            {labels.category}
            <select className="min-h-11 border border-[#dfd4c1] bg-white px-3 text-sm" value={category} onChange={(event) => setCategory(event.target.value as typeof category)}>
              {categories.map((option) => (
                <option key={option} value={option}>{option === "all" ? labels.all : eventCategoryLabels[locale][option]}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-[#173f36]">
            {labels.family}
            <select className="min-h-11 border border-[#dfd4c1] bg-white px-3 text-sm" value={family} onChange={(event) => setFamily(event.target.value as typeof family)}>
              {familyOptions.map((option) => (
                <option key={option} value={option}>{option === "all" ? labels.all : familySuitabilityLabels[locale][option]}</option>
              ))}
            </select>
          </label>
        </div>
        <input
          className="mt-4 min-h-12 w-full border border-[#dfd4c1] bg-white px-4 text-sm"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={labels.search}
          type="search"
        />
      </section>

      <section aria-label={labels.results}>
        <div className="flex items-end justify-between gap-4">
          <h2 className="serif-heading text-4xl text-[#173f36]">{filtered.length} {labels.results}</h2>
        </div>
        {filtered.length ? (
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} locale={locale} />
            ))}
          </div>
        ) : (
          <p className="mt-8 border border-[#dfd4c1] bg-[#fffdf8] p-6 text-[#5f574c]">{labels.noResults}</p>
        )}
      </section>

      <section aria-labelledby="events-timeline">
        <h2 id="events-timeline" className="serif-heading text-4xl text-[#173f36]">{labels.timeline}</h2>
        <div className="mt-8 grid gap-6">
          {grouped.map((group) => (
            <div key={group.id} className="grid gap-4 border-t border-[#dfd4c1] pt-6 md:grid-cols-[0.32fr_1fr]">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-[#b07820]">
                  {monthLabels[locale][group.id]}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#5f574c]">{timelineIntro[locale][group.id]}</p>
              </div>
              <div className="grid gap-3">
                {group.events.map((event) => (
                  <Link
                    key={event.id}
                    href={event.detailPage ? eventHref(locale, event) : (`/${locale}/events` as Route)}
                    className="grid gap-2 border border-[#dfd4c1] bg-[#fffdf8] p-4 transition hover:border-[#c6a66a] md:grid-cols-[0.24fr_1fr_0.26fr]"
                  >
                    <span className="text-sm font-bold text-[#173f36]">{event.dateLabel}</span>
                    <span className="text-sm text-[#5f574c]">{event.title}</span>
                    <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#0b6f8f]">{event.location}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="border border-[#dfd4c1] bg-[#173f36] p-7 text-white">
          <p className="editorial-label text-[#d9b66b]">Families</p>
          <h2 className="serif-heading mt-3 text-4xl">{labels.familyTitle}</h2>
          <p className="mt-4 text-sm leading-7 text-white/75">{labels.familyText}</p>
        </div>
        <div className="border border-[#dfd4c1] bg-[#fffdf8] p-7">
          <p className="editorial-label">Riviera calendar</p>
          <h2 className="serif-heading mt-3 text-4xl text-[#173f36]">{labels.sportsTitle}</h2>
          <p className="mt-4 text-sm leading-7 text-[#5f574c]">{labels.sportsText}</p>
        </div>
      </section>
    </div>
  );
}

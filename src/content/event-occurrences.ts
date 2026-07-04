import type { Locale } from "@/i18n/locales";

export type LocalizedText = Record<Locale, string>;

export type EventOccurrencePage = {
  slug: string;
  eventSlug: string;
  year: number;
  title: LocalizedText;
  seoTitle: LocalizedText;
  metaDescription: LocalizedText;
  summary: LocalizedText;
  dateNote: LocalizedText;
  whyStayInMenton: LocalizedText;
  transportNote: LocalizedText;
  bookingAdvice: LocalizedText;
  relatedGuideSlug: string;
  relatedStaySlug: string;
  relatedApartmentSlugs: string[];
};

const t = (en: string, fr = en, it = en, uk = en): LocalizedText => ({ en, fr, it, uk });

const allApartments = ["sea-view-balcony-studio", "beachside-family-apartment", "panoramic-sea-view-studio"];
const monacoApartments = ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"];

export const eventOccurrencePages: EventOccurrencePage[] = [
  {
    slug: "monaco-grand-prix-2027",
    eventSlug: "monaco-grand-prix",
    year: 2027,
    title: t("Monaco Grand Prix 2027 from Menton", "Grand Prix de Monaco 2027 depuis Menton", "Gran Premio di Monaco 2027 da Mentone", "Гран-прі Монако 2027 з Ментона"),
    seoTitle: t("Monaco Grand Prix 2027 from Menton | Where to stay"),
    metaDescription: t("Plan a Monaco Grand Prix 2027 stay from Menton with direct train access, calmer seaside evenings and Azur Menton apartment recommendations."),
    summary: t("A short planning page for race week guests who want Monaco access without staying inside the most crowded part of the Riviera."),
    dateNote: t("Confirmed for 3-6 June 2027, subject to the official organiser calendar."),
    whyStayInMenton: t("Menton gives race-week visitors a calmer seaside base, direct rail access to Monaco and more space to reset after crowded race days."),
    transportNote: t("Use the train where possible and expect busy platforms around Monaco. Check late returns and any race-week access changes before travel."),
    bookingAdvice: t("Book early, choose the apartment fit first, and avoid assuming last-minute availability during Grand Prix week."),
    relatedGuideSlug: "monaco-events-from-menton",
    relatedStaySlug: "monaco-grand-prix-from-menton",
    relatedApartmentSlugs: monacoApartments,
  },
  {
    slug: "rolex-monte-carlo-masters-2027",
    eventSlug: "rolex-monte-carlo-masters",
    year: 2027,
    title: t("Rolex Monte-Carlo Masters 2027 from Menton"),
    seoTitle: t("Rolex Monte-Carlo Masters 2027 from Menton | Where to stay"),
    metaDescription: t("Plan a Monte-Carlo Masters 2027 stay from Menton with practical transport notes and apartment recommendations close to the eastern Riviera."),
    summary: t("A practical spring planning page for tennis visitors using Menton as a quieter base near the Monte-Carlo Country Club."),
    dateNote: t("Confirmed for 3-11 April 2027 according to the current official ticketing page."),
    whyStayInMenton: t("The tournament venue is close to Menton by Riviera standards, while Menton keeps the stay seaside, walkable and less intense than central Monaco."),
    transportNote: t("Plan transport around session times. Taxi, train and walking connections can all be useful depending on tickets and weather."),
    bookingAdvice: t("Choose sessions first, then request apartment availability with your preferred dates and any flexibility."),
    relatedGuideSlug: "monaco-events-from-menton",
    relatedStaySlug: "monaco-events-from-menton",
    relatedApartmentSlugs: monacoApartments,
  },
  {
    slug: "sanremo-music-festival-2027",
    eventSlug: "sanremo-music-festival",
    year: 2027,
    title: t("Sanremo Music Festival 2027 from Menton"),
    seoTitle: t("Sanremo Music Festival 2027 from Menton | Where to stay"),
    metaDescription: t("Plan Sanremo Music Festival 2027 from Menton with Italian Riviera transport notes, booking advice and Azur Menton apartment recommendations."),
    summary: t("A short planning page for guests who want to combine Sanremo festival atmosphere with a Menton seaside base."),
    dateNote: t("Confirmed for 16-20 February 2027 according to the current RAI announcement."),
    whyStayInMenton: t("Menton can work as a French Riviera base for guests who want Sanremo by day or evening while keeping a quieter apartment stay by the sea."),
    transportNote: t("Check train times carefully, especially for late returns. Some guests may prefer taxi arrangements for evening plans."),
    bookingAdvice: t("Mention the festival when requesting availability so arrival and late-return expectations are clear."),
    relatedGuideSlug: "italian-riviera-day-trip-from-menton",
    relatedStaySlug: "menton-without-a-car",
    relatedApartmentSlugs: allApartments,
  },
  {
    slug: "nice-carnival-2027",
    eventSlug: "nice-carnival",
    year: 2027,
    title: t("Nice Carnival 2027 from Menton"),
    seoTitle: t("Nice Carnival 2027 from Menton | Where to stay"),
    metaDescription: t("Plan Nice Carnival 2027 from Menton with family-friendly booking notes, train advice and Azur Menton apartment recommendations."),
    summary: t("A winter Riviera planning page for guests considering Nice Carnival while staying in a calmer seaside town."),
    dateNote: t("Confirmed for 9-28 February 2027 on the current official Nice Carnival site."),
    whyStayInMenton: t("Menton keeps the stay quieter and sea-focused while Nice remains reachable for selected carnival days."),
    transportNote: t("Use trains for daytime plans where possible and check evening return times before buying parade tickets."),
    bookingAdvice: t("Families should plan parade days, rest time and return transport before fixing accommodation dates."),
    relatedGuideSlug: "menton-with-kids-family-guide",
    relatedStaySlug: "menton-without-a-car",
    relatedApartmentSlugs: allApartments,
  },
  {
    slug: "fete-du-citron-2027",
    eventSlug: "menton-lemon-festival",
    year: 2027,
    title: t("Fete du Citron 2027 planning page", "Fete du Citron 2027: page de preparation", "Fete du Citron 2027: pagina di pianificazione", "Fete du Citron 2027: сторінка планування"),
    seoTitle: t("Fete du Citron 2027 in Menton | Planning page"),
    metaDescription: t("Plan a Fete du Citron 2027 stay in Menton. Official dates are still to be confirmed, so this page focuses on booking timing and apartment fit."),
    summary: t("A planning page for Lemon Festival guests. Official 2027 dates are not confirmed in the current content, so no exact event dates are invented here."),
    dateNote: t("Dates to be confirmed. Use this as a booking-planning page until official 2027 dates are published."),
    whyStayInMenton: t("Staying centrally in Menton matters during festival periods: walking routes, controlled zones and rest time are easier to manage from a nearby apartment."),
    transportNote: t("Expect central access and traffic rules to change during festival days. Check official information and ask for arrival advice before travel."),
    bookingAdvice: t("Request accommodation early, but wait for official dates before buying travel around a specific parade or garden entry."),
    relatedGuideSlug: "fete-du-citron-menton-practical-guide",
    relatedStaySlug: "lemon-festival-menton",
    relatedApartmentSlugs: ["sea-view-balcony-studio", "beachside-family-apartment", "panoramic-sea-view-studio"],
  },
];

export const eventOccurrenceSlugs = eventOccurrencePages.map((page) => page.slug);

export function getEventOccurrencePage(slug: string) {
  return eventOccurrencePages.find((page) => page.slug === slug);
}

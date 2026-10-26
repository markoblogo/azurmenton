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
    title: t("Fête du Citron 2027 in Menton", "Fête du Citron 2027 à Menton", "Fête du Citron 2027 a Mentone", "Свято лимонів 2027 у Ментоні"),
    seoTitle: t("Fête du Citron 2027 in Menton | 13–28 February", "Fête du Citron 2027 à Menton | 13–28 février", "Fête du Citron 2027 a Mentone | 13–28 febbraio", "Свято лимонів 2027 у Ментоні | 13–28 лютого"),
    metaDescription: t("Plan your Menton stay for Fête du Citron, 13–28 February 2027. Check the official parade programme, access arrangements and nearby apartments.", "Préparez votre séjour à Menton pour la Fête du Citron, du 13 au 28 février 2027. Consultez le programme officiel, les accès et les appartements à proximité.", "Organizza il soggiorno a Mentone per la Fête du Citron, dal 13 al 28 febbraio 2027. Consulta il programma ufficiale, gli accessi e gli appartamenti vicini.", "Плануйте перебування в Ментоні на Свято лимонів 13–28 лютого 2027 року. Перевірте офіційну програму, умови доступу та апартаменти поблизу."),
    summary: t("The organiser confirms 13–28 February 2027. Plan your stay around the official programme and check tickets and access before travel.", "L'organisateur confirme les dates du 13 au 28 février 2027. Préparez votre séjour selon le programme officiel et vérifiez les billets et les accès.", "L'organizzatore conferma le date dal 13 al 28 febbraio 2027. Pianifica il soggiorno in base al programma ufficiale e verifica biglietti e accessi.", "Організатор підтверджує дати 13–28 лютого 2027 року. Плануйте поїздку за офіційною програмою та перевіряйте квитки й умови доступу."),
    dateNote: t("Confirmed dates: 13–28 February 2027. Check the organiser for individual parade times.", "Dates confirmées : du 13 au 28 février 2027. Consultez les horaires des défilés auprès de l'organisateur.", "Date confermate: 13–28 febbraio 2027. Verifica gli orari delle singole sfilate con l'organizzatore.", "Підтверджені дати: 13–28 лютого 2027 року. Час окремих парадів перевіряйте в організатора."),
    whyStayInMenton: t("Staying centrally in Menton matters during festival periods: walking routes, controlled zones and rest time are easier to manage from a nearby apartment."),
    transportNote: t("Expect central access and traffic rules to change during festival days. Check official information and ask for arrival advice before travel."),
    bookingAdvice: t("Request accommodation early and check the official programme before choosing parade tickets.", "Demandez votre hébergement tôt et consultez le programme officiel avant de choisir vos billets de défilé.", "Richiedi l'alloggio in anticipo e consulta il programma ufficiale prima di scegliere i biglietti delle sfilate.", "Завчасно надішліть запит на проживання та перевірте офіційну програму перед вибором квитків на паради."),
    relatedGuideSlug: "fete-du-citron-menton-practical-guide",
    relatedStaySlug: "lemon-festival-menton",
    relatedApartmentSlugs: ["sea-view-balcony-studio", "beachside-family-apartment", "panoramic-sea-view-studio"],
  },
  {
    slug: "menton-music-festival-2027",
    eventSlug: "menton-music-festival",
    year: 2027,
    title: t("Menton Music Festival 2027 from Menton", "Festival de Musique de Menton 2027 depuis Menton", "Festival di Musica di Mentone 2027 da Mentone", "Фестиваль музики Ментона 2027 з Ментона"),
    seoTitle: t("Menton Music Festival 2027 from Menton | Planning page"),
    metaDescription: t("Plan a Menton Music Festival stay from a central Menton apartment. Official 2027 dates are still pending, so use this page for timing and apartment fit."),
    summary: t("A planning page for guests who want to stay in Menton around its signature classical music festival without assuming current edition dates too early."),
    dateNote: t("Late July-early August 2027 is the usual window, but official dates are still pending."),
    whyStayInMenton: t("For this festival, staying in central Menton matters: evening walks, old-town access and a short return after concerts are part of the experience."),
    transportNote: t("Plan around evening finishes, old-town steps and any local access changes once the official programme is published."),
    bookingAdvice: t("Use this page to plan apartment fit and timing, then confirm exact concert dates and ticketing on the official festival website."),
    relatedGuideSlug: "theatre-opera-performing-arts-near-menton",
    relatedStaySlug: "menton-without-a-car",
    relatedApartmentSlugs: allApartments,
  },
];

export const eventOccurrenceSlugs = eventOccurrencePages.map((page) => page.slug);

export function getEventOccurrencePage(slug: string) {
  return eventOccurrencePages.find((page) => page.slug === slug);
}

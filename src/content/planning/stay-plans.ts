import type { Locale } from "@/i18n/locales";

export type LocalizedText = Record<Locale, string>;

export type StayPlan = {
  id: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  duration: LocalizedText;
  bestFor: LocalizedText;
  relatedStaySlug?: string;
  relatedGuideSlugs: string[];
  relatedPlaceIds: string[];
  relatedApartmentSlugs: string[];
  transportDestinationIds: string[];
};

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });

export const stayPlans: StayPlan[] = [
  {
    id: "two-days-without-car",
    title: t("Two days in Menton without a car", "Deux jours a Menton sans voiture", "Due giorni a Mentone senza auto", "Два дні в Ментоні без авто"),
    excerpt: t("Old town, market mornings, Sablettes beach and an easy train option for Monaco or Ventimiglia.", "Vieille ville, marche du matin, plage des Sablettes et train facile vers Monaco ou Vintimille.", "Centro storico, mercato del mattino, spiaggia Sablettes e treno facile per Monaco o Ventimiglia.", "Старе місто, ранковий ринок, пляж Sablettes і простий потяг до Монако або Вентімільї."),
    duration: t("2 days", "2 jours", "2 giorni", "2 дні"),
    bestFor: t("car-free stays", "sejours sans voiture", "soggiorni senza auto", "відпочинок без авто"),
    relatedStaySlug: "menton-without-a-car",
    relatedGuideSlugs: ["menton-without-a-car", "menton-three-day-itinerary", "public-transport-in-menton"],
    relatedPlaceIds: ["halles-du-marche", "plage-sablettes", "rue-saint-michel-menton"],
    relatedApartmentSlugs: ["sea-view-balcony-studio", "panoramic-sea-view-studio"],
    transportDestinationIds: ["monaco", "ventimiglia"],
  },
  {
    id: "family-menton",
    title: t("Menton with children", "Menton avec enfants", "Mentone con bambini", "Ментон з дітьми"),
    excerpt: t("Beach time, short walks, simple food stops and apartment space that keeps the trip manageable.", "Plage, petites balades, adresses simples et espace d'appartement pour garder un sejour fluide.", "Spiaggia, brevi passeggiate, soste semplici e spazio in appartamento per rendere il viaggio gestibile.", "Пляж, короткі прогулянки, прості зупинки для їжі й простір в апартаментах."),
    duration: t("1-3 days", "1-3 jours", "1-3 giorni", "1-3 дні"),
    bestFor: t("families", "familles", "famiglie", "сім'ї"),
    relatedGuideSlugs: ["menton-with-kids-family-guide", "best-beaches-in-menton", "best-ice-cream-menton"],
    relatedPlaceIds: ["plage-sablettes", "promenade-du-soleil", "halles-du-marche"],
    relatedApartmentSlugs: ["beachside-family-apartment", "sea-view-balcony-studio"],
    transportDestinationIds: ["villages"],
  },
  {
    id: "summer-heat",
    title: t("Hot summer days", "Journees de chaleur estivale", "Giornate estive calde", "Спекотні літні дні"),
    excerpt: t("Early walks, shaded pauses, beaches with timing, and air-conditioned apartments between outings.", "Balades tot, pauses a l'ombre, plages au bon moment et appartements climatises entre deux sorties.", "Passeggiate presto, pause all'ombra, spiagge negli orari giusti e appartamenti climatizzati tra le uscite.", "Ранні прогулянки, тіньові паузи, пляжі у правильний час і кондиціоновані апартаменти між виходами."),
    duration: t("Summer stay", "Sejour d'ete", "Soggiorno estivo", "Літня поїздка"),
    bestFor: t("July to early September", "juillet a debut septembre", "luglio-inizio settembre", "липень - початок вересня"),
    relatedStaySlug: "sea-view-apartment-menton",
    relatedGuideSlugs: ["stay-cool-in-menton-summer", "best-beaches-in-menton", "menton-in-autumn"],
    relatedPlaceIds: ["plage-casino", "jardin-val-rahmeh", "musee-jean-cocteau-bastion"],
    relatedApartmentSlugs: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
    transportDestinationIds: ["nice", "monaco"],
  },
  {
    id: "monaco-event-weekend",
    title: t("Monaco event weekend from Menton", "Week-end evenement a Monaco depuis Menton", "Weekend evento a Monaco da Mentone", "Вікенд події в Монако з Ментона"),
    excerpt: t("Use Menton as a calmer seaside base, then plan train access and returns before the busy event days.", "Utilisez Menton comme base balneaire plus calme, puis prevoyez train et retour avant les jours charges.", "Usa Mentone come base sul mare piu tranquilla, poi pianifica treno e rientro prima dei giorni affollati.", "Зробіть Ментон спокійнішою морською базою, а потяг і повернення плануйте до завантажених днів."),
    duration: t("Weekend", "Week-end", "Weekend", "Вікенд"),
    bestFor: t("Monaco events", "evenements a Monaco", "eventi a Monaco", "події в Монако"),
    relatedStaySlug: "monaco-events-from-menton",
    relatedGuideSlugs: ["monaco-events-from-menton", "day-trips-from-menton", "public-transport-in-menton"],
    relatedPlaceIds: ["grimaldi-forum-monaco", "opera-de-monte-carlo", "oceanographic-museum-monaco"],
    relatedApartmentSlugs: ["sea-view-balcony-studio", "beachside-family-apartment", "panoramic-sea-view-studio"],
    transportDestinationIds: ["monaco"],
  },
  {
    id: "sea-view-slow-stay",
    title: t("Sea-view slow stay", "Sejour lent avec vue mer", "Soggiorno lento vista mare", "Спокійний відпочинок з видом на море"),
    excerpt: t("Balcony mornings, promenade walks, old-town food stops and unhurried train day trips.", "Matins au balcon, promenade, haltes gourmandes en vieille ville et excursions en train sans se presser.", "Mattine sul balcone, passeggiate sul lungomare, soste nel centro storico e gite in treno senza fretta.", "Ранки на балконі, набережна, їжа в старому місті й неспішні поїздки потягом."),
    duration: t("3-5 days", "3-5 jours", "3-5 giorni", "3-5 днів"),
    bestFor: t("sea views", "vue mer", "vista mare", "вид на море"),
    relatedStaySlug: "sea-view-apartment-menton",
    relatedGuideSlugs: ["where-to-stay-in-menton", "quiet-evening-in-menton", "day-trips-from-menton"],
    relatedPlaceIds: ["promenade-du-soleil", "quai-bonaparte-menton", "rue-saint-michel-menton"],
    relatedApartmentSlugs: ["sea-view-balcony-studio", "panoramic-sea-view-studio"],
    transportDestinationIds: ["nice", "ventimiglia"],
  },
];

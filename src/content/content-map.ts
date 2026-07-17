import type { GuideCategory } from "@/content/guide";
import type { Locale } from "@/i18n/locales";

export type LocalizedText = Record<Locale, string>;

export type ContentCollectionId =
  | "food-and-markets"
  | "beaches-and-seafront"
  | "walks-and-views"
  | "family-days"
  | "culture-and-evenings"
  | "riviera-day-trips"
  | "practical-stay"
  | "sport-and-outdoors"
  | "evening-plans";

export type ContentCollection = {
  id: ContentCollectionId;
  title: LocalizedText;
  description: LocalizedText;
  categories: GuideCategory[];
  includeGuideSlugs?: string[];
  priorityGuideSlugs: string[];
};

export type ContentIntentPriority = "now" | "next" | "later";
export type ContentIntentStatus = "covered" | "planned";

export type ContentIntent = {
  id: string;
  query: LocalizedText;
  collectionId: ContentCollectionId;
  priority: ContentIntentPriority;
  status: ContentIntentStatus;
  targetGuideSlug?: string;
  season?: "summer" | "autumn" | "winter" | "spring" | "all-year";
};

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });

export const contentCollections: ContentCollection[] = [
  {
    id: "food-and-markets",
    title: t("Food & markets", "Cuisine & marches", "Cibo e mercati", "Їжа та ринки"),
    description: t("Markets, local food, restaurants and practical shopping.", "Marches, cuisine locale, restaurants et courses pratiques.", "Mercati, cucina locale, ristoranti e spesa pratica.", "Ринки, місцева кухня, ресторани та практичні покупки."),
    categories: ["food-markets", "nightlife-drinks"],
    includeGuideSlugs: ["supermarkets-in-menton", "best-seafood-restaurants-menton", "best-pastries-desserts-cakes-menton"],
    priorityGuideSlugs: ["local-food-menton", "halles-du-marche-menton", "best-seafood-restaurants-menton", "best-pastries-desserts-cakes-menton", "supermarkets-in-menton"],
  },
  {
    id: "beaches-and-seafront",
    title: t("Beaches & seafront", "Plages & bord de mer", "Spiagge & lungomare", "Пляжі та набережна"),
    description: t("Beach choices, sea views and comfortable summer days.", "Choisir sa plage, vues mer et journees d'ete agreables.", "Scelta delle spiagge, viste sul mare e giornate estive piacevoli.", "Вибір пляжів, морські краєвиди та комфортні літні дні."),
    categories: ["beaches", "photo-spots"],
    includeGuideSlugs: ["stay-cool-in-menton-summer", "where-to-stay-in-menton"],
    priorityGuideSlugs: ["best-beaches-in-menton", "stay-cool-in-menton-summer", "where-to-stay-in-menton"],
  },
  {
    id: "walks-and-views",
    title: t("Walks & views", "Balades & panoramas", "Passeggiate & panorami", "Прогулянки та краєвиди"),
    description: t("Old-town lanes, coastal walks, viewpoints and photo stops.", "Ruelles de la vieille ville, balades, panoramas et photos.", "Vie del centro storico, passeggiate, panorami e soste fotografiche.", "Вулички старого міста, прогулянки, краєвиди та фотозупинки."),
    categories: ["walks-views", "photo-spots", "itineraries"],
    priorityGuideSlugs: ["menton-old-town", "best-walks-and-hikes-around-menton", "best-photo-spots-menton"],
  },
  {
    id: "family-days",
    title: t("Family days", "Jours en famille", "Giornate in famiglia", "Сімейні дні"),
    description: t("Simple ideas for children, beach time and low-stress outings.", "Idees simples pour enfants, plage et sorties sans stress.", "Idee semplici per bambini, spiaggia e uscite senza stress.", "Прості ідеї для дітей, пляжу та неквапливих прогулянок."),
    categories: ["with-children"],
    includeGuideSlugs: ["best-ice-cream-menton", "cinemas-in-menton-nice-monaco", "zoos-aquariums-animal-parks-near-menton"],
    priorityGuideSlugs: ["menton-with-kids-family-guide", "zoos-aquariums-animal-parks-near-menton", "best-ice-cream-menton", "cinemas-in-menton-nice-monaco"],
  },
  {
    id: "culture-and-evenings",
    title: t("Culture & evenings", "Culture & soirees", "Cultura & serate", "Культура та вечори"),
    description: t("Museums, cinema, live music and evening plans nearby.", "Musees, cinema, musique live et idees de soiree autour de Menton.", "Musei, cinema, musica dal vivo e serate nei dintorni di Mentone.", "Музеї, кіно, жива музика та вечірні плани поблизу Ментона."),
    categories: ["nightlife-drinks", "events"],
    includeGuideSlugs: ["museums-in-menton-nice-monaco", "cinemas-in-menton-nice-monaco", "theatre-opera-performing-arts-near-menton", "films-shot-in-menton", "bookshops-libraries-menton", "menton-hand-drawn-postcards"],
    priorityGuideSlugs: ["museums-in-menton-nice-monaco", "theatre-opera-performing-arts-near-menton", "jazz-live-music-near-menton"],
  },
  {
    id: "riviera-day-trips",
    title: t("Riviera day trips", "Excursions Riviera", "Gite in Riviera", "Поїздки Рив'єрою"),
    description: t("Train-friendly days in Monaco, Nice and the Italian Riviera.", "Journees faciles en train a Monaco, Nice et sur la Riviera italienne.", "Gite in treno a Monaco, Nizza e sulla Riviera italiana.", "Зручні поїздки потягом до Монако, Ніцци та Італійської Рив'єри."),
    categories: ["day-trips"],
    includeGuideSlugs: ["monaco-events-from-menton", "how-to-get-to-menton-from-nice-airport"],
    priorityGuideSlugs: ["day-trips-from-menton", "italian-riviera-day-trip-from-menton", "monaco-events-from-menton"],
  },
  {
    id: "practical-stay",
    title: t("Practical stay", "Sejour pratique", "Soggiorno pratico", "Практичне проживання"),
    description: t("Car-free travel, airport arrivals, everyday essentials and the right base.", "Sans voiture, arrivee depuis l'aeroport, essentiels et bonne base de sejour.", "Senza auto, arrivo dall'aeroporto, essenziali e base giusta.", "Без авто, прибуття з аеропорту, щоденні потреби та правильна база."),
    categories: ["practical"],
    includeGuideSlugs: ["menton-without-a-car", "where-to-stay-in-menton", "supermarkets-in-menton", "best-barbershops-menton", "airports-near-menton-live-flights", "electric-car-charging-menton", "petrol-stations-menton"],
    priorityGuideSlugs: ["menton-without-a-car", "how-to-get-to-menton-from-nice-airport", "airports-near-menton-live-flights", "public-transport-in-menton"],
  },
  {
    id: "sport-and-outdoors",
    title: t("Sport & outdoors", "Sport & plein air", "Sport & attivita all'aperto", "Спорт і активний відпочинок"),
    description: t("Gyms, yoga, pétanque, golf, tennis, padel, cycling, hiking and skateparks for active Riviera days.", "Salles de sport, yoga, petanque, golf, tennis, padel, velo, randonnee et skateparks pour des journees actives sur la Riviera.", "Palestre, yoga, petanque, golf, tennis, padel, bici, escursioni e skatepark per giornate attive in Riviera.", "Спортзали, йога, петанк, гольф, теніс, падел, велосипед, походи й скейтпарки для активних днів на Рив'єрі."),
    categories: [],
    includeGuideSlugs: ["gyms-fitness-centres-menton", "yoga-in-menton", "saunas-spas-menton", "petanque-in-menton", "golf-near-menton", "tennis-padel-courts-menton", "best-walks-and-hikes-around-menton", "skateparks-near-menton", "cycling-bike-rental-menton"],
    priorityGuideSlugs: ["petanque-in-menton", "yoga-in-menton", "gyms-fitness-centres-menton", "tennis-padel-courts-menton", "golf-near-menton", "best-walks-and-hikes-around-menton", "cycling-bike-rental-menton", "skateparks-near-menton"],
  },
  {
    id: "evening-plans",
    title: t("Evening plans", "Idees de soiree", "Idee per la sera", "Вечірні плани"),
    description: t("Bars, quiet evenings, live music, dancing, cinema, theatre and late plans near Menton.", "Bars, soirees calmes, musique live, danse, cinema, theatre et sorties autour de Menton.", "Bar, serate tranquille, musica dal vivo, ballo, cinema, teatro e uscite vicino a Mentone.", "Бари, спокійні вечори, жива музика, танці, кіно, театр і пізні плани біля Ментона."),
    categories: [],
    includeGuideSlugs: [
      "bars-and-beer-in-menton",
      "quiet-evening-in-menton",
      "nightlife-in-menton",
      "latin-dancing-salsa-bachata-menton",
      "shisha-hookah-near-menton",
      "jazz-live-music-near-menton",
      "casinos-near-menton",
      "cinemas-in-menton-nice-monaco",
      "theatre-opera-performing-arts-near-menton",
      "billiards-pool-menton",
    ],
    priorityGuideSlugs: [
      "quiet-evening-in-menton",
      "bars-and-beer-in-menton",
      "nightlife-in-menton",
      "jazz-live-music-near-menton",
      "latin-dancing-salsa-bachata-menton",
      "cinemas-in-menton-nice-monaco",
      "theatre-opera-performing-arts-near-menton",
      "casinos-near-menton",
      "billiards-pool-menton",
      "shisha-hookah-near-menton",
    ],
  },
];

export const contentIntentMap: ContentIntent[] = [
  { id: "menton-local-food", query: t("local food in Menton", "gastronomie locale a Menton", "cucina locale a Mentone", "місцева їжа в Ментоні"), collectionId: "food-and-markets", priority: "now", status: "covered", targetGuideSlug: "local-food-menton", season: "all-year" },
  { id: "menton-markets", query: t("Menton market and food hall", "marche et halles de Menton", "mercato e halles di Mentone", "ринок і криті ряди Ментона"), collectionId: "food-and-markets", priority: "now", status: "covered", targetGuideSlug: "halles-du-marche-menton", season: "all-year" },
  { id: "menton-supermarkets", query: t("supermarkets in Menton", "supermarches a Menton", "supermercati a Mentone", "супермаркети в Ментоні"), collectionId: "food-and-markets", priority: "now", status: "covered", targetGuideSlug: "supermarkets-in-menton", season: "all-year" },
  { id: "menton-seafood", query: t("best seafood in Menton", "meilleurs fruits de mer a Menton", "miglior pesce a Mentone", "найкращі морепродукти в Ментоні"), collectionId: "food-and-markets", priority: "now", status: "covered", targetGuideSlug: "best-seafood-restaurants-menton", season: "all-year" },
  { id: "menton-pastries-desserts", query: t("best pastries in Menton", "meilleures patisseries a Menton", "migliori pasticcerie a Mentone", "найкраща випічка в Ментоні"), collectionId: "food-and-markets", priority: "now", status: "covered", targetGuideSlug: "best-pastries-desserts-cakes-menton", season: "all-year" },
  { id: "menton-best-beaches", query: t("best beaches in Menton", "meilleures plages de Menton", "migliori spiagge di Mentone", "найкращі пляжі Ментона"), collectionId: "beaches-and-seafront", priority: "now", status: "covered", targetGuideSlug: "best-beaches-in-menton", season: "summer" },
  { id: "menton-summer-heat", query: t("how to stay cool in Menton", "rester au frais a Menton", "come rinfrescarsi a Mentone", "як сховатися від спеки в Ментоні"), collectionId: "beaches-and-seafront", priority: "now", status: "covered", targetGuideSlug: "stay-cool-in-menton-summer", season: "summer" },
  { id: "menton-sea-view-stay", query: t("sea-view apartment in Menton", "appartement vue mer a Menton", "appartamento vista mare a Mentone", "апартаменти з видом на море в Ментоні"), collectionId: "beaches-and-seafront", priority: "now", status: "covered", targetGuideSlug: "where-to-stay-in-menton", season: "all-year" },
  { id: "menton-old-town", query: t("Menton old town", "vieille ville de Menton", "centro storico di Mentone", "старе місто Ментона"), collectionId: "walks-and-views", priority: "now", status: "covered", targetGuideSlug: "menton-old-town", season: "all-year" },
  { id: "menton-walks", query: t("walks around Menton", "balades autour de Menton", "passeggiate intorno a Mentone", "прогулянки навколо Ментона"), collectionId: "walks-and-views", priority: "now", status: "covered", targetGuideSlug: "best-walks-and-hikes-around-menton", season: "all-year" },
  { id: "menton-photo-spots", query: t("Menton photo spots", "spots photo a Menton", "luoghi fotografici a Mentone", "фотолокації Ментона"), collectionId: "walks-and-views", priority: "now", status: "covered", targetGuideSlug: "best-photo-spots-menton", season: "all-year" },
  { id: "menton-with-kids", query: t("Menton with kids", "Menton avec des enfants", "Mentone con bambini", "Ментон з дітьми"), collectionId: "family-days", priority: "now", status: "covered", targetGuideSlug: "menton-with-kids-family-guide", season: "all-year" },
  { id: "menton-animal-experiences", query: t("zoos and aquariums near Menton", "zoos et aquariums pres de Menton", "zoo e acquari vicino a Mentone", "зоопарки й акваріуми біля Ментона"), collectionId: "family-days", priority: "now", status: "covered", targetGuideSlug: "zoos-aquariums-animal-parks-near-menton", season: "all-year" },
  { id: "menton-rainy-day", query: t("rainy day in Menton", "jour de pluie a Menton", "giornata di pioggia a Mentone", "дощовий день у Ментоні"), collectionId: "family-days", priority: "next", status: "planned", season: "all-year" },
  { id: "menton-museums", query: t("museums near Menton", "musees pres de Menton", "musei vicino a Mentone", "музеї поблизу Ментона"), collectionId: "culture-and-evenings", priority: "now", status: "covered", targetGuideSlug: "museums-in-menton-nice-monaco", season: "all-year" },
  { id: "menton-theatre", query: t("theatre and opera near Menton", "theatre et opera pres de Menton", "teatro e opera vicino a Mentone", "театр і опера поблизу Ментона"), collectionId: "culture-and-evenings", priority: "now", status: "covered", targetGuideSlug: "theatre-opera-performing-arts-near-menton", season: "all-year" },
  { id: "menton-on-screen", query: t("films shot in Menton", "films tournes a Menton", "film girati a Mentone", "фільми, зняті в Ментоні"), collectionId: "culture-and-evenings", priority: "now", status: "covered", targetGuideSlug: "films-shot-in-menton", season: "all-year" },
  { id: "menton-hand-drawn-postcards", query: t("Menton art postcards and drawings", "cartes postales et dessins de Menton", "cartoline e disegni di Mentone", "листівки й малюнки Ментона"), collectionId: "culture-and-evenings", priority: "now", status: "covered", targetGuideSlug: "menton-hand-drawn-postcards", season: "all-year" },
  { id: "menton-monaco-day-trip", query: t("Monaco from Menton", "Monaco depuis Menton", "Monaco da Mentone", "Монако з Ментона"), collectionId: "riviera-day-trips", priority: "now", status: "covered", targetGuideSlug: "monaco-events-from-menton", season: "all-year" },
  { id: "menton-italy-day-trip", query: t("Italian Riviera day trip from Menton", "excursion Riviera italienne depuis Menton", "gita in Riviera italiana da Mentone", "поїздка на Італійську Рив'єру з Ментона"), collectionId: "riviera-day-trips", priority: "now", status: "covered", targetGuideSlug: "italian-riviera-day-trip-from-menton", season: "all-year" },
  { id: "menton-without-car", query: t("Menton without a car", "Menton sans voiture", "Mentone senza auto", "Ментон без автомобіля"), collectionId: "practical-stay", priority: "now", status: "covered", targetGuideSlug: "menton-without-a-car", season: "all-year" },
  { id: "nice-airport-to-menton", query: t("Nice airport to Menton", "aeroport de Nice vers Menton", "aeroporto di Nizza a Mentone", "аеропорт Ніцци до Ментона"), collectionId: "practical-stay", priority: "now", status: "covered", targetGuideSlug: "how-to-get-to-menton-from-nice-airport", season: "all-year" },
  { id: "menton-public-transport", query: t("public transport in Menton", "transports publics a Menton", "trasporti pubblici a Mentone", "громадський транспорт у Ментоні"), collectionId: "practical-stay", priority: "now", status: "covered", targetGuideSlug: "public-transport-in-menton", season: "all-year" },
  { id: "menton-parking", query: t("parking in Menton", "stationnement a Menton", "parcheggio a Mentone", "паркування в Ментоні"), collectionId: "practical-stay", priority: "next", status: "planned", season: "all-year" },
  { id: "menton-petrol-stations", query: t("petrol stations in Menton", "stations-service a Menton", "stazioni di servizio a Mentone", "заправки в Ментоні"), collectionId: "practical-stay", priority: "now", status: "covered", targetGuideSlug: "petrol-stations-menton", season: "all-year" },
  { id: "menton-barbershops", query: t("barbershops in Menton", "barbiers a Menton", "barbieri a Mentone", "барбершопи в Ментоні"), collectionId: "practical-stay", priority: "now", status: "covered", targetGuideSlug: "best-barbershops-menton", season: "all-year" },
  { id: "menton-tennis-padel", query: t("tennis and padel near Menton", "tennis et padel pres de Menton", "tennis e padel vicino a Mentone", "теніс і падел біля Ментона"), collectionId: "sport-and-outdoors", priority: "now", status: "covered", targetGuideSlug: "tennis-padel-courts-menton", season: "all-year" },
  { id: "menton-golf", query: t("golf near Menton", "golf pres de Menton", "golf vicino a Mentone", "гольф біля Ментона"), collectionId: "sport-and-outdoors", priority: "now", status: "covered", targetGuideSlug: "golf-near-menton", season: "all-year" },
  { id: "menton-skateparks", query: t("skateparks near Menton", "skateparks pres de Menton", "skatepark vicino a Mentone", "скейтпарки біля Ментона"), collectionId: "sport-and-outdoors", priority: "now", status: "covered", targetGuideSlug: "skateparks-near-menton", season: "all-year" },
  { id: "menton-gyms", query: t("gyms and fitness centres in Menton", "salles de sport et fitness a Menton", "palestre e centri fitness a Mentone", "спортзали та фітнес-центри в Ментоні"), collectionId: "sport-and-outdoors", priority: "now", status: "covered", targetGuideSlug: "gyms-fitness-centres-menton", season: "all-year" },
  { id: "menton-yoga", query: t("yoga in Menton", "yoga a Menton", "yoga a Mentone", "йога в Ментоні"), collectionId: "sport-and-outdoors", priority: "now", status: "covered", targetGuideSlug: "yoga-in-menton", season: "all-year" },
  { id: "menton-wellness-spas", query: t("saunas and spas in Menton", "saunas et spas a Menton", "saune e spa a Mentone", "сауни та спа в Ментоні"), collectionId: "sport-and-outdoors", priority: "now", status: "covered", targetGuideSlug: "saunas-spas-menton", season: "all-year" },
  { id: "menton-petanque", query: t("pétanque in Menton", "petanque a Menton", "petanque a Mentone", "петанк у Ментоні"), collectionId: "sport-and-outdoors", priority: "now", status: "covered", targetGuideSlug: "petanque-in-menton", season: "all-year" },
  { id: "menton-evening-plans", query: t("evening plans in Menton", "idees de soiree a Menton", "idee per la sera a Mentone", "вечірні плани в Ментоні"), collectionId: "evening-plans", priority: "now", status: "covered", targetGuideSlug: "quiet-evening-in-menton", season: "all-year" },
  { id: "menton-live-music", query: t("live music near Menton", "musique live pres de Menton", "musica dal vivo vicino a Mentone", "жива музика біля Ментона"), collectionId: "evening-plans", priority: "now", status: "covered", targetGuideSlug: "jazz-live-music-near-menton", season: "all-year" },
];

export function isContentCollectionId(value: string | undefined): value is ContentCollectionId {
  return contentCollections.some((collection) => collection.id === value);
}

export function resolveContentCollectionGuideSlugs(
  collection: ContentCollection,
  guides: ReadonlyArray<{ slug: string; category: GuideCategory }>,
) {
  const included = new Set(collection.includeGuideSlugs ?? []);
  const matchingSlugs = guides
    .filter((guide) => collection.categories.includes(guide.category) || included.has(guide.slug))
    .map((guide) => guide.slug);
  const ordered = [...collection.priorityGuideSlugs, ...matchingSlugs];

  return [...new Set(ordered)].filter((slug) => matchingSlugs.includes(slug));
}

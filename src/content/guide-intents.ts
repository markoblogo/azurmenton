import type { Locale } from "@/i18n/locales";

export type LocalizedText = Record<Locale, string>;

export type GuideIntentClusterId =
  | "menton-with-kids"
  | "menton-without-car"
  | "beachfront-stay"
  | "day-trips"
  | "winter-autumn"
  | "summer-heat"
  | "practical-stay";

export type GuideIntentCluster = {
  id: GuideIntentClusterId;
  title: LocalizedText;
  excerpt: LocalizedText;
  canonicalGuideSlug: string;
  supportingGuideSlugs: string[];
  relatedPlaceIds: string[];
  relatedApartmentKeys: string[];
  relatedEventSlugs?: string[];
};

export type GuideLinkAuditIgnore = "cluster" | "places" | "relatedArticles";

export type GuideLinkAuditProfile = {
  slug: string;
  ignore: GuideLinkAuditIgnore[];
  reason: string;
};

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });

const allApartments = ["sea-view-balcony-studio", "beachside-family-apartment", "panoramic-sea-view-studio"];
const seaViewApartments = ["sea-view-balcony-studio", "panoramic-sea-view-studio"];

export const guideIntentClusterLabels: Record<Locale, { eyebrow: string; title: string; intro: string; cta: string }> = {
  en: {
    eyebrow: "Plan by trip style",
    title: "Find the right Menton guide faster",
    intro: "Compact routes into the guide for common stay questions: summer heat, family travel, car-free days, beaches and practical errands.",
    cta: "Open guide",
  },
  fr: {
    eyebrow: "Planifier par style de sejour",
    title: "Trouver plus vite le bon guide de Menton",
    intro: "Entrees compactes vers les questions courantes: chaleur d'ete, famille, sejour sans voiture, plages et aspects pratiques.",
    cta: "Ouvrir le guide",
  },
  it: {
    eyebrow: "Pianifica per tipo di soggiorno",
    title: "Trova piu rapidamente la guida giusta",
    intro: "Percorsi compatti per domande frequenti: caldo estivo, famiglia, giorni senza auto, spiagge e aspetti pratici.",
    cta: "Apri la guida",
  },
  uk: {
    eyebrow: "Плануйте за типом поїздки",
    title: "Швидше знайдіть потрібний гід по Ментону",
    intro: "Короткі входи до частих тем: літня спека, подорож із дітьми, відпочинок без авто, пляжі та практичні справи.",
    cta: "Відкрити гід",
  },
};

export const guideIntentClusters: GuideIntentCluster[] = [
  {
    id: "menton-with-kids",
    title: t("Menton with kids", "Menton avec enfants", "Mentone con bambini", "Ментон із дітьми"),
    excerpt: t(
      "Beaches, indoor pauses, family errands and easy day plans.",
      "Plages, pauses a l'interieur, courses familiales et journees simples.",
      "Spiagge, pause al chiuso, spese per famiglie e giornate facili.",
      "Пляжі, паузи в приміщенні, сімейні справи й прості маршрути.",
    ),
    canonicalGuideSlug: "menton-with-kids-family-guide",
    supportingGuideSlugs: ["fete-du-citron-menton-practical-guide", "zoos-aquariums-animal-parks-near-menton", "stay-cool-in-menton-summer", "best-ice-cream-menton", "supermarkets-in-menton", "cinemas-in-menton-nice-monaco", "theatre-opera-performing-arts-near-menton", "museums-in-menton-nice-monaco", "golf-near-menton", "tennis-padel-courts-menton"],
    relatedPlaceIds: ["plage-sablettes", "plage-fossan", "rue-saint-michel-menton", "koaland-menton", "tennis-municipal-la-madone", "cinema-eden-menton", "theatre-de-la-cite-nice", "oceanographic-museum-monaco", "parc-phoenix-nice"],
    relatedApartmentKeys: ["beachside-family-apartment", ...seaViewApartments],
    relatedEventSlugs: ["menton-lemon-festival", "nice-carnival", "monte-carlo-circus-festival", "sanremo-in-fiore", "french-flyair-menton"],
  },
  {
    id: "menton-without-car",
    title: t("Menton without a car", "Menton sans voiture", "Mentone senza auto", "Ментон без авто"),
    excerpt: t(
      "Walkable seafront routines, trains, buses and nearby Riviera trips.",
      "Rythmes a pied en bord de mer, trains, bus et excursions proches.",
      "Routine a piedi sul lungomare, treni, bus e gite vicine.",
      "Пішохідні маршрути біля моря, потяги, автобуси й поїздки поруч.",
    ),
    canonicalGuideSlug: "menton-without-a-car",
    supportingGuideSlugs: ["public-transport-in-menton", "monaco-events-from-menton", "how-to-get-to-menton-from-nice-airport", "day-trips-from-menton", "best-beaches-in-menton"],
    relatedPlaceIds: ["promenade-du-soleil", "plage-casino", "halles-du-marche", "office-tourisme-menton-riviera-merveilles", "monaco-monte-carlo"],
    relatedApartmentKeys: allApartments,
    relatedEventSlugs: ["monaco-grand-prix", "monaco-e-prix", "rolex-monte-carlo-masters", "monaco-yacht-show", "monaco-run", "nice-carnival"],
  },
  {
    id: "beachfront-stay",
    title: t("Beachfront stay", "Sejour en bord de mer", "Soggiorno fronte mare", "Відпочинок біля моря"),
    excerpt: t(
      "Where to stay for quick swims, sea views and promenade days.",
      "Ou sejourner pour les baignades rapides, vues mer et journees promenade.",
      "Dove soggiornare per bagni rapidi, viste mare e passeggiate.",
      "Де зупинитися для швидких купань, видів на море й набережної.",
    ),
    canonicalGuideSlug: "where-to-stay-in-menton",
    supportingGuideSlugs: ["best-beaches-in-menton", "best-ice-cream-menton", "stay-cool-in-menton-summer", "quiet-evening-in-menton"],
    relatedPlaceIds: ["promenade-du-soleil", "plage-casino", "plage-fossan", "plage-sablettes", "port-de-garavan", "gelateria-sofia-menton"],
    relatedApartmentKeys: ["sea-view-balcony-studio", "beachside-family-apartment", "panoramic-sea-view-studio"],
  },
  {
    id: "day-trips",
    title: t("Day trips from Menton", "Excursions depuis Menton", "Gite da Mentone", "Поїздки з Ментона"),
    excerpt: t(
      "Monaco, Nice, Italy and hill villages from a calm seaside base.",
      "Monaco, Nice, l'Italie et villages perches depuis une base en bord de mer.",
      "Monaco, Nizza, Italia e borghi in collina da una base sul mare.",
      "Монако, Ніцца, Італія й села на пагорбах із тихої бази біля моря.",
    ),
    canonicalGuideSlug: "day-trips-from-menton",
    supportingGuideSlugs: ["monaco-events-from-menton", "italian-riviera-day-trip-from-menton", "wine-tasting-near-menton", "theatre-opera-performing-arts-near-menton", "golf-near-menton", "tennis-padel-courts-menton", "mountains-snow-skiing-near-menton", "public-transport-in-menton", "menton-three-day-itinerary", "museums-in-menton-nice-monaco"],
    relatedPlaceIds: ["monaco-monte-carlo", "nice-old-town", "ventimiglia", "bordighera", "eze-village", "dolceacqua", "chateau-de-bellet", "monte-carlo-golf-club", "tennis-padel-soleil-beausoleil", "circolo-golf-degli-ulivi-sanremo", "opera-de-monte-carlo", "col-de-turini"],
    relatedApartmentKeys: allApartments,
    relatedEventSlugs: ["monaco-grand-prix", "rolex-monte-carlo-masters", "monaco-e-prix", "monaco-run", "nice-half-marathon", "sanremo-music-festival", "sanremo-in-fiore", "milano-sanremo-cycling-race", "nice-jazz-fest"],
  },
  {
    id: "winter-autumn",
    title: t("Autumn and winter stays", "Sejours d'automne et d'hiver", "Soggiorni d'autunno e inverno", "Осінні й зимові поїздки"),
    excerpt: t(
      "Milder walks, gardens, museums and seasonal Riviera events.",
      "Balades plus douces, jardins, musees et evenements saisonniers.",
      "Passeggiate miti, giardini, musei ed eventi stagionali.",
      "М'які прогулянки, сади, музеї та сезонні події Рив'єри.",
    ),
    canonicalGuideSlug: "menton-in-autumn",
    supportingGuideSlugs: ["fete-du-citron-menton-practical-guide", "museums-in-menton-nice-monaco", "best-walks-and-hikes-around-menton", "mountains-snow-skiing-near-menton", "day-trips-from-menton", "menton-old-town"],
    relatedPlaceIds: ["jardin-val-rahmeh", "jardin-serre-de-la-madone", "cimetiere-vieux-chateau", "monaco-monte-carlo", "nice-old-town", "turini-camp-dargent"],
    relatedApartmentKeys: seaViewApartments,
    relatedEventSlugs: ["menton-lemon-festival", "monte-carlo-jazz-festival", "nice-carnival", "monaco-run", "rallye-automobile-monte-carlo", "monte-carlo-circus-festival", "christmas-markets-riviera"],
  },
  {
    id: "summer-heat",
    title: t("Summer heat and cool pauses", "Chaleur d'ete et pauses fraiches", "Caldo estivo e pause fresche", "Літня спека й прохолодні паузи"),
    excerpt: t(
      "Early walks, shaded beaches, indoor pauses and air-conditioned apartments.",
      "Balades tot, plages ombragees, pauses interieures et appartements climatises.",
      "Passeggiate presto, spiagge ombreggiate, pause al chiuso e appartamenti climatizzati.",
      "Ранні прогулянки, затінені пляжі, паузи в приміщенні й апартаменти з кондиціонером.",
    ),
    canonicalGuideSlug: "stay-cool-in-menton-summer",
    supportingGuideSlugs: ["best-beaches-in-menton", "menton-with-kids-family-guide", "zoos-aquariums-animal-parks-near-menton", "best-ice-cream-menton", "mountains-snow-skiing-near-menton", "cinemas-in-menton-nice-monaco", "museums-in-menton-nice-monaco"],
    relatedPlaceIds: ["plage-sablettes", "plage-casino", "rondelli-garavan-side", "musee-jean-cocteau-bastion", "puro-piacere-menton", "cinema-eden-menton", "col-de-turini"],
    relatedApartmentKeys: allApartments,
    relatedEventSlugs: ["summer-on-the-riviera", "menton-music-festival", "french-flyair-menton"],
  },
  {
    id: "practical-stay",
    title: t("Practical stay basics", "Bases pratiques du sejour", "Basi pratiche del soggiorno", "Практична база для поїздки"),
    excerpt: t(
      "Supermarkets, useful apps, emergency contacts and local logistics.",
      "Supermarches, applis utiles, contacts d'urgence et logistique locale.",
      "Supermercati, app utili, contatti d'emergenza e logistica locale.",
      "Супермаркети, корисні застосунки, екстрені контакти й локальна логістика.",
    ),
    canonicalGuideSlug: "useful-apps-websites-menton-monaco-italian-riviera",
    supportingGuideSlugs: ["fete-du-citron-menton-practical-guide", "supermarkets-in-menton", "best-souvenir-shops-menton-monaco-nice", "tennis-padel-courts-menton", "useful-numbers-emergency-contacts-menton", "public-transport-in-menton", "how-to-get-to-menton-from-nice-airport", "official-tourism-websites-menton-riviera", "radio-stations-menton-riviera"],
    relatedPlaceIds: ["halles-du-marche", "maison-herbin-menton", "au-pays-du-citron-menton", "u-express-menton-centre", "pharmacie-lafayette-des-jardins", "pharmacie-victoria-menton", "parking-vieille-ville-sablettes", "parking-saint-roch-menton", "parking-gare-sncf-menton", "office-tourisme-menton-riviera-merveilles", "tennis-club-de-menton", "centre-hospitalier-la-palmosa-menton", "commissariat-police-menton"],
    relatedApartmentKeys: allApartments,
  },
];

export const guideLinkAuditProfiles: GuideLinkAuditProfile[] = [
  { slug: "barbecue-picnic-areas-near-menton", ignore: ["cluster"], reason: "safety-first practical reference guide with direct links to verified picnic and controlled private options" },
  { slug: "bars-and-beer-in-menton", ignore: ["cluster", "relatedArticles"], reason: "focused nightlife subguide linked through nightlife and quiet-evening guides" },
  { slug: "best-photo-spots-menton", ignore: ["cluster"], reason: "standalone visual guide used across walk, old-town and viewpoint content" },
  { slug: "best-pastries-desserts-cakes-menton", ignore: ["cluster"], reason: "focused dessert guide surfaced through the food-and-markets collection and linked to ice cream, local food, market, day-trip and apartment content" },
  { slug: "pastis-in-menton", ignore: ["cluster"], reason: "focused aperitif guide linked to food, wine, souvenir, evening and local-sport planning" },
  { slug: "best-seafood-restaurants-menton", ignore: ["cluster"], reason: "focused food guide surfaced through the food-and-markets collection and linked to market, wine, beach and apartment content" },
  { slug: "car-rental-menton-nice-airport-convertibles", ignore: ["cluster"], reason: "standalone transport and practical-stay guide supporting airport, day-trip and car-free content" },
  { slug: "casinos-near-menton", ignore: ["cluster"], reason: "standalone evening and Monaco planning guide linked through nightlife, transport and Monaco content" },
  { slug: "cycling-bike-rental-menton", ignore: ["cluster"], reason: "standalone cycling and practical mobility guide supporting car-free, rental and outdoor content" },
  { slug: "gyms-fitness-centres-menton", ignore: ["cluster"], reason: "focused sport guide surfaced through the Sport & outdoors collection and linked to tennis, cycling, summer and car-free planning" },
  { slug: "yoga-in-menton", ignore: ["cluster"], reason: "focused wellbeing guide surfaced through the Sport & outdoors collection and linked to beaches, summer, studios and car-free planning" },
  { slug: "saunas-spas-menton", ignore: ["cluster"], reason: "focused wellbeing guide surfaced through the Sport & outdoors collection and linked to fitness, yoga, hiking, mountain and stay-planning content" },
  { slug: "petanque-in-menton", ignore: ["cluster"], reason: "focused local-sport guide surfaced through the Sport & outdoors collection and linked to Garavan, family and practical-stay content" },
  { slug: "day-trips-from-menton", ignore: ["places"], reason: "route-style hub; place coverage lives in supporting day-trip articles and sections" },
  { slug: "famous-paintings-of-menton", ignore: ["cluster"], reason: "standalone art and visual-culture guide supporting photo, old-town and museum content" },
  { slug: "films-shot-in-menton", ignore: ["cluster"], reason: "standalone screen-location guide surfaced through the culture-and-evenings collection and linked to old-town, cinema and visual-culture content" },
  { slug: "halles-du-marche-menton", ignore: ["cluster"], reason: "focused market guide supporting food, itinerary and practical-stay content" },
  { slug: "how-to-get-to-menton-from-nice-airport", ignore: ["places"], reason: "transport reference guide; links are route and planning oriented" },
  { slug: "jazz-live-music-near-menton", ignore: ["cluster"], reason: "standalone live-music guide linked through nightlife, Monaco, transport and events content" },
  { slug: "kosher-food-restaurants-menton-monaco-nice", ignore: ["cluster"], reason: "focused dietary guide connected through food, supermarket and practical-stay content" },
  { slug: "latin-dancing-salsa-bachata-menton", ignore: ["cluster"], reason: "standalone evening dance guide linked through nightlife, Monaco, transport and Italian Riviera content" },
  { slug: "local-food-menton", ignore: ["cluster"], reason: "standalone food guide supporting market, restaurant and itinerary content" },
  { slug: "shisha-hookah-near-menton", ignore: ["cluster"], reason: "standalone nightlife guide linked through nightlife and practical evening planning content" },
  { slug: "menton-one-day-itinerary", ignore: ["cluster"], reason: "standalone itinerary guide rather than a search-intent cluster entry" },
  { slug: "michelin-restaurants-menton-nice-monaco", ignore: ["cluster"], reason: "standalone restaurant guide supporting food, day-trip and evening content" },
  { slug: "music-videos-filmed-in-menton", ignore: ["cluster"], reason: "standalone visual-culture guide supporting photo, old-town and performing-arts content" },
  { slug: "monaco-events-from-menton", ignore: ["places"], reason: "event logistics guide; location context is handled by event detail pages and the Monaco hub place" },
  { slug: "morning-walk-france-to-italy", ignore: ["cluster"], reason: "focused walk guide supporting car-free and Italian Riviera planning" },
  { slug: "nightlife-in-menton", ignore: ["cluster"], reason: "standalone evening guide supporting restaurants, bars and events content" },
  { slug: "public-transport-in-menton", ignore: ["places"], reason: "transport reference guide; useful links are service and route oriented" },
  { slug: "skateparks-near-menton", ignore: ["cluster"], reason: "standalone teen and outdoor guide supporting family, cycling and day-trip content" },
  { slug: "vegan-restaurants-cafes-menton", ignore: ["cluster"], reason: "focused dietary guide connected through food, supermarket and day-trip content" },
];

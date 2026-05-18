import type { Locale } from "@/i18n/locales";
import type { GuideVisualTheme } from "@/components/guide/GuideVisual";

export type LocalizedText = Record<Locale, string>;

export type PlaceType =
  | "market"
  | "restaurant"
  | "bar"
  | "rooftop"
  | "beach"
  | "garden"
  | "museum"
  | "viewpoint"
  | "walk"
  | "port"
  | "neighbourhood";

export type PlaceSourceStatus = "needs_verification" | "verified" | "editorial";

export type Place = {
  id: string;
  name: string;
  type: PlaceType;
  address?: string;
  area?: LocalizedText;
  image?: string;
  imageAlt?: LocalizedText;
  visualTheme?: GuideVisualTheme;
  googleMapsUrl?: string;
  googleMapsSearchUrl?: string;
  googlePlaceId?: string;
  googlePhotosStatus?: "not_connected" | "future_api_possible" | "not_allowed_without_api";
  ratingStatus?: "not_connected" | "future_api_possible";
  hoursStatus?: "not_connected" | "needs_manual_verification" | "future_api_possible";
  openingHoursLabel?: LocalizedText;
  priceLabel?: LocalizedText;
  sourceStatus: PlaceSourceStatus;
  shortNote: LocalizedText;
  bestFor: LocalizedText[];
  relatedArticleIds: string[];
};

const text = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });

function mapsSearch(name: string, addressOrArea?: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    [name, addressOrArea, "Menton"].filter(Boolean).join(" "),
  )}`;
}

const checkHours = text(
  "Check current hours before visiting.",
  "Verifiez les horaires actuels avant de vous deplacer.",
  "Controlla gli orari aggiornati prima di andare.",
  "Перед візитом перевірте актуальні години роботи.",
);

const checkPrices = text(
  "Check current prices.",
  "Verifiez les tarifs actuels.",
  "Controlla i prezzi aggiornati.",
  "Перевірте актуальні ціни.",
);

const rawPlaces: Place[] = [
  {
    id: "halles-du-marche",
    name: "Halles du Marché",
    type: "market",
    address: "5 Quai de Monléon, 06500 Menton",
    googleMapsUrl: mapsSearch("Halles du Marché", "5 Quai de Monléon, 06500 Menton"),
    openingHoursLabel: text(
      "Daily morning market; check current hours before visiting.",
      "Marche du matin; verifiez les horaires actuels avant de venir.",
      "Mercato del mattino; controlla gli orari aggiornati prima della visita.",
      "Ранковий ринок; перед візитом перевірте актуальні години роботи.",
    ),
    sourceStatus: "needs_verification",
    shortNote: text(
      "A natural first stop for picnic ingredients, citrus products and a morning look at local food life.",
      "Une premiere halte naturelle pour un pique-nique, des produits au citron et l'ambiance alimentaire locale.",
      "Una tappa naturale per ingredienti da picnic, prodotti agli agrumi e vita quotidiana del mercato.",
      "Природна перша зупинка для продуктів на пікнік, цитрусових смаколиків і ранкової атмосфери міста.",
    ),
    bestFor: [text("food lovers", "amateurs de cuisine", "amanti del cibo", "любителі їжі"), text("morning walk", "promenade du matin", "passeggiata mattutina", "ранкова прогулянка")],
    relatedArticleIds: ["local-food-menton", "halles-du-marche-menton", "menton-one-day-itinerary"],
  },
  {
    id: "biera-daqui",
    name: "Biera d’Aquì",
    type: "bar",
    address: "Menton",
    googleMapsUrl: mapsSearch("Biera d’Aquì", "Menton"),
    openingHoursLabel: checkHours,
    sourceStatus: "needs_verification",
    shortNote: text("A local option to consider for craft beer and an easy aperitif.", "Une adresse a envisager pour une biere artisanale et un aperitif simple.", "Un indirizzo da considerare per birra artigianale e aperitivo informale.", "Варіант для крафтового пива та невимушеного аперитиву."),
    bestFor: [text("craft beer", "biere artisanale", "birra artigianale", "крафтове пиво"), text("aperitif", "aperitif", "aperitivo", "аперитив")],
    relatedArticleIds: ["bars-and-beer-in-menton", "quiet-evening-in-menton", "nightlife-in-menton"],
  },
  {
    id: "inky-bar",
    name: "Inky Bar",
    type: "bar",
    address: "Plage des Sablettes Voûte 4, 06500 Menton",
    googleMapsUrl: mapsSearch("Inky Bar", "Plage des Sablettes Voûte 4, 06500 Menton"),
    openingHoursLabel: text("Seasonal/night opening; check current hours.", "Ouverture saisonniere ou nocturne; verifiez les horaires.", "Apertura stagionale o serale; controlla gli orari.", "Сезонний або вечірній формат; перевірте актуальні години."),
    sourceStatus: "needs_verification",
    shortNote: text("A beachside evening option around Sablettes when the seasonal programme is active.", "Une option en bord de plage aux Sablettes lorsque la saison est active.", "Un'opzione serale vicino alle Sablettes quando la stagione e attiva.", "Вечірній варіант біля Sablettes, якщо працює сезонна програма."),
    bestFor: [text("evening plans", "soiree", "serata", "вечірні плани"), text("seafront drinks", "verre en bord de mer", "drink sul mare", "напої біля моря")],
    relatedArticleIds: ["bars-and-beer-in-menton", "nightlife-in-menton"],
  },
  {
    id: "med-rooftop",
    name: "Med Rooftop",
    type: "rooftop",
    address: "Best Western Hôtel Méditerranée, 2 Rue de la République, Menton",
    googleMapsUrl: mapsSearch("Med Rooftop", "2 Rue de la République, Menton"),
    openingHoursLabel: checkHours,
    sourceStatus: "needs_verification",
    shortNote: text("A rooftop-style option for a more elevated aperitif when open.", "Une option rooftop pour un aperitif plus panoramique lorsqu'elle est ouverte.", "Un'opzione rooftop per un aperitivo piu scenografico quando aperta.", "Rooftop-варіант для аперитиву з вищої точки, якщо він працює."),
    bestFor: [text("couples", "couples", "coppie", "пари"), text("evening view", "vue du soir", "vista serale", "вечірній краєвид")],
    relatedArticleIds: ["bars-and-beer-in-menton", "nightlife-in-menton", "quiet-evening-in-menton"],
  },
  {
    id: "les-incompris",
    name: "Les Incompris",
    type: "bar",
    address: "7 Quai Gordon Bennett, 06500 Menton",
    googleMapsUrl: mapsSearch("Les Incompris", "7 Quai Gordon Bennett, 06500 Menton"),
    openingHoursLabel: checkHours,
    sourceStatus: "needs_verification",
    shortNote: text("A central address to consider for cocktails or a relaxed evening drink.", "Une adresse centrale a envisager pour un cocktail ou un verre tranquille.", "Un indirizzo centrale da considerare per cocktail o drink tranquilli.", "Центральна адреса для коктейлю або спокійного вечірнього напою."),
    bestFor: [text("cocktails", "cocktails", "cocktail", "коктейлі"), text("evening plans", "soiree", "serata", "вечірні плани")],
    relatedArticleIds: ["nightlife-in-menton", "bars-and-beer-in-menton"],
  },
  {
    id: "bar-lescalier",
    name: "Bar L’Escalier",
    type: "bar",
    address: "Menton",
    googleMapsUrl: mapsSearch("Bar L’Escalier", "Menton"),
    openingHoursLabel: checkHours,
    sourceStatus: "needs_verification",
    shortNote: text("A possible quieter aperitif stop; confirm current details before going.", "Une possible halte aperitif plus calme; confirmez les informations avant de venir.", "Una possibile sosta tranquilla per l'aperitivo; verifica i dettagli prima.", "Можлива тиха зупинка для аперитиву; перед візитом перевірте деталі."),
    bestFor: [text("quiet drink", "verre tranquille", "drink tranquillo", "спокійний напій")],
    relatedArticleIds: ["nightlife-in-menton", "quiet-evening-in-menton"],
  },
  {
    id: "rampes-saint-michel",
    name: "Les Rampes Saint-Michel",
    type: "viewpoint",
    area: text("Old town / Saint-Michel", "Vieille ville / Saint-Michel", "Centro storico / Saint-Michel", "Старе місто / Saint-Michel"),
    googleMapsUrl: mapsSearch("Les Rampes Saint-Michel", "Menton"),
    sourceStatus: "editorial",
    shortNote: text("A classic old-town climb for colour, steps and sea-facing views.", "Une montee classique de la vieille ville, entre couleurs, marches et vues mer.", "Una salita classica nel centro storico tra colori, scale e vista mare.", "Класичний підйом старим містом: кольори, сходи й види на море."),
    bestFor: [text("views", "vues", "panorami", "краєвиди"), text("photography", "photo", "fotografia", "фото")],
    relatedArticleIds: ["quiet-evening-in-menton", "best-photo-spots-menton", "menton-one-day-itinerary", "menton-old-town"],
  },
  {
    id: "promenade-du-soleil",
    name: "Promenade du Soleil",
    type: "walk",
    area: text("Menton seafront", "Front de mer de Menton", "Lungomare di Mentone", "Набережна Ментона"),
    googleMapsUrl: mapsSearch("Promenade du Soleil", "Menton"),
    sourceStatus: "editorial",
    shortNote: text("The simplest Menton ritual: morning light, sea air and an evening return by the water.", "Le rituel le plus simple de Menton: lumiere du matin, air marin et retour le soir au bord de l'eau.", "Il rito piu semplice di Mentone: luce del mattino, aria di mare e ritorno serale sul lungomare.", "Найпростіший ритуал Ментона: ранкове світло, морське повітря і вечір біля води."),
    bestFor: [text("morning walk", "promenade du matin", "passeggiata mattutina", "ранкова прогулянка"), text("sea views", "vues mer", "vista mare", "вид на море")],
    relatedArticleIds: ["quiet-evening-in-menton", "best-beaches-in-menton", "local-food-menton"],
  },
  {
    id: "port-de-garavan",
    name: "Port de Garavan",
    type: "port",
    area: text("Garavan", "Garavan", "Garavan", "Гараван"),
    googleMapsUrl: mapsSearch("Port de Garavan", "Menton"),
    sourceStatus: "editorial",
    shortNote: text("A quieter marina walk for late afternoon or an easy evening detour.", "Une promenade de port plus calme pour la fin d'apres-midi ou le soir.", "Una passeggiata piu tranquilla al porto per il tardo pomeriggio o la sera.", "Спокійніша прогулянка біля марини наприкінці дня або ввечері."),
    bestFor: [text("quiet evening", "soiree calme", "serata tranquilla", "тихий вечір"), text("marina walk", "promenade au port", "passeggiata al porto", "прогулянка біля марини")],
    relatedArticleIds: ["quiet-evening-in-menton", "best-photo-spots-menton"],
  },
  {
    id: "cimetiere-vieux-chateau",
    name: "Cimetière du Vieux Château",
    type: "viewpoint",
    area: text("Old town hill", "Colline de la vieille ville", "Collina del centro storico", "Пагорб старого міста"),
    googleMapsUrl: mapsSearch("Cimetière du Vieux Château", "Menton"),
    sourceStatus: "editorial",
    shortNote: text("A quiet high viewpoint for panoramic Menton views; visit respectfully.", "Un belvedere calme en hauteur pour des vues panoramiques; a visiter avec respect.", "Un punto panoramico tranquillo in alto; da visitare con rispetto.", "Тиха висока точка з панорамою Ментона; відвідуйте з повагою."),
    bestFor: [text("panoramic views", "vues panoramiques", "vista panoramica", "панорамні краєвиди"), text("photography", "photo", "fotografia", "фото")],
    relatedArticleIds: ["best-photo-spots-menton", "quiet-evening-in-menton", "menton-old-town"],
  },
  {
    id: "jardin-serre-de-la-madone",
    name: "Jardin Serre de la Madone",
    type: "garden",
    address: "Route de Monti / Mont Lombard area, exact address to verify",
    googleMapsUrl: mapsSearch("Jardin Serre de la Madone", "Menton"),
    openingHoursLabel: text("Check current opening hours and prices before visiting.", "Verifiez horaires et tarifs actuels avant la visite.", "Controlla orari e prezzi aggiornati prima della visita.", "Перед візитом перевірте актуальні години роботи й ціни."),
    priceLabel: checkPrices,
    sourceStatus: "needs_verification",
    shortNote: text("A garden idea for visitors who want a quieter green break beyond the seafront.", "Une idee de jardin pour une pause verte plus calme, au-dela du front de mer.", "Un'idea verde per una pausa tranquilla oltre il lungomare.", "Садова ідея для тихої зеленої паузи поза набережною."),
    bestFor: [text("gardens", "jardins", "giardini", "сади"), text("rainy day alternative", "alternative par temps couvert", "alternativa se il tempo cambia", "варіант, якщо погода зміниться")],
    relatedArticleIds: ["best-photo-spots-menton", "menton-one-day-itinerary"],
  },
  {
    id: "jardin-val-rahmeh",
    name: "Jardin Botanique Val Rahmeh",
    type: "garden",
    address: "Avenue Saint-Jacques, 06500 Menton",
    googleMapsUrl: mapsSearch("Jardin Botanique Val Rahmeh", "Avenue Saint-Jacques, 06500 Menton"),
    openingHoursLabel: text("Check current opening hours and prices before visiting.", "Verifiez horaires et tarifs actuels avant la visite.", "Controlla orari e prezzi aggiornati prima della visita.", "Перед візитом перевірте актуальні години роботи й ціни."),
    priceLabel: checkPrices,
    sourceStatus: "needs_verification",
    shortNote: text("A botanical stop to consider for garden lovers and slower itineraries.", "Une halte botanique a envisager pour les amateurs de jardins et les sejours lents.", "Una sosta botanica per chi ama i giardini e gli itinerari lenti.", "Ботанічна зупинка для любителів садів і повільних маршрутів."),
    bestFor: [text("gardens", "jardins", "giardini", "сади"), text("slow travel", "voyage lent", "viaggio lento", "повільна подорож")],
    relatedArticleIds: ["best-photo-spots-menton", "menton-one-day-itinerary"],
  },
  {
    id: "plage-sablettes",
    name: "Plage des Sablettes",
    type: "beach",
    area: text("near old port / old town", "pres du vieux port / vieille ville", "vicino al vecchio porto / centro storico", "біля старого порту / старого міста"),
    googleMapsUrl: mapsSearch("Plage des Sablettes", "Menton"),
    sourceStatus: "editorial",
    shortNote: text("A central beach area that works well with old-town walks and family beach time.", "Une plage centrale facile a combiner avec la vieille ville et une sortie en famille.", "Una zona balneare centrale, comoda con il centro storico e le famiglie.", "Центральна пляжна зона, яку зручно поєднати зі старим містом і відпочинком з дітьми."),
    bestFor: [text("families", "familles", "famiglie", "сім'ї"), text("central beach", "plage centrale", "spiaggia centrale", "центральний пляж")],
    relatedArticleIds: ["best-beaches-in-menton", "menton-one-day-itinerary"],
  },
  {
    id: "plage-rondelli",
    name: "Plage Rondelli",
    type: "beach",
    area: text("Sablettes / Garavan side", "cote Sablettes / Garavan", "lato Sablettes / Garavan", "з боку Sablettes / Garavan"),
    googleMapsUrl: mapsSearch("Plage Rondelli", "Menton"),
    sourceStatus: "editorial",
    shortNote: text("A beach area to consider when choosing the eastern side of Menton.", "Une zone de plage a envisager cote est de Menton.", "Una zona spiaggia da considerare sul lato est di Mentone.", "Пляжна зона, яку варто розглянути на східному боці Ментона."),
    bestFor: [text("beach time", "plage", "mare", "пляж")],
    relatedArticleIds: ["best-beaches-in-menton"],
  },
  {
    id: "plage-fossan",
    name: "Plage du Fossan",
    type: "beach",
    area: text("central Menton", "Menton centre", "Mentone centro", "центр Ментона"),
    googleMapsUrl: mapsSearch("Plage du Fossan", "Menton"),
    sourceStatus: "editorial",
    shortNote: text("A central beach option for an easier, calmer beach mood when conditions suit.", "Une plage centrale pour une ambiance plus simple et calme selon les conditions.", "Una spiaggia centrale per un'atmosfera piu semplice e calma quando le condizioni sono buone.", "Центральний пляж для простішого й спокійнішого настрою, коли умови підходять."),
    bestFor: [text("central access", "acces central", "accesso centrale", "центральний доступ")],
    relatedArticleIds: ["best-beaches-in-menton"],
  },
  {
    id: "borrigo-beaches",
    name: "Borrigo Beaches",
    type: "beach",
    area: text("western Menton", "ouest de Menton", "Mentone ovest", "західний Ментон"),
    googleMapsUrl: mapsSearch("Borrigo Beaches", "Menton"),
    sourceStatus: "editorial",
    shortNote: text("Western Menton beaches can be practical for longer seafront walks.", "Les plages a l'ouest de Menton peuvent convenir aux longues promenades en bord de mer.", "Le spiagge a ovest possono essere comode per passeggiate lunghe sul mare.", "Пляжі західного Ментона зручні для довших прогулянок уздовж моря."),
    bestFor: [text("seafront walks", "promenades en bord de mer", "passeggiate sul mare", "прогулянки набережною")],
    relatedArticleIds: ["best-beaches-in-menton"],
  },
];

const placeVisuals: Record<string, Pick<Place, "image" | "imageAlt" | "visualTheme">> = {
  "halles-du-marche": {
    image: "/images/guide/halles-du-marche-place.jpg",
    imageAlt: text("Illustration of Halles du Marché in Menton", "Illustration des Halles du Marche a Menton", "Illustrazione delle Halles du Marché a Mentone", "Ілюстрація Halles du Marché у Ментоні"),
    visualTheme: "market",
  },
  "biera-daqui": {
    image: "/images/guide/biera-daqui.jpg",
    imageAlt: text("Illustration of Biera d’Aquì in Menton", "Illustration de Biera d’Aquì a Menton", "Illustrazione di Biera d’Aquì a Mentone", "Ілюстрація Biera d’Aquì у Ментоні"),
    visualTheme: "bar",
  },
  "inky-bar": {
    image: "/images/guide/inky-bar.png",
    imageAlt: text("Illustration of Inky Bar by Plage des Sablettes in Menton", "Illustration d'Inky Bar pres des Sablettes a Menton", "Illustrazione di Inky Bar vicino alle Sablettes a Mentone", "Ілюстрація Inky Bar біля Plage des Sablettes у Ментоні"),
    visualTheme: "bar",
  },
  "med-rooftop": {
    image: "/images/guide/med-rooftop.png",
    imageAlt: text("Illustration of Med Rooftop in Menton", "Illustration de Med Rooftop a Menton", "Illustrazione di Med Rooftop a Mentone", "Ілюстрація Med Rooftop у Ментоні"),
    visualTheme: "rooftop",
  },
  "les-incompris": {
    image: "/images/guide/les-incompris.png",
    imageAlt: text("Illustration of Les Incompris in Menton", "Illustration des Incompris a Menton", "Illustrazione di Les Incompris a Mentone", "Ілюстрація Les Incompris у Ментоні"),
    visualTheme: "bar",
  },
  "bar-lescalier": {
    image: "/images/guide/bar-lescalier.png",
    imageAlt: text("Illustration of Bar L’Escalier in Menton", "Illustration du Bar L’Escalier a Menton", "Illustrazione del Bar L’Escalier a Mentone", "Ілюстрація Bar L’Escalier у Ментоні"),
    visualTheme: "bar",
  },
  "rampes-saint-michel": {
    image: "/images/guide/les-rampes-saint-michel.jpg",
    imageAlt: text("Illustration of Les Rampes Saint-Michel in Menton", "Illustration des Rampes Saint-Michel a Menton", "Illustrazione delle Rampes Saint-Michel a Mentone", "Ілюстрація Les Rampes Saint-Michel у Ментоні"),
    visualTheme: "viewpoint",
  },
  "promenade-du-soleil": {
    image: "/images/guide/promenade-du-soleil.jpg",
    imageAlt: text("Illustration of Promenade du Soleil in Menton", "Illustration de la Promenade du Soleil a Menton", "Illustrazione della Promenade du Soleil a Mentone", "Ілюстрація Promenade du Soleil у Ментоні"),
    visualTheme: "sea",
  },
  "port-de-garavan": {
    image: "/images/guide/port-de-garavan.jpg",
    imageAlt: text("Illustration of Port de Garavan in Menton", "Illustration du Port de Garavan a Menton", "Illustrazione del Port de Garavan a Mentone", "Ілюстрація Port de Garavan у Ментоні"),
    visualTheme: "port",
  },
  "cimetiere-vieux-chateau": {
    image: "/images/guide/cimetiere-du-vieux-chateau.png",
    imageAlt: text("Illustration of Cimetière du Vieux Château in Menton", "Illustration du Cimetiere du Vieux Chateau a Menton", "Illustrazione del Cimetière du Vieux Château a Mentone", "Ілюстрація Cimetière du Vieux Château у Ментоні"),
    visualTheme: "viewpoint",
  },
  "jardin-serre-de-la-madone": {
    image: "/images/guide/jardin-serre-de-la-madone.jpg",
    imageAlt: text("Illustration of Jardin Serre de la Madone in Menton", "Illustration du Jardin Serre de la Madone a Menton", "Illustrazione del Jardin Serre de la Madone a Mentone", "Ілюстрація Jardin Serre de la Madone у Ментоні"),
    visualTheme: "garden",
  },
  "jardin-val-rahmeh": {
    image: "/images/guide/jardin-botanique-val-rahmeh.jpg",
    imageAlt: text("Illustration of Jardin Botanique Val Rahmeh in Menton", "Illustration du Jardin Botanique Val Rahmeh a Menton", "Illustrazione del Jardin Botanique Val Rahmeh a Mentone", "Ілюстрація Jardin Botanique Val Rahmeh у Ментоні"),
    visualTheme: "garden",
  },
  "plage-sablettes": {
    image: "/images/guide/plage-des-sablettes.jpg",
    imageAlt: text("Illustration of Plage des Sablettes in Menton", "Illustration de la Plage des Sablettes a Menton", "Illustrazione della Plage des Sablettes a Mentone", "Ілюстрація Plage des Sablettes у Ментоні"),
    visualTheme: "beach",
  },
  "plage-rondelli": {
    image: "/images/guide/plage-rondelli.jpg",
    imageAlt: text("Illustration of Plage Rondelli in Menton", "Illustration de la Plage Rondelli a Menton", "Illustrazione della Plage Rondelli a Mentone", "Ілюстрація Plage Rondelli у Ментоні"),
    visualTheme: "beach",
  },
  "plage-fossan": {
    image: "/images/guide/plage-du-fossan.jpg",
    imageAlt: text("Illustration of Plage du Fossan in Menton", "Illustration de la Plage du Fossan a Menton", "Illustrazione della Plage du Fossan a Mentone", "Ілюстрація Plage du Fossan у Ментоні"),
    visualTheme: "beach",
  },
  "borrigo-beaches": {
    image: "/images/guide/borrigo-beaches.png",
    imageAlt: text("Illustration of the Borrigo beaches in Menton", "Illustration des plages du Borrigo a Menton", "Illustrazione delle spiagge di Borrigo a Mentone", "Ілюстрація пляжів Borrigo у Ментоні"),
    visualTheme: "beach",
  },
};

export const places: Place[] = rawPlaces.map((place) => {
  const visual = placeVisuals[place.id] ?? {};
  return {
    ...place,
    ...visual,
    visualTheme: place.visualTheme ?? visual.visualTheme ?? visualThemeForPlace(place.type),
    googleMapsSearchUrl:
      place.googleMapsSearchUrl ??
      place.googleMapsUrl ??
      mapsSearch(place.name, place.address ?? place.area?.en),
    googleMapsUrl:
      place.googleMapsUrl ??
      place.googleMapsSearchUrl ??
      mapsSearch(place.name, place.address ?? place.area?.en),
    googlePhotosStatus: place.googlePhotosStatus ?? "not_connected",
    ratingStatus: place.ratingStatus ?? "not_connected",
    hoursStatus:
      place.hoursStatus ??
      (place.sourceStatus === "needs_verification" ? "needs_manual_verification" : "not_connected"),
  };
});

function visualThemeForPlace(type: PlaceType): GuideVisualTheme {
  const themes: Record<PlaceType, GuideVisualTheme> = {
    market: "market",
    restaurant: "food",
    bar: "bar",
    rooftop: "rooftop",
    beach: "beach",
    garden: "garden",
    museum: "museum",
    viewpoint: "viewpoint",
    walk: "walk",
    port: "port",
    neighbourhood: "old-town",
  };
  return themes[type];
}

export function getPlace(id: string) {
  return places.find((place) => place.id === id);
}

export function getPlaces(ids: string[] = []) {
  return ids.map((id) => getPlace(id)).filter((place): place is Place => Boolean(place));
}

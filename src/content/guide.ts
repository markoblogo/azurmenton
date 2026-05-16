import type { Locale } from "@/i18n/locales";
import { locales } from "@/i18n/locales";

export type RelatedLink = { label: string; href: string };
export type LocalizedText = Record<Locale, string>;

export type GuideCategory =
  | "food-markets"
  | "beaches"
  | "walks-views"
  | "with-children"
  | "nightlife-drinks"
  | "photo-spots"
  | "itineraries"
  | "day-trips"
  | "events"
  | "practical";

export type GuideDuration = "1 hour" | "1-2 hours" | "half-day" | "full-day" | "2-3 days" | "evening" | "flexible";
export type SourceStatus = "editorial" | "needs_verification" | "verified";

export type GuideSection = {
  heading: string;
  body: string[];
  bullets?: string[];
  relatedApartmentKeys?: string[];
  relatedPlaceIds?: string[];
  relatedEventIds?: string[];
};

export type LocalizedGuideSection = {
  heading: LocalizedText;
  body: LocalizedText[];
  bullets?: LocalizedText[];
  relatedApartmentKeys?: string[];
  relatedPlaceIds?: string[];
  relatedEventIds?: string[];
};

export type GuideArticle = {
  id: string;
  slug: string;
  title: LocalizedText;
  seoTitle: LocalizedText;
  seoDescription: LocalizedText;
  excerpt: LocalizedText;
  category: GuideCategory;
  tags: LocalizedText[];
  bestFor: LocalizedText[];
  duration?: GuideDuration;
  locationTags: string[];
  heroImage?: string;
  sourceStatus: SourceStatus;
  featured?: boolean;
  sections: LocalizedGuideSection[];
  practicalTips?: LocalizedText[];
  relatedPlaces?: string[];
  relatedArticles?: string[];
  relatedEvents?: string[];
  relatedApartments?: string[];
};

export type GuidePageContent = {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  heroImage?: string;
  sections: GuideSection[];
  practicalTips?: string[];
  relatedLinks: RelatedLink[];
  cta: { title: string; text: string; primaryLabel: string; secondaryLabel?: string };
};

export type GuideLandingContent = {
  title: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  sections: GuideSection[];
  cta: { title: string; primaryLabel: string; secondaryLabel: string };
};

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const allApartments = ["sea-view-balcony-studio", "beachside-family-apartment", "panoramic-sea-view-studio"];
const seaViewApartments = ["sea-view-balcony-studio", "panoramic-sea-view-studio"];

export const guideCategoryLabels: Record<GuideCategory, LocalizedText> = {
  "food-markets": t("Food & markets", "Cuisine & marches", "Cibo e mercati", "Їжа та ринки"),
  beaches: t("Beaches", "Plages", "Spiagge", "Пляжі"),
  "walks-views": t("Walks & views", "Balades & vues", "Passeggiate e viste", "Прогулянки та краєвиди"),
  "with-children": t("With children", "Avec enfants", "Con bambini", "З дітьми"),
  "nightlife-drinks": t("Nightlife & drinks", "Soirees & verres", "Sera e drink", "Вечори та напої"),
  "photo-spots": t("Photo spots", "Spots photo", "Luoghi fotografici", "Місця для фото"),
  itineraries: t("Itineraries", "Itineraires", "Itinerari", "Маршрути"),
  "day-trips": t("Day trips", "Excursions", "Gite in giornata", "Поїздки на день"),
  events: t("Events", "Evenements", "Eventi", "Події"),
  practical: t("Practical information", "Informations pratiques", "Informazioni pratiche", "Практична інформація"),
};

export const guideFilterLabels = {
  searchPlaceholder: t("Search beaches, food, bars, walks, day trips...", "Rechercher plages, cuisine, bars, balades, excursions...", "Cerca spiagge, cibo, bar, passeggiate, gite...", "Шукати пляжі, їжу, бари, прогулянки, поїздки..."),
  category: t("Category", "Categorie", "Categoria", "Категорія"),
  bestFor: t("Best for", "Ideal pour", "Ideale per", "Кому підійде"),
  duration: t("Duration", "Duree", "Durata", "Тривалість"),
  location: t("Location", "Lieu", "Luogo", "Локація"),
  all: t("All", "Tout", "Tutto", "Усе"),
  clear: t("Clear filters", "Effacer", "Cancella filtri", "Очистити фільтри"),
  read: t("Read guide", "Lire le guide", "Leggi la guida", "Читати гід"),
  showing: t("Showing", "Affichage", "Mostrati", "Показано"),
  guides: t("guides", "guides", "guide", "гідів"),
  empty: t("No guide articles match your filters. Try clearing filters or searching for another topic.", "Aucun guide ne correspond a vos filtres. Effacez les filtres ou cherchez un autre sujet.", "Nessuna guida corrisponde ai filtri. Cancella i filtri o cerca un altro tema.", "Немає статей за цими фільтрами. Очистіть фільтри або спробуйте іншу тему."),
};

export const guideBestForOptions = [
  { value: "couples", label: t("Couples", "Couples", "Coppie", "Пари") },
  { value: "families", label: t("Families", "Familles", "Famiglie", "Сім'ї") },
  { value: "food lovers", label: t("Food lovers", "Amateurs de cuisine", "Amanti del cibo", "Любителі їжі") },
  { value: "first-time visitors", label: t("First-time visitors", "Premier sejour", "Prima visita", "Перший візит") },
  { value: "without a car", label: t("Without a car", "Sans voiture", "Senza auto", "Без авто") },
  { value: "rainy day", label: t("Rainy day", "Jour de pluie", "Giorno di pioggia", "Дощовий день") },
  { value: "evening plans", label: t("Evening plans", "Soiree", "Serata", "Вечірні плани") },
  { value: "instagram photos", label: t("Instagram / photos", "Instagram / photos", "Instagram / foto", "Instagram / фото") },
];

export const guideDurationLabels: Record<GuideDuration, LocalizedText> = {
  "1 hour": t("1 hour", "1 heure", "1 ora", "1 година"),
  "1-2 hours": t("1-2 hours", "1-2 heures", "1-2 ore", "1-2 години"),
  "half-day": t("Half-day", "Demi-journee", "Mezza giornata", "Пів дня"),
  "full-day": t("Full day", "Journee complete", "Giornata intera", "Повний день"),
  "2-3 days": t("2-3 days", "2-3 jours", "2-3 giorni", "2-3 дні"),
  evening: t("Evening", "Soiree", "Sera", "Вечір"),
  flexible: t("Flexible", "Flexible", "Flessibile", "Гнучко"),
};

export const guideLocationOptions = [
  { value: "menton-centre", label: t("Menton centre", "Menton centre", "Mentone centro", "Центр Ментона") },
  { value: "old-town", label: t("Old town", "Vieille ville", "Centro storico", "Старе місто") },
  { value: "seafront", label: t("Seafront", "Front de mer", "Lungomare", "Набережна") },
  { value: "garavan", label: t("Garavan", "Garavan", "Garavan", "Гараван") },
  { value: "monaco", label: t("Monaco", "Monaco", "Monaco", "Монако") },
  { value: "nice", label: t("Nice", "Nice", "Nizza", "Ніцца") },
  { value: "italian-riviera", label: t("Italian Riviera", "Riviera italienne", "Riviera italiana", "Італійська Рив'єра") },
];

export const guideLanding: Record<Locale, GuideLandingContent> = {
  en: {
    title: "Menton guide: beaches, food, old town and Riviera day trips",
    seoTitle: "Menton Guide: Beaches, Food, Old Town and Riviera Day Trips",
    seoDescription: "Search practical Menton guides on beaches, food, markets, old town walks, day trips and local places near Azur Menton apartments.",
    intro: "Local notes for planning an easy seaside stay in Menton: what to eat, where to walk, which beaches to choose, and how to explore Monaco, Nice and the Italian Riviera from a central base.",
    sections: [],
    cta: { title: "Stay close to the best of Menton", primaryLabel: "View apartments", secondaryLabel: "Check availability" },
  },
  fr: {
    title: "Guide de Menton: plages, cuisine, vieille ville et excursions",
    seoTitle: "Guide de Menton: plages, cuisine, vieille ville et excursions",
    seoDescription: "Recherchez des guides pratiques sur les plages, marches, balades et excursions depuis les appartements Azur Menton.",
    intro: "Notes locales pour preparer un sejour facile a Menton: quoi gouter, ou se promener, quelles plages choisir et comment explorer Monaco, Nice et la Riviera italienne.",
    sections: [],
    cta: { title: "Sejourner pres du meilleur de Menton", primaryLabel: "Voir les appartements", secondaryLabel: "Verifier disponibilite" },
  },
  it: {
    title: "Guida di Mentone: spiagge, cibo, centro storico e gite",
    seoTitle: "Guida di Mentone: spiagge, cibo, centro storico e gite",
    seoDescription: "Cerca guide pratiche su spiagge, mercati, passeggiate e gite dagli appartamenti Azur Menton.",
    intro: "Appunti locali per organizzare un soggiorno semplice a Mentone: cosa assaggiare, dove passeggiare, quali spiagge scegliere e come esplorare Monaco, Nizza e la Riviera italiana.",
    sections: [],
    cta: { title: "Soggiorna vicino al meglio di Mentone", primaryLabel: "Vedi appartamenti", secondaryLabel: "Controlla disponibilita" },
  },
  uk: {
    title: "Гід по Ментону: пляжі, їжа, старе місто та поїздки Рив'єрою",
    seoTitle: "Гід по Ментону: пляжі, їжа, старе місто та поїздки",
    seoDescription: "Шукайте практичні гіди про пляжі, ринки, прогулянки й поїздки з апартаментів Azur Menton.",
    intro: "Локальні нотатки для спокійного відпочинку в Ментоні: що скуштувати, де гуляти, які пляжі обрати і як зручно поїхати до Монако, Ніцци та Італійської Рив'єри.",
    sections: [],
    cta: { title: "Зупиніться поруч із найкращим у Ментоні", primaryLabel: "Переглянути апартаменти", secondaryLabel: "Перевірити доступність" },
  },
};

const articles: GuideArticle[] = [
  {
    id: "local-food-menton",
    slug: "local-food-menton",
    title: t("Local food in Menton: what to try first", "Cuisine locale a Menton: quoi gouter d'abord", "Cibo locale a Mentone: cosa provare per primo", "Локальна їжа в Ментоні: що спробувати спочатку"),
    seoTitle: t("Local Food in Menton | Azur Menton Guide", "Cuisine locale a Menton | Guide Azur Menton", "Cibo locale a Mentone | Guida Azur Menton", "Локальна їжа в Ментоні | Гід Azur Menton"),
    seoDescription: t("From pichade and socca to citrus sweets and market snacks, discover Menton's French, Provençal and Italian food influences.", "De la pichade a la socca, decouvrez les influences francaises, provencales et italiennes de Menton.", "Dalla pichade alla socca, scopri le influenze francesi, provenzali e italiane di Mentone.", "Від pichade і socca до цитрусових смаколиків: знайомство з французькими, прованськими та італійськими впливами Ментона."),
    excerpt: t("From pichade and socca to citrus sweets and market snacks, Menton's food culture blends Provençal, French and Italian influences in a relaxed seaside way.", "De la pichade a la socca, jusqu'aux douceurs au citron, la cuisine de Menton melange influences provencales, francaises et italiennes.", "Dalla pichade alla socca e ai dolci agli agrumi, Mentone unisce influenze provenzali, francesi e italiane in modo rilassato.", "Від pichade і socca до цитрусових солодощів: кухня Ментона спокійно поєднує прованські, французькі й італійські впливи."),
    category: "food-markets",
    tags: [t("pichade", "pichade", "pichade", "pichade"), t("socca", "socca", "socca", "socca"), t("citrus", "agrumes", "agrumi", "цитрусові"), t("market", "marche", "mercato", "ринок")],
    bestFor: [guideBestForOptions[2].label, guideBestForOptions[3].label, guideBestForOptions[0].label, guideBestForOptions[1].label],
    duration: "flexible",
    locationTags: ["menton-centre", "old-town", "seafront"],
    sourceStatus: "needs_verification",
    featured: true,
    sections: [
      {
        heading: t("What to try first", "Quoi gouter d'abord", "Cosa provare per primo", "Що спробувати спочатку"),
        body: [
          t("Start with simple Menton flavours rather than a formal checklist: pichade, socca, fougasse mentonnaise, citrus sweets and seasonal market snacks are all good entry points.", "Commencez par des saveurs simples de Menton: pichade, socca, fougasse mentonnaise, douceurs aux agrumes et produits de saison du marche.", "Inizia da sapori semplici: pichade, socca, fougasse mentonnaise, dolci agli agrumi e spuntini stagionali del mercato.", "Почніть із простих смаків Ментона: pichade, socca, fougasse mentonnaise, цитрусові солодощі й сезонні продукти з ринку."),
          t("Availability changes by season and by stall or restaurant, so the best approach is to ask locally and visit the market in the morning.", "L'offre change selon la saison, les etals et les restaurants: le plus simple est de demander sur place et de visiter le marche le matin.", "La disponibilita cambia con stagione, banchi e ristoranti: conviene chiedere sul posto e passare al mercato al mattino.", "Наявність змінюється залежно від сезону, ятки чи ресторану, тому краще питати на місці й приходити на ринок зранку."),
        ],
        relatedPlaceIds: ["halles-du-marche", "promenade-du-soleil"],
        relatedApartmentKeys: allApartments,
      },
      {
        heading: t("Between France and Italy", "Entre France et Italie", "Tra Francia e Italia", "Між Францією та Італією"),
        body: [
          t("Menton sits close to the Italian border, and that shows in pasta traditions, market products and relaxed seaside meals. Keep heritage claims flexible until official sources are checked.", "Menton est proche de la frontiere italienne, ce qui se voit dans les pates, les produits de marche et les repas simples au bord de mer. Les details patrimoniaux restent a verifier.", "Mentone e vicina al confine italiano: lo si sente nelle paste locali, nei prodotti di mercato e nei pasti semplici sul mare. I dettagli storici vanno verificati.", "Ментон поруч з італійським кордоном, і це відчутно в пасті, ринкових продуктах та простих морських вечерях. Історичні твердження варто ще перевірити."),
        ],
        bullets: [
          t("Look for lemon and citrus products, especially around festival and market periods.", "Cherchez les produits au citron et aux agrumes, surtout pendant les periodes de marche et festival.", "Cerca prodotti al limone e agli agrumi, soprattutto nei periodi di mercato e festival.", "Звертайте увагу на лимонні й цитрусові продукти, особливо під час ринків і фестивалів."),
          t("For a simple apartment meal, gather bread, cheese, olives, fruit and something citrus-based at the market.", "Pour un repas simple a l'appartement, prenez pain, fromage, olives, fruits et un produit aux agrumes au marche.", "Per un pasto semplice in appartamento, prendi pane, formaggi, olive, frutta e qualcosa agli agrumi al mercato.", "Для простої вечері в апартаментах візьміть на ринку хліб, сир, оливки, фрукти й щось цитрусове."),
        ],
      },
    ],
    practicalTips: [t("Visit the market in the morning.", "Visitez le marche le matin.", "Visita il mercato al mattino.", "Ідіть на ринок зранку."), t("Ask locally: seasonal availability changes.", "Demandez sur place: l'offre change selon la saison.", "Chiedi sul posto: la disponibilita cambia con la stagione.", "Питайте на місці: сезонна наявність змінюється.")],
    relatedPlaces: ["halles-du-marche", "promenade-du-soleil"],
    relatedArticles: ["halles-du-marche-menton", "menton-one-day-itinerary", "bars-and-beer-in-menton"],
    relatedApartments: allApartments,
  },
  {
    id: "halles-du-marche-menton",
    slug: "halles-du-marche-menton",
    title: t("Halles du Marché: Menton's morning market", "Halles du Marche: le marche du matin de Menton", "Halles du Marché: il mercato del mattino di Mentone", "Halles du Marché: ранковий ринок Ментона"),
    seoTitle: t("Halles du Marché Menton | Morning Market Guide", "Halles du Marche Menton | Guide du marche", "Halles du Marché Mentone | Guida al mercato", "Halles du Marché Menton | Гід по ранковому ринку"),
    seoDescription: t("A practical guide to Menton's morning market for local food, picnic ingredients and an old-town walk.", "Guide pratique du marche du matin de Menton pour produits locaux, pique-nique et balade en vieille ville.", "Guida pratica al mercato mattutino di Mentone per prodotti locali, picnic e passeggiata nel centro storico.", "Практичний гід по ранковому ринку Ментона: локальна їжа, продукти для пікніка й прогулянка старим містом."),
    excerpt: t("Go in the morning for olives, citrus products, cheeses, bread, pastries, fruit and picnic ingredients before a beach or old-town walk.", "Allez-y le matin pour olives, agrumes, fromages, pain, patisseries, fruits et ingredients de pique-nique.", "Vai al mattino per olive, agrumi, formaggi, pane, dolci, frutta e ingredienti da picnic.", "Приходьте зранку за оливками, цитрусовими продуктами, сирами, хлібом, випічкою, фруктами й продуктами для пікніка."),
    category: "food-markets",
    tags: [t("market", "marche", "mercato", "ринок"), t("picnic", "pique-nique", "picnic", "пікнік"), t("morning", "matin", "mattino", "ранок")],
    bestFor: [guideBestForOptions[2].label, guideBestForOptions[1].label, guideBestForOptions[3].label, guideBestForOptions[4].label],
    duration: "1 hour",
    locationTags: ["menton-centre", "old-town", "seafront"],
    sourceStatus: "needs_verification",
    featured: true,
    sections: [
      { heading: t("Why go early", "Pourquoi venir tot", "Perche andare presto", "Чому варто прийти рано"), body: [t("The market works best as a morning stop, when the town is waking up and it is easy to combine food shopping with the old town or the beach.", "Le marche fonctionne surtout le matin, quand la ville se reveille et qu'il est facile de le combiner avec la vieille ville ou la plage.", "Il mercato rende al meglio al mattino, quando la citta si sveglia ed e facile unirlo al centro storico o alla spiaggia.", "Ринок найкраще відвідувати зранку, коли місто прокидається і його легко поєднати зі старим містом або пляжем.")], relatedPlaceIds: ["halles-du-marche"] },
      { heading: t("What to look for", "Que regarder", "Cosa cercare", "На що звернути увагу"), body: [t("Think olives, citrus products, local cheeses, bread, pastries, seasonal fruit and simple ingredients for lunch back at the apartment.", "Pensez olives, produits aux agrumes, fromages locaux, pain, patisseries, fruits de saison et ingredients simples pour dejeuner a l'appartement.", "Pensa a olive, prodotti agli agrumi, formaggi locali, pane, dolci, frutta di stagione e ingredienti semplici per pranzo in appartamento.", "Оливки, цитрусові продукти, локальні сири, хліб, випічка, сезонні фрукти й прості інгредієнти для обіду в апартаментах.")], bullets: [t("Opening hours can change; check current hours before visiting.", "Les horaires peuvent changer; verifiez avant de venir.", "Gli orari possono cambiare; controllali prima della visita.", "Години роботи можуть змінюватися; перевірте їх перед візитом."), t("Pair it with Rampes Saint-Michel or a Sablettes beach morning.", "Associez-le aux Rampes Saint-Michel ou a une matinee aux Sablettes.", "Abbinalo alle Rampes Saint-Michel o a una mattina alle Sablettes.", "Поєднайте з Rampes Saint-Michel або ранком на Sablettes.")] },
    ],
    practicalTips: [t("Bring a small bag for picnic ingredients.", "Prenez un petit sac pour les achats.", "Porta una borsa piccola per la spesa.", "Візьміть маленьку сумку для покупок."), t("Check current hours before visiting.", "Verifiez les horaires actuels.", "Controlla gli orari aggiornati.", "Перевірте актуальні години роботи.")],
    relatedPlaces: ["halles-du-marche", "rampes-saint-michel", "plage-sablettes"],
    relatedArticles: ["local-food-menton", "menton-one-day-itinerary", "quiet-evening-in-menton"],
    relatedApartments: allApartments,
  },
  {
    id: "bars-and-beer-in-menton",
    slug: "bars-and-beer-in-menton",
    title: t("Where to drink in Menton: craft beer, beach bars and rooftops", "Ou boire a Menton: biere artisanale, bars de plage et rooftops", "Dove bere a Mentone: birra artigianale, beach bar e rooftop", "Де випити в Ментоні: крафтове пиво, пляжні бари й rooftop"),
    seoTitle: t("Where to Drink in Menton | Bars, Beer and Rooftops", "Ou boire a Menton | Bars, bieres et rooftops", "Dove bere a Mentone | Bar, birra e rooftop", "Де випити в Ментоні | Бари, пиво й rooftop"),
    seoDescription: t("A realistic guide to Menton's relaxed evening drinks, craft beer options, beach bars and rooftop aperitifs.", "Guide realiste des verres du soir a Menton: biere artisanale, bars de plage et rooftops.", "Guida realistica ai drink serali a Mentone: birra artigianale, beach bar e rooftop.", "Реалістичний гід по вечірніх напоях у Ментоні: крафтове пиво, пляжні бари й rooftop."),
    excerpt: t("Menton is more relaxed than late-night: think aperitifs, craft beer, beachside evenings and rooftop drinks rather than heavy nightlife.", "Menton est plutot detendue que nocturne: aperitifs, biere artisanale, soirees plage et rooftops.", "Mentone e piu rilassata che notturna: aperitivi, birra artigianale, serate sul mare e rooftop.", "Ментон радше спокійний, ніж нічний: аперитиви, крафтове пиво, вечори біля моря й rooftop."),
    category: "nightlife-drinks",
    tags: [t("bars", "bars", "bar", "бари"), t("craft beer", "biere artisanale", "birra artigianale", "крафтове пиво"), t("rooftop", "rooftop", "rooftop", "rooftop")],
    bestFor: [guideBestForOptions[0].label, guideBestForOptions[6].label, guideBestForOptions[2].label],
    duration: "evening",
    locationTags: ["menton-centre", "seafront", "old-town"],
    sourceStatus: "needs_verification",
    sections: [
      { heading: t("Keep expectations relaxed", "Gardez une attente detendue", "Aspettati serate rilassate", "Очікуйте спокійний формат"), body: [t("Menton is not a heavy nightlife city. Its evening mood is better for an aperitif, a beachside drink, a rooftop view or a quiet cocktail after dinner.", "Menton n'est pas une ville de grosse vie nocturne. L'ambiance convient mieux a un aperitif, un verre en bord de mer, un rooftop ou un cocktail calme.", "Mentone non e una citta da grande vita notturna. Funziona meglio per aperitivo, drink sul mare, rooftop o cocktail tranquillo.", "Ментон не місто гучного нічного життя. Тут краще працюють аперитив, напій біля моря, rooftop або спокійний коктейль після вечері.")], relatedPlaceIds: ["biera-daqui", "inky-bar", "med-rooftop", "les-incompris", "bar-lescalier"] },
      { heading: t("Check before going", "Verifiez avant de sortir", "Controlla prima di uscire", "Перевіряйте перед виходом"), body: [t("Bar hours, seasonal beach programmes and rooftop access can change. Treat this as a starting list and check current details before going.", "Les horaires, programmes de plage et acces rooftop peuvent changer. Utilisez cette liste comme point de depart et verifiez avant de sortir.", "Orari, programmi stagionali e accesso ai rooftop possono cambiare. Usa questa lista come punto di partenza e controlla prima.", "Години роботи, сезонні пляжні програми й доступ на rooftop можуть змінюватися. Використовуйте це як стартовий список і перевіряйте деталі.")], bullets: [t("Biera d’Aquì: craft beer and casual aperitif idea.", "Biera d’Aquì: biere artisanale et aperitif simple.", "Biera d’Aquì: birra artigianale e aperitivo informale.", "Biera d’Aquì: крафтове пиво й невимушений аперитив."), t("Inky Bar and Sablettes: seasonal beachside atmosphere.", "Inky Bar et Sablettes: ambiance saisonniere en bord de mer.", "Inky Bar e Sablettes: atmosfera stagionale sul mare.", "Inky Bar і Sablettes: сезонна атмосфера біля моря.")] },
    ],
    practicalTips: [t("Check current hours before going.", "Verifiez les horaires avant de sortir.", "Controlla gli orari prima di andare.", "Перед виходом перевірте години роботи."), t("For a quieter evening, choose an aperitif walk rather than a late night plan.", "Pour une soiree calme, choisissez un aperitif et une promenade plutot qu'une nuit tardive.", "Per una serata tranquilla, scegli aperitivo e passeggiata invece di una notte lunga.", "Для спокійного вечора оберіть аперитив і прогулянку, а не пізню ніч.")],
    relatedPlaces: ["biera-daqui", "inky-bar", "med-rooftop", "les-incompris", "bar-lescalier"],
    relatedArticles: ["nightlife-in-menton", "quiet-evening-in-menton"],
    relatedApartments: seaViewApartments,
  },
];

function shortArticle(input: {
  id: string;
  slug: string;
  title: LocalizedText;
  seoTitle: LocalizedText;
  seoDescription: LocalizedText;
  excerpt: LocalizedText;
  category: GuideCategory;
  tags: LocalizedText[];
  bestFor: LocalizedText[];
  duration: GuideDuration;
  locationTags: string[];
  featured?: boolean;
  relatedPlaces?: string[];
  relatedArticles?: string[];
  relatedEvents?: string[];
  relatedApartments?: string[];
  sections: LocalizedGuideSection[];
  practicalTips?: LocalizedText[];
}): GuideArticle {
  return { sourceStatus: "editorial", ...input };
}

export const guideArticles: GuideArticle[] = [
  ...articles,
  shortArticle({
    id: "quiet-evening-in-menton",
    slug: "quiet-evening-in-menton",
    title: t("A quiet evening in Menton: walks, views and calm corners", "Une soiree calme a Menton: balades, vues et coins paisibles", "Una serata tranquilla a Mentone: passeggiate, viste e angoli calmi", "Тихий вечір у Ментоні: прогулянки, краєвиди й спокійні місця"),
    seoTitle: t("A Quiet Evening in Menton | Walks and Views", "Une soiree calme a Menton | Balades et vues", "Una serata tranquilla a Mentone | Passeggiate e viste", "Тихий вечір у Ментоні | Прогулянки й краєвиди"),
    seoDescription: t("Plan a calm Menton evening with old-town streets, Rampes Saint-Michel, Port de Garavan and the seafront promenade.", "Planifiez une soiree calme a Menton entre vieille ville, Rampes Saint-Michel, Port de Garavan et promenade.", "Organizza una serata tranquilla tra centro storico, Rampes Saint-Michel, Port de Garavan e lungomare.", "Сплануйте тихий вечір у Ментоні: старе місто, Rampes Saint-Michel, Port de Garavan і набережна."),
    excerpt: t("A slow evening route for couples and first-time visitors: old-town steps, sea views, Garavan and a relaxed promenade return.", "Un parcours lent pour couples et premiers sejours: marches de la vieille ville, vues mer, Garavan et retour par la promenade.", "Un percorso lento per coppie e prime visite: scale del centro storico, vista mare, Garavan e ritorno sul lungomare.", "Повільний вечірній маршрут для пар і першого візиту: сходи старого міста, море, Garavan і повернення набережною."),
    category: "walks-views",
    tags: [t("sunset", "coucher de soleil", "tramonto", "захід сонця"), t("old town", "vieille ville", "centro storico", "старе місто")],
    bestFor: [guideBestForOptions[0].label, guideBestForOptions[6].label, guideBestForOptions[3].label],
    duration: "1-2 hours",
    locationTags: ["old-town", "seafront", "garavan"],
    relatedPlaces: ["rampes-saint-michel", "port-de-garavan", "cimetiere-vieux-chateau", "promenade-du-soleil"],
    relatedArticles: ["best-photo-spots-menton", "bars-and-beer-in-menton"],
    relatedApartments: seaViewApartments,
    sections: [
      { heading: t("Start above the seafront", "Commencer au-dessus du front de mer", "Inizia sopra il lungomare", "Почніть над набережною"), body: [t("Walk slowly through the old town and Rampes Saint-Michel, then let the route open back toward the sea.", "Traversez lentement la vieille ville et les Rampes Saint-Michel, puis laissez le chemin revenir vers la mer.", "Cammina lentamente nel centro storico e sulle Rampes Saint-Michel, poi torna verso il mare.", "Повільно пройдіть старим містом і Rampes Saint-Michel, а потім поверніться до моря.")], relatedPlaceIds: ["rampes-saint-michel", "cimetiere-vieux-chateau"] },
      { heading: t("Finish by the water", "Finir au bord de l'eau", "Finisci sull'acqua", "Завершіть біля води"), body: [t("The Promenade du Soleil and Port de Garavan are easy ways to end the day without turning the evening into a busy plan.", "La Promenade du Soleil et le Port de Garavan terminent la journee simplement, sans programme surcharge.", "Promenade du Soleil e Port de Garavan chiudono la giornata con calma, senza un programma pesante.", "Promenade du Soleil і Port de Garavan дозволяють завершити день спокійно, без перевантаженого плану.")], relatedPlaceIds: ["promenade-du-soleil", "port-de-garavan"] },
    ],
  }),
  shortArticle({
    id: "nightlife-in-menton",
    slug: "nightlife-in-menton",
    title: t("Evening drinks and nightlife in Menton", "Verres du soir et vie nocturne a Menton", "Drink serali e vita notturna a Mentone", "Вечірні напої та нічне життя в Ментоні"),
    seoTitle: t("Nightlife in Menton | Evening Drinks Guide", "Vie nocturne a Menton | Guide des verres du soir", "Vita notturna a Mentone | Guida ai drink serali", "Нічне життя в Ментоні | Гід по вечірніх напоях"),
    seoDescription: t("A realistic guide to Menton's relaxed cocktail bars, rooftops, beachside evenings and quiet aperitif options.", "Guide realiste des cocktails, rooftops, bars de plage et aperitifs calmes a Menton.", "Guida realistica a cocktail bar, rooftop, serate sul mare e aperitivi tranquilli a Mentone.", "Реалістичний гід по коктейль-барах, rooftop, вечорах біля моря й тихих аперитивах у Ментоні."),
    excerpt: t("Menton evenings are more about relaxed drinks and the seafront than clubbing. Choose cocktails, rooftop views or a quiet aperitif.", "Les soirees de Menton parlent plus de verres detendus et de front de mer que de clubs.", "Le serate di Mentone sono piu drink rilassati e lungomare che club.", "Вечори Ментона більше про спокійні напої й набережну, ніж про клуби."),
    category: "nightlife-drinks",
    tags: [t("cocktails", "cocktails", "cocktail", "коктейлі"), t("aperitif", "aperitif", "aperitivo", "аперитив")],
    bestFor: [guideBestForOptions[0].label, guideBestForOptions[6].label],
    duration: "evening",
    locationTags: ["menton-centre", "seafront"],
    relatedPlaces: ["inky-bar", "med-rooftop", "les-incompris", "bar-lescalier"],
    relatedArticles: ["bars-and-beer-in-menton", "quiet-evening-in-menton"],
    relatedApartments: seaViewApartments,
    sections: [
      { heading: t("A relaxed seaside night", "Une nuit detendue au bord de mer", "Una sera rilassata sul mare", "Спокійний вечір біля моря"), body: [t("Think aperitif, dinner, a short walk and one well-chosen drink. Seasonal music or DJ nights should be checked locally before planning around them.", "Pensez aperitif, diner, petite promenade et un verre bien choisi. Les soirees musicales saisonnieres sont a verifier localement.", "Pensa ad aperitivo, cena, breve passeggiata e un drink scelto bene. Musica e DJ set stagionali vanno verificati sul posto.", "Думайте про аперитив, вечерю, коротку прогулянку й один вдалий напій. Сезонну музику чи DJ-вечори перевіряйте на місці.")], relatedPlaceIds: ["inky-bar", "med-rooftop", "les-incompris"] },
    ],
  }),
  shortArticle({
    id: "best-photo-spots-menton",
    slug: "best-photo-spots-menton",
    title: t("Best photo spots in Menton", "Meilleurs spots photo a Menton", "Migliori luoghi fotografici a Mentone", "Найкращі місця для фото в Ментоні"),
    seoTitle: t("Best Photo Spots in Menton | Azur Menton Guide", "Meilleurs spots photo a Menton | Guide Azur Menton", "Migliori spot fotografici a Mentone | Guida Azur Menton", "Найкращі місця для фото в Ментоні | Гід Azur Menton"),
    seoDescription: t("Colourful old-town streets, Rampes Saint-Michel, seafront views, gardens and Garavan photo ideas in Menton.", "Ruelles colorees, Rampes Saint-Michel, vues mer, jardins et idees photo a Garavan.", "Strade colorate, Rampes Saint-Michel, vista mare, giardini e idee foto a Garavan.", "Кольорові вулиці, Rampes Saint-Michel, море, сади й фотоідеї в Garavan."),
    excerpt: t("A half-day route for colour, sea views and quieter corners, with garden details kept flexible until opening hours are checked.", "Un parcours demi-journee pour couleurs, vues mer et coins calmes, avec horaires de jardins a verifier.", "Un percorso di mezza giornata tra colori, mare e angoli tranquilli, con orari dei giardini da verificare.", "Маршрут на пів дня для кольорів, моря й тихих куточків; години садів треба перевіряти."),
    category: "photo-spots",
    tags: [t("views", "vues", "viste", "краєвиди"), t("old town", "vieille ville", "centro storico", "старе місто")],
    bestFor: [guideBestForOptions[0].label, guideBestForOptions[7].label, guideBestForOptions[3].label],
    duration: "half-day",
    locationTags: ["old-town", "seafront", "garavan"],
    featured: true,
    relatedPlaces: ["rampes-saint-michel", "promenade-du-soleil", "jardin-serre-de-la-madone", "jardin-val-rahmeh", "cimetiere-vieux-chateau", "port-de-garavan"],
    relatedArticles: ["quiet-evening-in-menton", "menton-old-town"],
    relatedEvents: ["menton-lemon-festival"],
    relatedApartments: seaViewApartments,
    sections: [
      { heading: t("Colour and height", "Couleur et hauteur", "Colore e altezza", "Колір і висота"), body: [t("Start with old-town streets, Rampes Saint-Michel and the Cimetière du Vieux Château for colour, steps and wide views.", "Commencez par la vieille ville, les Rampes Saint-Michel et le Cimetière du Vieux Château pour les couleurs et les vues.", "Inizia dal centro storico, Rampes Saint-Michel e Cimetière du Vieux Château per colori e panorami.", "Почніть зі старого міста, Rampes Saint-Michel і Cimetière du Vieux Château для кольорів і широких видів.")], relatedPlaceIds: ["rampes-saint-michel", "cimetiere-vieux-chateau"] },
      { heading: t("Gardens and seafront", "Jardins et front de mer", "Giardini e lungomare", "Сади й набережна"), body: [t("Gardens can be beautiful photo stops, but check current opening hours and prices before building the day around them.", "Les jardins peuvent etre tres beaux pour la photo, mais verifiez horaires et tarifs avant de les placer au centre de la journee.", "I giardini sono ottimi per foto, ma controlla orari e prezzi prima di organizzarci la giornata.", "Сади можуть бути чудовими для фото, але перед плануванням перевірте години роботи й ціни.")], relatedPlaceIds: ["jardin-serre-de-la-madone", "jardin-val-rahmeh", "promenade-du-soleil"] },
    ],
  }),
  shortArticle({
    id: "best-beaches-in-menton",
    slug: "best-beaches-in-menton",
    title: t("Best beaches in Menton: which one to choose", "Meilleures plages de Menton: laquelle choisir", "Migliori spiagge di Mentone: quale scegliere", "Найкращі пляжі Ментона: який обрати"),
    seoTitle: t("Best Beaches in Menton | Azur Menton", "Meilleures plages de Menton | Azur Menton", "Migliori spiagge di Mentone | Azur Menton", "Найкращі пляжі Ментона | Azur Menton"),
    seoDescription: t("Compare Sablettes, Fossan, central promenade beaches and Borrigo beaches for families, couples and car-free stays.", "Comparez Sablettes, Fossan, plages centrales et Borrigo pour familles, couples et sejours sans voiture.", "Confronta Sablettes, Fossan, spiagge centrali e Borrigo per famiglie, coppie e soggiorni senza auto.", "Порівняйте Sablettes, Fossan, центральні пляжі й Borrigo для сімей, пар і відпочинку без авто."),
    excerpt: t("Sablettes for families, Fossan for a calmer mood, central beaches for easy access, and Borrigo for longer seafront walks.", "Sablettes pour les familles, Fossan pour une ambiance plus calme, plages centrales pour l'acces facile, Borrigo pour les longues balades.", "Sablettes per famiglie, Fossan per un'atmosfera piu calma, spiagge centrali per accesso facile, Borrigo per lunghe passeggiate.", "Sablettes для сімей, Fossan для спокійнішого настрою, центральні пляжі для легкого доступу, Borrigo для довших прогулянок."),
    category: "beaches",
    tags: [t("Sablettes", "Sablettes", "Sablettes", "Sablettes"), t("family beach", "plage famille", "spiaggia famiglie", "пляж для сімей")],
    bestFor: [guideBestForOptions[1].label, guideBestForOptions[0].label, guideBestForOptions[3].label, guideBestForOptions[4].label],
    duration: "half-day",
    locationTags: ["seafront", "menton-centre", "garavan"],
    featured: true,
    relatedPlaces: ["plage-sablettes", "plage-rondelli", "plage-fossan", "borrigo-beaches", "promenade-du-soleil"],
    relatedArticles: ["menton-one-day-itinerary", "where-to-stay-in-menton", "menton-without-a-car"],
    relatedApartments: allApartments,
    sections: [
      { heading: t("Choose by mood", "Choisir selon l'ambiance", "Scegli in base all'umore", "Обирайте за настроєм"), body: [t("Menton beaches are less about one perfect answer and more about the day you want: family-friendly, central, quieter or built around a long walk.", "Les plages de Menton ne se resument pas a une seule reponse: choisissez selon la journee voulue, familiale, centrale, calme ou propice a la balade.", "Le spiagge di Mentone non hanno una sola risposta: scegli in base alla giornata, famiglia, centro, calma o lunga passeggiata.", "Пляжі Ментона не мають однієї правильної відповіді: обирайте за настроєм дня - сімейний, центральний, тихий або для прогулянок.")], relatedPlaceIds: ["plage-sablettes", "plage-fossan", "borrigo-beaches"] },
      { heading: t("Practical beach notes", "Notes pratiques plage", "Note pratiche per la spiaggia", "Практичні пляжні нотатки"), body: [t("Beach services and sea conditions vary by season and weather. Beach shoes can be useful on pebbles or mixed surfaces.", "Les services de plage et l'etat de la mer varient selon saison et meteo. Des chaussures d'eau peuvent etre utiles.", "Servizi e condizioni del mare cambiano con stagione e meteo. Le scarpe da scoglio possono essere utili.", "Пляжні сервіси й стан моря залежать від сезону та погоди. Взуття для води може бути корисним.")], bullets: [t("Check seasonal services locally.", "Verifiez les services saisonniers sur place.", "Controlla i servizi stagionali sul posto.", "Перевіряйте сезонні сервіси на місці."), t("Summer weekends can be busy.", "Les week-ends d'ete peuvent etre tres frequentes.", "I weekend estivi possono essere affollati.", "Літні вихідні можуть бути людними.")] },
    ],
  }),
  shortArticle({
    id: "menton-one-day-itinerary",
    slug: "menton-one-day-itinerary",
    title: t("Menton in one day: a relaxed walking itinerary", "Menton en une journee: itineraire a pied detendu", "Mentone in un giorno: itinerario a piedi rilassato", "Ментон за один день: спокійний пішохідний маршрут"),
    seoTitle: t("Menton in One Day | Walking Itinerary", "Menton en une journee | Itineraire a pied", "Mentone in un giorno | Itinerario a piedi", "Ментон за один день | Пішохідний маршрут"),
    seoDescription: t("A flexible one-day Menton itinerary with the market, old town, Sablettes beach, gardens and an easy seafront evening.", "Itineraire flexible d'une journee a Menton: marche, vieille ville, Sablettes, jardins et soiree en bord de mer.", "Itinerario flessibile di un giorno: mercato, centro storico, Sablettes, giardini e serata sul lungomare.", "Гнучкий маршрут на день: ринок, старе місто, Sablettes, сади й вечір на набережній."),
    excerpt: t("Morning market and old town, midday by Sablettes, a flexible garden stop, then a relaxed promenade evening.", "Marche et vieille ville le matin, Sablettes a midi, jardin si les horaires conviennent, puis soiree promenade.", "Mercato e centro storico al mattino, Sablettes a mezzogiorno, giardino se gli orari vanno bene, poi passeggiata serale.", "Зранку ринок і старе місто, вдень Sablettes, сад за наявності часу, ввечері прогулянка набережною."),
    category: "itineraries",
    tags: [t("one day", "une journee", "un giorno", "один день"), t("walking", "a pied", "a piedi", "пішки")],
    bestFor: [guideBestForOptions[3].label, guideBestForOptions[0].label, guideBestForOptions[4].label],
    duration: "full-day",
    locationTags: ["menton-centre", "old-town", "seafront"],
    featured: true,
    relatedPlaces: ["halles-du-marche", "rampes-saint-michel", "plage-sablettes", "jardin-serre-de-la-madone", "jardin-val-rahmeh", "promenade-du-soleil"],
    relatedArticles: ["halles-du-marche-menton", "best-beaches-in-menton", "quiet-evening-in-menton"],
    relatedEvents: ["menton-lemon-festival"],
    relatedApartments: allApartments,
    sections: [
      { heading: t("Morning: market and old town", "Matin: marche et vieille ville", "Mattina: mercato e centro storico", "Ранок: ринок і старе місто"), body: [t("Start at Halles du Marché, then climb gently toward the old town and Rampes Saint-Michel before the day becomes too hot or busy.", "Commencez aux Halles du Marche, puis montez doucement vers la vieille ville et les Rampes Saint-Michel avant la chaleur ou la foule.", "Inizia alle Halles du Marché, poi sali verso il centro storico e Rampes Saint-Michel prima del caldo o della folla.", "Почніть з Halles du Marché, потім повільно підніміться до старого міста й Rampes Saint-Michel, поки не стало спекотно або людно.")], relatedPlaceIds: ["halles-du-marche", "rampes-saint-michel"] },
      { heading: t("Afternoon and evening", "Apres-midi et soiree", "Pomeriggio e sera", "День і вечір"), body: [t("Keep the afternoon flexible: Sablettes for the beach, a garden if opening hours work, then Promenade du Soleil for the evening light.", "Gardez l'apres-midi flexible: Sablettes pour la plage, un jardin si les horaires conviennent, puis Promenade du Soleil pour la lumiere du soir.", "Lascia il pomeriggio flessibile: Sablettes per la spiaggia, un giardino se aperto, poi Promenade du Soleil con la luce serale.", "Залиште день гнучким: Sablettes для пляжу, сад якщо працює, а потім Promenade du Soleil у вечірньому світлі.")], relatedPlaceIds: ["plage-sablettes", "jardin-val-rahmeh", "promenade-du-soleil"] },
    ],
  }),
  shortArticle({
    id: "menton-three-day-itinerary",
    slug: "menton-three-day-itinerary",
    title: t("Menton in three days: sea, Monaco and the Italian Riviera", "Menton en trois jours: mer, Monaco et Riviera italienne", "Mentone in tre giorni: mare, Monaco e Riviera italiana", "Ментон за три дні: море, Монако й Італійська Рив'єра"),
    seoTitle: t("Menton in Three Days | Monaco, Nice and Italian Riviera", "Menton en trois jours | Monaco, Nice et Riviera italienne", "Mentone in tre giorni | Monaco, Nizza e Riviera italiana", "Ментон за три дні | Монако, Ніцца й Італійська Рив'єра"),
    seoDescription: t("A three-day Menton itinerary with local essentials, Monaco, Nice or Ventimiglia and easy seaside evenings.", "Itineraire de trois jours: essentiels de Menton, Monaco, Nice ou Vintimille et soirees en bord de mer.", "Itinerario di tre giorni: Mentone essenziale, Monaco, Nizza o Ventimiglia e serate sul mare.", "Маршрут на три дні: головне в Ментоні, Монако, Ніцца або Вентімілья й вечори біля моря."),
    excerpt: t("Use Menton as a calm base: one local day, one Monaco day, then Nice or the Italian Riviera depending on mood.", "Utilisez Menton comme base calme: un jour local, un jour Monaco, puis Nice ou la Riviera italienne selon l'envie.", "Usa Mentone come base calma: un giorno locale, uno a Monaco, poi Nizza o Riviera italiana.", "Використайте Ментон як спокійну базу: день у місті, день у Монако, потім Ніцца або Італійська Рив'єра."),
    category: "itineraries",
    tags: [t("three days", "trois jours", "tre giorni", "три дні"), t("day trips", "excursions", "gite", "поїздки")],
    bestFor: [guideBestForOptions[3].label, guideBestForOptions[0].label, guideBestForOptions[1].label],
    duration: "2-3 days",
    locationTags: ["menton-centre", "monaco", "nice", "italian-riviera"],
    relatedArticles: ["day-trips-from-menton", "menton-without-a-car", "best-beaches-in-menton"],
    relatedApartments: allApartments,
    sections: [
      { heading: t("Day 1: Menton essentials", "Jour 1: les essentiels de Menton", "Giorno 1: Mentone essenziale", "День 1: головне в Ментоні"), body: [t("Market, old town, beach and a seaside evening give the first day a local rhythm without rushing.", "Marche, vieille ville, plage et soiree en bord de mer donnent un rythme local sans courir.", "Mercato, centro storico, spiaggia e serata sul mare danno ritmo locale senza fretta.", "Ринок, старе місто, пляж і вечір біля моря задають місцевий ритм без поспіху.")] },
      { heading: t("Days 2 and 3: choose your Riviera", "Jours 2 et 3: choisir votre Riviera", "Giorni 2 e 3: scegli la tua Riviera", "Дні 2 і 3: оберіть свою Рив'єру"), body: [t("Make one Monaco day, then choose Nice or Ventimiglia / the Italian Riviera. Check current train times before travelling.", "Prevoyez une journee a Monaco, puis choisissez Nice ou Vintimille / la Riviera italienne. Verifiez les trains avant de partir.", "Dedica un giorno a Monaco, poi scegli Nizza o Ventimiglia / Riviera italiana. Controlla i treni prima di partire.", "Один день присвятіть Монако, потім оберіть Ніццу або Вентімілью / Італійську Рив'єру. Перед поїздкою перевірте розклад потягів.")] },
    ],
  }),
  shortArticle({
    id: "menton-old-town",
    slug: "menton-old-town",
    title: t("Menton old town: colourful streets, sea views and slow walks", "Vieille ville de Menton: couleurs, vues mer et balades lentes", "Centro storico di Mentone: colori, mare e passeggiate lente", "Старе місто Ментона: кольорові вулиці, море й повільні прогулянки"),
    seoTitle: t("Menton Old Town Guide | Walks and Where to Stay Nearby", "Guide vieille ville de Menton | Balades et sejour proche", "Guida al centro storico di Mentone | Passeggiate e dove stare", "Гід по старому місту Ментона | Прогулянки й де зупинитися"),
    seoDescription: t("Explore Menton's old town, colourful streets, Saint-Michel area and easy walks from central Azur Menton apartments.", "Explorez la vieille ville, les rues colorees, Saint-Michel et les balades faciles depuis Azur Menton.", "Esplora centro storico, strade colorate, Saint-Michel e passeggiate facili da Azur Menton.", "Дослідіть старе місто, кольорові вулиці, Saint-Michel і легкі прогулянки від Azur Menton."),
    excerpt: t("The old town is best enjoyed on foot, slowly, moving between coloured facades, steps, cafes and views back to the sea.", "La vieille ville se decouvre lentement a pied, entre facades colorees, marches, cafes et vues vers la mer.", "Il centro storico si vive a piedi e con calma, tra facciate colorate, scale, caffe e vista mare.", "Старе місто найкраще відкривати пішки й без поспіху: кольорові фасади, сходи, кафе й види на море."),
    category: "walks-views",
    tags: [t("old town", "vieille ville", "centro storico", "старе місто"), t("Saint-Michel", "Saint-Michel", "Saint-Michel", "Saint-Michel")],
    bestFor: [guideBestForOptions[0].label, guideBestForOptions[3].label, guideBestForOptions[7].label],
    duration: "half-day",
    locationTags: ["old-town", "menton-centre"],
    relatedPlaces: ["rampes-saint-michel", "cimetiere-vieux-chateau"],
    relatedArticles: ["quiet-evening-in-menton", "best-photo-spots-menton"],
    relatedApartments: seaViewApartments,
    sections: [{ heading: t("Go slowly", "Avancer lentement", "Vai piano", "Не поспішайте"), body: [t("The useful route is simple: climb from the seafront into the old town, pause around Saint-Michel, then return toward the promenade.", "Le parcours utile est simple: monter du front de mer vers la vieille ville, faire une pause autour de Saint-Michel, puis redescendre vers la promenade.", "Il percorso e semplice: sali dal lungomare al centro storico, fermati intorno a Saint-Michel, poi torna alla passeggiata.", "Маршрут простий: підніміться з набережної до старого міста, зробіть паузу біля Saint-Michel, а потім поверніться до променада.")], relatedPlaceIds: ["rampes-saint-michel"] }],
  }),
  shortArticle({
    id: "how-to-get-to-menton-from-nice-airport",
    slug: "how-to-get-to-menton-from-nice-airport",
    title: t("How to get to Menton from Nice Airport", "Comment aller a Menton depuis l'aeroport de Nice", "Come arrivare a Mentone dall'aeroporto di Nizza", "Як дістатися до Ментона з аеропорту Ніцци"),
    seoTitle: t("How to Get from Nice Airport to Menton | Azur Menton", "Aeroport de Nice a Menton | Guide Azur Menton", "Da Aeroporto di Nizza a Mentone | Azur Menton", "З аеропорту Ніцци до Ментона | Azur Menton"),
    seoDescription: t("Practical options for reaching Menton from Nice Airport by train, car, taxi or transfer without fixed timetable claims.", "Options pratiques pour rejoindre Menton depuis l'aeroport de Nice en train, voiture, taxi ou transfert.", "Opzioni pratiche per raggiungere Mentone dall'aeroporto di Nizza in treno, auto, taxi o transfer.", "Практичні варіанти доїзду з аеропорту Ніцци до Ментона: потяг, авто, таксі або трансфер."),
    excerpt: t("Train, car rental, taxi or transfer can all work. Check current routes and timings before travel, especially during events.", "Train, location de voiture, taxi ou transfert peuvent convenir. Verifiez horaires et acces avant le voyage.", "Treno, noleggio auto, taxi o transfer possono funzionare. Controlla percorsi e orari prima del viaggio.", "Потяг, оренда авто, таксі або трансфер можуть підійти. Перед поїздкою перевірте маршрути й час."),
    category: "practical",
    tags: [t("airport", "aeroport", "aeroporto", "аеропорт"), t("transport", "transport", "trasporti", "транспорт")],
    bestFor: [guideBestForOptions[3].label, guideBestForOptions[4].label],
    duration: "flexible",
    locationTags: ["nice", "menton-centre"],
    relatedArticles: ["menton-without-a-car", "where-to-stay-in-menton"],
    relatedApartments: allApartments,
    sections: [{ heading: t("Main options", "Options principales", "Opzioni principali", "Основні варіанти"), body: [t("Train, car rental, taxi and private transfer are the usual choices. Do not rely on old schedules: check current routes before travelling.", "Train, location de voiture, taxi et transfert prive sont les choix habituels. Ne vous fiez pas a de vieux horaires: verifiez avant de partir.", "Treno, noleggio auto, taxi e transfer privato sono le scelte comuni. Non usare vecchi orari: controlla prima di partire.", "Зазвичай обирають потяг, оренду авто, таксі або приватний трансфер. Не покладайтеся на старий розклад: перевіряйте актуальну інформацію.")], bullets: [t("Parking matters if you arrive by car; ask the host in advance.", "Le stationnement compte si vous venez en voiture; demandez a l'hote en avance.", "Il parcheggio conta se arrivi in auto; chiedi all'host in anticipo.", "Якщо приїжджаєте авто, заздалегідь уточніть паркування у господаря.")] }],
  }),
  shortArticle({
    id: "menton-without-a-car",
    slug: "menton-without-a-car",
    title: t("Menton without a car: how to enjoy the town on foot", "Menton sans voiture: profiter de la ville a pied", "Mentone senza auto: vivere la citta a piedi", "Ментон без авто: як насолоджуватися містом пішки"),
    seoTitle: t("Menton Without a Car | Beach, Old Town and Day Trips", "Menton sans voiture | Plage, vieille ville et excursions", "Mentone senza auto | Spiaggia, centro storico e gite", "Ментон без авто | Пляж, старе місто й поїздки"),
    seoDescription: t("Stay in central Menton and enjoy beaches, cafes, old town walks and Riviera day trips without relying on a car.", "Sejournez a Menton centre et profitez des plages, cafes, vieille ville et excursions sans voiture.", "Soggiorna nel centro di Mentone e goditi spiagge, caffe, centro storico e gite senza auto.", "Зупиніться в центрі Ментона й насолоджуйтеся пляжами, кафе, старим містом і поїздками без авто."),
    excerpt: t("Central Menton works well without a car if your priority is beach, promenade, old town and train-based day trips.", "Menton centre fonctionne bien sans voiture si vous cherchez plage, promenade, vieille ville et excursions en train.", "Il centro di Mentone funziona bene senza auto per spiaggia, lungomare, centro storico e gite in treno.", "Центр Ментона добре працює без авто, якщо вам потрібні пляж, набережна, старе місто й поїздки потягом."),
    category: "practical",
    tags: [t("car-free", "sans voiture", "senza auto", "без авто"), t("walkable", "a pied", "a piedi", "пішки")],
    bestFor: [guideBestForOptions[4].label, guideBestForOptions[0].label, guideBestForOptions[3].label],
    duration: "flexible",
    locationTags: ["menton-centre", "seafront"],
    relatedPlaces: ["promenade-du-soleil", "halles-du-marche", "plage-sablettes"],
    relatedArticles: ["best-beaches-in-menton", "day-trips-from-menton"],
    relatedApartments: seaViewApartments,
    sections: [{ heading: t("What works on foot", "Ce qui marche a pied", "Cosa funziona a piedi", "Що зручно пішки"), body: [t("Beach, promenade, old town, cafes and the market are natural car-free days from a central base.", "Plage, promenade, vieille ville, cafes et marche se font naturellement sans voiture depuis le centre.", "Spiaggia, lungomare, centro storico, caffe e mercato sono naturali senza auto dal centro.", "Пляж, набережна, старе місто, кафе й ринок природно доступні без авто з центральної бази.")] }],
  }),
  shortArticle({
    id: "day-trips-from-menton",
    slug: "day-trips-from-menton",
    title: t("Best day trips from Menton: Monaco, Nice and the Italian Riviera", "Meilleures excursions depuis Menton: Monaco, Nice et Riviera italienne", "Migliori gite da Mentone: Monaco, Nizza e Riviera italiana", "Найкращі поїздки з Ментона: Монако, Ніцца й Італійська Рив'єра"),
    seoTitle: t("Day Trips from Menton | Monaco, Nice and Italy", "Excursions depuis Menton | Monaco, Nice et Italie", "Gite da Mentone | Monaco, Nizza e Italia", "Поїздки з Ментона | Монако, Ніцца й Італія"),
    seoDescription: t("Use Menton as a calm base for day trips to Monaco, Nice, Èze, Ventimiglia, Sanremo and Riviera towns.", "Utilisez Menton comme base calme pour Monaco, Nice, Eze, Vintimille, Sanremo et les villes de Riviera.", "Usa Mentone come base calma per Monaco, Nizza, Eze, Ventimiglia, Sanremo e le cittadine della Riviera.", "Використовуйте Ментон як спокійну базу для Монако, Ніцци, Еза, Вентімільї, Санремо й міст Рив'єри."),
    excerpt: t("Monaco, Nice and the Italian Riviera fit naturally into a Menton stay. Check current transport before travel.", "Monaco, Nice et la Riviera italienne s'integrent naturellement a un sejour a Menton. Verifiez les transports avant de partir.", "Monaco, Nizza e Riviera italiana si inseriscono bene in un soggiorno a Mentone. Controlla i trasporti prima di partire.", "Монако, Ніцца й Італійська Рив'єра природно вписуються у відпочинок у Ментоні. Перед поїздкою перевіряйте транспорт."),
    category: "day-trips",
    tags: [t("Monaco", "Monaco", "Monaco", "Монако"), t("Nice", "Nice", "Nizza", "Ніцца"), t("Italy", "Italie", "Italia", "Італія")],
    bestFor: [guideBestForOptions[3].label, guideBestForOptions[0].label, guideBestForOptions[1].label],
    duration: "full-day",
    locationTags: ["monaco", "nice", "italian-riviera"],
    relatedArticles: ["menton-three-day-itinerary", "menton-without-a-car"],
    relatedEvents: ["monaco-grand-prix", "nice-jazz-fest"],
    relatedApartments: allApartments,
    sections: [{ heading: t("Return to a calmer base", "Revenir a une base plus calme", "Rientrare in una base piu calma", "Повернення до спокійної бази"), body: [t("The practical appeal of Menton is returning to a seaside apartment after a busy day in Monaco, Nice or Italy.", "L'interet pratique de Menton est de revenir a un appartement en bord de mer apres une journee chargee a Monaco, Nice ou en Italie.", "Il vantaggio pratico di Mentone e tornare a un appartamento sul mare dopo una giornata intensa a Monaco, Nizza o in Italia.", "Практична перевага Ментона - повернення до апартаментів біля моря після насиченого дня в Монако, Ніцці чи Італії.")] }],
  }),
  shortArticle({
    id: "where-to-stay-in-menton",
    slug: "where-to-stay-in-menton",
    title: t("Where to stay in Menton: beachfront, old town or near the station?", "Ou loger a Menton: front de mer, vieille ville ou gare?", "Dove dormire a Mentone: mare, centro storico o stazione?", "Де зупинитися в Ментоні: біля моря, старого міста чи станції?"),
    seoTitle: t("Where to Stay in Menton | Beachfront vs Old Town vs Station", "Ou loger a Menton | Front de mer, vieille ville ou gare", "Dove dormire a Mentone | Mare, centro storico o stazione", "Де зупинитися в Ментоні | Море, старе місто чи станція"),
    seoDescription: t("Compare Menton areas for beach stays, old-town walks, families, car-free travel and Azur Menton apartments.", "Comparez les quartiers de Menton pour plage, vieille ville, familles, sans voiture et appartements Azur Menton.", "Confronta le zone di Mentone per spiaggia, centro storico, famiglie, senza auto e appartamenti Azur Menton.", "Порівняйте райони Ментона для пляжу, старого міста, сімей, відпочинку без авто й апартаментів Azur Menton."),
    excerpt: t("Beachfront is best for sea routines, old town for character, station area for transport, and Garavan for a quieter scenic mood.", "Le front de mer convient aux routines de plage, la vieille ville au charme, la gare aux transports, Garavan au calme panoramique.", "Il lungomare e ideale per il mare, il centro storico per carattere, la stazione per trasporti, Garavan per quiete e paesaggio.", "Набережна найкраща для моря, старе місто - для характеру, район станції - для транспорту, Garavan - для спокійнішого настрою."),
    category: "practical",
    tags: [t("where to stay", "ou loger", "dove dormire", "де зупинитися"), t("central", "central", "centrale", "центр")],
    bestFor: [guideBestForOptions[3].label, guideBestForOptions[1].label, guideBestForOptions[4].label],
    duration: "flexible",
    locationTags: ["menton-centre", "old-town", "seafront", "garavan"],
    relatedArticles: ["best-beaches-in-menton", "menton-without-a-car"],
    relatedApartments: allApartments,
    sections: [{ heading: t("Why Azur Menton works", "Pourquoi Azur Menton fonctionne", "Perche Azur Menton funziona", "Чому Azur Menton зручний"), body: [t("The apartments are designed around central seaside practicality: two sea-view studios for couples and a larger terrace apartment for families or longer stays.", "Les appartements sont penses pour la praticite centrale en bord de mer: deux studios vue mer pour couples et un plus grand appartement avec terrasse pour familles ou longs sejours.", "Gli appartamenti puntano sulla praticita centrale vicino al mare: due monolocali vista mare per coppie e un appartamento con terrazza per famiglie o soggiorni lunghi.", "Апартаменти створені навколо практичності центрального розташування біля моря: дві студії з видом для пар і більша квартира з терасою для сімей або довших перебувань.")], relatedApartmentKeys: allApartments }],
  }),
];

export const featuredGuideArticles = guideArticles.filter((article) => article.featured).slice(0, 4);

export function getGuideArticle(slug: string) {
  return guideArticles.find((article) => article.slug === slug);
}

export function localizeGuideArticle(article: GuideArticle, locale: Locale) {
  return {
    ...article,
    title: article.title[locale],
    seoTitle: article.seoTitle[locale],
    seoDescription: article.seoDescription[locale],
    excerpt: article.excerpt[locale],
    tags: article.tags.map((tag) => tag[locale]),
    bestFor: article.bestFor.map((item) => item[locale]),
    categoryLabel: guideCategoryLabels[article.category][locale],
    durationLabel: article.duration ? guideDurationLabels[article.duration][locale] : undefined,
    sections: article.sections.map((section) => ({
      ...section,
      heading: section.heading[locale],
      body: section.body.map((paragraph) => paragraph[locale]),
      bullets: section.bullets?.map((bullet) => bullet[locale]),
    })),
    practicalTips: article.practicalTips?.map((tip) => tip[locale]),
  };
}

export function getGuidePage(locale: Locale, slug: string): GuidePageContent | undefined {
  const article = getGuideArticle(slug);
  if (!article) return undefined;
  const localized = localizeGuideArticle(article, locale);
  return {
    slug: localized.slug,
    title: localized.title,
    seoTitle: localized.seoTitle,
    seoDescription: localized.seoDescription,
    intro: localized.excerpt,
    heroImage: localized.heroImage,
    sections: localized.sections,
    practicalTips: localized.practicalTips,
    relatedLinks: (article.relatedArticles ?? []).map((relatedSlug) => {
      const related = getGuideArticle(relatedSlug);
      return { label: related ? related.title[locale] : relatedSlug, href: `/guide/${relatedSlug}` };
    }),
    cta: {
      title: guideCtaLabels.title[locale],
      text: guideCtaLabels.text[locale],
      primaryLabel: guideCtaLabels.primary[locale],
      secondaryLabel: guideCtaLabels.secondary[locale],
    },
  };
}

const guideCtaLabels = {
  title: t("Stay close to the beach in central Menton", "Sejourner pres de la plage a Menton centre", "Soggiorna vicino alla spiaggia nel centro di Mentone", "Зупиніться біля пляжу в центрі Ментона"),
  text: t("Tell us your dates and we will confirm availability directly.", "Envoyez vos dates et nous confirmerons la disponibilite directement.", "Inviaci le date e confermeremo direttamente la disponibilita.", "Надішліть дати, і ми напряму підтвердимо доступність."),
  primary: t("Check availability", "Verifier disponibilite", "Controlla disponibilita", "Перевірити доступність"),
  secondary: t("View apartments", "Voir les appartements", "Vedi appartamenti", "Переглянути апартаменти"),
};

export const guidePages: Record<Locale, GuidePageContent[]> = Object.fromEntries(
  locales.map((locale) => [locale, guideArticles.map((article) => getGuidePage(locale, article.slug)).filter(Boolean)]),
) as Record<Locale, GuidePageContent[]>;

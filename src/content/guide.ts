import type { Locale } from "@/i18n/locales";
import { locales } from "@/i18n/locales";
import type { GuideVisualTheme } from "@/components/guide/GuideVisual";

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

export type GuideDuration = "1 hour" | "1-2 hours" | "half-day" | "full-day" | "2-3 days" | "evening" | "flexible" | "reference";
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
  coverImage?: string;
  coverImageAlt?: LocalizedText;
  visualTheme?: GuideVisualTheme;
  visualStatus?: "real_image" | "project_illustration" | "editorial_placeholder";
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
  reference: t("Practical reference", "Reference pratique", "Riferimento pratico", "Практичний довідник"),
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
    visualTheme: "food",
    visualStatus: "editorial_placeholder",
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
    visualTheme: "market",
    visualStatus: "editorial_placeholder",
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
    visualTheme: "nightlife",
    visualStatus: "editorial_placeholder",
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
  sourceStatus?: SourceStatus;
  coverImage?: string;
  coverImageAlt?: LocalizedText;
  visualTheme?: GuideVisualTheme;
  visualStatus?: "real_image" | "project_illustration" | "editorial_placeholder";
  sections: LocalizedGuideSection[];
  practicalTips?: LocalizedText[];
}): GuideArticle {
  return { ...input, sourceStatus: input.sourceStatus ?? "editorial" };
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
    coverImage: "/images/apartments/beachside-family-apartment/20-evening-harbour-walk.jpeg",
    coverImageAlt: t("Evening harbour walk in Menton", "Promenade du soir au port de Menton", "Passeggiata serale al porto di Mentone", "Вечірня прогулянка біля порту Ментона"),
    visualTheme: "walk",
    visualStatus: "real_image",
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
    visualTheme: "nightlife",
    visualStatus: "editorial_placeholder",
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
    coverImage: "/images/apartments/beachside-family-apartment/17-menton-old-town.jpeg",
    coverImageAlt: t("Colourful old town street in Menton", "Rue coloree de la vieille ville de Menton", "Strada colorata nel centro storico di Mentone", "Кольорова вулиця старого міста Ментона"),
    visualTheme: "old-town",
    visualStatus: "real_image",
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
    coverImage: "/images/apartments/beachside-family-apartment/14-nearby-beach.jpeg",
    coverImageAlt: t("Nearby beach and Mediterranean water in Menton", "Plage proche et mer Mediterranee a Menton", "Spiaggia vicina e Mediterraneo a Mentone", "Пляж і Середземне море в Ментоні"),
    visualTheme: "beach",
    visualStatus: "real_image",
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
    coverImage: "/images/home/Planyourstay1.png",
    coverImageAlt: t("Menton old town tower and warm evening light", "Tour de Menton et lumiere chaude du soir", "Torre di Mentone e luce calda della sera", "Вежа Ментона у теплому вечірньому світлі"),
    visualTheme: "itinerary",
    visualStatus: "real_image",
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
    coverImage: "/images/apartments/beachside-family-apartment/18-menton-harbour-nearby.jpeg",
    coverImageAlt: t("Menton harbour near the Italian Riviera", "Port de Menton pres de la Riviera italienne", "Porto di Mentone vicino alla Riviera italiana", "Порт Ментона біля Італійської Рив'єри"),
    visualTheme: "itinerary",
    visualStatus: "real_image",
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
    coverImage: "/images/apartments/beachside-family-apartment/17-menton-old-town.jpeg",
    coverImageAlt: t("Colourful old town in Menton", "Vieille ville coloree de Menton", "Centro storico colorato di Mentone", "Кольорове старе місто Ментона"),
    visualTheme: "old-town",
    visualStatus: "real_image",
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
    visualTheme: "transport",
    visualStatus: "editorial_placeholder",
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
    title: t("Menton without a car: walking distances from the seafront", "Menton sans voiture: distances a pied depuis le front de mer", "Mentone senza auto: distanze a piedi dal lungomare", "Ментон без авто: піші відстані від набережної"),
    seoTitle: t("Menton without a car | Walking distances from the seafront", "Menton sans voiture | Distances a pied depuis le front de mer", "Mentone senza auto | Distanze a piedi dal lungomare", "Ментон без авто | Піші відстані від набережної"),
    seoDescription: t("A practical guide to enjoying Menton on foot from Promenade du Soleil: beaches, old town, market, gardens, train station and day trips without a car.", "Guide pratique pour profiter de Menton a pied depuis la Promenade du Soleil: plages, vieille ville, marche, jardins, gare et excursions sans voiture.", "Guida pratica per vivere Mentone a piedi da Promenade du Soleil: spiagge, centro storico, mercato, giardini, stazione e gite senza auto.", "Практичний гід по Ментону пішки від Promenade du Soleil: пляжі, старе місто, ринок, сади, вокзал і поїздки без авто."),
    excerpt: t("Menton is one of the easiest towns on the Riviera to enjoy on foot. From the central seafront around Promenade du Soleil and Casino Barrière, beaches, the old town, cafés, the market and the train station are all within a short walk.", "Menton est l'une des villes de la Riviera les plus faciles a vivre a pied. Depuis le front de mer central autour de la Promenade du Soleil et du Casino Barriere, plages, vieille ville, cafes, marche et gare sont proches.", "Mentone e una delle citta della Riviera piu facili da vivere a piedi. Dal lungomare centrale tra Promenade du Soleil e Casino Barrière, spiagge, centro storico, caffe, mercato e stazione sono a breve distanza.", "Ментон зручно досліджувати пішки. Якщо орієнтуватися від Promenade du Soleil та Casino Barrière, пляжі, старе місто, ринок, кав’ярні й залізничний вокзал розташовані на короткій відстані."),
    category: "practical",
    visualTheme: "transport",
    visualStatus: "editorial_placeholder",
    tags: [
      t("without a car", "sans voiture", "senza auto", "без авто"),
      t("walking", "a pied", "a piedi", "пішки"),
      t("train", "train", "treno", "потяг"),
      t("beaches", "plages", "spiagge", "пляжі"),
      t("old town", "vieille ville", "centro storico", "старе місто"),
      t("day trips", "excursions", "gite", "поїздки на день"),
    ],
    bestFor: [guideBestForOptions[4].label, guideBestForOptions[0].label, guideBestForOptions[1].label, guideBestForOptions[3].label],
    duration: "flexible",
    locationTags: ["menton-centre", "seafront", "old-town", "monaco", "nice", "italian-riviera"],
    featured: true,
    relatedPlaces: ["promenade-du-soleil", "halles-du-marche", "plage-sablettes", "rampes-saint-michel", "jardin-val-rahmeh", "port-de-garavan"],
    relatedArticles: ["public-transport-in-menton", "best-beaches-in-menton", "day-trips-from-menton", "menton-three-day-itinerary", "where-to-stay-in-menton"],
    relatedEvents: ["menton-lemon-festival", "monaco-grand-prix", "nice-jazz-fest", "monaco-yacht-show", "nice-carnival"],
    relatedApartments: allApartments,
    sections: [
      {
        heading: t("Central Menton is naturally walkable", "Menton centre se parcourt naturellement a pied", "Il centro di Mentone e naturalmente pedonale", "Центральний Ментон природно зручний пішки"),
        body: [
          t("Walking times are approximate and use Promenade du Soleil / Casino Barrière as a central reference point. Hills, heat, luggage and festival access changes can affect real travel time.", "Les temps de marche sont approximatifs et utilisent Promenade du Soleil / Casino Barriere comme repere central. Cotes, chaleur, bagages et changements d'acces pendant les festivals peuvent modifier le temps reel.", "I tempi a piedi sono approssimativi e usano Promenade du Soleil / Casino Barrière come riferimento centrale. Salite, caldo, bagagli e cambi di accesso durante eventi possono cambiare i tempi reali.", "Час прогулянок орієнтовний і рахується від Promenade du Soleil / Casino Barrière як центральної точки. Пагорби, спека, багаж і зміни доступу під час фестивалів можуть впливати на реальний час."),
          t("The promenade is the easiest orientation line. Once you move into the old town, expect stairs and elevation, especially around Saint-Michel and the panoramic viewpoints.", "La promenade est le repere le plus simple. Des que vous entrez dans la vieille ville, prevoyez marches et denivele, surtout autour de Saint-Michel et des points de vue.", "Il lungomare e la linea di orientamento piu semplice. Entrando nel centro storico, aspettati scale e dislivello, soprattutto intorno a Saint-Michel e ai belvedere.", "Набережна - найпростіша лінія орієнтації. У старому місті будуть сходи й підйоми, особливо біля Saint-Michel та панорамних точок."),
        ],
        relatedPlaceIds: ["promenade-du-soleil", "rampes-saint-michel", "halles-du-marche"],
        relatedApartmentKeys: allApartments,
      },
      {
        heading: t("Trains make day trips realistic", "Le train rend les excursions simples", "Il treno rende realistiche le gite", "Потяг робить поїздки на день реалістичними"),
        body: [
          t("Gare de Menton is a practical link for Monaco, Nice and Ventimiglia. Exact train times and fares vary by day and season, so check current schedules before travelling.", "La gare de Menton est pratique pour Monaco, Nice et Vintimille. Horaires et tarifs varient selon jour et saison: verifiez les informations actuelles avant de partir.", "Gare de Menton e pratica per Monaco, Nizza e Ventimiglia. Orari e tariffe variano per giorno e stagione: controlla le informazioni aggiornate prima di partire.", "Gare de Menton зручний для Монако, Ніцци й Вентімільї. Розклад і тарифи залежать від дня та сезону, тому перед поїздкою перевіряйте актуальну інформацію."),
          t("For major event weekends, staying in Menton can be practical, but transport and access should be checked early.", "Pour les grands week-ends d'evenements, Menton peut etre une base pratique, mais transports et acces doivent etre verifies tot.", "Per i grandi weekend di eventi, Mentone puo essere una base pratica, ma trasporti e accessi vanno controllati presto.", "Для великих подій Ментон може бути практичною базою, але транспорт і доступ варто перевіряти заздалегідь."),
        ],
        relatedEventIds: ["monaco-grand-prix", "nice-jazz-fest", "monaco-yacht-show"],
      },
    ],
    practicalTips: [
      t("Plan old-town climbs in the morning or evening in summer.", "En ete, prevoyez les montees en vieille ville le matin ou le soir.", "In estate, pianifica le salite nel centro storico al mattino o alla sera.", "Влітку плануйте підйоми старим містом зранку або ввечері."),
      t("Use the seafront as your main orientation line.", "Utilisez le front de mer comme repere principal.", "Usa il lungomare come riferimento principale.", "Використовуйте набережну як головну лінію орієнтації."),
      t("Check current transport information before travelling to Monaco, Nice or Italy.", "Verifiez les informations de transport actuelles avant Monaco, Nice ou l'Italie.", "Controlla le informazioni di trasporto aggiornate prima di Monaco, Nizza o Italia.", "Перед поїздками до Монако, Ніцци чи Італії перевіряйте актуальну транспортну інформацію."),
    ],
  }),
  shortArticle({
    id: "public-transport-in-menton",
    slug: "public-transport-in-menton",
    title: t("Public transport in Menton: trains, buses and day trips without a car", "Transports publics a Menton : trains, bus et excursions sans voiture", "Trasporti pubblici a Mentone: treni, autobus e gite senza auto", "Громадський транспорт у Ментоні: поїзди, автобуси та поїздки без авто"),
    seoTitle: t("Public transport in Menton | Trains, buses and day trips without a car", "Transports publics a Menton | Trains, bus et excursions sans voiture", "Trasporti pubblici a Mentone | Treni, autobus e gite senza auto", "Громадський транспорт у Ментоні | Поїзди, автобуси та поїздки без авто"),
    seoDescription: t("How to get around Menton without a car: walking, local buses, free navette, trains to Monaco, Nice and Ventimiglia, airport access and practical tips.", "Comment se deplacer a Menton sans voiture: marche, bus locaux, navette gratuite, trains vers Monaco, Nice et Vintimille, aeroport et conseils pratiques.", "Come muoversi a Mentone senza auto: a piedi, bus locali, navetta gratuita, treni per Monaco, Nizza e Ventimiglia, aeroporto e consigli pratici.", "Як пересуватися Ментоном без авто: пішки, місцеві автобуси, безкоштовний шатл, потяги до Монако, Ніцци й Вентімільї, аеропорт і практичні поради."),
    excerpt: t("Getting around Menton is easier than many visitors expect. The seafront and old town are walkable, while trains and buses connect Menton with Monaco, Nice and the Italian Riviera.", "Se deplacer a Menton est plus simple que beaucoup de visiteurs ne l'imaginent. Le front de mer et la vieille ville se font a pied, tandis que trains et bus relient Menton a Monaco, Nice et la Riviera italienne.", "Muoversi a Mentone e piu semplice di quanto molti immaginino. Lungomare e centro storico sono a piedi, mentre treni e autobus collegano Mentone con Monaco, Nizza e Riviera italiana.", "У Ментоні зручно жити без машини: пляжі, старе місто, ринок і набережна доступні пішки, а для поїздок до Монако, Ніцци чи Вентімільї можна користуватися поїздами, автобусами, таксі або трансфером."),
    category: "practical",
    visualTheme: "transport",
    visualStatus: "editorial_placeholder",
    tags: [
      t("transport", "transport", "trasporti", "транспорт"),
      t("train", "train", "treno", "потяг"),
      t("bus", "bus", "autobus", "автобус"),
      t("without a car", "sans voiture", "senza auto", "без авто"),
      t("Monaco", "Monaco", "Monaco", "Монако"),
      t("Nice", "Nice", "Nizza", "Ніцца"),
      t("Italy", "Italie", "Italia", "Італія"),
      t("airport", "aeroport", "aeroporto", "аеропорт"),
    ],
    bestFor: [guideBestForOptions[4].label, guideBestForOptions[3].label, t("day trips", "excursions", "gite", "поїздки на день"), guideBestForOptions[1].label],
    duration: "reference",
    locationTags: ["menton-centre", "monaco", "nice", "italian-riviera"],
    sourceStatus: "needs_verification",
    relatedArticles: ["menton-without-a-car", "menton-one-day-itinerary", "menton-three-day-itinerary", "day-trips-from-menton", "best-beaches-in-menton"],
    relatedEvents: ["monaco-grand-prix", "monaco-yacht-show", "monte-carlo-television-festival", "nice-jazz-fest", "nice-carnival", "menton-lemon-festival"],
    relatedApartments: allApartments,
    sections: [
      {
        heading: t("Routes and timetables can change", "Les lignes et horaires peuvent changer", "Percorsi e orari possono cambiare", "Маршрути й розклад можуть змінюватися"),
        body: [
          t("Menton is compact enough for many daily plans on foot, but public transport makes it easier to explore the wider Riviera. From the central seafront, guests can use local buses, the free city navette when operating, regional trains and buses to reach Monaco, Nice, Ventimiglia and nearby villages.", "Menton est assez compacte pour beaucoup de programmes a pied, mais les transports publics facilitent l'exploration de la Riviera. Depuis le front de mer central, les voyageurs peuvent utiliser bus locaux, navette gratuite lorsqu'elle fonctionne, trains et bus regionaux vers Monaco, Nice, Vintimille et villages proches.", "Mentone e abbastanza compatta per molti piani a piedi, ma il trasporto pubblico aiuta a esplorare la Riviera. Dal lungomare centrale si possono usare bus locali, navetta gratuita quando attiva, treni e bus regionali verso Monaco, Nizza, Ventimiglia e borghi vicini.", "Ментон достатньо компактний для багатьох планів пішки, але громадський транспорт допомагає досліджувати ширшу Рив'єру. Від центральної набережної гості можуть користуватися місцевими автобусами, безкоштовним шатлом, якщо він працює, регіональними потягами й автобусами до Монако, Ніцци, Вентімільї та найближчих сіл."),
          t("Routes, timetables and fares can change. Always check current transport information before travelling, especially for evening returns, festivals and major Monaco or Nice events.", "Lignes, horaires et tarifs peuvent changer. Verifiez toujours les informations actuelles avant de partir, surtout pour les retours du soir, festivals et grands evenements a Monaco ou Nice.", "Percorsi, orari e tariffe possono cambiare. Controlla sempre le informazioni aggiornate prima di partire, soprattutto per rientri serali, festival e grandi eventi a Monaco o Nizza.", "Маршрути, розклад і тарифи можуть змінюватися. Завжди перевіряйте актуальну транспортну інформацію перед поїздкою, особливо для вечірніх повернень, фестивалів і великих подій у Монако чи Ніцці."),
        ],
        relatedApartmentKeys: allApartments,
      },
      {
        heading: t("Airport access", "Acces aeroport", "Accesso aeroporto", "Доступ з аеропорту"),
        body: [
          t("Nice Côte d’Azur Airport is the main airport for Menton. Guests can reach Menton by a combination of train, bus, taxi or private transfer depending on arrival time and luggage.", "L'aeroport Nice Cote d'Azur est le principal aeroport pour Menton. Les voyageurs rejoignent Menton par train, bus, taxi ou transfert prive selon l'heure d'arrivee et les bagages.", "Nice Côte d’Azur e l'aeroporto principale per Mentone. Gli ospiti possono arrivare con combinazione di treno, bus, taxi o transfer privato secondo orario e bagagli.", "Nice Côte d’Azur Airport — головний аеропорт для Ментона. До Ментона можна дістатися комбінацією потяга, автобуса, таксі або приватного трансферу залежно від часу прибуття й багажу."),
          t("Some regional coach or airport connections may operate between Nice Airport and Menton or Monaco, but routes and prices change. Check current airport transport options before travel.", "Certaines liaisons aeroport ou autocars regionaux peuvent relier Nice Aeroport a Menton ou Monaco, mais routes et prix changent. Verifiez avant le voyage.", "Alcuni collegamenti aeroportuali o regionali possono operare tra Aeroporto di Nizza e Mentone o Monaco, ma percorsi e prezzi cambiano. Controlla prima del viaggio.", "Деякі регіональні або аеропортові сполучення можуть працювати між аеропортом Ніцци, Ментоном і Монако, але маршрути й ціни змінюються. Перед поїздкою перевірте актуальні варіанти."),
        ],
      },
    ],
    practicalTips: [
      t("Stay central if you want to avoid a car.", "Restez au centre si vous voulez eviter la voiture.", "Soggiorna in centro se vuoi evitare l'auto.", "Зупиняйтеся в центрі, якщо хочете уникнути авто."),
      t("Use the train for Monaco, Nice and Ventimiglia when possible.", "Utilisez le train pour Monaco, Nice et Vintimille quand c'est possible.", "Usa il treno per Monaco, Nizza e Ventimiglia quando possibile.", "За можливості використовуйте потяг до Монако, Ніцци й Вентімільї."),
      t("Check last return options before evening events.", "Verifiez les derniers retours avant les evenements du soir.", "Controlla gli ultimi rientri prima degli eventi serali.", "Перед вечірніми подіями перевіряйте варіанти останнього повернення."),
      t("Ask the host for practical arrival advice before your stay.", "Demandez conseil a l'hote avant votre sejour.", "Chiedi all'host consigli pratici prima del soggiorno.", "Перед перебуванням попросіть господаря про практичну пораду щодо прибуття."),
    ],
  }),
  shortArticle({
    id: "day-trips-from-menton",
    slug: "day-trips-from-menton",
    title: t("Best day trips from Menton: Monaco, Nice and the Italian Riviera", "Meilleures excursions depuis Menton: Monaco, Nice et Riviera italienne", "Migliori gite da Mentone: Monaco, Nizza e Riviera italiana", "Найкращі поїздки з Ментона: Монако, Ніцца й Італійська Рив'єра"),
    seoTitle: t("Day Trips from Menton | Monaco, Nice and Italy", "Excursions depuis Menton | Monaco, Nice et Italie", "Gite da Mentone | Monaco, Nizza e Italia", "Поїздки з Ментона | Монако, Ніцца й Італія"),
    seoDescription: t("Use Menton as a calm base for day trips to Monaco, Nice, Èze, Ventimiglia, Sanremo and Riviera towns.", "Utilisez Menton comme base calme pour Monaco, Nice, Eze, Vintimille, Sanremo et les villes de Riviera.", "Usa Mentone come base calma per Monaco, Nizza, Eze, Ventimiglia, Sanremo e le cittadine della Riviera.", "Використовуйте Ментон як спокійну базу для Монако, Ніцци, Еза, Вентімільї, Санремо й міст Рив'єри."),
    excerpt: t("Monaco, Nice and the Italian Riviera fit naturally into a Menton stay. Check current transport before travel.", "Monaco, Nice et la Riviera italienne s'integrent naturellement a un sejour a Menton. Verifiez les transports avant de partir.", "Monaco, Nizza e Riviera italiana si inseriscono bene in un soggiorno a Mentone. Controlla i trasporti prima di partire.", "Монако, Ніцца й Італійська Рив'єра природно вписуються у відпочинок у Ментоні. Перед поїздкою перевіряйте транспорт."),
    category: "day-trips",
    coverImage: "/images/apartments/panoramic-sea-view-studio/07-mediterranean-harbour-view.png",
    coverImageAlt: t("Mediterranean harbour view for Riviera day trips", "Vue portuaire mediterraneenne pour excursions Riviera", "Vista del porto mediterraneo per gite in Riviera", "Вид на середземноморський порт для поїздок Рив'єрою"),
    visualTheme: "itinerary",
    visualStatus: "real_image",
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
    coverImage: "/images/home/SeaViewBalconyStudio.png",
    coverImageAlt: t("Seafront balcony view in central Menton", "Vue balcon sur le front de mer a Menton centre", "Vista balcone sul lungomare di Mentone centro", "Вид із балкона на набережну в центрі Ментона"),
    visualTheme: "sea",
    visualStatus: "real_image",
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
    coverImageAlt: article.coverImageAlt?.[locale],
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

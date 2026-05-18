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
  coverImage?: string;
  coverImageAlt?: string;
  categoryLabel?: string;
  durationLabel?: string;
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
    coverImage: "/images/guide/local-food-menton.png",
    coverImageAlt: t("Illustration of local food in Menton", "Illustration de la cuisine locale a Menton", "Illustrazione del cibo locale a Mentone", "Ілюстрація локальної їжі в Ментоні"),
    visualTheme: "food",
    visualStatus: "project_illustration",
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
    coverImage: "/images/guide/halles-du-marche-menton.png",
    coverImageAlt: t("Illustration of Halles du Marché in Menton", "Illustration des Halles du Marche a Menton", "Illustrazione delle Halles du Marché a Mentone", "Ілюстрація Halles du Marché у Ментоні"),
    visualTheme: "market",
    visualStatus: "project_illustration",
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
    seoDescription: t("A realistic guide to Menton's relaxed evening drinks, craft beer, Sablettes beach bars, rooftop aperitifs and central cocktail spots.", "Guide realiste des verres du soir a Menton: biere artisanale, bars des Sablettes, rooftops et cocktails au centre.", "Guida realistica ai drink serali a Mentone: birra artigianale, bar alle Sablettes, rooftop e cocktail in centro.", "Реалістичний гід по вечірніх напоях у Ментоні: крафтове пиво, Sablettes, rooftop і центральні коктейль-бари."),
    excerpt: t("Menton is not a big party town; it is better for slow aperitifs, craft beer, beachside drinks and rooftop views.", "Menton n'est pas une grande ville de fete; elle convient mieux aux aperitifs lents, bieres artisanales, verres en bord de plage et vues rooftop.", "Mentone non e una grande citta da festa; funziona meglio per aperitivi lenti, birra artigianale, drink sul mare e viste rooftop.", "Ментон не місто великих вечірок; він краще підходить для повільного аперитиву, крафтового пива, напоїв біля пляжу й rooftop-видів."),
    category: "nightlife-drinks",
    coverImage: "/images/guide/bars-and-beer-in-menton.png",
    coverImageAlt: t("Illustration of evening drinks in Menton", "Illustration de verres du soir a Menton", "Illustrazione di drink serali a Mentone", "Ілюстрація вечірніх напоїв у Ментоні"),
    visualTheme: "nightlife",
    visualStatus: "project_illustration",
    tags: [t("bars", "bars", "bar", "бари"), t("craft beer", "biere artisanale", "birra artigianale", "крафтове пиво"), t("rooftop", "rooftop", "rooftop", "rooftop")],
    bestFor: [guideBestForOptions[0].label, guideBestForOptions[6].label, guideBestForOptions[2].label],
    duration: "evening",
    locationTags: ["menton-centre", "seafront", "old-town"],
    sourceStatus: "needs_verification",
    sections: [
      {
        heading: t("Choose the mood first", "Choisir l'ambiance d'abord", "Scegli prima l'atmosfera", "Спочатку оберіть настрій"),
        body: [
          t(
            "Menton is not a big party town, but it is a good place for unhurried drinks: something local before dinner, a craft beer with small plates, or a cocktail with a view. Most evenings are more about conversation and sea air than loud music.",
            "Menton n'est pas une grande ville de fete, mais elle convient bien aux verres sans precipitation : quelque chose de local avant le diner, une biere artisanale avec de petites assiettes, ou un cocktail avec vue. Les soirees parlent plus de conversation et d'air marin que de musique forte.",
            "Mentone non e una grande citta da festa, ma e adatta a drink senza fretta: qualcosa di locale prima di cena, una birra artigianale con piccoli piatti o un cocktail con vista. La maggior parte delle serate parla piu di conversazioni e aria di mare che di musica alta.",
            "Ментон не місто великих вечірок, але він добре підходить для неквапливих напоїв: щось місцеве перед вечерею, крафтове пиво з невеликими закусками або коктейль із видом. Більшість вечорів тут більше про розмови й морське повітря, ніж про гучну музику.",
          ),
          t(
            "Start by deciding what you want: a simple aperitif, a beachside atmosphere, a rooftop panorama or a central cocktail bar. Then keep the evening flexible.",
            "Commencez par choisir votre envie : aperitif simple, ambiance de plage, panorama rooftop ou cocktail au centre. Gardez ensuite la soiree flexible.",
            "Inizia scegliendo cosa vuoi: un aperitivo semplice, atmosfera da spiaggia, panorama rooftop o cocktail bar centrale. Poi mantieni la serata flessibile.",
            "Спочатку вирішіть, чого хочеться: простого аперитиву, пляжної атмосфери, rooftop-панорами або центрального коктейль-бару. А далі залишайте вечір гнучким.",
          ),
        ],
        relatedPlaceIds: ["biera-daqui", "inky-bar", "med-rooftop", "les-incompris", "bar-lescalier"],
      },
      {
        heading: t("Craft beer and Biera d’Aquì", "Biere artisanale et Biera d’Aquì", "Birra artigianale e Biera d’Aquì", "Крафтове пиво й Biera d’Aquì"),
        body: [
          t(
            "For craft beer, Biera d’Aquì is one of the local addresses to keep in mind. It is a good stop if you enjoy smaller French or Italian breweries, seasonal beers or something less standard than the usual industrial labels.",
            "Pour la biere artisanale, Biera d’Aquì fait partie des adresses locales a garder en tete. C'est une bonne halte si vous aimez les petites brasseries francaises ou italiennes, les bieres saisonnieres ou quelque chose de moins standard que les marques industrielles.",
            "Per la birra artigianale, Biera d’Aquì e uno degli indirizzi locali da tenere a mente. E una buona sosta se ti piacciono piccoli birrifici francesi o italiani, birre stagionali o qualcosa di meno standard dei marchi industriali.",
            "Для крафтового пива варто мати на увазі Biera d’Aquì. Це хороша зупинка, якщо вам цікаві невеликі французькі чи італійські броварні, сезонне пиво або щось менш стандартне за звичайні промислові марки.",
          ),
          t(
            "Ask what is currently rotating on draught and pair your glass with the simple aperitif snacks available that day. Arrive a little earlier if you want a quieter first stop and time to talk through the beer list.",
            "Demandez ce qui tourne a la pression ce jour-la et associez votre verre aux snacks d'aperitif disponibles. Venez un peu plus tot si vous voulez une premiere halte plus calme et le temps de discuter de la carte des bieres.",
            "Chiedi cosa c'e alla spina quel giorno e abbina il bicchiere agli snack da aperitivo disponibili. Arriva un po' prima se vuoi una prima sosta piu tranquilla e tempo per parlare della lista birre.",
            "Запитайте, що зараз на кранах, і поєднайте келих із простими закусками для аперитиву, які є цього дня. Приходьте трохи раніше, якщо хочете спокійніший перший пункт і час поговорити про пивну карту.",
          ),
        ],
        relatedPlaceIds: ["biera-daqui"],
      },
      {
        heading: t("Beachside evenings at Sablettes", "Soirees plage aux Sablettes", "Serate sul mare alle Sablettes", "Вечори біля пляжу на Sablettes"),
        body: [
          t(
            "Down by Plage des Sablettes, Inky Bar is a seasonal option for evenings when you want your drink close to the sand and water. The appeal is the mix of beach energy, music when programmed, and the view back to the old town after sunset.",
            "Pres de la Plage des Sablettes, Inky Bar est une option saisonniere pour les soirees ou vous voulez boire pres du sable et de l'eau. L'interet vient du melange entre energie de plage, musique quand elle est programmee, et vue sur la vieille ville apres le coucher du soleil.",
            "Vicino a Plage des Sablettes, Inky Bar e un'opzione stagionale per le sere in cui vuoi bere vicino alla sabbia e all'acqua. Il fascino e il mix tra energia da spiaggia, musica quando prevista e vista sul centro storico dopo il tramonto.",
            "Біля Plage des Sablettes Inky Bar може бути сезонним варіантом для вечорів, коли хочеться напою максимально близько до піску й води. Його сенс - у суміші пляжної енергії, музики, якщо вона є в програмі, і виду на старе місто після заходу сонця.",
          ),
          t(
            "Keep the order simple: a cold beer, a spritz or an easy long drink with something shareable. Because beach bars and Sablettes programmes change by season, check current opening days and events before walking down.",
            "Gardez la commande simple : biere fraiche, spritz ou long drink facile avec quelque chose a partager. Comme les bars de plage et programmes des Sablettes changent selon la saison, verifiez les jours d'ouverture et evenements avant de descendre.",
            "Ordina semplice: birra fredda, spritz o un long drink facile con qualcosa da condividere. Poiche bar sulla spiaggia e programmi delle Sablettes cambiano con la stagione, controlla aperture ed eventi prima di scendere.",
            "Замовляйте просто: холодне пиво, spritz або нескладний long drink і щось, чим можна поділитися. Оскільки пляжні бари й програми Sablettes змінюються за сезоном, перевірте актуальні дні роботи й події перед виходом.",
          ),
        ],
        relatedPlaceIds: ["inky-bar"],
      },
      {
        heading: t("Rooftop drinks at Med Rooftop", "Verre en rooftop au Med Rooftop", "Drink sul rooftop al Med Rooftop", "Rooftop-напої в Med Rooftop"),
        body: [
          t(
            "If you prefer a higher perspective, Med Rooftop offers a classic Riviera mix when open: sea view, rooftops and an aperitif in hand. It is the kind of place to choose for the setting, so keep the order simple and focus on timing.",
            "Si vous preferez prendre de la hauteur, Med Rooftop offre lorsqu'il est ouvert un melange tres Riviera : vue mer, toits et aperitif a la main. C'est une adresse que l'on choisit surtout pour le cadre, donc gardez une commande simple et soignez le timing.",
            "Se preferisci una prospettiva piu alta, Med Rooftop offre quando aperto un mix classico da Riviera: vista mare, tetti e aperitivo in mano. E un posto da scegliere soprattutto per il contesto, quindi ordina semplice e cura il timing.",
            "Якщо хочеться вищої точки огляду, Med Rooftop, коли відкритий, дає класичну атмосферу Рив’єри: море, дахи й аперитив у руці. Це місце радше про краєвид, тому замовляйте просто й думайте про час.",
          ),
          t(
            "Arrive shortly before sunset if you want the last light over the bay and old-town roofs. In high season, check whether booking is needed or arrive early; outside peak summer, a light layer can make the terrace more comfortable.",
            "Arrivez peu avant le coucher du soleil pour profiter de la derniere lumiere sur la baie et les toits de la vieille ville. En haute saison, verifiez s'il faut reserver ou venez tot; hors plein ete, une couche legere rend la terrasse plus confortable.",
            "Arriva poco prima del tramonto per vedere l'ultima luce sulla baia e sui tetti del centro storico. In alta stagione controlla se serve prenotare o arriva presto; fuori dal pieno estate, uno strato leggero rende la terrazza piu comoda.",
            "Приходьте незадовго до заходу сонця, якщо хочете побачити останнє світло над бухтою й дахами старого міста. У високий сезон перевірте, чи потрібне бронювання, або приходьте раніше; поза піком літа легкий шар одягу зробить терасу комфортнішою.",
          ),
        ],
        relatedPlaceIds: ["med-rooftop"],
      },
      {
        heading: t("Central cocktails and quieter aperitifs", "Cocktails au centre et aperitifs plus calmes", "Cocktail centrali e aperitivi piu tranquilli", "Коктейлі в центрі й тихіші аперитиви"),
        body: [
          t(
            "For a central, walkable cocktail option near the port, Les Incompris is worth considering when you want something more composed than a beach drink. It is close to the water and often works well with a shared plate or tapas-style bites.",
            "Pour un cocktail central et facile a rejoindre pres du port, Les Incompris est une adresse a envisager quand vous voulez quelque chose de plus travaille qu'un verre de plage. C'est proche de l'eau et cela se combine souvent bien avec une assiette a partager.",
            "Per un cocktail centrale e facile da raggiungere vicino al porto, Les Incompris e da considerare quando vuoi qualcosa di piu curato di un drink da spiaggia. E vicino all'acqua e spesso funziona bene con un piatto da condividere.",
            "Для центрального й зручного коктейльного варіанту біля порту можна розглянути Les Incompris, коли хочеться чогось більш продуманого, ніж пляжний напій. Він близько до води й добре поєднується з тарілкою для спільного столу.",
          ),
          t(
            "Bar L’Escalier is better treated as a possible low-key aperitif stop rather than a destination for showy cocktails. As with most Menton bars, energy and opening times fluctuate, so keep both addresses as part of a flexible evening walk.",
            "Bar L’Escalier se pense plutot comme une halte aperitif discrete que comme une destination de cocktails spectaculaires. Comme souvent a Menton, l'ambiance et les horaires varient; gardez ces adresses dans une promenade flexible.",
            "Bar L’Escalier va considerato piu come possibile sosta per un aperitivo discreto che come destinazione per cocktail scenografici. Come spesso a Mentone, atmosfera e orari variano: tieni questi indirizzi dentro una passeggiata flessibile.",
            "Bar L’Escalier краще сприймати як можливу тиху зупинку для аперитиву, а не як місце для ефектних коктейлів. Як і в багатьох барах Ментона, атмосфера й години роботи змінюються, тому тримайте ці адреси як частину гнучкої вечірньої прогулянки.",
          ),
        ],
        relatedPlaceIds: ["les-incompris", "bar-lescalier"],
      },
      {
        heading: t("Small practical hacks", "Petites astuces pratiques", "Piccoli consigli pratici", "Невеликі практичні поради"),
        body: [
          t(
            "In summer, Menton evenings often work around the aperitif rather than a very late night, so starting around early evening usually feels right. If you want beer and cocktails in one evening, begin with craft beer while there is still light, then move to a rooftop or cocktail bar later.",
            "En ete, les soirees de Menton tournent souvent autour de l'aperitif plutot que d'une nuit tres tardive; commencer en debut de soiree fonctionne bien. Si vous voulez biere et cocktail le meme soir, commencez par la biere artisanale tant qu'il fait encore jour, puis passez au rooftop ou au cocktail bar.",
            "In estate, le serate a Mentone ruotano spesso intorno all'aperitivo piu che a una notte molto tarda; iniziare a inizio serata funziona bene. Se vuoi birra e cocktail nella stessa sera, comincia con la birra artigianale quando c'e ancora luce, poi passa a rooftop o cocktail bar.",
            "Улітку вечори в Ментоні часто будуються навколо аперитиву, а не дуже пізньої ночі, тому починати на початку вечора зазвичай найкраще. Якщо хочете поєднати пиво й коктейлі, почніть із крафтового пива, поки ще світло, а потім перейдіть до rooftop або коктейль-бару.",
          ),
          t(
            "Many of these places are within walking distance of central apartments, so you do not need a car. Choose one or two spots that match your mood and leave room for an unplanned stop on the way back.",
            "Beaucoup de ces adresses sont accessibles a pied depuis les appartements centraux, donc la voiture n'est pas necessaire. Choisissez une ou deux haltes selon votre humeur et laissez de la place pour un arret improvise au retour.",
            "Molti di questi posti sono raggiungibili a piedi dagli appartamenti centrali, quindi non serve l'auto. Scegli uno o due indirizzi in base all'umore e lascia spazio a una sosta improvvisata al ritorno.",
            "Багато з цих місць у пішій доступності від центральних апартаментів, тож авто не потрібне. Оберіть одну-дві зупинки під настрій і залиште місце для спонтанного варіанту дорогою назад.",
          ),
        ],
      },
    ],
    practicalTips: [
      t("Check opening hours on the day, especially for beach bars and rooftops.", "Verifiez les horaires le jour meme, surtout pour les bars de plage et rooftops.", "Controlla gli orari il giorno stesso, soprattutto per beach bar e rooftop.", "Перевіряйте години роботи в день виходу, особливо для пляжних барів і rooftop."),
      t("Arrive earlier in July and August if you care about a table with a view.", "Arrivez plus tot en juillet et aout si une table avec vue compte pour vous.", "Arriva prima a luglio e agosto se vuoi un tavolo con vista.", "У липні та серпні приходьте раніше, якщо вам важливий столик із видом."),
      t("For a quieter evening, choose an aperitif walk rather than a late-night plan.", "Pour une soiree calme, choisissez un aperitif et une promenade plutot qu'une nuit tardive.", "Per una serata tranquilla, scegli aperitivo e passeggiata invece di una notte lunga.", "Для спокійного вечора оберіть аперитив і прогулянку, а не пізню ніч."),
    ],
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
    excerpt: t("A slow evening loop with old-town views, the Vieux Port, one well-chosen drink and a calm finish near Garavan.", "Une boucle lente entre vues de la vieille ville, Vieux Port, un verre bien choisi et une fin calme vers Garavan.", "Un giro lento tra viste del centro storico, Vieux Port, un drink scelto bene e un finale tranquillo verso Garavan.", "Повільний вечірній маршрут: краєвиди старого міста, Vieux Port, один вдало обраний напій і спокійне завершення біля Garavan."),
    category: "walks-views",
    coverImage: "/images/guide/quiet-evening-in-menton.png",
    coverImageAlt: t("Illustration of a quiet evening walk in Menton", "Illustration d'une soiree calme a Menton", "Illustrazione di una serata tranquilla a Mentone", "Ілюстрація тихого вечора в Ментоні"),
    visualTheme: "walk",
    visualStatus: "project_illustration",
    tags: [t("sunset", "coucher de soleil", "tramonto", "захід сонця"), t("old town", "vieille ville", "centro storico", "старе місто")],
    bestFor: [guideBestForOptions[0].label, guideBestForOptions[6].label, guideBestForOptions[3].label],
    duration: "1-2 hours",
    locationTags: ["old-town", "seafront", "garavan"],
    relatedPlaces: ["rampes-saint-michel", "plage-sablettes", "port-de-garavan", "cimetiere-vieux-chateau", "promenade-du-soleil", "med-rooftop"],
    relatedArticles: ["best-photo-spots-menton", "bars-and-beer-in-menton"],
    relatedApartments: seaViewApartments,
    sections: [
      {
        heading: t("Start above the seafront", "Commencer au-dessus du front de mer", "Inizia sopra il lungomare", "Почніть над набережною"),
        body: [
          t(
            "If you want something more than a simple walk, start in the old town and climb Les Rampes Saint-Michel slowly. Pause on the landings to look back over the bay, the tiled roofs and the Basilica before continuing up towards the Cimetière du Vieux Château.",
            "Si vous voulez plus qu'une simple promenade, commencez dans la vieille ville et montez lentement les Rampes Saint-Michel. Faites des pauses sur les paliers pour regarder la baie, les toits de tuiles et la basilique avant de continuer vers le Cimetière du Vieux Château.",
            "Se vuoi qualcosa di più di una semplice passeggiata, inizia nel centro storico e sali lentamente Les Rampes Saint-Michel. Fermati sui pianerottoli per guardare la baia, i tetti in tegole e la Basilica prima di proseguire verso il Cimetière du Vieux Château.",
            "Якщо хочеться більшого, ніж просто прогулянки, почніть у старому місті й повільно підніміться Les Rampes Saint-Michel. Зупиняйтеся на майданчиках, щоб подивитися на бухту, черепичні дахи й базиліку, а потім продовжуйте до Cimetière du Vieux Château.",
          ),
          t(
            "The cemetery viewpoint is one of the clearest sunset spots in Menton, with the sea, the old town and the Italian coast in the same frame. Wear comfortable shoes: this part of the route includes stairs and elevation.",
            "Le point de vue du cimetière est l'un des plus nets au coucher du soleil à Menton, avec la mer, la vieille ville et la côte italienne dans le même cadre. Prévoyez de bonnes chaussures : cette partie comporte des marches et du dénivelé.",
            "Il belvedere del cimitero è uno dei punti più chiari per il tramonto a Mentone, con mare, centro storico e costa italiana nello stesso quadro. Indossa scarpe comode: questa parte ha scale e salita.",
            "Оглядовий майданчик біля цвинтаря - одне з найкращих місць для заходу сонця в Ментоні: море, старе місто й італійське узбережжя видно в одному кадрі. Взуття має бути зручним: тут є сходи й підйом.",
          ),
        ],
        relatedPlaceIds: ["rampes-saint-michel", "cimetiere-vieux-chateau"],
      },
      {
        heading: t("Vieux Port aperitif", "Apéritif au Vieux Port", "Aperitivo al Vieux Port", "Аперитив біля Vieux Port"),
        body: [
          t(
            "Walk back down towards the waterfront and the Vieux Port by Plage des Sablettes. The terraces here are a good place for an early evening drink with the old town in front of you.",
            "Redescendez vers le front de mer et le Vieux Port, près de la Plage des Sablettes. Les terrasses sont agréables pour un verre de début de soirée face à la vieille ville.",
            "Scendi di nuovo verso il lungomare e il Vieux Port, vicino a Plage des Sablettes. Le terrazze sono perfette per un drink di inizio serata con il centro storico davanti.",
            "Спустіться назад до набережної й Vieux Port біля Plage des Sablettes. Тераси тут добре підходять для раннього вечірнього напою з видом на старе місто.",
          ),
          t(
            "For a local wine moment, choose a relaxed wine bar or port-side terrace, order a glass of Provence rosé if available, and watch the light change on the coloured façades. Check current opening hours before choosing a specific address.",
            "Pour un verre de vin local, choisissez un bar à vin détendu ou une terrasse du port, commandez un rosé de Provence si disponible, et regardez la lumière changer sur les façades colorées. Vérifiez les horaires actuels avant de choisir une adresse précise.",
            "Per un momento con vino locale, scegli un wine bar rilassato o una terrazza sul porto, ordina un rosé di Provenza se disponibile e guarda la luce cambiare sulle facciate colorate. Controlla gli orari prima di scegliere un indirizzo preciso.",
            "Для місцевого винного настрою оберіть спокійний wine bar або терасу біля порту, замовте келих прованського rosé, якщо він є, і спостерігайте, як світло змінюється на кольорових фасадах. Перед вибором конкретного місця перевірте актуальні години роботи.",
          ),
        ],
        relatedPlaceIds: ["plage-sablettes"],
      },
      {
        heading: t("Promenade and rooftop option", "Promenade et option rooftop", "Passeggiata e opzione rooftop", "Набережна й rooftop-варіант"),
        body: [
          t(
            "Later, continue along the Promenade du Soleil. If you prefer a more festive drink and a higher viewpoint, a rooftop-style bar such as Rooftop du Med can work well when open: arrive early in high season, as view tables tend to fill quickly.",
            "Plus tard, continuez par la Promenade du Soleil. Si vous préférez un verre plus festif et une vue plus haute, un rooftop comme Rooftop du Med peut bien fonctionner lorsqu'il est ouvert : arrivez tôt en haute saison, car les tables avec vue se remplissent vite.",
            "Più tardi, continua sulla Promenade du Soleil. Se preferisci un drink più festoso e una vista dall'alto, un rooftop come Rooftop du Med può funzionare bene quando è aperto: in alta stagione arriva presto, perché i tavoli con vista si riempiono velocemente.",
            "Пізніше продовжуйте вздовж Promenade du Soleil. Якщо хочеться більш святкового напою й вищої точки огляду, rooftop на кшталт Rooftop du Med може бути вдалим варіантом, коли він відкритий: у високий сезон краще приходити раніше, бо столики з видом швидко займають.",
          ),
        ],
        relatedPlaceIds: ["promenade-du-soleil", "med-rooftop"],
      },
      {
        heading: t("Finish quietly near Garavan", "Finir calmement vers Garavan", "Finire con calma verso Garavan", "Тихе завершення біля Garavan"),
        body: [
          t(
            "For a softer end to the night, keep walking towards Port de Garavan, the eastern marina. The mood becomes calmer and more residential, with boats, low light and a different angle on Menton's bay.",
            "Pour terminer la soirée plus doucement, continuez vers le Port de Garavan, la marina à l'est. L'ambiance devient plus calme et résidentielle, avec les bateaux, une lumière douce et un autre angle sur la baie de Menton.",
            "Per chiudere la sera con più calma, prosegui verso Port de Garavan, la marina a est. L'atmosfera diventa più tranquilla e residenziale, con barche, luce bassa e un altro angolo sulla baia di Mentone.",
            "Щоб завершити вечір спокійніше, пройдіть до Port de Garavan, східної марини. Атмосфера тут тихіша й більш житлова: човни, м'яке світло й інший ракурс на бухту Ментона.",
          ),
          t(
            "If you sit down for dessert, a digestif or a late coffee, choose a terrace that is open on the day rather than planning around one fixed restaurant. From this side of town, the lights of Menton feel quieter before you walk back to your apartment.",
            "Si vous vous arrêtez pour un dessert, un digestif ou un café tardif, choisissez une terrasse ouverte ce jour-là plutôt que de tout organiser autour d'un restaurant précis. Depuis ce côté de la ville, les lumières de Menton paraissent plus calmes avant de rentrer à l'appartement.",
            "Se ti fermi per un dessert, un digestivo o un caffè tardivo, scegli una terrazza aperta quel giorno invece di costruire il programma su un solo ristorante. Da questo lato della città, le luci di Mentone sembrano più calme prima di tornare all'appartamento.",
            "Якщо хочеться десерту, дижестиву або пізньої кави, оберіть терасу, яка відкрита саме цього дня, а не плануйте вечір навколо одного ресторану. З цього боку міста вогні Ментона здаються спокійнішими перед поверненням до апартаментів.",
          ),
        ],
        relatedPlaceIds: ["port-de-garavan"],
      },
    ],
    practicalTips: [
      t("For sunset viewpoints, start before the light drops: the old town stairs take longer when you stop for photos.", "Pour les points de vue au coucher du soleil, partez avant que la lumière baisse : les escaliers prennent plus de temps avec les pauses photo.", "Per i belvedere al tramonto, parti prima che la luce cali: le scale richiedono più tempo se ti fermi per le foto.", "Для заходу сонця виходьте до того, як світло почне швидко спадати: сходи старого міста займають більше часу, якщо зупинятися для фото."),
      t("Bar and rooftop opening times can change by season; check current details before going.", "Les horaires des bars et rooftops changent selon la saison ; vérifiez avant de sortir.", "Gli orari di bar e rooftop cambiano con la stagione; controlla prima di uscire.", "Години роботи барів і rooftop можуть змінюватися за сезоном; перевіряйте актуальні деталі перед виходом."),
      t("Keep this route flexible: one drink and one view are enough for a calm Menton evening.", "Gardez l'itinéraire flexible : un verre et une vue suffisent pour une soirée calme à Menton.", "Tieni il percorso flessibile: un drink e una vista bastano per una serata tranquilla a Mentone.", "Залишайте маршрут гнучким: одного напою й одного краєвиду достатньо для спокійного вечора в Ментоні."),
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
    coverImage: "/images/guide/nightlife-in-menton.png",
    coverImageAlt: t("Illustration of evening drinks and nightlife in Menton", "Illustration des verres du soir a Menton", "Illustrazione dei drink serali a Mentone", "Ілюстрація вечірніх напоїв у Ментоні"),
    visualTheme: "nightlife",
    visualStatus: "project_illustration",
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
    coverImage: "/images/guide/best-photo-spots-menton.png",
    coverImageAlt: t("Illustration of photo spots in Menton", "Illustration des spots photo a Menton", "Illustrazione dei luoghi fotografici a Mentone", "Ілюстрація місць для фото в Ментоні"),
    visualTheme: "old-town",
    visualStatus: "project_illustration",
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
    coverImage: "/images/guide/best-beaches-in-menton.png",
    coverImageAlt: t("Illustration of Menton beaches", "Illustration des plages de Menton", "Illustrazione delle spiagge di Mentone", "Ілюстрація пляжів Ментона"),
    visualTheme: "beach",
    visualStatus: "project_illustration",
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
    coverImage: "/images/guide/menton-one-day-itinerary.png",
    coverImageAlt: t("Illustration of a one-day Menton walking itinerary", "Illustration d'un itineraire d'une journee a Menton", "Illustrazione di un itinerario di un giorno a Mentone", "Ілюстрація маршруту Ментоном на один день"),
    visualTheme: "itinerary",
    visualStatus: "project_illustration",
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
    coverImage: "/images/guide/menton-three-day-itinerary.png",
    coverImageAlt: t("Illustration of a three-day Menton, Monaco and Italian Riviera itinerary", "Illustration d'un itineraire de trois jours entre Menton, Monaco et Riviera italienne", "Illustrazione di un itinerario di tre giorni tra Mentone, Monaco e Riviera italiana", "Ілюстрація маршруту на три дні: Ментон, Монако й Італійська Рив'єра"),
    visualTheme: "itinerary",
    visualStatus: "project_illustration",
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
    coverImage: "/images/guide/menton-old-town.png",
    coverImageAlt: t("Illustration of Menton's old town", "Illustration de la vieille ville de Menton", "Illustrazione del centro storico di Mentone", "Ілюстрація старого міста Ментона"),
    visualTheme: "old-town",
    visualStatus: "project_illustration",
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
    coverImage: "/images/guide/how-to-get-to-menton-from-nice-airport.png",
    coverImageAlt: t("Illustration of travel from Nice Airport to Menton", "Illustration du trajet entre l'aeroport de Nice et Menton", "Illustrazione del viaggio dall'aeroporto di Nizza a Mentone", "Ілюстрація поїздки з аеропорту Ніцци до Ментона"),
    visualTheme: "transport",
    visualStatus: "project_illustration",
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
    coverImage: "/images/guide/menton-without-a-car.png",
    coverImageAlt: t("Illustration of walking around Menton without a car", "Illustration de Menton sans voiture", "Illustrazione di Mentone senza auto", "Ілюстрація Ментона без авто"),
    visualTheme: "transport",
    visualStatus: "project_illustration",
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
    coverImage: "/images/guide/public-transport-in-menton.png",
    coverImageAlt: t("Illustration of public transport in Menton", "Illustration des transports publics a Menton", "Illustrazione dei trasporti pubblici a Mentone", "Ілюстрація громадського транспорту в Ментоні"),
    visualTheme: "transport",
    visualStatus: "project_illustration",
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
    coverImage: "/images/guide/day-trips-from-menton.png",
    coverImageAlt: t("Illustration of day trips from Menton", "Illustration des excursions depuis Menton", "Illustrazione delle gite da Mentone", "Ілюстрація поїздок з Ментона"),
    visualTheme: "itinerary",
    visualStatus: "project_illustration",
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
    coverImage: "/images/guide/where-to-stay-in-menton.png",
    coverImageAlt: t("Illustration of where to stay in Menton", "Illustration des quartiers ou loger a Menton", "Illustrazione di dove soggiornare a Mentone", "Ілюстрація районів для проживання в Ментоні"),
    visualTheme: "sea",
    visualStatus: "project_illustration",
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
    coverImage: localized.coverImage,
    coverImageAlt: localized.coverImageAlt,
    categoryLabel: localized.categoryLabel,
    durationLabel: localized.durationLabel,
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

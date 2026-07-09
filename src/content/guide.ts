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

export type GuideDuration = "45 to 90 minutes" | "1 hour" | "1-2 hours" | "half-day" | "full-day" | "2-3 days" | "evening" | "flexible" | "reference";
export type SourceStatus = "editorial" | "needs_verification" | "verified";

export type GuideVideoEmbed = {
  id: string;
  title: LocalizedText;
  provider: "youtube" | "vimeo" | "external";
  embedUrl?: string;
  watchUrl: string;
  embed?: boolean;
  caption?: LocalizedText;
};

export type LocalizedGuideVideoEmbed = Omit<GuideVideoEmbed, "title" | "caption"> & {
  title: string;
  caption?: string;
};

export type GuideArtworkCard = {
  id: string;
  artist: string;
  workTitle: LocalizedText;
  year: string;
  image?: string;
  imageAlt?: LocalizedText;
  sourceUrl?: string;
  rightsNote: LocalizedText;
  locationNote: LocalizedText;
};

export type LocalizedGuideArtworkCard = Omit<GuideArtworkCard, "workTitle" | "imageAlt" | "rightsNote" | "locationNote"> & {
  workTitle: string;
  imageAlt?: string;
  rightsNote: string;
  locationNote: string;
};

export type GuideSection = {
  heading: string;
  body: string[];
  bullets?: string[];
  image?: string;
  imageAlt?: string;
  visualTheme?: GuideVisualTheme;
  guideLinkSlug?: string;
  guideLinkLabel?: string;
  videoEmbeds?: LocalizedGuideVideoEmbed[];
  artworkCards?: LocalizedGuideArtworkCard[];
  officialLinks?: GuideSectionOfficialLink[];
  relatedApartmentKeys?: string[];
  relatedPlaceIds?: string[];
  relatedEventIds?: string[];
};

export type GuideSectionOfficialLink = {
  label: string;
  url: string;
};

export type LocalizedGuideSectionOfficialLink = {
  label: LocalizedText;
  url: string;
};

export type LocalizedGuideSection = {
  heading: LocalizedText;
  body: LocalizedText[];
  bullets?: LocalizedText[];
  image?: string;
  imageAlt?: LocalizedText;
  visualTheme?: GuideVisualTheme;
  guideLinkSlug?: string;
  guideLinkLabel?: LocalizedText;
  videoEmbeds?: GuideVideoEmbed[];
  artworkCards?: GuideArtworkCard[];
  officialLinks?: LocalizedGuideSectionOfficialLink[];
  relatedApartmentKeys?: string[];
  relatedPlaceIds?: string[];
  relatedEventIds?: string[];
};

export type GuideAppTool = {
  id: string;
  name: string;
  useFor: LocalizedText;
  bestFor: LocalizedText;
  image?: string;
  imageAlt?: LocalizedText;
  visualTheme?: GuideVisualTheme;
  iosUrl?: string;
  androidUrl?: string;
};

export type LocalizedGuideAppTool = Omit<GuideAppTool, "useFor" | "bestFor" | "imageAlt"> & {
  useFor: string;
  bestFor: string;
  imageAlt?: string;
};

export type GuideUtilityBlockRegion = "menton" | "loire";

export type GuideUtilityBlock = {
  type: "localRadio";
  region: GuideUtilityBlockRegion;
  title?: string;
  description?: string;
  stationIds?: string[];
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
  appTools?: GuideAppTool[];
  practicalTips?: LocalizedText[];
  relatedPlaces?: string[];
  relatedArticles?: string[];
  relatedEvents?: string[];
  relatedApartments?: string[];
  utilityBlocks?: GuideUtilityBlock[];
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
  utilityBlocks?: GuideUtilityBlock[];
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
  { value: "summer visitors", label: t("Summer visitors", "Voyageurs d'ete", "Visitatori estivi", "Літні гості") },
  { value: "older travellers", label: t("Older travellers", "Voyageurs plus ages", "Viaggiatori senior", "Старші мандрівники") },
  { value: "longer stays", label: t("Longer stays", "Sejours plus longs", "Soggiorni piu lunghi", "Довші перебування") },
  { value: "apartment guests", label: t("Apartment guests", "Voyageurs en appartement", "Ospiti in appartamento", "Гості апартаментів") },
];

export const guideDurationLabels: Record<GuideDuration, LocalizedText> = {
  "45 to 90 minutes": t("45 to 90 minutes", "45 a 90 minutes", "45-90 minuti", "45-90 хвилин"),
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
    seoDescription: t("From pichade, socca and barbajuans to fougasse mentonnaise and citrus sweets, discover what to try first in Menton.", "De la pichade, socca et barbajuans a la fougasse mentonnaise et aux douceurs aux agrumes, decouvrez quoi gouter a Menton.", "Da pichade, socca e barbajuans alla fougasse mentonnaise e ai dolci agli agrumi, scopri cosa assaggiare a Mentone.", "Від pichade, socca і barbajuans до fougasse mentonnaise та цитрусових солодощів: що спробувати в Ментоні спочатку."),
    excerpt: t("A practical first tasting list for Menton: pichade, socca, barbajuans, fougasse mentonnaise and lemon-based sweets from the market.", "Une premiere liste simple a gouter a Menton: pichade, socca, barbajuans, fougasse mentonnaise et douceurs au citron du marche.", "Una prima lista pratica da assaggiare a Mentone: pichade, socca, barbajuans, fougasse mentonnaise e dolci al limone del mercato.", "Практичний список для першої дегустації в Ментоні: pichade, socca, barbajuans, fougasse mentonnaise і лимонні солодощі з ринку."),
    category: "food-markets",
    coverImage: "/images/guide/local-food-menton.jpg",
    coverImageAlt: t("Illustration of local food in Menton", "Illustration de la cuisine locale a Menton", "Illustrazione del cibo locale a Mentone", "Ілюстрація локальної їжі в Ментоні"),
    visualTheme: "food",
    visualStatus: "project_illustration",
    tags: [t("pichade", "pichade", "pichade", "pichade"), t("socca", "socca", "socca", "socca"), t("barbajuans", "barbajuans", "barbajuans", "barbajuans"), t("citrus", "agrumes", "agrumi", "цитрусові")],
    bestFor: [guideBestForOptions[2].label, guideBestForOptions[3].label, guideBestForOptions[0].label, guideBestForOptions[1].label],
    duration: "flexible",
    locationTags: ["menton-centre", "old-town", "seafront"],
    sourceStatus: "needs_verification",
    featured: true,
    sections: [
      {
        heading: t("Start with a short tasting list", "Commencer par une petite liste", "Inizia con una lista breve", "Почніть із короткого списку"),
        body: [
          t(
            "Menton's food sits between French Riviera and Italian border traditions. Instead of trying to chase every dish, focus on a small first list: pichade, socca, barbajuans, fougasse mentonnaise and citrus sweets already give you a good sense of the town.",
            "La cuisine de Menton se situe entre traditions de la Riviera francaise et influences de la frontiere italienne. Plutot que de courir apres tous les plats, concentrez-vous sur une petite premiere liste : pichade, socca, barbajuans, fougasse mentonnaise et douceurs aux agrumes donnent deja une bonne idee de la ville.",
            "La cucina di Mentone sta tra tradizioni della Riviera francese e influenze del confine italiano. Invece di inseguire ogni piatto, concentrati su una prima lista breve: pichade, socca, barbajuans, fougasse mentonnaise e dolci agli agrumi danno gia un buon assaggio della citta.",
            "Кухня Ментона поєднує традиції Французької Рив'єри та італійського прикордоння. Замість того щоб гнатися за всіма стравами, почніть із короткого списку: pichade, socca, barbajuans, fougasse mentonnaise і цитрусові солодощі вже добре передають смак міста.",
          ),
          t(
            "Availability changes by season, day and stall, so use this article as a tasting map rather than a fixed checklist.",
            "L'offre change selon la saison, le jour et l'etal: utilisez ce guide comme une carte de degustation plutot qu'une liste rigide.",
            "La disponibilita cambia con stagione, giorno e banco: usa questa guida come mappa di assaggi, non come elenco rigido.",
            "Наявність змінюється залежно від сезону, дня й ятки, тому сприймайте цей гід як карту дегустації, а не як жорсткий список.",
          ),
        ],
        relatedPlaceIds: ["halles-du-marche", "chez-mimi-menton", "rue-saint-michel-menton"],
        relatedApartmentKeys: allApartments,
      },
      {
        heading: t("Pichade and pissaladière", "Pichade et pissaladiere", "Pichade e pissaladière", "Pichade і pissaladière"),
        image: "/images/guide/local-food-pichade-pissaladiere.jpg",
        imageAlt: t("Illustration of pichade and pissaladiere in Menton", "Illustration de pichade et pissaladiere a Menton", "Illustrazione di pichade e pissaladiere a Mentone", "Ілюстрація pichade і pissaladiere у Ментоні"),
        visualTheme: "food",
        body: [
          t(
            "Pichade is one of Menton's signature savoury bites: a thick olive-oil dough topped with tomato, slow-cooked onions, anchovies, garlic and olives. It feels somewhere between a pizza and a southern tart, often eaten at aperitif time or as a quick bakery snack.",
            "La pichade est l'une des bouchees salees typiques de Menton : une pate epaisse a l'huile d'olive garnie de tomate, oignons longuement cuits, anchois, ail et olives. Elle se situe entre pizza et tarte du Sud, souvent mangee a l'aperitif ou comme encas de boulangerie.",
            "La pichade e uno degli assaggi salati tipici di Mentone: un impasto spesso all'olio d'oliva con pomodoro, cipolle cotte lentamente, acciughe, aglio e olive. Sta tra pizza e torta salata del Sud, spesso mangiata all'aperitivo o come snack da forno.",
            "Pichade - одна з характерних солоних закусок Ментона: товсте тісто на оливковій олії з томатом, повільно тушкованою цибулею, анчоусами, часником і оливками. Це щось між піцою та південною тартою, яку часто їдять на аперитив або як швидку закуску з пекарні.",
          ),
          t(
            "A related classic is pissaladière, usually more focused on caramelised onions and anchovies. In Menton, you may find both on the same counter. Ask what has just come out of the oven and take a slice to the seafront or back to the apartment for a simple lunch.",
            "Un classique voisin est la pissaladiere, souvent davantage centree sur les oignons confits et les anchois. A Menton, vous pouvez trouver les deux sur le meme comptoir. Demandez ce qui sort du four et prenez une part vers le front de mer ou l'appartement pour un dejeuner simple.",
            "Un classico vicino e la pissaladière, di solito piu centrata su cipolle caramellate e acciughe. A Mentone potresti trovare entrambe sullo stesso banco. Chiedi cosa e appena uscito dal forno e porta una fetta sul lungomare o in appartamento per un pranzo semplice.",
            "Схожа класика - pissaladière, де акцент зазвичай на карамелізованій цибулі й анчоусах. У Ментоні обидва варіанти можуть бути на одному прилавку. Запитайте, що щойно з печі, і візьміть шматок до набережної або в апартаменти для простого обіду.",
          ),
        ],
        relatedPlaceIds: ["halles-du-marche", "chez-mimi-menton", "rue-saint-michel-menton"],
      },
      {
        heading: t("Socca and warm street food", "Socca et street food chaude", "Socca e street food calda", "Socca й тепла вулична їжа"),
        image: "/images/guide/local-food-socca-street-food.jpg",
        imageAlt: t("Illustration of socca and warm street food in Menton", "Illustration de socca et street food chaude a Menton", "Illustrazione di socca e street food calda a Mentone", "Ілюстрація socca й теплої вуличної їжі у Ментоні"),
        visualTheme: "food",
        body: [
          t(
            "Socca is a large, thin chickpea pancake made with chickpea flour, olive oil, water and salt, traditionally baked until crisp at the edges and soft in the middle. It comes from nearby Nice, but it is easy to associate with a Menton market morning too.",
            "La socca est une grande galette fine a base de farine de pois chiche, huile d'olive, eau et sel, traditionnellement cuite pour etre croustillante sur les bords et moelleuse au centre. Elle vient de Nice, mais s'invite facilement dans une matinee de marche a Menton.",
            "La socca e una grande crêpe sottile di farina di ceci, olio d'oliva, acqua e sale, tradizionalmente cotta finche i bordi sono croccanti e il centro morbido. Arriva da Nizza, ma si abbina benissimo anche a una mattina al mercato di Mentone.",
            "Socca - це великий тонкий млинець із нутового борошна, оливкової олії, води й солі, який традиційно печуть до хрустких країв і м'якої середини. Вона походить із Ніцци, але цілком природно вписується і в ранковий ринок Ментона.",
          ),
          t(
            "The best first taste is hot and simple: cut into wide strips, eaten with fingers and black pepper. If you see socca chaude on a board, order a portion while it is still warm.",
            "La meilleure premiere degustation est chaude et simple : coupee en larges morceaux, mangee avec les doigts et du poivre noir. Si vous voyez socca chaude sur une ardoise, commandez une portion tant qu'elle est encore chaude.",
            "Il primo assaggio migliore e caldo e semplice: tagliata a strisce larghe, mangiata con le dita e pepe nero. Se vedi socca chaude su una lavagna, ordina una porzione mentre e ancora calda.",
            "Найкраща перша дегустація - гаряча й проста: широкі шматки, руками, з чорним перцем. Якщо бачите на дошці socca chaude, беріть порцію, поки вона ще тепла.",
          ),
        ],
        relatedPlaceIds: ["halles-du-marche", "chez-mimi-menton", "rue-saint-michel-menton"],
      },
      {
        heading: t("Barbajuans and market picnic bites", "Barbajuans et pique-nique de marche", "Barbajuans e assaggi da picnic", "Barbajuans і ринковий пікнік"),
        image: "/images/guide/local-food-barbajuans-market-picnic.jpg",
        imageAlt: t("Illustration of barbajuans and market picnic bites in Menton", "Illustration de barbajuans et pique-nique de marche a Menton", "Illustrazione di barbajuans e assaggi da picnic a Mentone", "Ілюстрація barbajuans і ринкового пікніка у Ментоні"),
        visualTheme: "food",
        body: [
          t(
            "Barbajuans are fried pastries often filled with chard or spinach, fresh cheese, rice and herbs. They appear on market stands, in some bakeries and as starters in casual restaurants. One or two are a good salty snack with a glass of wine or beer.",
            "Les barbajuans sont des beignets sales souvent farcis de blettes ou epinards, fromage frais, riz et herbes. On les voit sur les stands de marche, dans certaines boulangeries et en entree dans des adresses simples. Un ou deux font un bon encas sale avec un verre de vin ou de biere.",
            "I barbajuans sono fagottini fritti spesso ripieni di bietole o spinaci, formaggio fresco, riso ed erbe. Compaiono sui banchi del mercato, in alcune panetterie e come antipasti in locali semplici. Uno o due sono uno snack salato perfetto con vino o birra.",
            "Barbajuans - це смажені пиріжки, часто з начинкою з мангольду або шпинату, свіжого сиру, рису й трав. Вони трапляються на ринкових ятках, у деяких пекарнях і як закуска в простих ресторанах. Один-два добре підходять як солона закуска до вина або пива.",
          ),
          t(
            "A useful market hack is to buy a mix of barbajuans, socca and pichade from different stalls, then build your own tasting picnic by the seafront instead of sitting down immediately.",
            "Astuce pratique au marche : achetez un melange de barbajuans, socca et pichade sur plusieurs stands, puis composez votre propre pique-nique de degustation au bord de mer au lieu de vous asseoir tout de suite au restaurant.",
            "Un trucco utile al mercato: compra un mix di barbajuans, socca e pichade da banchi diversi, poi crea il tuo picnic di assaggi sul lungomare invece di sederti subito al ristorante.",
            "Корисний ринковий прийом: купіть трохи barbajuans, socca і pichade в різних ятках, а потім зробіть власний дегустаційний пікнік біля моря замість того, щоб одразу сідати в ресторан.",
          ),
        ],
        relatedPlaceIds: ["halles-du-marche", "chez-mimi-menton", "promenade-du-soleil"],
      },
      {
        heading: t("Fougasse mentonnaise and citrus sweets", "Fougasse mentonnaise et douceurs aux agrumes", "Fougasse mentonnaise e dolci agli agrumi", "Fougasse mentonnaise і цитрусові солодощі"),
        image: "/images/guide/local-food-fougasse-citrus-sweets.jpg",
        imageAlt: t("Illustration of fougasse mentonnaise and citrus sweets", "Illustration de fougasse mentonnaise et douceurs aux agrumes", "Illustrazione di fougasse mentonnaise e dolci agli agrumi", "Ілюстрація fougasse mentonnaise і цитрусових солодощів"),
        visualTheme: "food",
        body: [
          t(
            "Fougasse mentonnaise is the sweet side of local baking: a soft enriched bread often scented with orange blossom and dotted with candied fruit, almonds or sugared almonds. It is best kept simple, sliced for breakfast with coffee or in the afternoon with tea.",
            "La fougasse mentonnaise represente le cote sucre de la boulangerie locale : une brioche moelleuse souvent parfumee a la fleur d'oranger et garnie de fruits confits, amandes ou pralines. Elle se deguste simplement, tranchee au petit-dejeuner avec un cafe ou l'apres-midi avec un the.",
            "La fougasse mentonnaise e il lato dolce della panificazione locale: un pane morbido e arricchito, spesso profumato ai fiori d'arancio e con frutta candita, mandorle o confetti. Meglio gustarla semplicemente, a fette a colazione con caffe o nel pomeriggio con te.",
            "Fougasse mentonnaise - солодкий бік місцевої випічки: м'який здобний хліб, часто з ароматом флердоранжу, цукатами, мигдалем або цукрованим мигдалем. Найкраще їсти просто: скибками на сніданок із кавою або вдень із чаєм.",
          ),
          t(
            "Menton's citrus identity also appears in lemon tarts, cakes, jams, candied peel, biscuits and liqueurs. Shops specialising in lemon products are good places to look for portable souvenirs that travel better than fresh pastries.",
            "L'identite citronnee de Menton apparait aussi dans les tartes au citron, cakes, confitures, ecorces confites, biscuits et liqueurs. Les boutiques specialisees dans les produits au citron sont de bonnes adresses pour des souvenirs faciles a transporter.",
            "L'identita agrumata di Mentone si ritrova anche in crostate al limone, cake, marmellate, scorze candite, biscotti e liquori. I negozi specializzati in prodotti al limone sono buoni posti per souvenir facili da portare a casa.",
            "Цитрусова ідентичність Ментона також помітна в лимонних тартах, кексах, джемах, цукатах, печиві й лікерах. Спеціалізовані крамниці з лимонними продуктами добре підходять для сувенірів, які легше везти додому, ніж свіжу випічку.",
          ),
        ],
        relatedPlaceIds: ["halles-du-marche", "maison-herbin-menton", "rue-saint-michel-menton", "petit-casino-saint-michel"],
      },
      {
        heading: t("Ice cream, gelato and lemon sorbet", "Glace, gelato et sorbet citron", "Gelato, gelaterie e sorbetto al limone", "Морозиво, gelato й лимонний сорбет"),
        image: "/images/guide/best-ice-cream-menton.jpg",
        imageAlt: t("Illustration of ice cream and lemon sorbet in Menton", "Illustration de glace et sorbet citron a Menton", "Illustrazione di gelato e sorbetto al limone a Mentone", "Ілюстрація морозива й лимонного сорбету в Ментоні"),
        visualTheme: "food",
        body: [
          t(
            "Ice cream is not just a dessert stop in Menton. It fits naturally into an old-town walk, a beach afternoon or a family route along Rue Saint-Michel, especially when lemon sorbet or seasonal fruit flavours are available.",
            "La glace n'est pas seulement une pause dessert a Menton. Elle s'integre naturellement a une balade dans la vieille ville, un apres-midi de plage ou un parcours famille rue Saint-Michel, surtout quand le sorbet citron ou les parfums de saison sont disponibles.",
            "Il gelato non e solo una pausa dessert a Mentone. Si inserisce naturalmente in una passeggiata nel centro storico, in un pomeriggio al mare o in un percorso famiglia su Rue Saint-Michel, soprattutto quando ci sono sorbetto al limone o gusti di stagione.",
            "Морозиво в Ментоні - це не лише десертна зупинка. Воно природно вписується в прогулянку старим містом, пляжний день або сімейний маршрут Rue Saint-Michel, особливо коли є лимонний сорбет чи сезонні фруктові смаки.",
          ),
          t(
            "For shop-by-shop ideas, use the dedicated ice-cream guide and treat this section as the food-guide reminder to leave space for one cold stop.",
            "Pour les adresses detaillees, utilisez le guide dedie aux glaces et gardez cette section comme rappel de prevoir une pause fraiche.",
            "Per idee negozio per negozio, usa la guida dedicata al gelato e considera questa sezione come promemoria per lasciare spazio a una pausa fresca.",
            "Для конкретних адрес використовуйте окремий гід по морозиву, а цей розділ сприймайте як нагадування залишити місце для однієї холодної зупинки.",
          ),
        ],
        guideLinkSlug: "best-ice-cream-menton",
        guideLinkLabel: t("Open the ice cream guide", "Ouvrir le guide des glaces", "Apri la guida gelato", "Відкрити гід по морозиву"),
        relatedPlaceIds: ["puro-piacere-menton", "demontis-gelateria-menton", "tutti-frutti-menton", "gelateria-sofia-menton"],
      },
      {
        heading: t("Citrus drinks and apartment pairings", "Boissons aux agrumes et repas a l'appartement", "Bevande agli agrumi e abbinamenti in appartamento", "Цитрусові напої й прості поєднання в апартаментах"),
        image: "/images/guide/local-food-citrus-drinks.jpg",
        imageAlt: t("Illustration of citrus drinks and apartment pairings in Menton", "Illustration de boissons aux agrumes et repas a l'appartement a Menton", "Illustrazione di bevande agli agrumi e abbinamenti in appartamento a Mentone", "Ілюстрація цитрусових напоїв і поєднань для апартаментів у Ментоні"),
        visualTheme: "food",
        body: [
          t(
            "For drinks, lemon is the obvious Menton flavour. A small chilled glass of lemon liqueur or limoncello can finish a meal, while citrus beers, syrups or soft drinks work for an afternoon option without a full aperitif.",
            "Cote boissons, le citron est la saveur evidente de Menton. Un petit verre frais de liqueur de citron ou de limoncello peut terminer un repas, tandis que bieres aux agrumes, sirops ou boissons sans alcool fonctionnent l'apres-midi.",
            "Per le bevande, il limone e il sapore piu evidente di Mentone. Un piccolo bicchiere freddo di liquore al limone o limoncello puo chiudere un pasto, mentre birre agli agrumi, sciroppi o bibite funzionano bene nel pomeriggio.",
            "У напоях лимон - очевидний смак Ментона. Невеликий охолоджений келих лимонного лікеру або limoncello може завершити вечерю, а цитрусове пиво, сиропи чи безалкогольні напої добре працюють удень.",
          ),
          t(
            "When shopping, ask which products are made with Menton lemons and which are broader Riviera recipes. A simple apartment meal can be fresh bread, cheese, olives, seasonal fruit and one or two lemon-based products such as jam, tapenade or mustard.",
            "Quand vous faites vos achats, demandez quels produits sont faits avec des citrons de Menton et lesquels sont plutot des recettes Riviera plus generales. Un repas simple a l'appartement peut etre pain frais, fromage, olives, fruits de saison et un ou deux produits au citron comme confiture, tapenade ou moutarde.",
            "Quando fai la spesa, chiedi quali prodotti sono fatti con limoni di Mentone e quali sono ricette piu generali della Riviera. Un pasto semplice in appartamento puo essere pane fresco, formaggio, olive, frutta di stagione e uno o due prodotti al limone come marmellata, tapenade o senape.",
            "Купуючи продукти, запитуйте, що зроблено саме з лимонів Ментона, а що є ширшими рецептами Рив'єри. Проста вечеря в апартаментах може складатися зі свіжого хліба, сиру, оливок, сезонних фруктів і одного-двох лимонних продуктів, наприклад джему, тапенади або гірчиці.",
          ),
        ],
        relatedPlaceIds: ["intermarche-hyper-menton", "u-express-menton-centre", "carrefour-city-felix-faure", "nabucco-wine-bar-cellar", "comptoir-des-vignes-menton"],
        relatedApartmentKeys: allApartments,
      },
      {
        heading: t("Where and when to look", "Ou et quand chercher", "Dove e quando cercare", "Де й коли шукати"),
        body: [
          t(
            "For most of these foods, Halles du Marché is the best starting point in the morning: prepared savoury slices, socca when available, barbajuans, olives, fruit and citrus products all sit under one Belle Epoque roof.",
            "Pour la plupart de ces produits, les Halles du Marche sont le meilleur point de depart le matin : parts salees, socca quand elle est disponible, barbajuans, olives, fruits et produits aux agrumes sous un meme toit Belle Epoque.",
            "Per la maggior parte di questi assaggi, le Halles du Marché sono il punto di partenza migliore al mattino: tranci salati, socca quando disponibile, barbajuans, olive, frutta e prodotti agli agrumi sotto un unico tetto Belle Epoque.",
            "Для більшості цих смаків найкращий старт - Halles du Marché зранку: солоні шматки випічки, socca, якщо є, barbajuans, оливки, фрукти й цитрусові продукти під одним дахом Belle Époque.",
          ),
          t(
            "Beyond the market, explore small bakeries in the old town and watch cafe boards for socca or barbajuans as specials. Ask vendors what is local, homemade or especially good today.",
            "Au-dela du marche, explorez les petites boulangeries de la vieille ville et regardez les ardoises des cafes pour la socca ou les barbajuans en suggestion. Demandez aux vendeurs ce qui est local, fait maison ou particulierement bon ce jour-la.",
            "Oltre al mercato, esplora le piccole panetterie del centro storico e guarda le lavagne dei caffe per socca o barbajuans del giorno. Chiedi ai venditori cosa e locale, fatto in casa o particolarmente buono quel giorno.",
            "Окрім ринку, заглядайте в невеликі пекарні старого міста й дивіться дошки кафе, де socca або barbajuans можуть бути в спеціальних пропозиціях. Запитуйте продавців, що місцеве, домашнє або особливо вдале саме сьогодні.",
          ),
        ],
        relatedPlaceIds: ["halles-du-marche", "chez-mimi-menton", "maison-herbin-menton", "rue-saint-michel-menton", "intermarche-hyper-menton", "u-express-menton-centre", "carrefour-city-felix-faure", "petit-casino-saint-michel"],
      },
    ],
    practicalTips: [
      t("Visit the market in the morning for the widest choice.", "Visitez le marche le matin pour le plus grand choix.", "Visita il mercato al mattino per avere piu scelta.", "Ідіть на ринок зранку, коли вибір найбільший."),
      t("Ask what is homemade, local or just out of the oven.", "Demandez ce qui est fait maison, local ou tout juste sorti du four.", "Chiedi cosa e fatto in casa, locale o appena uscito dal forno.", "Запитуйте, що домашнє, місцеве або щойно з печі."),
      t("Try one market breakfast and one simple picnic-style apartment meal.", "Essayez un petit-dejeuner de marche et un repas simple a l'appartement.", "Prova una colazione al mercato e un pasto semplice in appartamento.", "Спробуйте один ринковий сніданок і одну просту вечерю-пікнік в апартаментах."),
    ],
    relatedPlaces: ["halles-du-marche", "chez-mimi-menton", "maison-herbin-menton", "rue-saint-michel-menton", "promenade-du-soleil", "intermarche-hyper-menton", "u-express-menton-centre", "carrefour-city-felix-faure", "petit-casino-saint-michel", "puro-piacere-menton", "demontis-gelateria-menton", "tutti-frutti-menton", "nabucco-wine-bar-cellar", "comptoir-des-vignes-menton"],
    relatedArticles: ["best-souvenir-shops-menton-monaco-nice", "best-ice-cream-menton", "wine-tasting-near-menton", "supermarkets-in-menton", "michelin-restaurants-menton-nice-monaco", "halles-du-marche-menton", "menton-one-day-itinerary", "bars-and-beer-in-menton"],
    relatedApartments: allApartments,
  },
  {
    id: "vegan-restaurants-cafes-menton",
    slug: "vegan-restaurants-cafes-menton",
    title: t(
      "Vegan and vegan-friendly restaurants near Menton",
      "Restaurants végétariens et vegan autour de Menton",
      "Ristoranti vegan e vegetariani intorno a Mentone",
      "Веганська й веган-дружня їжа біля Ментона",
    ),
    seoTitle: t(
      "Vegan Restaurants Near Menton: Plant-Based Cafés, Vegan-Friendly Dining & Day Trips",
      "Restaurants vegan près de Menton : cafés végétaux, restauration vegan-friendly et sorties",
      "Ristoranti vegan vicino a Mentone: caffè vegetali, cena vegan-friendly e gite",
      "Веган-ресторани біля Ментона: веганські кафе, веган-дружня їжа та поїздки",
    ),
    seoDescription: t(
      "A practical vegan guide to Menton and nearby Riviera towns: vegan restaurants, vegan-friendly cafés, Indian and Mediterranean options, Nice day trips and Italian-side options.",
      "Un guide pratique des options vegan à Menton et aux villes voisines: restaurants vegan, cafés végétaliens, cuisine indienne et méditerranéenne, Nice et options italiennes.",
      "Una guida pratica per Mentone e dintorni: ristoranti vegan, caffè vegani, cucina indiana e mediterranea, gite a Nizza e opzioni italiane.",
      "Практичний гід по веганських та веган-дружніх варіантах в Ментона й сусідніх містах Рив'єри: кафе, індійська та середземноморська кухня, поїздки до Ніцци та на італійський бік.",
    ),
    excerpt: t(
      "Menton can work for vegan stays when planned: combine clear vegan options in town with day-trip fallback choices in Nice and Ventimiglia.",
      "Menton peut fonctionner pour un séjour vegan si la planification est faite: combinez les options clairement vegan en ville et des alternatives a Nice ou Vintimille.",
      "Mentone può funzionare per un soggiorno vegan se pianificato: combina opzioni davvero vegan in città con opzioni di backup a Nizza e Ventimiglia.",
      "Ментон можна робити придатним для веганів, якщо все запланувати: поєднуйте чіткі локальні веган-пункти з точками-резервами в Ніцці та Вентімільї.",
    ),
    category: "food-markets",
    coverImage: "/images/guide/vegan-restaurants-cafes-menton.png",
    coverImageAlt: t(
      "Vegan dining options in Menton and nearby Riviera cities",
      "Options de restauration vegan à Menton et villes voisines",
      "Opzioni di ristorazione vegan a Mentone e dintorni",
      "Веганські варіанти в Ментоні та сусідніх містах",
    ),
    visualTheme: "food",
    visualStatus: "editorial_placeholder",
    tags: [t("vegan", "végétalien", "vegano", "веган"), t("vegetarian", "végétarien", "vegetariano", "вегетаріанський"), t("city trips", "sorties", "gite", "поїздки"), t("cafe", "café", "caffè", "кафе"), t("restaurants", "restaurants", "ristoranti", "ресторани")],
    bestFor: [guideBestForOptions[2].label, guideBestForOptions[3].label, guideBestForOptions[9].label, guideBestForOptions[0].label],
    duration: "reference",
    locationTags: ["menton-centre", "old-town", "monaco", "nice", "italian-riviera"],
    sourceStatus: "needs_verification",
    featured: true,
    relatedPlaces: [
      "le-rouge-gorge-restaurant",
      "a-braijade-meridiounale-palais-des-princes",
      "o-petit-corner",
      "le-taj-menton",
      "little-bao-menton",
      "paper-plane-nice",
      "la-musa-ventimiglia",
      "monaco-monte-carlo",
      "nice-old-town",
      "ventimiglia",
      "halles-du-marche",
    ],
    relatedArticles: ["local-food-menton", "best-ice-cream-menton", "wine-tasting-near-menton", "day-trips-from-menton", "menton-without-a-car", "italian-riviera-day-trip-from-menton", "best-souvenir-shops-menton-monaco-nice"],
    relatedApartments: allApartments,
    sections: [
      {
        heading: t("Quick recommendations", "Recommandations rapides", "Consigli rapidi", "Швидкі поради"),
        body: [
          t(
            "If you want a clearly vegan option in Menton, start with Le Rouge-gorge. For larger menus with more choice, A Braijade Meridiounale / Palais des Princes and Le Taj are usually the most practical alternatives.",
            "Si vous cherchez une option clairement vegan à Menton, commencez par Le Rouge-gorge. Pour un menu plus vaste, A Braijade Meridiounale / Palais des Princes et Le Taj sont souvent les alternatives les plus pratiques.",
            "Se cerchi un'opzione chiaramente vegan a Mentone, inizia da Le Rouge-gorge. Per menu più ricchi, A Braijade Meridiounale / Palais des Princes e Le Taj sono spesso le alternative più pratiche.",
            "Для чітко веганської опції в Ментоні почніть із Le Rouge-gorge. Для ширшого меню практичні альтернативи — A Braijade / Palais des Princes і Le Taj.",
          ),
          t(
            "For day trips, Paper Plane in Nice is the clearest fallback for brunch/lunch, while La Musa in Ventimiglia is a common Italian-side practical option.",
            "Pour les sorties, Paper Plane à Nice reste la meilleure solution de secours pour brunch/ lunch, et La Musa à Vintimille une option pratique du côté italien.",
            "Per le gite, Paper Plane a Nizza resta il back-up più chiaro per brunch/pranzo, mentre La Musa a Ventimiglia e un'opzione pratica lato italiano.",
            "Для поїздок найнадійніший резервний варіант у Ніцці — Paper Plane (брunch/lunch), з італійського боку — La Musa у Вентімільї.",
          ),
        ],
      },
      {
        heading: t("In Menton", "À Menton", "A Mentone", "У Ментона"),
        body: [
          t(
            "Practical options in Menton for vegan stays, from dedicated options to practical fallback venues.",
            "Options pratiques à Menton pour un séjour vegan, des adresses dédiées aux solutions de secours.",
            "Opzioni pratiche a Mentone per un soggiorno vegan, da proposte dedicate a soluzioni di riserva.",
            "Практичні варіанти у Ментоні для веган-подорожей: від спеціалізованих до запасних рішень.",
          ),
        ],
        bullets: [
          t("Le Rouge-gorge Restaurant — fully vegan-focused option in Menton.", "Le Rouge-gorge Restaurant — option la plus claire orientée vegan.", "Le Rouge-gorge Restaurant — opzione più orientata al vegan a Mentone.", "Le Rouge-gorge Restaurant — найбільш чіткий веган-орієнтований варіант."),
          t("A Braijade Meridiounale / Palais des Princes — vegan-friendly menu structure, confirm on the day.", "A Braijade Meridiounale / Palais des Princes — carte orientée vegan-friendly, à confirmer le jour J.", "A Braijade Meridiounale / Palais des Princes — menu vegan-friendly, confermare nel giorno.", "A Braijade Meridiounale / Palais des Princes — веган-дружній формат меню, уточнюйте на момент відвідування."),
          t("O’ Petit Corner — useful for breakfast, coffee and light midday vegetarian lunches.", "O’ Petit Corner — utile pour le petit-déjeuner, le café et des déjeuners végétariens légers.", "O’ Petit Corner — utile per colazione, caffè e pranzi leggeri vegetariani.", "O’ Petit Corner — корисний для сніданку, кави та легкого обіду."),
          t("Le Taj Menton — useful vegetarian/vegan-friendly dinner choice with rice and vegetables.", "Le Taj Menton — choix utile de souper vegan-friendly avec riz et legumes.", "Le Taj Menton — buona scelta cena con opzioni vegan-friendly e riso/verdure.", "Le Taj Menton — корисний варіант для веган-дружньої вечері з рисом і овочами."),
          t("Little Bao Menton — useful but confirm oil, fryer and sauce details before ordering.", "Little Bao Menton — utile mais confirmez huile, friteuse et sauces avant de commander.", "Little Bao Menton — utile ma conferma olio, friggitore e salse prima di ordinare.", "Little Bao Menton — зручний варіант, але уточнюйте масло, спосіб смаження й соуси."),
        ],
        relatedPlaceIds: ["le-rouge-gorge-restaurant", "a-braijade-meridiounale-palais-des-princes", "o-petit-corner", "le-taj-menton", "little-bao-menton"],
      },
      {
        heading: t("Day trips from Menton", "Sorties d'une journée", "Gite giornaliere", "Поїздки на день"),
        body: [
          t(
            "Nearby city trips are the most reliable option when Menton is light on fully vegan choices.",
            "Les sorties d'une journée dans les villes voisines sont l'option la plus fiable quand Menton propose peu d'offres vegan.",
            "Le gite giornaliere nelle città vicine sono spesso la soluzione più affidabile quando Menton ha poche opzioni vegan.",
            "Коли в Ментоні мало повноцінних веган-варіантів, найбільш надійний спосіб — поїздки в сусідні міста.",
          ),
        ],
        bullets: [
          t("Nice: strongest nearby vegan-friendly city base for brunch, lunch and local mobility.", "Nice: base la plus forte proche pour brunch, déjeuner et mobilité locale.", "Nizza: base più forte nelle vicinanze per brunch, pranzo e mobilità locale.", "Ніцца: найбільш сильна база неподалік для brunch, lunch і пересування."),
          t("Monaco: often vegan-friendly but usually requires confirmation on menus and substitutions.", "Monaco: souvent vegan-friendly mais demande souvent confirmation des menus et adaptations.", "Monaco: spesso vegan-friendly ma spesso richiede conferma del menu.", "Монако: часто веган-дружнє, але зазвичай потрібно уточнювати меню й заміни."),
          t("Ventimiglia: practical Italian option for casual vegan-friendly pizza and pasta alternatives.", "Ventimiglia: option italienne pratique pour pizza et pasta avec alternatives vegan.", "Ventimiglia: opzione pratica italiana per pizza e pasta con alternative vegan.", "Вентімілья: практичний італійський варіант для неформальної веган-спрямованої піци й пасти."),
        ],
        relatedPlaceIds: ["paper-plane-nice", "monaco-monte-carlo", "la-musa-ventimiglia", "nice-old-town", "ventimiglia"],
      },
      {
        heading: t("Booking approach from apartments", "Organisation pratique depuis l'appartement", "Approccio pratico dall'appartamento", "Практичний підхід з апартаментів"),
        body: [
          t(
            "For high-intent vegan stays, self-catering is usually your strongest foundation: buy fruit, bread, olive oil, rice, legumes and pantry basics, then plan one evening meal outside.",
            "Pour un séjour vegan, l'auto-catering est souvent le socle le plus fort: achetez fruits, pain, huile d'olive, riz, legumes et completer la semaine avec un repas dehors.",
            "Per un soggiorno vegan, il self-catering è spesso la base più forte: compra frutta, pane, olio d'oliva, riso, legumi e organizza un pasto all'esterno.",
            "Для веган-гурту/сім'ї найкраща основа — самообслуговування: фрукт, хліб, оливкова олія, рис, бобові й базові продукти, а потім один вечірній прийом їжі назовні.",
          ),
        ],
        relatedApartmentKeys: allApartments,
      },
      {
        heading: t("Practical phrases", "Phrases utiles", "Frasi pratiche", "Практичні фрази"),
        body: [
          t(
            "Keep the most useful short phrases ready before you go.",
            "Ayez ces phrases utiles à portée de main avant de partir.",
            "Tieni a portata di mano queste frasi pratiche prima di uscire.",
            "Майте під рукою кілька практичних фраз заздалегідь.",
          ),
        ],
        bullets: [
          t("I am vegan.", "Je suis végan(e).", "Sono vegano/vegana.", "Я веган/веганка."),
          t("No fish stock, no butter, no cream, no cheese, no eggs, please.", "Pas de bouillon de poisson, pas de beurre, de crème, de fromage, pas d'œufs, s'il vous plaît.", "Nessun brodo di pesce, burro, panna, formaggio e uova, per favore.", "Будь ласка, без рибного бульййону, масла, вершків, сиру, яєць."),
        ],
      },
    ],
    practicalTips: [
      t("Check current hours before visiting; seasonal schedules change often.", "Vérifiez les horaires actuels avant de venir; les horaires saisonniers changent souvent.", "Controlla gli orari aggiornati prima di andarci; i programmi stagionali cambiano spesso.", "Перевіряйте актуальні години: сезонність часто змінює графік."),
      t("Ask explicitly about vegan substitutions for sauces, dressings and cooked oil.", "Demandez explicitement les substitutions vegan pour sauces, assaisonnements et huiles de cuisson.", "Chiedi esplicitamente alle sostituzioni vegan per salse, condimenti e oli di cottura.", "Окремо уточнюйте про заміни в соусах, заправках і способах приготування."),
      t("If one option is uncertain, keep a backup with more reliable day-trip places in Nice or Ventimiglia.", "Si une option est incertaine, gardez un plan de secours avec Nice ou Vintimille.", "Se una opzione è incerta, tieni un piano B con Nizza o Ventimiglia.", "Якщо щось невизначене — тримайте резервний план з Ніцци чи Вентімільї."),
    ],
  },
  {
    id: "kosher-food-restaurants-menton-monaco-nice",
    slug: "kosher-food-restaurants-menton-monaco-nice",
    title: t(
      "Kosher food near Menton: restaurants, groceries and Shabbat planning",
      "Cuisine casher autour de Menton: restaurants, epiceries et préparation Shabbat",
      "Cibo kasher vicino a Menton: ristoranti, negozi e organizzazione Shabbat",
      "Кошерна їжа біля Ментона: ресторани, продуктові магазини та підготовка до Шабату",
    ),
    seoTitle: t(
      "Kosher Food Near Menton: Restaurants, Groceries, Monaco and Nice Options",
      "Cuisine casher près de Menton: restaurants, épiceries, Monaco et Nice",
      "Cibo kasher vicino a Menton: ristoranti, negozi, Monaco e Nice",
      "Кошерна їжа біля Ментона: ресторани, супермаркети, Монако і Ніцца",
    ),
    seoDescription: t(
      "A practical guide to kosher food near Menton: what is available locally, kosher groceries and restaurant options in Nice, Monaco kosher sections, Shabbat meals and planning tips for observant guests.",
      "Guide pratique pour l'alimentation casher près de Menton: offres locales, épiceries kasher, restaurants de Nice, sections casher a Monaco, repas de Shabbat et planification pour voyageurs observants.",
      "Guida pratica al cibo kasher vicino a Mentone: cosa c'è localmente, negozi kasher, opzioni ristorative a Nizza, spazi kasher a Monaco, pasti per lo Shabbat e consigli pratici.",
      "Практичний гід з кошерної їжі біля Ментона: що є локально, куди купити продукти, ресторани Ніцци, відділи Kasher в Монако, харчування на Шабат і поради з планування.",
    ),
    excerpt: t(
      "Menton is a great base for an apartment stay, but strict kosher meals are often easier to organize with visits to Nice and planned Shabbat support.",
      "Menton est une excellente base pour loger en appartement, mais les repas kasher stricts sont souvent plus faciles avec des visites a Nice et une preparation Shabbat.",
      "Menton è una buona base per soggiornare in appartamento, ma i pasti kasher rigorosi sono spesso piu facili da organizzare con passaggi a Nizza e un planning per Shabbat.",
      "Ментон зручний як база для житла в апартаментах, але чіткі кошерні трапези найчастіше простіше організовувати з Ніцці з хорошою підготовкою до Шабату.",
    ),
    category: "food-markets",
    coverImage: "/images/guide/kosher-food-restaurants-menton-monaco-nice.jpg",
    coverImageAlt: t(
      "Illustration of kosher options on a Menton-Riviera planning route",
      "Illustration des options casher sur une route Menton-Riviera",
      "Illustrazione di opzioni kasher su un percorso Mentone-Riviera",
      "Ілюстрація кошерних варіантів на маршруті Ментон–Рив'єра",
    ),
    visualTheme: "food",
    visualStatus: "editorial_placeholder",
    tags: [
      t("kosher", "kasher", "kosher", "кошер"),
      t("restaurants", "restaurants", "ristoranti", "ресторани"),
      t("groceries", "épiceries", "alimenti", "продукти"),
      t("Shabbat", "Shabbat", "Shabbat", "Шабат"),
      t("travel planning", "planification", "pianificazione", "планування"),
      t("Nice", "Nice", "Nizza", "Ніцца"),
      t("Monaco", "Monaco", "Monaco", "Монако"),
    ],
    bestFor: [t("Jewish travel", "Voyage juif", "Viaggi ebraici", "Юдейські подорожі"), t("families", "Familles", "Famiglie", "Сім'ї"), t("couples", "Couples", "Coppie", "Пари"), t("practical planning", "Planification pratique", "Pianificazione pratica", "Практичне планування")],
    duration: "reference",
    locationTags: ["menton-centre", "nice", "monaco", "italian-riviera"],
    sourceStatus: "needs_verification",
    relatedPlaces: [
      "la-makolet-nice",
      "le-kineret-nice",
      "bistro-k-nice",
      "le-leviathan-nice",
      "falafel-sahara-nice",
      "chabad-nice",
      "jcc-monaco",
      "carrefour-city-monaco",
      "carrefour-monaco-fontvieille",
      "marche-u-monaco",
      "communaute-israelite-de-menton",
      "menton-station",
      "nice-ville-station",
    ],
    relatedArticles: [
      "local-food-menton",
      "vegan-restaurants-cafes-menton",
      "supermarkets-in-menton",
      "day-trips-from-menton",
      "menton-without-a-car",
      "best-souvenir-shops-menton-monaco-nice",
      "public-transport-in-menton",
      "how-to-get-to-menton-from-nice-airport",
    ],
    relatedApartments: allApartments,
    sections: [
      {
        heading: t("Is there kosher food in Menton?", "Y a-t-il de la nourriture casher à Menton?", "A Mentone c'è cibo kasher?", "Чи є кошерна їжа в Ментоні?"),
        body: [
          t(
            "Menton is a great place to stay for convenience, but it is not currently a strong kosher destination by itself. For strict observance, plan around: apartment self-catering, Nice for restaurants and shopping, and limited kosher sections in Monaco supermarkets.",
            "Menton est un excellent endroit pour se loger, mais ce n'est pas un vrai centre kasher. Pour un usage strict, planifier avec un appartement, Nice pour restaurants et courses, et les sections kasher des supermarches de Monaco.",
            "Menton e comodo per la base dell'alloggio, ma non e una meta kasher completa. Per un approccio rigoroso prevedi: autocucina in appartamento, Nizza per ristoranti e supermercati, e i reparti kasher di alcuni punti a Monaco.",
            "Ментон зручний для проживання, але сам по собі не є сильно розвиненою кошерною базою. Для строгого рівня плануйте: готувати в апартаментах, їсти в Ніцці, і використовувати обмежені кошерні відділи магазинів у Монако.",
          ),
          t(
            "The most practical way is to buy enough staples early, then make one planned trip to Nice during the first days of the stay.",
            "Le plus pratique consiste a acheter les essentiels rapidement, puis organiser un trajet planifie vers Nice au debut du sejour.",
            "Il modo piu pratico e comprare bene all'inizio e organizzare un viaggio previsto a Nizza nei primi giorni.",
            "Найпрактичніше: заздалегідь купити базові продукти, а на перших днях перебування зробити заздалегідь спланований візит до Ніцци.",
          ),
        ],
        relatedPlaceIds: ["menton-station", "nice-ville-station", "le-kineret-nice"],
      },
      {
        heading: t("Quick strategy by city", "Strategie express par ville", "Strategia rapida per citta', ", "Швидка стратегія по містах"),
        body: [
          t(
            "For strict kosher meals, Nice is the first option. For shorter self-catering stays, La Makolet and Le Kineret are strong practical anchors. Monaco works mainly for packaged products and community contact.",
            "Pour des repas kasher stricts, la priorite est Nice. Pour un sejour plus court en auto-cuisine, La Makolet et Le Kineret sont des points clefs. Monaco reste surtout utile pour produits conditionnes et contact communautaire.",
            "Per pasti kasher rigidi, la prima opzione e Nizza. Per soggiorni piu brevi in autocucina, La Makolet e Le Kineret sono punti pratici. Monaco e utile soprattutto per prodotti confezionati e contatti comunitari.",
            "Для строгих кошерних прийомів їжі перша опція — Ніцца. Для коротших самостійних гастрономічних перебувань опорними точками є La Makolet і Le Kineret. Монако корисний головно для запакованих продуктів і контакту з громадою.",
          ),
        ],
        bullets: [
          t("Menton: apartment-first and self-catering baseline.", "Menton: base appartement et préparation locale.", "Menton: base in appartamento e autosufficienza.", "Ментон: база апартаментів і самопідготовка."),
          t("Nice: larger kosher dining and grocery options.", "Nice: choix plus larges pour restaurants kasher et épiceries.", "Nizza: opzioni piu ampie per ristoranti e alimentari kasher.", "Ніцца: більший вибір ресторанного й продуктовогo кошера."),
          t("Monaco: official community links plus supermarket sections.", "Monaco: contacts communautaires officiels + sections kasher de supermarches.", "Monaco: contatti comunitari ufficiali e reparti kasher dei supermercati.", "Монако: офіційні контакти громади та відділи кошера в супермаркетах."),
        ],
      },
      {
        heading: t("Menton planning: what works on the ground", "A Menton: ce qui fonctionne vraiment", "Menton: cosa funziona davvero", "Практичне планування в Ментоні"),
        body: [
          t(
            "Use Menton for a calm base: supermarket stops for water and fruit, apartment breakfasts, and short trips to Nice for prepared meals if needed. Keep transport and opening hours flexible around local rhythms.",
            "Utilisez Menton comme base calme: courses pour eau et fruit, petits dej a l'appartement, et trajets courts vers Nice pour repas prepares. Restez flexible sur les horaires et les transports locaux.",
            "Usa Menton come base tranquilla: spesa per acqua e frutta, colazioni in appartamento e brevi gite a Nizza per pasti preparati se necessario. Mantieni flessibili orari e trasporti.",
            "Використовуйте Ментон як спокійну базу: супермаркети для води й фруктів, сніданки в апартаментах, короткі поїздки до Ніцци за приготованою їжею. Плануйте гнучко з урахуванням графіків.",
          ),
          t(
            "Always verify certification and opening hours for the place you actually use. Do not rely on a previous trip's memory.",
            "Verifiez toujours certification et horaires des lieux que vous utilisez. Ne comptez pas sur la memoire d'un sejour precedent.",
            "Verifica sempre certificazione e orari dei luoghi che usi davvero. Non contare sulla memoria di un altro viaggio.",
            "Завжди перевіряйте сертифікацію і години роботи конкретних місць. Не спирайтеся на досвід попередньої поїздки.",
          ),
        ],
        relatedPlaceIds: ["menton-station", "la-makolet-nice", "le-kineret-nice"],
      },
      {
        heading: t("Practical place guidance", "Conseils pratiques par lieu", "Guida pratica per luogo", "Практичні поради по локаціях"),
        body: [
          t("La Makolet Nice is a first practical stop for packaged staples and Shabbat basics.", "La Makolet est un premier passage pratique pour les produits de base emballes et les besoins Shabbat.", "La Makolet a Nizza e un primo punto pratico per scorta confezionata e base Shabbat.", "La Makolet у Ніцці — перша практична зупинка для базових запакованих продуктів і потреб Шабату."),
          t("Le Kineret is useful for take-away and catered options when you need planned meals.", "Le Kineret est utile pour les plats a emporter et options traiteees quand vous devez prevoir les repas.", "Le Kineret e utile per take-away e catering quando devi pianificare i pasti.", "Le Kineret корисний для забірної їжі й кейтерингу, якщо потрібне попереднє планування."),
        ],
        bullets: [
          t("Bistro K — useful meat restaurant in Nice if you need a full sit-down meal.", "Bistro K — restaurant viande utile a Nice si vous souhaitez un repas assis.", "Bistro K — ristorante kasher carne utile a Nizza per un pasto completo.", "Bistro K — корисний м'ясний ресторан у Ніцці для повноцінної вечері."),
          t("Le Leviathan — dairy option in Nice with a different style of cuisine.", "Le Leviathan — option laitier a Nice avec une cuisine differente.", "Le Leviathan — opzione latticini a Nizza con una cucina diversa.", "Le Leviathan — молочний варіант у Ніцці з іншим типом кухні."),
          t("Falafel Sahara — useful faster meal backup around République side.", "Falafel Sahara — repli rapide du cote Garibaldi / Republique.", "Falafel Sahara — alternativa veloce utile sul lato Repubblica.", "Falafel Sahara — зручний швидкий варіант біля Республіки."),
          t("Monaco community points should be confirmed for current delivery and Shabbat support in advance.", "Les points communautaires de Monaco se confirment en avance pour livraison et support Shabbat.", "I punti comunitari di Monaco vanno confermati prima per consegne e supporto Shabbat.", "Монaкоські громади краще підтверджувати заздалегідь для доставки і підтримки Шабату."),
        ],
        relatedPlaceIds: ["la-makolet-nice", "le-kineret-nice", "bistro-k-nice", "le-leviathan-nice", "falafel-sahara-nice", "jcc-monaco", "communaute-israelite-de-menton"],
      },
      {
        heading: t("Shabbat planning checklist", "Checklist de préparation au Shabbat", "Checklist pratica per lo Shabbat", "Чеклист підготовки до Шабату"),
        body: [
          t(
            "For weekend comfort, prepare at least part of your food before Friday afternoon, then confirm pickup and transport. Plan dates, delivery windows and what your group eats.",
            "Pour un weekend confortable, preparez une partie de la nourriture avant vendredi aprem, puis confirmez le retrait et le transport. Planifiez dates, plages de livraison et besoins du groupe.",
            "Per un fine settimana comodo, prepara parte del cibo prima di venerdi pomeriggio, poi conferma ritiro e trasporto. Definisci date, finestre di consegna e bisogni del gruppo.",
            "Для комфортного вікенду підготуйте частину їжі до п’ятниці пополудні, потім уточніть підняття і транспорт. Зафіксуйте дати, вікна доставки та потреби всіх учасників.",
          ),
        ],
        bullets: [
          t("Keep a minimal emergency list in the apartment: water, bread/challah, oil, fruits, cereal.", "Gardez une petite liste d'urgence dans l'appartement: eau, pain/challah, huile, fruits, céréales.", "Tieni una lista minima in appartmento: acqua, pane/challah, olio, frutta, cereali.", "Майте мінімальний аварійний список у апартаменті: вода, хліб/challah, олія, фрукти, крупи."),
          t("Avoid assumptions: halal is not always kosher, vegetarian is not always kosher, local can still vary by supplier.", "Ne supposez pas: halal n'est pas toujours casher, vegetarien n'est pas toujours casher, et l'offre locale varie selon les fournisseurs.", "Non dare per scontato: halal non e sempre kasher, vegetariano non e sempre kasher, l'offerta locale cambia per fornitore.", "Не припускайте: халяль не завжди кошерно, вегетаріанське не завжди кошерне, локальна пропозиція залежить від постачальника."),
          t("Use Chabad and JCC official contacts for up-to-date confirmations, not old blog screenshots.", "Utilisez les contacts officiels Chabad et JCC pour confirmation actuelle, pas des captures de blogs anciens.", "Usa i contatti ufficiali di Chabad e JCC per conferme attuali, non solo vecchi screenshot.", "Для актуальної перевірки користуйтеся офіційними контактами Chabad та JCC, а не застарілими скріншотами."),
        ],
        relatedPlaceIds: ["chabad-nice", "communaute-israelite-de-menton", "jcc-monaco"],
      },
      {
        heading: t("Best options by need", "Meilleures options selon vos besoins", "Le migliori opzioni secondo le tue necessita", "Найкращі варіанти за потребами"),
        body: [
          t(
            "If your goal is a kosher restaurant meal, plan on Nice first and use Bistro K or Le Leviathan depending on meat/dairy needs. For apartment stays with limited transport, La Makolet plus Le Kineret is the most reliable practical pattern.",
            "Si vous cherchez un repas kasher au restaurant, commencez par Nice et choisissez Bistro K ou Le Leviathan selon viande/lait. Pour un sejour en appartement avec transport limité, La Makolet + Le Kineret reste le schéma le plus fiable.",
            "Se cerchi un pasto kasher al ristorante, inizia da Nizza con Bistro K o Le Leviathan in base a carne/latticino. Per soggiorni con trasporto limitato, La Makolet + Le Kineret e lo schema piu affidabile.",
            "Якщо потрібний кошерний ресторанний обід/вечеря — плануйте Ніццу спочатку і обирайте Bistro K або Le Leviathan за принципом м'ясо/молоко. Для апартамента з обмеженим транспортом надійний варіант: La Makolet + Le Kineret."),
        ],
      },
    ],
    practicalTips: [
      t("Never rely on one source; verify kosher certification, supervising authority and Friday availability before travel.", "Ne faites confiance qu'à une source: verifiez certif, supervision et disponibilite du vendredi avant de voyager.", "Non fidarti di una sola fonte: verifica certificazione, supervisione e disponibilita del venerdi prima di partire.", "Не покладайтеся на одно джерело: перевіряйте сертифікацію, наглядовий орган і доступність на п'ятницю до поїздки."),
      t("Treat this as practical guidance and verify with official community or venue contacts in the week of your visit.", "Considerez ce guide comme pratique: confirmez avec les contacts officiels communautaires ou locaux la semaine de voyage.", "Considera questa guida solo pratica e verifica i contatti ufficiali comunitari o dei luoghi nella settimana del viaggio.", "Сприймайте цей гід як практичний; в тиждень подорожі перевіряйте офіційні контакти громади або локацій."),
      t("For planning reliability, mention kosher needs when requesting apartment availability and transport timing.", "Pour un planning fiable, mentionnez le besoin casher lors de la demande d'hebergement et de transport.", "Per una pianificazione affidabile, segnala il bisogno kasher quando chiedi disponibilita su appartamento e trasporti.", "Для надійного планування вкажіть про кошерні потреби при запиті бронювання й розкладу транспорту."),
    ],
  },
  {
    id: "best-ice-cream-menton",
    slug: "best-ice-cream-menton",
    title: t("Best ice cream in Menton: gelato, artisan glaciers and lemon sorbet", "Meilleures glaces a Menton: gelato, glaciers artisanaux et sorbet citron", "Miglior gelato a Mentone: gelaterie artigianali e sorbetto al limone", "Найкраще морозиво в Ментоні: gelato, artisan glaciers і лимонний сорбет"),
    seoTitle: t("Best Ice Cream in Menton: Gelato, Artisan Glaciers & Lemon Sorbet", "Meilleures glaces a Menton: gelato, artisans et sorbet citron", "Miglior gelato a Mentone: artigianale e sorbetto al limone", "Найкраще морозиво в Ментоні: gelato і лимонний сорбет"),
    seoDescription: t("A practical guide to the best ice cream and gelato in Menton: artisan glaciers, Italian-style gelato, lemon sorbet, family stops, old-town walks and seaside ice-cream breaks.", "Guide pratique des meilleures glaces a Menton: glaciers artisanaux, gelato italien, sorbet citron, pauses en famille, vieille ville et bord de mer.", "Guida pratica al miglior gelato a Mentone: gelaterie artigianali, gelato all'italiana, sorbetto al limone, famiglie, centro storico e mare.", "Практичний гід по морозиву в Ментоні: artisan glaciers, італійське gelato, лимонний сорбет, сімейні зупинки, старе місто й море."),
    excerpt: t("Menton is the kind of town where ice cream becomes part of the day: after the beach, before an old-town walk, with children in Rue Saint-Michel, or as a lemon sorbet stop near the sea.", "A Menton, la glace fait partie de la journee: apres la plage, avant une balade dans la vieille ville, avec les enfants rue Saint-Michel ou en sorbet citron pres de la mer.", "A Mentone il gelato entra nel ritmo della giornata: dopo la spiaggia, prima del centro storico, con bambini in Rue Saint-Michel o come sorbetto al limone vicino al mare.", "У Ментоні морозиво стає частиною дня: після пляжу, перед прогулянкою старим містом, з дітьми на Rue Saint-Michel або як лимонний сорбет біля моря."),
    category: "food-markets",
    coverImage: "/images/guide/best-ice-cream-menton.jpg",
    coverImageAlt: t("Illustration of ice cream and gelato in Menton", "Illustration de glaces et gelato a Menton", "Illustrazione di gelato a Mentone", "Ілюстрація морозива й gelato в Ментоні"),
    visualTheme: "food",
    visualStatus: "project_illustration",
    tags: [t("ice cream", "glace", "gelato", "морозиво"), t("gelato", "gelato", "gelato", "gelato"), t("lemon sorbet", "sorbet citron", "sorbetto al limone", "лимонний сорбет"), t("Rue Saint-Michel", "rue Saint-Michel", "Rue Saint-Michel", "Rue Saint-Michel")],
    bestFor: [guideBestForOptions[2].label, guideBestForOptions[1].label, guideBestForOptions[8].label, guideBestForOptions[3].label],
    duration: "1-2 hours",
    locationTags: ["menton-centre", "old-town", "seafront"],
    sourceStatus: "needs_verification",
    sections: [
      {
        heading: t("Why ice cream matters in Menton", "Pourquoi la glace compte a Menton", "Perche il gelato conta a Mentone", "Чому морозиво важливе в Ментоні"),
        body: [
          t("Menton is close to Italy, famous for lemons and built for slow summer walks. That makes ice cream more than a dessert here: after the beach, after dinner, or during a hot afternoon with children, it becomes part of the rhythm of the town.", "Menton est proche de l'Italie, celebre pour ses citrons et faite pour les promenades lentes d'ete. La glace y est plus qu'un dessert: apres la plage, apres le diner ou pendant un apres-midi chaud avec des enfants, elle entre dans le rythme de la ville.", "Mentone e vicina all'Italia, famosa per i limoni e perfetta per passeggiate estive lente. Il gelato qui e piu di un dessert: dopo la spiaggia, dopo cena o in un pomeriggio caldo con bambini, diventa parte del ritmo della citta.", "Ментон близько до Італії, відомий лимонами й створений для повільних літніх прогулянок. Тому морозиво тут не просто десерт: після пляжу, після вечері або спекотного дня з дітьми воно стає частиною ритму міста."),
          t("The strongest ice-cream cluster is around Rue Saint-Michel, the pedestrian old-town shopping street. A second useful area is Quai Bonaparte by the old port, which works well before or after the Basilica, the Bastion area or the seafront.", "Le principal groupe de glaciers se trouve autour de la rue Saint-Michel, rue pietonne de la vieille ville. Un second secteur utile est le quai Bonaparte, pres du vieux port, pratique avant ou apres la basilique, le Bastion ou le front de mer.", "Il gruppo piu forte di gelaterie e intorno a Rue Saint-Michel, via pedonale del centro storico. Una seconda zona utile e Quai Bonaparte, presso il porto vecchio, comoda prima o dopo Basilica, Bastion o lungomare.", "Найсильніший кластер морозива - навколо Rue Saint-Michel, пішохідної вулиці старого міста. Друга корисна зона - Quai Bonaparte біля старого порту, до або після Basilica, Bastion чи набережної."),
        ],
        relatedPlaceIds: ["rue-saint-michel-menton", "quai-bonaparte-menton"],
      },
      {
        heading: t("Quick recommendations", "Recommandations rapides", "Consigli rapidi", "Швидкі рекомендації"),
        body: [
          t("For homemade-style ice cream with natural ingredients, start with Puro Piacere. For Italian-style artisanal gelato in the old town, try Demontis Gelateria Artigianale. For a classic Menton old-town ice-cream walk, Tutti Frutti is a practical Rue Saint-Michel stop.", "Pour une glace type maison avec ingredients naturels, commencez par Puro Piacere. Pour un gelato artisanal italien dans la vieille ville, essayez Demontis Gelateria Artigianale. Pour une balade glacee classique, Tutti Frutti est une halte pratique rue Saint-Michel.", "Per gelato artigianale con ingredienti naturali, inizia da Puro Piacere. Per gelato italiano nel centro storico, prova Demontis Gelateria Artigianale. Per una passeggiata classica, Tutti Frutti e una sosta pratica in Rue Saint-Michel.", "Для домашнього стилю й натуральних інгредієнтів почніть із Puro Piacere. Для італійського artisan gelato у старому місті - Demontis Gelateria Artigianale. Для класичної прогулянки з морозивом - Tutti Frutti на Rue Saint-Michel."),
          t("For gelato near the port, use Gelateria Sofia. For gourmet-style creations, check La Fabrique Givrée. For children or mixed appetites, choose the nearest good Rue Saint-Michel glacier or L.A. Yogurteria and keep the walk short.", "Pour un gelato pres du port, choisissez Gelateria Sofia. Pour des creations plus gourmandes, regardez La Fabrique Givree. Avec enfants ou envies variees, choisissez le bon glacier le plus proche rue Saint-Michel ou L.A. Yogurteria et gardez la balade courte.", "Per gelato vicino al porto, scegli Gelateria Sofia. Per creazioni piu gourmet, controlla La Fabrique Givrée. Con bambini o gusti diversi, scegli la buona gelateria piu vicina in Rue Saint-Michel o L.A. Yogurteria e tieni breve la passeggiata.", "Для gelato біля порту - Gelateria Sofia. Для gourmet-style смаків - La Fabrique Givrée. З дітьми або різними смаками обирайте найближчий добрий glacier на Rue Saint-Michel або L.A. Yogurteria й не робіть маршрут довгим."),
        ],
        relatedPlaceIds: ["puro-piacere-menton", "demontis-gelateria-menton", "tutti-frutti-menton", "gelateria-sofia-menton", "la-fabrique-givree-menton", "la-yogurteria-menton"],
      },
      {
        heading: t("Rue Saint-Michel: the easiest ice-cream street", "Rue Saint-Michel: la rue la plus simple pour une glace", "Rue Saint-Michel: la via piu facile per il gelato", "Rue Saint-Michel: найзручніша вулиця для морозива"),
        body: [
          t("Rue Saint-Michel is pedestrian, central and close to the old town, which makes it the easiest area for families and evening walks. Demontis, Tutti Frutti, Le Tropic and L'Ami Glacé sit close enough that you can choose by the flavours that look freshest that day.", "La rue Saint-Michel est pietonne, centrale et proche de la vieille ville: c'est le secteur le plus simple pour les familles et les promenades du soir. Demontis, Tutti Frutti, Le Tropic et L'Ami Glace sont assez proches pour choisir selon les parfums qui donnent envie ce jour-la.", "Rue Saint-Michel e pedonale, centrale e vicina al centro storico: e la zona piu semplice per famiglie e passeggiate serali. Demontis, Tutti Frutti, Le Tropic e L'Ami Glacé sono abbastanza vicini da scegliere in base ai gusti piu freschi del giorno.", "Rue Saint-Michel пішохідна, центральна й близька до старого міста, тому це найпростіша зона для сімей і вечірніх прогулянок. Demontis, Tutti Frutti, Le Tropic і L'Ami Glacé близько одне до одного - обирайте за тим, які смаки виглядають найсвіжішими цього дня."),
          t("In July and August, go earlier with small children. In the evening, take the cone toward the old town or back toward the seafront instead of eating it in the busiest part of the street.", "En juillet et aout, venez plus tot avec de jeunes enfants. Le soir, emportez le cornet vers la vieille ville ou le front de mer plutot que de le manger dans le passage le plus dense.", "A luglio e agosto vai prima con bambini piccoli. La sera porta il cono verso il centro storico o il lungomare invece di mangiarlo nel punto piu affollato.", "У липні й серпні з малими дітьми приходьте раніше. Увечері краще взяти ріжок до старого міста або набережної, а не їсти в найлюднішій частині вулиці."),
        ],
        relatedPlaceIds: ["rue-saint-michel-menton", "demontis-gelateria-menton", "tutti-frutti-menton", "le-tropic-menton", "ami-glace-menton"],
      },
      {
        heading: t("Quai Bonaparte and the port route", "Quai Bonaparte et l'itineraire du port", "Quai Bonaparte e il percorso del porto", "Quai Bonaparte і маршрут біля порту"),
        body: [
          t("Gelateria Sofia gives a different rhythm from Rue Saint-Michel. It works before or after the old port, the Bastion, the Basilica area or a seafront sunset. This route is better when you want sea views with your ice cream rather than a shopping-street stop.", "Gelateria Sofia donne un rythme different de la rue Saint-Michel. Elle fonctionne avant ou apres le vieux port, le Bastion, le secteur de la basilique ou un coucher de soleil en bord de mer. C'est le bon choix si vous voulez des vues mer avec votre glace plutot qu'une halte de rue commercante.", "Gelateria Sofia offre un ritmo diverso da Rue Saint-Michel. Funziona prima o dopo porto vecchio, Bastion, zona Basilica o tramonto sul mare. E la scelta giusta se vuoi vista mare con il gelato piu che una sosta in via commerciale.", "Gelateria Sofia дає інший ритм, ніж Rue Saint-Michel. Вона працює до або після старого порту, Bastion, Basilica чи заходу сонця біля моря. Це варіант, коли хочеться краєвидів із морозивом, а не shopping-street зупинки."),
        ],
        relatedPlaceIds: ["gelateria-sofia-menton", "quai-bonaparte-menton"],
      },
      {
        heading: t("Lemon sorbet and citrus flavours", "Sorbet citron et parfums agrumes", "Sorbetto al limone e gusti agrumati", "Лимонний сорбет і цитрусові смаки"),
        body: [
          t("Menton is famous for lemons, so citrus is the most local flavour to ask about. Flavours change by season and by shop, so ask what each glacier currently makes with lemon, kumquat, orange or other Riviera citrus.", "Menton est celebre pour ses citrons: les agrumes sont donc les parfums les plus locaux a demander. Les parfums changent selon saison et adresse; demandez ce que chaque glacier propose actuellement au citron, kumquat, orange ou autres agrumes de la Riviera.", "Mentone e famosa per i limoni: gli agrumi sono i gusti piu locali da chiedere. I gusti cambiano con stagione e gelateria; chiedi cosa preparano al limone, kumquat, arancia o altri agrumi della Riviera.", "Ментон відомий лимонами, тож цитрусові - найлокальніший смак, про який варто питати. Смаки змінюються за сезоном і магазином, тому запитуйте, що зараз є з лимоном, кумкватом, апельсином чи іншими цитрусами Рив'єри."),
          t("Puro Piacere, Tutti Frutti and Demontis are useful starting points for lemon, citrus sorbets and more unusual fruit flavours. During Fête du Citron season, citrus flavours feel especially natural, but lemon sorbet is also one of the best hot-weather choices.", "Puro Piacere, Tutti Frutti et Demontis sont de bons points de depart pour citron, sorbets agrumes et parfums fruites plus rares. Pendant la Fete du Citron, les agrumes semblent evidents, mais le sorbet citron reste aussi l'un des meilleurs choix par forte chaleur.", "Puro Piacere, Tutti Frutti e Demontis sono buoni punti di partenza per limone, sorbetti agli agrumi e gusti fruttati piu insoliti. Durante la Fête du Citron gli agrumi sono naturali, ma il sorbetto al limone e anche una delle scelte migliori con il caldo.", "Puro Piacere, Tutti Frutti і Demontis - добрі точки старту для лимона, цитрусових сорбетів і незвичніших фруктових смаків. Під час Fête du Citron цитрусові особливо доречні, але лимонний сорбет також один із найкращих варіантів у спеку."),
        ],
        relatedPlaceIds: ["puro-piacere-menton", "tutti-frutti-menton", "demontis-gelateria-menton"],
        relatedEventIds: ["menton-lemon-festival"],
      },
      {
        heading: t("Best choices by situation", "Meilleurs choix selon la situation", "Scelte migliori per situazione", "Найкращі варіанти за ситуацією"),
        body: [
          t("Italian-style gelato: Demontis or Gelateria Sofia. Artisan or homemade style: Puro Piacere. Gourmet creations: La Fabrique Givrée. Children: Rue Saint-Michel because several choices are close together. Near the port: Gelateria Sofia. Snack rather than only ice cream: L.A. Yogurteria.", "Gelato italien: Demontis ou Gelateria Sofia. Style artisanal ou maison: Puro Piacere. Creations gourmandes: La Fabrique Givree. Enfants: rue Saint-Michel car plusieurs choix sont proches. Pres du port: Gelateria Sofia. Encas plus large: L.A. Yogurteria.", "Gelato italiano: Demontis o Gelateria Sofia. Artigianale o fatto in casa: Puro Piacere. Creazioni gourmet: La Fabrique Givrée. Bambini: Rue Saint-Michel perche ci sono piu scelte vicine. Vicino al porto: Gelateria Sofia. Snack piu ampio: L.A. Yogurteria.", "Італійське gelato: Demontis або Gelateria Sofia. Artisan/домашній стиль: Puro Piacere. Gourmet-смаки: La Fabrique Givrée. Діти: Rue Saint-Michel, бо кілька варіантів поруч. Біля порту: Gelateria Sofia. Ширший snack: L.A. Yogurteria."),
        ],
        relatedPlaceIds: ["demontis-gelateria-menton", "gelateria-sofia-menton", "puro-piacere-menton", "la-fabrique-givree-menton", "la-yogurteria-menton"],
      },
      {
        heading: t("Ice cream and staying in Menton", "Glace et sejour a Menton", "Gelato e soggiorno a Mentone", "Морозиво й проживання в Ментоні"),
        body: [
          t("If you are staying in central Menton, ice cream does not need a special outing. Add it to a seafront walk, the old town, the beach, the port, a family evening after dinner or a slow return to the apartment.", "Si vous logez au centre de Menton, la glace ne demande pas une sortie speciale. Ajoutez-la a une promenade en bord de mer, la vieille ville, la plage, le port, une soiree en famille apres diner ou un retour lent a l'appartement.", "Se soggiorni nel centro di Mentone, il gelato non richiede un'uscita speciale. Aggiungilo a una passeggiata sul mare, centro storico, spiaggia, porto, serata in famiglia dopo cena o rientro lento in appartamento.", "Якщо ви зупинилися в центрі Ментона, морозиво не потребує окремого outing. Додайте його до прогулянки набережною, старого міста, пляжу, порту, сімейного вечора після вечері або повільного повернення в апартаменти."),
          t("Sea View Balcony Studio works well for a balcony dessert. Beachside Apartment with Terrace & Parking is useful when ice cream becomes a simple reward after the beach with children. Panoramic Sea View Studio makes a quiet gelato evening with a view feel natural.", "Sea View Balcony Studio se prete bien a un dessert sur balcon. Beachside Apartment with Terrace & Parking est pratique quand la glace devient une recompense simple apres la plage avec enfants. Panoramic Sea View Studio rend naturelle une soiree gelato calme avec vue.", "Sea View Balcony Studio funziona bene per un dessert sul balcone. Beachside Apartment with Terrace & Parking e utile quando il gelato diventa una ricompensa semplice dopo la spiaggia con bambini. Panoramic Sea View Studio rende naturale una serata gelato tranquilla con vista.", "Sea View Balcony Studio добре підходить для десерту на балконі. Beachside Apartment with Terrace & Parking зручний, коли морозиво - проста винагорода після пляжу з дітьми. Panoramic Sea View Studio природно пасує до тихого gelato-вечора з видом."),
        ],
        relatedApartmentKeys: allApartments,
      },
      {
        heading: t("FAQ", "FAQ", "FAQ", "FAQ"),
        body: [
          t("Is Menton good for gelato? Yes. Menton is right next to Italy, and several glaciers in town lean toward Italian-style gelato. Rue Saint-Michel and the old port area are the easiest places to start.", "Menton est-elle une bonne ville pour le gelato? Oui. Menton est juste a cote de l'Italie et plusieurs glaciers ont une vraie influence italienne. La rue Saint-Michel et le vieux port sont les points de depart les plus simples.", "Mentone e buona per il gelato? Si. Mentone e accanto all'Italia e diverse gelaterie hanno uno stile italiano. Rue Saint-Michel e la zona del porto vecchio sono i punti piu facili da cui partire.", "Чи добрий Ментон для gelato? Так. Ментон біля Італії, і кілька glaciers мають італійський стиль. Rue Saint-Michel і старий порт - найпростіші місця для старту."),
          t("Which ice cream should I try first? Lemon sorbet or another citrus flavour. Menton is famous for lemons, so citrus is the most local choice.", "Quelle glace essayer d'abord? Sorbet citron ou autre parfum agrumes. Menton est celebre pour ses citrons: les agrumes sont le choix le plus local.", "Quale gelato provare per primo? Sorbetto al limone o un gusto agrumato. Mentone e famosa per i limoni, quindi gli agrumi sono la scelta piu locale.", "Яке морозиво спробувати спочатку? Лимонний сорбет або інший цитрусовий смак. Ментон відомий лимонами, тому цитрус - найлокальніший вибір."),
          t("Which area is easiest with children? Rue Saint-Michel, because it is central, walkable and has several choices close together.", "Quel secteur est le plus simple avec enfants? La rue Saint-Michel, car elle est centrale, pietonne et regroupe plusieurs choix proches.", "Quale zona e piu facile con bambini? Rue Saint-Michel, perche e centrale, pedonale e ha piu scelte vicine.", "Яка зона найзручніша з дітьми? Rue Saint-Michel, бо вона центральна, пішохідна й має кілька варіантів поруч."),
        ],
      },
    ],
    practicalTips: [
      t("Do not rely only on online opening hours in summer or shoulder season.", "Ne vous fiez pas seulement aux horaires en ligne en ete ou hors saison.", "Non affidarti solo agli orari online in estate o mezza stagione.", "Не покладайтеся лише на онлайн-години влітку або міжсезоння."),
      t("For children, cups are safer than cones on very hot days.", "Pour les enfants, les pots sont plus pratiques que les cornets par forte chaleur.", "Per bambini, le coppette sono piu sicure dei coni nei giorni molto caldi.", "Для дітей у дуже спекотні дні стаканчики зручніші за ріжки."),
      t("Ask what is made with lemon, local citrus or seasonal fruit that day.", "Demandez ce qui est fait au citron, aux agrumes locaux ou aux fruits de saison ce jour-la.", "Chiedi cosa e fatto con limone, agrumi locali o frutta di stagione quel giorno.", "Запитуйте, що цього дня зроблено з лимоном, місцевими цитрусами або сезонними фруктами."),
      t("If you want to compare shops, do it over several days rather than all in one evening.", "Si vous voulez comparer plusieurs glaciers, faites-le sur plusieurs jours plutot que le meme soir.", "Se vuoi confrontare piu gelaterie, fallo in piu giorni invece che in una sola sera.", "Якщо хочете порівняти кілька місць, робіть це за кілька днів, а не за один вечір."),
    ],
    relatedPlaces: ["rue-saint-michel-menton", "quai-bonaparte-menton", "puro-piacere-menton", "demontis-gelateria-menton", "tutti-frutti-menton", "gelateria-sofia-menton", "la-fabrique-givree-menton", "le-tropic-menton", "ami-glace-menton", "la-yogurteria-menton", "halles-du-marche", "promenade-du-soleil"],
    relatedArticles: ["local-food-menton", "best-beaches-in-menton", "menton-with-kids-family-guide", "menton-old-town", "stay-cool-in-menton-summer", "where-to-stay-in-menton", "halles-du-marche-menton", "fete-du-citron-menton-practical-guide", "quiet-evening-in-menton"],
    relatedEvents: ["menton-lemon-festival"],
    relatedApartments: allApartments,
  },
  {
    id: "halles-du-marche-menton",
    slug: "halles-du-marche-menton",
    title: t("Halles du Marché: Menton's morning market, local bites and picnic shopping", "Halles du Marche: marche du matin, specialites locales et pique-nique", "Halles du Marché: mercato del mattino, assaggi locali e picnic", "Halles du Marché: ранковий ринок, локальні закуски й пікнік"),
    seoTitle: t("Halles du Marché Menton | Morning Market Guide", "Halles du Marche Menton | Guide du marche", "Halles du Marché Mentone | Guida al mercato", "Halles du Marché Menton | Гід по ранковому ринку"),
    seoDescription: t("A practical guide to Halles du Marché in Menton: when to go, what to taste, market picnic ideas and simple apartment meals.", "Guide pratique des Halles du Marche a Menton: quand venir, quoi gouter, idees de pique-nique et repas simples a l'appartement.", "Guida pratica alle Halles du Marché di Mentone: quando andare, cosa assaggiare, picnic e pasti semplici in appartamento.", "Практичний гід по Halles du Marché у Ментоні: коли йти, що куштувати, пікнік і прості страви в апартаментах."),
    excerpt: t("Halles du Marché is the easiest way to feel Menton waking up: fruit, citrus, cheeses, olives, pastries and small local bites before the old town or Sablettes.", "Les Halles du Marche sont l'une des facons les plus simples de sentir Menton se reveiller: fruits, agrumes, fromages, olives, patisseries et petites specialites avant la vieille ville ou Sablettes.", "Le Halles du Marché sono uno dei modi piu semplici per sentire Mentone che si sveglia: frutta, agrumi, formaggi, olive, dolci e piccoli assaggi locali prima del centro storico o di Sablettes.", "Halles du Marché - один із найпростіших способів відчути, як прокидається Ментон: фрукти, цитрусові, сири, оливки, випічка й невеликі місцеві закуски перед старим містом або Sablettes."),
    category: "food-markets",
    coverImage: "/images/guide/halles-du-marche-menton.jpg",
    coverImageAlt: t("Illustration of Halles du Marché in Menton", "Illustration des Halles du Marche a Menton", "Illustrazione delle Halles du Marché a Mentone", "Ілюстрація Halles du Marché у Ментоні"),
    visualTheme: "market",
    visualStatus: "project_illustration",
    tags: [t("market", "marche", "mercato", "ринок"), t("picnic", "pique-nique", "picnic", "пікнік"), t("morning", "matin", "mattino", "ранок")],
    bestFor: [guideBestForOptions[2].label, guideBestForOptions[1].label, guideBestForOptions[3].label, guideBestForOptions[4].label],
    duration: "45 to 90 minutes",
    locationTags: ["menton-centre", "old-town", "seafront"],
    sourceStatus: "needs_verification",
    featured: true,
    sections: [
      {
        heading: t("Why go in the morning", "Pourquoi y aller le matin", "Perche andare al mattino", "Чому варто йти зранку"),
        body: [
          t(
            "Halles du Marché is one of the easiest ways to feel Menton waking up: a covered Belle Epoque market filled with fruit, vegetables, citrus products, cheeses, olives, bread and pastries.",
            "Les Halles du Marche sont l'une des facons les plus simples de sentir Menton se reveiller : un marche couvert Belle Epoque rempli de fruits, legumes, agrumes, fromages, olives, pains et patisseries.",
            "Le Halles du Marché sono uno dei modi piu semplici per sentire Mentone che si sveglia: un mercato coperto Belle Epoque pieno di frutta, verdura, agrumi, formaggi, olive, pane e dolci.",
            "Halles du Marché - один із найпростіших способів відчути, як прокидається Ментон: критий ринок Belle Epoque з фруктами, овочами, цитрусовими продуктами, сирами, оливками, хлібом і випічкою.",
          ),
          t(
            "It works best as a morning stop, when stalls are full, locals are shopping and you can combine the visit with the old town, Les Rampes Saint-Michel or a few hours at Plage des Sablettes.",
            "Il fonctionne surtout comme halte matinale, quand les etals sont pleins, les habitants font leurs courses et vous pouvez combiner la visite avec la vieille ville, les Rampes Saint-Michel ou quelques heures a la Plage des Sablettes.",
            "Funziona al meglio come tappa del mattino, quando i banchi sono pieni, i residenti fanno la spesa e puoi abbinarlo al centro storico, a Les Rampes Saint-Michel o a qualche ora a Plage des Sablettes.",
            "Найкраще приходити зранку, коли ятки повні, місцеві роблять покупки, а візит легко поєднати зі старим містом, Les Rampes Saint-Michel або кількома годинами на Plage des Sablettes.",
          ),
        ],
        relatedPlaceIds: ["halles-du-marche", "rue-saint-michel-menton", "rampes-saint-michel", "plage-sablettes"],
      },
      {
        heading: t("When it is open and how it works", "Horaires et fonctionnement", "Quando e aperto e come funziona", "Коли відкрито і як це працює"),
        body: [
          t(
            "The market usually runs in the morning, with most activity from around 8:00 to 12:30, and is often liveliest from Tuesday to Saturday. Hours and the number of stalls can change by season and day, so check current information or simply aim to arrive earlier rather than later.",
            "Le marche fonctionne generalement le matin, avec le plus d'activite autour de 8h00-12h30, et il est souvent le plus vivant du mardi au samedi. Les horaires et le nombre d'etals peuvent changer selon la saison et le jour : verifiez les informations actuelles ou arrivez simplement plutot tot.",
            "Il mercato di solito funziona al mattino, con la maggior parte dell'attivita intorno alle 8:00-12:30, ed e spesso piu vivace dal martedi al sabato. Orari e numero di banchi possono cambiare secondo stagione e giorno: controlla le informazioni aggiornate o arriva semplicemente presto.",
            "Ринок зазвичай працює зранку, з найбільшою активністю приблизно з 8:00 до 12:30, і часто найжвавіший із вівторка по суботу. Години й кількість яток можуть змінюватися залежно від сезону та дня, тому перевіряйте актуальну інформацію або просто приходьте раніше.",
          ),
          t(
            "After lunchtime, the hall becomes much quieter and some stands close completely. From central Menton and the seafront, you can walk here in a few minutes, then continue on foot towards the old town or the old port.",
            "Apres le dejeuner, la halle devient beaucoup plus calme et certains stands ferment completement. Depuis le centre de Menton et le front de mer, vous pouvez venir a pied en quelques minutes, puis continuer vers la vieille ville ou le vieux port.",
            "Dopo pranzo, la hall diventa molto piu tranquilla e alcuni banchi chiudono del tutto. Dal centro di Mentone e dal lungomare puoi arrivare a piedi in pochi minuti, poi continuare verso il centro storico o il vecchio porto.",
            "Після обіду ринкова зала стає значно тихішою, а частина яток повністю закривається. З центру Ментона й набережної сюди можна дійти за кілька хвилин, а потім продовжити пішки до старого міста або старого порту.",
          ),
          t(
            "If you arrive by car, nearby streets and underground car parks may offer paid parking, but morning spaces can fill quickly on market days and in summer.",
            "Si vous venez en voiture, les rues voisines et parkings souterrains peuvent proposer du stationnement payant, mais les places du matin se remplissent vite les jours de marche et en ete.",
            "Se arrivi in auto, le strade vicine e i parcheggi sotterranei possono offrire posti a pagamento, ma al mattino si riempiono rapidamente nei giorni di mercato e in estate.",
            "Якщо ви приїжджаєте авто, на сусідніх вулицях і в підземних паркінгах може бути платне паркування, але зранку місця швидко заповнюються в ринкові дні та влітку.",
          ),
        ],
        relatedPlaceIds: ["halles-du-marche"],
      },
      {
        heading: t("What to buy and where to look inside the market", "Quoi acheter et ou regarder dans le marche", "Cosa comprare e dove guardare nel mercato", "Що купувати і де шукати на ринку"),
        image: "/images/guide/local-food-pichade-pissaladiere.jpg",
        imageAlt: t("Pichade and pissaladière with local market food in Menton", "Pichade et pissaladiere avec specialites du marche a Menton", "Pichade e pissaladière con prodotti del mercato a Mentone", "Pichade і pissaladière з локальною ринковою їжею в Ментоні"),
        visualTheme: "food",
        body: [
          t(
            "Halles du Marché is compact, so you do not need a complicated map. Make one slow lap first, then return to the stalls that look most active, seasonal and useful for your plan.",
            "Les Halles sont compactes: inutile d'avoir un plan complique. Faites d'abord un tour lent, puis revenez aux stands les plus actifs, saisonniers et utiles pour votre programme.",
            "Le Halles sono compatte: non serve una mappa complessa. Fai prima un giro lento, poi torna ai banchi piu attivi, stagionali e utili per il tuo programma.",
            "Halles du Marché компактний, тому складна карта не потрібна. Спершу зробіть повільне коло, а потім поверніться до найактивніших і сезонних яток.",
          ),
          t(
            "For socca, barbajuans, pichade and pissaladière, look for prepared-food counters around the Halles and just outside the covered market. Chez Mimi is a useful name to know for Menton and Riviera savoury bites, but go early because the best items are morning food.",
            "Pour socca, barbajuans, pichade et pissaladiere, regardez les comptoirs de plats prepares dans les Halles et juste autour. Chez Mimi est une adresse utile pour les specialites salees de Menton et de la Riviera; allez tot, car les meilleurs produits sont souvent du matin.",
            "Per socca, barbajuans, pichade e pissaladière, cerca i banchi di cibo pronto nelle Halles e appena fuori. Chez Mimi e un nome utile per assaggi salati di Mentone e Riviera; vai presto, perche i migliori prodotti sono spesso del mattino.",
            "Для socca, barbajuans, pichade і pissaladière шукайте прилавки з готовою їжею всередині Halles і поруч. Chez Mimi - корисна адреса для солоних закусок Ментона й Рив'єри; приходьте рано.",
          ),
          t(
            "For fresh fruit, vegetables and Menton lemons, choose producer-style stalls with seasonal displays rather than tourist packaging. In winter and spring, ask specifically for local citrus; in summer, build a simple lunch around tomatoes, peaches, apricots, salad leaves and herbs.",
            "Pour fruits, legumes et citrons de Menton, preferez les stands de producteurs avec produits de saison plutot que les emballages touristiques. En hiver et au printemps, demandez les agrumes locaux; en ete, composez un repas simple avec tomates, peches, abricots, salade et herbes.",
            "Per frutta, verdura e limoni di Mentone, scegli banchi da produttori con prodotti stagionali piu che confezioni turistiche. In inverno e primavera chiedi agrumi locali; in estate crea un pranzo semplice con pomodori, pesche, albicocche, insalata ed erbe.",
            "Для фруктів, овочів і лимонів Ментона обирайте ятки виробничого типу з сезонною викладкою, а не туристичні набори. Взимку й навесні запитуйте місцеві цитрусові; влітку беріть томати, персики, абрикоси, салат і трави.",
          ),
          t(
            "For cheese, charcuterie, olives and tapenade, use the deli-style counters inside the hall. Add good bread from a nearby bakery and you have the easiest apartment lunch: no recipe, no effort, very Menton.",
            "Pour fromages, charcuterie, olives et tapenade, utilisez les comptoirs epicerie-traiteur dans la halle. Ajoutez du bon pain d'une boulangerie voisine et vous avez le repas d'appartement le plus simple: aucune recette, peu d'effort, tres Menton.",
            "Per formaggi, salumi, olive e tapenade, usa i banchi gastronomia dentro la hall. Aggiungi buon pane da una panetteria vicina e hai il pranzo da appartamento piu semplice: niente ricetta, poco sforzo, molto Mentone.",
            "Для сиру, charcuterie, оливок і tapenade використовуйте deli-прилавки всередині зали. Додайте добрий хліб із сусідньої пекарні - і маєте найпростіший обід в апартаментах.",
          ),
          t(
            "For fish and seafood, go early and ask what is best today rather than arriving with a fixed idea. This is most useful if your apartment has a kitchen and you are comfortable cooking simply with olive oil, lemon and herbs.",
            "Pour poisson et fruits de mer, venez tot et demandez ce qui est meilleur aujourd'hui plutot que d'arriver avec une idee fixe. C'est surtout utile si votre appartement a une cuisine et si vous cuisinez simplement avec huile d'olive, citron et herbes.",
            "Per pesce e frutti di mare, vai presto e chiedi cosa e meglio oggi invece di arrivare con un'idea fissa. E utile soprattutto se l'appartamento ha cucina e sai cucinare in modo semplice con olio, limone ed erbe.",
            "За рибою й морепродуктами приходьте рано й питайте, що сьогодні найкраще. Це особливо корисно, якщо в апартаментах є кухня і ви готові просто готувати з оливковою олією, лимоном і травами.",
          ),
          t(
            "For lemon sweets, jams and citrus gifts, use the market as a starting point, then continue into the nearby old-town streets. Maison Herbin on Rue du Vieux Collège is one of Menton's best-known names for artisanal jams and citrus products.",
            "Pour douceurs au citron, confitures et cadeaux aux agrumes, utilisez le marche comme point de depart puis continuez dans les rues voisines. Maison Herbin, rue du Vieux College, est l'un des noms connus de Menton pour confitures artisanales et produits aux agrumes.",
            "Per dolci al limone, confetture e regali agli agrumi, usa il mercato come punto di partenza e poi continua nelle vie vicine. Maison Herbin in Rue du Vieux Collège e uno dei nomi piu noti di Mentone per marmellate e prodotti agli agrumi.",
            "Для лимонних солодощів, джемів і цитрусових подарунків почніть із ринку, а потім продовжуйте сусідніми вулицями. Maison Herbin на Rue du Vieux Collège - одна з відомих адрес Ментона для джемів і цитрусових продуктів.",
          ),
        ],
        relatedPlaceIds: ["halles-du-marche", "chez-mimi-menton", "maison-herbin-menton", "rue-saint-michel-menton"],
      },
      {
        heading: t("What to taste on the spot", "Quoi gouter sur place", "Cosa assaggiare sul posto", "Що скуштувати на місці"),
        image: "/images/guide/local-food-socca-street-food.jpg",
        imageAlt: t("Hot socca and simple Riviera street food", "Socca chaude et street food simple de la Riviera", "Socca calda e semplice street food della Riviera", "Гаряча socca і проста вулична їжа Рив'єри"),
        visualTheme: "food",
        body: [
          t(
            "If you are hungry, treat the market as your first small meal of the day. Buy one or two slices of pichade or pissaladière, a portion of socca if it is hot, and a few barbajuans, then eat them just outside the hall or on a nearby bench.",
            "Si vous avez faim, traitez le marche comme votre premier petit repas de la journee. Achetez une ou deux parts de pichade ou pissaladiere, une portion de socca si elle est chaude, et quelques barbajuans, puis mangez-les juste dehors ou sur un banc proche.",
            "Se hai fame, considera il mercato come il primo piccolo pasto della giornata. Compra una o due fette di pichade o pissaladière, una porzione di socca se e calda e qualche barbajuan, poi mangiali appena fuori dalla hall o su una panchina vicina.",
            "Якщо ви голодні, зробіть ринок першою невеликою трапезою дня. Купіть один-два шматки pichade або pissaladière, порцію socca, якщо вона гаряча, і кілька barbajuans, а потім з'їжте їх просто біля зали або на сусідній лавці.",
          ),
          t(
            "For something sweet, add a pastry, a piece of fougasse or a citrus tart from a bakery counter. For drinks, look for fresh juice, coffee from nearby cafes or bottled citrus syrups and juices to take away.",
            "Pour une note sucree, ajoutez une patisserie, un morceau de fougasse ou une tartelette aux agrumes d'un comptoir de boulangerie. Cote boissons, cherchez un jus frais, un cafe dans les cafes voisins ou des sirops et jus d'agrumes en bouteille a emporter.",
            "Per qualcosa di dolce, aggiungi un dolce, un pezzo di fougasse o una crostatina agli agrumi da un banco di panetteria. Per bere, cerca spremute, caffe nei locali vicini o sciroppi e succhi agli agrumi in bottiglia da portare via.",
            "Для солодкого додайте випічку, шматок fougasse або цитрусовий тарт із пекарського прилавка. З напоїв шукайте свіжий сік, каву в сусідніх кафе або пляшкові цитрусові сиропи й соки на виніс.",
          ),
        ],
        relatedPlaceIds: ["halles-du-marche", "chez-mimi-menton", "rue-saint-michel-menton", "promenade-du-soleil"],
      },
      {
        heading: t("Picnics and simple apartment meals", "Pique-niques et repas simples a l'appartement", "Picnic e pasti semplici in appartamento", "Пікніки й прості страви в апартаментах"),
        image: "/images/guide/local-food-barbajuans-market-picnic.jpg",
        imageAlt: t("Barbajuans and market picnic bites for Menton", "Barbajuans et bouchees de marche pour pique-nique a Menton", "Barbajuans e assaggi da mercato per picnic a Mentone", "Barbajuans і ринкові закуски для пікніка в Ментоні"),
        visualTheme: "food",
        body: [
          t(
            "One advantage of staying in an apartment is being able to use the market as your fridge. Bring a small reusable bag and think in simple combinations: bread, cheese, charcuterie, olives, cherry tomatoes, fruit and one or two lemon-based products make an easy lunch or dinner.",
            "L'un des avantages d'un sejour en appartement est de pouvoir utiliser le marche comme votre garde-manger. Prenez un petit sac reutilisable et pensez en combinaisons simples : pain, fromage, charcuterie, olives, tomates cerises, fruits et un ou deux produits au citron font un dejeuner ou diner facile.",
            "Uno dei vantaggi di stare in appartamento e poter usare il mercato come dispensa. Porta una piccola borsa riutilizzabile e pensa a combinazioni semplici: pane, formaggio, salumi, olive, pomodorini, frutta e uno o due prodotti al limone diventano un pranzo o una cena facili.",
            "Одна з переваг проживання в апартаментах - можна використовувати ринок як власний холодильник. Візьміть невелику багаторазову сумку й мисліть простими поєднаннями: хліб, сир, м'ясні делікатеси, оливки, чері, фрукти й один-два лимонні продукти вже складають легкий обід або вечерю.",
          ),
          t(
            "You can bring everything back to the apartment, or assemble a picnic and walk a few minutes to the seafront or Plage des Sablettes. This can be more flexible than a restaurant, especially with children or when you want to keep the day light.",
            "Vous pouvez tout rapporter a l'appartement, ou composer un pique-nique et marcher quelques minutes vers le front de mer ou la Plage des Sablettes. C'est souvent plus flexible qu'un restaurant, surtout avec des enfants ou quand vous voulez garder la journee legere.",
            "Puoi riportare tutto in appartamento, oppure preparare un picnic e camminare pochi minuti fino al lungomare o a Plage des Sablettes. Spesso e piu flessibile di un ristorante, soprattutto con bambini o quando vuoi mantenere la giornata leggera.",
            "Можна занести все в апартаменти або скласти пікнік і за кілька хвилин дійти до набережної чи Plage des Sablettes. Це часто гнучкіше за ресторан, особливо з дітьми або коли хочеться легкого дня.",
          ),
        ],
        relatedPlaceIds: ["halles-du-marche", "chez-mimi-menton", "rue-saint-michel-menton", "plage-sablettes"],
        relatedApartmentKeys: allApartments,
      },
      {
        heading: t("Small hacks for a better visit", "Petites astuces pour mieux en profiter", "Piccoli trucchi per una visita migliore", "Невеликі поради для кращого візиту"),
        body: [
          t(
            "Arrive before 10:00 if you want the best choice and a calmer atmosphere, especially on Saturdays and in high season. Do one quick lap first, then return to the stalls that appeal to you instead of buying everything at the first counter.",
            "Arrivez avant 10h00 si vous voulez le meilleur choix et une ambiance plus calme, surtout le samedi et en haute saison. Faites d'abord un tour rapide, puis revenez aux stands qui vous attirent au lieu de tout acheter au premier comptoir.",
            "Arriva prima delle 10:00 se vuoi piu scelta e un'atmosfera piu calma, soprattutto il sabato e in alta stagione. Fai prima un giro veloce, poi torna ai banchi che ti attirano invece di comprare tutto al primo banco.",
            "Приходьте до 10:00, якщо хочете кращий вибір і спокійнішу атмосферу, особливо в суботу й у високий сезон. Спершу зробіть швидке коло, а потім поверніться до яток, які сподобалися, замість купувати все на першому прилавку.",
          ),
          t(
            "If you are unsure what to choose, ask vendors what is local, homemade or from Menton today. For longer walks or beach hours afterwards, prioritise food that travels well: bread, fruit, nuts and sweets rather than delicate fresh cheeses or meats.",
            "Si vous ne savez pas quoi choisir, demandez aux vendeurs ce qui est local, fait maison ou de Menton ce jour-la. Pour une longue balade ou plusieurs heures de plage ensuite, privilegiez ce qui voyage bien : pain, fruits, fruits secs et douceurs plutot que fromages frais ou charcuteries fragiles.",
            "Se non sai cosa scegliere, chiedi ai venditori cosa e locale, fatto in casa o di Mentone quel giorno. Se dopo hai una lunga passeggiata o ore di spiaggia, preferisci prodotti che viaggiano bene: pane, frutta, frutta secca e dolci invece di formaggi freschi o salumi delicati.",
            "Якщо не знаєте, що обрати, запитайте продавців, що сьогодні місцеве, домашнє або саме з Ментона. Якщо після ринку плануєте довгу прогулянку чи кілька годин на пляжі, обирайте те, що добре переносить дорогу: хліб, фрукти, горіхи й солодощі, а не делікатні свіжі сири чи м'ясні продукти.",
          ),
        ],
        relatedPlaceIds: ["halles-du-marche", "maison-herbin-menton", "rue-saint-michel-menton"],
      },
    ],
    practicalTips: [
      t("Arrive before 10:00 for better choice and a calmer visit.", "Arrivez avant 10h00 pour plus de choix et une visite plus calme.", "Arriva prima delle 10:00 per piu scelta e una visita piu calma.", "Приходьте до 10:00 для кращого вибору й спокійнішого візиту."),
      t("Check current hours before visiting.", "Verifiez les horaires actuels avant de venir.", "Controlla gli orari aggiornati prima della visita.", "Перед візитом перевірте актуальні години роботи."),
      t("Bring a reusable bag for picnic and apartment ingredients.", "Prenez un sac reutilisable pour le pique-nique et les achats a l'appartement.", "Porta una borsa riutilizzabile per picnic e spesa da appartamento.", "Візьміть багаторазову сумку для пікніка й продуктів в апартаменти."),
    ],
    relatedPlaces: ["halles-du-marche", "chez-mimi-menton", "rue-saint-michel-menton", "maison-herbin-menton", "rampes-saint-michel", "plage-sablettes"],
    relatedArticles: ["best-souvenir-shops-menton-monaco-nice", "wine-tasting-near-menton", "supermarkets-in-menton", "local-food-menton", "menton-one-day-itinerary", "quiet-evening-in-menton"],
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
    coverImage: "/images/guide/bars-and-beer-in-menton.jpg",
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
  appTools?: GuideAppTool[];
  sourceStatus?: SourceStatus;
  coverImage?: string;
  coverImageAlt?: LocalizedText;
  utilityBlocks?: GuideUtilityBlock[];
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
    id: "menton-in-autumn",
    slug: "menton-in-autumn",
    title: t("Menton in autumn: October and November on the Riviera", "Menton en automne: octobre et novembre sur la Riviera", "Mentone in autunno: ottobre e novembre in Riviera", "Ментон восени: жовтень і листопад на Рив'єрі"),
    seoTitle: t("Menton in Autumn: October and November Travel Guide", "Menton en automne: guide d'octobre et novembre", "Mentone in autunno: guida a ottobre e novembre", "Ментон восени: гід на жовтень і листопад"),
    seoDescription: t("Why October and November are a smart time to visit Menton: mild weather, quiet beaches, gardens, Riviera events and day trips from a seaside apartment.", "Pourquoi octobre et novembre sont parfaits pour Menton: douceur, plages calmes, jardins, evenements Riviera et excursions depuis un appartement en bord de mer.", "Perche ottobre e novembre sono ideali a Mentone: clima mite, spiagge tranquille, giardini, eventi in Riviera e gite da un appartamento sul mare.", "Чому жовтень і листопад добре підходять для Ментона: м'яка погода, тихі пляжі, сади, події Рив'єри й поїздки з апартаментів біля моря."),
    excerpt: t("October and November bring mild days, quieter streets, autumn gardens, beach walks and easy access to Riviera events from Menton.", "Octobre et novembre apportent douceur, rues plus calmes, jardins d'automne, promenades en bord de mer et evenements Riviera faciles depuis Menton.", "Ottobre e novembre portano giornate miti, strade piu tranquille, giardini autunnali, passeggiate sul mare ed eventi in Riviera da Mentone.", "Жовтень і листопад приносять м'які дні, тихіші вулиці, осінні сади, прогулянки біля моря й легкий доступ до подій Рив'єри з Ментона."),
    category: "practical",
    coverImage: "/images/guide/menton-in-autumn.jpg",
    coverImageAlt: t("Autumn view over Menton and the Mediterranean", "Vue d'automne sur Menton et la Mediterranee", "Vista autunnale su Mentone e il Mediterraneo", "Осінній краєвид Ментона й Середземного моря"),
    visualTheme: "itinerary",
    visualStatus: "project_illustration",
    tags: [t("autumn", "automne", "autunno", "осінь"), t("October", "octobre", "ottobre", "жовтень"), t("November", "novembre", "novembre", "листопад"), t("Riviera events", "evenements Riviera", "eventi in Riviera", "події Рив'єри")],
    bestFor: [guideBestForOptions[0].label, guideBestForOptions[3].label, guideBestForOptions[4].label],
    duration: "2-3 days",
    locationTags: ["menton-centre", "seafront", "monaco", "nice", "italian-riviera"],
    featured: true,
    sourceStatus: "editorial",
    relatedPlaces: ["jardin-val-rahmeh", "jardin-serre-de-la-madone", "promenade-du-soleil", "plage-sablettes", "monaco-monte-carlo", "nice-old-town"],
    relatedArticles: ["mountains-snow-skiing-near-menton", "fete-du-citron-menton-practical-guide", "best-beaches-in-menton", "best-walks-and-hikes-around-menton", "museums-in-menton-nice-monaco", "day-trips-from-menton", "public-transport-in-menton", "menton-without-a-car", "menton-old-town", "where-to-stay-in-menton"],
    relatedEvents: ["monte-carlo-jazz-festival", "nice-cannes-marathon", "mipcom-cannes", "mapic-cannes", "igtm-cannes", "maredimoda-cannes"],
    relatedApartments: seaViewApartments,
    sections: [
      {
        heading: t("Why autumn works so well in Menton", "Pourquoi l'automne fonctionne si bien a Menton", "Perche l'autunno funziona cosi bene a Mentone", "Чому осінь так добре працює в Ментоні"),
        body: [
          t("Most visitors connect Menton with summer beaches, lemon trees and long Mediterranean days. Locals often enjoy a different rhythm: October and November, when the town is still bright but the streets, restaurants and seafront feel calmer.", "La plupart des visiteurs associent Menton aux plages d'ete, aux citronniers et aux longues journees mediterraneennes. Les habitants apprecient souvent un autre rythme: octobre et novembre, quand la ville reste lumineuse mais que rues, restaurants et front de mer sont plus calmes.", "Molti visitatori associano Mentone alle spiagge estive, ai limoni e alle lunghe giornate mediterranee. Chi vive qui spesso apprezza un ritmo diverso: ottobre e novembre, quando la citta resta luminosa ma strade, ristoranti e lungomare sono piu tranquilli.", "Більшість гостей пов'язують Ментон із літніми пляжами, лимонами й довгими середземноморськими днями. Місцеві часто цінують інший ритм: жовтень і листопад, коли місто ще світле, але вулиці, ресторани й набережна спокійніші."),
          t("For travellers who want sunshine, culture and a more local atmosphere, autumn is one of the best-kept secrets on the Cote d'Azur.", "Pour les voyageurs qui cherchent soleil, culture et ambiance plus locale, l'automne est l'un des secrets les mieux gardes de la Cote d'Azur.", "Per chi cerca sole, cultura e un'atmosfera piu locale, l'autunno e uno dei segreti meglio custoditi della Costa Azzurra.", "Для мандрівників, які хочуть сонця, культури й більш локальної атмосфери, осінь - один із найкращих секретів Лазурного узбережжя."),
        ],
      },
      {
        heading: t("Weather in October and November", "Meteo en octobre et novembre", "Meteo a ottobre e novembre", "Погода в жовтні та листопаді"),
        body: [
          t("October days in Menton often sit around 18-24C, while November usually remains around 14-20C. The sea keeps warmth from summer, sunny spells are common, and outdoor cafes or day trips still feel natural.", "En octobre, les journees a Menton tournent souvent autour de 18-24C, tandis que novembre reste souvent autour de 14-20C. La mer garde la chaleur de l'ete, les eclaircies restent frequentes et les cafes en terrasse ou excursions restent naturels.", "A ottobre le giornate a Mentone sono spesso intorno a 18-24C, mentre novembre resta di solito intorno a 14-20C. Il mare conserva il calore estivo, il sole e ancora frequente e cafe all'aperto o gite restano piacevoli.", "У жовтні денна температура в Ментоні часто близько 18-24C, а в листопаді зазвичай близько 14-20C. Море зберігає літнє тепло, сонячні періоди часті, а кав'ярні надворі й поїздки все ще природні."),
          t("You may not swim every day, but Menton rarely feels truly cold before winter. Pack layers for evenings and keep plans flexible around rain.", "Vous ne nagerez peut-etre pas tous les jours, mais Menton semble rarement vraiment froid avant l'hiver. Prevoyez des couches pour le soir et gardez vos plans flexibles en cas de pluie.", "Forse non nuoterai ogni giorno, ma Mentone raramente sembra davvero fredda prima dell'inverno. Porta strati per la sera e mantieni i programmi flessibili se piove.", "Можливо, ви не плаватимете щодня, але Ментон рідко здається справді холодним до зими. Візьміть шари одягу на вечір і залишайте плани гнучкими на випадок дощу."),
        ],
      },
      {
        heading: t("Gardens in softer autumn light", "Jardins dans la lumiere douce d'automne", "Giardini nella luce morbida d'autunno", "Сади в м'якому осінньому світлі"),
        body: [
          t("Menton's subtropical gardens stay interesting year-round, but autumn makes them easier to enjoy. Softer light, fewer visitors and mild temperatures suit Jardin Botanique Val Rahmeh and Jardin Serre de la Madone especially well.", "Les jardins subtropicaux de Menton restent interessants toute l'annee, mais l'automne les rend plus faciles a apprecier. Lumiere plus douce, moins de visiteurs et temperatures agreables conviennent tres bien au Jardin Botanique Val Rahmeh et au Jardin Serre de la Madone.", "I giardini subtropicali di Mentone sono interessanti tutto l'anno, ma l'autunno li rende piu facili da vivere. Luce piu morbida, meno visitatori e temperature miti funzionano molto bene per Jardin Botanique Val Rahmeh e Jardin Serre de la Madone.", "Субтропічні сади Ментона цікаві цілий рік, але восени їх легше відчути. М'якше світло, менше відвідувачів і комфортна температура особливо пасують Jardin Botanique Val Rahmeh та Jardin Serre de la Madone."),
        ],
        relatedPlaceIds: ["jardin-val-rahmeh", "jardin-serre-de-la-madone"],
      },
      {
        heading: t("Beaches without the summer crowds", "Plages sans la foule d'ete", "Spiagge senza folla estiva", "Пляжі без літніх натовпів"),
        body: [
          t("Autumn gives the coastline back to walkers. Promenade du Soleil becomes quieter, Plage des Sablettes is easier to enjoy, and sunrise or sunset photography often feels better than in peak summer.", "L'automne rend le littoral aux marcheurs. La Promenade du Soleil devient plus calme, la Plage des Sablettes est plus facile a apprecier et les photos au lever ou coucher du soleil sont souvent plus agreables qu'en plein ete.", "L'autunno restituisce la costa a chi cammina. La Promenade du Soleil diventa piu tranquilla, Plage des Sablettes e piu facile da godere e le foto all'alba o al tramonto sono spesso migliori che in piena estate.", "Восени узбережжя повертається до прогулянок. Promenade du Soleil стає тихішою, Plage des Sablettes легше відчути, а фото на світанку чи заході сонця часто кращі, ніж у пік літа."),
          t("Even when swimming is not the goal, the seafront works for morning walks, benches by the water, cafes, cycling and slow evenings.", "Meme si la baignade n'est pas l'objectif, le front de mer fonctionne pour les promenades du matin, les bancs face a l'eau, les cafes, le velo et les soirees lentes.", "Anche quando il bagno non e l'obiettivo, il lungomare funziona per passeggiate al mattino, panchine sull'acqua, cafe, bici e serate lente.", "Навіть якщо плавання не головна мета, набережна працює для ранкових прогулянок, лавок біля води, кафе, велосипедів і повільних вечорів."),
        ],
        relatedPlaceIds: ["promenade-du-soleil", "plage-sablettes", "plage-fossan"],
      },
      {
        heading: t("Autumn events from a Menton base", "Evenements d'automne depuis Menton", "Eventi d'autunno da una base a Mentone", "Осінні події з базою в Ментоні"),
        body: [
          t("Menton sits between Monaco, Nice, Cannes and the Italian Riviera, so October and November can combine a quiet seaside stay with major events. Monte-Carlo Jazz Festival, the Nice-Cannes Marathon and Cannes business fairs such as MIPCOM, MAPIC, IGTM and MarediModa are all realistic from a Menton base if you plan transport.", "Menton se situe entre Monaco, Nice, Cannes et la Riviera italienne: octobre et novembre peuvent donc combiner sejour calme en bord de mer et grands evenements. Monte-Carlo Jazz Festival, Marathon Nice-Cannes et salons cannois comme MIPCOM, MAPIC, IGTM et MarediModa restent realistes depuis Menton si vous planifiez le transport.", "Mentone si trova tra Monaco, Nizza, Cannes e Riviera italiana: ottobre e novembre possono quindi unire soggiorno tranquillo sul mare e grandi eventi. Monte-Carlo Jazz Festival, Marathon Nice-Cannes e fiere di Cannes come MIPCOM, MAPIC, IGTM e MarediModa sono realistici da Mentone se pianifichi i trasporti.", "Ментон розташований між Монако, Ніццою, Каннами та Італійською Рив'єрою, тому жовтень і листопад можуть поєднати тихий морський відпочинок із великими подіями. Monte-Carlo Jazz Festival, Marathon Nice-Cannes і каннські виставки MIPCOM, MAPIC, IGTM та MarediModa реалістичні з базою в Ментоні, якщо спланувати транспорт."),
        ],
        relatedEventIds: ["monte-carlo-jazz-festival", "nice-cannes-marathon", "mipcom-cannes", "mapic-cannes", "igtm-cannes", "maredimoda-cannes"],
      },
      {
        heading: t("Day trips at a slower pace", "Excursions a un rythme plus lent", "Gite a ritmo piu lento", "Поїздки в повільнішому ритмі"),
        body: [
          t("Summer can make day trips feel rushed. In autumn, trains are usually calmer and places such as Monaco and Monte-Carlo, Nice Old Town, Villefranche-sur-Mer, Eze Village, Ventimiglia and Sanremo are easier to enjoy.", "L'ete peut rendre les excursions pressees. En automne, les trains sont souvent plus calmes et Monaco-Monte-Carlo, le Vieux Nice, Villefranche-sur-Mer, Eze Village, Vintimille et Sanremo se visitent plus facilement.", "L'estate puo rendere le gite affrettate. In autunno i treni sono spesso piu tranquilli e Monaco-Monte-Carlo, Vieux Nice, Villefranche-sur-Mer, Eze Village, Ventimiglia e Sanremo sono piu facili da godere.", "Влітку поїздки на день можуть здаватися поспішними. Восени потяги зазвичай спокійніші, а Monaco-Monte-Carlo, Nice Old Town, Villefranche-sur-Mer, Eze Village, Ventimiglia та Sanremo легше відчути."),
        ],
        relatedPlaceIds: ["monaco-monte-carlo", "nice-old-town", "villefranche-sur-mer", "eze-village", "ventimiglia", "sanremo"],
      },
      {
        heading: t("Why stay in an apartment in autumn", "Pourquoi choisir un appartement en automne", "Perche scegliere un appartamento in autunno", "Чому восени варто жити в апартаментах"),
        body: [
          t("Autumn rewards a slower base: breakfast at home, flexible evenings, sea views when the weather changes and easier value than peak season. A central apartment lets you use sunny days for gardens and trips, then return to Menton for a quiet dinner by the water.", "L'automne recompense une base plus lente: petit-dejeuner a la maison, soirees flexibles, vue mer quand la meteo change et meilleur rapport qualite-prix qu'en haute saison. Un appartement central permet d'utiliser les jours de soleil pour jardins et excursions, puis de rentrer diner calmement au bord de l'eau.", "L'autunno premia una base piu lenta: colazione a casa, serate flessibili, vista mare quando il tempo cambia e valore migliore rispetto all'alta stagione. Un appartamento centrale permette di usare i giorni di sole per giardini e gite, poi tornare a Mentone per una cena tranquilla sull'acqua.", "Осінь винагороджує повільну базу: сніданок удома, гнучкі вечори, вид на море, коли погода змінюється, і кращу цінність, ніж у пік сезону. Центральні апартаменти дозволяють використовувати сонячні дні для садів і поїздок, а потім повертатися в Ментон на тиху вечерю біля води."),
        ],
        relatedApartmentKeys: seaViewApartments,
      },
    ],
    practicalTips: [
      t("Pack light layers: days can be warm, evenings cooler.", "Prevoyez des couches legeres: les journees peuvent etre douces, les soirees plus fraiches.", "Porta strati leggeri: le giornate possono essere miti, le sere piu fresche.", "Візьміть легкі шари: вдень може бути тепло, ввечері прохолодніше."),
      t("Check train times before Monaco, Nice, Cannes or Italy plans.", "Verifiez les horaires de train avant Monaco, Nice, Cannes ou l'Italie.", "Controlla i treni prima di programmare Monaco, Nizza, Cannes o Italia.", "Перевіряйте розклад потягів перед планами на Монако, Ніццу, Канни чи Італію."),
      t("Book earlier around major Monaco and Cannes event dates.", "Reservez plus tot autour des grands evenements a Monaco et Cannes.", "Prenota prima intorno ai grandi eventi di Monaco e Cannes.", "Бронюйте раніше навколо великих дат подій у Монако та Каннах."),
    ],
  }),
  shortArticle({
    id: "best-walks-and-hikes-around-menton",
    slug: "best-walks-and-hikes-around-menton",
    title: t("The best walks and hikes around Menton", "Les meilleures balades et randonnees autour de Menton", "Le migliori passeggiate ed escursioni intorno a Mentone", "Найкращі прогулянки й походи навколо Ментона"),
    seoTitle: t("Best Walks and Hikes Around Menton | Coastal Trails", "Meilleures balades et randonnees autour de Menton", "Migliori passeggiate ed escursioni intorno a Mentone", "Найкращі прогулянки й походи навколо Ментона"),
    seoDescription: t("A practical guide to Menton's best coastal walks and hikes: Sentier des Douaniers, Cap Martin, Mont Gros and Roquebrune medieval village, with car-free tips.", "Guide pratique des meilleures balades et randonnees autour de Menton: Sentier des Douaniers, Cap Martin, Mont Gros, Roquebrune medieval et conseils sans voiture.", "Guida pratica alle migliori passeggiate ed escursioni intorno a Mentone: Sentier des Douaniers, Cap Martin, Mont Gros, borgo medievale di Roquebrune e consigli senza auto.", "Практичний гід найкращими прогулянками й походами навколо Ментона: Sentier des Douaniers, Cap Martin, Mont Gros, середньовічний Roquebrune і поради без авто."),
    excerpt: t("Menton is a strong hiking base: coastal paths, olive groves, pine slopes and panoramic viewpoints begin close to the seafront.", "Menton est une excellente base de marche: sentiers cotiers, oliveraies, pentes de pins et panoramas commencent pres du front de mer.", "Mentone e un'ottima base per camminare: sentieri costieri, uliveti, pendii di pini e panorami partono vicino al lungomare.", "Ментон - сильна база для піших маршрутів: прибережні стежки, оливкові гаї, соснові схили й панорами починаються поруч із морем."),
    category: "walks-views",
    coverImage: "/images/guide/best-walks-and-hikes-around-menton.jpg",
    coverImageAlt: t("Illustration of coastal walks and hikes around Menton", "Illustration des balades et randonnees autour de Menton", "Illustrazione di passeggiate ed escursioni intorno a Mentone", "Ілюстрація прогулянок і походів навколо Ментона"),
    visualTheme: "walk",
    visualStatus: "project_illustration",
    tags: [t("hiking", "randonnee", "escursionismo", "походи"), t("coastal walks", "balades cotieres", "passeggiate costiere", "прибережні прогулянки"), t("views", "vues", "viste", "краєвиди"), t("without a car", "sans voiture", "senza auto", "без авто")],
    bestFor: [guideBestForOptions[0].label, guideBestForOptions[3].label, guideBestForOptions[4].label, guideBestForOptions[7].label],
    duration: "half-day",
    locationTags: ["menton-centre", "seafront", "garavan", "monaco"],
    sourceStatus: "editorial",
    relatedPlaces: ["sentier-douaniers-menton", "roquebrune-cap-martin-coastal-walk", "mont-gros-viewpoint", "roquebrune-medieval-village", "promenade-du-soleil", "port-de-garavan"],
    relatedArticles: ["cycling-bike-rental-menton", "mountains-snow-skiing-near-menton", "menton-without-a-car", "public-transport-in-menton", "best-photo-spots-menton", "menton-in-autumn", "day-trips-from-menton"],
    relatedApartments: allApartments,
    sections: [
      {
        heading: t("Menton as a hiking base", "Menton comme base de randonnee", "Mentone come base per camminare", "Ментон як база для походів"),
        body: [
          t("Most visitors come for beaches and the colourful old town, then discover that Menton is also one of the Riviera's most convenient walking bases. Within minutes of the seafront, routes climb into olive groves, pine slopes, cliffs and viewpoints over France, Monaco and Italy.", "La plupart des visiteurs viennent pour les plages et la vieille ville coloree, puis decouvrent que Menton est aussi l'une des bases les plus pratiques pour marcher sur la Riviera. En quelques minutes depuis le front de mer, les itineraires montent vers oliveraies, pins, falaises et vues sur France, Monaco et Italie.", "Molti visitatori arrivano per spiagge e centro storico colorato, poi scoprono che Mentone e anche una delle basi piu comode per camminare in Riviera. In pochi minuti dal lungomare, i percorsi salgono tra ulivi, pini, scogliere e viste su Francia, Monaco e Italia.", "Більшість гостей приїздить за пляжами й кольоровим старим містом, а потім відкриває, що Ментон ще й одна з найзручніших баз для прогулянок на Рив'єрі. За кілька хвилин від моря маршрути піднімаються до оливкових гаїв, соснових схилів, скель і видів на Францію, Монако та Італію."),
        ],
      },
      {
        heading: t("Sentier des Douaniers: the coastal border walk", "Sentier des Douaniers: balade cotiere vers la frontiere", "Sentier des Douaniers: passeggiata costiera verso il confine", "Sentier des Douaniers: прибережна стежка до кордону"),
        body: [
          t("Difficulty: easy. Duration: 1-2 hours. Start from Garavan for a scenic customs officers' path near the Italian border, with constant Mediterranean views, rocky coves and quieter sections away from traffic.", "Difficulte: facile. Duree: 1-2 heures. Partez de Garavan pour suivre l'ancien sentier des douaniers pres de la frontiere italienne, avec vues mediterraneennes, criques rocheuses et sections calmes loin du trafic.", "Difficolta: facile. Durata: 1-2 ore. Parti da Garavan per seguire l'antico sentiero dei doganieri vicino al confine italiano, con viste sul Mediterraneo, calette rocciose e tratti tranquilli lontani dal traffico.", "Складність: легко. Тривалість: 1-2 години. Починайте з Garavan і йдіть колишньою стежкою митників біля італійського кордону: море, скелясті бухти й тихі ділянки без трафіку."),
          t("This is the best first route if you want strong scenery without a hard climb.", "C'est le meilleur premier itineraire si vous voulez de beaux paysages sans montee difficile.", "E il miglior primo percorso se vuoi paesaggi forti senza una salita dura.", "Це найкращий перший маршрут, якщо хочеться сильних краєвидів без важкого підйому."),
        ],
        relatedPlaceIds: ["sentier-douaniers-menton", "port-de-garavan"],
      },
      {
        heading: t("Roquebrune-Cap-Martin coastal walk", "Balade cotiere de Roquebrune-Cap-Martin", "Passeggiata costiera di Roquebrune-Cap-Martin", "Прибережна прогулянка Roquebrune-Cap-Martin"),
        body: [
          t("Difficulty: easy to moderate. Duration: 2-3 hours. The route between Menton and Roquebrune-Cap-Martin combines beaches, sea cliffs, pine trees, historic villas and classic Cap Martin viewpoints.", "Difficulte: facile a moderee. Duree: 2-3 heures. L'itineraire entre Menton et Roquebrune-Cap-Martin combine plages, falaises, pins, villas historiques et vues classiques du Cap Martin.", "Difficolta: facile-moderata. Durata: 2-3 ore. Il percorso tra Mentone e Roquebrune-Cap-Martin unisce spiagge, scogliere, pini, ville storiche e viste classiche di Cap Martin.", "Складність: легко-помірно. Тривалість: 2-3 години. Маршрут між Ментоном і Roquebrune-Cap-Martin поєднує пляжі, морські скелі, сосни, історичні вілли й класичні види Cap Martin."),
          t("You can walk out and back, or use Roquebrune-Cap-Martin station for an easier return.", "Vous pouvez faire l'aller-retour a pied ou utiliser la gare de Roquebrune-Cap-Martin pour un retour plus simple.", "Puoi fare andata e ritorno a piedi oppure usare la stazione di Roquebrune-Cap-Martin per rientrare piu facilmente.", "Можна пройти туди й назад або скористатися станцією Roquebrune-Cap-Martin для простішого повернення."),
        ],
        relatedPlaceIds: ["roquebrune-cap-martin-coastal-walk", "borrigo-beaches", "promenade-du-soleil"],
      },
      {
        heading: t("Mont Gros for panoramic views", "Mont Gros pour les panoramas", "Mont Gros per i panorami", "Mont Gros для панорам"),
        body: [
          t("Difficulty: moderate. Duration: 3-4 hours. Mont Gros is one of the most rewarding options close to town if you want elevation. The climb moves through quieter slopes and viewpoints above Menton.", "Difficulte: moderee. Duree: 3-4 heures. Mont Gros est l'une des options les plus gratifiantes pres de la ville si vous cherchez du denivele. La montee traverse des pentes plus calmes et des points de vue au-dessus de Menton.", "Difficolta: moderata. Durata: 3-4 ore. Mont Gros e una delle opzioni piu gratificanti vicino alla citta se cerchi dislivello. La salita passa per pendii tranquilli e punti panoramici sopra Mentone.", "Складність: помірно. Тривалість: 3-4 години. Mont Gros - один із найвдячніших варіантів поруч із містом, якщо хочеться висоти. Підйом проходить тихішими схилами й оглядовими точками над Ментоном."),
          t("On clear days the view can include Menton Old Town, Monaco, Cap Martin, the Italian Riviera and the mountains behind the coast.", "Par temps clair, la vue peut inclure la vieille ville de Menton, Monaco, Cap Martin, la Riviera italienne et les montagnes derriere la cote.", "Nelle giornate limpide puoi vedere il centro storico di Mentone, Monaco, Cap Martin, Riviera italiana e montagne dietro la costa.", "У ясні дні видно старе місто Ментона, Монако, Cap Martin, Італійську Рив'єру й гори за узбережжям."),
        ],
        relatedPlaceIds: ["mont-gros-viewpoint", "cimetiere-vieux-chateau"],
      },
      {
        heading: t("Roquebrune medieval village walk", "Montee vers le village medieval de Roquebrune", "Salita al borgo medievale di Roquebrune", "Прогулянка до середньовічного Roquebrune"),
        body: [
          t("Difficulty: moderate. Duration: 2-4 hours. This walk climbs from the coast towards the medieval village of Roquebrune, passing olive trees, stone paths and viewpoints before reaching narrow streets, cafes and the historic castle area.", "Difficulte: moderee. Duree: 2-4 heures. Cette balade monte depuis la cote vers le village medieval de Roquebrune, entre oliviers, chemins de pierre et points de vue avant les ruelles, cafes et le secteur du chateau.", "Difficolta: moderata. Durata: 2-4 ore. Questa passeggiata sale dalla costa al borgo medievale di Roquebrune, tra ulivi, sentieri in pietra e punti panoramici prima di arrivare a vicoli, cafe e zona del castello.", "Складність: помірно. Тривалість: 2-4 години. Ця прогулянка піднімається від узбережжя до середньовічного Roquebrune через оливи, кам'яні стежки й оглядові точки до вузьких вулиць, кафе й району замку."),
        ],
        relatedPlaceIds: ["roquebrune-medieval-village", "roquebrune-cap-martin-coastal-walk"],
      },
      {
        heading: t("Walking without a car", "Marcher sans voiture", "Camminare senza auto", "Пішки без авто"),
        body: [
          t("Several routes can begin directly from Menton Old Town, Garavan, Promenade du Soleil or the train station. For farther walks, trains make Roquebrune-Cap-Martin, Monaco, Eze and Villefranche-sur-Mer practical without driving.", "Plusieurs itineraires peuvent commencer directement depuis la vieille ville, Garavan, la Promenade du Soleil ou la gare. Pour les balades plus loin, le train rend Roquebrune-Cap-Martin, Monaco, Eze et Villefranche-sur-Mer pratiques sans voiture.", "Diversi percorsi possono iniziare direttamente da centro storico, Garavan, Promenade du Soleil o stazione. Per camminate piu lontane, il treno rende pratici Roquebrune-Cap-Martin, Monaco, Eze e Villefranche-sur-Mer senza auto.", "Кілька маршрутів можна почати прямо зі старого міста, Garavan, Promenade du Soleil або вокзалу. Для дальших прогулянок потяг робить Roquebrune-Cap-Martin, Монако, Eze та Villefranche-sur-Mer практичними без авто."),
        ],
        relatedPlaceIds: ["promenade-du-soleil", "monaco-monte-carlo", "eze-village", "villefranche-sur-mer"],
      },
      {
        heading: t("What to bring and when to go", "Que prendre et quand partir", "Cosa portare e quando andare", "Що взяти й коли йти"),
        body: [
          t("Even short Mediterranean walks need preparation: comfortable shoes, water, sun protection, a light windproof layer, offline maps and enough phone battery. In summer, start early or late; for the best hiking conditions, spring and autumn are usually stronger than peak heat.", "Meme les courtes balades mediterraneennes demandent un minimum: bonnes chaussures, eau, protection solaire, couche coupe-vent legere, cartes hors ligne et batterie suffisante. En ete, partez tot ou tard; pour les meilleures conditions, printemps et automne sont souvent meilleurs que la pleine chaleur.", "Anche le brevi passeggiate mediterranee richiedono preparazione: scarpe comode, acqua, protezione solare, strato antivento leggero, mappe offline e batteria sufficiente. In estate parti presto o tardi; primavera e autunno sono spesso migliori del pieno caldo.", "Навіть короткі середземноморські прогулянки потребують підготовки: зручне взуття, вода, захист від сонця, легкий вітрозахисний шар, офлайн-мапи й достатній заряд телефона. Влітку виходьте рано або пізно; найкращі умови часто навесні й восени."),
        ],
      },
    ],
    practicalTips: [
      t("Check route conditions before committing to cliff or mountain paths.", "Verifiez l'etat des sentiers avant les chemins de falaise ou de montagne.", "Controlla le condizioni dei sentieri prima di percorsi su scogliere o montagna.", "Перевіряйте стан маршрутів перед скелями або гірськими стежками."),
      t("Carry water even on easy coastal walks.", "Prenez de l'eau meme pour les balades cotieres faciles.", "Porta acqua anche sulle passeggiate costiere facili.", "Беріть воду навіть на легкі прибережні прогулянки."),
      t("Use trains for one-way routes back to Menton.", "Utilisez le train pour revenir a Menton apres un itineraire en aller simple.", "Usa il treno per rientrare a Mentone sui percorsi a senso unico.", "Використовуйте потяги для повернення до Ментона після маршрутів в один бік."),
    ],
  }),
  shortArticle({
    id: "italian-riviera-day-trip-from-menton",
    slug: "italian-riviera-day-trip-from-menton",
    title: t("Ventimiglia and Bordighera: a day in Italy from Menton", "Vintimille et Bordighera: une journee en Italie depuis Menton", "Ventimiglia e Bordighera: una giornata in Italia da Mentone", "Вентімілья й Бордігера: день в Італії з Ментона"),
    seoTitle: t("Italian Riviera Day Trip from Menton | Ventimiglia & Bordighera", "Excursion en Italie depuis Menton | Vintimille & Bordighera", "Gita in Italia da Mentone | Ventimiglia e Bordighera", "Поїздка в Італію з Ментона | Вентімілья й Бордігера"),
    seoDescription: t("Plan an easy Italian Riviera day trip from Menton by train: Ventimiglia markets and old town, Bordighera promenade, Sanremo option and practical tips.", "Preparez une excursion facile en Italie depuis Menton en train: marches et vieille ville de Vintimille, promenade de Bordighera, option Sanremo et conseils pratiques.", "Organizza una facile gita in Riviera italiana da Mentone in treno: mercati e centro storico di Ventimiglia, lungomare di Bordighera, opzione Sanremo e consigli pratici.", "Сплануйте легку поїздку Італійською Рив'єрою з Ментона потягом: ринки й старе місто Вентімільї, набережна Бордігери, варіант Санремо й практичні поради."),
    excerpt: t("Italy is one train stop from Menton: spend the morning in France, have lunch in Ventimiglia or Bordighera and return before sunset.", "L'Italie est a un arret de train de Menton: matin en France, dejeuner a Vintimille ou Bordighera, retour avant le coucher du soleil.", "L'Italia e a una fermata di treno da Mentone: mattina in Francia, pranzo a Ventimiglia o Bordighera e ritorno prima del tramonto.", "Італія за одну зупинку потягом від Ментона: ранок у Франції, обід у Вентімільї або Бордігері й повернення до заходу сонця."),
    category: "day-trips",
    coverImage: "/images/guide/italian-riviera-day-trip-from-menton.jpg",
    coverImageAlt: t("Illustration of Ventimiglia and Bordighera day trip from Menton", "Illustration d'une excursion a Vintimille et Bordighera depuis Menton", "Illustrazione di una gita a Ventimiglia e Bordighera da Mentone", "Ілюстрація поїздки до Вентімільї й Бордігери з Ментона"),
    visualTheme: "itinerary",
    visualStatus: "project_illustration",
    tags: [t("Italy", "Italie", "Italia", "Італія"), t("Ventimiglia", "Vintimille", "Ventimiglia", "Вентімілья"), t("Bordighera", "Bordighera", "Bordighera", "Бордігера"), t("train day trip", "excursion en train", "gita in treno", "поїздка потягом")],
    bestFor: [guideBestForOptions[2].label, guideBestForOptions[3].label, guideBestForOptions[4].label, guideBestForOptions[0].label],
    duration: "full-day",
    locationTags: ["italian-riviera", "menton-centre", "seafront"],
    sourceStatus: "editorial",
    relatedPlaces: [
      "ventimiglia",
      "bordighera",
      "sanremo",
      "dolceacqua",
      "conad-city-ventimiglia-carso",
      "conad-city-ventimiglia-corso-nizza",
      "conad-superstore-vallecrosia",
      "conad-city-bordighera",
      "conad-city-sanremo",
      "casa-del-grillo",
      "terre-bianche-dolceacqua",
      "altavia-winery",
      "promenade-du-soleil",
    ],
    relatedArticles: ["cycling-bike-rental-menton", "mountains-snow-skiing-near-menton", "theatre-opera-performing-arts-near-menton", "wine-tasting-near-menton", "golf-near-menton", "supermarkets-in-menton", "day-trips-from-menton", "public-transport-in-menton", "menton-without-a-car", "menton-in-autumn"],
    relatedApartments: allApartments,
    sections: [
      {
        heading: t("Italy is one train stop away", "L'Italie est a un arret de train", "L'Italia e a una fermata di treno", "Італія за одну зупинку потягом"),
        body: [
          t("One of Menton's biggest advantages is easy access to Italy. While many Riviera plans focus on Monaco, Nice or Cannes, Menton lets you spend the morning in France, have lunch in Italy and return to your apartment before sunset.", "L'un des grands avantages de Menton est l'acces facile a l'Italie. Beaucoup d'itineraires Riviera regardent Monaco, Nice ou Cannes, mais Menton permet de passer la matinee en France, de dejeuner en Italie et de rentrer a l'appartement avant le coucher du soleil.", "Uno dei grandi vantaggi di Mentone e l'accesso facile all'Italia. Molti itinerari in Riviera guardano a Monaco, Nizza o Cannes, ma Mentone permette di passare la mattina in Francia, pranzare in Italia e tornare in appartamento prima del tramonto.", "Одна з головних переваг Ментона - легкий доступ до Італії. Багато планів на Рив'єрі дивляться на Монако, Ніццу чи Канни, але Ментон дозволяє провести ранок у Франції, пообідати в Італії й повернутися в апартаменти до заходу сонця."),
          t("For food lovers, market visitors and travellers looking for a more local Mediterranean mood, Ventimiglia, Bordighera and Sanremo make some of the most memorable day trips from Menton.", "Pour les amateurs de cuisine, de marches et d'ambiance mediterraneenne plus locale, Vintimille, Bordighera et Sanremo offrent des excursions tres memorables depuis Menton.", "Per chi ama cibo, mercati e un'atmosfera mediterranea piu locale, Ventimiglia, Bordighera e Sanremo sono tra le gite piu memorabili da Mentone.", "Для любителів їжі, ринків і більш локального середземноморського настрою Вентімілья, Бордігера й Санремо - одні з найпам'ятніших поїздок із Ментона."),
        ],
      },
      {
        heading: t("How to get to Italy from Menton", "Comment aller en Italie depuis Menton", "Come andare in Italia da Mentone", "Як дістатися до Італії з Ментона"),
        body: [
          t("Regional trains run from Menton station along the Italian Riviera. Typical journey times are short: around 10 minutes to Ventimiglia, around 20 minutes to Bordighera and around 35-40 minutes to Sanremo, depending on the service.", "Des trains regionaux partent de la gare de Menton vers la Riviera italienne. Les temps de trajet sont courts: environ 10 minutes pour Vintimille, 20 minutes pour Bordighera et 35-40 minutes pour Sanremo selon le service.", "I treni regionali partono dalla stazione di Mentone verso la Riviera italiana. I tempi sono brevi: circa 10 minuti per Ventimiglia, 20 minuti per Bordighera e 35-40 minuti per Sanremo secondo il servizio.", "Регіональні потяги йдуть зі станції Ментона вздовж Італійської Рив'єри. Час у дорозі короткий: близько 10 хвилин до Вентімільї, 20 хвилин до Бордігери й 35-40 хвилин до Санремо залежно від рейсу."),
          t("Tickets are usually available at the station or through SNCF and Trenitalia apps. Passport checks are not normally part of Schengen travel, but carrying identification is still recommended.", "Les billets s'achetent generalement en gare ou via les apps SNCF et Trenitalia. Les controles de passeport ne sont normalement pas prevus dans l'espace Schengen, mais il reste recommande d'avoir une piece d'identite.", "I biglietti si comprano di solito in stazione o tramite le app SNCF e Trenitalia. I controlli passaporto normalmente non fanno parte dei viaggi Schengen, ma e consigliato portare un documento.", "Квитки зазвичай можна купити на станції або через додатки SNCF і Trenitalia. Паспортних перевірок у Шенгені зазвичай немає, але документ варто мати з собою."),
        ],
      },
      {
        heading: t("Ventimiglia: markets, old streets and local food", "Vintimille: marches, vieille ville et cuisine locale", "Ventimiglia: mercati, centro storico e cucina locale", "Вентімілья: ринки, старі вулиці й локальна їжа"),
        body: [
          t("Ventimiglia is the first Italian town across the border. The atmosphere changes quickly: Italian cafes, bakeries, Ligurian food, different architecture and a more traditional market rhythm.", "Vintimille est la premiere ville italienne apres la frontiere. L'ambiance change vite: cafes italiens, boulangeries, cuisine ligure, architecture differente et rythme de marche plus traditionnel.", "Ventimiglia e la prima citta italiana oltre il confine. L'atmosfera cambia subito: cafe italiani, panetterie, cucina ligure, architettura diversa e ritmo di mercato piu tradizionale.", "Вентімілья - перше італійське місто за кордоном. Атмосфера швидко змінюється: італійські кафе, пекарні, лігурійська їжа, інша архітектура й більш традиційний ринковий ритм."),
          t("The Friday market is the busiest classic, with stalls for clothing, leather goods, food products, olive oil, cheeses and household goods. Ventimiglia Alta adds the old-town contrast: medieval lanes, stone buildings, the cathedral area and sea views.", "Le marche du vendredi est le grand classique, avec vetements, cuir, produits alimentaires, huile d'olive, fromages et objets du quotidien. Vintimille Alta ajoute le contraste historique: ruelles medievales, pierres, secteur de la cathedrale et vues mer.", "Il mercato del venerdi e il grande classico, con abbigliamento, pelle, prodotti alimentari, olio d'oliva, formaggi e articoli per la casa. Ventimiglia Alta aggiunge il contrasto storico: vicoli medievali, pietra, zona della cattedrale e viste mare.", "П'ятничний ринок - головна класика: одяг, шкіра, продукти, оливкова олія, сири й побутові речі. Ventimiglia Alta додає історичний контраст: середньовічні вулички, кам'яні будівлі, район собору й види на море."),
        ],
        relatedPlaceIds: ["ventimiglia", "conad-city-ventimiglia-carso", "conad-city-ventimiglia-corso-nizza"],
      },
      {
        heading: t("Bordighera: palms and seaside elegance", "Bordighera: palmiers et elegance en bord de mer", "Bordighera: palme ed eleganza sul mare", "Бордігера: пальми й морська елегантність"),
        body: [
          t("A short ride beyond Ventimiglia, Bordighera feels quieter and more local than many French Riviera resorts. Its palm-lined promenade, villas, beaches and sea views make it a good second stop after a market morning.", "A quelques minutes apres Vintimille, Bordighera semble plus calme et locale que beaucoup de stations de la Riviera francaise. Sa promenade bordee de palmiers, ses villas, plages et vues mer en font une bonne seconde halte apres une matinee de marche.", "Poco oltre Ventimiglia, Bordighera sembra piu tranquilla e locale di molte localita della Costa Azzurra. Il lungomare con palme, le ville, le spiagge e le viste mare la rendono una buona seconda tappa dopo una mattina al mercato.", "За кілька хвилин після Вентімільї Бордігера здається тихішою й локальнішою за багато курортів Французької Рив'єри. Пальмова набережна, вілли, пляжі й море роблять її доброю другою зупинкою після ринкового ранку."),
          t("The town also has an artistic association with Claude Monet, who painted Bordighera's gardens and coastal light. Even without a museum plan, the waterfront is strong for a slow walk, cafes and sunset photos.", "La ville est aussi liee a Claude Monet, qui a peint les jardins et la lumiere cotiere de Bordighera. Meme sans programme musee, le front de mer est parfait pour une balade lente, des cafes et des photos au coucher du soleil.", "La citta e legata anche a Claude Monet, che dipinse giardini e luce costiera di Bordighera. Anche senza programma museale, il lungomare e forte per una passeggiata lenta, cafe e foto al tramonto.", "Місто також пов'язане з Claude Monet, який писав сади й прибережне світло Бордігери. Навіть без музейного плану набережна добре працює для повільної прогулянки, кафе й фото на заході сонця."),
        ],
        relatedPlaceIds: ["bordighera", "conad-city-bordighera", "conad-superstore-vallecrosia"],
      },
      {
        heading: t("Continue to Sanremo if you have a full day", "Continuer vers Sanremo si vous avez la journee", "Prosegui verso Sanremo se hai tutta la giornata", "Продовжуйте до Санремо, якщо маєте повний день"),
        body: [
          t("Sanremo is larger and more energetic, known for flowers, shopping streets, the casino, beaches, restaurants and cafes. It works best when you want a fuller Italian Riviera day rather than a short border hop.", "Sanremo est plus grande et plus animee, connue pour les fleurs, les rues commerçantes, le casino, les plages, restaurants et cafes. Elle convient si vous voulez une vraie journee Riviera italienne plutot qu'un simple passage de frontiere.", "Sanremo e piu grande e vivace, nota per fiori, vie dello shopping, casino, spiagge, ristoranti e cafe. Funziona se vuoi una giornata piu completa in Riviera italiana invece di un breve salto oltre confine.", "Санремо більше й жвавіше: квіти, торгові вулиці, казино, пляжі, ресторани й кафе. Воно підходить, якщо хочеться повнішого дня на Італійській Рив'єрі, а не лише короткого перетину кордону."),
        ],
        relatedPlaceIds: ["sanremo", "conad-city-sanremo"],
      },
      {
        heading: t("Food shopping and Ligurian products to bring back", "Courses et produits ligures a rapporter", "Spesa e prodotti liguri da riportare", "Продукти й лігурійські покупки, які варто привезти"),
        body: [
          t("Since this trip starts so close to Menton, it also works as a practical food-shopping day. In Ventimiglia, Bordighera or Sanremo, look for Italian coffee, pasta, olive oil, pesto, biscuits, wine and simple picnic ingredients for the apartment.", "Comme cette excursion commence tout pres de Menton, elle fonctionne aussi comme journee de courses italiennes. A Vintimille, Bordighera ou Sanremo, cherchez cafe italien, pates, huile d'olive, pesto, biscuits, vin et ingredients simples pour un repas a l'appartement.", "Poiche questa gita parte cosi vicino a Mentone, funziona anche come giornata di spesa italiana. A Ventimiglia, Bordighera o Sanremo cerca caffe italiano, pasta, olio d'oliva, pesto, biscotti, vino e ingredienti semplici per l'appartamento.", "Оскільки ця поїздка починається зовсім поруч із Ментоном, вона добре працює і як день італійських закупівель. У Вентімільї, Бордігері або Санремо шукайте каву, пасту, оливкову олію, песто, печиво, вино й прості інгредієнти для апартаментів."),
          t("For a quick train day, choose a small central Conad near your stop. If you have a car, the larger Vallecrosia supermarket between Ventimiglia and Bordighera is more useful for a proper stock-up.", "Pour une journee en train, choisissez un petit Conad central pres de votre arret. Si vous avez une voiture, le plus grand supermarche de Vallecrosia entre Vintimille et Bordighera est plus utile pour de vraies courses.", "Per una giornata in treno scegli un piccolo Conad centrale vicino alla fermata. Se hai l'auto, il supermercato piu grande di Vallecrosia tra Ventimiglia e Bordighera e piu utile per una spesa completa.", "Для поїздки потягом оберіть невеликий центральний Conad біля своєї зупинки. Якщо ви на авто, більший супермаркет у Vallecrosia між Вентімільєю та Бордігерою зручніший для повної закупівлі."),
        ],
        relatedPlaceIds: ["conad-city-ventimiglia-carso", "conad-city-ventimiglia-corso-nizza", "conad-superstore-vallecrosia", "conad-city-bordighera", "conad-city-sanremo"],
      },
      {
        heading: t("Optional inland detour: Dolceacqua and Rossese wine", "Detour interieur optionnel: Dolceacqua et vin Rossese", "Deviazione interna opzionale: Dolceacqua e vino Rossese", "Опційний маршрут углиб: Dolceacqua і вино Rossese"),
        body: [
          t("If you are not limited to the train line, Dolceacqua adds a very different Ligurian mood: a medieval village, stone bridge, hill streets and Rossese di Dolceacqua wine. It is better by car, taxi or a carefully checked bus plan than as a casual rail stop.", "Si vous n'etes pas limite a la ligne de train, Dolceacqua ajoute une ambiance ligure tres differente: village medieval, pont de pierre, ruelles en pente et vin Rossese di Dolceacqua. C'est mieux en voiture, taxi ou avec un bus bien verifie que comme simple arret ferroviaire.", "Se non sei limitato alla linea ferroviaria, Dolceacqua aggiunge un'atmosfera ligure molto diversa: borgo medievale, ponte in pietra, vie in salita e vino Rossese di Dolceacqua. E meglio in auto, taxi o con autobus ben controllato, non come semplice fermata in treno.", "Якщо ви не обмежені залізничною лінією, Dolceacqua додає зовсім інший лігурійський настрій: середньовічне село, кам'яний міст, вулички на пагорбі й вино Rossese di Dolceacqua. Це краще робити авто, таксі або з добре перевіреним автобусним планом, а не як випадкову зупинку потягом."),
          t("For wine-focused guests, nearby producers and tasting options can turn the Italian day into a slower countryside plan. Confirm opening hours and tasting availability before building the day around them.", "Pour les voyageurs interesses par le vin, les producteurs et options de degustation proches peuvent transformer la journee italienne en programme plus lent cote campagne. Verifiez horaires et disponibilite des degustations avant d'organiser la journee autour d'eux.", "Per chi ama il vino, produttori e degustazioni nei dintorni possono trasformare la giornata italiana in un programma piu lento nell'entroterra. Conferma orari e disponibilita prima di costruire la giornata intorno a loro.", "Для гостей, яким цікаве вино, місцеві виробники й дегустації можуть перетворити італійський день на повільніший маршрут углиб країни. Перевіряйте години й доступність дегустацій перед тим, як будувати день навколо них."),
        ],
        relatedPlaceIds: ["dolceacqua", "casa-del-grillo", "terre-bianche-dolceacqua", "altavia-winery"],
      },
      {
        heading: t("Why Italy feels different", "Pourquoi l'Italie semble differente", "Perche l'Italia sembra diversa", "Чому Італія відчувається інакше"),
        body: [
          t("Although the distance from Menton is short, the mood changes quickly: Italian cafe culture, stronger market habits, different lunch hours, Ligurian cooking and often lower restaurant prices. That contrast is the reason the excursion works so well.", "Meme si la distance depuis Menton est courte, l'ambiance change vite: culture du cafe italien, marches plus presents, horaires de dejeuner differents, cuisine ligure et souvent des prix de restaurant plus doux. Ce contraste fait tout l'interet de l'excursion.", "Anche se la distanza da Mentone e breve, l'atmosfera cambia in fretta: cultura del cafe italiano, mercati piu forti, orari di pranzo diversi, cucina ligure e spesso prezzi piu bassi al ristorante. Questo contrasto rende la gita cosi riuscita.", "Хоч відстань від Ментона коротка, настрій швидко змінюється: італійська культура кафе, сильніша ринкова традиція, інші години обіду, лігурійська кухня і часто нижчі ціни в ресторанах. Саме цей контраст робить поїздку вдалою."),
        ],
      },
      {
        heading: t("Practical tips", "Conseils pratiques", "Consigli pratici", "Практичні поради"),
        body: [
          t("Italy uses the euro, so no currency exchange is needed. EU roaming usually works for European mobile plans, but visitors from outside Europe should check their provider. Friday is best for the Ventimiglia market; for a quieter trip, choose a weekday outside peak summer.", "L'Italie utilise l'euro, donc pas besoin de change. Le roaming UE fonctionne generalement pour les forfaits europeens, mais les visiteurs hors Europe doivent verifier leur operateur. Le vendredi est ideal pour le marche de Vintimille; pour plus de calme, choisissez un jour de semaine hors plein ete.", "L'Italia usa l'euro, quindi non serve cambio. Il roaming UE di solito funziona per piani europei, ma chi arriva da fuori Europa deve controllare il proprio operatore. Il venerdi e ideale per il mercato di Ventimiglia; per piu calma scegli un giorno feriale fuori alta stagione.", "Італія використовує євро, тому обмін не потрібен. EU roaming зазвичай працює для європейських тарифів, але гостям з-поза Європи варто перевірити оператора. П'ятниця найкраща для ринку Вентімільї; для спокійнішої поїздки обирайте будній день поза піком літа."),
        ],
      },
    ],
    practicalTips: [
      t("Check the return train before extending the day to Sanremo.", "Verifiez le train retour avant de prolonger jusqu'a Sanremo.", "Controlla il treno di ritorno prima di proseguire fino a Sanremo.", "Перевірте потяг назад перед продовженням до Санремо."),
      t("Carry ID even though Schengen border checks are not normally part of the trip.", "Gardez une piece d'identite meme si les controles Schengen ne sont normalement pas prevus.", "Porta un documento anche se i controlli Schengen normalmente non fanno parte del viaggio.", "Майте документ, хоча шенгенські перевірки зазвичай не є частиною поїздки."),
      t("For the Ventimiglia Friday market, go earlier for more choice and fewer crowds.", "Pour le marche du vendredi a Vintimille, partez plus tot pour plus de choix et moins de foule.", "Per il mercato del venerdi a Ventimiglia, vai presto per piu scelta e meno folla.", "На п'ятничний ринок у Вентімільї їдьте раніше: більше вибору й менше натовпу."),
    ],
  }),
  shortArticle({
    id: "mountains-snow-skiing-near-menton",
    slug: "mountains-snow-skiing-near-menton",
    title: t("From beach to snow: mountain escapes and ski days from Menton", "De la plage a la neige: montagnes et ski depuis Menton", "Dalla spiaggia alla neve: montagne e sci da Mentone", "Від пляжу до снігу: гори та лижні дні з Ментона"),
    seoTitle: t("From Beach to Snow: Mountain Escapes and Ski Days from Menton", "De la plage a la neige: montagnes et ski depuis Menton", "Dalla spiaggia alla neve: montagne e sci da Mentone", "Від пляжу до снігу: гори та лижні дні з Ментона"),
    seoDescription: t("Menton is not only beaches and summer sun. From the Mediterranean coast you can escape into cool mountains, visit the Mercantour, find winter snow and reach ski resorts such as Turini Camp d'Argent, La Colmiane, Auron, Isola 2000, Valberg and Limone Piemonte.", "Menton n'est pas seulement plages et soleil. Depuis la Mediterranee, partez vers les montagnes fraiches, le Mercantour, la neige d'hiver et les stations Turini Camp d'Argent, La Colmiane, Auron, Isola 2000, Valberg et Limone Piemonte.", "Mentone non e solo spiagge e sole. Dalla costa mediterranea puoi salire verso montagne fresche, Mercantour, neve invernale e stazioni come Turini Camp d'Argent, La Colmiane, Auron, Isola 2000, Valberg e Limone Piemonte.", "Ментон - це не лише пляжі й літнє сонце. Від Середземного моря можна поїхати в прохолодні гори, Mercantour, зимовий сніг і курорти Turini Camp d'Argent, La Colmiane, Auron, Isola 2000, Valberg та Limone Piemonte."),
    excerpt: t("One of Menton's quiet surprises is how quickly the landscape changes: swim in the Mediterranean, then drive into cooler mountains, forest roads, alpine villages and winter snow within reach of the Riviera.", "L'une des surprises de Menton est la rapidite du changement de paysage: baignade en Mediterranee, puis routes fraiches, forets, villages alpins et neige d'hiver a portee de Riviera.", "Una sorpresa di Mentone e quanto rapidamente cambia il paesaggio: mare Mediterraneo, poi montagne fresche, boschi, villaggi alpini e neve invernale a portata di Riviera.", "Одна з тихих несподіванок Ментона - як швидко змінюється ландшафт: море, а потім прохолодні гори, лісові дороги, альпійські села й зимовий сніг поруч із Рив'єрою."),
    category: "day-trips",
    coverImage: "/images/guide/mountains-snow-skiing-near-menton.jpg",
    coverImageAlt: t("Illustration of mountain and snow escapes from Menton", "Illustration des montagnes et de la neige depuis Menton", "Illustrazione di montagne e neve da Mentone", "Ілюстрація гір і снігу з Ментона"),
    visualTheme: "walk",
    visualStatus: "project_illustration",
    tags: [
      t("mountains", "montagnes", "montagne", "гори"),
      t("skiing", "ski", "sci", "лижі"),
      t("snow", "neige", "neve", "сніг"),
      t("Mercantour", "Mercantour", "Mercantour", "Mercantour"),
      t("summer heat", "chaleur d'ete", "caldo estivo", "літня спека"),
      t("families", "familles", "famiglie", "сім'ї"),
    ],
    bestFor: [guideBestForOptions[1].label, guideBestForOptions[3].label, guideBestForOptions[4].label, guideBestForOptions[7].label, guideBestForOptions[8].label],
    duration: "full-day",
    locationTags: ["menton-centre", "monaco", "italian-riviera"],
    sourceStatus: "needs_verification",
    relatedPlaces: [
      "col-de-turini",
      "turini-camp-dargent",
      "authion-massif",
      "la-colmiane",
      "auron-ski-resort",
      "isola-2000",
      "valberg",
      "limone-piemonte",
      "sospel-bevera-valley",
      "la-brigue",
      "tende",
      "mercantour-national-park",
    ],
    relatedArticles: ["cycling-bike-rental-menton", "skateparks-near-menton", "best-walks-and-hikes-around-menton", "stay-cool-in-menton-summer", "menton-with-kids-family-guide", "day-trips-from-menton", "italian-riviera-day-trip-from-menton", "menton-in-autumn", "public-transport-in-menton", "where-to-stay-in-menton"],
    relatedApartments: allApartments,
    sections: [
      {
        heading: t("Menton is not only sea and summer", "Menton n'est pas seulement mer et ete", "Mentone non e solo mare ed estate", "Ментон - це не лише море й літо"),
        body: [
          t("Most visitors imagine Menton as beaches, lemons, pastel facades, palm trees and warm Mediterranean evenings. That is true, but only half the story: the mountains begin almost immediately behind the coast.", "La plupart des visiteurs imaginent Menton comme plages, citrons, facades pastel, palmiers et soirees mediterraneennes. C'est vrai, mais ce n'est que la moitie de l'histoire: les montagnes commencent presque tout de suite derriere la cote.", "Molti visitatori immaginano Mentone come spiagge, limoni, facciate pastello, palme e sere mediterranee. E vero, ma e solo meta della storia: le montagne iniziano quasi subito dietro la costa.", "Більшість гостей уявляє Ментон як пляжі, лимони, пастельні фасади, пальми й теплі середземноморські вечори. Це правда, але лише половина історії: гори починаються майже одразу за узбережжям."),
          t("In summer, this means cooler air, forest roads, shade and a break from coastal heat. In winter, it can mean snow, sledging, snowshoeing, skiing, snowboarding and mountain restaurants close enough for a planned day trip.", "En ete, cela signifie air plus frais, routes forestieres, ombre et pause loin de la chaleur du littoral. En hiver, cela peut devenir neige, luge, raquettes, ski, snowboard et restaurants de montagne pour une excursion bien preparee.", "In estate significa aria piu fresca, strade nei boschi, ombra e pausa dal caldo costiero. In inverno puo diventare neve, slittino, ciaspole, sci, snowboard e ristoranti di montagna per una gita pianificata.", "Влітку це означає прохолодніше повітря, лісові дороги, тінь і перерву від спеки на узбережжі. Взимку - сніг, санки, снігоступи, лижі, сноуборд і гірські ресторани для запланованого дня."),
        ],
        relatedApartmentKeys: allApartments,
      },
      {
        heading: t("Can you really see snow from Menton?", "Peut-on vraiment trouver de la neige depuis Menton?", "Si puo davvero trovare neve da Mentone?", "Чи справді можна знайти сніг з Ментона?"),
        body: [
          t("In winter, yes: several snow and ski areas are within reach. In summer, snow is not guaranteed and should never be promised, but higher Mercantour routes can feel dramatically cooler than the coast, and early-season snow patches are possible after a strong winter.", "En hiver, oui: plusieurs secteurs neige et ski sont accessibles. En ete, la neige n'est pas garantie et ne doit jamais etre promise, mais les routes hautes du Mercantour peuvent etre beaucoup plus fraiches que la cote, avec parfois des restes de neige en debut de saison.", "In inverno si: varie zone neve e sci sono raggiungibili. In estate la neve non e garantita e non va promessa, ma le zone alte del Mercantour possono essere molto piu fresche della costa, con possibili chiazze di neve dopo un buon inverno.", "Взимку так: кілька снігових і лижних зон доступні. Влітку сніг не гарантований і його не варто обіцяти, але високі маршрути Mercantour можуть бути набагато прохолоднішими за узбережжя, а після сильної зими можливі снігові плями."),
          t("The safe promise is simple: Menton gives fast access to mountain coolness in summer and real snow destinations in winter.", "La promesse juste est simple: Menton donne un acces rapide a la fraicheur de montagne en ete et a de vraies destinations neige en hiver.", "La promessa corretta e semplice: Mentone offre accesso rapido al fresco di montagna in estate e a vere destinazioni neve in inverno.", "Чесне формулювання просте: Ментон дає швидкий доступ до гірської прохолоди влітку та справжніх снігових напрямів узимку."),
        ],
        relatedPlaceIds: ["mercantour-national-park", "col-de-turini", "authion-massif"],
      },
      {
        heading: t("Closest mountain escape: Turini and Camp d'Argent", "L'echappee montagne la plus proche: Turini et Camp d'Argent", "La fuga in montagna piu vicina: Turini e Camp d'Argent", "Найближча гірська втеча: Turini та Camp d'Argent"),
        body: [
          t("For a short escape from Menton, Col de Turini and Turini Camp d'Argent are the first names to know. Col de Turini is a scenic pass with rally history, hairpins, forest air and access toward the Authion side.", "Pour une courte echappee depuis Menton, Col de Turini et Turini Camp d'Argent sont les premiers noms a connaitre. Le Col de Turini est un passage panoramique avec histoire de rallye, lacets, forets et acces vers l'Authion.", "Per una breve fuga da Mentone, Col de Turini e Turini Camp d'Argent sono i primi nomi da conoscere. Il Col de Turini e un passo panoramico con storia rally, tornanti, boschi e accesso verso l'Authion.", "Для короткої втечі з Ментона перші назви - Col de Turini та Turini Camp d'Argent. Col de Turini - мальовничий перевал із ралійною історією, серпантинами, лісовим повітрям і доступом до Authion."),
          t("In winter, Turini Camp d'Argent is best understood as a simple family snow day rather than a big Alpine resort: first snow, sledging, beginner skiing and a gentler mountain rhythm.", "En hiver, Turini Camp d'Argent se comprend comme une journee neige en famille plutot qu'une grande station alpine: premiere neige, luge, ski debutant et rythme plus doux.", "In inverno Turini Camp d'Argent e soprattutto una giornata neve in famiglia, non una grande stazione alpina: prima neve, slittino, sci per principianti e ritmo piu semplice.", "Взимку Turini Camp d'Argent краще сприймати як простий сімейний сніговий день, а не великий альпійський курорт: перший сніг, санки, початкове катання і м'якший ритм."),
        ],
        relatedPlaceIds: ["col-de-turini", "turini-camp-dargent", "authion-massif"],
        relatedApartmentKeys: ["beachside-family-apartment"],
      },
      {
        heading: t("Family ski resorts: La Colmiane, Auron, Isola 2000 and Valberg", "Stations familiales: La Colmiane, Auron, Isola 2000 et Valberg", "Stazioni per famiglie: La Colmiane, Auron, Isola 2000 e Valberg", "Сімейні курорти: La Colmiane, Auron, Isola 2000 і Valberg"),
        body: [
          t("La Colmiane is the useful middle option: more complete than Turini, still approachable for families and beginner-to-intermediate skiers. Auron and Isola 2000 are bigger ski days, better for skiing and snowboarding as the main purpose of the trip.", "La Colmiane est l'option intermediaire utile: plus complete que Turini, mais encore accessible en famille et pour debutants/intermediaires. Auron et Isola 2000 sont de vraies journees ski, mieux adaptees si ski ou snowboard sont l'objectif principal.", "La Colmiane e l'opzione intermedia utile: piu completa di Turini, ma ancora accessibile per famiglie e sciatori principianti/intermedi. Auron e Isola 2000 sono giornate sci piu importanti, adatte quando sci o snowboard sono l'obiettivo.", "La Colmiane - корисний середній варіант: повніший за Turini, але ще доступний для сімей і початково-середнього рівня. Auron та Isola 2000 - більші лижні дні, коли лижі або сноуборд є головною метою."),
          t("Valberg is another full mountain day with a sunny village-resort feel. From Menton, compare travel time, snow reports and road conditions before choosing between the larger resorts.", "Valberg est une autre vraie journee montagne, avec ambiance de station-village ensoleillee. Depuis Menton, comparez temps de route, enneigement et conditions avant de choisir entre les grandes stations.", "Valberg e un'altra giornata di montagna completa, con atmosfera di stazione-villaggio soleggiata. Da Mentone confronta tempi, neve e strade prima di scegliere tra le stazioni piu grandi.", "Valberg - ще один повний гірський день із сонячною атмосферою курорту-села. З Ментона порівнюйте час дороги, сніг і стан трас перед вибором великого курорту."),
        ],
        relatedPlaceIds: ["la-colmiane", "auron-ski-resort", "isola-2000", "valberg"],
      },
      {
        heading: t("Limone Piemonte: the Italian ski day", "Limone Piemonte: la journee ski italienne", "Limone Piemonte: la giornata sci italiana", "Limone Piemonte: італійський лижний день"),
        body: [
          t("Limone Piemonte is the main Italian mountain idea from Menton. It can combine skiing or snow walking with Italian coffee, lunch and a different Alpine atmosphere across the border.", "Limone Piemonte est la principale idee montagne cote italien depuis Menton. Elle peut combiner ski ou marche dans la neige avec cafe italien, dejeuner et atmosphere alpine differente.", "Limone Piemonte e la principale idea montana italiana da Mentone. Puo combinare sci o passeggiate sulla neve con caffe, pranzo e atmosfera alpina italiana.", "Limone Piemonte - головна італійська гірська ідея з Ментона. Вона може поєднати лижі або прогулянку снігом з італійською кавою, обідом і іншою альпійською атмосферою."),
          t("Check road access, weather, winter equipment rules and return timing carefully before building the day around Italy.", "Verifiez acces routier, meteo, equipements hiver et horaire de retour avant d'organiser la journee cote Italie.", "Controlla accesso stradale, meteo, regole invernali e ritorno prima di organizzare la giornata in Italia.", "Ретельно перевіряйте дорогу, погоду, зимове обладнання й час повернення перед плануванням італійського дня."),
        ],
        relatedPlaceIds: ["limone-piemonte"],
      },
      {
        heading: t("Summer escape from the heat", "Echapper a la chaleur d'ete", "Fuga dal caldo estivo", "Втеча від літньої спеки"),
        body: [
          t("In July and August, the mountain value is not guaranteed snow; it is cooler air, altitude, shade, forest roads and a break from the coast. Good options include Col de Turini, the Authion side, Sospel and the Bévéra valley, La Brigue, Tende and Mercantour walks.", "En juillet et aout, l'interet des montagnes n'est pas la neige garantie: c'est l'air plus frais, l'altitude, l'ombre, les routes forestieres et une pause loin de la cote. Bons choix: Turini, Authion, Sospel et Bévéra, La Brigue, Tende et marches du Mercantour.", "A luglio e agosto il valore della montagna non e neve garantita: e aria piu fresca, quota, ombra, strade nei boschi e pausa dalla costa. Buone opzioni: Turini, Authion, Sospel e valle Bévéra, La Brigue, Tende e cammini nel Mercantour.", "У липні й серпні цінність гір - не гарантований сніг, а прохолодніше повітря, висота, тінь, лісові дороги й пауза від узбережжя. Варіанти: Turini, Authion, Sospel і долина Bévéra, La Brigue, Tende та маршрути Mercantour."),
          t("With children, this can completely change a hot day: leave the beach rhythm, eat somewhere cooler, walk under trees, look for viewpoints and return to the sea in the evening.", "Avec des enfants, cela peut transformer une journee chaude: quitter le rythme plage, manger au frais, marcher sous les arbres, chercher les points de vue puis revenir a la mer le soir.", "Con bambini puo cambiare completamente una giornata calda: lasciare la spiaggia, mangiare al fresco, camminare tra alberi, cercare panorami e tornare al mare la sera.", "З дітьми це може повністю змінити спекотний день: вийти з пляжного ритму, поїсти в прохолоді, пройтися під деревами, знайти краєвиди й повернутися до моря ввечері."),
        ],
        relatedPlaceIds: ["col-de-turini", "authion-massif", "sospel-bevera-valley", "la-brigue", "tende", "mercantour-national-park"],
        relatedApartmentKeys: allApartments,
      },
      {
        heading: t("Best option by trip type", "Quelle option selon le voyage", "Opzione migliore per tipo di viaggio", "Найкращий варіант за типом поїздки"),
        body: [
          t("For a child's first snow day, start with Turini Camp d'Argent or La Colmiane. For a real ski or snowboard day, compare Auron, Isola 2000, Valberg and Limone Piemonte. For better snow reliability, look first at the higher resorts. For an Italian snow-and-food day, choose Limone Piemonte.", "Pour une premiere neige avec enfant, commencez par Turini Camp d'Argent ou La Colmiane. Pour une vraie journee ski ou snowboard, comparez Auron, Isola 2000, Valberg et Limone Piemonte. Pour la neige la plus fiable, regardez d'abord les stations d'altitude. Pour Italie + neige + repas, choisissez Limone Piemonte.", "Per la prima neve con bambini inizia da Turini Camp d'Argent o La Colmiane. Per una vera giornata sci o snowboard confronta Auron, Isola 2000, Valberg e Limone Piemonte. Per neve piu affidabile guarda prima le stazioni in quota. Per Italia, neve e pranzo scegli Limone Piemonte.", "Для першого снігу з дитиною почніть із Turini Camp d'Argent або La Colmiane. Для справжнього дня лиж чи сноуборду порівнюйте Auron, Isola 2000, Valberg і Limone Piemonte. Для надійнішого снігу дивіться вищі курорти. Для Італії, снігу й обіду - Limone Piemonte."),
          t("For a summer heat escape without skiing, choose Turini, Authion, Sospel, Tende or the Mercantour valleys and plan the day around air, views, shade and a slower mountain rhythm.", "Pour echapper a la chaleur sans ski, choisissez Turini, Authion, Sospel, Tende ou les vallees du Mercantour et organisez la journee autour de l'air, des vues, de l'ombre et d'un rythme lent.", "Per fuggire dal caldo senza sci scegli Turini, Authion, Sospel, Tende o le valli del Mercantour e organizza la giornata intorno ad aria, viste, ombra e ritmo lento.", "Для втечі від спеки без лиж обирайте Turini, Authion, Sospel, Tende або долини Mercantour і плануйте день навколо повітря, видів, тіні та повільного гірського ритму."),
        ],
      },
      {
        heading: t("What to check before you go", "A verifier avant de partir", "Cosa controllare prima di partire", "Що перевірити перед поїздкою"),
        body: [
          t("Mountain trips from Menton need more preparation than a beach day. Check weather at altitude, road conditions, snow reports, lift openings, winter tyre or chain rules, restaurant opening, rental timing, return route and daylight.", "Les sorties montagne demandent plus de preparation qu'une plage. Verifiez meteo en altitude, routes, enneigement, remontees, pneus hiver ou chaines, restaurants, horaires de location, retour et lumiere du jour.", "Le gite in montagna richiedono piu preparazione della spiaggia. Controlla meteo in quota, strade, neve, impianti, gomme o catene, ristoranti, noleggi, ritorno e luce.", "Гірські поїздки з Ментона потребують більше підготовки, ніж пляж. Перевіряйте погоду на висоті, дороги, сніг, підйомники, зимові шини чи ланцюги, ресторани, прокат, маршрут назад і світловий день."),
          t("Do not judge mountain weather by the weather in Menton. The coast can be mild while inland roads are windy, foggy, cold or snowy.", "Ne jugez pas la meteo montagne depuis Menton. La cote peut etre douce alors que l'interieur est venteux, brumeux, froid ou enneige.", "Non giudicare la meteo in montagna dal tempo a Mentone. La costa puo essere mite mentre l'interno e ventoso, nebbioso, freddo o innevato.", "Не оцінюйте погоду в горах за погодою в Ментоні. На узбережжі може бути м'яко, а в горах - вітер, туман, холод або сніг."),
        ],
      },
      {
        heading: t("Can you do it without a car?", "Peut-on le faire sans voiture?", "Si puo fare senza auto?", "Чи можна без авто?"),
        body: [
          t("For serious mountain or snow days from Menton, a car is usually the easiest option. Some seasonal ski buses may run from Nice, but from Menton the logistics are more complex: train to Nice, ski bus if operating, private transfer, one-day car rental or a lower mountain village such as Sospel.", "Pour les vraies journees montagne ou neige depuis Menton, la voiture reste souvent la plus simple. Des bus neige saisonniers peuvent partir de Nice, mais depuis Menton la logistique se complique: train vers Nice, bus neige si disponible, transfert prive, location d'un jour ou village plus bas comme Sospel.", "Per vere giornate montagna o neve da Mentone, l'auto e di solito piu semplice. Alcuni bus neve partono da Nizza, ma da Mentone la logistica e piu complessa: treno per Nizza, bus se attivo, transfer, auto a noleggio o paese piu basso come Sospel.", "Для справжніх гірських або снігових днів з Ментона авто зазвичай найпростіше. Деякі сезонні ski bus можуть їхати з Ніцци, але з Ментона логістика складніша: потяг до Ніцци, bus якщо працює, трансфер, авто на день або нижче гірське село на кшталт Sospel."),
        ],
        relatedPlaceIds: ["sospel-bevera-valley"],
      },
      {
        heading: t("Staying in Menton for sea and mountain trips", "Sejourner a Menton pour mer et montagne", "Soggiornare a Mentone tra mare e montagna", "Жити в Ментоні для моря й гір"),
        body: [
          t("Menton works well as a base because you do not have to choose between sea and mountains. You can stay by the Mediterranean, keep restaurants and old-town walks close, and still use a mountain day as a special excursion.", "Menton fonctionne bien comme base car vous n'avez pas a choisir entre mer et montagne. Vous restez pres de la Mediterranee, des restaurants et de la vieille ville, tout en gardant une journee montagne comme excursion speciale.", "Mentone funziona bene come base perche non devi scegliere tra mare e montagna. Puoi stare sul Mediterraneo, avere ristoranti e centro storico vicini, e tenere una giornata in montagna come escursione speciale.", "Ментон добре працює як база, бо не треба обирати між морем і горами. Можна жити біля Середземного моря, мати поруч ресторани й старе місто, а гірський день залишити як особливу поїздку."),
          t("Sea View Balcony Studio suits couples who want a seaside base with occasional mountain days. Beachside Apartment with Terrace & Parking is strongest for families planning car trips. Panoramic Sea View Studio fits a short scenic stay with one mountain, Monaco or Italy day.", "Sea View Balcony Studio convient aux couples qui veulent une base mer avec quelques jours montagne. Beachside Apartment with Terrace & Parking est le plus pratique pour familles avec voiture. Panoramic Sea View Studio convient a un court sejour panoramique avec une journee montagne, Monaco ou Italie.", "Sea View Balcony Studio va bene per coppie con base mare e qualche giornata in montagna. Beachside Apartment with Terrace & Parking e piu pratico per famiglie in auto. Panoramic Sea View Studio funziona per soggiorni brevi con una giornata montagna, Monaco o Italia.", "Sea View Balcony Studio підходить парам із морською базою та окремими гірськими днями. Beachside Apartment with Terrace & Parking найкращий для сімей з авто. Panoramic Sea View Studio пасує короткому scenic stay з одним днем у горах, Монако або Італії."),
        ],
        relatedApartmentKeys: allApartments,
      },
    ],
    practicalTips: [
      t("For winter, pack warm jackets, gloves, hats, sunglasses, waterproof shoes, spare socks, snacks and sun cream.", "En hiver, prevoyez vestes chaudes, gants, bonnets, lunettes, chaussures impermeables, chaussettes de rechange, snacks et creme solaire.", "In inverno porta giacche calde, guanti, cappelli, occhiali, scarpe impermeabili, calze di ricambio, snack e crema solare.", "Взимку беріть теплі куртки, рукавички, шапки, окуляри, водостійке взуття, запасні шкарпетки, перекус і крем від сонця."),
      t("For summer, bring water, a hat, sun cream, walking shoes, a light jacket and motion-sickness backup for winding roads.", "En ete, prenez eau, chapeau, creme solaire, chaussures de marche, veste legere et de quoi gerer les routes sinueuses.", "In estate porta acqua, cappello, crema solare, scarpe da cammino, giacca leggera e qualcosa contro il mal d'auto.", "Влітку беріть воду, капелюх, крем, взуття для ходьби, легку куртку й щось від заколисування на серпантинах."),
      t("Check resort opening, snow reports and road conditions on the morning of departure.", "Verifiez ouverture, enneigement et routes le matin du depart.", "Controlla apertura, neve e strade la mattina della partenza.", "Перевіряйте відкриття, сніг і дороги вранці перед виїздом."),
      t("For children, keep the first snow day simple: snow play, sledging, hot chocolate and photos may be enough.", "Avec enfants, gardez la premiere journee neige simple: jeux, luge, chocolat chaud et photos peuvent suffire.", "Con bambini tieni semplice la prima neve: giochi, slittino, cioccolata calda e foto possono bastare.", "Для дітей перший сніговий день робіть простим: сніг, санки, гарячий шоколад і фото можуть бути достатніми."),
    ],
  }),
  shortArticle({
    id: "morning-walk-france-to-italy",
    slug: "morning-walk-france-to-italy",
    title: t("A morning walk from France to Italy", "Une promenade du matin de la France a l'Italie", "Una passeggiata mattutina dalla Francia all'Italia", "Ранкова прогулянка з Франції до Італії"),
    seoTitle: t("Morning Walk from Menton to Italy | Border Coffee Guide", "Promenade de Menton vers l'Italie | Cafe a la frontiere", "Passeggiata da Mentone all'Italia | Caffe al confine", "Прогулянка з Ментона до Італії | Кава на кордоні"),
    seoDescription: t("A simple Menton ritual: walk east along the seafront through Garavan, cross into Italy on foot, stop for espresso and return before lunch.", "Un rituel simple a Menton: marcher vers l'est par Garavan, passer en Italie a pied, boire un espresso et rentrer avant le dejeuner.", "Un rito semplice a Mentone: cammina verso est lungo Garavan, entra in Italia a piedi, fermati per un espresso e torna prima di pranzo.", "Простий ритуал у Ментоні: йти на схід через Garavan, перейти пішки до Італії, зупинитися на espresso й повернутися до обіду."),
    excerpt: t("Leave your apartment, follow the seafront east through Garavan and cross from France to Italy on foot for a quick espresso ritual.", "Quittez l'appartement, longez la mer vers l'est par Garavan et passez de France en Italie a pied pour un espresso.", "Esci dall'appartamento, segui il lungomare verso est da Garavan e passa dalla Francia all'Italia a piedi per un espresso.", "Вийдіть з апартаментів, ідіть уздовж моря на схід через Garavan і перейдіть з Франції до Італії пішки заради espresso."),
    category: "walks-views",
    coverImage: "/images/guide/morning-walk-france-to-italy.jpg",
    coverImageAlt: t("Illustration of a morning walk from Menton to Italy", "Illustration d'une promenade du matin de Menton vers l'Italie", "Illustrazione di una passeggiata mattutina da Mentone all'Italia", "Ілюстрація ранкової прогулянки з Ментона до Італії"),
    visualTheme: "walk",
    visualStatus: "project_illustration",
    tags: [t("Italy", "Italie", "Italia", "Італія"), t("morning walk", "promenade du matin", "passeggiata mattutina", "ранкова прогулянка"), t("Garavan", "Garavan", "Garavan", "Garavan"), t("coffee", "cafe", "caffe", "кава")],
    bestFor: [guideBestForOptions[0].label, guideBestForOptions[3].label, guideBestForOptions[4].label],
    duration: "1-2 hours",
    locationTags: ["seafront", "garavan", "italian-riviera"],
    sourceStatus: "editorial",
    relatedPlaces: ["promenade-du-soleil", "port-de-garavan", "sentier-douaniers-menton", "ventimiglia"],
    relatedArticles: ["supermarkets-in-menton", "best-walks-and-hikes-around-menton", "italian-riviera-day-trip-from-menton", "menton-without-a-car", "public-transport-in-menton"],
    relatedApartments: allApartments,
    sections: [
      {
        heading: t("A small border ritual", "Un petit rituel de frontiere", "Un piccolo rito di confine", "Маленький прикордонний ритуал"),
        body: [
          t("One of the best things about staying in Menton is not a beach, restaurant or famous landmark. It is the fact that you can leave the apartment, start walking along the seafront and reach another country before the morning is over.", "L'une des meilleures choses a Menton n'est pas une plage, un restaurant ou un monument connu. C'est le fait de quitter l'appartement, marcher le long de la mer et rejoindre un autre pays avant la fin de la matinee.", "Una delle cose migliori di Mentone non e una spiaggia, un ristorante o un monumento famoso. E il fatto di uscire dall'appartamento, camminare lungo il mare e arrivare in un altro paese prima che la mattina finisca.", "Одна з найкращих речей у Ментоні - не пляж, ресторан чи відома пам'ятка. Це можливість вийти з апартаментів, піти вздовж моря й дістатися іншої країни ще до завершення ранку."),
          t("The route is simple: follow the Mediterranean east through the quieter Garavan district, past beaches, palms and sea views, until France quietly becomes Italy.", "L'itineraire est simple: suivez la Mediterranee vers l'est par le quartier plus calme de Garavan, entre plages, palmiers et vues mer, jusqu'a ce que la France devienne doucement l'Italie.", "Il percorso e semplice: segui il Mediterraneo verso est attraverso il quartiere piu tranquillo di Garavan, tra spiagge, palme e viste mare, finche la Francia diventa discretamente Italia.", "Маршрут простий: ідіть уздовж Середземного моря на схід через тихіший район Garavan, повз пляжі, пальми й море, доки Франція непомітно не стане Італією."),
        ],
        relatedPlaceIds: ["promenade-du-soleil", "port-de-garavan"],
      },
      {
        heading: t("Crossing the border on foot", "Passer la frontiere a pied", "Attraversare il confine a piedi", "Перетнути кордон пішки"),
        body: [
          t("There is no dramatic checkpoint experience here: normally just a sign, a change of language and a different atmosphere. French becomes Italian, the coffee rhythm changes and the walk suddenly feels like a mini adventure.", "Il n'y a pas de grand moment de controle ici: normalement seulement un panneau, un changement de langue et une autre ambiance. Le francais devient italien, le rythme du cafe change et la promenade devient une mini-aventure.", "Non c'e un grande momento di controllo qui: di solito solo un cartello, un cambio di lingua e un'altra atmosfera. Il francese diventa italiano, il ritmo del caffe cambia e la passeggiata diventa una mini-avventura.", "Тут немає драматичного пункту контролю: зазвичай лише знак, зміна мови й інша атмосфера. Французька стає італійською, кавовий ритм змінюється, і прогулянка раптом стає маленькою пригодою."),
          t("This is why the route is so memorable: no car, no train, no ticket and no schedule. Just comfortable shoes and enough time to enjoy the sea.", "C'est ce qui rend l'itineraire memorable: pas de voiture, pas de train, pas de billet et pas d'horaire. Juste de bonnes chaussures et assez de temps pour profiter de la mer.", "E questo che rende il percorso memorabile: niente auto, niente treno, niente biglietto e niente orario. Solo scarpe comode e abbastanza tempo per godersi il mare.", "Саме це робить маршрут пам'ятним: без авто, без потяга, без квитка й без розкладу. Лише зручне взуття й достатньо часу, щоб насолодитися морем."),
        ],
        relatedPlaceIds: ["sentier-douaniers-menton"],
      },
      {
        heading: t("The coffee is worth the walk", "Le cafe vaut la marche", "Il caffe vale la passeggiata", "Кава варта прогулянки"),
        body: [
          t("Just across the border, small local stops serve the kind of espresso that makes the walk feel worthwhile. It is usually richer, stronger and often cheaper than many visitors expect on the Riviera.", "Juste apres la frontiere, de petites adresses locales servent un espresso qui justifie la marche. Il est souvent plus riche, plus intense et moins cher que beaucoup de visiteurs ne l'imaginent sur la Riviera.", "Appena oltre il confine, piccoli locali servono un espresso che rende la passeggiata utile. Di solito e piu ricco, piu intenso e spesso piu economico di quanto molti visitatori si aspettino in Riviera.", "Одразу за кордоном невеликі локальні місця подають espresso, заради якого прогулянка має сенс. Він часто насиченіший, міцніший і дешевший, ніж багато хто очікує на Рив'єрі."),
          t("Order an espresso or ristretto, sit outside if you can, and watch walkers, cyclists and locals pass by. It is not complicated or touristy; it is a small travel moment that often becomes a favourite memory.", "Commandez un espresso ou un ristretto, asseyez-vous dehors si possible et regardez marcheurs, cyclistes et habitants passer. Rien de complique ni de trop touristique: juste un petit moment de voyage qui devient souvent un souvenir favori.", "Ordina un espresso o un ristretto, siediti fuori se puoi e guarda passare camminatori, ciclisti e locali. Non e complicato ne turistico: e un piccolo momento di viaggio che spesso diventa un ricordo preferito.", "Замовте espresso або ristretto, сядьте надворі, якщо можливо, і спостерігайте за пішоходами, велосипедистами й місцевими. Це не складно й не туристично: маленький момент подорожі, який часто стає улюбленим спогадом."),
        ],
        relatedPlaceIds: ["ventimiglia"],
      },
      {
        heading: t("Practical information", "Informations pratiques", "Informazioni pratiche", "Практична інформація"),
        body: [
          t("Start from Menton Old Town, Promenade du Soleil or the central seafront. The walk usually takes about 45-60 minutes each way depending on pace and pauses. Difficulty is easy, but bring water, comfortable shoes and sun protection.", "Partez de la vieille ville, de la Promenade du Soleil ou du front de mer central. La marche prend souvent 45-60 minutes par trajet selon le rythme et les pauses. La difficulte est facile, mais prenez eau, bonnes chaussures et protection solaire.", "Parti dal centro storico, dalla Promenade du Soleil o dal lungomare centrale. La camminata richiede circa 45-60 minuti per tratta secondo ritmo e pause. La difficolta e facile, ma porta acqua, scarpe comode e protezione solare.", "Починайте зі старого міста, Promenade du Soleil або центральної набережної. Прогулянка зазвичай займає 45-60 хвилин в один бік залежно від темпу й пауз. Складність легка, але візьміть воду, зручне взуття й захист від сонця."),
          t("Morning and late afternoon are the most comfortable times. Carry ID for cross-border travel, even though Schengen checks are not normally part of this walk.", "Le matin et la fin d'apres-midi sont les moments les plus confortables. Gardez une piece d'identite pour le passage de frontiere, meme si les controles Schengen ne sont normalement pas prevus.", "Mattina e tardo pomeriggio sono i momenti piu comodi. Porta un documento per il passaggio di confine, anche se i controlli Schengen normalmente non fanno parte della passeggiata.", "Найкомфортніший час - ранок або пізній день. Майте документ для перетину кордону, навіть якщо шенгенські перевірки зазвичай не є частиною цієї прогулянки."),
        ],
      },
      {
        heading: t("Why this is a Menton secret", "Pourquoi c'est un secret de Menton", "Perche e un segreto di Mentone", "Чому це секрет Ментона"),
        body: [
          t("Monaco is famous, Nice is busy and Cannes is glamorous. Menton offers something quieter: wake up in France, drink morning coffee in Italy and return to the sea before lunch.", "Monaco est celebre, Nice est animee et Cannes est glamour. Menton offre quelque chose de plus discret: se reveiller en France, boire le cafe du matin en Italie et revenir au bord de mer avant le dejeuner.", "Monaco e famosa, Nizza e vivace e Cannes e glamour. Mentone offre qualcosa di piu discreto: svegliarsi in Francia, bere il caffe del mattino in Italia e tornare al mare prima di pranzo.", "Монако знамените, Ніцца жвава, Канни гламурні. Ментон пропонує тихіше: прокинутися у Франції, випити ранкову каву в Італії й повернутися до моря до обіду."),
          t("Sometimes the best Riviera experiences are not the most famous ones. They are the ones that feel impossible until you discover they are only a short walk away.", "Parfois, les meilleures experiences de la Riviera ne sont pas les plus connues. Ce sont celles qui semblent impossibles jusqu'a ce que l'on decouvre qu'elles sont a une courte marche.", "A volte le migliori esperienze in Riviera non sono le piu famose. Sono quelle che sembrano impossibili finche scopri che sono a una breve passeggiata.", "Іноді найкращі досвіди Рив'єри не найвідоміші. Це ті, що здаються неможливими, доки не з'ясується, що вони лише за коротку прогулянку."),
        ],
      },
    ],
    practicalTips: [
      t("Start early in summer to avoid heat on the exposed seafront.", "Partez tot en ete pour eviter la chaleur sur le front de mer expose.", "Parti presto in estate per evitare il caldo sul lungomare esposto.", "Влітку виходьте рано, щоб уникнути спеки на відкритій набережній."),
      t("Carry ID when crossing into Italy on foot.", "Gardez une piece d'identite pour passer en Italie a pied.", "Porta un documento quando entri in Italia a piedi.", "Майте документ, коли переходите до Італії пішки."),
      t("Keep the plan flexible: coffee in Italy is the destination, not a strict itinerary.", "Gardez le plan flexible: le cafe en Italie est la destination, pas un itineraire strict.", "Tieni il programma flessibile: il caffe in Italia e la meta, non un itinerario rigido.", "Залишайте план гнучким: кава в Італії - це мета, а не жорсткий маршрут."),
    ],
  }),
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
    relatedArticles: ["best-photo-spots-menton", "bars-and-beer-in-menton", "nightlife-in-menton", "latin-dancing-salsa-bachata-menton", "jazz-live-music-near-menton"],
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
    seoDescription: t("A realistic guide to Menton's low-key nightlife, beachside drinks, rooftop aperitifs, central bars and bigger nights out in Monaco or Nice.", "Guide realiste de la vie nocturne douce de Menton: verres en bord de plage, rooftops, bars centraux et grandes soirees possibles a Monaco ou Nice.", "Guida realistica alla vita notturna tranquilla di Mentone: drink sul mare, rooftop, bar centrali e serate piu grandi a Monaco o Nizza.", "Реалістичний гід по спокійному нічному життю Ментона: напої біля пляжу, rooftop, центральні бари й більші вечори в Монако або Ніцці."),
    excerpt: t("Menton nightlife is low-key and seaside-focused: aperitif, dinner, a walk and one or two well-chosen spots, with Monaco or Nice for a bigger night.", "La vie nocturne de Menton reste douce et tournee vers la mer: aperitif, diner, promenade et une ou deux bonnes adresses, avec Monaco ou Nice pour sortir plus fort.", "La vita notturna di Mentone e tranquilla e legata al mare: aperitivo, cena, passeggiata e uno o due posti scelti bene, con Monaco o Nizza per una serata piu intensa.", "Нічне життя Ментона спокійне й морське: аперитив, вечеря, прогулянка й одне-два вдало обрані місця, а для більшого вечора - Монако або Ніцца."),
    category: "nightlife-drinks",
    coverImage: "/images/guide/nightlife-in-menton.png",
    coverImageAlt: t("Illustration of evening drinks and nightlife in Menton", "Illustration des verres du soir a Menton", "Illustrazione dei drink serali a Mentone", "Ілюстрація вечірніх напоїв у Ментоні"),
    visualTheme: "nightlife",
    visualStatus: "project_illustration",
    tags: [t("cocktails", "cocktails", "cocktail", "коктейлі"), t("aperitif", "aperitif", "aperitivo", "аперитив"), t("Monaco", "Monaco", "Monaco", "Монако"), t("Nice", "Nice", "Nizza", "Ніцца")],
    bestFor: [guideBestForOptions[0].label, guideBestForOptions[6].label],
    duration: "evening",
    locationTags: ["menton-centre", "seafront", "monaco", "nice"],
    relatedPlaces: ["inky-bar", "med-rooftop", "les-incompris", "bar-lescalier"],
    relatedArticles: ["jazz-live-music-near-menton", "latin-dancing-salsa-bachata-menton", "casinos-near-menton", "theatre-opera-performing-arts-near-menton", "bars-and-beer-in-menton", "quiet-evening-in-menton", "michelin-restaurants-menton-nice-monaco", "cinemas-in-menton-nice-monaco", "public-transport-in-menton", "day-trips-from-menton"],
    relatedApartments: seaViewApartments,
    sections: [
      {
        heading: t("What nightlife in Menton feels like", "A quoi ressemble la vie nocturne a Menton", "Che atmosfera ha la sera a Mentone", "Яким є нічне життя в Ментоні"),
        body: [
          t(
            "Menton nightlife is low-key and seaside-focused: think aperitif, dinner, a walk and one or two well-chosen spots rather than a long bar crawl.",
            "La vie nocturne de Menton reste douce et tournee vers la mer : pensez aperitif, diner, promenade et une ou deux adresses bien choisies plutot qu'une longue tournee des bars.",
            "La vita notturna di Mentone e tranquilla e legata al mare: pensa ad aperitivo, cena, passeggiata e uno o due posti scelti bene, non a un lungo giro di bar.",
            "Нічне життя Ментона спокійне й прив'язане до моря: радше аперитив, вечеря, прогулянка й одне-два добре обрані місця, ніж довгий бар-хопінг.",
          ),
          t(
            "Even in summer, a typical night is more likely to be a terrace drink, Promenade du Soleil, a rooftop or a small music evening than clubbing until dawn. Seasonal DJ sets, live music and one-off events happen, but they change often, so check posters, hotel boards or social media once you arrive.",
            "Meme en ete, une soiree type ressemble davantage a un verre en terrasse, la Promenade du Soleil, un rooftop ou une petite soiree musicale qu'a une nuit en club jusqu'a l'aube. DJ sets, concerts et evenements ponctuels existent, mais changent souvent : verifiez affiches, panneaux d'hotels ou reseaux sociaux sur place.",
            "Anche in estate, una serata tipica e piu spesso un drink in terrazza, Promenade du Soleil, un rooftop o una piccola serata musicale che una notte in club fino all'alba. DJ set, musica live ed eventi singoli ci sono, ma cambiano spesso: controlla locandine, bacheche degli hotel o social quando arrivi.",
            "Навіть улітку типовий вечір тут частіше означає напій на терасі, Promenade du Soleil, rooftop або невеликий музичний вечір, а не клуби до світанку. Сезонні DJ-сети, жива музика й разові події бувають, але часто змінюються, тому перевіряйте афіші, дошки в готелях або соцмережі вже на місці.",
          ),
        ],
        relatedPlaceIds: ["promenade-du-soleil"],
      },
      {
        heading: t("Beachside and rooftop evenings in Menton", "Soirees plage et rooftop a Menton", "Serate sul mare e rooftop a Mentone", "Пляжні й rooftop-вечори в Ментоні"),
        body: [
          t(
            "Around Plage des Sablettes, Inky Bar is one of the livelier seasonal options when its programme is running. Come for sea air, cocktails, tapas-style snacks and, on some nights, music while people move between tables and the beach.",
            "Autour de la Plage des Sablettes, Inky Bar fait partie des options saisonnieres les plus animees quand son programme est actif. On y vient pour l'air marin, les cocktails, les petites assiettes type tapas et, certains soirs, la musique pendant que les gens circulent entre les tables et la plage.",
            "Intorno a Plage des Sablettes, Inky Bar e una delle opzioni stagionali piu vivaci quando il programma e attivo. Si viene per aria di mare, cocktail, piccoli piatti tipo tapas e, in alcune sere, musica mentre le persone si muovono tra tavoli e spiaggia.",
            "Біля Plage des Sablettes Inky Bar може бути одним із жвавіших сезонних варіантів, коли працює його програма. Сюди йдуть за морським повітрям, коктейлями, закусками в стилі tapas і, в окремі вечори, музикою, поки люди переміщуються між столиками й пляжем.",
          ),
          t(
            "For an elevated start, Med Rooftop on top of Best Western Hotel Mediterranee gives the classic Riviera mix: cocktails, finger food and a view over rooftops and the Mediterranean. The mood can be calm or livelier depending on season and guests, but it is still more about the setting than heavy partying.",
            "Pour commencer en hauteur, Med Rooftop au-dessus du Best Western Hotel Mediterranee offre le melange Riviera classique : cocktails, finger food et vue sur les toits et la Mediterranee. L'ambiance peut etre calme ou plus animee selon la saison et la clientele, mais reste davantage centree sur le cadre que sur la fete intense.",
            "Per iniziare dall'alto, Med Rooftop sul Best Western Hotel Mediterranee offre il classico mix Riviera: cocktail, finger food e vista su tetti e Mediterraneo. L'atmosfera puo essere calma o piu vivace secondo stagione e ospiti, ma resta piu legata al contesto che alla festa pesante.",
            "Для початку вечора з висоти Med Rooftop на Best Western Hotel Mediterranee дає класичну Рив'єру: коктейлі, finger food і вид на дахи та Середземне море. Атмосфера може бути спокійною або жвавішою залежно від сезону й гостей, але це все одно більше про краєвид, ніж про гучну вечірку.",
          ),
        ],
        relatedPlaceIds: ["inky-bar", "med-rooftop", "plage-sablettes"],
      },
      {
        heading: t("Central bars, dancing and karaoke", "Bars du centre, danse et karaoke", "Bar centrali, ballo e karaoke", "Центральні бари, танці й караоке"),
        body: [
          t(
            "Near the old port, Les Incompris is a useful address if you want proper cocktails and more bar energy. Expect a mix of locals and visitors, music, and some evenings that become more festive as the night goes on, especially in summer.",
            "Pres du vieux port, Les Incompris est une adresse utile si vous cherchez de vrais cocktails et une energie plus bar. Attendez-vous a un melange d'habitants et de visiteurs, de la musique, et certains soirs qui deviennent plus festifs au fil de la nuit, surtout en ete.",
            "Vicino al vecchio porto, Les Incompris e un indirizzo utile se vuoi cocktail seri e piu energia da bar. Aspettati un mix di locali e visitatori, musica e alcune sere che diventano piu festive con il passare delle ore, soprattutto in estate.",
            "Біля старого порту Les Incompris може бути корисною адресою, якщо хочеться справжніх коктейлів і більш барної енергії. Очікуйте суміш місцевих і гостей, музику та вечори, які можуть ставати жвавішими ближче до ночі, особливо влітку.",
          ),
          t(
            "For a quieter aperitif, Bar L'Escalier can work as a lower-key stop with simple drinks and a more local feel. Actual dancing or karaoke is more limited in Menton: some bars and restaurants organise themed nights, but programmes change often, so check recent listings or ask locally.",
            "Pour un aperitif plus calme, Bar L'Escalier peut convenir avec des verres simples et une ambiance plus locale. La danse ou le karaoke sont plus limites a Menton : certains bars et restaurants organisent des soirees a theme, mais les programmes changent souvent, donc verifiez les annonces recentes ou demandez sur place.",
            "Per un aperitivo piu tranquillo, Bar L'Escalier puo funzionare con drink semplici e un'atmosfera piu locale. Ballo e karaoke sono piu limitati a Mentone: alcuni bar e ristoranti organizzano serate a tema, ma i programmi cambiano spesso, quindi controlla gli annunci recenti o chiedi sul posto.",
            "Для тихішого аперитиву Bar L'Escalier може підійти як більш локальна й спокійна зупинка з простими напоями. Танців або караоке в Ментоні менше: деякі бари й ресторани проводять тематичні вечори, але програми часто змінюються, тому перевіряйте актуальні оголошення або питайте на місці.",
          ),
        ],
        relatedPlaceIds: ["les-incompris", "bar-lescalier"],
      },
      {
        heading: t("When Menton feels too quiet: Monaco", "Quand Menton semble trop calme: Monaco", "Quando Mentone sembra troppo tranquilla: Monaco", "Коли Ментон здається надто тихим: Монако"),
        body: [
          t(
            "If you want a later, more energetic night, Monaco is the easiest upgrade from Menton. Regional transport links the two, and taxis or ride-hailing can fill gaps late at night, but always check return options before you go.",
            "Si vous voulez une soiree plus tardive et plus energique, Monaco est l'option la plus simple depuis Menton. Les transports regionaux relient les deux, et taxis ou VTC peuvent completer tard le soir, mais verifiez toujours les retours avant de partir.",
            "Se vuoi una serata piu tarda e piu energica, Monaco e l'opzione piu semplice da Mentone. I trasporti regionali collegano le due citta, e taxi o ride-hailing possono coprire gli orari tardi, ma controlla sempre il ritorno prima di uscire.",
            "Якщо хочеться пізнішого й енергійнішого вечора, Монако - найпростіший крок угору з Ментона. Регіональний транспорт з'єднує ці місця, а таксі чи ride-hailing можуть допомогти пізно ввечері, але завжди перевіряйте повернення перед виїздом.",
          ),
          t(
            "A famous harbour address is La Rascasse, known around the Monaco Grand Prix corner and for a mix of terrace drinks, live music, DJs or themed nights depending on the programme. Monaco has more cocktail bars and clubs near the port and Casino area, with higher prices and sometimes smarter dress expectations.",
            "Une adresse connue du port est La Rascasse, celebre autour du virage du Grand Prix de Monaco et pour son melange de terrasse, musique live, DJs ou soirees a theme selon le programme. Monaco compte aussi d'autres bars a cocktails et clubs pres du port et du Casino, avec des prix plus eleves et parfois une tenue plus habillee attendue.",
            "Un indirizzo famoso al porto e La Rascasse, noto per la curva del Gran Premio di Monaco e per un mix di terrazza, musica live, DJ o serate a tema secondo programma. Monaco ha anche altri cocktail bar e club vicino al porto e alla zona Casino, con prezzi piu alti e a volte aspettative di abbigliamento piu elegante.",
            "Відоме місце біля порту - La Rascasse, пов'язане з поворотом Grand Prix de Monaco і форматом тераси, живої музики, DJ або тематичних вечорів залежно від програми. У Монако також більше коктейль-барів і клубів біля порту та Casino, але ціни вищі, а іноді очікується більш smart-casual одяг.",
          ),
        ],
      },
      {
        heading: t("When Menton feels too quiet: Nice", "Quand Menton semble trop calme: Nice", "Quando Mentone sembra troppo tranquilla: Nizza", "Коли Ментон здається надто тихим: Ніцца"),
        body: [
          t(
            "Nice has the broadest nightlife nearby, from wine bars and pubs in Vieux Nice to hotel bars and beach clubs along Promenade des Anglais. It is the better choice if you want more variety, louder music or a bigger-city evening.",
            "Nice offre la vie nocturne la plus variee a proximite, des bars a vin et pubs du Vieux Nice aux bars d'hotels et clubs de plage de la Promenade des Anglais. C'est le meilleur choix si vous voulez plus de variete, de musique forte ou une soiree plus urbaine.",
            "Nizza offre la vita notturna piu varia nei dintorni, dai wine bar e pub del Vieux Nice ai bar d'hotel e beach club lungo Promenade des Anglais. E la scelta migliore se vuoi piu varieta, musica piu alta o una serata da citta grande.",
            "Ніцца має найрізноманітніше нічне життя поблизу: wine bars і pubs у Vieux Nice, готельні бари й beach clubs уздовж Promenade des Anglais. Це кращий вибір, якщо хочеться більше варіантів, гучнішої музики або вечора великого міста.",
          ),
          t(
            "Going out in Nice from Menton can work the same night if you plan the return carefully. Check last trains and late transport before you start the evening, and keep a taxi or ride-share option in mind as backup.",
            "Sortir a Nice depuis Menton peut fonctionner le meme soir si vous planifiez bien le retour. Verifiez les derniers trains et transports tardifs avant de commencer la soiree, et gardez une option taxi ou VTC en secours.",
            "Uscire a Nizza da Mentone puo funzionare nella stessa sera se pianifichi bene il ritorno. Controlla ultimi treni e trasporti serali prima di iniziare, e tieni taxi o ride-share come opzione di riserva.",
            "Поїхати на вечір у Ніццу з Ментона реально, якщо добре спланувати повернення. Перевірте останні потяги й пізній транспорт до початку вечора, а таксі або ride-share залиште як запасний варіант.",
          ),
        ],
      },
      {
        heading: t("Practical tips for nights out", "Conseils pratiques pour sortir", "Consigli pratici per uscire la sera", "Практичні поради для вечора"),
        body: [
          t(
            "Treat Menton as a base for relaxed evenings, with the option of dialling up the nightlife in Monaco or Nice once in a while. In Menton itself, evenings tend to start earlier and wind down earlier than in large cities, so 19:00-20:00 is usually a better starting rhythm than waiting until very late.",
            "Considerez Menton comme une base pour des soirees detendues, avec la possibilite de monter d'un cran a Monaco ou Nice de temps en temps. A Menton meme, les soirees commencent et se terminent plus tot que dans les grandes villes : 19h00-20h00 est souvent un meilleur rythme de depart qu'attendre tres tard.",
            "Considera Mentone come base per serate rilassate, con la possibilita di alzare il livello a Monaco o Nizza ogni tanto. A Mentone stessa le serate iniziano e finiscono prima che nelle grandi citta: 19:00-20:00 e di solito un ritmo migliore che aspettare molto tardi.",
            "Сприймайте Ментон як базу для спокійних вечорів із можливістю іноді підняти рівень у Монако або Ніцці. У самому Ментоні вечори зазвичай починаються й завершуються раніше, ніж у великих містах, тому 19:00-20:00 часто кращий старт, ніж очікування до пізньої ночі.",
          ),
          t(
            "Always check current hours and seasonal programmes for beach bars, rooftops, karaoke or music nights. Opening times, guest energy and event schedules can shift from year to year.",
            "Verifiez toujours les horaires actuels et programmes saisonniers des bars de plage, rooftops, karaokes ou soirees musicales. Horaires, ambiance et calendriers changent d'une annee a l'autre.",
            "Controlla sempre orari aggiornati e programmi stagionali per beach bar, rooftop, karaoke o serate musicali. Orari, atmosfera e calendari possono cambiare da un anno all'altro.",
            "Завжди перевіряйте актуальні години й сезонні програми пляжних барів, rooftop, караоке або музичних вечорів. Графіки, атмосфера й події можуть змінюватися щороку.",
          ),
        ],
      },
    ],
    practicalTips: [
      t("Start earlier in Menton than you would in a big city.", "Commencez plus tot a Menton que dans une grande ville.", "Inizia prima a Mentone rispetto a una grande citta.", "У Ментоні починайте вечір раніше, ніж у великому місті."),
      t("Check last return options before going to Monaco or Nice at night.", "Verifiez les retours tardifs avant de sortir a Monaco ou Nice.", "Controlla i ritorni serali prima di uscire a Monaco o Nizza.", "Перед вечором у Монако або Ніцці перевірте варіанти пізнього повернення."),
      t("Seasonal music, DJ and karaoke nights should be checked locally.", "Les soirees musique, DJ et karaoke saisonnieres sont a verifier sur place.", "Musica, DJ e karaoke stagionali vanno controllati sul posto.", "Сезонні музичні, DJ- і караоке-вечори перевіряйте на місці."),
    ],
  }),
  shortArticle({
    id: "latin-dancing-salsa-bachata-menton",
    slug: "latin-dancing-salsa-bachata-menton",
    title: t("Latin dancing near Menton: salsa, bachata and kizomba nights", "Danse latine pres de Menton : soirees salsa, bachata et kizomba", "Balli latini vicino a Mentone: serate salsa, bachata e kizomba", "Латиноамериканські танці біля Ментона: salsa, bachata та kizomba"),
    seoTitle: t("Latin Dancing Near Menton: Salsa, Bachata and Kizomba Nights", "Danse latine pres de Menton : salsa, bachata et kizomba", "Balli latini vicino a Mentone: salsa, bachata e kizomba", "Латиноамериканські танці біля Ментона: salsa, bachata та kizomba"),
    seoDescription: t("A practical guide to Latin dancing near Menton: salsa, bachata and kizomba classes, SBK parties in Menton, Monaco dance events, Nice Latin nights and Sanremo AfroLatin congress tips.", "Guide pratique de la danse latine pres de Menton : cours salsa, bachata et kizomba, soirees SBK a Menton, evenements a Monaco, nuits latines a Nice et pistes Sanremo.", "Guida pratica ai balli latini vicino a Mentone: corsi di salsa, bachata e kizomba, serate SBK a Mentone, eventi a Monaco, notti latine a Nizza e idee Sanremo.", "Практичний гід з Latin dancing біля Ментона: заняття salsa, bachata та kizomba, SBK-вечори в Ментоні, події в Монако, латино-вечори в Ніцці та Sanremo."),
    excerpt: t("Menton has a smaller Latin dance scene than Nice, but local classes, occasional SBK parties, Monaco event weekends and Riviera congresses can still make salsa, bachata or kizomba part of a stay.", "Menton a une scene latine plus petite que Nice, mais les cours locaux, soirees SBK ponctuelles, week-ends a Monaco et congres Riviera permettent quand meme d'ajouter salsa, bachata ou kizomba au sejour.", "Mentone ha una scena latina piu piccola di Nizza, ma corsi locali, serate SBK occasionali, weekend a Monaco e congressi Riviera possono comunque aggiungere salsa, bachata o kizomba al soggiorno.", "У Ментоні латино-сцена менша, ніж у Ніцці, але локальні заняття, окремі SBK-вечори, події в Монако та congress-вікенди Рив'єри можуть додати salsa, bachata або kizomba до подорожі."),
    category: "nightlife-drinks",
    coverImage: "/images/guide/latin-dancing-salsa-bachata-menton.jpg",
    coverImageAlt: t("Latin dancing evening near Menton", "Soiree danse latine pres de Menton", "Serata di balli latini vicino a Mentone", "Латиноамериканський танцювальний вечір біля Ментона"),
    visualTheme: "nightlife",
    visualStatus: "project_illustration",
    tags: [t("salsa", "salsa", "salsa", "salsa"), t("bachata", "bachata", "bachata", "bachata"), t("kizomba", "kizomba", "kizomba", "kizomba"), t("evening plans", "sorties du soir", "serate", "вечірні плани")],
    bestFor: [guideBestForOptions[0].label, guideBestForOptions[6].label, guideBestForOptions[4].label],
    duration: "evening",
    locationTags: ["menton-centre", "monaco", "nice", "italian-riviera"],
    sourceStatus: "needs_verification",
    relatedPlaces: ["axess-dance-menton", "espace-gravity-menton", "studio-mroad-menton", "londa-restaurant-menton", "alls-stars-menton", "salle-henri-monin-gorbio", "espace-leo-ferre-monaco", "monaco-monte-carlo", "monaco-monte-carlo-station", "nice-palais-de-justice", "nice-old-town", "nice-ville-station", "sanremo", "grand-hotel-des-anglais-sanremo", "breil-sur-roya", "menton-station"],
    relatedArticles: ["jazz-live-music-near-menton", "nightlife-in-menton", "monaco-events-from-menton", "theatre-opera-performing-arts-near-menton", "casinos-near-menton", "menton-without-a-car", "public-transport-in-menton", "italian-riviera-day-trip-from-menton", "day-trips-from-menton", "quiet-evening-in-menton", "where-to-stay-in-menton"],
    relatedApartments: allApartments,
    sections: [
      {
        heading: t("Can you dance salsa and bachata in Menton?", "Peut-on danser salsa et bachata a Menton ?", "Si puo ballare salsa e bachata a Mentone?", "Чи можна танцювати salsa і bachata в Ментоні?"),
        body: [
          t("Yes, but with realistic expectations. Menton is not a large Latin dance city, so you should not expect a guaranteed salsa club every night.", "Oui, mais avec des attentes realistes. Menton n'est pas une grande ville de danse latine : il ne faut pas attendre un club salsa garanti tous les soirs.", "Si, ma con aspettative realistiche. Mentone non e una grande citta di balli latini, quindi non aspettarti un club salsa garantito ogni sera.", "Так, але з реалістичними очікуваннями. Ментон не є великим містом Latin dance, тому не варто чекати гарантований salsa club щовечора."),
          t("The useful rhythm is to check Menton first, Monaco if a special event overlaps with your dates, Nice for the strongest weekly scene, and Sanremo when a congress or Riviera dance weekend is running.", "Le bon reflexe : regarder d'abord Menton, Monaco si un evenement special tombe pendant votre sejour, Nice pour la scene hebdomadaire la plus forte, puis Sanremo lors d'un congres ou week-end danse Riviera.", "Il ritmo giusto e controllare prima Mentone, Monaco se c'e un evento speciale nelle tue date, Nizza per la scena settimanale piu forte e Sanremo quando c'e un congresso o weekend Riviera.", "Практичний підхід: спершу перевірити Ментон, Монако якщо є спеціальна подія, Ніццу для найсильнішої щотижневої сцени, і Sanremo під час congress або Riviera dance weekend."),
          t("SBK usually means Salsa, Bachata and Kizomba. Some evenings may also include Cuban salsa, urban kiz, semba, kompa, merengue or reggaeton.", "SBK signifie generalement Salsa, Bachata et Kizomba. Certaines soirees ajoutent salsa cubaine, urban kiz, semba, kompa, merengue ou reggaeton.", "SBK di solito significa Salsa, Bachata e Kizomba. Alcune serate aggiungono salsa cubana, urban kiz, semba, kompa, merengue o reggaeton.", "SBK зазвичай означає Salsa, Bachata і Kizomba. Деякі вечори також додають Cuban salsa, urban kiz, semba, kompa, merengue або reggaeton."),
        ],
        relatedPlaceIds: ["axess-dance-menton", "alls-stars-menton"],
      },
      {
        heading: t("Start with Axess Dance in Menton", "Commencer par Axess Dance a Menton", "Inizia da Axess Dance a Mentone", "Почніть з Axess Dance у Ментоні"),
        body: [
          t("Axess Dance is the clearest local starting point for salsa, bachata, kizomba and West Coast Swing in Menton. It is useful both for classes and for understanding what is happening locally during your stay.", "Axess Dance est le point de depart local le plus clair pour salsa, bachata, kizomba et West Coast Swing a Menton. C'est utile pour les cours et pour comprendre ce qui se passe pendant votre sejour.", "Axess Dance e il punto di partenza locale piu chiaro per salsa, bachata, kizomba e West Coast Swing a Mentone. E utile sia per i corsi sia per capire cosa succede durante il soggiorno.", "Axess Dance - найзрозуміліший локальний старт для salsa, bachata, kizomba та West Coast Swing у Ментоні. Це корисно і для занять, і для розуміння актуальних подій під час перебування."),
          t("Their listed Menton venues include Espace Gravity, Studio M'Road and L'Onda Restaurant, with Salle Henri Monin in nearby Gorbio also appearing in the class information. Treat the venue list as current only after checking the organiser's own programme.", "Parmi les lieux indiques figurent Espace Gravity, Studio M'Road et L'Onda Restaurant a Menton, ainsi que Salle Henri Monin a Gorbio. Ne considerez la liste comme actuelle qu'apres verification du programme de l'organisateur.", "Tra le sedi indicate figurano Espace Gravity, Studio M'Road e L'Onda Restaurant a Mentone, oltre a Salle Henri Monin a Gorbio. Considera la lista attuale solo dopo aver controllato il programma dell'organizzatore.", "Серед вказаних локацій є Espace Gravity, Studio M'Road і L'Onda Restaurant у Ментоні, а також Salle Henri Monin у Gorbio. Вважайте список актуальним лише після перевірки програми організатора."),
          t("For visitors, message or check before going: ask about the level, whether you need a partner, whether the class is followed by social dancing and whether the evening is mostly salsa, bachata, kizomba or mixed SBK.", "Pour les visiteurs, verifiez avant de partir : niveau, besoin d'un partenaire, danse sociale apres le cours et dominante salsa, bachata, kizomba ou SBK mixte.", "Per i visitatori, controlla prima di andare: livello, eventuale partner, social dopo la lezione e se la serata e soprattutto salsa, bachata, kizomba o SBK misto.", "Гостям варто перевірити наперед: рівень, чи потрібен партнер, чи є social dancing після заняття, і чи вечір більше salsa, bachata, kizomba або mixed SBK."),
        ],
        relatedPlaceIds: ["axess-dance-menton", "espace-gravity-menton", "studio-mroad-menton", "londa-restaurant-menton", "salle-henri-monin-gorbio"],
      },
      {
        heading: t("SBK nights in Menton", "Soirees SBK a Menton", "Serate SBK a Mentone", "SBK-вечори в Ментоні"),
        body: [
          t("Menton sometimes appears in regional SBK calendars. If a local evening is scheduled during your stay, choose it first: there is no late train, no taxi problem and no need to turn the night into a full excursion.", "Menton apparait parfois dans les agendas SBK regionaux. Si une soiree locale est prevue pendant votre sejour, choisissez-la d'abord : pas de dernier train, pas de taxi et pas besoin d'en faire une grande sortie.", "Mentone compare talvolta nei calendari SBK regionali. Se c'e una serata locale nelle tue date, sceglila per prima: niente ultimo treno, niente taxi e niente grande spostamento.", "Ментон іноді з'являється в регіональних SBK-календарях. Якщо локальний вечір є у ваші дати, обирайте його першим: без останнього потяга, таксі й великої поїздки."),
          t("Salsa06 and organiser social posts are useful for current listings. Venue, DJ, level and even the day of the week can change, so use guide pages as orientation, not as a fixed timetable.", "Salsa06 et les reseaux des organisateurs sont utiles pour les annonces actuelles. Lieu, DJ, niveau et jour peuvent changer : utilisez le guide comme orientation, pas comme horaire fixe.", "Salsa06 e i social degli organizzatori sono utili per le liste aggiornate. Sede, DJ, livello e giorno possono cambiare: usa la guida come orientamento, non come orario fisso.", "Salsa06 і соцмережі організаторів корисні для актуальних анонсів. Локація, DJ, рівень і навіть день можуть змінюватися, тому гід - це орієнтир, не фіксований розклад."),
        ],
        relatedPlaceIds: ["alls-stars-menton", "axess-dance-menton"],
      },
      {
        heading: t("Monaco: event-based Latin dance weekends", "Monaco : week-ends danse latine evenementiels", "Monaco: weekend latini legati agli eventi", "Монако: подієві Latin dance weekends"),
        body: [
          t("Monaco is close to Menton, but its Latin dance scene is better treated as event-based than weekly casual. Monaco Salsa Congress is the main name to watch, with salsa, bachata and kizomba classes, shows and DJ parties when an edition is running.", "Monaco est proche de Menton, mais sa scene latine fonctionne davantage par evenements que par soirees hebdomadaires. Monaco Salsa Congress est le nom principal a surveiller, avec cours, shows et DJ parties quand une edition a lieu.", "Monaco e vicino a Mentone, ma la scena latina funziona piu per eventi che per serate settimanali. Monaco Salsa Congress e il nome principale da seguire, con corsi, show e DJ party quando c'e un'edizione.", "Монако близько до Ментона, але його Latin dance сцена радше подієва, ніж щотижнева. Monaco Salsa Congress - головна назва для перевірки: заняття, show і DJ parties, коли проходить випуск."),
          t("If you go from Menton, plan the return before you leave. Late-night trains may be limited, especially after long congress evenings.", "Depuis Menton, planifiez le retour avant de partir. Les trains tardifs peuvent etre limites, surtout apres les longues soirees de congres.", "Da Mentone, pianifica il rientro prima di partire. I treni notturni possono essere limitati, soprattutto dopo lunghe serate di congresso.", "Якщо їдете з Ментона, сплануйте повернення до виїзду. Пізні потяги можуть бути обмежені, особливо після довгих congress-вечорів."),
        ],
        relatedPlaceIds: ["espace-leo-ferre-monaco", "monaco-monte-carlo", "monaco-monte-carlo-station"],
      },
      {
        heading: t("Nice: the strongest nearby weekly scene", "Nice : la scene hebdomadaire la plus forte", "Nizza: la scena settimanale piu forte", "Ніцца: найсильніша щотижнева сцена поруч"),
        body: [
          t("If your priority is dancing, Nice usually gives the best chance of a proper Latin social night near Menton. There are more schools, bars and recurring socials than in smaller coastal towns.", "Si votre priorite est de danser, Nice donne generalement les meilleures chances de trouver une vraie soiree latine pres de Menton. Il y a plus d'ecoles, de bars et de rendez-vous recurrents.", "Se la priorita e ballare, Nizza offre di solito la migliore probabilita di una vera serata latina vicino a Mentone. Ci sono piu scuole, bar e social ricorrenti.", "Якщо головна мета - танці, Ніцца зазвичай дає найкращий шанс на повноцінний Latin social night біля Ментона. Тут більше шкіл, барів і регулярних social-вечорів."),
          t("The trade-off is transport. Nice is easy by train in the daytime and early evening, but a social ending at 1 or 2 a.m. needs a last-train check, taxi plan or an early exit.", "La contrepartie, c'est le transport. Nice est simple en train en journee et debut de soiree, mais une soiree finissant a 1h ou 2h demande verification du dernier train, taxi ou depart plus tot.", "Il compromesso e il trasporto. Nizza e facile in treno di giorno e a inizio sera, ma un social che finisce all'1 o alle 2 richiede ultimo treno, taxi o uscita anticipata.", "Компроміс - транспорт. До Ніцци легко дістатися потягом удень і на початку вечора, але social до 1-2 ночі потребує перевірки останнього потяга, плану таксі або раннього виходу."),
        ],
        relatedPlaceIds: ["nice-palais-de-justice", "nice-old-town", "nice-ville-station"],
      },
      {
        heading: t("Sanremo and Breil-sur-Roya", "Sanremo et Breil-sur-Roya", "Sanremo e Breil-sur-Roya", "Sanremo та Breil-sur-Roya"),
        body: [
          t("Sanremo is useful when a congress or Afro-Latin weekend overlaps with your dates. Treat published listings as leads to verify, especially for past or next-edition dates.", "Sanremo est utile lorsqu'un congres ou week-end Afro-Latin tombe sur vos dates. Traitez les annonces comme des pistes a verifier, surtout pour les dates passees ou prochaines editions.", "Sanremo e utile quando un congresso o weekend Afro-Latin coincide con le tue date. Tratta le liste come piste da verificare, soprattutto per date passate o prossime edizioni.", "Sanremo корисне, якщо congress або Afro-Latin weekend збігається з вашими датами. Анонси варто сприймати як привід для перевірки, особливо для минулих або наступних випусків."),
          t("Breil-sur-Roya is a more niche idea: tourism-office listings have mentioned salsa classes there, but it is not the first choice for a simple dance night from Menton.", "Breil-sur-Roya est une idee plus specifique : des annonces touristiques ont mentionne des cours de salsa, mais ce n'est pas le premier choix pour une simple soiree danse depuis Menton.", "Breil-sur-Roya e un'idea piu di nicchia: alcune liste turistiche hanno citato corsi di salsa, ma non e la prima scelta per una semplice serata di ballo da Mentone.", "Breil-sur-Roya - більш нішевий варіант: туристичні анонси згадували там salsa classes, але це не перший вибір для простого dance night з Ментона."),
        ],
        relatedPlaceIds: ["sanremo", "grand-hotel-des-anglais-sanremo", "breil-sur-roya"],
      },
      {
        heading: t("Staying in Menton as a Latin dance lover", "Loger a Menton quand on aime danser", "Soggiornare a Mentone se ami ballare", "Жити в Ментоні, якщо любите Latin dance"),
        body: [
          t("Menton works well when Latin dancing is one part of the stay, not the only purpose of the trip. You can keep the sea, old town and restaurants as the base, then add one local SBK night, one Monaco event or one Nice social.", "Menton fonctionne bien quand la danse latine fait partie du sejour sans en etre le seul but. Gardez la mer, la vieille ville et les restaurants comme base, puis ajoutez une soiree SBK locale, un evenement a Monaco ou une soiree a Nice.", "Mentone funziona bene quando i balli latini sono una parte del soggiorno, non l'unico scopo. Tieni mare, centro storico e ristoranti come base, poi aggiungi una serata SBK locale, un evento a Monaco o un social a Nizza.", "Ментон добре працює, коли Latin dancing - частина подорожі, а не єдина мета. Морe, старе місто й ресторани залишаються базою, а до них можна додати один локальний SBK-вечір, подію в Монако або social у Ніцці."),
          t("If dancing matters to your trip, check event calendars before choosing dates, especially outside the September-June class season.", "Si la danse compte pour votre voyage, verifiez les calendriers avant de choisir vos dates, surtout hors saison de cours septembre-juin.", "Se ballare e importante per il viaggio, controlla i calendari prima di scegliere le date, soprattutto fuori dalla stagione corsi settembre-giugno.", "Якщо танці важливі для поїздки, перевірте календарі до вибору дат, особливо поза сезоном занять вересень-червень."),
        ],
        relatedPlaceIds: ["menton-station"],
      },
    ],
    practicalTips: [
      t("Check the organiser's current Instagram, Facebook or website post during the same week, ideally the same day.", "Verifiez le post actuel de l'organisateur sur Instagram, Facebook ou son site la meme semaine, idealement le jour meme.", "Controlla il post aggiornato dell'organizzatore su Instagram, Facebook o sito nella stessa settimana, meglio lo stesso giorno.", "Перевіряйте актуальний пост організатора в Instagram, Facebook або на сайті того ж тижня, бажано того ж дня."),
      t("Confirm start time, level, booking rules, entry price and whether the evening is salsa, bachata, kizomba or mixed SBK.", "Confirmez horaire, niveau, reservation, tarif et dominante salsa, bachata, kizomba ou SBK mixte.", "Conferma orario, livello, prenotazione, prezzo e se la serata e salsa, bachata, kizomba o SBK mista.", "Підтвердіть час, рівень, бронювання, вартість і чи це salsa, bachata, kizomba або mixed SBK."),
      t("For Nice, Monaco or Sanremo nights, check your return before leaving Menton.", "Pour Nice, Monaco ou Sanremo, verifiez le retour avant de quitter Menton.", "Per Nizza, Monaco o Sanremo, controlla il rientro prima di lasciare Mentone.", "Для Ніцци, Монако або Sanremo перевіряйте повернення до виїзду з Ментона."),
      t("Wear comfortable shoes with a smooth sole; avoid beach flip-flops if you plan to dance properly.", "Portez des chaussures confortables a semelle lisse; evitez les tongs de plage si vous voulez vraiment danser.", "Indossa scarpe comode con suola liscia; evita infradito da spiaggia se vuoi ballare davvero.", "Візьміть зручне взуття з гладкою підошвою; пляжні шльопанці не підходять для нормальних танців."),
    ],
  }),
  shortArticle({
    id: "shisha-hookah-near-menton",
    slug: "shisha-hookah-near-menton",
    title: t(
      "Shisha and hookah near Menton: lounges, terraces and evening spots",
      "Chicha et hookah à proximité de Menton : lounges, terrasses et idées de soirée",
      "Shisha e hookah vicino a Mentone: lounge, terrazze e uscite serali",
      "Шиша і кальян біля Ментона: лаунжі, тераси й вечірні варіанти",
    ),
    seoTitle: t(
      "Shisha and Hookah Near Menton: Lounges, Terraces and Evening Spots",
      "Chicha et hookah à Menton : lounges, terrasses et sorties soir",
      "Shisha e hookah vicino a Mentone: lounge, terrazze e serate",
      "Шиша і кальян біля Ментона: лаунжі, тераси й вечірні зони",
    ),
    seoDescription: t(
      "A practical adult-only guide to shisha and hookah near Menton with local Menton options, Monaco terrace venues and key Nice alternatives.",
      "Guide pratique adultes pour la chicha et le hookah près de Menton avec options locales à Menton, terrasses de Monaco et alternatives à Nice.",
      "Guida pratica per adulti su shisha e hookah vicino a Mentone con opzioni locali, lounge di Monaco e alternative a Nizza.",
      "Практичний гід для повнолітніх про шишу та кальян поблизу Ментона: локальні варіанти, терраси Монако та корисні альтернативи в Ніцці.",
    ),
    excerpt: t(
      "Menton has a small shisha scene with one clear dedicated venue, while Monaco and Nice offer wider nightlife options. Use current programme checks before going.",
      "Menton a une scene chicha réduite autour d'adresses précises; Monaco et Nice offrent plus de choix. Verifiez toujours les programmations actuelles avant de sortir.",
      "Menton ha una scena shisha più piccola e alcune opzioni chiare, mentre Monaco e Nizza offrono più scelta. Controlla sempre programmi e disponibilità prima di uscire.",
      "У Ментоні невелика сцена кальяну з кількома конкретними адресами, а Монако й Ніцца дають більший вибір. Перевіряйте актуальні програми перед виходом.",
    ),
    category: "nightlife-drinks",
    coverImage: "/images/guide/shisha-hookah-near-menton.png",
    coverImageAlt: t(
      "Adult evening spots for shisha and hookah near Menton, including coastal and city options",
      "Lieux d'animation adultes de chicha et hookah autour de Menton, entre côtes et villes voisines",
      "Luoghi serali per adulti tra shisha e hookah vicino a Mentone, tra costa e città vicine",
      "Вечірні локації для шиші та кальяну біля Ментона, від терас до міських варіантів",
    ),
    visualTheme: "nightlife",
    visualStatus: "project_illustration",
    tags: [
      t("shisha", "chicha", "shisha", "кальян"),
      t("hookah", "hookah", "hookah", "hookah"),
      t("adults", "adultes", "adulti", "дорослі"),
      t("Monaco", "Monaco", "Monaco", "Монако"),
      t("Nice", "Nice", "Nizza", "Ніцца"),
    ],
    bestFor: [guideBestForOptions[0].label, guideBestForOptions[6].label],
    duration: "evening",
    locationTags: ["menton-centre", "monaco", "nice"],
    sourceStatus: "needs_verification",
    relatedPlaces: [
      "hookah-lounge-menton",
      "londa-restaurant-menton",
      "corner-house-menton",
      "blue-gin-monaco",
      "twiga-monte-carlo",
      "buddha-bar-monte-carlo",
      "chichkhan-lounge-nice",
      "pacific-nice",
      "soho-hookah-bar-lounge-nice",
      "le-ryad-zaman-nice",
    ],
    relatedArticles: [
      "nightlife-in-menton",
      "casinos-near-menton",
      "jazz-live-music-near-menton",
      "latin-dancing-salsa-bachata-menton",
      "monaco-events-from-menton",
      "public-transport-in-menton",
      "day-trips-from-menton",
      "where-to-stay-in-menton",
      "bars-and-beer-in-menton",
      "quiet-evening-in-menton",
    ],
    relatedApartments: allApartments,
    sections: [
      {
        heading: t(
          "Shisha near Menton: what to expect",
          "La chicha près de Menton : à quoi s'attendre",
          "Shisha vicino a Mentone: cosa aspettarsi",
          "Шиша біля Ментона: чого чекати",
        ),
        body: [
          t(
            "Menton is not a huge dedicated shisha city, so expectations should be realistic. One clear local venue is easiest for first-timers, while Monaco and Nice are useful for larger group plans and a wider nightly rhythm.",
            "Menton n'est pas une grande ville de chicha : mieux garder des attentes réalistes. Une adresse locale claire convient aux débutants, tandis que Monaco et Nice sont utiles pour de plus grands plans de groupe.",
            "Menton non e una grande città di shisha: è meglio avere aspettative realistiche. Per i primi, una sola tappa locale chiara è più pratica, mentre Monaco e Nizza aiutano per programmi in gruppo e serate più strutturate.",
            "Ментон не є великою місткістю кальянної сцени, тому варто тримати реалістичні очікування. Для першого знайомства зручно почати з однієї локальної адреси, а Монако і Ніцца - для групових планів.",
          ),
          t(
            "This is an adult-oriented guide. Verify all hours, indoor/outdoor settings and current availability before leaving your apartment.",
            "Ce guide est orienté adultes. Vérifiez les horaires, la zone ouverte/fermée et la disponibilité avant de sortir.",
            "Questa è una guida per adulti. Verifica sempre orari, apertura interna/esterna e disponibilità prima di uscire.",
            "Це гід для дорослих. Перед виходом перевіряйте години роботи, формат (всередині/на вулиці) і наявність послуг.",
          ),
        ],
      },
      {
        heading: t("Hookah Lounge Menton", "Hookah Lounge Menton", "Hookah Lounge Menton", "Hookah Lounge Menton"),
        body: [
          t(
            "This is the clearest dedicated Menton reference: a bar and tapas venue with an explicit hookah profile and a practical evening setting on the promenade.",
            "C'est la référence locale la plus claire : bar à tapas et chicha avec une adresse cohérente sur la Promenade du Soleil.",
            "Questo e il riferimento locale più chiaro: bar e tapas con identità hookah esplicita, in una posizione comoda sulla Promenade du Soleil.",
            "Це найбільш зрозуміла локальна адреса: bar/тапи-бар із чітким профілем hookah на Промена́ді ду Сульйо.",
          ),
          t(
            "For apartment guests, this keeps the evening simple: dinner, one evening session and a direct return without overnight logistics.",
            "Pour les guests d'appartements, cela reste simple : dîner, une session et retour direct sans logistique nocturne.",
            "Per chi alloggia in appartamento funziona in modo semplice: cena, una sessione serale e ritorno diretto, senza logistica notturna complessa.",
            "Для гостей апартаментів це зручний варіант: вечеря, коротка сесія і безпосереднє повернення без складної нічної логістики.",
          ),
        ],
        relatedPlaceIds: ["hookah-lounge-menton"],
      },
      {
        heading: t("Monaco luxury and terrace options", "Options luxe de Monaco et terrasses", "Opzioni premium a Monaco e terrazze", "Преміум-варіанти Монако та тераси"),
        body: [
          t(
            "For a more upmarket evening, Blue Gin, Twiga and Buddha-Bar remain the strongest Monaco options to check when planning with dates in hand.",
            "Pour une soirée plus premium, Blue Gin, Twiga e Buddha-Bar sont les adresses de Monaco à vérifier selon vos dates.",
            "Per una serata più premium, Blue Gin, Twiga e Buddha-Bar sono le opzioni più forti di Monaco, da verificare in base alle date.",
            "Для більш преміального вечора основні варіанти в Монако - Blue Gin, Twiga та Buddha-Bar - перевіряйте залежно від дат.",
          ),
          t(
            "These are usually higher-budget venues, often reservation-based and more transport-sensitive for return planning from Menton.",
            "Ce sont en général des adresses premium, souvent sur réservation, donc la logistique retour depuis Menton compte énormément.",
            "Di solito sono locali più costosi, spesso con prenotazione, quindi pianificare bene il ritorno verso Menton.",
            "Зазвичай це вищий ціновий сегмент із обов'язковим бронюванням, тому на повернення з Ментона треба плануватися заздалегідь.",
          ),
        ],
        relatedPlaceIds: ["blue-gin-monaco", "twiga-monte-carlo", "buddha-bar-monte-carlo"],
      },
      {
        heading: t("Nice wider choice", "Choix plus larges à Nice", "Scelta più ampia a Nizza", "Більший вибір у Ніцці"),
        body: [
          t(
            "When Menton is too limited, Nice gives more reliable variety for a shisha evening and a wider age mix of music, lounges and late options.",
            "Quand Menton semble trop limité, Nizza propose plus de choix pour une soirée chicha et des lieux adaptés à différents profils.",
            "Quando Menton è troppo limitato, Nizza offre più varietà per una serata shisha e opzioni più ampie di musica, lounge e tempi serali.",
            "Коли Ментона замало, Ніцца дає кращу варіативність: більше форматів, музики та більш пізнього часу.",
          ),
          t(
            "CHICHKHAN, Pacific and Soho are the strongest practical starts in Nice; always check late transport before choosing them for a Menton-based plan.",
            "CHICHKHAN, Pacific et Soho restent les meilleurs points de départ à Nice; vérifiez toujours les transports nocturnes avant de les choisir.",
            "CHICHKHAN, Pacific e Soho sono i punti più utili a Nizza; controlla sempre i trasporti notturni prima di programmare da Menton.",
            "Найбільш практичні в Ніцці варіанти - CHICHKHAN, Pacific, Soho; перед планом з Ментона обов'язково перевіряйте пізні потяги.",
          ),
        ],
        relatedPlaceIds: ["chichkhan-lounge-nice", "pacific-nice", "soho-hookah-bar-lounge-nice", "le-ryad-zaman-nice"],
      },
      {
        heading: t("What to do before you go", "Avant de partir : contrôle pratique", "Cosa verificare prima di uscire", "Що перевірити перед виходом"),
        body: [
          t(
            "Call or confirm directly through the latest official or venue post: open status, terrace access, whether hookah is active, minimum spend and reservation terms.",
            "Vérifiez par appel ou message via le dernier post officiel/venue: statut d'ouverture, terrasse, disponibilite chicha, spend minimum et regles de reservation.",
            "Conferma via telefono o canali ufficiali: apertura, accesso terrazza, presenza hookah, ticket minimo e eventuali regole di prenotazione.",
            "Перевірте безпосередньо: чи відкрито, чи є тераса, чи працює кальян, мінімальний чек і умови бронювання.",
          ),
          t(
            "Keep one apartment-oriented return plan: choose a location you can leave early if needed, especially in summer evenings.",
            "Gardez un plan orienté retour appartement : choisissez un lieu qui permet de partir plus tôt si besoin, surtout en été.",
            "Mantieni un piano orientato al rientro in appartamento: scegli un luogo da cui puoi chiudere in anticipo se serve, soprattutto d'estate.",
            "Працюйте з планом повернення в апартаменти: обирайте місце, з якого можна вчасно повернутися, особливо влітку.",
          ),
        ],
      },
      {
        heading: t(
          "Choose by trip style",
          "Choisir selon le type de voyage",
          "Scegliere per stile di viaggio",
          "Вибирайте за стилем поїздки",
        ),
        body: [
          t(
            "If you want the quietest local option, start with Hookah Lounge Menton and avoid a long drive back-home.",
            "Si vous voulez l'option la plus proche de Menton, commencez par Hookah Lounge Menton et évitez un retour tardif compliqué.",
            "Se vuoi una soluzione semplice vicino a Menton, inizia da Hookah Lounge Menton e riduci i rischi di ritorno.",
            "Для спокійного і зручного варіанту починайте з Hookah Lounge Menton, щоб уникнути складного повернення.",
          ),
          t(
            "If your style is premium, go Monaco terrace-side in a short, pre-planned window. If you want more variety, shift to Nice and choose one city by return logistics.",
            "Pour un style premium, choisissez une créneau court et préparé à Monaco en terrasse. Si vous voulez plus de variété, optez pour Nizza selon la logistique de retour.",
            "Se vuoi un stile premium, scegli una finestra breve e pianificata a Monaco in terrazza. Se desideri più varietà, passa a Nizza in base alla logistica del rientro.",
            "Для преміум-сценарію обирайте Монако з чітким таймінгом; якщо потрібен більший вибір — підлаштовуйтеся під Ніццу з оглядом на повернення.",
          ),
        ],
      },
    ],
    practicalTips: [
      t("Use adult-appropriate timing and keep a backup plan for both location and transport.", "Gardez des horaires adultes et adaptes: une alternative de lieu et de transport.", "Usa orari pratici per adulti e preveda sempre un'alternativa di luogo e trasporto.", "Ведіть реалістичний таймінг: запасний варіант локації та транспорту."),
      t("Avoid late returns by checking the final train and taxi options before heading out.", "Evitez les retours forcés: vérifiez train et taxi avant de partir.", "Evita ritorni forzati: controlla treno e taxi prima di uscire.", "Уникайте ризиків із пізнім поверненням: перевірте останній потяг/таксі до виходу."),
      t("If smoking rules changed, respect venue guidance immediately.", "Si les regles tabac ont change, respectez tout de suite les consignes du venue.", "Se le regole tabacco cambiano, rispetta subito le regole del locale.", "За зміни правил куріння дійте за інструкціями конкретного закладу без винятків."),
    ],
  }),
  shortArticle({
    id: "jazz-live-music-near-menton",
    slug: "jazz-live-music-near-menton",
    title: t("Jazz near Menton: live jazz, music bars and Riviera festivals", "Jazz pres de Menton : bars live, lounges de Monaco et festivals Riviera", "Jazz vicino a Mentone: live jazz, music bar e festival della Riviera", "Jazz біля Ментона: live jazz, music bars і фестивалі Рив'єри"),
    seoTitle: t("Jazz Near Menton: Live Jazz Bars, Monaco Lounges, Nice Clubs and Riviera Festivals", "Jazz pres de Menton : bars live, lounges de Monaco et festivals Riviera", "Jazz vicino a Mentone: jazz bar, lounge di Monaco, club di Nizza e festival Riviera", "Jazz біля Ментона: live jazz bars, лаунжі Монако, клуби Ніцци й фестивалі Рив'єри"),
    seoDescription: t("A practical guide to jazz near Menton: where to hear live jazz, soul, funk and swing in Menton, Monaco and Nice, plus Jazz à Juan, Nice Jazz Fest and summer music tips.", "Guide pratique du jazz pres de Menton : jazz live, soul, funk et swing a Menton, Monaco et Nice, Jazz a Juan, Nice Jazz Fest et conseils d'ete.", "Guida pratica al jazz vicino a Mentone: live jazz, soul, funk e swing a Mentone, Monaco e Nizza, Jazz a Juan, Nice Jazz Fest e consigli estivi.", "Практичний гід по jazz біля Ментона: live jazz, soul, funk і swing у Ментоні, Монако й Ніцці, Jazz a Juan, Nice Jazz Fest і літні поради."),
    excerpt: t("Menton is not a big jazz-club city, but it is a good base for jazz lovers. Monaco has elegant live music lounges, Nice has real jazz bars, and the Riviera hosts major summer festivals.", "Menton n'est pas une grande ville de clubs de jazz, mais c'est une bonne base pour les amateurs de jazz. Monaco a des lounges elegants, Nice de vrais bars jazz et la Riviera de grands festivals d'ete.", "Mentone non e una grande citta di jazz club, ma e una buona base per chi ama il jazz. Monaco ha lounge eleganti, Nizza veri jazz bar e la Riviera grandi festival estivi.", "Ментон не є великим містом jazz clubs, але це добра база для любителів jazz. У Монако є елегантні live music lounges, у Ніцці - справжні jazz bars, а на Рив'єрі - великі літні фестивалі."),
    category: "nightlife-drinks",
    coverImage: "/images/guide/jazz-live-music-near-menton.jpg",
    coverImageAlt: t("Riviera evening jazz illustration near Menton", "Illustration d'une soiree jazz Riviera pres de Menton", "Illustrazione di una serata jazz in Riviera vicino a Mentone", "Ілюстрація вечірнього jazz на Рив'єрі біля Ментона"),
    visualTheme: "nightlife",
    visualStatus: "project_illustration",
    tags: [t("jazz", "jazz", "jazz", "jazz"), t("live music", "musique live", "musica live", "жива музика"), t("Monaco", "Monaco", "Monaco", "Монако"), t("Nice", "Nice", "Nizza", "Ніцца")],
    bestFor: [guideBestForOptions[0].label, guideBestForOptions[6].label, guideBestForOptions[10].label],
    duration: "evening",
    locationTags: ["menton-centre", "monaco", "nice"],
    sourceStatus: "needs_verification",
    relatedPlaces: ["palais-de-leurope-menton", "la-note-bleue-monaco", "bar-americain-monaco", "shapko-nice", "cave-romagnan-nice", "b-spot-nice", "theatre-de-verdure-nice", "pinede-gould-juan-les-pins", "monaco-monte-carlo", "nice-old-town", "menton-station", "monaco-monte-carlo-station", "nice-ville-station"],
    relatedArticles: ["nightlife-in-menton", "latin-dancing-salsa-bachata-menton", "casinos-near-menton", "theatre-opera-performing-arts-near-menton", "monaco-events-from-menton", "public-transport-in-menton", "day-trips-from-menton", "quiet-evening-in-menton", "where-to-stay-in-menton"],
    relatedEvents: ["menton-music-festival", "nice-jazz-fest", "jazz-a-juan"],
    relatedApartments: allApartments,
    sections: [
      {
        heading: t("Is there jazz in Menton?", "Y a-t-il du jazz a Menton ?", "C'e jazz a Mentone?", "Чи є jazz у Ментоні?"),
        body: [
          t("Menton is not the place for a guaranteed jazz club every night. It is a seaside town, not a large nightlife city.", "Menton n'est pas une ville ou l'on trouve un club de jazz garanti chaque soir. C'est une ville de bord de mer, pas une grande destination nightlife.", "Mentone non e il posto per un jazz club garantito ogni sera. E una citta di mare, non una grande capitale della notte.", "Ментон - не місце з гарантованим jazz club щовечора. Це морське місто, а не велика nightlife-столиця."),
          t("The useful approach is layered: check Menton for seasonal concerts and live music, Monaco for elegant jazz, soul and funk evenings, Nice for proper jazz bars, and the July festivals if your dates match.", "La bonne approche se fait par couches : Menton pour concerts saisonniers et musique live, Monaco pour des soirees jazz, soul et funk elegantes, Nice pour de vrais bars jazz, et les festivals de juillet si vos dates correspondent.", "L'approccio utile e a strati: Mentone per concerti stagionali e musica live, Monaco per serate eleganti jazz, soul e funk, Nizza per veri jazz bar e i festival di luglio se le date coincidono.", "Практичний підхід багатошаровий: Ментон для сезонних концертів і live music, Монако для елегантних jazz, soul і funk вечорів, Ніцца для справжніх jazz bars, і липневі фестивалі, якщо збігаються дати."),
          t("Always verify the current programme before travelling. Jazz evenings, jam sessions and live music schedules change often.", "Verifiez toujours le programme actuel avant de vous deplacer. Soirees jazz, jam sessions et horaires de musique live changent souvent.", "Controlla sempre il programma aggiornato prima di partire. Serate jazz, jam session e calendari live cambiano spesso.", "Завжди перевіряйте актуальну програму перед поїздкою. Jazz evenings, jam sessions і live music schedules часто змінюються."),
        ],
        relatedPlaceIds: ["palais-de-leurope-menton", "menton-station"],
        relatedApartmentKeys: allApartments,
      },
      {
        heading: t("Menton: start local, but check the programme", "Menton : commencer localement, mais verifier le programme", "Mentone: inizia sul posto, ma controlla il programma", "Ментон: почніть локально, але перевіряйте програму"),
        body: [
          t("For the easiest evening, check Menton's cultural calendar, Palais de l'Europe and current restaurant or bar listings. Local jazz here is usually seasonal or event-based rather than a fixed weekly club.", "Pour la soiree la plus simple, consultez le calendrier culturel de Menton, le Palais de l'Europe et les annonces actuelles des restaurants ou bars. Le jazz local y est plutot saisonnier ou evenementiel qu'un club hebdomadaire fixe.", "Per la serata piu semplice, controlla il calendario culturale di Mentone, il Palais de l'Europe e i programmi attuali di ristoranti o bar. Qui il jazz e di solito stagionale o legato agli eventi, non un club settimanale fisso.", "Для найпростішого вечора перевірте культурний календар Ментона, Palais de l'Europe і актуальні програми ресторанів або барів. Локальний jazz тут радше сезонний або подієвий, ніж регулярний щотижневий club."),
          t("This works well for guests who want a pleasant live-music evening without worrying about late trains or taxis from Nice.", "C'est ideal pour les voyageurs qui veulent une soiree musicale agreable sans se soucier des trains tardifs ou taxis depuis Nice.", "Funziona bene per ospiti che vogliono una serata live piacevole senza preoccuparsi di treni notturni o taxi da Nizza.", "Це добре для гостей, які хочуть приємний live-music evening без турбот про пізні потяги або таксі з Ніцци."),
        ],
        relatedPlaceIds: ["palais-de-leurope-menton"],
        relatedEventIds: ["menton-music-festival"],
      },
      {
        heading: t("Monaco: La Note Bleue and Bar Américain", "Monaco : La Note Bleue et Bar Americain", "Monaco: La Note Bleue e Bar Americain", "Монако: La Note Bleue і Bar Americain"),
        body: [
          t("La Note Bleue on Larvotto Beach is the nearby choice for a seaside dinner with jazz, soul, funk, Brazilian music or DJ sets depending on the night.", "La Note Bleue au Larvotto est l'option proche pour un diner en bord de mer avec jazz, soul, funk, musique bresilienne ou DJ sets selon le soir.", "La Note Bleue al Larvotto e la scelta vicina per una cena sul mare con jazz, soul, funk, musica brasiliana o DJ set secondo la serata.", "La Note Bleue на Larvotto - близький варіант для вечері біля моря з jazz, soul, funk, Brazilian music або DJ sets залежно від вечора."),
          t("Bar Américain at Hôtel de Paris Monte-Carlo is more polished: a classic cocktail lounge with live music and a Casino Square atmosphere. Dress smarter than beach casual.", "Le Bar Americain de l'Hotel de Paris Monte-Carlo est plus raffine : lounge cocktail classique, musique live et ambiance place du Casino. Habillez-vous plus soigneusement que pour la plage.", "Il Bar Americain dell'Hotel de Paris Monte-Carlo e piu elegante: cocktail lounge classico, musica live e atmosfera di Casino Square. Vestiti meglio che per la spiaggia.", "Bar Americain в Hôtel de Paris Monte-Carlo більш вишуканий: classic cocktail lounge, live music і атмосфера Casino Square. Одягайтеся охайніше, ніж на пляж."),
          t("Plan the return to Menton before leaving, especially outside the busiest summer evenings.", "Prevoyez le retour a Menton avant de partir, surtout hors des grandes soirees d'ete.", "Organizza il rientro a Mentone prima di partire, soprattutto fuori dalle serate estive piu frequentate.", "Сплануйте повернення до Ментона до виїзду, особливо поза найжвавішими літніми вечорами."),
        ],
        relatedPlaceIds: ["la-note-bleue-monaco", "bar-americain-monaco", "monaco-monte-carlo", "monaco-monte-carlo-station"],
      },
      {
        heading: t("Nice: the closest real jazz-bar feeling", "Nice : l'ambiance jazz bar la plus proche", "Nizza: il jazz bar piu vicino", "Ніцца: найближче відчуття справжнього jazz bar"),
        body: [
          t("Nice is the strongest nearby city for live jazz and late music. Shapko is useful for jazz, blues, soul and funk nights when the programme fits.", "Nice est la ville proche la plus forte pour jazz live et musique tardive. Shapko est utile pour les soirees jazz, blues, soul et funk quand le programme correspond.", "Nizza e la citta vicina piu forte per live jazz e musica serale. Shapko e utile per serate jazz, blues, soul e funk quando il programma coincide.", "Ніцца - найсильніше місто поруч для live jazz і вечірньої музики. Shapko корисний для jazz, blues, soul і funk, коли програма підходить."),
          t("La Cave Romagnan is more intimate and local, often a better fit for serious jazz listeners. B Spot is worth checking when you want a broader live-music evening in central Nice.", "La Cave Romagnan est plus intime et locale, souvent plus adaptee aux vrais amateurs de jazz. B Spot vaut la peine d'etre verifie pour une soiree live plus large au centre de Nice.", "La Cave Romagnan e piu intima e locale, spesso piu adatta agli ascoltatori jazz seri. B Spot vale un controllo per una serata live piu ampia nel centro di Nizza.", "La Cave Romagnan більш камерна й локальна, часто краще пасує серйозним слухачам jazz. B Spot варто перевірити для ширшого live-music evening у центрі Ніцци."),
          t("Nice evenings need transport discipline: check the last train before choosing a club night, or be ready for an earlier exit or taxi.", "Les soirees a Nice demandent de la discipline transport : verifiez le dernier train avant de choisir une soiree club, ou prevoyez depart plus tot ou taxi.", "Le serate a Nizza richiedono attenzione ai trasporti: controlla l'ultimo treno prima di scegliere una club night, oppure prevedi uscita anticipata o taxi.", "Вечори в Ніцці потребують транспортної дисципліни: перевірте останній потяг перед вибором club night або плануйте ранній вихід чи таксі."),
        ],
        relatedPlaceIds: ["shapko-nice", "cave-romagnan-nice", "b-spot-nice", "nice-old-town", "nice-ville-station"],
      },
      {
        heading: t("Summer festivals: Jazz à Juan and Nice Jazz Fest", "Festivals d'ete : Jazz a Juan et Nice Jazz Fest", "Festival estivi: Jazz a Juan e Nice Jazz Fest", "Літні фестивалі: Jazz a Juan і Nice Jazz Fest"),
        body: [
          t("If you are visiting in July, check Jazz à Juan in Juan-les-Pins and Nice Jazz Fest. They are bigger commitments than a Monaco or Nice bar night, but they are the strongest Riviera jazz moments of the season.", "Si vous venez en juillet, regardez Jazz a Juan a Juan-les-Pins et Nice Jazz Fest. C'est plus engageant qu'un bar a Monaco ou Nice, mais ce sont les grands moments jazz de la saison Riviera.", "Se visiti a luglio, controlla Jazz a Juan a Juan-les-Pins e Nice Jazz Fest. Richiedono piu organizzazione di un bar a Monaco o Nizza, ma sono i momenti jazz piu forti della stagione Riviera.", "Якщо ви приїжджаєте в липні, перевірте Jazz a Juan у Juan-les-Pins і Nice Jazz Fest. Це більші плани, ніж бар у Монако чи Ніцці, але це найсильніші jazz-моменти сезону на Рив'єрі."),
          t("For a festival evening from Menton, treat transport as part of the plan: check return trains, walking time from the venue and whether a late taxi is realistic.", "Pour une soiree festival depuis Menton, traitez le transport comme une partie du plan : trains retour, marche depuis le lieu et taxi tardif realiste.", "Per una serata festival da Mentone, considera il trasporto parte del piano: treni di ritorno, camminata dalla sede e taxi notturno realistico.", "Для festival evening з Ментона сприймайте транспорт як частину плану: зворотні потяги, шлях від майданчика і реалістичність пізнього таксі."),
        ],
        relatedPlaceIds: ["pinede-gould-juan-les-pins", "theatre-de-verdure-nice", "nice-ville-station", "menton-station"],
        relatedEventIds: ["jazz-a-juan", "nice-jazz-fest"],
      },
      {
        heading: t("Where to stay for jazz evenings", "Ou loger pour les soirees jazz", "Dove soggiornare per serate jazz", "Де зупинитися для jazz evenings"),
        body: [
          t("Menton works best when jazz is one part of a Riviera stay: beach days, quiet mornings, then one or two music evenings in Monaco, Nice or at a summer festival.", "Menton fonctionne tres bien quand le jazz fait partie d'un sejour Riviera : journees plage, matins calmes, puis une ou deux soirees musique a Monaco, Nice ou en festival d'ete.", "Mentone funziona meglio quando il jazz e una parte del soggiorno Riviera: giornate al mare, mattine tranquille, poi una o due serate musicali a Monaco, Nizza o a un festival estivo.", "Ментон добре працює, коли jazz - частина Riviera stay: пляжні дні, спокійні ранки, потім один-два музичні вечори в Монако, Ніцці або на літньому фестивалі."),
          t("A central seaside apartment keeps the everyday rhythm easy while leaving Monaco and Nice reachable by train. For late shows, always check return options before committing to the evening.", "Un appartement central pres de la mer garde le rythme quotidien simple tout en laissant Monaco et Nice accessibles en train. Pour les spectacles tardifs, verifiez toujours le retour avant de vous engager.", "Un appartamento centrale vicino al mare mantiene semplice il ritmo quotidiano e lascia Monaco e Nizza raggiungibili in treno. Per show tardivi, controlla sempre il ritorno prima di decidere.", "Центральні апартаменти біля моря роблять щоденний ритм простим, а Монако й Ніццу залишають доступними потягом. Для пізніх show завжди перевіряйте повернення до остаточного плану."),
        ],
        relatedPlaceIds: ["menton-station", "monaco-monte-carlo-station", "nice-ville-station"],
        relatedApartmentKeys: allApartments,
      },
    ],
    practicalTips: [
      t("Check the venue programme during the same week, ideally on the day of the evening.", "Verifiez le programme la meme semaine, idealement le jour meme.", "Controlla il programma nella stessa settimana, meglio il giorno stesso.", "Перевіряйте програму того ж тижня, бажано в день вечора."),
      t("Ask whether the evening is live jazz, lounge music, funk, soul or a DJ set before planning around it.", "Demandez si la soiree est jazz live, lounge, funk, soul ou DJ set avant de vous organiser autour.", "Chiedi se la serata e live jazz, lounge, funk, soul o DJ set prima di organizzarti.", "Уточніть, чи це live jazz, lounge music, funk, soul або DJ set, перш ніж будувати план."),
      t("For Nice, Juan-les-Pins or late Monaco nights, check return transport before leaving Menton.", "Pour Nice, Juan-les-Pins ou Monaco tard, verifiez le retour avant de quitter Menton.", "Per Nizza, Juan-les-Pins o Monaco tarda sera, controlla il ritorno prima di lasciare Mentone.", "Для Ніцци, Juan-les-Pins або пізнього Монако перевіряйте повернення до виїзду з Ментона."),
    ],
  }),
  shortArticle({
    id: "casinos-near-menton",
    slug: "casinos-near-menton",
    title: t("Casinos near Menton: Menton, Monte-Carlo and Riviera casino nights", "Casinos pres de Menton: Menton, Monte-Carlo et soirees casino Riviera", "Casino vicino a Mentone: Mentone, Monte-Carlo e serate Riviera", "Казино біля Ментона: Ментон, Монте-Карло й вечори Riviera"),
    seoTitle: t("Casinos Near Menton: Casino Barriere Menton, Monte-Carlo & Riviera Casino Nights", "Casinos pres de Menton: Casino Barriere Menton, Monte-Carlo et soirees Riviera", "Casino vicino a Mentone: Casino Barriere Menton, Monte-Carlo e serate Riviera", "Казино біля Ментона: Casino Barriere Menton, Monte-Carlo і вечори Riviera"),
    seoDescription: t("A practical guide to casinos near Menton: Casino Barriere Menton, Casino de Monte-Carlo, Casino Cafe de Paris, dress codes, ID rules, transport tips and responsible gaming.", "Guide pratique des casinos pres de Menton: Casino Barriere Menton, Casino de Monte-Carlo, Casino Cafe de Paris, tenue, piece d'identite, transport et jeu responsable.", "Guida pratica ai casino vicino a Mentone: Casino Barriere Menton, Casino de Monte-Carlo, Casino Cafe de Paris, dress code, documenti, trasporti e gioco responsabile.", "Практичний гід казино біля Ментона: Casino Barriere Menton, Casino de Monte-Carlo, Casino Cafe de Paris, dress code, документи, транспорт і відповідальна гра."),
    excerpt: t("Menton has its own seaside casino, while Monaco's legendary Casino Square is only a short train ride away. Here is how to plan a casino evening without stress.", "Menton a son casino en bord de mer, tandis que la mythique place du Casino de Monaco est a un court trajet en train. Voici comment organiser une soiree casino sans stress.", "Mentone ha il suo casino sul mare, mentre la leggendaria Casino Square di Monaco e a breve distanza in treno. Ecco come organizzare una serata casino senza stress.", "У Ментона є власне казино на набережній, а легендарна Casino Square у Монако лише за коротку поїздку потягом. Ось як спланувати casino-вечір без стресу."),
    category: "nightlife-drinks",
    coverImage: "/images/guide/casinos-near-menton.jpg",
    coverImageAlt: t("Casino evening near Menton and Monte-Carlo", "Soiree casino pres de Menton et Monte-Carlo", "Serata casino vicino a Mentone e Monte-Carlo", "Casino-вечір біля Ментона й Монте-Карло"),
    visualTheme: "nightlife",
    visualStatus: "project_illustration",
    tags: [t("casino", "casino", "casino", "казино"), t("Monaco", "Monaco", "Monaco", "Монако"), t("nightlife", "soiree", "sera", "вечір"), t("smart casual", "smart casual", "smart casual", "smart casual")],
    bestFor: [guideBestForOptions[0].label, guideBestForOptions[6].label],
    duration: "evening",
    locationTags: ["menton-centre", "seafront", "monaco"],
    sourceStatus: "needs_verification",
    relatedPlaces: ["casino-barriere-menton", "casino-de-monte-carlo", "casino-cafe-de-paris", "casino-square-monaco", "menton-station", "monaco-monte-carlo-station", "monaco-monte-carlo", "promenade-du-soleil"],
    relatedArticles: ["jazz-live-music-near-menton", "latin-dancing-salsa-bachata-menton", "nightlife-in-menton", "monaco-events-from-menton", "day-trips-from-menton", "menton-without-a-car", "public-transport-in-menton", "theatre-opera-performing-arts-near-menton", "wine-tasting-near-menton", "michelin-restaurants-menton-nice-monaco", "quiet-evening-in-menton"],
    relatedEvents: ["monaco-grand-prix", "monaco-yacht-show", "monaco-e-prix", "rolex-monte-carlo-masters"],
    relatedApartments: allApartments,
    sections: [
      {
        heading: t("A casino evening from Menton", "Une soiree casino depuis Menton", "Una serata casino da Mentone", "Casino-вечір з Ментона"),
        body: [
          t(
            "A casino night on the Riviera works best as a polished after-dinner plan, not as a Las Vegas-style programme. From Menton, you can keep it simple at Casino Barriere Menton or take the train to Monte-Carlo for the classic Casino Square atmosphere.",
            "Une soiree casino sur la Riviera fonctionne mieux comme une sortie soignee apres le diner, pas comme un programme facon Las Vegas. Depuis Menton, vous pouvez rester simple au Casino Barriere Menton ou prendre le train vers Monte-Carlo pour l'ambiance classique de la place du Casino.",
            "Una serata casino in Riviera funziona meglio come uscita curata dopo cena, non come programma stile Las Vegas. Da Mentone puoi restare sul semplice al Casino Barriere Menton o prendere il treno per Monte-Carlo e vivere l'atmosfera classica di Casino Square.",
            "Casino-вечір на Рив'єрі найкраще працює як охайний план після вечері, а не як програма в стилі Las Vegas. З Ментона можна залишитися поруч у Casino Barriere Menton або поїхати потягом до Monte-Carlo за класичною атмосферою Casino Square.",
          ),
          t(
            "For most guests, the easiest choice is Menton's own casino. For architecture, glamour and a special-occasion feeling, choose Casino de Monte-Carlo. For a more modern Monaco gaming room, Casino Cafe de Paris is usually the more relaxed option.",
            "Pour la plupart des voyageurs, le choix le plus facile est le casino de Menton. Pour l'architecture, le glamour et une impression d'occasion speciale, choisissez le Casino de Monte-Carlo. Pour une salle de jeu monégasque plus moderne, le Casino Cafe de Paris est souvent l'option plus detendue.",
            "Per la maggior parte degli ospiti, la scelta piu facile e il casino di Mentone. Per architettura, glamour e atmosfera da occasione speciale, scegli Casino de Monte-Carlo. Per una sala da gioco monegasca piu moderna, Casino Cafe de Paris e di solito l'opzione piu rilassata.",
            "Для більшості гостей найпростіший вибір - казино в Ментоні. За архітектурою, glamour і відчуттям особливого вечора обирайте Casino de Monte-Carlo. Для сучаснішої gaming room у Монако зазвичай спокійніший варіант - Casino Cafe de Paris.",
          ),
        ],
        relatedPlaceIds: ["casino-barriere-menton", "casino-de-monte-carlo", "casino-cafe-de-paris", "casino-square-monaco"],
      },
      {
        heading: t("Quick recommendations", "Choix rapides", "Scelte rapide", "Швидкий вибір"),
        body: [
          t("Use this as the short version before choosing the full evening plan.", "Utilisez ceci comme version courte avant de choisir le plan de soiree complet.", "Usa questa come versione breve prima di scegliere il piano completo della serata.", "Використайте це як коротку версію перед вибором повного вечірнього плану."),
        ],
        bullets: [
          t("Easiest casino night: Casino Barriere Menton.", "Soiree casino la plus simple : Casino Barriere Menton.", "Serata casino piu semplice: Casino Barriere Menton.", "Найпростіший casino-вечір: Casino Barriere Menton."),
          t("Most iconic: Casino de Monte-Carlo.", "Le plus iconique : Casino de Monte-Carlo.", "Il piu iconico: Casino de Monte-Carlo.", "Найзнаковіше: Casino de Monte-Carlo."),
          t("Modern Monaco option: Casino Cafe de Paris.", "Option monégasque plus moderne : Casino Cafe de Paris.", "Opzione moderna a Monaco: Casino Cafe de Paris.", "Сучасний варіант у Монако: Casino Cafe de Paris."),
          t("Bring valid passport or national photo ID, and avoid beachwear, flip-flops and sportswear.", "Prenez un passeport ou une piece d'identite nationale avec photo, et evitez tenue de plage, tongs et vetements de sport.", "Porta passaporto o documento nazionale con foto, ed evita abbigliamento da spiaggia, infradito e sportivo.", "Візьміть паспорт або національний документ з фото; уникайте пляжного одягу, в'єтнамок і спортивного стилю."),
        ],
      },
      {
        heading: t("Casino Barriere Menton", "Casino Barriere Menton", "Casino Barriere Menton", "Casino Barriere Menton"),
        body: [
          t(
            "Casino Barriere Menton is the low-friction choice: central, seaside, and close to Promenade du Soleil, Plage du Casino and the apartment side of town. It suits a casual couple evening, a rainy evening, or a drink and small gaming budget after dinner.",
            "Le Casino Barriere Menton est le choix sans complication : central, en bord de mer, proche de la Promenade du Soleil, de la Plage du Casino et du cote appartements. Il convient pour une soiree en couple, un soir de pluie ou un verre avec petit budget jeu apres le diner.",
            "Casino Barriere Menton e la scelta piu semplice: centrale, sul mare, vicino a Promenade du Soleil, Plage du Casino e alla zona degli appartamenti. Va bene per una serata di coppia, una sera di pioggia o un drink con piccolo budget gioco dopo cena.",
            "Casino Barriere Menton - найпростіший варіант: центр, набережна, поруч Promenade du Soleil, Plage du Casino і район апартаментів. Підійде для вечора удвох, дощового вечора або напою й невеликого gaming-бюджету після вечері.",
          ),
          t(
            "Check current opening hours and events before relying on it. Entry rules can include age checks, ID checks and refusal if dress or behaviour is not appropriate.",
            "Verifiez les horaires et evenements actuels avant de vous organiser. Les regles d'entree peuvent inclure controle d'age, piece d'identite et refus si la tenue ou le comportement ne convient pas.",
            "Controlla orari ed eventi aggiornati prima di organizzarti. Le regole d'ingresso possono includere controllo eta, documento e rifiuto se abbigliamento o comportamento non sono adeguati.",
            "Перевіряйте актуальні години й події перед плануванням. Правила входу можуть включати перевірку віку, документів і відмову, якщо одяг або поведінка не відповідають очікуванням.",
          ),
        ],
        relatedPlaceIds: ["casino-barriere-menton", "plage-casino", "promenade-du-soleil"],
      },
      {
        heading: t("Casino de Monte-Carlo", "Casino de Monte-Carlo", "Casino de Monte-Carlo", "Casino de Monte-Carlo"),
        body: [
          t(
            "Casino de Monte-Carlo is the classic special-occasion choice: Belle Epoque architecture, famous gaming rooms and the full Casino Square setting. It is also more formal, so plan clothes and documents before leaving Menton.",
            "Le Casino de Monte-Carlo est le choix classique pour une occasion speciale : architecture Belle Epoque, salles de jeu celebres et decor complet de la place du Casino. Il est aussi plus formel, donc prevoyez tenue et documents avant de quitter Menton.",
            "Casino de Monte-Carlo e la scelta classica per un'occasione speciale: architettura Belle Epoque, sale da gioco famose e tutto il contesto di Casino Square. E anche piu formale, quindi prepara abiti e documenti prima di lasciare Mentone.",
            "Casino de Monte-Carlo - класичний вибір для особливого вечора: архітектура Belle Epoque, знамениті зали й повна атмосфера Casino Square. Це також формальніший варіант, тож продумайте одяг і документи до виїзду з Ментона.",
          ),
          t(
            "The official casino pages should be checked for current visiting hours, games, access rules and dress code. Treat online summaries as planning help, not as a substitute for current rules.",
            "Les pages officielles du casino doivent etre verifiees pour les horaires, jeux, regles d'acces et tenue actuels. Utilisez les resumes en ligne comme aide a la preparation, pas comme remplacement des regles a jour.",
            "Le pagine ufficiali del casino vanno controllate per orari, giochi, accesso e dress code aggiornati. Considera i riassunti online come aiuto alla pianificazione, non come sostituto delle regole attuali.",
            "Офіційні сторінки казино варто перевіряти щодо актуальних годин, ігор, правил доступу й dress code. Онлайн-резюме сприймайте як допомогу для планування, а не заміну чинних правил.",
          ),
        ],
        relatedPlaceIds: ["casino-de-monte-carlo", "casino-square-monaco", "monaco-monte-carlo"],
      },
      {
        heading: t("Casino Cafe de Paris", "Casino Cafe de Paris", "Casino Cafe de Paris", "Casino Cafe de Paris"),
        body: [
          t(
            "Casino Cafe de Paris is useful when you want Monaco, but not the most formal version of Monaco. It is a better fit for slot machines, a modern gaming room and a shorter visit around Casino Square.",
            "Le Casino Cafe de Paris est utile si vous voulez Monaco, mais pas sa version la plus formelle. Il convient mieux aux machines a sous, a une salle de jeu moderne et a une visite plus courte autour de la place du Casino.",
            "Casino Cafe de Paris e utile quando vuoi Monaco, ma non la versione piu formale. E piu adatto a slot machine, sala gioco moderna e visita piu breve intorno a Casino Square.",
            "Casino Cafe de Paris зручний, коли хочеться Монако, але не його найформальнішої версії. Він краще підходить для slot machines, сучасної зали й коротшого візиту навколо Casino Square.",
          ),
        ],
        relatedPlaceIds: ["casino-cafe-de-paris", "casino-square-monaco"],
      },
      {
        heading: t("Menton or Monaco?", "Menton ou Monaco ?", "Mentone o Monaco?", "Ментон чи Монако?"),
        body: [
          t(
            "Choose Menton if you want the easiest evening, no return-train planning and a relaxed seaside rhythm. Choose Monaco if the point of the night is architecture, dress-up atmosphere or a memorable Casino Square walk.",
            "Choisissez Menton pour la soiree la plus simple, sans organiser le retour en train, avec un rythme detendu en bord de mer. Choisissez Monaco si l'objectif est l'architecture, une atmosphere plus habillee ou une promenade memorable place du Casino.",
            "Scegli Mentone se vuoi la serata piu facile, senza pianificare il treno di ritorno e con ritmo rilassato sul mare. Scegli Monaco se cerchi architettura, atmosfera piu elegante o una passeggiata memorabile in Casino Square.",
            "Обирайте Ментон, якщо потрібен найпростіший вечір без планування зворотного потяга й зі спокійним морським ритмом. Обирайте Монако, якщо головне - архітектура, dress-up атмосфера або пам'ятна прогулянка Casino Square.",
          ),
          t(
            "Do not rely on older references to other Monaco casino options unless you have confirmed current access on official pages. For most visitors, Casino de Monte-Carlo and Casino Cafe de Paris are the reliable Monaco choices.",
            "Ne vous appuyez pas sur d'anciennes references a d'autres options casino a Monaco sans confirmer l'acces actuel sur les pages officielles. Pour la plupart des visiteurs, Casino de Monte-Carlo et Casino Cafe de Paris sont les choix fiables.",
            "Non basarti su vecchi riferimenti ad altre opzioni casino a Monaco senza confermare l'accesso attuale sulle pagine ufficiali. Per la maggior parte dei visitatori, Casino de Monte-Carlo e Casino Cafe de Paris sono le scelte affidabili.",
            "Не спирайтеся на старі згадки інших casino-варіантів у Монако без перевірки актуального доступу на офіційних сторінках. Для більшості гостей надійні варіанти - Casino de Monte-Carlo і Casino Cafe de Paris.",
          ),
        ],
      },
      {
        heading: t("Getting from Menton to Monaco", "Aller de Menton a Monaco", "Da Mentone a Monaco", "Як дістатися з Ментона до Монако"),
        body: [
          t(
            "The easiest route is usually the TER train from Menton to Monaco-Monte-Carlo, then walking, lifts or local connections toward Casino Square. Before leaving, check the return train and keep a taxi fallback in mind for late evenings or major event nights.",
            "Le plus simple est souvent le TER de Menton a Monaco-Monte-Carlo, puis marche, ascenseurs ou liaisons locales vers la place du Casino. Avant de partir, verifiez le train retour et gardez une option taxi pour les soirees tardives ou les grands evenements.",
            "La soluzione piu semplice e di solito il TER da Mentone a Monaco-Monte-Carlo, poi camminata, ascensori o collegamenti locali verso Casino Square. Prima di partire controlla il treno di ritorno e tieni un taxi come backup per serate tarde o grandi eventi.",
            "Найпростіший маршрут зазвичай TER з Ментона до Monaco-Monte-Carlo, потім пішки, ліфтами або місцевими переходами до Casino Square. Перед виїздом перевірте зворотний потяг і майте таксі як резерв для пізніх вечорів або великих подій.",
          ),
          t(
            "Monaco is steep in places. Comfortable smart shoes are a better idea than new dress shoes if you plan to walk between the station, dinner and the casino.",
            "Monaco est pentu par endroits. Des chaussures elegantes mais confortables valent mieux que des chaussures neuves si vous marchez entre gare, diner et casino.",
            "Monaco e ripida in alcuni punti. Scarpe eleganti ma comode sono meglio di scarpe nuove se prevedi di camminare tra stazione, cena e casino.",
            "Монако місцями круте. Зручне smart-взуття краще, ніж нові dress shoes, якщо плануєте йти між вокзалом, вечерею й казино.",
          ),
        ],
        relatedPlaceIds: ["menton-station", "monaco-monte-carlo-station", "casino-square-monaco"],
      },
      {
        heading: t("Dress code, ID and responsible gaming", "Tenue, identite et jeu responsable", "Dress code, documenti e gioco responsabile", "Dress code, документи й відповідальна гра"),
        body: [
          t(
            "For Menton, neat smart casual is usually the right baseline. For Monte-Carlo gaming rooms, dress more carefully and avoid shorts, beachwear, flip-flops, sportswear and overly casual shoes. Bring original photo ID rather than relying on a phone picture.",
            "A Menton, une tenue smart casual soignee est generalement la bonne base. Pour les salles de jeu de Monte-Carlo, habillez-vous plus soigneusement et evitez shorts, plage, tongs, sport et chaussures trop casual. Prenez une piece d'identite originale avec photo plutot qu'une photo sur telephone.",
            "A Mentone, uno smart casual curato e di solito la base giusta. Per le sale gioco di Monte-Carlo, vestiti con piu attenzione ed evita shorts, abbigliamento da spiaggia, infradito, sportivo e scarpe troppo casual. Porta un documento originale con foto, non solo una foto sul telefono.",
            "У Ментоні зазвичай достатньо охайного smart casual. Для gaming rooms у Monte-Carlo одягайтеся уважніше й уникайте шортів, пляжного одягу, в'єтнамок, спортивного стилю та надто casual взуття. Беріть оригінал документа з фото, а не фото в телефоні.",
          ),
          t(
            "Treat casino time as entertainment. Set a small budget before you go, stop when it is finished, and do not chase losses.",
            "Considerez le casino comme un divertissement. Fixez un petit budget avant de partir, arretez-vous quand il est termine et ne cherchez pas a compenser les pertes.",
            "Considera il casino come intrattenimento. Stabilisci un piccolo budget prima di uscire, fermati quando finisce e non inseguire le perdite.",
            "Сприймайте казино як розвагу. Встановіть невеликий бюджет до виходу, зупиніться, коли він закінчиться, і не намагайтеся відіграти втрати.",
          ),
        ],
      },
      {
        heading: t("Simple casino evening plans", "Plans simples pour une soiree casino", "Piani semplici per una serata casino", "Прості плани casino-вечора"),
        body: [
          t("Keep the evening compact and check return transport before committing to Monaco.", "Gardez une soiree compacte et verifiez le retour avant de choisir Monaco.", "Mantieni la serata compatta e controlla il ritorno prima di scegliere Monaco.", "Тримайте вечір компактним і перевіряйте повернення перед вибором Монако."),
        ],
        bullets: [
          t("Easy local evening: dinner in Menton, walk along Promenade du Soleil, then Casino Barriere Menton.", "Soiree locale facile : diner a Menton, promenade sur la Promenade du Soleil, puis Casino Barriere Menton.", "Serata locale facile: cena a Mentone, passeggiata sulla Promenade du Soleil, poi Casino Barriere Menton.", "Простий місцевий вечір: вечеря в Ментоні, прогулянка Promenade du Soleil, потім Casino Barriere Menton."),
          t("Classic Monte-Carlo evening: train to Monaco, Casino Square, dinner or a drink, then Casino de Monte-Carlo.", "Soiree Monte-Carlo classique : train vers Monaco, place du Casino, diner ou verre, puis Casino de Monte-Carlo.", "Serata classica a Monte-Carlo: treno per Monaco, Casino Square, cena o drink, poi Casino de Monte-Carlo.", "Класичний вечір Monte-Carlo: потяг до Монако, Casino Square, вечеря або напій, потім Casino de Monte-Carlo."),
          t("Modern Monaco version: Casino Square photos, Casino Cafe de Paris, then return to quieter Menton.", "Version Monaco plus moderne : photos place du Casino, Casino Cafe de Paris, puis retour au calme de Menton.", "Versione moderna di Monaco: foto in Casino Square, Casino Cafe de Paris, poi ritorno alla calma di Mentone.", "Сучасний варіант Монако: фото на Casino Square, Casino Cafe de Paris, потім повернення до тихішого Ментона."),
          t("Non-gambler version: architecture, terraces, people-watching and a short look inside only where access rules allow.", "Version sans jeu : architecture, terrasses, observation et bref coup d'oeil interieur seulement lorsque les regles d'acces le permettent.", "Versione senza gioco: architettura, terrazze, people-watching e breve visita interna solo dove le regole lo consentono.", "Версія без гри: архітектура, тераси, спостереження за людьми й короткий огляд інтер'єру лише там, де це дозволяють правила доступу."),
        ],
      },
      {
        heading: t("Staying in Menton for casino nights", "Sejourner a Menton pour les soirees casino", "Dormire a Mentone per serate casino", "Жити в Ментоні для casino-вечорів"),
        body: [
          t(
            "Menton works well as a calmer base: you can enjoy a polished evening in Monaco or a simple local casino night, then return to a seaside apartment instead of sleeping in the most crowded event zones.",
            "Menton fonctionne bien comme base plus calme : vous pouvez profiter d'une soiree soignee a Monaco ou d'une sortie casino locale, puis revenir dans un appartement en bord de mer au lieu de dormir dans les zones les plus chargees.",
            "Mentone funziona bene come base piu calma: puoi goderti una serata elegante a Monaco o una semplice serata casino locale, poi tornare in un appartamento sul mare invece di dormire nelle zone piu affollate.",
            "Ментон добре працює як спокійніша база: можна провести охайний вечір у Монако або простий локальний casino-вечір, а потім повернутися до апартаменту біля моря, не ночуючи в найзавантаженіших зонах.",
          ),
          t(
            "For couples, the Sea View Balcony Studio and Panoramic Sea View Studio fit an evening-focused stay. For families or longer trips, the Beachside Apartment with Terrace & Parking gives more space and an easier base.",
            "Pour les couples, Sea View Balcony Studio et Panoramic Sea View Studio conviennent a un sejour centre sur les soirees. Pour les familles ou les sejours plus longs, Beachside Apartment with Terrace & Parking offre plus d'espace et une base plus simple.",
            "Per le coppie, Sea View Balcony Studio e Panoramic Sea View Studio si adattano a un soggiorno orientato alle serate. Per famiglie o soggiorni piu lunghi, Beachside Apartment with Terrace & Parking offre piu spazio e una base piu facile.",
            "Для пар Sea View Balcony Studio і Panoramic Sea View Studio пасують до вечірнього формату поїздки. Для сімей або довших перебувань Beachside Apartment with Terrace & Parking дає більше простору й простішу базу.",
          ),
        ],
        relatedApartmentKeys: allApartments,
      },
      {
        heading: t("Common questions", "Questions frequentes", "Domande frequenti", "Поширені питання"),
        body: [
          t("The details below cover the questions guests usually ask before planning a casino evening.", "Les points ci-dessous couvrent les questions que les voyageurs posent souvent avant une soiree casino.", "I punti sotto coprono le domande che gli ospiti fanno spesso prima di una serata casino.", "Нижче - питання, які гості найчастіше ставлять перед плануванням casino-вечора."),
        ],
        bullets: [
          t("Is there a casino in Menton? Yes, Casino Barriere Menton is on the central seafront.", "Y a-t-il un casino a Menton ? Oui, le Casino Barriere Menton est sur le front de mer central.", "C'e un casino a Mentone? Si, Casino Barriere Menton e sul lungomare centrale.", "Чи є казино в Ментоні? Так, Casino Barriere Menton розташований на центральній набережній."),
          t("What is the most famous casino near Menton? Casino de Monte-Carlo is the iconic choice.", "Quel est le casino le plus connu pres de Menton ? Le Casino de Monte-Carlo est le choix iconique.", "Qual e il casino piu famoso vicino a Mentone? Casino de Monte-Carlo e la scelta iconica.", "Яке найвідоміше казино біля Ментона? Casino de Monte-Carlo - знаковий вибір."),
          t("Do I need ID? For casino access, bring valid passport or national photo ID and check current rules before going.", "Faut-il une piece d'identite ? Pour l'acces casino, prenez passeport ou piece nationale avec photo et verifiez les regles actuelles.", "Serve un documento? Per l'accesso al casino porta passaporto o documento nazionale con foto e controlla le regole aggiornate.", "Чи потрібен документ? Для входу в казино беріть паспорт або національний документ з фото й перевіряйте актуальні правила."),
        ],
      },
    ],
    practicalTips: [
      t("Check current opening hours and access rules on official casino pages.", "Verifiez horaires et regles d'acces sur les pages officielles des casinos.", "Controlla orari e regole d'accesso sulle pagine ufficiali dei casino.", "Перевіряйте актуальні години й правила входу на офіційних сторінках казино."),
      t("Plan the return from Monaco before leaving Menton.", "Planifiez le retour depuis Monaco avant de quitter Menton.", "Pianifica il ritorno da Monaco prima di lasciare Mentone.", "Сплануйте повернення з Монако до виїзду з Ментона."),
      t("Keep the evening as entertainment: set a budget and do not chase losses.", "Gardez la soiree comme divertissement : fixez un budget et ne poursuivez pas les pertes.", "Mantieni la serata come intrattenimento: fissa un budget e non inseguire le perdite.", "Сприймайте вечір як розвагу: встановіть бюджет і не відігравайте втрати."),
    ],
  }),
  shortArticle({
    id: "famous-paintings-of-menton",
    slug: "famous-paintings-of-menton",
    title: t("Paintings of Menton: famous artists who captured the Riviera light", "Peintures de Menton: les artistes qui ont capture la lumiere Riviera", "Dipinti di Mentone: artisti famosi e luce della Riviera", "Картини Ментона: відомі художники й світло Рив'єри"),
    seoTitle: t("Famous Paintings of Menton: Monet, Renoir, Signac, Marquet and Riviera Artists", "Peintures celebres de Menton: Monet, Renoir, Signac, Marquet et artistes Riviera", "Dipinti famosi di Mentone: Monet, Renoir, Signac, Marquet e artisti della Riviera", "Відомі картини Ментона: Monet, Renoir, Signac, Marquet та художники Рив'єри"),
    seoDescription: t("A visual guide to famous paintings of Menton and nearby Cap Martin: works by Claude Monet, Pierre-Auguste Renoir, Paul Signac, Albert Marquet, Henri-Edmond Cross and other artists, with the Menton locations they show.", "Guide visuel des peintures celebres de Menton et du Cap Martin proche: Monet, Renoir, Signac, Marquet, Cross et autres artistes, avec les lieux de Menton qu'elles evoquent.", "Guida visiva ai dipinti famosi di Mentone e del vicino Cap Martin: Monet, Renoir, Signac, Marquet, Cross e altri artisti, con i luoghi collegati.", "Візуальний гід відомими картинами Ментона й сусіднього Cap Martin: Monet, Renoir, Signac, Marquet, Cross та інші художники, з місцями Ментона, які вони показують."),
    excerpt: t("Long before travel photography and Instagram, Menton was already a painter's town: sea, old harbour, Cap Martin, Garavan, palm-lined promenades, red roads, mountain light and the pastel old town rising above the bay.", "Bien avant la photo de voyage et Instagram, Menton etait deja une ville de peintres: mer, vieux port, Cap Martin, Garavan, promenades de palmiers, routes rouges, lumiere de montagne et vieille ville pastel au-dessus de la baie.", "Molto prima della fotografia di viaggio e di Instagram, Mentone era gia una citta di pittori: mare, porto antico, Cap Martin, Garavan, passeggiate di palme, strade rosse, luce di montagna e centro storico pastello sopra la baia.", "Задовго до travel photography та Instagram Ментон уже був містом художників: море, старий порт, Cap Martin, Garavan, пальмові набережні, червоні дороги, гірське світло й пастельне старе місто над бухтою."),
    category: "photo-spots",
    coverImage: "/images/guide/famous-paintings-of-menton.jpg",
    coverImageAlt: t("Illustration for a guide to famous paintings of Menton", "Illustration pour un guide des peintures celebres de Menton", "Illustrazione per una guida ai dipinti famosi di Mentone", "Ілюстрація до гіда відомими картинами Ментона"),
    visualTheme: "old-town",
    visualStatus: "project_illustration",
    tags: [t("art", "art", "arte", "мистецтво"), t("paintings", "peintures", "dipinti", "картини"), t("Monet", "Monet", "Monet", "Monet"), t("visual culture", "culture visuelle", "cultura visiva", "візуальна культура")],
    bestFor: [guideBestForOptions[0].label, guideBestForOptions[3].label, guideBestForOptions[7].label],
    duration: "half-day",
    locationTags: ["old-town", "seafront", "garavan", "monaco"],
    sourceStatus: "needs_verification",
    relatedPlaces: ["quai-bonaparte-menton", "basilica-saint-michel-archange", "rue-saint-michel-menton", "port-de-garavan", "roquebrune-cap-martin-coastal-walk", "jardins-bioves", "cimetiere-vieux-chateau", "promenade-du-soleil"],
    relatedArticles: ["music-videos-filmed-in-menton", "best-photo-spots-menton", "menton-old-town", "museums-in-menton-nice-monaco", "theatre-opera-performing-arts-near-menton", "day-trips-from-menton", "where-to-stay-in-menton"],
    relatedApartments: allApartments,
    sections: [
      {
        heading: t("Menton before photography: a painter's Riviera", "Menton avant la photo: une Riviera de peintres", "Mentone prima della fotografia: una Riviera di pittori", "Ментон до фотографії: Рив'єра художників"),
        body: [
          t("Menton has always looked slightly unreal: lemons, sea light, ochre facades, steep old streets and mountains pressing close behind the Mediterranean. Long before travel photography, painters came here for exactly that mix.", "Menton a toujours eu quelque chose d'irreel: citrons, lumiere marine, facades ocres, ruelles raides et montagnes tout pres de la Mediterranee. Bien avant la photo de voyage, les peintres venaient pour ce melange.", "Mentone ha sempre avuto qualcosa di irreale: limoni, luce marina, facciate ocra, strade ripide e montagne vicine al Mediterraneo. Molto prima della fotografia di viaggio, i pittori venivano per questo insieme.", "Ментон завжди виглядав трохи нереальним: лимони, морське світло, охристі фасади, круті старі вулиці й гори майже над Середземним морем. Ще до travel photography художники приїжджали саме за цим поєднанням."),
          t("This guide is a visual route through paintings connected with Menton and nearby Cap Martin. Some images show Menton directly; others show the coast, road, gardens or headland that shape the same view today.", "Ce guide propose un itineraire visuel a travers les peintures liees a Menton et au Cap Martin voisin. Certaines montrent Menton directement; d'autres montrent la cote, la route, les jardins ou le cap qui structurent encore le regard aujourd'hui.", "Questa guida e un percorso visivo tra dipinti legati a Mentone e al vicino Cap Martin. Alcuni mostrano Mentone direttamente; altri mostrano costa, strada, giardini o promontorio che ancora oggi costruiscono lo stesso sguardo.", "Цей гід - візуальний маршрут картинами, пов'язаними з Ментоном і сусіднім Cap Martin. Деякі показують Ментон напряму; інші - узбережжя, дорогу, сади або мис, які й сьогодні формують той самий погляд."),
        ],
      },
      {
        heading: t("Monet, Renoir and Cap Martin", "Monet, Renoir et le Cap Martin", "Monet, Renoir e Cap Martin", "Monet, Renoir і Cap Martin"),
        body: [
          t("The Impressionist route begins outside the old town. Monet and Renoir looked at Menton from Cap Martin and the surrounding coastal landscape, so the town becomes part of a wider Mediterranean composition rather than a close architectural portrait.", "Le parcours impressionniste commence hors de la vieille ville. Monet et Renoir regardent Menton depuis le Cap Martin et le paysage cotier voisin: la ville devient une partie d'une composition mediterraneenne plus large, pas seulement un portrait architectural.", "Il percorso impressionista inizia fuori dal centro storico. Monet e Renoir guardano Mentone da Cap Martin e dal paesaggio costiero vicino: la citta diventa parte di una composizione mediterranea piu ampia, non solo un ritratto architettonico.", "Імпресіоністичний маршрут починається не в старому місті. Monet і Renoir дивилися на Ментон із Cap Martin та навколишнього узбережжя, тому місто стає частиною ширшої середземноморської композиції, а не лише архітектурним портретом."),
        ],
        artworkCards: [
          {
            id: "monet-cap-martin-near-menton",
            artist: "Claude Monet",
            workTitle: t("Cap Martin, near Menton", "Cap Martin, pres de Menton", "Cap Martin, vicino a Mentone", "Cap Martin, біля Ментона"),
            year: "1884",
            image: "/images/guide/monet-cap-martin-near-menton.jpg",
            imageAlt: t("Claude Monet, Cap Martin, near Menton", "Claude Monet, Cap Martin, pres de Menton", "Claude Monet, Cap Martin, vicino a Mentone", "Claude Monet, Cap Martin, біля Ментона"),
            sourceUrl: "https://commons.wikimedia.org/wiki/File:Monet_-_Cap_Martin,_near_Menton,_1884.jpg",
            rightsNote: t("Public-domain image via Wikimedia Commons.", "Image domaine public via Wikimedia Commons.", "Immagine di pubblico dominio via Wikimedia Commons.", "Зображення public domain через Wikimedia Commons."),
            locationNote: t("Best connected with Cap Martin and the coastal path looking back toward Menton.", "A relier surtout au Cap Martin et au sentier cotier vers Menton.", "Collegato soprattutto a Cap Martin e al sentiero costiero verso Mentone.", "Найкраще пов'язано з Cap Martin і прибережною стежкою з поглядом назад на Ментон."),
          },
          {
            id: "monet-red-road-near-menton",
            artist: "Claude Monet",
            workTitle: t("La route rouge pres de Menton", "La route rouge pres de Menton", "La route rouge pres de Menton", "La route rouge pres de Menton"),
            year: "1884",
            image: "/images/guide/monet-red-road-near-menton.jpg",
            sourceUrl: "https://commons.wikimedia.org/wiki/File:LA_ROUTE_ROUGE_PR%C3%88S_DE_MENTON_(1884)_Claude_Monet_(W_889).jpg",
            rightsNote: t("Public-domain image via Wikimedia Commons.", "Image domaine public via Wikimedia Commons.", "Immagine di pubblico dominio via Wikimedia Commons.", "Зображення public domain через Wikimedia Commons."),
            locationNote: t("A Cap Martin road-and-coast view, useful for understanding Menton's red earth, vegetation and wider Riviera setting.", "Une vue route et cote du Cap Martin, utile pour comprendre terre rouge, vegetation et contexte Riviera de Menton.", "Una vista di strada e costa da Cap Martin, utile per capire terra rossa, vegetazione e contesto Riviera di Mentone.", "Вид дороги й узбережжя Cap Martin, корисний для розуміння червоної землі, рослинності й ширшого контексту Рив'єри."),
          },
          {
            id: "renoir-landscape-near-menton",
            artist: "Pierre-Auguste Renoir",
            workTitle: t("Landscape on the Coast, near Menton", "Paysage sur la cote, pres de Menton", "Paesaggio sulla costa, vicino a Mentone", "Пейзаж на узбережжі біля Ментона"),
            year: "1883",
            image: "/images/guide/renoir-landscape-near-menton.jpg",
            sourceUrl: "https://commons.wikimedia.org/wiki/File:Renoir_-_Landscape_on_the_Coast,_near_Menton,_1883.jpg",
            rightsNote: t("Image via Wikimedia Commons.", "Image via Wikimedia Commons.", "Immagine via Wikimedia Commons.", "Зображення через Wikimedia Commons."),
            locationNote: t("Best linked to the coast near Menton and Cap Martin vegetation viewpoints.", "A relier a la cote pres de Menton et aux points de vue vegetaux du Cap Martin.", "Da collegare alla costa vicino a Mentone e ai punti panoramici verdi di Cap Martin.", "Пов'язано з узбережжям біля Ментона й зеленими точками Cap Martin."),
          },
        ],
        relatedPlaceIds: ["roquebrune-cap-martin-coastal-walk", "promenade-du-soleil"],
      },
      {
        heading: t("Harbour, old town and colour", "Port, vieille ville et couleur", "Porto, centro storico e colore", "Порт, старе місто й колір"),
        body: [
          t("The old harbour is the easiest place to connect painting with a real walk. Marquet and Breton point toward boats, working life and the old town rising above the water; Signac and Cross translate the same town into luminous colour.", "Le vieux port est le lieu le plus simple pour relier peinture et promenade. Marquet et Breton renvoient aux bateaux, a la vie de port et a la vieille ville au-dessus de l'eau; Signac et Cross transforment la meme ville en couleur lumineuse.", "Il porto antico e il luogo piu facile per collegare pittura e passeggiata. Marquet e Breton rimandano a barche, vita di porto e centro storico sopra l'acqua; Signac e Cross trasformano la stessa citta in colore luminoso.", "Старий порт - найпростіше місце, де картини з'єднуються з реальною прогулянкою. Marquet і Breton ведуть до човнів, портового життя й старого міста над водою; Signac і Cross перетворюють те саме місто на світлий колір."),
        ],
        artworkCards: [
          {
            id: "marquet-harbor-of-menton",
            artist: "Albert Marquet",
            workTitle: t("Harbor of Menton", "Port de Menton", "Porto di Mentone", "Порт Ментона"),
            year: "1905",
            image: "/images/guide/marquet-harbor-of-menton.jpg",
            sourceUrl: "https://commons.wikimedia.org/wiki/File:Harbor_of_Menton_Albert_Marquet_(1905).jpg",
            rightsNote: t("Public-domain image via Wikimedia Commons.", "Image domaine public via Wikimedia Commons.", "Immagine di pubblico dominio via Wikimedia Commons.", "Зображення public domain через Wikimedia Commons."),
            locationNote: t("Best seen from Quai Bonaparte and the old-port view toward the old town and Basilica.", "A voir depuis le Quai Bonaparte et le vieux port vers la vieille ville et la basilique.", "Da collegare al Quai Bonaparte e alla vista del porto antico verso centro storico e Basilica.", "Найкраще пов'язано з Quai Bonaparte та видом старого порту на старе місто й Basilica."),
          },
          {
            id: "signac-menton-1931",
            artist: "Paul Signac",
            workTitle: t("Menton", "Menton", "Mentone", "Ментон"),
            year: "1931",
            image: "/images/guide/signac-menton-1931.jpg",
            imageAlt: t("Paul Signac, Menton, 1931", "Paul Signac, Menton, 1931", "Paul Signac, Mentone, 1931", "Paul Signac, Ментон, 1931"),
            sourceUrl: "https://commons.wikimedia.org/wiki/File:Signac_-_Menton,_1931,_lot-5996751.jpg",
            rightsNote: t("Public-domain image via Wikimedia Commons.", "Image domaine public via Wikimedia Commons.", "Immagine di pubblico dominio via Wikimedia Commons.", "Зображення public domain через Wikimedia Commons."),
            locationNote: t("Likely old port, bay or old-town view; keep the map point approximate.", "Probable vieux port, baie ou vieille ville; gardez le point de carte approximatif.", "Probabile porto antico, baia o centro storico; mantieni approssimativo il punto mappa.", "Ймовірно старий порт, бухта або старе місто; точку на мапі варто лишати приблизною."),
          },
          {
            id: "cross-view-of-menton",
            artist: "Henri-Edmond Cross",
            workTitle: t("View of Menton", "Vue de Menton", "Veduta di Mentone", "Вид на Ментон"),
            year: "1899-1902",
            image: "/images/guide/cross-view-of-menton.jpg",
            imageAlt: t("Henri-Edmond Cross, View of Menton", "Henri-Edmond Cross, Vue de Menton", "Henri-Edmond Cross, Veduta di Mentone", "Henri-Edmond Cross, Вид на Ментон"),
            sourceUrl: "https://www.wikiart.org/en/henri-edmond-cross/view-of-menton-1902",
            rightsNote: t("Reference image from WikiArt for a public-domain artist; keep source attribution visible.", "Image de reference via WikiArt pour un artiste du domaine public; gardez l'attribution source visible.", "Immagine di riferimento da WikiArt per un artista di pubblico dominio; mantieni visibile la fonte.", "Референсне зображення з WikiArt для художника public domain; лишайте видимим посилання на джерело."),
            locationNote: t("Best connected with old-town viewpoints and the cemetery route above the bay.", "A relier aux points de vue de la vieille ville et au cimetiere au-dessus de la baie.", "Collegato ai punti panoramici del centro storico e al cimitero sopra la baia.", "Пов'язано з оглядовими точками старого міста й маршрутом до цвинтаря над бухтою."),
          },
        ],
        relatedPlaceIds: ["quai-bonaparte-menton", "basilica-saint-michel-archange", "cimetiere-vieux-chateau"],
      },
      {
        heading: t("Gardens, frames and lesser-known Menton works", "Jardins, cadres et oeuvres moins connues", "Giardini, cornici e opere meno note", "Сади, рамки й менш відомі роботи про Ментон"),
        body: [
          t("Not every Menton painting is a harbour panorama. Vallotton frames the town through structure; Corinth and Fry are useful references for palms, gardens and early modernist views.", "Toutes les peintures de Menton ne sont pas des panoramas de port. Vallotton cadre la ville par une structure; Corinth et Fry sont utiles pour les palmiers, jardins et regards modernistes.", "Non tutti i dipinti di Mentone sono panorami del porto. Vallotton incornicia la citta attraverso una struttura; Corinth e Fry aiutano per palme, giardini e sguardi modernisti.", "Не всі картини Ментона - це панорами порту. Vallotton бачить місто крізь структуру; Corinth і Fry корисні для пальм, садів і модерністичного погляду."),
        ],
        artworkCards: [
          {
            id: "vallotton-la-claire-voie-menton",
            artist: "Félix Vallotton",
            workTitle: t("La claire-voie, Menton", "La claire-voie, Menton", "La claire-voie, Menton", "La claire-voie, Menton"),
            year: "1924",
            image: "/images/guide/vallotton-la-claire-voie-menton.jpg",
            imageAlt: t("Félix Vallotton, La claire-voie, Menton", "Félix Vallotton, La claire-voie, Menton", "Félix Vallotton, La claire-voie, Menton", "Félix Vallotton, La claire-voie, Menton"),
            sourceUrl: "https://commons.wikimedia.org/wiki/File:F%C3%A9lix_Vallotton,_1924_-_La_claire-voie,_Menton.jpg",
            rightsNote: t("Public-domain image via Wikimedia Commons.", "Image domaine public via Wikimedia Commons.", "Immagine di pubblico dominio via Wikimedia Commons.", "Зображення public domain через Wikimedia Commons."),
            locationNote: t("Best connected with gardens, villas, shaded terraces and framed Menton views.", "A relier aux jardins, villas, terrasses ombragees et vues cadre de Menton.", "Collegato a giardini, ville, terrazze ombreggiate e viste incorniciate.", "Пов'язано із садами, віллами, затіненими терасами й рамковими видами Ментона."),
          },
          {
            id: "harpignies-olive-trees-at-menton",
            artist: "Henri-Joseph Harpignies",
            workTitle: t("Olive Trees at Menton", "Oliviers a Menton", "Ulivi a Mentone", "Оливкові дерева в Ментоні"),
            year: "late 19th century",
            image: "/images/guide/harpignies-olive-trees-at-menton.jpg",
            sourceUrl: "https://commons.wikimedia.org/wiki/File:Henri-Joseph_Harpignies_(1819-1916)_-_Olive_Trees_at_Menton_-_NG3808_-_National_Gallery.jpg",
            rightsNote: t("Public-domain image via Wikimedia Commons / National Gallery source.", "Image domaine public via Wikimedia Commons / National Gallery.", "Immagine di pubblico dominio via Wikimedia Commons / National Gallery.", "Зображення public domain через Wikimedia Commons / National Gallery."),
            locationNote: t("Connect with Garavan slopes, villa gardens and older olive-tree landscapes around Menton.", "A relier aux pentes de Garavan, jardins de villas et anciens paysages d'oliviers autour de Menton.", "Collegato ai pendii di Garavan, giardini di ville e vecchi paesaggi di ulivi intorno a Mentone.", "Пов'язано зі схилами Garavan, садами вілл і старими оливковими пейзажами навколо Ментона."),
          },
        ],
        relatedPlaceIds: ["jardins-bioves", "port-de-garavan", "rue-saint-michel-menton"],
      },
      {
        heading: t("Also worth knowing", "A connaitre aussi", "Da conoscere anche", "Також варто знати"),
        body: [
          t("Several Menton works are worth looking up as part of the same visual story: Winston Churchill's View of Menton from La Pausa, Zinaida Serebriakova's Menton harbour view, Jules Breton's Fishermen at Menton, Roger Fry's View on the Côte d'Azur, Menton, Alfred Stevens' regatta scene, Adolphe Appian's coastal views and Roger Broders' Menton travel poster.", "Plusieurs oeuvres de Menton valent aussi le detour dans cette meme histoire visuelle: View of Menton from La Pausa de Winston Churchill, la vue du port de Zinaida Serebriakova, Fishermen at Menton de Jules Breton, View on the Côte d'Azur, Menton de Roger Fry, la scene de regates d'Alfred Stevens, les vues cotieres d'Adolphe Appian et l'affiche Menton de Roger Broders.", "Vale la pena cercare anche altre opere mentonesi nella stessa storia visiva: View of Menton from La Pausa di Winston Churchill, la veduta del porto di Zinaida Serebriakova, Fishermen at Menton di Jules Breton, View on the Côte d'Azur, Menton di Roger Fry, la scena di regata di Alfred Stevens, le vedute costiere di Adolphe Appian e il poster di Roger Broders.", "У цій самій візуальній історії варто знайти й інші роботи про Ментон: View of Menton from La Pausa Вінстона Черчилля, портовий вид Зінаїди Серебрякової, Fishermen at Menton Жуля Бретона, View on the Côte d'Azur, Menton Роджера Фрая, регата Alfred Stevens, прибережні види Adolphe Appian і постер Menton Roger Broders."),
        ],
        artworkCards: [
          {
            id: "peters-on-the-coast-of-menton",
            artist: "Pieter Franciscus Peters",
            workTitle: t("On the Coast of Menton", "Sur la cote de Menton", "Sulla costa di Mentone", "На узбережжі Ментона"),
            year: "1870",
            image: "/images/guide/peters-on-the-coast-of-menton.jpg",
            imageAlt: t("Pieter Franciscus Peters, On the Coast of Menton", "Pieter Franciscus Peters, Sur la cote de Menton", "Pieter Franciscus Peters, Sulla costa di Mentone", "Pieter Franciscus Peters, На узбережжі Ментона"),
            sourceUrl: "https://commons.wikimedia.org/wiki/File:Pieter_Franciscus_Peters_-_On_the_Coast_of_Menton.jpg",
            rightsNote: t("Public-domain image via Wikimedia Commons.", "Image domaine public via Wikimedia Commons.", "Immagine di pubblico dominio via Wikimedia Commons.", "Зображення public domain через Wikimedia Commons."),
            locationNote: t("Useful for the older coastal Menton image before the modern resort town.", "Utile pour l'image cotiere plus ancienne de Menton avant la station moderne.", "Utile per l'immagine costiera piu antica di Mentone prima della localita moderna.", "Корисно для старішого прибережного образу Ментона до сучасного курортного міста."),
          },
        ],
      },
      {
        heading: t("A Menton art walk", "Une balade artistique a Menton", "Una passeggiata artistica a Mentone", "Мистецька прогулянка Ментоном"),
        body: [
          t("Start at Quai Bonaparte and the old port for Marquet, Breton and the harbour tradition. Climb through the old town toward Basilica Saint-Michel-Archange and the cemetery viewpoint for Cross-style colour and compressed rooftops.", "Commencez au Quai Bonaparte et au vieux port pour Marquet, Breton et la tradition du port. Montez par la vieille ville vers la basilique Saint-Michel-Archange et le cimetiere pour les couleurs a la Cross et les toits serres.", "Inizia da Quai Bonaparte e dal porto antico per Marquet, Breton e la tradizione del porto. Sali nel centro storico verso la Basilica Saint-Michel-Archange e il cimitero per colori alla Cross e tetti compressi.", "Почніть із Quai Bonaparte і старого порту для Marquet, Breton і портової традиції. Підніміться старим містом до Basilica Saint-Michel-Archange і цвинтарної оглядової точки за кольором у дусі Cross і стислими дахами."),
          t("For Monet and Renoir, continue another day toward Cap Martin and the Roquebrune-Cap-Martin coastal walk. For palms, villas and garden light, keep Garavan and Jardins Biovès in the route.", "Pour Monet et Renoir, continuez un autre jour vers le Cap Martin et la balade cotiere de Roquebrune-Cap-Martin. Pour palmiers, villas et lumiere de jardins, gardez Garavan et les Jardins Bioves dans le parcours.", "Per Monet e Renoir, continua un altro giorno verso Cap Martin e la passeggiata costiera di Roquebrune-Cap-Martin. Per palme, ville e luce dei giardini, tieni Garavan e Jardins Biovès nel percorso.", "Для Monet і Renoir продовжіть в інший день до Cap Martin і прибережної прогулянки Roquebrune-Cap-Martin. Для пальм, вілл і садового світла додайте Garavan і Jardins Biovès."),
        ],
        relatedPlaceIds: ["quai-bonaparte-menton", "basilica-saint-michel-archange", "cimetiere-vieux-chateau", "roquebrune-cap-martin-coastal-walk", "port-de-garavan", "jardins-bioves"],
      },
      {
        heading: t("Staying in Menton for art and visual culture", "Sejourner a Menton pour l'art et la culture visuelle", "Soggiornare a Mentone per arte e cultura visiva", "Зупинка в Ментоні для мистецтва й візуальної культури"),
        body: [
          t("A stay in Menton is ideal for slow visual travel. You can walk the same places at different times of day: morning harbour light, hot afternoon colour, evening glow over Cap Martin.", "Un sejour a Menton convient parfaitement au voyage visuel lent. Vous pouvez revoir les memes lieux a differentes heures: lumiere du matin au port, couleurs d'apres-midi, lueur du soir sur le Cap Martin.", "Un soggiorno a Mentone e ideale per un viaggio visivo lento. Puoi rivedere gli stessi luoghi in ore diverse: luce del mattino al porto, colore del pomeriggio, bagliore serale su Cap Martin.", "Перебування в Ментоні ідеальне для повільної візуальної подорожі. Можна бачити ті самі місця в різний час: ранкове світло порту, гарячий денний колір, вечірнє сяйво над Cap Martin."),
          t("Azur Menton apartments work well for this rhythm because the sea, old town and harbour views are close, while Cap Martin and Garavan can be reached as easy visual detours.", "Les appartements Azur Menton conviennent a ce rythme: mer, vieille ville et vues du port sont proches, tandis que Cap Martin et Garavan deviennent des detours visuels faciles.", "Gli appartamenti Azur Menton funzionano bene per questo ritmo: mare, centro storico e viste del porto sono vicini, mentre Cap Martin e Garavan diventano deviazioni visive facili.", "Апартаменти Azur Menton добре працюють для такого ритму: море, старе місто й портові види поруч, а Cap Martin і Garavan легко додати як візуальні відступи."),
        ],
        relatedApartmentKeys: allApartments,
      },
      {
        heading: t("FAQ", "FAQ", "FAQ", "FAQ"),
        body: [
          t("Did Monet paint Menton? Yes. Monet painted Menton-area works in 1884, including Cap Martin, near Menton and La route rouge pres de Menton.", "Monet a-t-il peint Menton? Oui. Monet a peint des oeuvres autour de Menton en 1884, notamment Cap Martin, pres de Menton et La route rouge pres de Menton.", "Monet ha dipinto Mentone? Si. Monet dipinse opere nell'area di Mentone nel 1884, tra cui Cap Martin, near Menton e La route rouge pres de Menton.", "Чи малював Monet Ментон? Так. У 1884 році Monet писав роботи району Ментона, зокрема Cap Martin, near Menton і La route rouge pres de Menton."),
          t("Where can I see the locations? Start with Quai Bonaparte and the old port, climb to the Basilica and cemetery viewpoint, then plan Cap Martin for Monet and Renoir.", "Ou voir les lieux? Commencez par le Quai Bonaparte et le vieux port, montez vers la basilique et le cimetiere, puis prevoyez le Cap Martin pour Monet et Renoir.", "Dove vedere i luoghi? Inizia da Quai Bonaparte e dal porto antico, sali alla Basilica e al cimitero, poi programma Cap Martin per Monet e Renoir.", "Де побачити локації? Почніть із Quai Bonaparte і старого порту, підніміться до Basilica та цвинтарної точки, а потім заплануйте Cap Martin для Monet і Renoir."),
          t("Where can I learn more about each work? Use the source links under the artwork cards to compare museum records, Commons pages or art references before your walk.", "Ou en savoir plus sur chaque oeuvre? Utilisez les liens source sous les cartes pour comparer les notices musee, pages Commons ou references d'art avant la balade.", "Dove posso saperne di piu su ogni opera? Usa i link fonte sotto le schede per confrontare schede museali, pagine Commons o riferimenti artistici prima della passeggiata.", "Де дізнатися більше про кожну роботу? Використовуйте посилання під картками, щоб перед прогулянкою порівняти музейні записи, сторінки Commons або мистецькі довідки."),
        ],
      },
    ],
    practicalTips: [
      t("Use the painting locations as a mood map rather than a strict set of exact viewpoints.", "Utilisez les lieux des peintures comme une carte d'ambiance plutot que comme une liste de points exacts.", "Usa i luoghi dei dipinti come una mappa d'atmosfera piu che come una lista di punti esatti.", "Сприймайте локації картин як мапу настрою, а не як набір точних точок огляду."),
      t("Start with the old port and old town, then plan Cap Martin as a separate half-day walk.", "Commencez par le vieux port et la vieille ville, puis prevoyez le Cap Martin comme une demi-journee separee.", "Inizia dal porto antico e dal centro storico, poi programma Cap Martin come mezza giornata separata.", "Почніть зі старого порту й старого міста, а Cap Martin заплануйте як окрему прогулянку на пів дня."),
      t("Museum and source links are useful if you want to compare the works before walking the route.", "Les liens musee et source sont utiles si vous souhaitez comparer les oeuvres avant la balade.", "I link a musei e fonti sono utili se vuoi confrontare le opere prima della passeggiata.", "Посилання на музеї та джерела корисні, якщо хочете порівняти роботи перед прогулянкою."),
    ],
  }),
  shortArticle({
    id: "music-videos-filmed-in-menton",
    slug: "music-videos-filmed-in-menton",
    title: t("Music videos filmed in Menton: a small visual guide", "Clips musicaux tournes a Menton: petit guide visuel", "Video musicali girate a Mentone: piccola guida visiva", "Музичні відео, зняті в Ментоні: короткий візуальний гід"),
    seoTitle: t("Music Videos Filmed in Menton: Songs, Streets and Riviera Locations", "Clips musicaux tournes a Menton: chansons, rues et decors Riviera", "Video musicali girate a Mentone: canzoni, strade e luoghi Riviera", "Музичні відео, зняті в Ментоні: пісні, вулиці та локації Рив'єри"),
    seoDescription: t("A small visual guide to music videos filmed in Menton or featuring Menton: sunny Riviera streets, the old town, Palais de l'Europe, nearby villages and locations you can visit during your stay.", "Petit guide visuel des clips tournes a Menton ou montrant Menton: rues ensoleillees, vieille ville, Palais de l'Europe, villages proches et lieux a visiter pendant le sejour.", "Piccola guida visiva ai video musicali girati a Mentone o con Mentone: strade soleggiate, centro storico, Palais de l'Europe, borghi vicini e luoghi da visitare durante il soggiorno.", "Короткий візуальний гід по музичних відео, знятих у Ментоні або з Ментоном у кадрі: сонячні вулиці Рив'єри, старе місто, Palais de l'Europe, сусідні села й місця, які можна відвідати під час перебування."),
    excerpt: t("Menton is not a music-video capital, but its colours, old streets, sea views and Mediterranean light make it a natural film set for songs and short visual stories.", "Menton n'est pas une capitale du clip, mais ses couleurs, ses vieilles rues, ses vues mer et sa lumiere mediterraneenne en font un decor naturel pour chansons et recits visuels courts.", "Mentone non e una capitale dei videoclip, ma colori, strade antiche, vista mare e luce mediterranea la rendono un set naturale per canzoni e brevi storie visive.", "Ментон не є столицею музичних кліпів, але його кольори, старі вулиці, море й середземноморське світло природно працюють як декорація для пісень і коротких візуальних історій."),
    category: "photo-spots",
    coverImage: "/images/guide/music-videos-filmed-in-menton.jpg",
    coverImageAlt: t("Illustration for music videos filmed in Menton", "Illustration pour les clips musicaux tournes a Menton", "Illustrazione per video musicali girati a Mentone", "Ілюстрація до музичних відео, знятих у Ментоні"),
    visualTheme: "old-town",
    visualStatus: "project_illustration",
    tags: [t("music videos", "clips musicaux", "video musicali", "музичні відео"), t("visual culture", "culture visuelle", "cultura visiva", "візуальна культура"), t("old town", "vieille ville", "centro storico", "старе місто"), t("Riviera light", "lumiere Riviera", "luce Riviera", "світло Рив'єри")],
    bestFor: [guideBestForOptions[0].label, guideBestForOptions[3].label, guideBestForOptions[7].label],
    duration: "1-2 hours",
    locationTags: ["old-town", "menton-centre", "seafront"],
    sourceStatus: "needs_verification",
    relatedPlaces: ["palais-de-leurope-menton", "gorbio", "rue-saint-michel-menton", "basilica-saint-michel-archange", "quai-bonaparte-menton", "promenade-du-soleil"],
    relatedArticles: ["famous-paintings-of-menton", "best-photo-spots-menton", "menton-old-town", "theatre-opera-performing-arts-near-menton", "cinemas-in-menton-nice-monaco", "fete-du-citron-menton-practical-guide", "day-trips-from-menton", "where-to-stay-in-menton"],
    relatedApartments: allApartments,
    sections: [
      {
        heading: t("Menton as a music-video backdrop", "Menton comme decor de clip", "Mentone come sfondo per videoclip", "Ментон як фон для музичного відео"),
        body: [
          t("Menton appears in music videos for the same reason it works so well for photographs: the town gives colour, sea, old streets and warm light within a very small area.", "Menton apparait dans des clips pour la meme raison qu'elle fonctionne si bien en photo: la ville offre couleurs, mer, vieilles rues et lumiere chaude dans un espace tres compact.", "Mentone compare nei videoclip per lo stesso motivo per cui funziona cosi bene in fotografia: colori, mare, strade antiche e luce calda in uno spazio compatto.", "Ментон з'являється в музичних відео з тієї ж причини, з якої він добре працює для фото: кольори, море, старі вулиці й тепле світло на дуже компактній території."),
          t("This is a small guide rather than a complete filmography. Use it as a gentle visual walk: watch a clip, then notice the same textures around Palais de l'Europe, the old town, the seafront and nearby villages.", "Ce n'est pas une filmographie complete, mais un petit guide visuel. Regardez un clip, puis cherchez les memes textures autour du Palais de l'Europe, de la vieille ville, du front de mer et des villages voisins.", "Non e una filmografia completa, ma una piccola guida visiva. Guarda un video, poi cerca le stesse texture intorno al Palais de l'Europe, al centro storico, al lungomare e nei borghi vicini.", "Це не повна фільмографія, а короткий візуальний гід. Подивіться кліп, а потім шукайте ті самі фактури біля Palais de l'Europe, у старому місті, на набережній і в сусідніх селах."),
        ],
        relatedPlaceIds: ["palais-de-leurope-menton", "rue-saint-michel-menton", "quai-bonaparte-menton"],
      },
      {
        heading: t("Dimitri von Buren - Sunny Days", "Dimitri von Buren - Sunny Days", "Dimitri von Buren - Sunny Days", "Dimitri von Buren - Sunny Days"),
        body: [
          t("Dimitri von Buren's official video for Sunny Days was filmed in Menton in summer 2022. It fits the town naturally: bright streets, relaxed movement and the kind of light that makes even a short walk feel cinematic.", "Le clip officiel Sunny Days de Dimitri von Buren a ete tourne a Menton pendant l'ete 2022. Il correspond naturellement a la ville: rues lumineuses, mouvement detendu et cette lumiere qui rend meme une courte marche cinematographique.", "Il video ufficiale Sunny Days di Dimitri von Buren e stato girato a Mentone nell'estate 2022. Funziona con la citta in modo naturale: strade luminose, movimento rilassato e una luce che rende cinematografica anche una breve passeggiata.", "Офіційне відео Sunny Days Дімітрі фон Бюрена було зняте в Ментоні влітку 2022 року. Воно природно пасує місту: світлі вулиці, розслаблений рух і світло, яке робить кінематографічною навіть коротку прогулянку."),
          t("After watching, walk the seafront and the central old-town streets rather than trying to treat the clip as a strict map. The mood matters more than one exact corner.", "Apres le visionnage, parcourez le front de mer et les rues centrales de la vieille ville plutot que de transformer le clip en carte exacte. L'ambiance compte plus qu'un angle precis.", "Dopo averlo visto, cammina sul lungomare e nelle strade centrali del centro storico invece di trattare il video come una mappa esatta. Conta piu l'atmosfera del singolo angolo.", "Після перегляду пройдіться набережною й центральними вулицями старого міста, а не намагайтеся перетворити кліп на точну мапу. Тут важливіший настрій, ніж один конкретний кут."),
        ],
        videoEmbeds: [
          {
            id: "dimitri-von-buren-sunny-days",
            provider: "youtube",
            embedUrl: "https://www.youtube-nocookie.com/embed/rBdEUKKcpuA",
            watchUrl: "https://www.youtube.com/watch?v=rBdEUKKcpuA",
            title: t("Dimitri von Buren - Sunny Days", "Dimitri von Buren - Sunny Days", "Dimitri von Buren - Sunny Days", "Dimitri von Buren - Sunny Days"),
            caption: t("Official video, filmed in Menton in summer 2022.", "Clip officiel, tourne a Menton pendant l'ete 2022.", "Video ufficiale, girato a Mentone nell'estate 2022.", "Офіційне відео, зняте в Ментоні влітку 2022 року."),
          },
        ],
        relatedPlaceIds: ["promenade-du-soleil", "rue-saint-michel-menton", "quai-bonaparte-menton"],
      },
      {
        heading: t("Yolo - Prelude", "Yolo - Prelude", "Yolo - Prelude", "Yolo - Prelude"),
        body: [
          t("Yolo's Prelude is especially useful for visitors because it connects two different textures: Palais de l'Europe in Menton and the streets of Gorbio above town. The result feels more architectural and village-like than a pure seafront clip.", "Prelude de Yolo est particulierement utile pour les visiteurs car il relie deux textures differentes: le Palais de l'Europe a Menton et les rues de Gorbio au-dessus de la ville. Le resultat est plus architectural et villageois qu'un simple clip de bord de mer.", "Prelude di Yolo e particolarmente utile per i visitatori perche collega due texture diverse: il Palais de l'Europe a Mentone e le strade di Gorbio sopra la citta. Il risultato e piu architettonico e da borgo rispetto a un semplice video sul mare.", "Prelude Yolo корисний для гостей тим, що поєднує дві різні фактури: Palais de l'Europe у Ментоні та вулиці Gorbio над містом. Відео відчувається більш архітектурним і сільським, ніж просто кліп біля моря."),
          t("Gorbio is best treated as a separate half-day idea. Check transport before going; it is close on the map but less immediate than the seafront walks.", "Gorbio se prevoit plutot comme une idee de demi-journee. Verifiez le transport avant de partir: c'est proche sur la carte, mais moins immediat qu'une promenade sur le front de mer.", "Gorbio funziona meglio come idea di mezza giornata. Controlla i trasporti prima di partire: sulla mappa e vicino, ma meno immediato delle passeggiate sul lungomare.", "Gorbio краще планувати як окрему ідею на пів дня. Перевірте транспорт перед поїздкою: на мапі це близько, але менш просто, ніж прогулянки набережною."),
        ],
        videoEmbeds: [
          {
            id: "yolo-prelude",
            provider: "external",
            watchUrl: "https://radiotopside.com/videos/yolo-prelude-clip-officiel-12",
            embed: false,
            title: t("Yolo - Prelude", "Yolo - Prelude", "Yolo - Prelude", "Yolo - Prelude"),
            caption: t("The source page hosts the official clip; the public YouTube embed is not reliably available.", "La page source heberge le clip officiel; l'integration YouTube publique n'est pas disponible de facon fiable.", "La pagina fonte ospita il clip ufficiale; l'embed pubblico di YouTube non e disponibile in modo affidabile.", "Сторінка джерела містить офіційний кліп; публічне вбудовування YouTube недоступне надійно."),
          },
        ],
        relatedPlaceIds: ["palais-de-leurope-menton", "gorbio"],
      },
      {
        heading: t("Michel Pruvot - Menton, perle de la France", "Michel Pruvot - Menton, perle de la France", "Michel Pruvot - Menton, perle de la France", "Michel Pruvot - Menton, perle de la France"),
        body: [
          t("Michel Pruvot's Menton, perle de la France is less about contemporary video style and more about affectionate local imagery. It is useful for recognising the classic Menton postcard: the old town, the church silhouette and the bay.", "Menton, perle de la France de Michel Pruvot releve moins du clip contemporain que de l'image locale affectueuse. Il aide a reconnaitre la carte postale classique de Menton: vieille ville, silhouette de l'eglise et baie.", "Menton, perle de la France di Michel Pruvot e meno un videoclip contemporaneo e piu un'immagine locale affettuosa. Aiuta a riconoscere la cartolina classica di Mentone: centro storico, profilo della chiesa e baia.", "Menton, perle de la France Мішеля Прюво - це не стільки сучасна відеоестетика, скільки теплий локальний образ. Він допомагає впізнати класичну листівку Ментона: старе місто, силует церкви й бухту."),
        ],
        videoEmbeds: [
          {
            id: "michel-pruvot-menton-perle-de-la-france",
            provider: "youtube",
            embedUrl: "https://www.youtube-nocookie.com/embed/yXVHAAf9r40",
            watchUrl: "https://www.youtube.com/watch?v=yXVHAAf9r40",
            title: t("Michel Pruvot - Menton, perle de la France", "Michel Pruvot - Menton, perle de la France", "Michel Pruvot - Menton, perle de la France", "Michel Pruvot - Menton, perle de la France"),
            caption: t("A local-song view of Menton's familiar silhouettes.", "Une vision chanson locale des silhouettes familieres de Menton.", "Uno sguardo da canzone locale sulle silhouette familiari di Mentone.", "Локальний пісенний погляд на знайомі силуети Ментона."),
          },
        ],
        relatedPlaceIds: ["basilica-saint-michel-archange", "quai-bonaparte-menton", "promenade-du-soleil"],
      },
      {
        heading: t("Festival, citrus and nearby Riviera clips", "Festival, agrumes et clips Riviera proches", "Festival, agrumi e video Riviera vicini", "Фестиваль, цитрусові та сусідні відео Рив'єри"),
        body: [
          t("Menton also appears constantly in short festival and tourism videos, especially around the Fete du Citron. These are not always music videos in the strict sense, but they are part of the town's visual culture: citrus sculptures, processions, brass bands, crowds and winter light.", "Menton apparait aussi souvent dans des videos courtes de festival et de tourisme, surtout autour de la Fete du Citron. Ce ne sont pas toujours des clips musicaux au sens strict, mais ils font partie de la culture visuelle de la ville: sculptures d'agrumes, corsos, fanfares, foule et lumiere d'hiver.", "Mentone appare spesso anche in brevi video turistici e di festival, soprattutto intorno alla Festa del Limone. Non sono sempre videoclip in senso stretto, ma fanno parte della cultura visiva della citta: sculture di agrumi, cortei, bande, folla e luce invernale.", "Ментон часто з'являється і в коротких фестивальних та туристичних відео, особливо навколо Fete du Citron. Це не завжди музичні кліпи у строгому сенсі, але це частина візуальної культури міста: цитрусові скульптури, процесії, оркестри, натовпи й зимове світло."),
          t("Some Riviera videos are nearby rather than Menton itself. Florent Pagny's Si une chanson, for example, is useful context for the wider coastal mood, but it should not be read as a Menton filming-location guide.", "Certains clips Riviera sont proches sans etre tournes a Menton meme. Si une chanson de Florent Pagny, par exemple, donne un contexte d'ambiance cotiere, mais ne doit pas etre lu comme un guide de lieux de tournage a Menton.", "Alcuni video Riviera sono vicini ma non a Mentone. Si une chanson di Florent Pagny, per esempio, aiuta a capire l'atmosfera costiera piu ampia, ma non va letto come guida alle location mentonesi.", "Деякі відео Рив'єри радше сусідні, ніж ментонські. Наприклад, Si une chanson Флорана Паньї корисне як контекст ширшого узбережного настрою, але не як гід по місцях зйомки в Ментоні."),
        ],
        videoEmbeds: [
          {
            id: "florent-pagny-si-une-chanson",
            provider: "vimeo",
            embedUrl: "https://player.vimeo.com/video/359401472",
            watchUrl: "https://vimeo.com/359401472",
            title: t("Florent Pagny - Si une chanson", "Florent Pagny - Si une chanson", "Florent Pagny - Si une chanson", "Florent Pagny - Si une chanson"),
            caption: t("Nearby Riviera context rather than a confirmed Menton filming-location item.", "Contexte Riviera proche plutot qu'un lieu de tournage confirme a Menton.", "Contesto Riviera vicino, non un luogo di ripresa confermato a Mentone.", "Контекст сусідньої Рив'єри, а не підтверджена ментонська локація зйомки."),
          },
        ],
        relatedEventIds: ["menton-lemon-festival"],
        relatedPlaceIds: ["jardins-bioves", "palais-de-leurope-menton", "promenade-du-soleil"],
      },
      {
        heading: t("Suggested Menton music-video walk", "Balade suggeree autour des clips a Menton", "Passeggiata suggerita tra i video a Mentone", "Запропонована прогулянка музичними відео Ментона"),
        body: [
          t("Start at Palais de l'Europe, then drift towards Rue Saint-Michel and the old town. Climb towards Basilica Saint-Michel-Archange if you want the postcard view, return down towards Quai Bonaparte and finish along Promenade du Soleil.", "Commencez au Palais de l'Europe, puis glissez vers la Rue Saint-Michel et la vieille ville. Montez vers la basilique Saint-Michel-Archange pour la vue carte postale, redescendez vers le Quai Bonaparte et terminez par la Promenade du Soleil.", "Inizia dal Palais de l'Europe, poi vai verso Rue Saint-Michel e il centro storico. Sali verso la Basilica Saint-Michel-Archange per la vista da cartolina, scendi verso Quai Bonaparte e chiudi sulla Promenade du Soleil.", "Почніть біля Palais de l'Europe, потім ідіть до Rue Saint-Michel і старого міста. Підніміться до Basilica Saint-Michel-Archange за листівковим видом, спустіться до Quai Bonaparte і завершіть на Promenade du Soleil."),
          t("This route is not a claim that every shot was filmed at each stop. It is a practical way to feel the same visual language: ochre facades, blue sea, stairs, arcades, palms and reflected light.", "Ce parcours ne pretend pas que chaque plan a ete tourne a chaque arret. C'est une maniere pratique de retrouver le meme langage visuel: facades ocres, mer bleue, escaliers, arcades, palmiers et lumiere reflechie.", "Questo percorso non sostiene che ogni inquadratura sia stata girata in ogni tappa. E un modo pratico per sentire lo stesso linguaggio visivo: facciate ocra, mare blu, scale, arcate, palme e luce riflessa.", "Цей маршрут не стверджує, що кожен кадр знімали в кожній точці. Це практичний спосіб відчути ту саму візуальну мову: охристі фасади, синє море, сходи, аркади, пальми й відбите світло."),
        ],
        relatedPlaceIds: ["palais-de-leurope-menton", "rue-saint-michel-menton", "basilica-saint-michel-archange", "quai-bonaparte-menton", "promenade-du-soleil"],
      },
      {
        heading: t("Staying in Menton if you love visual culture", "Sejourner a Menton si vous aimez la culture visuelle", "Soggiornare a Mentone se ami la cultura visiva", "Де зупинитися в Ментоні, якщо вам близька візуальна культура"),
        body: [
          t("One advantage of staying in Menton is that visual walks do not require a special plan. You can watch a video in the morning, step outside for similar colours and views, then return to a quiet seaside apartment between photo walks, theatre evenings or day trips.", "L'un des avantages d'un sejour a Menton est que les balades visuelles ne demandent pas de grand programme. Regardez une video le matin, sortez retrouver les memes couleurs et vues, puis revenez dans un appartement calme au bord de mer entre photos, theatre ou excursions.", "Uno dei vantaggi di soggiornare a Mentone e che le passeggiate visive non richiedono un piano speciale. Guarda un video al mattino, esci a ritrovare colori e viste simili, poi torna in un appartamento tranquillo sul mare tra foto, teatro o gite.", "Перевага перебування в Ментоні в тому, що візуальні прогулянки не потребують складного плану. Подивіться відео вранці, вийдіть за схожими кольорами й видами, а потім поверніться до тихих апартаментів біля моря між фотопрогулянками, театральними вечорами або поїздками."),
        ],
        relatedApartmentKeys: allApartments,
      },
      {
        heading: t("FAQ", "FAQ", "FAQ", "FAQ"),
        body: [
          t("Are there many famous music videos filmed in Menton? Not many. Menton is more of a small visual backdrop than a major music-video destination, which is why this guide stays selective.", "Y a-t-il beaucoup de clips celebres tournes a Menton? Non. Menton est plutot un petit decor visuel qu'une grande destination de clips, d'ou le choix selectif de ce guide.", "Ci sono molti videoclip famosi girati a Mentone? No. Mentone e piu un piccolo sfondo visivo che una grande destinazione per videoclip, per questo la guida resta selettiva.", "Чи багато відомих музичних кліпів знято в Ментоні? Ні. Ментон радше невелика візуальна декорація, ніж великий центр музичних відео, тому цей гід залишається вибірковим."),
          t("Can I visit the locations on foot? Most central Menton places are walkable. Gorbio is a separate village above Menton and needs a separate transport check.", "Peut-on visiter les lieux a pied? La plupart des lieux centraux de Menton se font a pied. Gorbio est un village separe au-dessus de Menton et demande de verifier le transport.", "Posso visitare i luoghi a piedi? La maggior parte dei luoghi centrali di Mentone e raggiungibile a piedi. Gorbio e un borgo separato sopra Mentone e richiede un controllo dei trasporti.", "Чи можна відвідати локації пішки? Більшість центральних місць Ментона доступні пішки. Gorbio - окреме село над Ментоном, для нього треба перевірити транспорт."),
        ],
      },
    ],
    practicalTips: [
      t("Treat exact filming spots as editorial notes unless the source states them clearly.", "Considerez les lieux de tournage exacts comme des notes editoriales sauf si la source les confirme clairement.", "Considera i luoghi esatti di ripresa come note editoriali salvo conferma chiara della fonte.", "Сприймайте точні місця зйомки як редакційні нотатки, якщо джерело не підтверджує їх прямо."),
      t("For your own photos or short videos, early morning and late afternoon give the softest light.", "Pour vos photos ou courtes videos, le matin tot et la fin d'apres-midi donnent la lumiere la plus douce.", "Per foto o brevi video, mattina presto e tardo pomeriggio danno la luce piu morbida.", "Для власних фото або коротких відео найм'якше світло зранку та наприкінці дня."),
      t("Check access and current programmes before planning around Palais de l'Europe.", "Verifiez l'acces et le programme actuel avant d'organiser une visite autour du Palais de l'Europe.", "Controlla accesso e programma aggiornato prima di organizzarti intorno al Palais de l'Europe.", "Перевіряйте доступ і актуальну програму, якщо плануєте щось навколо Palais de l'Europe."),
    ],
  }),
  shortArticle({
    id: "best-photo-spots-menton",
    slug: "best-photo-spots-menton",
    title: t("Best photo spots in Menton", "Meilleurs spots photo a Menton", "Migliori luoghi fotografici a Mentone", "Найкращі місця для фото в Ментоні"),
    seoTitle: t("Best Photo Spots in Menton | Azur Menton Guide", "Meilleurs spots photo a Menton | Guide Azur Menton", "Migliori spot fotografici a Mentone | Guida Azur Menton", "Найкращі місця для фото в Ментоні | Гід Azur Menton"),
    seoDescription: t("A half-day photo guide to Menton: old-town colour, Rampes Saint-Michel, seafront lines, gardens, Port de Garavan and nearby Riviera photo ideas.", "Guide photo d'une demi-journee a Menton: couleurs de la vieille ville, Rampes Saint-Michel, lignes du front de mer, jardins, Port de Garavan et idees Riviera proches.", "Guida fotografica di mezza giornata a Mentone: colori del centro storico, Rampes Saint-Michel, linee del lungomare, giardini, Port de Garavan e idee Riviera vicine.", "Фотогід Ментоном на пів дня: кольори старого міста, Rampes Saint-Michel, лінії набережної, сади, Port de Garavan і найближчі фотоідеї Рив'єри."),
    excerpt: t("Menton is compact enough to collect old-town colours, staircases, sea views, gardens and Garavan in half a day, mostly on foot from central apartments.", "Menton est assez compacte pour reunir couleurs de vieille ville, escaliers, vues mer, jardins et Garavan en une demi-journee, surtout a pied depuis les appartements centraux.", "Mentone e abbastanza compatta per raccogliere colori del centro storico, scale, viste mare, giardini e Garavan in mezza giornata, quasi tutto a piedi dagli appartamenti centrali.", "Ментон достатньо компактний, щоб за пів дня зібрати кольори старого міста, сходи, море, сади й Garavan, здебільшого пішки від центральних апартаментів."),
    category: "photo-spots",
    coverImage: "/images/guide/best-photo-spots-menton.jpg",
    coverImageAlt: t("Illustration of photo spots in Menton", "Illustration des spots photo a Menton", "Illustrazione dei luoghi fotografici a Mentone", "Ілюстрація місць для фото в Ментоні"),
    visualTheme: "old-town",
    visualStatus: "project_illustration",
    tags: [t("views", "vues", "viste", "краєвиди"), t("old town", "vieille ville", "centro storico", "старе місто"), t("gardens", "jardins", "giardini", "сади"), t("Garavan", "Garavan", "Garavan", "Garavan")],
    bestFor: [guideBestForOptions[0].label, guideBestForOptions[7].label, guideBestForOptions[3].label],
    duration: "half-day",
    locationTags: ["old-town", "seafront", "garavan", "monaco", "nice"],
    featured: true,
    relatedPlaces: ["rampes-saint-michel", "basilica-saint-michel-archange", "promenade-du-soleil", "jardin-serre-de-la-madone", "jardin-val-rahmeh", "cimetiere-vieux-chateau", "quai-bonaparte-menton", "musee-jean-cocteau-bastion", "port-de-garavan", "rondelli-garavan-side", "sentier-douaniers-menton", "plage-sablettes", "plage-casino", "casino-barriere-menton", "gorbio", "roquebrune-cap-martin-coastal-walk", "monaco-monte-carlo", "nice-old-town"],
    relatedArticles: ["famous-paintings-of-menton", "music-videos-filmed-in-menton", "quiet-evening-in-menton", "menton-old-town", "best-beaches-in-menton", "menton-one-day-itinerary", "menton-three-day-itinerary", "where-to-stay-in-menton", "day-trips-from-menton", "menton-without-a-car"],
    relatedEvents: ["menton-lemon-festival"],
    relatedApartments: seaViewApartments,
    sections: [
      {
        heading: t("Old town colour and height", "Couleurs et hauteurs de la vieille ville", "Colore e altezza del centro storico", "Колір і висота старого міста"),
        body: [
          t(
            "Menton is compact enough to collect many different photos in half a day: coloured old-town streets, staircases, sea views, gardens and the quieter lines of Port de Garavan. Most of the best spots are walkable from central apartments, so keep your camera or phone light.",
            "Menton est assez compacte pour reunir beaucoup de photos differentes en une demi-journee : rues colorees, escaliers, vues mer, jardins et lignes plus calmes du Port de Garavan. La plupart des meilleurs spots se font a pied depuis les appartements centraux, donc gardez votre appareil ou telephone leger.",
            "Mentone e abbastanza compatta per raccogliere molte foto diverse in mezza giornata: vie colorate del centro storico, scale, viste mare, giardini e le linee piu tranquille di Port de Garavan. La maggior parte dei punti migliori e raggiungibile a piedi dagli appartamenti centrali, quindi viaggia leggero con fotocamera o telefono.",
            "Ментон достатньо компактний, щоб за пів дня зібрати багато різних фото: кольорові вулиці старого міста, сходи, море, сади й спокійніші лінії Port de Garavan. Більшість найкращих точок доступні пішки від центральних апартаментів, тому камера або телефон можуть бути легкими.",
          ),
          t(
            "Start in the old town and climb Les Rampes Saint-Michel slowly. From here you get the classic Menton image: pastel facades, church towers and pieces of sea framed by stairs and railings. Try straight lines up the steps, side angles from landings and roof views towards the harbour.",
            "Commencez dans la vieille ville et montez lentement les Rampes Saint-Michel. C'est ici que vous obtenez l'image classique de Menton : facades pastel, clochers et morceaux de mer encadres par les escaliers et rampes. Essayez les lignes droites vers le haut, les angles lateraux depuis les paliers et les vues de toits vers le port.",
            "Inizia nel centro storico e sali lentamente Les Rampes Saint-Michel. Da qui ottieni l'immagine classica di Mentone: facciate pastello, campanili e pezzi di mare incorniciati da scale e ringhiere. Prova linee dritte sulle scale, angoli laterali dai pianerottoli e viste sui tetti verso il porto.",
            "Почніть у старому місті й повільно піднімайтеся Les Rampes Saint-Michel. Звідси виходить класичний кадр Ментона: пастельні фасади, церковні вежі й шматки моря, обрамлені сходами та поручнями. Спробуйте прямі лінії сходів, бокові ракурси з майданчиків і види над дахами до порту.",
          ),
          t(
            "Continue higher to the Cimetière du Vieux Château for panoramic views over the bay and Italian border. Morning light is softer; closer to sunset you get warmer tones and longer shadows. Move along the paths to include the marina, Cap Martin or Plage des Sablettes below.",
            "Continuez plus haut vers le Cimetière du Vieux Château pour les panoramas sur la baie et la frontiere italienne. La lumiere du matin est plus douce ; pres du coucher du soleil, les tons deviennent plus chauds et les ombres plus longues. Avancez dans les allees pour inclure la marina, le Cap Martin ou la Plage des Sablettes en contrebas.",
            "Continua piu in alto verso il Cimetière du Vieux Château per panorami sulla baia e sul confine italiano. La luce del mattino e piu morbida; vicino al tramonto arrivano toni piu caldi e ombre lunghe. Muoviti lungo i vialetti per includere marina, Cap Martin o Plage des Sablettes sotto.",
            "Підніміться вище до Cimetière du Vieux Château для панорам на бухту й італійський кордон. Ранкове світло м'якше; ближче до заходу сонця з'являються тепліші тони й довші тіні. Рухайтеся доріжками, щоб включити в кадр марину, Cap Martin або Plage des Sablettes унизу.",
          ),
        ],
        relatedPlaceIds: ["rampes-saint-michel", "basilica-saint-michel-archange", "cimetiere-vieux-chateau", "quai-bonaparte-menton", "plage-sablettes"],
      },
      {
        heading: t("Gardens and details", "Jardins et details", "Giardini e dettagli", "Сади й деталі"),
        body: [
          t(
            "If you enjoy plants and textures, add one garden stop after checking opening hours. Jardin Botanique Val Rahmeh gives dense, almost jungle-like corners, large leaves, flowers and shaded benches for close-ups and calm vertical shots.",
            "Si vous aimez les plantes et les textures, ajoutez un jardin apres avoir verifie les horaires. Le Jardin Botanique Val Rahmeh offre des coins denses, presque tropicaux, de grandes feuilles, fleurs et bancs ombrages pour les gros plans et les cadrages verticaux calmes.",
            "Se ti piacciono piante e texture, aggiungi una tappa in giardino dopo aver controllato gli orari. Jardin Botanique Val Rahmeh offre angoli densi, quasi tropicali, grandi foglie, fiori e panchine ombreggiate per dettagli e scatti verticali tranquilli.",
            "Якщо любите рослини й текстури, додайте один сад після перевірки годин роботи. Jardin Botanique Val Rahmeh дає густі, майже джунглеві куточки, великі листки, квіти й затінені лавки для крупних планів і спокійних вертикальних кадрів.",
          ),
          t(
            "Jardin Serre de la Madone, farther inland, is quieter and more structured, with terraces, water features and a slower feel that suits detail photography. Garden hours and entry conditions change, so treat gardens as flexible additions rather than the only anchor of the day.",
            "Le Jardin Serre de la Madone, plus en retrait, est plus calme et structure, avec terrasses, jeux d'eau et un rythme plus lent qui convient aux photos de details. Les horaires et conditions d'entree changent : gardez les jardins comme options flexibles plutot que comme seul pilier de la journee.",
            "Jardin Serre de la Madone, piu interno, e piu tranquillo e strutturato, con terrazze, giochi d'acqua e un ritmo lento adatto alla fotografia di dettaglio. Orari e condizioni d'ingresso cambiano, quindi considera i giardini come aggiunte flessibili, non come unico perno della giornata.",
            "Jardin Serre de la Madone, далі вглиб, спокійніший і структурованіший: тераси, вода й повільніший ритм добре підходять для деталей. Години роботи й умови входу змінюються, тому сприймайте сади як гнучке доповнення, а не єдину основу дня.",
          ),
        ],
        relatedPlaceIds: ["jardin-val-rahmeh", "jardin-serre-de-la-madone"],
      },
      {
        heading: t("Seafront lines and Promenade du Soleil", "Lignes du front de mer et Promenade du Soleil", "Linee sul mare e Promenade du Soleil", "Лінії набережної та Promenade du Soleil"),
        body: [
          t(
            "Back at sea level, Promenade du Soleil is the simplest place to collect Menton's coastal moods. Morning brings clear water light, joggers and dog walkers; evening brings silhouettes, warm tones and reflections on the bay.",
            "De retour au niveau de la mer, la Promenade du Soleil est l'endroit le plus simple pour capter les ambiances cotieres de Menton. Le matin apporte une lumiere claire sur l'eau, joggeurs et promeneurs de chiens ; le soir, silhouettes, tons chauds et reflets sur la baie.",
            "Tornando al livello del mare, Promenade du Soleil e il luogo piu semplice per raccogliere gli umori costieri di Mentone. Al mattino ci sono luce chiara sull'acqua, runner e persone con i cani; la sera arrivano silhouette, toni caldi e riflessi sulla baia.",
            "Повернувшись до рівня моря, Promenade du Soleil - найпростіше місце для морських настроїв Ментона. Зранку тут чисте світло над водою, бігуни й люди з собаками; увечері - силуети, теплі тони й віддзеркалення в бухті.",
          ),
          t(
            "Use the curve of the promenade, lampposts and palm trees as leading lines. Plage des Sablettes and the old port are ideal for the postcard skyline: from the beach, put the sea in the foreground; from the port, use boats, masts and reflections.",
            "Utilisez la courbe de la promenade, les lampadaires et les palmiers comme lignes directrices. La Plage des Sablettes et le vieux port sont parfaits pour la silhouette carte postale : depuis la plage, mettez la mer au premier plan ; depuis le port, utilisez bateaux, mats et reflets.",
            "Usa la curva della passeggiata, lampioni e palme come linee guida. Plage des Sablettes e il vecchio porto sono ideali per lo skyline da cartolina: dalla spiaggia metti il mare in primo piano; dal porto usa barche, alberi e riflessi.",
            "Використовуйте вигин набережної, ліхтарі й пальми як провідні лінії. Plage des Sablettes і старий порт ідеальні для листівкового силуету: з пляжу поставте море на передній план, з порту використовуйте човни, щогли й віддзеркалення.",
          ),
        ],
        relatedPlaceIds: ["promenade-du-soleil", "plage-sablettes", "plage-casino", "casino-barriere-menton", "musee-jean-cocteau-bastion"],
      },
      {
        heading: t("Port de Garavan and quieter corners", "Port de Garavan et coins plus calmes", "Port de Garavan e angoli piu tranquilli", "Port de Garavan і тихіші куточки"),
        body: [
          t(
            "Walking east towards Port de Garavan changes the rhythm. The marina is quieter than the central seafront, with boats, masts and pontoons you can use to frame the old town in the distance. From the far side, Menton rises differently above the curve of the bay.",
            "En marchant vers l'est, le Port de Garavan change le rythme. La marina est plus calme que le front de mer central, avec bateaux, mats et pontons pour encadrer la vieille ville au loin. Depuis le cote oppose, Menton se leve autrement au-dessus de la courbe de la baie.",
            "Camminando verso est, Port de Garavan cambia ritmo. La marina e piu tranquilla del lungomare centrale, con barche, alberi e pontili che puoi usare per incorniciare il centro storico in lontananza. Dal lato opposto, Mentone sale in modo diverso sopra la curva della baia.",
            "Якщо йти на схід до Port de Garavan, ритм змінюється. Марина спокійніша за центральну набережну, з човнами, щоглами й понтонами, якими можна обрамити старе місто вдалині. З протилежного боку Ментон інакше піднімається над вигином бухти.",
          ),
          t(
            "The streets and staircases above Garavan offer more intimate details: shutters, balcony plants, narrow alleys and glimpses of sea between houses. It is a good area to wander without a strict plan if you like textures more than wide scenes.",
            "Les rues et escaliers au-dessus de Garavan offrent des details plus intimes : volets, plantes de balcon, ruelles et apercus de mer entre les maisons. C'est un bon secteur pour errer sans programme strict si vous aimez les textures plus que les grands panoramas.",
            "Le strade e scale sopra Garavan offrono dettagli piu intimi: persiane, piante sui balconi, vicoli stretti e scorci di mare tra le case. E una buona zona per vagare senza programma se ti piacciono le texture piu delle grandi scene.",
            "Вулиці й сходи над Garavan дають інтимніші деталі: віконниці, рослини на балконах, вузькі провулки й проблиски моря між будинками. Це хороший район для прогулянки без жорсткого плану, якщо вам цікавіші текстури, ніж широкі панорами.",
          ),
        ],
        relatedPlaceIds: ["port-de-garavan", "rondelli-garavan-side", "sentier-douaniers-menton"],
      },
      {
        heading: t("Beyond Menton: Monaco, Nice, sea and mountains", "Au-dela de Menton: Monaco, Nice, mer et montagnes", "Oltre Mentone: Monaco, Nizza, mare e montagne", "За межами Ментона: Монако, Ніцца, море й гори"),
        body: [
          t(
            "If you want to expand your photo map, Monaco and Nice are easy day or half-day trips by train. Monaco gives harbour, the Rock and Casino-area city-by-the-sea images; Nice gives Promenade des Anglais, old-town alleys and market scenes around Cours Saleya.",
            "Si vous voulez elargir votre carte photo, Monaco et Nice se font facilement en journee ou demi-journee en train. Monaco offre le port, le Rocher et les images ville-sur-mer autour du Casino ; Nice apporte la Promenade des Anglais, les ruelles de vieille ville et les scenes de marche autour du Cours Saleya.",
            "Se vuoi ampliare la mappa fotografica, Monaco e Nizza sono facili in giornata o mezza giornata in treno. Monaco offre porto, Rocca e immagini di citta sul mare intorno al Casino; Nizza offre Promenade des Anglais, vicoli del centro storico e scene di mercato al Cours Saleya.",
            "Якщо хочете розширити фотокарту, Монако й Ніцца легко зробити як денну або південну поїздку потягом. Монако дає порт, Rock і міські морські кадри навколо Casino; Ніцца - Promenade des Anglais, провулки старого міста й ринкові сцени біля Cours Saleya.",
          ),
          t(
            "If you are comfortable on the water, a boat or yacht outing gives a very different angle on Menton, Cap Martin and the coast, with hills behind the town. In the other direction, short trips into hill villages above Menton offer stone houses, narrow streets and balcony-style sea views.",
            "Si vous etes a l'aise sur l'eau, une sortie en bateau ou yacht donne un angle tres different sur Menton, le Cap Martin et la cote, avec les collines derriere la ville. Dans l'autre direction, de courtes excursions vers les villages de hauteur offrent maisons en pierre, ruelles et vues balcon sur la mer.",
            "Se ti senti a tuo agio sull'acqua, un'uscita in barca o yacht offre un angolo molto diverso su Mentone, Cap Martin e la costa, con le colline dietro la citta. Nell'altra direzione, brevi gite nei villaggi sopra Mentone offrono case in pietra, strade strette e viste a balcone sul mare.",
            "Якщо вам комфортно на воді, вихід на човні або яхті дає зовсім інший ракурс Ментона, Cap Martin і узбережжя, з пагорбами позаду міста. В іншому напрямку короткі поїздки в села над Ментоном дають кам'яні будинки, вузькі вулиці й балконні види на море.",
          ),
          t(
            "Whichever combination you choose, plan one or two key spots for sunrise or sunset and keep the rest of the day flexible. That is usually enough for a strong photo set without turning the whole trip into a checklist.",
            "Quel que soit votre choix, prevoyez un ou deux spots cles pour le lever ou le coucher du soleil et gardez le reste de la journee flexible. C'est souvent suffisant pour une belle serie sans transformer le voyage en liste a cocher.",
            "Qualunque combinazione tu scelga, programma uno o due punti chiave per alba o tramonto e lascia il resto della giornata flessibile. Di solito basta per una serie forte senza trasformare il viaggio in una checklist.",
            "Яку б комбінацію ви не обрали, заплануйте одну-дві ключові точки на світанок або захід сонця, а решту дня залиште гнучкою. Зазвичай цього достатньо для сильного набору фото без перетворення всієї поїздки на чеклист.",
          ),
        ],
        relatedPlaceIds: ["monaco-monte-carlo", "nice-old-town", "roquebrune-cap-martin-coastal-walk", "gorbio"],
      },
    ],
    practicalTips: [
      t("Start light: most Menton photo spots are walkable from central apartments.", "Partez leger : la plupart des spots photo de Menton se font a pied depuis les appartements centraux.", "Parti leggero: la maggior parte dei punti foto di Mentone e raggiungibile a piedi dagli appartamenti centrali.", "Виходьте легко: більшість фототочок Ментона доступні пішки від центральних апартаментів."),
      t("Check garden opening hours before planning around them.", "Verifiez les horaires des jardins avant d'organiser la journee autour d'eux.", "Controlla gli orari dei giardini prima di organizzarci la giornata.", "Перед плануванням навколо садів перевірте їхні години роботи."),
      t("Save at least one key viewpoint for sunrise or sunset.", "Gardez au moins un point de vue cle pour le lever ou le coucher du soleil.", "Tieni almeno un punto panoramico chiave per alba o tramonto.", "Залиште хоча б одну ключову точку для світанку або заходу сонця."),
    ],
  }),
  shortArticle({
    id: "best-beaches-in-menton",
    slug: "best-beaches-in-menton",
    title: t("Best beaches in Menton: which one to choose", "Meilleures plages de Menton: laquelle choisir", "Migliori spiagge di Mentone: quale scegliere", "Найкращі пляжі Ментона: який обрати"),
    seoTitle: t("Best Beaches in Menton | Azur Menton", "Meilleures plages de Menton | Azur Menton", "Migliori spiagge di Mentone | Azur Menton", "Найкращі пляжі Ментона | Azur Menton"),
    seoDescription: t("Compare Sablettes, Fossan, central promenade beaches and Borrigo beaches for families, couples, quick swims and car-free beach days.", "Comparez Sablettes, Fossan, les plages de la promenade et Borrigo pour familles, couples, baignades rapides et sejours sans voiture.", "Confronta Sablettes, Fossan, le spiagge della passeggiata e Borrigo per famiglie, coppie, bagni rapidi e soggiorni senza auto.", "Порівняйте Sablettes, Fossan, пляжі вздовж набережної та Borrigo для сімей, пар, швидкого купання й відпочинку без авто."),
    excerpt: t("Menton has no single best beach: choose Sablettes for postcard views, Fossan for a calmer central swim, promenade beaches for convenience and Borrigo for space.", "Menton n'a pas une seule meilleure plage: choisissez Sablettes pour la vue carte postale, Fossan pour une baignade centrale plus calme, la promenade pour la facilite et Borrigo pour l'espace.", "Mentone non ha una sola spiaggia migliore: scegli Sablettes per la vista da cartolina, Fossan per un bagno centrale piu calmo, la passeggiata per comodita e Borrigo per lo spazio.", "У Ментоні немає одного найкращого пляжу: Sablettes для листівкового виду, Fossan для спокійнішого купання в центрі, пляжі набережної для зручності, Borrigo для простору."),
    category: "beaches",
    coverImage: "/images/guide/best-beaches-in-menton.jpg",
    coverImageAlt: t("Illustration of Menton beaches", "Illustration des plages de Menton", "Illustrazione delle spiagge di Mentone", "Ілюстрація пляжів Ментона"),
    visualTheme: "beach",
    visualStatus: "project_illustration",
    tags: [t("Sablettes", "Sablettes", "Sablettes", "Sablettes"), t("family beach", "plage famille", "spiaggia famiglie", "пляж для сімей")],
    bestFor: [guideBestForOptions[1].label, guideBestForOptions[0].label, guideBestForOptions[3].label, guideBestForOptions[4].label],
    duration: "half-day",
    locationTags: ["seafront", "menton-centre", "garavan"],
    featured: true,
    relatedPlaces: ["plage-sablettes", "plage-casino", "plage-rondelli", "rondelli-garavan-side", "plage-fossan", "borrigo-beaches", "promenade-du-soleil", "gelateria-sofia-menton", "quai-bonaparte-menton", "musee-jean-cocteau-bastion"],
    relatedArticles: ["cycling-bike-rental-menton", "skateparks-near-menton", "best-ice-cream-menton", "menton-with-kids-family-guide", "supermarkets-in-menton", "stay-cool-in-menton-summer", "menton-one-day-itinerary", "where-to-stay-in-menton", "menton-without-a-car", "public-transport-in-menton"],
    relatedApartments: allApartments,
    sections: [
      {
        heading: t("Choose by the kind of beach day", "Choisir selon le type de journee", "Scegli in base alla giornata", "Обирайте за типом пляжного дня"),
        body: [
          t(
            "Menton does not have one single best beach. It has a small set of different spots that work for different moods: Sablettes for the postcard view and family setup, Fossan for a calmer central swim, the promenade beaches for convenience and Borrigo for longer walks and more space.",
            "Menton n'a pas une seule meilleure plage. La ville offre plutot un petit ensemble de lieux adaptes a des envies differentes : Sablettes pour la vue carte postale et le cote familial, Fossan pour une baignade centrale plus calme, les plages de la promenade pour la facilite et Borrigo pour les longues marches et l'espace.",
            "Mentone non ha una sola spiaggia migliore. Ha invece un piccolo gruppo di luoghi adatti a giornate diverse: Sablettes per la vista da cartolina e l'atmosfera familiare, Fossan per un bagno centrale piu tranquillo, le spiagge della passeggiata per comodita e Borrigo per camminare di piu e avere spazio.",
            "У Ментоні немає одного найкращого пляжу. Тут є кілька різних місць для різного настрою: Sablettes для листівкового виду й сімейного формату, Fossan для спокійнішого купання в центрі, пляжі вздовж набережної для зручності, Borrigo для довших прогулянок і простору.",
          ),
        ],
        relatedPlaceIds: ["plage-sablettes", "plage-casino", "plage-fossan", "borrigo-beaches"],
      },
      {
        heading: t("Plage des Sablettes: families and Menton views", "Plage des Sablettes: familles et vues de Menton", "Plage des Sablettes: famiglie e viste su Mentone", "Plage des Sablettes: сім'ї та краєвиди Ментона"),
        body: [
          t(
            "Plage des Sablettes is the beach many visitors imagine first: a curve of sand and fine shingle at the foot of the old town, with church towers and coloured facades behind you. It is a strong all-round choice for families and first-time visitors, with views towards Italy and a mix of public beach space and seasonal private beach options.",
            "La Plage des Sablettes est souvent l'image que les visiteurs ont de Menton : une courbe de sable et petits galets au pied de la vieille ville, avec clochers et facades colorees en arriere-plan. C'est un tres bon choix polyvalent pour les familles et les premiers sejours, avec vue vers l'Italie et un melange d'espace public et d'options privees saisonnieres.",
            "Plage des Sablettes e spesso la spiaggia che i visitatori immaginano per prima: una curva di sabbia e ghiaia fine ai piedi del centro storico, con campanili e facciate colorate dietro. E una scelta molto completa per famiglie e prime visite, con vista verso l'Italia e un mix di spiaggia pubblica e opzioni private stagionali.",
            "Plage des Sablettes - це пляж, який багато гостей уявляють першим: дуга піску й дрібної гальки біля підніжжя старого міста, з вежами церков і кольоровими фасадами позаду. Це сильний універсальний варіант для сімей і першого знайомства з Ментоном, з видом у бік Італії та поєднанням громадської зони й сезонних приватних пляжних опцій.",
          ),
          t(
            "Behind the beach, Esplanade des Sablettes has restaurants and bars for a relaxed post-swim meal or evening drink. Names and opening patterns change by season, so treat places such as Pecora Negra, Mediterraneo, Les Incompris or Les Sablettes Beach Club as addresses to check before you plan around them.",
            "Derriere la plage, l'Esplanade des Sablettes reunit restaurants et bars pour un repas detendu apres la baignade ou un verre en soiree. Les noms et horaires changent selon la saison : considerez des adresses comme Pecora Negra, Mediterraneo, Les Incompris ou Les Sablettes Beach Club comme des lieux a verifier avant de construire votre programme.",
            "Dietro la spiaggia, l'Esplanade des Sablettes ha ristoranti e bar per un pasto rilassato dopo il bagno o un drink serale. Nomi e orari cambiano con la stagione: considera indirizzi come Pecora Negra, Mediterraneo, Les Incompris o Les Sablettes Beach Club come posti da controllare prima di organizzarti.",
            "За пляжем Esplanade des Sablettes має ресторани й бари для спокійного обіду після купання або вечірнього напою. Назви й години роботи змінюються за сезоном, тому такі місця, як Pecora Negra, Mediterraneo, Les Incompris або Les Sablettes Beach Club, краще перевіряти перед плануванням.",
          ),
          t(
            "A simple plan is to spend a few hours on the public part of the beach, then move to a terrace on the esplanade for an early dinner as the old town lights come on.",
            "Un programme simple : passer quelques heures sur la partie publique de la plage, puis rejoindre une terrasse de l'esplanade pour diner tot quand les lumieres de la vieille ville s'allument.",
            "Un piano semplice: passa qualche ora nella parte pubblica della spiaggia, poi spostati su una terrazza dell'esplanade per una cena presto mentre si accendono le luci del centro storico.",
            "Простий план: провести кілька годин на громадській частині пляжу, а потім перейти на терасу на еспланаді для ранньої вечері, коли в старому місті вмикаються вогні.",
          ),
        ],
        relatedPlaceIds: ["plage-sablettes"],
      },
      {
        heading: t("Plage du Fossan: a calmer central curve", "Plage du Fossan: une courbe centrale plus calme", "Plage du Fossan: una curva centrale piu calma", "Plage du Fossan: спокійніша центральна дуга"),
        body: [
          t(
            "Plage du Fossan sits closer to the town centre, near Esplanade Francis Palmero and the Jean Cocteau / Bastion area. It has a slightly calmer feel and a wide wooden esplanade that can work almost like a seaside amphitheatre for sunbathing and watching the water.",
            "La Plage du Fossan est plus proche du centre, pres de l'Esplanade Francis Palmero et du secteur Jean Cocteau / Bastion. Son ambiance est un peu plus calme, avec une large esplanade en bois qui fonctionne presque comme un amphitheatre face a la mer.",
            "Plage du Fossan si trova piu vicino al centro, presso l'Esplanade Francis Palmero e la zona Jean Cocteau / Bastion. Ha un'atmosfera un po' piu tranquilla e una larga esplanade in legno che funziona quasi come un anfiteatro sul mare.",
            "Plage du Fossan розташований ближче до центру, біля Esplanade Francis Palmero та зони Jean Cocteau / Bastion. Тут трохи спокійніша атмосфера й широка дерев'яна еспланада, яка працює майже як амфітеатр біля моря.",
          ),
          t(
            "Because it is central, Fossan is easy to combine with a coffee, an ice cream, a museum stop if open, or a slow walk along the beginning of Promenade du Soleil. If you are sensitive to crowds, try a weekday morning outside peak summer weekends.",
            "Comme elle est centrale, Fossan se combine facilement avec un cafe, une glace, une visite de musee si les horaires conviennent, ou une promenade lente au debut de la Promenade du Soleil. Si vous evitez la foule, essayez un matin de semaine hors grands week-ends d'ete.",
            "Essendo centrale, Fossan si combina facilmente con un caffe, un gelato, una visita al museo se aperto o una passeggiata tranquilla all'inizio della Promenade du Soleil. Se non ami la folla, prova una mattina infrasettimanale fuori dai weekend estivi di punta.",
            "Завдяки центральному розташуванню Fossan легко поєднати з кавою, морозивом, музеєм, якщо він відкритий, або повільною прогулянкою початком Promenade du Soleil. Якщо не любите натовпи, обирайте будній ранок поза піковими літніми вихідними.",
          ),
        ],
        relatedPlaceIds: ["plage-fossan", "musee-jean-cocteau-bastion", "promenade-du-soleil"],
      },
      {
        heading: t("Central promenade beaches: easy access", "Plages centrales de la promenade: acces facile", "Spiagge centrali della passeggiata: accesso facile", "Центральні пляжі набережної: максимум зручності"),
        body: [
          t(
            "Between the Casino and the Borrigo river, Promenade du Soleil is lined with smaller central beaches, mostly pebbles or mixed surfaces, directly below the main seafront road. They are practical rather than spectacular, but very convenient for a quick swim near cafes, shops and central apartments.",
            "Entre le Casino et le Borrigo, la Promenade du Soleil longe plusieurs petites plages centrales, surtout en galets ou surfaces mixtes, juste sous la route du front de mer. Elles sont plus pratiques que spectaculaires, mais tres commodes pour une baignade rapide pres des cafes, commerces et appartements centraux.",
            "Tra il Casino e il torrente Borrigo, la Promenade du Soleil costeggia piccole spiagge centrali, per lo piu di ciottoli o superfici miste, direttamente sotto la strada del lungomare. Sono piu pratiche che scenografiche, ma molto comode per un bagno veloce vicino a caffe, negozi e appartamenti centrali.",
            "Між Casino і річкою Borrigo вздовж Promenade du Soleil тягнуться менші центральні пляжі, переважно з галькою або змішаною поверхнею, просто під головною дорогою набережної. Вони радше практичні, ніж видовищні, зате дуже зручні для швидкого купання біля кав'ярень, магазинів і центральних апартаментів.",
          ),
          t(
            "This stretch works well if you want to alternate between the water, a sunbed or towel spot, and a proper sit-down meal without moving far. Beach restaurants and private areas vary by season, so walk the promenade, see what is open, and choose the mood that fits the day.",
            "Ce secteur fonctionne bien si vous voulez alterner entre l'eau, une serviette ou un transat, et un vrai repas assis sans trop bouger. Les restaurants de plage et zones privees varient selon la saison : marchez le long de la promenade, regardez ce qui est ouvert et choisissez l'ambiance du jour.",
            "Questo tratto funziona bene se vuoi alternare acqua, asciugamano o lettino, e un vero pasto seduto senza spostarti molto. Ristoranti di spiaggia e aree private cambiano con la stagione: cammina sulla passeggiata, guarda cosa e aperto e scegli l'atmosfera giusta.",
            "Ця ділянка добре підходить, якщо хочеться чергувати воду, рушник або лежак і повноцінний обід без довгих переміщень. Пляжні ресторани й приватні зони залежать від сезону: пройдіться набережною, подивіться, що відкрито, і оберіть атмосферу дня.",
          ),
        ],
        relatedPlaceIds: ["plage-casino", "promenade-du-soleil"],
      },
      {
        heading: t("Borrigo beaches: space and long walks", "Plages du Borrigo: espace et longues marches", "Spiagge del Borrigo: spazio e lunghe camminate", "Пляжі Borrigo: простір і довгі прогулянки"),
        body: [
          t(
            "Further west, towards Roquebrune-Cap-Martin, the Borrigo beaches feel wider and more open. They are mostly pebbly, usually less postcard-perfect than Sablettes, but often better if you value breathing room and a longer seafront walk.",
            "Plus a l'ouest, vers Roquebrune-Cap-Martin, les plages du Borrigo semblent plus larges et ouvertes. Elles sont surtout en galets, moins carte postale que Sablettes, mais souvent plus agreables si vous cherchez de l'espace et une vraie marche au bord de mer.",
            "Piu a ovest, verso Roquebrune-Cap-Martin, le spiagge del Borrigo sono piu ampie e aperte. Sono soprattutto di ciottoli, meno da cartolina rispetto a Sablettes, ma spesso migliori se cerchi respiro e una passeggiata piu lunga sul mare.",
            "Далі на захід, у бік Roquebrune-Cap-Martin, пляжі Borrigo здаються ширшими й відкритішими. Вони переважно галькові й менш листівкові, ніж Sablettes, але часто кращі, якщо вам потрібні простір і довша прогулянка вздовж моря.",
          ),
          t(
            "Because Borrigo is slightly less central, it can feel calmer and more local while still staying connected to the promenade. Bring beach shoes for pebbles and consider staying for sunset, when the light softens over the bay and Cap Martin.",
            "Comme Borrigo est un peu moins central, l'ambiance peut etre plus calme et plus locale tout en restant reliee a la promenade. Prenez des chaussures d'eau pour les galets et envisagez d'y rester jusqu'au coucher du soleil, quand la lumiere devient douce sur la baie et le Cap Martin.",
            "Poiche Borrigo e un po' meno centrale, puo sembrare piu calmo e locale pur restando collegato alla passeggiata. Porta scarpe da mare per i ciottoli e valuta di restare fino al tramonto, quando la luce si ammorbidisce sulla baia e Cap Martin.",
            "Оскільки Borrigo трохи менш центральний, атмосфера тут може бути спокійнішою й більш локальною, але набережна все одно поруч. Візьміть взуття для гальки й подумайте про захід сонця, коли світло м'якшає над бухтою та Cap Martin.",
          ),
        ],
        relatedPlaceIds: ["borrigo-beaches", "promenade-du-soleil"],
      },
      {
        heading: t("Practical beach notes", "Notes pratiques plage", "Note pratiche per la spiaggia", "Практичні пляжні нотатки"),
        body: [
          t(
            "Across Menton's beaches, lifeguards, showers, sunbeds, private beach clubs and restaurant services vary by season, weather and operator. Check what is open when you arrive rather than assuming every service is available every day.",
            "Sur les plages de Menton, surveillance, douches, transats, plages privees et restaurants varient selon la saison, la meteo et les exploitants. Verifiez ce qui est ouvert en arrivant plutot que de supposer que tous les services sont disponibles chaque jour.",
            "Sulle spiagge di Mentone, bagnini, docce, lettini, stabilimenti privati e ristoranti cambiano con stagione, meteo e gestione. Controlla cosa e aperto quando arrivi invece di dare per scontato che ogni servizio sia disponibile ogni giorno.",
            "На пляжах Ментона рятувальники, душі, лежаки, приватні пляжні клуби й ресторани залежать від сезону, погоди та операторів. Перевіряйте, що відкрито після прибуття, а не вважайте, що всі сервіси доступні щодня.",
          ),
        ],
        bullets: [
          t("Arrive earlier on summer weekends, especially for Sablettes and the central stretches.", "Arrivez plus tot les week-ends d'ete, surtout a Sablettes et sur les plages centrales.", "Arriva prima nei weekend estivi, soprattutto a Sablettes e nei tratti centrali.", "У літні вихідні приходьте раніше, особливо на Sablettes і центральні ділянки."),
          t("Beach shoes help on pebbles and mixed surfaces.", "Des chaussures d'eau sont utiles sur les galets et surfaces mixtes.", "Le scarpe da mare aiutano su ciottoli e superfici miste.", "Взуття для води корисне на гальці та змішаних поверхнях."),
          t("For most central Menton stays, the main beaches are reachable on foot without a car.", "Pour la plupart des sejours dans le centre de Menton, les principales plages sont accessibles a pied sans voiture.", "Per la maggior parte dei soggiorni nel centro di Mentone, le spiagge principali sono raggiungibili a piedi senza auto.", "Для більшості зупинок у центрі Ментона головні пляжі доступні пішки без авто."),
        ],
      },
    ],
  }),
  shortArticle({
    id: "stay-cool-in-menton-summer",
    slug: "stay-cool-in-menton-summer",
    title: t("How to stay cool in Menton during summer", "Comment rester au frais a Menton en ete", "Come stare al fresco a Mentone in estate", "Як не перегрітися в Ментоні влітку"),
    seoTitle: t("How to Stay Cool in Menton During Summer | Azur Menton Guide", "Comment rester au frais a Menton en ete | Guide Azur Menton", "Come stare al fresco a Mentone in estate | Guida Azur Menton", "Як не перегрітися в Ментоні влітку | Гід Azur Menton"),
    seoDescription: t(
      "A practical summer guide to staying cool in Menton: early walks, shaded beaches, indoor breaks, gardens, sea breezes and air-conditioned apartments by the Mediterranean.",
      "Guide pratique pour rester au frais a Menton en ete: balades tot le matin, plages avec ombre, pauses interieures, jardins, brise marine et appartements climatises pres de la Mediterranee.",
      "Una guida pratica per stare al fresco a Mentone in estate: passeggiate presto, spiagge con ombra, pause al chiuso, giardini, brezza marina e appartamenti climatizzati sul Mediterraneo.",
      "Практичний літній гід, як не перегрітися в Ментоні: ранні прогулянки, пляжі з тінню, перерви в приміщенні, сади, морський бриз і апартаменти з кондиціонером біля Середземного моря.",
    ),
    excerpt: t(
      "Hot summer days in Menton are easier with a slower rhythm: walk early, choose beaches with easy shade, rest at midday and return to the seafront in the evening.",
      "Les journees tres chaudes a Menton se vivent mieux avec un rythme plus lent: sortir tot, choisir des plages avec des coins d'ombre, se reposer a midi et revenir au front de mer le soir.",
      "Le giornate molto calde a Mentone funzionano meglio con un ritmo lento: uscire presto, scegliere spiagge con ombra facile, riposare a meta giornata e tornare sul lungomare la sera.",
      "У спекотні літні дні Ментон краще відкривається в повільному ритмі: виходьте рано, обирайте пляжі з доступною тінню, відпочивайте опівдні й повертайтеся до моря ввечері.",
    ),
    category: "practical",
    coverImage: "/images/guide/stay-cool-in-menton-summer.jpg",
    coverImageAlt: t("Illustration of staying cool in Menton during summer", "Illustration pour rester au frais a Menton pendant l'ete", "Illustrazione su come stare al fresco a Mentone in estate", "Ілюстрація про те, як не перегрітися в Ментоні влітку"),
    visualTheme: "sea",
    visualStatus: "real_image",
    tags: [
      t("summer", "ete", "estate", "літо"),
      t("heatwave", "canicule", "ondata di caldo", "спека"),
      t("beaches", "plages", "spiagge", "пляжі"),
      t("air conditioning", "climatisation", "aria condizionata", "кондиціонер"),
      t("with children", "avec enfants", "con bambini", "з дітьми"),
      t("without a car", "sans voiture", "senza auto", "без авто"),
      t("Menton summer", "ete a Menton", "estate a Mentone", "літо в Ментоні"),
      t("hot days", "jours chauds", "giorni caldi", "спекотні дні"),
      t("practical tips", "conseils pratiques", "consigli pratici", "практичні поради"),
    ],
    bestFor: [
      guideBestForOptions[1].label,
      guideBestForOptions[8].label,
      guideBestForOptions[3].label,
      guideBestForOptions[4].label,
      guideBestForOptions[0].label,
      guideBestForOptions[9].label,
    ],
    duration: "reference",
    locationTags: ["menton-centre", "seafront", "old-town", "garavan"],
    featured: true,
    sourceStatus: "needs_verification",
    relatedPlaces: ["promenade-du-soleil", "plage-sablettes", "plage-casino", "rondelli-garavan-side", "cimetiere-vieux-chateau", "musee-jean-cocteau-bastion", "puro-piacere-menton", "tutti-frutti-menton", "halles-du-marche", "plage-fossan", "jardin-val-rahmeh", "jardin-serre-de-la-madone"],
    relatedArticles: [
      "useful-apps-websites-menton-monaco-italian-riviera",
      "mountains-snow-skiing-near-menton",
      "best-ice-cream-menton",
      "menton-with-kids-family-guide",
      "menton-without-a-car",
      "useful-numbers-emergency-contacts-menton",
      "supermarkets-in-menton",
      "best-souvenir-shops-menton-monaco-nice",
      "cinemas-in-menton-nice-monaco",
      "theatre-opera-performing-arts-near-menton",
      "museums-in-menton-nice-monaco",
      "public-transport-in-menton",
      "best-beaches-in-menton",
      "halles-du-marche-menton",
      "menton-old-town",
      "best-photo-spots-menton",
      "quiet-evening-in-menton",
      "bars-and-beer-in-menton",
      "nightlife-in-menton",
      "day-trips-from-menton",
    ],
    relatedApartments: allApartments,
    sections: [
      {
        heading: t("Start early", "Commencer tot", "Inizia presto", "Починайте рано"),
        body: [
          t(
            "Menton is made for summer: bright mornings, long Mediterranean evenings, beaches below the promenade and cafes facing the sea. During a heatwave, the best way to enjoy it is to adjust your rhythm.",
            "Menton est faite pour l'ete: matins lumineux, longues soirees mediterraneennes, plages sous la promenade et cafes tournes vers la mer. Pendant une canicule, le meilleur choix est d'adapter le rythme.",
            "Mentone sembra fatta per l'estate: mattine luminose, lunghe serate mediterranee, spiagge sotto la passeggiata e caffe rivolti al mare. Durante un'ondata di caldo, conviene cambiare ritmo.",
            "Ментон створений для літа: світлі ранки, довгі середземноморські вечори, пляжі під набережною й кав'ярні біля моря. Під час спеки найкраще просто змінити ритм дня.",
          ),
          t(
            "The most comfortable hours are usually before 10:00. Walk along Promenade du Soleil, continue toward Plage des Sablettes, stop for coffee near the old town, visit the market before lunchtime and return before the hottest hours.",
            "Les heures les plus agreables sont souvent avant 10h00. Marchez le long de la Promenade du Soleil, continuez vers la Plage des Sablettes, prenez un cafe pres de la vieille ville, passez au marche avant midi puis rentrez avant les heures les plus chaudes.",
            "Le ore piu piacevoli sono spesso prima delle 10:00. Cammina lungo Promenade du Soleil, continua verso Plage des Sablettes, fermati per un caffe vicino al centro storico, passa al mercato prima di pranzo e rientra prima delle ore piu calde.",
            "Найкомфортніший час зазвичай до 10:00. Пройдіться Promenade du Soleil, продовжіть до Plage des Sablettes, зупиніться на каву біля старого міста, зайдіть на ринок до обіду й поверніться до найспекотніших годин.",
          ),
        ],
        bullets: [
          t("If you stay near the seafront, this morning plan works without a car.", "Si vous logez pres du front de mer, ce programme du matin se fait sans voiture.", "Se soggiorni vicino al lungomare, questo programma del mattino funziona senza auto.", "Якщо ви живете біля набережної, цей ранковий план легко виконати без авто."),
        ],
        relatedPlaceIds: ["promenade-du-soleil", "plage-sablettes", "halles-du-marche"],
        relatedApartmentKeys: allApartments,
      },
      {
        heading: t("Choose beaches that make cooling down easy", "Choisir des plages ou se rafraichir facilement", "Scegli spiagge dove rinfrescarsi e facile", "Обирайте пляжі, де легко охолонути"),
        body: [
          t(
            "Not all beaches feel the same during extreme heat. For hot days, choose places where you can easily reach shade, water, cafes or your apartment.",
            "Toutes les plages ne se vivent pas de la meme facon pendant les fortes chaleurs. Les jours chauds, choisissez des lieux ou l'ombre, l'eau, les cafes ou l'appartement restent faciles a rejoindre.",
            "Non tutte le spiagge sono uguali con caldo intenso. Nei giorni caldi scegli luoghi dove sia facile raggiungere ombra, acqua, caffe o l'appartamento.",
            "Під час сильної спеки пляжі відчуваються по-різному. У спекотні дні обирайте місця, де легко дістатися тіні, води, кав'ярні або апартаментів.",
          ),
          t(
            "Plage des Sablettes is useful for families and morning swims because it is close to the old town, cafes and the seafront. Plage du Casino works for quick central swims, Plage du Fossan suits shorter beach breaks near the port, and the Garavan side is good for quieter mornings and sea-view walks.",
            "La Plage des Sablettes est pratique pour les familles et les baignades du matin, car elle est proche de la vieille ville, des cafes et du front de mer. La Plage du Casino convient aux baignades rapides au centre, Fossan aux pauses courtes pres du port, et le cote Garavan aux matins plus calmes avec vues mer.",
            "Plage des Sablettes e pratica per famiglie e bagni del mattino perche e vicina al centro storico, ai caffe e al lungomare. Plage du Casino va bene per bagni rapidi in centro, Fossan per pause brevi vicino al porto, mentre il lato Garavan funziona per mattine piu tranquille e passeggiate vista mare.",
            "Plage des Sablettes зручний для сімей і ранкового купання, бо поруч старе місто, кав'ярні й набережна. Plage du Casino підходить для швидкого купання в центрі, Plage du Fossan - для коротких пляжних пауз біля порту, а бік Garavan - для тихіших ранків і прогулянок з видом на море.",
          ),
        ],
        bullets: [
          t("Best for families: Plage des Sablettes.", "Pour les familles: Plage des Sablettes.", "Per famiglie: Plage des Sablettes.", "Для сімей: Plage des Sablettes."),
          t("Best for quick central swims: Plage du Casino and the promenade beaches.", "Pour une baignade rapide au centre: Plage du Casino et les plages de la promenade.", "Per bagni rapidi in centro: Plage du Casino e le spiagge della passeggiata.", "Для швидкого купання в центрі: Plage du Casino і пляжі набережної."),
          t("Best near the old town and port: Plage du Fossan.", "Pres de la vieille ville et du port: Plage du Fossan.", "Vicino al centro storico e al porto: Plage du Fossan.", "Біля старого міста й порту: Plage du Fossan."),
          t("Best for quieter sea views: Rondelli and the Garavan side.", "Pour des vues mer plus calmes: Rondelli et le cote Garavan.", "Per viste mare piu tranquille: Rondelli e il lato Garavan.", "Для спокійніших морських краєвидів: Rondelli і бік Garavan."),
        ],
        relatedPlaceIds: ["plage-sablettes", "plage-casino", "plage-fossan", "rondelli-garavan-side"],
      },
      {
        heading: t("Avoid the old town climb at midday", "Eviter la montee de la vieille ville a midi", "Evita la salita del centro storico a mezzogiorno", "Не піднімайтеся в старе місто опівдні"),
        body: [
          t(
            "Menton's old town is beautiful, but it climbs. Les Rampes Saint-Michel, the basilica area and the Cimetière du Vieux Château give some of the best views in town, but they involve stairs and elevation.",
            "La vieille ville de Menton est magnifique, mais elle monte. Les Rampes Saint-Michel, le secteur de la basilique et le Cimetière du Vieux Château offrent de tres belles vues, avec marches et denivele.",
            "Il centro storico di Mentone e bellissimo, ma sale. Les Rampes Saint-Michel, la zona della basilica e il Cimetière du Vieux Château offrono alcune delle viste migliori, ma richiedono scale e dislivello.",
            "Старе місто Ментона прекрасне, але воно піднімається вгору. Les Rampes Saint-Michel, район базиліки й Cimetière du Vieux Château дають одні з найкращих видів, але там є сходи й набір висоти.",
          ),
          t(
            "On a very hot day, go before 9:30 or after 18:00. Take water, wear comfortable shoes and avoid making this the middle of the day plan during a heatwave.",
            "Par tres forte chaleur, allez-y avant 9h30 ou apres 18h00. Prenez de l'eau, portez de bonnes chaussures et evitez d'en faire le programme de milieu de journee pendant une canicule.",
            "In una giornata molto calda, vai prima delle 9:30 o dopo le 18:00. Porta acqua, indossa scarpe comode ed evita di farne il programma di meta giornata durante un'ondata di caldo.",
            "У дуже спекотний день ідіть до 9:30 або після 18:00. Візьміть воду, вдягніть зручне взуття й не плануйте цей підйом на середину дня під час спеки.",
          ),
        ],
        relatedPlaceIds: ["rampes-saint-michel", "cimetiere-vieux-chateau"],
      },
      {
        heading: t("Use the market and indoor stops", "Utiliser le marche et les pauses interieures", "Usa il mercato e le pause al chiuso", "Використовуйте ринок і перерви в приміщенні"),
        body: [
          t(
            "Halles du Marché is a useful morning stop on a hot day. It is covered, central and close to the old town and seafront, so you can pick up fruit, water, picnic ingredients or something light before the hottest part of the day.",
            "Les Halles du Marché sont une halte utile le matin quand il fait chaud. Le marche est couvert, central, proche de la vieille ville et du front de mer: pratique pour acheter fruits, eau, produits de pique-nique ou quelque chose de leger avant les heures les plus chaudes.",
            "Halles du Marché e una tappa utile al mattino quando fa caldo. E coperto, centrale e vicino al centro storico e al lungomare: perfetto per prendere frutta, acqua, ingredienti per un picnic o qualcosa di leggero prima delle ore piu calde.",
            "Halles du Marché - корисна ранкова зупинка у спекотний день. Ринок критий, центральний і поруч зі старим містом та набережною, тож там зручно взяти фрукти, воду, продукти для пікніка або щось легке до найспекотнішої частини дня.",
          ),
          t(
            "If the heat becomes too much, plan an indoor cultural pause at Musée Jean Cocteau - Le Bastion near the old port. Published opening details can change, so check the current schedule before you go.",
            "Si la chaleur devient trop forte, prevoyez une pause culturelle au frais au Musée Jean Cocteau - Le Bastion, pres du vieux port. Les horaires publies peuvent changer: verifiez le programme actuel avant d'y aller.",
            "Se il caldo diventa troppo forte, programma una pausa culturale al chiuso al Musée Jean Cocteau - Le Bastion, vicino al vecchio porto. Gli orari pubblicati possono cambiare: controlla il programma aggiornato prima di andare.",
            "Якщо спека стає надто сильною, заплануйте культурну перерву в приміщенні в Musée Jean Cocteau - Le Bastion біля старого порту. Опубліковані години можуть змінюватися, тому перевіряйте актуальний розклад перед візитом.",
          ),
        ],
        bullets: [
          t("Halles du Marché, 5 Quai de Monléon, 06500 Menton.", "Halles du Marché, 5 Quai de Monléon, 06500 Menton.", "Halles du Marché, 5 Quai de Monléon, 06500 Menton.", "Halles du Marché, 5 Quai de Monléon, 06500 Menton."),
          t("Musée Jean Cocteau - Le Bastion, Quai Napoléon III - Bastion du Vieux Port, 06500 Menton.", "Musée Jean Cocteau - Le Bastion, Quai Napoléon III - Bastion du Vieux Port, 06500 Menton.", "Musée Jean Cocteau - Le Bastion, Quai Napoléon III - Bastion du Vieux Port, 06500 Menton.", "Musée Jean Cocteau - Le Bastion, Quai Napoléon III - Bastion du Vieux Port, 06500 Menton."),
        ],
        relatedPlaceIds: ["halles-du-marche", "musee-jean-cocteau-bastion"],
      },
      {
        heading: t("Visit gardens in the morning", "Visiter les jardins le matin", "Visita i giardini al mattino", "Відвідуйте сади вранці"),
        body: [
          t(
            "Menton's gardens are one of the town's great pleasures, but on very hot days they should be planned carefully. Go early or later in the day, bring water and avoid uphill garden visits during the hottest hours.",
            "Les jardins de Menton font partie des grands plaisirs de la ville, mais les jours tres chauds demandent un peu de prudence. Allez-y tot ou plus tard, prenez de l'eau et evitez les visites avec montee pendant les heures les plus chaudes.",
            "I giardini di Mentone sono uno dei grandi piaceri della citta, ma nei giorni molto caldi vanno pianificati con attenzione. Vai presto o piu tardi, porta acqua ed evita visite in salita nelle ore piu calde.",
            "Сади Ментона - одна з великих радостей міста, але в дуже спекотні дні їх варто планувати обережно. Ідіть рано або пізніше, беріть воду й уникайте підйомів до садів у найгарячіші години.",
          ),
          t(
            "Jardin Botanique Val Rahmeh is lush and useful for a quieter morning near Garavan. Jardin Serre de la Madone sits higher above town and is better treated as a planned outing, not a casual midday walk.",
            "Le Jardin Botanique Val Rahmeh est luxuriant et agreable pour une matinee plus calme pres de Garavan. Le Jardin Serre de la Madone se trouve plus haut au-dessus de la ville: mieux vaut le traiter comme une sortie preparee, pas comme une marche improvisee a midi.",
            "Jardin Botanique Val Rahmeh e rigoglioso e adatto a una mattina piu tranquilla vicino a Garavan. Jardin Serre de la Madone si trova piu in alto sopra la citta: meglio considerarlo un'uscita pianificata, non una passeggiata casuale a mezzogiorno.",
            "Jardin Botanique Val Rahmeh зелений і добре підходить для спокійнішого ранку біля Garavan. Jardin Serre de la Madone розташований вище над містом, тому це радше запланована поїздка, а не випадкова прогулянка опівдні.",
          ),
        ],
        relatedPlaceIds: ["jardin-val-rahmeh", "jardin-serre-de-la-madone"],
      },
      {
        heading: t("Make your apartment part of the cooling plan", "Integrer l'appartement dans le plan fraicheur", "Inserisci l'appartamento nel piano per rinfrescarsi", "Зробіть апартаменти частиною плану охолодження"),
        body: [
          t(
            "During a real heatwave, your apartment is not just where you sleep. It becomes part of the day plan.",
            "Pendant une vraie canicule, l'appartement n'est pas seulement l'endroit ou dormir. Il fait partie de l'organisation de la journee.",
            "Durante una vera ondata di caldo, l'appartamento non e solo il posto dove dormire. Diventa parte del programma della giornata.",
            "Під час справжньої спеки апартаменти - це не лише місце для сну. Вони стають частиною денного плану.",
          ),
          t(
            "All Azur Menton apartments are equipped with air conditioning, which is especially useful in July, August and during unusually hot periods.",
            "Tous les appartements Azur Menton sont equipes de la climatisation, particulierement utile en juillet, en aout et pendant les periodes de chaleur inhabituelle.",
            "Tutti gli appartamenti Azur Menton sono dotati di aria condizionata, particolarmente utile a luglio, agosto e durante periodi di caldo insolito.",
            "Усі апартаменти Azur Menton обладнані кондиціонером, що особливо корисно в липні, серпні та під час незвично спекотних періодів.",
          ),
          t(
            "A good hot-day rhythm is simple: morning walk, market or beach; midday rest with shutters closed; late afternoon museum, shaded garden or short swim; evening promenade, dinner or sunset walk.",
            "Un bon rythme par forte chaleur reste simple: marche, marche ou plage le matin; repos a midi avec volets fermes; musee, jardin ombrage ou petite baignade en fin d'apres-midi; promenade, diner ou coucher de soleil le soir.",
            "Un buon ritmo nei giorni caldi e semplice: passeggiata, mercato o spiaggia al mattino; riposo a meta giornata con le persiane chiuse; museo, giardino ombreggiato o bagno breve nel tardo pomeriggio; passeggiata, cena o tramonto la sera.",
            "Добрий ритм спекотного дня простий: ранкова прогулянка, ринок або пляж; опівдні відпочинок із закритими віконницями; ближче до вечора музей, тіньовий сад або коротке купання; увечері набережна, вечеря або прогулянка на заході сонця.",
          ),
        ],
        relatedApartmentKeys: allApartments,
      },
      {
        heading: t("Save longer trips for cooler hours", "Garder les longues sorties pour les heures plus fraiches", "Tieni le uscite lunghe per le ore piu fresche", "Залишайте довші поїздки на прохолодніший час"),
        body: [
          t(
            "On very hot days, avoid overloading the schedule. Monaco, Nice, Ventimiglia and hill villages are possible from Menton, but transport, walking and waiting in the sun can quickly become tiring.",
            "Les jours tres chauds, evitez de trop charger le programme. Monaco, Nice, Vintimille et les villages perches sont possibles depuis Menton, mais transports, marche et attente au soleil fatiguent vite.",
            "Nei giorni molto caldi evita programmi troppo pieni. Monaco, Nizza, Ventimiglia e i borghi collinari sono possibili da Mentone, ma trasporti, camminate e attese al sole diventano stancanti in fretta.",
            "У дуже спекотні дні не перевантажуйте розклад. Монако, Ніцца, Вентімілья й гірські села можливі з Ментона, але транспорт, ходьба й очікування на сонці швидко втомлюють.",
          ),
          t(
            "If you do take a day trip, leave early, check train times in advance, carry water and plan one main activity rather than five.",
            "Si vous partez en excursion, partez tot, verifiez les trains a l'avance, prenez de l'eau et prevoyez une activite principale plutot que cinq.",
            "Se fai una gita, parti presto, controlla i treni in anticipo, porta acqua e programma una sola attivita principale invece di cinque.",
            "Якщо все ж їдете на день, вирушайте рано, перевірте потяги заздалегідь, беріть воду й плануйте одну головну активність, а не п'ять.",
          ),
        ],
      },
      {
        heading: t("Return to the seafront in the evening", "Revenir au front de mer le soir", "Torna sul lungomare la sera", "Повертайтеся до моря ввечері"),
        body: [
          t(
            "Evening is when Menton comes alive again. After 18:00, the seafront becomes more comfortable, the light is softer and the town feels relaxed rather than intense.",
            "Le soir, Menton reprend vie. Apres 18h00, le front de mer devient plus agreable, la lumiere plus douce et la ville plus detendue.",
            "La sera Mentone riprende vita. Dopo le 18:00, il lungomare e piu piacevole, la luce piu morbida e la citta piu rilassata.",
            "Увечері Ментон знову оживає. Після 18:00 набережна стає комфортнішою, світло м'якшим, а місто спокійнішим.",
          ),
          t(
            "Good evening ideas include Promenade du Soleil, Plage des Sablettes, a slow climb toward Rampes Saint-Michel, drinks near the beach, a balcony with sea view or watching the colour change over the Mediterranean.",
            "Bonnes idees de soiree: Promenade du Soleil, Plage des Sablettes, montee lente vers les Rampes Saint-Michel, verre pres de la plage, balcon avec vue mer ou couleurs changeantes sur la Mediterranee.",
            "Buone idee serali: Promenade du Soleil, Plage des Sablettes, una salita lenta verso Rampes Saint-Michel, un drink vicino alla spiaggia, un balcone vista mare o i colori che cambiano sul Mediterraneo.",
            "Добрі вечірні ідеї: Promenade du Soleil, Plage des Sablettes, повільний підйом до Rampes Saint-Michel, напій біля пляжу, балкон з видом на море або спостереження за кольорами над Середземним морем.",
          ),
        ],
        relatedPlaceIds: ["promenade-du-soleil", "plage-sablettes", "rampes-saint-michel"],
      },
      {
        heading: t("Heatwave safety basics", "Bases de securite en cas de canicule", "Sicurezza di base durante un'ondata di caldo", "Основи безпеки під час спеки"),
        body: [
          t(
            "During extreme heat, keep the day simple. French public guidance recommends staying cool, drinking water regularly, avoiding alcohol, limiting physical activity, eating light meals, closing shutters and windows during the hottest hours, and checking on vulnerable people.",
            "Pendant les fortes chaleurs, gardez une journee simple. Les recommandations publiques francaises conseillent de rester au frais, boire de l'eau regulierement, eviter l'alcool, limiter l'activite physique, manger leger, fermer volets et fenetres aux heures les plus chaudes et prendre des nouvelles des personnes fragiles.",
            "Con caldo estremo, semplifica la giornata. Le indicazioni pubbliche francesi raccomandano di restare al fresco, bere acqua regolarmente, evitare alcol, limitare l'attivita fisica, mangiare leggero, chiudere persiane e finestre nelle ore piu calde e controllare le persone vulnerabili.",
            "Під час сильної спеки спрощуйте день. Французькі публічні рекомендації радять залишатися в прохолоді, регулярно пити воду, уникати алкоголю, обмежувати фізичну активність, їсти легше, закривати віконниці й вікна в найспекотніші години та перевіряти вразливих людей.",
          ),
          t(
            "If someone feels unwell, confused, unusually tired, dizzy or shows signs of heatstroke, call emergency services. If you are unsure which number to call in an emergency, 112 is the safest option.",
            "Si une personne se sent mal, confuse, tres fatiguee, prise de vertiges ou montre des signes de coup de chaleur, appelez les secours. En cas de doute sur le numero a composer, le 112 est l'option la plus sure.",
            "Se qualcuno si sente male, confuso, insolitamente stanco, ha vertigini o mostra segni di colpo di calore, chiama i servizi di emergenza. Se non sai quale numero chiamare, il 112 e l'opzione piu sicura.",
            "Якщо комусь зле, людина розгублена, незвично втомлена, має запаморочення або ознаки теплового удару, телефонуйте до екстрених служб. Якщо не знаєте, який номер обрати, 112 - найбезпечніший варіант.",
          ),
        ],
        bullets: [
          t("15 - SAMU / medical emergency", "15 - SAMU / urgence medicale", "15 - SAMU / emergenza medica", "15 - SAMU / медична невідкладна допомога"),
          t("112 - European emergency number", "112 - numero d'urgence europeen", "112 - numero europeo di emergenza", "112 - європейський номер екстреної допомоги"),
          t("18 - firefighters", "18 - pompiers", "18 - vigili del fuoco", "18 - пожежники"),
          t("17 - police", "17 - police", "17 - polizia", "17 - поліція"),
        ],
      },
      {
        heading: t("A simple hot-day itinerary", "Un itineraire simple par forte chaleur", "Un itinerario semplice per giornate calde", "Простий маршрут для спекотного дня"),
        body: [
          t(
            "If the forecast is very hot, keep your day light and local: 7:30 seafront walk, 8:30 coffee and market, 10:00 beach time, 12:30 return to the apartment, 16:30 indoor or shaded activity, 19:00 promenade and dinner, 21:00 balcony, drinks or sunset walk.",
            "Si la meteo annonce une tres forte chaleur, gardez une journee legere et locale: 7h30 promenade en bord de mer, 8h30 cafe et marche, 10h00 plage, 12h30 retour a l'appartement, 16h30 activite interieure ou ombragee, 19h00 promenade et diner, 21h00 balcon, verre ou marche au coucher du soleil.",
            "Se le previsioni sono molto calde, mantieni la giornata leggera e locale: 7:30 passeggiata sul mare, 8:30 caffe e mercato, 10:00 spiaggia, 12:30 rientro in appartamento, 16:30 attivita al chiuso o all'ombra, 19:00 passeggiata e cena, 21:00 balcone, drink o camminata al tramonto.",
            "Якщо прогноз дуже спекотний, залишайте день легким і локальним: 7:30 прогулянка біля моря, 8:30 кава й ринок, 10:00 пляж, 12:30 повернення в апартаменти, 16:30 приміщення або тінь, 19:00 набережна й вечеря, 21:00 балкон, напої або прогулянка на заході сонця.",
          ),
          t(
            "Menton is still beautiful in the heat, but it rewards a slower rhythm: walk early, swim before the beach gets too hot, rest in the middle of the day, use the sea breeze in the evening and choose shaded places, indoor pauses and air-conditioned accommodation.",
            "Menton reste belle sous la chaleur, mais elle recompense un rythme plus lent: marcher tot, se baigner avant que la plage chauffe trop, se reposer au milieu de la journee, profiter de la brise marine le soir et choisir ombre, pauses interieures et logement climatise.",
            "Mentone resta bella anche con il caldo, ma premia un ritmo piu lento: cammina presto, nuota prima che la spiaggia diventi troppo calda, riposa a meta giornata, usa la brezza marina la sera e scegli ombra, pause al chiuso e alloggio climatizzato.",
            "Ментон прекрасний навіть у спеку, але винагороджує повільніший ритм: гуляйте рано, купайтеся до перегріву пляжу, відпочивайте посеред дня, користуйтеся морським бризом увечері та обирайте тінь, перерви в приміщенні й житло з кондиціонером.",
          ),
        ],
      },
    ],
    practicalTips: [
      t("Walk and climb early, before the strongest heat.", "Marchez et montez tot, avant la chaleur la plus forte.", "Cammina e sali presto, prima del caldo piu intenso.", "Гуляйте й піднімайтеся рано, до найсильнішої спеки."),
      t("Choose beaches with easy exits to shade, cafes or your apartment.", "Choisissez des plages d'ou l'ombre, les cafes ou l'appartement restent faciles a rejoindre.", "Scegli spiagge con uscita facile verso ombra, caffe o appartamento.", "Обирайте пляжі, звідки легко вийти до тіні, кав'ярні або апартаментів."),
      t("Keep day trips simple during heatwaves.", "Gardez les excursions simples pendant les canicules.", "Mantieni semplici le gite durante le ondate di caldo.", "Під час спеки робіть поїздки простішими."),
      t("Emergency numbers in France: 15, 112, 18 and 17.", "Numeros d'urgence en France: 15, 112, 18 et 17.", "Numeri di emergenza in Francia: 15, 112, 18 e 17.", "Екстрені номери у Франції: 15, 112, 18 і 17."),
    ],
  }),
  shortArticle({
    id: "menton-with-kids-family-guide",
    slug: "menton-with-kids-family-guide",
    title: t("Menton with kids: a practical family guide", "Menton avec enfants: guide pratique en famille", "Mentone con bambini: guida pratica per famiglie", "Ментон з дітьми: практичний сімейний гід"),
    seoTitle: t("Menton with Kids: Beaches, Play Areas and Easy Family Days", "Menton avec enfants: plages, jeux et journees faciles", "Mentone con bambini: spiagge, giochi e giornate facili", "Ментон з дітьми: пляжі, ігри та прості сімейні дні"),
    seoDescription: t("A practical family guide to Menton with children: beaches, stroller walks, kids' parks, indoor play areas, supermarkets, museums, cinemas, water parks and family day trips near Monaco, Nice and Italy.", "Guide pratique de Menton avec enfants: plages, promenades en poussette, parcs, jeux indoor, supermarches, musees, cinemas, parcs aquatiques et excursions famille vers Monaco, Nice et l'Italie.", "Guida pratica a Mentone con bambini: spiagge, passeggiate con passeggino, parchi, giochi indoor, supermercati, musei, cinema, parchi acquatici e gite in famiglia verso Monaco, Nizza e Italia.", "Практичний гід по Ментону з дітьми: пляжі, прогулянки з візком, дитячі парки, indoor play, супермаркети, музеї, кіно, аквапарки та сімейні поїздки до Монако, Ніцци й Італії."),
    excerpt: t("Menton works well with children when the rhythm is simple: an easy beach, a flat walk, cold drinks nearby, a cool pause and a backup plan for heat or rain.", "Menton fonctionne tres bien avec des enfants quand le rythme reste simple: plage facile, promenade plate, boissons fraiches proches, pause au frais et plan B pour chaleur ou pluie.", "Mentone funziona bene con bambini quando il ritmo e semplice: spiaggia facile, passeggiata piana, bevande fredde vicine, pausa al fresco e piano B per caldo o pioggia.", "Ментон добре підходить для дітей, якщо ритм простий: зручний пляж, рівна прогулянка, холодні напої поруч, прохолодна пауза й запасний план на спеку або дощ."),
    category: "with-children",
    coverImage: "/images/guide/menton-with-kids-family-guide.jpg",
    coverImageAlt: t("Illustration of a family day in Menton with children", "Illustration d'une journee en famille a Menton avec enfants", "Illustrazione di una giornata in famiglia a Mentone con bambini", "Ілюстрація сімейного дня в Ментоні з дітьми"),
    visualTheme: "family",
    visualStatus: "project_illustration",
    tags: [
      t("children", "enfants", "bambini", "діти"),
      t("families", "familles", "famiglie", "сім'ї"),
      t("beaches", "plages", "spiagge", "пляжі"),
      t("playgrounds", "aires de jeux", "parchi giochi", "майданчики"),
      t("rainy day", "jour de pluie", "giorno di pioggia", "дощовий день"),
      t("heatwave", "canicule", "ondata di caldo", "спека"),
      t("Monaco", "Monaco", "Monaco", "Монако"),
      t("Nice", "Nice", "Nizza", "Ніцца"),
      t("family apartment", "appartement famille", "appartamento famiglia", "сімейні апартаменти"),
    ],
    bestFor: [guideBestForOptions[1].label, guideBestForOptions[3].label, guideBestForOptions[5].label, guideBestForOptions[8].label, guideBestForOptions[10].label, guideBestForOptions[11].label],
    duration: "reference",
    locationTags: ["menton-centre", "seafront", "garavan", "monaco", "nice"],
    sourceStatus: "needs_verification",
    relatedPlaces: [
      "plage-sablettes",
      "plage-fossan",
      "rondelli-garavan-side",
      "rue-saint-michel-menton",
      "promenade-du-soleil",
      "port-de-garavan",
      "koaland-menton",
      "intermarche-hyper-menton",
      "u-express-menton-centre",
      "cinema-eden-menton",
      "musee-jean-cocteau-bastion",
      "oceanographic-museum-monaco",
      "prince-monaco-car-collection",
      "cap3000-saint-laurent-du-var",
      "la-tete-dans-les-nuages-cap3000",
      "shopping-promenade-riviera",
      "ultra-polygone",
      "bricks-4-kidz-nice-etoile",
      "kids-city-nice",
      "fun-city-cannes",
      "piscine-alex-jany-menton",
      "stade-nautique-rainier-iii-monaco",
      "aquasplash-antibes",
      "antibes-land",
      "village-des-fous",
      "bois-des-lutins",
      "pitchoun-forest",
      "canyon-forest",
      "larvotto-beach-playground",
      "parc-princesse-antoinette-monaco",
    ],
    relatedArticles: [
      "fete-du-citron-menton-practical-guide",
      "tennis-padel-courts-menton",
      "skateparks-near-menton",
      "best-ice-cream-menton",
      "best-beaches-in-menton",
      "mountains-snow-skiing-near-menton",
      "stay-cool-in-menton-summer",
      "supermarkets-in-menton",
      "cinemas-in-menton-nice-monaco",
      "theatre-opera-performing-arts-near-menton",
      "museums-in-menton-nice-monaco",
      "golf-near-menton",
      "public-transport-in-menton",
      "day-trips-from-menton",
      "useful-numbers-emergency-contacts-menton",
      "menton-without-a-car",
      "where-to-stay-in-menton",
      "useful-apps-websites-menton-monaco-italian-riviera",
    ],
    relatedEvents: ["amusement-park-monaco", "menton-lemon-festival", "nice-carnival"],
    relatedApartments: ["beachside-family-apartment", "sea-view-balcony-studio", "panoramic-sea-view-studio"],
    sections: [
      {
        heading: t("Quick family overview", "Apercu famille rapide", "Panoramica rapida per famiglie", "Короткий сімейний огляд"),
        body: [
          t("Menton is smaller and calmer than Nice, less intense than Monaco and easier to manage on foot than many hill towns on the Riviera. For families, that matters more than a long list of sights.", "Menton est plus petite et plus calme que Nice, moins intense que Monaco et plus simple a gerer a pied que beaucoup de villages perches de la Riviera. En famille, cela compte plus qu'une longue liste de visites.", "Mentone e piu piccola e calma di Nizza, meno intensa di Monaco e piu facile a piedi rispetto a molti borghi in collina della Riviera. In famiglia conta piu di una lunga lista di cose da vedere.", "Ментон менший і спокійніший за Ніццу, менш інтенсивний за Монако й простіший пішки, ніж багато пагорбових міст Рив'єри. Для сімей це важливіше за довгий список пам'яток."),
          t("The best family day is usually simple: a short walk, a beach that is easy to reach, food and toilets nearby, a cool indoor pause and enough flexibility to stop before everyone is tired.", "La meilleure journee en famille reste souvent simple: courte marche, plage facile, nourriture et toilettes proches, pause au frais et assez de souplesse pour s'arreter avant la fatigue.", "La migliore giornata in famiglia e spesso semplice: passeggiata breve, spiaggia facile, cibo e servizi vicini, pausa al fresco e flessibilita per fermarsi prima della stanchezza.", "Найкращий сімейний день часто простий: коротка прогулянка, зручний пляж, їжа й туалети поруч, прохолодна пауза та гнучкість зупинитися до втоми."),
        ],
        bullets: [
          t("Easiest beach with small children: Plage des Sablettes.", "Plage la plus facile avec jeunes enfants: Plage des Sablettes.", "Spiaggia piu facile con bambini piccoli: Plage des Sablettes.", "Найзручніший пляж із малими дітьми: Plage des Sablettes."),
          t("Best flat walk: Promenade du Soleil toward Sablettes, the old port and Garavan.", "Meilleure marche plate: Promenade du Soleil vers Sablettes, le vieux port et Garavan.", "Passeggiata piana migliore: Promenade du Soleil verso Sablettes, vecchio porto e Garavan.", "Найкраща рівна прогулянка: Promenade du Soleil до Sablettes, старого порту й Garavan."),
          t("Best local children's activity: Koaland.", "Meilleure activite locale enfants: Koaland.", "Migliore attivita locale per bambini: Koaland.", "Найкраща локальна дитяча активність: Koaland."),
          t("Best Monaco family day: Oceanographic Museum plus a playground or Port Hercule walk.", "Meilleure journee famille a Monaco: Musee oceanographique plus aire de jeux ou marche au Port Hercule.", "Migliore giornata famiglia a Monaco: Museo Oceanografico piu parco giochi o passeggiata a Port Hercule.", "Найкращий сімейний день у Монако: Океанографічний музей плюс майданчик або прогулянка Port Hercule."),
        ],
      },
      {
        heading: t("Best beaches and stroller-friendly walks", "Plages faciles et promenades en poussette", "Spiagge facili e passeggiate con passeggino", "Зручні пляжі й прогулянки з візком"),
        body: [
          t("Plage des Sablettes is the easiest first beach for many families: old town, port, cafes, restaurants and the wide esplanade are all close. Bring water shoes even here, because Menton beaches mix fine gravel and pebbles.", "La Plage des Sablettes est souvent la premiere plage la plus facile: vieille ville, port, cafes, restaurants et large esplanade sont proches. Meme ici, prevoyez des chaussures d'eau: les plages de Menton melangent gravier fin et galets.", "Plage des Sablettes e spesso la prima spiaggia piu facile: centro storico, porto, cafe, ristoranti e grande esplanade sono vicini. Anche qui porta scarpe da mare: le spiagge di Mentone hanno ghiaia fine e ciottoli.", "Plage des Sablettes часто найзручніший перший пляж: старе місто, порт, кафе, ресторани й широка еспланада поруч. Навіть тут беріть взуття для води: пляжі Ментона мають дрібний гравій і гальку."),
          t("For short swims, Plage du Fossan is useful because it is central. For calmer mornings, the Rondelli and Garavan side gives more space and a quieter rhythm.", "Pour les baignades courtes, Plage du Fossan est pratique car centrale. Pour des matins plus calmes, le cote Rondelli et Garavan donne plus d'espace et un rythme plus doux.", "Per bagni brevi Plage du Fossan e pratica perche centrale. Per mattine piu tranquille, il lato Rondelli e Garavan offre piu spazio e un ritmo piu calmo.", "Для короткого купання зручний Plage du Fossan, бо він центральний. Для тихіших ранків Rondelli й Garavan дають більше простору й спокійніший ритм."),
          t("The seafront is the easiest stroller route: Promenade du Soleil, Sablettes, the old port and Port de Garavan can be adjusted from ten minutes to a full slow walk.", "Le front de mer est l'itineraire poussette le plus simple: Promenade du Soleil, Sablettes, vieux port et Port de Garavan se modulent de dix minutes a une vraie marche lente.", "Il lungomare e il percorso piu facile con passeggino: Promenade du Soleil, Sablettes, vecchio porto e Port de Garavan si adattano da dieci minuti a una lunga passeggiata lenta.", "Набережна - найпростіший маршрут із візком: Promenade du Soleil, Sablettes, старий порт і Port de Garavan можна скоротити до 10 хвилин або розтягнути на повільну прогулянку."),
        ],
        relatedPlaceIds: ["plage-sablettes", "plage-fossan", "rondelli-garavan-side", "promenade-du-soleil", "port-de-garavan"],
      },
      {
        heading: t("Local family activities in Menton", "Activites famille a Menton", "Attivita famiglia a Mentone", "Сімейні активності в Ментоні"),
        body: [
          t("Koaland is the most obvious dedicated children's activity in Menton: a small amusement park close to the beach, best for younger children and low-pressure fun.", "Koaland est l'activite enfants la plus evidente a Menton: un petit parc de loisirs pres de la plage, surtout pour jeunes enfants et amusement sans pression.", "Koaland e l'attivita per bambini piu evidente a Mentone: un piccolo parco vicino alla spiaggia, ideale per bambini piccoli e divertimento semplice.", "Koaland - найочевидніша дитяча активність у Ментоні: невеликий парк розваг біля пляжу, найкращий для молодших дітей і легкого дозвілля."),
          t("For everyday family logistics, supermarkets and pharmacies matter as much as attractions: cold water, fruit, yoghurt, wipes, diapers, sunscreen, after-sun and easy apartment meals keep the day calmer.", "Pour la logistique famille, supermarches et pharmacies comptent autant que les attractions: eau fraiche, fruits, yaourts, lingettes, couches, creme solaire, apres-soleil et repas simples a l'appartement rendent la journee plus calme.", "Per la logistica familiare, supermercati e farmacie contano quanto le attrazioni: acqua fredda, frutta, yogurt, salviette, pannolini, crema solare, doposole e pasti semplici in appartamento rendono la giornata piu calma.", "Для сімейної логістики супермаркети й аптеки не менш важливі за атракції: холодна вода, фрукти, йогурт, серветки, підгузки, сонцезахист, after-sun і прості страви в апартаментах роблять день спокійнішим."),
          t("Cinéma Eden, Le Bastion and small museums can also save a hot or rainy afternoon when children need a reset rather than another beach session.", "Le Cinema Eden, Le Bastion et les petits musees peuvent sauver un apres-midi chaud ou pluvieux quand les enfants ont besoin d'une pause plutot que d'une autre plage.", "Cinema Eden, Le Bastion e piccoli musei possono salvare un pomeriggio caldo o piovoso quando i bambini hanno bisogno di pausa invece di un'altra spiaggia.", "Cinéma Eden, Le Bastion і невеликі музеї можуть врятувати спекотний або дощовий пообідній час, коли дітям потрібне перезавантаження, а не ще один пляж."),
        ],
        relatedPlaceIds: ["koaland-menton", "intermarche-hyper-menton", "u-express-menton-centre", "cinema-eden-menton", "musee-jean-cocteau-bastion"],
      },
      {
        heading: t("Indoor play, shopping centres and rainy-day backups", "Jeux indoor, centres commerciaux et plans pluie", "Giochi indoor, centri commerciali e piani pioggia", "Indoor play, торгові центри й плани на дощ"),
        body: [
          t("CAP3000 is one of the strongest family shopping-centre options near the airport side, especially when you need lunch, errands, air conditioning and a children's play break in one stop.", "CAP3000 est l'une des meilleures options centre commercial cote aeroport, surtout si vous voulez dejeuner, courses, climatisation et pause jeu enfants au meme endroit.", "CAP3000 e una delle migliori opzioni centro commerciale lato aeroporto, soprattutto se servono pranzo, commissioni, aria condizionata e pausa gioco bambini nello stesso posto.", "CAP3000 - один із найсильніших сімейних торгових центрів біля аеропорту, коли потрібні обід, покупки, кондиціонер і дитяча пауза в одному місці."),
          t("Kid's City Nice is a more direct indoor play option for children who need to climb, slide and move on rainy or very hot days. Shopping Promenade Riviera and Nice Etoile are useful when you combine errands with a children's activity.", "Kid's City Nice est une option plus directe de jeu indoor pour grimper, glisser et bouger les jours de pluie ou de forte chaleur. Shopping Promenade Riviera et Nice Etoile sont utiles quand courses et activite enfants se combinent.", "Kid's City Nice e un'opzione indoor piu diretta per arrampicarsi, scivolare e muoversi nei giorni piovosi o molto caldi. Shopping Promenade Riviera e Nice Etoile aiutano quando unisci commissioni e attivita bambini.", "Kid's City Nice - пряміший indoor-варіант, де діти можуть лазити, кататися й рухатися в дощ або сильну спеку. Shopping Promenade Riviera і Nice Étoile корисні, коли треба поєднати покупки й дитячу активність."),
        ],
        relatedPlaceIds: ["cap3000-saint-laurent-du-var", "la-tete-dans-les-nuages-cap3000", "shopping-promenade-riviera", "ultra-polygone", "bricks-4-kidz-nice-etoile", "kids-city-nice", "fun-city-cannes"],
      },
      {
        heading: t("Pools, water parks and active day trips", "Piscines, parcs aquatiques et sorties actives", "Piscine, parchi acquatici e gite attive", "Басейни, аквапарки й активні поїздки"),
        body: [
          t("For a swim away from pebbles and waves, check Piscine Alex Jany in Menton or the outdoor Stade Nautique Rainier III in Monaco. Public pool schedules change, so verify current hours before promising the plan to children.", "Pour nager loin des galets et vagues, regardez la Piscine Alex Jany a Menton ou le Stade Nautique Rainier III a Monaco. Les horaires de piscines changent: verifiez avant de promettre le plan aux enfants.", "Per nuotare lontano da ciottoli e onde, guarda Piscine Alex Jany a Mentone o Stade Nautique Rainier III a Monaco. Gli orari delle piscine cambiano: verifica prima di prometterlo ai bambini.", "Для плавання без гальки й хвиль перевірте Piscine Alex Jany у Ментоні або Stade Nautique Rainier III у Монако. Розклад басейнів змінюється, тому перевіряйте години до того, як пообіцяти це дітям."),
          t("Aquasplash Antibes, Antibes Land and the Villeneuve-Loubet adventure parks are bigger outings. They are best for longer stays, older children or families with a car rather than a first relaxed Menton day.", "Aquasplash Antibes, Antibes Land et les parcs de Villeneuve-Loubet sont de plus grandes sorties. Ils conviennent mieux aux longs sejours, grands enfants ou familles avec voiture qu'au premier jour tranquille a Menton.", "Aquasplash Antibes, Antibes Land e i parchi di Villeneuve-Loubet sono uscite piu grandi. Vanno meglio per soggiorni lunghi, bambini grandi o famiglie con auto, non per il primo giorno tranquillo a Mentone.", "Aquasplash Antibes, Antibes Land і парки Villeneuve-Loubet - більші виїзди. Вони краще підходять для довших зупинок, старших дітей або сімей з авто, а не для першого спокійного дня в Ментоні."),
        ],
        relatedPlaceIds: ["piscine-alex-jany-menton", "stade-nautique-rainier-iii-monaco", "aquasplash-antibes", "antibes-land", "village-des-fous", "bois-des-lutins", "pitchoun-forest", "canyon-forest"],
      },
      {
        heading: t("Monaco with children", "Monaco avec enfants", "Monaco con bambini", "Монако з дітьми"),
        body: [
          t("Monaco is one of the easiest family day trips from Menton by train. The Oceanographic Museum is the strongest anchor: aquariums, marine history, indoor time and views from the Rock.", "Monaco est l'une des excursions famille les plus faciles depuis Menton en train. Le Musee oceanographique est le meilleur point d'ancrage: aquariums, histoire marine, pause interieure et vues depuis le Rocher.", "Monaco e una delle gite in famiglia piu facili da Mentone in treno. Il Museo Oceanografico e l'ancora migliore: acquari, storia marina, pausa al chiuso e viste dal Rocher.", "Монако - одна з найпростіших сімейних поїздок із Ментона потягом. Океанографічний музей - найкраща основа: акваріуми, морська історія, час у приміщенні й краєвиди з Rocher."),
          t("After the museum, choose one simple add-on: Larvotto playground, Parc Princesse Antoinette, a Port Hercule walk or the Prince's Car Collection. Avoid trying to collect everything in one family day.", "Apres le musee, choisissez un seul ajout simple: aire de jeux du Larvotto, Parc Princesse Antoinette, marche au Port Hercule ou Collection automobile du Prince. Evitez de vouloir tout faire en une journee famille.", "Dopo il museo scegli una sola aggiunta semplice: parco giochi Larvotto, Parc Princesse Antoinette, passeggiata a Port Hercule o Collezione auto del Principe. Evita di voler fare tutto in un giorno.", "Після музею оберіть одне просте доповнення: майданчик Larvotto, Parc Princesse Antoinette, прогулянку Port Hercule або автомобільну колекцію князя. Не намагайтеся зібрати все за один сімейний день."),
        ],
        relatedPlaceIds: ["oceanographic-museum-monaco", "larvotto-beach-playground", "parc-princesse-antoinette-monaco", "prince-monaco-car-collection", "monaco-monte-carlo"],
      },
      {
        heading: t("Seasonal events children may enjoy", "Evenements saisonniers pour enfants", "Eventi stagionali adatti ai bambini", "Сезонні події, які можуть сподобатися дітям"),
        body: [
          t("In autumn, the Monaco Attractions Fair can be a strong family evening or afternoon near Port Hercule. In winter, Nice Carnival and Menton's Fete du Citron are colourful family options, but crowds can be intense.", "En automne, la Foire Attractions de Monaco peut etre une bonne sortie famille l'apres-midi ou le soir pres du Port Hercule. En hiver, le Carnaval de Nice et la Fete du Citron a Menton sont tres colores, mais la foule peut etre dense.", "In autunno la Fiera delle attrazioni di Monaco puo essere una bella uscita famiglia vicino a Port Hercule. In inverno, Carnevale di Nizza e Fete du Citron a Mentone sono colorati, ma la folla puo essere intensa.", "Восени Monaco Attractions Fair може бути сильним сімейним днем або вечором біля Port Hercule. Узимку Nice Carnival і Fête du Citron у Ментоні яскраві для дітей, але натовпи можуть бути щільними."),
          t("For big events, book tickets early, arrive before peak crowd times and keep the return route simple. With children, the exit plan matters as much as the event itself.", "Pour les grands evenements, reservez tot, arrivez avant les pics de foule et gardez un retour simple. Avec enfants, le plan de sortie compte autant que l'evenement.", "Per grandi eventi prenota presto, arriva prima dei picchi di folla e mantieni semplice il ritorno. Con bambini il piano di uscita conta quanto l'evento.", "Для великих подій бронюйте рано, приходьте до пікових натовпів і тримайте простий маршрут повернення. З дітьми план виходу не менш важливий за саму подію."),
        ],
      },
      {
        heading: t("Heat, rain and simple family itineraries", "Chaleur, pluie et itineraires famille simples", "Caldo, pioggia e itinerari famiglia semplici", "Спека, дощ і прості сімейні маршрути"),
        body: [
          t("On very hot days, keep the morning local: Sablettes, Promenade du Soleil, a short swim, fruit and water. Return to the apartment for lunch, air conditioning and rest before a late-afternoon cinema, museum, indoor play or second beach visit.", "Par forte chaleur, gardez le matin local: Sablettes, Promenade du Soleil, courte baignade, fruits et eau. Rentrez a l'appartement pour dejeuner, climatisation et repos avant cinema, musee, jeu indoor ou deuxieme plage en fin d'apres-midi.", "Nei giorni molto caldi resta locale al mattino: Sablettes, Promenade du Soleil, bagno breve, frutta e acqua. Torna in appartamento per pranzo, aria condizionata e riposo prima di cinema, museo, indoor play o seconda spiaggia.", "У дуже спекотні дні залишайте ранок локальним: Sablettes, Promenade du Soleil, коротке купання, фрукти й вода. Поверніться в апартаменти на обід, кондиціонер і відпочинок, а ближче до вечора - кіно, музей, indoor play або другий пляж."),
          t("A first easy Menton day can be breakfast at the apartment, Promenade du Soleil, Sablettes, snacks from a supermarket, rest, Koaland and an early dinner near the beach.", "Un premier jour facile a Menton peut etre: petit-dejeuner a l'appartement, Promenade du Soleil, Sablettes, encas du supermarche, repos, Koaland et diner tot pres de la plage.", "Un primo giorno facile a Mentone puo essere: colazione in appartamento, Promenade du Soleil, Sablettes, snack dal supermercato, riposo, Koaland e cena presto vicino alla spiaggia.", "Перший легкий день у Ментоні: сніданок в апартаментах, Promenade du Soleil, Sablettes, перекуси з супермаркету, відпочинок, Koaland і рання вечеря біля пляжу."),
          t("For a bigger family day, take the train to Monaco for the Oceanographic Museum, lunch in Monaco-Ville or Fontvieille and one simple playground or harbour walk before returning to Menton.", "Pour une grande journee famille, prenez le train vers Monaco: Musee oceanographique, dejeuner a Monaco-Ville ou Fontvieille, puis une aire de jeux ou marche au port avant le retour.", "Per una giornata famiglia piu grande, prendi il treno per Monaco: Museo Oceanografico, pranzo a Monaco-Ville o Fontvieille e poi un parco giochi o passeggiata al porto prima del ritorno.", "Для більшого сімейного дня їдьте потягом у Монако: Океанографічний музей, обід у Monaco-Ville або Fontvieille, потім один майданчик або прогулянка портом перед поверненням."),
        ],
        relatedApartmentKeys: ["beachside-family-apartment"],
      },
      {
        heading: t("Where to stay with children", "Ou sejourner avec enfants", "Dove soggiornare con bambini", "Де зупинитися з дітьми"),
        body: [
          t("Families usually benefit from an apartment more than a single hotel room: kitchen, washing machine, air conditioning, terrace or balcony, easy beach access, supermarket nearby and a safe evening route home.", "Les familles profitent souvent davantage d'un appartement que d'une seule chambre d'hotel: cuisine, lave-linge, climatisation, terrasse ou balcon, plage facile, supermarche proche et retour du soir simple.", "Le famiglie spesso stanno meglio in appartamento che in una sola camera d'hotel: cucina, lavatrice, aria condizionata, terrazza o balcone, spiaggia facile, supermercato vicino e ritorno serale sicuro.", "Сім'ям часто зручніше в апартаментах, ніж в одному готельному номері: кухня, пральна машина, кондиціонер, тераса або балкон, зручний пляж, супермаркет поруч і безпечний вечірній маршрут додому."),
          t("The Terrace & Parking Apartment is especially practical for families because private outdoor space and parking remove two common sources of stress. Sea-view apartments can also work well for smaller families who want a simpler beach rhythm.", "L'Appartement terrasse et parking est particulierement pratique en famille: espace exterieur prive et parking retirent deux sources de stress. Les appartements vue mer peuvent aussi convenir aux petites familles qui veulent un rythme plage simple.", "L'Appartamento con terrazza e parcheggio e particolarmente pratico per famiglie: spazio esterno privato e parcheggio eliminano due stress comuni. Gli appartamenti vista mare funzionano anche per famiglie piu piccole che vogliono un ritmo mare semplice.", "Апартаменти з терасою та паркуванням особливо практичні для сімей: приватний outdoor-простір і паркінг прибирають два типові джерела стресу. Апартаменти з видом на море теж підходять меншим сім'ям, які хочуть простий пляжний ритм."),
        ],
        relatedApartmentKeys: ["beachside-family-apartment", "sea-view-balcony-studio", "panoramic-sea-view-studio"],
      },
    ],
    practicalTips: [
      t("Bring water shoes for Menton's pebble and fine-gravel beaches.", "Prevoyez des chaussures d'eau pour les plages de galets et gravier fin de Menton.", "Porta scarpe da mare per spiagge di ciottoli e ghiaia fine.", "Візьміть взуття для води для гальки й дрібного гравію на пляжах Ментона."),
      t("Avoid old-town climbs and cemetery viewpoints at midday in July and August with small children.", "Evitez les montees de la vieille ville et les points de vue du cimetiere a midi en juillet-aout avec jeunes enfants.", "Evita salite del centro storico e punti panoramici del cimitero a mezzogiorno in luglio-agosto con bambini piccoli.", "У липні-серпні з малими дітьми уникайте підйомів старого міста й кладовища опівдні."),
      t("Check current opening hours before promising Koaland, pools or indoor play to children.", "Verifiez les horaires actuels avant de promettre Koaland, piscine ou jeux indoor aux enfants.", "Controlla gli orari prima di promettere Koaland, piscine o indoor play ai bambini.", "Перевіряйте актуальні години, перш ніж обіцяти дітям Koaland, басейн або indoor play."),
      t("For heat symptoms, move to shade or a cool indoor place; call 15 or 112 if a child seems seriously unwell.", "En cas de signes lies a la chaleur, allez a l'ombre ou au frais; appelez le 15 ou 112 si l'enfant semble vraiment mal.", "Per sintomi da caldo, spostati all'ombra o al fresco; chiama 15 o 112 se il bambino sembra stare davvero male.", "За ознак перегріву перейдіть у тінь або прохолодне приміщення; телефонуйте 15 або 112, якщо дитині серйозно зле."),
    ],
  }),
  shortArticle({
    id: "useful-numbers-emergency-contacts-menton",
    slug: "useful-numbers-emergency-contacts-menton",
    title: t("Useful numbers and emergency contacts in Menton", "Numeros utiles et contacts d'urgence a Menton", "Numeri utili e contatti di emergenza a Mentone", "Корисні номери та екстрені контакти в Ментоні"),
    seoTitle: t("Useful Numbers and Emergency Contacts in Menton", "Numeros utiles et contacts d'urgence a Menton", "Numeri utili e contatti di emergenza a Mentone", "Корисні номери та екстрені контакти в Ментоні"),
    seoDescription: t("Emergency numbers, hospitals, pharmacies, doctors, dentists, police, tourist office and practical contacts for visitors staying in Menton and nearby.", "Numeros d'urgence, hopitaux, pharmacies, medecins, dentistes, police, office de tourisme et contacts pratiques pour les visiteurs a Menton.", "Numeri di emergenza, ospedali, farmacie, medici, dentisti, polizia, ufficio turistico e contatti pratici per chi soggiorna a Mentone.", "Екстрені номери, лікарні, аптеки, лікарі, стоматологи, поліція, туристичний офіс і практичні контакти для гостей Ментона."),
    excerpt: t("A calm practical reference for visitors: French emergency numbers, Menton hospital, nearby pediatric care, pharmacies, police, lost documents and useful phrases.", "Une reference pratique et calme pour les visiteurs: numeros d'urgence francais, hopital de Menton, pediatrie proche, pharmacies, police, documents perdus et phrases utiles.", "Un riferimento pratico e tranquillo per visitatori: numeri francesi di emergenza, ospedale di Mentone, pediatria vicina, farmacie, polizia, documenti persi e frasi utili.", "Спокійний практичний довідник для гостей: екстрені номери Франції, лікарня Ментона, дитяча допомога поруч, аптеки, поліція, втрачені документи й корисні фрази."),
    category: "practical",
    coverImage: "/images/guide/useful-numbers-emergency-contacts-menton.jpg",
    coverImageAlt: t("Illustration of useful emergency contacts in Menton", "Illustration des contacts d'urgence utiles a Menton", "Illustrazione dei contatti utili di emergenza a Mentone", "Ілюстрація корисних екстрених контактів у Ментоні"),
    visualTheme: "family",
    visualStatus: "project_illustration",
    tags: [
      t("emergency", "urgence", "emergenza", "екстрені випадки"),
      t("useful numbers", "numeros utiles", "numeri utili", "корисні номери"),
      t("hospital", "hopital", "ospedale", "лікарня"),
      t("pharmacy", "pharmacie", "farmacia", "аптека"),
      t("police", "police", "polizia", "поліція"),
      t("lost passport", "passeport perdu", "passaporto perso", "втрачений паспорт"),
    ],
    bestFor: [guideBestForOptions[3].label, guideBestForOptions[1].label, guideBestForOptions[8].label, guideBestForOptions[9].label, guideBestForOptions[4].label, guideBestForOptions[10].label, guideBestForOptions[11].label],
    duration: "reference",
    locationTags: ["menton-centre", "monaco", "nice"],
    sourceStatus: "needs_verification",
    relatedPlaces: [
      "centre-hospitalier-la-palmosa-menton",
      "hopitaux-pediatriques-nice-lenval",
      "centre-hospitalier-princesse-grace-monaco",
      "chu-nice-hopital-pasteur",
      "institut-medecine-bucco-dentaire-nice",
      "ordre-chirurgiens-dentistes-alpes-maritimes",
      "commissariat-police-menton",
      "police-municipale-menton",
      "mairie-menton",
      "office-tourisme-menton-riviera-merveilles",
    ],
    relatedArticles: ["menton-with-kids-family-guide", "useful-apps-websites-menton-monaco-italian-riviera", "stay-cool-in-menton-summer", "public-transport-in-menton", "menton-without-a-car", "where-to-stay-in-menton", "supermarkets-in-menton", "museums-in-menton-nice-monaco", "cinemas-in-menton-nice-monaco"],
    relatedApartments: allApartments,
    sections: [
      {
        heading: t("Emergency numbers in France", "Numeros d'urgence en France", "Numeri di emergenza in Francia", "Екстрені номери у Франції"),
        body: [
          t("For a serious or urgent situation, use the official French emergency numbers. If you are unsure which number to call, 112 is the safest general emergency number.", "Pour une situation grave ou urgente, utilisez les numeros d'urgence officiels en France. En cas de doute, le 112 est le numero d'urgence general le plus sur.", "Per una situazione grave o urgente usa i numeri ufficiali francesi. Se non sai quale chiamare, il 112 e il numero generale piu sicuro.", "У серйозній або невідкладній ситуації використовуйте офіційні французькі екстрені номери. Якщо не знаєте, куди дзвонити, 112 - найбезпечніший загальний номер."),
          t("Calls to emergency services should be reserved for real emergencies. Do not hang up first; let the operator end the call.", "Les appels aux secours doivent rester reserves aux vraies urgences. Ne raccrochez pas en premier; laissez l'operateur terminer l'appel.", "Le chiamate ai servizi di emergenza vanno riservate alle vere emergenze. Non chiudere per primo; lascia terminare la chiamata all'operatore.", "Дзвінки до екстрених служб мають бути для реальних екстрених випадків. Не кладіть слухавку першими; дочекайтеся завершення розмови оператором."),
        ],
        bullets: [
          t("15 - SAMU / medical emergency", "15 - SAMU / urgence medicale", "15 - SAMU / emergenza medica", "15 - SAMU / медична невідкладна допомога"),
          t("17 - police emergency", "17 - police secours", "17 - emergenza polizia", "17 - поліція"),
          t("18 - fire brigade / firefighters", "18 - pompiers", "18 - vigili del fuoco", "18 - пожежники"),
          t("112 - European emergency number", "112 - numero d'urgence europeen", "112 - numero europeo di emergenza", "112 - європейський екстрений номер"),
          t("114 - SMS / app emergency number for people who cannot speak or hear", "114 - urgence par SMS / application pour les personnes qui ne peuvent pas parler ou entendre", "114 - emergenza via SMS / app per persone che non possono parlare o sentire", "114 - екстрений номер SMS / app для людей, які не можуть говорити або чути"),
        ],
      },
      {
        heading: t("What to say when calling", "Que dire au telephone", "Cosa dire quando chiami", "Що сказати під час дзвінка"),
        body: [
          t("Try to stay calm and give clear information: where you are, what happened, how many people are involved, whether anyone is unconscious or having difficulty breathing, your phone number, and the nearest address or landmark.", "Essayez de rester calme et donnez des informations claires: ou vous etes, ce qui s'est passe, combien de personnes sont concernees, si quelqu'un est inconscient ou respire difficilement, votre numero et l'adresse ou le repere le plus proche.", "Cerca di restare calmo e dai informazioni chiare: dove sei, cosa e successo, quante persone sono coinvolte, se qualcuno e incosciente o respira male, il tuo numero e l'indirizzo o riferimento piu vicino.", "Намагайтеся говорити спокійно й чітко: де ви, що сталося, скільки людей залучено, чи хтось непритомний або важко дихає, ваш номер телефону та найближча адреса або орієнтир."),
          t("Keep your apartment address easy to access. In an emergency call, the exact location matters more than a general description of the area.", "Gardez l'adresse de l'appartement facile a retrouver. Pendant un appel d'urgence, l'adresse exacte compte plus qu'une description generale du quartier.", "Tieni l'indirizzo dell'appartamento facile da trovare. In una chiamata d'emergenza, la posizione esatta conta piu di una descrizione generale della zona.", "Тримайте адресу апартаментів під рукою. Під час екстреного дзвінка точна адреса важливіша за загальний опис району."),
        ],
        relatedApartmentKeys: allApartments,
      },
      {
        heading: t("Doctors, hospitals and children", "Medecins, hopitaux et enfants", "Medici, ospedali e bambini", "Лікарі, лікарні та діти"),
        body: [
          t("For a life-threatening emergency, call 15 or 112. For a non-life-threatening medical problem during the day, search for a general practitioner in Menton through Sante.fr, Doctolib or similar appointment platforms.", "Pour une urgence vitale, appelez le 15 ou le 112. Pour un probleme medical non vital en journee, cherchez un medecin generaliste a Menton via Sante.fr, Doctolib ou une plateforme similaire.", "Per un'emergenza vitale chiama 15 o 112. Per un problema medico non vitale durante il giorno cerca un medico di base a Mentone su Sante.fr, Doctolib o piattaforme simili.", "У загрозливій ситуації телефонуйте 15 або 112. Для не критичної медичної проблеми вдень шукайте сімейного лікаря в Ментоні через Sante.fr, Doctolib або подібні сервіси."),
          t("Centre Hospitalier La Palmosa is the main hospital in Menton. For serious child symptoms, call 15 first; nearby pediatric emergency options include Lenval in Nice and Centre Hospitalier Princesse Grace in Monaco.", "Le Centre Hospitalier La Palmosa est l'hopital principal de Menton. Pour des symptomes graves chez un enfant, appelez d'abord le 15; les options pediatriques proches incluent Lenval a Nice et le Centre Hospitalier Princesse Grace a Monaco.", "Il Centre Hospitalier La Palmosa e l'ospedale principale di Mentone. Per sintomi gravi in un bambino chiama prima il 15; le opzioni pediatriche vicine includono Lenval a Nizza e il Centre Hospitalier Princesse Grace a Monaco.", "Centre Hospitalier La Palmosa - головна лікарня Ментона. За серйозних симптомів у дитини спершу телефонуйте 15; поруч є дитяча допомога Lenval у Ніцці та Centre Hospitalier Princesse Grace у Монако."),
          t("Do not use the hospital emergency department for a simple cold, mild headache or routine prescription unless a healthcare professional tells you to go.", "N'utilisez pas les urgences pour un simple rhume, un leger mal de tete ou une ordonnance courante, sauf avis d'un professionnel de sante.", "Non usare il pronto soccorso per raffreddore semplice, lieve mal di testa o ricetta ordinaria, salvo indicazione di un professionista sanitario.", "Не звертайтеся до emergency hospital через звичайну застуду, легкий головний біль або плановий рецепт, якщо медичний фахівець не сказав іти."),
        ],
        relatedPlaceIds: ["centre-hospitalier-la-palmosa-menton", "hopitaux-pediatriques-nice-lenval", "centre-hospitalier-princesse-grace-monaco", "chu-nice-hopital-pasteur"],
      },
      {
        heading: t("Pharmacies and dental emergencies", "Pharmacies et urgences dentaires", "Farmacie e urgenze dentali", "Аптеки та стоматологічні невідкладні випадки"),
        body: [
          t("For normal pharmacy needs, search for pharmacie Menton, pharmacie ouverte Menton or pharmacie de garde Menton. The on-duty pharmacy service is 3237, and access rules can vary late at night, on Sundays or public holidays.", "Pour une pharmacie, cherchez pharmacie Menton, pharmacie ouverte Menton ou pharmacie de garde Menton. Le service des pharmacies de garde est le 3237, et les regles d'acces peuvent varier la nuit, le dimanche ou les jours feries.", "Per una farmacia cerca pharmacie Menton, pharmacie ouverte Menton o pharmacie de garde Menton. Il servizio per farmacie di turno e 3237, e le regole di accesso possono variare di notte, domenica o festivi.", "Для аптеки шукайте pharmacie Menton, pharmacie ouverte Menton або pharmacie de garde Menton. Сервіс чергових аптек - 3237, а правила доступу можуть відрізнятися вночі, у неділю або свята."),
          t("For dental problems during normal hours, search for dentiste Menton or urgence dentaire Menton. For severe swelling, fever, facial trauma, heavy bleeding, difficulty breathing or difficulty swallowing, call 15 or 112.", "Pour un probleme dentaire en horaires normaux, cherchez dentiste Menton ou urgence dentaire Menton. En cas de gonflement important, fievre, traumatisme facial, saignement abondant, gene respiratoire ou difficulte a avaler, appelez le 15 ou le 112.", "Per problemi dentali in orario normale cerca dentiste Menton o urgence dentaire Menton. Con gonfiore forte, febbre, trauma al viso, sanguinamento importante, difficolta a respirare o deglutire, chiama 15 o 112.", "Для стоматологічної проблеми в робочі години шукайте dentiste Menton або urgence dentaire Menton. За сильного набряку, температури, травми обличчя, значної кровотечі, утрудненого дихання або ковтання телефонуйте 15 або 112."),
        ],
        relatedPlaceIds: ["institut-medecine-bucco-dentaire-nice", "ordre-chirurgiens-dentistes-alpes-maritimes"],
      },
      {
        heading: t("Police, lost property and documents", "Police, objets perdus et documents", "Polizia, oggetti smarriti e documenti", "Поліція, загублені речі та документи"),
        body: [
          t("For urgent police help, call 17 or 112. The National Police station in Menton is the place for theft, assault, burglary, official police reports and stolen documents.", "Pour une urgence police, appelez le 17 ou le 112. Le commissariat de police nationale de Menton concerne vols, agressions, cambriolages, declarations officielles et documents voles.", "Per emergenza polizia chiama 17 o 112. Il commissariato nazionale di Mentone serve per furti, aggressioni, effrazioni, denunce ufficiali e documenti rubati.", "Для термінової допомоги поліції телефонуйте 17 або 112. Національна поліція Ментона потрібна для крадіжок, нападів, зламів, офіційних заяв і викрадених документів."),
          t("If you lose a passport or ID, check where you last had it, ask your accommodation or transport provider, report theft to the police, then contact your embassy or consulate for emergency travel documents.", "Si vous perdez passeport ou carte d'identite, verifiez le dernier endroit, demandez a votre hebergement ou transporteur, signalez le vol a la police, puis contactez votre ambassade ou consulat pour les documents de voyage d'urgence.", "Se perdi passaporto o carta d'identita, controlla l'ultimo posto, chiedi ad alloggio o trasporto, denuncia il furto alla polizia, poi contatta ambasciata o consolato per documenti di viaggio urgenti.", "Якщо втратили паспорт або ID, перевірте останнє місце, запитайте житло або транспорт, повідомте поліцію про крадіжку, а потім зверніться до посольства чи консульства за emergency travel documents."),
        ],
        relatedPlaceIds: ["commissariat-police-menton", "police-municipale-menton", "mairie-menton"],
      },
      {
        heading: t("Tourist office and practical support", "Office de tourisme et aide pratique", "Ufficio turistico e supporto pratico", "Туристичний офіс і практична допомога"),
        body: [
          t("For maps, brochures, local events, guided tours and visitor guidance, use the Office de Tourisme Menton, Riviera & Merveilles at Palais de l'Europe. It is not an emergency service, but it is useful for practical visitor questions.", "Pour cartes, brochures, evenements locaux, visites guidees et conseils visiteurs, utilisez l'Office de Tourisme Menton, Riviera & Merveilles au Palais de l'Europe. Ce n'est pas un service d'urgence, mais c'est utile pour les questions pratiques.", "Per mappe, brochure, eventi locali, visite guidate e informazioni usa l'Office de Tourisme Menton, Riviera & Merveilles al Palais de l'Europe. Non e un servizio di emergenza, ma e utile per domande pratiche.", "Для карт, брошур, місцевих подій, екскурсій та порад звертайтеся до Office de Tourisme Menton, Riviera & Merveilles у Palais de l'Europe. Це не екстрена служба, але корисна для практичних питань."),
          t("Before arriving, save this page, your apartment address, passport copy, travel insurance, emergency contacts, embassy details, nearest pharmacy and host contact.", "Avant d'arriver, sauvegardez cette page, l'adresse de l'appartement, copie du passeport, assurance voyage, contacts d'urgence, ambassade, pharmacie proche et contact de l'hote.", "Prima di arrivare salva questa pagina, indirizzo dell'appartamento, copia del passaporto, assicurazione, contatti d'emergenza, ambasciata, farmacia vicina e contatto dell'host.", "Перед приїздом збережіть цю сторінку, адресу апартаментів, копію паспорта, страховку, екстрені контакти, дані посольства, найближчу аптеку й контакт господаря."),
        ],
        relatedPlaceIds: ["office-tourisme-menton-riviera-merveilles"],
        relatedApartmentKeys: allApartments,
      },
      {
        heading: t("Heatstroke and useful French phrases", "Coup de chaleur et phrases utiles", "Colpo di calore e frasi utili", "Тепловий удар і корисні французькі фрази"),
        body: [
          t("Summer heat in Menton can be intense. Call 15 if someone is confused, unusually drowsy, fainting, vomiting, very hot, behaving strangely or showing possible heatstroke signs. Move them to shade, cool the body with water or damp cloths, give small sips of water only if they are conscious and able to drink, and do not give alcohol.", "La chaleur d'ete a Menton peut etre intense. Appelez le 15 si une personne est confuse, tres somnolente, fait un malaise, vomit, est tres chaude, se comporte bizarrement ou montre des signes de coup de chaleur. Mettez-la a l'ombre, rafraichissez avec eau ou linges humides, donnez de petites gorgees d'eau seulement si elle est consciente et peut boire, et ne donnez pas d'alcool.", "Il caldo estivo a Mentone puo essere intenso. Chiama 15 se qualcuno e confuso, molto sonnolento, sviene, vomita, e molto caldo, si comporta in modo strano o mostra segni di colpo di calore. Spostalo all'ombra, raffredda con acqua o panni umidi, dai piccoli sorsi d'acqua solo se e cosciente e puo bere, e non dare alcol.", "Літня спека в Ментоні може бути сильною. Телефонуйте 15, якщо людина розгублена, надмірно сонна, непритомніє, блює, дуже гаряча, поводиться дивно або має ознаки теплового удару. Перенесіть у тінь, охолоджуйте водою або вологими тканинами, давайте маленькі ковтки води лише якщо людина притомна й може пити, не давайте алкоголь."),
          t("Useful phrases: J'ai besoin d'aide - I need help. C'est une urgence - it is an emergency. Appelez une ambulance, s'il vous plait - call an ambulance, please. Je ne parle pas francais - I do not speak French. L'adresse est... - the address is...", "Phrases utiles: J'ai besoin d'aide - I need help. C'est une urgence - it is an emergency. Appelez une ambulance, s'il vous plait - call an ambulance, please. Je ne parle pas francais - I do not speak French. L'adresse est... - the address is...", "Frasi utili: J'ai besoin d'aide - ho bisogno di aiuto. C'est une urgence - e un'emergenza. Appelez une ambulance, s'il vous plait - chiamate un'ambulanza. Je ne parle pas francais - non parlo francese. L'adresse est... - l'indirizzo e...", "Корисні фрази: J'ai besoin d'aide - мені потрібна допомога. C'est une urgence - це екстрений випадок. Appelez une ambulance, s'il vous plait - викличте швидку. Je ne parle pas francais - я не говорю французькою. L'adresse est... - адреса..."),
        ],
      },
    ],
    practicalTips: [
      t("In a serious emergency in France, call 15, 17, 18 or 112. If unsure, call 112.", "En cas d'urgence grave en France, appelez le 15, 17, 18 ou 112. En cas de doute, appelez le 112.", "In una grave emergenza in Francia chiama 15, 17, 18 o 112. Se hai dubbi, chiama 112.", "У серйозній екстреній ситуації у Франції телефонуйте 15, 17, 18 або 112. Якщо сумніваєтеся, телефонуйте 112."),
      t("For serious child symptoms, call 15 before deciding where to go.", "Pour des symptomes graves chez un enfant, appelez le 15 avant de choisir ou aller.", "Per sintomi gravi in un bambino chiama il 15 prima di decidere dove andare.", "За серйозних симптомів у дитини телефонуйте 15, перш ніж вирішувати, куди їхати."),
      t("For on-duty pharmacies, use 3237 and check access rules before going late at night.", "Pour les pharmacies de garde, utilisez le 3237 et verifiez les regles d'acces avant de partir tard le soir.", "Per farmacie di turno usa 3237 e controlla le regole di accesso prima di andare tardi la sera.", "Для чергових аптек використовуйте 3237 і перевіряйте правила доступу перед нічним виходом."),
      t("Keep your apartment address, insurance and passport copy available offline.", "Gardez l'adresse de l'appartement, assurance et copie du passeport accessibles hors ligne.", "Tieni indirizzo dell'appartamento, assicurazione e copia del passaporto disponibili offline.", "Зберігайте адресу апартаментів, страховку й копію паспорта офлайн."),
    ],
  }),
  shortArticle({
    id: "cinemas-in-menton-nice-monaco",
    slug: "cinemas-in-menton-nice-monaco",
    title: t("Cinemas near Menton: where to watch a film in Menton, Monaco and Nice", "Cinemas pres de Menton: ou voir un film a Menton, Monaco et Nice", "Cinema vicino a Mentone: dove vedere un film a Mentone, Monaco e Nizza", "Кінотеатри біля Ментона: де подивитися фільм у Ментоні, Монако та Ніцці"),
    seoTitle: t("Cinemas Near Menton: Menton, Monaco and Nice Movie Theatres", "Cinemas pres de Menton: Menton, Monaco et Nice", "Cinema vicino a Mentone: Mentone, Monaco e Nizza", "Кінотеатри біля Ментона: Ментон, Монако та Ніцца"),
    seoDescription: t("A practical guide to cinemas near Menton: Cinéma Eden in Menton, Monaco cinemas, open-air summer screenings and the best cinemas in Nice for rainy days, hot afternoons and evening plans.", "Guide pratique des cinemas pres de Menton: Cinema Eden, cinemas de Monaco, seances d'ete en plein air et cinemas de Nice pour pluie, chaleur ou soiree.", "Guida pratica ai cinema vicino a Mentone: Cinéma Eden, cinema di Monaco, proiezioni estive all'aperto e cinema di Nizza per pioggia, caldo o sera.", "Практичний гід по кінотеатрах біля Ментона: Cinéma Eden, кінотеатри Монако, літні покази просто неба та кіно в Ніцці для дощу, спеки й вечора."),
    excerpt: t("Cinemas are useful on the Riviera when the day is too hot, rainy or simply ready for a quieter evening: Menton has Eden, while Monaco and Nice add more programme choice.", "Le cinema est utile sur la Riviera quand il fait trop chaud, qu'il pleut ou qu'une soiree calme suffit: Menton a l'Eden, Monaco et Nice ajoutent plus de choix.", "Il cinema e utile in Riviera quando fa troppo caldo, piove o basta una serata piu tranquilla: Mentone ha l'Eden, Monaco e Nizza aggiungono scelta.", "Кіно на Рив'єрі корисне, коли надто спекотно, дощить або хочеться спокійнішого вечора: у Ментоні є Eden, а Монако й Ніцца дають більше вибору."),
    category: "practical",
    coverImage: "/images/guide/cinemas-in-menton-nice-monaco.jpg",
    coverImageAlt: t("Illustration of cinemas near Menton, Monaco and Nice", "Illustration des cinemas pres de Menton, Monaco et Nice", "Illustrazione dei cinema vicino a Mentone, Monaco e Nizza", "Ілюстрація кінотеатрів біля Ментона, Монако та Ніцци"),
    visualTheme: "event",
    visualStatus: "project_illustration",
    tags: [
      t("cinema", "cinema", "cinema", "кіно"),
      t("rainy day", "jour de pluie", "giorno di pioggia", "дощовий день"),
      t("hot day", "jour de chaleur", "giorno caldo", "спекотний день"),
      t("Monaco", "Monaco", "Monaco", "Монако"),
      t("Nice", "Nice", "Nizza", "Ніцца"),
      t("VO/VOST", "VO/VOST", "VO/VOST", "VO/VOST"),
    ],
    bestFor: [guideBestForOptions[1].label, guideBestForOptions[5].label, guideBestForOptions[8].label, guideBestForOptions[0].label, guideBestForOptions[6].label, guideBestForOptions[4].label, guideBestForOptions[3].label],
    duration: "reference",
    locationTags: ["menton-centre", "monaco", "nice"],
    sourceStatus: "needs_verification",
    relatedPlaces: [
      "cinema-eden-menton",
      "cinema-beaux-arts-monaco",
      "monaco-open-air-cinema",
      "pathe-massena-nice",
      "pathe-gare-du-sud-nice",
      "cinema-varietes-nice",
      "cinema-rialto-nice",
      "cinema-jean-paul-belmondo-nice",
      "cinematheque-de-nice",
      "megarama-nice",
    ],
    relatedArticles: ["music-videos-filmed-in-menton", "theatre-opera-performing-arts-near-menton", "menton-with-kids-family-guide", "stay-cool-in-menton-summer", "museums-in-menton-nice-monaco", "public-transport-in-menton", "menton-without-a-car", "day-trips-from-menton", "nightlife-in-menton", "where-to-stay-in-menton"],
    relatedApartments: allApartments,
    sections: [
      {
        heading: t("Why cinema is useful from Menton", "Pourquoi le cinema est utile depuis Menton", "Perche il cinema e utile da Mentone", "Чому кіно корисне з Ментона"),
        body: [
          t("A cinema plan is not only for bad weather. In July, August and early September it can be one of the easiest ways to pause during a hot afternoon, especially with children or after several beach days.", "Le cinema n'est pas seulement une idee de pluie. En juillet, aout et debut septembre, c'est l'une des pauses les plus simples pendant un apres-midi chaud, surtout avec enfants ou apres plusieurs jours de plage.", "Il cinema non e solo un piano da pioggia. A luglio, agosto e inizio settembre puo essere una pausa semplice in un pomeriggio caldo, soprattutto con bambini o dopo vari giorni di mare.", "Кіно - не лише план на дощ. У липні, серпні та на початку вересня це один із найпростіших способів зробити паузу в спекотний день, особливо з дітьми або після кількох пляжних днів."),
          t("Menton has its own cinema in the centre. Monaco and Nice are close enough for a wider choice of films, original-language screenings and evening plans if you check train times before committing.", "Menton a son propre cinema au centre. Monaco et Nice sont assez proches pour offrir plus de films, de seances en version originale et d'idees de soiree si vous verifiez les trains avant.", "Mentone ha il suo cinema in centro. Monaco e Nizza sono abbastanza vicine per piu film, proiezioni in lingua originale e serate, se controlli i treni prima.", "У центрі Ментона є власний кінотеатр. Монако й Ніцца достатньо близько для ширшого вибору фільмів, показів мовою оригіналу та вечірніх планів, якщо заздалегідь перевірити потяги."),
        ],
      },
      {
        heading: t("Film versions: VF, VO and VOST", "Versions des films: VF, VO et VOST", "Versioni dei film: VF, VO e VOST", "Версії фільмів: VF, VO та VOST"),
        body: [
          t("In France and Monaco, VF usually means a French-dubbed version. VO means original version, while VOST or VOSTFR normally means original language with French subtitles. For English-speaking visitors, VO/VOSTFR listings are the ones to look for.", "En France et a Monaco, VF signifie generalement version francaise doublee. VO signifie version originale, et VOST ou VOSTFR version originale sous-titree en francais. Pour les visiteurs anglophones, cherchez VO/VOSTFR.", "In Francia e Monaco, VF indica di solito versione doppiata in francese. VO e versione originale, mentre VOST o VOSTFR e lingua originale con sottotitoli francesi. Per chi parla inglese, cerca VO/VOSTFR.", "У Франції та Монако VF зазвичай означає французький дубляж. VO - оригінальна версія, VOST або VOSTFR - оригінальна мова з французькими субтитрами. Англомовним гостям варто шукати VO/VOSTFR."),
        ],
      },
      {
        heading: t("In Menton: Cinéma Eden", "A Menton: Cinema Eden", "A Mentone: Cinéma Eden", "У Ментоні: Cinéma Eden"),
        body: [
          t("Cinéma Eden is the natural first choice because it keeps the plan local. It works well for a rainy afternoon, a hot-day pause, a family film or a simple evening when you do not want to travel after dinner.", "Le Cinema Eden est le premier choix naturel parce qu'il garde le programme local. Il convient pour une apres-midi pluvieuse, une pause par forte chaleur, un film en famille ou une soiree simple sans trajet apres diner.", "Cinéma Eden e la prima scelta naturale perche resta locale. Funziona per un pomeriggio di pioggia, una pausa col caldo, un film in famiglia o una serata semplice senza viaggio dopo cena.", "Cinéma Eden - найприродніший перший вибір, бо план залишається локальним. Він підходить для дощового дня, паузи у спеку, сімейного фільму або простого вечора без поїздки після вечері."),
        ],
        relatedPlaceIds: ["cinema-eden-menton"],
      },
      {
        heading: t("In Monaco: indoor and open-air options", "A Monaco: options interieures et plein air", "A Monaco: opzioni al chiuso e all'aperto", "У Монако: приміщення та покази просто неба"),
        body: [
          t("Monaco is close enough for a planned evening from Menton. Cinéma des Beaux-Arts is the main indoor option to check, while the Monaco Open Air Cinema can be a memorable summer plan when the seasonal programme is running.", "Monaco est assez proche pour une soiree preparee depuis Menton. Le Cinema des Beaux-Arts est l'option interieure principale, tandis que le Monaco Open Air Cinema peut etre une belle idee d'ete quand la saison fonctionne.", "Monaco e abbastanza vicina per una serata programmata da Mentone. Cinéma des Beaux-Arts e l'opzione al chiuso principale, mentre il Monaco Open Air Cinema puo essere una bella idea estiva quando la stagione e attiva.", "Монако достатньо близько для запланованого вечора з Ментона. Cinéma des Beaux-Arts - головний варіант у приміщенні, а Monaco Open Air Cinema може бути особливим літнім планом, коли триває сезон."),
          t("For open-air screenings, bring a light layer and check the return journey before booking. Summer evenings can feel fresh by the sea even after a very hot day.", "Pour les seances en plein air, prenez une couche legere et verifiez le retour avant de reserver. Les soirees d'ete peuvent etre fraiches pres de la mer meme apres une journee tres chaude.", "Per proiezioni all'aperto porta uno strato leggero e controlla il ritorno prima di prenotare. Le sere estive possono essere fresche vicino al mare anche dopo una giornata molto calda.", "Для показів просто неба візьміть легкий шар одягу й перевірте повернення до бронювання. Літні вечори біля моря можуть бути прохолодними навіть після дуже спекотного дня."),
        ],
        relatedPlaceIds: ["cinema-beaux-arts-monaco", "monaco-open-air-cinema"],
      },
      {
        heading: t("In Nice: the widest choice", "A Nice: le plus grand choix", "A Nizza: la scelta piu ampia", "У Ніцці: найширший вибір"),
        body: [
          t("Nice has the broadest cinema choice nearby. Pathé Masséna is convenient in the city centre; Pathé Gare du Sud works well with a food-hall stop; Variétés and Rialto can be useful for more varied programming; Jean-Paul Belmondo fits naturally around Place Garibaldi, the port and Old Nice.", "Nice offre le plus grand choix de cinemas a proximite. Pathe Massena est pratique au centre; Pathe Gare du Sud se combine avec la halle gourmande; Varietes et Rialto peuvent offrir une programmation plus variee; Jean-Paul Belmondo va bien avec Place Garibaldi, le port et le Vieux Nice.", "Nizza offre la scelta piu ampia nei dintorni. Pathé Masséna e comodo in centro; Pathé Gare du Sud funziona con la food hall; Variétés e Rialto possono offrire programmazione piu varia; Jean-Paul Belmondo si combina con Place Garibaldi, porto e Vieux Nice.", "Ніцца має найширший вибір кіно поблизу. Pathé Masséna зручний у центрі; Pathé Gare du Sud поєднується з food hall; Variétés і Rialto можуть мати різноманітнішу програму; Jean-Paul Belmondo природно підходить до Place Garibaldi, порту й старої Ніцци."),
          t("For film culture, check Cinémathèque de Nice. For a larger multiplex choice, Megarama Nice can be useful when the film or timing matters more than atmosphere.", "Pour une approche cinephile, regardez la Cinematheque de Nice. Pour un plus grand multiplexe, Megarama Nice peut etre utile quand le film ou l'horaire compte plus que l'ambiance.", "Per un taglio cinefilo controlla la Cinémathèque de Nice. Per un multiplex piu grande, Megarama Nice puo essere utile quando film o orario contano piu dell'atmosfera.", "Для кіно-культури перевіряйте Cinémathèque de Nice. Для більшого мультиплексу Megarama Nice корисний, коли фільм або час важливіші за атмосферу."),
        ],
        relatedPlaceIds: ["pathe-massena-nice", "pathe-gare-du-sud-nice", "cinema-varietes-nice", "cinema-rialto-nice", "cinema-jean-paul-belmondo-nice", "cinematheque-de-nice", "megarama-nice"],
      },
      {
        heading: t("Which cinema should you choose?", "Quel cinema choisir?", "Quale cinema scegliere?", "Який кінотеатр обрати?"),
        body: [
          t("Choose Cinéma Eden if you want the simplest local plan. Choose Monaco for a more polished evening or seasonal open-air screening. Choose Nice if you want more films, more VO/VOST options or a cinema stop folded into a larger city day.", "Choisissez le Cinema Eden pour le plan local le plus simple. Choisissez Monaco pour une soiree plus composee ou une seance plein air saisonniere. Choisissez Nice pour plus de films, plus de VO/VOST ou une pause cinema dans une journee urbaine.", "Scegli Cinéma Eden per il piano locale piu semplice. Scegli Monaco per una serata piu curata o una proiezione estiva all'aperto. Scegli Nizza per piu film, piu VO/VOST o una pausa cinema dentro una giornata in citta.", "Обирайте Cinéma Eden для найпростішого локального плану. Монако - для більш оформленого вечора або сезонного показу просто неба. Ніццу - для більшого вибору фільмів, VO/VOST або кіно-паузи в межах міського дня."),
        ],
      },
      {
        heading: t("Hot days, rainy days and return plans", "Chaleur, pluie et retour", "Caldo, pioggia e ritorno", "Спека, дощ і повернення"),
        body: [
          t("On very hot days, cinema works best after lunch, when walking and beaches are least comfortable. Pair it with a slow morning, an apartment rest and an air-conditioned evening base rather than trying to fill every hour outside.", "Par forte chaleur, le cinema fonctionne mieux apres dejeuner, quand marche et plage sont les moins confortables. Associez-le a une matinee lente, une pause appartement et une base climatisee le soir plutot que de remplir chaque heure dehors.", "Nei giorni molto caldi, il cinema funziona meglio dopo pranzo, quando camminare e stare in spiaggia pesa di piu. Abbinalo a una mattina lenta, pausa in appartamento e base climatizzata la sera, invece di riempire ogni ora fuori.", "У дуже спекотні дні кіно найкраще працює після обіду, коли прогулянки й пляж найменш комфортні. Поєднуйте його з повільним ранком, відпочинком в апартаментах і кондиціонованою вечірньою базою, а не спробою весь день бути надворі."),
          t("For Monaco or Nice, check the last train or backup taxi before buying late tickets. A relaxed film plan becomes less relaxing if the return to Menton is an afterthought.", "Pour Monaco ou Nice, verifiez le dernier train ou un taxi de secours avant d'acheter des billets tardifs. Une sortie cinema detendue l'est moins si le retour a Menton est improvise.", "Per Monaco o Nizza controlla ultimo treno o taxi di backup prima di comprare biglietti tardi. Un cinema rilassato lo e meno se il ritorno a Mentone e improvvisato.", "Для Монако або Ніцци перевірте останній потяг або запасне таксі до купівлі пізніх квитків. Спокійний похід у кіно стає менш спокійним, якщо повернення до Ментона не продумане."),
        ],
        relatedApartmentKeys: allApartments,
      },
    ],
    practicalTips: [
      t("Check VF, VO, VOST or VOSTFR before booking.", "Verifiez VF, VO, VOST ou VOSTFR avant de reserver.", "Controlla VF, VO, VOST o VOSTFR prima di prenotare.", "Перед бронюванням перевіряйте VF, VO, VOST або VOSTFR."),
      t("Book online for popular films, weekend evenings and open-air summer screenings.", "Reservez en ligne pour films populaires, week-ends soir et seances plein air d'ete.", "Prenota online per film popolari, weekend sera e proiezioni estive all'aperto.", "Бронюйте онлайн для популярних фільмів, вечорів вихідного дня та літніх показів просто неба."),
      t("For Nice or Monaco, check return trains before choosing a late screening.", "Pour Nice ou Monaco, verifiez les trains retour avant une seance tardive.", "Per Nizza o Monaco controlla i treni di ritorno prima di scegliere uno spettacolo tardi.", "Для Ніцци або Монако перевіряйте потяги назад перед вибором пізнього сеансу."),
      t("For families, check age guidance and language before promising a film to children.", "En famille, verifiez age conseille et langue avant de promettre un film aux enfants.", "Con bambini controlla eta consigliata e lingua prima di promettere un film.", "Для сімей перевіряйте вікові рекомендації та мову, перш ніж обіцяти дітям фільм."),
    ],
  }),
  shortArticle({
    id: "theatre-opera-performing-arts-near-menton",
    slug: "theatre-opera-performing-arts-near-menton",
    title: t("Theatre, opera and performing arts near Menton: the complete guide", "Theatre, opera et spectacle vivant pres de Menton: le guide complet", "Teatro, opera e spettacoli vicino a Mentone: guida completa", "Театр, опера та сценічне мистецтво біля Ментона: повний гід"),
    seoTitle: t("Theatre, Opera and Performing Arts Near Menton", "Theatre, opera et spectacle vivant pres de Menton", "Teatro, opera e spettacoli vicino a Mentone", "Театр, опера та сценічне мистецтво біля Ментона"),
    seoDescription: t("A practical guide to opera, theatre, ballet, musicals and open-air performances near Menton, including Monaco, Nice and Sanremo venues with programme links.", "Guide pratique opera, theatre, ballet, comedies musicales et plein air pres de Menton: Monaco, Nice et Sanremo avec liens vers les programmes.", "Guida pratica a opera, teatro, balletto, musical e spettacoli all'aperto vicino a Mentone: Monaco, Nizza e Sanremo con link ai programmi.", "Практичний гід по опері, театру, балету, мюзиклах і виставах просто неба біля Ментона: Монако, Ніцца та Санремо з посиланнями на програми."),
    excerpt: t("Stay in Menton and you can reach opera in Nice, elegant Monaco theatres, summer open-air stages and Sanremo's Teatro Ariston by train.", "Depuis Menton, rejoignez l'opera a Nice, les theatres elegants de Monaco, les scenes d'ete en plein air et le Teatro Ariston de Sanremo en train.", "Da Mentone puoi raggiungere l'opera a Nizza, i teatri eleganti di Monaco, i palchi estivi all'aperto e il Teatro Ariston di Sanremo in treno.", "З Ментона легко дістатися опери в Ніцці, елегантних театрів Монако, літніх сцен просто неба та Teatro Ariston у Санремо потягом."),
    category: "events",
    coverImage: "/images/guide/theatre-opera-performing-arts-near-menton.jpg",
    coverImageAlt: t("Illustration of theatre, opera and performing arts near Menton", "Illustration du theatre, de l'opera et du spectacle vivant pres de Menton", "Illustrazione di teatro, opera e spettacoli vicino a Mentone", "Ілюстрація театру, опери та сценічного мистецтва біля Ментона"),
    visualTheme: "event",
    visualStatus: "project_illustration",
    tags: [
      t("theatre", "theatre", "teatro", "театр"),
      t("opera", "opera", "opera", "опера"),
      t("ballet", "ballet", "balletto", "балет"),
      t("Monaco", "Monaco", "Monaco", "Монако"),
      t("Nice", "Nice", "Nizza", "Ніцца"),
      t("Sanremo", "Sanremo", "Sanremo", "Санремо"),
    ],
    bestFor: [guideBestForOptions[0].label, guideBestForOptions[2].label, guideBestForOptions[3].label, guideBestForOptions[5].label, guideBestForOptions[8].label],
    duration: "reference",
    locationTags: ["menton-centre", "monaco", "nice", "italian-riviera"],
    sourceStatus: "needs_verification",
    relatedPlaces: [
      "le-lavoir-theatre-menton",
      "palais-de-leurope-menton",
      "opera-de-monte-carlo",
      "theatre-princesse-grace-monaco",
      "theatre-du-fort-antoine-monaco",
      "grimaldi-forum-monaco",
      "ballets-de-monte-carlo",
      "opera-de-nice",
      "theatre-national-de-nice",
      "theatre-francis-gag-nice",
      "theatre-lino-ventura-nice",
      "theatre-de-verdure-nice",
      "theatre-de-la-cite-nice",
      "teatro-ariston-sanremo",
      "teatro-comunale-luigi-maccario-ventimiglia",
    ],
    relatedArticles: ["jazz-live-music-near-menton", "latin-dancing-salsa-bachata-menton", "cinemas-in-menton-nice-monaco", "museums-in-menton-nice-monaco", "monaco-events-from-menton", "italian-riviera-day-trip-from-menton", "day-trips-from-menton", "nightlife-in-menton", "menton-with-kids-family-guide", "public-transport-in-menton", "where-to-stay-in-menton"],
    relatedEvents: ["menton-music-festival", "sanremo-music-festival", "monaco-red-cross-gala", "monte-carlo-circus-festival"],
    relatedApartments: seaViewApartments,
    sections: [
      {
        heading: t("Why Menton works for performing arts", "Pourquoi Menton fonctionne pour le spectacle vivant", "Perche Mentone funziona per gli spettacoli", "Чому Ментон зручний для сценічного мистецтва"),
        body: [
          t("Many visitors come to the Riviera for beaches and sunshine. Others come for something the Cote d'Azur quietly does exceptionally well: opera, ballet, theatre, musicals and live performance.", "Beaucoup de voyageurs viennent sur la Riviera pour plages et soleil. D'autres viennent pour ce que la Cote d'Azur reussit tres bien, plus discretement: opera, ballet, theatre, comedies musicales et spectacle vivant.", "Molti visitatori vengono in Riviera per spiagge e sole. Altri arrivano per qualcosa che la Costa Azzurra fa molto bene, con discrezione: opera, balletto, teatro, musical e spettacoli dal vivo.", "Багато гостей їдуть на Рив'єру за пляжами й сонцем. Інші - за тим, що Лазурний берег робить тихо, але дуже добре: опера, балет, театр, мюзикли та живі виступи."),
          t("The advantage of staying in Menton is that Monaco, Nice and Sanremo are close enough for a planned evening, while Menton stays quieter when you return after the performance.", "L'avantage de loger a Menton est que Monaco, Nice et Sanremo restent assez proches pour une soiree planifiee, tandis que Menton redevient plus calme au retour.", "Il vantaggio di soggiornare a Mentone e che Monaco, Nizza e Sanremo sono abbastanza vicine per una serata programmata, mentre Mentone resta piu tranquilla al ritorno.", "Перевага Ментона в тому, що Монако, Ніцца й Санремо достатньо близько для запланованого вечора, а після вистави ви повертаєтесь у спокійніше місто."),
        ],
        relatedApartmentKeys: seaViewApartments,
      },
      {
        heading: t("Menton: small theatre and touring performances", "Menton: petit theatre et spectacles en tournee", "Mentone: piccolo teatro e spettacoli in tournee", "Ментон: малий театр і гастрольні вистави"),
        body: [
          t("Menton's scene is compact. Le Lavoir Théâtre is the local address for intimate French-language theatre, comedy and independent productions. Palais de l'Europe is not a theatre in the strict sense, but it hosts concerts, touring shows, children's performances, festival events and exhibitions.", "La scene mentonnaise est compacte. Le Lavoir Theatre est l'adresse locale pour theatre intime en francais, comedie et creations independantes. Le Palais de l'Europe n'est pas un theatre au sens strict, mais accueille concerts, spectacles en tournee, jeune public, festivals et expositions.", "La scena di Mentone e compatta. Le Lavoir Théâtre e l'indirizzo locale per teatro intimo in francese, commedia e produzioni indipendenti. Palais de l'Europe non e un teatro in senso stretto, ma ospita concerti, spettacoli in tournee, eventi per bambini, festival e mostre.", "Сцена Ментона компактна. Le Lavoir Théâtre - локальна адреса для камерного театру французькою, комедії та незалежних постановок. Palais de l'Europe не є театром у вузькому сенсі, але приймає концерти, гастролі, дитячі вистави, фестивалі й виставки."),
          t("For classical music, Festival de Musique de Menton is better treated as a separate event plan because many concerts use the basilica and outdoor heritage settings.", "Pour la musique classique, le Festival de Musique de Menton se planifie plutot comme un evenement a part, avec concerts a la basilique et dans des lieux patrimoniaux.", "Per la musica classica, il Festival de Musique de Menton va pianificato come evento separato, con concerti in basilica e luoghi storici.", "Для класичної музики Festival de Musique de Menton краще планувати як окрему подію: багато концертів проходять у базиліці та історичних локаціях."),
        ],
        relatedPlaceIds: ["le-lavoir-theatre-menton", "palais-de-leurope-menton"],
        relatedEventIds: ["menton-music-festival"],
      },
      {
        heading: t("Monaco: opera, drama, musicals and ballet", "Monaco: opera, theatre, comedies musicales et ballet", "Monaco: opera, teatro, musical e balletto", "Монако: опера, театр, мюзикли та балет"),
        body: [
          t("Monaco is the strongest performing-arts option from Menton. Opéra de Monte-Carlo is the must-check address for opera and recitals. Théâtre Princesse Grace is better for contemporary drama and polished French-language theatre.", "Monaco est l'option la plus forte depuis Menton. L'Opera de Monte-Carlo est l'adresse indispensable pour opera et recitals. Le Theatre Princesse Grace convient mieux au theatre contemporain et aux soirees francophones soignees.", "Monaco e l'opzione piu forte da Mentone. L'Opéra de Monte-Carlo e l'indirizzo da controllare per opera e recital. Théâtre Princesse Grace e piu adatto a teatro contemporaneo e serate in francese curate.", "Монако - найсильніший напрям для сценічного мистецтва з Ментона. Opéra de Monte-Carlo обов'язково варто перевіряти для опери й концертів. Théâtre Princesse Grace краще підходить для сучасної драми й вишуканого театру французькою."),
          t("Grimaldi Forum is a category of its own: it regularly hosts international musicals, concerts, ballet and large touring productions. Les Ballets de Monte-Carlo should be checked separately because performances may appear across different Monaco venues.", "Le Grimaldi Forum forme une categorie a part: comedies musicales internationales, concerts, ballet et grandes productions en tournee. Les Ballets de Monte-Carlo se verifient separement car les spectacles peuvent changer de salle.", "Il Grimaldi Forum e una categoria a parte: musical internazionali, concerti, balletto e grandi produzioni in tournee. Les Ballets de Monte-Carlo vanno controllati separatamente perche le sedi possono variare.", "Grimaldi Forum - окрема категорія: міжнародні мюзикли, концерти, балет і великі гастрольні постановки. Les Ballets de Monte-Carlo варто перевіряти окремо, бо виступи можуть проходити на різних майданчиках."),
        ],
        relatedPlaceIds: ["opera-de-monte-carlo", "theatre-princesse-grace-monaco", "theatre-du-fort-antoine-monaco", "grimaldi-forum-monaco", "ballets-de-monte-carlo"],
      },
      {
        heading: t("Nice: the widest cultural choice", "Nice: le plus grand choix culturel", "Nizza: la scelta culturale piu ampia", "Ніцца: найширший культурний вибір"),
        body: [
          t("Nice has the broadest year-round mix. Opéra Nice Côte d'Azur is the major regional opera house, with opera, ballet and symphonic concerts. Théâtre National de Nice is the key address for contemporary theatre, dance, circus and puppetry.", "Nice offre le choix le plus large toute l'annee. L'Opera Nice Cote d'Azur est le grand opera regional, avec opera, ballet et concerts symphoniques. Le Theatre National de Nice est l'adresse majeure pour theatre contemporain, danse, cirque et marionnettes.", "Nizza offre la scelta piu ampia tutto l'anno. Opéra Nice Côte d'Azur e il grande teatro d'opera regionale, con opera, balletto e concerti sinfonici. Théâtre National de Nice e l'indirizzo chiave per teatro contemporaneo, danza, circo e marionette.", "Ніцца має найширший вибір протягом року. Opéra Nice Côte d'Azur - головна опера регіону з оперою, балетом і симфонічними концертами. Théâtre National de Nice - ключова адреса для сучасного театру, танцю, цирку й ляльок."),
          t("For a more local city evening, check Théâtre Francis-Gag in Old Nice. Théâtre Lino Ventura and Théâtre de Verdure are more variable: they can be excellent for concerts, comedy, dance-style shows and summer open-air events when the programme fits.", "Pour une soiree plus locale, regardez le Theatre Francis-Gag dans le Vieux Nice. Le Theatre Lino Ventura et le Theatre de Verdure sont plus variables: concerts, humour, danse et evenements d'ete en plein air selon la programmation.", "Per una serata piu locale controlla Théâtre Francis-Gag nel Vieux Nice. Théâtre Lino Ventura e Théâtre de Verdure sono piu variabili: concerti, comicita, danza ed eventi estivi all'aperto secondo programma.", "Для більш локального вечора дивіться Théâtre Francis-Gag у старій Ніцці. Théâtre Lino Ventura і Théâtre de Verdure більш різнопланові: концерти, комедія, танцювальні шоу та літні події просто неба залежно від афіші."),
        ],
        relatedPlaceIds: ["opera-de-nice", "theatre-national-de-nice", "theatre-francis-gag-nice", "theatre-lino-ventura-nice", "theatre-de-verdure-nice"],
      },
      {
        heading: t("Italy: Teatro Ariston and Ventimiglia", "Italie: Teatro Ariston et Vintimille", "Italia: Teatro Ariston e Ventimiglia", "Італія: Teatro Ariston і Вентімілья"),
        body: [
          t("Teatro Ariston in Sanremo deserves more than a Sanremo Festival footnote. It is a year-round theatre and cinema with concerts, stage shows, events and Italian cultural programming.", "Le Teatro Ariston de Sanremo merite mieux qu'une simple mention du Festival. C'est un theatre-cinema actif toute l'annee avec concerts, spectacles, evenements et programmation italienne.", "Il Teatro Ariston di Sanremo merita piu di una nota sul Festival. E un teatro-cinema attivo tutto l'anno con concerti, spettacoli, eventi e programmazione italiana.", "Teatro Ariston у Санремо - це не лише фестиваль. Це цілорічний театр-кінотеатр із концертами, виставами, подіями та італійською культурною програмою."),
          t("Ventimiglia's Teatro Comunale Luigi Maccario is smaller and closer. It is useful when you want an Italian-language theatre evening without travelling as far as Sanremo.", "Le Teatro Comunale Luigi Maccario de Vintimille est plus petit et plus proche. Il est utile pour une soiree theatre en italien sans aller jusqu'a Sanremo.", "Il Teatro Comunale Luigi Maccario di Ventimiglia e piu piccolo e vicino. E utile per una serata teatrale in italiano senza arrivare fino a Sanremo.", "Teatro Comunale Luigi Maccario у Вентімільї менший і ближчий. Він корисний для вечора італійською без поїздки аж до Санремо."),
        ],
        relatedPlaceIds: ["teatro-ariston-sanremo", "teatro-comunale-luigi-maccario-ventimiglia"],
      },
      {
        heading: t("Family performances and children", "Spectacles en famille et enfants", "Spettacoli per famiglie e bambini", "Сімейні вистави та діти"),
        body: [
          t("For children, start with local listings rather than assuming every venue is suitable. Palais de l'Europe sometimes has family-friendly touring shows. In Nice, Théâtre National de Nice and Théâtre de la Cité are useful to check for puppetry, early-childhood theatre and family performances.", "Pour les enfants, commencez par les programmes actuels plutot que de supposer que chaque salle convient. Le Palais de l'Europe accueille parfois des spectacles familiaux. A Nice, Theatre National de Nice et Theatre de la Cite sont utiles pour marionnettes, petite enfance et jeune public.", "Per bambini, parti dai programmi attuali invece di presumere che ogni sede sia adatta. Palais de l'Europe ospita a volte spettacoli per famiglie. A Nizza, Théâtre National de Nice e Théâtre de la Cité sono utili per marionette, prima infanzia e famiglie.", "Для дітей починайте з актуальних афіш, а не припускайте, що кожен майданчик підходить. Palais de l'Europe інколи має сімейні гастролі. У Ніцці корисно перевіряти Théâtre National de Nice і Théâtre de la Cité для ляльок, раннього віку й сімейних вистав."),
        ],
        relatedPlaceIds: ["palais-de-leurope-menton", "theatre-national-de-nice", "theatre-de-la-cite-nice"],
        relatedApartmentKeys: ["beachside-family-apartment"],
      },
      {
        heading: t("Musicals, ballet and open-air evenings", "Comedies musicales, ballet et soirees plein air", "Musical, balletto e serate all'aperto", "Мюзикли, балет і вечори просто неба"),
        body: [
          t("For musicals, Monaco is usually the first place to check because Grimaldi Forum has a history of bringing major international productions and West End-style shows. For ballet, compare Les Ballets de Monte-Carlo with Opéra de Nice's ballet and opera-house season.", "Pour les comedies musicales, Monaco est souvent le premier reflexe car le Grimaldi Forum accueille de grandes productions internationales et des spectacles de type West End. Pour le ballet, comparez Les Ballets de Monte-Carlo et la saison de l'Opera de Nice.", "Per i musical, Monaco e spesso il primo controllo perche il Grimaldi Forum ospita grandi produzioni internazionali e spettacoli stile West End. Per il balletto confronta Les Ballets de Monte-Carlo con la stagione dell'Opera di Nizza.", "Для мюзиклів спершу перевіряйте Монако: Grimaldi Forum регулярно приймає великі міжнародні постановки й шоу в стилі West End. Для балету порівнюйте Les Ballets de Monte-Carlo із сезоном Opéra de Nice."),
          t("For open-air performance, Théâtre du Fort Antoine in Monaco and Théâtre de Verdure in Nice are the two useful names. Both are seasonal, so check dates before building a trip around them.", "Pour le plein air, le Theatre du Fort Antoine a Monaco et le Theatre de Verdure a Nice sont les deux noms utiles. Les deux sont saisonniers: verifiez les dates avant d'organiser le sejour autour d'eux.", "Per spettacoli all'aperto, Théâtre du Fort Antoine a Monaco e Théâtre de Verdure a Nizza sono i due nomi utili. Entrambi sono stagionali: controlla le date prima di organizzare il viaggio.", "Для вистав просто неба корисні дві назви: Théâtre du Fort Antoine у Монако та Théâtre de Verdure у Ніцці. Обидва сезонні, тому перевіряйте дати перед плануванням поїздки."),
        ],
        relatedPlaceIds: ["grimaldi-forum-monaco", "ballets-de-monte-carlo", "opera-de-nice", "theatre-du-fort-antoine-monaco", "theatre-de-verdure-nice"],
      },
      {
        heading: t("Dress code and booking rhythm", "Tenue et rythme de reservation", "Dress code e prenotazione", "Дрес-код і бронювання"),
        body: [
          t("Opera does not usually require black tie. Smart casual is normally enough, while Monaco gala evenings may feel better with a jacket or more polished outfit. Summer open-air theatre is more relaxed; bring a light layer for the return.", "L'opera n'exige generalement pas de smoking. Une tenue smart casual suffit souvent, tandis que les soirees de gala a Monaco appellent une veste ou une tenue plus soignee. Le plein air d'ete est plus detendu; prenez une couche legere pour le retour.", "L'opera di solito non richiede smoking. Smart casual basta spesso, mentre le serate gala a Monaco funzionano meglio con giacca o look piu curato. Il teatro estivo all'aperto e piu informale; porta uno strato leggero.", "Опера зазвичай не вимагає смокінга. Smart casual часто достатньо, а для гала-вечорів у Монако краще підходить піджак або вишуканіший одяг. Літній театр просто неба більш невимушений; візьміть легкий шар на повернення."),
          t("Book Opéra de Monte-Carlo, Les Ballets de Monte-Carlo and Grimaldi Forum musicals several weeks ahead during spring, holidays and event weekends. Le Lavoir Théâtre and municipal theatres often have better last-minute availability, but small rooms can still sell out.", "Reservez l'Opera de Monte-Carlo, Les Ballets de Monte-Carlo et les comedies musicales du Grimaldi Forum plusieurs semaines en avance au printemps, pendant les vacances et week-ends d'evenements. Le Lavoir et les theatres municipaux gardent souvent plus de derniere minute, mais les petites salles peuvent etre completes.", "Prenota Opéra de Monte-Carlo, Les Ballets de Monte-Carlo e musical del Grimaldi Forum varie settimane prima in primavera, vacanze e weekend di eventi. Le Lavoir e i teatri municipali spesso hanno piu disponibilita last minute, ma le sale piccole possono esaurirsi.", "Opéra de Monte-Carlo, Les Ballets de Monte-Carlo і мюзикли Grimaldi Forum бронюйте за кілька тижнів навесні, у канікули та event-вікенди. Le Lavoir і муніципальні театри часто доступніші в останній момент, але малі зали теж розкуповуються."),
        ],
      },
      {
        heading: t("Which theatre is right for you?", "Quel theatre choisir?", "Quale teatro scegliere?", "Який театр обрати?"),
        body: [
          t("Opera: Opéra de Nice for the broadest regional programme, or Opéra de Monte-Carlo for the most elegant evening. Luxury: Opéra de Monte-Carlo. Drama: Théâtre Princesse Grace or Théâtre National de Nice. Summer evenings: Fort Antoine or Théâtre de Verdure. Musicals: Grimaldi Forum. Family: Théâtre de la Cité, TNN or Palais de l'Europe listings. Italian culture: Teatro Ariston. Small authentic theatre: Le Lavoir Théâtre.", "Opera: Opera de Nice pour le programme regional le plus large, ou Opera de Monte-Carlo pour la soiree la plus elegante. Luxe: Opera de Monte-Carlo. Theatre: Theatre Princesse Grace ou Theatre National de Nice. Ete: Fort Antoine ou Theatre de Verdure. Comedies musicales: Grimaldi Forum. Famille: Theatre de la Cite, TNN ou Palais de l'Europe. Culture italienne: Teatro Ariston. Petit theatre: Le Lavoir.", "Opera: Opéra de Nice per il programma regionale piu ampio, o Opéra de Monte-Carlo per la serata piu elegante. Lusso: Opéra de Monte-Carlo. Teatro: Théâtre Princesse Grace o Théâtre National de Nice. Estate: Fort Antoine o Théâtre de Verdure. Musical: Grimaldi Forum. Famiglie: Théâtre de la Cité, TNN o Palais de l'Europe. Cultura italiana: Teatro Ariston. Piccolo teatro: Le Lavoir.", "Опера: Opéra de Nice для найширшої регіональної програми або Opéra de Monte-Carlo для найелегантнішого вечора. Люкс: Opéra de Monte-Carlo. Драма: Théâtre Princesse Grace або Théâtre National de Nice. Літо: Fort Antoine або Théâtre de Verdure. Мюзикли: Grimaldi Forum. Сім'ї: Théâtre de la Cité, TNN або Palais de l'Europe. Італійська культура: Teatro Ariston. Малий театр: Le Lavoir."),
        ],
      },
      {
        heading: t("Stay in Menton after the performance", "Rentrer dormir a Menton apres le spectacle", "Dormire a Mentone dopo lo spettacolo", "Зупинитися в Ментоні після вистави"),
        body: [
          t("One of the advantages of staying in Menton is that you can enjoy an evening performance in Monaco, Nice or Sanremo and return to a quieter seaside apartment the same night. Direct trains make Menton an excellent base for theatre lovers who prefer a relaxed atmosphere after the performance.", "L'un des avantages de Menton est de profiter d'un spectacle a Monaco, Nice ou Sanremo puis de rentrer le soir dans un appartement plus calme pres de la mer. Les trains directs font de Menton une bonne base pour les amateurs de theatre qui veulent une atmosphere detendue apres le spectacle.", "Uno dei vantaggi di Mentone e poter vedere uno spettacolo a Monaco, Nizza o Sanremo e tornare la stessa sera in un appartamento piu tranquillo sul mare. I treni diretti rendono Mentone una base ottima per chi ama il teatro ma preferisce calma dopo lo spettacolo.", "Одна з переваг Ментона: можна піти на вечірню виставу в Монако, Ніцці або Санремо й тієї ж ночі повернутися в тихіші апартаменти біля моря. Прямі потяги роблять Ментон доброю базою для любителів театру, які хочуть спокою після виступу."),
        ],
        relatedApartmentKeys: seaViewApartments,
      },
    ],
    practicalTips: [
      t("Check official programme links before buying tickets; seasons and venues change.", "Verifiez les liens de programme officiels avant achat; saisons et salles changent.", "Controlla i programmi ufficiali prima di comprare; stagioni e sedi cambiano.", "Перевіряйте офіційні програми перед купівлею; сезони й майданчики змінюються."),
      t("For Monaco or Nice, check the last train before booking a late performance.", "Pour Monaco ou Nice, verifiez le dernier train avant une representation tardive.", "Per Monaco o Nizza controlla l'ultimo treno prima di prenotare uno spettacolo tardi.", "Для Монако або Ніцци перевіряйте останній потяг перед пізньою виставою."),
      t("For Sanremo, plan the return carefully; some evenings may be easier with a car, taxi or overnight Italian plan.", "Pour Sanremo, prevoyez le retour avec soin; certaines soirees sont plus simples en voiture, taxi ou nuit italienne.", "Per Sanremo pianifica bene il ritorno; alcune serate sono piu semplici con auto, taxi o notte in Italia.", "Для Санремо ретельно плануйте повернення; деякі вечори простіші з авто, таксі або ночівлею в Італії."),
      t("For children, check language, age guidance and duration before booking.", "Avec enfants, verifiez langue, age conseille et duree avant de reserver.", "Con bambini controlla lingua, eta consigliata e durata prima di prenotare.", "Для дітей перевіряйте мову, вікові рекомендації й тривалість перед бронюванням."),
    ],
  }),
  shortArticle({
    id: "museums-in-menton-nice-monaco",
    slug: "museums-in-menton-nice-monaco",
    title: t("Museums in Menton, Nice and Monaco: a practical guide from Menton", "Musees a Menton, Nice et Monaco: guide pratique depuis Menton", "Musei a Mentone, Nizza e Monaco: guida pratica da Mentone", "Музеї в Ментоні, Ніцці та Монако: практичний гід з Ментона"),
    seoTitle: t("Museums in Menton, Nice and Monaco: A Practical Guide from Menton", "Musees a Menton, Nice et Monaco | Guide depuis Menton", "Musei a Mentone, Nizza e Monaco | Guida da Mentone", "Музеї в Ментоні, Ніцці та Монако | Гід з Ментона"),
    seoDescription: t("A practical guide to museums near Menton, including Jean Cocteau, prehistory, Matisse, Chagall, Masséna, Monaco's Oceanographic Museum and the Prince's Car Collection.", "Guide pratique des musees pres de Menton: Jean Cocteau, prehistoire, Matisse, Chagall, Massena, Musee oceanographique de Monaco et collection automobile princiere.", "Guida pratica ai musei vicino a Mentone: Jean Cocteau, preistoria, Matisse, Chagall, Masséna, Museo Oceanografico di Monaco e collezione auto del Principe.", "Практичний гід по музеях біля Ментона: Жан Кокто, праісторія, Матісс, Шагал, Masséna, Океанографічний музей Монако та автомобільна колекція князя."),
    excerpt: t("Use Menton as a calm base for museum days: stay local with Cocteau and prehistory, go to Monaco for ocean science and cars, or dedicate a full day to Nice.", "Utilisez Menton comme base calme pour les musees: Cocteau et prehistoire sur place, Monaco pour ocean et voitures, ou une journee complete a Nice.", "Usa Mentone come base tranquilla per i musei: Cocteau e preistoria in citta, Monaco per oceano e auto, oppure una giornata intera a Nizza.", "Використайте Ментон як спокійну базу для музеїв: Кокто й праісторія локально, Монако для океану та авто або повний день у Ніцці."),
    category: "practical",
    coverImage: "/images/guide/museums-in-menton-nice-monaco.jpg",
    coverImageAlt: t("Illustration of museums in Menton, Nice and Monaco", "Illustration des musees a Menton, Nice et Monaco", "Illustrazione dei musei a Mentone, Nizza e Monaco", "Ілюстрація музеїв у Ментоні, Ніцці та Монако"),
    visualTheme: "museum",
    visualStatus: "project_illustration",
    tags: [
      t("museums", "musees", "musei", "музеї"),
      t("art", "art", "arte", "мистецтво"),
      t("culture", "culture", "cultura", "культура"),
      t("rainy day", "jour de pluie", "giorno di pioggia", "дощовий день"),
      t("hot day", "jour de chaleur", "giorno caldo", "спекотний день"),
      t("Monaco", "Monaco", "Monaco", "Монако"),
      t("Nice", "Nice", "Nizza", "Ніцца"),
    ],
    bestFor: [guideBestForOptions[1].label, guideBestForOptions[5].label, guideBestForOptions[8].label, guideBestForOptions[3].label, guideBestForOptions[4].label],
    duration: "reference",
    locationTags: ["menton-centre", "old-town", "monaco", "nice"],
    sourceStatus: "needs_verification",
    relatedPlaces: [
      "musee-jean-cocteau-bastion",
      "musee-prehistoire-regionale-menton",
      "salle-des-mariages-jean-cocteau",
      "oceanographic-museum-monaco",
      "prince-monaco-car-collection",
      "museum-stamps-coins-monaco",
      "prehistoric-anthropology-museum-monaco",
      "musee-matisse-nice",
      "musee-chagall-nice",
      "musee-massena-nice",
      "palais-lascaris-nice",
      "musee-photographie-charles-negre-nice",
      "musee-beaux-arts-jules-cheret-nice",
      "musee-archeologie-cimiez-nice",
      "musee-art-naif-jakovsky-nice",
      "musee-arts-asiatiques-nice",
      "musee-national-du-sport-nice",
    ],
    relatedArticles: ["famous-paintings-of-menton", "theatre-opera-performing-arts-near-menton", "menton-with-kids-family-guide", "stay-cool-in-menton-summer", "public-transport-in-menton", "menton-without-a-car", "menton-old-town", "halles-du-marche-menton", "day-trips-from-menton", "cinemas-in-menton-nice-monaco", "where-to-stay-in-menton"],
    relatedApartments: allApartments,
    sections: [
      {
        heading: t("Why museums work from a Menton base", "Pourquoi les musees fonctionnent depuis Menton", "Perche i musei funzionano da Mentone", "Чому музеї добре працюють з базою в Ментоні"),
        body: [
          t("Menton is best known for beaches, old streets, gardens and the Italian border, but it is also a useful base for cultural days on the eastern Riviera. You can keep things local, take a short train to Monaco or spend a fuller day in Nice.", "Menton est surtout connue pour plages, vieille ville, jardins et frontiere italienne, mais c'est aussi une bonne base culturelle sur l'est de la Riviera. Vous pouvez rester local, prendre un court train vers Monaco ou passer une vraie journee a Nice.", "Mentone e nota per spiagge, centro storico, giardini e confine italiano, ma e anche una buona base culturale sulla Riviera orientale. Puoi restare in citta, prendere un breve treno per Monaco o dedicare una giornata a Nizza.", "Ментон відомий пляжами, старими вулицями, садами й італійським кордоном, але це також зручна база для культурних днів на східній Рив'єрі. Можна залишитися локально, швидко поїхати в Монако або присвятити день Ніцці."),
          t("Museums are especially useful on rainy days, very hot afternoons or slower family days when one calm indoor stop is better than another full beach or walking plan.", "Les musees sont tres utiles les jours de pluie, les apres-midi tres chauds ou les journees en famille plus lentes, quand une pause interieure calme vaut mieux qu'un programme plage ou marche complet.", "I musei sono utili nei giorni di pioggia, nei pomeriggi molto caldi o nelle giornate familiari piu lente, quando una pausa al chiuso vale piu di un'altra spiaggia o lunga camminata.", "Музеї особливо корисні в дощ, у дуже спекотні пообіддя або для повільніших сімейних днів, коли одна спокійна пауза в приміщенні краща за ще один пляж чи довгу прогулянку."),
        ],
        relatedApartmentKeys: allApartments,
      },
      {
        heading: t("Menton: Cocteau, prehistory and short cultural stops", "Menton: Cocteau, prehistoire et courtes haltes culturelles", "Mentone: Cocteau, preistoria e brevi soste culturali", "Ментон: Кокто, праісторія й короткі культурні зупинки"),
        body: [
          t("Menton's museum scene is compact but distinctive. Le Bastion is the most symbolic stop: a small fortress by the old port redesigned by Jean Cocteau to house his work. It combines easily with Sablettes, the old port, the market and the old town.", "Les musees de Menton sont compacts mais identitaires. Le Bastion est l'arret le plus symbolique: un petit fort pres du vieux port, repense par Jean Cocteau pour accueillir son oeuvre. Il se combine facilement avec Sablettes, le vieux port, le marche et la vieille ville.", "I musei di Mentone sono compatti ma riconoscibili. Le Bastion e la tappa piu simbolica: una piccola fortezza vicino al vecchio porto, ripensata da Jean Cocteau per la sua opera. Si combina facilmente con Sablettes, porto vecchio, mercato e centro storico.", "Музейна сцена Ментона компактна, але впізнавана. Le Bastion - найсимволічніша зупинка: невелика фортеця біля старого порту, переосмислена Жаном Кокто для його робіт. Її легко поєднати з Sablettes, старим портом, ринком і старим містом."),
          t("The Regional Prehistory Museum is useful for families and curious visitors. La Salle des Mariages is a short Cocteau-related interior inside the town hall, while Palais de Carnolès should be treated as a future stop until renovation status is clear.", "Le Musee de Prehistoire Regionale convient aux familles et curieux. La Salle des Mariages est une courte visite Cocteau dans la mairie, tandis que le Palais de Carnoles reste plutot une adresse future tant que la renovation n'est pas clarifiee.", "Il Museo di Preistoria Regionale e utile per famiglie e curiosi. La Salle des Mariages e una breve visita legata a Cocteau nel municipio, mentre Palais de Carnolès va considerato una tappa futura finche i lavori non sono chiariti.", "Музей регіональної праісторії корисний для сімей і допитливих гостей. La Salle des Mariages - короткий інтер'єр Кокто в мерії, а Palais de Carnolès краще вважати майбутньою зупинкою, доки статус ремонту не стане ясним."),
        ],
        relatedPlaceIds: ["musee-jean-cocteau-bastion", "musee-prehistoire-regionale-menton", "salle-des-mariages-jean-cocteau", "halles-du-marche", "plage-sablettes", "cimetiere-vieux-chateau"],
      },
      {
        heading: t("Monaco: families, ocean science and Fontvieille", "Monaco: familles, ocean et Fontvieille", "Monaco: famiglie, oceano e Fontvieille", "Монако: сім'ї, океан і Fontvieille"),
        body: [
          t("Monaco works well as a museum day from Menton because the train ride is short and several museums fit into a compact area. The Oceanographic Museum is the strongest family choice, with aquariums, marine science, historic collections and views from the Rock.", "Monaco fonctionne tres bien comme journee musee depuis Menton: le train est court et plusieurs musees se combinent dans un secteur compact. Le Musee oceanographique est le meilleur choix familial, avec aquariums, sciences marines, collections historiques et vues depuis le Rocher.", "Monaco funziona bene come giornata musei da Mentone: il treno e breve e vari musei stanno in un'area compatta. Il Museo Oceanografico e la scelta piu forte per famiglie, con acquari, scienza marina, collezioni storiche e viste dal Rocher.", "Монако добре працює як музейний день з Ментона: потяг їде недовго, а кілька музеїв зібрані компактно. Океанографічний музей - найсильніший сімейний вибір з акваріумами, морською наукою, історичними колекціями й видами з Rocher."),
          t("Fontvieille adds the Prince's Car Collection and the smaller Museum of Stamps and Coins. The Museum of Prehistoric Anthropology is more specialised, while the Nouveau Musée National de Monaco is best checked by current exhibition calendar before travelling.", "Fontvieille ajoute la Collection automobile princiere et le petit Musee des Timbres et des Monnaies. Le Musee d'Anthropologie prehistorique est plus specialise, tandis que le Nouveau Musee National de Monaco se verifie selon les expositions en cours.", "Fontvieille aggiunge la Collezione auto del Principe e il piccolo Museo dei Francobolli e delle Monete. Il Museo di Antropologia Preistorica e piu specialistico, mentre il Nouveau Musée National de Monaco va controllato secondo le mostre in corso.", "Fontvieille додає автомобільну колекцію князя та менший Музей марок і монет. Музей доісторичної антропології більш спеціалізований, а Nouveau Musée National de Monaco варто перевіряти за актуальним календарем виставок."),
        ],
        relatedPlaceIds: ["oceanographic-museum-monaco", "prince-monaco-car-collection", "museum-stamps-coins-monaco", "prehistoric-anthropology-museum-monaco", "monaco-monte-carlo"],
      },
      {
        heading: t("Nice: the strongest museum day near Menton", "Nice: la journee musees la plus riche pres de Menton", "Nizza: la giornata musei piu ricca vicino a Mentone", "Ніцца: найсильніший музейний день біля Ментона"),
        body: [
          t("Nice has the broadest museum offer near Menton. For a focused art day, combine Musée Matisse with Musée National Marc Chagall. For a central Old Nice afternoon, choose Palais Lascaris and the Charles Nègre Photography Museum, then add Cours Saleya or Castle Hill.", "Nice offre le choix museal le plus large pres de Menton. Pour une journee art ciblee, combinez le Musee Matisse et le Musee National Marc Chagall. Pour un apres-midi central au Vieux Nice, choisissez Palais Lascaris et le Musee de la Photographie Charles Negre, puis Cours Saleya ou la colline du Chateau.", "Nizza offre la scelta museale piu ampia vicino a Mentone. Per una giornata d'arte concentrata, combina Musée Matisse e Musée National Marc Chagall. Per un pomeriggio centrale nel Vieux Nice, scegli Palais Lascaris e il Museo della Fotografia Charles Nègre, poi Cours Saleya o Castle Hill.", "Ніцца має найширшу музейну пропозицію біля Ментона. Для сфокусованого дня мистецтва поєднайте Musée Matisse з Musée National Marc Chagall. Для центрального пообіддя в старій Ніцці оберіть Palais Lascaris і музей фотографії Charles Nègre, а потім Cours Saleya або Castle Hill."),
          t("Musée Masséna suits Riviera history and Promenade des Anglais. Cimiez also has archaeology beside Matisse, while Jules Chéret, the Naïve Art Museum, Asian Arts Museum and National Sports Museum work better for specific interests or extra time.", "Le Musee Massena convient a l'histoire Riviera et a la Promenade des Anglais. Cimiez ajoute l'archeologie pres de Matisse, tandis que Jules Cheret, l'Art Naif, les Arts Asiatiques et le Musee National du Sport conviennent mieux a des envies precises ou du temps en plus.", "Musée Masséna e ideale per storia della Riviera e Promenade des Anglais. Cimiez aggiunge archeologia vicino a Matisse, mentre Jules Chéret, Arte Naif, Arti Asiatiche e Museo Nazionale dello Sport funzionano meglio per interessi specifici o tempo extra.", "Musée Masséna підходить для історії Рив'єри та Promenade des Anglais. Cimiez додає археологію поруч із Матіссом, а Jules Chéret, музей наївного мистецтва, азійського мистецтва та спорту краще для окремих інтересів або додаткового часу."),
        ],
        relatedPlaceIds: ["musee-matisse-nice", "musee-chagall-nice", "musee-massena-nice", "palais-lascaris-nice", "musee-photographie-charles-negre-nice", "musee-beaux-arts-jules-cheret-nice", "musee-archeologie-cimiez-nice", "musee-art-naif-jakovsky-nice", "musee-arts-asiatiques-nice", "musee-national-du-sport-nice", "nice-old-town"],
      },
      {
        heading: t("Suggested museum itineraries", "Idees d'itineraires musees", "Idee di itinerari museali", "Ідеї музейних маршрутів"),
        body: [
          t("For an easy local morning, start at Halles du Marché, visit Le Bastion, walk the old port and finish near Les Sablettes. For a family Monaco day, take the train, visit the Oceanographic Museum, then add the Prince's Car Collection if energy allows.", "Pour une matinee locale facile, commencez aux Halles du Marche, visitez Le Bastion, marchez vers le vieux port et terminez pres des Sablettes. Pour Monaco en famille, prenez le train, visitez le Musee oceanographique, puis ajoutez la Collection automobile si l'energie suit.", "Per una mattina locale facile, inizia alle Halles du Marché, visita Le Bastion, passeggia al vecchio porto e finisci vicino a Les Sablettes. Per Monaco in famiglia, prendi il treno, visita il Museo Oceanografico e aggiungi la Collezione auto se resta energia.", "Для легкого локального ранку почніть з Halles du Marché, відвідайте Le Bastion, пройдіться старим портом і завершіть біля Sablettes. Для сімейного дня в Монако їдьте потягом, відвідайте Океанографічний музей, а потім додайте автомобільну колекцію, якщо лишилися сили."),
          t("For Nice, choose two museums rather than trying to collect everything. Matisse plus Chagall makes a strong art day; Palais Lascaris plus the Photography Museum makes an easier Old Nice afternoon; Masséna works well with a Promenade des Anglais walk.", "A Nice, choisissez deux musees plutot que de vouloir tout faire. Matisse plus Chagall donne une vraie journee art; Palais Lascaris plus Photographie rend le Vieux Nice plus simple; Massena va bien avec une marche sur la Promenade des Anglais.", "A Nizza scegli due musei invece di voler fare tutto. Matisse piu Chagall crea una forte giornata d'arte; Palais Lascaris piu Fotografia rende il Vieux Nice piu semplice; Masséna va bene con una passeggiata sulla Promenade des Anglais.", "У Ніцці обирайте два музеї замість спроби зібрати все. Матісс плюс Шагал дають сильний день мистецтва; Palais Lascaris плюс фотографія створюють легше пообіддя в старій Ніцці; Masséna добре поєднується з прогулянкою Promenade des Anglais."),
        ],
        relatedPlaceIds: ["halles-du-marche", "musee-jean-cocteau-bastion", "plage-sablettes", "oceanographic-museum-monaco", "prince-monaco-car-collection", "musee-matisse-nice", "musee-chagall-nice", "palais-lascaris-nice", "musee-photographie-charles-negre-nice", "musee-massena-nice"],
      },
      {
        heading: t("Closures and status changes", "Fermetures et changements de statut", "Chiusure e cambi di stato", "Закриття та зміни статусу"),
        body: [
          t("Do not rely only on map hours for museums. Exhibitions, weekly closures, renovations and ticket rules change often enough that official pages should be checked before travel, especially for Palais de Carnolès, MAMAC, Terra Amata, Natural History Museum and exhibition-led Monaco venues.", "Ne vous fiez pas seulement aux horaires des cartes. Expositions, jours de fermeture, travaux et billets changent assez souvent pour verifier les pages officielles avant le depart, surtout pour le Palais de Carnoles, MAMAC, Terra Amata, le Museum d'Histoire Naturelle et les lieux d'exposition a Monaco.", "Non basarti solo sugli orari delle mappe. Mostre, chiusure settimanali, lavori e biglietti cambiano spesso: controlla i siti ufficiali, soprattutto per Palais de Carnolès, MAMAC, Terra Amata, Museo di Storia Naturale e sedi espositive di Monaco.", "Не покладайтеся лише на години в картах. Виставки, вихідні дні, ремонти й квиткові правила часто змінюються, тому перевіряйте офіційні сторінки, особливо для Palais de Carnolès, MAMAC, Terra Amata, Natural History Museum і виставкових майданчиків Монако."),
        ],
      },
    ],
    practicalTips: [
      t("Check official opening days before travelling; many museums close one day per week.", "Verifiez les jours d'ouverture officiels avant de partir; beaucoup de musees ferment un jour par semaine.", "Controlla i giorni di apertura ufficiali prima di partire; molti musei chiudono un giorno a settimana.", "Перевіряйте офіційні дні роботи перед поїздкою; багато музеїв мають один вихідний на тиждень."),
      t("For Nice, consider the museum pass if you plan several municipal museums.", "A Nice, regardez le pass musees si vous prevoyez plusieurs musees municipaux.", "A Nizza valuta il pass musei se prevedi vari musei municipali.", "У Ніцці розгляньте музейний pass, якщо плануєте кілька муніципальних музеїв."),
      t("During summer heat, visit museums late morning or afternoon, then return to the seafront in the evening.", "Pendant les fortes chaleurs, visitez les musees en fin de matinee ou l'apres-midi, puis revenez au bord de mer le soir.", "Con caldo estivo, visita i musei in tarda mattina o pomeriggio, poi torna sul lungomare la sera.", "Під час літньої спеки відвідуйте музеї пізнім ранком або вдень, а ввечері повертайтеся до моря."),
      t("For families, one museum plus a walk usually works better than three museums in one day.", "En famille, un musee plus une balade fonctionne souvent mieux que trois musees dans la journee.", "Con famiglie, un museo piu una passeggiata funziona meglio di tre musei in un giorno.", "Для сімей один музей плюс прогулянка зазвичай працює краще, ніж три музеї за день."),
    ],
  }),
  shortArticle({
    id: "michelin-restaurants-menton-nice-monaco",
    slug: "michelin-restaurants-menton-nice-monaco",
    title: t("MICHELIN restaurants near Menton: Menton, Monaco and Nice", "Restaurants MICHELIN pres de Menton: Menton, Monaco et Nice", "Ristoranti MICHELIN vicino a Mentone: Mentone, Monaco e Nizza", "MICHELIN-ресторани біля Ментона: Ментон, Монако та Ніцца"),
    seoTitle: t("MICHELIN Restaurants Near Menton: Menton, Monaco and Nice", "Restaurants MICHELIN pres de Menton | Monaco et Nice", "Ristoranti MICHELIN vicino a Mentone | Monaco e Nizza", "MICHELIN-ресторани біля Ментона | Монако та Ніцца"),
    seoDescription: t("A practical guide to MICHELIN-starred, Bib Gourmand and MICHELIN-selected restaurants near Menton, including Mirazur, Monaco fine dining and Nice gastronomic addresses.", "Guide pratique des restaurants etoiles, Bib Gourmand et selectionnes MICHELIN pres de Menton: Mirazur, Monaco et Nice.", "Guida pratica ai ristoranti stellati, Bib Gourmand e selezionati MICHELIN vicino a Mentone: Mirazur, Monaco e Nizza.", "Практичний гід по MICHELIN-зіркових, Bib Gourmand і selected ресторанах біля Ментона: Mirazur, Монако та Ніцца."),
    excerpt: t("Menton is a quiet seaside base with serious gastronomy nearby: Mirazur and accessible local choices, grand Monaco dining and creative Nice restaurants by train.", "Menton est une base calme en bord de mer avec une vraie gastronomie proche: Mirazur, adresses locales accessibles, grandes tables de Monaco et restaurants creatifs a Nice.", "Mentone e una base tranquilla sul mare con grande gastronomia vicina: Mirazur, indirizzi locali accessibili, grandi tavole a Monaco e ristoranti creativi a Nizza.", "Ментон - спокійна морська база з серйозною гастрономією поруч: Mirazur, доступніші локальні адреси, великі ресторани Монако та креативна Ніцца потягом."),
    category: "food-markets",
    coverImage: "/images/guide/michelin-restaurants-menton-nice-monaco.jpg",
    coverImageAlt: t("Illustration of MICHELIN restaurants near Menton, Monaco and Nice", "Illustration des restaurants MICHELIN pres de Menton, Monaco et Nice", "Illustrazione dei ristoranti MICHELIN vicino a Mentone, Monaco e Nizza", "Ілюстрація MICHELIN-ресторанів біля Ментона, Монако та Ніцци"),
    visualTheme: "food",
    visualStatus: "project_illustration",
    tags: [
      t("MICHELIN", "MICHELIN", "MICHELIN", "MICHELIN"),
      t("restaurants", "restaurants", "ristoranti", "ресторани"),
      t("fine dining", "gastronomie", "fine dining", "fine dining"),
      t("Bib Gourmand", "Bib Gourmand", "Bib Gourmand", "Bib Gourmand"),
      t("Monaco", "Monaco", "Monaco", "Монако"),
      t("Nice", "Nice", "Nizza", "Ніцца"),
    ],
    bestFor: [guideBestForOptions[0].label, guideBestForOptions[2].label, guideBestForOptions[6].label, guideBestForOptions[8].label, guideBestForOptions[4].label, guideBestForOptions[3].label],
    duration: "reference",
    locationTags: ["menton-centre", "garavan", "monaco", "nice"],
    sourceStatus: "needs_verification",
    relatedPlaces: [
      "mirazur-menton",
      "orangerie-menton",
      "casa-fuego-menton",
      "le-louis-xv-monaco",
      "les-ambassadeurs-monaco",
      "blue-bay-marcel-ravin-monaco",
      "labysse-monte-carlo",
      "table-antonio-salvatore-rampoldi-monaco",
      "pavyllon-monte-carlo",
      "le-grill-monaco",
      "robuchon-monaco",
      "elsa-marcel-ravin-monaco",
      "flaveur-nice",
      "le-chantecler-nice",
      "epicentre-nice",
      "racines-bruno-cirino-nice",
      "les-agitateurs-nice",
      "laromate-nice",
      "jan-nice",
      "onice-nice",
      "chez-davia-nice",
      "cafe-des-musiciens-nice",
      "lalchimie-nice",
      "la-merenda-nice",
      "olive-artichaut-nice",
      "bistrot-antoine-nice",
    ],
    relatedArticles: ["wine-tasting-near-menton", "useful-apps-websites-menton-monaco-italian-riviera", "local-food-menton", "halles-du-marche-menton", "nightlife-in-menton", "public-transport-in-menton", "menton-without-a-car", "day-trips-from-menton", "stay-cool-in-menton-summer", "where-to-stay-in-menton"],
    relatedApartments: allApartments,
    sections: [
      {
        heading: t("How to use MICHELIN from a Menton base", "Comment utiliser MICHELIN depuis Menton", "Come usare MICHELIN da Mentone", "Як користуватися MICHELIN з базою в Ментоні"),
        body: [
          t("Menton is small, but it sits in one of the most exciting gastronomic corners of the Riviera. Within a short journey you can reach Mirazur in Menton, grand hotel dining in Monaco, creative restaurants in Nice and more relaxed Bib Gourmand or selected addresses.", "Menton est petite, mais elle se trouve dans l'un des coins gastronomiques les plus interessants de la Riviera. En peu de temps, vous pouvez rejoindre Mirazur, les grandes tables de Monaco, les restaurants creatifs de Nice et des adresses Bib Gourmand ou selectionnees plus detendues.", "Mentone e piccola, ma si trova in uno degli angoli gastronomici piu interessanti della Riviera. In poco tempo puoi raggiungere Mirazur, le grandi tavole di Monaco, i ristoranti creativi di Nizza e indirizzi Bib Gourmand o selezionati piu rilassati.", "Ментон невеликий, але лежить в одному з найцікавіших гастрономічних кутків Рив'єри. За коротку поїздку можна дістатися Mirazur, великих ресторанів Монако, креативної Ніцци й спокійніших Bib Gourmand або selected адрес."),
          t("MICHELIN recognition changes annually. Treat star, Bib Gourmand and selected labels as planning signals, then verify the current MICHELIN Guide and the restaurant's own website before booking.", "Les distinctions MICHELIN changent chaque annee. Utilisez etoiles, Bib Gourmand et selection comme reperes, puis verifiez le Guide MICHELIN actuel et le site du restaurant avant de reserver.", "I riconoscimenti MICHELIN cambiano ogni anno. Usa stelle, Bib Gourmand e selezione come orientamento, poi verifica la Guida MICHELIN attuale e il sito del ristorante prima di prenotare.", "MICHELIN-відзнаки змінюються щороку. Сприймайте зірки, Bib Gourmand і selected як орієнтири, а перед бронюванням перевіряйте актуальний Guide MICHELIN і сайт ресторану."),
        ],
      },
      {
        heading: t("Menton: Mirazur and useful local choices", "Menton: Mirazur et choix locaux utiles", "Mentone: Mirazur e scelte locali utili", "Ментон: Mirazur і корисні локальні варіанти"),
        body: [
          t("Mirazur is the landmark address: a three-star MICHELIN restaurant above Garavan with sea views, gardens and a once-in-a-trip feel. It should be planned as the main event of the day, not as a casual add-on.", "Mirazur est l'adresse emblematique: trois etoiles MICHELIN au-dessus de Garavan, avec vues mer, jardins et esprit grand moment du sejour. Il faut le traiter comme l'evenement principal de la journee.", "Mirazur e l'indirizzo simbolo: tre stelle MICHELIN sopra Garavan, con vista mare, giardini e atmosfera da grande momento del viaggio. Va programmato come evento principale della giornata.", "Mirazur - знакова адреса: три зірки MICHELIN над Garavan, види на море, сади й формат головної події подорожі. Плануйте його як центр дня, а не випадкове доповнення."),
          t("For a less formal Menton plan, L'Orangerie gives a Bib Gourmand-style route in the centre, while Casa Fuego brings a more relaxed Garavan option linked to fire cooking and a Colagreco-related universe.", "Pour un plan moins formel a Menton, L'Orangerie donne une piste Bib Gourmand au centre, tandis que Casa Fuego offre une option plus detendue a Garavan autour du feu et de l'univers Colagreco.", "Per un piano meno formale a Mentone, L'Orangerie offre una pista Bib Gourmand in centro, mentre Casa Fuego e un'opzione piu rilassata a Garavan tra fuoco e universo Colagreco.", "Для менш формального плану в Ментоні L'Orangerie дає Bib Gourmand-напрям у центрі, а Casa Fuego - розслабленіший варіант у Garavan з вогнем і світом Colagreco."),
        ],
        relatedPlaceIds: ["mirazur-menton", "orangerie-menton", "casa-fuego-menton", "port-de-garavan", "jardin-val-rahmeh"],
      },
      {
        heading: t("Monaco: special-occasion dining by train", "Monaco: grandes occasions en train", "Monaco: occasioni speciali in treno", "Монако: особливі вечори потягом"),
        body: [
          t("Monaco is the easiest luxury upgrade from Menton. Le Louis XV is the grand three-star reference, while Les Ambassadeurs, Blue Bay and L'Abysse give different two-star directions: polished hotel dining, creative Caribbean-Mediterranean cuisine and Japanese fine dining.", "Monaco est le passage luxe le plus simple depuis Menton. Le Louis XV est la grande reference trois etoiles; Les Ambassadeurs, Blue Bay et L'Abysse proposent trois directions deux etoiles: hotel elegant, cuisine creative caraibe-mediterranee et gastronomie japonaise.", "Monaco e l'upgrade di lusso piu semplice da Mentone. Le Louis XV e il grande riferimento tre stelle; Les Ambassadeurs, Blue Bay e L'Abysse offrono tre direzioni due stelle: hotel elegante, cucina caraibico-mediterranea e fine dining giapponese.", "Монако - найпростіший люксовий перехід з Ментона. Le Louis XV - головний тризірковий орієнтир, а Les Ambassadeurs, Blue Bay і L'Abysse дають різні двозіркові напрями: готельна елегантність, карибсько-середземноморська креативність і японський fine dining."),
          t("Other Monaco names such as La Table d'Antonio Salvatore, Pavyllon Monte-Carlo, Le Grill, Robuchon Monaco and Elsa are worth checking when you want a different room, budget or atmosphere.", "D'autres noms a Monaco comme La Table d'Antonio Salvatore, Pavyllon Monte-Carlo, Le Grill, Robuchon Monaco et Elsa meritent verification si vous cherchez une autre salle, un autre budget ou une autre ambiance.", "Altri nomi a Monaco come La Table d'Antonio Salvatore, Pavyllon Monte-Carlo, Le Grill, Robuchon Monaco ed Elsa meritano verifica se cerchi sala, budget o atmosfera diversi.", "Інші адреси Монако, як La Table d'Antonio Salvatore, Pavyllon Monte-Carlo, Le Grill, Robuchon Monaco та Elsa, варто перевірити, якщо потрібні інша зала, бюджет або атмосфера."),
          t("For dinner, check the last train before booking. If the return feels tight, plan a taxi, choose lunch or keep the evening in Menton.", "Pour le diner, verifiez le dernier train avant de reserver. Si le retour semble serre, prevoyez un taxi, choisissez le dejeuner ou restez a Menton le soir.", "Per cena controlla l'ultimo treno prima di prenotare. Se il ritorno sembra stretto, prevedi taxi, scegli pranzo o resta a Mentone la sera.", "Для вечері перевірте останній потяг до бронювання. Якщо повернення надто щільне, плануйте таксі, обирайте обід або залишайте вечір у Ментоні."),
        ],
        relatedPlaceIds: ["le-louis-xv-monaco", "les-ambassadeurs-monaco", "blue-bay-marcel-ravin-monaco", "labysse-monte-carlo", "table-antonio-salvatore-rampoldi-monaco", "pavyllon-monte-carlo", "le-grill-monaco", "robuchon-monaco", "elsa-marcel-ravin-monaco", "monaco-monte-carlo"],
      },
      {
        heading: t("Nice: variety, lunch and Bib Gourmand bistros", "Nice: variete, dejeuner et bistrots Bib Gourmand", "Nizza: varieta, pranzo e bistrot Bib Gourmand", "Ніцца: вибір, обід і Bib Gourmand-бістро"),
        body: [
          t("Nice is usually the best choice when you want variety. Flaveur is the highest-profile two-star option in the city, while Le Chantecler, Épicentre, Racines, Les Agitateurs, L'Aromate, JAN and ONICE show different one-star moods.", "Nice est souvent le meilleur choix pour la variete. Flaveur est l'option deux etoiles la plus evidente, tandis que Le Chantecler, Epicentre, Racines, Les Agitateurs, L'Aromate, JAN et ONICE donnent plusieurs ambiances une etoile.", "Nizza e spesso la scelta migliore per varieta. Flaveur e l'opzione due stelle piu evidente, mentre Le Chantecler, Épicentre, Racines, Les Agitateurs, L'Aromate, JAN e ONICE mostrano diverse atmosfere una stella.", "Ніцца зазвичай найкраща для вибору. Flaveur - найпомітніший двозірковий варіант, а Le Chantecler, Épicentre, Racines, Les Agitateurs, L'Aromate, JAN і ONICE дають різні однозіркові настрої."),
          t("For a lower-pressure food day, choose lunch and look at Bib Gourmand-style addresses such as Chez Davia, La Merenda, Bistrot d'Antoine, Café des Musiciens, L'Alchimie or Olive & Artichaut. This pairs naturally with a museum, shopping or a slow walk before the train back to Menton.", "Pour une journee gourmande moins formelle, choisissez le dejeuner et regardez des adresses type Bib Gourmand comme Chez Davia, La Merenda, Bistrot d'Antoine, Cafe des Musiciens, L'Alchimie ou Olive & Artichaut. Cela se combine bien avec musee, shopping ou marche lente avant le train retour.", "Per una giornata gastronomica meno formale, scegli il pranzo e guarda indirizzi tipo Bib Gourmand come Chez Davia, La Merenda, Bistrot d'Antoine, Café des Musiciens, L'Alchimie o Olive & Artichaut. Si abbina bene a museo, shopping o passeggiata prima del treno di ritorno.", "Для менш напруженого гастрономічного дня оберіть обід і дивіться Bib Gourmand-адреси на кшталт Chez Davia, La Merenda, Bistrot d'Antoine, Café des Musiciens, L'Alchimie або Olive & Artichaut. Це природно поєднується з музеєм, покупками або повільною прогулянкою перед потягом назад."),
        ],
        relatedPlaceIds: ["flaveur-nice", "le-chantecler-nice", "epicentre-nice", "racines-bruno-cirino-nice", "les-agitateurs-nice", "laromate-nice", "jan-nice", "onice-nice", "chez-davia-nice", "la-merenda-nice", "bistrot-antoine-nice", "cafe-des-musiciens-nice", "lalchimie-nice", "olive-artichaut-nice", "nice-old-town", "musee-massena-nice", "palais-lascaris-nice"],
      },
      {
        heading: t("How to plan the meal", "Comment planifier le repas", "Come pianificare il pasto", "Як планувати ресторан"),
        body: [
          t("For the easiest option, stay in Menton and book L'Orangerie or Casa Fuego. For the once-in-a-trip address, book Mirazur well ahead. For luxury, go to Monaco. For variety and lunch, go to Nice.", "Pour l'option la plus simple, restez a Menton et reservez L'Orangerie ou Casa Fuego. Pour le grand moment du sejour, reservez Mirazur tres en avance. Pour le luxe, allez a Monaco. Pour la variete et le dejeuner, allez a Nice.", "Per l'opzione piu semplice, resta a Mentone e prenota L'Orangerie o Casa Fuego. Per il grande momento del viaggio, prenota Mirazur con largo anticipo. Per il lusso vai a Monaco. Per varieta e pranzo vai a Nizza.", "Для найпростішого варіанту залишайтеся в Ментоні й бронюйте L'Orangerie або Casa Fuego. Для головної адреси подорожі бронюйте Mirazur завчасно. Для люксу їдьте в Монако. Для вибору й обіду - у Ніццу."),
          t("Summer dining needs the same rhythm as summer sightseeing: indoor air conditioning or shaded terraces at the hottest hours, lighter lunches when needed and a realistic return plan if you are travelling by train.", "La table d'ete suit le meme rythme que les visites: climatisation ou terrasses ombragees aux heures chaudes, dejeuners plus legers si besoin et retour realiste si vous voyagez en train.", "La ristorazione estiva segue lo stesso ritmo delle visite: aria condizionata o terrazze ombreggiate nelle ore calde, pranzi piu leggeri se serve e ritorno realistico se viaggi in treno.", "Літні ресторани мають той самий ритм, що й огляд міста: кондиціоновані зали або затінені тераси в найспекотніші години, легші обіди за потреби й реалістичний план повернення потягом."),
        ],
        relatedApartmentKeys: allApartments,
      },
    ],
    practicalTips: [
      t("Book starred restaurants well in advance, especially Mirazur and Monaco hotel restaurants.", "Reservez les restaurants etoiles tres en avance, surtout Mirazur et les grandes tables d'hotel a Monaco.", "Prenota i ristoranti stellati con largo anticipo, soprattutto Mirazur e gli hotel restaurant a Monaco.", "Бронюйте зіркові ресторани дуже завчасно, особливо Mirazur і готельні ресторани Монако."),
      t("Check dress codes and closing days before booking.", "Verifiez dress code et jours de fermeture avant de reserver.", "Controlla dress code e giorni di chiusura prima di prenotare.", "Перевіряйте dress code і вихідні дні перед бронюванням."),
      t("For Nice, lunch is often easier than a late dinner when you are staying in Menton.", "Pour Nice, le dejeuner est souvent plus simple qu'un diner tardif quand vous logez a Menton.", "Per Nizza, il pranzo e spesso piu semplice di una cena tardi se soggiorni a Mentone.", "Для Ніцци обід часто простіший, ніж пізня вечеря, якщо ви живете в Ментоні."),
      t("Always verify current MICHELIN status and restaurant websites before planning around a specific recognition.", "Verifiez toujours le statut MICHELIN actuel et le site du restaurant avant de planifier autour d'une distinction.", "Verifica sempre lo stato MICHELIN attuale e il sito del ristorante prima di pianificare intorno a un riconoscimento.", "Завжди перевіряйте актуальний MICHELIN-статус і сайт ресторану перед плануванням навколо конкретної відзнаки."),
    ],
  }),
  shortArticle({
    id: "wine-tasting-near-menton",
    slug: "wine-tasting-near-menton",
    title: t("Wine tasting near Menton: local wines, vineyards and easy day trips", "Degustation de vin pres de Menton: vins locaux, domaines et excursions faciles", "Degustazioni di vino vicino a Mentone: vini locali, cantine e gite facili", "Дегустація вина біля Ментона: локальні вина, виноробні та легкі поїздки"),
    seoTitle: t("Wine Tasting Near Menton: Local Wines, Bellet and Italian Riviera Trips", "Degustation de vin pres de Menton | Bellet, Monaco et Riviera italienne", "Degustazioni di vino vicino a Mentone | Bellet, Monaco e Riviera italiana", "Дегустація вина біля Ментона | Bellet, Монако та Італійська Рив'єра"),
    seoDescription: t("A practical guide to wine tasting near Menton, from central wine bars and cavistes to Bellet vineyards above Nice, Monaco cellars and Rossese di Dolceacqua in nearby Italy.", "Guide pratique de la degustation de vin pres de Menton: bars a vin, cavistes, domaines de Bellet, caves de Monaco et Rossese di Dolceacqua en Italie proche.", "Guida pratica alle degustazioni di vino vicino a Mentone: wine bar, enoteche, cantine Bellet, Monaco e Rossese di Dolceacqua nella vicina Italia.", "Практичний гід по дегустації вина біля Ментона: винні бари, крамниці, виноградники Bellet, Монако та Rossese di Dolceacqua в Італії поруч."),
    excerpt: t("Menton is not a vineyard town, but it is a calm base for Bellet wines above Nice, Monaco cellars, Ligurian Rossese and easy bottles for the apartment.", "Menton n'est pas une ville viticole, mais c'est une base calme pour les vins de Bellet, les caves de Monaco, le Rossese ligure et de bonnes bouteilles pour l'appartement.", "Mentone non e una citta di vigneti, ma e una base comoda per i vini Bellet, le cantine di Monaco, il Rossese ligure e bottiglie semplici per l'appartamento.", "Ментон не є виноградним містом, але це спокійна база для вин Bellet, льохів Монако, лігурійського Rossese і пляшок для апартаментів."),
    category: "food-markets",
    coverImage: "/images/guide/wine-tasting-near-menton.jpg",
    coverImageAlt: t("Illustration of wine tasting near Menton, Bellet and the Italian Riviera", "Illustration de degustation de vin pres de Menton, Bellet et la Riviera italienne", "Illustrazione di degustazioni di vino vicino a Mentone, Bellet e Riviera italiana", "Ілюстрація дегустації вина біля Ментона, Bellet та Італійської Рив'єри"),
    visualTheme: "food",
    visualStatus: "project_illustration",
    tags: [
      t("wine", "vin", "vino", "вино"),
      t("Bellet", "Bellet", "Bellet", "Bellet"),
      t("Dolceacqua", "Dolceacqua", "Dolceacqua", "Dolceacqua"),
      t("Monaco", "Monaco", "Monaco", "Монако"),
      t("day trips", "excursions", "gite", "поїздки"),
    ],
    bestFor: [guideBestForOptions[0].label, guideBestForOptions[2].label, guideBestForOptions[3].label, guideBestForOptions[8].label, guideBestForOptions[10].label],
    duration: "flexible",
    locationTags: ["menton-centre", "monaco", "nice", "italian-riviera"],
    sourceStatus: "needs_verification",
    relatedPlaces: [
      "nabucco-wine-bar-cellar",
      "o-divin-menton",
      "comptoir-des-vignes-menton",
      "nicolas-menton",
      "chateau-de-bellet",
      "domaine-de-toasc",
      "clos-saint-vincent-bellet",
      "domaine-fogolar-collet-de-bovis",
      "grands-chais-monegasques",
      "dolceacqua",
      "casa-del-grillo",
      "terre-bianche-dolceacqua",
      "altavia-winery",
    ],
    relatedArticles: ["local-food-menton", "michelin-restaurants-menton-nice-monaco", "italian-riviera-day-trip-from-menton", "golf-near-menton", "day-trips-from-menton", "monaco-events-from-menton", "public-transport-in-menton", "supermarkets-in-menton", "nightlife-in-menton", "where-to-stay-in-menton"],
    relatedApartments: allApartments,
    sections: [
      {
        heading: t("A wine plan from a Menton base", "Un plan vin depuis Menton", "Un piano vino da Mentone", "Винний план з базою в Ментоні"),
        body: [
          t("Menton itself is better for wine bars, cavistes and apartment bottles than for vineyard visits. The strength of staying here is access: Bellet above Nice, Monaco cellars and the Italian Riviera are all realistic day or evening plans.", "Menton est plus utile pour bars a vin, cavistes et bouteilles pour l'appartement que pour les domaines viticoles. Son avantage est l'acces: Bellet au-dessus de Nice, caves de Monaco et Riviera italienne restent des plans realistes.", "Mentone e piu utile per wine bar, enoteche e bottiglie per l'appartamento che per visite in vigna. Il suo punto forte e l'accesso: Bellet sopra Nizza, Monaco e Riviera italiana sono piani realistici.", "Сам Ментон краще підходить для винних барів, крамниць і пляшок для апартаментів, ніж для виноградників. Його сила - доступ: Bellet над Ніццею, льохи Монако та Італійська Рив'єра реальні для дня або вечора."),
          t("Treat opening hours, tasting formats and transport as items to verify before you go. Small estates often require booking, and some tasting rooms change seasonally.", "Verifiez toujours horaires, formats de degustation et transport avant de partir. Les petits domaines demandent souvent reservation et certains caveaux changent selon la saison.", "Verifica sempre orari, formule di degustazione e trasporti prima di partire. Le piccole cantine spesso richiedono prenotazione e alcune sale cambiano per stagione.", "Перед поїздкою перевіряйте години, формат дегустації й транспорт. Малі маєтки часто потребують бронювання, а деякі дегустаційні зали змінюються сезонно."),
        ],
        relatedPlaceIds: ["nabucco-wine-bar-cellar", "chateau-de-bellet", "grands-chais-monegasques", "dolceacqua"],
      },
      {
        heading: t("Start in Menton: wine bars and cavistes", "Commencer a Menton: bars a vin et cavistes", "Inizia a Mentone: wine bar ed enoteche", "Почати в Ментоні: винні бари та крамниці"),
        body: [
          t("For a low-effort evening, stay local. Nabucco works as a wine bar and cellar for tasting on site, while O Di'Vin, Comptoir des Vignes and Nicolas are practical stops for advice, gifts or bottles to drink on the balcony after the beach.", "Pour une soiree simple, restez local. Nabucco fonctionne comme bar a vin et cave, tandis qu'O Di'Vin, Comptoir des Vignes et Nicolas sont pratiques pour conseils, cadeaux ou bouteilles a boire au balcon apres la plage.", "Per una serata semplice resta locale. Nabucco funziona come wine bar e cantina, mentre O Di'Vin, Comptoir des Vignes e Nicolas sono pratici per consigli, regali o bottiglie da bere sul balcone dopo la spiaggia.", "Для легкого вечора залишайтеся локально. Nabucco працює як винний бар і крамниця, а O Di'Vin, Comptoir des Vignes і Nicolas зручні для порад, подарунків або пляшок на балкон після пляжу."),
          t("This is the best option when you arrive late, have fixed restaurant plans or want wine to match market food and simple apartment dinners.", "C'est la meilleure option si vous arrivez tard, avez deja un restaurant prevu ou voulez accompagner produits du marche et diners simples a l'appartement.", "E l'opzione migliore se arrivi tardi, hai gia ristoranti prenotati o vuoi abbinare vini a mercato e cene semplici in appartamento.", "Це найкращий варіант, якщо ви приїхали пізно, вже маєте ресторани або хочете вино до ринку й простих вечерь в апартаментах."),
        ],
        relatedPlaceIds: ["nabucco-wine-bar-cellar", "o-divin-menton", "comptoir-des-vignes-menton", "nicolas-menton"],
        relatedApartmentKeys: seaViewApartments,
      },
      {
        heading: t("Bellet vineyards above Nice", "Les domaines de Bellet au-dessus de Nice", "Le cantine Bellet sopra Nizza", "Виноградники Bellet над Ніццею"),
        body: [
          t("Bellet is the closest serious vineyard area to Menton. It is a small appellation in the hills above Nice, known for whites, roses and reds that feel very Riviera but are not always easy to find outside the region.", "Bellet est la zone viticole serieuse la plus proche de Menton. Cette petite appellation dans les collines de Nice produit blancs, roses et rouges tres Riviera, pas toujours faciles a trouver hors region.", "Bellet e la zona vinicola seria piu vicina a Mentone. Questa piccola denominazione sulle colline di Nizza produce bianchi, rose e rossi molto Riviera, non sempre facili da trovare altrove.", "Bellet - найближча серйозна винна зона до Ментона. Це мала апеляція на пагорбах Ніцци з білими, рожевими й червоними винами, дуже рив'єрними й не завжди доступними за межами регіону."),
          t("Chateau de Bellet is the easiest first name to research. Domaine de Toasc, Clos Saint-Vincent and Domaine du Fogolar / Collet de Bovis suit guests who want to compare estates, but visits should be arranged in advance.", "Chateau de Bellet est le premier nom le plus simple a rechercher. Domaine de Toasc, Clos Saint-Vincent et Domaine du Fogolar / Collet de Bovis conviennent si vous voulez comparer, mais les visites se preparent en avance.", "Chateau de Bellet e il primo nome piu semplice da cercare. Domaine de Toasc, Clos Saint-Vincent e Domaine du Fogolar / Collet de Bovis vanno bene per confrontare tenute, ma le visite vanno organizzate prima.", "Chateau de Bellet - найпростіша перша назва для пошуку. Domaine de Toasc, Clos Saint-Vincent і Domaine du Fogolar / Collet de Bovis підходять для порівняння маєтків, але візити варто домовляти наперед."),
        ],
        relatedPlaceIds: ["chateau-de-bellet", "domaine-de-toasc", "clos-saint-vincent-bellet", "domaine-fogolar-collet-de-bovis"],
      },
      {
        heading: t("Monaco: special bottles and a polished evening", "Monaco: belles bouteilles et soiree soignee", "Monaco: bottiglie speciali e serata elegante", "Монако: особливі пляшки й вишуканий вечір"),
        body: [
          t("Monaco is not a vineyard trip, but it can be a wine evening. Grands Chais Monegasques is the natural cellar reference for special bottles and private-style tastings, and Monaco restaurants are strong for serious wine lists.", "Monaco n'est pas une excursion vignoble, mais peut devenir une soiree vin. Grands Chais Monegasques est la reference cave pour belles bouteilles et degustations privees, avec de grandes cartes dans les restaurants.", "Monaco non e una gita in vigna, ma puo essere una serata vino. Grands Chais Monegasques e il riferimento per bottiglie speciali e degustazioni private, con grandi carte nei ristoranti.", "Монако - не поїздка до виноградників, але може бути винним вечором. Grands Chais Monegasques - природний орієнтир для особливих пляшок і приватних дегустацій, а ресторани Монако мають сильні винні карти."),
          t("For dinner, check the last train to Menton before committing to a late sitting. A taxi back is often simpler for a special-occasion evening.", "Pour diner, verifiez le dernier train vers Menton avant de choisir un service tardif. Un taxi retour est souvent plus simple pour une grande soiree.", "Per cena controlla l'ultimo treno per Mentone prima di scegliere un turno tardi. Un taxi al ritorno e spesso piu semplice per una serata speciale.", "Для вечері перевірте останній потяг до Ментона, перш ніж обирати пізню посадку. Таксі назад часто простіше для особливого вечора."),
        ],
        relatedPlaceIds: ["grands-chais-monegasques"],
      },
      {
        heading: t("Dolceacqua and Ligurian Rossese", "Dolceacqua et le Rossese ligure", "Dolceacqua e il Rossese ligure", "Dolceacqua та лігурійський Rossese"),
        body: [
          t("Across the Italian border, Dolceacqua gives the most natural wine day from Menton: a medieval village, local restaurants and Rossese di Dolceacqua, the red wine that belongs to this valley.", "De l'autre cote de la frontiere, Dolceacqua offre la journee vin la plus naturelle depuis Menton: village medieval, restaurants locaux et Rossese di Dolceacqua, le rouge de cette vallee.", "Oltre il confine italiano, Dolceacqua e la giornata vino piu naturale da Mentone: borgo medievale, ristoranti locali e Rossese di Dolceacqua, il rosso di questa valle.", "За італійським кордоном Dolceacqua дає найприродніший винний день з Ментона: середньовічне село, локальні ресторани та Rossese di Dolceacqua - червоне вино цієї долини."),
          t("Casa del Grillo, Terre Bianche and Altavia are useful names to research for tastings, depending on opening days and whether you have a car, driver or arranged transfer.", "Casa del Grillo, Terre Bianche et Altavia sont de bonnes pistes de degustation selon les jours d'ouverture et selon voiture, chauffeur ou transfert reserve.", "Casa del Grillo, Terre Bianche e Altavia sono nomi utili per degustazioni, secondo aperture e se hai auto, autista o transfer.", "Casa del Grillo, Terre Bianche і Altavia - корисні назви для дегустацій, залежно від днів роботи та того, чи є авто, водій або трансфер."),
        ],
        relatedPlaceIds: ["dolceacqua", "casa-del-grillo", "terre-bianche-dolceacqua", "altavia-winery"],
      },
      {
        heading: t("What to buy for the apartment", "Quoi acheter pour l'appartement", "Cosa comprare per l'appartamento", "Що купити для апартаментів"),
        body: [
          t("For easy apartment drinking, look for a chilled Provence rose, a Bellet white with seafood or vegetables, or a Rossese from Dolceacqua for charcuterie, cheese and a quieter evening in.", "Pour l'appartement, cherchez un rose de Provence frais, un blanc de Bellet avec poissons ou legumes, ou un Rossese de Dolceacqua pour charcuterie, fromage et soiree calme.", "Per l'appartamento cerca un rose di Provenza fresco, un bianco Bellet con pesce o verdure, o un Rossese di Dolceacqua per salumi, formaggi e una serata tranquilla.", "Для апартаментів шукайте охолоджене рожеве Provence, біле Bellet до риби чи овочів або Rossese з Dolceacqua до м'яса, сиру й тихого вечора."),
          t("Balcony and terrace meals are often the best use of local wine: simple food, sea air and no need to travel after tasting.", "Les repas au balcon ou en terrasse sont souvent le meilleur usage du vin local: cuisine simple, air marin et pas de trajet apres degustation.", "I pasti su balcone o terrazza sono spesso il modo migliore per usare il vino locale: cibo semplice, aria di mare e nessun viaggio dopo la degustazione.", "Їжа на балконі чи терасі часто найкраще розкриває локальне вино: проста їжа, морське повітря й без поїздок після дегустації."),
        ],
        relatedApartmentKeys: allApartments,
      },
    ],
    practicalTips: [
      t("Book vineyard tastings in advance; do not rely only on map opening hours.", "Reservez les degustations de domaine en avance; ne vous fiez pas seulement aux horaires des cartes.", "Prenota le degustazioni in cantina in anticipo; non basarti solo sugli orari delle mappe.", "Бронюйте дегустації на виноробнях наперед; не покладайтеся лише на години в картах."),
      t("Avoid driving after tastings. Use train plus taxi, a transfer or keep the tasting local in Menton.", "Evitez de conduire apres degustation. Utilisez train plus taxi, transfert ou restez local a Menton.", "Evita di guidare dopo le degustazioni. Usa treno piu taxi, transfer o resta locale a Mentone.", "Не сідайте за кермо після дегустацій. Використовуйте потяг плюс таксі, трансфер або залишайте дегустацію в Ментоні."),
      t("In summer, plan vineyard visits early or late and carry water.", "En ete, prevoyez les visites de domaine tot ou tard et prenez de l'eau.", "In estate programma le visite presto o tardi e porta acqua.", "Влітку плануйте виноробні рано або пізніше й беріть воду."),
      t("Check import limits if you plan to fly home with bottles.", "Verifiez les limites d'importation si vous rentrez en avion avec des bouteilles.", "Controlla i limiti doganali se voli a casa con bottiglie.", "Перевірте митні ліміти, якщо летите додому з пляшками."),
    ],
  }),
  shortArticle({
    id: "supermarkets-in-menton",
    slug: "supermarkets-in-menton",
    title: t("Supermarkets in Menton: where to shop, cool down and stock your apartment", "Supermarches a Menton: ou faire ses courses, se rafraichir et remplir l'appartement", "Supermercati a Mentone: dove fare la spesa, rinfrescarsi e riempire l'appartamento", "Супермаркети в Ментоні: де купувати продукти, охолонути й запасти апартаменти"),
    seoTitle: t("Supermarkets in Menton: Where to Shop, Cool Down and Stock Your Apartment", "Supermarches a Menton: ou faire ses courses et remplir l'appartement", "Supermercati a Mentone: dove fare la spesa e riempire l'appartamento", "Супермаркети в Ментоні: де купувати продукти для апартаментів"),
    seoDescription: t("A practical guide to supermarkets in Menton, Monaco, Nice and nearby Italy: where to buy groceries, picnic food, local products and take a cool break on hot summer days.", "Guide pratique des supermarches a Menton, Monaco, Nice et en Italie proche: courses, pique-nique, produits locaux et courte pause au frais en ete.", "Guida pratica ai supermercati a Mentone, Monaco, Nizza e nella vicina Italia: spesa, picnic, prodotti locali e pause al fresco in estate.", "Практичний гід по супермаркетах Ментона, Монако, Ніцци та поруч в Італії: продукти, пікнік, локальні товари й коротка прохолодна пауза влітку."),
    excerpt: t("Supermarkets are not sightseeing, but in summer they are useful for cold water, fruit, simple apartment meals and a short indoor pause between beach, market and evening walks.", "Les supermarches ne sont pas des visites touristiques, mais en ete ils aident pour l'eau fraiche, les fruits, les repas simples et une courte pause interieure.", "I supermercati non sono attrazioni, ma in estate sono utili per acqua fredda, frutta, pasti semplici in appartamento e una breve pausa al chiuso.", "Супермаркети не є пам'ятками, але влітку вони корисні для холодної води, фруктів, простих страв в апартаментах і короткої перерви в приміщенні."),
    category: "practical",
    coverImage: "/images/guide/supermarkets-in-menton.jpg",
    coverImageAlt: t("Illustration of supermarket shopping in Menton", "Illustration des courses au supermarche a Menton", "Illustrazione della spesa al supermercato a Mentone", "Ілюстрація покупок у супермаркеті в Ментоні"),
    visualTheme: "market",
    visualStatus: "project_illustration",
    tags: [
      t("supermarkets", "supermarches", "supermercati", "супермаркети"),
      t("groceries", "courses", "spesa", "продукти"),
      t("summer", "ete", "estate", "літо"),
      t("heatwave", "canicule", "ondata di caldo", "спека"),
      t("Italy", "Italie", "Italia", "Італія"),
    ],
    bestFor: [guideBestForOptions[1].label, guideBestForOptions[8].label, guideBestForOptions[3].label, guideBestForOptions[4].label, guideBestForOptions[10].label, guideBestForOptions[11].label],
    duration: "reference",
    locationTags: ["menton-centre", "seafront", "garavan", "monaco", "nice", "italian-riviera"],
    sourceStatus: "needs_verification",
    relatedPlaces: [
      "intermarche-hyper-menton",
      "intermarche-super-borrigo",
      "u-express-menton-centre",
      "u-express-menton-garavan",
      "carrefour-city-felix-faure",
      "carrefour-express-menton",
      "petit-casino-saint-michel",
      "carrefour-monaco-fontvieille",
      "carrefour-nice-tnl",
      "monoprix-nice-garibaldi",
      "nice-etoile",
      "conad-city-ventimiglia-carso",
      "conad-city-ventimiglia-corso-nizza",
      "conad-superstore-vallecrosia",
      "conad-city-bordighera",
      "conad-city-sanremo",
    ],
    relatedArticles: [
      "useful-apps-websites-menton-monaco-italian-riviera",
      "menton-with-kids-family-guide",
      "stay-cool-in-menton-summer",
      "useful-numbers-emergency-contacts-menton",
      "menton-without-a-car",
      "public-transport-in-menton",
      "halles-du-marche-menton",
      "best-beaches-in-menton",
      "italian-riviera-day-trip-from-menton",
      "morning-walk-france-to-italy",
      "day-trips-from-menton",
    ],
    relatedApartments: allApartments,
    sections: [
      {
        heading: t("Why supermarkets matter in summer", "Pourquoi les supermarches comptent en ete", "Perche i supermercati contano in estate", "Чому супермаркети важливі влітку"),
        body: [
          t("Supermarkets rarely appear in travel guides, but during a hot summer stay in Menton they can become surprisingly useful. They are not tourist attractions and should not be treated as public cooling shelters, but they are often the easiest place to buy chilled water, fruit, sunscreen and simple food for the apartment.", "Les supermarches apparaissent rarement dans les guides, mais pendant un sejour tres chaud a Menton ils deviennent utiles. Ce ne sont pas des attractions ni des refuges climatises publics, mais ils permettent d'acheter eau fraiche, fruits, creme solaire et produits simples pour l'appartement.", "I supermercati compaiono raramente nelle guide, ma durante un soggiorno caldo a Mentone diventano utili. Non sono attrazioni ne rifugi climatizzati pubblici, pero sono pratici per acqua fredda, frutta, crema solare e cibo semplice per l'appartamento.", "Супермаркети рідко потрапляють у гіди, але під час спекотного літа в Ментоні вони стають дуже корисними. Це не туристичні пам'ятки й не громадські охолоджувальні пункти, але там зручно купити холодну воду, фрукти, сонцезахисний крем і просту їжу для апартаментів."),
          t("For apartment guests, a small fridge with cold drinks, fruit, yogurt, cheese, salad and light dinner ingredients can make the whole stay feel easier, especially in July, August and early September.", "Pour les voyageurs en appartement, un petit frigo avec boissons fraiches, fruits, yaourt, fromage, salade et ingredients simples rend le sejour plus confortable, surtout en juillet, aout et debut septembre.", "Per chi soggiorna in appartamento, un piccolo frigo con bevande fredde, frutta, yogurt, formaggio, insalata e ingredienti semplici rende il soggiorno piu comodo, soprattutto a luglio, agosto e inizio settembre.", "Для гостей апартаментів невеликий холодильник із холодними напоями, фруктами, йогуртом, сиром, салатом і простими інгредієнтами сильно полегшує відпочинок, особливо в липні, серпні та на початку вересня."),
        ],
        bullets: [
          t("Useful basics: water, fruit, picnic food, sunscreen, toiletries, breakfast supplies and ready meals.", "Bases utiles: eau, fruits, pique-nique, creme solaire, produits d'hygiene, petit-dejeuner et plats prepares.", "Basi utili: acqua, frutta, picnic, crema solare, prodotti da bagno, colazione e piatti pronti.", "Корисна база: вода, фрукти, їжа для пікніка, сонцезахисний крем, гігієна, сніданки й готові страви."),
          t("In a heatwave, a light balcony meal can be better than a heavy restaurant lunch.", "Pendant une canicule, un repas leger au balcon peut etre preferable a un dejeuner lourd au restaurant.", "Durante un'ondata di caldo, un pasto leggero sul balcone puo essere meglio di un pranzo pesante al ristorante.", "Під час спеки легка їжа на балконі може бути кращою за важкий ресторанний обід."),
        ],
        relatedApartmentKeys: allApartments,
      },
      {
        heading: t("What to buy for a hot day", "Quoi acheter pour une journee chaude", "Cosa comprare per una giornata calda", "Що купити для спекотного дня"),
        body: [
          t("Think light, fresh and easy: still or sparkling water, peaches, apricots, melon, grapes, tomatoes, cucumbers, salad, yogurt, cold soups, mozzarella, goat cheese, olives, tapenade, bread, ice cream and after-sun lotion.", "Pensez leger, frais et simple: eau plate ou petillante, peches, abricots, melon, raisins, tomates, concombres, salade, yaourt, soupes froides, mozzarella, chevre, olives, tapenade, pain, glace et apres-soleil.", "Pensa leggero, fresco e semplice: acqua naturale o frizzante, pesche, albicocche, melone, uva, pomodori, cetrioli, insalata, yogurt, zuppe fredde, mozzarella, caprino, olive, tapenade, pane, gelato e doposole.", "Думайте про легке й свіже: вода, персики, абрикоси, диня, виноград, помідори, огірки, салат, йогурт, холодні супи, моцарела, козячий сир, оливки, тапенада, хліб, морозиво й засіб після сонця."),
          t("For a balcony breakfast, keep coffee, juice, fruit, yogurt, croissants or brioche, jam and honey. For an easy apartment dinner, fresh pasta, tomato sauce, pesto, salad, cheese, cold rose or sparkling water and fruit are enough.", "Pour un petit-dejeuner au balcon, gardez cafe, jus, fruits, yaourt, croissants ou brioche, confiture et miel. Pour un diner simple, pates fraiches, sauce tomate, pesto, salade, fromage, rose frais ou eau petillante et fruits suffisent.", "Per una colazione sul balcone tieni caffe, succo, frutta, yogurt, croissant o brioche, marmellata e miele. Per una cena semplice bastano pasta fresca, salsa di pomodoro, pesto, insalata, formaggio, rose freddo o acqua frizzante e frutta.", "Для сніданку на балконі тримайте каву, сік, фрукти, йогурт, круасани або бріош, джем і мед. Для простої вечері вистачить свіжої пасти, томатного соусу, песто, салату, сиру, холодного розе або газованої води й фруктів."),
        ],
      },
      {
        heading: t("Best supermarkets in Menton", "Meilleurs supermarches a Menton", "Migliori supermercati a Mentone", "Найкорисніші супермаркети в Ментоні"),
        body: [
          t("For a larger apartment stock-up, Intermarché Hyper Menton is one of the most useful full-size supermarkets in the area, especially if you have a car or take a taxi. Intermarché Super Menton Borrigo is another practical option for guests on the western side or anyone shopping by car.", "Pour remplir l'appartement, Intermarche Hyper Menton est l'un des grands supermarches les plus utiles, surtout en voiture ou taxi. Intermarche Super Menton Borrigo est une autre option pratique cote ouest ou pour les courses en voiture.", "Per una spesa completa, Intermarché Hyper Menton e uno dei supermercati grandi piu utili, soprattutto in auto o taxi. Intermarché Super Menton Borrigo e un'altra opzione pratica sul lato ovest o per chi fa la spesa in auto.", "Для повної закупівлі в апартаменти Intermarché Hyper Menton один із найкорисніших великих супермаркетів, особливо з авто або таксі. Intermarché Super Menton Borrigo практичний для західного боку або покупок авто."),
          t("For everyday central shopping, U Express Menton Centre, Carrefour City, Carrefour Express and Le Petit Casino around Rue Saint-Michel are easier for breakfast basics, cold drinks, snacks and forgotten items. On the Garavan side, U Express Menton Garavan is useful near the port.", "Pour les courses quotidiennes au centre, U Express Menton Centre, Carrefour City, Carrefour Express et Le Petit Casino vers Rue Saint-Michel sont pratiques pour petit-dejeuner, boissons fraiches, snacks et oublis. Cote Garavan, U Express Menton Garavan est utile pres du port.", "Per la spesa quotidiana in centro, U Express Menton Centre, Carrefour City, Carrefour Express e Le Petit Casino vicino a Rue Saint-Michel sono comodi per colazione, bevande fredde, snack e dimenticanze. Lato Garavan, U Express Menton Garavan e utile vicino al porto.", "Для щоденних покупок у центрі зручні U Express Menton Centre, Carrefour City, Carrefour Express і Le Petit Casino біля Rue Saint-Michel: сніданки, холодні напої, перекуси й забуті речі. З боку Garavan корисний U Express Menton Garavan біля порту."),
        ],
        relatedPlaceIds: ["intermarche-hyper-menton", "intermarche-super-borrigo", "u-express-menton-centre", "u-express-menton-garavan", "carrefour-city-felix-faure", "carrefour-express-menton", "petit-casino-saint-michel"],
      },
      {
        heading: t("If you are going to Monaco", "Si vous allez a Monaco", "Se vai a Monaco", "Якщо їдете до Монако"),
        body: [
          t("If you are spending time in Monaco, Carrefour Monaco in Fontvieille is one of the most useful large supermarket options in the principality. It sits inside a shopping centre, so it can combine groceries with a longer indoor break on a very hot day.", "Si vous passez du temps a Monaco, Carrefour Monaco a Fontvieille est l'une des grandes options les plus utiles de la principaute. Il se trouve dans un centre commercial et peut combiner courses et pause interieure par forte chaleur.", "Se passi tempo a Monaco, Carrefour Monaco a Fontvieille e una delle opzioni grandi piu utili nel principato. Si trova in un centro commerciale, quindi puo unire spesa e pausa al chiuso nei giorni caldi.", "Якщо проводите час у Монако, Carrefour Monaco у Fontvieille - один із найкорисніших великих супермаркетів князівства. Він у торговому центрі, тож поєднує покупки й довшу перерву в приміщенні в спеку."),
          t("Some old online listings still mention a Casino supermarket near Port Hercule. Check current information carefully before relying on it, as that location was reported closed in 2024.", "D'anciennes fiches en ligne mentionnent encore parfois un supermarche Casino pres du Port Hercule. Verifiez attentivement avant de compter dessus: cette adresse a ete signalee fermee en 2024.", "Alcune vecchie schede online citano ancora un supermercato Casino vicino a Port Hercule. Controlla bene prima di contarci: quella sede e stata segnalata chiusa nel 2024.", "Старі онлайн-записи іноді ще згадують Casino біля Port Hercule. Перевіряйте актуальність: цю локацію повідомляли як закриту у 2024 році."),
        ],
        relatedPlaceIds: ["carrefour-monaco-fontvieille"],
      },
      {
        heading: t("If you are spending the day in Nice", "Si vous passez la journee a Nice", "Se passi la giornata a Nizza", "Якщо проводите день у Ніцці"),
        body: [
          t("Nice TNL is useful if you want a large Carrefour rather than a small city shop, especially by car or during a longer Nice day. Monoprix Nice Garibaldi is practical around Old Nice, the port and Place Garibaldi for ready meals, picnic food, drinks and toiletries.", "Nice TNL est utile si vous voulez un grand Carrefour plutot qu'une petite boutique, surtout en voiture ou pendant une longue journee a Nice. Monoprix Nice Garibaldi est pratique autour du Vieux Nice, du port et de Place Garibaldi.", "Nice TNL e utile se vuoi un Carrefour grande invece di un piccolo negozio, soprattutto in auto o durante una giornata lunga a Nizza. Monoprix Nice Garibaldi e pratico tra Vieux Nice, porto e Place Garibaldi.", "Nice TNL корисний, якщо потрібен великий Carrefour, а не маленький міський магазин, особливо авто або під час довшого дня в Ніцці. Monoprix Nice Garibaldi практичний біля старої Ніцци, порту та Place Garibaldi."),
          t("Nice Étoile is not a supermarket guide stop in the strict sense, but during extreme heat it offers a larger indoor shopping environment in central Nice.", "Nice Etoile n'est pas un supermarche au sens strict, mais pendant les fortes chaleurs il offre un grand espace commercial interieur au centre de Nice.", "Nice Étoile non e un supermercato in senso stretto, ma con caldo intenso offre un grande spazio commerciale al chiuso nel centro di Nizza.", "Nice Étoile не супермаркет у строгому сенсі, але під час сильної спеки це велике приміщення для паузи в центрі Ніцци."),
        ],
        relatedPlaceIds: ["carrefour-nice-tnl", "monoprix-nice-garibaldi", "nice-etoile"],
      },
      {
        heading: t("Across the border: Italy", "De l'autre cote de la frontiere: Italie", "Oltre confine: Italia", "Через кордон: Італія"),
        body: [
          t("One of Menton's advantages is that Italy is very close. Italian supermarkets are worth visiting for coffee, pasta, pesto, olive oil, grissini, biscuits, tomato sauces, mozzarella, Parmesan, local wine, limoncello and Italian mineral water.", "L'un des avantages de Menton est la proximite de l'Italie. Les supermarches italiens valent le detour pour cafe, pates, pesto, huile d'olive, grissini, biscuits, sauces tomate, mozzarella, parmesan, vin local, limoncello et eau minerale italienne.", "Uno dei vantaggi di Mentone e la vicinanza all'Italia. I supermercati italiani meritano per caffe, pasta, pesto, olio d'oliva, grissini, biscotti, sughi, mozzarella, Parmigiano, vino locale, limoncello e acqua minerale italiana.", "Одна з переваг Ментона - Італія зовсім поруч. Італійські супермаркети цікаві для кави, пасти, песто, оливкової олії, грісіні, печива, томатних соусів, моцарели, пармезану, місцевого вина, лімончело й мінеральної води."),
          t("Ventimiglia is the easiest stop from Menton, with smaller central Conad options. Vallecrosia is more useful by car for a larger shop, while Bordighera and Sanremo work well when you are already spending the day there.", "Vintimille est l'arret le plus facile depuis Menton, avec de petites options Conad centrales. Vallecrosia est plus utile en voiture pour une grande course, tandis que Bordighera et Sanremo fonctionnent si vous y passez deja la journee.", "Ventimiglia e la tappa piu facile da Mentone, con piccoli Conad centrali. Vallecrosia e piu utile in auto per una spesa grande, mentre Bordighera e Sanremo funzionano se ci passi gia la giornata.", "Вентімілья - найпростіша зупинка з Ментона, з невеликими центральними Conad. Vallecrosia зручніша авто для більшої закупівлі, а Bordighera й Sanremo мають сенс, якщо ви вже проводите там день."),
        ],
        relatedPlaceIds: ["conad-city-ventimiglia-carso", "conad-city-ventimiglia-corso-nizza", "conad-superstore-vallecrosia", "conad-city-bordighera", "conad-city-sanremo"],
      },
      {
        heading: t("France or Italy: what to buy where", "France ou Italie: quoi acheter ou", "Francia o Italia: cosa comprare dove", "Франція чи Італія: що де купувати"),
        body: [
          t("French supermarkets are best for cheese, yogurt, butter, baguette-style bread, tapenade, olives, ready salads, Provençal herbs, rosé wine, sunscreen and hygiene basics.", "Les supermarches francais sont excellents pour fromage, yaourt, beurre, pain type baguette, tapenade, olives, salades preparees, herbes de Provence, rose, creme solaire et produits d'hygiene.", "I supermercati francesi sono ottimi per formaggio, yogurt, burro, pane tipo baguette, tapenade, olive, insalate pronte, erbe provenzali, rose, crema solare e igiene.", "Французькі супермаркети найкращі для сиру, йогурту, масла, багетного хліба, тапенади, оливок, готових салатів, прованських трав, розе, сонцезахисту й гігієни."),
          t("Italian supermarkets are best for coffee, pasta, pesto, olive oil, biscuits, tomato sauces, focaccia-style snacks, cured meats, mozzarella, limoncello and Italian mineral water. For several days in Menton, buy French breakfast and beach supplies locally, then bring back Italian pantry items from Ventimiglia or Bordighera.", "Les supermarches italiens sont parfaits pour cafe, pates, pesto, huile d'olive, biscuits, sauces tomate, snacks type focaccia, charcuterie, mozzarella, limoncello et eau minerale. Pour plusieurs jours, achetez petit-dejeuner et plage a Menton, puis rapportez les produits italiens de Vintimille ou Bordighera.", "I supermercati italiani sono perfetti per caffe, pasta, pesto, olio d'oliva, biscotti, sughi, snack tipo focaccia, salumi, mozzarella, limoncello e acqua minerale. Per piu giorni, compra colazione e spiaggia a Mentone, poi porta prodotti italiani da Ventimiglia o Bordighera.", "Італійські супермаркети найкращі для кави, пасти, песто, оливкової олії, печива, соусів, фокача-перекусів, м'ясних нарізок, моцарели, лімончело й мінеральної води. На кілька днів купуйте сніданки й пляжні речі в Ментоні, а італійську комору привозьте з Вентімільї або Бордігери."),
        ],
      },
      {
        heading: t("Practical supermarket tips", "Conseils pratiques pour les courses", "Consigli pratici per la spesa", "Практичні поради для супермаркетів"),
        body: [
          t("Bring a reusable bag, check Sunday and holiday hours, and shop early or after 17:00 when summer heat is easier. Use supermarkets as a short pause, not as the main destination of the day.", "Prenez un sac reutilisable, verifiez les horaires du dimanche et des jours feries, et faites les courses tot ou apres 17h quand la chaleur est plus facile. Utilisez les supermarches comme courte pause, pas comme destination principale.", "Porta una borsa riutilizzabile, controlla orari domenicali e festivi, e fai la spesa presto o dopo le 17 quando il caldo pesa meno. Usa i supermercati come breve pausa, non come destinazione principale.", "Візьміть багаторазову сумку, перевіряйте недільні та святкові години й купуйте рано або після 17:00, коли спека легша. Використовуйте супермаркети як коротку паузу, а не головну мету дня."),
          t("A simple hot-day rhythm works well: buy fruit, water and breakfast supplies in the morning; swim before the day heats up; return to the apartment at midday with shutters closed and air conditioning on; shop lightly again late afternoon for salad, cheese, pasta or chilled foods.", "Un rythme simple fonctionne bien: achetez fruits, eau et petit-dejeuner le matin; nagez avant la chaleur; rentrez a midi avec volets fermes et climatisation; refaites une petite course en fin d'apres-midi pour salade, fromage, pates ou produits frais.", "Un ritmo semplice funziona bene: compra frutta, acqua e colazione al mattino; nuota prima del caldo; rientra a mezzogiorno con persiane chiuse e aria condizionata; fai una piccola spesa nel tardo pomeriggio per insalata, formaggio, pasta o prodotti freschi.", "Простий ритм спекотного дня добре працює: зранку купіть фрукти, воду й сніданок; поплавайте до спеки; опівдні поверніться в апартаменти із закритими віконницями та кондиціонером; ближче до вечора купіть салат, сир, пасту або охолоджені продукти."),
        ],
        relatedApartmentKeys: allApartments,
      },
    ],
    practicalTips: [
      t("Always check current store hours before planning around a specific supermarket.", "Verifiez toujours les horaires actuels avant de compter sur un supermarche precis.", "Controlla sempre gli orari aggiornati prima di organizzarti intorno a un supermercato specifico.", "Завжди перевіряйте актуальні години роботи перед плануванням навколо конкретного супермаркету."),
      t("Most useful summer basics are cold water, fruit, yogurt, salad, sunscreen and simple dinner ingredients.", "Les bases d'ete les plus utiles: eau fraiche, fruits, yaourt, salade, creme solaire et ingredients simples pour le diner.", "Le basi estive piu utili: acqua fredda, frutta, yogurt, insalata, crema solare e ingredienti semplici per cena.", "Найкорисніша літня база: холодна вода, фрукти, йогурт, салат, сонцезахисний крем і прості інгредієнти для вечері."),
      t("Use Italian supermarket stops for pantry items if you are already visiting Ventimiglia, Bordighera or Sanremo.", "Utilisez les supermarches italiens pour le placard si vous visitez deja Vintimille, Bordighera ou Sanremo.", "Usa i supermercati italiani per la dispensa se visiti gia Ventimiglia, Bordighera o Sanremo.", "Використовуйте італійські супермаркети для запасів, якщо вже їдете до Вентімільї, Бордігери або Санремо."),
    ],
  }),
  shortArticle({
    id: "menton-one-day-itinerary",
    slug: "menton-one-day-itinerary",
    title: t("Menton in one day: a relaxed walking itinerary", "Menton en une journee: itineraire a pied detendu", "Mentone in un giorno: itinerario a piedi rilassato", "Ментон за один день: спокійний пішохідний маршрут"),
    seoTitle: t("Menton in One Day | Walking Itinerary", "Menton en une journee | Itineraire a pied", "Mentone in un giorno | Itinerario a piedi", "Ментон за один день | Пішохідний маршрут"),
    seoDescription: t("A relaxed one-day walking itinerary in Menton with coffee, the market, old town viewpoints, Sablettes beach, gardens and a seafront evening.", "Itineraire detendu d'une journee a pied a Menton avec cafe, marche, vues de la vieille ville, Sablettes, jardins et soiree au bord de mer.", "Itinerario rilassato di un giorno a piedi a Mentone con caffe, mercato, panorami del centro storico, Sablettes, giardini e sera sul lungomare.", "Спокійний пішохідний маршрут Ментоном на день: кава, ринок, краєвиди старого міста, Sablettes, сади й вечір біля моря."),
    excerpt: t("A full day in Menton works best when it stays simple: market, old streets, Sablettes, one flexible garden option and an evening by the sea.", "Une journee a Menton fonctionne mieux si elle reste simple: marche, vieilles rues, Sablettes, une option jardin flexible et une soiree en bord de mer.", "Una giornata a Mentone funziona meglio se resta semplice: mercato, strade antiche, Sablettes, un giardino opzionale e una sera sul mare.", "Один день у Ментоні найкраще працює просто: ринок, старі вулиці, Sablettes, один гнучкий варіант із садом і вечір біля моря."),
    category: "itineraries",
    coverImage: "/images/guide/menton-one-day-itinerary.jpg",
    coverImageAlt: t("Illustration of a one-day Menton walking itinerary", "Illustration d'un itineraire d'une journee a Menton", "Illustrazione di un itinerario di un giorno a Mentone", "Ілюстрація маршруту Ментоном на один день"),
    visualTheme: "itinerary",
    visualStatus: "project_illustration",
    tags: [t("one day", "une journee", "un giorno", "один день"), t("walking", "a pied", "a piedi", "пішки")],
    bestFor: [guideBestForOptions[3].label, guideBestForOptions[0].label, guideBestForOptions[4].label],
    duration: "full-day",
    locationTags: ["menton-centre", "old-town", "seafront"],
    featured: true,
    relatedPlaces: ["halles-du-marche", "chez-mimi-menton", "maison-herbin-menton", "rue-saint-michel-menton", "rampes-saint-michel", "plage-sablettes", "jardin-serre-de-la-madone", "jardin-val-rahmeh", "promenade-du-soleil"],
    relatedArticles: ["supermarkets-in-menton", "halles-du-marche-menton", "best-beaches-in-menton", "quiet-evening-in-menton"],
    relatedEvents: ["menton-lemon-festival"],
    relatedApartments: allApartments,
    sections: [
      {
        heading: t("How to pace one day in Menton", "Comment rythmer une journee a Menton", "Come dare ritmo a un giorno a Mentone", "Як розподілити один день у Ментоні"),
        body: [
          t(
            "One full day is enough to feel Menton if you keep the plan simple: start with the market, give yourself time in the old streets, slow down around Sablettes and finish by the sea. This route focuses on food, easy views and flexible options you can adjust to the weather and your energy.",
            "Une journee complete suffit pour sentir Menton si le programme reste simple : commencer par le marche, prendre le temps dans les vieilles rues, ralentir autour de Sablettes et finir au bord de mer. Cet itineraire mise sur la nourriture, les vues faciles et des options flexibles selon la meteo et votre energie.",
            "Un giorno intero basta per capire Mentone se mantieni il programma semplice: inizia dal mercato, prenditi tempo nelle vie antiche, rallenta intorno a Sablettes e finisci sul mare. Questo itinerario punta su cibo, viste facili e opzioni flessibili secondo meteo ed energia.",
            "Одного повного дня достатньо, щоб відчути Ментон, якщо не ускладнювати маршрут: почніть із ринку, дайте собі час у старих вулицях, сповільніться біля Sablettes і завершіть день біля моря. Маршрут побудований навколо їжі, легких краєвидів і гнучких варіантів залежно від погоди та сил.",
          ),
        ],
        relatedApartmentKeys: allApartments,
      },
      {
        heading: t("Morning: coffee, market and old town", "Matin: cafe, marche et vieille ville", "Mattina: caffe, mercato e centro storico", "Ранок: кава, ринок і старе місто"),
        body: [
          t(
            "Begin with coffee and something sweet near the seafront or market area, then move straight into Halles du Marché while the morning is active. A simple breakfast can be espresso or cafe creme with a croissant, pain au chocolat, fresh juice or tartine.",
            "Commencez par un cafe et quelque chose de sucre pres du front de mer ou du marche, puis entrez directement aux Halles du Marche quand le matin est vivant. Un petit-dejeuner simple peut etre un espresso ou cafe creme avec croissant, pain au chocolat, jus frais ou tartine.",
            "Inizia con un caffe e qualcosa di dolce vicino al lungomare o al mercato, poi entra direttamente alle Halles du Marché quando il mattino e vivace. Una colazione semplice puo essere espresso o cafe creme con croissant, pain au chocolat, spremuta o tartine.",
            "Почніть із кави й чогось солодкого біля набережної або ринку, а потім одразу заходьте до Halles du Marché, поки ранок живий. Простий сніданок - espresso або cafe creme з круасаном, pain au chocolat, свіжий сік чи tartine.",
          ),
          t(
            "Use the market for small tastes: a slice of pichade or pissaladière, hot socca if available, and a couple of barbajuans from different stalls. Eat some there and keep a little aside for a mid-morning snack.",
            "Utilisez le marche pour de petites degustations : une part de pichade ou pissaladiere, de la socca chaude si elle est disponible, et quelques barbajuans de differents stands. Mangez-en une partie sur place et gardez un peu pour plus tard dans la matinee.",
            "Usa il mercato per piccoli assaggi: una fetta di pichade o pissaladière, socca calda se disponibile e un paio di barbajuans da banchi diversi. Mangiane un po' subito e tieni qualcosa per uno spuntino a meta mattina.",
            "Використайте ринок для невеликих дегустацій: шматок pichade або pissaladière, гарячу socca, якщо є, і кілька barbajuans з різних яток. Частину з'їжте на місці, а трохи залиште для перекусу пізніше.",
          ),
          t(
            "When you are ready, head towards Les Rampes Saint-Michel and climb slowly through the old town, pausing on the landings to look back at the bay and the tiled roofs around the Basilica.",
            "Quand vous etes pret, dirigez-vous vers les Rampes Saint-Michel et montez doucement dans la vieille ville, en faisant des pauses sur les paliers pour regarder la baie et les toits autour de la basilique.",
            "Quando sei pronto, dirigiti verso Les Rampes Saint-Michel e sali lentamente nel centro storico, fermandoti sui pianerottoli per guardare la baia e i tetti intorno alla Basilica.",
            "Коли будете готові, йдіть до Les Rampes Saint-Michel і повільно піднімайтеся старим містом, зупиняючись на майданчиках, щоб подивитися на бухту й черепичні дахи навколо базиліки.",
          ),
        ],
        relatedPlaceIds: ["halles-du-marche", "chez-mimi-menton", "maison-herbin-menton", "rue-saint-michel-menton", "rampes-saint-michel"],
      },
      {
        heading: t("Late morning: viewpoints and a simple lunch", "Fin de matinee: vues et dejeuner simple", "Tarda mattina: panorami e pranzo semplice", "Пізній ранок: краєвиди й простий обід"),
        body: [
          t(
            "From the top of the rampes, continue a little higher to the Cimetière du Vieux Château if you want one of the widest views over Menton and the Italian coast. The climb is easier before midday, before the strongest heat and the busiest tour moments.",
            "Depuis le haut des rampes, continuez un peu plus haut vers le Cimetière du Vieux Château si vous voulez l'une des vues les plus larges sur Menton et la cote italienne. La montee est plus agreable avant midi, avant la chaleur forte et les moments les plus frequentes.",
            "Dalla cima delle rampes, continua un po' piu in alto verso il Cimetière du Vieux Château se vuoi una delle viste piu ampie su Mentone e sulla costa italiana. La salita e piu piacevole prima di mezzogiorno, prima del caldo forte e dei momenti piu affollati.",
            "Від верхньої частини rampes можна піднятися ще трохи до Cimetière du Vieux Château, якщо хочете один із найширших видів на Ментон та італійське узбережжя. Підйом краще робити до полудня, до сильної спеки й найлюдніших годин.",
          ),
          t(
            "For lunch, keep it easy: sit down near the old port and Plage des Sablettes, or make a picnic from the morning market. Bread, cheese, olives, pichade and fruit on a bench by the sea can be just as memorable as a formal restaurant stop.",
            "Pour le dejeuner, restez simple : installez-vous pres du vieux port et de la Plage des Sablettes, ou composez un pique-nique avec le marche du matin. Pain, fromage, olives, pichade et fruits sur un banc face a la mer peuvent etre aussi memorables qu'un restaurant.",
            "Per pranzo resta semplice: siediti vicino al vecchio porto e a Plage des Sablettes, oppure prepara un picnic con gli acquisti del mattino. Pane, formaggio, olive, pichade e frutta su una panchina sul mare possono essere memorabili quanto un ristorante.",
            "На обід не ускладнюйте: сядьте біля старого порту й Plage des Sablettes або складіть пікнік із ранкових покупок. Хліб, сир, оливки, pichade і фрукти на лавці біля моря можуть запам'ятатися не гірше за ресторан.",
          ),
        ],
        relatedPlaceIds: ["cimetiere-vieux-chateau", "plage-sablettes"],
      },
      {
        heading: t("Early afternoon: Sablettes and a garden", "Debut d'apres-midi: Sablettes et jardin", "Primo pomeriggio: Sablettes e un giardino", "Початок дня: Sablettes і сад"),
        body: [
          t(
            "After lunch, drift naturally to Plage des Sablettes below the old town. Swim, read or simply pause for an hour or two with the church towers and coloured facades behind you and the bay opening towards Italy.",
            "Apres le dejeuner, glissez naturellement vers la Plage des Sablettes sous la vieille ville. Baignez-vous, lisez ou faites simplement une pause d'une heure ou deux avec les clochers et facades colorees derriere vous, et la baie ouverte vers l'Italie.",
            "Dopo pranzo, scendi naturalmente verso Plage des Sablettes sotto il centro storico. Nuota, leggi o fai semplicemente una pausa di un'ora o due con campanili e facciate colorate alle spalle e la baia aperta verso l'Italia.",
            "Після обіду природно спускайтеся до Plage des Sablettes під старим містом. Поплавайте, почитайте або просто зробіть паузу на годину-дві з вежами й кольоровими фасадами позаду та бухтою, що відкривається в бік Італії.",
          ),
          t(
            "If you want a garden stop, choose according to energy. Jardin Botanique Val Rahmeh is the easier walking option from the old town / Garavan side, while Jardin Serre de la Madone is farther inland and suits visitors who especially enjoy gardens. Check current opening hours before building the afternoon around either one.",
            "Si vous voulez ajouter un jardin, choisissez selon votre energie. Le Jardin Botanique Val Rahmeh est l'option la plus facile a pied depuis la vieille ville / Garavan, tandis que le Jardin Serre de la Madone est plus en retrait et convient surtout aux amateurs de jardins. Verifiez les horaires avant d'organiser l'apres-midi autour de l'un ou l'autre.",
            "Se vuoi aggiungere un giardino, scegli in base all'energia. Jardin Botanique Val Rahmeh e l'opzione piu facile a piedi dal centro storico / Garavan, mentre Jardin Serre de la Madone e piu interno e adatto a chi ama davvero i giardini. Controlla gli orari prima di costruire il pomeriggio intorno a uno dei due.",
            "Якщо хочете додати сад, обирайте за силами. Jardin Botanique Val Rahmeh простіше дістатися пішки зі старого міста / Garavan, тоді як Jardin Serre de la Madone далі вглиб і більше підходить тим, хто справді любить сади. Перед плануванням перевірте актуальні години роботи.",
          ),
        ],
        relatedPlaceIds: ["plage-sablettes", "jardin-val-rahmeh", "jardin-serre-de-la-madone"],
      },
      {
        heading: t("Late afternoon: seafront walk and a drink", "Fin d'apres-midi: promenade et verre", "Tardo pomeriggio: passeggiata e drink", "Пізній день: набережна й напій"),
        body: [
          t(
            "Towards the end of the afternoon, return to the sea and join Promenade du Soleil. Walk at your own pace, watch the beach rhythm and decide where you want to stop later for an aperitif.",
            "En fin d'apres-midi, revenez vers la mer et rejoignez la Promenade du Soleil. Marchez a votre rythme, observez la vie des plages et choisissez ou vous aurez envie de vous arreter plus tard pour l'aperitif.",
            "Verso fine pomeriggio, torna al mare e raggiungi la Promenade du Soleil. Cammina al tuo ritmo, osserva la vita delle spiagge e decidi dove fermarti piu tardi per l'aperitivo.",
            "Наприкінці дня поверніться до моря й вийдіть на Promenade du Soleil. Ідіть у своєму темпі, спостерігайте за пляжним ритмом і вирішіть, де пізніше зупинитися на аперитив.",
          ),
          t(
            "If you want a craft beer, a bar such as Biera d'Aquì can work well before dinner. If you prefer a higher view, plan ahead for a rooftop drink such as Med Rooftop. Opening days and reservations can change, especially in high season.",
            "Si vous voulez une biere artisanale, une adresse comme Biera d'Aqui peut bien fonctionner avant le diner. Si vous preferez une vue plus haute, prevoyez un verre en rooftop comme au Med Rooftop. Les jours d'ouverture et reservations peuvent changer, surtout en haute saison.",
            "Se vuoi una birra artigianale, un posto come Biera d'Aquì puo funzionare bene prima di cena. Se preferisci una vista dall'alto, organizza un drink in rooftop come Med Rooftop. Giorni di apertura e prenotazioni possono cambiare, soprattutto in alta stagione.",
            "Якщо хочеться крафтового пива, перед вечерею може підійти Biera d'Aquì або схоже місце. Якщо більше хочеться виду згори, заплануйте rooftop-напій, наприклад у Med Rooftop. Дні роботи й бронювання можуть змінюватися, особливо у високий сезон.",
          ),
        ],
        relatedPlaceIds: ["promenade-du-soleil", "biera-daqui", "med-rooftop"],
      },
      {
        heading: t("Evening: dinner and a quiet finish", "Soir: diner et fin calme", "Sera: cena e chiusura tranquilla", "Вечір: вечеря й спокійне завершення"),
        body: [
          t(
            "For dinner, the old town and Sablettes area give the broadest choice: seafood and pasta on the esplanade, a bistro-style meal near the market, or a table you noticed during the day. If you still want something sweet, look for lemon desserts or a small Menton lemon liqueur as a digestif.",
            "Pour le diner, la vieille ville et Sablettes offrent le plus large choix : fruits de mer et pates sur l'esplanade, table bistro pres du marche, ou adresse reperee dans la journee. Si vous voulez une touche sucree, cherchez un dessert au citron ou une petite liqueur de citron de Menton en digestif.",
            "Per cena, centro storico e Sablettes offrono la scelta piu ampia: pesce e pasta sull'esplanade, un bistro vicino al mercato o un tavolo notato durante il giorno. Se vuoi ancora qualcosa di dolce, cerca un dessert al limone o un piccolo liquore al limone di Mentone come digestivo.",
            "На вечерю старе місто й район Sablettes дають найширший вибір: морепродукти й паста на еспланаді, бістро біля ринку або місце, яке ви помітили вдень. Якщо хочеться солодкого, шукайте лимонний десерт або невеликий лимонний лікер Ментона як digestif.",
          ),
          t(
            "After dinner, a slow walk along Promenade du Soleil or towards Port de Garavan is enough to close the loop. Sit on a bench, look back at the old town and the curve of the bay, then walk home by the water if you are staying in a central seafront apartment.",
            "Apres le diner, une marche lente sur la Promenade du Soleil ou vers le Port de Garavan suffit pour boucler la journee. Asseyez-vous sur un banc, regardez la vieille ville et la courbe de la baie, puis rentrez par le bord de mer si vous logez dans un appartement central cote mer.",
            "Dopo cena, una passeggiata lenta sulla Promenade du Soleil o verso Port de Garavan basta per chiudere il giro. Siediti su una panchina, guarda il centro storico e la curva della baia, poi rientra lungo l'acqua se soggiorni in un appartamento centrale sul mare.",
            "Після вечері достатньо повільної прогулянки Promenade du Soleil або в бік Port de Garavan, щоб замкнути коло. Сядьте на лавку, подивіться на старе місто й вигин бухти, а потім повертайтеся додому вздовж води, якщо зупинилися в центральних апартаментах біля моря.",
          ),
        ],
        relatedPlaceIds: ["promenade-du-soleil", "port-de-garavan"],
      },
    ],
  }),
  shortArticle({
    id: "menton-three-day-itinerary",
    slug: "menton-three-day-itinerary",
    title: t("Menton in three days: sea, Monaco and the Italian Riviera", "Menton en trois jours: mer, Monaco et Riviera italienne", "Mentone in tre giorni: mare, Monaco e Riviera italiana", "Ментон за три дні: море, Монако й Італійська Рив'єра"),
    seoTitle: t("Menton in Three Days | Monaco, Nice and Italian Riviera", "Menton en trois jours | Monaco, Nice et Riviera italienne", "Mentone in tre giorni | Monaco, Nizza e Riviera italiana", "Ментон за три дні | Монако, Ніцца й Італійська Рив'єра"),
    seoDescription: t("A relaxed three-day Menton itinerary with one local day, a Monaco day trip, and a choice between Nice or Ventimiglia and the Italian Riviera.", "Itineraire detendu de trois jours a Menton: une journee locale, une excursion a Monaco, puis Nice ou Vintimille et la Riviera italienne.", "Itinerario rilassato di tre giorni a Mentone: un giorno locale, una gita a Monaco, poi Nizza oppure Ventimiglia e la Riviera italiana.", "Спокійний маршрут Ментоном на три дні: день у місті, поїздка до Монако, потім Ніцца або Вентімілья й Італійська Рив'єра."),
    excerpt: t("Use Menton as a calm base: one day for the town, one for Monaco, then choose Nice or the Italian Riviera without packing and unpacking.", "Utilisez Menton comme base calme: un jour pour la ville, un pour Monaco, puis Nice ou la Riviera italienne sans refaire les bagages.", "Usa Mentone come base tranquilla: un giorno per la citta, uno per Monaco, poi Nizza o Riviera italiana senza fare e disfare le valigie.", "Використайте Ментон як спокійну базу: день для міста, день для Монако, потім Ніцца або Італійська Рив'єра без постійного пакування."),
    category: "itineraries",
    coverImage: "/images/guide/menton-three-day-itinerary.jpg",
    coverImageAlt: t("Illustration of a three-day Menton, Monaco and Italian Riviera itinerary", "Illustration d'un itineraire de trois jours entre Menton, Monaco et Riviera italienne", "Illustrazione di un itinerario di tre giorni tra Mentone, Monaco e Riviera italiana", "Ілюстрація маршруту на три дні: Ментон, Монако й Італійська Рив'єра"),
    visualTheme: "itinerary",
    visualStatus: "project_illustration",
    tags: [t("three days", "trois jours", "tre giorni", "три дні"), t("day trips", "excursions", "gite", "поїздки")],
    bestFor: [guideBestForOptions[3].label, guideBestForOptions[0].label, guideBestForOptions[1].label],
    duration: "2-3 days",
    locationTags: ["menton-centre", "monaco", "nice", "italian-riviera"],
    relatedArticles: ["menton-one-day-itinerary", "menton-old-town", "local-food-menton", "best-beaches-in-menton", "day-trips-from-menton", "monaco-events-from-menton", "italian-riviera-day-trip-from-menton", "public-transport-in-menton", "menton-without-a-car", "supermarkets-in-menton"],
    relatedApartments: allApartments,
    sections: [
      {
        heading: t("Why Menton works for three days", "Pourquoi Menton fonctionne pour trois jours", "Perche Mentone funziona per tre giorni", "Чому Ментон добре працює на три дні"),
        body: [
          t(
            "Menton works well as a calm base: spend one day getting to know the town properly, then use the next two days for Monaco, Nice or the Italian Riviera without constant packing and unpacking.",
            "Menton fonctionne tres bien comme base calme : passez une journee a vraiment connaitre la ville, puis utilisez les deux suivantes pour Monaco, Nice ou la Riviera italienne sans faire et defaire les bagages sans cesse.",
            "Mentone funziona bene come base tranquilla: dedica un giorno a conoscere davvero la citta, poi usa i due giorni successivi per Monaco, Nizza o la Riviera italiana senza fare e disfare continuamente le valigie.",
            "Ментон добре працює як спокійна база: один день присвятіть самому місту, а наступні два використайте для Монако, Ніцци або Італійської Рив'єри без постійного пакування й переїздів.",
          ),
          t(
            "The outline below keeps walking reasonable and leaves space for slow meals, swims and unplanned stops. Check current train times before each day trip, especially for evening returns.",
            "Le parcours ci-dessous garde des marches raisonnables et laisse de la place aux repas lents, baignades et pauses improvisees. Verifiez les horaires de train actuels avant chaque excursion, surtout pour les retours du soir.",
            "Il percorso qui sotto mantiene camminate ragionevoli e lascia spazio a pasti lenti, bagni e soste non programmate. Controlla gli orari aggiornati dei treni prima di ogni gita, soprattutto per i rientri serali.",
            "Маршрут нижче тримає піші відстані розумними й залишає простір для повільних обідів, купання та незапланованих зупинок. Перед кожною поїздкою перевіряйте актуальний розклад потягів, особливо для вечірнього повернення.",
          ),
        ],
        relatedApartmentKeys: allApartments,
      },
      {
        heading: t("Day 1: Menton essentials", "Jour 1: les essentiels de Menton", "Giorno 1: Mentone essenziale", "День 1: головне в Ментоні"),
        body: [
          t(
            "Start with breakfast near Halles du Marché so you are only a few steps from the market afterwards. Buy small portions of local specialities such as pichade, hot socca if available, barbajuans and seasonal fruit, then treat them as a second breakfast while you wander between stalls.",
            "Commencez par un petit-dejeuner pres des Halles du Marche pour etre a quelques pas du marche ensuite. Achetez de petites portions de specialites locales comme pichade, socca chaude si disponible, barbajuans et fruits de saison, puis faites-en un second petit-dejeuner en circulant entre les etals.",
            "Inizia con colazione vicino alle Halles du Marché, cosi sei gia a pochi passi dal mercato. Compra piccole porzioni di specialita locali come pichade, socca calda se disponibile, barbajuans e frutta di stagione, poi usale come seconda colazione mentre giri tra i banchi.",
            "Почніть зі сніданку біля Halles du Marché, щоб потім бути за кілька кроків від ринку. Купіть маленькі порції місцевих смаків: pichade, гарячу socca, якщо є, barbajuans і сезонні фрукти, а потім зробіть із цього другий сніданок між ятками.",
          ),
          t(
            "From the market, climb Les Rampes Saint-Michel into the old town, stopping for photos of the bay and facades. Continue to the Cimetière du Vieux Château for wide views over Menton and the Italian coast, then drift back down through narrow streets for coffee or lemonade on a shaded terrace.",
            "Depuis le marche, montez les Rampes Saint-Michel vers la vieille ville en vous arretant pour photographier la baie et les facades. Continuez jusqu'au Cimetière du Vieux Château pour les grandes vues sur Menton et la cote italienne, puis redescendez par les ruelles pour un cafe ou une limonade en terrasse ombragee.",
            "Dal mercato, sali Les Rampes Saint-Michel nel centro storico, fermandoti per foto della baia e delle facciate. Continua fino al Cimetière du Vieux Château per ampie viste su Mentone e sulla costa italiana, poi scendi tra le vie strette per un caffe o una limonata su una terrazza ombreggiata.",
            "Від ринку підніміться Les Rampes Saint-Michel до старого міста, зупиняючись для фото бухти й фасадів. Продовжуйте до Cimetière du Vieux Château за широкими видами на Ментон та італійське узбережжя, а потім спускайтеся вузькими вулицями на каву або лимонад у затінку.",
          ),
          t(
            "For lunch, either sit near the old port and Plage des Sablettes or build a picnic from market finds. In the afternoon, use Sablettes for a swim and rest, or add Jardin Botanique Val Rahmeh if you prefer shade and greenery after checking opening hours.",
            "Pour le dejeuner, installez-vous pres du vieux port et de la Plage des Sablettes, ou composez un pique-nique avec le marche. L'apres-midi, profitez de Sablettes pour nager et vous reposer, ou ajoutez le Jardin Botanique Val Rahmeh si vous preferez l'ombre et la verdure apres avoir verifie les horaires.",
            "Per pranzo, siediti vicino al vecchio porto e a Plage des Sablettes oppure prepara un picnic con gli acquisti del mercato. Nel pomeriggio usa Sablettes per nuotare e riposare, oppure aggiungi Jardin Botanique Val Rahmeh se preferisci ombra e verde dopo aver controllato gli orari.",
            "На обід сядьте біля старого порту та Plage des Sablettes або складіть пікнік із ринку. Вдень використайте Sablettes для купання й відпочинку або додайте Jardin Botanique Val Rahmeh, якщо хочеться тіні й зелені після перевірки годин роботи.",
          ),
          t(
            "Towards evening, walk Promenade du Soleil as the light softens. Stop for an aperitif near Sablettes or along the promenade, then choose a calm finish near Port de Garavan or a rooftop such as Med Rooftop if it is open and you want one cocktail with a wider view.",
            "Vers le soir, marchez sur la Promenade du Soleil quand la lumiere devient plus douce. Arretez-vous pour l'aperitif pres de Sablettes ou le long de la promenade, puis choisissez une fin calme vers le Port de Garavan ou un rooftop comme Med Rooftop s'il est ouvert et que vous voulez un cocktail avec vue large.",
            "Verso sera, cammina sulla Promenade du Soleil quando la luce si ammorbidisce. Fermati per un aperitivo vicino a Sablettes o lungo la passeggiata, poi scegli un finale calmo verso Port de Garavan o un rooftop come Med Rooftop se e aperto e vuoi un cocktail con vista piu ampia.",
            "Увечері пройдіться Promenade du Soleil, коли світло м'якшає. Зупиніться на аперитив біля Sablettes або вздовж набережної, а потім оберіть спокійне завершення біля Port de Garavan або rooftop на кшталт Med Rooftop, якщо він відкритий і хочеться коктейлю з ширшим видом.",
          ),
        ],
        relatedPlaceIds: ["halles-du-marche", "rue-saint-michel-menton", "rampes-saint-michel", "basilica-saint-michel-archange", "cimetiere-vieux-chateau", "musee-jean-cocteau-bastion", "plage-sablettes", "plage-casino", "casino-barriere-menton", "jardin-val-rahmeh", "promenade-du-soleil", "port-de-garavan", "med-rooftop"],
      },
      {
        heading: t("Day 2: Monaco from a Menton base", "Jour 2: Monaco depuis Menton", "Giorno 2: Monaco da Mentone", "День 2: Монако з базою в Ментоні"),
        body: [
          t(
            "Have a simple breakfast near your apartment or by the seafront, then take a morning train or bus to Monaco. Journey times vary, so check current schedules, but the distance is short enough for an easy day trip.",
            "Prenez un petit-dejeuner simple pres de votre appartement ou du front de mer, puis prenez un train ou bus du matin pour Monaco. Les temps de trajet varient, donc verifiez les horaires actuels, mais la distance est assez courte pour une excursion facile.",
            "Fai una colazione semplice vicino all'appartamento o sul lungomare, poi prendi un treno o bus del mattino per Monaco. I tempi di viaggio variano, quindi controlla gli orari aggiornati, ma la distanza e abbastanza breve per una gita facile.",
            "Поснідайте біля апартаментів або набережної, а потім сідайте на ранковий потяг чи автобус до Монако. Час у дорозі змінюється, тому перевіряйте актуальний розклад, але відстань достатньо коротка для легкої поїздки на день.",
          ),
          t(
            "Start in Monaco-Ville, the Rock, for harbour views and narrow streets, then walk around the palace area and cathedral before it gets too hot or crowded. For lunch, head towards Port Hercule and Condamine for harbour views or simpler places slightly away from the water.",
            "Commencez a Monaco-Ville, le Rocher, pour les vues sur le port et les ruelles, puis passez par le palais et la cathedrale avant la chaleur ou la foule. Pour le dejeuner, descendez vers le Port Hercule et la Condamine pour les vues portuaires ou des adresses plus simples un peu en retrait.",
            "Inizia da Monaco-Ville, la Rocca, per viste sul porto e strade strette, poi passa nella zona del palazzo e della cattedrale prima del caldo o della folla. Per pranzo scendi verso Port Hercule e Condamine per viste sul porto o posti piu semplici leggermente arretrati.",
            "Почніть із Monaco-Ville, Rock, за видами на порт і вузькими вулицями, потім пройдіться районом палацу й собору до спеки або натовпів. На обід спускайтеся до Port Hercule і Condamine: або види на порт, або простіші місця трохи далі від води.",
          ),
          t(
            "In the afternoon, explore the Casino area and surrounding gardens. Even from outside, the square gives classic Monaco images: Belle Epoque architecture, luxury cars and sea in the background. Add a museum, shopping or a cafe break depending on your energy.",
            "L'apres-midi, explorez le secteur du Casino et les jardins autour. Meme de l'exterieur, la place donne les images classiques de Monaco : architecture Belle Epoque, voitures de luxe et mer en arriere-plan. Ajoutez un musee, du shopping ou une pause cafe selon votre energie.",
            "Nel pomeriggio esplora la zona del Casino e i giardini intorno. Anche da fuori, la piazza offre immagini classiche di Monaco: architettura Belle Epoque, auto di lusso e mare sullo sfondo. Aggiungi un museo, shopping o una pausa caffe secondo energia.",
            "Вдень дослідіть район Casino й навколишні сади. Навіть зовні площа дає класичні кадри Монако: архітектура Belle Epoque, розкішні авто й море на фоні. Додайте музей, шопінг або кавову паузу залежно від сил.",
          ),
          t(
            "For the evening, either stay for a livelier Monaco night around the harbour, checking current programmes for places such as La Rascasse, or have an early dinner and return to Menton for a quieter drink by the sea.",
            "Pour le soir, restez pour une soiree plus animee autour du port de Monaco, en verifiant les programmes actuels d'adresses comme La Rascasse, ou dinez tot et rentrez a Menton pour un verre plus calme au bord de mer.",
            "Per la sera, resta per una notte piu vivace intorno al porto di Monaco, controllando i programmi aggiornati di posti come La Rascasse, oppure cena presto e torna a Mentone per un drink piu calmo sul mare.",
            "На вечір або залишайтеся на жвавіше Монако біля порту, перевіривши актуальні програми таких місць, як La Rascasse, або повечеряйте раніше й повертайтеся до Ментона на спокійніший напій біля моря.",
          ),
        ],
        relatedPlaceIds: ["monaco-monte-carlo"],
      },
      {
        heading: t("Day 3 option A: Nice, the big-city Riviera", "Jour 3 option A: Nice, la grande ville Riviera", "Giorno 3 opzione A: Nizza, Riviera da grande citta", "День 3 варіант A: Ніцца, міська Рив'єра"),
        body: [
          t(
            "For a French Riviera city day, take a morning train to Nice and start in Vieux Nice and Cours Saleya. The market streets, cafes and narrow lanes give colour, second coffee options and a stronger city rhythm than Menton.",
            "Pour une journee Riviera plus urbaine, prenez un train du matin pour Nice et commencez par le Vieux Nice et le Cours Saleya. Les rues du marche, cafes et ruelles donnent des couleurs, une option second cafe et un rythme plus urbain que Menton.",
            "Per una giornata da citta della Riviera, prendi un treno del mattino per Nizza e inizia da Vieux Nice e Cours Saleya. Strade di mercato, caffe e vicoli danno colore, opzioni per un secondo caffe e un ritmo piu urbano rispetto a Mentone.",
            "Для міського дня на Французькій Рив'єрі сідайте на ранковий потяг до Ніцци й починайте з Vieux Nice та Cours Saleya. Ринкові вулиці, кафе й вузькі провулки дають колір, другий кавовий стоп і більш міський ритм, ніж у Ментоні.",
          ),
          t(
            "Stay in the old town for lunch, or walk to Promenade des Anglais for a more open seaside feel. In the afternoon, climb Colline du Château for panoramic views over Baie des Anges and the old town roofs, then swim, rest on the beach or stroll the promenade.",
            "Restez dans la vieille ville pour dejeuner, ou marchez vers la Promenade des Anglais pour une ambiance plus ouverte au bord de mer. L'apres-midi, montez a la Colline du Château pour les panoramas sur la Baie des Anges et les toits de la vieille ville, puis nagez, reposez-vous sur la plage ou longez la promenade.",
            "Resta nel centro storico per pranzo oppure vai verso Promenade des Anglais per un'atmosfera piu aperta sul mare. Nel pomeriggio sali alla Colline du Château per panorami sulla Baie des Anges e sui tetti del centro, poi nuota, riposa in spiaggia o passeggia sul lungomare.",
            "На обід залишайтеся в старому місті або йдіть до Promenade des Anglais для відкритішого морського настрою. Вдень підніміться на Colline du Château за панорамами Baie des Anges і дахів старого міста, потім купайтеся, відпочивайте на пляжі або гуляйте променадом.",
          ),
          t(
            "If you want one bigger night before leaving the Riviera, Nice has more bars, pubs and clubs than Menton. Otherwise, have an early dinner in Nice and return by train for a last quiet walk along Promenade du Soleil.",
            "Si vous voulez une soiree plus grande avant de quitter la Riviera, Nice offre plus de bars, pubs et clubs que Menton. Sinon, dinez tot a Nice et rentrez en train pour une derniere promenade calme sur la Promenade du Soleil.",
            "Se vuoi una serata piu grande prima di lasciare la Riviera, Nizza ha piu bar, pub e club di Mentone. Altrimenti cena presto a Nizza e torna in treno per un'ultima passeggiata tranquilla sulla Promenade du Soleil.",
            "Якщо хочете один більший вечір перед від'їздом із Рив'єри, у Ніцці більше барів, pubs і клубів, ніж у Ментоні. Інакше повечеряйте раніше в Ніцці й повертайтеся потягом на останню тиху прогулянку Promenade du Soleil.",
          ),
        ],
        relatedPlaceIds: ["nice-old-town", "promenade-du-soleil"],
      },
      {
        heading: t("Day 3 option B: Ventimiglia and the Italian coast", "Jour 3 option B: Vintimille et la cote italienne", "Giorno 3 opzione B: Ventimiglia e costa italiana", "День 3 варіант B: Вентімілья та італійське узбережжя"),
        body: [
          t(
            "For a change of country, take a morning train east to Ventimiglia. On market days the town is busy with stalls; on quieter days, use it for Italian coffee, a pastry and a walk through the old centre.",
            "Pour changer de pays, prenez un train du matin vers Vintimille. Les jours de marche, la ville est animee par les etals ; les jours plus calmes, profitez-en pour un cafe italien, une patisserie et une balade dans le vieux centre.",
            "Per cambiare Paese, prendi un treno del mattino verso Ventimiglia. Nei giorni di mercato la citta e piena di banchi; nei giorni piu tranquilli usala per un caffe italiano, un dolce e una passeggiata nel centro storico.",
            "Щоб змінити країну, сідайте на ранковий потяг на схід до Вентімільї. У ринкові дні місто жваве через ятки; у спокійніші дні використайте його для італійської кави, випічки й прогулянки старим центром.",
          ),
          t(
            "Stay for lunch in Ventimiglia or a nearby coastal town, leaning into Italian flavours: fresh pasta, focaccia, seafood and gelato. If you enjoy food markets, check current schedules before planning around them.",
            "Restez dejeuner a Vintimille ou dans une ville cotiere proche, avec des saveurs italiennes : pates fraiches, focaccia, fruits de mer et gelato. Si vous aimez les marches alimentaires, verifiez les horaires actuels avant de construire la journee autour d'eux.",
            "Fermati a pranzo a Ventimiglia o in una cittadina costiera vicina, puntando sui sapori italiani: pasta fresca, focaccia, pesce e gelato. Se ami i mercati alimentari, controlla gli orari aggiornati prima di organizzarci la giornata.",
            "Залишайтеся на обід у Вентімільї або сусідньому прибережному містечку, обираючи італійські смаки: свіжу пасту, focaccia, морепродукти й gelato. Якщо любите продуктові ринки, перевірте актуальні графіки перед плануванням.",
          ),
          t(
            "In the afternoon, either return early to Menton for another swim at Sablettes or Fossan, or continue a little farther along the Ligurian coast before coming back. Finish with a final Menton dinner near the market, Sablettes or Port de Garavan.",
            "L'apres-midi, rentrez tot a Menton pour une autre baignade a Sablettes ou Fossan, ou continuez un peu plus loin sur la cote ligure avant de revenir. Terminez par un dernier diner a Menton pres du marche, de Sablettes ou du Port de Garavan.",
            "Nel pomeriggio, torna presto a Mentone per un altro bagno a Sablettes o Fossan, oppure continua un po' lungo la costa ligure prima di rientrare. Chiudi con un'ultima cena a Mentone vicino al mercato, a Sablettes o a Port de Garavan.",
            "Вдень або повертайтеся раніше до Ментона для ще одного купання на Sablettes чи Fossan, або проїдьте трохи далі Лігурійським узбережжям перед поверненням. Завершіть останньою вечерею в Ментоні біля ринку, Sablettes або Port de Garavan.",
          ),
        ],
        relatedPlaceIds: ["ventimiglia", "bordighera", "sanremo", "plage-sablettes", "plage-fossan", "port-de-garavan"],
      },
    ],
    practicalTips: [
      t("Check current train times before Monaco, Nice or Ventimiglia days.", "Verifiez les horaires de train actuels avant Monaco, Nice ou Vintimille.", "Controlla gli orari aggiornati dei treni prima di Monaco, Nizza o Ventimiglia.", "Перед поїздками до Монако, Ніцци або Вентімільї перевіряйте актуальний розклад потягів."),
      t("Keep Day 1 local and slow so the next two day trips do not feel rushed.", "Gardez le jour 1 local et lent pour que les deux excursions suivantes ne semblent pas pressees.", "Mantieni il Giorno 1 locale e lento, cosi le due gite successive non sembrano affrettate.", "Залиште День 1 локальним і повільним, щоб наступні дві поїздки не здавалися поспішними."),
      t("Choose Nice for a bigger city day, Ventimiglia for an Italian rhythm.", "Choisissez Nice pour une journee plus urbaine, Vintimille pour un rythme italien.", "Scegli Nizza per una giornata piu urbana, Ventimiglia per un ritmo italiano.", "Обирайте Ніццу для більш міського дня, Вентімілью - для італійського ритму."),
    ],
  }),
  shortArticle({
    id: "menton-old-town",
    slug: "menton-old-town",
    title: t("Menton old town: colourful streets, sea views and slow walks", "Vieille ville de Menton: couleurs, vues mer et balades lentes", "Centro storico di Mentone: colori, mare e passeggiate lente", "Старе місто Ментона: кольорові вулиці, море й повільні прогулянки"),
    seoTitle: t("Menton Old Town Guide | Walks and Where to Stay Nearby", "Guide vieille ville de Menton | Balades et sejour proche", "Guida al centro storico di Mentone | Passeggiate e dove stare", "Гід по старому місту Ментона | Прогулянки й де зупинитися"),
    seoDescription: t("Explore Menton's old town on foot: Les Rampes Saint-Michel, Basilica Saint-Michel, panoramic viewpoints, market snacks, lemon shops and sea views.", "Explorez la vieille ville de Menton a pied: Rampes Saint-Michel, basilique, points de vue, marche, boutiques au citron et vues mer.", "Esplora il centro storico di Mentone a piedi: Rampes Saint-Michel, basilica, punti panoramici, mercato, negozi al limone e vista mare.", "Дослідіть старе місто Ментона пішки: Rampes Saint-Michel, базиліка, панорамні краєвиди, ринок, лимонні крамниці й види на море."),
    excerpt: t("A slow walk through Menton's old town: Baroque churches, stepped streets, lemon shops, market snacks and viewpoints above the Mediterranean.", "Une balade lente dans la vieille ville de Menton: eglises baroques, ruelles en escaliers, boutiques au citron, marche et vues sur la Mediterranee.", "Una passeggiata lenta nel centro storico di Mentone: chiese barocche, vicoli a scalini, negozi al limone, spuntini di mercato e viste sul Mediterraneo.", "Повільна прогулянка старим містом Ментона: барокові церкви, сходові вулички, лимонні крамниці, ринкові закуски й краєвиди над Середземним морем."),
    category: "walks-views",
    coverImage: "/images/guide/menton-old-town.jpg",
    coverImageAlt: t("Illustration of Menton's old town", "Illustration de la vieille ville de Menton", "Illustrazione del centro storico di Mentone", "Ілюстрація старого міста Ментона"),
    visualTheme: "old-town",
    visualStatus: "project_illustration",
    tags: [
      t("old town", "vieille ville", "centro storico", "старе місто"),
      t("Saint-Michel", "Saint-Michel", "Saint-Michel", "Saint-Michel"),
      t("lemon shops", "boutiques au citron", "negozi al limone", "лимонні крамниці"),
      t("viewpoints", "points de vue", "punti panoramici", "оглядові місця"),
    ],
    bestFor: [guideBestForOptions[0].label, guideBestForOptions[3].label, guideBestForOptions[7].label],
    duration: "half-day",
    locationTags: ["old-town", "menton-centre"],
    relatedPlaces: ["halles-du-marche", "chez-mimi-menton", "maison-herbin-menton", "rue-saint-michel-menton", "rampes-saint-michel", "basilica-saint-michel-archange", "cimetiere-vieux-chateau", "musee-jean-cocteau-bastion", "salle-des-mariages-jean-cocteau", "musee-prehistoire-regionale-menton", "quai-bonaparte-menton", "promenade-du-soleil", "plage-sablettes", "plage-casino", "casino-barriere-menton"],
    relatedArticles: ["menton-one-day-itinerary", "menton-three-day-itinerary", "where-to-stay-in-menton", "famous-paintings-of-menton", "music-videos-filmed-in-menton", "best-ice-cream-menton", "theatre-opera-performing-arts-near-menton", "stay-cool-in-menton-summer", "museums-in-menton-nice-monaco", "local-food-menton", "halles-du-marche-menton", "quiet-evening-in-menton", "best-photo-spots-menton"],
    relatedApartments: seaViewApartments,
    sections: [
      {
        heading: t("A short story of the old town", "Petite histoire de la vieille ville", "Breve storia del centro storico", "Коротка історія старого міста"),
        body: [
          t("Menton's old town is compact, colourful and easy to explore on foot: Baroque churches, stepped streets, small shops and plenty of lemon-themed souvenirs.", "La vieille ville de Menton est compacte, coloree et facile a decouvrir a pied: eglises baroques, rues en escaliers, petites boutiques et souvenirs autour du citron.", "Il centro storico di Mentone e compatto, colorato e facile da esplorare a piedi: chiese barocche, vicoli a scalini, piccoli negozi e molti souvenir al limone.", "Старе місто Ментона компактне, кольорове й зручне для прогулянок: барокові церкви, сходові вулички, маленькі крамниці та багато сувенірів на лимонну тему."),
          t("The historic centre grew on a hill above the sea, once protected by walls and dominated by Basilica Saint-Michel-Archange. Its Baroque bell tower still acts as one of Menton's landmarks, reached from the seafront via Les Rampes Saint-Michel.", "Le centre historique s'est developpe sur une colline au-dessus de la mer, autrefois protege par des remparts et domine par la basilique Saint-Michel-Archange. Son clocher baroque reste l'un des reperes de Menton, accessible depuis le front de mer par les Rampes Saint-Michel.", "Il nucleo storico e cresciuto su una collina sopra il mare, un tempo protetto da mura e dominato dalla Basilica Saint-Michel-Archange. Il suo campanile barocco resta uno dei simboli di Mentone, raggiungibile dal lungomare attraverso Les Rampes Saint-Michel.", "Історичний центр виріс на пагорбі над морем, колись захищений мурами й домінований Basilica Saint-Michel-Archange. Її барокова дзвіниця досі є одним із символів Ментона, до якого ведуть сходи Les Rampes Saint-Michel від набережної."),
          t("Today the old town is a lived-in neighbourhood of narrow lanes, tall facades and shaded passages running down towards the market and the sea.", "Aujourd'hui, la vieille ville est un quartier habite, avec ruelles etroites, hautes facades et passages ombrages qui descendent vers le marche et la mer.", "Oggi il centro storico e un quartiere vissuto, fatto di vicoli stretti, facciate alte e passaggi ombreggiati che scendono verso il mercato e il mare.", "Сьогодні старе місто - це живий квартал із вузькими провулками, високими фасадами й затіненими проходами, що спускаються до ринку та моря."),
        ],
        relatedPlaceIds: ["rampes-saint-michel", "basilica-saint-michel-archange", "rue-saint-michel-menton"],
      },
      {
        heading: t("What to see as you walk", "Que voir en marchant", "Cosa vedere camminando", "Що побачити під час прогулянки"),
        body: [
          t("A simple route starts from the seafront, climbs Les Rampes Saint-Michel, pauses on the basilica square, then continues higher to the Cimetière du Vieux Château.", "Un itineraire simple part du front de mer, monte par les Rampes Saint-Michel, marque une pause sur la place de la basilique, puis continue plus haut vers le Cimetiere du Vieux Chateau.", "Un percorso semplice parte dal lungomare, sale per Les Rampes Saint-Michel, si ferma sulla piazza della basilica e poi continua verso il Cimetière du Vieux Château.", "Простий маршрут починається від набережної, піднімається Les Rampes Saint-Michel, робить паузу на площі біля базиліки, а потім веде вище до Cimetière du Vieux Château."),
          t("On the square, notice the patterned pebble pavement, the church facade and the neighbouring Chapelle des Pénitents Blancs. If the basilica is open, step inside for its Baroque interior and quiet, subdued light.", "Sur la place, observez le pavement de galets, la facade de l'eglise et la Chapelle des Penitents Blancs voisine. Si la basilique est ouverte, entrez pour voir son interieur baroque et sa lumiere calme.", "Sulla piazza, osserva il pavimento in ciottoli, la facciata della chiesa e la vicina Chapelle des Pénitents Blancs. Se la basilica e aperta, entra per il suo interno barocco e la luce raccolta.", "На площі зверніть увагу на візерункове мощення з гальки, фасад церкви та сусідню Chapelle des Pénitents Blancs. Якщо базиліка відкрита, зайдіть усередину заради барокового інтер'єру й тихого приглушеного світла."),
          t("From the cemetery above, views open over the harbour, the curve of the bay, Cap Martin and the hills near the Italian border. On the way down, wander through side streets for arches, old walls, laundry on balconies, potted plants and everyday life at doorways.", "Depuis le cimetiere au-dessus, la vue s'ouvre sur le port, la courbe de la baie, Cap Martin et les collines pres de la frontiere italienne. En redescendant, perdez-vous dans les ruelles pour les arches, les vieux murs, le linge aux balcons, les plantes en pot et la vie quotidienne aux portes.", "Dal cimitero in alto si aprono viste sul porto, la curva della baia, Cap Martin e le colline vicino al confine italiano. Scendendo, devia nei vicoli laterali per archi, vecchie mura, panni sui balconi, piante in vaso e vita quotidiana sulle soglie.", "З кладовища нагорі відкриваються види на порт, вигин бухти, Cap Martin і пагорби біля італійського кордону. Спускаючись, звертайте в бічні вулички: там арки, старі мури, білизна на балконах, вазони й повсякденне життя біля дверей."),
        ],
        relatedPlaceIds: ["rampes-saint-michel", "basilica-saint-michel-archange", "cimetiere-vieux-chateau", "musee-jean-cocteau-bastion", "salle-des-mariages-jean-cocteau", "musee-prehistoire-regionale-menton"],
      },
      {
        heading: t("Food stops and emblematic places", "Pauses gourmandes et adresses emblematiques", "Soste golose e luoghi simbolici", "Їжа й знакові місця"),
        body: [
          t("The old town is one of the easiest areas to try Menton specialities casually. Around Halles du Marché and the nearby streets, look for bakeries and snack counters selling pichade, pissaladière and barbajuans to eat between sights.", "La vieille ville est l'un des secteurs les plus simples pour gouter les specialites de Menton sans ceremonie. Autour des Halles du Marche et dans les rues voisines, cherchez boulangeries et comptoirs avec pichade, pissaladiere et barbajuans a manger entre deux visites.", "Il centro storico e una delle zone piu facili per assaggiare specialita mentonasche in modo informale. Intorno alle Halles du Marché e nelle vie vicine, cerca panetterie e banchi con pichade, pissaladiere e barbajuans da mangiare tra una tappa e l'altra.", "Старе місто - одне з найзручніших місць, щоб без формальностей спробувати ментонські спеціалітети. Біля Halles du Marché та на сусідніх вулицях шукайте пекарні й прилавки з pichade, pissaladière та barbajuans для перекусу між прогулянками."),
          t("For something sweet, look for lemon tarts, cakes and sometimes fougasse mentonnaise, a soft festive bread with candied fruit and orange blossom. Jam-makers such as Maison Herbin, close to the old town, specialise in citrus marmalades and traditional recipes; check current opening before planning around a specific shop.", "Pour le sucre, cherchez tartes au citron, gateaux et parfois fougasse mentonnaise, un pain doux de fete aux fruits confits et a la fleur d'oranger. Des confituriers comme Maison Herbin, pres de la vieille ville, travaillent les marmelades d'agrumes et les recettes traditionnelles; verifiez les horaires actuels avant d'organiser votre parcours autour d'une adresse precise.", "Per il dolce, cerca crostate al limone, torte e a volte fougasse mentonnaise, un pane morbido da festa con frutta candita e fiori d'arancio. Produttori come Maison Herbin, vicino al centro storico, sono specializzati in marmellate di agrumi e ricette tradizionali; controlla gli orari aggiornati prima di pianificare una visita a un negozio preciso.", "На солодке шукайте лимонні тарти, тістечка й інколи fougasse mentonnaise - м'який святковий хліб із цукатами та ароматом помаранчевого цвіту. Виробники джемів на кшталт Maison Herbin біля старого міста спеціалізуються на цитрусових мармеладах і традиційних рецептах; перед плануванням візиту до конкретної крамниці перевірте актуальний графік."),
          t("Pedestrian streets also have cafes and small restaurants where you can stop for coffee, a glass of wine or a simple lunch between walks.", "Les rues pietonnes comptent aussi des cafes et petits restaurants pour un cafe, un verre de vin ou un dejeuner simple entre deux promenades.", "Le vie pedonali hanno anche caffe e piccoli ristoranti dove fermarsi per un caffe, un bicchiere di vino o un pranzo semplice tra una passeggiata e l'altra.", "На пішохідних вулицях також є кав'ярні та невеликі ресторани, де можна зупинитися на каву, келих вина або простий обід між прогулянками."),
        ],
        relatedPlaceIds: ["halles-du-marche", "chez-mimi-menton", "maison-herbin-menton", "rue-saint-michel-menton", "plage-casino", "casino-barriere-menton"],
      },
      {
        heading: t("Souvenir and lemon shops", "Boutiques au citron et souvenirs", "Negozi al limone e souvenir", "Лимонні крамниці та сувеніри"),
        body: [
          t("If you want souvenirs that feel local rather than generic, focus on food and citrus products. In the pedestrian area, shops such as Au Pays du Citron specialise in Menton lemon products: limoncello, citrus wines, marmalades, olive oils, mustards, sweets and gift sets.", "Si vous cherchez des souvenirs plus locaux que generiques, concentrez-vous sur les produits alimentaires et les agrumes. Dans le secteur pieton, des boutiques comme Au Pays du Citron proposent des produits autour du citron de Menton: limoncello, vins d'agrumes, marmelades, huiles d'olive, moutardes, confiseries et coffrets.", "Se vuoi souvenir piu locali che generici, punta su prodotti gastronomici e agrumi. Nell'area pedonale, negozi come Au Pays du Citron sono specializzati nei prodotti al limone di Mentone: limoncello, vini agli agrumi, marmellate, oli d'oliva, mostarde, dolci e confezioni regalo.", "Якщо хочете сувеніри, що справді відчуваються локальними, обирайте їжу та цитрусові продукти. У пішохідній зоні крамниці на кшталт Au Pays du Citron спеціалізуються на продуктах із ментонських лимонів: limoncello, цитрусових винах, мармеладах, оливкових оліях, гірчицях, солодощах і подарункових наборах."),
          t("Selections and tastings change, so treat these shops as flexible stops rather than fixed appointments. Smaller delis and épiceries may also carry regional olive oils, tapenades, herbs and biscuits from Provence and Liguria.", "Les selections et degustations changent: voyez ces boutiques comme des pauses flexibles plutot que des rendez-vous fixes. De petites epiceries peuvent aussi proposer huiles d'olive regionales, tapenades, herbes et biscuits de Provence ou de Ligurie.", "Selezioni e degustazioni cambiano, quindi considera questi negozi come tappe flessibili piu che appuntamenti fissi. Piccole gastronomie ed epicerie possono avere anche oli d'oliva regionali, tapenade, erbe e biscotti dalla Provenza e dalla Liguria.", "Асортимент і дегустації змінюються, тож сприймайте такі крамниці як гнучкі зупинки, а не обов'язкові пункти маршруту. Невеликі делікатесні лавки також можуть мати регіональні оливкові олії, тапенади, трави та печиво з Провансу й Лігурії."),
          t("For non-food souvenirs, look for prints, ceramics and textiles with Menton or citrus motifs: they are easier to pack than fragile decorations and often feel more personal than standard magnets.", "Pour les souvenirs non alimentaires, cherchez affiches, ceramiques et textiles avec motifs de Menton ou d'agrumes: ils se glissent plus facilement dans les bagages que les objets fragiles et semblent souvent plus personnels que les magnets classiques.", "Per souvenir non gastronomici, cerca stampe, ceramiche e tessuti con motivi di Mentone o agrumi: sono piu facili da mettere in valigia rispetto agli oggetti fragili e spesso piu personali dei magneti standard.", "Для неїстівних сувенірів шукайте принти, кераміку й текстиль із мотивами Ментона або цитрусів: їх легше пакувати, ніж крихкі прикраси, і вони часто виглядають особистіше за стандартні магніти."),
        ],
      },
      {
        heading: t("Practical tips for enjoying the old town", "Conseils pratiques pour profiter de la vieille ville", "Consigli pratici per godersi il centro storico", "Практичні поради для старого міста"),
        body: [
          t("The old town is best visited on foot and slowly: there are many steps, but the distances are short. Comfortable shoes help on cobbles and staircases.", "La vieille ville se visite surtout a pied et lentement: il y a beaucoup de marches, mais les distances sont courtes. Des chaussures confortables aident sur les paves et les escaliers.", "Il centro storico si visita meglio a piedi e con calma: ci sono molte scale, ma le distanze sono brevi. Scarpe comode aiutano su ciottoli e scalinate.", "Старе місто найкраще відкривати пішки й без поспіху: сходів багато, але відстані короткі. Зручне взуття допоможе на бруківці та сходах."),
          t("In summer, mornings and late afternoons are usually more comfortable than midday, both for heat and for photography. It is easy to combine an old-town loop with the market in the morning or a swim at Plage des Sablettes afterwards.", "En ete, les matins et fins d'apres-midi sont souvent plus agreables que le plein midi, pour la chaleur comme pour les photos. Il est facile de combiner une boucle dans la vieille ville avec le marche le matin ou une baignade a Plage des Sablettes ensuite.", "In estate, mattina e tardo pomeriggio sono di solito piu piacevoli del mezzogiorno, sia per il caldo sia per le foto. E facile combinare un giro nel centro storico con il mercato al mattino o un bagno a Plage des Sablettes dopo.", "Улітку ранок і пізній пообідній час зазвичай комфортніші за полудень - і через спеку, і для фото. Легко поєднати прогулянку старим містом із ранковим ринком або купанням на Plage des Sablettes після цього."),
          t("If you are staying nearby, return at different times of day: once for quieter streets and viewpoints, once in the evening when the facades are lit and the cafes below the old town become busier.", "Si vous logez a proximite, revenez a differents moments: une fois pour les rues calmes et les points de vue, une autre le soir quand les facades s'allument et que les cafes sous la vieille ville s'animent.", "Se soggiorni vicino, torna in momenti diversi: una volta per le strade tranquille e i belvedere, un'altra la sera quando le facciate si illuminano e i caffe sotto il centro storico si animano.", "Якщо зупинилися поруч, поверніться сюди в різний час: одного разу заради тихіших вулиць і краєвидів, іншого - ввечері, коли фасади підсвічені, а кафе під старим містом стають жвавішими."),
        ],
        relatedPlaceIds: ["plage-sablettes", "plage-casino", "casino-barriere-menton", "promenade-du-soleil"],
      },
    ],
    practicalTips: [
      t("Wear comfortable shoes: the old town has steps, cobbles and short uphill sections.", "Portez des chaussures confortables: la vieille ville a des marches, des paves et de courtes montees.", "Indossa scarpe comode: il centro storico ha scale, ciottoli e brevi tratti in salita.", "Візьміть зручне взуття: у старому місті є сходи, бруківка й короткі підйоми."),
      t("Visit in the morning or late afternoon in summer for easier light and less heat.", "En ete, venez le matin ou en fin d'apres-midi pour une lumiere plus douce et moins de chaleur.", "In estate, visita al mattino o nel tardo pomeriggio per luce migliore e meno caldo.", "Улітку приходьте зранку або ближче до вечора: світло м'якше, а спеки менше."),
      t("Combine the walk with Halles du Marché, Plage des Sablettes or a slow evening on Promenade du Soleil.", "Combinez la balade avec les Halles du Marche, Plage des Sablettes ou une soiree lente sur la Promenade du Soleil.", "Abbina la passeggiata alle Halles du Marché, a Plage des Sablettes o a una serata lenta sulla Promenade du Soleil.", "Поєднайте прогулянку з Halles du Marché, Plage des Sablettes або повільним вечором на Promenade du Soleil."),
    ],
  }),
  shortArticle({
    id: "useful-apps-websites-menton-monaco-italian-riviera",
    slug: "useful-apps-websites-menton-monaco-italian-riviera",
    title: t("Useful apps and websites for Menton, Monaco and the Italian Riviera", "Applications et sites utiles pour Menton, Monaco et la Riviera italienne", "App e siti utili per Mentone, Monaco e Riviera italiana", "Корисні застосунки й сайти для Ментона, Монако та Італійської Рив'єри"),
    seoTitle: t("Useful Apps and Websites for Menton, Monaco and the Italian Riviera", "Applications et sites utiles pour Menton, Monaco et la Riviera italienne", "App e siti utili per Mentone, Monaco e Riviera italiana", "Корисні застосунки й сайти для Ментона, Монако та Італійської Рив'єри"),
    seoDescription: t("A practical guide to the best apps and websites for visiting Menton: trains, buses, weather, parking, restaurants, events, translation, emergencies, Monaco, Nice and Italy.", "Guide pratique des meilleures applications et sites pour Menton: trains, bus, meteo, parking, restaurants, evenements, traduction, urgences, Monaco, Nice et Italie.", "Guida pratica alle migliori app e siti per Mentone: treni, bus, meteo, parcheggi, ristoranti, eventi, traduzione, emergenze, Monaco, Nizza e Italia.", "Практичний гід по найкорисніших застосунках і сайтах для Ментона: потяги, автобуси, погода, паркування, ресторани, події, переклад, екстрені контакти, Монако, Ніцца й Італія."),
    excerpt: t("A simple digital toolkit for visitors: transport, maps, weather, restaurants, parking, events, translation and emergency information without downloading too many apps.", "Une boite a outils numerique simple pour les visiteurs: transports, cartes, meteo, restaurants, parking, evenements, traduction et urgences sans multiplier les applications.", "Un kit digitale semplice per visitatori: trasporti, mappe, meteo, ristoranti, parcheggi, eventi, traduzione ed emergenze senza scaricare troppe app.", "Простий цифровий набір для гостей: транспорт, карти, погода, ресторани, паркування, події, переклад і екстрена інформація без десятків зайвих застосунків."),
    category: "practical",
    coverImage: "/images/guide/useful-apps-websites-menton-monaco-italian-riviera.jpg",
    coverImageAlt: t("Illustration of useful apps and websites for Menton", "Illustration des applications et sites utiles pour Menton", "Illustrazione di app e siti utili per Mentone", "Ілюстрація корисних застосунків і сайтів для Ментона"),
    visualTheme: "transport",
    visualStatus: "project_illustration",
    tags: [
      t("apps", "applications", "app", "застосунки"),
      t("websites", "sites web", "siti web", "сайти"),
      t("transport", "transport", "trasporti", "транспорт"),
      t("weather", "meteo", "meteo", "погода"),
      t("parking", "parking", "parcheggio", "паркування"),
      t("Monaco", "Monaco", "Monaco", "Монако"),
      t("Italy", "Italie", "Italia", "Італія"),
    ],
    bestFor: [guideBestForOptions[3].label, guideBestForOptions[4].label, guideBestForOptions[1].label, guideBestForOptions[8].label, guideBestForOptions[10].label, guideBestForOptions[11].label],
    duration: "reference",
    locationTags: ["menton-centre", "monaco", "nice", "italian-riviera"],
    sourceStatus: "needs_verification",
    relatedPlaces: [
      "office-tourisme-menton-riviera-merveilles",
      "centre-hospitalier-la-palmosa-menton",
      "commissariat-police-menton",
      "monaco-monte-carlo",
      "nice-old-town",
      "ventimiglia",
      "bordighera",
      "sanremo",
      "intermarche-hyper-menton",
      "carrefour-city-felix-faure",
    ],
    relatedArticles: [
      "fete-du-citron-menton-practical-guide",
      "public-transport-in-menton",
      "how-to-get-to-menton-from-nice-airport",
      "menton-without-a-car",
      "italian-riviera-day-trip-from-menton",
      "day-trips-from-menton",
      "useful-numbers-emergency-contacts-menton",
      "stay-cool-in-menton-summer",
      "supermarkets-in-menton",
      "best-souvenir-shops-menton-monaco-nice",
      "tennis-padel-courts-menton",
      "michelin-restaurants-menton-nice-monaco",
      "cinemas-in-menton-nice-monaco",
      "museums-in-menton-nice-monaco",
      "where-to-stay-in-menton",
    ],
    relatedApartments: allApartments,
    appTools: [
      {
        id: "sncf-connect",
        name: "SNCF Connect",
        image: "/images/guide/app-sncf-connect.jpg",
        imageAlt: t("SNCF Connect app card illustration", "Illustration de la carte de l'application SNCF Connect", "Illustrazione della scheda app SNCF Connect", "Ілюстрація картки застосунку SNCF Connect"),
        useFor: t("French train times, tickets and live traffic between Menton, Monaco, Nice and the rest of France.", "Horaires, billets et trafic en direct pour les trains francais entre Menton, Monaco, Nice et le reste de la France.", "Orari, biglietti e traffico in tempo reale per i treni francesi tra Mentone, Monaco, Nizza e il resto della Francia.", "Розклад, квитки й live traffic для французьких потягів між Ментоном, Монако, Ніццою та рештою Франції."),
        bestFor: t("Regional train days", "Journees en train regional", "Giornate in treno regionale", "Дні з регіональними потягами"),
        visualTheme: "transport",
        iosUrl: "https://apps.apple.com/app/sncf-connect-trains-routes/id343889987",
        androidUrl: "https://play.google.com/store/apps/details?id=com.vsct.vsc.mobile.horaireetresa.android",
      },
      {
        id: "trenitalia",
        name: "Trenitalia",
        image: "/images/guide/app-trenitalia.jpg",
        imageAlt: t("Trenitalia app card illustration", "Illustration de la carte de l'application Trenitalia", "Illustrazione della scheda app Trenitalia", "Ілюстрація картки застосунку Trenitalia"),
        useFor: t("Italian regional trains for Ventimiglia, Bordighera, Sanremo and longer Ligurian trips.", "Trains regionaux italiens pour Vintimille, Bordighera, Sanremo et les trajets plus longs en Ligurie.", "Treni regionali italiani per Ventimiglia, Bordighera, Sanremo e viaggi liguri piu lunghi.", "Італійські регіональні потяги до Ventimiglia, Bordighera, Sanremo та довших поїздок Лігурією."),
        bestFor: t("Italy day trips", "Excursions en Italie", "Gite in Italia", "Поїздки в Італію"),
        visualTheme: "transport",
        iosUrl: "https://apps.apple.com/app/trenitalia/id331050847",
        androidUrl: "https://play.google.com/store/apps/details?id=com.lynxspa.prontotreno",
      },
      {
        id: "google-maps",
        name: "Google Maps",
        image: "/images/guide/app-google-maps.jpg",
        imageAlt: t("Google Maps app card illustration", "Illustration de la carte de l'application Google Maps", "Illustrazione della scheda app Google Maps", "Ілюстрація картки застосунку Google Maps"),
        useFor: t("Offline maps, walking routes, restaurants, pharmacies, supermarkets and saved apartment addresses.", "Cartes hors ligne, itineraires a pied, restaurants, pharmacies, supermarches et adresses d'appartement sauvegardees.", "Mappe offline, percorsi a piedi, ristoranti, farmacie, supermercati e indirizzi appartamento salvati.", "Offline maps, пішохідні маршрути, ресторани, аптеки, супермаркети й збережені адреси апартаментів."),
        bestFor: t("Everyday orientation", "Orientation quotidienne", "Orientamento quotidiano", "Щоденна навігація"),
        visualTheme: "walk",
        iosUrl: "https://apps.apple.com/app/google-maps/id585027354",
        androidUrl: "https://play.google.com/store/apps/details?id=com.google.android.apps.maps",
      },
      {
        id: "meteo-france",
        name: "Meteo-France",
        image: "/images/guide/app-meteo-france.jpg",
        imageAlt: t("Meteo-France app card illustration", "Illustration de la carte de l'application Meteo-France", "Illustrazione della scheda app Meteo-France", "Ілюстрація картки застосунку Meteo-France"),
        useFor: t("Official French forecasts, Vigilance alerts, heat, storms and rain timing.", "Previsions officielles francaises, Vigilance, chaleur, orages et horaires de pluie.", "Previsioni ufficiali francesi, allerte Vigilance, caldo, temporali e pioggia.", "Офіційний французький прогноз, Vigilance alerts, спека, грози й час дощу."),
        bestFor: t("Summer and storm planning", "Plans d'ete et d'orage", "Piani estivi e temporali", "Літні плани й грози"),
        visualTheme: "sea",
        iosUrl: "https://apps.apple.com/app/meteo-france/id376197239",
        androidUrl: "https://play.google.com/store/apps/details?id=fr.meteo",
      },
      {
        id: "windy",
        name: "Windy",
        image: "/images/guide/app-windy.jpg",
        imageAlt: t("Windy app card illustration", "Illustration de la carte de l'application Windy", "Illustrazione della scheda app Windy", "Ілюстрація картки застосунку Windy"),
        useFor: t("Wind, sea, waves and rain radar when beach, boat or photography plans depend on conditions.", "Vent, mer, vagues et radar de pluie quand plage, bateau ou photos dependent des conditions.", "Vento, mare, onde e radar pioggia quando spiaggia, barca o foto dipendono dalle condizioni.", "Вітер, море, хвилі й rain radar, коли пляж, човен або фото залежать від умов."),
        bestFor: t("Sea and weather detail", "Details mer et meteo", "Dettagli mare e meteo", "Море й детальна погода"),
        visualTheme: "sea",
        iosUrl: "https://apps.apple.com/app/windy-com-weather-radar/id1161387262",
        androidUrl: "https://play.google.com/store/apps/details?id=com.windyty.android",
      },
      {
        id: "thefork",
        name: "TheFork",
        image: "/images/guide/app-thefork.jpg",
        imageAlt: t("TheFork app card illustration", "Illustration de la carte de l'application TheFork", "Illustrazione della scheda app TheFork", "Ілюстрація картки застосунку TheFork"),
        useFor: t("Restaurant availability, booking slots and a quick second check before calling directly.", "Disponibilites de restaurants, creneaux de reservation et verification rapide avant d'appeler directement.", "Disponibilita ristoranti, slot di prenotazione e controllo rapido prima di chiamare direttamente.", "Доступність ресторанів, слоти бронювання й швидка перевірка перед прямим дзвінком."),
        bestFor: t("Easy restaurant booking", "Reservation simple", "Prenotazioni facili", "Прості бронювання ресторанів"),
        visualTheme: "food",
        iosUrl: "https://apps.apple.com/app/thefork-restaurant-bookings/id424850908",
        androidUrl: "https://play.google.com/store/apps/details?id=com.lafourchette.lafourchette",
      },
      {
        id: "michelin-guide",
        name: "MICHELIN Guide",
        image: "/images/guide/app-michelin-guide.jpg",
        imageAlt: t("MICHELIN Guide app card illustration", "Illustration de la carte de l'application Guide MICHELIN", "Illustrazione della scheda app Guida MICHELIN", "Ілюстрація картки застосунку MICHELIN Guide"),
        useFor: t("Selected restaurants, Bib Gourmand addresses, starred dining and hotel notes around Menton, Monaco and Nice.", "Restaurants selectionnes, Bib Gourmand, tables etoilees et notes d'hotels autour de Menton, Monaco et Nice.", "Ristoranti selezionati, Bib Gourmand, stellati e note hotel tra Mentone, Monaco e Nizza.", "Selected restaurants, Bib Gourmand, зіркові ресторани й готелі навколо Ментона, Монако та Ніцци."),
        bestFor: t("Special meals", "Repas particuliers", "Pasti speciali", "Особливі вечері"),
        visualTheme: "food",
        iosUrl: "https://apps.apple.com/app/michelin-guide-hotels-restaurants/id1541129177",
        androidUrl: "https://play.google.com/store/apps/details?id=com.viamichelin.android.gm21",
      },
      {
        id: "monapass",
        name: "Monapass",
        image: "/images/guide/app-monapass.jpg",
        imageAlt: t("Monapass app card illustration", "Illustration de la carte de l'application Monapass", "Illustrazione della scheda app Monapass", "Ілюстрація картки застосунку Monapass"),
        useFor: t("Monaco mobility, public transport and local ticketing in one official app.", "Mobilite, transport public et billetterie locale de Monaco dans une application officielle.", "Mobilita, trasporto pubblico e biglietteria locale di Monaco in un'app ufficiale.", "Мобільність Монако, громадський транспорт і локальні квитки в одному офіційному застосунку."),
        bestFor: t("Monaco days", "Journees a Monaco", "Giornate a Monaco", "Дні в Монако"),
        visualTheme: "transport",
        iosUrl: "https://apps.apple.com/app/monapass/id1542802881",
        androidUrl: "https://play.google.com/store/apps/details?id=group.flowbird.monaco",
      },
      {
        id: "lignes-dazur",
        name: "Lignes d'Azur",
        image: "/images/guide/app-lignes-dazur.jpg",
        imageAlt: t("Lignes d'Azur app card illustration", "Illustration de la carte de l'application Lignes d'Azur", "Illustrazione della scheda app Lignes d'Azur", "Ілюстрація картки застосунку Lignes d'Azur"),
        useFor: t("Nice tram and bus planning when you go beyond the train station.", "Tram et bus a Nice quand vous allez au-dela de la gare.", "Tram e bus a Nizza quando vai oltre la stazione.", "Трамваї й автобуси Ніцци, якщо ви їдете далі за вокзал."),
        bestFor: t("Nice city transport", "Transport urbain a Nice", "Trasporto urbano a Nizza", "Міський транспорт Ніцци"),
        visualTheme: "transport",
        iosUrl: "https://apps.apple.com/app/lignes-dazur-mobile/id423316741",
        androidUrl: "https://play.google.com/store/apps/details?id=eu.mobeepass.nfcniceticket",
      },
      {
        id: "paybyphone",
        name: "PayByPhone",
        image: "/images/guide/app-paybyphone.jpg",
        imageAlt: t("PayByPhone app card illustration", "Illustration de la carte de l'application PayByPhone", "Illustrazione della scheda app PayByPhone", "Ілюстрація картки застосунку PayByPhone"),
        useFor: t("Paid on-street parking sessions in Menton, Nice and other supported towns.", "Stationnement payant en voirie a Menton, Nice et autres villes compatibles.", "Parcheggio su strada a pagamento a Mentone, Nizza e altre citta supportate.", "Платне вуличне паркування в Ментоні, Ніцці та інших підтримуваних містах."),
        bestFor: t("Drivers", "Conducteurs", "Chi guida", "Для водіїв"),
        visualTheme: "transport",
        iosUrl: "https://apps.apple.com/app/paybyphone-parking/id448474183",
        androidUrl: "https://play.google.com/store/apps/details?id=com.paybyphone",
      },
      {
        id: "google-translate",
        name: "Google Translate",
        image: "/images/guide/app-google-translate.jpg",
        imageAlt: t("Google Translate app card illustration", "Illustration de la carte de l'application Google Translate", "Illustrazione della scheda app Google Translate", "Ілюстрація картки застосунку Google Translate"),
        useFor: t("Camera translation, menus, pharmacy labels, offline language packs and quick spoken phrases.", "Traduction camera, menus, etiquettes de pharmacie, packs hors ligne et phrases rapides.", "Traduzione con camera, menu, etichette in farmacia, pacchetti offline e frasi rapide.", "Camera translation, меню, аптечні етикетки, offline мовні пакети й короткі фрази."),
        bestFor: t("Fast practical translation", "Traduction pratique rapide", "Traduzione pratica veloce", "Швидкий практичний переклад"),
        visualTheme: "itinerary",
        iosUrl: "https://apps.apple.com/app/google-translate/id414706506",
        androidUrl: "https://play.google.com/store/apps/details?id=com.google.android.apps.translate",
      },
      {
        id: "deepl",
        name: "DeepL",
        image: "/images/guide/app-deepl.jpg",
        imageAlt: t("DeepL app card illustration", "Illustration de la carte de l'application DeepL", "Illustrazione della scheda app DeepL", "Ілюстрація картки застосунку DeepL"),
        useFor: t("More natural written messages in French, Italian, English and Ukrainian.", "Messages ecrits plus naturels en francais, italien, anglais et ukrainien.", "Messaggi scritti piu naturali in francese, italiano, inglese e ucraino.", "Природніші письмові повідомлення французькою, італійською, англійською та українською."),
        bestFor: t("Messages and longer text", "Messages et textes plus longs", "Messaggi e testi piu lunghi", "Повідомлення й довші тексти"),
        visualTheme: "itinerary",
        iosUrl: "https://apps.apple.com/app/deepl-translate/id1552407475",
        androidUrl: "https://play.google.com/store/apps/details?id=com.deepl.mobiletranslator",
      },
    ],
    sections: [
      {
        heading: t("The essential shortlist", "La selection essentielle", "La selezione essenziale", "Найважливіший короткий список"),
        body: [
          t("You do not need dozens of downloads for Menton. Start with a small toolkit that covers trains, buses, maps, weather, translation, restaurants, parking and emergency information.", "Vous n'avez pas besoin de dizaines d'applications pour Menton. Commencez par une petite boite a outils: trains, bus, cartes, meteo, traduction, restaurants, parking et urgences.", "Non servono decine di app per Mentone. Parti da un kit piccolo: treni, bus, mappe, meteo, traduzione, ristoranti, parcheggi ed emergenze.", "Для Ментона не потрібні десятки застосунків. Почніть із малого набору: потяги, автобуси, карти, погода, переклад, ресторани, паркування й екстрена інформація."),
          t("For most guests, the core setup is SNCF Connect, Google Maps with offline maps, Meteo-France, Google Translate or DeepL, plus Trenitalia for Italy, ZOU or Bus 80 information for airport bus planning, and PayByPhone if you drive.", "Pour la plupart des voyageurs: SNCF Connect, Google Maps avec cartes hors ligne, Meteo-France, Google Translate ou DeepL, puis Trenitalia pour l'Italie, ZOU ou Bus 80 pour le bus aeroport, et PayByPhone si vous conduisez.", "Per la maggior parte degli ospiti: SNCF Connect, Google Maps con mappe offline, Meteo-France, Google Translate o DeepL, poi Trenitalia per l'Italia, ZOU o Bus 80 per l'aeroporto e PayByPhone se guidi.", "Для більшості гостей достатньо SNCF Connect, Google Maps з offline maps, Meteo-France, Google Translate або DeepL, Trenitalia для Італії, ZOU або Bus 80 для аеропорту та PayByPhone, якщо ви за кермом."),
        ],
        bullets: [
          t("Transport: SNCF Connect, ZOU / Bus 80, Trenitalia, Lignes d'Azur", "Transport: SNCF Connect, ZOU / Bus 80, Trenitalia, Lignes d'Azur", "Trasporti: SNCF Connect, ZOU / Bus 80, Trenitalia, Lignes d'Azur", "Транспорт: SNCF Connect, ZOU / Bus 80, Trenitalia, Lignes d'Azur"),
          t("Daily planning: Google Maps, Meteo-France, Windy", "Organisation: Google Maps, Meteo-France, Windy", "Organizzazione: Google Maps, Meteo-France, Windy", "Планування: Google Maps, Meteo-France, Windy"),
          t("Restaurants: Google Maps, TheFork, MICHELIN Guide and restaurant websites", "Restaurants: Google Maps, TheFork, Guide MICHELIN et sites des restaurants", "Ristoranti: Google Maps, TheFork, Guida MICHELIN e siti dei ristoranti", "Ресторани: Google Maps, TheFork, MICHELIN Guide і сайти ресторанів"),
          t("Safety and language: Service Public, Sante.fr, 3237, Google Translate, DeepL", "Securite et langue: Service Public, Sante.fr, 3237, Google Translate, DeepL", "Sicurezza e lingua: Service Public, Sante.fr, 3237, Google Translate, DeepL", "Безпека й мова: Service Public, Sante.fr, 3237, Google Translate, DeepL"),
        ],
      },
      {
        heading: t("Trains, buses and airport arrivals", "Trains, bus et arrivees aeroport", "Treni, bus e arrivi in aeroporto", "Потяги, автобуси й прибуття з аеропорту"),
        body: [
          t("SNCF Connect is the main tool for French trains from Menton to Monaco, Nice, Villefranche-sur-Mer, Antibes and Cannes. Use it to check timetables, buy tickets, watch delays and plan your return before a late dinner.", "SNCF Connect est l'outil principal pour les trains francais de Menton vers Monaco, Nice, Villefranche-sur-Mer, Antibes et Cannes. Utilisez-le pour horaires, billets, retards et retour avant un diner tardif.", "SNCF Connect e lo strumento principale per i treni francesi da Mentone a Monaco, Nizza, Villefranche-sur-Mer, Antibes e Cannes. Usalo per orari, biglietti, ritardi e ritorno prima di una cena tardi.", "SNCF Connect - головний інструмент для французьких потягів з Ментона до Монако, Ніцци, Villefranche-sur-Mer, Antibes і Cannes. Використовуйте його для розкладу, квитків, затримок і повернення після пізньої вечері."),
          t("For Nice Airport, check current ZOU and Nice Airport Express / Bus 80 information before travelling. Airport routes, payment rules and terminal stops can change, so verify close to your arrival date.", "Pour l'aeroport de Nice, verifiez les informations actuelles ZOU et Nice Airport Express / Bus 80 avant le voyage. Lignes aeroport, paiement et arrets de terminal peuvent changer: controlez pres de la date.", "Per l'aeroporto di Nizza controlla ZOU e Nice Airport Express / Bus 80 prima del viaggio. Percorsi, pagamenti e fermate ai terminal possono cambiare: verifica vicino alla data.", "Для аеропорту Ніцци перевіряйте ZOU та Nice Airport Express / Bus 80 перед поїздкою. Маршрути, оплата й зупинки терміналів можуть змінюватися, тому перевіряйте ближче до дати."),
          t("For Italy, Trenitalia is the practical app and website for Ventimiglia, Bordighera, Sanremo and longer Ligurian trips. Check current regional ticket rules before boarding.", "Pour l'Italie, Trenitalia est l'application et le site pratiques pour Vintimille, Bordighera, Sanremo et les trajets ligures plus longs. Verifiez les regles actuelles des billets regionaux avant de monter.", "Per l'Italia, Trenitalia e l'app e sito pratico per Ventimiglia, Bordighera, Sanremo e viaggi liguri piu lunghi. Controlla le regole attuali dei biglietti regionali prima di salire.", "Для Італії Trenitalia - практичний застосунок і сайт для Ventimiglia, Bordighera, Sanremo та довших лігурійських поїздок. Перед посадкою перевіряйте актуальні правила регіональних квитків."),
        ],
        relatedPlaceIds: ["monaco-monte-carlo", "nice-old-town", "ventimiglia", "bordighera", "sanremo"],
      },
      {
        heading: t("Maps, driving and parking", "Cartes, conduite et parking", "Mappe, guida e parcheggi", "Карти, авто й паркування"),
        body: [
          t("Google Maps is the fastest everyday tool in Menton: save your apartment, train station, nearest supermarket, pharmacy, beach, tourist office, hospital and restaurants. Download offline maps for Menton, Monaco, Nice, Ventimiglia and Bordighera before arrival.", "Google Maps est l'outil quotidien le plus rapide a Menton: sauvegardez appartement, gare, supermarche proche, pharmacie, plage, office de tourisme, hopital et restaurants. Telechargez les cartes hors ligne de Menton, Monaco, Nice, Vintimille et Bordighera avant l'arrivee.", "Google Maps e lo strumento quotidiano piu rapido a Mentone: salva appartamento, stazione, supermercato vicino, farmacia, spiaggia, ufficio turistico, ospedale e ristoranti. Scarica mappe offline di Mentone, Monaco, Nizza, Ventimiglia e Bordighera prima dell'arrivo.", "Google Maps - найшвидший щоденний інструмент у Ментоні: збережіть апартаменти, вокзал, найближчий супермаркет, аптеку, пляж, туристичний офіс, лікарню і ресторани. Завантажте offline maps Ментона, Монако, Ніцци, Вентімільї та Бордігери до приїзду."),
          t("If you drive, use Google Maps, Apple Maps or Waze for traffic, then official parking pages for the final decision. PayByPhone is useful for paid on-street parking in Menton or Nice, while Parkings.mc is the safer starting point for Monaco car parks.", "Si vous conduisez, utilisez Google Maps, Apple Maps ou Waze pour le trafic, puis les pages officielles de parking pour la decision finale. PayByPhone est utile pour le stationnement payant en voirie a Menton ou Nice; Parkings.mc est le meilleur depart pour Monaco.", "Se guidi, usa Google Maps, Apple Maps o Waze per il traffico, poi pagine ufficiali dei parcheggi per decidere. PayByPhone e utile per parcheggi su strada a Mentone o Nizza; Parkings.mc e il punto di partenza per Monaco.", "Якщо ви за кермом, використовуйте Google Maps, Apple Maps або Waze для трафіку, а фінально перевіряйте офіційні сторінки паркування. PayByPhone корисний для платних вуличних зон у Ментоні або Ніцці, Parkings.mc - для паркінгів Монако."),
        ],
        relatedPlaceIds: ["office-tourisme-menton-riviera-merveilles", "intermarche-hyper-menton", "carrefour-city-felix-faure", "monaco-monte-carlo"],
      },
      {
        heading: t("Weather, heat and outdoor plans", "Meteo, chaleur et plans dehors", "Meteo, caldo e piani all'aperto", "Погода, спека й плани на вулиці"),
        body: [
          t("Meteo-France is the most important weather source for France, especially for Vigilance alerts, heatwaves, storms and rain. In summer, do not just check the temperature: look at alerts and the shape of the day.", "Meteo-France est la source meteo la plus importante en France, surtout pour Vigilance, canicules, orages et pluie. En ete, ne regardez pas seulement la temperature: regardez les alertes et le rythme de la journee.", "Meteo-France e la fonte meteo piu importante in Francia, soprattutto per Vigilance, caldo, temporali e pioggia. In estate non guardare solo la temperatura: controlla avvisi e andamento della giornata.", "Meteo-France - найважливіше джерело погоди у Франції, особливо для Vigilance, спеки, гроз і дощу. Влітку дивіться не лише температуру: перевіряйте попередження й ритм дня."),
          t("Windy is useful when sea, wind, waves, rain radar or photography light matters. If wind or sea conditions look difficult, switch to a garden, museum, cinema or old-town plan instead of a beach-heavy day.", "Windy est utile quand mer, vent, vagues, radar de pluie ou lumiere photo comptent. Si vent ou mer semblent difficiles, choisissez jardin, musee, cinema ou vieille ville plutot qu'une journee tres plage.", "Windy e utile quando contano mare, vento, onde, radar pioggia o luce per foto. Se vento o mare sembrano difficili, scegli giardino, museo, cinema o centro storico invece di una giornata solo spiaggia.", "Windy корисний, коли важливі море, вітер, хвилі, radar дощу або світло для фото. Якщо вітер чи море складні, оберіть сад, музей, кіно або старе місто замість пляжного дня."),
        ],
        relatedPlaceIds: ["plage-sablettes", "promenade-du-soleil", "jardin-val-rahmeh", "musee-jean-cocteau-bastion"],
      },
      {
        heading: t("Restaurants, events and Monaco tools", "Restaurants, evenements et outils Monaco", "Ristoranti, eventi e strumenti Monaco", "Ресторани, події й інструменти Монако"),
        body: [
          t("For restaurants, use Google Maps for nearby choices and current hours, TheFork for quick availability, and the MICHELIN Guide for starred, Bib Gourmand or selected restaurants. For important meals, always check the restaurant's own website too.", "Pour les restaurants, utilisez Google Maps pour les choix proches et horaires actuels, TheFork pour disponibilites rapides et le Guide MICHELIN pour etoiles, Bib Gourmand ou selection. Pour les repas importants, verifiez aussi le site du restaurant.", "Per ristoranti usa Google Maps per scelte vicine e orari, TheFork per disponibilita rapida e Guida MICHELIN per stelle, Bib Gourmand o selezione. Per pasti importanti controlla sempre anche il sito del ristorante.", "Для ресторанів використовуйте Google Maps для найближчих варіантів і годин, TheFork для швидкої доступності та MICHELIN Guide для зірок, Bib Gourmand або selected. Для важливих вечерь завжди перевіряйте сайт ресторану."),
          t("For Monaco, official tools are usually best: Visit Monaco for events, Monapass for mobility and ticketing, Monaco Bus for routes, and Parkings.mc for car parks. For Nice, use Lignes d'Azur when you need trams or buses beyond the train station.", "Pour Monaco, les outils officiels sont souvent les meilleurs: Visit Monaco pour evenements, Monapass pour mobilite et billetterie, Monaco Bus pour lignes, Parkings.mc pour parkings. Pour Nice, utilisez Lignes d'Azur pour trams et bus au-dela de la gare.", "Per Monaco gli strumenti ufficiali sono spesso migliori: Visit Monaco per eventi, Monapass per mobilita e biglietti, Monaco Bus per linee, Parkings.mc per parcheggi. Per Nizza usa Lignes d'Azur per tram e bus oltre la stazione.", "Для Монако найкращі офіційні інструменти: Visit Monaco для подій, Monapass для мобільності й квитків, Monaco Bus для маршрутів, Parkings.mc для паркінгів. Для Ніцци використовуйте Lignes d'Azur для трамваїв і автобусів за межами вокзалу."),
        ],
        relatedPlaceIds: ["mirazur-menton", "orangerie-menton", "le-louis-xv-monaco", "flaveur-nice", "monaco-monte-carlo", "nice-old-town"],
      },
      {
        heading: t("Translation, emergency information and what to save", "Traduction, urgences et quoi sauvegarder", "Traduzione, emergenze e cosa salvare", "Переклад, екстрена інформація і що зберегти"),
        body: [
          t("Google Translate is useful for camera translation, offline packs, menus, pharmacy labels and quick conversations. DeepL is useful for more natural written messages in French, Italian, English and Ukrainian.", "Google Translate est utile pour traduction camera, packs hors ligne, menus, etiquettes de pharmacie et conversations rapides. DeepL est utile pour des messages ecrits plus naturels en francais, italien, anglais et ukrainien.", "Google Translate e utile per traduzione camera, pacchetti offline, menu, etichette in farmacia e conversazioni rapide. DeepL e utile per messaggi scritti piu naturali in francese, italiano, inglese e ucraino.", "Google Translate корисний для camera translation, offline packs, меню, аптечних етикеток і коротких розмов. DeepL корисний для природніших письмових повідомлень французькою, італійською, англійською та українською."),
          t("For emergencies, do not waste time comparing travel apps. Save the French emergency numbers, Sante.fr, 3237 for on-duty pharmacies, the Menton hospital, police station, tourist office, apartment address, passport copy and insurance details before arrival.", "Pour les urgences, ne perdez pas de temps a comparer des apps de voyage. Sauvegardez numeros d'urgence francais, Sante.fr, 3237 pour pharmacies de garde, hopital de Menton, commissariat, office de tourisme, adresse de l'appartement, copie du passeport et assurance.", "Per emergenze non perdere tempo confrontando app di viaggio. Salva numeri francesi, Sante.fr, 3237 per farmacie di turno, ospedale di Mentone, polizia, ufficio turistico, indirizzo appartamento, copia passaporto e assicurazione.", "В екстрених ситуаціях не витрачайте час на travel apps. Заздалегідь збережіть французькі екстрені номери, Sante.fr, 3237 для чергових аптек, лікарню Ментона, поліцію, tourist office, адресу апартаментів, копію паспорта й страховку."),
        ],
        relatedPlaceIds: ["centre-hospitalier-la-palmosa-menton", "commissariat-police-menton", "office-tourisme-menton-riviera-merveilles"],
        relatedApartmentKeys: allApartments,
      },
      {
        heading: t("Set up your phone before arrival", "Preparer son telephone avant l'arrivee", "Prepara il telefono prima dell'arrivo", "Підготуйте телефон до приїзду"),
        body: [
          t("Take 20 minutes before your trip: install the few apps you need, download offline maps for Menton-Monaco-Nice-Italy, save translation language packs, store your apartment address, travel insurance, passport copy and emergency contacts offline.", "Prenez 20 minutes avant le voyage: installez les quelques apps utiles, telechargez les cartes hors ligne Menton-Monaco-Nice-Italie, sauvegardez les langues de traduction, adresse de l'appartement, assurance, copie du passeport et contacts d'urgence hors ligne.", "Prenditi 20 minuti prima del viaggio: installa poche app utili, scarica mappe offline Mentone-Monaco-Nizza-Italia, salva lingue di traduzione, indirizzo appartamento, assicurazione, copia passaporto e contatti emergenza offline.", "Виділіть 20 хвилин до поїздки: встановіть кілька потрібних застосунків, завантажте offline maps Menton-Monaco-Nice-Italy, мовні пакети, адресу апартаментів, страховку, копію паспорта й екстрені контакти офлайн."),
          t("The best apps are not the ones with the most features. They are the ones that answer real travel questions quickly: is the train running, is the bus useful, where is the nearest pharmacy, is the restaurant open, will the weather be too hot, and where can I park?", "Les meilleures apps ne sont pas celles qui ont le plus de fonctions. Ce sont celles qui repondent vite aux vraies questions: train, bus, pharmacie proche, restaurant ouvert, chaleur, parking.", "Le app migliori non sono quelle con piu funzioni. Sono quelle che rispondono rapidamente a domande reali: treno, bus, farmacia vicina, ristorante aperto, caldo, parcheggio.", "Найкращі застосунки - не ті, що мають найбільше функцій. Це ті, що швидко відповідають на реальні питання: чи йде потяг, чи корисний автобус, де найближча аптека, чи відкритий ресторан, чи буде надто спекотно, де припаркуватися."),
        ],
      },
    ],
    practicalTips: [
      t("Download offline maps before arrival, especially if you plan Monaco, Nice or Italy.", "Telechargez les cartes hors ligne avant l'arrivee, surtout pour Monaco, Nice ou l'Italie.", "Scarica mappe offline prima dell'arrivo, soprattutto per Monaco, Nizza o Italia.", "Завантажте offline maps до приїзду, особливо для Монако, Ніцци або Італії."),
      t("Check official transport pages close to travel dates; airport bus and regional details can change.", "Verifiez les pages officielles de transport pres des dates; bus aeroport et informations regionales peuvent changer.", "Controlla le pagine ufficiali vicino alle date; bus aeroporto e dettagli regionali possono cambiare.", "Перевіряйте офіційні транспортні сторінки ближче до дати; airport bus і регіональні деталі можуть змінюватися."),
      t("Save emergency numbers and apartment details offline, not only in messaging apps.", "Sauvegardez numeros d'urgence et details de l'appartement hors ligne, pas seulement dans les messageries.", "Salva numeri d'emergenza e dettagli appartamento offline, non solo nelle chat.", "Збережіть екстрені номери й дані апартаментів офлайн, не лише в месенджерах."),
      t("For restaurants, compare app availability with the restaurant's own website.", "Pour les restaurants, comparez les disponibilites des apps avec le site du restaurant.", "Per ristoranti confronta la disponibilita app con il sito del ristorante.", "Для ресторанів порівнюйте доступність у застосунках із сайтом самого ресторану."),
    ],
  }),
  shortArticle({
    id: "how-to-get-to-menton-from-nice-airport",
    slug: "how-to-get-to-menton-from-nice-airport",
    title: t("How to get to Menton from Nice Airport", "Comment aller a Menton depuis l'aeroport de Nice", "Come arrivare a Mentone dall'aeroporto di Nizza", "Як дістатися до Ментона з аеропорту Ніцци"),
    seoTitle: t("How to Get from Nice Airport to Menton | Azur Menton", "Aeroport de Nice a Menton | Guide Azur Menton", "Da Aeroporto di Nizza a Mentone | Azur Menton", "З аеропорту Ніцци до Ментона | Azur Menton"),
    seoDescription: t("Compare train, airport express bus, taxi, private transfer and rental car options from Nice Airport to Menton, with cautious timing and fare guidance.", "Comparez train, bus express aeroport, taxi, transfert prive et location de voiture entre l'aeroport de Nice et Menton, avec des reperes prudents de temps et de tarifs.", "Confronta treno, bus express dall'aeroporto, taxi, transfer privato e auto a noleggio da Aeroporto di Nizza a Mentone, con indicazioni prudenti su tempi e costi.", "Порівняйте потяг, airport express bus, таксі, приватний трансфер і оренду авто з аеропорту Ніцци до Ментона з обережними орієнтирами щодо часу й вартості."),
    excerpt: t("Nice Airport is the main gateway for Menton. Train, airport bus, taxi or rental car can all work; the right choice depends on budget, luggage and timing.", "L'aeroport de Nice est la principale porte d'entree vers Menton. Train, bus aeroport, taxi ou voiture de location peuvent convenir selon budget, bagages et horaire.", "L'aeroporto di Nizza e il principale accesso a Mentone. Treno, bus aeroportuale, taxi o auto a noleggio possono funzionare; dipende da budget, bagagli e orario.", "Аеропорт Ніцци - головні ворота до Ментона. Потяг, автобус з аеропорту, таксі або оренда авто можуть підійти: вибір залежить від бюджету, багажу й часу прибуття."),
    category: "practical",
    coverImage: "/images/guide/how-to-get-to-menton-from-nice-airport.jpg",
    coverImageAlt: t("Illustration of travel from Nice Airport to Menton", "Illustration du trajet entre l'aeroport de Nice et Menton", "Illustrazione del viaggio dall'aeroporto di Nizza a Mentone", "Ілюстрація поїздки з аеропорту Ніцци до Ментона"),
    visualTheme: "transport",
    visualStatus: "project_illustration",
    tags: [
      t("airport", "aeroport", "aeroporto", "аеропорт"),
      t("transport", "transport", "trasporti", "транспорт"),
      t("train", "train", "treno", "потяг"),
      t("taxi", "taxi", "taxi", "таксі"),
      t("rental car", "voiture de location", "auto a noleggio", "оренда авто"),
    ],
    bestFor: [guideBestForOptions[3].label, guideBestForOptions[4].label],
    duration: "flexible",
    locationTags: ["nice", "menton-centre"],
    relatedArticles: ["car-rental-menton-nice-airport-convertibles", "menton-with-kids-family-guide", "useful-apps-websites-menton-monaco-italian-riviera", "public-transport-in-menton", "menton-without-a-car", "day-trips-from-menton", "where-to-stay-in-menton"],
    relatedPlaces: ["nice-cote-dazur-airport", "nice-saint-augustin-station", "nice-ville-station", "menton-station", "menton-garavan-station", "monaco-monte-carlo-station"],
    relatedApartments: allApartments,
    sections: [
      {
        heading: t("Overview of the main options", "Vue d'ensemble des principales options", "Panoramica delle opzioni principali", "Огляд основних варіантів"),
        body: [
          t("Nice Airport is the main gateway for reaching Menton, and there are four realistic choices: train, direct airport bus, taxi or private transfer, and rental car. All can work; the best option depends on your budget, luggage and how much you want to see on the way.", "L'aeroport de Nice est la principale porte d'entree vers Menton, avec quatre options realistes: train, bus direct depuis l'aeroport, taxi ou transfert prive, et voiture de location. Toutes peuvent convenir; le meilleur choix depend du budget, des bagages et de ce que vous voulez voir en route.", "L'aeroporto di Nizza e il principale accesso a Mentone e offre quattro opzioni realistiche: treno, bus diretto dall'aeroporto, taxi o transfer privato, e auto a noleggio. Tutte possono funzionare; la scelta migliore dipende da budget, bagagli e da quanto vuoi vedere lungo il percorso.", "Аеропорт Ніцци - головні ворота до Ментона, і є чотири реалістичні варіанти: потяг, прямий автобус з аеропорту, таксі або приватний трансфер, а також оренда авто. Усі можуть спрацювати; найкращий вибір залежить від бюджету, багажу й того, наскільки ви хочете дивитися краєвиди дорогою."),
          t("The train is usually the best balance of price and time if you are comfortable with one short connection to Nice Saint-Augustin or Nice-Ville. The airport express bus is simpler with luggage because it is direct, but it usually costs more than the train.", "Le train offre souvent le meilleur equilibre entre prix et temps si une courte correspondance vers Nice Saint-Augustin ou Nice-Ville ne vous derange pas. Le bus express aeroport est plus simple avec des bagages car il est direct, mais il coute generalement plus cher que le train.", "Il treno di solito offre il miglior equilibrio tra prezzo e tempo se non ti dispiace un breve collegamento verso Nice Saint-Augustin o Nice-Ville. Il bus express dall'aeroporto e piu semplice con i bagagli perche e diretto, ma in genere costa piu del treno.", "Потяг зазвичай дає найкращий баланс ціни й часу, якщо вам комфортно зробити коротке пересадження або перехід до Nice Saint-Augustin чи Nice-Ville. Airport express bus простіший із багажем, бо їде напряму, але зазвичай дорожчий за потяг."),
          t("Taxi or private transfer is the most comfortable door-to-door option, especially late at night or with a lot of bags. Rental car makes sense if you plan to explore the region by car, but it is less relaxing if you only need to reach Menton and stay mostly on the coast by train.", "Le taxi ou transfert prive est l'option porte-a-porte la plus confortable, surtout tard le soir ou avec beaucoup de bagages. La voiture de location a du sens si vous prevoyez d'explorer la region en voiture, mais elle est moins reposante si vous voulez seulement rejoindre Menton puis utiliser le train sur la cote.", "Taxi o transfer privato sono l'opzione porta a porta piu comoda, soprattutto di notte o con molti bagagli. L'auto a noleggio ha senso se vuoi esplorare la regione in macchina, ma e meno rilassante se devi solo arrivare a Mentone e poi muoverti lungo la costa in treno.", "Таксі або приватний трансфер - найкомфортніший варіант від дверей до дверей, особливо пізно ввечері або з великою кількістю багажу. Оренда авто має сенс, якщо плануєте досліджувати регіон машиною, але вона менш розслаблена, якщо вам треба лише доїхати до Ментона й далі користуватися потягами вздовж узбережжя."),
        ],
        bullets: [
          t("Always check current routes, timetables and prices close to your travel date.", "Verifiez toujours les itineraire, horaires et prix actuels pres de votre date de voyage.", "Controlla sempre percorsi, orari e prezzi aggiornati vicino alla data del viaggio.", "Завжди перевіряйте актуальні маршрути, розклад і ціни ближче до дати поїздки."),
          t("Major events in Monaco, Nice or Menton can change traffic and transport comfort.", "Les grands evenements a Monaco, Nice ou Menton peuvent modifier la circulation et le confort des transports.", "Grandi eventi a Monaco, Nizza o Mentone possono cambiare traffico e comfort dei trasporti.", "Великі події в Монако, Ніцці або Ментоні можуть впливати на трафік і комфорт транспорту."),
        ],
        relatedPlaceIds: ["nice-cote-dazur-airport", "nice-saint-augustin-station", "nice-ville-station", "menton-station"],
      },
      {
        heading: t("Train: good value and coastal views", "Train: bon rapport qualite-prix et vues cotieres", "Treno: buon prezzo e viste sulla costa", "Потяг: вигідно й з видами на узбережжя"),
        body: [
          t("The common route is Nice Airport to Nice Saint-Augustin station, then a TER regional train to Menton. From Terminal 1, the walk to Nice Saint-Augustin is roughly 10-15 minutes and mostly flat; from Terminal 2, the airport tram can bring you closer if you prefer.", "Le trajet courant consiste a rejoindre la gare de Nice Saint-Augustin depuis l'aeroport, puis a prendre un TER regional vers Menton. Depuis le Terminal 1, la marche vers Nice Saint-Augustin prend environ 10 a 15 minutes et reste plutot plate; depuis le Terminal 2, le tram de l'aeroport peut vous rapprocher.", "Il percorso piu comune e Aeroporto di Nizza verso stazione Nice Saint-Augustin, poi treno regionale TER per Mentone. Dal Terminal 1 la camminata verso Nice Saint-Augustin richiede circa 10-15 minuti ed e quasi tutta pianeggiante; dal Terminal 2 puoi usare il tram dell'aeroporto per avvicinarti.", "Найпоширеніший маршрут: аеропорт Ніцци - станція Nice Saint-Augustin - регіональний TER до Ментона. Від Terminal 1 до Nice Saint-Augustin приблизно 10-15 хвилин пішки рівною дорогою; від Terminal 2 можна під'їхати ближче трамваєм аеропорту."),
          t("Direct TER trains from Nice Saint-Augustin or central Nice to Menton usually run many times per day. Journey times are often around 45-50 minutes, but you should check the current TER/SNCF timetable before travelling.", "Les TER directs depuis Nice Saint-Augustin ou le centre de Nice vers Menton circulent generalement plusieurs fois par jour. Le trajet dure souvent environ 45 a 50 minutes, mais verifiez toujours les horaires TER/SNCF actuels avant de partir.", "I TER diretti da Nice Saint-Augustin o dal centro di Nizza a Mentone circolano di solito molte volte al giorno. Il viaggio dura spesso circa 45-50 minuti, ma controlla sempre gli orari TER/SNCF aggiornati prima di partire.", "Прямі TER від Nice Saint-Augustin або центру Ніцци до Ментона зазвичай ходять багато разів на день. Дорога часто займає близько 45-50 хвилин, але перед поїздкою обов'язково перевірте актуальний розклад TER/SNCF."),
          t("Train tickets are commonly a lower-cost option than the airport bus or taxi. Recent one-way fares are often advertised around the high single digits in euros, but prices depend on route and purchase rules, so treat this as an orientation only.", "Le train est souvent moins cher que le bus aeroport ou le taxi. Les tarifs aller simple recents sont souvent annonces autour de quelques euros sous la dizaine ou un peu plus, mais les prix dependent de l'itineraire et des conditions d'achat: prenez cela comme un simple repere.", "Il treno e spesso piu economico del bus aeroportuale o del taxi. Le tariffe recenti di sola andata sono spesso indicate intorno a pochi euro sotto o sopra la decina, ma i prezzi dipendono da percorso e regole di acquisto: consideralo solo un orientamento.", "Потяг часто дешевший за автобус з аеропорту або таксі. Останні орієнтовні тарифи в один бік часто вказують у діапазоні до або трохи понад десять євро, але ціни залежать від маршруту й умов купівлі, тому сприймайте це лише як орієнтир."),
        ],
        bullets: [
          t("Best if you travel light and do not mind one short transfer.", "Ideal si vous voyagez leger et acceptez une courte correspondance.", "Ideale se viaggi leggero e non ti pesa un breve cambio.", "Найкраще, якщо ви подорожуєте легко й не проти короткої пересадки."),
          t("Choose a sea-side window seat if you can: the coast through Villefranche, Monaco and Roquebrune-Cap-Martin is part of the experience.", "Choisissez une place cote mer si possible: la cote par Villefranche, Monaco et Roquebrune-Cap-Martin fait partie du voyage.", "Se puoi, scegli un posto lato mare: la costa tra Villefranche, Monaco e Roquebrune-Cap-Martin fa parte dell'esperienza.", "Якщо можете, сідайте біля вікна з боку моря: узбережжя через Villefranche, Monaco і Roquebrune-Cap-Martin - частина враження."),
        ],
        relatedPlaceIds: ["nice-saint-augustin-station", "nice-ville-station", "menton-station", "menton-garavan-station"],
      },
      {
        heading: t("Airport express bus: simple and direct", "Bus express aeroport: simple et direct", "Bus express aeroportuale: semplice e diretto", "Airport express bus: просто й напряму"),
        body: [
          t("The Nice Airport Express to Monaco and Menton is the simplest public-transport option if you want no train changes. It normally leaves from marked airport bus stops and goes directly towards Monaco and Menton, with journey time depending heavily on traffic.", "Le Nice Airport Express vers Monaco et Menton est l'option de transport public la plus simple si vous voulez eviter les changements de train. Il part normalement d'arrets bien indiques a l'aeroport et file vers Monaco puis Menton, avec un temps de trajet tres dependant du trafic.", "Il Nice Airport Express verso Monaco e Mentone e l'opzione pubblica piu semplice se vuoi evitare cambi ferroviari. Di solito parte da fermate segnalate in aeroporto e va direttamente verso Monaco e Mentone, con tempi molto dipendenti dal traffico.", "Nice Airport Express до Монако й Ментона - найпростіший варіант громадського транспорту, якщо не хочете пересадок на потяг. Зазвичай він відправляється з позначених зупинок в аеропорту й їде напряму в бік Monaco та Menton, але час сильно залежить від трафіку."),
          t("Recent guides often place the adult one-way fare in the 20-25 euro range, with possible return or reduced fares depending on age and ticket type. Because routes, numbers and prices change, check the current official airport-bus information before booking.", "Les guides recents situent souvent le tarif adulte aller simple autour de 20 a 25 euros, avec parfois des tarifs retour ou reduits selon l'age et le billet. Comme les lignes, numeros et prix changent, verifiez l'information officielle actuelle du bus aeroport avant de reserver.", "Guide recenti indicano spesso una tariffa adulti di sola andata intorno a 20-25 euro, con possibili tariffe ridotte o andata-ritorno secondo eta e biglietto. Poiche linee, numeri e prezzi cambiano, controlla le informazioni ufficiali aggiornate prima di prenotare.", "Останні путівники часто вказують дорослий квиток в один бік у діапазоні 20-25 євро, з можливими знижками або тарифами туди-назад залежно від віку й типу квитка. Оскільки маршрути, номери ліній і ціни змінюються, перевіряйте актуальну офіційну інформацію перед бронюванням."),
          t("This option can be worth it after a long flight, with children or with bulky luggage. It is less flexible than regular trains and can be slower in motorway traffic, but the simplicity is useful.", "Cette option peut valoir le coup apres un long vol, avec des enfants ou de gros bagages. Elle est moins flexible que les trains reguliers et peut etre plus lente dans le trafic autoroutier, mais sa simplicite est utile.", "Questa opzione puo valere la pena dopo un lungo volo, con bambini o bagagli ingombranti. E meno flessibile dei treni regolari e puo essere piu lenta nel traffico autostradale, ma la semplicita aiuta.", "Цей варіант може бути доречним після довгого перельоту, з дітьми або великим багажем. Він менш гнучкий, ніж регулярні потяги, і може бути повільнішим через трафік на трасі, але простота корисна."),
        ],
        relatedPlaceIds: ["nice-cote-dazur-airport", "monaco-monte-carlo-station", "menton-station"],
      },
      {
        heading: t("Taxi and private transfer: door to door", "Taxi et transfert prive: porte a porte", "Taxi e transfer privato: porta a porta", "Таксі й приватний трансфер: від дверей до дверей"),
        body: [
          t("Official airport taxis operate from ranks outside the terminals. For a ride from Nice Airport to Menton, recent estimates are often around 95-120 euros depending on time of day, traffic and exact drop-off point; confirm the approximate fare before starting.", "Les taxis officiels partent des stations devant les terminaux. Pour un trajet entre l'aeroport de Nice et Menton, les estimations recentes tournent souvent autour de 95 a 120 euros selon l'heure, le trafic et l'adresse exacte; confirmez le tarif approximatif avant de partir.", "I taxi ufficiali partono dagli stalli fuori dai terminal. Per una corsa da Aeroporto di Nizza a Mentone, le stime recenti sono spesso intorno a 95-120 euro secondo ora, traffico e indirizzo esatto; conferma il prezzo indicativo prima di partire.", "Офіційні таксі працюють зі стоянок біля терміналів. Поїздка з аеропорту Ніцци до Ментона за останніми орієнтирами часто коштує близько 95-120 євро залежно від часу доби, трафіку й точної адреси; перед стартом уточніть приблизну вартість."),
          t("Private transfer companies can be booked before arrival and may offer a fixed quote, a driver waiting in arrivals and help with luggage. Expect prices broadly similar to or above taxi fares, especially for larger vehicles.", "Les societes de transfert prive se reservent avant l'arrivee et peuvent proposer un prix fixe, un chauffeur en zone arrivees et de l'aide avec les bagages. Les prix sont globalement proches ou superieurs aux taxis, surtout pour les grands vehicules.", "Le compagnie di transfer privato si possono prenotare prima dell'arrivo e possono offrire prezzo fisso, autista agli arrivi e aiuto con i bagagli. I prezzi sono in genere simili o superiori ai taxi, soprattutto per veicoli piu grandi.", "Приватні трансфери можна забронювати до прибуття: часто це фіксована ціна, водій у зоні прильоту й допомога з багажем. Ціни зазвичай подібні до таксі або вищі, особливо для більших авто."),
          t("Taxi or transfer is the fastest and calmest choice with heavy luggage, young children or late-night arrivals. For three or four guests, the per-person cost can become more reasonable compared with the airport bus.", "Taxi ou transfert est le choix le plus rapide et calme avec beaucoup de bagages, de jeunes enfants ou une arrivee tardive. A trois ou quatre personnes, le cout par personne peut devenir plus raisonnable face au bus aeroport.", "Taxi o transfer sono la scelta piu rapida e tranquilla con bagagli pesanti, bambini piccoli o arrivi notturni. Per tre o quattro persone, il costo a testa puo diventare piu ragionevole rispetto al bus aeroportuale.", "Таксі або трансфер - найшвидший і найспокійніший вибір із важким багажем, маленькими дітьми або пізнім прибуттям. Для трьох-чотирьох гостей вартість на людину може виглядати розумніше порівняно з автобусом з аеропорту."),
        ],
      },
      {
        heading: t("Rental car: flexible, but only if you need it", "Voiture de location: flexible, mais seulement si necessaire", "Auto a noleggio: flessibile, ma solo se serve", "Оренда авто: гнучко, але лише якщо справді потрібно"),
        body: [
          t("Renting a car at Nice Airport gives maximum flexibility for hill villages, remote beaches and countryside trips. The drive to Menton is usually via the A8 motorway or the lower coastal road, with travel time changing a lot according to route, traffic and events.", "Louer une voiture a l'aeroport de Nice donne un maximum de liberte pour les villages perches, les plages plus eloignees et l'arriere-pays. La route vers Menton passe generalement par l'A8 ou la basse corniche, avec un temps qui varie beaucoup selon l'itineraire, le trafic et les evenements.", "Noleggiare un'auto all'aeroporto di Nizza offre massima liberta per borghi collinari, spiagge piu remote e entroterra. La strada verso Mentone passa di solito dall'A8 o dalla strada costiera bassa, con tempi molto variabili secondo percorso, traffico ed eventi.", "Оренда авто в аеропорту Ніцци дає максимальну свободу для гірських сіл, віддаленіших пляжів і поїздок у внутрішні райони. До Ментона зазвичай їдуть трасою A8 або нижньою прибережною дорогою, а час сильно залежить від маршруту, трафіку й подій."),
          t("If you only plan to stay in Menton and use trains for Monaco, Nice or Italy, a car can be more burden than benefit. Parking in central Menton can be busy in high season, and some accommodation parking is limited or paid.", "Si vous prevoyez surtout de rester a Menton et d'utiliser le train pour Monaco, Nice ou l'Italie, la voiture peut devenir plus contrainte qu'avantage. Le stationnement au centre de Menton peut etre charge en haute saison, et certains parkings d'hebergement sont limites ou payants.", "Se pensi soprattutto di restare a Mentone e usare il treno per Monaco, Nizza o l'Italia, l'auto puo essere piu un peso che un vantaggio. Il parcheggio nel centro di Mentone puo essere pieno in alta stagione e alcuni posti presso gli alloggi sono limitati o a pagamento.", "Якщо плануєте переважно залишатися в Ментоні й користуватися потягами до Монако, Ніцци або Італії, авто може бути радше тягарем, ніж перевагою. Паркування в центрі Ментона в сезон буває завантаженим, а місця при житлі можуть бути обмежені або платні."),
          t("If your stay includes a dedicated parking space, renting a car for a few days can make more sense, especially for mountain villages and countryside. Ask your host before committing to a rental.", "Si votre sejour inclut une place de parking dediee, louer une voiture quelques jours peut etre plus logique, surtout pour les villages de montagne et l'arriere-pays. Demandez a votre hote avant de confirmer une location.", "Se il soggiorno include un posto auto dedicato, noleggiare un'auto per qualche giorno puo avere piu senso, soprattutto per borghi di montagna e entroterra. Chiedi all'host prima di confermare il noleggio.", "Якщо у вашому проживанні є окреме паркомісце, оренда авто на кілька днів може мати більше сенсу, особливо для гірських сіл і поїздок у передгір'я. Уточніть це в господаря перед бронюванням авто."),
        ],
      },
      {
        heading: t("What you see on the way", "Ce que l'on voit en route", "Cosa si vede lungo il percorso", "Що видно дорогою"),
        body: [
          t("Whichever route you choose, the stretch between Nice and Menton gives glimpses of the Côte d'Azur and the mountains. By train, you pass bays, harbours and cliff-side towns such as Villefranche-sur-Mer, Beaulieu, Monaco and Roquebrune-Cap-Martin before arriving in Menton.", "Quel que soit votre choix, le trajet entre Nice et Menton donne des apercus de la Cote d'Azur et des montagnes. En train, vous passez baies, ports et villes accrochees a la cote comme Villefranche-sur-Mer, Beaulieu, Monaco et Roquebrune-Cap-Martin avant Menton.", "Qualunque opzione tu scelga, il tratto tra Nizza e Mentone offre scorci di Costa Azzurra e montagne. In treno passi baie, porti e cittadine sulla costa come Villefranche-sur-Mer, Beaulieu, Monaco e Roquebrune-Cap-Martin prima di arrivare a Mentone.", "Який би маршрут ви не обрали, відрізок між Ніццою та Ментоном дає види Лазурного узбережжя й гір. Потягом ви проїдете бухти, порти й прибережні містечка на кшталт Villefranche-sur-Mer, Beaulieu, Monaco та Roquebrune-Cap-Martin перед прибуттям у Ментон."),
          t("By bus, taxi or car, the motorway and coastal roads offer more elevated views across the sea and hills, especially around Monaco and the approach to Menton. On clear days, the contrast between bright water, steep slopes and compact towns is part of the arrival.", "En bus, taxi ou voiture, l'autoroute et les routes cotieres offrent des vues plus en hauteur sur la mer et les collines, surtout autour de Monaco et a l'approche de Menton. Par temps clair, le contraste entre eau lumineuse, pentes raides et villes compactes fait deja partie de l'arrivee.", "In bus, taxi o auto, autostrada e strade costiere offrono viste piu alte su mare e colline, soprattutto intorno a Monaco e avvicinandosi a Mentone. Con cielo limpido, il contrasto tra acqua brillante, pendii ripidi e cittadine compatte fa gia parte dell'arrivo.", "Автобусом, таксі або авто траса й прибережні дороги дають вищі краєвиди на море й пагорби, особливо біля Monaco та на під'їзді до Ментона. У ясний день контраст яскравої води, крутих схилів і компактних міст уже стає частиною прибуття."),
        ],
      },
      {
        heading: t("Practical tips and small hacks", "Conseils pratiques et petites astuces", "Consigli pratici e piccoli trucchi", "Практичні поради й маленькі лайфхаки"),
        body: [
          t("Check timetables close to your trip: train and bus frequencies vary by season, day of the week and major events such as Grand Prix weekends or festivals.", "Verifiez les horaires pres de votre voyage: trains et bus varient selon saison, jour de semaine et grands evenements comme les week-ends du Grand Prix ou les festivals.", "Controlla gli orari vicino al viaggio: frequenza di treni e bus cambia secondo stagione, giorno della settimana e grandi eventi come weekend del Grand Prix o festival.", "Перевіряйте розклад ближче до поїздки: частота потягів і автобусів змінюється залежно від сезону, дня тижня й великих подій на кшталт Grand Prix або фестивалів."),
          t("If you choose the train, late morning or mid-afternoon can be more comfortable with luggage than peak commuter times. For the airport bus, book or at least check tickets online in advance during summer.", "Si vous choisissez le train, la fin de matinee ou le milieu d'apres-midi peuvent etre plus confortables avec des bagages que les heures de pointe. Pour le bus aeroport, reservez ou au minimum verifiez les billets en ligne a l'avance en ete.", "Se scegli il treno, tarda mattina o meta pomeriggio possono essere piu comodi con i bagagli rispetto alle ore di punta. Per il bus aeroportuale, prenota o almeno controlla i biglietti online in anticipo in estate.", "Якщо обираєте потяг, пізній ранок або середина дня можуть бути комфортнішими з багажем, ніж години пік. Для автобуса з аеропорту влітку краще забронювати або хоча б перевірити квитки онлайн заздалегідь."),
          t("For taxis and private transfers, confirm the approximate fare, terminal and meeting point before you arrive. If you rent a car, decide whether you prefer the faster toll motorway or the slower, more scenic coastal road.", "Pour taxis et transferts prives, confirmez le tarif approximatif, le terminal et le point de rendez-vous avant l'arrivee. Si vous louez une voiture, decidez si vous preferez l'autoroute a peage plus rapide ou la route cotiere plus lente et plus scenique.", "Per taxi e transfer privati, conferma prezzo indicativo, terminal e punto d'incontro prima dell'arrivo. Se noleggi un'auto, decidi se preferisci l'autostrada a pedaggio piu rapida o la strada costiera piu lenta e panoramica.", "Для таксі й приватних трансферів заздалегідь уточніть приблизну ціну, термінал і місце зустрічі. Якщо орендуєте авто, вирішіть, чи вам ближча швидша платна траса, чи повільніша, але мальовничіша прибережна дорога."),
        ],
      },
    ],
    practicalTips: [
      t("Best value for most light travellers: train via Nice Saint-Augustin or Nice-Ville.", "Meilleur rapport qualite-prix pour la plupart des voyageurs legers: train via Nice Saint-Augustin ou Nice-Ville.", "Miglior rapporto qualita-prezzo per molti viaggiatori leggeri: treno via Nice Saint-Augustin o Nice-Ville.", "Найкращий баланс для більшості мандрівників з легким багажем: потяг через Nice Saint-Augustin або Nice-Ville."),
      t("Simplest public option with luggage: airport express bus, if the schedule fits.", "Option publique la plus simple avec des bagages: bus express aeroport, si l'horaire convient.", "Opzione pubblica piu semplice con bagagli: bus express aeroportuale, se l'orario va bene.", "Найпростіший громадський варіант із багажем: airport express bus, якщо підходить розклад."),
      t("Most comfortable: taxi or private transfer, especially late at night or for families.", "Le plus confortable: taxi ou transfert prive, surtout tard le soir ou en famille.", "Il piu comodo: taxi o transfer privato, soprattutto di notte o per famiglie.", "Найкомфортніше: таксі або приватний трансфер, особливо пізно ввечері чи для сімей."),
      t("Rental car is useful mainly if you plan countryside or hill-village trips and have parking arranged.", "La voiture de location est surtout utile si vous prevoyez l'arriere-pays ou les villages perches et que le parking est prevu.", "L'auto a noleggio e utile soprattutto se prevedi gite nell'entroterra o nei borghi collinari e hai parcheggio organizzato.", "Оренда авто корисна насамперед для поїздок у передгір'я чи гірські села, якщо паркування вже узгоджене."),
    ],
  }),
  shortArticle({
    id: "menton-without-a-car",
    slug: "menton-without-a-car",
    title: t("Menton without a car: walking distances from the seafront", "Menton sans voiture: distances a pied depuis le front de mer", "Mentone senza auto: distanze a piedi dal lungomare", "Ментон без авто: піші відстані від набережної"),
    seoTitle: t("Menton without a car | Walking distances from the seafront", "Menton sans voiture | Distances a pied depuis le front de mer", "Mentone senza auto | Distanze a piedi dal lungomare", "Ментон без авто | Піші відстані від набережної"),
    seoDescription: t("A practical guide to enjoying Menton on foot from Promenade du Soleil: beaches, old town, market, gardens, train station and day trips without a car.", "Guide pratique pour profiter de Menton a pied depuis la Promenade du Soleil: plages, vieille ville, marche, jardins, gare et excursions sans voiture.", "Guida pratica per vivere Mentone a piedi da Promenade du Soleil: spiagge, centro storico, mercato, giardini, stazione e gite senza auto.", "Практичний гід по Ментону пішки від Promenade du Soleil: пляжі, старе місто, ринок, сади, вокзал і поїздки без авто."),
    excerpt: t("Menton is one of the easiest towns on the Riviera to enjoy on foot. From the central seafront around Promenade du Soleil and Casino Barrière, beaches, the old town, cafés, the market and the train station are all within a short walk.", "Menton est l'une des villes de la Riviera les plus faciles a vivre a pied. Depuis le front de mer central autour de la Promenade du Soleil et du Casino Barriere, plages, vieille ville, cafes, marche et gare sont proches.", "Mentone e una delle citta della Riviera piu facili da vivere a piedi. Dal lungomare centrale tra Promenade du Soleil e Casino Barrière, spiagge, centro storico, caffe, mercato e stazione sono a breve distanza.", "Ментон зручно досліджувати пішки. Якщо орієнтуватися від Promenade du Soleil та Casino Barrière, пляжі, старе місто, ринок, кав’ярні й залізничний вокзал розташовані на короткій відстані."),
    category: "practical",
    coverImage: "/images/guide/menton-without-a-car.jpg",
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
    relatedPlaces: ["promenade-du-soleil", "plage-casino", "halles-du-marche", "plage-sablettes", "plage-fossan", "rampes-saint-michel", "jardin-val-rahmeh", "port-de-garavan"],
    relatedArticles: ["cycling-bike-rental-menton", "car-rental-menton-nice-airport-convertibles", "casinos-near-menton", "menton-with-kids-family-guide", "useful-apps-websites-menton-monaco-italian-riviera", "supermarkets-in-menton", "stay-cool-in-menton-summer", "useful-numbers-emergency-contacts-menton", "michelin-restaurants-menton-nice-monaco", "cinemas-in-menton-nice-monaco", "museums-in-menton-nice-monaco", "public-transport-in-menton", "monaco-events-from-menton", "how-to-get-to-menton-from-nice-airport", "best-beaches-in-menton", "day-trips-from-menton", "menton-three-day-itinerary", "where-to-stay-in-menton"],
    relatedEvents: ["menton-lemon-festival", "monaco-grand-prix", "monaco-e-prix", "monaco-run", "rolex-monte-carlo-masters", "nice-half-marathon", "nice-jazz-fest", "monaco-yacht-show", "nice-carnival"],
    relatedApartments: allApartments,
    sections: [
      {
        heading: t("Central Menton is naturally walkable", "Menton centre se parcourt naturellement a pied", "Il centro di Mentone e naturalmente pedonale", "Центральний Ментон природно зручний пішки"),
        body: [
          t("Walking times are approximate and use Promenade du Soleil / Casino Barrière as a central reference point. Hills, heat, luggage and festival access changes can affect real travel time.", "Les temps de marche sont approximatifs et utilisent Promenade du Soleil / Casino Barriere comme repere central. Cotes, chaleur, bagages et changements d'acces pendant les festivals peuvent modifier le temps reel.", "I tempi a piedi sono approssimativi e usano Promenade du Soleil / Casino Barrière come riferimento centrale. Salite, caldo, bagagli e cambi di accesso durante eventi possono cambiare i tempi reali.", "Час прогулянок орієнтовний і рахується від Promenade du Soleil / Casino Barrière як центральної точки. Пагорби, спека, багаж і зміни доступу під час фестивалів можуть впливати на реальний час."),
          t("The promenade is the easiest orientation line. Once you move into the old town, expect stairs and elevation, especially around Saint-Michel and the panoramic viewpoints.", "La promenade est le repere le plus simple. Des que vous entrez dans la vieille ville, prevoyez marches et denivele, surtout autour de Saint-Michel et des points de vue.", "Il lungomare e la linea di orientamento piu semplice. Entrando nel centro storico, aspettati scale e dislivello, soprattutto intorno a Saint-Michel e ai belvedere.", "Набережна - найпростіша лінія орієнтації. У старому місті будуть сходи й підйоми, особливо біля Saint-Michel та панорамних точок."),
        ],
        relatedPlaceIds: ["promenade-du-soleil", "plage-casino", "rampes-saint-michel", "halles-du-marche"],
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
    id: "cycling-bike-rental-menton",
    slug: "cycling-bike-rental-menton",
    title: t("Cycling in Menton: bike rental, repairs and the best local routes", "Velo a Menton: location, reparations et meilleurs itineraire locaux", "Andare in bici a Mentone: noleggio, riparazioni e migliori percorsi locali", "Велосипед у Ментоні: оренда, ремонт і найкращі локальні маршрути"),
    seoTitle: t("Cycling in Menton: Bike Rental, Repairs and Best Local Routes", "Velo a Menton: location, reparations et meilleurs itineraires locaux", "Bici a Mentone: noleggio, riparazioni e migliori percorsi locali", "Велосипед у Ментоні: оренда, ремонт і маршрути"),
    seoDescription: t("A practical guide to cycling in Menton: where to rent bikes and e-bikes, where to repair your own bike, local bike shops, the Menton cycle path, coastal rides, mountain climbs and family-friendly cycling tips.", "Guide pratique du velo a Menton: ou louer velos et velos electriques, ou reparer son velo, boutiques locales, piste cyclable de Menton, routes cotieres, montees et conseils famille.", "Guida pratica alla bici a Mentone: dove noleggiare bici ed e-bike, dove riparare la propria bici, negozi locali, pista ciclabile di Mentone, percorsi costieri, salite e consigli famiglia.", "Практичний гід про велосипед у Ментоні: де орендувати bike/e-bike, де ремонтувати власний велосипед, веломагазини, велодоріжка Ментона, узбережжя, підйоми й поради для сімей."),
    excerpt: t("A bicycle can be a smart alternative to a car in Menton: easy for short seafront rides, useful for Garavan and the Italian border, and excellent for serious cyclists who want Cap Martin, Col de la Madone or mountain routes.", "Le velo peut etre une bonne alternative a la voiture a Menton: pratique pour le bord de mer, Garavan et la frontiere italienne, et excellent pour les cyclistes visant Cap Martin, le Col de la Madone ou les routes de montagne.", "La bici puo essere una buona alternativa all'auto a Mentone: comoda per il lungomare, Garavan e il confine italiano, ottima per ciclisti verso Cap Martin, Col de la Madone o percorsi di montagna.", "Велосипед може бути розумною альтернативою авто в Ментоні: зручно для набережної, Garavan і кордону з Італією, а для сильних райдерів - Cap Martin, Col de la Madone і гірські маршрути."),
    category: "practical",
    coverImage: "/images/guide/cycling-bike-rental-menton.jpg",
    coverImageAlt: t("Cycling and bike rental in Menton", "Velo et location de velos a Menton", "Ciclismo e noleggio bici a Mentone", "Велосипед і оренда велосипедів у Ментоні"),
    visualTheme: "transport",
    visualStatus: "project_illustration",
    tags: [t("cycling", "velo", "bici", "велосипед"), t("bike rental", "location velo", "noleggio bici", "оренда велосипеда"), t("Menton", "Menton", "Mentone", "Ментон"), t("outdoor", "plein air", "outdoor", "активний відпочинок")],
    bestFor: [guideBestForOptions[1].label, guideBestForOptions[2].label, guideBestForOptions[3].label, guideBestForOptions[6].label],
    duration: "reference",
    locationTags: ["menton-centre", "garavan", "seafront", "italian-riviera"],
    sourceStatus: "needs_verification",
    relatedPlaces: ["r-bike-menton", "bike-trip-atelier-velo-riviera", "sport-21-cycles", "pony-menton", "menton-cycle-path", "promenade-reine-astrid", "pont-saint-ludovic", "port-de-garavan", "roquebrune-cap-martin-coastal-walk", "col-de-la-madone", "sospel-bevera-valley", "tende", "la-brigue"],
    relatedArticles: ["tennis-padel-courts-menton", "menton-without-a-car", "skateparks-near-menton", "car-rental-menton-nice-airport-convertibles", "public-transport-in-menton", "day-trips-from-menton", "best-walks-and-hikes-around-menton", "mountains-snow-skiing-near-menton", "italian-riviera-day-trip-from-menton", "best-beaches-in-menton", "golf-near-menton", "where-to-stay-in-menton", "useful-apps-websites-menton-monaco-italian-riviera"],
    relatedApartments: allApartments,
    sections: [
      {
        heading: t("Is cycling a good alternative to a car in Menton?", "Le velo remplace-t-il bien la voiture a Menton ?", "La bici e una buona alternativa all'auto a Mentone?", "Чи є велосипед хорошою альтернативою авто в Ментоні?"),
        body: [
          t("Sometimes, yes. For short local movement, a city bike or e-bike can work well for the seafront, Garavan, the port, the lower Italian border, errands and relaxed afternoon plans.", "Parfois oui. Pour les petits deplacements locaux, un velo de ville ou electrique fonctionne bien pour le bord de mer, Garavan, le port, la frontiere italienne basse, les courses et les apres-midi tranquilles.", "A volte si. Per brevi spostamenti locali, una city bike o e-bike funziona bene per lungomare, Garavan, porto, confine basso italiano, commissioni e pomeriggi tranquilli.", "Іноді так. Для коротких локальних переміщень міський велосипед або e-bike добре підходить для набережної, Garavan, порту, нижнього кордону з Італією, дрібних справ і спокійних планів."),
          t("For serious riders, Menton is much stronger: Cap Martin, La Turbie, Col d'Eze, Col de la Madone and roads toward Sospel and the Bevera valley are close. For families with small children, cycling is more limited because much of the Riviera network still uses shared roads.", "Pour les cyclistes entraines, Menton est beaucoup plus forte: Cap Martin, La Turbie, Col d'Eze, Col de la Madone et les routes vers Sospel et la Bevera sont proches. Avec de jeunes enfants, c'est plus limite car beaucoup d'axes restent partages avec les voitures.", "Per ciclisti allenati, Mentone e molto piu forte: Cap Martin, La Turbie, Col d'Eze, Col de la Madone e le strade verso Sospel e la Bevera sono vicine. Con bambini piccoli e piu limitato perche molte strade sono condivise con il traffico.", "Для підготовлених велосипедистів Ментон значно сильніший: поруч Cap Martin, La Turbie, Col d'Eze, Col de la Madone і дороги до Sospel та долини Bevera. З малими дітьми можливості обмеженіші, бо багато маршрутів ідуть спільними дорогами."),
        ],
        relatedPlaceIds: ["menton-cycle-path", "port-de-garavan", "roquebrune-cap-martin-coastal-walk", "col-de-la-madone"],
      },
      {
        heading: t("Where to rent or repair a bike", "Ou louer ou reparer un velo", "Dove noleggiare o riparare una bici", "Де орендувати або ремонтувати велосипед"),
        body: [
          t("For high-quality road bikes, e-bikes and city bikes, start with R Bike Menton at Port Garavan. For central rental and repairs, Bike Trip / Atelier Velo Riviera is practical near Esplanade Georges Pompidou. Sport 21 Cycles on Route de Sospel is useful for repairs, accessories and local bike-shop support.", "Pour velos de route de qualite, velos electriques et velos de ville, commencez par R Bike Menton au port Garavan. Pour location et reparations au centre, Bike Trip / Atelier Velo Riviera est pratique pres de l'Esplanade Georges Pompidou. Sport 21 Cycles route de Sospel aide pour reparations, accessoires et conseils.", "Per bici da strada di qualita, e-bike e city bike, inizia da R Bike Menton al Port Garavan. Per noleggio e riparazioni centrali, Bike Trip / Atelier Velo Riviera e pratico vicino all'Esplanade Georges Pompidou. Sport 21 Cycles sulla Route de Sospel e utile per riparazioni, accessori e supporto.", "Для якісних шосейних велосипедів, e-bike і city bike починайте з R Bike Menton у Port Garavan. Для центральної оренди й ремонту зручний Bike Trip / Atelier Velo Riviera біля Esplanade Georges Pompidou. Sport 21 Cycles на Route de Sospel корисний для ремонту, аксесуарів і консультацій."),
          t("Pony can be useful for short app-based urban rides, but it is not the same as renting a road bike or planning a full day route. Check current availability, parking rules, helmets and local restrictions before relying on it.", "Pony peut etre utile pour de courts trajets urbains via application, mais ce n'est pas une location de velo de route ni un plan de journee complete. Verifiez disponibilite, stationnement, casques et regles locales.", "Pony puo servire per brevi tragitti urbani via app, ma non equivale a noleggiare una bici da strada o pianificare una giornata. Controlla disponibilita, parcheggio, caschi e regole locali.", "Pony може бути зручним для коротких міських поїздок через застосунок, але це не оренда шосейного велосипеда і не план на цілий день. Перевіряйте наявність, паркування, шоломи й місцеві правила."),
        ],
        relatedPlaceIds: ["r-bike-menton", "bike-trip-atelier-velo-riviera", "sport-21-cycles", "pony-menton"],
      },
      {
        heading: t("The official Menton cycle path", "La piste cyclable officielle de Menton", "La pista ciclabile ufficiale di Mentone", "Офіційна велодоріжка Ментона"),
        body: [
          t("Menton has a useful but short official cycle path. It runs from the old-town side toward Garavan, Porte de France, Promenade Reine Astrid and the lower border area near Pont Saint-Ludovic.", "Menton possede une piste cyclable utile mais courte. Elle part du cote vieille ville vers Garavan, Porte de France, Promenade Reine Astrid et la frontiere basse pres du Pont Saint-Ludovic.", "Mentone ha una pista ciclabile utile ma breve. Va dal lato centro storico verso Garavan, Porte de France, Promenade Reine Astrid e il confine basso vicino al Pont Saint-Ludovic.", "У Ментоні є корисна, але коротка офіційна велодоріжка. Вона йде від старого міста до Garavan, Porte de France, Promenade Reine Astrid і нижньої прикордонної зони біля Pont Saint-Ludovic."),
          t("This is the best easy local cycling idea for visitors. Treat it as a scenic local section, not a complete city-wide cycling network.", "C'est la meilleure idee velo facile pour les visiteurs. Considerez-la comme un beau troncon local, pas comme un reseau cyclable complet.", "E la migliore idea bici facile per visitatori. Considerala un tratto locale panoramico, non una rete ciclabile completa.", "Це найкраща проста велоідея для гостей. Сприймайте її як красиву локальну ділянку, а не повну міську веломережу."),
        ],
        relatedPlaceIds: ["menton-cycle-path", "promenade-reine-astrid", "pont-saint-ludovic", "port-de-garavan"],
      },
      {
        heading: t("Easy local cycling ideas", "Idees faciles a velo", "Idee facili in bici", "Прості ідеї для велопрогулянок"),
        body: [
          t("For a first ride, rent a city bike or e-bike and ride slowly from the old-town side toward Garavan and the lower border, with a coffee or ice-cream stop before returning.", "Pour une premiere sortie, louez un velo de ville ou electrique et roulez doucement de la vieille ville vers Garavan et la frontiere basse, avec pause cafe ou glace avant le retour.", "Per la prima uscita, noleggia una city bike o e-bike e vai piano dal centro storico verso Garavan e il confine basso, con pausa caffe o gelato prima del ritorno.", "Для першої поїздки орендуйте city bike або e-bike і повільно проїдьте від старого міста до Garavan і нижнього кордону, з паузою на каву чи морозиво."),
          t("More confident riders can continue toward Roquebrune-Cap-Martin and Cap Martin, choosing roads carefully. This is scenic, but it is not a protected flat cycle path.", "Les cyclistes plus confiants peuvent continuer vers Roquebrune-Cap-Martin et Cap Martin en choisissant les routes avec soin. C'est beau, mais ce n'est pas une piste plate protegee.", "Chi ha piu confidenza puo continuare verso Roquebrune-Cap-Martin e Cap Martin scegliendo bene le strade. E panoramico, ma non e una pista piatta protetta.", "Більш упевнені райдери можуть їхати до Roquebrune-Cap-Martin і Cap Martin, уважно обираючи дороги. Це красиво, але не захищена рівна велодоріжка."),
        ],
        relatedPlaceIds: ["roquebrune-cap-martin-coastal-walk", "promenade-reine-astrid", "pont-saint-ludovic"],
      },
      {
        heading: t("Serious road cycling from Menton", "Velo de route sportif depuis Menton", "Ciclismo su strada serio da Mentone", "Серйозні шосейні маршрути з Ментона"),
        body: [
          t("Menton is excellent for trained road cyclists because it sits below major climbs. Col de la Madone is the classic local test and should be treated as a serious climb, not a casual family route.", "Menton est excellente pour les cyclistes de route entraines car elle se trouve sous de grandes montees. Le Col de la Madone est le test local classique et doit etre considere comme une vraie montee, pas une sortie famille.", "Mentone e eccellente per ciclisti allenati perche si trova sotto grandi salite. Il Col de la Madone e il test locale classico e va considerato una salita seria, non un giro famiglia.", "Ментон чудовий для підготовлених шосейних велосипедистів, бо лежить біля серйозних підйомів. Col de la Madone - класичний локальний тест, це не сімейний маршрут."),
          t("Routes toward Sospel, the Bevera valley, La Turbie and Eze can be memorable, but they require fitness, heat planning, lights for shade and tunnels, and confidence on shared roads.", "Les routes vers Sospel, la Bevera, La Turbie et Eze peuvent etre memorables, mais elles demandent forme physique, gestion de chaleur, lumieres pour ombre/tunnels et confiance sur routes partagees.", "Le strade verso Sospel, Bevera, La Turbie ed Eze possono essere memorabili, ma richiedono forma fisica, gestione del caldo, luci per ombra/tunnel e sicurezza su strade condivise.", "Маршрути до Sospel, долини Bevera, La Turbie й Eze можуть бути дуже красивими, але потребують форми, планування спеки, світла для тіні/тунелів і впевненості на спільних дорогах."),
        ],
        relatedPlaceIds: ["col-de-la-madone", "sospel-bevera-valley", "tende", "la-brigue"],
      },
      {
        heading: t("Mountain biking and e-MTB", "VTT et VTT electrique", "Mountain bike ed e-MTB", "Гірський велосипед і e-MTB"),
        body: [
          t("For true mountain biking, plan properly. The best terrain is often inland, and some routes around Tende, La Brigue and the Merveilles area need the right bike, battery planning, offline maps and sometimes a guide.", "Pour le vrai VTT, planifiez serieusement. Les meilleurs terrains sont souvent dans l'arriere-pays, et certains parcours vers Tende, La Brigue et les Merveilles demandent bon velo, batterie, cartes hors ligne et parfois guide.", "Per vera mountain bike, pianifica bene. I terreni migliori sono spesso nell'entroterra, e alcuni percorsi verso Tende, La Brigue e Merveilles richiedono bici giusta, batteria, mappe offline e talvolta guida.", "Для справжнього MTB плануйте серйозно. Найкращі терени часто в глибині регіону, а маршрути біля Tende, La Brigue і Merveilles потребують правильного велосипеда, батареї, offline maps і іноді гіда."),
        ],
        relatedPlaceIds: ["r-bike-menton", "tende", "la-brigue", "sospel-bevera-valley"],
      },
      {
        heading: t("Cycling with children", "Faire du velo avec des enfants", "Andare in bici con bambini", "Велосипед із дітьми"),
        body: [
          t("Keep family cycling short and simple: official cycle path, quiet seafront sections, slow Garavan rides and daylight only. Avoid busy summer roads, mountain routes and trying to combine beach bags, young children and traffic stress.", "Gardez le velo en famille court et simple: piste officielle, sections calmes du bord de mer, Garavan lentement et de jour. Evitez routes chargees l'ete, montagne et le melange sacs de plage, jeunes enfants et stress circulation.", "Mantieni la bici in famiglia breve e semplice: pista ufficiale, tratti tranquilli del lungomare, Garavan piano e solo di giorno. Evita strade estive trafficate, montagna e la combinazione borse mare, bambini piccoli e traffico.", "Для сімей тримайте велопрогулянки короткими й простими: офіційна доріжка, тихі ділянки набережної, повільний Garavan і лише вдень. Уникайте літнього трафіку, гір і поєднання пляжних сумок, малих дітей та машин."),
        ],
        relatedPlaceIds: ["menton-cycle-path", "promenade-reine-astrid", "port-de-garavan"],
      },
      {
        heading: t("Where cycling works better than a car", "Quand le velo marche mieux que la voiture", "Quando la bici funziona meglio dell'auto", "Коли велосипед кращий за авто"),
        body: [
          t("A bike can be better than a car for short seafront movement, Garavan, parking-free errands, slow local exploration and one scenic ride during the stay. A car is still better for young children with beach equipment, ski days, golf bags, late-night returns and long hot summer day trips.", "Le velo peut etre meilleur que la voiture pour petits trajets en bord de mer, Garavan, courses sans parking, exploration lente et une belle sortie. La voiture reste meilleure avec jeunes enfants et affaires de plage, ski, sacs de golf, retours tardifs et longues journees chaudes.", "La bici puo essere meglio dell'auto per brevi spostamenti sul mare, Garavan, commissioni senza parcheggio, esplorazione lenta e una gita panoramica. L'auto resta migliore con bambini e borse mare, sci, sacche da golf, rientri tardi e lunghe giornate calde.", "Велосипед може бути кращим за авто для коротких переміщень набережною, Garavan, справ без паркування, повільного огляду й однієї красивої поїздки. Авто все ще краще для малих дітей з пляжними речами, лиж, гольфу, пізніх повернень і довгих спекотних day trips."),
        ],
        relatedPlaceIds: ["menton-cycle-path", "r-bike-menton", "bike-trip-atelier-velo-riviera"],
      },
      {
        heading: t("Staying in Menton with a bike", "Sejourner a Menton avec un velo", "Soggiornare a Mentone con una bici", "Проживання в Ментоні з велосипедом"),
        body: [
          t("Beachside Apartment with Terrace & Parking is the most practical Azur Menton option if you bring bikes by car, plan day trips or need more space and parking by reservation. The sea-view studios suit couples who stay mostly car-free and use bikes for selected rides.", "Beachside Apartment with Terrace & Parking est l'option Azur Menton la plus pratique si vous venez avec des velos en voiture, prevoyez des sorties ou avez besoin d'espace et parking sur reservation. Les studios vue mer conviennent aux couples surtout sans voiture avec quelques sorties velo.", "Beachside Apartment with Terrace & Parking e l'opzione Azur Menton piu pratica se porti bici in auto, pianifichi gite o hai bisogno di spazio e parcheggio su prenotazione. Gli studi vista mare vanno bene per coppie quasi senza auto con qualche uscita in bici.", "Beachside Apartment with Terrace & Parking - найпрактичніший варіант Azur Menton, якщо ви привозите велосипеди авто, плануєте виїзди або потребуєте більше простору й паркування за резервацією. Студії з видом на море підходять парам, які переважно без авто й беруть велосипед для окремих поїздок."),
          t("If you bring expensive road bikes, ask in advance about practical storage. Do not assume every building or apartment is ideal for indoor bike storage.", "Si vous apportez des velos de route chers, demandez a l'avance pour le rangement pratique. Ne supposez pas que chaque immeuble ou appartement convient au stockage interieur.", "Se porti bici da strada costose, chiedi in anticipo per il deposito pratico. Non dare per scontato che ogni edificio o appartamento sia ideale per tenere bici dentro.", "Якщо ви привозите дорогі шосейні велосипеди, заздалегідь уточніть практичне зберігання. Не припускайте, що кожна будівля чи апартамент ідеальні для indoor bike storage."),
        ],
        relatedApartmentKeys: allApartments,
      },
      {
        heading: t("FAQ", "FAQ", "FAQ", "FAQ"),
        body: [
          t("Can I rent a bike in Menton? Yes. R Bike Menton, Bike Trip / Atelier Velo Riviera and other local options cover different needs, from road bikes and e-bikes to repairs and central rental.", "Peut-on louer un velo a Menton ? Oui. R Bike Menton, Bike Trip / Atelier Velo Riviera et d'autres options locales couvrent des besoins differents, du velo de route au velo electrique, reparations et location centrale.", "Si puo noleggiare una bici a Mentone? Si. R Bike Menton, Bike Trip / Atelier Velo Riviera e altre opzioni locali coprono esigenze diverse, da strada ed e-bike a riparazioni e noleggio centrale.", "Чи можна орендувати велосипед у Ментоні? Так. R Bike Menton, Bike Trip / Atelier Velo Riviera та інші локальні варіанти покривають різні потреби: шосейні велосипеди, e-bike, ремонт і центральна оренда."),
          t("Is there a cycle path in Menton? Yes, but it is short. It is useful for the old-town to Garavan direction, not a complete Riviera cycling network.", "Y a-t-il une piste cyclable a Menton ? Oui, mais elle est courte. Elle est utile entre vieille ville et Garavan, pas comme reseau cyclable complet de la Riviera.", "C'e una pista ciclabile a Mentone? Si, ma breve. E utile tra centro storico e Garavan, non e una rete ciclabile completa della Riviera.", "Чи є велодоріжка в Ментоні? Так, але коротка. Вона корисна для напрямку старе місто-Garavan, але це не повна веломережа Рив'єри."),
          t("Is Menton good for serious road cycling? Yes, especially for trained riders who want climbs such as Col de la Madone and shared-road routes toward Eze, La Turbie, Sospel and Nice.", "Menton est-elle bonne pour le velo de route sportif ? Oui, surtout pour cyclistes entraines visant Col de la Madone et routes partagees vers Eze, La Turbie, Sospel et Nice.", "Mentone e buona per ciclismo su strada serio? Si, soprattutto per ciclisti allenati verso Col de la Madone e strade condivise verso Eze, La Turbie, Sospel e Nizza.", "Чи підходить Ментон для серйозного шосейного велоспорту? Так, особливо для підготовлених райдерів на Col de la Madone і дороги до Eze, La Turbie, Sospel і Ніцци."),
        ],
      },
    ],
    practicalTips: [
      t("Use the official cycle path for the simplest local ride.", "Utilisez la piste officielle pour la sortie locale la plus simple.", "Usa la pista ufficiale per il giro locale piu semplice.", "Для найпростішої локальної поїздки використовуйте офіційну велодоріжку."),
      t("Book performance bikes ahead in busy seasons.", "Reservez les velos sportifs a l'avance en haute saison.", "Prenota bici sportive in anticipo in alta stagione.", "У високий сезон бронюйте спортивні велосипеди заздалегідь."),
      t("Avoid the hottest hours for climbs in July and August.", "Evitez les heures les plus chaudes pour les montees en juillet et aout.", "Evita le ore piu calde per le salite in luglio e agosto.", "У липні й серпні уникайте найспекотніших годин для підйомів."),
      t("Ask about bike storage before arriving with expensive bikes.", "Demandez le rangement velo avant d'arriver avec des velos chers.", "Chiedi del deposito bici prima di arrivare con bici costose.", "Перед приїздом із дорогими велосипедами уточніть зберігання."),
    ],
  }),
  shortArticle({
    id: "skateparks-near-menton",
    slug: "skateparks-near-menton",
    title: t("Skateparks near Menton: where to ride skateboards, scooters and BMX", "Skateparks pres de Menton : ou faire du skate, de la trottinette et du BMX", "Skatepark vicino a Mentone: dove andare con skateboard, monopattino e BMX", "Скейтпарки біля Ментона: де кататися на скейті, самокаті й BMX"),
    seoTitle: t("Skateparks Near Menton: Skateboarding, Scooters and BMX on the Riviera", "Skateparks pres de Menton : skate, trottinette et BMX sur la Riviera", "Skatepark vicino a Mentone: skateboard, monopattini e BMX in Riviera", "Скейтпарки біля Ментона: скейт, самокат і BMX на Рив'єрі"),
    seoDescription: t("A practical guide to skateparks near Menton for skaters, BMX riders, freestyle scooters and families with teenagers: Menton Garavan, Monaco Skatepark, Nice skateparks and safety tips.", "Guide pratique des skateparks pres de Menton pour skateurs, BMX, trottinettes freestyle et familles avec ados : Garavan, Monaco, Nice et conseils securite.", "Guida pratica agli skatepark vicino a Mentone per skater, BMX, monopattini freestyle e famiglie con ragazzi: Garavan, Monaco, Nizza e consigli di sicurezza.", "Практичний гід по скейтпарках біля Ментона для скейтерів, BMX, freestyle-самокатів і сімей із підлітками: Garavan, Monaco, Nice і поради безпеки."),
    excerpt: t("Menton is not a major skateboarding city, but it has a local skatepark by the sea, Monaco has a small scenic skatepark, and Nice offers larger parks for more serious riders.", "Menton n'est pas une grande ville de skate, mais elle a un skatepark local pres de la mer, Monaco une petite option panoramique et Nice des parks plus grands.", "Mentone non e una grande citta dello skate, ma ha uno skatepark locale sul mare, Monaco una piccola opzione panoramica e Nizza park piu grandi.", "Ментон не є великою скейт-столицею, але має локальний скейтпарк біля моря; у Монако є невеликий мальовничий парк, а в Ніцці - більші варіанти."),
    category: "with-children",
    coverImage: "/images/guide/skateparks-near-menton.jpg",
    coverImageAlt: t("Illustration of skateparks near Menton", "Illustration des skateparks pres de Menton", "Illustrazione degli skatepark vicino a Mentone", "Ілюстрація скейтпарків біля Ментона"),
    visualTheme: "family",
    visualStatus: "project_illustration",
    tags: [t("skateparks", "skateparks", "skatepark", "скейтпарки"), t("teenagers", "ados", "ragazzi", "підлітки"), t("BMX", "BMX", "BMX", "BMX"), t("family activities", "activites famille", "attivita famiglia", "сімейні активності")],
    bestFor: [guideBestForOptions[1].label, guideBestForOptions[2].label, guideBestForOptions[6].label],
    duration: "half-day",
    locationTags: ["menton-centre", "garavan", "monaco", "nice"],
    sourceStatus: "needs_verification",
    relatedPlaces: ["skatepark-youri-laleg-menton", "rondelli-garavan-side", "plage-rondelli", "port-de-garavan", "monaco-skatepark", "oceanographic-museum-monaco", "skate-park-comte-de-falicon-nice", "skatepark-jean-bouin-nice", "city-park-tende", "tende"],
    relatedArticles: ["tennis-padel-courts-menton", "cycling-bike-rental-menton", "menton-with-kids-family-guide", "day-trips-from-menton", "menton-without-a-car", "best-beaches-in-menton", "mountains-snow-skiing-near-menton", "public-transport-in-menton", "where-to-stay-in-menton"],
    relatedApartments: allApartments,
    sections: [
      {
        heading: t("Skateboarding and BMX during a Menton stay", "Skate et BMX pendant un sejour a Menton", "Skate e BMX durante un soggiorno a Mentone", "Скейт і BMX під час відпочинку в Ментоні"),
        body: [
          t("Menton is usually about beaches, old-town walks and gardens. But if you travel with a teenager who skates, rides a freestyle scooter or brings a BMX, the useful question is simple: where can they ride?", "Menton evoque surtout les plages, la vieille ville et les jardins. Mais avec un ado qui fait du skate, de la trottinette freestyle ou du BMX, la vraie question devient simple : ou peut-il rouler ?", "Mentone fa pensare a spiagge, centro storico e giardini. Ma con un ragazzo che fa skate, monopattino freestyle o BMX, la domanda pratica e: dove puo andare?", "Ментон зазвичай асоціюється з пляжами, старим містом і садами. Але якщо з вами підліток зі скейтом, freestyle-самокатом або BMX, практичне питання просте: де кататися?"),
          t("The easiest answer is the local skatepark on the Garavan side of Menton. Monaco works as a small add-on during a family day, while Nice is better for serious riders who need larger modules.", "La reponse la plus simple est le skatepark local cote Garavan. Monaco fonctionne comme petite halte pendant une journee famille, tandis que Nice convient mieux aux riders confirmes.", "La risposta piu semplice e lo skatepark locale lato Garavan. Monaco funziona come breve tappa in una giornata famiglia, mentre Nizza e meglio per rider esperti.", "Найпростіша відповідь - локальний скейтпарк у районі Garavan. Монако підходить як коротка зупинка під час сімейного дня, а Ніцца - для досвідченіших райдерів."),
        ],
        relatedPlaceIds: ["skatepark-youri-laleg-menton", "monaco-skatepark", "skate-park-comte-de-falicon-nice"],
      },
      {
        heading: t("Quick recommendations", "Recommandations rapides", "Consigli rapidi", "Короткі рекомендації"),
        body: [
          t("For the easiest local session, start with Skatepark Youri Laleg / Skatepark Garavan. If you are already visiting Monaco-Ville, add Monaco Skatepark. If your teenager is experienced and wants a bigger park, plan Nice Comte de Falicon or Jean Bouin as a dedicated outing.", "Pour la session locale la plus simple, commencez par Skatepark Youri Laleg / Garavan. Si vous visitez deja Monaco-Ville, ajoutez le skatepark de Monaco. Pour un ado experimente, prevoyez Nice Comte de Falicon ou Jean Bouin comme sortie dediee.", "Per la sessione locale piu semplice, inizia da Skatepark Youri Laleg / Garavan. Se visiti gia Monaco-Ville, aggiungi lo skatepark di Monaco. Per un ragazzo esperto, pianifica Nice Comte de Falicon o Jean Bouin.", "Для найпростішої локальної сесії почніть зі Skatepark Youri Laleg / Garavan. Якщо ви вже їдете в Monaco-Ville, додайте Monaco Skatepark. Для досвідченого підлітка плануйте Nice Comte de Falicon або Jean Bouin окремо."),
          t("For BMX, always check local rules before riding. Some small skateparks are described mainly for skateboards, scooters and rollerblades.", "Pour le BMX, verifiez toujours les regles locales avant de rouler. Certains petits skateparks sont surtout decrits pour skates, trottinettes et rollers.", "Per BMX, controlla sempre le regole locali prima di andare. Alcuni piccoli skatepark sono descritti soprattutto per skate, monopattini e roller.", "Для BMX завжди перевіряйте місцеві правила. Деякі невеликі скейтпарки описані переважно для скейтів, самокатів і роликів."),
        ],
        relatedPlaceIds: ["skatepark-youri-laleg-menton", "monaco-skatepark", "skatepark-jean-bouin-nice"],
      },
      {
        heading: t("Skatepark Youri Laleg / Skatepark Garavan, Menton", "Skatepark Youri Laleg / Garavan, Menton", "Skatepark Youri Laleg / Garavan, Mentone", "Skatepark Youri Laleg / Garavan, Ментон"),
        body: [
          t("This is the key local spot: a free-access skatepark at 9 Quai Gordon Bennett, close to Rondelli beach and the Garavan side of town. It is useful for a short session, not a major destination skatepark.", "C'est le spot local principal : un skatepark en acces libre au 9 Quai Gordon Bennett, pres de la plage Rondelli et de Garavan. Il est utile pour une courte session, pas comme grande destination skate.", "E il posto locale principale: skatepark ad accesso libero al 9 Quai Gordon Bennett, vicino a Plage Rondelli e Garavan. Utile per una sessione breve, non come grande destinazione skate.", "Це головна локальна точка: скейтпарк із вільним доступом за адресою 9 Quai Gordon Bennett, поруч із Plage Rondelli та Garavan. Він корисний для короткої сесії, не як велика skate destination."),
          t("It pairs naturally with Rondelli beach, Port Garavan and a walk toward the Italian border. Bring your own board, scooter or BMX, and go in the morning or late afternoon during hot months.", "Il se combine naturellement avec la plage Rondelli, le port Garavan et une balade vers la frontiere italienne. Apportez votre materiel et privilegiez matin ou fin d'apres-midi en ete.", "Si abbina bene a Plage Rondelli, Port Garavan e una passeggiata verso il confine italiano. Porta la tua attrezzatura e scegli mattina o tardo pomeriggio in estate.", "Його природно поєднати з Plage Rondelli, Port Garavan і прогулянкою до італійського кордону. Беріть власне спорядження й обирайте ранок або пізній день у спеку."),
        ],
        relatedPlaceIds: ["skatepark-youri-laleg-menton", "plage-rondelli", "port-de-garavan"],
      },
      {
        heading: t("Monaco Skatepark", "Skatepark de Monaco", "Skatepark Monaco", "Monaco Skatepark"),
        body: [
          t("Monaco's small skatepark works best as an add-on to a Monaco family day. It is near the Monaco-Ville / Oceanographic Museum side, so it can fit around the museum, the palace area or a short old-town walk.", "Le petit skatepark de Monaco fonctionne surtout en complement d'une journee famille. Il est vers Monaco-Ville / Musee oceanographique, donc facile avec le musee, le palais ou une balade.", "Il piccolo skatepark di Monaco funziona soprattutto come aggiunta a una giornata famiglia. E verso Monaco-Ville / Museo Oceanografico, quindi comodo con museo, palazzo o passeggiata.", "Невеликий скейтпарк Монако найкраще працює як доповнення до сімейного дня. Він біля Monaco-Ville / Океанографічного музею, тому поєднується з музеєм, палацом або короткою прогулянкою."),
          t("It is not large enough to justify a special trip on its own. Check safety rules and equipment requirements before riding.", "Il n'est pas assez grand pour justifier un trajet dedie. Verifiez les regles de securite et d'equipement avant de rouler.", "Non e abbastanza grande da giustificare un viaggio dedicato. Controlla regole di sicurezza e protezioni prima di andare.", "Він не настільки великий, щоб їхати тільки заради нього. Перед катанням перевірте правила безпеки та вимоги до захисту."),
        ],
        relatedPlaceIds: ["monaco-skatepark", "oceanographic-museum-monaco", "monaco-monte-carlo"],
      },
      {
        heading: t("Bigger skateparks in Nice", "Grands skateparks a Nice", "Skatepark piu grandi a Nizza", "Більші скейтпарки в Ніцці"),
        body: [
          t("Nice is the better option for serious teenagers and experienced riders. Comte de Falicon has street and bowl areas and is the strongest confirmed option for BMX. Jean Bouin is another city skatepark with larger modules and a more experienced feel.", "Nice est meilleure pour les ados serieux et riders experimentes. Comte de Falicon propose street et bowl et reste l'option BMX la plus claire. Jean Bouin est une autre option urbaine avec modules plus grands.", "Nizza e migliore per ragazzi seri e rider esperti. Comte de Falicon ha street e bowl ed e l'opzione piu chiara per BMX. Jean Bouin e un'altra opzione urbana con moduli piu grandi.", "Ніцца краще підходить для серйозних підлітків і досвідчених райдерів. Comte de Falicon має street і bowl зони та є найчіткішим варіантом для BMX. Jean Bouin - ще один міський парк із більшими модулями."),
          t("Treat either Nice skatepark as a planned half-day rather than a casual detour from Menton. Check access, transport and heat before going.", "Considerez ces skateparks comme une demi-journee planifiee plutot qu'un detour rapide depuis Menton. Verifiez acces, transport et chaleur avant de partir.", "Considera questi skatepark come mezza giornata pianificata, non una deviazione casuale da Mentone. Controlla accesso, trasporto e caldo.", "Розглядайте ці скейтпарки як запланований південь, а не випадковий відступ із Ментона. Перевіряйте доступ, транспорт і спеку."),
        ],
        relatedPlaceIds: ["skate-park-comte-de-falicon-nice", "skatepark-jean-bouin-nice", "nice-ville-station"],
      },
      {
        heading: t("City Park Tende", "City Park Tende", "City Park Tende", "City Park Tende"),
        body: [
          t("Tende is only a secondary option. Do not travel from Menton to Tende just for the skatepark; use it as a bonus if you are already planning a Roya valley, mountain village or train day.", "Tende est seulement une option secondaire. Ne partez pas de Menton uniquement pour le skatepark; utilisez-le comme bonus avec une journee Roya, village de montagne ou train.", "Tenda e solo un'opzione secondaria. Non partire da Mentone solo per lo skatepark; usalo come bonus in una giornata Roya, borgo di montagna o treno.", "Tende - лише вторинний варіант. Не їдьте з Ментона тільки заради скейтпарку; використовуйте його як бонус до дня в Roya, гірському селі або поїздки потягом."),
        ],
        relatedPlaceIds: ["city-park-tende", "tende"],
      },
      {
        heading: t("Safety and etiquette", "Securite et etiquette", "Sicurezza e comportamento", "Безпека й етикет"),
        body: [
          t("Bring your own helmet and protection. Check whether BMX is allowed before riding. Let younger children watch from a safe distance, avoid peak heat in July and August, and do not ride on crowded pedestrian seafront areas.", "Apportez casque et protections. Verifiez si le BMX est autorise. Laissez les jeunes enfants regarder a distance, evitez la forte chaleur en juillet-aout et ne roulez pas sur les zones pietonnes chargees.", "Porta casco e protezioni. Controlla se BMX e consentito. Fai guardare i bambini piccoli da distanza sicura, evita il caldo forte in luglio-agosto e non andare nelle zone pedonali affollate.", "Беріть шолом і захист. Перевіряйте, чи дозволений BMX. Молодші діти мають дивитися з безпечної відстані; уникайте спеки липня-серпня і не катайтеся в людних пішохідних зонах набережної."),
          t("Advanced riders can take bigger risks in small spaces, so a small park is not automatically safer. Check the surface after rain, sand or sea wind.", "Les riders avances peuvent prendre plus de risques dans un petit espace; un petit park n'est donc pas automatiquement plus sur. Verifiez le sol apres pluie, sable ou vent marin.", "I rider esperti possono rischiare di piu in spazi piccoli; un park piccolo non e automaticamente piu sicuro. Controlla la superficie dopo pioggia, sabbia o vento marino.", "Досвідчені райдери можуть більше ризикувати в малому просторі, тому невеликий парк не автоматично безпечніший. Перевіряйте покриття після дощу, піску або морського вітру."),
        ],
      },
      {
        heading: t("Staying in Menton with a teenager who skates", "Sejourner a Menton avec un ado qui skate", "Soggiornare a Mentone con un ragazzo che fa skate", "Проживання в Ментоні з підлітком, який катається"),
        body: [
          t("Menton works well for families because it can mix beach, trains, Monaco, Italy, mountains and local sports. The Beachside Apartment with Terrace & Parking is the most practical Azur Menton option if you bring equipment, beach bags or a car. The sea-view studios suit shorter stays where skating is a side activity.", "Menton fonctionne bien en famille car elle combine plage, trains, Monaco, Italie, montagne et sports locaux. Beachside Apartment with Terrace & Parking est l'option Azur Menton la plus pratique avec materiel, sacs de plage ou voiture. Les studios vue mer conviennent aux courts sejours ou le skate reste secondaire.", "Mentone funziona bene per famiglie perche combina spiaggia, treni, Monaco, Italia, montagna e sport locali. Beachside Apartment with Terrace & Parking e l'opzione Azur Menton piu pratica con attrezzatura, borse mare o auto. Gli studi vista mare vanno bene per soggiorni brevi dove lo skate e secondario.", "Ментон добре працює для сімей, бо поєднує пляж, потяги, Монако, Італію, гори й локальний спорт. Beachside Apartment with Terrace & Parking - найпрактичніший варіант Azur Menton, якщо є спорядження, пляжні сумки або авто. Студії з видом на море підходять для коротших поїздок, де скейт - додаткова активність."),
        ],
        relatedApartmentKeys: allApartments,
      },
    ],
    practicalTips: [
      t("Start with Menton Garavan for the easiest local skate session.", "Commencez par Menton Garavan pour la session locale la plus simple.", "Inizia da Mentone Garavan per la sessione locale piu semplice.", "Почніть із Menton Garavan для найпростішої локальної сесії."),
      t("Bring helmets and protection; do not assume rental is available.", "Apportez casques et protections; ne supposez pas qu'une location existe sur place.", "Porta casco e protezioni; non dare per scontato il noleggio sul posto.", "Беріть шоломи й захист; не розраховуйте на оренду на місці."),
      t("Check BMX rules before riding in smaller parks.", "Verifiez les regles BMX avant de rouler dans les petits parks.", "Controlla le regole BMX prima di andare nei park piccoli.", "Перед BMX у малих парках перевіряйте правила."),
      t("Avoid midday sessions during July and August heat.", "Evitez les sessions de midi en juillet et aout.", "Evita le sessioni di mezzogiorno in luglio e agosto.", "У липні й серпні уникайте сесій опівдні."),
    ],
  }),
  shortArticle({
    id: "car-rental-menton-nice-airport-convertibles",
    slug: "car-rental-menton-nice-airport-convertibles",
    title: t("Car rental in Menton: local agencies, Nice Airport pickup and convertible drives", "Location de voiture a Menton: agences locales, aeroport de Nice et cabriolets", "Noleggio auto a Mentone: agenzie locali, aeroporto di Nizza e cabriolet", "Оренда авто в Ментоні: місцеві агенції, аеропорт Ніцци й кабріолети"),
    seoTitle: t("Car Rental in Menton: Local Agencies, Nice Airport Pickup & Convertible Drives", "Location de voiture a Menton: agences locales, aeroport de Nice et cabriolets", "Noleggio auto a Mentone: agenzie locali, aeroporto di Nizza e cabriolet", "Оренда авто в Ментоні: агенції, аеропорт Ніцци й кабріолети"),
    seoDescription: t("A practical guide to renting a car for a stay in Menton: local agencies, Nice Airport pickup and return, parking tips, mountain day trips, Italian border routes and convertible rentals on the French Riviera.", "Guide pratique pour louer une voiture pendant un sejour a Menton: agences locales, retrait et retour a l'aeroport de Nice, parking, montagnes, Italie et cabriolets sur la Riviera.", "Guida pratica al noleggio auto per un soggiorno a Mentone: agenzie locali, ritiro e ritorno a Nizza aeroporto, parcheggio, montagne, Italia e cabriolet in Riviera.", "Практичний гід з оренди авто для перебування в Ментоні: місцеві агенції, аеропорт Ніцци, паркування, гори, Італія й кабріолети на Рив'єрі."),
    excerpt: t("You do not need a car for every Menton stay, but the right rental can help with mountain villages, golf, Italy, ski days or a classic Riviera convertible drive.", "Une voiture n'est pas necessaire pour chaque sejour a Menton, mais la bonne location aide pour villages de montagne, golf, Italie, neige ou cabriolet Riviera.", "Non serve un'auto per ogni soggiorno a Mentone, ma il noleggio giusto aiuta per borghi di montagna, golf, Italia, neve o un giro cabriolet in Riviera.", "Авто потрібне не для кожного перебування в Ментоні, але правильна оренда допоможе з гірськими селами, гольфом, Італією, снігом або кабріолетом на Рив'єрі."),
    category: "practical",
    coverImage: "/images/guide/car-rental-menton-nice-airport-convertibles.jpg",
    coverImageAlt: t("Car rental and Riviera driving from Menton", "Location de voiture et routes Riviera depuis Menton", "Noleggio auto e strade Riviera da Mentone", "Оренда авто й поїздки Рив'єрою з Ментона"),
    visualTheme: "transport",
    visualStatus: "project_illustration",
    tags: [t("car rental", "location voiture", "noleggio auto", "оренда авто"), t("Nice Airport", "Aeroport de Nice", "Aeroporto di Nizza", "аеропорт Ніцци"), t("parking", "parking", "parcheggio", "паркування"), t("convertible", "cabriolet", "cabriolet", "кабріолет")],
    bestFor: [guideBestForOptions[1].label, guideBestForOptions[3].label, guideBestForOptions[4].label, guideBestForOptions[6].label],
    duration: "reference",
    locationTags: ["menton-centre", "nice", "monaco", "italian-riviera"],
    sourceStatus: "needs_verification",
    relatedPlaces: ["europcar-menton", "ada-menton-gare", "rent-a-car-menton", "free2move-rent-menton", "nice-airport-car-rental-center", "sixt-nice-airport", "rent-a-classic-car-nice", "sunset-ride-nice", "nice-cote-dazur-airport", "menton-station", "dolceacqua", "sospel-bevera-valley", "col-de-turini", "eze-village", "monaco-monte-carlo", "monte-carlo-golf-club"],
    relatedArticles: ["tennis-padel-courts-menton", "cycling-bike-rental-menton", "menton-without-a-car", "how-to-get-to-menton-from-nice-airport", "public-transport-in-menton", "day-trips-from-menton", "mountains-snow-skiing-near-menton", "golf-near-menton", "wine-tasting-near-menton", "italian-riviera-day-trip-from-menton", "monaco-events-from-menton", "where-to-stay-in-menton"],
    relatedApartments: allApartments,
    sections: [
      {
        heading: t("Do you need a car in Menton?", "Faut-il une voiture a Menton ?", "Serve un'auto a Mentone?", "Чи потрібне авто в Ментоні?"),
        body: [
          t("Not always. Menton centre, beaches, old town, restaurants, market, train station and seafront walks are easy without a car. Trains work well for Monaco, Nice and Ventimiglia.", "Pas toujours. Centre, plages, vieille ville, restaurants, marche, gare et promenades en bord de mer se font facilement sans voiture. Le train fonctionne bien pour Monaco, Nice et Vintimille.", "Non sempre. Centro, spiagge, centro storico, ristoranti, mercato, stazione e lungomare sono facili senza auto. I treni funzionano bene per Monaco, Nizza e Ventimiglia.", "Не завжди. Центр, пляжі, старе місто, ресторани, ринок, вокзал і набережна зручні без авто. Потяги добре працюють для Монако, Ніцци й Вентімільї."),
          t("A rental car becomes useful when you want mountain villages, ski or snow days, golf, Bellet or Dolceacqua wine, flexible family outings, late returns or a scenic convertible day.", "Une voiture de location devient utile pour villages de montagne, neige ou ski, golf, vins de Bellet ou Dolceacqua, sorties famille flexibles, retours tardifs ou journee cabriolet.", "Un'auto a noleggio diventa utile per borghi di montagna, neve o sci, golf, vini di Bellet o Dolceacqua, uscite familiari flessibili, rientri tardi o giornata cabriolet.", "Орендоване авто корисне для гірських сіл, снігу чи лиж, гольфу, вин Bellet або Dolceacqua, гнучких сімейних виїздів, пізніх повернень або дня з кабріолетом."),
        ],
        relatedPlaceIds: ["menton-station", "monaco-monte-carlo", "dolceacqua", "col-de-turini"],
      },
      {
        heading: t("The three rental scenarios", "Les trois scenarios de location", "I tre scenari di noleggio", "Три сценарії оренди"),
        body: [
          t("First, rent locally in Menton for one or two strategic days. Second, rent at Nice Airport if you want the car from arrival to departure. Third, rent a special car, such as a cabriolet or classic car, for one memorable Riviera drive.", "Premier scenario: louer localement a Menton pour un ou deux jours utiles. Deuxieme: louer a l'aeroport de Nice pour toute la periode. Troisieme: louer une voiture speciale, cabriolet ou classique, pour une route Riviera memorable.", "Primo: noleggiare localmente a Mentone per uno o due giorni mirati. Secondo: ritirare a Nizza aeroporto per tutto il soggiorno. Terzo: noleggiare un'auto speciale, cabriolet o classica, per una guida Riviera memorabile.", "Перший варіант: оренда в Ментоні на один-два стратегічні дні. Другий: оренда в аеропорту Ніцци на весь період. Третій: спеціальне авто, кабріолет або класика, для пам'ятної поїздки Рив'єрою."),
        ],
        bullets: [
          t("Local rental is often best for a mostly car-free week.", "La location locale convient souvent a une semaine surtout sans voiture.", "Il noleggio locale va bene per una settimana quasi senza auto.", "Локальна оренда часто найкраща для тижня переважно без авто."),
          t("Airport rental works best when parking is arranged.", "La location aeroport marche mieux avec parking prevu.", "Il noleggio in aeroporto funziona meglio se il parcheggio e previsto.", "Оренда в аеропорту найкраща, коли паркування вже вирішене."),
          t("Convertibles are special-day cars, not practical luggage cars.", "Les cabriolets sont pour une journee speciale, pas pour les bagages.", "I cabriolet sono auto da giornata speciale, non da bagagli.", "Кабріолет - авто для особливого дня, не для багажу."),
        ],
      },
      {
        heading: t("Renting locally in Menton", "Louer localement a Menton", "Noleggiare localmente a Mentone", "Оренда авто в Ментоні"),
        body: [
          t("Local rental is sensible if you arrive by train, taxi or transfer and only need a car for a mountain, golf, wine or Italian Riviera day. Check current hours directly before booking.", "La location locale est logique si vous arrivez en train, taxi ou transfert et n'avez besoin d'une voiture que pour montagne, golf, vin ou Riviera italienne. Verifiez les horaires actuels avant de reserver.", "Il noleggio locale ha senso se arrivi in treno, taxi o transfer e ti serve l'auto solo per montagna, golf, vino o Riviera italiana. Controlla gli orari aggiornati prima di prenotare.", "Локальна оренда має сенс, якщо ви прибуваєте потягом, таксі чи трансфером і авто потрібне лише для гір, гольфу, вина або Італійської Рив'єри. Перед бронюванням перевіряйте актуальні години."),
          t("Useful local options include Europcar Menton near the station, ADA Menton Gare, Rent A Car Menton and Free2Move Rent on the Sospel road.", "Options locales utiles: Europcar Menton pres de la gare, ADA Menton Gare, Rent A Car Menton et Free2Move Rent route de Sospel.", "Opzioni locali utili: Europcar Menton vicino alla stazione, ADA Menton Gare, Rent A Car Menton e Free2Move Rent sulla strada per Sospel.", "Корисні локальні варіанти: Europcar Menton біля вокзалу, ADA Menton Gare, Rent A Car Menton і Free2Move Rent на дорозі до Sospel."),
        ],
        relatedPlaceIds: ["europcar-menton", "ada-menton-gare", "rent-a-car-menton", "free2move-rent-menton"],
      },
      {
        heading: t("Renting at Nice Airport", "Louer a l'aeroport de Nice", "Noleggiare all'aeroporto di Nizza", "Оренда в аеропорту Ніцци"),
        body: [
          t("Airport pickup is convenient if you travel with family and luggage, have parking arranged in Menton, plan several car days and want one pickup and one return. Nice Airport lists major rental companies and uses a dedicated Terminal 2 car-rental centre for collection and return.", "Le retrait aeroport est pratique avec famille et bagages, parking prevu a Menton, plusieurs jours en voiture et un seul retrait/retour. L'aeroport de Nice liste les grandes enseignes et utilise un centre de location Terminal 2 pour retrait et retour.", "Il ritiro in aeroporto e comodo con famiglia e bagagli, parcheggio previsto a Mentone, piu giorni in auto e un solo ritiro/ritorno. L'aeroporto di Nizza lista grandi compagnie e usa un centro noleggio al Terminal 2.", "Оренда в аеропорту зручна з родиною й багажем, якщо паркування в Ментоні вирішене, заплановано кілька car days і потрібне одне отримання/повернення. Аеропорт Ніцци має rental center біля Terminal 2."),
          t("The drive from Nice Airport to Menton is often 35-45 minutes in quiet traffic, but summer, rush hours and Monaco event periods can make it much longer.", "Le trajet Nice aeroport-Menton prend souvent 35-45 minutes quand la circulation est calme, mais ete, heures de pointe et evenements a Monaco peuvent l'allonger nettement.", "Il tragitto Nizza aeroporto-Mentone dura spesso 35-45 minuti con traffico calmo, ma estate, ore di punta ed eventi a Monaco possono allungarlo molto.", "Дорога з аеропорту Ніцци до Ментона часто займає 35-45 хвилин у спокійному трафіку, але літо, rush hour і події в Монако можуть суттєво збільшити час."),
        ],
        relatedPlaceIds: ["nice-cote-dazur-airport", "nice-airport-car-rental-center", "sixt-nice-airport"],
      },
      {
        heading: t("Parking in Menton", "Parking a Menton", "Parcheggio a Mentone", "Паркування в Ментоні"),
        body: [
          t("Think about parking before you rent. Central Menton can be tight in summer, during Fete du Citron and on busy weekends. Ask whether parking is included, reserved or unnecessary for your plan.", "Pensez au parking avant de louer. Le centre de Menton peut etre serre en ete, pendant la Fete du Citron et les week-ends charges. Demandez si le parking est inclus, reserve ou inutile pour votre plan.", "Pensa al parcheggio prima di noleggiare. Il centro di Mentone puo essere stretto in estate, durante la Fete du Citron e nei weekend pieni. Chiedi se il parcheggio e incluso, prenotato o non necessario.", "Подумайте про паркування до оренди. Центральний Ментон може бути тісним улітку, під час Fete du Citron і на насичених вихідних. Уточніть, чи паркування включене, резервується або не потрібне."),
          t("For Azur Menton guests, Beachside Apartment with Terrace & Parking is the most practical apartment when a car is central to the trip. The sea-view studios often suit guests who stay mostly car-free and rent locally for one day.", "Pour les voyageurs Azur Menton, Beachside Apartment with Terrace & Parking est le plus pratique si la voiture est centrale. Les studios vue mer conviennent souvent a ceux qui restent surtout sans voiture et louent localement une journee.", "Per gli ospiti Azur Menton, Beachside Apartment with Terrace & Parking e il piu pratico se l'auto e centrale. Gli studi vista mare sono spesso adatti a chi resta quasi senza auto e noleggia localmente un giorno.", "Для гостей Azur Menton Beachside Apartment with Terrace & Parking найпрактичніший, якщо авто важливе для поїздки. Sea-view studios часто пасують тим, хто здебільшого без авто й орендує локально на день."),
        ],
        relatedApartmentKeys: allApartments,
      },
      {
        heading: t("Best car types", "Quel type de voiture choisir", "Che auto scegliere", "Яке авто обрати"),
        body: [
          t("For most guests, a small automatic car is easier than a large vehicle: Riviera streets, car parks and village roads can be narrow. Families may prefer a compact family car, while vans and minibuses should be chosen only when truly needed.", "Pour la plupart des voyageurs, une petite automatique est plus simple qu'un grand vehicule: rues, parkings et routes de village sont parfois etroits. Les familles peuvent preferer une compacte familiale; vans et minibus seulement si vraiment necessaires.", "Per molti ospiti, una piccola automatica e piu semplice di un veicolo grande: strade, parcheggi e borghi possono essere stretti. Le famiglie possono preferire una compatta familiare; van e minibus solo se servono davvero.", "Для більшості гостей невелике automatic авто простіше за велике: вулиці, паркінги й дороги сіл можуть бути вузькими. Сім'ям підійде компактне сімейне авто; фургони й minibuses лише за справжньої потреби."),
          t("Electric cars are possible, but confirm charging before booking. Do not assume apartment parking includes charging.", "Les voitures electriques sont possibles, mais confirmez la recharge avant de reserver. Ne supposez pas que le parking d'appartement inclut une borne.", "Le auto elettriche sono possibili, ma conferma la ricarica prima di prenotare. Non presumere che il parcheggio dell'appartamento abbia ricarica.", "Електроавто можливі, але зарядку треба підтвердити до бронювання. Не припускайте, що паркування апартаменту має зарядку."),
        ],
      },
      {
        heading: t("Convertible and classic-car days", "Journees cabriolet et voitures classiques", "Giornate cabriolet e auto classiche", "Дні з кабріолетом або класичним авто"),
        body: [
          t("A cabriolet makes emotional sense on the Côte d'Azur: sea roads, palm trees, Monaco, Cap Ferrat, corniches, Italy and golden light. It is best for couples, short scenic drives, spring or autumn weather and one special day rather than a practical full stay.", "Un cabriolet a du sens sur la Cote d'Azur: routes mer, palmiers, Monaco, Cap Ferrat, corniches, Italie et lumiere doree. Ideal pour couples, courts trajets panoramiques, printemps ou automne et une journee speciale plutot qu'un sejour pratique complet.", "Un cabriolet ha senso in Costa Azzurra: strade sul mare, palme, Monaco, Cap Ferrat, corniches, Italia e luce dorata. Ideale per coppie, giri brevi, primavera o autunno e una giornata speciale, non per tutto il soggiorno.", "Кабріолет на Côte d'Azur має емоційний сенс: морські дороги, пальми, Монако, Cap Ferrat, corniches, Італія й золоте світло. Найкраще для пар, коротких scenic drives, весни чи осені й одного особливого дня, а не всього практичного перебування."),
          t("For modern convertibles, check mainstream airport options such as SIXT. For vintage or premium cars, specialist options around Nice include Rent A Classic Car and Sunset Ride; confirm delivery, insurance and cross-border rules carefully.", "Pour cabriolets modernes, verifiez les options aeroport classiques comme SIXT. Pour voitures vintage ou premium, des specialistes autour de Nice incluent Rent A Classic Car et Sunset Ride; confirmez livraison, assurance et regles transfrontalieres.", "Per cabriolet moderni controlla opzioni aeroportuali come SIXT. Per auto vintage o premium, specialisti intorno a Nizza includono Rent A Classic Car e Sunset Ride; conferma consegna, assicurazione e regole transfrontaliere.", "Для сучасних кабріолетів перевіряйте airport options на кшталт SIXT. Для vintage або premium авто поруч із Ніццою є Rent A Classic Car і Sunset Ride; ретельно уточнюйте доставку, страхування й правила перетину кордону."),
        ],
        relatedPlaceIds: ["sixt-nice-airport", "rent-a-classic-car-nice", "sunset-ride-nice", "monaco-monte-carlo", "eze-village", "dolceacqua"],
      },
      {
        heading: t("Best drives from Menton", "Belles routes depuis Menton", "Belle strade da Mentone", "Найкращі маршрути з Ментона"),
        body: [
          t("Good car days from Menton include Monaco by the coast, Cap Ferrat via Villefranche and Beaulieu, Dolceacqua in Liguria, Col de Turini for confident mountain drivers, and Eze or La Turbie for a shorter viewpoint route.", "Belles journees voiture depuis Menton: Monaco par la cote, Cap Ferrat via Villefranche et Beaulieu, Dolceacqua en Ligurie, Col de Turini pour conducteurs a l'aise en montagne, Eze ou La Turbie pour une route courte avec vues.", "Buone giornate in auto da Mentone: Monaco sulla costa, Cap Ferrat via Villefranche e Beaulieu, Dolceacqua in Liguria, Col de Turini per guidatori sicuri in montagna, Eze o La Turbie per un giro breve con viste.", "Добрі car days з Ментона: Монако узбережжям, Cap Ferrat через Villefranche і Beaulieu, Dolceacqua в Лігурії, Col de Turini для впевнених водіїв гір, Eze або La Turbie для короткого маршруту з видами."),
          t("For Italy or mountain roads, check rental cross-border rules, winter equipment and insurance excess before leaving.", "Pour l'Italie ou les routes de montagne, verifiez autorisation transfrontaliere, equipement hiver et franchise avant de partir.", "Per Italia o strade di montagna controlla regole transfrontaliere, equipaggiamento invernale e franchigia prima di partire.", "Для Італії або гірських доріг перевіряйте правила перетину кордону, зимове обладнання й insurance excess до виїзду."),
        ],
        relatedPlaceIds: ["monaco-monte-carlo", "eze-village", "dolceacqua", "sospel-bevera-valley", "col-de-turini", "monte-carlo-golf-club"],
      },
      {
        heading: t("Practical checklist", "Checklist pratique", "Checklist pratica", "Практичний чекліст"),
        body: [
          t("Book early in summer, photograph the car at pickup and return, check insurance excess, bring the main driver's credit card and ID, avoid oversized cars and never leave luggage visible at scenic stops.", "Reservez tot en ete, photographiez la voiture au retrait et au retour, verifiez la franchise, prenez carte bancaire et piece d'identite du conducteur principal, evitez les grandes voitures et ne laissez pas de bagages visibles.", "Prenota presto in estate, fotografa l'auto a ritiro e ritorno, controlla la franchigia, porta carta e documento del conducente principale, evita auto grandi e non lasciare bagagli visibili.", "Бронюйте завчасно влітку, фотографуйте авто при отриманні й поверненні, перевіряйте franchise, беріть картку й документ основного водія, уникайте великих авто й не лишайте багаж видимим."),
        ],
      },
      {
        heading: t("Common questions", "Questions frequentes", "Domande frequenti", "Поширені питання"),
        body: [
          t("You can rent a car in Menton through local agencies or at Nice Airport. Airport rental is better for a full car-based stay; local rental is better for one or two excursions. A convertible is possible, but usually best as a special scenic day rather than a practical family car.", "Vous pouvez louer a Menton via agences locales ou a l'aeroport de Nice. L'aeroport convient mieux a un sejour avec voiture; la location locale a une ou deux excursions. Un cabriolet est possible, mais plutot pour une journee panoramique speciale.", "Puoi noleggiare a Mentone tramite agenzie locali o all'aeroporto di Nizza. L'aeroporto e meglio per un soggiorno con auto; il locale per una o due gite. Un cabriolet e possibile, ma meglio per una giornata panoramica speciale.", "Орендувати авто можна в Ментоні через локальні агенції або в аеропорту Ніцци. Аеропорт кращий для поїздки з авто на весь час; локальна оренда - для одного-двох виїздів. Кабріолет можливий, але краще для особливого scenic day."),
        ],
      },
    ],
    practicalTips: [
      t("Rent locally if you only need one or two car days.", "Louez localement si vous n'avez besoin que d'un ou deux jours voiture.", "Noleggia localmente se ti servono solo uno o due giorni in auto.", "Орендуйте локально, якщо авто потрібне лише на один-два дні."),
      t("Arrange parking before choosing airport pickup.", "Reglez le parking avant de choisir le retrait aeroport.", "Organizza il parcheggio prima di scegliere il ritiro in aeroporto.", "Узгодьте паркування до вибору airport pickup."),
      t("Check cross-border permission before driving into Italy.", "Verifiez l'autorisation transfrontaliere avant l'Italie.", "Controlla l'autorizzazione transfrontaliera prima dell'Italia.", "Перевірте дозвіл на перетин кордону перед Італією."),
      t("Choose a small automatic unless you truly need a larger car.", "Choisissez une petite automatique sauf vrai besoin d'un grand vehicule.", "Scegli una piccola automatica salvo reale bisogno di un'auto grande.", "Обирайте невелике automatic авто, якщо справді не потрібне більше."),
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
    coverImage: "/images/guide/public-transport-in-menton.jpg",
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
    relatedArticles: ["jazz-live-music-near-menton", "latin-dancing-salsa-bachata-menton", "cycling-bike-rental-menton", "car-rental-menton-nice-airport-convertibles", "casinos-near-menton", "menton-with-kids-family-guide", "useful-apps-websites-menton-monaco-italian-riviera", "supermarkets-in-menton", "stay-cool-in-menton-summer", "useful-numbers-emergency-contacts-menton", "michelin-restaurants-menton-nice-monaco", "cinemas-in-menton-nice-monaco", "museums-in-menton-nice-monaco", "menton-without-a-car", "monaco-events-from-menton", "menton-one-day-itinerary", "menton-three-day-itinerary", "day-trips-from-menton", "best-beaches-in-menton", "how-to-get-to-menton-from-nice-airport"],
    relatedPlaces: ["menton-station", "menton-garavan-station", "nice-cote-dazur-airport", "nice-saint-augustin-station", "nice-ville-station", "monaco-monte-carlo-station", "ventimiglia-station", "promenade-du-soleil", "office-tourisme-menton-riviera-merveilles", "monaco-monte-carlo", "nice-old-town", "ventimiglia"],
    relatedEvents: ["monaco-grand-prix", "monaco-e-prix", "monaco-run", "rolex-monte-carlo-masters", "monaco-yacht-show", "monte-carlo-television-festival", "nice-half-marathon", "nice-jazz-fest", "nice-carnival", "menton-lemon-festival"],
    relatedApartments: allApartments,
    sections: [
      {
        heading: t("Routes and timetables can change", "Les lignes et horaires peuvent changer", "Percorsi e orari possono cambiare", "Маршрути й розклад можуть змінюватися"),
        body: [
          t("Menton is compact enough for many daily plans on foot, but public transport makes it easier to explore the wider Riviera. From the central seafront, guests can use local buses, the free city navette when operating, regional trains and buses to reach Monaco, Nice, Ventimiglia and nearby villages.", "Menton est assez compacte pour beaucoup de programmes a pied, mais les transports publics facilitent l'exploration de la Riviera. Depuis le front de mer central, les voyageurs peuvent utiliser bus locaux, navette gratuite lorsqu'elle fonctionne, trains et bus regionaux vers Monaco, Nice, Vintimille et villages proches.", "Mentone e abbastanza compatta per molti piani a piedi, ma il trasporto pubblico aiuta a esplorare la Riviera. Dal lungomare centrale si possono usare bus locali, navetta gratuita quando attiva, treni e bus regionali verso Monaco, Nizza, Ventimiglia e borghi vicini.", "Ментон достатньо компактний для багатьох планів пішки, але громадський транспорт допомагає досліджувати ширшу Рив'єру. Від центральної набережної гості можуть користуватися місцевими автобусами, безкоштовним шатлом, якщо він працює, регіональними потягами й автобусами до Монако, Ніцци, Вентімільї та найближчих сіл."),
          t("Routes, timetables and fares can change. Always check current transport information before travelling, especially for evening returns, festivals and major Monaco or Nice events.", "Lignes, horaires et tarifs peuvent changer. Verifiez toujours les informations actuelles avant de partir, surtout pour les retours du soir, festivals et grands evenements a Monaco ou Nice.", "Percorsi, orari e tariffe possono cambiare. Controlla sempre le informazioni aggiornate prima di partire, soprattutto per rientri serali, festival e grandi eventi a Monaco o Nizza.", "Маршрути, розклад і тарифи можуть змінюватися. Завжди перевіряйте актуальну транспортну інформацію перед поїздкою, особливо для вечірніх повернень, фестивалів і великих подій у Монако чи Ніцці."),
        ],
        relatedPlaceIds: ["promenade-du-soleil", "office-tourisme-menton-riviera-merveilles", "menton-station"],
        relatedApartmentKeys: allApartments,
      },
      {
        heading: t("Menton train stations", "Gares de Menton", "Stazioni di Mentone", "Залізничні станції Ментона"),
        body: [
          t("Menton station is the main stop for most guests staying around the centre and seafront. Menton Garavan station can be useful for the eastern side, the port and some Italian Riviera plans.", "La gare de Menton est l'arret principal pour la plupart des voyageurs logeant pres du centre et du front de mer. Menton Garavan peut etre pratique cote est, pour le port et certaines sorties vers la Riviera italienne.", "La stazione di Mentone e la fermata principale per chi soggiorna vicino al centro e al lungomare. Menton Garavan puo essere utile per il lato est, il porto e alcune gite verso la Riviera italiana.", "Станція Menton - головна зупинка для більшості гостей біля центру й набережної. Menton Garavan може бути зручною для східного боку, порту й деяких поїздок Італійською Рив'єрою."),
          t("For arrival day, choose the station that matches your apartment side rather than assuming the central station is always best.", "Le jour de l'arrivee, choisissez la gare qui correspond au cote de votre appartement plutot que de supposer que la gare centrale est toujours la meilleure.", "Il giorno dell'arrivo scegli la stazione piu vicina al lato dell'appartamento, non sempre la centrale.", "У день прибуття обирайте станцію відповідно до району апартаментів, а не автоматично центральну."),
        ],
        relatedPlaceIds: ["menton-station", "menton-garavan-station"],
      },
      {
        heading: t("Coastal trains to Monaco, Nice and Italy", "Trains cotiers vers Monaco, Nice et l'Italie", "Treni costieri per Monaco, Nizza e Italia", "Прибережні потяги до Монако, Ніцци й Італії"),
        body: [
          t("TER trains are usually the simplest way to make car-free day trips from Menton. Monaco, Nice and Ventimiglia are on the same coastal rail line, making the train useful for beaches, museums, restaurants and event evenings.", "Les TER sont souvent le moyen le plus simple pour des excursions sans voiture depuis Menton. Monaco, Nice et Vintimille sont sur la meme ligne cotiere, pratique pour plages, musees, restaurants et soirees d'evenements.", "I TER sono spesso il modo piu semplice per gite senza auto da Mentone. Monaco, Nizza e Ventimiglia sono sulla stessa linea costiera, utile per spiagge, musei, ristoranti e serate evento.", "TER зазвичай найпростіший спосіб для поїздок без авто з Ментона. Монако, Ніцца й Вентімілья стоять на одній прибережній лінії, що зручно для пляжів, музеїв, ресторанів і вечірніх подій."),
          t("For big event days, trains can be full. Check last returns before committing to dinner, theatre or a late concert outside Menton.", "Les jours de grands evenements, les trains peuvent etre pleins. Verifiez les derniers retours avant de prevoir diner, theatre ou concert tardif hors de Menton.", "Nei giorni di grandi eventi i treni possono essere pieni. Controlla gli ultimi rientri prima di cena, teatro o concerti fuori Mentone.", "У дні великих подій потяги можуть бути повними. Перевіряйте останні повернення перед вечерею, театром або пізнім концертом поза Ментоном."),
        ],
        relatedPlaceIds: ["menton-station", "monaco-monte-carlo-station", "nice-ville-station", "ventimiglia-station"],
      },
      {
        heading: t("Local buses and navette", "Bus locaux et navette", "Bus locali e navetta", "Місцеві автобуси й navette"),
        body: [
          t("Local buses are useful for gardens, higher neighbourhoods and some nearby villages, while the city navette can help with short central movements when it is operating. Treat route numbers and frequency as live information, not fixed guide text.", "Les bus locaux sont utiles pour les jardins, quartiers plus hauts et certains villages proches, tandis que la navette urbaine aide aux petits trajets centraux lorsqu'elle circule. Considerez numeros de lignes et frequences comme information actuelle, pas comme texte fixe.", "I bus locali servono per giardini, quartieri alti e alcuni borghi vicini; la navetta cittadina aiuta nei brevi spostamenti centrali quando attiva. Numeri e frequenze vanno trattati come informazioni live, non testo fisso.", "Місцеві автобуси корисні для садів, верхніх районів і деяких сусідніх сіл, а міський navette допомагає з короткими центральними переміщеннями, коли працює. Номери маршрутів і частоту треба сприймати як актуальну інформацію, а не як сталий текст."),
        ],
        relatedPlaceIds: ["office-tourisme-menton-riviera-merveilles", "jardin-val-rahmeh", "jardin-serre-de-la-madone"],
      },
      {
        heading: t("Airport access", "Acces aeroport", "Accesso aeroporto", "Доступ з аеропорту"),
        body: [
          t("Nice Côte d'Azur Airport is the main airport for Menton. Guests can reach Menton by train via Nice Saint-Augustin or Nice-Ville, by airport coach when suitable, or by taxi/private transfer when luggage or late arrivals make comfort more important.", "L'aeroport Nice Cote d'Azur est le principal aeroport pour Menton. On rejoint Menton en train via Nice Saint-Augustin ou Nice-Ville, en car aeroport lorsque cela convient, ou en taxi/transfert prive quand bagages ou arrivee tardive rendent le confort prioritaire.", "Nice Côte d'Azur e l'aeroporto principale per Mentone. Si arriva in treno via Nice Saint-Augustin o Nice-Ville, con coach aeroportuale quando comodo, oppure taxi/transfer se bagagli o arrivo tardi rendono il comfort prioritario.", "Nice Côte d'Azur - головний аеропорт для Ментона. До Ментона можна доїхати потягом через Nice Saint-Augustin або Nice-Ville, airport coach за наявності зручного розкладу, або таксі/трансфером, коли багаж чи пізній приліт роблять комфорт важливішим."),
        ],
        relatedPlaceIds: ["nice-cote-dazur-airport", "nice-saint-augustin-station", "nice-ville-station", "menton-station"],
      },
      {
        heading: t("When taxi or transfer makes sense", "Quand choisir taxi ou transfert", "Quando scegliere taxi o transfer", "Коли доречні таксі або трансфер"),
        body: [
          t("A taxi or transfer is not needed for every stay, but it can be the calm choice for late-night airport arrivals, heavy luggage, small children or tight event schedules. Confirm the fare, meeting point and luggage needs before travelling.", "Taxi ou transfert n'est pas necessaire pour chaque sejour, mais peut etre le choix calme pour arrivees tardives, gros bagages, jeunes enfants ou programme d'evenement serre. Confirmez tarif, rendez-vous et bagages avant le voyage.", "Taxi o transfer non servono per ogni soggiorno, ma sono la scelta tranquilla per arrivi notturni, molti bagagli, bambini piccoli o eventi con tempi stretti. Conferma prezzo, punto d'incontro e bagagli prima del viaggio.", "Таксі або трансфер потрібні не для кожного перебування, але можуть бути спокійним вибором для пізнього прильоту, важкого багажу, малих дітей або щільного event schedule. Підтвердьте ціну, місце зустрічі й багаж до поїздки."),
        ],
        relatedPlaceIds: ["nice-cote-dazur-airport", "menton-station"],
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
    seoDescription: t("Use Menton as a calm base for car-free day trips to Monaco, Nice, Èze, Ventimiglia, Bordighera, Sanremo and Riviera coastal towns.", "Utilisez Menton comme base calme pour des excursions sans voiture vers Monaco, Nice, Eze, Vintimille, Bordighera, Sanremo et les villes cotieres de la Riviera.", "Usa Mentone come base tranquilla per gite senza auto verso Monaco, Nizza, Eze, Ventimiglia, Bordighera, Sanremo e le cittadine costiere della Riviera.", "Використовуйте Ментон як спокійну базу для поїздок без авто до Монако, Ніцци, Еза, Вентімільї, Бордігери, Санремо й прибережних міст Рив'єри."),
    excerpt: t("Menton makes a calm base for Monaco, Nice, hilltop villages and the Italian Riviera: spend the day out, then return to a quieter seafront apartment.", "Menton est une base calme pour Monaco, Nice, les villages perches et la Riviera italienne: sortez la journee, puis revenez dans un appartement plus tranquille au bord de mer.", "Mentone e una base tranquilla per Monaco, Nizza, borghi collinari e Riviera italiana: esci di giorno, poi torna a un appartamento piu quieto sul mare.", "Ментон - спокійна база для Монако, Ніцци, гірських сіл та Італійської Рив'єри: проведіть день у поїздці, а ввечері поверніться до тихіших апартаментів біля моря."),
    category: "day-trips",
    coverImage: "/images/guide/day-trips-from-menton.jpg",
    coverImageAlt: t("Illustration of day trips from Menton", "Illustration des excursions depuis Menton", "Illustrazione delle gite da Mentone", "Ілюстрація поїздок з Ментона"),
    visualTheme: "itinerary",
    visualStatus: "project_illustration",
    tags: [
      t("Monaco", "Monaco", "Monaco", "Монако"),
      t("Nice", "Nice", "Nizza", "Ніцца"),
      t("Italy", "Italie", "Italia", "Італія"),
      t("without a car", "sans voiture", "senza auto", "без авто"),
      t("coastal train", "train cotier", "treno costiero", "прибережний потяг"),
    ],
    bestFor: [guideBestForOptions[3].label, guideBestForOptions[0].label, guideBestForOptions[1].label],
    duration: "full-day",
    locationTags: ["monaco", "nice", "italian-riviera"],
    relatedPlaces: ["menton-station", "menton-garavan-station", "monaco-monte-carlo-station", "nice-ville-station", "ventimiglia-station", "monaco-monte-carlo", "oceanographic-museum-monaco", "prince-monaco-car-collection", "grimaldi-forum-monaco", "nice-old-town", "musee-matisse-nice", "musee-chagall-nice", "palais-lascaris-nice", "musee-photographie-charles-negre-nice", "villefranche-sur-mer", "eze-village", "ventimiglia", "bordighera", "sanremo", "teatro-ariston-sanremo", "dolceacqua", "gorbio", "roquebrune-medieval-village", "sospel-bevera-valley", "roquebrune-cap-martin-coastal-walk", "sentier-douaniers-menton", "monte-carlo-golf-club"],
    relatedArticles: ["jazz-live-music-near-menton", "latin-dancing-salsa-bachata-menton", "tennis-padel-courts-menton", "best-souvenir-shops-menton-monaco-nice", "cycling-bike-rental-menton", "skateparks-near-menton", "car-rental-menton-nice-airport-convertibles", "casinos-near-menton", "best-photo-spots-menton", "famous-paintings-of-menton", "music-videos-filmed-in-menton", "mountains-snow-skiing-near-menton", "best-walks-and-hikes-around-menton", "theatre-opera-performing-arts-near-menton", "wine-tasting-near-menton", "golf-near-menton", "menton-with-kids-family-guide", "supermarkets-in-menton", "michelin-restaurants-menton-nice-monaco", "cinemas-in-menton-nice-monaco", "museums-in-menton-nice-monaco", "menton-three-day-itinerary", "italian-riviera-day-trip-from-menton", "monaco-events-from-menton", "how-to-get-to-menton-from-nice-airport", "menton-without-a-car", "public-transport-in-menton", "where-to-stay-in-menton", "nightlife-in-menton"],
    relatedEvents: ["monaco-grand-prix", "monaco-e-prix", "monaco-run", "rolex-monte-carlo-masters", "nice-half-marathon", "sanremo-music-festival", "sanremo-in-fiore", "milano-sanremo-cycling-race", "nice-jazz-fest", "nice-carnival", "monaco-yacht-show"],
    relatedApartments: allApartments,
    sections: [
      {
        heading: t("Return to a calmer seafront base", "Revenir a une base plus calme au bord de mer", "Rientrare in una base piu calma sul mare", "Повернення до спокійнішої бази біля моря"),
        body: [
          t("Menton makes a good base for day trips: you can spend the day in Monaco, Nice or Italy, then come back to a quieter seafront apartment in the evening. Most of the ideas below work without a car if you use trains and buses.", "Menton est une bonne base pour les excursions: vous pouvez passer la journee a Monaco, Nice ou en Italie, puis revenir le soir dans un appartement plus calme au bord de mer. La plupart des idees ci-dessous fonctionnent sans voiture avec trains et bus.", "Mentone e una buona base per gite in giornata: puoi passare il giorno a Monaco, Nizza o in Italia, poi rientrare la sera in un appartamento piu tranquillo sul mare. La maggior parte delle idee sotto funziona senza auto usando treni e bus.", "Ментон зручний як база для поїздок на день: можна провести день у Монако, Ніцці або Італії, а ввечері повернутися до тихіших апартаментів біля моря. Більшість ідей нижче працює без авто, якщо користуватися потягами й автобусами."),
          t("The rhythm is simple: choose one main destination, check the current return options before leaving, and keep enough energy for a late swim or slow dinner back in Menton.", "Le rythme est simple: choisissez une destination principale, verifiez les retours actuels avant de partir et gardez assez d'energie pour une baignade tardive ou un diner lent a Menton.", "Il ritmo e semplice: scegli una destinazione principale, controlla le opzioni di ritorno aggiornate prima di partire e conserva energia per un bagno tardo o una cena lenta a Mentone.", "Ритм простий: оберіть один основний напрямок, перевірте актуальні варіанти повернення перед виїздом і залиште сили на пізнє купання або повільну вечерю в Ментоні."),
        ],
        relatedPlaceIds: ["menton-station", "menton-garavan-station", "monaco-monte-carlo-station", "nice-ville-station", "ventimiglia-station", "monaco-monte-carlo", "nice-old-town", "ventimiglia"],
      },
      {
        heading: t("Monaco: harbour views and bright nights", "Monaco: vues sur le port et soirees lumineuses", "Monaco: viste sul porto e serate luminose", "Монако: види на порт і яскраві вечори"),
        body: [
          t("Monaco is the easiest day trip from Menton, with frequent TER trains and buses often taking around 15-25 minutes depending on the service. A simple plan is to start in Monaco-Ville, the Rock, for views over Port Hercules, the palace area and cathedral.", "Monaco est l'excursion la plus facile depuis Menton, avec des TER et bus frequents qui prennent souvent environ 15 a 25 minutes selon le service. Un plan simple consiste a commencer par Monaco-Ville, le Rocher, pour les vues sur le Port Hercule, le palais et la cathedrale.", "Monaco e la gita piu facile da Mentone, con TER e bus frequenti che spesso impiegano circa 15-25 minuti secondo il servizio. Un piano semplice e iniziare da Monaco-Ville, la Rocca, per le viste su Port Hercules, il palazzo e la cattedrale.", "Монако - найпростіша поїздка з Ментона: TER і автобуси часто займають приблизно 15-25 хвилин залежно від рейсу. Простий план - почати з Monaco-Ville, Rock, за видами на Port Hercules, район палацу й собор."),
          t("Then walk down to the harbour and finish in the Casino district for architecture, gardens and people-watching. Even if you do not go inside the casino, the square gives you classic Monaco images.", "Descendez ensuite vers le port et terminez dans le quartier du Casino pour l'architecture, les jardins et l'observation de la vie monagasque. Meme sans entrer au casino, la place donne les images classiques de Monaco.", "Poi scendi verso il porto e chiudi nel quartiere del Casino per architettura, giardini e people-watching. Anche senza entrare nel casino, la piazza offre immagini classiche di Monaco.", "Потім спускайтеся до порту й завершуйте в районі Casino заради архітектури, садів і спостереження за людьми. Навіть без входу в казино площа дає класичні кадри Монако."),
          t("If you stay into the evening, Monaco gives livelier nightlife than Menton, from harbour bars to famous spots such as La Rascasse with live music and DJs. Check current programmes and last return options, then come back to quieter Menton to sleep.", "Si vous restez le soir, Monaco offre une vie nocturne plus animee que Menton, des bars du port a des adresses connues comme La Rascasse avec musique live et DJs. Verifiez les programmes actuels et les derniers retours, puis rentrez dormir dans le calme de Menton.", "Se resti la sera, Monaco offre una nightlife piu vivace di Mentone, dai bar del porto a luoghi famosi come La Rascasse con live music e DJ. Controlla programmi aggiornati e ultimi ritorni, poi rientra a dormire nella calma di Mentone.", "Якщо залишитися до вечора, Монако дає жвавіше нічне життя, ніж Ментон: від барів у порту до відомих місць на кшталт La Rascasse з живою музикою та DJs. Перевірте актуальні програми й останні варіанти повернення, а потім вертайтеся спати до спокійнішого Ментона."),
        ],
        relatedPlaceIds: ["monaco-monte-carlo-station", "monaco-monte-carlo", "oceanographic-museum-monaco", "prince-monaco-car-collection", "grimaldi-forum-monaco"],
      },
      {
        heading: t("Nice: big-city Riviera for a day", "Nice: Riviera plus urbaine pour une journee", "Nizza: Riviera da grande citta per un giorno", "Ніцца: міська Рив'єра на день"),
        body: [
          t("Nice is farther away but still easy by direct train from Menton, with journeys usually around 40-50 minutes. Spend the morning in Vieux Nice and around Cours Saleya, where narrow lanes, churches and cafe terraces feel more urban and lively than Menton.", "Nice est plus loin mais reste facile en train direct depuis Menton, avec des trajets souvent autour de 40 a 50 minutes. Passez la matinee dans le Vieux Nice et autour du Cours Saleya, ou ruelles, eglises et terrasses de cafes donnent une ambiance plus urbaine et animee que Menton.", "Nizza e piu lontana ma resta facile con treno diretto da Mentone, con viaggi di solito intorno a 40-50 minuti. Passa la mattina nel Vieux Nice e intorno a Cours Saleya, dove vicoli, chiese e terrazze hanno un'atmosfera piu urbana e vivace di Mentone.", "Ніцца далі, але все ще зручна прямим потягом із Ментона, дорога зазвичай близько 40-50 хвилин. Проведіть ранок у Vieux Nice та біля Cours Saleya, де вузькі вулиці, церкви й тераси кафе дають більш міський і жвавий настрій, ніж Ментон."),
          t("In the afternoon, walk or cycle along Promenade des Anglais, climb Colline du Château for panoramic views over Baie des Anges, then choose between a beach stop or museums depending on your interests.", "L'apres-midi, marchez ou pedalez sur la Promenade des Anglais, montez a la Colline du Château pour les panoramas sur la Baie des Anges, puis choisissez entre plage ou musees selon vos envies.", "Nel pomeriggio cammina o pedala sulla Promenade des Anglais, sali alla Colline du Château per viste panoramiche sulla Baie des Anges, poi scegli tra spiaggia o musei secondo i tuoi interessi.", "Вдень пройдіться або проїдьтеся Promenade des Anglais, підніміться на Colline du Château за панорамами Baie des Anges, а потім обирайте пляж або музеї залежно від інтересів."),
          t("If you want one bigger night out during your stay, Nice has the densest bar and nightlife scene in the area. You can still return to Menton the same evening if you check last trains and keep a taxi or ride-hailing option as backup.", "Si vous voulez une soiree plus grande pendant le sejour, Nice a la scene de bars et nightlife la plus dense de la region. Vous pouvez quand meme rentrer a Menton le soir meme si vous verifiez les derniers trains et gardez taxi ou VTC en plan B.", "Se vuoi una serata piu grande durante il soggiorno, Nizza ha la scena di bar e nightlife piu densa della zona. Puoi comunque rientrare a Mentone la stessa sera se controlli gli ultimi treni e tieni taxi o ride-hailing come backup.", "Якщо хочете один більший вечір під час перебування, у Ніцці найнасиченіша сцена барів і нічного життя в регіоні. Ви все одно можете повернутися до Ментона того ж вечора, якщо перевірите останні потяги й матимете таксі або ride-hailing як запасний варіант."),
        ],
        relatedPlaceIds: ["nice-ville-station", "nice-old-town", "musee-matisse-nice", "musee-chagall-nice", "palais-lascaris-nice", "musee-photographie-charles-negre-nice"],
      },
      {
        heading: t("Hilltop villages: Èze and the mountains above Menton", "Villages perches: Eze et les montagnes au-dessus de Menton", "Borghi collinari: Eze e le montagne sopra Mentone", "Гірські села: Ез і гори над Ментоном"),
        body: [
          t("For a change of scenery, combine the coast with a hilltop village. Èze is the classic choice between Nice and Monaco: reach Èze-sur-Mer by train, then check the current bus or taxi options up to Èze-Village for steep lanes, stone houses and wide sea views.", "Pour changer de decor, combinez la cote avec un village perche. Eze est le classique entre Nice et Monaco: rejoignez Eze-sur-Mer en train, puis verifiez les bus ou taxis actuels vers Eze-Village pour ses ruelles raides, maisons de pierre et grandes vues mer.", "Per cambiare scenario, combina la costa con un borgo collinare. Eze e il classico tra Nizza e Monaco: raggiungi Èze-sur-Mer in treno, poi controlla bus o taxi aggiornati per Èze-Village, con vicoli ripidi, case in pietra e ampie viste sul mare.", "Для зміни пейзажу поєднайте узбережжя з гірським селом. Ез - класичний варіант між Ніццою та Монако: доїдьте потягом до Èze-sur-Mer, а потім перевірте актуальні автобуси або таксі до Èze-Village заради крутих вуличок, кам'яних будинків і широких видів на море."),
          t("Closer to Menton, villages such as Sainte-Agnès or Gorbio offer even more dramatic balcony-style views over sea and mountains, with a quieter, almost Alpine feel. They work best with a car or carefully checked bus times, especially for the return.", "Plus pres de Menton, des villages comme Sainte-Agnes ou Gorbio offrent des vues encore plus spectaculaires en balcon sur la mer et les montagnes, dans une ambiance plus calme presque alpine. Ils fonctionnent mieux en voiture ou avec des horaires de bus soigneusement verifies, surtout pour le retour.", "Piu vicino a Mentone, villaggi come Sainte-Agnès o Gorbio offrono viste ancora piu spettacolari a balcone su mare e montagne, con un'atmosfera piu tranquilla quasi alpina. Funzionano meglio in auto o con orari bus controllati con attenzione, soprattutto per il ritorno.", "Ближче до Ментона села на кшталт Sainte-Agnès або Gorbio дають ще драматичніші види-балкони на море й гори, зі спокійнішим, майже альпійським настроєм. Вони найкраще працюють з авто або дуже уважно перевіреним розкладом автобусів, особливо на повернення."),
          t("These villages are good if you want to pair one city day with one slower day in the hills, rather than spending every excursion on the coast.", "Ces villages sont utiles si vous voulez associer une journee urbaine a une journee plus lente dans les collines, plutot que de passer toutes les excursions sur la cote.", "Questi borghi sono ideali se vuoi abbinare una giornata urbana a una giornata piu lenta sulle colline, invece di passare tutte le gite sulla costa.", "Такі села добрі, якщо хочете поєднати один міський день із повільнішим днем у пагорбах, а не проводити всі поїздки лише на узбережжі."),
        ],
        relatedPlaceIds: ["eze-village", "gorbio", "roquebrune-medieval-village", "sospel-bevera-valley"],
      },
      {
        heading: t("Italian Riviera: Ventimiglia, Bordighera and Sanremo", "Riviera italienne: Vintimille, Bordighera et Sanremo", "Riviera italiana: Ventimiglia, Bordighera e Sanremo", "Італійська Рив'єра: Вентімілья, Бордігера та Санремо"),
        body: [
          t("Heading east from Menton, the train crosses into Italy and opens up a chain of Ligurian towns. Ventimiglia is the closest and easiest, especially on market days, when the town is busy and its food market is useful for Italian produce, pasta and focaccia.", "En partant vers l'est depuis Menton, le train passe en Italie et ouvre une chaine de villes ligures. Vintimille est la plus proche et la plus facile, surtout les jours de marche, quand la ville est animee et que son marche alimentaire permet de trouver produits italiens, pates et focaccia.", "Andando a est da Mentone, il treno entra in Italia e apre una serie di cittadine liguri. Ventimiglia e la piu vicina e facile, soprattutto nei giorni di mercato, quando la citta e vivace e il mercato alimentare e utile per prodotti italiani, pasta e focaccia.", "Рухаючись на схід від Ментона, потяг перетинає кордон з Італією й відкриває ланцюжок лігурійських міст. Вентімілья найближча й найпростіша, особливо в ринкові дні, коли місто жваве, а продуктовий ринок корисний для італійських продуктів, пасти та focaccia."),
          t("Farther along the line, Bordighera and Sanremo offer promenades, beaches, old streets and a different architectural rhythm from the French side. Choose one town for a focused day or combine two shorter stops if you are comfortable with the train schedule.", "Plus loin sur la ligne, Bordighera et Sanremo offrent promenades, plages, vieilles rues et un rythme architectural different du cote francais. Choisissez une ville pour une journee ciblee ou combinez deux arrets plus courts si les horaires de train vous conviennent.", "Piu avanti sulla linea, Bordighera e Sanremo offrono passeggiate, spiagge, strade antiche e un ritmo architettonico diverso dal lato francese. Scegli una citta per una giornata concentrata o combina due soste brevi se gli orari dei treni sono comodi.", "Далі по лінії Бордігера й Санремо пропонують променады, пляжі, старі вулиці й інший архітектурний ритм, ніж французький бік. Оберіть одне місто для сфокусованого дня або поєднайте дві коротші зупинки, якщо вам зручний розклад потягів."),
          t("For most guests, Italy works best as a food-and-walk day: coffee, market or old streets, a pasta or seafood lunch, then a train back to Menton for an easy evening.", "Pour la plupart des visiteurs, l'Italie fonctionne mieux comme journee nourriture et balade: cafe, marche ou vieilles rues, dejeuner de pates ou fruits de mer, puis train retour vers Menton pour une soiree simple.", "Per molti ospiti, l'Italia funziona meglio come giornata di cibo e passeggiata: caffe, mercato o vie antiche, pranzo di pasta o pesce, poi treno di ritorno a Mentone per una serata facile.", "Для більшості гостей Італія найкраще працює як день їжі та прогулянок: кава, ринок або старі вулиці, обід із пастою чи морепродуктами, а потім потяг назад у Ментон на легкий вечір."),
        ],
        relatedPlaceIds: ["ventimiglia-station", "ventimiglia", "bordighera", "sanremo", "teatro-ariston-sanremo", "dolceacqua"],
      },
      {
        heading: t("Short boat trips and coastal views", "Petites sorties en bateau et vues cotieres", "Brevi uscite in barca e viste costiere", "Короткі морські прогулянки й види узбережжя"),
        body: [
          t("Depending on the season, boat excursions may run from nearby ports, giving a chance to see Menton, Cap Martin and Monaco from the sea. Treat them as optional and check current availability locally, because programmes change with weather and season.", "Selon la saison, des excursions en bateau peuvent partir de ports proches et offrir une autre vue sur Menton, Cap Martin et Monaco depuis la mer. Voyez-les comme une option et verifiez la disponibilite actuelle sur place, car les programmes changent avec la meteo et la saison.", "Secondo la stagione, escursioni in barca possono partire da porti vicini e offrire un'altra vista di Mentone, Cap Martin e Monaco dal mare. Considerale opzionali e controlla disponibilita aggiornata sul posto, perche programmi cambiano con meteo e stagione.", "Залежно від сезону, з сусідніх портів можуть бути морські екскурсії, що дають змогу побачити Ментон, Cap Martin і Монако з моря. Сприймайте їх як опцію й перевіряйте актуальну доступність на місці, бо програми залежать від погоди та сезону."),
          t("If you prefer to keep things simple, the Menton-Monaco-Nice train line can work like a moving balcony: sit by the window, choose one or two stops, and enjoy the sea views between stations without over-planning.", "Si vous preferez rester simple, la ligne Menton-Monaco-Nice peut fonctionner comme un balcon mobile: asseyez-vous cote fenetre, choisissez un ou deux arrets et profitez des vues mer entre les gares sans trop planifier.", "Se preferisci semplificare, la linea Mentone-Monaco-Nizza puo diventare un balcone in movimento: siediti al finestrino, scegli una o due fermate e goditi le viste sul mare tra le stazioni senza pianificare troppo.", "Якщо хочете все спростити, лінія Menton-Monaco-Nice може працювати як рухомий балкон: сідайте біля вікна, оберіть одну-дві зупинки й насолоджуйтеся морськими видами між станціями без надмірного планування."),
        ],
        relatedPlaceIds: ["villefranche-sur-mer", "roquebrune-cap-martin-coastal-walk", "sentier-douaniers-menton", "monaco-monte-carlo"],
      },
      {
        heading: t("How to choose and plan", "Comment choisir et organiser", "Come scegliere e pianificare", "Як обрати й спланувати"),
        body: [
          t("For most first-time visitors, three classic day trips already make a strong combination: one day in Monaco, one in Nice and one in Italy, such as Ventimiglia or Bordighera. All are reachable by TER train from Menton, so you do not need a car.", "Pour la plupart des premiers sejours, trois excursions classiques suffisent a composer un bel ensemble: une journee a Monaco, une a Nice et une en Italie, par exemple Vintimille ou Bordighera. Toutes sont accessibles en TER depuis Menton, donc sans voiture.", "Per molti primi soggiorni, tre gite classiche formano gia una combinazione forte: un giorno a Monaco, uno a Nizza e uno in Italia, per esempio Ventimiglia o Bordighera. Tutte sono raggiungibili in TER da Mentone, quindi senza auto.", "Для більшості перших поїздок три класичні напрями вже дають сильну комбінацію: один день у Монако, один у Ніцці й один в Італії, наприклад у Вентімільї або Бордігері. Усі доступні TER з Ментона, тож авто не потрібне."),
          t("Check train and bus timetables close to your travel date, especially on Sundays, public holidays and major event weekends such as the Monaco Grand Prix or Nice festivals. If a day feels too full, shorten it and come back for a late afternoon swim on Menton's beaches.", "Verifiez trains et bus pres de votre date, surtout les dimanches, jours feries et grands week-ends d'evenements comme le Grand Prix de Monaco ou les festivals de Nice. Si une journee semble trop chargee, raccourcissez-la et rentrez pour une baignade de fin d'apres-midi sur les plages de Menton.", "Controlla treni e bus vicino alla data del viaggio, soprattutto domeniche, festivi e grandi weekend di eventi come Monaco Grand Prix o festival di Nizza. Se una giornata sembra troppo piena, accorciala e torna per un bagno di fine pomeriggio sulle spiagge di Mentone.", "Перевіряйте розклад потягів і автобусів ближче до дати, особливо в неділю, свята та великі event weekends на кшталт Monaco Grand Prix або фестивалів у Ніцці. Якщо день здається занадто щільним, скоротіть його й поверніться на пізнє купання на пляжах Ментона."),
        ],
      },
    ],
    practicalTips: [
      t("For first-time visitors: Monaco, Nice and one Italian town make the clearest three-trip set.", "Pour un premier sejour: Monaco, Nice et une ville italienne forment le trio le plus clair.", "Per un primo soggiorno: Monaco, Nizza e una citta italiana sono il trio piu chiaro.", "Для першого візиту: Монако, Ніцца й одне італійське місто - найзрозуміліший набір із трьох поїздок."),
      t("Use trains for Monaco, Nice and Ventimiglia when possible; check bus returns carefully for hill villages.", "Utilisez le train pour Monaco, Nice et Vintimille quand c'est possible; verifiez soigneusement les bus retour pour les villages perches.", "Usa il treno per Monaco, Nizza e Ventimiglia quando possibile; controlla bene i bus di ritorno per i borghi collinari.", "Користуйтеся потягами до Монако, Ніцци й Вентімільї, коли можливо; для гірських сіл уважно перевіряйте автобуси назад."),
      t("During big events, plan transport earlier and expect fuller trains or roads.", "Pendant les grands evenements, planifiez le transport plus tot et prevoyez trains ou routes plus charges.", "Durante grandi eventi, pianifica i trasporti prima e aspettati treni o strade piu pieni.", "Під час великих подій плануйте транспорт раніше й очікуйте повніших потягів або доріг."),
    ],
  }),
  shortArticle({
    id: "monaco-events-from-menton",
    slug: "monaco-events-from-menton",
    title: t("Monaco events from Menton: trains, crowds and booking tips", "Evenements a Monaco depuis Menton : trains, foule et conseils de reservation", "Eventi a Monaco da Mentone: treni, folla e consigli di prenotazione", "Події в Монако з Ментона: потяги, натовпи й поради з бронювання"),
    seoTitle: t("Monaco Events from Menton: Train, Crowds & Booking Tips", "Evenements a Monaco depuis Menton | Train, foule et reservations", "Eventi a Monaco da Mentone | Treni, folla e prenotazioni", "Події в Монако з Ментона | Потяг, натовпи й бронювання"),
    seoDescription: t("Planning Monaco Grand Prix, Yacht Show, E-Prix, Rolex Monte-Carlo Masters or other major Monaco events? Use Menton as a calmer Riviera base with train tips, crowd advice and booking notes.", "Vous planifiez le Grand Prix de Monaco, le Yacht Show, l'E-Prix, le Rolex Monte-Carlo Masters ou d'autres grands evenements ? Utilisez Menton comme base plus calme avec conseils train, foule et reservation.", "Stai pianificando Gran Premio di Monaco, Yacht Show, E-Prix, Rolex Monte-Carlo Masters o altri grandi eventi? Usa Mentone come base piu calma con consigli su treni, folla e prenotazioni.", "Плануєте Grand Prix Monaco, Yacht Show, E-Prix, Rolex Monte-Carlo Masters чи інші великі події? Використовуйте Ментон як спокійнішу базу з порадами щодо потягів, натовпів і бронювання."),
    excerpt: t("Menton is one of the easiest places to stay for Monaco events: close enough for a quick train ride, but calmer than the Principality during major race, yacht, tennis and gala weekends.", "Menton est l'une des bases les plus simples pour les evenements de Monaco : assez proche en train, mais plus calme que la Principaute pendant les grands week-ends de course, yacht, tennis ou gala.", "Mentone e una delle basi piu semplici per gli eventi di Monaco: abbastanza vicina in treno, ma piu calma del Principato durante weekend di gare, yacht, tennis e gala.", "Ментон - одна з найзручніших баз для подій у Монако: близько коротким потягом, але спокійніше, ніж у Князівстві під час перегонів, яхт-шоу, тенісу й гала-вечорів."),
    category: "day-trips",
    coverImage: "/images/guide/monaco-events-from-menton.jpg",
    coverImageAlt: t("Illustration of Monaco events from Menton", "Illustration des evenements a Monaco depuis Menton", "Illustrazione degli eventi a Monaco da Mentone", "Ілюстрація подій у Монако з Ментона"),
    visualTheme: "event",
    visualStatus: "project_illustration",
    tags: [
      t("Monaco events", "evenements Monaco", "eventi Monaco", "події Монако"),
      t("train", "train", "treno", "потяг"),
      t("booking tips", "conseils reservation", "consigli prenotazione", "поради з бронювання"),
      t("without a car", "sans voiture", "senza auto", "без авто"),
    ],
    bestFor: [guideBestForOptions[3].label, guideBestForOptions[4].label, guideBestForOptions[1].label],
    duration: "reference",
    locationTags: ["monaco", "transport", "events"],
    sourceStatus: "needs_verification",
    relatedPlaces: ["monaco-monte-carlo"],
    relatedArticles: ["jazz-live-music-near-menton", "latin-dancing-salsa-bachata-menton", "tennis-padel-courts-menton", "best-souvenir-shops-menton-monaco-nice", "car-rental-menton-nice-airport-convertibles", "casinos-near-menton", "theatre-opera-performing-arts-near-menton", "golf-near-menton", "day-trips-from-menton", "public-transport-in-menton", "menton-without-a-car", "where-to-stay-in-menton", "how-to-get-to-menton-from-nice-airport", "nightlife-in-menton"],
    relatedEvents: ["monaco-grand-prix", "monaco-e-prix", "monaco-yacht-show", "rolex-monte-carlo-masters", "jumping-international-monte-carlo", "monte-carlo-circus-festival", "rallye-automobile-monte-carlo", "rallye-monte-carlo-historique", "monaco-red-cross-gala", "monaco-run"],
    relatedApartments: allApartments,
    sections: [
      {
        heading: t("Why stay in Menton for Monaco events?", "Pourquoi loger a Menton pour les evenements de Monaco ?", "Perche soggiornare a Mentone per gli eventi di Monaco?", "Чому зупинятися в Ментоні на події в Монако?"),
        body: [
          t("Monaco hosts some of the Riviera's most visible events: Formula 1, the Monaco Yacht Show, the Monaco E-Prix, Rolex Monte-Carlo Masters, Jumping International, the International Circus Festival, the Monte-Carlo Rally and gala evenings.", "Monaco accueille plusieurs grands rendez-vous de la Riviera : Formule 1, Monaco Yacht Show, Monaco E-Prix, Rolex Monte-Carlo Masters, Jumping International, Festival du Cirque, Rallye Monte-Carlo et soirees de gala.", "Monaco ospita alcuni degli eventi piu visibili della Riviera: Formula 1, Monaco Yacht Show, Monaco E-Prix, Rolex Monte-Carlo Masters, Jumping International, Festival del Circo, Rallye Monte-Carlo e serate di gala.", "Монако приймає найпомітніші події Рив'єри: Formula 1, Monaco Yacht Show, Monaco E-Prix, Rolex Monte-Carlo Masters, Jumping International, Circus Festival, Rallye Monte-Carlo і гала-вечори."),
          t("During those dates, staying inside Monaco can be difficult, expensive and crowded. Menton gives you a quieter seaside base with beaches, old-town restaurants and direct regional trains to Monaco-Monte-Carlo.", "Pendant ces dates, loger a Monaco peut etre difficile, cher et tres dense. Menton offre une base plus calme au bord de mer, avec plages, restaurants de vieille ville et trains directs vers Monaco-Monte-Carlo.", "In quelle date alloggiare a Monaco puo essere difficile, costoso e affollato. Mentone offre una base sul mare piu tranquilla, con spiagge, ristoranti del centro storico e treni diretti per Monaco-Monte-Carlo.", "У ці дати жити в Монако може бути складно, дорого й дуже людно. Ментон дає спокійнішу морську базу з пляжами, ресторанами старого міста й прямими регіональними потягами до Monaco-Monte-Carlo."),
          t("The advantage is not that you avoid every crowd. The advantage is that you can leave the event zone at the end of the day and return to a calmer coastal town.", "L'avantage n'est pas d'eviter toute foule. L'avantage est de quitter la zone evenementielle en fin de journee et de rentrer dans une ville cotiere plus calme.", "Il vantaggio non e evitare ogni folla. Il vantaggio e uscire dalla zona evento a fine giornata e tornare in una cittadina costiera piu calma.", "Перевага не в тому, що ви уникаєте всіх натовпів. Перевага в тому, що наприкінці дня можна вийти із зони події й повернутися до спокійнішого приморського міста."),
        ],
        relatedPlaceIds: ["monaco-monte-carlo"],
        relatedApartmentKeys: allApartments,
      },
      {
        heading: t("The easiest way is the train", "Le plus simple : le train", "Il modo piu semplice e il treno", "Найпростіше - потягом"),
        body: [
          t("For most Monaco events, the train is the simplest route from Menton: Menton or Menton Garavan to Monaco-Monte-Carlo. The ride is short, but major events add time at platforms, exits, security barriers and pedestrian routes.", "Pour la plupart des evenements, le train est l'option la plus simple depuis Menton : Menton ou Menton Garavan vers Monaco-Monte-Carlo. Le trajet est court, mais les grands evenements ajoutent du temps aux quais, sorties, controles et cheminements pietons.", "Per la maggior parte degli eventi, il treno e l'opzione piu semplice da Mentone: Menton o Menton Garavan verso Monaco-Monte-Carlo. Il viaggio e breve, ma i grandi eventi aggiungono tempo su banchine, uscite, controlli e percorsi pedonali.", "Для більшості подій у Монако найпростіше їхати потягом: Menton або Menton Garavan до Monaco-Monte-Carlo. Поїздка коротка, але великі події додають час на платформах, виходах, контролі й пішохідних маршрутах."),
          t("Monaco is compact but vertical. Close on the map can still mean lifts, tunnels, stairs or a longer walk. For a normal Monaco day, leave when convenient; for a major event day, leave earlier than feels necessary.", "Monaco est compacte mais verticale. Une adresse proche sur la carte peut impliquer ascenseurs, tunnels, escaliers ou une marche plus longue. Pour une journee normale, partez simplement; pour un grand evenement, partez plus tot que necessaire.", "Monaco e compatta ma verticale. Vicino sulla mappa puo significare ascensori, tunnel, scale o una camminata piu lunga. Per un giorno normale parti quando vuoi; per un grande evento parti prima di quanto sembri necessario.", "Монако компактне, але вертикальне. Близько на карті може означати ліфти, тунелі, сходи або довшу прогулянку. У звичайний день виїжджайте зручно; на велику подію - раніше, ніж здається потрібним."),
        ],
        bullets: [
          t("Check current train times before leaving.", "Verifiez les horaires actuels avant de partir.", "Controlla gli orari aggiornati prima di partire.", "Перевірте актуальний розклад перед виїздом."),
          t("Plan the return before evening events.", "Planifiez le retour avant les evenements du soir.", "Pianifica il ritorno prima degli eventi serali.", "Сплануйте повернення до вечірньої події."),
          t("Allow extra time for Monaco station exits on race and show days.", "Prevoyez plus de temps pour les sorties de gare les jours de course ou salon.", "Prevedi piu tempo per uscire dalla stazione nei giorni di gara o salone.", "Закладіть більше часу на вихід зі станції в дні перегонів і виставок."),
        ],
      },
      {
        heading: t("Should you drive to Monaco during big events?", "Faut-il conduire jusqu'a Monaco pendant les grands evenements ?", "Conviene guidare fino a Monaco durante i grandi eventi?", "Чи варто їхати до Монако авто під час великих подій?"),
        body: [
          t("Usually, no. Driving can work for quieter plans, mobility needs or private evening arrangements, but for Formula 1, E-Prix and other busy weekends, roads, parking, closures and pick-up points can become the difficult part of the day.", "En general, non. La voiture peut marcher pour une visite calme, des besoins de mobilite ou une soiree privee, mais pour la Formule 1, l'E-Prix et les gros week-ends, routes, parking, fermetures et depose-minute compliquent vite la journee.", "Di solito no. L'auto puo funzionare per visite tranquille, esigenze di mobilita o serate private, ma per Formula 1, E-Prix e weekend intensi, strade, parcheggi, chiusure e punti di pick-up diventano la parte difficile.", "Зазвичай ні. Авто може підійти для спокійних планів, потреб мобільності або приватних вечорів, але під час Formula 1, E-Prix та інших насичених вікендів дороги, паркування, перекриття й точки посадки стають найскладнішою частиною дня."),
          t("If you must drive, reserve parking where possible and check Monaco event access rules before leaving Menton.", "Si vous devez conduire, reservez le parking si possible et verifiez les regles d'acces evenementiel avant de quitter Menton.", "Se devi guidare, prenota il parcheggio quando possibile e controlla le regole di accesso prima di lasciare Mentone.", "Якщо авто необхідне, за можливості бронюйте паркування й перевіряйте правила доступу в Монако до виїзду з Ментона."),
        ],
      },
      {
        heading: t("Main Monaco events to plan around", "Les grands evenements de Monaco a anticiper", "I principali eventi di Monaco da pianificare", "Головні події Монако, які варто планувати заздалегідь"),
        body: [
          t("Formula 1 Monaco Grand Prix is the biggest crowd magnet and should be treated as a major travel project. Monaco E-Prix is a more compact motorsport weekend, while Rolex Monte-Carlo Masters is one of the best spring sport reasons to stay on the eastern Riviera.", "Le Grand Prix de Formule 1 est le plus fort aimant a foule et se prepare comme un vrai projet de voyage. Le Monaco E-Prix est un week-end sport auto plus compact, tandis que le Rolex Monte-Carlo Masters est l'un des grands motifs sportifs du printemps.", "Il Gran Premio di Formula 1 e il piu grande richiamo di folla e va trattato come un vero progetto di viaggio. Il Monaco E-Prix e un weekend motoristico piu compatto, mentre il Rolex Monte-Carlo Masters e uno dei migliori motivi sportivi di primavera.", "Grand Prix Monaco Formula 1 - найбільший магніт для натовпів, його варто планувати як серйозну подорож. Monaco E-Prix компактніший, а Rolex Monte-Carlo Masters - один із найкращих весняних спортивних приводів."),
          t("Monaco Yacht Show fills Port Hercule with a more business-oriented yachting crowd. Jumping International, the International Circus Festival, Monte-Carlo Rally, Rallye Historique and the Red Cross Gala each need their own timing, ticket and return-transport check.", "Le Monaco Yacht Show remplit le Port Hercule d'une audience plus professionnelle autour du yachting. Jumping International, Festival du Cirque, Rallye Monte-Carlo, Rallye Historique et Gala de la Croix-Rouge demandent chacun de verifier horaires, billets et retour.", "Il Monaco Yacht Show riempie Port Hercule con un pubblico yachting piu business. Jumping International, Festival del Circo, Rallye Monte-Carlo, Rallye Historique e Gala della Croce Rossa richiedono ciascuno controlli su orari, biglietti e ritorno.", "Monaco Yacht Show наповнює Port Hercule більш діловою яхтовою аудиторією. Jumping International, Circus Festival, Monte-Carlo Rally, Rallye Historique і Red Cross Gala потребують окремої перевірки часу, квитків і повернення."),
        ],
        relatedEventIds: ["monaco-grand-prix", "monaco-e-prix", "rolex-monte-carlo-masters", "monaco-yacht-show", "jumping-international-monte-carlo", "monte-carlo-circus-festival"],
      },
      {
        heading: t("Best Monaco events by season", "Les meilleurs evenements de Monaco par saison", "I migliori eventi di Monaco per stagione", "Найкращі події Монако за сезонами"),
        body: [
          t("Winter is rally and circus season. Spring is strong for tennis, E-Prix and running weekends. Early summer belongs to Formula 1. High summer brings jumping, gala evenings and concerts. September is dominated by the Monaco Yacht Show.", "L'hiver est la saison des rallyes et du cirque. Le printemps convient au tennis, a l'E-Prix et aux courses. Le debut d'ete appartient a la Formule 1. Le plein ete apporte jumping, galas et concerts. Septembre est domine par le Monaco Yacht Show.", "L'inverno e stagione di rally e circo. La primavera e forte per tennis, E-Prix e running. L'inizio estate appartiene alla Formula 1. L'alta estate porta jumping, gala e concerti. Settembre e dominato dal Monaco Yacht Show.", "Зима - сезон ралі й цирку. Весна сильна тенісом, E-Prix і біговими вікендами. Початок літа належить Formula 1. Високе літо дає jumping, гала й концерти. Вересень домінує Monaco Yacht Show."),
          t("For any event, check the current official page before booking travel. The site event cards keep confirmed and pending dates separate so you do not have to rely on old editions.", "Pour chaque evenement, verifiez la page officielle actuelle avant de reserver. Les fiches evenement du site distinguent dates confirmees et dates en attente pour eviter les anciennes editions.", "Per ogni evento controlla la pagina ufficiale aggiornata prima di prenotare. Le schede evento del sito separano date confermate e date in attesa, evitando vecchie edizioni.", "Для будь-якої події перевіряйте актуальну офіційну сторінку перед бронюванням. Картки подій на сайті відокремлюють підтверджені й очікувані дати, щоб не спиратися на старі випуски."),
        ],
        relatedEventIds: ["rallye-automobile-monte-carlo", "rallye-monte-carlo-historique", "monaco-run", "monaco-red-cross-gala"],
      },
      {
        heading: t("A simple one-day rhythm", "Un rythme simple sur une journee", "Un ritmo semplice per una giornata", "Простий ритм на один день"),
        body: [
          t("Start with breakfast in Menton, then take the train to Monaco-Monte-Carlo. Arrive earlier than the official start time if the event is large or ticketed. After the event, avoid rushing straight into the busiest crowd wave.", "Commencez par le petit dejeuner a Menton, puis prenez le train vers Monaco-Monte-Carlo. Arrivez plus tot que l'heure officielle si l'evenement est grand ou billeté. Apres, evitez de repartir dans la vague la plus dense.", "Inizia con colazione a Mentone, poi prendi il treno per Monaco-Monte-Carlo. Arriva prima dell'orario ufficiale se l'evento e grande o con biglietto. Dopo, evita di rientrare nella prima ondata piu affollata.", "Почніть зі сніданку в Ментоні, потім сідайте на потяг до Monaco-Monte-Carlo. Приїжджайте раніше офіційного старту, якщо подія велика або квиткова. Після не поспішайте в найщільнішу хвилю натовпу."),
          t("For family events, keep the day shorter. For Formula 1 and Yacht Show days, plan around crowd fatigue. For gala or evening events, arrange return transport before you leave Menton.", "Avec des enfants, gardez une journee plus courte. Pour la Formule 1 et le Yacht Show, prevoyez la fatigue de foule. Pour les galas ou soirees, organisez le retour avant de quitter Menton.", "Con bambini, tieni la giornata piu corta. Per Formula 1 e Yacht Show, considera la stanchezza da folla. Per gala o eventi serali, organizza il ritorno prima di lasciare Mentone.", "Для сімейних подій робіть день коротшим. Для Formula 1 і Yacht Show враховуйте втому від натовпів. Для гала чи вечірніх подій організуйте повернення до виїзду з Ментона."),
        ],
        relatedApartmentKeys: allApartments,
      },
    ],
    practicalTips: [
      t("Book accommodation earlier than usual around major Monaco dates.", "Reservez l'hebergement plus tot que d'habitude autour des grandes dates de Monaco.", "Prenota l'alloggio prima del solito intorno alle grandi date di Monaco.", "Бронюйте житло раніше, ніж зазвичай, навколо великих дат Монако."),
      t("Use the train for most daytime events.", "Utilisez le train pour la plupart des evenements de jour.", "Usa il treno per la maggior parte degli eventi diurni.", "Для більшості денних подій користуйтеся потягом."),
      t("Do not rely only on taxis after major events.", "Ne comptez pas uniquement sur les taxis apres les grands evenements.", "Non affidarti solo ai taxi dopo i grandi eventi.", "Не покладайтеся лише на таксі після великих подій."),
      t("Return to Menton for a calmer dinner when Monaco is crowded.", "Rentrez diner plus calmement a Menton quand Monaco est charge.", "Rientra a Mentone per una cena piu calma quando Monaco e affollata.", "Поверніться до Ментона на спокійнішу вечерю, коли Монако переповнене."),
    ],
  }),
  shortArticle({
    id: "fete-du-citron-menton-practical-guide",
    slug: "fete-du-citron-menton-practical-guide",
    title: t("Fete du Citron practical guide: where to stay, tickets, parades and walking routes", "Guide pratique de la Fete du Citron : ou loger, billets, defiles et parcours a pied", "Guida pratica alla Festa del Limone: dove dormire, biglietti, sfilate e percorsi a piedi", "Практичний гід Fete du Citron: де зупинитися, квитки, паради й піші маршрути"),
    seoTitle: t("Fete du Citron Menton Guide: Where to Stay, Tickets, Parades & Walking Routes", "Guide Fete du Citron Menton | Logement, billets, defiles et parcours", "Guida Festa del Limone Mentone | Alloggi, biglietti, sfilate e percorsi", "Гід Fete du Citron у Ментоні | Житло, квитки, паради й маршрути"),
    seoDescription: t("Planning a trip to the Fete du Citron in Menton? Learn where to stay, how tickets work, when to arrive for parades, how to walk around the festival zone, and why Victoria Beach is a major advantage.", "Vous preparez la Fete du Citron a Menton ? Ou loger, comment fonctionnent les billets, quand arriver aux defiles, comment marcher dans la zone festival et pourquoi Victoria Beach est un avantage.", "Stai pianificando la Festa del Limone a Mentone? Dove dormire, come funzionano i biglietti, quando arrivare alle sfilate, come muoversi a piedi e perche Victoria Beach e un vantaggio.", "Плануєте Fete du Citron у Ментоні? Де жити, як працюють квитки, коли приходити на паради, як ходити фестивальною зоною і чому Victoria Beach дає перевагу."),
    excerpt: t("Menton's Lemon Festival fills the seafront with citrus sculptures, parades and winter Riviera colour. This practical guide explains tickets, timing, walking routes and the comfort of staying in central Menton.", "La Fete du Citron remplit le front de mer de sculptures d'agrumes, defiles et couleurs d'hiver. Ce guide explique billets, horaires, parcours a pied et confort d'un sejour central.", "La Festa del Limone riempie il lungomare di sculture di agrumi, sfilate e colori invernali. Questa guida spiega biglietti, tempi, percorsi e comfort di una base centrale.", "Фестиваль лимонів наповнює набережну цитрусовими скульптурами, парадами й зимовим кольором Рив'єри. Гід пояснює квитки, час, маршрути й комфорт центрального проживання."),
    category: "practical",
    coverImage: "/images/guide/fete-du-citron-menton-practical-guide.jpg",
    coverImageAlt: t("Illustration of the Fete du Citron in Menton", "Illustration de la Fete du Citron a Menton", "Illustrazione della Festa del Limone a Mentone", "Ілюстрація Fete du Citron у Ментоні"),
    visualTheme: "event",
    visualStatus: "project_illustration",
    tags: [
      t("Fete du Citron", "Fete du Citron", "Festa del Limone", "Fete du Citron"),
      t("winter festival", "festival d'hiver", "festival invernale", "зимовий фестиваль"),
      t("tickets", "billets", "biglietti", "квитки"),
      t("Victoria Beach", "Victoria Beach", "Victoria Beach", "Victoria Beach"),
    ],
    bestFor: [guideBestForOptions[0].label, guideBestForOptions[1].label, guideBestForOptions[4].label],
    duration: "flexible",
    locationTags: ["menton-centre", "seafront", "old-town"],
    sourceStatus: "needs_verification",
    relatedPlaces: ["jardins-bioves", "palais-de-leurope-menton", "promenade-du-soleil", "rampes-saint-michel", "cimetiere-vieux-chateau", "halles-du-marche", "maison-herbin-menton", "rue-saint-michel-menton", "plage-casino", "plage-fossan"],
    relatedArticles: ["music-videos-filmed-in-menton", "where-to-stay-in-menton", "menton-without-a-car", "public-transport-in-menton", "menton-old-town", "best-photo-spots-menton", "menton-with-kids-family-guide", "local-food-menton"],
    relatedEvents: ["menton-lemon-festival", "nice-carnival", "monte-carlo-circus-festival"],
    relatedApartments: allApartments,
    sections: [
      {
        heading: t("Why the Lemon Festival is worth planning around", "Pourquoi organiser son sejour autour de la Fete du Citron", "Perche pianificare il soggiorno intorno alla Festa del Limone", "Чому Фестиваль лимонів варто планувати заздалегідь"),
        body: [
          t("The Fete du Citron is one of the Riviera's most distinctive winter events: citrus sculptures, decorated floats, parades, light displays, craft stalls, gardens and festive street life across central Menton.", "La Fete du Citron est l'un des evenements d'hiver les plus distinctifs de la Riviera : sculptures d'agrumes, chars decores, defiles, lumieres, marche artisanal, jardins et vie festive au centre de Menton.", "La Festa del Limone e uno degli eventi invernali piu caratteristici della Riviera: sculture di agrumi, carri, sfilate, luci, mercato artigianale, giardini e vita festiva nel centro di Mentone.", "Fete du Citron - одна з найхарактерніших зимових подій Рив'єри: цитрусові скульптури, декоровані платформи, паради, світло, ярмарок, сади й святкове життя центру Ментона."),
          t("For guests staying in Menton, the festival is not just a day trip. It becomes part of the stay: morning seafront walks, citrus displays in town, crowded parade moments, quieter evenings and a very different mood from the usual Riviera season.", "Pour les voyageurs loges a Menton, ce n'est pas seulement une excursion. Le festival devient le rythme du sejour : promenades du matin, decors d'agrumes, defiles charges, soirees plus calmes et une ambiance tres differente de la saison Riviera classique.", "Per chi soggiorna a Mentone non e solo una gita. Il festival diventa il ritmo del soggiorno: passeggiate mattutine, installazioni di agrumi, sfilate affollate, serate piu calme e un'atmosfera diversa dalla Riviera abituale.", "Для гостей у Ментоні це не просто поїздка на день. Фестиваль стає частиною перебування: ранкові прогулянки, цитрусові інсталяції, людні паради, спокійніші вечори й зовсім інший настрій Рив'єри."),
        ],
        relatedEventIds: ["menton-lemon-festival"],
      },
      {
        heading: t("Dates, tickets and parade timing", "Dates, billets et horaires des defiles", "Date, biglietti e tempi delle sfilate", "Дати, квитки й час парадів"),
        body: [
          t("The festival normally takes place in late February and sometimes continues into early March. Exact dates, theme, parade schedule and ticket categories are confirmed for each edition, so check the official programme before booking non-refundable travel.", "Le festival a generalement lieu fin fevrier et parfois debut mars. Les dates exactes, le theme, les defiles et les categories de billets sont confirmes a chaque edition : verifiez le programme officiel avant toute reservation non remboursable.", "Il festival si svolge di solito a fine febbraio e a volte continua a inizio marzo. Date esatte, tema, sfilate e categorie di biglietti sono confermati per ogni edizione: controlla il programma ufficiale prima di prenotare viaggi non rimborsabili.", "Фестиваль зазвичай проходить наприкінці лютого й інколи на початку березня. Точні дати, тема, розклад парадів і категорії квитків підтверджуються окремо для кожного випуску."),
          t("Some parts of the festival are usually free, such as town walks and some central displays, while Golden Fruit Parades, night parades, grandstands and specific shows can be ticketed. If you want the full experience, try to include at least one Sunday and, if possible, one Thursday evening.", "Certaines parties sont souvent libres, comme les balades en ville et certains decors centraux, tandis que les Corsos des fruits d'or, defiles de nuit, tribunes et spectacles precis peuvent etre payants. Pour l'experience complete, essayez d'inclure un dimanche et si possible un jeudi soir.", "Alcune parti sono spesso gratuite, come passeggiate e installazioni centrali, mentre Corsi dei frutti d'oro, sfilate notturne, tribune e spettacoli possono essere a pagamento. Per l'esperienza completa, includi una domenica e se possibile un giovedi sera.", "Частина фестивалю зазвичай безкоштовна, як прогулянки містом і деякі центральні інсталяції, а паради, нічні паради, трибуни й окремі шоу можуть бути квитковими. Для повного досвіду варто включити неділю й, якщо можливо, вечір четверга."),
        ],
        bullets: [
          t("Arrive earlier than the official parade time.", "Arrivez plus tot que l'heure officielle du defile.", "Arriva prima dell'orario ufficiale della sfilata.", "Приходьте раніше офіційного часу параду."),
          t("Buy parade tickets early if a grandstand matters.", "Achetez tot si une tribune compte pour vous.", "Compra presto se vuoi una tribuna.", "Купуйте квитки завчасно, якщо важлива трибуна."),
          t("Check official access rules for the current edition.", "Verifiez les regles d'acces officielles de l'edition en cours.", "Controlla le regole di accesso ufficiali dell'edizione corrente.", "Перевіряйте офіційні правила доступу для поточного випуску."),
        ],
      },
      {
        heading: t("Where the festival happens", "Ou se passe le festival", "Dove si svolge il festival", "Де проходить фестиваль"),
        body: [
          t("The heart of the festival is central Menton: the seafront, the area around Jardins Bioves, Palais de l'Europe, Promenade du Soleil and the routes between the old town and the sea. During normal weeks, almost anywhere in Menton can work; during Fete du Citron, a few streets can make a real difference.", "Le coeur du festival est Menton centre : le front de mer, les Jardins Bioves, le Palais de l'Europe, la Promenade du Soleil et les parcours entre vieille ville et mer. En temps normal, presque tout Menton fonctionne; pendant la Fete du Citron, quelques rues changent beaucoup l'experience.", "Il cuore del festival e il centro di Mentone: lungomare, Jardins Bioves, Palais de l'Europe, Promenade du Soleil e percorsi tra centro storico e mare. In settimane normali quasi ogni zona va bene; durante la Festa del Limone poche strade fanno molta differenza.", "Серце фестивалю - центр Ментона: набережна, Jardins Biovès, Palais de l'Europe, Promenade du Soleil і маршрути між старим містом та морем. У звичайні тижні майже будь-який район зручний; під час Fete du Citron кілька вулиць можуть сильно змінити досвід."),
          t("The best base is central, walkable and close to the seafront. If you can walk to the displays, promenade, restaurants, cafes and old town, you rely far less on parking or taxis.", "La meilleure base est centrale, pietonne et proche du front de mer. Si vous rejoignez a pied les decors, la promenade, restaurants, cafes et vieille ville, vous dependez beaucoup moins du parking ou des taxis.", "La base migliore e centrale, percorribile a piedi e vicina al mare. Se puoi raggiungere a piedi installazioni, passeggiata, ristoranti, caffe e centro storico, dipendi molto meno da parcheggio o taxi.", "Найкраща база - центральна, пішохідна й близька до набережної. Якщо можна дійти до інсталяцій, ресторанів, кав'ярень і старого міста, ви менше залежите від паркування й таксі."),
        ],
        relatedPlaceIds: ["jardins-bioves", "palais-de-leurope-menton", "promenade-du-soleil", "rampes-saint-michel"],
      },
      {
        heading: t("Why Victoria Beach is a special advantage", "Pourquoi Victoria Beach est un vrai avantage", "Perche Victoria Beach e un vantaggio speciale", "Чому Victoria Beach дає особливу перевагу"),
        body: [
          t("The Victoria Beach area sits directly in the central festival zone. For Azur Menton guests, Beachfront Studio with Balcony & Sea View is the view-first option, while Beachside Apartment with Terrace & Parking gives more space, kitchen comfort and parking by reservation.", "Le secteur Victoria Beach est directement dans la zone centrale du festival. Pour les voyageurs Azur Menton, le Beachfront Studio with Balcony & Sea View est l'option vue, tandis que le Beachside Apartment with Terrace & Parking offre plus d'espace, cuisine et parking sur reservation.", "La zona Victoria Beach e direttamente nella zona centrale del festival. Per gli ospiti Azur Menton, Beachfront Studio with Balcony & Sea View e l'opzione vista, mentre Beachside Apartment with Terrace & Parking offre piu spazio, cucina e parcheggio su prenotazione.", "Район Victoria Beach розташований прямо в центральній фестивальній зоні. Для гостей Azur Menton Beachfront Studio with Balcony & Sea View - варіант із видом, а Beachside Apartment with Terrace & Parking дає більше простору, кухню й паркування за бронюванням."),
          t("During restricted festival times, resident access rules can matter. A resident pass is not a parade ticket, but when available it can make daily movement to and from the apartment much easier. We confirm practical access details manually before arrival.", "Pendant les periodes de restriction, les regles d'acces riverain comptent. Une accreditation resident n'est pas un billet de defile, mais lorsqu'elle est disponible elle facilite les allers-retours vers l'appartement. Nous confirmons ces details avant l'arrivee.", "Durante le restrizioni, le regole di accesso residenti contano. Un pass residente non e un biglietto per la sfilata, ma quando disponibile semplifica gli spostamenti verso l'appartamento. Confermiamo i dettagli prima dell'arrivo.", "Під час обмежень важливі правила доступу для мешканців. Резидентський пропуск - не квиток на парад, але коли він доступний, він полегшує рух до апартаментів. Ми підтверджуємо практичні деталі до прибуття."),
          t("For the balcony studio, the seafront balcony can feel like a private viewpoint over the festival atmosphere. It is not an official viewing seat, because routes and security layouts change, but it is one of the strongest reasons to book that apartment during festival dates.", "Pour le studio balcon, le balcon face mer peut donner l'impression d'un point de vue prive sur l'ambiance du festival. Ce n'est pas une place officielle, car parcours et securite changent, mais c'est une excellente raison de reserver cet appartement.", "Per lo studio con balcone, il balcone fronte mare puo sembrare un punto di vista privato sull'atmosfera del festival. Non e un posto ufficiale, perche percorsi e sicurezza cambiano, ma e uno dei motivi migliori per prenotarlo.", "Для студії з балконом вид на море може відчуватися як приватна точка над фестивальною атмосферою. Це не офіційне місце перегляду, бо маршрути й безпека змінюються, але це одна з головних причин бронювати цей апартамент."),
        ],
        relatedApartmentKeys: ["sea-view-balcony-studio", "beachside-family-apartment"],
      },
      {
        heading: t("A practical first walking route", "Un premier parcours a pied pratique", "Un primo percorso a piedi pratico", "Практичний перший пішохідний маршрут"),
        body: [
          t("Start with Jardins Bioves for the citrus displays, then move toward Palais de l'Europe and the central streets for cafes, shops and festival browsing. Continue toward the old town for colour, steps, basilica views and a break from the densest parade flow.", "Commencez par les Jardins Bioves pour les decors d'agrumes, puis allez vers le Palais de l'Europe et les rues centrales pour cafes, boutiques et ambiance. Continuez vers la vieille ville pour les couleurs, marches, vues de basilique et une pause hors du flux le plus dense.", "Inizia dai Jardins Bioves per le installazioni di agrumi, poi vai verso Palais de l'Europe e le vie centrali per caffe, negozi e atmosfera. Continua verso il centro storico per colori, scale, viste e una pausa dalla folla piu densa.", "Почніть із Jardins Biovès заради цитрусових інсталяцій, потім ідіть до Palais de l'Europe і центральних вулиць із кав'ярнями та крамницями. Далі - старе місто для кольорів, сходів, видів і паузи від найщільнішого натовпу."),
          t("Return toward Promenade du Soleil for the parade atmosphere or an evening seafront walk. If you stay at Victoria Beach, do this in short loops: go out, return home, rest, and go out again.", "Revenez vers la Promenade du Soleil pour l'ambiance des defiles ou une marche du soir. Si vous logez a Victoria Beach, faites de petites boucles : sortez, rentrez, reposez-vous, ressortez.", "Rientra verso Promenade du Soleil per l'atmosfera delle sfilate o una passeggiata serale. Se soggiorni a Victoria Beach, fai piccoli giri: esci, torna, riposa, esci di nuovo.", "Поверніться до Promenade du Soleil заради атмосфери параду або вечірньої набережної. Якщо живете на Victoria Beach, робіть короткі петлі: вийшли, повернулися, відпочили, знову вийшли."),
        ],
        relatedPlaceIds: ["jardins-bioves", "palais-de-leurope-menton", "rampes-saint-michel", "cimetiere-vieux-chateau", "promenade-du-soleil"],
      },
      {
        heading: t("Family tips and what to bring", "Conseils famille et quoi apporter", "Consigli per famiglie e cosa portare", "Поради для сімей і що взяти"),
        body: [
          t("The festival is colourful and memorable for children, but parade days can be crowded. Families usually do better with a seated grandstand ticket or a shorter, flexible visit around displays and central streets. Do not overpack the day.", "Le festival est colore et memorable avec enfants, mais les jours de defile sont denses. Les familles sont souvent mieux avec une tribune assise ou une visite plus courte autour des decors et rues centrales. Ne surchargez pas la journee.", "Il festival e colorato e memorabile per i bambini, ma i giorni di sfilata sono affollati. Le famiglie stanno meglio con una tribuna seduta o una visita piu breve e flessibile tra installazioni e centro. Non riempire troppo la giornata.", "Фестиваль яскравий і запам'ятовується дітям, але дні парадів людні. Сім'ям часто краще з сидячою трибуною або коротшим гнучким візитом серед інсталяцій і центру. Не перевантажуйте день."),
          t("Bring comfortable shoes, a light jacket, water, sun protection for daytime parades and as little extra luggage as possible. February evenings can feel cool on the seafront even after a sunny afternoon.", "Prenez chaussures confortables, veste legere, eau, protection solaire pour les defiles de jour et le moins de bagages possible. Les soirees de fevrier peuvent etre fraiches au bord de mer meme apres un apres-midi ensoleille.", "Porta scarpe comode, giacca leggera, acqua, protezione solare per le sfilate diurne e meno bagagli possibile. Le sere di febbraio possono essere fresche sul mare anche dopo un pomeriggio soleggiato.", "Візьміть зручне взуття, легку куртку, воду, захист від сонця для денних парадів і мінімум зайвих речей. Лютневі вечори біля моря можуть бути прохолодними навіть після сонячного дня."),
        ],
        relatedPlaceIds: ["promenade-du-soleil", "jardins-bioves"],
      },
      {
        heading: t("Where to stay for the Lemon Festival", "Ou loger pour la Fete du Citron", "Dove soggiornare per la Festa del Limone", "Де зупинитися на Фестиваль лимонів"),
        body: [
          t("For Fete du Citron, the best apartment is the one that reduces friction: close enough to walk, easy to return to, and comfortable enough when restaurants, streets and parade routes are busy.", "Pour la Fete du Citron, le meilleur appartement est celui qui reduit les frictions : assez proche pour marcher, facile pour rentrer, confortable quand rues, restaurants et defiles sont charges.", "Per la Festa del Limone, l'appartamento migliore e quello che riduce attriti: vicino per camminare, facile per rientrare e comodo quando strade, ristoranti e sfilate sono affollati.", "Для Fete du Citron найкращий апартамент - той, що зменшує тертя: близько пішки, легко повернутися й комфортно, коли ресторани, вулиці й паради переповнені."),
          t("Sea View Balcony Studio is best when the balcony and seafront atmosphere matter most. Beachside Apartment with Terrace & Parking is better for families, longer stays, more space, a kitchen and parking by reservation.", "Le Sea View Balcony Studio convient si le balcon et l'ambiance front de mer comptent le plus. Le Beachside Apartment with Terrace & Parking convient mieux aux familles, longs sejours, besoin d'espace, cuisine et parking sur reservation.", "Sea View Balcony Studio e ideale se balcone e atmosfera fronte mare contano di piu. Beachside Apartment with Terrace & Parking e migliore per famiglie, soggiorni lunghi, piu spazio, cucina e parcheggio su prenotazione.", "Sea View Balcony Studio підходить, якщо найважливіші балкон і атмосфера набережної. Beachside Apartment with Terrace & Parking кращий для сімей, довших перебувань, простору, кухні й паркування за бронюванням."),
        ],
        relatedApartmentKeys: ["sea-view-balcony-studio", "beachside-family-apartment"],
      },
    ],
    practicalTips: [
      t("Book central apartments early for festival dates.", "Reservez les appartements centraux tot pour les dates du festival.", "Prenota presto gli appartamenti centrali per le date del festival.", "Бронюйте центральні апартаменти завчасно на дати фестивалю."),
      t("Check the official programme before buying travel or parade tickets.", "Verifiez le programme officiel avant billets de voyage ou de defile.", "Controlla il programma ufficiale prima di viaggio o biglietti.", "Перевірте офіційну програму перед квитками на подорож або парад."),
      t("If you need parking, discuss access before arrival.", "Si vous avez besoin de parking, discutez l'acces avant l'arrivee.", "Se ti serve parcheggio, discuti l'accesso prima dell'arrivo.", "Якщо потрібне паркування, обговоріть доступ до прибуття."),
      t("Use the apartment as a rest base between busy festival moments.", "Utilisez l'appartement comme base de repos entre les moments charges.", "Usa l'appartamento come base di pausa tra i momenti affollati.", "Використовуйте апартамент як базу для відпочинку між людними моментами."),
    ],
  }),
  shortArticle({
    id: "golf-near-menton",
    slug: "golf-near-menton",
    title: t("Golf near Menton: courses, practice clubs and family mini-golf", "Golf pres de Menton : parcours, practice et mini-golf en famille", "Golf vicino a Mentone: campi, pratica e mini-golf in famiglia", "Гольф біля Ментона: поля, practice і сімейний міні-гольф"),
    seoTitle: t("Golf Near Menton: Monte-Carlo Golf Club, Sanremo, Nice & Family Mini-Golf", "Golf pres de Menton | Monte-Carlo, Sanremo, Nice et mini-golf", "Golf vicino a Mentone | Monte-Carlo, Sanremo, Nizza e mini-golf", "Гольф біля Ментона | Monte-Carlo, Sanremo, Nice і міні-гольф"),
    seoDescription: t("A practical guide to golf near Menton: Monte-Carlo Golf Club above Monaco, Sanremo, Nice Golf Country Club, Golf de Biot and family-friendly mini-golf in Menton and Monaco.", "Guide pratique du golf pres de Menton : Monte-Carlo Golf Club au-dessus de Monaco, Sanremo, Golf Country Club de Nice, Golf de Biot et mini-golf en famille a Menton et Monaco.", "Guida pratica al golf vicino a Mentone: Monte-Carlo Golf Club sopra Monaco, Sanremo, Golf Country Club de Nice, Golf de Biot e mini-golf per famiglie a Mentone e Monaco.", "Практичний гід з гольфу біля Ментона: Monte-Carlo Golf Club над Монако, Sanremo, Golf Country Club de Nice, Golf de Biot і сімейний міні-гольф у Ментоні та Монако."),
    excerpt: t("Menton is not a golf resort town, but it is a useful base for Monte-Carlo Golf Club, Sanremo, compact practice in Nice and easy family mini-golf.", "Menton n'est pas une station de golf, mais c'est une base utile pour Monte-Carlo Golf Club, Sanremo, un practice compact a Nice et le mini-golf en famille.", "Mentone non e una localita golfistica, ma e una base utile per Monte-Carlo Golf Club, Sanremo, pratica compatta a Nizza e mini-golf in famiglia.", "Ментон не є гольф-курортом, але це зручна база для Monte-Carlo Golf Club, Санремо, компактної практики в Ніцці та сімейного міні-гольфу."),
    category: "day-trips",
    coverImage: "/images/guide/golf-near-menton.jpg",
    coverImageAlt: t("Golf near Menton and the Riviera hills", "Golf pres de Menton et collines Riviera", "Golf vicino a Mentone e colline della Riviera", "Гольф біля Ментона та пагорби Рив'єри"),
    visualTheme: "walk",
    visualStatus: "project_illustration",
    tags: [
      t("golf", "golf", "golf", "гольф"),
      t("Monte-Carlo", "Monte-Carlo", "Monte-Carlo", "Монте-Карло"),
      t("Sanremo", "Sanremo", "Sanremo", "Санремо"),
      t("mini-golf", "mini-golf", "mini-golf", "міні-гольф"),
      t("car day trip", "excursion en voiture", "gita in auto", "поїздка авто"),
    ],
    bestFor: [guideBestForOptions[0].label, guideBestForOptions[1].label, guideBestForOptions[3].label],
    duration: "full-day",
    locationTags: ["monaco", "nice", "italian-riviera", "family"],
    sourceStatus: "needs_verification",
    relatedPlaces: [
      "monte-carlo-golf-club",
      "circolo-golf-degli-ulivi-sanremo",
      "golf-country-club-de-nice",
      "golf-de-biot-la-bastide-du-roy",
      "golf-de-la-grande-bastide",
      "royal-mougins-golf-resort",
      "mini-golf-du-pian-menton",
      "koaland-menton",
      "monaco-mini-golf-parc-princesse-antoinette",
      "parc-princesse-antoinette-monaco",
    ],
    relatedArticles: ["tennis-padel-courts-menton", "cycling-bike-rental-menton", "car-rental-menton-nice-airport-convertibles", "day-trips-from-menton", "monaco-events-from-menton", "italian-riviera-day-trip-from-menton", "menton-with-kids-family-guide", "wine-tasting-near-menton", "where-to-stay-in-menton", "public-transport-in-menton"],
    relatedApartments: allApartments,
    sections: [
      {
        heading: t("Is there golf in Menton?", "Y a-t-il du golf a Menton ?", "C'e golf a Mentone?", "Чи є гольф у Ментоні?"),
        body: [
          t("Menton itself is not a full-size golf destination. There is no large 18-hole championship course in the centre of town, and a serious round usually needs a car or taxi.", "Menton n'est pas une destination golf a part entiere. Il n'y a pas de grand parcours 18 trous au centre-ville, et une vraie partie demande generalement une voiture ou un taxi.", "Mentone non e una destinazione golfistica completa. Non c'e un grande 18 buche in centro e una vera partita richiede di solito auto o taxi.", "Сам Ментон не є повноцінним гольф-напрямком. У центрі немає великого 18-лункового поля, а справжня гра зазвичай потребує авто або таксі."),
          t("That said, Menton works well as a seaside base for golfers who want one or two rounds during a Riviera stay: Monte-Carlo Golf Club above Monaco, Sanremo in Italy, compact practice in Nice, and mini-golf directly in Menton for families.", "Cela dit, Menton fonctionne bien comme base en bord de mer pour les golfeurs qui veulent une ou deux parties pendant un sejour Riviera : Monte-Carlo Golf Club au-dessus de Monaco, Sanremo en Italie, practice compact a Nice et mini-golf a Menton pour les familles.", "Detto questo, Mentone funziona bene come base sul mare per golfisti che vogliono una o due partite durante un soggiorno in Riviera: Monte-Carlo Golf Club sopra Monaco, Sanremo in Italia, pratica compatta a Nizza e mini-golf in citta per famiglie.", "Водночас Ментон добре працює як морська база для гольфістів, які хочуть одну-дві гри під час відпочинку на Рив'єрі: Monte-Carlo Golf Club над Монако, Санремо в Італії, компактна практика в Ніцці та міні-гольф у самому Ментоні для сімей."),
        ],
        bullets: [
          t("Closest serious round: Monte-Carlo Golf Club in La Turbie.", "Vraie partie la plus proche : Monte-Carlo Golf Club a La Turbie.", "Partita seria piu vicina: Monte-Carlo Golf Club a La Turbie.", "Найближча серйозна гра: Monte-Carlo Golf Club у La Turbie."),
          t("Italian Riviera golf day: Circolo Golf degli Ulivi Sanremo.", "Journee golf cote Italie : Circolo Golf degli Ulivi Sanremo.", "Giornata golf in Italia: Circolo Golf degli Ulivi Sanremo.", "Гольф-день в Італії: Circolo Golf degli Ulivi Sanremo."),
          t("Local family option: Mini-Golf du Pian or Koaland in Menton.", "Option famille locale : Mini-Golf du Pian ou Koaland a Menton.", "Opzione famiglia locale: Mini-Golf du Pian o Koaland a Mentone.", "Локальний сімейний варіант: Mini-Golf du Pian або Koaland у Ментоні."),
        ],
      },
      {
        heading: t("Monte-Carlo Golf Club, La Turbie", "Monte-Carlo Golf Club, La Turbie", "Monte-Carlo Golf Club, La Turbie", "Monte-Carlo Golf Club, La Turbie"),
        body: [
          t("Monte-Carlo Golf Club is the first course to consider from Menton. It is not in Monaco itself, but in La Turbie on the heights above the Principality, with an 18-hole course and Riviera panoramas.", "Monte-Carlo Golf Club est le premier parcours a envisager depuis Menton. Il n'est pas dans Monaco meme, mais a La Turbie sur les hauteurs de la Principaute, avec un 18 trous et des panoramas Riviera.", "Monte-Carlo Golf Club e il primo campo da considerare da Mentone. Non e dentro Monaco, ma a La Turbie sulle alture del Principato, con un percorso 18 buche e panorami Riviera.", "Monte-Carlo Golf Club - перше поле, яке варто розглядати з Ментона. Воно не в самому Монако, а в La Turbie на висотах над Князівством, із 18 лунками й панорамами Рив'єри."),
          t("For visitors, the practical points are reservation, handicap requirements, dress code and weather. The course sits high above the coast, so wind, fog or cooler air can differ from sunny Menton.", "Pour les visiteurs, les points pratiques sont la reservation, les conditions de handicap, le dress code et la meteo. Le parcours est haut au-dessus de la cote : vent, brouillard ou air plus frais peuvent differer du Menton ensoleille.", "Per i visitatori i punti pratici sono prenotazione, requisiti di handicap, dress code e meteo. Il campo e alto sopra la costa: vento, nebbia o aria piu fresca possono differire dalla Mentone soleggiata.", "Для гостей важливі бронювання, вимоги до handicap, dress code і погода. Поле високо над узбережжям, тому вітер, туман або прохолодніше повітря можуть відрізнятися від сонячного Ментона."),
        ],
        relatedPlaceIds: ["monte-carlo-golf-club"],
        relatedApartmentKeys: ["beachside-family-apartment", "sea-view-balcony-studio"],
      },
      {
        heading: t("Sanremo and the Italian Riviera option", "Sanremo et l'option Riviera italienne", "Sanremo e l'opzione Riviera ligure", "Санремо й варіант Італійської Рив'єри"),
        body: [
          t("Circolo Golf degli Ulivi Sanremo is the strongest Italian-side golf idea from Menton: olive trees, hill roads, sea views and an easy excuse to add lunch or coffee in Sanremo.", "Circolo Golf degli Ulivi Sanremo est la meilleure idee golf cote Italie depuis Menton : oliviers, routes de colline, vues mer et bonne raison d'ajouter un dejeuner ou cafe a Sanremo.", "Circolo Golf degli Ulivi Sanremo e la migliore idea golf lato Italia da Mentone: ulivi, strade di collina, vista mare e un buon motivo per aggiungere pranzo o caffe a Sanremo.", "Circolo Golf degli Ulivi Sanremo - найсильніша італійська гольф-ідея з Ментона: оливи, гірські дороги, види на море й привід додати обід або каву в Санремо."),
          t("Treat it as a full Italian Riviera day rather than a quick errand. Check tee times, border traffic and the road up to the club, then keep the rest of the day light.", "Voyez cela comme une vraie journee Riviera italienne plutot qu'une course rapide. Verifiez departs, circulation frontaliere et route vers le club, puis gardez le reste du programme leger.", "Considerala una vera giornata in Riviera ligure, non una commissione rapida. Controlla tee time, traffico di frontiera e strada verso il club, poi mantieni leggero il resto del programma.", "Сприймайте це як повний день на Італійській Рив'єрі, а не швидку справу. Перевірте tee time, трафік на кордоні й дорогу до клубу, а решту дня залиште легкою."),
        ],
        relatedPlaceIds: ["circolo-golf-degli-ulivi-sanremo"],
        relatedApartmentKeys: ["beachside-family-apartment", "sea-view-balcony-studio"],
      },
      {
        heading: t("Nice, Biot and westward Riviera courses", "Nice, Biot et les parcours vers l'ouest", "Nizza, Biot e i campi verso ovest", "Ніцца, Biot і поля на заході Рив'єри"),
        body: [
          t("Golf Country Club de Nice is useful for practice, beginners and a compact session rather than a destination championship round. It works if you are already combining the day with Nice.", "Golf Country Club de Nice est utile pour le practice, les debutants et une seance compacte plutot qu'une grande partie destination. Il fonctionne bien si vous combinez deja la journee avec Nice.", "Golf Country Club de Nice e utile per pratica, principianti e una sessione compatta piu che per una grande partita. Funziona se stai gia combinando la giornata con Nizza.", "Golf Country Club de Nice зручний для practice, початківців і компактної сесії, а не як головна велика гра. Він працює, якщо ви вже поєднуєте день із Ніццою."),
          t("Golf de Biot / La Bastide du Roy, Golf de la Grande Bastide and Royal Mougins are farther from Menton. They make sense for keen golfers, longer stays or a planned westward golf itinerary, not for a spontaneous short morning.", "Golf de Biot / La Bastide du Roy, Golf de la Grande Bastide et Royal Mougins sont plus eloignes de Menton. Ils conviennent aux golfeurs motives, longs sejours ou itineraires golf vers l'ouest, pas a une matinee spontanee.", "Golf de Biot / La Bastide du Roy, Golf de la Grande Bastide e Royal Mougins sono piu lontani da Mentone. Hanno senso per golfisti motivati, soggiorni lunghi o itinerari verso ovest, non per una mattina spontanea.", "Golf de Biot / La Bastide du Roy, Golf de la Grande Bastide і Royal Mougins далі від Ментона. Вони підходять для зацікавлених гольфістів, довших перебувань або запланованого маршруту на захід, а не для спонтанного ранку."),
        ],
        relatedPlaceIds: ["golf-country-club-de-nice", "golf-de-biot-la-bastide-du-roy", "golf-de-la-grande-bastide", "royal-mougins-golf-resort"],
      },
      {
        heading: t("Family mini-golf near Menton", "Mini-golf en famille pres de Menton", "Mini-golf in famiglia vicino a Mentone", "Сімейний міні-гольф біля Ментона"),
        body: [
          t("For children and casual afternoons, mini-golf is usually the better answer than a formal course. Mini-Golf du Pian is inside Menton, in Parc du Pian near Garavan, and is the easiest local choice.", "Pour les enfants et les apres-midi simples, le mini-golf est souvent une meilleure reponse qu'un vrai parcours. Mini-Golf du Pian est a Menton, dans le Parc du Pian pres de Garavan, et c'est le choix local le plus facile.", "Per bambini e pomeriggi casual, il mini-golf e spesso meglio di un campo formale. Mini-Golf du Pian e dentro Mentone, al Parc du Pian vicino a Garavan, ed e la scelta locale piu facile.", "Для дітей і легких післяобідніх планів міні-гольф зазвичай кращий за формальне поле. Mini-Golf du Pian розташований у Ментоні, у Parc du Pian біля Garavan, і це найпростіший локальний вибір."),
          t("Koaland is more of a children's amusement park, but it can work when younger children need something playful. Monaco's mini-golf at Parc Princesse Antoinette is best as an add-on to a wider Monaco family day.", "Koaland est plutot un petit parc de loisirs enfants, mais il fonctionne quand les plus jeunes ont besoin de quelque chose de ludique. Le mini-golf de Monaco au Parc Princesse Antoinette est surtout un ajout a une journee famille plus large a Monaco.", "Koaland e piu un piccolo parco divertimenti per bambini, ma funziona quando i piu piccoli hanno bisogno di qualcosa di giocoso. Il mini-golf di Monaco al Parc Princesse Antoinette e soprattutto un'aggiunta a una giornata famiglia a Monaco.", "Koaland радше дитячий парк розваг, але підходить, коли молодшим дітям потрібна гра. Міні-гольф у Монако в Parc Princesse Antoinette найкращий як доповнення до ширшого сімейного дня в Монако."),
        ],
        relatedPlaceIds: ["mini-golf-du-pian-menton", "koaland-menton", "monaco-mini-golf-parc-princesse-antoinette", "parc-princesse-antoinette-monaco"],
        relatedApartmentKeys: ["beachside-family-apartment"],
      },
      {
        heading: t("Which golf choice fits your stay?", "Quel choix golf correspond a votre sejour ?", "Quale scelta golf si adatta al soggiorno?", "Який гольф-варіант підходить вашій поїздці?"),
        body: [
          t("Choose Monte-Carlo Golf Club for the closest prestige round, Sanremo for Italian atmosphere, Nice for a shorter practice session, Biot for a fuller club setup, and Mini-Golf du Pian for children staying in Menton.", "Choisissez Monte-Carlo Golf Club pour la vraie partie prestigieuse la plus proche, Sanremo pour l'ambiance italienne, Nice pour une seance practice plus courte, Biot pour une structure club plus complete et Mini-Golf du Pian pour les enfants a Menton.", "Scegli Monte-Carlo Golf Club per la partita prestigiosa piu vicina, Sanremo per l'atmosfera italiana, Nizza per una pratica piu breve, Biot per un club piu completo e Mini-Golf du Pian per i bambini a Mentone.", "Обирайте Monte-Carlo Golf Club для найближчої престижної гри, Sanremo для італійської атмосфери, Ніццу для коротшої практики, Biot для повнішого клубного формату й Mini-Golf du Pian для дітей у Ментоні."),
          t("If golf is the main purpose of the trip, plan transport first. If golf is only one part of a seaside holiday, keep the course choice close and leave room for beach, restaurants and rest.", "Si le golf est le but principal du voyage, commencez par le transport. Si le golf n'est qu'un element d'un sejour mer, choisissez un parcours proche et gardez du temps pour plage, restaurants et repos.", "Se il golf e lo scopo principale del viaggio, pianifica prima i trasporti. Se il golf e solo una parte della vacanza sul mare, scegli un campo vicino e lascia spazio a spiaggia, ristoranti e riposo.", "Якщо гольф - головна мета поїздки, спершу плануйте транспорт. Якщо це лише частина морського відпочинку, обирайте ближчий варіант і залишайте час на пляж, ресторани та відпочинок."),
        ],
      },
      {
        heading: t("Staying in Menton for golf", "Sejourner a Menton pour le golf", "Soggiornare a Mentone per il golf", "Жити в Ментоні для гольфу"),
        body: [
          t("Menton works well for golfers who do not want a golf-resort holiday. You can stay by the sea, enjoy the old town and restaurants, and play one or two rounds during the trip.", "Menton convient aux golfeurs qui ne veulent pas un sejour golf-resort. Vous pouvez loger au bord de mer, profiter de la vieille ville et des restaurants, puis jouer une ou deux parties pendant le sejour.", "Mentone funziona per golfisti che non vogliono una vacanza golf-resort. Puoi stare sul mare, goderti centro storico e ristoranti e giocare una o due partite durante il soggiorno.", "Ментон підходить гольфістам, які не хочуть суто golf-resort відпочинок. Можна жити біля моря, насолоджуватися старим містом і ресторанами та зіграти одну-дві партії під час поїздки."),
          t("For golf-focused guests, Beachside Apartment with Terrace & Parking is the most practical Azur Menton option because parking by reservation can help with golf bags and early departures. Sea View Balcony Studio works well for couples adding one golf day to a seaside stay.", "Pour les sejours axes golf, Beachside Apartment with Terrace & Parking est l'option Azur Menton la plus pratique, car le parking sur reservation aide avec les sacs et les departs matinaux. Sea View Balcony Studio convient aux couples qui ajoutent une journee golf a un sejour mer.", "Per soggiorni orientati al golf, Beachside Apartment with Terrace & Parking e l'opzione Azur Menton piu pratica perche il parcheggio su prenotazione aiuta con sacche e partenze presto. Sea View Balcony Studio va bene per coppie che aggiungono un giorno golf al mare.", "Для гольф-орієнтованих гостей Beachside Apartment with Terrace & Parking - найпрактичніший варіант Azur Menton, бо паркування за бронюванням допомагає з сумками й ранніми виїздами. Sea View Balcony Studio добре підходить парам, які додають один гольф-день до морського відпочинку."),
        ],
        relatedApartmentKeys: ["beachside-family-apartment", "sea-view-balcony-studio", "panoramic-sea-view-studio"],
      },
      {
        heading: t("FAQ", "FAQ", "FAQ", "FAQ"),
        body: [
          t("Is there a full golf course in Menton? No. For real golf, look to Monte-Carlo Golf Club above Monaco, Sanremo in Italy, Nice or courses farther west such as Biot.", "Y a-t-il un vrai parcours a Menton ? Non. Pour jouer, regardez Monte-Carlo Golf Club au-dessus de Monaco, Sanremo en Italie, Nice ou des parcours plus a l'ouest comme Biot.", "C'e un vero campo a Mentone? No. Per giocare guarda Monte-Carlo Golf Club sopra Monaco, Sanremo in Italia, Nizza o campi piu a ovest come Biot.", "Чи є повноцінне поле в Ментоні? Ні. Для справжнього гольфу дивіться Monte-Carlo Golf Club над Монако, Санремо в Італії, Ніццу або поля далі на захід, як Biot."),
          t("Can visitors play Monte-Carlo Golf Club? Visitor play is possible under club conditions, but reservations, handicap rules and current green-fee access should be checked directly with the club.", "Les visiteurs peuvent-ils jouer au Monte-Carlo Golf Club ? C'est possible selon les conditions du club, mais reservations, handicap et green-fee actuels doivent etre verifies directement.", "I visitatori possono giocare al Monte-Carlo Golf Club? E possibile secondo le condizioni del club, ma prenotazioni, handicap e green fee vanno verificati direttamente.", "Чи можуть гості грати в Monte-Carlo Golf Club? Це можливо за умовами клубу, але бронювання, правила handicap і green fee треба перевіряти напряму."),
          t("Where can children play mini-golf? Mini-Golf du Pian is the easiest local option in Menton; Koaland and Monaco Mini-Golf can also work for family plans.", "Ou les enfants peuvent-ils faire du mini-golf ? Mini-Golf du Pian est l'option locale la plus simple a Menton; Koaland et Monaco Mini-Golf peuvent aussi convenir.", "Dove possono giocare a mini-golf i bambini? Mini-Golf du Pian e l'opzione locale piu facile a Mentone; anche Koaland e Monaco Mini-Golf possono funzionare.", "Де дітям грати в міні-гольф? Найпростіший локальний варіант - Mini-Golf du Pian у Ментоні; Koaland і Monaco Mini-Golf теж можуть підійти."),
        ],
      },
    ],
    practicalTips: [
      t("Book tee times in advance; nearby golf courses are not casual walk-up tourist activities.", "Reservez les departs a l'avance; les parcours proches ne sont pas des activites touristiques improvisees.", "Prenota tee time in anticipo; i campi vicini non sono attivita turistiche improvvisate.", "Бронюйте tee time завчасно; найближчі поля не є спонтанними туристичними активностями."),
      t("Check handicap rules, green fees, dress code and restaurant hours directly before going.", "Verifiez handicap, green fees, dress code et horaires de restaurant directement avant de partir.", "Controlla handicap, green fee, dress code e orari ristorante direttamente prima di andare.", "Перед виїздом напряму перевіряйте handicap, green fee, dress code і години ресторану."),
      t("For real golf, plan a car or taxi day; for family mini-golf, stay local in Menton.", "Pour le vrai golf, prevoyez voiture ou taxi; pour le mini-golf en famille, restez local a Menton.", "Per il golf vero pianifica auto o taxi; per mini-golf in famiglia resta locale a Mentone.", "Для справжнього гольфу плануйте авто або таксі; для сімейного міні-гольфу залишайтеся локально в Ментоні."),
    ],
  }),
  shortArticle({
    id: "tennis-padel-courts-menton",
    slug: "tennis-padel-courts-menton",
    title: t("Tennis and padel near Menton: where to play during your stay", "Tennis et padel pres de Menton : ou jouer pendant votre sejour", "Tennis e padel vicino a Mentone: dove giocare durante il soggiorno", "Теніс і падел біля Ментона: де пограти під час перебування"),
    seoTitle: t("Tennis and Padel Near Menton: Courts, Clubs and Booking Tips", "Tennis et padel pres de Menton : courts, clubs et conseils de reservation", "Tennis e padel vicino a Mentone: campi, club e consigli di prenotazione", "Теніс і падел біля Ментона: корти, клуби та поради з бронювання"),
    seoDescription: t("A practical guide to tennis and padel near Menton: local tennis courts in Menton, the municipal La Madone tennis and padel site, Roquebrune-Cap-Martin clay courts, Tennis Padel Soleil near Monaco and booking tips for visitors.", "Guide pratique du tennis et du padel pres de Menton : courts locaux, site municipal de La Madone, terre battue a Roquebrune-Cap-Martin, Tennis Padel Soleil pres de Monaco et conseils de reservation.", "Guida pratica a tennis e padel vicino a Mentone: campi locali, Tennis Municipal de la Madone, campi in terra a Roquebrune-Cap-Martin, Tennis Padel Soleil vicino a Monaco e consigli per prenotare.", "Практичний гід з тенісу й паделу біля Ментона: локальні корти, Tennis Municipal de la Madone, ґрунтові корти Roquebrune-Cap-Martin, Tennis Padel Soleil біля Монако та поради з бронювання."),
    excerpt: t("If you play tennis or padel, Menton is a useful base: tennis in town, municipal padel at La Madone, clay courts in Roquebrune-Cap-Martin and larger tennis-padel clubs near Monaco.", "Si vous jouez au tennis ou au padel, Menton est une base pratique : tennis en ville, padel municipal a La Madone, terre battue a Roquebrune-Cap-Martin et grands clubs pres de Monaco.", "Se giochi a tennis o padel, Mentone e una base pratica: tennis in citta, padel comunale a La Madone, terra battuta a Roquebrune-Cap-Martin e club piu grandi vicino a Monaco.", "Якщо ви граєте в теніс або падел, Ментон зручна база: теніс у місті, муніципальний падел у La Madone, ґрунтові корти в Roquebrune-Cap-Martin і більші клуби біля Монако."),
    category: "practical",
    coverImage: "/images/guide/tennis-padel-courts-menton.jpg",
    coverImageAlt: t("Tennis and padel courts near Menton", "Courts de tennis et padel pres de Menton", "Campi da tennis e padel vicino a Mentone", "Тенісні та падел-корти біля Ментона"),
    visualTheme: "family",
    visualStatus: "project_illustration",
    tags: [
      t("tennis", "tennis", "tennis", "теніс"),
      t("padel", "padel", "padel", "падел"),
      t("sport", "sport", "sport", "спорт"),
      t("Monaco", "Monaco", "Monaco", "Монако"),
      t("families", "familles", "famiglie", "сім'ї"),
    ],
    bestFor: [guideBestForOptions[0].label, guideBestForOptions[1].label, guideBestForOptions[3].label, guideBestForOptions[4].label],
    duration: "reference",
    locationTags: ["menton-centre", "monaco", "seafront"],
    sourceStatus: "needs_verification",
    relatedPlaces: [
      "tennis-club-de-menton",
      "tennis-municipal-la-madone",
      "tennis-club-roquebrune-cap-martin",
      "tennis-padel-soleil-beausoleil",
      "tennis-padel-soleil-la-turbie",
      "monte-carlo-country-club",
      "roquebrune-cap-martin",
      "la-turbie",
      "monaco-monte-carlo",
    ],
    relatedArticles: ["golf-near-menton", "cycling-bike-rental-menton", "skateparks-near-menton", "menton-with-kids-family-guide", "monaco-events-from-menton", "menton-without-a-car", "car-rental-menton-nice-airport-convertibles", "public-transport-in-menton", "day-trips-from-menton", "where-to-stay-in-menton"],
    relatedEvents: ["rolex-monte-carlo-masters"],
    relatedApartments: allApartments,
    sections: [
      {
        heading: t("Can you play tennis or padel in Menton?", "Peut-on jouer au tennis ou au padel a Menton ?", "Si puo giocare a tennis o padel a Mentone?", "Чи можна грати в теніс або падел у Ментоні?"),
        body: [
          t("Yes. Menton is not only beaches, gardens and old-town walks. It also has practical options for visitors who want to keep playing tennis or padel during a holiday.", "Oui. Menton n'est pas seulement plages, jardins et vieille ville. Il existe aussi des options pratiques pour continuer a jouer au tennis ou au padel pendant les vacances.", "Si. Mentone non e solo spiagge, giardini e centro storico. Ci sono anche opzioni pratiche per continuare a giocare a tennis o padel durante la vacanza.", "Так. Ментон - це не лише пляжі, сади й старе місто. Тут є практичні варіанти для гостей, які хочуть грати в теніс або падел під час відпочинку."),
          t("For tennis, start with Tennis Club de Menton. For padel inside Menton, check Tennis Municipal de la Madone first. For a larger tennis and padel setup, look at Tennis Padel Soleil near Monaco.", "Pour le tennis, commencez par le Tennis Club de Menton. Pour le padel dans Menton, verifiez d'abord Tennis Municipal de la Madone. Pour une structure tennis-padel plus complete, regardez Tennis Padel Soleil pres de Monaco.", "Per il tennis, inizia dal Tennis Club de Menton. Per il padel dentro Mentone, controlla prima Tennis Municipal de la Madone. Per una struttura piu completa, guarda Tennis Padel Soleil vicino a Monaco.", "Для тенісу почніть із Tennis Club de Menton. Для паделу в Ментоні спершу перевірте Tennis Municipal de la Madone. Для більшого tennis/padel комплексу дивіться Tennis Padel Soleil біля Монако."),
        ],
        relatedPlaceIds: ["tennis-club-de-menton", "tennis-municipal-la-madone", "tennis-padel-soleil-beausoleil"],
      },
      {
        heading: t("Quick recommendations", "Recommandations rapides", "Consigli rapidi", "Короткі рекомендації"),
        body: [
          t("Choose Tennis Club de Menton for classic tennis in town, La Madone for the first padel check inside Menton, Roquebrune-Cap-Martin for nearby clay courts, Tennis Padel Soleil for a stronger padel setup, and Monte-Carlo Country Club as a special tennis outing.", "Choisissez Tennis Club de Menton pour le tennis classique en ville, La Madone pour verifier le padel dans Menton, Roquebrune-Cap-Martin pour la terre battue proche, Tennis Padel Soleil pour un padel plus complet, et Monte-Carlo Country Club comme sortie tennis speciale.", "Scegli Tennis Club de Menton per il tennis classico in citta, La Madone per il primo controllo padel in Mentone, Roquebrune-Cap-Martin per la terra vicina, Tennis Padel Soleil per un padel piu completo e Monte-Carlo Country Club come uscita speciale.", "Обирайте Tennis Club de Menton для класичного тенісу в місті, La Madone для першої перевірки паделу в Ментоні, Roquebrune-Cap-Martin для ґрунтових кортів поруч, Tennis Padel Soleil для сильнішого паделу, а Monte-Carlo Country Club як особливий тенісний виїзд."),
        ],
        bullets: [
          t("Without a car: start in Menton before planning Monaco-side clubs.", "Sans voiture : commencez a Menton avant les clubs cote Monaco.", "Senza auto: inizia a Mentone prima dei club lato Monaco.", "Без авто: починайте в Ментоні перед клубами в бік Монако."),
          t("With children or teenagers: ask directly about lessons, junior sessions and rental equipment.", "Avec enfants ou ados : demandez directement cours, sessions juniors et location de materiel.", "Con bambini o ragazzi: chiedi direttamente lezioni, sessioni junior e noleggio attrezzatura.", "З дітьми або підлітками: напряму уточнюйте уроки, junior sessions і оренду спорядження."),
          t("In summer: prefer morning or evening slots.", "En ete : preferez matin ou soiree.", "In estate: preferisci mattina o sera.", "Влітку: обирайте ранок або вечір."),
        ],
      },
      {
        heading: t("Tennis Club de Menton", "Tennis Club de Menton", "Tennis Club de Menton", "Tennis Club de Menton"),
        body: [
          t("Tennis Club de Menton is the main local tennis reference: a clay-court club in town at 16 rue Albert 1er. It is the most natural first stop if you are staying in Menton and want proper tennis without turning the day into a transfer.", "Tennis Club de Menton est la reference locale principale : un club sur terre battue en ville, 16 rue Albert 1er. C'est le premier choix naturel si vous logez a Menton et voulez jouer sans transformer la journee en trajet.", "Tennis Club de Menton e il riferimento locale principale: club su terra in citta, 16 rue Albert 1er. E la prima scelta naturale se soggiorni a Mentone e vuoi giocare senza trasformare il giorno in trasferimento.", "Tennis Club de Menton - головна локальна тенісна точка: клуб із ґрунтовими кортами в місті, 16 rue Albert 1er. Це найприродніший перший вибір, якщо ви живете в Ментоні й хочете пограти без окремого трансферу."),
          t("Contact the club before going. Ask about visitor access, hourly court rental, racket rental, balls, dress code, payment and whether non-members can book the day you want.", "Contactez le club avant d'y aller. Demandez acces visiteurs, location horaire, location de raquettes, balles, dress code, paiement et possibilite de reserver sans etre membre.", "Contatta il club prima di andare. Chiedi accesso visitatori, affitto orario, noleggio racchette, palline, dress code, pagamento e prenotazione per non soci.", "Зв'яжіться з клубом перед візитом. Уточніть доступ для гостей, погодинну оренду корту, ракетки, м'ячі, dress code, оплату й бронювання для не-членів."),
        ],
        relatedPlaceIds: ["tennis-club-de-menton"],
        relatedApartmentKeys: ["sea-view-balcony-studio", "panoramic-sea-view-studio"],
      },
      {
        heading: t("Padel inside Menton: La Madone", "Padel a Menton : La Madone", "Padel a Mentone: La Madone", "Падел у Ментоні: La Madone"),
        body: [
          t("Tennis Municipal de la Madone is the first local place to check for padel because the official tourism listing describes a municipal tennis site with several courts including a padel tennis court.", "Tennis Municipal de la Madone est le premier endroit local a verifier pour le padel, car la fiche officielle indique plusieurs courts dont un court de padel tennis.", "Tennis Municipal de la Madone e il primo posto locale da controllare per il padel, perche la scheda ufficiale indica vari campi incluso un campo da padel tennis.", "Tennis Municipal de la Madone - перше локальне місце для перевірки паделу, бо офіційний опис згадує кілька кортів, включно з padel tennis court."),
          t("Call ahead for booking rules, visitor access, equipment rental and evening availability. Padel courts can fill quickly at popular times.", "Appelez avant pour les regles de reservation, acces visiteurs, location de materiel et disponibilite en soiree. Les courts de padel peuvent se remplir vite.", "Chiama prima per regole di prenotazione, accesso visitatori, noleggio attrezzatura e disponibilita serale. I campi da padel si riempiono rapidamente.", "Зателефонуйте заздалегідь щодо правил бронювання, доступу для гостей, оренди спорядження й вечірніх слотів. Падел-корти швидко заповнюються."),
        ],
        relatedPlaceIds: ["tennis-municipal-la-madone"],
        relatedApartmentKeys: ["beachside-family-apartment", "sea-view-balcony-studio"],
      },
      {
        heading: t("Roquebrune, Tennis Padel Soleil and Monte-Carlo Country Club", "Roquebrune, Tennis Padel Soleil et Monte-Carlo Country Club", "Roquebrune, Tennis Padel Soleil e Monte-Carlo Country Club", "Roquebrune, Tennis Padel Soleil і Monte-Carlo Country Club"),
        body: [
          t("Roquebrune-Cap-Martin is the closest Monaco-side neighbour of Menton. Tennis Club de Roquebrune-Cap-Martin is useful for clay courts and a short tennis outing when Menton courts are full.", "Roquebrune-Cap-Martin est le voisin cote Monaco le plus proche de Menton. Tennis Club de Roquebrune-Cap-Martin est utile pour la terre battue et une courte sortie tennis si Menton est complet.", "Roquebrune-Cap-Martin e il vicino lato Monaco piu vicino a Mentone. Tennis Club de Roquebrune-Cap-Martin e utile per terra battuta e una breve uscita se Mentone e piena.", "Roquebrune-Cap-Martin - найближчий сусід Ментона в бік Монако. Tennis Club de Roquebrune-Cap-Martin корисний для ґрунтових кортів і короткого виїзду, якщо в Ментоні немає місць."),
          t("For stronger padel facilities, Tennis Padel Soleil near Monaco is the clearest nearby option. La Turbie is more scenic and works best with a car-based day. Monte-Carlo Country Club is iconic, but verify access, rules and dress code before planning around it.", "Pour un padel plus complet, Tennis Padel Soleil pres de Monaco est l'option proche la plus claire. La Turbie est plus panoramique et convient mieux avec une voiture. Monte-Carlo Country Club est iconique, mais verifiez acces, regles et tenue avant de planifier.", "Per strutture padel piu complete, Tennis Padel Soleil vicino a Monaco e l'opzione piu chiara. La Turbie e piu panoramica e funziona meglio con l'auto. Monte-Carlo Country Club e iconico, ma verifica accesso, regole e dress code.", "Для сильнішої падел-інфраструктури Tennis Padel Soleil біля Монако - найочевидніший варіант. La Turbie більш мальовнича й краще працює з авто. Monte-Carlo Country Club знаковий, але перевіряйте доступ, правила й dress code."),
        ],
        relatedPlaceIds: ["tennis-club-roquebrune-cap-martin", "roquebrune-cap-martin", "tennis-padel-soleil-beausoleil", "tennis-padel-soleil-la-turbie", "la-turbie", "monte-carlo-country-club", "monaco-monte-carlo"],
        relatedApartmentKeys: ["beachside-family-apartment", "sea-view-balcony-studio"],
      },
      {
        heading: t("What to bring and how to book", "Quoi apporter et comment reserver", "Cosa portare e come prenotare", "Що взяти й як бронювати"),
        body: [
          t("For tennis, bring racket, tennis shoes, water, cap, sunscreen, towel, balls and clay-court shoes if you are playing on clay. For padel, bring a padel racket unless renting, padel balls, non-marking sports shoes, water and a towel.", "Pour le tennis, prenez raquette, chaussures, eau, casquette, creme solaire, serviette, balles et chaussures terre battue si besoin. Pour le padel, prenez raquette de padel sauf location, balles, chaussures non marquantes, eau et serviette.", "Per tennis porta racchetta, scarpe, acqua, cappello, crema, asciugamano, palline e scarpe da terra se serve. Per padel porta racchetta salvo noleggio, palline, scarpe non-marking, acqua e asciugamano.", "Для тенісу беріть ракетку, взуття, воду, кепку, сонцезахист, рушник, м'ячі й взуття для ґрунту за потреби. Для паделу - ракетку або оренду, м'ячі, non-marking shoes, воду й рушник."),
          t("Always call or book before going. Ask whether non-members can book, what the hourly price is, whether rackets and balls are available, whether cards are accepted, whether shoes are required and whether evening play is possible.", "Appelez ou reservez toujours avant. Demandez si les non-membres peuvent reserver, le prix horaire, location de raquettes et balles, paiement carte, chaussures obligatoires et jeu en soiree.", "Chiama o prenota sempre prima. Chiedi se i non soci possono prenotare, prezzo orario, noleggio racchette e palline, pagamento carta, scarpe richieste e gioco serale.", "Завжди телефонуйте або бронюйте заздалегідь. Уточнюйте, чи можуть бронювати не-члени, погодинну ціну, ракетки й м'ячі, оплату карткою, вимоги до взуття й вечірню гру."),
        ],
      },
      {
        heading: t("Suggested tennis and padel plans", "Idees de plans tennis et padel", "Idee per tennis e padel", "Ідеї для тенісу й паделу"),
        body: [
          t("Easy tennis morning: book Tennis Club de Menton, play early, then return for the beach, market or lunch. Local padel session: check La Madone first, then Tennis Padel Soleil if it is full or equipment is an issue.", "Matinee tennis facile : reservez Tennis Club de Menton, jouez tot, puis revenez plage, marche ou dejeuner. Session padel locale : verifiez La Madone d'abord, puis Tennis Padel Soleil si c'est complet ou si le materiel manque.", "Mattina tennis facile: prenota Tennis Club de Menton, gioca presto, poi torna per spiaggia, mercato o pranzo. Sessione padel locale: controlla prima La Madone, poi Tennis Padel Soleil se e pieno o manca attrezzatura.", "Легкий тенісний ранок: забронюйте Tennis Club de Menton, зіграйте рано, потім поверніться до пляжу, ринку або обіду. Локальна сесія паделу: спершу La Madone, потім Tennis Padel Soleil, якщо зайнято або потрібне спорядження."),
          t("Padel evening near Monaco: book Tennis Padel Soleil, play in the evening, then have dinner nearby or return to Menton. Tennis with sea-view atmosphere: check Roquebrune-Cap-Martin or Monte-Carlo Country Club depending on access and budget.", "Soiree padel pres de Monaco : reservez Tennis Padel Soleil, jouez le soir, puis dinez proche ou revenez a Menton. Tennis avec ambiance vue mer : verifiez Roquebrune-Cap-Martin ou Monte-Carlo Country Club selon acces et budget.", "Serata padel vicino a Monaco: prenota Tennis Padel Soleil, gioca la sera, poi cena vicino o rientra a Mentone. Tennis con atmosfera vista mare: controlla Roquebrune-Cap-Martin o Monte-Carlo Country Club secondo accesso e budget.", "Вечірній падел біля Монако: забронюйте Tennis Padel Soleil, зіграйте ввечері, потім вечеря поруч або повернення в Ментон. Теніс із видом на море: перевірте Roquebrune-Cap-Martin або Monte-Carlo Country Club залежно від доступу й бюджету."),
        ],
        relatedPlaceIds: ["tennis-club-de-menton", "tennis-municipal-la-madone", "tennis-padel-soleil-beausoleil", "monte-carlo-country-club"],
      },
      {
        heading: t("Staying in Menton as a tennis or padel player", "Sejourner a Menton comme joueur de tennis ou padel", "Soggiornare a Mentone da giocatore di tennis o padel", "Жити в Ментоні як гравець у теніс або падел"),
        body: [
          t("Menton works well because sport does not have to become the whole trip. You can play in the morning, return to the apartment, swim, take the train to Monaco or walk through the old town in the evening.", "Menton fonctionne bien car le sport ne doit pas devenir tout le voyage. Vous pouvez jouer le matin, revenir a l'appartement, vous baigner, prendre le train vers Monaco ou marcher dans la vieille ville le soir.", "Mentone funziona bene perche lo sport non deve diventare tutto il viaggio. Puoi giocare al mattino, tornare in appartamento, nuotare, prendere il treno per Monaco o camminare nel centro storico la sera.", "Ментон зручний тим, що спорт не мусить ставати всією поїздкою. Можна зіграти зранку, повернутися в апартамент, поплавати, поїхати потягом у Монако або гуляти старим містом увечері."),
          t("Sea View Balcony Studio suits couples adding one or two tennis sessions. Beachside Apartment with Terrace & Parking is most practical for families or car-based trips to Roquebrune, La Turbie or Tennis Padel Soleil. Panoramic Sea View Studio suits shorter stays where tennis or padel is one optional activity.", "Sea View Balcony Studio convient aux couples qui ajoutent une ou deux sessions. Beachside Apartment with Terrace & Parking est le plus pratique pour familles ou sorties en voiture vers Roquebrune, La Turbie ou Tennis Padel Soleil. Panoramic Sea View Studio convient aux courts sejours ou le tennis/padel reste optionnel.", "Sea View Balcony Studio va bene per coppie con una o due sessioni. Beachside Apartment with Terrace & Parking e piu pratico per famiglie o uscite in auto verso Roquebrune, La Turbie o Tennis Padel Soleil. Panoramic Sea View Studio va bene per soggiorni brevi dove tennis/padel e opzionale.", "Sea View Balcony Studio підходить парам із однією-двома сесіями. Beachside Apartment with Terrace & Parking найпрактичніший для сімей або поїздок авто до Roquebrune, La Turbie чи Tennis Padel Soleil. Panoramic Sea View Studio підходить для коротших поїздок, де теніс або падел - опція."),
        ],
        relatedApartmentKeys: allApartments,
      },
      {
        heading: t("FAQ", "FAQ", "FAQ", "FAQ"),
        body: [
          t("Is there a tennis club in Menton? Yes. Tennis Club de Menton is the main local tennis club. Can I play padel in Menton? Check Tennis Municipal de la Madone first, then Tennis Padel Soleil near Monaco for a larger setup.", "Y a-t-il un club de tennis a Menton ? Oui, Tennis Club de Menton est le principal club local. Peut-on jouer au padel a Menton ? Verifiez d'abord Tennis Municipal de la Madone, puis Tennis Padel Soleil pres de Monaco pour une structure plus grande.", "C'e un tennis club a Mentone? Si, Tennis Club de Menton e il principale club locale. Posso giocare a padel a Mentone? Controlla prima Tennis Municipal de la Madone, poi Tennis Padel Soleil vicino a Monaco.", "Чи є тенісний клуб у Ментоні? Так, Tennis Club de Menton - головний локальний клуб. Чи можна грати в падел у Ментоні? Спершу перевірте Tennis Municipal de la Madone, потім Tennis Padel Soleil біля Монако."),
          t("Which option is easiest without a car? Start with Tennis Club de Menton or La Madone. For Roquebrune, La Turbie and Monte-Carlo Country Club, plan transport carefully.", "Quelle option est la plus simple sans voiture ? Commencez par Tennis Club de Menton ou La Madone. Pour Roquebrune, La Turbie et Monte-Carlo Country Club, planifiez le transport avec soin.", "Quale opzione e piu facile senza auto? Inizia da Tennis Club de Menton o La Madone. Per Roquebrune, La Turbie e Monte-Carlo Country Club pianifica bene il trasporto.", "Що найпростіше без авто? Починайте з Tennis Club de Menton або La Madone. Для Roquebrune, La Turbie й Monte-Carlo Country Club уважно плануйте транспорт."),
        ],
      },
    ],
    practicalTips: [
      t("Call or book before going; visitor access and prices can change by season.", "Appelez ou reservez avant; acces visiteurs et prix peuvent changer selon la saison.", "Chiama o prenota prima; accesso visitatori e prezzi possono cambiare per stagione.", "Телефонуйте або бронюйте заздалегідь; доступ і ціни можуть змінюватися за сезоном."),
      t("Ask about racket rental, balls, shoes, payment and whether non-members can book.", "Demandez location de raquettes, balles, chaussures, paiement et reservation non-membres.", "Chiedi noleggio racchette, palline, scarpe, pagamento e prenotazione non soci.", "Уточнюйте оренду ракеток, м'ячі, взуття, оплату й бронювання для не-членів."),
      t("In July and August, choose morning or evening court times when possible.", "En juillet et aout, choisissez matin ou soiree si possible.", "In luglio e agosto scegli mattina o sera se possibile.", "У липні й серпні за можливості обирайте ранкові або вечірні слоти."),
    ],
  }),
  shortArticle({
    id: "best-souvenir-shops-menton-monaco-nice",
    slug: "best-souvenir-shops-menton-monaco-nice",
    title: t("Best souvenir shops in Menton: lemon gifts, local specialties and Riviera keepsakes", "Meilleures boutiques de souvenirs a Menton: cadeaux au citron, specialites locales et souvenirs Riviera", "Migliori negozi di souvenir a Mentone: regali al limone, specialita locali e ricordi Riviera", "Найкращі сувенірні крамниці Ментона: лимонні подарунки, локальні спеціалітети й сувеніри Рив'єри"),
    seoTitle: t("Best Souvenir Shops in Menton: Lemon Gifts, Local Specialties, Monaco & Nice", "Meilleures boutiques de souvenirs a Menton: citron, specialites, Monaco et Nice", "Migliori negozi di souvenir a Mentone: limone, specialita, Monaco e Nizza", "Найкращі сувенірні крамниці Ментона: лимон, локальні подарунки, Монако й Ніцца"),
    seoDescription: t("A practical guide to the best souvenir shops in Menton, including lemon products, artisan jams, local food gifts, small Riviera keepsakes, plus a few good souvenir stops in Monaco and Nice.", "Guide pratique des meilleures boutiques de souvenirs a Menton: produits au citron, confitures artisanales, cadeaux gourmands, petits souvenirs Riviera, avec quelques adresses a Monaco et Nice.", "Guida pratica ai migliori negozi di souvenir a Mentone: prodotti al limone, confetture artigianali, regali gastronomici, piccoli ricordi Riviera e alcune tappe a Monaco e Nizza.", "Практичний гід по сувенірних крамницях Ментона: лимонні продукти, artisan jams, їстівні подарунки, невеликі сувеніри Рив'єри, плюс кілька зупинок у Монако й Ніцці."),
    excerpt: t("The best souvenirs from Menton are usually edible, useful and connected to the place: lemon marmalade, limoncello, olive oil, local biscuits, artisan confectionery, market finds and small Riviera gifts.", "Les meilleurs souvenirs de Menton sont souvent comestibles, utiles et lies au lieu: marmelade de citron, limoncello, huile d'olive, biscuits locaux, confiseries artisanales, trouvailles du marche et petits cadeaux Riviera.", "I migliori souvenir di Mentone sono spesso commestibili, utili e legati al luogo: marmellata di limone, limoncello, olio d'oliva, biscotti locali, confetteria artigianale, prodotti di mercato e piccoli regali Riviera.", "Найкращі сувеніри з Ментона зазвичай їстівні, корисні й пов'язані з місцем: лимонний джем, limoncello, оливкова олія, локальне печиво, artisan sweets, ринкові знахідки й невеликі подарунки Рив'єри."),
    category: "food-markets",
    coverImage: "/images/guide/best-souvenir-shops-menton-monaco-nice.jpg",
    coverImageAlt: t("Illustration of lemon gifts and Riviera souvenirs in Menton", "Illustration de cadeaux au citron et souvenirs Riviera a Menton", "Illustrazione di regali al limone e souvenir Riviera a Mentone", "Ілюстрація лимонних подарунків і сувенірів Рив'єри в Ментоні"),
    visualTheme: "market",
    visualStatus: "project_illustration",
    tags: [
      t("souvenirs", "souvenirs", "souvenir", "сувеніри"),
      t("Menton lemon", "citron de Menton", "limone di Mentone", "лимон Ментона"),
      t("local food gifts", "cadeaux gourmands locaux", "regali gastronomici locali", "локальні їстівні подарунки"),
      t("Monaco", "Monaco", "Monaco", "Монако"),
      t("Nice", "Nice", "Nizza", "Ніцца"),
    ],
    bestFor: [guideBestForOptions[0].label, guideBestForOptions[1].label, guideBestForOptions[3].label, guideBestForOptions[8].label],
    duration: "1-2 hours",
    locationTags: ["menton-centre", "old-town", "monaco", "nice"],
    sourceStatus: "needs_verification",
    relatedPlaces: [
      "au-pays-du-citron-menton",
      "maison-herbin-menton",
      "maison-gannac-menton",
      "office-tourisme-menton-riviera-merveilles",
      "halles-du-marche",
      "zeste-de-menton",
      "rue-saint-michel-menton",
      "monaco-ville-souvenir-shops",
      "chocolaterie-de-monaco",
      "oceanographic-museum-monaco",
      "automobile-club-monaco-boutique",
      "nice-old-town",
      "nicolas-alziari-nice",
      "maison-auer-nice",
      "cours-saleya-nice",
    ],
    relatedArticles: ["local-food-menton", "halles-du-marche-menton", "best-ice-cream-menton", "wine-tasting-near-menton", "supermarkets-in-menton", "fete-du-citron-menton-practical-guide", "menton-old-town", "menton-one-day-itinerary", "menton-three-day-itinerary", "day-trips-from-menton", "monaco-events-from-menton", "public-transport-in-menton", "where-to-stay-in-menton"],
    relatedApartments: allApartments,
    sections: [
      {
        heading: t("What to buy in Menton", "Quoi acheter a Menton", "Cosa comprare a Mentone", "Що купити в Ментоні"),
        body: [
          t("Menton is an easy town for meaningful souvenirs because its identity is clear: lemons, citrus gardens, Italian influence, sea light, old-town colours and artisan food. The strongest gifts are usually small, edible or useful rather than generic magnets.", "Menton se prete bien aux souvenirs qui ont du sens: citrons, jardins d'agrumes, influence italienne, lumiere de mer, couleurs de vieille ville et artisanat gourmand. Les meilleurs cadeaux sont souvent petits, comestibles ou utiles plutot que des magnets generiques.", "Mentone e perfetta per souvenir con un senso: limoni, giardini di agrumi, influenza italiana, luce di mare, colori del centro storico e artigianato gastronomico. I regali migliori sono spesso piccoli, commestibili o utili invece dei soliti magneti.", "Ментон добре підходить для змістовних сувенірів: лимони, цитрусові сади, італійський вплив, морське світло, кольори старого міста й artisan food. Найкращі подарунки зазвичай невеликі, їстівні або корисні, а не generic magnets."),
          t("If you only choose one theme, choose Menton lemon. True local production is limited, so treat the lemon as a signature product to ask about carefully, not as a guarantee that every yellow item is locally grown.", "Si vous ne choisissez qu'un theme, prenez le citron de Menton. La vraie production locale reste limitee: considerez-le comme une signature a questionner avec soin, pas comme la garantie que chaque produit jaune est cultive localement.", "Se scegli un solo tema, scegli il limone di Mentone. La vera produzione locale e limitata: consideralo una firma da verificare con attenzione, non una garanzia che ogni prodotto giallo sia coltivato localmente.", "Якщо обираєте одну тему, обирайте лимон Ментона. Справжнє локальне виробництво обмежене, тож сприймайте лимон як signature product, про який варто питати уважно, а не як гарантію, що кожна жовта річ локально вирощена."),
        ],
        bullets: [
          t("Good choices: lemon jam, marmalade, limoncello, biscuits, honey, olive oil, tapenade, soaps, ceramics, postcards and small gourmet boxes.", "Bons choix: confiture ou marmelade de citron, limoncello, biscuits, miel, huile d'olive, tapenade, savons, ceramiques, cartes postales et petits coffrets gourmands.", "Buone scelte: marmellata di limone, limoncello, biscotti, miele, olio d'oliva, tapenade, saponi, ceramiche, cartoline e piccoli cofanetti gastronomici.", "Хороші варіанти: лимонний джем, marmalade, limoncello, печиво, мед, оливкова олія, тапенада, мило, кераміка, листівки й невеликі gourmet boxes."),
          t("Before buying liquids, check luggage rules and prefer small bottles or checked luggage.", "Avant d'acheter des liquides, verifiez les regles de bagage et preferez petits flacons ou bagage en soute.", "Prima di comprare liquidi, controlla le regole bagagli e preferisci bottiglie piccole o bagaglio da stiva.", "Перед купівлею рідин перевірте правила багажу й обирайте маленькі пляшки або багаж у трюмі."),
        ],
        relatedPlaceIds: ["au-pays-du-citron-menton", "maison-herbin-menton", "maison-gannac-menton", "zeste-de-menton"],
      },
      {
        heading: t("The core Menton souvenir stops", "Les adresses essentielles a Menton", "Le tappe essenziali a Mentone", "Основні сувенірні зупинки Ментона"),
        body: [
          t("For the most direct lemon-souvenir answer, start with Au Pays du Citron in the old pedestrian area. For more elegant edible gifts, Maison Herbin is the stronger stop for artisan jams, marmalades and lemon gift boxes.", "Pour la reponse la plus directe au souvenir citron, commencez par Au Pays du Citron dans le secteur pieton ancien. Pour des cadeaux gourmands plus elegants, Maison Herbin est plus forte pour confitures artisanales, marmelades et coffrets citron.", "Per la risposta piu diretta al souvenir al limone, inizia da Au Pays du Citron nella zona pedonale antica. Per regali gastronomici piu eleganti, Maison Herbin e piu forte per confetture artigianali, marmellate e scatole al limone.", "За найпрямішою відповіддю на lemon souvenir починайте з Au Pays du Citron у старій пішохідній зоні. Для елегантніших їстівних подарунків сильніша зупинка - Maison Herbin з artisan jams, marmalades і lemon gift boxes."),
          t("Maison Gannac is different: it connects gifts to local citrus production and works best as a deliberate stop, especially if you have a car or are already exploring Garavan and Super-Garavan.", "Maison Gannac est differente: elle relie les cadeaux a la production locale d'agrumes et fonctionne mieux comme halte volontaire, surtout si vous avez une voiture ou explorez deja Garavan et Super-Garavan.", "Maison Gannac e diversa: collega i regali alla produzione locale di agrumi e funziona meglio come tappa voluta, soprattutto se hai un'auto o stai gia esplorando Garavan e Super-Garavan.", "Maison Gannac інша: вона пов'язує подарунки з локальним цитрусовим виробництвом і найкраще працює як окрема зупинка, особливо якщо ви з авто або вже досліджуєте Garavan і Super-Garavan."),
        ],
        relatedPlaceIds: ["au-pays-du-citron-menton", "maison-herbin-menton", "maison-gannac-menton", "rue-saint-michel-menton"],
      },
      {
        heading: t("Market and official-shop gifts", "Cadeaux du marche et de l'office", "Regali dal mercato e dall'ufficio turistico", "Подарунки з ринку й офіційної крамниці"),
        body: [
          t("Halles du Marché is not a souvenir shop, but it is often the best place for food gifts and picnic-style purchases: olive oil, tapenade, herbs, honey, biscuits, fruit and small jars. Go in the morning before the day gets hot.", "Les Halles du Marche ne sont pas une boutique de souvenirs, mais souvent le meilleur endroit pour cadeaux gourmands et achats de pique-nique: huile d'olive, tapenade, herbes, miel, biscuits, fruits et petits bocaux. Allez-y le matin avant la chaleur.", "Le Halles du Marché non sono un negozio di souvenir, ma spesso il posto migliore per regali gastronomici e spesa da picnic: olio d'oliva, tapenade, erbe, miele, biscotti, frutta e piccoli vasetti. Vai al mattino prima del caldo.", "Halles du Marché - не сувенірна крамниця, але часто найкраще місце для їстівних подарунків і picnic-style покупок: оливкова олія, тапенада, трави, мед, печиво, фрукти й маленькі баночки. Ідіть зранку до спеки."),
          t("The Tourist Office shop at Palais de l'Europe is less romantic but useful: maps, local information, event tickets and small local or lemon-scented gifts in one central stop.", "La boutique de l'Office de Tourisme au Palais de l'Europe est moins romantique mais pratique: cartes, informations locales, billetterie et petits cadeaux locaux ou parfumes au citron au meme endroit.", "Il negozio dell'Ufficio del Turismo al Palais de l'Europe e meno romantico ma pratico: mappe, informazioni locali, biglietti e piccoli regali locali o profumati al limone in un'unica tappa centrale.", "Крамниця Tourist Office у Palais de l'Europe менш романтична, але практична: карти, локальна інформація, квитки й невеликі локальні або lemon-scented gifts в одному центральному місці."),
        ],
        relatedPlaceIds: ["halles-du-marche", "office-tourisme-menton-riviera-merveilles", "palais-de-leurope-menton"],
      },
      {
        heading: t("A simple Menton souvenir walk", "Un parcours souvenir simple a Menton", "Un percorso souvenir semplice a Mentone", "Простий сувенірний маршрут у Ментоні"),
        body: [
          t("Start at Palais de l'Europe and the Tourist Office for maps, events and small official souvenirs. Walk toward Rue Saint-Michel and the old town for lemon shops and casual browsing. Add Au Pays du Citron and Maison Herbin, then use Halles du Marché in the morning if you want food gifts or picnic items.", "Commencez au Palais de l'Europe et a l'Office de Tourisme pour cartes, evenements et petits souvenirs officiels. Marchez vers Rue Saint-Michel et la vieille ville pour les boutiques au citron. Ajoutez Au Pays du Citron et Maison Herbin, puis les Halles le matin pour cadeaux gourmands ou pique-nique.", "Inizia dal Palais de l'Europe e dall'Ufficio del Turismo per mappe, eventi e piccoli souvenir ufficiali. Cammina verso Rue Saint-Michel e il centro storico per negozi al limone. Aggiungi Au Pays du Citron e Maison Herbin, poi le Halles al mattino per regali gastronomici o picnic.", "Почніть із Palais de l'Europe і Tourist Office за картами, подіями й невеликими офіційними сувенірами. Ідіть до Rue Saint-Michel і старого міста за lemon shops і прогулянковими покупками. Додайте Au Pays du Citron і Maison Herbin, а зранку - Halles du Marché для їстівних подарунків або пікніка."),
          t("If you have a car or more time, add Maison Gannac for a deeper citrus-producer stop. This keeps souvenir shopping inside the real rhythm of the town rather than making it a separate last-minute airport errand.", "Si vous avez une voiture ou plus de temps, ajoutez Maison Gannac pour une halte plus liee au producteur d'agrumes. Le shopping reste ainsi dans le vrai rythme de la ville, pas dans une course de derniere minute a l'aeroport.", "Se hai un'auto o piu tempo, aggiungi Maison Gannac per una tappa piu legata al produttore di agrumi. Cosi lo shopping resta nel ritmo reale della citta, non diventa una corsa all'ultimo minuto in aeroporto.", "Якщо маєте авто або більше часу, додайте Maison Gannac для глибшої зупинки у виробника цитрусових. Так сувенірні покупки залишаються в реальному ритмі міста, а не стають останньою справою в аеропорту."),
        ],
        relatedPlaceIds: ["palais-de-leurope-menton", "office-tourisme-menton-riviera-merveilles", "rue-saint-michel-menton", "au-pays-du-citron-menton", "maison-herbin-menton", "halles-du-marche", "maison-gannac-menton"],
      },
      {
        heading: t("Monaco souvenirs during a day trip", "Souvenirs de Monaco pendant une excursion", "Souvenir di Monaco durante una gita", "Сувеніри Монако під час поїздки на день"),
        body: [
          t("Monaco has a different souvenir identity: the palace, Formula 1, yachts, casino architecture, chocolate and oceanography. If you visit from Menton, focus on Monaco-Ville / Le Rocher and the Casino / Monte-Carlo area rather than crossing town only for shops.", "Monaco a une autre identite de souvenir: palais, Formule 1, yachts, architecture du Casino, chocolat et oceanographie. Depuis Menton, concentrez-vous sur Monaco-Ville / Le Rocher et le secteur Casino / Monte-Carlo plutot que de traverser la ville seulement pour les boutiques.", "Monaco ha un'altra identita di souvenir: palazzo, Formula 1, yacht, architettura del Casino, cioccolato e oceanografia. Da Mentone, concentrati su Monaco-Ville / Le Rocher e la zona Casino / Monte-Carlo invece di attraversare la citta solo per negozi.", "Монако має іншу сувенірну ідентичність: палац, Formula 1, яхти, архітектура Casino, шоколад і океанографія. Якщо їдете з Ментона, зосередьтеся на Monaco-Ville / Le Rocher і районі Casino / Monte-Carlo, а не перетинайте місто лише заради крамниць."),
          t("Good Monaco choices are Chocolaterie de Monaco boxes, Oceanographic Museum gifts for children, and Automobile Club / Grand Prix items for motorsport fans.", "Les bons choix a Monaco: coffrets de la Chocolaterie de Monaco, cadeaux du Musee Oceanographique pour enfants et articles Automobile Club / Grand Prix pour amateurs de sport auto.", "Buone scelte a Monaco: scatole della Chocolaterie de Monaco, regali del Museo Oceanografico per bambini e articoli Automobile Club / Grand Prix per appassionati di motori.", "Хороші варіанти в Монако: набори Chocolaterie de Monaco, подарунки Oceanographic Museum для дітей і речі Automobile Club / Grand Prix для фанатів автоспорту."),
        ],
        relatedPlaceIds: ["monaco-ville-souvenir-shops", "chocolaterie-de-monaco", "oceanographic-museum-monaco", "automobile-club-monaco-boutique", "monaco-monte-carlo"],
      },
      {
        heading: t("Nice souvenirs if you go by train", "Souvenirs de Nice si vous y allez en train", "Souvenir di Nizza se vai in treno", "Сувеніри Ніцци, якщо їдете потягом"),
        body: [
          t("Nice is better for olive oil, candied fruit, confectionery, market browsing and old-town shopping. If you only have a few hours, keep the plan compact: Vieux Nice, Cours Saleya, Maison Auer and Nicolas Alziari.", "Nice est plus forte pour huile d'olive, fruits confits, confiserie, marche et shopping de vieille ville. Si vous n'avez que quelques heures, gardez un plan compact: Vieux Nice, Cours Saleya, Maison Auer et Nicolas Alziari.", "Nizza e migliore per olio d'oliva, frutta candita, dolci, mercati e shopping nel centro storico. Se hai poche ore, tieni il piano compatto: Vieux Nice, Cours Saleya, Maison Auer e Nicolas Alziari.", "Ніцца краща для оливкової олії, цукатів, confectionery, ринків і покупок у старому місті. Якщо маєте кілька годин, тримайте план компактним: Vieux Nice, Cours Saleya, Maison Auer і Nicolas Alziari."),
          t("These stops also pair naturally with a Nice day trip from Menton, because they sit close to the old-town and opera area rather than requiring a long shopping detour.", "Ces adresses se combinent naturellement avec une excursion a Nice depuis Menton, car elles restent pres de la vieille ville et de l'opera sans long detour shopping.", "Queste tappe si combinano naturalmente con una gita a Nizza da Mentone, perche restano vicino al centro storico e all'opera senza una lunga deviazione shopping.", "Ці зупинки природно поєднуються з поїздкою до Ніцци з Ментона, бо вони поруч зі старим містом і оперою, без довгого shopping detour."),
        ],
        relatedPlaceIds: ["nice-old-town", "cours-saleya-nice", "maison-auer-nice", "nicolas-alziari-nice"],
      },
      {
        heading: t("Staying in Menton makes shopping easier", "Sejourner a Menton simplifie les achats", "Soggiornare a Mentone rende lo shopping piu facile", "Проживання в Ментоні полегшує покупки"),
        body: [
          t("One advantage of staying in an apartment is that souvenirs do not need to wait until departure day. You can bring food products back, taste them during the stay, and then decide what to buy for home.", "Un avantage d'un sejour en appartement: les souvenirs n'attendent pas forcement le dernier jour. Vous pouvez rapporter les produits, les gouter pendant le sejour, puis decider quoi acheter pour la maison.", "Un vantaggio dell'appartamento: i souvenir non devono aspettare il giorno della partenza. Puoi riportare prodotti, assaggiarli durante il soggiorno e poi decidere cosa comprare per casa.", "Перевага апартаментів: сувеніри не треба залишати на останній день. Можна принести продукти, скуштувати їх під час перебування й потім вирішити, що купити додому."),
          t("Sea View Balcony Studio suits couples who want small edible gifts for balcony aperitifs. The Beachside Apartment with Terrace & Parking is easier for families and larger market bags. Panoramic Sea View Studio works well for elegant, compact gifts from Menton, Monaco or Nice.", "Sea View Balcony Studio convient aux couples qui veulent de petits cadeaux gourmands pour l'aperitif au balcon. L'appartement avec terrasse et parking est plus simple pour familles et sacs de marche. Panoramic Sea View Studio convient aux cadeaux elegants et compacts de Menton, Monaco ou Nice.", "Sea View Balcony Studio e adatto a coppie con piccoli regali gastronomici per aperitivi sul balcone. L'appartamento con terrazza e parcheggio e piu semplice per famiglie e borse da mercato. Panoramic Sea View Studio funziona bene per regali eleganti e compatti da Mentone, Monaco o Nizza.", "Sea View Balcony Studio підходить парам для невеликих їстівних подарунків і balcony aperitifs. Beachside Apartment with Terrace & Parking простіший для сімей і більших ринкових сумок. Panoramic Sea View Studio добрий для елегантних компактних подарунків із Ментона, Монако або Ніцци."),
        ],
        relatedApartmentKeys: allApartments,
      },
    ],
    practicalTips: [
      t("Choose Menton lemon products when you want the clearest local identity.", "Choisissez les produits au citron de Menton pour l'identite locale la plus claire.", "Scegli prodotti al limone di Mentone per l'identita locale piu chiara.", "Обирайте продукти з лимоном Ментона, якщо хочете найчіткішу локальну ідентичність."),
      t("Buy markets and food gifts in the morning, especially in summer.", "Achetez au marche et les cadeaux gourmands le matin, surtout en ete.", "Compra al mercato e i regali gastronomici al mattino, soprattutto in estate.", "Ринкові й їстівні подарунки купуйте зранку, особливо влітку."),
      t("Ask whether a product is made in Menton, Provence, France or simply Riviera-themed.", "Demandez si le produit est fait a Menton, en Provence, en France ou simplement inspire de la Riviera.", "Chiedi se il prodotto e fatto a Mentone, in Provenza, in Francia o solo a tema Riviera.", "Запитуйте, чи продукт зроблений у Ментоні, Провансі, Франції або просто стилізований під Рив'єру."),
      t("Do not leave chocolate, oils or glass jars in a hot car or beach bag.", "Ne laissez pas chocolat, huiles ou bocaux en verre dans une voiture chaude ou un sac de plage.", "Non lasciare cioccolato, oli o vasetti di vetro in auto calda o borsa da spiaggia.", "Не залишайте шоколад, олії чи скляні банки в гарячій машині або пляжній сумці."),
    ],
  }),
  shortArticle({
    id: "where-to-stay-in-menton",
    slug: "where-to-stay-in-menton",
    title: t("Where to stay in Menton: beachfront, old town or near the station?", "Ou loger a Menton: front de mer, vieille ville ou gare?", "Dove dormire a Mentone: mare, centro storico o stazione?", "Де зупинитися в Ментоні: біля моря, старого міста чи станції?"),
    seoTitle: t("Where to Stay in Menton | Beachfront vs Old Town vs Station", "Ou loger a Menton | Front de mer, vieille ville ou gare", "Dove dormire a Mentone | Mare, centro storico o stazione", "Де зупинитися в Ментоні | Море, старе місто чи станція"),
    seoDescription: t("Compare where to stay in Menton: central beachfront, old town, station area and Garavan, with guidance for Azur Menton apartments.", "Comparez ou loger a Menton: front de mer central, vieille ville, quartier de la gare et Garavan, avec des reperes pour les appartements Azur Menton.", "Confronta dove soggiornare a Mentone: lungomare centrale, centro storico, zona stazione e Garavan, con consigli per gli appartamenti Azur Menton.", "Порівняйте, де зупинитися в Ментоні: центральна набережна, старе місто, район станції та Garavan, з порадами щодо апартаментів Azur Menton."),
    excerpt: t("Menton is walkable, but your area shapes the trip: Victoria Beach for sea routines, old town for atmosphere, station area for trains and Garavan for quieter views.", "Menton se parcourt facilement a pied, mais le quartier change le sejour: Victoria Beach pour la routine mer, vieille ville pour l'ambiance, gare pour les trains et Garavan pour des vues plus calmes.", "Mentone e facile da vivere a piedi, ma la zona cambia il soggiorno: Victoria Beach per il ritmo del mare, centro storico per atmosfera, stazione per i treni e Garavan per viste piu tranquille.", "Ментон зручний пішки, але район формує подорож: Victoria Beach для морського ритму, старе місто для атмосфери, станція для потягів і Garavan для спокійніших видів."),
    category: "practical",
    coverImage: "/images/guide/where-to-stay-in-menton.jpg",
    coverImageAlt: t("Illustration of where to stay in Menton", "Illustration des quartiers ou loger a Menton", "Illustrazione di dove soggiornare a Mentone", "Ілюстрація районів для проживання в Ментоні"),
    visualTheme: "sea",
    visualStatus: "project_illustration",
    tags: [
      t("where to stay", "ou loger", "dove dormire", "де зупинитися"),
      t("central beachfront", "front de mer central", "lungomare centrale", "центральна набережна"),
      t("Garavan", "Garavan", "Garavan", "Garavan"),
      t("station", "gare", "stazione", "станція"),
    ],
    bestFor: [guideBestForOptions[3].label, guideBestForOptions[1].label, guideBestForOptions[4].label],
    duration: "flexible",
    locationTags: ["menton-centre", "old-town", "seafront", "garavan"],
    relatedPlaces: ["promenade-du-soleil", "plage-casino", "casino-barriere-menton", "plage-fossan", "plage-sablettes", "halles-du-marche", "rue-saint-michel-menton", "rampes-saint-michel", "basilica-saint-michel-archange", "cimetiere-vieux-chateau", "port-de-garavan", "rondelli-garavan-side"],
    relatedArticles: ["car-rental-menton-nice-airport-convertibles", "casinos-near-menton", "menton-one-day-itinerary", "menton-three-day-itinerary", "local-food-menton", "halles-du-marche-menton", "famous-paintings-of-menton", "music-videos-filmed-in-menton", "mountains-snow-skiing-near-menton", "best-ice-cream-menton", "theatre-opera-performing-arts-near-menton", "golf-near-menton", "menton-with-kids-family-guide", "supermarkets-in-menton", "useful-numbers-emergency-contacts-menton", "michelin-restaurants-menton-nice-monaco", "best-beaches-in-menton", "stay-cool-in-menton-summer", "day-trips-from-menton", "menton-without-a-car", "public-transport-in-menton", "menton-old-town", "quiet-evening-in-menton", "monaco-events-from-menton", "italian-riviera-day-trip-from-menton"],
    relatedApartments: allApartments,
    sections: [
      {
        heading: t("Choose by the rhythm of your stay", "Choisir selon le rythme du sejour", "Scegli in base al ritmo del soggiorno", "Обирайте за ритмом перебування"),
        body: [
          t("Menton is small enough that you can walk almost everywhere, but where you stay still shapes your trip: beachfront for easy swims and sea routines, the old town for atmosphere, the station area for quick trains, and Garavan for quieter scenic evenings.", "Menton est assez petite pour presque tout faire a pied, mais le quartier influence quand meme le sejour: front de mer pour les baignades faciles, vieille ville pour l'atmosphere, gare pour les trains rapides et Garavan pour des soirees plus calmes et panoramiques.", "Mentone e abbastanza piccola da permettere quasi tutto a piedi, ma la zona influenza comunque il viaggio: lungomare per bagni facili e routine marine, centro storico per atmosfera, zona stazione per treni rapidi e Garavan per serate piu tranquille e panoramiche.", "Ментон достатньо компактний, щоб майже всюди ходити пішки, але район усе одно формує поїздку: набережна - для легких купань і морського ритму, старе місто - для атмосфери, район станції - для швидких потягів, Garavan - для спокійніших вечорів із краєвидами."),
          t("Azur Menton apartments are arranged around this idea: two beachfront homes in the central Victoria Beach area and one first-line sea apartment in Garavan. They are not one single address; each gives a different Menton mood.", "Les appartements Azur Menton suivent cette logique: deux logements en front de mer dans le secteur central de Victoria Beach et un appartement en premiere ligne a Garavan. Ce n'est pas une seule adresse: chacun donne une ambiance differente de Menton.", "Gli appartamenti Azur Menton seguono questa idea: due case fronte mare nella zona centrale di Victoria Beach e un appartamento in prima linea a Garavan. Non sono un unico indirizzo: ognuno offre un'atmosfera diversa di Mentone.", "Апартаменти Azur Menton побудовані навколо цієї ідеї: два помешкання біля моря в центральній зоні Victoria Beach і одні апартаменти на першій лінії в Garavan. Це не одна адреса: кожен варіант дає інший настрій Ментона."),
        ],
        relatedApartmentKeys: allApartments,
      },
      {
        heading: t("Central beachfront: Victoria Beach area", "Front de mer central: secteur Victoria Beach", "Lungomare centrale: zona Victoria Beach", "Центральна набережна: район Victoria Beach"),
        body: [
          t("If your ideal Menton day starts and ends with the sea, staying near the central beaches is the most practical option. From here you are close to Plage du Fossan, Promenade du Soleil and the shops, cafes and restaurants of the town centre.", "Si votre journee ideale a Menton commence et finit avec la mer, loger pres des plages centrales est l'option la plus pratique. Vous etes proche de Plage du Fossan, de la Promenade du Soleil et des boutiques, cafes et restaurants du centre.", "Se la tua giornata ideale a Mentone inizia e finisce con il mare, soggiornare vicino alle spiagge centrali e l'opzione piu pratica. Da qui sei vicino a Plage du Fossan, Promenade du Soleil e negozi, caffe e ristoranti del centro.", "Якщо ваш ідеальний день у Ментоні починається й закінчується морем, проживання біля центральних пляжів - найпрактичніший варіант. Звідси близько до Plage du Fossan, Promenade du Soleil, крамниць, кав'ярень і ресторанів центру."),
          t("Azur Menton's two Victoria Beach apartments sit in this central beachfront zone, directly across from the sea. The sea-view studios are made for balcony breakfasts, Mediterranean views and quick swims across the promenade.", "Les deux appartements Victoria Beach d'Azur Menton se trouvent dans cette zone centrale en front de mer, juste en face de la mer. Les studios vue mer sont faits pour les petits-dejeuners au balcon, les vues mediterraneennes et les baignades rapides de l'autre cote de la promenade.", "I due appartamenti Victoria Beach di Azur Menton si trovano in questa zona centrale fronte mare, proprio di fronte al mare. I monolocali vista mare sono pensati per colazioni sul balcone, viste mediterranee e bagni rapidi attraversando la passeggiata.", "Двоє апартаментів Azur Menton у Victoria Beach розташовані в цій центральній прибережній зоні, прямо навпроти моря. Студії з видом на море створені для сніданків на балконі, середземноморських краєвидів і швидкого купання через променад."),
          t("The terrace apartment adds more space and private outdoor dining, plus on-site parking, which is rare this close to the beach and useful if you arrive by car.", "L'appartement avec terrasse ajoute plus d'espace, un coin repas exterieur prive et un parking sur place, rare aussi pres de la plage et pratique si vous arrivez en voiture.", "L'appartamento con terrazza aggiunge piu spazio, pranzo all'aperto privato e parcheggio in loco, raro cosi vicino alla spiaggia e utile se arrivi in auto.", "Апартаменти з терасою дають більше простору, приватну зону для їжі надворі та паркування на місці, що рідко так близько до пляжу й зручно, якщо приїжджаєте авто."),
        ],
        bullets: [
          t("Best for daily swims, couples, families and car-free stays.", "Ideal pour les baignades quotidiennes, couples, familles et sejours sans voiture.", "Ideale per bagni quotidiani, coppie, famiglie e soggiorni senza auto.", "Найкраще для щоденного купання, пар, сімей і перебування без авто."),
          t("Works well if you want cafes, ice cream, the promenade and the town centre close by.", "Fonctionne bien si vous voulez cafes, glaces, promenade et centre-ville a proximite.", "Funziona bene se vuoi caffe, gelati, passeggiata e centro vicino.", "Добре підходить, якщо хочете мати поруч кав'ярні, морозиво, променад і центр міста."),
        ],
        relatedPlaceIds: ["promenade-du-soleil", "plage-casino", "casino-barriere-menton", "plage-fossan", "plage-sablettes", "halles-du-marche", "rue-saint-michel-menton"],
        relatedApartmentKeys: ["sea-view-balcony-studio", "beachside-family-apartment"],
      },
      {
        heading: t("Old town and market streets", "Vieille ville et rues du marche", "Centro storico e vie del mercato", "Старе місто й ринкові вулиці"),
        body: [
          t("The streets below the old town and around Halles du Marché are good if you care more about atmosphere and food than being directly opposite the beach. You step into narrow lanes, cafes, bakeries and lemon shops, with Les Rampes Saint-Michel and the basilica just above.", "Les rues sous la vieille ville et autour des Halles du Marche conviennent si l'atmosphere et la nourriture comptent plus que le fait d'etre exactement face a la plage. Vous sortez dans ruelles, cafes, boulangeries et boutiques au citron, avec les Rampes Saint-Michel et la basilique juste au-dessus.", "Le strade sotto il centro storico e intorno alle Halles du Marché sono adatte se atmosfera e cibo contano piu dell'essere proprio di fronte alla spiaggia. Esci tra vicoli, caffe, panetterie e negozi al limone, con Les Rampes Saint-Michel e la basilica appena sopra.", "Вулиці під старим містом і навколо Halles du Marché підходять, якщо атмосфера та їжа важливіші за розташування прямо навпроти пляжу. Ви виходите у вузькі провулки, кав'ярні, пекарні та лимонні крамниці, а вище - Les Rampes Saint-Michel і базиліка."),
          t("This area works well if you like to start the day at the market, decide the plan over coffee, and walk up into the old town in the evening before returning towards the port.", "Ce secteur convient si vous aimez commencer la journee au marche, decider du programme autour d'un cafe et monter dans la vieille ville le soir avant de redescendre vers le port.", "Questa zona funziona bene se ti piace iniziare la giornata al mercato, decidere il programma davanti a un caffe e salire nel centro storico la sera prima di tornare verso il porto.", "Цей район добрий, якщо любите починати день на ринку, вирішувати план за кавою й увечері підніматися в старе місто перед поверненням до порту."),
          t("Azur Menton focuses more on central beachfront than inside the old town itself, but from the Victoria Beach apartments you can still walk to the market and basilica area in about 10-15 minutes.", "Azur Menton se concentre davantage sur le front de mer central que dans la vieille ville elle-meme, mais depuis les appartements Victoria Beach vous pouvez rejoindre le marche et la basilique a pied en environ 10 a 15 minutes.", "Azur Menton e piu orientato al lungomare centrale che al centro storico vero e proprio, ma dagli appartamenti Victoria Beach puoi comunque camminare fino al mercato e alla basilica in circa 10-15 minuti.", "Azur Menton більше зосереджений на центральній набережній, ніж безпосередньо всередині старого міста, але від апартаментів Victoria Beach до ринку й району базиліки можна дійти приблизно за 10-15 хвилин."),
        ],
        relatedPlaceIds: ["halles-du-marche", "maison-herbin-menton", "rue-saint-michel-menton", "rampes-saint-michel", "basilica-saint-michel-archange", "cimetiere-vieux-chateau", "musee-jean-cocteau-bastion", "salle-des-mariages-jean-cocteau", "musee-prehistoire-regionale-menton"],
      },
      {
        heading: t("Station area and upper town", "Quartier de la gare et haut de ville", "Zona stazione e parte alta", "Район станції та верхнє місто"),
        body: [
          t("Around Menton station and the upper parts of town, accommodation tends to be more functional. You lose the immediate seafront, but you gain quick access to TER trains towards Nice, Monaco and Italy.", "Autour de la gare de Menton et dans les parties plus hautes de la ville, les logements sont souvent plus fonctionnels. Vous perdez le front de mer immediat, mais gagnez un acces rapide aux TER vers Nice, Monaco et l'Italie.", "Intorno alla stazione di Mentone e nelle parti alte della citta, gli alloggi tendono a essere piu funzionali. Perdi il lungomare immediato, ma guadagni accesso rapido ai TER verso Nizza, Monaco e Italia.", "Навколо станції Ментона та у верхніх частинах міста житло часто більш функціональне. Ви втрачаєте безпосередню близькість до моря, зате отримуєте швидкий доступ до TER у бік Ніцци, Монако та Італії."),
          t("This area makes sense if you plan to be on trains most days and want to minimise walking with luggage. It is less ideal if your daily routine is built around quick swims and balcony breakfasts over the water.", "Ce quartier a du sens si vous prenez le train presque tous les jours et voulez limiter la marche avec les bagages. Il convient moins si votre routine quotidienne tourne autour de baignades rapides et petits-dejeuners au balcon face a l'eau.", "Questa zona ha senso se prevedi di prendere il treno quasi ogni giorno e vuoi ridurre la camminata con i bagagli. E meno ideale se la tua routine quotidiana ruota intorno a bagni rapidi e colazioni sul balcone vista mare.", "Цей район має сенс, якщо ви майже щодня користуєтеся потягами й хочете менше ходити з багажем. Він менш ідеальний, якщо ваш щоденний ритм побудований навколо швидких купань і сніданків на балконі над морем."),
          t("From Azur Menton's central beachfront apartments, you can still reach the station on foot, but your daily priority becomes sea first rather than station first.", "Depuis les appartements Azur Menton du front de mer central, la gare reste accessible a pied, mais votre priorite quotidienne devient la mer avant la gare.", "Dagli appartamenti Azur Menton sul lungomare centrale, la stazione resta raggiungibile a piedi, ma la priorita quotidiana diventa prima il mare, poi la stazione.", "Від центральних прибережних апартаментів Azur Menton до станції все одно можна дійти пішки, але щоденний пріоритет стає «спершу море», а не «спершу станція»."),
        ],
        relatedPlaceIds: ["promenade-du-soleil", "office-tourisme-menton-riviera-merveilles"],
      },
      {
        heading: t("Garavan: quiet first line with views", "Garavan: premiere ligne calme avec vues", "Garavan: prima linea tranquilla con vista", "Garavan: спокійна перша лінія з видами"),
        body: [
          t("Garavan lies east of central Menton, close to the Italian border, with its own seafront, marina and a more residential, scenic feel. The beaches are quieter, Port de Garavan has long lines of boats, and the views back towards the old town and bay are some of Menton's nicest.", "Garavan se trouve a l'est du centre de Menton, pres de la frontiere italienne, avec son propre front de mer, sa marina et une ambiance plus residentielle et panoramique. Les plages y sont plus calmes, le Port de Garavan aligne les bateaux, et les vues vers la vieille ville et la baie comptent parmi les plus belles de Menton.", "Garavan si trova a est del centro di Mentone, vicino al confine italiano, con il suo lungomare, marina e un'atmosfera piu residenziale e panoramica. Le spiagge sono piu tranquille, Port de Garavan ha lunghe file di barche e le viste verso il centro storico e la baia sono tra le piu belle di Mentone.", "Garavan лежить на схід від центру Ментона, близько до італійського кордону, зі своєю набережною, маріною та більш житловим, мальовничим настроєм. Пляжі тут спокійніші, Port de Garavan має довгі ряди човнів, а види назад на старе місто й бухту - одні з найкращих у Ментоні."),
          t("Azur Menton's Garavan apartment is on the first line here, facing the sea. It suits guests who want a calmer end-of-the-bay atmosphere, easy marina walks and access towards the Italian border.", "L'appartement Azur Menton a Garavan est en premiere ligne, face a la mer. Il convient aux voyageurs qui veulent une atmosphere plus calme en bout de baie, des promenades faciles vers la marina et un acces vers la frontiere italienne.", "L'appartamento Azur Menton a Garavan e in prima linea, fronte mare. E adatto a chi cerca un'atmosfera piu calma a fine baia, passeggiate facili alla marina e accesso verso il confine italiano.", "Апартаменти Azur Menton у Garavan розташовані на першій лінії, обличчям до моря. Вони підходять гостям, які хочуть спокійнішої атмосфери «на краю бухти», легких прогулянок до маріни й доступу в бік італійського кордону."),
          t("From Garavan, you can walk along the seafront to Sablettes and the old town, take a bus when useful, or simply stay in the area and enjoy a more local rhythm.", "Depuis Garavan, vous pouvez marcher le long de la mer vers Sablettes et la vieille ville, prendre un bus quand c'est utile, ou simplement rester dans le quartier et profiter d'un rythme plus local.", "Da Garavan puoi camminare lungo il mare verso Sablettes e il centro storico, prendere un bus quando serve, oppure restare in zona e goderti un ritmo piu locale.", "З Garavan можна йти вздовж моря до Sablettes і старого міста, користуватися автобусом, коли зручно, або просто залишатися в районі й насолоджуватися більш локальним ритмом."),
        ],
        relatedPlaceIds: ["port-de-garavan", "rondelli-garavan-side", "plage-sablettes", "sentier-douaniers-menton", "ventimiglia"],
        relatedApartmentKeys: ["panoramic-sea-view-studio"],
      },
      {
        heading: t("How to choose your area", "Comment choisir votre quartier", "Come scegliere la zona", "Як обрати район"),
        body: [
          t("If you picture coffee on a balcony with immediate sea views and crossing the promenade for a quick swim, choose Victoria Beach in central Menton. If you prefer quieter views and a marina atmosphere while staying on the first line, Garavan is a better match.", "Si vous imaginez un cafe au balcon avec vue mer immediate et une baignade rapide en traversant la promenade, choisissez Victoria Beach dans le centre de Menton. Si vous preferez des vues plus calmes et une atmosphere de marina tout en restant en premiere ligne, Garavan correspond mieux.", "Se immagini un caffe sul balcone con vista mare immediata e un bagno rapido attraversando la passeggiata, scegli Victoria Beach nel centro di Mentone. Se preferisci viste piu tranquille e atmosfera da marina restando comunque in prima linea, Garavan e piu adatto.", "Якщо уявляєте каву на балконі з прямим видом на море й швидке купання через променад, обирайте Victoria Beach у центрі Ментона. Якщо хочете спокійніші види й атмосферу маріни, залишаючись на першій лінії, Garavan підійде краще."),
          t("If most of your time will be spent exploring Monaco, Nice and Italy by train, central beachfront still works well because you are between the station and the beaches and can walk to both.", "Si vous passerez surtout votre temps a explorer Monaco, Nice et l'Italie en train, le front de mer central fonctionne toujours bien car vous etes entre la gare et les plages, accessibles a pied.", "Se passerai molto tempo esplorando Monaco, Nizza e Italia in treno, il lungomare centrale funziona comunque bene perche sei tra stazione e spiagge e puoi raggiungere entrambe a piedi.", "Якщо більшість часу плануєте досліджувати Монако, Ніццу й Італію потягом, центральна набережна все одно добре працює: ви між станцією та пляжами й можете дійти до обох."),
          t("All Azur Menton apartments keep the same idea in mind: straightforward walking access to the sea, old town and transport, with enough comfort to treat Menton as a base rather than just a quick stop.", "Tous les appartements Azur Menton gardent la meme idee: acces simple a pied a la mer, a la vieille ville et aux transports, avec assez de confort pour utiliser Menton comme base et pas seulement comme etape rapide.", "Tutti gli appartamenti Azur Menton seguono la stessa idea: accesso semplice a piedi al mare, al centro storico e ai trasporti, con abbastanza comfort per vivere Mentone come base e non solo come sosta veloce.", "Усі апартаменти Azur Menton тримають одну ідею: простий пішохідний доступ до моря, старого міста й транспорту, з достатнім комфортом, щоб сприймати Ментон як базу, а не просто швидку зупинку."),
        ],
        relatedApartmentKeys: allApartments,
      },
    ],
    practicalTips: [
      t("Choose Victoria Beach for daily swims, central cafes and the easiest sea routine.", "Choisissez Victoria Beach pour les baignades quotidiennes, les cafes centraux et la routine mer la plus simple.", "Scegli Victoria Beach per bagni quotidiani, caffe centrali e la routine mare piu facile.", "Обирайте Victoria Beach для щоденного купання, центральних кав'ярень і найпростішого морського ритму."),
      t("Choose Garavan for quieter first-line views, marina walks and a calmer evening mood.", "Choisissez Garavan pour des vues plus calmes en premiere ligne, les promenades de marina et une ambiance du soir plus paisible.", "Scegli Garavan per viste piu tranquille in prima linea, passeggiate alla marina e serate piu calme.", "Обирайте Garavan для спокійніших видів на першій лінії, прогулянок маріною й тихішого вечірнього настрою."),
      t("If trains are your priority, check walking distance to Menton station, but you do not need to give up the seafront entirely.", "Si le train est votre priorite, verifiez la marche jusqu'a la gare de Menton, mais vous n'avez pas besoin de renoncer completement au front de mer.", "Se i treni sono la priorita, controlla la distanza a piedi dalla stazione di Mentone, ma non devi rinunciare del tutto al lungomare.", "Якщо потяги - ваш пріоритет, перевірте пішу відстань до станції Ментона, але не обов'язково повністю відмовлятися від набережної."),
    ],
  }),
  shortArticle({
      id: "official-tourism-websites-menton-riviera",
      slug: "official-tourism-websites-menton-riviera",
      title: t("Official tourism websites for Menton and the French Riviera", "Sites officiels de tourisme pour Menton et la Riviera", "Siti turistici ufficiali per Menton e la Riviera", "Офіційні туристичні сайти Ментона та Французької Рив'єри"),
      seoTitle: t("Official Tourism Websites for Menton and the French Riviera", "Sites officiels de tourisme pour Menton et la Riviera", "Siti turistici ufficiali per Menton e la Riviera", "Офіційні туристичні сайти Ментона та Французької Рив'єри"),
      seoDescription: t(
        "If you cannot find something in our Azur Menton guides, these official tourism websites can help you check dates, events, transport, activities and practical information for Menton, the French Riviera and France.",
        "Si vous ne trouvez pas tout dans nos guides Azur Menton, ces sites officiels vous aident a verifier dates, evenements, transport, activites et informations pratiques pour Menton, la Riviera et la France.",
        "Se nelle nostre guide Azur Menton manca un dettaglio, questi siti ufficiali aiutano a controllare date, eventi, trasporti, attivita e informazioni pratiche per Menton, la Riviera e la Francia.",
        "Якщо у наших гідах Azur Menton чогось бракує, ці офіційні туристичні сайти допоможуть перевірити дати, події, транспорт, активності та практичну інформацію для Ментона, Рив'єри та Франції.",
      ),
      excerpt: t("A practical reference list of official websites for dates, transport and practical planning in and around Menton.", "Liste pratique des sites officiels pour dates, transports et planification autour de Menton.", "Elenco pratico di siti ufficiali per date, trasporti e pianificazione pratica intorno a Menton.", "Практичний перелік офіційних сайтів для дат, транспорту і планування подорожі довкола Ментона."),
      category: "practical",
      tags: [
        t("official websites", "sites officiels", "siti ufficiali", "офіційні сайти"),
        t("practical planning", "planification pratique", "pianificazione pratica", "практичне планування"),
        t("events", "evenements", "eventi", "події"),
        t("transport", "transport", "trasporto", "транспорт"),
        t("trips beyond Menton", "sejours au-dela de Menton", "viaggi oltre Menton", "подорожі поза Ментоном"),
      ],
      bestFor: [
        t("Families", "Familles", "Famiglie", "Сім'ї"),
        t("First-time visitors", "Premier sejour", "Prima visita", "Перший візит"),
        t("Couples", "Couples", "Coppie", "Пари"),
        t("Without a car", "Sans voiture", "Senza auto", "Без авто"),
      ],
      duration: "flexible",
      locationTags: ["menton-centre", "monaco", "nice", "italian-riviera"],
      coverImage: "/images/guide/official-tourism-websites-menton-riviera.png",
      coverImageAlt: t(
        "Illustration of official tourism websites for Menton and the French Riviera",
        "Illustration des sites officiels de tourisme pour Menton et la Riviera",
        "Illustrazione dei siti turistici ufficiali per Menton e la Riviera",
        "Ілюстрація офіційних туристичних сайтів Ментона та Французької Рив'єри",
      ),
      visualTheme: "old-town",
      visualStatus: "project_illustration",
      sourceStatus: "verified",
      relatedPlaces: [
        "office-tourisme-menton-riviera-merveilles",
        "palais-de-leurope-menton",
        "menton-station",
        "roquebrune-cap-martin",
        "la-turbie",
        "sospel-bevera-valley",
        "mercantour-national-park",
      ],
      relatedArticles: [
        "menton-without-a-car",
        "day-trips-from-menton",
        "monaco-events-from-menton",
        "how-to-get-to-menton-from-nice-airport",
        "fete-du-citron-menton-practical-guide",
        "best-beaches-in-menton",
      ],
      relatedApartments: allApartments,
      utilityBlocks: [
        {
          type: "localRadio",
          region: "menton",
          title: "Local radio for practical planning",
          description: "Useful stations for transport updates, weather changes and weekend event news.",
          stationIds: ["france-bleu-cote-azur", "rmc-azur", "monaco-mondiale-radio"],
        },
      ],
      sections: [
        {
          heading: t("France.fr", "France.fr", "France.fr", "France.fr"),
          body: [
            t(
              "France.fr gives official nationwide tourism context: practical travel advice, broad transport notices and event calendars that are useful when you are planning around long weekends or nationwide holidays.",
              "France.fr propose un contexte touristique national : informations de voyage officielles, avis de transport et agendas d'événements utiles lors des week-ends prolongés ou jours fériés nationaux.",
              "France.fr fornisce il quadro turistico nazionale: consigli di viaggio ufficiali, comunicazioni sui trasporti e calendari eventi utili quando si viaggia durante weekend lunghi o festività nazionali.",
              "France.fr дає національний туристичний контекст: офіційну практичну інформацію для подорожей, повідомлення про транспорт і календар подій, корисні під час довгих вихідних чи загальнонаціональних свят.",
            ),
            t(
              "Good for first checks on dates and travel conditions before switching to regional sources.",
              "Utile pour un premier contrôle des dates et des conditions de voyage avant de passer aux sources régionales.",
              "Ideale per un primo controllo su date e condizioni di viaggio prima di passare alle fonti regionali.",
              "Ізручний первинний ресурс для перевірки дат і умов подорожі перед переходом на регіональні джерела.",
            ),
          ],
          image: "/images/guide/official-france-france.jpg",
          imageAlt: t(
            "France.fr tourism portal snapshot",
            "Aperçu du portail France.fr",
            "Anteprima del portale France.fr",
            "Скріншот порталу France.fr",
          ),
          officialLinks: [{ label: t("France.fr", "France.fr", "France.fr", "France.fr"), url: "https://www.france.fr/en/" }],
          relatedPlaceIds: ["mairie-menton"],
        },
        {
          heading: t("Côte d'Azur France", "Côte d'Azur France", "Côte d'Azur France", "Côte d'Azur France"),
          body: [
            t(
              "Côte d'Azur France focuses on the regional tourism layer across Nice, Menton and Monaco-adjacent areas: events, practical itineraries and seasonal recommendations.",
              "Côte d'Azur France couvre l'échelon régional : événements, parcours pratiques et recommandations saisonnières autour de Nice, Menton et les zones voisines de Monaco.",
              "Côte d'Azur France copre il livello regionale: eventi, itinerari pratici e raccomandazioni stagionali a Nice, Menton e nelle aree vicine a Monaco.",
              "Côte d'Azur France охоплює регіональний рівень: події, практичні маршрути та сезонні поради для Ніцци, Ментона й зон поблизу Монако.",
            ),
            t(
              "Use it when planning longer stays, day trips and ferry/rail-oriented mobility in the Riviera.",
              "Utilisez-le pour les séjours plus longs, les excursions d'une journée et la mobilité train/liaisons dans la Riviera.",
              "Usalo per soggiorni più lunghi, escursioni giornaliere e mobilità orientata a treno o bus lungo la Riviera.",
              "Використовуйте для довших перебувань, денних виїздів та планування пересадок потягами і автобусами на Рив'єрі.",
            ),
          ],
          image: "/images/guide/official-cote-dazur-france.jpg",
          imageAlt: t(
            "Côte d'Azur France tourism site snapshot",
            "Capture du site Côte d'Azur France",
            "Screenshot del sito Côte d'Azur France",
            "Скріншот сайту Côte d'Azur France",
          ),
          officialLinks: [{ label: t("Cote d'Azur France", "Cote d'Azur France", "Cote d'Azur France", "Cote d'Azur France"), url: "https://cotedazurfrance.com/" }],
          relatedPlaceIds: ["menton-station"],
        },
        {
          heading: t("Menton official city site", "Site officiel de Menton", "Sito ufficiale del comune di Mentone", "Офіційний сайт Ментона"),
          body: [
            t(
              "Menton's official site is the best source for practical municipal updates: city notices, civic services, cultural listings and local logistics around the old town and seafront.",
              "Le site officiel de Menton rassemble les informations municipales utiles : annonces de la ville, services publics, agenda culturel et informations pratiques autour de la vieille ville et du front de mer.",
              "Il sito ufficiale di Mentone riunisce comunicazioni comunali utili: avvisi municipali, servizi pubblici, agenda culturale e informazioni pratiche per il centro storico e il lungomare.",
              "Офіційний сайт Ментона — основне джерело міських оголошень: комунальні новини, громадські служби, культурна програма й практичні дані про центр і набережну.",
            ),
            t(
              "Cross-check access rules, beach updates and municipal notices before booking family-heavy weekends or event-based trips.",
              "Vérifiez les règles d'accès, les mises à jour des plages et les avis municipaux avant de réserver un week-end familial ou un voyage lié à des événements.",
              "Verifica regole di accesso, aggiornamenti sulle spiagge e avvisi comunali prima di prenotare settimane familiari o viaggi legati agli eventi.",
              "Перевіряйте правила доступу, стан пляжів та муніципальні оголошення перед бронюванням сімейних вихідних чи подорожей з приводу подій.",
            ),
          ],
          image: "/images/guide/official-menton-municipality.jpg",
          imageAlt: t(
            "Menton municipal website snapshot",
            "Capture du site de la mairie de Menton",
            "Screenshot del sito del comune di Mentone",
            "Скріншот сайту міської ради Ментона",
          ),
          officialLinks: [{ label: t("Menton.fr", "Ville de Menton", "Menton.fr", "Ментон.fr"), url: "https://www.menton.fr/" }],
          relatedPlaceIds: ["menton-station", "office-tourisme-menton-riviera-merveilles"],
        },
        {
          heading: t("Menton Riviera & Merveilles", "Menton Riviera et Merveilles", "Menton Riviera & Merveilles", "Menton Riviera & Merveilles"),
          body: [
            t(
              "Menton Riviera & Merveilles is the central tourism and discovery portal for Menton, with practical guides to beaches, markets and local attractions.",
              "Menton Riviera & Merveilles est le portail de visite et de découverte locale de Menton : plages, marchés, itinéraires et points d'intérêt.",
              "Menton Riviera & Merveilles è il punto d'ingresso per scoprire Mentone: spiagge, mercati, percorsi e attrazioni locali.",
              "Menton Riviera & Merveilles — головний інформаційний портал Ментона з практичними гайдами про пляжі, ринки й місцеві атракції.",
            ),
            t(
              "Useful when you have a target destination and need a fast checklist before departure.",
              "Pratique lorsque la destination est déjà définie et que vous cherchez une checklist locale rapide avant le départ.",
              "Utile quando la destinazione è già definita e cerchi una checklist locale veloce prima della partenza.",
              "Корисний, коли напрямок уже відомий і потрібен швидкий локальний чекліст перед від’їздом.",
            ),
          ],
          image: "/images/guide/official-menton-riviera-merveilles.jpg",
          imageAlt: t(
            "Menton Riviera & Merveilles tourism portal snapshot",
            "Capture du portail Menton Riviera & Merveilles",
            "Screenshot del portale Menton Riviera & Merveilles",
            "Скріншот порталу Menton Riviera & Merveilles",
          ),
          officialLinks: [{ label: t("Menton Riviera & Merveilles", "Menton Riviera & Merveilles", "Menton Riviera & Merveilles", "Menton Riviera & Merveilles"), url: "https://www.menton-riviera-merveilles.fr/" }],
          relatedPlaceIds: ["office-tourisme-menton-riviera-merveilles"],
        },
      ],
      practicalTips: [
        t("Check official pages for exact dates, accessibility notes and transport changes before purchasing.", "Verifiez les pages officielles pour les dates exactes, les notes d'accessibilite et les changements de transport avant l'achat." , "Controlla le pagine ufficiali per date esatte, note di accessibilita e cambi trasporti prima di acquistare.", "Перевіряйте офіційні сторінки на точні дати, умови доступу та зміни транспорту перед покупкою."),
        t("Use the official city and regional tourism sites as a confirmation layer, not as a replacement for practical local guidance.", "Utilisez les sites officiels ville et region comme verification, pas comme remplacement des conseils pratiques locaux.", "Usa i siti turistici ufficiali comunali e regionali come livello di verifica, non come sostituto delle guide pratiche locali.", "Використовуйте офіційні міські й регіональні туристичні сайти для перевірки, а не замість практичних локальних порад."),
        t("If a guide detail needs confirmation, add the official source in your planning notes and keep your date window explicit.", "Si un point du guide doit etre confirme, ajoutez la source officielle dans vos notes et precisez la periode.", "Se un dettaglio della guida richiede conferma, aggiungi la fonte ufficiale alle note di pianificazione e indica chiaramente la finestra di date.", "Якщо деталь гіда потребує підтвердження, додайте офіційну джерело в свої нотатки та чітко вкажіть період дат."),
      ],
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
      imageAlt: section.imageAlt?.[locale],
      guideLinkLabel: section.guideLinkLabel?.[locale],
      videoEmbeds: section.videoEmbeds?.map((video) => ({
        ...video,
        title: video.title[locale],
        caption: video.caption?.[locale],
      })),
      officialLinks: section.officialLinks?.map((link) => ({
        ...link,
        label: link.label[locale],
      })),
      artworkCards: section.artworkCards?.map((artwork) => ({
        ...artwork,
        workTitle: artwork.workTitle[locale],
        imageAlt: artwork.imageAlt?.[locale],
        rightsNote: artwork.rightsNote[locale],
        locationNote: artwork.locationNote[locale],
      })),
    })),
    appTools: article.appTools?.map((tool) => ({
      ...tool,
      useFor: tool.useFor[locale],
      bestFor: tool.bestFor[locale],
      imageAlt: tool.imageAlt?.[locale],
    })),
    utilityBlocks: article.utilityBlocks,
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
    utilityBlocks: localized.utilityBlocks,
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

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
    seoDescription: t("From pichade, socca and barbajuans to fougasse mentonnaise and citrus sweets, discover what to try first in Menton.", "De la pichade, socca et barbajuans a la fougasse mentonnaise et aux douceurs aux agrumes, decouvrez quoi gouter a Menton.", "Da pichade, socca e barbajuans alla fougasse mentonnaise e ai dolci agli agrumi, scopri cosa assaggiare a Mentone.", "Від pichade, socca і barbajuans до fougasse mentonnaise та цитрусових солодощів: що спробувати в Ментоні спочатку."),
    excerpt: t("A practical first tasting list for Menton: pichade, socca, barbajuans, fougasse mentonnaise and lemon-based sweets from the market.", "Une premiere liste simple a gouter a Menton: pichade, socca, barbajuans, fougasse mentonnaise et douceurs au citron du marche.", "Una prima lista pratica da assaggiare a Mentone: pichade, socca, barbajuans, fougasse mentonnaise e dolci al limone del mercato.", "Практичний список для першої дегустації в Ментоні: pichade, socca, barbajuans, fougasse mentonnaise і лимонні солодощі з ринку."),
    category: "food-markets",
    coverImage: "/images/guide/local-food-menton.png",
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
        relatedPlaceIds: ["halles-du-marche"],
        relatedApartmentKeys: allApartments,
      },
      {
        heading: t("Pichade and pissaladière", "Pichade et pissaladiere", "Pichade e pissaladière", "Pichade і pissaladière"),
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
        relatedPlaceIds: ["halles-du-marche"],
      },
      {
        heading: t("Socca and warm street food", "Socca et street food chaude", "Socca e street food calda", "Socca й тепла вулична їжа"),
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
        relatedPlaceIds: ["halles-du-marche"],
      },
      {
        heading: t("Barbajuans and market picnic bites", "Barbajuans et pique-nique de marche", "Barbajuans e assaggi da picnic", "Barbajuans і ринковий пікнік"),
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
        relatedPlaceIds: ["halles-du-marche", "promenade-du-soleil"],
      },
      {
        heading: t("Fougasse mentonnaise and citrus sweets", "Fougasse mentonnaise et douceurs aux agrumes", "Fougasse mentonnaise e dolci agli agrumi", "Fougasse mentonnaise і цитрусові солодощі"),
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
        relatedPlaceIds: ["halles-du-marche"],
      },
      {
        heading: t("Citrus drinks and apartment pairings", "Boissons aux agrumes et repas a l'appartement", "Bevande agli agrumi e abbinamenti in appartamento", "Цитрусові напої й прості поєднання в апартаментах"),
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
        relatedPlaceIds: ["halles-du-marche"],
      },
    ],
    practicalTips: [
      t("Visit the market in the morning for the widest choice.", "Visitez le marche le matin pour le plus grand choix.", "Visita il mercato al mattino per avere piu scelta.", "Ідіть на ринок зранку, коли вибір найбільший."),
      t("Ask what is homemade, local or just out of the oven.", "Demandez ce qui est fait maison, local ou tout juste sorti du four.", "Chiedi cosa e fatto in casa, locale o appena uscito dal forno.", "Запитуйте, що домашнє, місцеве або щойно з печі."),
      t("Try one market breakfast and one simple picnic-style apartment meal.", "Essayez un petit-dejeuner de marche et un repas simple a l'appartement.", "Prova una colazione al mercato e un pasto semplice in appartamento.", "Спробуйте один ринковий сніданок і одну просту вечерю-пікнік в апартаментах."),
    ],
    relatedPlaces: ["halles-du-marche", "promenade-du-soleil"],
    relatedArticles: ["halles-du-marche-menton", "menton-one-day-itinerary", "bars-and-beer-in-menton"],
    relatedApartments: allApartments,
  },
  {
    id: "halles-du-marche-menton",
    slug: "halles-du-marche-menton",
    title: t("Halles du Marché: Menton's morning market", "Halles du Marche: le marche du matin de Menton", "Halles du Marché: il mercato del mattino di Mentone", "Halles du Marché: ранковий ринок Ментона"),
    seoTitle: t("Halles du Marché Menton | Morning Market Guide", "Halles du Marche Menton | Guide du marche", "Halles du Marché Mentone | Guida al mercato", "Halles du Marché Menton | Гід по ранковому ринку"),
    seoDescription: t("A practical guide to Halles du Marché in Menton: when to go, what to taste, market picnic ideas and simple apartment meals.", "Guide pratique des Halles du Marche a Menton: quand venir, quoi gouter, idees de pique-nique et repas simples a l'appartement.", "Guida pratica alle Halles du Marché di Mentone: quando andare, cosa assaggiare, picnic e pasti semplici in appartamento.", "Практичний гід по Halles du Marché у Ментоні: коли йти, що куштувати, пікнік і прості страви в апартаментах."),
    excerpt: t("Halles du Marché is the easiest way to feel Menton waking up: fruit, citrus, cheeses, olives, pastries and small local bites before the old town or Sablettes.", "Les Halles du Marche sont l'une des facons les plus simples de sentir Menton se reveiller: fruits, agrumes, fromages, olives, patisseries et petites specialites avant la vieille ville ou Sablettes.", "Le Halles du Marché sono uno dei modi piu semplici per sentire Mentone che si sveglia: frutta, agrumi, formaggi, olive, dolci e piccoli assaggi locali prima del centro storico o di Sablettes.", "Halles du Marché - один із найпростіших способів відчути, як прокидається Ментон: фрукти, цитрусові, сири, оливки, випічка й невеликі місцеві закуски перед старим містом або Sablettes."),
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
        relatedPlaceIds: ["halles-du-marche", "rampes-saint-michel", "plage-sablettes"],
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
        heading: t("What to look for", "Que chercher", "Cosa cercare", "Що шукати"),
        body: [
          t(
            "Think of Halles du Marché as a starting point for simple local food rather than a formal tourist attraction. Look for Menton lemons and other citrus, seasonal fruit, tomatoes, salad greens, olives and tapenades, local cheeses, cured meats, fresh pasta and prepared dishes to take away.",
            "Pensez aux Halles du Marche comme a un point de depart pour une cuisine locale simple plutot qu'a une attraction touristique formelle. Cherchez les citrons de Menton et autres agrumes, fruits de saison, tomates, salades, olives et tapenades, fromages locaux, charcuteries, pates fraiches et plats prepares a emporter.",
            "Pensa alle Halles du Marché come a un punto di partenza per cibo locale semplice, non come a un'attrazione turistica formale. Cerca limoni di Mentone e altri agrumi, frutta di stagione, pomodori, insalate, olive e tapenade, formaggi locali, salumi, pasta fresca e piatti pronti da portare via.",
            "Сприймайте Halles du Marché як стартову точку для простої локальної їжі, а не як формальну туристичну пам'ятку. Шукайте лимони Ментона й інші цитрусові, сезонні фрукти, помідори, зелень, оливки й тапенади, локальні сири, м'ясні делікатеси, свіжу пасту та готові страви на виніс.",
          ),
          t(
            "Several stalls may also sell ready-to-eat specialities: slices of pichade and pissaladière, socca when it comes out hot, barbajuans filled with greens, cheese and rice, and sometimes fougasse mentonnaise for a sweet breakfast back at the apartment.",
            "Plusieurs stands peuvent aussi proposer des specialites pretes a manger : parts de pichade et pissaladiere, socca quand elle sort chaude, barbajuans farcis de blettes, fromage et riz, et parfois fougasse mentonnaise pour un petit-dejeuner sucre a l'appartement.",
            "Diversi banchi possono vendere anche specialita pronte da mangiare: fette di pichade e pissaladière, socca quando esce calda, barbajuans ripieni di verdure, formaggio e riso, e a volte fougasse mentonnaise per una colazione dolce in appartamento.",
            "Деякі ятки можуть продавати готові місцеві закуски: шматки pichade і pissaladière, socca, коли вона гаряча, barbajuans із зеленню, сиром і рисом, а іноді fougasse mentonnaise для солодкого сніданку в апартаментах.",
          ),
        ],
        relatedPlaceIds: ["halles-du-marche"],
      },
      {
        heading: t("What to taste on the spot", "Quoi gouter sur place", "Cosa assaggiare sul posto", "Що скуштувати на місці"),
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
        relatedPlaceIds: ["halles-du-marche", "promenade-du-soleil"],
      },
      {
        heading: t("Picnics and simple apartment meals", "Pique-niques et repas simples a l'appartement", "Picnic e pasti semplici in appartamento", "Пікніки й прості страви в апартаментах"),
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
        relatedPlaceIds: ["halles-du-marche", "plage-sablettes"],
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
        relatedPlaceIds: ["halles-du-marche"],
      },
    ],
    practicalTips: [
      t("Arrive before 10:00 for better choice and a calmer visit.", "Arrivez avant 10h00 pour plus de choix et une visite plus calme.", "Arriva prima delle 10:00 per piu scelta e una visita piu calma.", "Приходьте до 10:00 для кращого вибору й спокійнішого візиту."),
      t("Check current hours before visiting.", "Verifiez les horaires actuels avant de venir.", "Controlla gli orari aggiornati prima della visita.", "Перед візитом перевірте актуальні години роботи."),
      t("Bring a reusable bag for picnic and apartment ingredients.", "Prenez un sac reutilisable pour le pique-nique et les achats a l'appartement.", "Porta una borsa riutilizzabile per picnic e spesa da appartamento.", "Візьміть багаторазову сумку для пікніка й продуктів в апартаменти."),
    ],
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
    relatedArticles: ["bars-and-beer-in-menton", "quiet-evening-in-menton", "public-transport-in-menton", "day-trips-from-menton"],
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
    id: "best-photo-spots-menton",
    slug: "best-photo-spots-menton",
    title: t("Best photo spots in Menton", "Meilleurs spots photo a Menton", "Migliori luoghi fotografici a Mentone", "Найкращі місця для фото в Ментоні"),
    seoTitle: t("Best Photo Spots in Menton | Azur Menton Guide", "Meilleurs spots photo a Menton | Guide Azur Menton", "Migliori spot fotografici a Mentone | Guida Azur Menton", "Найкращі місця для фото в Ментоні | Гід Azur Menton"),
    seoDescription: t("A half-day photo guide to Menton: old-town colour, Rampes Saint-Michel, seafront lines, gardens, Port de Garavan and nearby Riviera photo ideas.", "Guide photo d'une demi-journee a Menton: couleurs de la vieille ville, Rampes Saint-Michel, lignes du front de mer, jardins, Port de Garavan et idees Riviera proches.", "Guida fotografica di mezza giornata a Mentone: colori del centro storico, Rampes Saint-Michel, linee del lungomare, giardini, Port de Garavan e idee Riviera vicine.", "Фотогід Ментоном на пів дня: кольори старого міста, Rampes Saint-Michel, лінії набережної, сади, Port de Garavan і найближчі фотоідеї Рив'єри."),
    excerpt: t("Menton is compact enough to collect old-town colours, staircases, sea views, gardens and Garavan in half a day, mostly on foot from central apartments.", "Menton est assez compacte pour reunir couleurs de vieille ville, escaliers, vues mer, jardins et Garavan en une demi-journee, surtout a pied depuis les appartements centraux.", "Mentone e abbastanza compatta per raccogliere colori del centro storico, scale, viste mare, giardini e Garavan in mezza giornata, quasi tutto a piedi dagli appartamenti centrali.", "Ментон достатньо компактний, щоб за пів дня зібрати кольори старого міста, сходи, море, сади й Garavan, здебільшого пішки від центральних апартаментів."),
    category: "photo-spots",
    coverImage: "/images/guide/best-photo-spots-menton.png",
    coverImageAlt: t("Illustration of photo spots in Menton", "Illustration des spots photo a Menton", "Illustrazione dei luoghi fotografici a Mentone", "Ілюстрація місць для фото в Ментоні"),
    visualTheme: "old-town",
    visualStatus: "project_illustration",
    tags: [t("views", "vues", "viste", "краєвиди"), t("old town", "vieille ville", "centro storico", "старе місто"), t("gardens", "jardins", "giardini", "сади"), t("Garavan", "Garavan", "Garavan", "Garavan")],
    bestFor: [guideBestForOptions[0].label, guideBestForOptions[7].label, guideBestForOptions[3].label],
    duration: "half-day",
    locationTags: ["old-town", "seafront", "garavan", "monaco", "nice"],
    featured: true,
    relatedPlaces: ["rampes-saint-michel", "promenade-du-soleil", "jardin-serre-de-la-madone", "jardin-val-rahmeh", "cimetiere-vieux-chateau", "port-de-garavan", "plage-sablettes"],
    relatedArticles: ["quiet-evening-in-menton", "menton-old-town", "day-trips-from-menton", "menton-without-a-car"],
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
        relatedPlaceIds: ["rampes-saint-michel", "cimetiere-vieux-chateau", "plage-sablettes"],
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
        relatedPlaceIds: ["promenade-du-soleil", "plage-sablettes"],
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
        relatedPlaceIds: ["port-de-garavan"],
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
        relatedPlaceIds: ["plage-sablettes", "plage-fossan", "borrigo-beaches"],
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
        relatedPlaceIds: ["plage-fossan", "promenade-du-soleil"],
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
        relatedPlaceIds: ["promenade-du-soleil"],
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
    id: "menton-one-day-itinerary",
    slug: "menton-one-day-itinerary",
    title: t("Menton in one day: a relaxed walking itinerary", "Menton en une journee: itineraire a pied detendu", "Mentone in un giorno: itinerario a piedi rilassato", "Ментон за один день: спокійний пішохідний маршрут"),
    seoTitle: t("Menton in One Day | Walking Itinerary", "Menton en une journee | Itineraire a pied", "Mentone in un giorno | Itinerario a piedi", "Ментон за один день | Пішохідний маршрут"),
    seoDescription: t("A relaxed one-day walking itinerary in Menton with coffee, the market, old town viewpoints, Sablettes beach, gardens and a seafront evening.", "Itineraire detendu d'une journee a pied a Menton avec cafe, marche, vues de la vieille ville, Sablettes, jardins et soiree au bord de mer.", "Itinerario rilassato di un giorno a piedi a Mentone con caffe, mercato, panorami del centro storico, Sablettes, giardini e sera sul lungomare.", "Спокійний пішохідний маршрут Ментоном на день: кава, ринок, краєвиди старого міста, Sablettes, сади й вечір біля моря."),
    excerpt: t("A full day in Menton works best when it stays simple: market, old streets, Sablettes, one flexible garden option and an evening by the sea.", "Une journee a Menton fonctionne mieux si elle reste simple: marche, vieilles rues, Sablettes, une option jardin flexible et une soiree en bord de mer.", "Una giornata a Mentone funziona meglio se resta semplice: mercato, strade antiche, Sablettes, un giardino opzionale e una sera sul mare.", "Один день у Ментоні найкраще працює просто: ринок, старі вулиці, Sablettes, один гнучкий варіант із садом і вечір біля моря."),
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
        relatedPlaceIds: ["halles-du-marche", "rampes-saint-michel"],
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
    coverImage: "/images/guide/menton-three-day-itinerary.png",
    coverImageAlt: t("Illustration of a three-day Menton, Monaco and Italian Riviera itinerary", "Illustration d'un itineraire de trois jours entre Menton, Monaco et Riviera italienne", "Illustrazione di un itinerario di tre giorni tra Mentone, Monaco e Riviera italiana", "Ілюстрація маршруту на три дні: Ментон, Монако й Італійська Рив'єра"),
    visualTheme: "itinerary",
    visualStatus: "project_illustration",
    tags: [t("three days", "trois jours", "tre giorni", "три дні"), t("day trips", "excursions", "gite", "поїздки")],
    bestFor: [guideBestForOptions[3].label, guideBestForOptions[0].label, guideBestForOptions[1].label],
    duration: "2-3 days",
    locationTags: ["menton-centre", "monaco", "nice", "italian-riviera"],
    relatedArticles: ["day-trips-from-menton", "menton-without-a-car", "public-transport-in-menton", "best-beaches-in-menton", "menton-one-day-itinerary"],
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
        relatedPlaceIds: ["halles-du-marche", "rampes-saint-michel", "cimetiere-vieux-chateau", "plage-sablettes", "jardin-val-rahmeh", "promenade-du-soleil", "port-de-garavan", "med-rooftop"],
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
    coverImage: "/images/guide/menton-old-town.png",
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
    relatedPlaces: ["halles-du-marche", "rampes-saint-michel", "cimetiere-vieux-chateau", "promenade-du-soleil", "plage-sablettes"],
    relatedArticles: ["local-food-menton", "halles-du-marche-menton", "quiet-evening-in-menton", "best-photo-spots-menton"],
    relatedApartments: seaViewApartments,
    sections: [
      {
        heading: t("A short story of the old town", "Petite histoire de la vieille ville", "Breve storia del centro storico", "Коротка історія старого міста"),
        body: [
          t("Menton's old town is compact, colourful and easy to explore on foot: Baroque churches, stepped streets, small shops and plenty of lemon-themed souvenirs.", "La vieille ville de Menton est compacte, coloree et facile a decouvrir a pied: eglises baroques, rues en escaliers, petites boutiques et souvenirs autour du citron.", "Il centro storico di Mentone e compatto, colorato e facile da esplorare a piedi: chiese barocche, vicoli a scalini, piccoli negozi e molti souvenir al limone.", "Старе місто Ментона компактне, кольорове й зручне для прогулянок: барокові церкви, сходові вулички, маленькі крамниці та багато сувенірів на лимонну тему."),
          t("The historic centre grew on a hill above the sea, once protected by walls and dominated by Basilica Saint-Michel-Archange. Its Baroque bell tower still acts as one of Menton's landmarks, reached from the seafront via Les Rampes Saint-Michel.", "Le centre historique s'est developpe sur une colline au-dessus de la mer, autrefois protege par des remparts et domine par la basilique Saint-Michel-Archange. Son clocher baroque reste l'un des reperes de Menton, accessible depuis le front de mer par les Rampes Saint-Michel.", "Il nucleo storico e cresciuto su una collina sopra il mare, un tempo protetto da mura e dominato dalla Basilica Saint-Michel-Archange. Il suo campanile barocco resta uno dei simboli di Mentone, raggiungibile dal lungomare attraverso Les Rampes Saint-Michel.", "Історичний центр виріс на пагорбі над морем, колись захищений мурами й домінований Basilica Saint-Michel-Archange. Її барокова дзвіниця досі є одним із символів Ментона, до якого ведуть сходи Les Rampes Saint-Michel від набережної."),
          t("Today the old town is a lived-in neighbourhood of narrow lanes, tall facades and shaded passages running down towards the market and the sea.", "Aujourd'hui, la vieille ville est un quartier habite, avec ruelles etroites, hautes facades et passages ombrages qui descendent vers le marche et la mer.", "Oggi il centro storico e un quartiere vissuto, fatto di vicoli stretti, facciate alte e passaggi ombreggiati che scendono verso il mercato e il mare.", "Сьогодні старе місто - це живий квартал із вузькими провулками, високими фасадами й затіненими проходами, що спускаються до ринку та моря."),
        ],
        relatedPlaceIds: ["rampes-saint-michel"],
      },
      {
        heading: t("What to see as you walk", "Que voir en marchant", "Cosa vedere camminando", "Що побачити під час прогулянки"),
        body: [
          t("A simple route starts from the seafront, climbs Les Rampes Saint-Michel, pauses on the basilica square, then continues higher to the Cimetière du Vieux Château.", "Un itineraire simple part du front de mer, monte par les Rampes Saint-Michel, marque une pause sur la place de la basilique, puis continue plus haut vers le Cimetiere du Vieux Chateau.", "Un percorso semplice parte dal lungomare, sale per Les Rampes Saint-Michel, si ferma sulla piazza della basilica e poi continua verso il Cimetière du Vieux Château.", "Простий маршрут починається від набережної, піднімається Les Rampes Saint-Michel, робить паузу на площі біля базиліки, а потім веде вище до Cimetière du Vieux Château."),
          t("On the square, notice the patterned pebble pavement, the church facade and the neighbouring Chapelle des Pénitents Blancs. If the basilica is open, step inside for its Baroque interior and quiet, subdued light.", "Sur la place, observez le pavement de galets, la facade de l'eglise et la Chapelle des Penitents Blancs voisine. Si la basilique est ouverte, entrez pour voir son interieur baroque et sa lumiere calme.", "Sulla piazza, osserva il pavimento in ciottoli, la facciata della chiesa e la vicina Chapelle des Pénitents Blancs. Se la basilica e aperta, entra per il suo interno barocco e la luce raccolta.", "На площі зверніть увагу на візерункове мощення з гальки, фасад церкви та сусідню Chapelle des Pénitents Blancs. Якщо базиліка відкрита, зайдіть усередину заради барокового інтер'єру й тихого приглушеного світла."),
          t("From the cemetery above, views open over the harbour, the curve of the bay, Cap Martin and the hills near the Italian border. On the way down, wander through side streets for arches, old walls, laundry on balconies, potted plants and everyday life at doorways.", "Depuis le cimetiere au-dessus, la vue s'ouvre sur le port, la courbe de la baie, Cap Martin et les collines pres de la frontiere italienne. En redescendant, perdez-vous dans les ruelles pour les arches, les vieux murs, le linge aux balcons, les plantes en pot et la vie quotidienne aux portes.", "Dal cimitero in alto si aprono viste sul porto, la curva della baia, Cap Martin e le colline vicino al confine italiano. Scendendo, devia nei vicoli laterali per archi, vecchie mura, panni sui balconi, piante in vaso e vita quotidiana sulle soglie.", "З кладовища нагорі відкриваються види на порт, вигин бухти, Cap Martin і пагорби біля італійського кордону. Спускаючись, звертайте в бічні вулички: там арки, старі мури, білизна на балконах, вазони й повсякденне життя біля дверей."),
        ],
        relatedPlaceIds: ["rampes-saint-michel", "cimetiere-vieux-chateau"],
      },
      {
        heading: t("Food stops and emblematic places", "Pauses gourmandes et adresses emblematiques", "Soste golose e luoghi simbolici", "Їжа й знакові місця"),
        body: [
          t("The old town is one of the easiest areas to try Menton specialities casually. Around Halles du Marché and the nearby streets, look for bakeries and snack counters selling pichade, pissaladière and barbajuans to eat between sights.", "La vieille ville est l'un des secteurs les plus simples pour gouter les specialites de Menton sans ceremonie. Autour des Halles du Marche et dans les rues voisines, cherchez boulangeries et comptoirs avec pichade, pissaladiere et barbajuans a manger entre deux visites.", "Il centro storico e una delle zone piu facili per assaggiare specialita mentonasche in modo informale. Intorno alle Halles du Marché e nelle vie vicine, cerca panetterie e banchi con pichade, pissaladiere e barbajuans da mangiare tra una tappa e l'altra.", "Старе місто - одне з найзручніших місць, щоб без формальностей спробувати ментонські спеціалітети. Біля Halles du Marché та на сусідніх вулицях шукайте пекарні й прилавки з pichade, pissaladière та barbajuans для перекусу між прогулянками."),
          t("For something sweet, look for lemon tarts, cakes and sometimes fougasse mentonnaise, a soft festive bread with candied fruit and orange blossom. Jam-makers such as Maison Herbin, close to the old town, specialise in citrus marmalades and traditional recipes; check current opening before planning around a specific shop.", "Pour le sucre, cherchez tartes au citron, gateaux et parfois fougasse mentonnaise, un pain doux de fete aux fruits confits et a la fleur d'oranger. Des confituriers comme Maison Herbin, pres de la vieille ville, travaillent les marmelades d'agrumes et les recettes traditionnelles; verifiez les horaires actuels avant d'organiser votre parcours autour d'une adresse precise.", "Per il dolce, cerca crostate al limone, torte e a volte fougasse mentonnaise, un pane morbido da festa con frutta candita e fiori d'arancio. Produttori come Maison Herbin, vicino al centro storico, sono specializzati in marmellate di agrumi e ricette tradizionali; controlla gli orari aggiornati prima di pianificare una visita a un negozio preciso.", "На солодке шукайте лимонні тарти, тістечка й інколи fougasse mentonnaise - м'який святковий хліб із цукатами та ароматом помаранчевого цвіту. Виробники джемів на кшталт Maison Herbin біля старого міста спеціалізуються на цитрусових мармеладах і традиційних рецептах; перед плануванням візиту до конкретної крамниці перевірте актуальний графік."),
          t("Pedestrian streets also have cafes and small restaurants where you can stop for coffee, a glass of wine or a simple lunch between walks.", "Les rues pietonnes comptent aussi des cafes et petits restaurants pour un cafe, un verre de vin ou un dejeuner simple entre deux promenades.", "Le vie pedonali hanno anche caffe e piccoli ristoranti dove fermarsi per un caffe, un bicchiere di vino o un pranzo semplice tra una passeggiata e l'altra.", "На пішохідних вулицях також є кав'ярні та невеликі ресторани, де можна зупинитися на каву, келих вина або простий обід між прогулянками."),
        ],
        relatedPlaceIds: ["halles-du-marche"],
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
        relatedPlaceIds: ["plage-sablettes", "promenade-du-soleil"],
      },
    ],
    practicalTips: [
      t("Wear comfortable shoes: the old town has steps, cobbles and short uphill sections.", "Portez des chaussures confortables: la vieille ville a des marches, des paves et de courtes montees.", "Indossa scarpe comode: il centro storico ha scale, ciottoli e brevi tratti in salita.", "Візьміть зручне взуття: у старому місті є сходи, бруківка й короткі підйоми."),
      t("Visit in the morning or late afternoon in summer for easier light and less heat.", "En ete, venez le matin ou en fin d'apres-midi pour une lumiere plus douce et moins de chaleur.", "In estate, visita al mattino o nel tardo pomeriggio per luce migliore e meno caldo.", "Улітку приходьте зранку або ближче до вечора: світло м'якше, а спеки менше."),
      t("Combine the walk with Halles du Marché, Plage des Sablettes or a slow evening on Promenade du Soleil.", "Combinez la balade avec les Halles du Marche, Plage des Sablettes ou une soiree lente sur la Promenade du Soleil.", "Abbina la passeggiata alle Halles du Marché, a Plage des Sablettes o a una serata lenta sulla Promenade du Soleil.", "Поєднайте прогулянку з Halles du Marché, Plage des Sablettes або повільним вечором на Promenade du Soleil."),
    ],
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

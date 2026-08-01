import type { Locale } from "@/i18n/locales";

type LocalizedText = Record<Locale, string>;

export type TravelToolSlug =
  | "weather"
  | "sea"
  | "transport"
  | "driving"
  | "beaches"
  | "local-services"
  | "safety"
  | "flights"
  | "radio"
  | "currency";

export type TravelToolCategorySlug =
  | "conditions"
  | "getting-around"
  | "on-the-ground"
  | "planning";

export type TravelToolState = "live" | "hybrid" | "seasonal" | "external" | "static" | "unavailable";
export type TravelToolMetricStatus = "live" | "delayed" | "seasonal" | "external" | "unavailable";

export type TravelToolSource = {
  id: string;
  providerLabel: string;
  attribution: string;
  sourceUrl: string;
  cacheDuration: string;
};

export type TravelTool = {
  slug: TravelToolSlug;
  title: LocalizedText;
  seoTitle: LocalizedText;
  metaDescription: LocalizedText;
  excerpt: LocalizedText;
  intro: LocalizedText;
  compactDescription: LocalizedText;
  valueProposition: LocalizedText;
  statusNote: LocalizedText;
  state: TravelToolState;
  category: TravelToolCategorySlug;
  sourceIds: string[];
  relatedGuideSlugs: string[];
};

export type TravelToolCategory = {
  slug: TravelToolCategorySlug;
  title: LocalizedText;
  description: LocalizedText;
  toolSlugs: TravelToolSlug[];
};

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });

export const travelToolSectionCopy: Record<
  Locale,
  {
    title: string;
    seoTitle: string;
    description: string;
    intro: string;
    rightNowTitle: string;
    rightNowDescription: string;
    moneyTimeTitle: string;
    moneyTimeNote: string;
    categoryTitle: string;
    categoryDescription: string;
    source: string;
    fullTool: string;
    compactView: string;
    guidePanelTitle: string;
    guidePanelText: string;
    live: string;
    delayed: string;
    seasonal: string;
    external: string;
    unavailable: string;
  }
> = {
  en: {
    title: "Travel Tools",
    seoTitle: "Travel Tools | Live information for Menton and the Riviera",
    description: "Live information and practical tools for staying in Menton and travelling around the French and Italian Riviera.",
    intro: "Check the conditions that matter before you leave the apartment: weather, sea, transport, flights, safety, radio and practical services.",
    rightNowTitle: "Right now in Menton",
    rightNowDescription: "A compact live snapshot for weather, sea, UV, wind and air quality, with conservative fallbacks where the site should not pretend to know more than the source does.",
    moneyTimeTitle: "Money and time",
    moneyTimeNote: "Menton, Monaco, Nice, Ventimiglia and Sanremo share the same local time. Use the EUR reference rates for planning only.",
    categoryTitle: "Browse by travel task",
    categoryDescription: "Open the full tool when you need detail. On the index, keep the page fast and oriented around real trip decisions.",
    source: "Source",
    fullTool: "View full tool",
    compactView: "Open tool",
    guidePanelTitle: "Useful travel tools for this guide",
    guidePanelText: "Open the practical layer that best matches the plan on this page.",
    live: "Live",
    delayed: "Updated",
    seasonal: "Seasonal",
    external: "Official links",
    unavailable: "Unavailable",
  },
  fr: {
    title: "Outils voyage",
    seoTitle: "Outils voyage | Informations en direct pour Menton et la Riviera",
    description: "Informations en direct et outils pratiques pour sejourner a Menton et circuler sur la Riviera francaise et italienne.",
    intro: "Consultez les conditions utiles avant de sortir: meteo, mer, transports, vols, securite, radio et services pratiques.",
    rightNowTitle: "En ce moment a Menton",
    rightNowDescription: "Un apercu compact des conditions utiles, avec des valeurs live quand elles existent et des fallbacks honnetes ailleurs.",
    moneyTimeTitle: "Temps et monnaie",
    moneyTimeNote: "Menton, Monaco, Nice, Vintimille et Sanremo partagent la meme heure locale. Les taux EUR restent indicatifs.",
    categoryTitle: "Par besoin concret",
    categoryDescription: "Ouvrez l’outil complet seulement quand vous avez besoin du detail.",
    source: "Source",
    fullTool: "Ouvrir l’outil",
    compactView: "Voir",
    guidePanelTitle: "Outils utiles pour ce guide",
    guidePanelText: "Accedez directement a la couche pratique liee a cette page.",
    live: "En direct",
    delayed: "Mis a jour",
    seasonal: "Saisonnier",
    external: "Liens officiels",
    unavailable: "Indisponible",
  },
  it: {
    title: "Strumenti di viaggio",
    seoTitle: "Strumenti di viaggio | Informazioni utili per Mentone e la Riviera",
    description: "Informazioni live e strumenti pratici per soggiornare a Mentone e muoversi tra Riviera francese e italiana.",
    intro: "Controlla le condizioni utili prima di uscire: meteo, mare, trasporti, voli, sicurezza, radio e servizi pratici.",
    rightNowTitle: "Adesso a Mentone",
    rightNowDescription: "Panoramica rapida con dati live dove esistono e fallback prudenti dove non esiste un feed affidabile.",
    moneyTimeTitle: "Tempo e valuta",
    moneyTimeNote: "Mentone, Monaco, Nizza, Ventimiglia e Sanremo condividono lo stesso orario locale. I tassi EUR sono indicativi.",
    categoryTitle: "Per situazione reale",
    categoryDescription: "Apri lo strumento completo solo quando ti serve piu dettaglio.",
    source: "Fonte",
    fullTool: "Apri strumento",
    compactView: "Vedi",
    guidePanelTitle: "Strumenti utili per questa guida",
    guidePanelText: "Apri subito il livello pratico piu adatto a questa pagina.",
    live: "Live",
    delayed: "Aggiornato",
    seasonal: "Stagionale",
    external: "Link ufficiali",
    unavailable: "Non disponibile",
  },
  uk: {
    title: "Travel Tools",
    seoTitle: "Travel Tools | Практичні інструменти для Ментона та Ривʼєри",
    description: "Практичні інструменти та live-дані для перебування в Ментоні та поїздок Французькою й Італійською Ривʼєрою.",
    intro: "Тут зібрані корисні інструменти для поїздки: погода, море, транспорт, рейси, безпека, радіо та локальні сервіси.",
    rightNowTitle: "Зараз у Ментоні",
    rightNowDescription: "Короткий live-зріз з чесними джерелами та без вигаданих даних там, де джерело їх не дає.",
    moneyTimeTitle: "Час і валюта",
    moneyTimeNote: "Ментон, Монако, Ніцца, Вентімілья та Санремо живуть в одному часовому поясі. Курс EUR тут лише для орієнтиру.",
    categoryTitle: "За практичним сценарієм",
    categoryDescription: "Повний інструмент відкривайте лише тоді, коли потрібні деталі.",
    source: "Джерело",
    fullTool: "Відкрити інструмент",
    compactView: "Відкрити",
    guidePanelTitle: "Корисні інструменти для цього гайда",
    guidePanelText: "Швидкий доступ до практичного шару, який підходить саме до цього матеріалу.",
    live: "Наживо",
    delayed: "Оновлено",
    seasonal: "Сезонно",
    external: "Офіційні лінки",
    unavailable: "Недоступно",
  },
};

export const travelToolSources: TravelToolSource[] = [
  {
    id: "open-meteo-weather",
    providerLabel: "Open-Meteo weather",
    attribution: "Forecast and current weather for Menton.",
    sourceUrl: "https://open-meteo.com/en/docs",
    cacheDuration: "2h",
  },
  {
    id: "open-meteo-marine",
    providerLabel: "Open-Meteo marine",
    attribution: "Sea temperature and wave context.",
    sourceUrl: "https://open-meteo.com/en/docs/marine-weather-api",
    cacheDuration: "2h",
  },
  {
    id: "open-meteo-air-quality",
    providerLabel: "Open-Meteo air quality",
    attribution: "Air quality and UV context.",
    sourceUrl: "https://open-meteo.com/en/docs/air-quality-api",
    cacheDuration: "2h",
  },
  {
    id: "meteo-france",
    providerLabel: "Meteo-France",
    attribution: "Official severe-weather and wildfire vigilance.",
    sourceUrl: "https://vigilance.meteofrance.fr/en",
    cacheDuration: "Official source",
  },
  {
    id: "meteo-france-forest",
    providerLabel: "Meteo-France forest vigilance",
    attribution: "Official wildfire vigilance map.",
    sourceUrl: "https://meteofrance.com/meteo-des-forets",
    cacheDuration: "Official source",
  },
  {
    id: "zestbus",
    providerLabel: "Zest bus",
    attribution: "Local bus network serving Menton and nearby routes.",
    sourceUrl: "https://www.zestbus.fr/",
    cacheDuration: "Official links",
  },
  {
    id: "sncf-connect",
    providerLabel: "SNCF Connect",
    attribution: "Official French rail booking and timetable access.",
    sourceUrl: "https://www.sncf-connect.com/",
    cacheDuration: "Official links",
  },
  {
    id: "nice-airport",
    providerLabel: "Nice Airport",
    attribution: "Official arrivals and departures boards.",
    sourceUrl: "https://www.nice.aeroport.fr/",
    cacheDuration: "Live iframe/source",
  },
  {
    id: "bathing-water",
    providerLabel: "French bathing water portal",
    attribution: "Official bathing water quality portal.",
    sourceUrl: "https://baignades.sante.gouv.fr/baignades/editorial/en/accueil.html",
    cacheDuration: "Official source",
  },
  {
    id: "ecb-rates",
    providerLabel: "European Central Bank",
    attribution: "Daily euro reference rates.",
    sourceUrl: "https://www.ecb.europa.eu/stats/eurofxref/html/index.en.html",
    cacheDuration: "12h",
  },
  {
    id: "tourism-city",
    providerLabel: "Menton city / tourism references",
    attribution: "Taxi numbers and practical local service context.",
    sourceUrl: "https://www.menton.fr/Acces.html",
    cacheDuration: "Manual review",
  },
  {
    id: "radio",
    providerLabel: "Local radio sources",
    attribution: "Station metadata and audio stream links already used in the site.",
    sourceUrl: "https://azurmenton.com/en/guide/radio-stations-menton-riviera",
    cacheDuration: "Site content",
  },
];

export const travelToolCategories: TravelToolCategory[] = [
  {
    slug: "conditions",
    title: t("Weather, sea and safety", "Meteo, mer et securite", "Meteo, mare e sicurezza", "Погода, море та безпека"),
    description: t("Check the live conditions that affect beach, walking and day-trip plans.", "Verifier les conditions utiles pour la plage, les balades et les sorties.", "Controlla le condizioni che cambiano spiaggia, passeggiate e gite.", "Перевіряйте умови, що реально впливають на пляж, прогулянки та поїздки."),
    toolSlugs: ["weather", "sea", "beaches", "safety"],
  },
  {
    slug: "getting-around",
    title: t("Flights, transport and driving", "Vols, transports et voiture", "Voli, trasporti e auto", "Рейси, транспорт і авто"),
    description: t("Use the practical transport layer before committing to a route.", "Consultez la couche pratique avant de partir.", "Apri il livello pratico prima di scegliere il percorso.", "Практичний шар для дороги до Ментона та навколо нього."),
    toolSlugs: ["flights", "transport", "driving"],
  },
  {
    slug: "on-the-ground",
    title: t("Local services and radio", "Services locaux et radio", "Servizi locali e radio", "Локальні сервіси та радіо"),
    description: t("Useful when you already arrived and need fast local help or atmosphere.", "Utile une fois sur place pour les services rapides et l’ambiance locale.", "Utile una volta arrivato per servizi rapidi e atmosfera locale.", "Корисно вже на місці: таксі, туалети, аптеки, велосипеди, радіо."),
    toolSlugs: ["local-services", "radio"],
  },
  {
    slug: "planning",
    title: t("Planning basics", "Bases de planification", "Basi di pianificazione", "Базові речі для планування"),
    description: t("Keep money and time simple while travelling between France, Monaco and Italy.", "Simplifier les bases pratiques entre France, Monaco et Italie.", "Semplifica le basi pratiche tra Francia, Monaco e Italia.", "Тримайте під рукою прості базові речі для Франції, Монако та Італії."),
    toolSlugs: ["currency"],
  },
];

export const travelTools: TravelTool[] = [
  {
    slug: "weather",
    title: t("Weather", "Meteo", "Meteo", "Погода"),
    seoTitle: t("Menton weather tool", "Meteo Menton", "Meteo Mentone", "Погода в Ментоні"),
    metaDescription: t("Current weather, wind, humidity, UV and forecast for Menton.", "Temperature, vent, humidite et UV a Menton.", "Temperatura, vento, umidita e UV a Mentone.", "Поточна погода, вітер, вологість, UV і прогноз для Ментона."),
    excerpt: t("Current weather, wind and UV for Menton.", "Meteo et UV a Menton.", "Meteo e UV a Mentone.", "Погода та UV у Ментоні."),
    intro: t("Current weather, UV and a 16-day planning outlook for Menton.", "Conditions meteo, UV et tendance a 16 jours pour Menton.", "Condizioni meteo, UV e prospettiva a 16 giorni per Mentone.", "Поточна погода, UV і 16-денний planning outlook для Ментона."),
    compactDescription: t("Temperature, wind and UV before you head out.", "Temperature, vent et UV avant de sortir.", "Temperatura, vento e UV prima di uscire.", "Температура, вітер і UV перед виходом."),
    valueProposition: t("Useful for beach mornings, walks, transport timing and heat planning.", "Utile pour la plage, les balades et les fortes chaleurs.", "Utile per spiaggia, passeggiate e giornate calde.", "Корисно для пляжу, прогулянок і спеки."),
    statusNote: t("Live values come from Open-Meteo and are cached conservatively.", "Valeurs live via Open-Meteo avec cache prudent.", "Valori live via Open-Meteo con cache prudente.", "Live-дані йдуть з Open-Meteo з консервативним кешем."),
    state: "live",
    category: "conditions",
    sourceIds: ["open-meteo-weather", "open-meteo-air-quality"],
    relatedGuideSlugs: ["best-beaches-in-menton", "menton-without-a-car", "water-sports-in-menton-paddleboard-kayak-sailing-and-snorkelling"],
  },
  {
    slug: "sea",
    title: t("Sea", "Mer", "Mare", "Море"),
    seoTitle: t("Menton sea conditions", "Conditions de mer a Menton", "Condizioni del mare a Mentone", "Морські умови в Ментоні"),
    metaDescription: t("Sea temperature, waves and marine conditions for Menton.", "Temperature de l’eau et conditions marines a Menton.", "Temperatura dell’acqua e condizioni marine a Mentone.", "Температура моря та морські умови в Ментоні."),
    excerpt: t("Sea temperature and marine context.", "Temperature de l’eau et houle.", "Temperatura dell’acqua e onde.", "Температура моря та хвилі."),
    intro: t("Marine conditions matter for swimming, paddleboarding and snorkeling.", "Les conditions marines comptent pour la baignade et les activites nautiques.", "Le condizioni marine contano per bagno e attivita nautiche.", "Морські умови важливі для купання й водних активностей."),
    compactDescription: t("Sea temperature, wave height and marine notes.", "Temperature de l’eau et etat de la mer.", "Temperatura dell’acqua e stato del mare.", "Температура моря та висота хвиль."),
    valueProposition: t("Use this before beach days and water-sports plans.", "A verifier avant une journee plage ou mer.", "Da aprire prima di una giornata di mare.", "Відкривайте перед пляжем і водними активностями."),
    statusNote: t("Reuses the site’s existing marine conditions block.", "Reutilise le bloc marin deja present sur le site.", "Riusa il blocco marine conditions gia presente nel sito.", "Повторно використовує наявний морський віджет сайту."),
    state: "live",
    category: "conditions",
    sourceIds: ["open-meteo-marine"],
    relatedGuideSlugs: ["best-beaches-in-menton", "water-sports-in-menton-paddleboard-kayak-sailing-and-snorkelling"],
  },
  {
    slug: "transport",
    title: t("Public transport", "Transports publics", "Trasporti pubblici", "Громадський транспорт"),
    seoTitle: t("Public transport from Menton", "Transports publics depuis Menton", "Trasporti pubblici da Mentone", "Громадський транспорт з Ментона"),
    metaDescription: t("Practical train and bus links from Menton to Monaco, Nice, Ventimiglia and Sanremo.", "Liens pratiques train et bus depuis Menton.", "Collegamenti pratici treno e bus da Mentone.", "Практичні маршрути потягом і автобусом з Ментона."),
    excerpt: t("Official transport links for common Riviera routes.", "Liens officiels pour les trajets courants.", "Link ufficiali per i tragitti piu utili.", "Офіційні транспортні лінки для типових маршрутів."),
    intro: t("Use official links first, then the guide text as planning context.", "Commencez par les liens officiels, puis utilisez les guides comme contexte.", "Prima i link ufficiali, poi le guide come contesto.", "Спершу офіційні лінки, потім гайд як контекст."),
    compactDescription: t("Trains, buses and practical route shortcuts.", "Trains, bus et raccourcis utiles.", "Treni, bus e scorciatoie utili.", "Потяги, автобуси та швидкі корисні лінки."),
    valueProposition: t("Open it for Nice airport, Monaco, Italy and car-free stay planning.", "Utile pour l’aeroport, Monaco, l’Italie et les sejours sans voiture.", "Utile per aeroporto, Monaco, Italia e soggiorni senza auto.", "Корисно для аеропорту, Монако, Італії та поїздок без авто."),
    statusNote: t("Official route links, not a fake timetable clone.", "Liens officiels, pas un faux clone d’horaires.", "Link ufficiali, non una finta copia degli orari.", "Офіційні лінки, а не фейкова копія розкладу."),
    state: "hybrid",
    category: "getting-around",
    sourceIds: ["zestbus", "sncf-connect"],
    relatedGuideSlugs: ["public-transport-in-menton", "how-to-get-to-menton-from-nice-airport", "menton-without-a-car"],
  },
  {
    slug: "driving",
    title: t("Driving", "Voiture", "Guida", "Авто"),
    seoTitle: t("Driving, parking and EV in Menton", "Voiture, parking et recharge a Menton", "Auto, parcheggi e ricarica a Mentone", "Авто, паркінги та зарядки в Ментоні"),
    metaDescription: t("Practical parking, EV charging and driving links for Menton.", "Parkings, recharge EV et conduite a Menton.", "Parcheggi, ricarica EV e guida a Mentone.", "Практичні паркінги, EV-зарядки та авто-лінки для Ментона."),
    excerpt: t("Parking, EV and traffic context.", "Parking, recharge et trafic.", "Parcheggi, ricarica e traffico.", "Паркінги, зарядки й трафік."),
    intro: t("Keep driving information practical and conservative.", "Une couche pratique et prudente pour la voiture.", "Livello pratico e prudente per chi guida.", "Практичний і консервативний шар для тих, хто їде машиною."),
    compactDescription: t("Parking fallback, EV points and traffic links.", "Parkings de secours, EV et trafic.", "Parcheggi di supporto, EV e traffico.", "Публічні паркінги, EV-точки й трафік."),
    valueProposition: t("Separate private guest parking from public fallback parking.", "Distingue le parking invite des parkings publics.", "Separa il parcheggio ospiti da quello pubblico.", "Відділяє приватний гостьовий паркінг від публічного fallback."),
    statusNote: t("No fake live parking availability is invented.", "Aucune fausse disponibilite live n’est inventee.", "Nessuna falsa disponibilita live viene inventata.", "Ніякої вигаданої live-доступності паркінгів."),
    state: "external",
    category: "getting-around",
    sourceIds: ["tourism-city"],
    relatedGuideSlugs: ["electric-car-charging-menton", "where-to-stay-in-menton"],
  },
  {
    slug: "beaches",
    title: t("Beaches", "Plages", "Spiagge", "Пляжі"),
    seoTitle: t("Beach conditions and bathing water near Menton", "Plages et qualite de l’eau a Menton", "Spiagge e qualita dell’acqua a Mentone", "Пляжі та якість води біля Ментона"),
    metaDescription: t("Official bathing water quality and beach-condition context for Menton.", "Qualite de l’eau et contexte plage a Menton.", "Qualita dell’acqua e contesto spiagge a Mentone.", "Офіційна якість води та контекст пляжів у Ментоні."),
    excerpt: t("Beach safety and bathing-water context.", "Securite plage et qualite de l’eau.", "Sicurezza spiagge e qualita dell’acqua.", "Безпека пляжів та якість води."),
    intro: t("Prefer official bathing-water data and beach flags over guesswork.", "Mieux vaut les sources officielles que des suppositions.", "Meglio fonti ufficiali che supposizioni.", "Краще офіційні джерела, ніж припущення."),
    compactDescription: t("Water quality and beach-condition links.", "Qualite de l’eau et liens utiles.", "Qualita dell’acqua e link utili.", "Якість води та корисні пляжні лінки."),
    valueProposition: t("Useful before family beach days and swimming plans.", "Utile pour les journees plage en famille.", "Utile per giornate al mare e bagni.", "Корисно перед сімейним пляжем і купанням."),
    statusNote: t("Official water-quality sources only; no fake jellyfish certainty.", "Sources officielles seulement; pas de fausse certitude sur les meduses.", "Solo fonti ufficiali; nessuna falsa certezza sulle meduse.", "Лише офіційні джерела; без фальшивої певності щодо медуз."),
    state: "hybrid",
    category: "conditions",
    sourceIds: ["bathing-water", "open-meteo-marine"],
    relatedGuideSlugs: ["best-beaches-in-menton", "menton-with-kids-family-guide"],
  },
  {
    slug: "local-services",
    title: t("Local services", "Services locaux", "Servizi locali", "Локальні сервіси"),
    seoTitle: t("Local services in Menton", "Services locaux a Menton", "Servizi locali a Mentone", "Локальні сервіси в Ментоні"),
    metaDescription: t("Taxi numbers, public toilets, pharmacies and bike options in Menton.", "Taxis, toilettes publiques, pharmacies et velo a Menton.", "Taxi, bagni pubblici, farmacie e bici a Mentone.", "Таксі, туалети, аптеки та велосипеди в Ментоні."),
    excerpt: t("Taxi, toilets, pharmacies and bikes.", "Taxis, toilettes, pharmacies et velo.", "Taxi, bagni, farmacie e bici.", "Таксі, туалети, аптеки та велосипеди."),
    intro: t("A practical layer for the first hours after arrival and everyday needs in town.", "Une couche pratique pour l’arrivee et les besoins du quotidien.", "Uno strato pratico per arrivo e bisogni quotidiani.", "Практичний шар на перші години після приїзду й щоденні потреби."),
    compactDescription: t("Taxi, toilets, pharmacies and bike options.", "Taxis, toilettes, pharmacies et velo.", "Taxi, bagni, farmacie e bici.", "Таксі, туалети, аптеки й велосипеди."),
    valueProposition: t("Fast access to the practical services guests ask for most.", "Acces rapide aux services les plus utiles aux voyageurs.", "Accesso rapido ai servizi che servono davvero ai viaggiatori.", "Швидкий доступ до сервісів, які найчастіше потрібні гостям."),
    statusNote: t("Curated from verified place data and official practical references.", "Curated depuis les lieux verifies et references pratiques officielles.", "Basato su luoghi verificati e riferimenti pratici ufficiali.", "Зібрано з перевірених місць та офіційних практичних джерел."),
    state: "external",
    category: "on-the-ground",
    sourceIds: ["tourism-city"],
    relatedGuideSlugs: ["public-toilets-menton", "menton-without-a-car", "how-to-get-to-menton-from-nice-airport"],
  },
  {
    slug: "safety",
    title: t("Safety", "Securite", "Sicurezza", "Безпека"),
    seoTitle: t("Safety and emergency information for Menton", "Securite et urgences a Menton", "Sicurezza ed emergenze a Mentone", "Безпека й екстрені служби в Ментоні"),
    metaDescription: t("Emergency numbers, severe-weather warnings and wildfire vigilance for the Riviera.", "Numeros d’urgence et vigilances officielles.", "Numeri di emergenza e allerte ufficiali.", "Номери екстрених служб та офіційні попередження."),
    excerpt: t("Emergency numbers and official warnings.", "Urgences et alertes officielles.", "Emergenze e allerte ufficiali.", "Екстрені номери та офіційні попередження."),
    intro: t("Safety information should stay official, compact and easy to reach.", "Les infos de securite doivent rester officielles et simples.", "Le informazioni di sicurezza devono restare ufficiali e semplici.", "Інформація про безпеку має бути офіційною, короткою і доступною."),
    compactDescription: t("Emergency numbers and official alerts.", "Urgences et alertes.", "Emergenze e allerte.", "Екстрені номери та попередження."),
    valueProposition: t("Use this before hikes, windy beach days and longer drives.", "A verifier avant randonnees, plage ventee ou long trajet.", "Da aprire prima di escursioni, giornate ventose o lunghi spostamenti.", "Відкривайте перед походами, вітряним морем чи довшими поїздками."),
    statusNote: t("Official warning pages only, not site-generated risk scores.", "Seulement les pages officielles, pas de score invente par le site.", "Solo pagine ufficiali, non punteggi inventati dal sito.", "Лише офіційні сторінки, без вигаданих сайтом risk score."),
    state: "seasonal",
    category: "conditions",
    sourceIds: ["meteo-france", "meteo-france-forest"],
    relatedGuideSlugs: ["water-sports-in-menton-paddleboard-kayak-sailing-and-snorkelling", "menton-with-kids-family-guide"],
  },
  {
    slug: "flights",
    title: t("Flights", "Vols", "Voli", "Рейси"),
    seoTitle: t("Nice Airport live boards and arrival planning", "Tableaux aeroport Nice et arrivee", "Tabelloni Nizza aeroporto e arrivo", "Табло Ніцца аеропорт і планування прильоту"),
    metaDescription: t("Nice Airport arrivals and departures plus practical Riviera arrival links.", "Arrivees/departs Nice Airport et liens pratiques.", "Arrivi/partenze Nizza Aeroporto e link pratici.", "Табло Ніцца аеропорт та практичні лінки для прильоту на Ривʼєру."),
    excerpt: t("Nice Airport arrivals, departures and access context.", "Arrivees, departs et acces aeroport.", "Arrivi, partenze e accesso aeroporto.", "Прильоти, вильоти й доступ з аеропорту."),
    intro: t("Reuse the live airport board already present on the site and connect it to arrival planning.", "Reutilise le tableau aeroport deja present sur le site.", "Riusa il tabellone aeroporto gia presente nel sito.", "Повторно використовує наявне на сайті live-табло аеропорту."),
    compactDescription: t("Airport board plus arrival shortcuts.", "Tableau aeroport et raccourcis d’arrivee.", "Tabellone aeroporto e scorciatoie d’arrivo.", "Табло аеропорту та короткі шляхи прибуття."),
    valueProposition: t("Useful before train, bus, taxi or transfer decisions from Nice Airport.", "Utile avant train, bus, taxi ou transfer depuis Nice.", "Utile prima di treno, bus, taxi o transfer da Nizza.", "Корисно перед потягом, автобусом, таксі чи трансфером з Ніцци."),
    statusNote: t("Reuses the existing airport board component instead of cloning a new one.", "Reutilise le composant existant plutot que d’en recreer un.", "Riusa il componente esistente invece di ricrearlo.", "Повторно використовує існуючий віджет, а не дублює його."),
    state: "live",
    category: "getting-around",
    sourceIds: ["nice-airport"],
    relatedGuideSlugs: ["how-to-get-to-menton-from-nice-airport", "airports-near-menton"],
  },
  {
    slug: "radio",
    title: t("Local radio", "Radio locale", "Radio locali", "Локальне радіо"),
    seoTitle: t("Local radio in Menton and the Riviera", "Radio locale a Menton et sur la Riviera", "Radio locali a Mentone e Riviera", "Локальне радіо Ментона та Ривʼєри"),
    metaDescription: t("Listen to local and Riviera radio stations already curated by Azur Menton.", "Ecouter les radios locales deja selectionnees.", "Ascolta le radio locali gia curate dal sito.", "Слухайте локальні радіостанції, вже зібрані на сайті."),
    excerpt: t("Embedded local radio stations.", "Stations locales integrees.", "Radio locali integrate.", "Вбудовані локальні радіостанції."),
    intro: t("Keep the existing radio player system and station cards in one service page.", "Conserver le systeme radio existant dans une page de service.", "Conserva il sistema radio esistente in una pagina di servizio.", "Зберігає існуючий радіоплеєр і картки станцій в окремому сервісному шарі."),
    compactDescription: t("Play local stations and see the station mix.", "Ecouter les stations locales.", "Ascolta le stazioni locali.", "Слухайте локальні станції."),
    valueProposition: t("Useful in the apartment, on the beach or while driving along the coast.", "Utile a l’appartement, a la plage ou en voiture.", "Utile in appartamento, in spiaggia o in auto.", "Корисно в апартаментах, на пляжі чи в дорозі."),
    statusNote: t("Reuses the existing local-radio block already shipped on the site.", "Reutilise le bloc radio existant du site.", "Riusa il blocco radio gia presente nel sito.", "Повторно використовує наявний на сайті радіоблок."),
    state: "live",
    category: "on-the-ground",
    sourceIds: ["radio"],
    relatedGuideSlugs: ["radio-stations-menton-riviera"],
  },
  {
    slug: "currency",
    title: t("Currency", "Monnaie", "Valuta", "Валюта"),
    seoTitle: t("EUR conversion for Menton and the Riviera", "Conversion EUR pour Menton", "Conversione EUR per Mentone", "Конвертація EUR для Ментона"),
    metaDescription: t("Reference EUR conversion for GBP, USD, CHF and UAH while travelling to Menton.", "Conversion EUR de reference pour GBP, USD, CHF et UAH.", "Conversione EUR di riferimento per GBP, USD, CHF e UAH.", "Орієнтовний курс EUR до GBP, USD, CHF та UAH для поїздки в Ментон."),
    excerpt: t("Reference-rate EUR conversion.", "Conversion EUR de reference.", "Conversione EUR di riferimento.", "Орієнтовна конвертація EUR."),
    intro: t("Keep currency simple: France, Monaco and Italy use the euro.", "Faire simple: France, Monaco et Italie utilisent l’euro.", "Tieni la valuta semplice: Francia, Monaco e Italia usano l’euro.", "Все просто: Франція, Монако та Італія використовують євро."),
    compactDescription: t("EUR planning rates for common visitor currencies.", "Taux EUR pour devises courantes.", "Tassi EUR per valute comuni.", "Планові курси EUR для типових валют гостей."),
    valueProposition: t("Useful for UK, Swiss, US and Ukrainian guests planning costs.", "Utile pour les voyageurs UK, Suisse, USA et Ukraine.", "Utile per ospiti UK, Svizzera, USA e Ucraina.", "Корисно для гостей з Британії, Швейцарії, США та України."),
    statusNote: t("Uses ECB reference rates, not card-processor promises.", "Utilise les taux BCE, pas les promesses d’une carte.", "Usa i tassi BCE, non promesse del circuito carta.", "Використовує довідкові курси ECB, а не обіцянки банківської картки."),
    state: "live",
    category: "planning",
    sourceIds: ["ecb-rates"],
    relatedGuideSlugs: ["where-to-stay-in-menton", "how-to-get-to-menton-from-nice-airport"],
  },
];

export const travelToolsAuditInventory = {
  reusedAsIs: ["WeatherWidget", "AirportLiveBoard", "LocalRadioBlock", "MarineConditionsBlock"],
  refactoredDataHelpers: ["src/lib/weather.ts"],
  missingLiveIntegrationsHandledAsOfficialLinks: [
    "beach flags",
    "jellyfish reports",
    "drinking fountains",
    "traffic realtime",
    "parking live availability",
  ],
} as const;

const toolMap = new Map(travelTools.map((tool) => [tool.slug, tool]));
const sourceMap = new Map(travelToolSources.map((source) => [source.id, source]));

const travelToolGuideMap: Partial<Record<string, TravelToolSlug[]>> = {
  "how-to-get-to-menton-from-nice-airport": ["flights", "transport", "local-services", "currency"],
  "public-transport-in-menton": ["transport", "flights", "local-services"],
  "best-beaches-in-menton": ["weather", "sea", "beaches", "safety"],
  "water-sports-in-menton-paddleboard-kayak-sailing-and-snorkelling": ["weather", "sea", "beaches", "safety"],
  "menton-without-a-car": ["transport", "local-services", "weather"],
  "menton-with-kids-family-guide": ["beaches", "weather", "safety", "local-services"],
  "electric-car-charging-menton": ["driving"],
  "public-toilets-menton": ["local-services"],
  "radio-stations-menton-riviera": ["radio"],
  "airports-near-menton": ["flights", "transport", "currency"],
};

export function localizeText(value: LocalizedText, locale: Locale) {
  return value[locale] ?? value.en;
}

export function getTravelTool(slug: TravelToolSlug) {
  return toolMap.get(slug) ?? null;
}

export function isTravelToolSlug(value: string): value is TravelToolSlug {
  return toolMap.has(value as TravelToolSlug);
}

export function getTravelToolsForGuide(guideSlug: string) {
  return (travelToolGuideMap[guideSlug] ?? []).map((slug) => getTravelTool(slug)).filter(Boolean) as TravelTool[];
}

export function getTravelToolSources(sourceIds: string[]) {
  return sourceIds.map((id) => sourceMap.get(id)).filter(Boolean) as TravelToolSource[];
}

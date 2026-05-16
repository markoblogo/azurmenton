import type { Locale } from "@/i18n/locales";

export type EventCategory =
  | "music"
  | "sport"
  | "art"
  | "family"
  | "prestige"
  | "food-local"
  | "maritime"
  | "theatre"
  | "exhibition"
  | "winter"
  | "seasonal";

export type FamilySuitability =
  | "recommended_with_children"
  | "good_with_older_children"
  | "mostly_adults"
  | "depends"
  | "not_family_focused";

export type SourceStatus = "verified" | "needs_verification" | "official_source_needed";

export type EventLocation = "Menton" | "Monaco" | "Nice" | "French Riviera" | "Italian Riviera";

export type LocalizedText = Record<Locale, string>;

export type RivieraEvent = {
  id: string;
  slug: string;
  title: string;
  location: EventLocation;
  monthGroup: string;
  dateLabel: string;
  startDate?: string;
  endDate?: string;
  expectedSeason?: string;
  category: EventCategory[];
  familySuitability: FamilySuitability;
  audience: string[];
  shortDescription: LocalizedText;
  whyShowOnSite: LocalizedText;
  bookingTip: LocalizedText;
  sourceStatus: SourceStatus;
  sourceUrl?: string;
  featured?: boolean;
  detailPage?: boolean;
  relatedApartmentKeys?: string[];
  media?: {
    image?: string;
    imageAlt?: LocalizedText;
    gallery?: string[];
    mediaEmbedUrl?: string;
    mediaSourceName?: string;
    mediaRightsNote?: string;
    mediaStatus?: "available" | "placeholder" | "needs_rights_check";
  };
};

// Admin note: review and add new Riviera events every 1-2 months.
// The public calendar should aim to cover at least the next 6 months.
// Confirmed events are hidden automatically after their end date; keep old data for future archive use.
const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });

export const eventCategoryLabels: Record<Locale, Record<EventCategory, string>> = {
  en: {
    music: "Music",
    sport: "Sport",
    art: "Art",
    family: "Family",
    prestige: "Prestige / luxury",
    "food-local": "Food & local culture",
    maritime: "Maritime",
    theatre: "Theatre / performance",
    exhibition: "Art & exhibitions",
    winter: "Winter",
    seasonal: "Seasonal",
  },
  fr: {
    music: "Musique",
    sport: "Sport",
    art: "Art",
    family: "Famille",
    prestige: "Prestige / luxe",
    "food-local": "Culture locale",
    maritime: "Maritime",
    theatre: "Theatre / spectacle",
    exhibition: "Expositions",
    winter: "Hiver",
    seasonal: "Saisonnier",
  },
  it: {
    music: "Musica",
    sport: "Sport",
    art: "Arte",
    family: "Famiglie",
    prestige: "Prestigio / lusso",
    "food-local": "Cultura locale",
    maritime: "Mare",
    theatre: "Teatro / spettacolo",
    exhibition: "Mostre",
    winter: "Inverno",
    seasonal: "Stagionale",
  },
  uk: {
    music: "Музика",
    sport: "Спорт",
    art: "Мистецтво",
    family: "Для сімей",
    prestige: "Престиж / люкс",
    "food-local": "Місцева культура",
    maritime: "Морські події",
    theatre: "Театр / вистави",
    exhibition: "Виставки",
    winter: "Зима",
    seasonal: "Сезонне",
  },
};

export const familySuitabilityLabels: Record<Locale, Record<FamilySuitability, string>> = {
  en: {
    recommended_with_children: "Recommended with children",
    good_with_older_children: "Good with older children",
    mostly_adults: "Mostly adults",
    depends: "Depends on age/interests",
    not_family_focused: "Not family-focused",
  },
  fr: {
    recommended_with_children: "Recommande avec enfants",
    good_with_older_children: "Bien avec enfants plus grands",
    mostly_adults: "Plutot adultes",
    depends: "Selon l'age et les interets",
    not_family_focused: "Pas centre famille",
  },
  it: {
    recommended_with_children: "Consigliato con bambini",
    good_with_older_children: "Adatto a ragazzi",
    mostly_adults: "Soprattutto adulti",
    depends: "Dipende da eta e interessi",
    not_family_focused: "Non pensato per famiglie",
  },
  uk: {
    recommended_with_children: "Рекомендовано з дітьми",
    good_with_older_children: "Добре зі старшими дітьми",
    mostly_adults: "Переважно для дорослих",
    depends: "Залежить від віку та інтересів",
    not_family_focused: "Не сімейний фокус",
  },
};

export const sourceStatusLabels: Record<Locale, Record<SourceStatus, string>> = {
  en: {
    verified: "Confirmed date",
    needs_verification: "Details to verify",
    official_source_needed: "Official dates pending",
  },
  fr: {
    verified: "Date confirmee",
    needs_verification: "Details a verifier",
    official_source_needed: "Dates officielles attendues",
  },
  it: {
    verified: "Data confermata",
    needs_verification: "Dettagli da verificare",
    official_source_needed: "Date ufficiali in attesa",
  },
  uk: {
    verified: "Дата підтверджена",
    needs_verification: "Деталі треба перевірити",
    official_source_needed: "Очікуються офіційні дати",
  },
};

export const monthFilterOptions = [
  "all",
  "2026-06",
  "2026-07",
  "2026-08",
  "2026-09",
  "2026-10",
  "2026-11",
  "2026-12",
  "2027-01",
  "winter-highlights",
] as const;

export type MonthFilter = (typeof monthFilterOptions)[number];

export const monthLabels: Record<Locale, Record<MonthFilter, string>> = {
  en: {
    all: "All",
    "2026-06": "June 2026",
    "2026-07": "July 2026",
    "2026-08": "August 2026",
    "2026-09": "September 2026",
    "2026-10": "October 2026",
    "2026-11": "November 2026",
    "2026-12": "December 2026",
    "2027-01": "January 2027",
    "winter-highlights": "Winter highlights",
  },
  fr: {
    all: "Tous",
    "2026-06": "Juin 2026",
    "2026-07": "Juillet 2026",
    "2026-08": "Aout 2026",
    "2026-09": "Septembre 2026",
    "2026-10": "Octobre 2026",
    "2026-11": "Novembre 2026",
    "2026-12": "Decembre 2026",
    "2027-01": "Janvier 2027",
    "winter-highlights": "Temps forts d'hiver",
  },
  it: {
    all: "Tutti",
    "2026-06": "Giugno 2026",
    "2026-07": "Luglio 2026",
    "2026-08": "Agosto 2026",
    "2026-09": "Settembre 2026",
    "2026-10": "Ottobre 2026",
    "2026-11": "Novembre 2026",
    "2026-12": "Dicembre 2026",
    "2027-01": "Gennaio 2027",
    "winter-highlights": "Eventi invernali",
  },
  uk: {
    all: "Усі",
    "2026-06": "Червень 2026",
    "2026-07": "Липень 2026",
    "2026-08": "Серпень 2026",
    "2026-09": "Вересень 2026",
    "2026-10": "Жовтень 2026",
    "2026-11": "Листопад 2026",
    "2026-12": "Грудень 2026",
    "2027-01": "Січень 2027",
    "winter-highlights": "Зимові події",
  },
};

const relatedAll = [
  "sea-view-balcony-studio",
  "panoramic-sea-view-studio",
  "beachside-family-apartment",
];

export const rivieraEvents: RivieraEvent[] = [
  {
    id: "monaco-grand-prix-2026",
    slug: "monaco-grand-prix",
    title: "Formula 1 Monaco Grand Prix",
    location: "Monaco",
    monthGroup: "2026-06",
    dateLabel: "4-7 June 2026",
    startDate: "2026-06-04",
    endDate: "2026-06-07",
    category: ["sport", "prestige"],
    familySuitability: "good_with_older_children",
    audience: ["sport fans", "couples", "prestige travellers", "older children"],
    shortDescription: t(
      "One of the most recognisable weekends on the Riviera calendar, bringing Formula 1 atmosphere to Monaco at the start of summer.",
      "L'un des week-ends les plus connus de la Riviera, avec l'atmosphere de la Formule 1 a Monaco au debut de l'ete.",
      "Uno dei weekend piu riconoscibili della Riviera, con l'atmosfera della Formula 1 a Monaco all'inizio dell'estate.",
      "Один із найвідоміших вікендів Рив'єри: атмосфера Формули-1 у Монако на початку літа.",
    ),
    whyShowOnSite: t(
      "A major reason to book early across the eastern Cote d'Azur.",
      "Une raison importante de reserver tot sur l'est de la Cote d'Azur.",
      "Un motivo importante per prenotare presto nella Costa Azzurra orientale.",
      "Важлива причина бронювати заздалегідь на східній Лазуровій Рив'єрі.",
    ),
    bookingTip: t(
      "Expect higher demand, traffic changes and busy trains. Confirm access and parking plans early.",
      "Prevoyez plus de demande, des changements de circulation et des trains charges. Verifiez acces et parking tot.",
      "Aspettati piu domanda, cambi di traffico e treni affollati. Verifica accesso e parcheggio in anticipo.",
      "Очікуйте високий попит, зміни руху і завантажені поїзди. Заздалегідь уточнюйте доступ і паркування.",
    ),
    sourceStatus: "needs_verification",
    featured: true,
    detailPage: true,
    relatedApartmentKeys: relatedAll,
  },
  {
    id: "monte-carlo-television-festival-2026",
    slug: "monte-carlo-television-festival",
    title: "Monte-Carlo Television Festival",
    location: "Monaco",
    monthGroup: "2026-06",
    dateLabel: "12-16 June 2026",
    startDate: "2026-06-12",
    endDate: "2026-06-16",
    category: ["prestige", "theatre"],
    familySuitability: "mostly_adults",
    audience: ["TV fans", "industry visitors", "celebrity/event travellers"],
    shortDescription: t(
      "A Monaco festival connected with television, premieres and international industry atmosphere.",
      "Un festival monegasque autour de la television, des avant-premieres et de l'ambiance internationale.",
      "Un festival di Monaco legato alla televisione, alle anteprime e all'atmosfera internazionale.",
      "Фестиваль у Монако, пов'язаний із телебаченням, прем'єрами та міжнародною атмосферою.",
    ),
    whyShowOnSite: t(
      "Useful for guests interested in Monaco's cultural and celebrity calendar.",
      "Utile pour les visiteurs interesses par le calendrier culturel et mondain de Monaco.",
      "Utile per chi segue il calendario culturale e mondano di Monaco.",
      "Корисно для гостей, яким цікавий культурний і світський календар Монако.",
    ),
    bookingTip: t(
      "Good for a Riviera city break with Menton as a calmer seaside base.",
      "Bien pour une escapade Riviera avec Menton comme base plus calme au bord de mer.",
      "Ideale per una pausa in Riviera con Mentone come base sul mare piu tranquilla.",
      "Добре для короткої поїздки Рив'єрою з Ментоном як спокійнішою морською базою.",
    ),
    sourceStatus: "needs_verification",
  },
  {
    id: "commedia-dell-arte-nice-2026",
    slug: "commedia-dell-arte-nice",
    title: "Festival International de Commedia Dell'Arte",
    location: "Nice",
    monthGroup: "2026-06",
    dateLabel: "5-18 June 2026",
    startDate: "2026-06-05",
    endDate: "2026-06-18",
    category: ["theatre", "art"],
    familySuitability: "depends",
    audience: ["culture travellers", "theatre lovers"],
    shortDescription: t(
      "A theatre and performance-focused festival in Nice.",
      "Un festival de theatre et de spectacle a Nice.",
      "Un festival di teatro e performance a Nizza.",
      "Театральний фестиваль у Ніцці.",
    ),
    whyShowOnSite: t(
      "Adds a cultural reason to visit beyond beaches and Monaco.",
      "Ajoute une raison culturelle de venir, au-dela des plages et de Monaco.",
      "Aggiunge un motivo culturale oltre alle spiagge e a Monaco.",
      "Додає культурну причину для подорожі, окрім пляжів і Монако.",
    ),
    bookingTip: t(
      "Combine a Menton seaside stay with a cultural evening or day trip to Nice.",
      "Associez un sejour a Menton avec une soiree culturelle ou une journee a Nice.",
      "Abbina il soggiorno al mare a Mentone con una serata o giornata culturale a Nizza.",
      "Поєднайте морський відпочинок у Ментоні з культурним вечором або днем у Ніцці.",
    ),
    sourceStatus: "needs_verification",
  },
  {
    id: "new-vision-nice-open-2026",
    slug: "new-vision-nice-open",
    title: "New Vision Nice Open",
    location: "Nice",
    monthGroup: "2026-06",
    dateLabel: "8-14 June 2026",
    startDate: "2026-06-08",
    endDate: "2026-06-14",
    category: ["sport"],
    familySuitability: "good_with_older_children",
    audience: ["tennis fans", "sports travellers"],
    shortDescription: t(
      "A tennis event in Nice during the early summer season.",
      "Un evenement de tennis a Nice au debut de l'ete.",
      "Un evento di tennis a Nizza all'inizio dell'estate.",
      "Тенісна подія в Ніцці на початку літнього сезону.",
    ),
    whyShowOnSite: t(
      "Gives sports-oriented guests another reason to plan a June stay.",
      "Une autre raison sportive de prevoir un sejour en juin.",
      "Un altro motivo sportivo per programmare un soggiorno a giugno.",
      "Ще одна спортивна причина планувати перебування у червні.",
    ),
    bookingTip: t(
      "Useful for guests who want a sports weekend without staying directly in Nice.",
      "Pratique pour un week-end sportif sans loger directement a Nice.",
      "Utile per un weekend sportivo senza soggiornare direttamente a Nizza.",
      "Зручно для спортивного вікенду без проживання безпосередньо в Ніцці.",
    ),
    sourceStatus: "needs_verification",
  },
  {
    id: "matisse-yves-saint-laurent-nice-2026",
    slug: "matisse-yves-saint-laurent-nice",
    title: "Henri Matisse - Yves Saint Laurent",
    location: "Nice",
    monthGroup: "2026-06",
    dateLabel: "17 June-28 September 2026",
    startDate: "2026-06-17",
    endDate: "2026-09-28",
    category: ["exhibition", "art"],
    familySuitability: "depends",
    audience: ["art lovers", "fashion travellers", "city-break guests"],
    shortDescription: t(
      "An art and fashion exhibition in Nice running through the summer and early autumn.",
      "Une exposition art et mode a Nice pendant l'ete et le debut d'automne.",
      "Una mostra di arte e moda a Nizza per l'estate e l'inizio dell'autunno.",
      "Виставка мистецтва і моди в Ніцці протягом літа та початку осені.",
    ),
    whyShowOnSite: t(
      "Strong appeal for guests interested in museums, style and cultural day trips.",
      "Interet fort pour les amateurs de musees, de style et d'excursions culturelles.",
      "Interessante per chi ama musei, stile e gite culturali.",
      "Цікаво для гостей, які люблять музеї, стиль і культурні поїздки.",
    ),
    bookingTip: t(
      "Works well for a Menton stay combined with a Nice cultural day.",
      "Se combine bien avec une journee culturelle a Nice depuis Menton.",
      "Si abbina bene a una giornata culturale a Nizza partendo da Mentone.",
      "Добре поєднується з культурним днем у Ніцці під час проживання в Ментоні.",
    ),
    sourceStatus: "needs_verification",
    featured: true,
  },
  {
    id: "jumping-international-monte-carlo-2026",
    slug: "jumping-international-monte-carlo",
    title: "Jumping International de Monte-Carlo",
    location: "Monaco",
    monthGroup: "2026-07",
    dateLabel: "2-4 July 2026",
    startDate: "2026-07-02",
    endDate: "2026-07-04",
    category: ["sport", "prestige"],
    familySuitability: "depends",
    audience: ["equestrian fans", "prestige travellers"],
    shortDescription: t(
      "A premium equestrian event in Monaco.",
      "Un evenement equestre premium a Monaco.",
      "Un evento equestre di prestigio a Monaco.",
      "Престижна кінна подія в Монако.",
    ),
    whyShowOnSite: t(
      "A refined Riviera weekend for visitors interested in sport and Monaco atmosphere.",
      "Un week-end Riviera raffine pour les amateurs de sport et d'ambiance monegasque.",
      "Un weekend raffinato in Riviera per chi ama sport e atmosfera monegasca.",
      "Вишуканий вікенд Рив'єри для гостей, яким цікаві спорт і атмосфера Монако.",
    ),
    bookingTip: t(
      "Book early if travelling for Monaco events in July.",
      "Reservez tot pour les evenements de Monaco en juillet.",
      "Prenota presto per gli eventi di Monaco a luglio.",
      "Бронюйте заздалегідь для липневих подій у Монако.",
    ),
    sourceStatus: "needs_verification",
  },
  {
    id: "monte-carlo-summer-festival-2026",
    slug: "monte-carlo-summer-festival",
    title: "Monte-Carlo Summer Festival",
    location: "Monaco",
    monthGroup: "2026-07",
    dateLabel: "3 July-15 August 2026",
    startDate: "2026-07-03",
    endDate: "2026-08-15",
    category: ["music", "seasonal", "prestige"],
    familySuitability: "depends",
    audience: ["music lovers", "summer visitors", "couples"],
    shortDescription: t(
      "A summer music and entertainment season in Monaco.",
      "Une saison estivale de musique et de spectacles a Monaco.",
      "Una stagione estiva di musica e spettacoli a Monaco.",
      "Літній сезон музики та розваг у Монако.",
    ),
    whyShowOnSite: t(
      "Good evening motivation for staying several nights in the region.",
      "Une bonne raison de rester plusieurs nuits dans la region.",
      "Un buon motivo serale per restare piu notti nella regione.",
      "Хороша причина залишитися в регіоні на кілька ночей.",
    ),
    bookingTip: t(
      "Stay by the sea in Menton and travel to Monaco for selected evenings.",
      "Logez au bord de mer a Menton et allez a Monaco pour certaines soirees.",
      "Soggiorna sul mare a Mentone e vai a Monaco per alcune serate.",
      "Живіть біля моря в Ментоні та їдьте до Монако на вибрані вечори.",
    ),
    sourceStatus: "needs_verification",
    featured: true,
    detailPage: true,
  },
  {
    id: "monaco-energy-boat-challenge-2026",
    slug: "monaco-energy-boat-challenge",
    title: "Monaco Energy Boat Challenge",
    location: "Monaco",
    monthGroup: "2026-07",
    dateLabel: "8-11 July 2026",
    startDate: "2026-07-08",
    endDate: "2026-07-11",
    category: ["maritime", "sport"],
    familySuitability: "good_with_older_children",
    audience: ["maritime fans", "innovation travellers", "families with older children"],
    shortDescription: t(
      "A Monaco event around innovation, boats and maritime technology.",
      "Un evenement monegasque autour de l'innovation, des bateaux et de la technologie maritime.",
      "Un evento di Monaco su innovazione, barche e tecnologia marina.",
      "Подія в Монако про інновації, човни та морські технології.",
    ),
    whyShowOnSite: t(
      "Useful for guests interested in yachts, the sea and modern marine innovation.",
      "Utile pour les visiteurs interesses par les yachts, la mer et l'innovation marine.",
      "Utile per chi ama yacht, mare e innovazione marina.",
      "Корисно для гостей, яким цікаві яхти, море та морські інновації.",
    ),
    bookingTip: t(
      "Pairs well with a beachside stay in Menton.",
      "Se combine bien avec un sejour pres de la plage a Menton.",
      "Si abbina bene a un soggiorno vicino alla spiaggia a Mentone.",
      "Добре поєднується з проживанням біля пляжу в Ментоні.",
    ),
    sourceStatus: "needs_verification",
  },
  {
    id: "meeting-herculis-ebs-2026",
    slug: "meeting-herculis-ebs",
    title: "Meeting Herculis EBS",
    location: "Monaco",
    monthGroup: "2026-07",
    dateLabel: "10 July 2026",
    startDate: "2026-07-10",
    endDate: "2026-07-10",
    category: ["sport"],
    familySuitability: "good_with_older_children",
    audience: ["athletics fans", "sports travellers"],
    shortDescription: t(
      "A major athletics meeting in Monaco.",
      "Un grand meeting d'athletisme a Monaco.",
      "Un importante meeting di atletica a Monaco.",
      "Великий легкоатлетичний турнір у Монако.",
    ),
    whyShowOnSite: t(
      "A clear summer sports reason to stay in the region.",
      "Une raison sportive claire de sejourner dans la region en ete.",
      "Un chiaro motivo sportivo per soggiornare nella regione in estate.",
      "Чітка спортивна причина зупинитися в регіоні влітку.",
    ),
    bookingTip: t(
      "Good for a short Riviera sports break.",
      "Bien pour une courte escapade sportive sur la Riviera.",
      "Ideale per una breve pausa sportiva in Riviera.",
      "Добре для короткої спортивної поїздки Рив'єрою.",
    ),
    sourceStatus: "needs_verification",
  },
  {
    id: "nice-jazz-fest-2026",
    slug: "nice-jazz-fest",
    title: "Nice Jazz Fest",
    location: "Nice",
    monthGroup: "2026-07",
    dateLabel: "23-26 July 2026",
    startDate: "2026-07-23",
    endDate: "2026-07-26",
    category: ["music"],
    familySuitability: "depends",
    audience: ["music lovers", "couples", "city-break guests"],
    shortDescription: t(
      "A large summer music festival in Nice.",
      "Un grand festival musical d'ete a Nice.",
      "Un grande festival musicale estivo a Nizza.",
      "Великий літній музичний фестиваль у Ніцці.",
    ),
    whyShowOnSite: t(
      "A strong summer magnet for 2-4 night stays on the Riviera.",
      "Un fort motif estival pour un sejour de 2 a 4 nuits sur la Riviera.",
      "Un forte richiamo estivo per soggiorni di 2-4 notti in Riviera.",
      "Сильний літній привід для перебування на Рив'єрі на 2-4 ночі.",
    ),
    bookingTip: t(
      "Stay in Menton for a calmer seaside base and visit Nice for festival evenings.",
      "Logez a Menton pour une base plus calme et allez a Nice pour les soirees.",
      "Soggiorna a Mentone come base piu tranquilla e vai a Nizza per le serate.",
      "Зупиніться в Ментоні як у спокійнішій морській базі та їдьте до Ніцци на вечори фестивалю.",
    ),
    sourceStatus: "needs_verification",
    featured: true,
    detailPage: true,
  },
  {
    id: "menton-music-festival-2026",
    slug: "menton-music-festival",
    title: "Festival de Musique de Menton",
    location: "Menton",
    monthGroup: "2026-07",
    dateLabel: "July-August 2026; selected confirmed events on 2 and 4 August",
    expectedSeason: "July-August 2026",
    category: ["music", "art"],
    familySuitability: "good_with_older_children",
    audience: ["classical music lovers", "culture travellers", "couples", "older children"],
    shortDescription: t(
      "One of Menton's most authentic cultural reasons to visit, with open-air classical music atmosphere.",
      "L'une des raisons culturelles les plus authentiques de venir a Menton, avec une ambiance de musique classique en plein air.",
      "Uno dei motivi culturali piu autentici per visitare Mentone, con atmosfera di musica classica all'aperto.",
      "Одна з найавтентичніших культурних причин відвідати Ментон: атмосфера класичної музики просто неба.",
    ),
    whyShowOnSite: t(
      "This is a must-have event for a Menton apartment website.",
      "Un evenement incontournable pour un site d'appartements a Menton.",
      "Un evento essenziale per un sito di appartamenti a Mentone.",
      "Обов'язкова подія для сайту апартаментів у Ментоні.",
    ),
    bookingTip: t(
      "Book early for central seaside stays during festival dates.",
      "Reservez tot pour loger au centre pres de la mer pendant le festival.",
      "Prenota presto per soggiornare in centro vicino al mare durante il festival.",
      "Бронюйте заздалегідь, щоб жити в центрі біля моря під час фестивалю.",
    ),
    sourceStatus: "needs_verification",
    featured: true,
    detailPage: true,
    relatedApartmentKeys: relatedAll,
  },
  {
    id: "la-vuelta-monaco-start-2026",
    slug: "la-vuelta-monaco-start",
    title: "Grand Depart / start of La Vuelta in Monaco",
    location: "Monaco",
    monthGroup: "2026-08",
    dateLabel: "20-23 August 2026",
    startDate: "2026-08-20",
    endDate: "2026-08-23",
    category: ["sport"],
    familySuitability: "good_with_older_children",
    audience: ["cycling fans", "sports travellers", "families with older children"],
    shortDescription: t(
      "An international cycling reason to visit Monaco and the eastern Riviera in late summer.",
      "Une raison cycliste internationale de visiter Monaco et l'est de la Riviera en fin d'ete.",
      "Un motivo ciclistico internazionale per visitare Monaco e la Riviera orientale a fine estate.",
      "Міжнародна велосипедна причина відвідати Монако та східну Рив'єру наприкінці літа.",
    ),
    whyShowOnSite: t(
      "Strong late-summer appeal for cycling fans.",
      "Un fort attrait de fin d'ete pour les amateurs de cyclisme.",
      "Grande richiamo di fine estate per appassionati di ciclismo.",
      "Сильний привід для фанатів велоспорту наприкінці літа.",
    ),
    bookingTip: t(
      "Expect event crowds and plan transport early.",
      "Prevoyez du monde et organisez le transport tot.",
      "Aspettati folla e organizza i trasporti in anticipo.",
      "Очікуйте натовпи та плануйте транспорт заздалегідь.",
    ),
    sourceStatus: "needs_verification",
    featured: true,
  },
  {
    id: "tour-de-france-femmes-nice-finish-2026",
    slug: "tour-de-france-femmes-nice-finish",
    title: "Finish of the women's Tour de France in Nice",
    location: "Nice",
    monthGroup: "2026-08",
    dateLabel: "August 2026",
    expectedSeason: "August 2026",
    category: ["sport"],
    familySuitability: "good_with_older_children",
    audience: ["cycling fans", "sports travellers"],
    shortDescription: t(
      "A women's road cycling highlight in Nice.",
      "Un temps fort du cyclisme feminin sur route a Nice.",
      "Un appuntamento di ciclismo femminile su strada a Nizza.",
      "Яскрава подія жіночого шосейного велоспорту в Ніцці.",
    ),
    whyShowOnSite: t(
      "Good for cycling-oriented guests and sports-focused Riviera travel.",
      "Interessant pour les voyageurs amateurs de cyclisme et de sport.",
      "Utile per ospiti appassionati di ciclismo e viaggi sportivi.",
      "Добре для гостей, які цікавляться велоспортом і спортивними поїздками Рив'єрою.",
    ),
    bookingTip: t(
      "Best for guests already interested in cycling; exact route and timing should be checked.",
      "A recommander aux amateurs de cyclisme; verifiez le parcours et les horaires.",
      "Ideale per appassionati di ciclismo; verifica percorso e orari.",
      "Найкраще для любителів велоспорту; маршрут і час треба перевірити.",
    ),
    sourceStatus: "needs_verification",
  },
  {
    id: "art3f-monaco-2026",
    slug: "art3f-monaco",
    title: "ART3F Monaco",
    location: "Monaco",
    monthGroup: "2026-09",
    dateLabel: "18-20 September 2026",
    startDate: "2026-09-18",
    endDate: "2026-09-20",
    category: ["art", "exhibition"],
    familySuitability: "mostly_adults",
    audience: ["art travellers", "collectors", "culture visitors"],
    shortDescription: t(
      "A contemporary art fair in Monaco.",
      "Une foire d'art contemporain a Monaco.",
      "Una fiera d'arte contemporanea a Monaco.",
      "Ярмарок сучасного мистецтва в Монако.",
    ),
    whyShowOnSite: t(
      "Good for art-oriented weekends beyond beach season.",
      "Interessant pour un week-end artistique hors pleine saison plage.",
      "Ideale per weekend d'arte oltre la stagione balneare.",
      "Добре для мистецьких вікендів поза піковим пляжним сезоном.",
    ),
    bookingTip: t(
      "Useful for visitors looking for a quieter base outside Monaco.",
      "Utile pour loger plus calmement hors de Monaco.",
      "Utile per chi cerca una base piu tranquilla fuori Monaco.",
      "Зручно для гостей, які шукають спокійнішу базу поза Монако.",
    ),
    sourceStatus: "needs_verification",
  },
  {
    id: "monaco-yacht-show-2026",
    slug: "monaco-yacht-show",
    title: "Monaco Yacht Show",
    location: "Monaco",
    monthGroup: "2026-09",
    dateLabel: "23-26 September 2026",
    startDate: "2026-09-23",
    endDate: "2026-09-26",
    category: ["maritime", "prestige"],
    familySuitability: "mostly_adults",
    audience: ["yacht enthusiasts", "luxury travellers", "business visitors"],
    shortDescription: t(
      "One of the strongest international Monaco events of early autumn.",
      "L'un des grands evenements internationaux de Monaco au debut de l'automne.",
      "Uno dei piu importanti eventi internazionali di Monaco a inizio autunno.",
      "Одна з найсильніших міжнародних подій Монако на початку осені.",
    ),
    whyShowOnSite: t(
      "A major demand driver across the Riviera outside peak beach season.",
      "Un moteur de demande important sur la Riviera hors haute saison plage.",
      "Un forte driver di domanda in Riviera fuori dall'alta stagione balneare.",
      "Важливий фактор попиту на Рив'єрі поза піком пляжного сезону.",
    ),
    bookingTip: t(
      "Book early and expect higher demand during the show.",
      "Reservez tot et prevoyez une forte demande pendant le salon.",
      "Prenota presto e aspettati piu domanda durante il salone.",
      "Бронюйте рано та очікуйте підвищений попит під час шоу.",
    ),
    sourceStatus: "needs_verification",
    featured: true,
    detailPage: true,
  },
  {
    id: "matisse-yves-saint-laurent-autumn-2026",
    slug: "matisse-yves-saint-laurent-autumn",
    title: "Henri Matisse - Yves Saint Laurent, final weeks",
    location: "Nice",
    monthGroup: "2026-09",
    dateLabel: "Until 28 September 2026",
    endDate: "2026-09-28",
    category: ["exhibition", "art"],
    familySuitability: "depends",
    audience: ["art lovers", "fashion travellers"],
    shortDescription: t(
      "The final weeks of a summer-to-autumn art and fashion exhibition in Nice.",
      "Les dernieres semaines d'une exposition art et mode a Nice.",
      "Le ultime settimane di una mostra di arte e moda a Nizza.",
      "Останні тижні літньо-осінньої виставки мистецтва і моди в Ніцці.",
    ),
    whyShowOnSite: t(
      "A useful cultural motive for an early autumn trip.",
      "Un bon motif culturel pour un voyage de debut d'automne.",
      "Un buon motivo culturale per un viaggio di inizio autunno.",
      "Корисний культурний привід для поїздки на початку осені.",
    ),
    bookingTip: t(
      "Pair a beachside Menton stay with a Nice museum day.",
      "Associez Menton au bord de mer avec une journee musee a Nice.",
      "Abbina Mentone sul mare con una giornata museale a Nizza.",
      "Поєднайте проживання біля моря в Ментоні з музейним днем у Ніцці.",
    ),
    sourceStatus: "needs_verification",
  },
  {
    id: "immersive-exhibitions-nice-2026",
    slug: "immersive-exhibitions-nice",
    title: "Ongoing exhibitions in Nice",
    location: "Nice",
    monthGroup: "2026-10",
    dateLabel: "Seasonal / dates to verify",
    expectedSeason: "2026",
    category: ["exhibition", "art", "family"],
    familySuitability: "depends",
    audience: ["families", "culture travellers", "rainy-day planners"],
    shortDescription: t(
      "Immersive and historical exhibitions in Nice can add indoor options to a Riviera stay.",
      "Les expositions immersives ou historiques a Nice ajoutent des idees en interieur.",
      "Mostre immersive e storiche a Nizza offrono opzioni al coperto.",
      "Імерсивні та історичні виставки в Ніцці додають варіанти для приміщень.",
    ),
    whyShowOnSite: t(
      "Useful as a flexible ongoing exhibitions block when exact programmes are confirmed.",
      "Utile comme bloc flexible lorsque les programmes seront confirmes.",
      "Utile come blocco flessibile quando i programmi saranno confermati.",
      "Корисний гнучкий блок, коли програми будуть підтверджені.",
    ),
    bookingTip: t(
      "Good to mention as a rainy-day or non-beach option.",
      "Bon a mentionner comme option de pluie ou hors plage.",
      "Buono come opzione per pioggia o giorni senza spiaggia.",
      "Добре як варіант на дощовий день або день без пляжу.",
    ),
    sourceStatus: "official_source_needed",
  },
  {
    id: "nice-cannes-marathon-2026",
    slug: "nice-cannes-marathon",
    title: "Alpes-Maritimes Nice-Cannes Marathon",
    location: "Nice",
    monthGroup: "2026-11",
    dateLabel: "8 November 2026",
    startDate: "2026-11-08",
    endDate: "2026-11-08",
    category: ["sport"],
    familySuitability: "depends",
    audience: ["runners", "active travellers", "supporters"],
    shortDescription: t(
      "A major autumn running event between Nice and Cannes.",
      "Un grand rendez-vous running d'automne entre Nice et Cannes.",
      "Un grande evento autunnale di corsa tra Nizza e Cannes.",
      "Велика осіння бігова подія між Ніццою та Каннами.",
    ),
    whyShowOnSite: t(
      "Strong appeal for active travellers and autumn sports tourism.",
      "Fort attrait pour les voyageurs actifs et le tourisme sportif d'automne.",
      "Forte attrattiva per viaggiatori attivi e turismo sportivo autunnale.",
      "Сильний інтерес для активних мандрівників і осіннього спортивного туризму.",
    ),
    bookingTip: t(
      "Useful for runners who want a calmer seaside base before or after race day.",
      "Utile pour les coureurs qui veulent une base plus calme avant ou apres la course.",
      "Utile per runner che cercano una base piu tranquilla prima o dopo la gara.",
      "Зручно для бігунів, які хочуть спокійнішу морську базу до або після забігу.",
    ),
    sourceStatus: "needs_verification",
    featured: true,
  },
  {
    id: "major-sports-weekends-nice-autumn-2026",
    slug: "major-sports-weekends-nice-autumn",
    title: "Major sports weekends in Nice",
    location: "Nice",
    monthGroup: "2026-11",
    dateLabel: "Autumn 2026; dates to verify",
    expectedSeason: "Autumn 2026",
    category: ["sport"],
    familySuitability: "depends",
    audience: ["runners", "triathletes", "active travellers"],
    shortDescription: t(
      "Nice regularly hosts major endurance and sports weekends, including running and triathlon-related events.",
      "Nice accueille regulierement des week-ends sportifs d'endurance, course et triathlon.",
      "Nizza ospita spesso weekend sportivi di endurance, corsa e triathlon.",
      "Ніцца регулярно приймає великі спортивні вікенди з бігом і триатлоном.",
    ),
    whyShowOnSite: t(
      "A flexible sports-travel block for autumn demand.",
      "Un bloc flexible pour la demande sportive d'automne.",
      "Un blocco flessibile per la domanda sportiva autunnale.",
      "Гнучкий блок для осіннього спортивного попиту.",
    ),
    bookingTip: t(
      "Exact dates should be verified before promoting specific travel weekends.",
      "Verifiez les dates exactes avant de promouvoir un week-end precis.",
      "Verifica le date esatte prima di promuovere weekend specifici.",
      "Точні дати треба перевірити перед просуванням конкретних вікендів.",
    ),
    sourceStatus: "official_source_needed",
  },
  {
    id: "winter-on-the-riviera-2026-2027",
    slug: "winter-on-the-riviera",
    title: "Winter on the Riviera",
    location: "French Riviera",
    monthGroup: "2026-12",
    dateLabel: "December 2026-January 2027",
    startDate: "2026-12-01",
    endDate: "2027-01-31",
    category: ["winter", "seasonal"],
    familySuitability: "recommended_with_children",
    audience: ["families", "couples", "slow travel guests", "winter sun travellers"],
    shortDescription: t(
      "A quieter winter period for seaside walks, town visits, gardens and local seasonal programmes.",
      "Une periode d'hiver plus calme pour promenades en bord de mer, villes, jardins et programmes locaux.",
      "Un periodo invernale piu tranquillo per passeggiate sul mare, cittadine, giardini e programmi locali.",
      "Спокійніший зимовий період для морських прогулянок, міст, садів і місцевих програм.",
    ),
    whyShowOnSite: t(
      "Keeps the calendar useful when major event dates are not yet published.",
      "Rend le calendrier utile quand les grandes dates ne sont pas encore publiees.",
      "Mantiene utile il calendario quando le date principali non sono ancora pubblicate.",
      "Робить календар корисним, коли великі дати ще не опубліковані.",
    ),
    bookingTip: t(
      "Promote winter as a calm, lighter, lower-season alternative.",
      "Presenter l'hiver comme une alternative calme et plus douce.",
      "Presenta l'inverno come alternativa calma e piu leggera.",
      "Показуйте зиму як спокійнішу альтернативу низького сезону.",
    ),
    sourceStatus: "official_source_needed",
  },
  {
    id: "local-menton-winter-events-2026-2027",
    slug: "local-menton-winter-events",
    title: "Local winter events in Menton and nearby villages",
    location: "Menton",
    monthGroup: "2027-01",
    dateLabel: "Winter calendar coming soon",
    expectedSeason: "December 2026-January 2027",
    category: ["winter", "family", "food-local"],
    familySuitability: "recommended_with_children",
    audience: ["families", "local culture travellers"],
    shortDescription: t(
      "Local cultural, family and seasonal events usually appear across Menton and nearby communes.",
      "Des evenements culturels, familiaux et saisonniers locaux ont souvent lieu a Menton et alentour.",
      "Eventi locali culturali, familiari e stagionali compaiono spesso a Mentone e dintorni.",
      "Місцеві культурні, сімейні та сезонні події зазвичай проходять у Ментоні та поруч.",
    ),
    whyShowOnSite: t(
      "Useful for a winter calendar coming soon block until full official programmes are published.",
      "Utile comme bloc calendrier d'hiver en attendant les programmes officiels.",
      "Utile come blocco calendario invernale in attesa dei programmi ufficiali.",
      "Корисно як зимовий блок до публікації офіційних програм.",
    ),
    bookingTip: t(
      "Ask the host for local recommendations closer to travel dates.",
      "Demandez des conseils locaux a l'hote plus pres du sejour.",
      "Chiedi consigli locali all'host piu vicino alle date.",
      "Запитайте господаря про місцеві поради ближче до дат поїздки.",
    ),
    sourceStatus: "official_source_needed",
  },
  {
    id: "menton-lemon-festival-2027",
    slug: "menton-lemon-festival",
    title: "Fete du Citron / Menton Lemon Festival",
    location: "Menton",
    monthGroup: "winter-highlights",
    dateLabel: "February-early March 2027; official dates to confirm",
    expectedSeason: "February-March 2027",
    category: ["family", "winter", "seasonal"],
    familySuitability: "recommended_with_children",
    audience: ["families", "couples", "photographers", "winter travellers"],
    shortDescription: t(
      "Menton's signature winter event, known for citrus installations, colourful parades and festival atmosphere across the town.",
      "L'evenement d'hiver signature de Menton, connu pour les decors d'agrumes, les defiles colores et l'ambiance festive.",
      "L'evento invernale simbolo di Mentone, con installazioni di agrumi, sfilate colorate e atmosfera di festa.",
      "Головна зимова подія Ментона з цитрусовими інсталяціями, яскравими парадами та святковою атмосферою.",
    ),
    whyShowOnSite: t(
      "One of the strongest reasons to visit Menton outside summer.",
      "L'une des meilleures raisons de venir a Menton hors ete.",
      "Uno dei motivi piu forti per visitare Mentone fuori estate.",
      "Одна з найсильніших причин приїхати до Ментона поза літом.",
    ),
    bookingTip: t(
      "Book early, check access and traffic rules, and ask the host for practical arrival advice.",
      "Reservez tot, verifiez acces et circulation, et demandez conseil a l'hote.",
      "Prenota presto, verifica accesso e traffico, e chiedi consigli pratici all'host.",
      "Бронюйте рано, перевіряйте доступ і рух, запитайте господаря про приїзд.",
    ),
    sourceStatus: "official_source_needed",
    featured: true,
    detailPage: true,
    relatedApartmentKeys: relatedAll,
  },
  {
    id: "nice-carnival-2027",
    slug: "nice-carnival",
    title: "Nice Carnival",
    location: "Nice",
    monthGroup: "winter-highlights",
    dateLabel: "February-early March 2027; official dates to confirm",
    expectedSeason: "February-March 2027",
    category: ["family", "winter", "seasonal"],
    familySuitability: "recommended_with_children",
    audience: ["families", "couples", "carnival visitors"],
    shortDescription: t(
      "A major winter carnival on the Riviera, with colourful parades and family-friendly atmosphere.",
      "Un grand carnaval d'hiver sur la Riviera, avec defiles colores et ambiance familiale.",
      "Un grande carnevale invernale in Riviera, con sfilate colorate e atmosfera per famiglie.",
      "Великий зимовий карнавал Рив'єри з яскравими парадами та сімейною атмосферою.",
    ),
    whyShowOnSite: t(
      "A strong winter travel reason that pairs well with a Menton seaside base.",
      "Une forte raison de voyager en hiver, compatible avec une base a Menton.",
      "Un forte motivo invernale che si abbina bene a una base sul mare a Mentone.",
      "Сильний зимовий привід для поїздки, який добре поєднується з базою в Ментоні.",
    ),
    bookingTip: t(
      "Good for families, especially daytime parades and flower-themed events when available.",
      "Bien pour les familles, surtout les defiles de jour et evenements floraux si disponibles.",
      "Buono per famiglie, soprattutto sfilate diurne ed eventi floreali quando disponibili.",
      "Добре для сімей, особливо денні паради та квіткові події, якщо вони є.",
    ),
    sourceStatus: "official_source_needed",
    featured: true,
    detailPage: true,
  },
];

export const eventDetailSlugs = [
  "menton-lemon-festival",
  "monaco-grand-prix",
  "monaco-yacht-show",
  "nice-jazz-fest",
  "menton-music-festival",
  "nice-carnival",
  "summer-on-the-riviera",
] as const;

export function getRivieraEvent(slug: string) {
  return rivieraEvents.find((event) => event.slug === slug);
}

export function getDetailEvents() {
  return rivieraEvents.filter((event) => event.detailPage);
}

export const summerOnTheRivieraEvent: RivieraEvent = {
  id: "summer-on-the-riviera",
  slug: "summer-on-the-riviera",
  title: "Summer on the Riviera",
  location: "French Riviera",
  monthGroup: "2026-07",
  dateLabel: "July-August 2026",
  expectedSeason: "July-August 2026",
  category: ["seasonal", "music", "family"],
  familySuitability: "depends",
  audience: ["families", "couples", "summer visitors"],
  shortDescription: t(
    "Beach days, music evenings, Monaco nights, Nice festivals and easy day trips from Menton.",
    "Plages, soirees musicales, Monaco, festivals a Nice et excursions faciles depuis Menton.",
    "Giornate di mare, serate musicali, Monaco, festival a Nizza e gite facili da Mentone.",
    "Пляжні дні, музичні вечори, Монако, фестивалі в Ніцці та легкі поїздки з Ментона.",
  ),
  whyShowOnSite: t(
    "A practical seasonal guide for guests choosing summer dates.",
    "Un guide saisonnier pratique pour choisir des dates d'ete.",
    "Una guida stagionale pratica per scegliere le date estive.",
    "Практичний сезонний гід для гостей, які обирають літні дати.",
  ),
  bookingTip: t(
    "Request dates early for July and August, especially if parking or family space matters.",
    "Demandez les dates tot en juillet-aout, surtout avec parking ou famille.",
    "Richiedi le date presto per luglio e agosto, soprattutto con parcheggio o famiglia.",
    "Надсилайте запит на липень і серпень раніше, особливо якщо потрібне паркування чи простір для сім'ї.",
  ),
  sourceStatus: "official_source_needed",
  detailPage: true,
  relatedApartmentKeys: relatedAll,
};

export function getEventDetail(slug: string) {
  if (slug === summerOnTheRivieraEvent.slug) return summerOnTheRivieraEvent;
  return getRivieraEvent(slug);
}

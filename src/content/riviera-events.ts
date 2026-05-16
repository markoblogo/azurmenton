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
  detailContent?: {
    overview: LocalizedText[];
    venues: LocalizedText[];
    family: LocalizedText;
    tickets: LocalizedText[];
    tips: LocalizedText[];
    officialLinks?: Array<{
      label: LocalizedText;
      href: string;
    }>;
  };
  media?: {
    image?: string;
    imageAlt?: LocalizedText;
    imageCaption?: LocalizedText;
    mediaType?: "project_illustration";
    gallery?: string[];
    mediaEmbedUrl?: string;
    mediaSourceName?: string;
    mediaRightsNote?: string;
    mediaStatus?: "available" | "missing" | "needs_review";
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

function eventIllustration(filename: string, title: string): NonNullable<RivieraEvent["media"]> {
  return {
    image: `/images/events/${filename}`,
    imageAlt: t(
      `Project illustration for ${title} near Menton`,
      `Illustration de projet pour ${title} pres de Menton`,
      `Illustrazione di progetto per ${title} vicino a Mentone`,
      `Проєктна ілюстрація для ${title} поруч із Ментоном`,
    ),
    imageCaption: t(
      "Project illustration, not an official event photograph.",
      "Illustration de projet, pas une photographie officielle de l'evenement.",
      "Illustrazione di progetto, non una fotografia ufficiale dell'evento.",
      "Проєктна ілюстрація, не офіційна фотографія події.",
    ),
    mediaType: "project_illustration",
    mediaStatus: "available",
  };
}

const eventIllustrations: Record<string, NonNullable<RivieraEvent["media"]>> = {
  "monaco-grand-prix-2026": eventIllustration("monaco-grand-prix.png", "Formula 1 Monaco Grand Prix"),
  "monte-carlo-television-festival-2026": eventIllustration("monte-carlo-television-festival.png", "Monte-Carlo Television Festival"),
  "commedia-dell-arte-nice-2026": eventIllustration("festival-international-commedia-dell-arte.png", "Festival International de Commedia Dell'Arte"),
  "new-vision-nice-open-2026": eventIllustration("new-vision-nice-open.png", "New Vision Nice Open"),
  "matisse-yves-saint-laurent-nice-2026": eventIllustration("henri-matisse-yves-saint-laurent.png", "Henri Matisse - Yves Saint Laurent"),
  "jumping-international-monte-carlo-2026": eventIllustration("jumping-international-monte-carlo.png", "Jumping International de Monte-Carlo"),
  "monte-carlo-summer-festival-2026": eventIllustration("monte-carlo-summer-festival.png", "Monte-Carlo Summer Festival"),
  "monaco-energy-boat-challenge-2026": eventIllustration("monaco-energy-boat-challenge.png", "Monaco Energy Boat Challenge"),
  "meeting-herculis-ebs-2026": eventIllustration("meeting-herculis-ebs.png", "Meeting Herculis EBS"),
  "nice-jazz-fest-2026": eventIllustration("nice-jazz-fest.png", "Nice Jazz Fest"),
  "menton-music-festival-2026": eventIllustration("menton-music-festival.png", "Festival de Musique de Menton"),
  "la-vuelta-monaco-start-2026": eventIllustration("grand-depart-la-vuelta-monaco.png", "Grand Depart / start of La Vuelta in Monaco"),
  "tour-de-france-femmes-nice-finish-2026": eventIllustration("tour-de-france-femmes-nice-finish.png", "Finish of the women's Tour de France in Nice"),
  "art3f-monaco-2026": eventIllustration("art3f-monaco.png", "ART3F Monaco"),
  "monaco-yacht-show-2026": eventIllustration("monaco-yacht-show.png", "Monaco Yacht Show"),
  "matisse-yves-saint-laurent-autumn-2026": eventIllustration("henri-matisse-yves-saint-laurent.png", "Henri Matisse - Yves Saint Laurent"),
  "immersive-exhibitions-nice-2026": eventIllustration("ongoing-exhibitions-nice.png", "Ongoing exhibitions in Nice"),
  "nice-cannes-marathon-2026": eventIllustration("nice-cannes-marathon.png", "Alpes-Maritimes Nice-Cannes Marathon"),
  "major-sports-weekends-nice-autumn-2026": eventIllustration("major-sports-weekends-nice.png", "Major sports weekends in Nice"),
  "winter-on-the-riviera-2026-2027": eventIllustration("winter-on-the-riviera.png", "Winter on the Riviera"),
  "local-menton-winter-events-2026-2027": eventIllustration("local-winter-events-menton-nearby-villages.png", "Local winter events in Menton and nearby villages"),
  "menton-lemon-festival-2027": eventIllustration("menton-lemon-festival.png", "Fete du Citron / Menton Lemon Festival"),
  "nice-carnival-2027": eventIllustration("nice-carnival.png", "Nice Carnival"),
};

const rivieraEventsBase: RivieraEvent[] = [
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
    sourceUrl: "https://www.acm.mc",
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
    sourceStatus: "verified",
    sourceUrl: "https://www.tvfestival.com/en",
    detailPage: true,
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
    sourceUrl: "https://www.commedia-nice.com/festivaldecommedianice",
    detailPage: true,
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
    sourceUrl: "https://www.explorenicecotedazur.com/evenement/new-vision-nice-open/",
    detailPage: true,
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
    sourceStatus: "verified",
    sourceUrl: "https://www.musee-matisse-nice.org/fr/exposition/henri-matisse-yves-saint-laurent-le-beau-la-mode-et-le-bonheur/",
    featured: true,
    detailPage: true,
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
    sourceUrl: "https://www.jumping-monaco.com/",
    detailPage: true,
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
    sourceUrl: "https://www.montecarlosbm.com/en/shows/monte-carlo-summer-festival",
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
    sourceStatus: "verified",
    sourceUrl: "https://www.nicejazzfestival.fr",
    featured: true,
    detailPage: true,
  },
  {
    id: "menton-music-festival-2026",
    slug: "menton-music-festival",
    title: "Festival de Musique de Menton",
    location: "Menton",
    monthGroup: "2026-07",
    dateLabel: "25 July-7 August 2026",
    startDate: "2026-07-25",
    endDate: "2026-08-07",
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
    sourceStatus: "verified",
    sourceUrl: "https://www.festival-musique-menton.fr",
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
    dateLabel: "9-28 February 2027",
    startDate: "2027-02-09",
    endDate: "2027-02-28",
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
    sourceStatus: "verified",
    sourceUrl: "https://www.nicecarnaval.com/en/",
    featured: true,
    detailPage: true,
  },
];

export const rivieraEvents: RivieraEvent[] = rivieraEventsBase.map((event) => ({
  ...event,
  media: eventIllustrations[event.id] ?? event.media,
}));

export const eventDetailSlugs = [
  "menton-lemon-festival",
  "monaco-grand-prix",
  "monte-carlo-television-festival",
  "commedia-dell-arte-nice",
  "new-vision-nice-open",
  "matisse-yves-saint-laurent-nice",
  "jumping-international-monte-carlo",
  "monte-carlo-summer-festival",
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

const eventDetailsBySlug: Partial<Record<string, NonNullable<RivieraEvent["detailContent"]>>> = {
  "monte-carlo-television-festival": {
    overview: [
      t(
        "The Monte-Carlo Television Festival is one of the world's long-running international TV events, founded in 1961. The 65th edition is announced for 12-16 June 2026 under the high patronage of Prince Albert II.",
        "Le Festival de Television de Monte-Carlo est l'un des rendez-vous internationaux de television les plus anciens, fonde en 1961. La 65e edition est annoncee du 12 au 16 juin 2026 sous le Haut Patronage du Prince Albert II.",
        "Il Festival della Televisione di Monte-Carlo e uno degli appuntamenti televisivi internazionali piu longevi, fondato nel 1961. La 65a edizione e annunciata dal 12 al 16 giugno 2026 sotto l'alto patronato del Principe Alberto II.",
        "Міжнародний телевізійний фестиваль Монте-Карло - одна з найстаріших міжнародних ТВ-подій, заснована 1961 року. 65-й випуск анонсовано на 12-16 червня 2026 року під високим патронатом князя Альбера II.",
      ),
      t(
        "The programme mixes competition, premieres, masterclasses, fan meetings and award ceremonies. It is useful for guests interested in Monaco's media, celebrity and industry calendar.",
        "Le programme mele competition, avant-premieres, masterclasses, rencontres avec le public et ceremonies de remise de prix. C'est utile pour les visiteurs interesses par le calendrier media, celebrites et industrie de Monaco.",
        "Il programma combina concorso, anteprime, masterclass, incontri con il pubblico e cerimonie di premiazione. E utile per chi segue il calendario media, celebrity e industria di Monaco.",
        "Програма поєднує конкурс, прем'єри, майстер-класи, зустрічі з публікою та церемонії нагородження. Це корисно для гостей, яким цікавий медійний, зірковий та індустріальний календар Монако.",
      ),
    ],
    venues: [
      t("Main venue: Grimaldi Forum Monaco, 10 Avenue Princesse Grace, 98000 Monaco.", "Lieu principal : Grimaldi Forum Monaco, 10 Avenue Princesse Grace, 98000 Monaco.", "Sede principale: Grimaldi Forum Monaco, 10 Avenue Princesse Grace, 98000 Monaco.", "Головна локація: Grimaldi Forum Monaco, 10 Avenue Princesse Grace, 98000 Monaco."),
      t("Opening ceremony and screenings are usually held inside the Grimaldi Forum; some fan and media activity may be around Monaco Media and the Casino area.", "La ceremonie d'ouverture et les projections ont generalement lieu au Grimaldi Forum ; certaines activites publiques et media peuvent se trouver autour de Monaco Media et du Casino.", "Cerimonia di apertura e proiezioni si svolgono di solito al Grimaldi Forum; alcune attivita fan e media possono essere nell'area Monaco Media e Casino.", "Відкриття та покази зазвичай проходять у Grimaldi Forum; окремі фан- і медіаактивності можуть бути біля Monaco Media та району Casino."),
    ],
    family: t(
      "Mostly adults. Some public fan-zone moments may interest teenagers, but the main format is industry-focused and best for TV fans aged around 16+.",
      "Plutot adultes. Certains moments publics peuvent interesser les adolescents, mais le format principal reste professionnel et convient surtout aux fans de television a partir d'environ 16 ans.",
      "Soprattutto per adulti. Alcuni momenti pubblici possono interessare adolescenti, ma il formato principale e professionale e piu adatto agli appassionati TV dai 16 anni circa.",
      "Переважно для дорослих. Окремі відкриті фан-зони можуть зацікавити підлітків, але основний формат професійний і найкраще підходить шанувальникам телебачення приблизно від 16 років.",
    ),
    tickets: [
      t("Official website: tvfestival.com. Some public events and screenings may be free with advance registration; ticketing details usually open closer to the festival.", "Site officiel : tvfestival.com. Certains evenements publics et projections peuvent etre gratuits sur inscription ; les details de billetterie ouvrent generalement plus pres du festival.", "Sito ufficiale: tvfestival.com. Alcuni eventi pubblici e proiezioni possono essere gratuiti con registrazione anticipata; i dettagli biglietti aprono di solito piu vicino al festival.", "Офіційний сайт: tvfestival.com. Деякі відкриті події та покази можуть бути безкоштовними за попередньою реєстрацією; деталі квитків зазвичай відкривають ближче до фестивалю."),
      t("VIP events and gala evenings may be invitation-only or handled directly by the organising team.", "Les evenements VIP et soirees de gala peuvent etre sur invitation ou gerees directement par l'organisation.", "Eventi VIP e serate gala possono essere su invito o gestiti direttamente dall'organizzazione.", "VIP-події та гала-вечори можуть бути за запрошеннями або через прямий контакт з організаторами."),
    ],
    tips: [
      t("If you want the industry atmosphere, focus on central Monaco around the Grimaldi Forum and Casino area.", "Pour l'ambiance professionnelle, concentrez-vous sur le centre de Monaco autour du Grimaldi Forum et du Casino.", "Per l'atmosfera professionale, concentrati sul centro di Monaco tra Grimaldi Forum e Casino.", "Якщо вам цікава індустріальна атмосфера, орієнтуйтеся на центр Монако навколо Grimaldi Forum і Casino."),
      t("From Menton, train travel to Monaco-Monte-Carlo is usually easier than driving during Monaco event days.", "Depuis Menton, le train vers Monaco-Monte-Carlo est souvent plus simple que la voiture les jours d'evenement.", "Da Mentone, il treno per Monaco-Monte-Carlo e spesso piu semplice dell'auto nei giorni di evento.", "З Ментона поїзд до Monaco-Monte-Carlo зазвичай простіший, ніж авто в дні подій у Монако."),
      t("Register early for public ceremonies or screenings when booking opens; popular sessions can fill quickly.", "Inscrivez-vous tot aux ceremonies ou projections publiques quand les reservations ouvrent ; les sessions populaires se remplissent vite.", "Registrati presto per cerimonie o proiezioni pubbliche quando aprono le prenotazioni; le sessioni popolari si riempiono velocemente.", "Реєструйтеся рано на відкриті церемонії чи покази, коли відкриється бронювання; популярні сесії швидко заповнюються."),
    ],
    officialLinks: [
      { label: t("Official festival website", "Site officiel du festival", "Sito ufficiale del festival", "Офіційний сайт фестивалю"), href: "https://www.tvfestival.com/en" },
      { label: t("Grimaldi Forum event page", "Page Grimaldi Forum", "Pagina Grimaldi Forum", "Сторінка Grimaldi Forum"), href: "https://www.grimaldiforum.com/en/events-schedule-monaco/65-festival-de-television-de-monte-carlo" },
    ],
  },
  "commedia-dell-arte-nice": {
    overview: [
      t("The Festival International de Commedia Dell'Arte in Nice is a two-week theatre and street-performance festival built around masked comedy, music, workshops and screenings.",
        "Le Festival International de Commedia Dell'Arte a Nice est un rendez-vous de theatre et de spectacle de rue sur deux semaines, autour de la comedie masquee, de la musique, des ateliers et des projections.",
        "Il Festival International de Commedia Dell'Arte a Nizza e un appuntamento di teatro e spettacolo di strada di due settimane, tra commedia con maschere, musica, laboratori e proiezioni.",
        "Міжнародний фестиваль Commedia Dell'Arte у Ніцці - двотижнева театральна та вулична подія навколо комедії масок, музики, майстер-класів і показів."),
      t("Performers usually come from several countries and the festival can feel accessible and lively, with many outdoor shows in public squares. Programmes and venues should be checked before travelling.",
        "Des artistes viennent generalement de plusieurs pays et le festival reste accessible et vivant, avec de nombreux spectacles en plein air sur les places. Verifiez programme et lieux avant de vous deplacer.",
        "Gli artisti arrivano di solito da vari paesi e il festival e accessibile e vivace, con molti spettacoli all'aperto nelle piazze. Controllare programma e sedi prima di partire.",
        "Виконавці зазвичай приїжджають із різних країн, а фестиваль має доступний і живий формат із багатьма виставами просто неба. Перед поїздкою перевіряйте програму та локації."),
    ],
    venues: [
      t("Typical venues: Place Saint-Francois, Theatre de Verdure, Jardins Albert 1er and streets of Vieux Nice.", "Lieux habituels : Place Saint-Francois, Theatre de Verdure, Jardins Albert 1er et rues du Vieux Nice.", "Sedi abituali: Place Saint-Francois, Theatre de Verdure, Jardins Albert 1er e vie della Vecchia Nizza.", "Типові локації: Place Saint-Francois, Theatre de Verdure, Jardins Albert 1er і вулиці Старої Ніцци."),
      t("Detailed programme: commedia-nice.com.", "Programme detaille : commedia-nice.com.", "Programma dettagliato: commedia-nice.com.", "Детальна програма: commedia-nice.com."),
    ],
    family: t("Depends on age. Outdoor masked comedy can work well for children aged around 6+, while some evening shows are more adult in tone.", "Cela depend de l'age. Les spectacles de masques en plein air conviennent souvent aux enfants d'environ 6 ans et plus, tandis que certains soirs sont plus adultes.", "Dipende dall'eta. La commedia con maschere all'aperto puo funzionare bene dai 6 anni circa, mentre alcune serate sono piu adulte.", "Залежить від віку. Комедія масок просто неба часто добре підходить дітям від приблизно 6 років, але деякі вечірні вистави більш дорослі."),
    tickets: [
      t("Many outdoor performances are usually free. Theatre performances may require tickets, often in a modest price range; check the current programme.", "De nombreux spectacles en plein air sont souvent gratuits. Les spectacles en salle peuvent etre payants, souvent a tarif modere ; verifiez le programme actuel.", "Molti spettacoli all'aperto sono spesso gratuiti. Gli spettacoli in teatro possono richiedere biglietti, spesso a prezzi moderati; controllare il programma attuale.", "Багато вуличних показів зазвичай безкоштовні. Театральні вистави можуть бути платними, часто в помірному діапазоні; перевіряйте актуальну програму."),
    ],
    tips: [
      t("For families, start with public-square performances around Place Saint-Francois or Jardins Albert 1er.", "En famille, commencez par les spectacles sur les places autour de Place Saint-Francois ou Jardins Albert 1er.", "In famiglia, iniziare dagli spettacoli nelle piazze intorno a Place Saint-Francois o Jardins Albert 1er.", "Для сімей починайте з вистав на площах біля Place Saint-Francois або Jardins Albert 1er."),
      t("Even in June, bring a light layer for evening performances.", "Meme en juin, prevoyez une veste legere pour les spectacles du soir.", "Anche a giugno, porta uno strato leggero per gli spettacoli serali.", "Навіть у червні візьміть легку куртку для вечірніх вистав."),
      t("The festival runs for about two weeks, but not every venue has shows every day.", "Le festival dure environ deux semaines, mais tous les lieux n'ont pas des spectacles chaque jour.", "Il festival dura circa due settimane, ma non tutte le sedi hanno spettacoli ogni giorno.", "Фестиваль триває близько двох тижнів, але не на кожній локації є вистави щодня."),
    ],
    officialLinks: [
      { label: t("Official festival website", "Site officiel du festival", "Sito ufficiale del festival", "Офіційний сайт фестивалю"), href: "https://www.commedia-nice.com/festivaldecommedianice" },
    ],
  },
  "new-vision-nice-open": {
    overview: [
      t("New Vision Nice Open is a professional women's tennis event in Nice, planned for 8-14 June 2026. It gives visitors a smaller-scale sports atmosphere than the major Riviera stadium events.",
        "Le New Vision Nice Open est un tournoi professionnel feminin a Nice, prevu du 8 au 14 juin 2026. Il offre une atmosphere sportive plus intime que les grands evenements de stade de la Riviera.",
        "Il New Vision Nice Open e un torneo professionistico femminile a Nizza, previsto dall'8 al 14 giugno 2026. Offre un'atmosfera sportiva piu raccolta rispetto ai grandi eventi della Riviera.",
        "New Vision Nice Open - професійний жіночий тенісний турнір у Ніцці, запланований на 8-14 червня 2026 року. Він дає більш камерну спортивну атмосферу, ніж великі стадіонні події Рив'єри."),
      t("The event is useful for tennis fans and guests who want a sports-focused day trip from Menton without staying directly in Nice.",
        "L'evenement convient aux fans de tennis et aux visiteurs qui veulent une sortie sportive depuis Menton sans loger directement a Nice.",
        "L'evento e utile per appassionati di tennis e ospiti che vogliono una giornata sportiva da Mentone senza soggiornare direttamente a Nizza.",
        "Подія корисна для шанувальників тенісу та гостей, які хочуть спортивну поїздку з Ментона без проживання в самій Ніцці."),
    ],
    venues: [
      t("Nice Lawn Tennis Club: 5 Avenue Suzanne Lenglen, 06100 Nice.", "Nice Lawn Tennis Club : 5 Avenue Suzanne Lenglen, 06100 Nice.", "Nice Lawn Tennis Club: 5 Avenue Suzanne Lenglen, 06100 Nice.", "Nice Lawn Tennis Club: 5 Avenue Suzanne Lenglen, 06100 Nice."),
    ],
    family: t("Good with older children, especially if they already like tennis. For young children, long rallies and quiet-court etiquette can be difficult.", "Bien avec des enfants plus grands, surtout s'ils aiment deja le tennis. Pour les plus jeunes, les longs echanges et le silence autour du court peuvent etre difficiles.", "Adatto a ragazzi piu grandi, soprattutto se amano gia il tennis. Per bambini piccoli, scambi lunghi e silenzio in campo possono essere difficili.", "Добре зі старшими дітьми, особливо якщо вони вже люблять теніс. Для малюків довгі розіграші та правила тиші біля корту можуть бути складними."),
    tickets: [
      t("Ticket information should be checked through the organiser or Explore Nice Cote d'Azur. For smaller ITF-level events, access may be free or modestly priced, but do not rely on this without checking current details.", "Les informations de billetterie doivent etre verifiees via l'organisateur ou Explore Nice Cote d'Azur. Pour des tournois de ce niveau, l'acces peut etre gratuit ou peu cher, mais verifiez les details actuels.", "Le informazioni sui biglietti vanno verificate tramite organizzatore o Explore Nice Cote d'Azur. Per eventi di questo livello l'accesso puo essere gratuito o economico, ma controllare sempre i dettagli attuali.", "Інформацію про квитки варто перевіряти через організатора або Explore Nice Cote d'Azur. Для турнірів такого рівня вхід може бути безкоштовним або недорогим, але не покладайтеся на це без актуальної перевірки."),
    ],
    tips: [
      t("Later rounds are usually more interesting for casual spectators.", "Les derniers tours sont souvent plus interessants pour les spectateurs occasionnels.", "I turni finali sono di solito piu interessanti per spettatori occasionali.", "Пізніші раунди зазвичай цікавіші для нерегулярних глядачів."),
      t("Arrive earlier in the day for a calmer atmosphere and more match options.", "Arrivez plus tot dans la journee pour une atmosphere plus calme et plus de matchs possibles.", "Arriva prima nella giornata per un'atmosfera piu calma e piu partite disponibili.", "Приходьте раніше вдень для спокійнішої атмосфери та більшого вибору матчів."),
      t("Check venue rules on food, drinks and bags before going.", "Verifiez les regles du site concernant nourriture, boissons et sacs avant de partir.", "Controlla le regole della sede su cibo, bevande e borse prima di andare.", "Перед поїздкою перевірте правила локації щодо їжі, напоїв і сумок."),
    ],
    officialLinks: [
      { label: t("Explore Nice event page", "Page Explore Nice", "Pagina Explore Nice", "Сторінка Explore Nice"), href: "https://www.explorenicecotedazur.com/evenement/new-vision-nice-open/" },
    ],
  },
  "matisse-yves-saint-laurent-nice": {
    overview: [
      t("Henri Matisse - Yves Saint Laurent: Le beau, la mode et le bonheur is an exhibition dialogue between two major French creative figures of the 20th century, shown at Musee Matisse Nice from 17 June to 28 September 2026.",
        "Henri Matisse - Yves Saint Laurent : Le beau, la mode et le bonheur est une exposition-dialogue entre deux grandes figures creatives francaises du XXe siecle, presentee au Musee Matisse Nice du 17 juin au 28 septembre 2026.",
        "Henri Matisse - Yves Saint Laurent: Le beau, la mode et le bonheur e un dialogo espositivo tra due grandi figure creative francesi del Novecento, al Musee Matisse Nice dal 17 giugno al 28 settembre 2026.",
        "Henri Matisse - Yves Saint Laurent: Le beau, la mode et le bonheur - виставка-діалог двох великих французьких митців XX століття в Musee Matisse Nice з 17 червня до 28 вересня 2026 року."),
      t("The exhibition connects painting, colour, textiles, fashion and archives, making it a strong cultural day trip from Menton for art and style lovers.",
        "L'exposition relie peinture, couleur, textile, mode et archives, ce qui en fait une excellente sortie culturelle depuis Menton pour les amateurs d'art et de style.",
        "La mostra collega pittura, colore, tessuti, moda e archivi, ed e una forte gita culturale da Mentone per amanti di arte e stile.",
        "Виставка поєднує живопис, колір, текстиль, моду та архіви, тому це сильна культурна поїздка з Ментона для любителів мистецтва і стилю."),
    ],
    venues: [
      t("Musee Matisse Nice: 164 Avenue des Arenes de Cimiez, 06000 Nice.", "Musee Matisse Nice : 164 Avenue des Arenes de Cimiez, 06000 Nice.", "Musee Matisse Nice: 164 Avenue des Arenes de Cimiez, 06000 Nice.", "Musee Matisse Nice: 164 Avenue des Arenes de Cimiez, 06000 Nice."),
      t("The museum is in Cimiez, near gardens and archaeological sites above central Nice.", "Le musee se trouve a Cimiez, pres des jardins et sites archeologiques au-dessus du centre de Nice.", "Il museo si trova a Cimiez, vicino a giardini e siti archeologici sopra il centro di Nizza.", "Музей розташований у Cimiez, біля садів та археологічних пам'яток над центром Ніцци."),
    ],
    family: t("Depends on age and interests. Children aged around 10+ who enjoy art, colour or fashion may find it engaging; younger children may prefer the surrounding gardens.", "Cela depend de l'age et des centres d'interet. Les enfants d'environ 10 ans et plus interesses par l'art, la couleur ou la mode peuvent apprecier ; les plus jeunes prefereront peut-etre les jardins.", "Dipende da eta e interessi. Bambini dai 10 anni circa interessati ad arte, colore o moda possono apprezzarla; i piu piccoli potrebbero preferire i giardini intorno.", "Залежить від віку та інтересів. Дітям приблизно від 10 років, яким цікаві мистецтво, колір або мода, може сподобатися; молодші діти, можливо, більше оцінять сади поруч."),
    tickets: [
      t("Check Musee Matisse Nice and Explore Nice Cote d'Azur for current tickets, opening days and prices. Published public information has mentioned full-price access around EUR10, but always verify before visiting.", "Consultez le Musee Matisse Nice et Explore Nice Cote d'Azur pour les billets, horaires et tarifs actuels. Des informations publiques ont mentionne un plein tarif autour de 10 EUR, mais verifiez toujours avant la visite.", "Controlla Musee Matisse Nice ed Explore Nice Cote d'Azur per biglietti, giorni di apertura e prezzi. Informazioni pubbliche hanno indicato un prezzo intero intorno a 10 EUR, ma verificare sempre prima della visita.", "Перевіряйте Musee Matisse Nice та Explore Nice Cote d'Azur щодо квитків, днів роботи і цін. У публічній інформації згадувався повний квиток близько 10 EUR, але перед візитом завжди перевіряйте актуальні дані."),
    ],
    tips: [
      t("Combine the exhibition with a walk through Cimiez gardens.", "Combinez l'exposition avec une promenade dans les jardins de Cimiez.", "Abbina la mostra a una passeggiata nei giardini di Cimiez.", "Поєднайте виставку з прогулянкою садами Cimiez."),
      t("Families can add the nearby archaeological museum or open garden time for children.", "Les familles peuvent ajouter le musee archeologique voisin ou un moment dans les jardins pour les enfants.", "Le famiglie possono aggiungere il vicino museo archeologico o tempo nei giardini per i bambini.", "Сім'ї можуть додати сусідній археологічний музей або час у садах для дітей."),
      t("Avoid arriving too late in the day if you want time for both the museum and Cimiez.", "Evitez d'arriver trop tard si vous voulez profiter a la fois du musee et de Cimiez.", "Evita di arrivare troppo tardi se vuoi visitare sia il museo sia Cimiez.", "Не приїжджайте надто пізно, якщо хочете встигнути і музей, і Cimiez."),
    ],
    officialLinks: [
      { label: t("Musee Matisse Nice exhibition page", "Page exposition Musee Matisse Nice", "Pagina mostra Musee Matisse Nice", "Сторінка виставки Musee Matisse Nice"), href: "https://www.musee-matisse-nice.org/fr/exposition/henri-matisse-yves-saint-laurent-le-beau-la-mode-et-le-bonheur/" },
    ],
  },
  "jumping-international-monte-carlo": {
    overview: [
      t("Jumping International de Monte-Carlo is a premium equestrian event in Monaco, planned for 2-4 July 2026, with international show-jumping atmosphere around Port Hercule.",
        "Le Jumping International de Monte-Carlo est un evenement equestre premium a Monaco, prevu du 2 au 4 juillet 2026, avec une atmosphere internationale de saut d'obstacles autour du Port Hercule.",
        "Il Jumping International de Monte-Carlo e un evento equestre di prestigio a Monaco, previsto dal 2 al 4 luglio 2026, con atmosfera internazionale di salto ostacoli intorno a Port Hercule.",
        "Jumping International de Monte-Carlo - престижна кінна подія в Монако, запланована на 2-4 липня 2026 року, з міжнародною атмосферою конкуру біля Port Hercule."),
      t("The setting is very Riviera: horses, yachts, palm trees and the Monaco harbour in one compact summer event.",
        "Le cadre est tres Riviera : chevaux, yachts, palmiers et port de Monaco dans un evenement estival compact.",
        "L'ambiente e molto Riviera: cavalli, yacht, palme e porto di Monaco in un evento estivo compatto.",
        "Локація дуже рив'єрська: коні, яхти, пальми та порт Монако в одній компактній літній події."),
    ],
    venues: [
      t("Port Hercule, Route de la Piscine, 98000 Monaco.", "Port Hercule, Route de la Piscine, 98000 Monaco.", "Port Hercule, Route de la Piscine, 98000 Monaco.", "Port Hercule, Route de la Piscine, 98000 Monaco."),
      t("From Monaco-Monte-Carlo station, allow time to walk down toward the port.", "Depuis la gare de Monaco-Monte-Carlo, prevoyez le temps de descendre vers le port.", "Dalla stazione Monaco-Monte-Carlo, prevedi tempo per scendere verso il porto.", "Від станції Monaco-Monte-Carlo закладіть час на спуск до порту."),
    ],
    family: t("Depends on age. Children who like horses may enjoy it from around age 5+, but applause, announcements and crowds can be tiring for very young children.", "Cela depend de l'age. Les enfants qui aiment les chevaux peuvent apprecier des 5 ans environ, mais applaudissements, annonces et foule peuvent fatiguer les tout-petits.", "Dipende dall'eta. I bambini che amano i cavalli possono apprezzarlo dai 5 anni circa, ma applausi, annunci e folla possono stancare i piu piccoli.", "Залежить від віку. Дітям, які люблять коней, може бути цікаво приблизно від 5 років, але оплески, оголошення і натовп можуть втомити малюків."),
    tickets: [
      t("Tickets and access rules should be checked on the official event website. Some sessions may be free while premium competitions or numbered seats can require paid tickets.", "Billets et conditions d'acces doivent etre verifies sur le site officiel. Certaines sessions peuvent etre gratuites, tandis que les competitions premium ou places numerotees peuvent etre payantes.", "Biglietti e regole di accesso vanno verificati sul sito ufficiale. Alcune sessioni possono essere gratuite, mentre gare premium o posti numerati possono essere a pagamento.", "Квитки та правила доступу перевіряйте на офіційному сайті. Деякі сесії можуть бути безкоштовними, тоді як преміальні змагання або нумеровані місця можуть бути платними."),
    ],
    tips: [
      t("Final rounds are usually the most attractive for visitors who want the top sporting atmosphere.", "Les finales sont generalement les plus attractives pour ressentir la meilleure atmosphere sportive.", "Le finali sono di solito le piu interessanti per vivere la migliore atmosfera sportiva.", "Фінальні раунди зазвичай найцікавіші для гостей, які хочуть відчути головну спортивну атмосферу."),
      t("For families, choose a less crowded session if children mainly want to see the horses.", "En famille, choisissez une session moins frequentee si les enfants veulent surtout voir les chevaux.", "In famiglia, scegli una sessione meno affollata se i bambini vogliono soprattutto vedere i cavalli.", "Для сімей обирайте менш людну сесію, якщо дітям головне побачити коней."),
      t("Monaco harbour gets busy during events; train travel from Menton is usually simpler than parking.", "Le port de Monaco est charge pendant les evenements ; le train depuis Menton est souvent plus simple que le parking.", "Il porto di Monaco e affollato durante gli eventi; il treno da Mentone e spesso piu semplice del parcheggio.", "Порт Монако завантажений під час подій; поїзд із Ментона зазвичай простіший, ніж паркування."),
    ],
    officialLinks: [
      { label: t("Official Jumping Monaco website", "Site officiel Jumping Monaco", "Sito ufficiale Jumping Monaco", "Офіційний сайт Jumping Monaco"), href: "https://www.jumping-monaco.com/" },
    ],
  },
  "monte-carlo-summer-festival": {
    overview: [
      t("Monte-Carlo Summer Festival is a summer concert and entertainment season organised by Monte-Carlo Société des Bains de Mer, planned from 3 July to 15 August 2026.",
        "Le Monte-Carlo Summer Festival est une saison de concerts et spectacles d'ete organisee par Monte-Carlo Societe des Bains de Mer, prevue du 3 juillet au 15 aout 2026.",
        "Il Monte-Carlo Summer Festival e una stagione estiva di concerti e spettacoli organizzata da Monte-Carlo Societe des Bains de Mer, prevista dal 3 luglio al 15 agosto 2026.",
        "Monte-Carlo Summer Festival - літній сезон концертів і шоу від Monte-Carlo Societe des Bains de Mer, запланований на 3 липня - 15 серпня 2026 року."),
      t("Events are held in iconic Monaco venues such as Opéra de Monte-Carlo and Sporting Monte-Carlo, making it useful for guests who want one or two special Monaco evenings while staying by the sea in Menton.",
        "Les soirees ont lieu dans des lieux iconiques de Monaco comme l'Opera de Monte-Carlo et le Sporting Monte-Carlo, utiles pour une ou deux soirees speciales a Monaco depuis Menton.",
        "Gli eventi si svolgono in sedi iconiche come Opera de Monte-Carlo e Sporting Monte-Carlo, ideali per una o due serate speciali a Monaco partendo da Mentone.",
        "Події проходять у знакових локаціях Монако, як-от Opera de Monte-Carlo та Sporting Monte-Carlo, що зручно для одного-двох особливих вечорів у Монако під час проживання біля моря в Ментоні."),
    ],
    venues: [
      t("Sporting Monte-Carlo, Salle des Etoiles: Avenue Princesse Grace, 98000 Monaco.", "Sporting Monte-Carlo, Salle des Etoiles : Avenue Princesse Grace, 98000 Monaco.", "Sporting Monte-Carlo, Salle des Etoiles: Avenue Princesse Grace, 98000 Monaco.", "Sporting Monte-Carlo, Salle des Etoiles: Avenue Princesse Grace, 98000 Monaco."),
      t("Opéra de Monte-Carlo: Place du Casino, 98000 Monaco.", "Opera de Monte-Carlo : Place du Casino, 98000 Monaco.", "Opera de Monte-Carlo: Place du Casino, 98000 Monaco.", "Opera de Monte-Carlo: Place du Casino, 98000 Monaco."),
    ],
    family: t("Depends on the artist and evening. Some concerts can work for families with older children, but many Monaco evening shows are better suited to adults or teenagers.", "Cela depend de l'artiste et de la soiree. Certains concerts conviennent aux familles avec enfants plus grands, mais beaucoup de soirees monegasques sont plutot adultes ou adolescentes.", "Dipende dall'artista e dalla serata. Alcuni concerti possono andare bene per famiglie con ragazzi piu grandi, ma molte serate a Monaco sono piu adatte ad adulti o adolescenti.", "Залежить від артиста та вечора. Деякі концерти можуть підійти сім'ям зі старшими дітьми, але багато вечірніх шоу Монако краще для дорослих або підлітків."),
    tickets: [
      t("Tickets are sold through the Monte-Carlo SBM website and authorised ticketing partners. Prices vary widely by artist, venue and seat category.", "Les billets sont vendus via le site Monte-Carlo SBM et les partenaires autorises. Les prix varient fortement selon artiste, lieu et categorie.", "I biglietti sono venduti tramite il sito Monte-Carlo SBM e partner autorizzati. I prezzi variano molto secondo artista, sede e categoria.", "Квитки продаються через сайт Monte-Carlo SBM та авторизованих партнерів. Ціни сильно залежать від артиста, локації та категорії місця."),
    ],
    tips: [
      t("Choose the concert first, then request accommodation dates; headline evenings can drive demand.", "Choisissez d'abord le concert, puis demandez vos dates de logement ; les grandes soirees peuvent augmenter la demande.", "Scegli prima il concerto, poi richiedi le date di soggiorno; le serate principali possono aumentare la domanda.", "Спочатку оберіть концерт, потім надсилайте запит на дати проживання; головні вечори можуть підвищувати попит."),
      t("If returning to Menton late, check train times or arrange a transfer before the evening.", "Si vous rentrez tard a Menton, verifiez les trains ou organisez un transfert avant la soiree.", "Se rientri tardi a Mentone, controlla i treni o organizza un transfer prima della serata.", "Якщо повертаєтеся до Ментона пізно, перевірте поїзди або організуйте трансфер до вечора."),
      t("Dress codes can vary by venue and show; check the organiser's details.", "Les dress codes varient selon le lieu et le spectacle ; verifiez les informations de l'organisateur.", "I dress code variano secondo sede e spettacolo; controlla le indicazioni dell'organizzatore.", "Дрес-код може залежати від локації та шоу; перевіряйте інформацію організатора."),
    ],
    officialLinks: [
      { label: t("Monte-Carlo SBM festival page", "Page festival Monte-Carlo SBM", "Pagina festival Monte-Carlo SBM", "Сторінка фестивалю Monte-Carlo SBM"), href: "https://www.montecarlosbm.com/en/shows/monte-carlo-summer-festival" },
    ],
  },
  "menton-lemon-festival": {
    overview: [
      t(
        "The Lemon Festival is Menton's signature winter event: giant sculptures made from lemons and oranges in the Jardins Bioves, daytime and evening carnival parades, craft stands and themed animations around town.",
        "La Fete du Citron est l'evenement d'hiver emblematique de Menton : sculptures geantes de citrons et d'oranges dans les Jardins Bioves, corsos de jour et de nuit, marche artisanal et animations en ville.",
        "La Fete du Citron e l'evento invernale simbolo di Mentone: sculture giganti di limoni e arance nei Jardins Bioves, sfilate diurne e serali, mercato artigianale e animazioni in citta.",
        "Свято лимона - головна зимова подія Ментона: гігантські скульптури з лимонів та апельсинів у садах Bioves, денні й вечірні карнавальні кортежі, ярмарок ремесел і тематичні події в місті.",
      ),
      t(
        "The atmosphere is very family-friendly, with music, street performers, light installations and a feeling of winter sunshine on the coast. Recent editions have run for about two weeks from mid-February to early March; future dates should always be checked on the official festival site.",
        "L'ambiance est tres familiale, avec musique, artistes de rue, installations lumineuses et impression d'ete d'hiver sur la cote. Les editions recentes durent environ deux semaines entre mi-fevrier et debut mars ; les dates futures doivent toujours etre verifiees sur le site officiel.",
        "L'atmosfera e molto adatta alle famiglie, con musica, artisti di strada, installazioni luminose e una sensazione di sole invernale sulla costa. Le edizioni recenti durano circa due settimane tra meta febbraio e inizio marzo; le date future vanno sempre verificate sul sito ufficiale.",
        "Атмосфера дуже сімейна: музика, вуличні артисти, світлові інсталяції та відчуття зимового літа на узбережжі. Останні випуски тривали близько двох тижнів із середини лютого до початку березня; майбутні дати завжди варто перевіряти на офіційному сайті.",
      ),
    ],
    venues: [
      t("Citrus sculpture exhibition: Jardins Bioves, Avenue Boyer, 06500 Menton.", "Exposition des motifs d'agrumes : Jardins Bioves, Avenue Boyer, 06500 Menton.", "Esposizione delle sculture di agrumi: Jardins Bioves, Avenue Boyer, 06500 Menton.", "Виставка цитрусових фігур: Jardins Bioves, Avenue Boyer, 06500 Menton."),
      t("Parades: Promenade du Soleil and nearby seafront streets.", "Corsos : Promenade du Soleil et rues proches du bord de mer.", "Sfilate: Promenade du Soleil e vie vicine al lungomare.", "Паради: Promenade du Soleil і прилеглі вулиці вздовж моря."),
      t("Tourist information and ticket desk: Palais de l'Europe, 8 Avenue Boyer, 06500 Menton.", "Information touristique et billetterie : Palais de l'Europe, 8 Avenue Boyer, 06500 Menton.", "Informazioni turistiche e biglietteria: Palais de l'Europe, 8 Avenue Boyer, 06500 Menton.", "Туристична інформація та каси: Palais de l'Europe, 8 Avenue Boyer, 06500 Menton."),
    ],
    family: t(
      "One of the best family events in the whole calendar. For younger children, daytime parades and morning visits to the gardens are usually the easiest because crowds are lighter.",
      "L'un des meilleurs evenements familiaux de tout le calendrier. Avec de jeunes enfants, les corsos de jour et les visites des jardins le matin sont souvent les plus faciles, avec moins de foule.",
      "Uno dei migliori eventi per famiglie di tutto il calendario. Con bambini piccoli, le sfilate diurne e le visite ai giardini al mattino sono di solito piu semplici perche c'e meno folla.",
      "Одна з найкращих сімейних подій у всьому календарі. З маленькими дітьми найзручніші денні кортежі та ранкові візити до садів, коли менше людей.",
    ),
    tickets: [
      t("Tickets are usually sold online through the festival website and at the Menton tourist office.", "Les billets sont generalement vendus en ligne sur le site du festival et a l'office de tourisme de Menton.", "I biglietti sono di solito venduti online sul sito del festival e presso l'ufficio turistico di Mentone.", "Квитки зазвичай продаються онлайн на сайті фестивалю та в туристичному офісі Ментона."),
      t("Recent published prices give a rough order of magnitude: promenade parade access from about EUR16 for adults and EUR8 for children aged 6-12; grandstand seats are higher. Always check current official prices before booking.", "Les tarifs publies recemment donnent un ordre d'idee : acces promenoir aux corsos a partir d'environ 16 EUR adulte et 8 EUR enfant 6-12 ans ; les tribunes sont plus cheres. Verifiez toujours les tarifs officiels a jour.", "Le tariffe pubblicate di recente danno un ordine di grandezza: accesso in piedi alle sfilate da circa 16 EUR adulti e 8 EUR bambini 6-12 anni; le tribune costano di piu. Verificare sempre i prezzi ufficiali aggiornati.", "Останні опубліковані тарифи дають орієнтир: доступ до параду в зоні promenoir від приблизно 16 EUR для дорослого і 8 EUR для дітей 6-12 років; місця на трибунах дорожчі. Завжди перевіряйте актуальні офіційні ціни."),
    ],
    tips: [
      t("Book accommodation and key parade tickets several months ahead where possible.", "Reservez logement et billets pour les grands corsos plusieurs mois a l'avance si possible.", "Prenota alloggio e biglietti per le sfilate principali con alcuni mesi di anticipo quando possibile.", "За можливості бронюйте житло і квитки на головні паради за кілька місяців."),
      t("On parade days, streets are partly closed. If travelling by car, ask in advance about parking and access routes.", "Les jours de corso, certaines rues sont fermees. Si vous venez en voiture, demandez a l'avance les informations de parking et d'acces.", "Nei giorni di sfilata alcune strade sono chiuse. Se arrivi in auto, chiedi in anticipo informazioni su parcheggio e accesso.", "У дні парадів частину вулиць перекривають. Якщо їдете авто, заздалегідь уточнюйте паркування і під'їзд."),
      t("For sensitive children, consider ear protection and bring snacks; cafe queues grow quickly on busy weekends.", "Pour les enfants sensibles, prevoyez des protections auditives et des encas ; les files dans les cafes augmentent vite les week-ends.", "Per bambini sensibili, porta protezioni per le orecchie e snack; nei weekend affollati le code nei cafe crescono rapidamente.", "Для чутливих дітей варто взяти захист для вух і перекуси; у вихідні черги в кафе швидко ростуть."),
    ],
    officialLinks: [
      { label: t("Official Lemon Festival website", "Site officiel Fete du Citron", "Sito ufficiale Fete du Citron", "Офіційний сайт Fete du Citron"), href: "https://www.fete-du-citron.com" },
      { label: t("Menton tourist office", "Office de tourisme de Menton", "Ufficio turistico di Mentone", "Туристичний офіс Ментона"), href: "https://www.menton-riviera-merveilles.co.uk/get-planning/schedule/major-events/lemon-festival/" },
    ],
  },
  "nice-carnival": {
    overview: [
      t("Nice Carnival is one of Europe's major winter carnivals, with giant floats, illuminated shows, flower battles and a festive atmosphere across the city.", "Le Carnaval de Nice est l'un des grands carnavals d'hiver d'Europe, avec chars geants, spectacles lumineux, batailles de fleurs et ambiance festive dans toute la ville.", "Il Carnevale di Nizza e uno dei grandi carnevali invernali d'Europa, con carri giganti, spettacoli luminosi, battaglie di fiori e atmosfera festosa in tutta la citta.", "Карнавал Ніцци - один із великих зимових карнавалів Європи з гігантськими платформами, світловими шоу, квітковими баталіями та святковою атмосферою в місті."),
      t("The format usually combines classic carnival parades, evening illuminated processions and Batailles de Fleurs, where performers throw flowers from decorated floats. The 2027 edition has been announced for 9-28 February with the theme Vive l'Amour.", "Le format combine generalement corsos carnavalesques, defiles illumines en soiree et Batailles de Fleurs, ou les artistes lancent des fleurs depuis les chars. L'edition 2027 est annoncee du 9 au 28 fevrier sur le theme Vive l'Amour.", "Il formato combina di solito sfilate carnevalesche, cortei illuminati serali e Batailles de Fleurs, con fiori lanciati dai carri decorati. L'edizione 2027 e annunciata dal 9 al 28 febbraio con il tema Vive l'Amour.", "Формат зазвичай поєднує класичні карнавальні кортежі, вечірні підсвічені паради і Batailles de Fleurs, коли артисти кидають квіти з декорованих платформ. Випуск 2027 року анонсовано на 9-28 лютого з темою Vive l'Amour."),
    ],
    venues: [
      t("Main stage and grandstands: Place Massena, 06000 Nice.", "Scene principale et tribunes : Place Massena, 06000 Nice.", "Scena principale e tribune: Place Massena, 06000 Nice.", "Головна сцена і трибуни: Place Massena, 06000 Nice."),
      t("Flower battles and some parades: Promenade des Anglais and nearby seafront areas.", "Batailles de Fleurs et certains corsos : Promenade des Anglais et secteurs voisins du bord de mer.", "Battaglie dei fiori e alcune sfilate: Promenade des Anglais e zone vicine al mare.", "Квіткові баталії та частина парадів: Promenade des Anglais і прилеглі ділянки набережної."),
      t("Ticket desks are usually around Promenade du Paillon and the seafront carnival area.", "Les billetteries se trouvent generalement autour de la Promenade du Paillon et de la zone carnaval du bord de mer.", "Le biglietterie sono di solito intorno alla Promenade du Paillon e alla zona carnevale sul mare.", "Каси зазвичай розташовані біля Promenade du Paillon і карнавальної зони біля моря."),
    ],
    family: t("A strong family event. Daytime parades and flower parades are usually easiest with children; evening shows suit older children and teenagers better.", "Un evenement tres familial. Les defiles de jour et les batailles de fleurs sont souvent les plus simples avec enfants ; les soirees conviennent mieux aux plus grands.", "Un evento molto adatto alle famiglie. Le sfilate diurne e quelle floreali sono di solito piu facili con bambini; gli spettacoli serali sono migliori per ragazzi piu grandi.", "Дуже сімейна подія. Денні кортежі та квіткові паради зазвичай найзручніші з дітьми; вечірні шоу краще підходять старшим дітям і підліткам."),
    tickets: [
      t("Tickets are sold online on the official carnival website and at local ticket desks.", "Les billets sont vendus en ligne sur le site officiel du carnaval et aux billetteries locales.", "I biglietti sono venduti online sul sito ufficiale del carnevale e nelle biglietterie locali.", "Квитки продаються онлайн на офіційному сайті карнавалу та в місцевих касах."),
      t("Recent published ranges: grandstand seats around EUR23-31 for adults and around EUR10-11 for children aged 6-12; standing areas around EUR14 adults and EUR5 children. Check the official site for current prices.", "Ordres de prix recents : tribunes autour de 23-31 EUR adulte et 10-11 EUR enfant 6-12 ans ; zones debout autour de 14 EUR adulte et 5 EUR enfant. Verifiez les tarifs actuels sur le site officiel.", "Fasce recenti: tribune circa 23-31 EUR adulti e 10-11 EUR bambini 6-12 anni; zone in piedi circa 14 EUR adulti e 5 EUR bambini. Controllare i prezzi attuali sul sito ufficiale.", "Орієнтовні останні тарифи: трибуни близько 23-31 EUR для дорослих і 10-11 EUR для дітей 6-12 років; стоячі зони близько 14 EUR для дорослих і 5 EUR для дітей. Актуальні ціни перевіряйте на офіційному сайті."),
    ],
    tips: [
      t("From Menton, the train to Nice Ville is usually simpler than driving on parade days.", "Depuis Menton, le train jusqu'a Nice Ville est souvent plus simple que la voiture les jours de defile.", "Da Mentone, il treno per Nice Ville e spesso piu semplice dell'auto nei giorni di sfilata.", "З Ментона поїзд до Nice Ville зазвичай простіший, ніж авто в дні парадів."),
      t("With children, grandstand seats can make the experience calmer than standing in dense crowds.", "Avec enfants, les places en tribune peuvent rendre l'experience plus calme que les zones debout tres denses.", "Con bambini, i posti in tribuna possono rendere l'esperienza piu tranquilla rispetto alla folla in piedi.", "З дітьми місця на трибунах можуть бути спокійнішими, ніж стояння у щільному натовпі."),
      t("February evenings can feel cool by the sea; bring warm layers and scarves.", "Les soirees de fevrier peuvent etre fraiches au bord de mer ; prevoyez des couches chaudes et des echarpes.", "Le sere di febbraio possono essere fresche sul mare; porta strati caldi e sciarpe.", "Лютневі вечори біля моря прохолодні; візьміть теплий одяг і шарфи."),
    ],
    officialLinks: [
      { label: t("Official Nice Carnival website", "Site officiel Carnaval de Nice", "Sito ufficiale Carnevale di Nizza", "Офіційний сайт Карнавалу Ніцци"), href: "https://www.nicecarnaval.com/en/" },
    ],
  },
  "menton-music-festival": {
    overview: [
      t("The Menton Music Festival is one of France's oldest classical music festivals, created in 1950, with evening open-air concerts by the Basilique Saint-Michel and chamber performances in historic venues.", "Le Festival de Musique de Menton est l'un des plus anciens festivals de musique classique en France, cree en 1950, avec concerts du soir en plein air pres de la basilique Saint-Michel et concerts de chambre dans des lieux historiques.", "Il Festival de Musique de Menton e uno dei piu antichi festival francesi di musica classica, nato nel 1950, con concerti serali all'aperto presso la basilica Saint-Michel e appuntamenti da camera in luoghi storici.", "Фестиваль музики в Ментоні - один із найстаріших фестивалів класичної музики у Франції, заснований у 1950 році, з вечірніми концертами просто неба біля базиліки Saint-Michel і камерними виступами в історичних залах."),
      t("The 77th edition is announced for 25 July-7 August 2026, with concerts on the Parvis de la Basilique Saint-Michel, at the Palais de l'Europe and in Parc du Pian. The mood is very Riviera: sunset, sea air, a lit baroque facade and an audience of music lovers and curious travellers.", "La 77e edition est annoncee du 25 juillet au 7 aout 2026, avec concerts sur le Parvis de la Basilique Saint-Michel, au Palais de l'Europe et au Parc du Pian. L'ambiance est tres Riviera : coucher de soleil, air marin, facade baroque illuminee et public de melomanes comme de voyageurs curieux.", "La 77a edizione e annunciata dal 25 luglio al 7 agosto 2026, con concerti sul Parvis de la Basilique Saint-Michel, al Palais de l'Europe e nel Parc du Pian. L'atmosfera e molto Riviera: tramonto, aria di mare, facciata barocca illuminata e pubblico di appassionati e viaggiatori curiosi.", "77-й випуск анонсовано на 25 липня - 7 серпня 2026 року, з концертами на Parvis de la Basilique Saint-Michel, у Palais de l'Europe та Parc du Pian. Атмосфера дуже рив'єрська: захід сонця, морське повітря, підсвічений бароковий фасад і публіка з меломанів та допитливих мандрівників."),
    ],
    venues: [
      t("Parvis de la Basilique Saint-Michel: Parvis Saint-Michel, 06500 Menton.", "Parvis de la Basilique Saint-Michel : Parvis Saint-Michel, 06500 Menton.", "Parvis de la Basilique Saint-Michel: Parvis Saint-Michel, 06500 Menton.", "Parvis de la Basilique Saint-Michel: Parvis Saint-Michel, 06500 Menton."),
      t("Palais de l'Europe: 8 Avenue Boyer, 06500 Menton.", "Palais de l'Europe : 8 Avenue Boyer, 06500 Menton.", "Palais de l'Europe: 8 Avenue Boyer, 06500 Menton.", "Palais de l'Europe: 8 Avenue Boyer, 06500 Menton."),
      t("Parc du Pian: Route de Gorbio, 06500 Menton.", "Parc du Pian : Route de Gorbio, 06500 Menton.", "Parc du Pian: Route de Gorbio, 06500 Menton.", "Parc du Pian: Route de Gorbio, 06500 Menton."),
    ],
    family: t("Best with older children or calm teenagers who enjoy music. Long evening concerts can be difficult for small children.", "Mieux avec des enfants plus grands ou des adolescents calmes qui aiment la musique. Les longs concerts du soir peuvent etre difficiles pour les petits.", "Meglio con ragazzi piu grandi o adolescenti tranquilli che amano la musica. I lunghi concerti serali possono essere difficili per bambini piccoli.", "Найкраще зі старшими дітьми або спокійними підлітками, яким цікава музика. Довгі вечірні концерти можуть бути складними для малюків."),
    tickets: [
      t("Tickets are sold online on the festival website and via the Menton tourist office at Palais de l'Europe.", "Les billets sont vendus en ligne sur le site du festival et via l'office de tourisme de Menton au Palais de l'Europe.", "I biglietti sono venduti online sul sito del festival e tramite l'ufficio turistico di Mentone al Palais de l'Europe.", "Квитки продаються онлайн на сайті фестивалю та через туристичний офіс Ментона в Palais de l'Europe."),
      t("For 2026, published ranges mention Parvis concerts around EUR25-50 depending on seat category, and Palais de l'Europe concerts around EUR20-35. Check the official site before booking.", "Pour 2026, les fourchettes publiees indiquent environ 25-50 EUR pour les concerts du Parvis selon la categorie, et 20-35 EUR au Palais de l'Europe. Verifiez le site officiel avant reservation.", "Per il 2026, le fasce pubblicate indicano circa 25-50 EUR per i concerti sul Parvis secondo categoria, e 20-35 EUR al Palais de l'Europe. Controllare il sito ufficiale prima di prenotare.", "Для 2026 року опубліковані діапазони вказують близько 25-50 EUR для концертів на Parvis залежно від категорії місця і 20-35 EUR у Palais de l'Europe. Перед бронюванням перевіряйте офіційний сайт."),
    ],
    tips: [
      t("Book major evenings early, especially opening nights or famous soloists.", "Reservez les grandes soirees tot, surtout ouverture et solistes connus.", "Prenota presto le serate principali, soprattutto apertura e solisti famosi.", "Бронюйте головні вечори заздалегідь, особливо відкриття та виступи відомих солістів."),
      t("The Parvis Saint-Michel involves old-town steps; wear comfortable shoes or choose Palais de l'Europe concerts if stairs are difficult.", "Le Parvis Saint-Michel implique des marches dans la vieille ville ; prevoyez des chaussures confortables ou choisissez le Palais de l'Europe si les escaliers sont difficiles.", "Il Parvis Saint-Michel richiede scale nel centro storico; indossa scarpe comode o scegli il Palais de l'Europe se le scale sono difficili.", "До Parvis Saint-Michel ведуть сходи старого міста; взуйте зручне взуття або оберіть концерти в Palais de l'Europe, якщо сходи складні."),
      t("Even after a hot day, sea breeze can make evenings cool. Bring a light jacket or shawl.", "Meme apres une journee chaude, la brise marine peut rafraichir la soiree. Prenez veste legere ou chale.", "Anche dopo una giornata calda, la brezza marina puo rendere fresca la sera. Porta una giacca leggera o uno scialle.", "Навіть після спекотного дня морський бриз може охолодити вечір. Візьміть легку куртку або плед."),
    ],
    officialLinks: [
      { label: t("Official festival website", "Site officiel du festival", "Sito ufficiale del festival", "Офіційний сайт фестивалю"), href: "https://www.festival-musique-menton.fr" },
    ],
  },
  "monaco-grand-prix": {
    overview: [
      t("The Formula 1 Monaco Grand Prix is one of the most iconic weekends on the Cote d'Azur: practice, qualifying and the race itself take place on the streets of the Principality.", "Le Grand Prix de Formule 1 de Monaco est l'un des week-ends les plus iconiques de la Cote d'Azur : essais, qualifications et course se deroulent dans les rues de la Principaute.", "Il Gran Premio di Formula 1 di Monaco e uno dei weekend piu iconici della Costa Azzurra: prove, qualifiche e gara si svolgono sulle strade del Principato.", "Гран-прі Формули-1 у Монако - один із найзнаковіших вікендів Лазурового берега: практики, кваліфікація і гонка проходять вулицями князівства."),
      t("The atmosphere mixes motorsport and Riviera social life: yachts in the harbour, fan zones, terrace viewing and very high prices across Monaco and nearby towns.", "L'atmosphere mele sport automobile et vie mondaine Riviera : yachts dans le port, fan zones, terrasses et prix tres eleves a Monaco et dans les villes voisines.", "L'atmosfera unisce motorsport e vita mondana della Riviera: yacht nel porto, fan zone, terrazze e prezzi molto alti a Monaco e nelle localita vicine.", "Атмосфера поєднує автоспорт і світське життя Рив'єри: яхти в порту, фан-зони, тераси для перегляду і дуже високі ціни в Монако та поруч."),
    ],
    venues: [
      t("Circuit area: streets around Port Hercule, Casino, the tunnel and central Monaco. A useful guest reference is Port Hercule, 98000 Monaco.", "Zone du circuit : rues autour du Port Hercule, du Casino, du tunnel et du centre de Monaco. Point de repere utile : Port Hercule, 98000 Monaco.", "Area del circuito: strade intorno a Port Hercule, Casino, tunnel e centro di Monaco. Riferimento utile: Port Hercule, 98000 Monaco.", "Зона траси: вулиці навколо Port Hercule, Casino, тунелю та центру Монако. Зручний орієнтир: Port Hercule, 98000 Monaco."),
      t("By train from Menton: Gare de Monaco-Monte-Carlo, with exits toward the port and casino area.", "En train depuis Menton : Gare de Monaco-Monte-Carlo, avec sorties vers le port et le casino.", "In treno da Mentone: Gare de Monaco-Monte-Carlo, con uscite verso porto e casino.", "Поїздом із Ментона: Gare de Monaco-Monte-Carlo, з виходами до порту і району казино."),
    ],
    family: t("Good with older children who already enjoy racing. For small children, the crowds, noise and long day can be too intense.", "Bien avec des enfants plus grands deja interesses par la course. Pour les petits, foule, bruit et longue journee peuvent etre trop intenses.", "Adatto a ragazzi piu grandi gia interessati alle corse. Per bambini piccoli folla, rumore e giornata lunga possono essere troppo intensi.", "Добре зі старшими дітьми, які вже цікавляться гонками. Для малюків натовп, шум і довгий день можуть бути надто інтенсивними."),
    tickets: [
      t("Official organiser: Automobile Club de Monaco. Tickets are sold through ACM and authorised ticket services.", "Organisateur officiel : Automobile Club de Monaco. Les billets sont vendus via l'ACM et les services autorises.", "Organizzatore ufficiale: Automobile Club de Monaco. I biglietti sono venduti tramite ACM e servizi autorizzati.", "Офіційний організатор: Automobile Club de Monaco. Квитки продаються через ACM та авторизовані сервіси."),
      t("Prices vary sharply by day and sector, from high grandstand prices to VIP, yacht and terrace packages. Treat Monaco GP as a very high-demand, high-price weekend and verify all details officially.", "Les prix varient fortement selon le jour et le secteur, des tribunes aux packages VIP, yachts et terrasses. Considerez le GP de Monaco comme un week-end tres demande et tres cher, et verifiez tout officiellement.", "I prezzi cambiano molto per giorno e settore, dalle tribune ai pacchetti VIP, yacht e terrazze. Considera il GP di Monaco un weekend di altissima domanda e prezzi elevati, da verificare sempre ufficialmente.", "Ціни сильно залежать від дня і сектора: від дорогих трибун до VIP-пакетів, яхт і терас. Вважайте GP Monaco вікендом дуже високого попиту і високих цін та перевіряйте все офіційно."),
    ],
    tips: [
      t("From Menton, train travel is usually the most practical option on race days.", "Depuis Menton, le train est generalement l'option la plus pratique les jours de course.", "Da Mentone, il treno e di solito l'opzione piu pratica nei giorni di gara.", "З Ментона поїзд зазвичай найпрактичніший варіант у дні гонки."),
      t("Book Menton accommodation early: even though the race is in Monaco, demand rises across the eastern Riviera.", "Reservez votre logement a Menton tot : meme si la course est a Monaco, la demande augmente sur toute la Riviera orientale.", "Prenota presto l'alloggio a Mentone: anche se la gara e a Monaco, la domanda cresce in tutta la Riviera orientale.", "Бронюйте житло в Ментоні рано: хоча гонка в Монако, попит зростає на всій східній Рив'єрі."),
      t("With older children, consider practice or qualifying for a shorter and slightly less intense experience than race day.", "Avec de grands enfants, envisagez essais ou qualifications pour une experience plus courte et un peu moins intense que la course.", "Con ragazzi piu grandi, valuta prove o qualifiche per un'esperienza piu breve e meno intensa del giorno gara.", "Зі старшими дітьми розгляньте практику або кваліфікацію як коротший і менш напружений формат, ніж день гонки."),
    ],
    officialLinks: [
      { label: t("Automobile Club de Monaco", "Automobile Club de Monaco", "Automobile Club de Monaco", "Automobile Club de Monaco"), href: "https://www.acm.mc" },
    ],
  },
  "nice-jazz-fest": {
    overview: [
      t("Nice Jazz Fest is a major summer music festival in Nice, mixing international names with contemporary jazz, soul, fusion and related styles over several evenings.", "Nice Jazz Fest est un grand festival musical estival a Nice, entre artistes internationaux, jazz contemporain, soul, fusion et styles voisins pendant plusieurs soirees.", "Nice Jazz Fest e un grande festival musicale estivo a Nizza, con nomi internazionali, jazz contemporaneo, soul, fusion e generi affini per piu serate.", "Nice Jazz Fest - великий літній музичний фестиваль у Ніцці, що поєднує міжнародних артистів, сучасний джаз, соул, ф'южн і суміжні жанри протягом кількох вечорів."),
      t("Because the format is open-air with several stages, it works well with a 2-4 night Riviera stay and a calmer seaside base in Menton.", "Comme le format est en plein air avec plusieurs scenes, il se combine bien avec un sejour Riviera de 2 a 4 nuits et une base plus calme a Menton.", "Poiche il formato e all'aperto con piu palchi, si abbina bene a un soggiorno in Riviera di 2-4 notti con base piu tranquilla a Mentone.", "Завдяки формату просто неба з кількома сценами його зручно поєднати з перебуванням на Рив'єрі на 2-4 ночі та спокійнішою базою в Ментоні."),
    ],
    venues: [
      t("Typical central location: Theatre de Verdure and Jardins Albert 1er, near Place Massena, 06000 Nice. Venues can vary slightly by edition.", "Lieu central habituel : Theatre de Verdure et Jardins Albert 1er, pres de la Place Massena, 06000 Nice. Les lieux peuvent legerement varier selon l'edition.", "Sede centrale abituale: Theatre de Verdure e Jardins Albert 1er, vicino a Place Massena, 06000 Nice. Le sedi possono variare leggermente secondo edizione.", "Типова центральна локація: Theatre de Verdure та Jardins Albert 1er біля Place Massena, 06000 Nice. Локації можуть трохи змінюватися залежно від випуску."),
    ],
    family: t("Not a children's festival, but some evenings can suit teenagers who enjoy live music. For small children, late hours, volume and crowds may be uncomfortable.", "Ce n'est pas un festival pour enfants, mais certaines soirees peuvent convenir aux adolescents qui aiment la musique live. Pour les petits, horaires tardifs, volume et foule peuvent etre inconfortables.", "Non e un festival per bambini, ma alcune serate possono andare bene per adolescenti che amano la musica dal vivo. Per bambini piccoli, orari tardi, volume e folla possono essere scomodi.", "Це не дитячий фестиваль, але окремі вечори можуть підійти підліткам, які люблять живу музику. Для малюків пізній час, гучність і натовп можуть бути незручними."),
    tickets: [
      t("Tickets are sold online on the official festival website, usually as single-evening tickets and multi-day passes.", "Les billets sont vendus en ligne sur le site officiel, generalement en billets soiree et pass plusieurs jours.", "I biglietti sono venduti online sul sito ufficiale, di solito come biglietti serali e pass di piu giorni.", "Квитки продаються онлайн на офіційному сайті, зазвичай як квитки на один вечір і абонементи на кілька днів."),
      t("Past years suggest a rough range from about EUR40-50 for an evening ticket, with higher prices for passes or premium options. Check the current programme and prices before booking.", "Les annees precedentes donnent un ordre d'idee autour de 40-50 EUR pour une soiree, avec tarifs plus eleves pour pass ou options premium. Verifiez programme et prix actuels avant reservation.", "Gli anni passati indicano un ordine di circa 40-50 EUR per una serata, con prezzi piu alti per pass o opzioni premium. Verificare programma e prezzi attuali prima di prenotare.", "Попередні роки дають орієнтир близько 40-50 EUR за вечірній квиток, з вищими цінами на абонементи чи преміум-опції. Перевіряйте актуальну програму і ціни перед бронюванням."),
    ],
    tips: [
      t("Concerts can finish late. If staying in Menton, check the last train or plan a night transfer in advance.", "Les concerts peuvent finir tard. Si vous logez a Menton, verifiez le dernier train ou prevoyez un transfert de nuit.", "I concerti possono finire tardi. Se soggiorni a Mentone, controlla l'ultimo treno o organizza in anticipo un transfer notturno.", "Концерти можуть закінчуватися пізно. Якщо живете в Ментоні, перевірте останній поїзд або заздалегідь сплануйте нічний трансфер."),
      t("July days are hot: light clothes, water and a hat are useful before the evening concerts.", "Les journees de juillet sont chaudes : vetements legers, eau et chapeau sont utiles avant les concerts du soir.", "Le giornate di luglio sono calde: abiti leggeri, acqua e cappello sono utili prima dei concerti serali.", "Липневі дні спекотні: легкий одяг, вода і капелюх стануть у пригоді перед вечірніми концертами."),
      t("Book early for headline evenings if a specific artist matters to you.", "Reservez tot les soirees les plus demandees si un artiste precis compte pour vous.", "Prenota presto le serate principali se ti interessa un artista specifico.", "Бронюйте заздалегідь найпопулярніші вечори, якщо вам важливий конкретний артист."),
    ],
    officialLinks: [
      { label: t("Official Nice Jazz Fest website", "Site officiel Nice Jazz Fest", "Sito ufficiale Nice Jazz Fest", "Офіційний сайт Nice Jazz Fest"), href: "https://www.nicejazzfestival.fr" },
    ],
  },
};

export function getEventDetail(slug: string) {
  if (slug === summerOnTheRivieraEvent.slug) return summerOnTheRivieraEvent;

  const event = getRivieraEvent(slug);
  if (!event) return undefined;

  return {
    ...event,
    detailContent: eventDetailsBySlug[event.slug] ?? event.detailContent,
  };
}

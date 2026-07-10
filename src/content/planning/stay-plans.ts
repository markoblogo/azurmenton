import type { Locale } from "@/i18n/locales";

export type LocalizedText = Record<Locale, string>;

export type StayPlan = {
  id: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  duration: LocalizedText;
  bestFor: LocalizedText;
  transportNote: LocalizedText;
  primaryGuideSlug: string;
  featuredOnGuide?: boolean;
  relatedStaySlug?: string;
  relatedGuideSlugs: string[];
  relatedPlaceIds: string[];
  relatedApartmentSlugs: string[];
  transportDestinationIds: string[];
};

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });

export const stayPlans: StayPlan[] = [
  {
    id: "one-day-without-car",
    title: t("One day in Menton without a car", "Une journee a Menton sans voiture", "Un giorno a Mentone senza auto", "Один день у Ментоні без авто"),
    excerpt: t("Old town, a market stop, Sablettes beach and a walkable seafront day from a central base.", "Vieille ville, marche, plage des Sablettes et journee a pied sur le front de mer depuis une base centrale.", "Centro storico, mercato, spiaggia Sablettes e una giornata sul lungomare a piedi da una base centrale.", "Старе місто, ринок, пляж Салетт і день на набережній пішки від центральної бази."),
    duration: t("1 day", "1 jour", "1 giorno", "1 день"),
    bestFor: t("car-free stays", "sejours sans voiture", "soggiorni senza auto", "відпочинок без авто"),
    transportNote: t("Walk from the seafront and use the station only for an optional evening or next-day trip.", "Marchez depuis le front de mer et gardez la gare pour une sortie facultative le soir ou le lendemain.", "Muoviti a piedi dal lungomare e usa la stazione solo per una gita facoltativa la sera o il giorno dopo.", "Ходіть пішки від набережної, а станцію залиште для необов'язкової вечірньої чи наступної поїздки."),
    primaryGuideSlug: "menton-one-day-itinerary",
    featuredOnGuide: true,
    relatedStaySlug: "menton-without-a-car",
    relatedGuideSlugs: ["menton-one-day-itinerary", "menton-without-a-car", "public-transport-in-menton"],
    relatedPlaceIds: ["halles-du-marche", "plage-sablettes", "rue-saint-michel-menton"],
    relatedApartmentSlugs: ["sea-view-balcony-studio", "panoramic-sea-view-studio"],
    transportDestinationIds: ["monaco", "ventimiglia"],
  },
  {
    id: "family-menton",
    title: t("Menton with children", "Menton avec enfants", "Mentone con bambini", "Ментон з дітьми"),
    excerpt: t("Beach time, short walks, simple food stops and apartment space that keeps the trip manageable.", "Plage, petites balades, adresses simples et espace d'appartement pour garder un sejour fluide.", "Spiaggia, brevi passeggiate, soste semplici e spazio in appartamento per rendere il viaggio gestibile.", "Пляж, короткі прогулянки, прості зупинки для їжі й простір в апартаментах."),
    duration: t("1-3 days", "1-3 jours", "1-3 giorni", "1-3 дні"),
    bestFor: t("families", "familles", "famiglie", "сім'ї"),
    transportNote: t("Keep the centre walkable; use the train only for an optional family day in Monaco or Nice.", "Gardez le centre a pied; utilisez le train seulement pour une journee familiale facultative a Monaco ou Nice.", "Mantieni il centro percorribile a piedi; usa il treno solo per una gita familiare facoltativa a Monaco o Nizza.", "Залишайте центр пішохідним, а потяг використовуйте лише для додаткової сімейної поїздки до Монако чи Ніцци."),
    primaryGuideSlug: "menton-with-kids-family-guide",
    featuredOnGuide: true,
    relatedGuideSlugs: ["menton-with-kids-family-guide", "best-beaches-in-menton", "best-ice-cream-menton"],
    relatedPlaceIds: ["plage-sablettes", "promenade-du-soleil", "halles-du-marche"],
    relatedApartmentSlugs: ["beachside-family-apartment", "sea-view-balcony-studio"],
    transportDestinationIds: ["villages"],
  },
  {
    id: "summer-heat",
    title: t("Hot summer days", "Journees de chaleur estivale", "Giornate estive calde", "Спекотні літні дні"),
    excerpt: t("Early walks, shaded pauses, beaches with timing, and air-conditioned apartments between outings.", "Balades tot, pauses a l'ombre, plages au bon moment et appartements climatises entre deux sorties.", "Passeggiate presto, pause all'ombra, spiagge negli orari giusti e appartamenti climatizzati tra le uscite.", "Ранні прогулянки, тіньові паузи, пляжі у правильний час і кондиціоновані апартаменти між виходами."),
    duration: t("Summer stay", "Sejour d'ete", "Soggiorno estivo", "Літня поїздка"),
    bestFor: t("July to early September", "juillet a debut septembre", "luglio-inizio settembre", "липень - початок вересня"),
    transportNote: t("Use early trains for Nice or Monaco and return to Menton for the cooler part of the day.", "Prenez les trains tot vers Nice ou Monaco et revenez a Menton pour la partie plus fraiche de la journee.", "Prendi i treni presto per Nizza o Monaco e torna a Mentone per la parte piu fresca della giornata.", "Їдьте ранніми потягами до Ніцци чи Монако й повертайтеся до Ментона на прохолоднішу частину дня."),
    primaryGuideSlug: "stay-cool-in-menton-summer",
    featuredOnGuide: true,
    relatedStaySlug: "sea-view-apartment-menton",
    relatedGuideSlugs: ["stay-cool-in-menton-summer", "best-beaches-in-menton", "menton-in-autumn"],
    relatedPlaceIds: ["plage-casino", "jardin-val-rahmeh", "musee-jean-cocteau-bastion"],
    relatedApartmentSlugs: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
    transportDestinationIds: ["nice", "monaco"],
  },
  {
    id: "monaco-event-weekend",
    title: t("Monaco event weekend from Menton", "Week-end evenement a Monaco depuis Menton", "Weekend evento a Monaco da Mentone", "Вікенд події в Монако з Ментона"),
    excerpt: t("Use Menton as a calmer seaside base, then plan train access and returns before the busy event days.", "Utilisez Menton comme base balneaire plus calme, puis prevoyez train et retour avant les jours charges.", "Usa Mentone come base sul mare piu tranquilla, poi pianifica treno e rientro prima dei giorni affollati.", "Зробіть Ментон спокійнішою морською базою, а потяг і повернення плануйте до завантажених днів."),
    duration: t("Weekend", "Week-end", "Weekend", "Вікенд"),
    bestFor: t("Monaco events", "evenements a Monaco", "eventi a Monaco", "події в Монако"),
    transportNote: t("Use the direct regional train and check the last return after major evening events.", "Utilisez le train regional direct et verifiez le dernier retour apres les grandes soirees.", "Usa il treno regionale diretto e verifica l'ultimo rientro dopo i grandi eventi serali.", "Користуйтеся прямим регіональним потягом і перевіряйте останнє повернення після великих вечірніх подій."),
    primaryGuideSlug: "monaco-events-from-menton",
    featuredOnGuide: true,
    relatedStaySlug: "monaco-events-from-menton",
    relatedGuideSlugs: ["monaco-events-from-menton", "day-trips-from-menton", "public-transport-in-menton"],
    relatedPlaceIds: ["grimaldi-forum-monaco", "opera-de-monte-carlo", "oceanographic-museum-monaco"],
    relatedApartmentSlugs: ["sea-view-balcony-studio", "beachside-family-apartment", "panoramic-sea-view-studio"],
    transportDestinationIds: ["monaco"],
  },
  {
    id: "italian-riviera-day",
    title: t("Italian Riviera day from Menton", "Une journee sur la Riviera italienne", "Una giornata in Riviera italiana", "День на Італійській Рив'єрі"),
    excerpt: t("A simple train day for Ventimiglia, Bordighera or Sanremo, with Menton as the easy return base.", "Une journee simple en train vers Vintimille, Bordighera ou Sanremo, avec Menton comme base de retour facile.", "Una semplice gita in treno a Ventimiglia, Bordighera o Sanremo, con Mentone come base per il rientro.", "Проста поїздка потягом до Вентімільї, Бордігери чи Санремо з Ментоном як зручною базою для повернення."),
    duration: t("Full day", "Journee complete", "Giornata intera", "Повний день"),
    bestFor: t("Italy by train", "Italie en train", "Italia in treno", "Італія потягом"),
    transportNote: t("Use the direct train to Ventimiglia; check onward connections before continuing to Bordighera or Sanremo.", "Prenez le train direct pour Vintimille; verifiez les correspondances avant de continuer vers Bordighera ou Sanremo.", "Usa il treno diretto per Ventimiglia e controlla le coincidenze prima di proseguire per Bordighera o Sanremo.", "Сідайте на прямий потяг до Вентімільї та перевіряйте пересадки перед продовженням до Бордігери чи Санремо."),
    primaryGuideSlug: "italian-riviera-day-trip-from-menton",
    featuredOnGuide: true,
    relatedGuideSlugs: ["italian-riviera-day-trip-from-menton", "day-trips-from-menton", "public-transport-in-menton"],
    relatedPlaceIds: ["ventimiglia", "ventimiglia-station", "teatro-ariston-sanremo"],
    relatedApartmentSlugs: ["sea-view-balcony-studio", "panoramic-sea-view-studio"],
    transportDestinationIds: ["ventimiglia"],
  },
  {
    id: "culture-evening-riviera",
    title: t("Culture evening near Menton", "Une soiree culturelle pres de Menton", "Una serata culturale vicino a Mentone", "Культурний вечір поблизу Ментона"),
    excerpt: t("Opera, theatre, museums or live music in Monaco and Nice, then a quieter return to Menton.", "Opera, theatre, musees ou musique live a Monaco et Nice, puis retour plus calme a Menton.", "Opera, teatro, musei o musica dal vivo a Monaco e Nizza, poi un ritorno piu tranquillo a Mentone.", "Опера, театр, музеї чи жива музика в Монако та Ніцці, а потім спокійніше повернення до Ментона."),
    duration: t("Evening", "Soiree", "Serata", "Вечір"),
    bestFor: t("culture lovers", "amateurs de culture", "amanti della cultura", "поціновувачі культури"),
    transportNote: t("Choose a programme with a realistic last train or arrange a return plan before buying tickets.", "Choisissez un programme compatible avec le dernier train ou prevoyez le retour avant d'acheter les billets.", "Scegli un programma compatibile con l'ultimo treno o pianifica il rientro prima di acquistare i biglietti.", "Оберіть програму з реалістичним останнім потягом або сплануйте повернення до купівлі квитків."),
    primaryGuideSlug: "theatre-opera-performing-arts-near-menton",
    featuredOnGuide: true,
    relatedGuideSlugs: ["theatre-opera-performing-arts-near-menton", "museums-in-menton-nice-monaco", "jazz-live-music-near-menton"],
    relatedPlaceIds: ["opera-de-monte-carlo", "theatre-princesse-grace-monaco", "opera-de-nice"],
    relatedApartmentSlugs: ["sea-view-balcony-studio", "panoramic-sea-view-studio"],
    transportDestinationIds: ["monaco", "nice"],
  },
];

import type { LocalizedText } from "@/content/guide";
import type { Locale } from "@/i18n/locales";

export type GuideAuthoritySource = {
  label: LocalizedText;
  url: string;
};

export type GuideAuthorityPlan = {
  title: LocalizedText;
  intro: LocalizedText;
  steps: Array<{ label: LocalizedText; text: LocalizedText }>;
};

export type GuideAuthorityProfile = {
  author: LocalizedText;
  reviewedAt: string;
  reviewNote: LocalizedText;
  sources: GuideAuthoritySource[];
  plan: GuideAuthorityPlan;
};

export type LocalizedGuideAuthorityProfile = Omit<GuideAuthorityProfile, "author" | "reviewNote" | "sources" | "plan"> & {
  author: string;
  reviewNote: string;
  sources: Array<{ label: string; url: string }>;
  plan: {
    title: string;
    intro: string;
    steps: Array<{ label: string; text: string }>;
  };
};

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });

const editorialTeam = t("Azur Menton editorial team", "Equipe editoriale Azur Menton", "Redazione Azur Menton", "Редакція Azur Menton");
const reviewNote = t(
  "This is an editorial plan. Check current hours, transport and venue details with the linked source before travelling.",
  "Il s'agit d'un plan editorial. Verifiez les horaires, transports et details du lieu aupres de la source liee avant de partir.",
  "Questo e un piano editoriale. Verifica orari, trasporti e dettagli del luogo con la fonte collegata prima di partire.",
  "Це редакційний план. Перед поїздкою перевірте години роботи, транспорт і деталі місця за посиланням на джерело.",
);

const sources = {
  mentonTourism: { label: t("Menton Riviera & Merveilles", "Menton Riviera & Merveilles", "Menton Riviera & Merveilles", "Menton Riviera & Merveilles"), url: "https://www.menton-riviera-merveilles.fr/" },
  sncf: { label: t("SNCF Connect", "SNCF Connect", "SNCF Connect", "SNCF Connect"), url: "https://www.sncf-connect.com/" },
  zou: { label: t("Zou! regional transport", "Transport regional Zou!", "Trasporto regionale Zou!", "Регіональний транспорт Zou!"), url: "https://zou.maregionsud.fr/" },
  niceAirport: { label: t("Nice Cote d'Azur Airport", "Aeroport Nice Cote d'Azur", "Aeroporto Nice Cote d'Azur", "Аеропорт Ніцца Лазурний Берег"), url: "https://www.nice.aeroport.fr/" },
  visitMonaco: { label: t("Visit Monaco", "Visit Monaco", "Visit Monaco", "Visit Monaco"), url: "https://www.visitmonaco.com/" },
};

const plans = {
  foodWalk: {
    title: t("A real Menton plan", "Un vrai plan pour Menton", "Un vero piano per Mentone", "Реальний план для Ментона"),
    intro: t("Keep this as one easy town-centre stop rather than a full-day itinerary.", "Gardez cette idee comme une halte simple au centre, plutot qu'un programme d'une journee.", "Tieni questa idea come una semplice tappa in centro, non come un programma per l'intera giornata.", "Сприймайте це як одну просту зупинку в центрі, а не як програму на цілий день."),
    steps: [
      { label: t("Start", "Commencer", "Inizio", "Початок"), text: t("Begin near the centre or market area.", "Commencez pres du centre ou du marche.", "Inizia vicino al centro o al mercato.", "Почніть біля центру або ринку.") },
      { label: t("Shape", "Rythme", "Ritmo", "Ритм"), text: t("Choose one or two stops and leave room to wander.", "Choisissez une ou deux adresses et gardez du temps pour flaner.", "Scegli uno o due indirizzi e lascia spazio per passeggiare.", "Оберіть одну-дві зупинки й залиште час для прогулянки.") },
      { label: t("Return", "Retour", "Rientro", "Повернення"), text: t("Use a central apartment as the easy base between plans.", "Gardez un appartement central comme base simple entre deux sorties.", "Usa un appartamento centrale come base comoda tra un programma e l'altro.", "Використовуйте центральні апартаменти як зручну базу між планами.") },
    ],
  },
  trainDay: {
    title: t("A real Menton plan", "Un vrai plan pour Menton", "Un vero piano per Mentone", "Реальний план для Ментона"),
    intro: t("Make one destination the focus, then keep the return simple.", "Faites d'une seule destination le point fort de la journee, puis gardez un retour simple.", "Fai di una sola destinazione il punto forte della giornata, poi rendi semplice il rientro.", "Зробіть одну локацію головною частиною дня і сплануйте просте повернення."),
    steps: [
      { label: t("Start", "Commencer", "Inizio", "Початок"), text: t("Check the outward and last practical return train.", "Verifiez l'aller et le dernier train de retour pratique.", "Controlla l'andata e l'ultimo treno utile per il ritorno.", "Перевірте маршрут туди й останній зручний потяг назад.") },
      { label: t("Shape", "Rythme", "Ritmo", "Ритм"), text: t("Choose one town or one coast section, not several.", "Choisissez une ville ou une portion de cote, pas plusieurs.", "Scegli una citta o un tratto di costa, non piu localita.", "Оберіть одне місто або одну ділянку узбережжя, а не кілька." ) },
      { label: t("Return", "Retour", "Rientro", "Повернення"), text: t("Return to Menton before the connection becomes stressful.", "Rentrez a Menton avant que la correspondance ne devienne contraignante.", "Torna a Mentone prima che la coincidenza diventi stressante.", "Поверніться до Ментона до того, як пересадка стане напруженою." ) },
    ],
  },
  beachDay: {
    title: t("A real Menton plan", "Un vrai plan pour Menton", "Un vero piano per Mentone", "Реальний план для Ментона"),
    intro: t("Use the cooler part of the day for the seafront and keep a calm indoor pause in reserve.", "Profitez du front de mer pendant les heures les plus douces et gardez une pause au frais en reserve.", "Usa le ore piu fresche per il lungomare e tieni pronta una pausa al chiuso.", "Використайте прохолодніші години для моря й залиште в запасі спокійну паузу в приміщенні."),
    steps: [
      { label: t("Start", "Commencer", "Inizio", "Початок"), text: t("Arrive early for a simpler beach choice.", "Arrivez tot pour choisir la plage plus facilement.", "Arriva presto per scegliere la spiaggia con calma.", "Приходьте раніше, щоб спокійно обрати пляж.") },
      { label: t("Shape", "Rythme", "Ritmo", "Ритм"), text: t("Plan shade, water and one nearby food stop.", "Prevoyez de l'ombre, de l'eau et une pause repas a proximite.", "Pianifica ombra, acqua e una sosta per mangiare nelle vicinanze.", "Заплануйте тінь, воду й одну зупинку для їжі поруч.") },
      { label: t("Return", "Retour", "Rientro", "Повернення"), text: t("Keep the apartment close enough for a comfortable break.", "Gardez l'appartement assez proche pour une pause confortable.", "Tieni l'appartamento abbastanza vicino per una pausa comoda.", "Оберіть апартаменти досить близько для комфортної перерви.") },
    ],
  },
  familyDay: {
    title: t("A real Menton plan", "Un vrai plan pour Menton", "Un vero piano per Mentone", "Реальний план для Ментона"),
    intro: t("Keep the day short, walkable and flexible rather than trying to cover every sight.", "Gardez une journee courte, accessible a pied et souple plutot que de vouloir tout voir.", "Mantieni la giornata breve, percorribile a piedi e flessibile invece di voler vedere tutto.", "Зробіть день коротким, пішим і гнучким, замість того щоб намагатися побачити все."),
    steps: [
      { label: t("Start", "Commencer", "Inizio", "Початок"), text: t("Choose one beach, garden or old-town stop.", "Choisissez une plage, un jardin ou une halte dans la vieille ville.", "Scegli una spiaggia, un giardino o una tappa nel centro storico.", "Оберіть один пляж, сад або зупинку в старому місті.") },
      { label: t("Shape", "Rythme", "Ritmo", "Ритм"), text: t("Leave time for food, shade and a change of plan.", "Gardez du temps pour manger, vous mettre a l'ombre et changer de programme.", "Lascia tempo per mangiare, stare all'ombra e cambiare programma.", "Залиште час на їжу, тінь і зміну планів.") },
      { label: t("Return", "Retour", "Rientro", "Повернення"), text: t("A larger apartment can make the afternoon easier.", "Un appartement plus spacieux peut rendre l'apres-midi plus simple.", "Un appartamento piu spazioso puo rendere piu semplice il pomeriggio.", "Просторіші апартаменти можуть зробити другу половину дня легшою.") },
    ],
  },
  airportArrival: {
    title: t("A real Menton plan", "Un vrai plan pour Menton", "Un vero piano per Mentone", "Реальний план для Ментона"),
    intro: t("Treat the flight board and the onward connection as separate decisions.", "Considerez le tableau des vols et la correspondance comme deux decisions distinctes.", "Considera il tabellone voli e il collegamento successivo come due decisioni separate.", "Сприймайте табло рейсів і подальше сполучення як два окремі рішення."),
    steps: [
      { label: t("Start", "Commencer", "Inizio", "Початок"), text: t("Check the official airport board close to departure or arrival.", "Verifiez le tableau officiel de l'aeroport pres du depart ou de l'arrivee.", "Controlla il tabellone ufficiale vicino all'orario di partenza o arrivo.", "Перевірте офіційне табло аеропорту близько до часу вильоту або прибуття.") },
      { label: t("Shape", "Rythme", "Ritmo", "Ритм"), text: t("Choose train, bus, taxi or transfer after checking the actual timing.", "Choisissez train, bus, taxi ou transfert apres avoir verifie l'horaire reel.", "Scegli treno, autobus, taxi o transfer dopo aver verificato l'orario reale.", "Оберіть потяг, автобус, таксі або трансфер після перевірки фактичного часу.") },
      { label: t("Return", "Retour", "Rientro", "Повернення"), text: t("Leave a buffer before a late check-in or connection.", "Gardez une marge avant une arrivee tardive ou une correspondance.", "Lascia un margine prima di un arrivo serale o di una coincidenza.", "Залиште запас часу перед пізнім заселенням чи пересадкою.") },
    ],
  },
  carFree: {
    title: t("A real Menton plan", "Un vrai plan pour Menton", "Un vero piano per Mentone", "Реальний план для Ментона"),
    intro: t("Plan around walking and the station, with one train trip at most.", "Organisez la journee autour de la marche et de la gare, avec une seule excursion en train au maximum.", "Organizza la giornata intorno agli spostamenti a piedi e alla stazione, con al massimo una gita in treno.", "Плануйте день навколо прогулянок і вокзалу, максимум з однією поїздкою потягом."),
    steps: [
      { label: t("Start", "Commencer", "Inizio", "Початок"), text: t("Keep the first day within central Menton.", "Gardez le premier jour dans Menton centre.", "Tieni il primo giorno nel centro di Mentone.", "Проведіть перший день у центрі Ментона.") },
      { label: t("Shape", "Rythme", "Ritmo", "Ритм"), text: t("Use the station for a single clear destination.", "Utilisez la gare pour une seule destination claire.", "Usa la stazione per un'unica destinazione chiara.", "Використовуйте вокзал для однієї чіткої поїздки.") },
      { label: t("Return", "Retour", "Rientro", "Повернення"), text: t("Choose a central base so the walk home stays simple.", "Choisissez une base centrale pour que le retour a pied reste simple.", "Scegli una base centrale per rendere semplice il rientro a piedi.", "Оберіть центральну базу, щоб дорога додому пішки була простою.") },
    ],
  },
  eventBase: {
    title: t("A real Menton plan", "Un vrai plan pour Menton", "Un vero piano per Mentone", "Реальний план для Ментона"),
    intro: t("Use Menton as the calm base and let the event be one part of the day.", "Utilisez Menton comme base calme et faites de l'evenement une partie de la journee.", "Usa Mentone come base tranquilla e fai dell'evento una parte della giornata.", "Використовуйте Ментон як спокійну базу, а подію зробіть частиною дня."),
    steps: [
      { label: t("Start", "Commencer", "Inizio", "Початок"), text: t("Confirm official dates, access and tickets before travel.", "Confirmez les dates officielles, l'acces et les billets avant le voyage.", "Conferma date ufficiali, accesso e biglietti prima del viaggio.", "Підтвердьте офіційні дати, доступ і квитки перед поїздкою.") },
      { label: t("Shape", "Rythme", "Ritmo", "Ритм"), text: t("Allow extra time for event-day trains and controlled areas.", "Prevoyez du temps supplementaire pour les trains et zones controlees le jour de l'evenement.", "Prevedi tempo extra per treni e aree controllate il giorno dell'evento.", "Закладіть додатковий час на потяги та контрольовані зони в день події.") },
      { label: t("Return", "Retour", "Rientro", "Повернення"), text: t("Keep the return to Menton realistic, especially after evening programmes.", "Gardez un retour a Menton realiste, surtout apres un programme du soir.", "Rendi realistico il ritorno a Mentone, soprattutto dopo programmi serali.", "Плануйте реалістичне повернення до Ментона, особливо після вечірніх програм.") },
    ],
  },
  stayChoice: {
    title: t("A real Menton plan", "Un vrai plan pour Menton", "Un vero piano per Mentone", "Реальний план для Ментона"),
    intro: t("Choose the apartment around the rhythm of the stay, not just the view.", "Choisissez l'appartement selon le rythme du sejour, pas seulement selon la vue.", "Scegli l'appartamento in base al ritmo del soggiorno, non solo alla vista.", "Обирайте апартаменти за ритмом подорожі, а не лише за видом."),
    steps: [
      { label: t("Start", "Commencer", "Inizio", "Початок"), text: t("Decide whether the priority is beach, station, space or a balcony.", "Decidez si la priorite est la plage, la gare, l'espace ou un balcon.", "Decidi se la priorita e spiaggia, stazione, spazio o balcone.", "Визначте, що пріоритетніше: пляж, вокзал, простір чи балкон.") },
      { label: t("Shape", "Rythme", "Ritmo", "Ритм"), text: t("Match the apartment to the size and pace of the group.", "Adaptez l'appartement a la taille et au rythme du groupe.", "Abbina l'appartamento alle dimensioni e al ritmo del gruppo.", "Підберіть апартаменти до розміру й ритму групи.") },
      { label: t("Return", "Retour", "Rientro", "Повернення"), text: t("Send the dates and priorities for a manual availability check.", "Envoyez les dates et vos priorites pour une verification manuelle de disponibilite.", "Invia date e priorita per una verifica manuale della disponibilita.", "Надішліть дати й пріоритети для ручної перевірки доступності.") },
    ],
  },
  townWalk: {
    title: t("A real Menton plan", "Un vrai plan pour Menton", "Un vero piano per Mentone", "Реальний план для Ментона"),
    intro: t("Build the walk around one neighbourhood, then leave time for the seafront.", "Construisez la balade autour d'un quartier, puis gardez du temps pour le bord de mer.", "Costruisci la passeggiata intorno a un quartiere, poi lascia tempo per il lungomare.", "Побудуйте прогулянку навколо одного району, а потім залиште час для набережної."),
    steps: [
      { label: t("Start", "Commencer", "Inizio", "Початок"), text: t("Start in the old town or market area.", "Commencez dans la vieille ville ou pres du marche.", "Inizia nel centro storico o nella zona del mercato.", "Почніть у старому місті або біля ринку.") },
      { label: t("Shape", "Rythme", "Ritmo", "Ритм"), text: t("Take the smaller lanes slowly and avoid treating it as a route race.", "Prenez les petites ruelles tranquillement, sans en faire une course d'itineraire.", "Percorri le vie piccole con calma, senza trasformarle in una corsa a tappe.", "Гуляйте маленькими вулицями повільно, не перетворюючи це на гонку маршрутом.") },
      { label: t("Return", "Retour", "Rientro", "Повернення"), text: t("Finish with the sea or a central food stop.", "Terminez au bord de la mer ou par une halte gourmande au centre.", "Concludi al mare o con una sosta per mangiare in centro.", "Завершіть біля моря або зупинкою для їжі в центрі.") },
    ],
  },
  driving: {
    title: t("A real Menton plan", "Un vrai plan pour Menton", "Un vero piano per Mentone", "Реальний план для Ментона"),
    intro: t("Treat collection, access and parking as the first part of the trip.", "Considerez la prise du vehicule, l'acces et le stationnement comme la premiere partie du voyage.", "Considera ritiro, accesso e parcheggio come la prima parte del viaggio.", "Сприймайте отримання авто, заїзд і паркування як першу частину подорожі."),
    steps: [
      { label: t("Start", "Commencer", "Inizio", "Початок"), text: t("Confirm the collection point and opening terms directly with the provider.", "Confirmez le point de prise en charge et les conditions d'ouverture directement avec le loueur.", "Conferma il punto di ritiro e gli orari direttamente con il fornitore.", "Підтвердьте місце отримання та години безпосередньо з прокатником.") },
      { label: t("Shape", "Rythme", "Ritmo", "Ритм"), text: t("Keep the arrival route and parking plan simple.", "Gardez un plan simple pour l'arrivee et le stationnement.", "Mantieni semplice il piano per arrivo e parcheggio.", "Зробіть план заїзду й паркування простим.") },
      { label: t("Return", "Retour", "Rientro", "Повернення"), text: t("Ask about apartment parking when checking availability.", "Demandez les possibilites de stationnement de l'appartement lors de la demande de disponibilite.", "Chiedi informazioni sul parcheggio dell'appartamento quando verifichi la disponibilita.", "Запитайте про паркування в апартаментах під час перевірки доступності.") },
    ],
  },
  practicalStop: {
    title: t("A real Menton plan", "Un vrai plan pour Menton", "Un vero piano per Mentone", "Реальний план для Ментона"),
    intro: t("Use this as a practical note within a larger walk, not as a destination in itself.", "Utilisez ceci comme une note pratique dans une balade plus large, pas comme une destination en soi.", "Usalo come nota pratica dentro una passeggiata piu ampia, non come destinazione a se stante.", "Використовуйте це як практичну нотатку у більшій прогулянці, а не як окрему ціль."),
    steps: [
      { label: t("Start", "Commencer", "Inizio", "Початок"), text: t("Note the closest option before you leave the apartment.", "Reperez l'option la plus proche avant de quitter l'appartement.", "Individua l'opzione piu vicina prima di uscire dall'appartamento.", "Знайдіть найближчий варіант перед виходом з апартаментів.") },
      { label: t("Shape", "Rythme", "Ritmo", "Ритм"), text: t("Keep a second option in mind if the first is closed or busy.", "Gardez une seconde option en tete si la premiere est fermee ou frequentee.", "Tieni presente una seconda opzione se la prima e chiusa o affollata.", "Майте на увазі другий варіант, якщо перший зачинений або зайнятий.") },
      { label: t("Return", "Retour", "Rientro", "Повернення"), text: t("Continue with the nearby guide or map rather than making a detour.", "Continuez avec le guide ou la carte a proximite plutot que de faire un detour.", "Continua con la guida o la mappa vicina invece di fare una deviazione.", "Продовжуйте за найближчим гайдом або картою, а не робіть окремий гак.") },
    ],
  },
} satisfies Record<string, GuideAuthorityPlan>;

type PlanKey = keyof typeof plans;

const profile = (plan: PlanKey, profileSources: GuideAuthoritySource[]): GuideAuthorityProfile => ({
  author: editorialTeam,
  reviewedAt: "2026-07-19",
  reviewNote,
  sources: profileSources,
  plan: plans[plan],
});

export const guideAuthorityProfiles: Record<string, GuideAuthorityProfile> = {
  "best-ice-cream-menton": profile("foodWalk", [sources.mentonTourism]),
  "halles-du-marche-menton": profile("foodWalk", [sources.mentonTourism]),
  "supermarkets-in-menton": profile("foodWalk", [sources.mentonTourism]),
  "italian-riviera-day-trip-from-menton": profile("trainDay", [sources.sncf]),
  "day-trips-from-menton": profile("trainDay", [sources.sncf, sources.zou]),
  "best-beaches-in-menton": profile("beachDay", [sources.mentonTourism]),
  "stay-cool-in-menton-summer": profile("beachDay", [sources.mentonTourism]),
  "menton-with-kids-family-guide": profile("familyDay", [sources.mentonTourism]),
  "airports-near-menton-live-flights": profile("airportArrival", [sources.niceAirport]),
  "how-to-get-to-menton-from-nice-airport": profile("airportArrival", [sources.niceAirport, sources.sncf]),
  "menton-without-a-car": profile("carFree", [sources.sncf, sources.zou]),
  "public-transport-in-menton": profile("carFree", [sources.sncf, sources.zou]),
  "monaco-events-from-menton": profile("eventBase", [sources.visitMonaco, sources.sncf]),
  "fete-du-citron-menton-practical-guide": profile("eventBase", [sources.mentonTourism]),
  "where-to-stay-in-menton": profile("stayChoice", [sources.mentonTourism]),
  "menton-old-town": profile("townWalk", [sources.mentonTourism]),
  "menton-one-day-itinerary": profile("townWalk", [sources.mentonTourism]),
  "menton-three-day-itinerary": profile("townWalk", [sources.mentonTourism, sources.sncf]),
  "car-rental-menton-nice-airport-convertibles": profile("driving", [sources.niceAirport]),
  "public-toilets-menton": profile("practicalStop", [sources.mentonTourism]),
};

export function getGuideAuthorityProfile(slug: string, locale: Locale): LocalizedGuideAuthorityProfile | undefined {
  const profile = guideAuthorityProfiles[slug];
  if (!profile) return undefined;

  return {
    ...profile,
    author: profile.author[locale],
    reviewNote: profile.reviewNote[locale],
    sources: profile.sources.map((source) => ({ label: source.label[locale], url: source.url })),
    plan: {
      title: profile.plan.title[locale],
      intro: profile.plan.intro[locale],
      steps: profile.plan.steps.map((step) => ({ label: step.label[locale], text: step.text[locale] })),
    },
  };
}

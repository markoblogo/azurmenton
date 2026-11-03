import type { GuideArticle, LocalizedText } from "./guide";
import { formattedMarkdownGuideBody, markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/heartbreaker-larnacoeur-monaco-filming-locations.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("A romantic comedy on the real Riviera", "Une comédie romantique dans de vrais décors", "Una commedia romantica in luoghi reali", "Романтична комедія в реальних місцях"));
sections.forEach((section, index) => {
  const body = (locale: keyof typeof records[number]) => formattedMarkdownGuideBody(records[index][locale]);
  section.body = [t(body("en"), body("fr"), body("it"), body("uk"))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
sections[3].relatedPlaceIds = ["monte-carlo-bay-hotel-resort"];
sections[4].relatedPlaceIds = ["casino-square-monaco"];
sections[5].relatedPlaceIds = ["opera-de-monte-carlo"];
sections[9].relatedPlaceIds = ["monte-carlo-beach-roquebrune-cap-martin"];
sections[11].relatedPlaceIds = ["monaco-monte-carlo-station"];
sections[12].guideLinkSlug = "menton-without-a-car";
sections[12].guideLinkLabel = t("Plan a car-free stay in Menton", "Préparer un séjour sans voiture à Menton", "Organizza un soggiorno senza auto a Mentone", "Сплануйте відпочинок у Ментоні без автомобіля");
sections[16].guideLinkSlug = "grace-of-monaco-filming-locations-menton";
sections[16].guideLinkLabel = t("When Menton played Monaco in Grace of Monaco", "Quand Menton jouait Monaco dans Grace de Monaco", "Quando Mentone interpretava Monaco in Grace of Monaco", "Коли Ментон зіграв Монако в Grace of Monaco");

export const heartbreakerGuide: GuideArticle = {
  id: "heartbreaker-larnacoeur-monaco-filming-locations", slug: "heartbreaker-larnacoeur-monaco-filming-locations",
  title: t("Heartbreaker in Monaco: A Romantic-Comedy Location Guide", "L'Arnacœur à Monaco : promenade sur les lieux d'une comédie romantique", "Heartbreaker a Monaco: guida ai luoghi di una commedia romantica", "Heartbreaker у Монако: місця зйомок романтичної комедії"),
  seoTitle: t("Heartbreaker Filming Locations in Monaco: L'Arnacœur Guide", "L'Arnacœur : lieux de tournage à Monaco depuis Menton", "Heartbreaker: luoghi delle riprese a Monaco da Mentone", "Heartbreaker: місця зйомок у Монако з Ментона"),
  seoDescription: t("Visit Heartbreaker's Monaco settings from Menton: Monte-Carlo Bay, Casino Square and Salle Garnier. Separate confirmed filming, preliminary street matches and private hotel access.", "Découvrez les décors de L'Arnacœur depuis Menton : Monte-Carlo Bay, place du Casino et Salle Garnier, entre tournages documentés, rues à vérifier et accès privés.", "Scopri Monte-Carlo Bay, Place du Casino e Salle Garnier da Mentone: riprese documentate di Heartbreaker, strade da verificare e accessi privati distinti.", "Monte-Carlo Bay, площа казино та Salle Garnier з Ментона: підтверджені місця Heartbreaker, попередні вуличні збіги й правила приватного доступу."),
  excerpt: t("Romain Duris and Vanessa Paradis turn Monaco into a romantic-comedy stage. Follow the documented hotel and opera settings, keeping provisional street matches and the former hotel package in perspective.", "Romain Duris et Vanessa Paradis font de Monaco une scène de comédie. Retrouvez hôtels et opéra documentés, sans transformer rues à vérifier et ancien forfait en promesses actuelles.", "Duris e Paradis fanno di Monaco un palcoscenico romantico. Segui hotel e opera documentati, distinguendo identificazioni preliminari e vecchio pacchetto dalle offerte attuali.", "Дюріс і Параді перетворюють Монако на сцену комедії. Відкрийте документовані готелі й оперу, не плутаючи попередні збіги та старий пакет із чинними пропозиціями."),
  category: "day-trips", duration: "half-day", publishedOn: "2026-11-03", sourceStatus: "editorial",
  coverImage: "/images/guide/heartbreaker-larnacoeur-monaco-filming-locations.png",
  coverImageAlt: t("Project illustration of a couple and a convertible near Monaco's Casino Square; not a Heartbreaker film still, original cast photograph or verified camera viewpoint", "Illustration d'un couple et d'un cabriolet près de la place du Casino ; ni photogramme de L'Arnacœur, ni photo des acteurs, ni point de caméra vérifié", "Illustrazione di una coppia e una cabriolet vicino a Place du Casino; non fotogramma di Heartbreaker, foto del cast o punto di ripresa verificato", "Ілюстрація пари й кабріолета біля площі казино Монако; не кадр Heartbreaker, фото акторів чи перевірена позиція камери"),
  visualTheme: "itinerary", visualStatus: "project_illustration", locationTags: ["monaco", "day-trip"],
  tags: [t("French cinema", "Cinéma français", "Cinema francese", "Французьке кіно"), t("Film locations", "Lieux de tournage", "Luoghi delle riprese", "Місця зйомок"), t("Monaco", "Monaco", "Monaco", "Монако")],
  bestFor: [t("Cinema fans and couples", "Cinéphiles et couples", "Cinefili e coppie", "Кіномани й пари"), t("A cultural Monaco half-day", "Une demi-journée culturelle à Monaco", "Mezza giornata culturale a Monaco", "Культурні пів дня в Монако")],
  relatedPlaces: [...new Set(sections.flatMap(section => section.relatedPlaceIds ?? []))],
  relatedArticles: ["rebecca-monte-carlo-daphne-du-maurier-literary-walk", "grace-of-monaco-filming-locations-menton", "james-bond-menton-never-say-never-again-filming-locations", "day-trips-from-menton", "theatre-opera-performing-arts-near-menton", "menton-without-a-car", "public-transport-in-menton"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  showTransportHelper: true, transportHelperAfterSectionIndex: 12,
  practicalTips: [t("Allow 3–5 hours in Monaco plus travel: editorial estimates, not a step-free field audit. Checked 3 November 2026. Core hotel/opera filming is supported by the SBM representative interview; street timestamps are contributor research. Monte-Carlo Beach is in Roquebrune-Cap-Martin, France, not the Bay hotel. Confirm hotel access, named opera venue, local connections and return trains. No current themed package, private-area entry, exact camera marker or copied film still is promised.", "Prévoyez 3–5 h à Monaco plus trajet : estimations, pas audit sans marches. Vérifié le 3 novembre 2026. L'interview SBM étaye hôtels et opéra ; minutages de rues contributifs. Le Beach est à Roquebrune-Cap-Martin en France, distinct du Bay. Confirmez accès, salle, transports et retours. Aucun forfait actuel, intérieur privé, cadrage exact ou photogramme promis.", "Prevedi 3–5 ore a Monaco più viaggio: stime, non audit senza gradini. Verificato il 3 novembre 2026. L'intervista SBM sostiene hotel e opera; minutaggi stradali collaborativi. Il Beach è a Roquebrune-Cap-Martin in Francia, distinto dal Bay. Conferma accessi, sala, collegamenti e ritorno. Nessun pacchetto attuale, interno privato, inquadratura o fotogramma promesso.", "Плануйте 3–5 годин у Монако плюс дорога: оцінки, не польовий аудит без сходів. Перевірено 3 листопада 2026. Готелі й оперу підтверджує інтерв'ю SBM; вуличні позначки спільнотні. Beach — у Roquebrune-Cap-Martin, Франція, окремий від Bay. Уточнюйте доступ, залу, транспорт і повернення. Чинного пакета, приватного входу чи точного ракурсу не обіцяємо.")],
  sections,
};

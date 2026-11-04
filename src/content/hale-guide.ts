import type { GuideArticle, LocalizedText } from "./guide";
import { formattedMarkdownGuideBody, markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/julian-hale-french-riviera-cultural-history.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("Reading a cultural landscape", "Lire un paysage culturel", "Leggere un paesaggio culturale", "Читати культурний ландшафт"));
sections.forEach((section, index) => {
  const body = (locale: keyof typeof records[number]) => formattedMarkdownGuideBody(records[index][locale]);
  section.body = [t(body("en"), body("fr"), body("it"), body("uk"))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
const sectionPlaces: Record<number, string[]> = {
  2: ["promenade-du-soleil"],
  3: ["trophee-auguste-la-turbie"],
  4: ["monaco-monte-carlo", "casino-square-monaco"],
  5: ["royal-westminster-menton", "le-majestic-menton", "winter-palace-menton"],
  6: ["cathedrale-saint-nicolas-nice", "hotel-belles-rives-juan-les-pins", "juan-les-pins-seafront"],
  7: ["halles-du-marche"],
  8: ["musee-matisse-nice", "salle-des-mariages-jean-cocteau"],
  9: ["basilica-saint-michel-archange", "palais-carnoles-menton", "villa-e-1027-roquebrune-cap-martin"],
  10: ["jardin-val-rahmeh", "jardin-serre-de-la-madone", "villa-ephrussi-de-rothschild"],
  11: ["gorbio", "sainte-agnes"],
};
for (const [index, ids] of Object.entries(sectionPlaces)) sections[Number(index)].relatedPlaceIds = ids;
sections[5].guideLinkSlug = "belle-epoque-menton-architecture-walk";
sections[5].guideLinkLabel = t("Walk through Menton's Belle Époque", "Parcourir la Belle Époque mentonnaise", "Esplora la Belle Époque di Mentone", "Прогуляйтеся Ментоном Belle Époque");
sections[6].guideLinkSlug = "tender-is-the-night-fitzgerald-french-riviera";
sections[6].guideLinkLabel = t("Read Fitzgerald's Riviera", "Lire la Riviera de Fitzgerald", "Leggi la Riviera di Fitzgerald", "Прочитайте про Рив'єру Фіцджеральда");
sections[8].guideLinkSlug = "jean-cocteau-menton-walking-route";
sections[8].guideLinkLabel = t("Explore Cocteau's Menton", "Explorer le Menton de Cocteau", "Esplora la Mentone di Cocteau", "Дослідіть Ментон Кокто");
sections[10].guideLinkSlug = "best-gardens-menton";
sections[10].guideLinkLabel = t("Compare gardens and current access", "Comparer jardins et accès actuels", "Confronta giardini e accessi attuali", "Порівняйте сади й нинішній доступ");
sections[11].guideLinkSlug = "best-hilltop-villages-near-menton";
sections[11].guideLinkLabel = t("Choose a hilltop village", "Choisir un village perché", "Scegli un borgo sulle colline", "Оберіть гірське село");
sections[12].guideLinkSlug = "public-transport-in-menton";
sections[12].guideLinkLabel = t("Plan transport and the return", "Préparer transports et retour", "Organizza trasporti e ritorno", "Сплануйте транспорт і повернення");

export const haleGuide: GuideArticle = {
  id: "julian-hale-french-riviera-cultural-history", slug: "julian-hale-french-riviera-cultural-history",
  title: t("Reading the Riviera: Julian Hale's Cultural History and the Places Behind It", "Lire la Riviera : Julian Hale et les lieux de son histoire culturelle", "Leggere la Riviera: Julian Hale e i luoghi della sua storia culturale", "Читаючи Рив'єру: Джуліан Гейл і місця культурної історії"),
  seoTitle: t("Julian Hale's Riviera: Cultural History and Places", "Julian Hale : histoire culturelle et lieux de la Riviera", "Julian Hale: storia culturale e luoghi della Riviera", "Джуліан Гейл: культурна історія та місця Рив'єри"),
  seoDescription: t("Read Julian Hale's French Riviera through Menton, Monaco, Nice and La Turbie: book editions, cultural themes, five outings and current visitor restrictions.", "Reliez Julian Hale à Menton, Monaco, Nice et La Turbie : éditions, thèmes culturels, cinq sorties et restrictions de visite actuelles.", "Collega Julian Hale a Mentone, Monaco, Nizza e La Turbie: edizioni, temi culturali, cinque uscite e limiti di visita attuali.", "Книжка Джуліана Гейла через Ментон, Монако, Ніццу й Ла-Тюрбі: видання, культурні теми, п'ять поїздок і чинні обмеження відвідування."),
  excerpt: t("Roman power, winter visitors, artists and constructed gardens: use Julian Hale's cultural history to see beyond the postcard, with Menton as your base.", "Rome, hivernants, artistes et jardins construits : regardez derrière la carte postale avec Julian Hale, au départ de Menton.", "Roma, ospiti invernali, artisti e giardini costruiti: guarda oltre la cartolina con Julian Hale, partendo da Mentone.", "Римська влада, зимові гості, митці й створені сади: погляд за листівку разом із Джуліаном Гейлом, із базою в Ментоні."),
  category: "walks-views", duration: "reference", publishedOn: "2026-11-04", sourceStatus: "editorial",
  coverImage: "/images/guide/julian-hale-french-riviera-cultural-history.png",
  coverImageAlt: t("Project illustration of a book representing Julian Hale's cultural history beside an imagined Riviera view; not the verified publisher's cover or a documentary photograph", "Illustration du projet représentant le livre de Julian Hale et une vue imaginée de la Riviera ; ni couverture éditoriale vérifiée ni photographie documentaire", "Illustrazione del progetto con un libro che rappresenta la storia di Julian Hale e una veduta immaginata; non copertina editoriale verificata o fotografia documentaria", "Ілюстрація проєкту з книжкою, що представляє культурну історію Гейла, й уявним краєвидом; не перевірена видавнича обкладинка чи документальне фото"),
  visualTheme: "itinerary", visualStatus: "project_illustration", locationTags: ["menton", "monaco", "nice", "la-turbie", "juan-les-pins"],
  tags: [t("Julian Hale", "Julian Hale", "Julian Hale", "Джуліан Гейл"), t("Cultural history", "Histoire culturelle", "Storia culturale", "Культурна історія"), t("Books and places", "Livres et lieux", "Libri e luoghi", "Книжки й місця")],
  bestFor: [t("Readers and cultural travellers", "Lecteurs et voyageurs culturels", "Lettori e viaggiatori culturali", "Читачі й культурні мандрівники"), t("Architecture and garden enthusiasts", "Amateurs d'architecture et de jardins", "Appassionati di architettura e giardini", "Шанувальники архітектури й садів")],
  relatedPlaces: Object.values(sectionPlaces).flat(),
  relatedArticles: ["belle-epoque-menton-architecture-walk", "best-gardens-menton", "jean-cocteau-menton-walking-route", "tender-is-the-night-fitzgerald-french-riviera", "romain-gary-nice-promise-at-dawn-literary-walk", "poirot-blue-train-filming-locations-menton", "best-hilltop-villages-near-menton", "museums-in-menton-nice-monaco", "public-transport-in-menton", "menton-without-a-car"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  practicalTips: [t("Checked 4 November 2026, except Carnolès municipal notice last checked 3 November. Val Rahmeh closed through 27 November; Serre de la Madone closed November–December; E-1027's published season ended 31 October. Five independent editorial outings, not one continuous route or routes supplied by Hale. Confirm openings, transfers and private-property permission. The book was not read page by page for this guide.", "Vérifié le 4 novembre 2026, sauf Carnolès le 3. Val Rahmeh fermé jusqu'au 27 ; Serre de la Madone en novembre–décembre ; saison E-1027 terminée le 31 octobre. Cinq sorties éditoriales indépendantes, pas un parcours continu ni des itinéraires de Hale. Confirmez accès, transports et permissions. Pas de lecture intégrale page par page pour ce guide.", "Verificato il 4 novembre 2026, salvo Carnolès il 3. Val Rahmeh chiuso fino al 27; Serre de la Madone novembre–dicembre; stagione E-1027 terminata il 31 ottobre. Cinque uscite editoriali separate, non percorso unico o itinerari di Hale. Conferma accessi, trasporti e permessi. Non basato su una lettura integrale pagina per pagina.", "Перевірено 4 листопада 2026, крім Carnolès — 3-го. Val Rahmeh закритий до 27-го; Serre de la Madone — листопад–грудень; сезон E-1027 завершився 31 жовтня. П'ять окремих редакційних поїздок, не один маршрут і не маршрути Гейла. Перевіряйте доступ, транспорт і дозволи. Для гайда не проводилося повного посторінкового читання книжки.")],
  sections,
};

import type { GuideArticle, LocalizedText } from "./guide";
import { formattedMarkdownGuideBody, markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/the-french-riviera-a-history-michael-nelson.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("A longer history of the coast", "Une histoire plus longue du littoral", "Una storia più lunga della costa", "Довша історія узбережжя"));
sections.forEach((section, index) => {
  const body = (locale: keyof typeof records[number]) => formattedMarkdownGuideBody(records[index][locale]);
  section.body = [t(body("en"), body("fr"), body("it"), body("uk"))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
const sectionPlaces: Record<number, string[]> = {
  3: ["musee-terra-amata-nice"],
  4: ["musee-archeologie-cimiez-nice"],
  5: ["rue-longue-menton", "basilica-saint-michel-archange"],
  6: ["monaco-monte-carlo", "ventimiglia"],
  7: ["menton-station"],
  8: ["royal-westminster-menton", "winter-palace-menton"],
  9: ["hotel-belles-rives-juan-les-pins", "juan-les-pins-seafront"],
  10: ["musee-resistance-azureenne-nice"],
  12: ["promenade-des-anglais-nice", "vieil-antibes", "port-vauban-antibes"],
};
for (const [index, ids] of Object.entries(sectionPlaces)) sections[Number(index)].relatedPlaceIds = ids;
sections[7].guideLinkSlug = "belle-epoque-menton-architecture-walk";
sections[7].guideLinkLabel = t("Explore Menton's Belle Époque", "Explorer la Belle Époque", "Esplora la Belle Époque", "Дослідіть Belle Époque Ментона");
sections[9].guideLinkSlug = "tender-is-the-night-fitzgerald-french-riviera";
sections[9].guideLinkLabel = t("Read Fitzgerald's Riviera", "Lire la Riviera de Fitzgerald", "Leggi la Riviera di Fitzgerald", "Прочитайте про Рив'єру Фіцджеральда");
sections[12].guideLinkSlug = "public-transport-in-menton";
sections[12].guideLinkLabel = t("Plan transport and the return", "Préparer les transports et le retour", "Organizza trasporti e ritorno", "Сплануйте транспорт і повернення");
sections[17].guideLinkSlug = "julian-hale-french-riviera-cultural-history";
sections[17].guideLinkLabel = t("Compare Julian Hale's cultural history", "Découvrir l'histoire culturelle de Julian Hale", "Scopri la storia culturale di Julian Hale", "Порівняйте культурну історію Джуліана Гейла");

export const nelsonGuide: GuideArticle = {
  id: "the-french-riviera-a-history-michael-nelson", slug: "the-french-riviera-a-history-michael-nelson",
  title: t("The French Riviera: A History - A Reading Companion for Your Trip", "The French Riviera: A History : lire la côte avec Michael Nelson", "The French Riviera: A History: leggere la costa con Michael Nelson", "The French Riviera: A History: історія узбережжя з Майклом Нельсоном"),
  seoTitle: t("Michael Nelson's French Riviera: History and Places", "Michael Nelson : histoire et lieux de la Riviera", "Michael Nelson: storia e luoghi della Riviera", "Майкл Нельсон: історія та місця Рив'єри"),
  seoDescription: t("Read Michael Nelson's regional history with Menton as your base: book details, three editorial outings, Roman Nice, changing borders and current museum access.", "Lisez l'histoire de Michael Nelson depuis Menton : livre, trois sorties éditoriales, Nice romaine, frontières et accès actuels aux musées.", "Leggi Michael Nelson da Mentone: libro, tre uscite redazionali, Nizza romana, confini e accessi attuali ai musei.", "Читайте історію Майкла Нельсона з базою в Ментоні: книжка, три редакційні поїздки, римська Ніцца, кордони й нинішній доступ до музеїв."),
  excerpt: t("Before the palaces and summer resorts: connect Michael Nelson's history with Menton, Monaco, Nice and Antibes, without confusing the book with a current guidebook.", "Avant les palaces et les stations estivales : reliez Nelson à Menton, Monaco, Nice et Antibes, sans confondre histoire et guide pratique actuel.", "Prima dei palazzi e delle vacanze estive: collega Nelson a Mentone, Monaco, Nizza e Antibes, distinguendo storia e guida pratica attuale.", "До палаців і літніх курортів: пов'яжіть історію Нельсона з Ментоном, Монако, Ніццою та Антібом, не плутаючи книжку із сучасним путівником."),
  category: "walks-views", duration: "reference", publishedOn: "2026-11-05", sourceStatus: "editorial",
  coverImage: "/images/guide/the-french-riviera-a-history-michael-nelson.png",
  coverImageAlt: t("Project illustration of a book representing Michael Nelson's history beside an imagined Menton view; not the verified publisher's cover or a documentary photograph", "Illustration du projet représentant le livre de Michael Nelson devant un Menton imaginé ; ni couverture éditoriale vérifiée ni photographie documentaire", "Illustrazione del progetto con un libro che rappresenta la storia di Michael Nelson e Mentone immaginata; non copertina editoriale verificata o fotografia documentaria", "Ілюстрація проєкту з книжкою, що представляє історію Майкла Нельсона, та уявним Ментоном; не перевірена видавнича обкладинка чи документальне фото"),
  visualTheme: "itinerary", visualStatus: "project_illustration", locationTags: ["menton", "monaco", "nice", "antibes", "juan-les-pins", "ventimiglia"],
  tags: [t("Michael Nelson", "Michael Nelson", "Michael Nelson", "Майкл Нельсон"), t("Regional history", "Histoire régionale", "Storia regionale", "Регіональна історія"), t("Books and places", "Livres et lieux", "Libri e luoghi", "Книжки й місця")],
  bestFor: [t("History readers", "Lecteurs d'histoire", "Lettori di storia", "Читачі історії"), t("Curious visitors and longer stays", "Voyageurs curieux et longs séjours", "Viaggiatori curiosi e soggiorni lunghi", "Допитливі гості й довгі перебування")],
  relatedPlaces: Object.values(sectionPlaces).flat(),
  relatedArticles: ["julian-hale-french-riviera-cultural-history", "belle-epoque-menton-architecture-walk", "tender-is-the-night-fitzgerald-french-riviera", "maigret-liberty-bar-antibes-cannes", "the-houses-that-remember-riviera-book-route", "menton-old-town", "museums-in-menton-nice-monaco", "day-trips-from-menton", "public-transport-in-menton", "menton-without-a-car"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  practicalTips: [t("Checked 5 November 2026. Terra Amata still marked closed, no confirmed reopening date. Three independent editorial outings, not the author's routes. Museum schedules, trains and private-property access require separate confirmation. Book introduction based on publisher and author materials, not full-text reading.", "Vérifié le 5 novembre 2026. Terra Amata toujours signalé fermé, sans réouverture confirmée. Trois sorties éditoriales distinctes, pas des parcours de l'auteur. Musées, trains et propriétés privées à confirmer séparément. Présentation d'après éditeur et auteur, pas une lecture intégrale.", "Verificato il 5 novembre 2026. Terra Amata ancora indicato chiuso, nessuna riapertura confermata. Tre uscite redazionali separate, non percorsi dell'autore. Musei, treni e proprietà private da confermare. Presentazione da editore e autore, non lettura integrale.", "Перевірено 5 листопада 2026. Terra Amata досі позначено закритим, дату відкриття не підтверджено. Три окремі редакційні поїздки, не маршрути автора. Музеї, потяги та приватний доступ уточнюйте окремо. Вступ за матеріалами видавця й автора, не повним прочитанням.")],
  sections,
};

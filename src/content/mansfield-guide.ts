import type { GuideArticle, LocalizedText } from "./guide";
import { formattedMarkdownGuideBody, markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/katherine-mansfield-menton-stories-isola-bella.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("The town that helped make the stories possible", "La ville qui a rendu les nouvelles possibles", "La città che rese possibili i racconti", "Місто, що допомогло з'явитися оповіданням"));
sections.forEach((section, index) => {
  const body = (locale: keyof typeof records[number]) => formattedMarkdownGuideBody(records[index][locale]);
  section.body = [t(body("en"), body("fr"), body("it"), body("uk"))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
sections[4].relatedPlaceIds = ["villa-isola-bella-menton"];
sections[13].relatedPlaceIds = ["menton-garavan-station", "boulevard-de-garavan-menton", "promenade-reine-astrid"];
sections[14].relatedPlaceIds = ["jardin-val-rahmeh"];
sections[12].guideLinkSlug = "bookshops-libraries-menton";
sections[12].guideLinkLabel = t("Bookshops and libraries in Menton", "Librairies et bibliothèques à Menton", "Librerie e biblioteche a Mentone", "Книгарні й бібліотеки Ментона");
sections[13].guideLinkSlug = "menton-without-a-car";
sections[13].guideLinkLabel = t("Plan a car-free stay", "Préparer un séjour sans voiture", "Organizzare un soggiorno senza auto", "Сплануйте відпочинок без авто");
sections[14].guideLinkSlug = "best-gardens-menton";
sections[14].guideLinkLabel = t("Compare garden openings before choosing", "Comparer les ouvertures des jardins", "Confrontare le aperture dei giardini", "Порівняйте відкриття садів перед вибором");
sections[15].guideLinkSlug = "janet-frame-menton-in-the-memorial-room";
sections[15].guideLinkLabel = t("Janet Frame and In the Memorial Room", "Janet Frame et In the Memorial Room", "Janet Frame e In the Memorial Room", "Дженет Фрейм та In the Memorial Room");

export const mansfieldGuide: GuideArticle = {
  id: "katherine-mansfield-menton-stories-isola-bella", slug: "katherine-mansfield-menton-stories-isola-bella",
  title: t("Katherine Mansfield in Menton: What She Wrote, Where She Lived and What to Read", "Katherine Mansfield à Menton : ses récits, ses maisons et que lire", "Katherine Mansfield a Mentone: racconti, case e letture", "Кетрін Менсфілд у Ментоні: твори, оселі та що читати"),
  seoTitle: t("Katherine Mansfield in Menton: Isola Bella & What to Read", "Katherine Mansfield à Menton : Isola Bella et lectures", "Katherine Mansfield a Mentone: Isola Bella e letture", "Кетрін Менсфілд у Ментоні: Isola Bella та що читати"),
  seoDescription: t("Discover Mansfield's Menton stays, stories and Isola Bella. A reading itinerary and public-street Garavan walk, with private-access and Val Rahmeh closure advice.", "Séjours, nouvelles et Isola Bella : lectures et promenade publique à Garavan, avec limites d'accès privé et fermeture de novembre à Val Rahmeh.", "Soggiorni, racconti e Isola Bella: letture e passeggiata pubblica a Garavan, con limiti d'accesso privato e chiusura di novembre a Val Rahmeh.", "Перебування, оповідання й Isola Bella: читання та громадська прогулянка Гараваном, із межами приватного доступу й закриттям Val Rahmeh у листопаді."),
  excerpt: t("Menton helped make the stories possible, but is not automatically their setting. Explore Mansfield's writing, Ida Baker's role and the later memorial through a careful reading plan and Garavan walk.", "Menton rend l'écriture possible sans être le décor de chaque récit. Mansfield, Ida Baker et le mémorial : un parcours de lecture et une promenade dans Garavan.", "Mentone rende possibile la scrittura senza essere lo scenario di ogni racconto. Mansfield, Ida Baker e il memoriale: letture e passeggiata a Garavan.", "Ментон допоміг писати, але не став місцем дії кожної історії. Менсфілд, Іда Бейкер і пізніший меморіал: маршрут читання та прогулянка Гараваном."),
  category: "walks-views", duration: "1-2 hours", publishedOn: "2026-11-05", sourceStatus: "editorial", locationTags: ["menton"],
  coverImage: "/images/guide/katherine-mansfield-menton-stories-isola-bella.png",
  coverImageAlt: t("Supplied artistic composition of a book, imagined portrait and Menton coast; not a verified published edition or authenticated archival photograph", "Composition artistique fournie : livre, portrait imaginé et littoral mentonnais ; ni édition réelle vérifiée ni photographie d'archive authentifiée", "Composizione artistica fornita con libro, ritratto immaginato e costa di Mentone; non edizione reale verificata o fotografia d'archivio autenticata", "Надана художня композиція книжки, уявного портрета й узбережжя Ментона; не перевірене видання чи автентифіковане архівне фото"),
  visualTheme: "itinerary", visualStatus: "project_illustration",
  tags: [t("Literary history", "Histoire littéraire", "Storia letteraria", "Літературна історія"), t("What to read", "Que lire", "Cosa leggere", "Що читати"), t("Garavan", "Garavan", "Garavan", "Гараван")],
  bestFor: [t("Readers and literary travellers", "Lecteurs et voyageurs littéraires", "Lettori e viaggiatori letterari", "Читачі й літературні мандрівники"), t("Modernist short stories", "Nouvelles modernistes", "Racconti modernisti", "Модерністські оповідання")],
  relatedPlaces: ["villa-isola-bella-menton", "menton-garavan-station", "boulevard-de-garavan-menton", "promenade-reine-astrid", "jardin-val-rahmeh"],
  relatedArticles: ["janet-frame-menton-in-the-memorial-room", "the-houses-that-remember-riviera-book-route", "bookshops-libraries-menton", "menton-without-a-car", "best-gardens-menton", "belle-epoque-menton-architecture-walk", "where-to-stay-in-menton"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  practicalTips: [t("Reviewed 5 November 2026. Stories written in Menton are not automatically set there; The Garden Party was composed after departure, in Switzerland. No regular public interior access to Isola Bella confirmed. Val Rahmeh announces closure 2–27 November inclusive. Allow 1–2 hours on selected public streets; slopes and pedestrian space vary. This is not a measured accessible route or the writer's reconstructed daily walk. Cover book and portrait are artistic, not documentary evidence.", "Vérifié le 5 novembre 2026. Écrit à Menton ne signifie pas situé à Menton ; The Garden Party est composé ensuite en Suisse. Accès intérieur public régulier d'Isola Bella non confirmé. Val Rahmeh fermé du 2 au 27 novembre inclus. 1–2 heures sur des rues publiques choisies ; pentes et trottoirs variables. Ni parcours accessible mesuré ni trajet quotidien reconstitué. Livre et portrait de couverture artistiques, pas preuves documentaires.", "Verificato 5 novembre 2026. Scritto a Mentone non significa ambientato qui; The Garden Party nasce dopo in Svizzera. Accesso pubblico interno regolare a Isola Bella non confermato. Val Rahmeh chiuso 2–27 novembre inclusi. 1–2 ore su strade pubbliche scelte, con pendenze e spazi variabili. Non itinerario accessibile misurato o percorso quotidiano ricostruito. Libro e ritratto artistici, non documenti.", "Перевірено 5 листопада 2026. Написано в Ментоні не означає дія в Ментоні; The Garden Party створено пізніше у Швейцарії. Регулярного громадського входу в Isola Bella не підтверджено. Val Rahmeh закритий 2–27 листопада включно. 1–2 години обраними громадськими вулицями зі схилами й різними проходами. Не виміряний доступний маршрут чи відтворений щоденний шлях. Книжка й портрет обкладинки художні, не документи.")],
  sections,
};

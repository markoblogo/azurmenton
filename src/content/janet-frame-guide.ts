import type { GuideArticle, LocalizedText } from "./guide";
import { markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/janet-frame-menton-in-the-memorial-room.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("A writer arrives in Menton", "Une écrivaine arrive à Menton", "Una scrittrice arriva a Mentone", "Письменниця приїжджає до Ментона"));
sections.forEach((section, index) => {
  const body = (locale: keyof typeof records[number]) => records[index][locale].split("\n").slice(1)
    .map(line => line.trim()).filter(line => line && !line.startsWith("|"))
    .map(line => line.replace(/^###\s+(.+)$/, "**$1**").replace(/^[-*]\s+/, "")
      .replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, "_$1_")).join("\n");
  section.body = [t(body("en"), body("fr"), body("it"), body("uk"))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
sections[5].relatedPlaceIds = ["villa-isola-bella-menton"];
sections[6].relatedPlaceIds = ["menton-garavan-station", "boulevard-de-garavan-menton", "promenade-reine-astrid"];
sections[7].relatedPlaceIds = ["jardin-val-rahmeh"];
sections[8].guideLinkSlug = "menton-without-a-car";
sections[8].guideLinkLabel = t("Plan a car-free stay", "Préparer un séjour sans voiture", "Organizza il soggiorno senza auto", "Сплануйте відпочинок без авто");
sections[9].guideLinkSlug = "bookshops-libraries-menton";
sections[9].guideLinkLabel = t("Bookshops and libraries in Menton", "Librairies et bibliothèques à Menton", "Librerie e biblioteche a Mentone", "Книгарні й бібліотеки Ментона");

export const janetFrameGuide: GuideArticle = {
  id: "janet-frame-menton-in-the-memorial-room", slug: "janet-frame-menton-in-the-memorial-room",
  title: t("Janet Frame's Menton: In the Memorial Room and the town behind the novel", "Le Menton de Janet Frame : In the Memorial Room et la ville derrière le roman", "La Mentone di Janet Frame: In the Memorial Room e la città dietro il romanzo", "Ментон Дженет Фрейм: In the Memorial Room і місто за сторінками роману"),
  seoTitle: t("Janet Frame's Menton: In the Memorial Room & Literary Walk", "Janet Frame à Menton : In the Memorial Room et promenade littéraire", "Janet Frame a Mentone: In the Memorial Room e passeggiata letteraria", "Дженет Фрейм у Ментоні: In the Memorial Room і літературна прогулянка"),
  seoDescription: t("Explore Janet Frame's Menton, In the Memorial Room, Katherine Mansfield and Villa Isola Bella. A spoiler-free Garavan walk with public-access advice.", "Janet Frame, Katherine Mansfield et Isola Bella : une promenade littéraire à Garavan, sans révéler l'intrigue, avec les limites réelles d'accès.", "Janet Frame, Katherine Mansfield e Isola Bella: passeggiata letteraria a Garavan senza spoiler, con informazioni sull'accesso pubblico.", "Дженет Фрейм, Кетрін Менсфілд і Villa Isola Bella: прогулянка Гараваном без спойлерів із перевіреними застереженнями щодо доступу."),
  excerpt: t("A black comedy, a real literary fellowship and the Garavan streets behind them. Discover Frame and Mansfield without confusing fiction with biography or private homes with museums.", "Une comédie noire, une vraie résidence et les rues de Garavan : découvrir Frame et Mansfield sans confondre fiction, biographie et accès aux villas.", "Una commedia nera, una vera residenza e le vie di Garavan: Frame e Mansfield fra finzione, biografia e limiti d'accesso alle ville.", "Чорна комедія, справжня стипендія й вулиці Гаравана: Фрейм і Менсфілд без плутанини між вигадкою, біографією та доступом до приватних вілл."),
  category: "walks-views", duration: "flexible", publishedOn: "2026-10-31", sourceStatus: "editorial",
  coverImage: "/images/guide/janet-frame-menton-in-the-memorial-room.png",
  coverImageAlt: t("Illustration of In the Memorial Room on a Mediterranean terrace overlooking Menton", "Illustration d'In the Memorial Room sur une terrasse méditerranéenne dominant Menton", "Illustrazione di In the Memorial Room su una terrazza mediterranea sopra Mentone", "Ілюстрація In the Memorial Room на середземноморській терасі з видом на Ментон"),
  visualTheme: "itinerary", visualStatus: "project_illustration",
  tags: [t("Literary places", "Lieux littéraires", "Luoghi letterari", "Літературні місця"), t("Janet Frame", "Janet Frame", "Janet Frame", "Дженет Фрейм"), t("Katherine Mansfield", "Katherine Mansfield", "Katherine Mansfield", "Кетрін Менсфілд")],
  bestFor: [t("Readers and writers", "Lecteurs et écrivains", "Lettori e scrittori", "Читачі й письменники"), t("Cultural history and slow walks", "Histoire culturelle et balades lentes", "Storia culturale e passeggiate tranquille", "Історія культури й неквапливі прогулянки")],
  locationTags: ["garavan"],
  relatedPlaces: sections.flatMap(section => section.relatedPlaceIds ?? []),
  relatedArticles: ["the-houses-that-remember-riviera-book-route", "a-week-in-menton-book-walking-route", "jean-cocteau-menton-walking-route", "belle-epoque-menton-architecture-walk", "bookshops-libraries-menton", "menton-without-a-car"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  showTransportHelper: false,
  practicalTips: [t("Allow 1.5–3 hours according to the chosen walk. Isola Bella has no confirmed regular public interior access; choose public streets and verify garden opening before adding a visit.", "Prévoyez 1 h 30 à 3 h selon le parcours. Aucune visite intérieure régulière n'est confirmée à Isola Bella ; restez sur les voies publiques et vérifiez l'ouverture des jardins.", "Prevedi 1,5–3 ore secondo il percorso. Nessun accesso interno pubblico regolare è confermato a Isola Bella; resta sulle vie pubbliche e controlla l'apertura dei giardini.", "Передбачте 1,5–3 години залежно від маршруту. Регулярний публічний доступ усередину Isola Bella не підтверджений; обирайте громадські вулиці й перевіряйте відкриття садів.")],
  sections,
};

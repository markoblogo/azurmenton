import type { GuideArticle, LocalizedText } from "./guide";
import { formattedMarkdownGuideBody, markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/best-hilltop-villages-near-menton.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("One morning, four very different choices", "Une matinée, quatre choix différents", "Una mattina, quattro scelte diverse", "Один ранок, чотири різні варіанти"));
sections.forEach((section, index) => {
  const body = (locale: keyof typeof records[number]) => formattedMarkdownGuideBody(records[index][locale]);
  section.body = [t(body("en"), body("fr"), body("it"), body("uk"))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
sections[2].relatedPlaceIds = ["sainte-agnes"];
sections[3].relatedPlaceIds = ["gorbio"];
sections[3].guideLinkSlug = "music-videos-filmed-in-menton";
sections[3].guideLinkLabel = t("Gorbio and the Riviera in music videos", "Gorbio et la Riviera dans les clips", "Gorbio e la Riviera nei videoclip", "Gorbio й Рив'єра в музичних відео");
sections[4].relatedPlaceIds = ["place-clemenceau-castellar"];
sections[5].relatedPlaceIds = ["roquebrune-medieval-village"];
sections[6].guideLinkSlug = "menton-accessible-step-free-walks";
sections[6].guideLinkLabel = t("Step-free alternatives in Menton", "Des alternatives sans marches à Menton", "Alternative senza gradini a Mentone", "Альтернативи без сходів у Ментоні");
sections[7].guideLinkSlug = "public-transport-in-menton";
sections[7].guideLinkLabel = t("Public transport in Menton", "Transports publics à Menton", "Trasporti pubblici a Mentone", "Громадський транспорт Ментона");
sections[8].guideLinkSlug = "menton-without-a-car";
sections[8].guideLinkLabel = t("Plan a car-free stay", "Préparer un séjour sans voiture", "Organizza un soggiorno senza auto", "Сплануйте відпочинок без автомобіля");

export const hilltopVillagesGuide: GuideArticle = {
  id: "best-hilltop-villages-near-menton", slug: "best-hilltop-villages-near-menton",
  title: t("The Hilltop Villages Above Menton: Which One Should You Visit?", "Les villages perchés au-dessus de Menton : lequel visiter ?", "I borghi sulle colline sopra Mentone: quale visitare?", "Гірські села над Ментоном: яке обрати для поїздки?"),
  seoTitle: t("Best Hilltop Villages Near Menton: Which One to Visit?", "Villages perchés près de Menton : lequel choisir ?", "Borghi vicino a Mentone: Sainte-Agnès, Gorbio e dintorni", "Гірські села біля Ментона: Sainte-Agnès, Gorbio й інші"),
  seoDescription: t("Compare Sainte-Agnès, Gorbio, Castellar and old Roquebrune for views, stairs, Zest buses, lunch and a relaxed half-day trip from Menton.", "Comparez Sainte-Agnès, Gorbio, Castellar et le vieux Roquebrune : vues, pentes, bus Zest, déjeuner et retour pour une demi-journée depuis Menton.", "Confronta Sainte-Agnès, Gorbio, Castellar e vecchia Roquebrune: panorami, scale, bus Zest, pranzo e ritorno per una gita da Mentone.", "Порівняйте Sainte-Agnès, Gorbio, Castellar і старий Roquebrune: панорами, сходи, автобуси Zest, обід і повернення до Ментона за пів дня."),
  excerpt: t("Big panoramas, a shaded village square, Italian-looking lanes or a medieval castle? Choose one of four hill villages and plan the return before leaving Menton.", "Panoramas, place ombragée, ruelles aux airs d'Italie ou château ? Choisissez un village et préparez le retour avant de quitter Menton.", "Panorami, piazza all'ombra, vicoli italiani o castello? Scegli un borgo e organizza il ritorno prima di lasciare Mentone.", "Панорами, затінена площа, італійські провулки чи замок? Оберіть одне село й сплануйте повернення ще до виїзду з Ментона."),
  category: "day-trips", duration: "half-day", publishedOn: "2026-11-03", sourceStatus: "editorial",
  coverImage: "/images/guide/best-hilltop-villages-near-menton.png",
  coverImageAlt: t("Project illustration of a traveller overlooking a Riviera hill village and the sea; an illustrative scene, not a verified view of one of the four villages", "Illustration d'une voyageuse devant un village perché et la mer ; scène illustrative, pas une vue vérifiée de l'un des quatre villages", "Illustrazione di una viaggiatrice davanti a un borgo e al mare; scena illustrativa, non una veduta verificata dei quattro paesi", "Ілюстрація мандрівниці біля гірського села й моря; художня сцена, не перевірений вид одного з чотирьох сіл"),
  visualTheme: "itinerary", visualStatus: "project_illustration", locationTags: ["menton", "day-trip"],
  tags: [t("Hill villages", "Villages perchés", "Borghi in collina", "Гірські села"), t("Heritage", "Patrimoine", "Patrimonio", "Спадщина"), t("Half-day trips", "Demi-journées", "Gite di mezza giornata", "Поїздки на пів дня")],
  bestFor: [t("Couples and photographers", "Couples et photographes", "Coppie e fotografi", "Пари й фотографи"), t("History lovers and slow travellers", "Amateurs d'histoire et de voyages lents", "Appassionati di storia e viaggi lenti", "Любителі історії та неквапних подорожей")],
  relatedPlaces: [...new Set(sections.flatMap(section => section.relatedPlaceIds ?? []))],
  relatedArticles: ["day-trips-from-menton", "best-walks-and-hikes-around-menton", "best-photo-spots-menton", "public-transport-in-menton", "menton-without-a-car", "menton-accessible-step-free-walks", "barbecue-picnic-areas-near-menton", "roya-valley-day-trip-from-menton", "christmas-french-riviera-from-menton", "music-videos-filmed-in-menton"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  practicalTips: [t("Allow roughly 3–5 hours including travel as an editorial estimate. Choose one village, confirm the return and any lunch or fort booking. Checked 3 November 2026: Zest 5 to Gorbio, 6 to Castellar, 10 to Sainte-Agnès and 24 towards Vieux Roquebrune. Route labels are not confirmed departures. No step-free village circuit is promised.", "Comptez environ 3–5 h avec trajet, estimation éditoriale. Un seul village, retour et repas ou fort confirmés. Vérifié le 3 novembre 2026 : Zest 5 Gorbio, 6 Castellar, 10 Sainte-Agnès et 24 Vieux Roquebrune. Intitulés, pas départs garantis. Aucun circuit sans marches promis.", "Prevedi circa 3–5 ore con viaggio, stima editoriale. Un solo borgo, ritorno e pranzo o forte confermati. Verificato il 3 novembre 2026: Zest 5 Gorbio, 6 Castellar, 10 Sainte-Agnès e 24 Vieux Roquebrune. Nomi delle linee, non partenze garantite. Nessun circuito senza gradini promesso.", "Закладайте близько 3–5 годин із дорогою як редакційну оцінку. Одне село, підтверджене повернення, обід або форт. Перевірено 3 листопада 2026: Zest 5 Gorbio, 6 Castellar, 10 Sainte-Agnès та 24 Vieux Roquebrune. Назви, не гарантії рейсів. Маршруту без сходів не обіцяємо.")],
  sections,
};

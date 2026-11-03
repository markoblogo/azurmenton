import type { GuideArticle, LocalizedText } from "./guide";
import { formattedMarkdownGuideBody, markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/best-gardens-menton.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("Choosing a garden in Menton", "Choisir un jardin à Menton", "Scegliere un giardino a Mentone", "Обираємо сад у Ментоні"));
sections.forEach((section, index) => {
  const body = (locale: keyof typeof records[number]) => formattedMarkdownGuideBody(records[index][locale]);
  section.body = [t(body("en"), body("fr"), body("it"), body("uk"))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
const gardenIds = ["jardin-val-rahmeh", "jardin-serre-de-la-madone", "jardin-fontana-rosa-menton", "villa-maria-serena", "palais-carnoles-menton", "les-colombieres-menton", "jardins-bioves"];
gardenIds.forEach((id, index) => { sections[index + 2].relatedPlaceIds = [id]; });
sections[11].guideLinkSlug = "menton-accessible-step-free-walks";
sections[11].guideLinkLabel = t("Compare step-free walks", "Comparer les promenades sans marches", "Confronta passeggiate senza gradini", "Порівняйте прогулянки без сходів");
sections[12].guideLinkSlug = "public-transport-in-menton";
sections[12].guideLinkLabel = t("Check local transport", "Vérifier les transports locaux", "Controlla i trasporti locali", "Перевірте місцевий транспорт");

export const gardensGuide: GuideArticle = {
  id: "best-gardens-menton", slug: "best-gardens-menton",
  title: t("The Best Gardens in Menton: Which One Should You Visit?", "Les plus beaux jardins de Menton : lequel visiter ?", "I migliori giardini di Mentone: quale visitare?", "Найкращі сади Ментона: який відвідати?"),
  seoTitle: t("Best Gardens in Menton: Compare Seven Visits", "Jardins de Menton : comparer sept visites", "Giardini di Mentone: sette visite a confronto", "Сади Ментона: порівняння семи місць"),
  seoDescription: t("Compare seven Menton gardens by atmosphere, cost, booking and access, with November 2026 closures and uncertain future guided visits clearly marked.", "Comparez sept jardins de Menton : ambiance, tarifs, réservation et accès, avec fermetures de novembre 2026 et visites futures non confirmées.", "Confronta sette giardini di Mentone: atmosfera, prezzi, prenotazioni e accesso, con chiusure di novembre 2026 e visite future non confermate.", "Порівняйте сім садів Ментона: атмосфера, ціни, бронювання й доступ, з позначенням закриттів листопада 2026 та непідтверджених екскурсій."),
  excerpt: t("Tropical planting, citrus collections, literary ceramics or a free central stroll: choose the right garden, then check its actual opening and booking conditions.", "Plantes tropicales, agrumes, céramiques littéraires ou promenade gratuite : choisissez votre jardin, puis vérifiez ouverture et réservation.", "Piante tropicali, agrumi, ceramiche letterarie o una passeggiata gratuita: scegli il giardino e verifica apertura e prenotazioni.", "Тропічні рослини, цитрусові, літературна кераміка чи безкоштовна прогулянка: оберіть сад і перевірте відкриття та бронювання."),
  category: "walks-views", duration: "reference", publishedOn: "2026-11-03", sourceStatus: "editorial",
  coverImage: "/images/guide/best-gardens-menton.png",
  coverImageAlt: t("Project illustration of a Mediterranean garden terrace overlooking Menton; a composite, not a verified view, entrance or flowering season of one listed garden", "Illustration d'une terrasse méditerranéenne face à Menton ; composition, pas vue, entrée ou saison de floraison vérifiée d'un jardin précis", "Illustrazione di una terrazza mediterranea su Mentone; composizione, non vista, ingresso o stagione di fioritura verificata di un singolo giardino", "Ілюстрація середземноморської тераси над Ментоном; композиція, не перевірений вид, вхід чи сезон цвітіння конкретного саду"),
  visualTheme: "garden", visualStatus: "project_illustration", locationTags: ["menton"],
  tags: [t("Gardens", "Jardins", "Giardini", "Сади"), t("Botany and heritage", "Botanique et patrimoine", "Botanica e patrimonio", "Ботаніка й спадщина")],
  bestFor: [t("Garden lovers", "Amateurs de jardins", "Appassionati di giardini", "Любителі садів"), t("Choosing a slower half-day", "Choisir une demi-journée tranquille", "Scegliere una mezza giornata tranquilla", "Вибір неспішного півдня")],
  relatedPlaces: gardenIds,
  relatedArticles: ["menton-in-autumn", "menton-in-winter", "menton-lemons-producers-orchards-tastings", "menton-accessible-step-free-walks", "menton-with-kids-family-guide", "public-transport-in-menton", "stay-cool-in-menton-summer"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  practicalTips: [t("Checked 3 November 2026. Val Rahmeh is closed through 27 November, reopening planned on 28 November. Serre de la Madone announces annual closure in November and December despite a conflicting generic open panel. Carnolès garden is weekend-only; its museum is closed. No future Maria Serena or Colombières session is confirmed here. Confirm your date with the operator. Visit lengths are editorial estimates, not accessibility audits.", "Vérifié le 3 novembre 2026. Val Rahmeh fermé jusqu'au 27 novembre, réouverture prévue le 28. Serre de la Madone annonce une fermeture en novembre et décembre malgré un panneau générique contraire. Jardin Carnolès uniquement le week-end ; musée fermé. Aucune séance future Maria Serena ou Colombières confirmée ici. Confirmez votre date. Durées estimées, pas audits d'accessibilité.", "Verificato il 3 novembre 2026. Val Rahmeh chiuso fino al 27 novembre, riapertura prevista il 28. Serre de la Madone annuncia chiusura a novembre e dicembre nonostante un pannello generico contrario. Giardino Carnolès solo nel fine settimana; museo chiuso. Nessuna futura visita Maria Serena o Colombières confermata qui. Conferma la data. Durate stimate, non audit di accessibilità.", "Перевірено 3 листопада 2026. Val Rahmeh закритий до 27 листопада, відкриття заплановане на 28-ме. Serre de la Madone оголошує закриття в листопаді й грудні попри суперечливий загальний блок. Сад Carnolès лише вихідними; музей закритий. Майбутні сеанси Maria Serena та Colombières тут не підтверджені. Уточнюйте дату в оператора. Тривалість орієнтовна, не аудит доступності.")],
  sections,
};

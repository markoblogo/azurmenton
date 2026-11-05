import type { GuideArticle, LocalizedText } from "./guide";
import { formattedMarkdownGuideBody, markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/menton-sundays-public-holidays.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("A relaxed Sunday", "Un dimanche serein", "Una domenica tranquilla", "Спокійна неділя"));
sections.forEach((section, index) => {
  const body = (locale: keyof typeof records[number]) => formattedMarkdownGuideBody(records[index][locale]);
  section.body = [t(body("en"), body("fr"), body("it"), body("uk"))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
const sectionPlaces: Record<number, string[]> = {
  3: ["halles-du-marche", "intermarche-hyper-menton", "carrefour-city-felix-faure", "carrefour-city-sospel-menton", "carrefour-city-thiers-menton"],
  6: ["promenade-du-soleil", "jardins-bioves", "esplanade-des-sablettes-menton", "rue-longue-menton", "basilica-saint-michel-archange"],
  8: ["jardin-val-rahmeh"],
  9: ["menton-station"],
};
for (const [index, ids] of Object.entries(sectionPlaces)) sections[Number(index)].relatedPlaceIds = ids;
for (const [index, slug, label] of [
  [3, "supermarkets-in-menton", t("Compare Menton's supermarkets", "Comparer les supermarchés", "Confronta i supermercati", "Порівняйте супермаркети")],
  [8, "best-gardens-menton", t("Choose a garden", "Choisir un jardin", "Scegli un giardino", "Оберіть сад")],
  [9, "public-transport-in-menton", t("Plan local transport", "Préparer les transports", "Organizza i trasporti", "Сплануйте транспорт")],
  [11, "pharmacies-in-menton-and-nice-airport", t("Find pharmacy information", "Informations sur les pharmacies", "Informazioni sulle farmacie", "Інформація про аптеки")],
] as const) {
  sections[index].guideLinkSlug = slug;
  sections[index].guideLinkLabel = label;
}

export const sundayGuide: GuideArticle = {
  id: "menton-sundays-public-holidays", slug: "menton-sundays-public-holidays",
  title: t("What to Do in Menton on Sundays and Public Holidays", "Que faire à Menton le dimanche et les jours fériés ?", "Cosa fare a Mentone la domenica e nei giorni festivi", "Що робити в Ментоні в неділю та святкові дні"),
  seoTitle: t("Menton on Sundays and Public Holidays: Practical Guide", "Menton le dimanche et les jours fériés : guide pratique", "Mentone la domenica e nei festivi: guida pratica", "Ментон у неділю та свята: практичний гід"),
  seoDescription: t("Plan Sunday shopping, restaurants, walks and transport in Menton. Separate ordinary hours from public-holiday exceptions and check current closures before travelling.", "Courses, restaurants, promenades et transports à Menton le dimanche : horaires ordinaires, exceptions fériées et fermetures à vérifier avant de partir.", "Spesa, ristoranti, passeggiate e trasporti a Mentone la domenica: orari ordinari, eccezioni festive e chiusure da verificare prima di partire.", "Покупки, ресторани, прогулянки й транспорт у Ментоні в неділю: звичайні години, святкові винятки та закриття, які варто перевірити перед поїздкою."),
  excerpt: t("Prepare breakfast, keep a backup meal and enjoy a flexible Sunday by the sea, without treating ordinary opening hours as a holiday guarantee.", "Préparez le petit déjeuner, gardez un repas de secours et profitez d'un dimanche souple au bord de la mer, sans confondre horaires ordinaires et jours fériés.", "Prepara la colazione, conserva un pasto di riserva e goditi una domenica flessibile al mare, distinguendo orari ordinari e festivi.", "Підготуйте сніданок, залиште запасний обід і насолоджуйтеся гнучкою неділею біля моря, не плутаючи звичайні години зі святковими."),
  category: "practical", duration: "reference", publishedOn: "2026-11-05", sourceStatus: "editorial",
  coverImage: "/images/guide/menton-sundays-public-holidays.png",
  coverImageAlt: t("Artistic project illustration of a market and seaside promenade in Menton, not a verified Sunday programme or documentary photograph", "Illustration artistique du projet : marché et promenade à Menton, pas un programme dominical vérifié ni une photo documentaire", "Illustrazione artistica del progetto: mercato e lungomare a Mentone, non programma domenicale verificato o foto documentaria", "Художня ілюстрація проєкту: ринок і набережна Ментона, не підтверджена недільна програма чи документальне фото"),
  visualTheme: "itinerary", visualStatus: "project_illustration", locationTags: ["menton"],
  tags: [t("Sunday", "Dimanche", "Domenica", "Неділя"), t("Public holidays", "Jours fériés", "Festivi", "Святкові дні")],
  bestFor: [t("Weekend visitors", "Séjours de week-end", "Soggiorni nel fine settimana", "Гості на вихідні"), t("Apartment stays", "Séjours en appartement", "Soggiorni in appartamento", "Проживання в апартаментах")],
  relatedPlaces: Object.values(sectionPlaces).flat(),
  relatedArticles: ["useful-apps-websites-menton-monaco-italian-riviera", "supermarkets-in-menton", "halles-du-marche-menton", "first-evening-menton-late-arrival", "best-gardens-menton", "public-transport-in-menton", "pharmacies-in-menton-and-nice-airport", "menton-without-a-car", "menton-old-town"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  practicalTips: [t("Checked 5 November 2026. Confirm the exact date, not just the weekday: 11 November has separate shop exceptions. Val Rahmeh closed 2–27 November. Sunday-night rail works affect the Nice–Vintimille line. Public access and restaurant service are not guaranteed.", "Vérifié le 5 novembre 2026. Confirmez la date précise : le 11 novembre a ses exceptions commerciales. Val Rahmeh fermé du 2 au 27 novembre. Travaux ferroviaires le dimanche soir sur Nice–Vintimille. Accès et restauration non garantis.", "Verificato il 5 novembre 2026. Conferma la data esatta: l'11 novembre ha eccezioni commerciali. Val Rahmeh chiuso dal 2 al 27 novembre. Lavori ferroviari la domenica sera su Nizza–Ventimiglia. Accesso e ristorazione non garantiti.", "Перевірено 5 листопада 2026. Уточнюйте конкретну дату: 11 листопада має окремі магазинні винятки. Val Rahmeh закрито 2–27 листопада. Недільні нічні роботи зачіпають лінію Ніцца–Вентимілья. Доступ і ресторанне обслуговування не гарантовані.")],
  sections,
};

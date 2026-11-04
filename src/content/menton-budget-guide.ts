import type { GuideArticle, LocalizedText } from "./guide";
import { formattedMarkdownGuideBody, markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/menton-holiday-budget.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("Plan spending, not a fixed-price package", "Prévoir ses dépenses, pas un forfait garanti", "Pianificare la spesa, non un pacchetto garantito", "План витрат, не пакет із гарантованою ціною"));
sections.forEach((section, index) => {
  const body = (locale: keyof typeof records[number]) => formattedMarkdownGuideBody(records[index][locale]);
  section.body = [t(body("en"), body("fr"), body("it"), body("uk"))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
sections[3].relatedPlaceIds = ["halles-du-marche"];
sections[4].relatedPlaceIds = ["menton-station"];
sections[5].relatedPlaceIds = ["plage-sablettes", "jardin-serre-de-la-madone"];
sections[3].guideLinkSlug = "cheap-eats-menton-budget-lunch";
sections[3].guideLinkLabel = t("Explore simple lunch options", "Explorer les déjeuners simples", "Scoprire pranzi semplici", "Варіанти простих обідів");
sections[4].guideLinkSlug = "public-transport-in-menton";
sections[4].guideLinkLabel = t("Check transport and ticket conditions", "Vérifier transports et conditions des billets", "Verificare trasporti e condizioni dei biglietti", "Перевірте транспорт і умови квитків");
sections[5].guideLinkSlug = "best-gardens-menton";
sections[5].guideLinkLabel = t("Check garden openings before choosing", "Vérifier l'ouverture des jardins", "Verificare le aperture dei giardini", "Перевірте відкриття садів");

export const mentonBudgetGuide: GuideArticle = {
  id: "menton-holiday-budget", slug: "menton-holiday-budget",
  title: t("How Much Does a Holiday in Menton Cost? 3, 7 and 14-Day Budgets", "Quel budget pour des vacances à Menton ? 3, 7 et 14 jours", "Quanto costa una vacanza a Mentone? Budget per 3, 7 e 14 giorni", "Скільки коштує відпочинок у Ментоні? Бюджети на 3, 7 і 14 днів"),
  seoTitle: t("Menton Holiday Budget: 3, 7 & 14 Days, Excluding Accommodation", "Budget vacances à Menton : 3, 7 et 14 jours hors hébergement", "Budget vacanze a Mentone: 3, 7 e 14 giorni senza alloggio", "Бюджет відпочинку в Ментоні: 3, 7 і 14 днів без проживання"),
  seoDescription: t("Compare €40, €85 and €155 daily planning budgets for food, restaurants, transport and activities in Menton. Accommodation and travel to Menton are excluded.", "Comparez des budgets de 40, 85 et 155 € par jour pour repas, transports et loisirs à Menton. Hébergement et trajet jusqu'à Menton exclus ; hypothèses, pas devis.", "Confrontate budget di 40, 85 e 155 € al giorno per cibo, mezzi e attività a Mentone. Alloggio e viaggio esclusi: ipotesi di spesa, non preventivi.", "Порівняйте бюджети 40, 85 і 155 € на день на їжу, транспорт і заняття в Ментоні. Без проживання й дороги до міста: сценарії, не гарантовані ціни."),
  excerpt: t("Three spending styles for a weekend, a week or a fortnight: groceries, restaurants, public transport and optional experiences, with clear exclusions and arithmetic you can adapt.", "Trois styles de dépenses pour un week-end, une semaine ou deux : courses, restaurants, transports et loisirs, avec exclusions claires et calculs adaptables.", "Tre stili di spesa per un weekend, una settimana o due: spesa, ristoranti, mezzi ed esperienze, con esclusioni chiare e calcoli adattabili.", "Три стилі витрат на вихідні, тиждень або два: продукти, ресторани, транспорт і враження, з чіткими винятками та зрозумілими розрахунками."),
  category: "practical", duration: "reference", publishedOn: "2026-11-04", sourceStatus: "editorial", locationTags: ["menton"],
  coverImage: "/images/guide/menton-holiday-budget.png",
  coverImageAlt: t("Artistic illustration of a meal overlooking Menton; not a menu or a promise of a meal at a stated price", "Illustration artistique d'un repas face à Menton ; ni menu ni promesse de repas à un prix donné", "Illustrazione artistica di un pasto con vista su Mentone; non menu o promessa di prezzo", "Художня ілюстрація страви з краєвидом Ментона; не меню чи обіцянка конкретної ціни"),
  visualTheme: "food", visualStatus: "project_illustration",
  tags: [t("Holiday budget", "Budget vacances", "Budget vacanze", "Бюджет відпочинку"), t("Practical planning", "Préparation pratique", "Organizzazione pratica", "Практичне планування")],
  bestFor: [t("Apartment guests and first visits", "Séjours en appartement et premières visites", "Ospiti in appartamento e prime visite", "Гості апартаментів і перші візити"), t("Couples and families", "Couples et familles", "Coppie e famiglie", "Пари й родини")],
  relatedPlaces: ["halles-du-marche", "menton-station", "plage-sablettes", "jardin-serre-de-la-madone"],
  relatedArticles: ["useful-apps-websites-menton-monaco-italian-riviera", "cheap-eats-menton-budget-lunch", "supermarkets-in-menton", "halles-du-marche-menton", "public-transport-in-menton", "best-gardens-menton", "best-beaches-in-menton", "menton-with-kids-family-guide", "where-to-stay-in-menton"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  practicalTips: [t("Official fares checked 4 November 2026. €40/85/155 per adult per day are editorial planning allowances, not surveyed averages or guaranteed packages. Accommodation, tourist tax, travel to Menton, airport transfers and car costs are separate. Do not assume SudAzur includes Italy. Serre de la Madone announces closure for November–December 2026; listed tariffs do not establish a currently available visit. Food and beach ranges are indicative, not verified quotes.", "Tarifs officiels vérifiés le 4 novembre 2026. 40/85/155 € par adulte et par jour sont des hypothèses éditoriales, pas des moyennes mesurées ou forfaits garantis. Hébergement, taxe de séjour, voyage, transferts et voiture à part. Ne supposez pas l'Italie incluse dans SudAzur. Serre de la Madone annonce une fermeture novembre–décembre 2026 ; son tarif ne garantit pas une visite disponible. Repas et plages : estimations, non devis.", "Tariffe ufficiali verificate 4 novembre 2026. 40/85/155 € per adulto al giorno sono ipotesi editoriali, non medie misurate o pacchetti garantiti. Alloggio, tassa di soggiorno, viaggio, trasferimenti e auto a parte. Non presumere l'Italia inclusa in SudAzur. Serre de la Madone annuncia chiusura novembre–dicembre 2026; tariffa non equivale a visita disponibile. Cibo e spiagge: stime, non preventivi.", "Офіційні тарифи перевірено 4 листопада 2026. 40/85/155 € на дорослого на день — редакційні припущення, не виміряні середні чи гарантовані пакети. Проживання, туристичний збір, дорога, трансфери й авто окремо. Не вважайте Італію включеною в SudAzur. Serre de la Madone закритий у листопаді–грудні 2026; тариф не гарантує доступного візиту. Їжа й пляжі — оцінки, не пропозиції закладів.")],
  sections,
};

import type { GuideArticle, LocalizedText } from "./guide";
import { formattedMarkdownGuideBody, markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/winter-in-menton-one-two-months.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("A winter home by the sea", "Un chez-soi d'hiver près de la mer", "Una casa d'inverno sul mare", "Зимовий дім біля моря"));
sections.forEach((section, index) => {
  const body = (locale: keyof typeof records[number]) => formattedMarkdownGuideBody(records[index][locale]);
  section.body = [t(body("en"), body("fr"), body("it"), body("uk"))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
sections[3].relatedApartmentKeys = ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"];
sections[4].guideLinkSlug = "coworking-remote-work-menton";
sections[4].guideLinkLabel = t("Check your remote-work setup", "Préparer le télétravail", "Preparare il lavoro da remoto", "Перевірте умови дистанційної роботи");
sections[6].guideLinkSlug = "public-transport-in-menton";
sections[6].guideLinkLabel = t("Compare transport options", "Comparer les transports", "Confrontare i trasporti", "Порівняйте транспорт");
sections[7].relatedPlaceIds = ["halles-du-marche", "intermarche-hyper-menton"];
sections[8].relatedPlaceIds = ["promenade-du-soleil"];
sections[9].relatedPlaceIds = ["jardin-val-rahmeh", "menton-station"];
sections[9].guideLinkSlug = "best-gardens-menton";
sections[9].guideLinkLabel = t("Check garden access before going", "Vérifier l'accès aux jardins", "Verificare accessi ai giardini", "Перевірте доступ до садів");
sections[10].guideLinkSlug = "fete-du-citron-menton-practical-guide";
sections[10].guideLinkLabel = t("Plan the festival period", "Préparer la période de fête", "Preparare il periodo del festival", "Сплануйте фестивальний період");

export const winterLongStayGuide: GuideArticle = {
  id: "winter-in-menton-one-two-months", slug: "winter-in-menton-one-two-months",
  title: t("Winter in Menton for One or Two Months: A Practical Guide to Living by the Sea", "Un ou deux mois d'hiver à Menton : vivre au bord de la mer", "Uno o due mesi d'inverno a Mentone: vivere vicino al mare", "Один або два зимові місяці в Ментоні: життя біля моря"),
  seoTitle: t("Winter in Menton: One or Two Months by the Sea", "Hiver à Menton : un ou deux mois au bord de la mer", "Inverno a Mentone: uno o due mesi sul mare", "Зима в Ментоні: один або два місяці біля моря"),
  seoDescription: t("Plan 30–60 winter days in Menton: heating, daylight, Wi-Fi, monthly budget scenarios, everyday shopping and checks before requesting an apartment.", "Préparez 30–60 jours d'hiver à Menton : chauffage, lumière, Wi-Fi, scénarios de budget, courses et questions avant de demander un appartement.", "Organizza 30–60 giorni invernali a Mentone: riscaldamento, luce, Wi-Fi, scenari di budget, spesa e verifiche prima di richiedere un alloggio.", "Сплануйте 30–60 зимових днів у Ментоні: опалення, світло, Wi-Fi, сценарії бюджету, продукти й перевірки перед запитом апартаментів."),
  excerpt: t("A warm apartment and a workable routine matter more than a packed itinerary. Compare winter conditions and clearly labelled budget assumptions before choosing your dates.", "Un appartement chaud et une routine pratique comptent plus qu'un programme chargé. Comparez conditions hivernales et budgets indicatifs avant de choisir vos dates.", "Casa calda e routine pratica contano più di un programma pieno. Confronta condizioni invernali e budget ipotetici prima delle date.", "Тепле житло й зручний ритм важливіші за насичений маршрут. Порівняйте зимові умови та умовні бюджети перед вибором дат."),
  category: "practical", duration: "reference", publishedOn: "2026-11-05", sourceStatus: "editorial", locationTags: ["menton"],
  coverImage: "/images/guide/winter-in-menton-one-two-months.png",
  coverImageAlt: t("Artistic winter-living illustration with a laptop and sea view of Menton; not a photograph or a guarantee of an advertised apartment's view, equipment or sunlight", "Illustration de vie hivernale avec ordinateur et vue sur Menton ; ni photo ni garantie de vue, équipement ou soleil d'un appartement proposé", "Illustrazione di vita invernale con computer e vista su Mentone; non foto o garanzia di vista, dotazioni o sole di un alloggio offerto", "Художня ілюстрація зимового побуту з ноутбуком і видом Ментона; не фото чи гарантія краєвиду, оснащення або сонця в пропонованому житлі"),
  visualTheme: "itinerary", visualStatus: "project_illustration",
  tags: [t("Winter stays", "Séjours d'hiver", "Soggiorni invernali", "Зимові поїздки"), t("One or two months", "Un ou deux mois", "Uno o due mesi", "Один або два місяці")],
  bestFor: [t("Couples, retirees and slow travellers", "Couples, retraités et voyageurs lents", "Coppie, pensionati e viaggiatori lenti", "Пари, пенсіонери й неспішні мандрівники"), t("Remote workers after checking conditions", "Télétravailleurs après vérifications", "Lavoratori da remoto dopo le verifiche", "Дистанційні працівники після перевірок")],
  relatedPlaces: ["menton-station", "halles-du-marche", "intermarche-hyper-menton", "promenade-du-soleil", "jardin-val-rahmeh"],
  relatedArticles: ["long-stay-menton-apartment-living", "menton-in-winter", "menton-in-autumn", "winter-walks-menton-sunshine-short-routes", "useful-apps-websites-menton-monaco-italian-riviera", "where-to-stay-in-menton", "supermarkets-in-menton", "menton-holiday-budget", "coworking-remote-work-menton", "laundry-laundromats-menton", "public-transport-in-menton", "fete-du-citron-menton-practical-guide", "best-gardens-menton"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  showTransportHelper: true, transportHelperAfterSectionIndex: 6,
  practicalTips: [t("Sources checked 5 November 2026. €1,970/3,000/4,460 monthly totals and €1,200/1,700/2,500 housing figures are constructed examples, not current market quotes or Azur Menton prices. Confirm heating, electricity limits, daylight, Wi-Fi, stairs, rental terms, insurance and personal stay/work rights. Zest monthly validity is calendar-based. Garden openings and festival access need date-specific checks. Requests are manual, not booking confirmations.", "Sources vérifiées le 5 novembre 2026. Totaux de €1 970/3 000/4 460 et logements de €1 200/1 700/2 500 : hypothèses, pas loyers vérifiés ni tarifs Azur Menton. Confirmez chauffage, limites électriques, lumière, Wi-Fi, escaliers, location, assurance et droits personnels. Mensuel Zest calendaire. Jardins et fête selon dates. Demande manuelle, pas confirmation.", "Fonti controllate il 5 novembre 2026. Totali €1.970/3.000/4.460 e alloggi €1.200/1.700/2.500: ipotesi, non affitti verificati o tariffe Azur Menton. Conferma riscaldamento, limiti elettrici, luce, Wi-Fi, scale, contratto, assicurazione e diritti personali. Mensile Zest di calendario. Giardini e festival da verificare per data. Richiesta manuale, non conferma.", "Джерела перевірено 5 листопада 2026. Разом €1 970/3 000/4 460 і житло €1 200/1 700/2 500 — припущення, не перевірена оренда чи тарифи Azur Menton. Уточніть опалення, ліміти електрики, світло, Wi-Fi, сходи, оренду, страхування й особисті права. Місячний Zest календарний. Сади й фестиваль перевіряйте на дату. Запит ручний, не підтвердження.")],
  sections,
};

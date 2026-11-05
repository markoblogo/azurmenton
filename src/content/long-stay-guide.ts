import type { GuideArticle, LocalizedText } from "./guide";
import { formattedMarkdownGuideBody, markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/long-stay-menton-apartment-living.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("A temporary home, not a packed itinerary", "Un chez-soi temporaire, pas un programme surchargé", "Una casa temporanea, non un programma pieno", "Тимчасовий дім, не переповнений маршрут"));
sections.forEach((section, index) => {
  const body = (locale: keyof typeof records[number]) => formattedMarkdownGuideBody(records[index][locale]);
  section.body = [t(body("en"), body("fr"), body("it"), body("uk"))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
sections[3].relatedPlaceIds = ["halles-du-marche", "intermarche-hyper-menton"];
sections[11].relatedPlaceIds = ["menton-station"];
sections[1].relatedApartmentKeys = ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"];
sections[6].guideLinkSlug = "laundry-laundromats-menton";
sections[6].guideLinkLabel = t("Laundry options in Menton", "Laveries à Menton", "Lavanderie a Mentone", "Пральні Ментона");
sections[7].guideLinkSlug = "coworking-remote-work-menton";
sections[7].guideLinkLabel = t("Plan your remote-work setup", "Préparer le télétravail", "Organizzare il lavoro da remoto", "Сплануйте дистанційну роботу");
sections[8].guideLinkSlug = "day-trips-from-menton";
sections[8].guideLinkLabel = t("Compare day trips", "Comparer les excursions", "Confrontare le escursioni", "Порівняйте одноденні поїздки");
sections[11].guideLinkSlug = "public-transport-in-menton";
sections[11].guideLinkLabel = t("Check transport before travelling", "Vérifier les transports avant le départ", "Verificare i trasporti prima di partire", "Перевірте транспорт перед виїздом");

export const longStayGuide: GuideArticle = {
  id: "long-stay-menton-apartment-living", slug: "long-stay-menton-apartment-living",
  title: t("Two to Four Weeks in Menton: How to Organise a Longer Stay", "Deux à quatre semaines à Menton : organiser un séjour plus long", "Da due a quattro settimane a Mentone: organizzare un soggiorno lungo", "Два–чотири тижні в Ментоні: як організувати триваліше перебування"),
  seoTitle: t("Staying in Menton for 2–4 Weeks: Apartment Living Guide", "Séjour de 2 à 4 semaines à Menton : vivre en appartement", "2–4 settimane a Mentone: guida al soggiorno in appartamento", "2–4 тижні в Ментоні: побут в апартаментах"),
  seoDescription: t("Plan a 2–4 week Menton stay: apartment checks, groceries, laundry, remote work, weekly budgets excluding accommodation and flexible Riviera day trips.", "Organisez 2–4 semaines à Menton : appartement, courses, linge, télétravail, budgets hors logement et excursions souples sur la Riviera.", "Organizza 2–4 settimane a Mentone: appartamento, spesa, bucato, lavoro da remoto, budget senza alloggio ed escursioni flessibili.", "Сплануйте 2–4 тижні в Ментоні: апартаменти, продукти, прання, дистанційна робота, бюджет без житла та гнучкі поїздки Рив'єрою."),
  excerpt: t("Settle into apartment life with a manageable shopping and laundry routine, clear weekly spending scenarios and space between excursions. Confirm the details that matter before requesting your dates.", "Installez une routine simple de courses et de linge, prévoyez le budget et gardez du repos entre les excursions. Confirmez les détails avant de demander vos dates.", "Una routine semplice per spesa e bucato, budget chiari e riposo tra le gite. Conferma le condizioni importanti prima di richiedere le date.", "Простий ритм продуктів і прання, зрозумілий бюджет та відпочинок між виїздами. Уточніть важливі умови перед запитом дат."),
  category: "practical", duration: "reference", publishedOn: "2026-11-05", sourceStatus: "editorial", locationTags: ["menton"],
  coverImage: "/images/guide/long-stay-menton-apartment-living.png",
  coverImageAlt: t("Project illustration of a laptop and breakfast overlooking Menton; not a photograph or equipment guarantee for an advertised apartment", "Illustration du projet : ordinateur et petit déjeuner face à Menton ; ni photo ni garantie d'équipement d'un appartement proposé", "Illustrazione del progetto con computer e colazione su Mentone; non fotografia o garanzia di dotazioni di un alloggio offerto", "Ілюстрація проєкту: ноутбук і сніданок із краєвидом Ментона; не фотографія чи гарантія обладнання пропонованих апартаментів"),
  visualTheme: "itinerary", visualStatus: "project_illustration",
  tags: [t("Longer stays", "Séjours prolongés", "Soggiorni lunghi", "Триваліші поїздки"), t("Apartment living", "Vie en appartement", "Vita in appartamento", "Побут в апартаментах")],
  bestFor: [t("Couples, families and slow travellers", "Couples, familles et voyageurs au rythme lent", "Coppie, famiglie e viaggiatori lenti", "Пари, родини та неспішні мандрівники"), t("Remote workers after checking the setup", "Télétravailleurs après vérification des conditions", "Lavoratori da remoto dopo verifica delle condizioni", "Дистанційні працівники після перевірки умов")],
  relatedPlaces: ["halles-du-marche", "intermarche-hyper-menton", "menton-station"],
  relatedArticles: ["useful-apps-websites-menton-monaco-italian-riviera", "where-to-stay-in-menton", "supermarkets-in-menton", "halles-du-marche-menton", "laundry-laundromats-menton", "coworking-remote-work-menton", "menton-holiday-budget", "public-transport-in-menton", "day-trips-from-menton", "menton-in-autumn", "first-evening-menton-late-arrival"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  practicalTips: [t("Sources checked 5 November 2026. €210/420/700 weekly budgets are examples per adult, excluding accommodation and travel to Menton, not quotes or surveyed averages. Zest monthly validity is a calendar month; do not assume SudAzur covers the Italian rail section. Confirm Wi-Fi, work space, laundry, cleaning and longer-stay terms with the chosen property. Requests are handled manually and do not confirm availability.", "Sources vérifiées le 5 novembre 2026. Budgets de €210/420/700 par adulte et par semaine : exemples hors logement et trajet, pas devis ou moyennes mesurées. Le mensuel Zest est calendaire ; ne supposez pas le rail italien inclus dans SudAzur. Confirmez connexion, espace, linge, ménage et conditions prolongées. La demande ne confirme pas la disponibilité.", "Fonti controllate il 5 novembre 2026. €210/420/700 a settimana per adulto sono esempi senza alloggio e viaggio, non preventivi o medie rilevate. Mensile Zest di calendario; non presumere incluso il treno italiano in SudAzur. Conferma connessione, spazio, bucato, pulizie e condizioni lunghe. La richiesta non conferma disponibilità.", "Джерела перевірено 5 листопада 2026. €210/420/700 на тиждень на дорослого — приклади без житла й дороги, не кошториси чи виміряні середні. Місячний Zest календарний; не вважайте італійську залізницю включеною в SudAzur. Уточніть зв'язок, робоче місце, прання, прибирання й тривалі умови. Запит не підтверджує доступності.")],
  sections,
};

import type { GuideArticle, LocalizedText } from "./guide";
import { formattedMarkdownGuideBody, markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/first-evening-menton-late-arrival.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("Keys, a simple meal and time to rest", "Les clés, un repas simple et du repos", "Chiavi, una cena semplice e riposo", "Ключі, проста вечеря й відпочинок"));
sections.forEach((section, index) => {
  const body = (locale: keyof typeof records[number]) => formattedMarkdownGuideBody(records[index][locale]);
  section.body = [t(body("en"), body("fr"), body("it"), body("uk"))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
sections[3].relatedPlaceIds = ["menton-station", "menton-garavan-station"];
sections[4].guideLinkSlug = "how-to-get-to-menton-from-nice-airport";
sections[4].guideLinkLabel = t("Plan the full airport journey", "Préparer tout le trajet depuis l'aéroport", "Organizza tutto il viaggio dall'aeroporto", "Сплануйте всю дорогу з аеропорту");
sections[5].relatedPlaceIds = ["carrefour-city-felix-faure", "carrefour-city-thiers-menton", "carrefour-express-menton", "carrefour-city-sospel-menton"];
sections[5].guideLinkSlug = "supermarkets-in-menton";
sections[5].guideLinkLabel = t("More grocery options in Menton", "D'autres courses à Menton", "Altre opzioni per la spesa a Mentone", "Інші магазини продуктів у Ментоні");
sections[7].relatedPlaceIds = ["promenade-du-soleil", "esplanade-des-sablettes-menton"];
sections[7].guideLinkSlug = "quiet-evening-in-menton";
sections[7].guideLinkLabel = t("A quiet evening when you have more time", "Une soirée tranquille quand vous avez plus de temps", "Una serata tranquilla con più tempo", "Тихий вечір, коли матимете більше часу");
sections[9].guideLinkSlug = "menton-with-kids-family-guide";
sections[9].guideLinkLabel = t("Menton with children", "Menton avec enfants", "Mentone con bambini", "Ментон із дітьми");

export const firstEveningGuide: GuideArticle = {
  id: "first-evening-menton-late-arrival", slug: "first-evening-menton-late-arrival",
  title: t("Your First Evening in Menton: What to Do After a Late Arrival", "Votre premier soir à Menton : que faire après une arrivée tardive ?", "La prima sera a Mentone: cosa fare dopo un arrivo tardivo", "Перший вечір у Ментоні: що робити після пізнього приїзду"),
  seoTitle: t("Arriving Late in Menton: Check-In, Food & First Evening", "Arriver tard à Menton : clés, courses et premier soir", "Arrivare tardi a Mentone: check-in, spesa e prima sera", "Пізній приїзд до Ментона: заселення, продукти й вечеря"),
  seoDescription: t("Arriving in Menton in the evening or after midnight? Plan confirmed apartment access, groceries, dinner and an optional short waterfront walk, with current transport cautions.", "Arrivée tardive à Menton : accès au logement confirmé, courses, dîner et courte promenade facultative, avec précautions sur les trains et horaires des commerces.", "Arrivo serale o dopo mezzanotte a Mentone: accesso concordato, spesa, cena semplice e breve passeggiata facoltativa, con avvisi sui trasporti.", "Приїжджаєте до Ментона ввечері чи після опівночі? Узгоджений доступ, продукти, проста вечеря й коротка прогулянка з актуальними застереженнями про транспорт."),
  excerpt: t("Get the keys, put down your luggage and eat something simple. Plan your first evening around your actual arrival time, not an ambitious sightseeing list.", "Prenez les clés, posez les valises et mangez simplement. Adaptez la soirée à votre arrivée réelle, pas à une longue liste de visites.", "Ritira le chiavi, posa i bagagli e mangia qualcosa di semplice. Organizza la sera sull'arrivo reale, non su una lunga lista di visite.", "Отримайте ключі, поставте валізи й просто поїжте. Плануйте вечір за реальним часом прибуття, а не великим переліком пам'яток."),
  category: "practical", duration: "reference", publishedOn: "2026-11-03", sourceStatus: "editorial",
  coverImage: "/images/guide/first-evening-menton-late-arrival.png",
  coverImageAlt: t("Project illustration of a traveller with luggage overlooking Menton at dusk; not a verified apartment entrance, accessible luggage route or promise of late restaurant service", "Illustration d'une voyageuse et sa valise face à Menton au crépuscule ; pas une entrée vérifiée, un parcours accessible aux bagages ou une promesse de service tardif", "Illustrazione di una viaggiatrice con valigia sopra Mentone al crepuscolo; non ingresso verificato, percorso accessibile con bagagli o garanzia di cucina tardiva", "Ілюстрація мандрівниці з валізою над вечірнім Ментоном; не перевірений вхід, доступний шлях із багажем чи гарантія пізньої кухні"),
  visualTheme: "itinerary", visualStatus: "project_illustration", locationTags: ["menton", "nice"],
  tags: [t("Late arrival", "Arrivée tardive", "Arrivo tardivo", "Пізнє прибуття"), t("First evening", "Premier soir", "Prima sera", "Перший вечір"), t("Apartment stay", "Séjour en appartement", "Soggiorno in appartamento", "Проживання в апартаментах")],
  bestFor: [t("First-time visitors and apartment guests", "Première visite et voyageurs en appartement", "Prima visita e ospiti in appartamento", "Перший візит і гості апартаментів"), t("Couples and families arriving late", "Couples et familles arrivant tard", "Coppie e famiglie con arrivo tardivo", "Пари й сім'ї з пізнім приїздом")],
  relatedPlaces: [...new Set(sections.flatMap(section => section.relatedPlaceIds ?? []))],
  relatedArticles: ["how-to-get-to-menton-from-nice-airport", "public-transport-in-menton", "supermarkets-in-menton", "quiet-evening-in-menton", "menton-with-kids-family-guide", "menton-without-a-car", "where-to-stay-in-menton", "useful-numbers-emergency-contacts-menton"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  showTransportHelper: true, transportHelperAfterSectionIndex: 4,
  practicalTips: [t("Allow 30–120 minutes after reaching your accommodation as an editorial example, not a timed itinerary. Confirm private access and essential food first. Checked 3 November 2026: store grids and SNCF works, not live availability. No self-check-in, welcome groceries, transfer, cot or late-arrival service is included unless agreed with your host.", "Prévoyez 30–120 minutes après l'arrivée au logement comme exemple, pas un horaire garanti. Confirmez accès privé et repas d'abord. Vérifié le 3 novembre 2026 : grilles des magasins et travaux SNCF, pas disponibilité en direct. Accès autonome, provisions, transfert, lit bébé et accueil tardif uniquement sur accord.", "Considera 30–120 minuti dall'arrivo all'alloggio come esempio, non programma garantito. Prima accesso privato e cibo. Verificato il 3 novembre 2026: griglie e lavori SNCF, non disponibilità live. Accesso autonomo, provviste, transfer, lettino e accoglienza tardiva solo se concordati.", "Закладайте 30–120 хвилин після прибуття до житла як приклад, не гарантований розклад. Спочатку приватний доступ і їжа. Перевірено 3 листопада 2026: таблиці магазинів і роботи SNCF, не доступність наживо. Самостійний вхід, продукти, трансфер, ліжечко й пізній прийом — лише за домовленістю.")],
  sections,
};

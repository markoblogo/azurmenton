import type { GuideArticle, LocalizedText } from "./guide";
import { formattedMarkdownGuideBody, markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/nice-carnival-menton-lemon-festival-itinerary.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("Two festivals, one Riviera stay", "Deux fêtes, un séjour sur la Riviera", "Due feste, una vacanza in Riviera", "Два свята, одна відпустка на Рив'єрі"));
sections.forEach((section, index) => {
  const body = (locale: keyof typeof records[number]) => formattedMarkdownGuideBody(records[index][locale]);
  section.body = [t(body("en"), body("fr"), body("it"), body("uk"))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
sections[3].relatedPlaceIds = ["jardins-bioves", "promenade-du-soleil", "halles-du-marche", "cours-saleya-nice"];
sections[9].relatedPlaceIds = ["menton-station", "nice-ville-station"];
sections[1].guideLinkSlug = "fete-du-citron-menton-practical-guide";
sections[1].guideLinkLabel = t("Lemon Festival practical guide", "Guide pratique de la Fête du Citron", "Guida pratica alla Festa del Limone", "Практичний гайд Свята лимона");
sections[6].guideLinkSlug = "menton-with-kids-family-guide";
sections[6].guideLinkLabel = t("Plan a family stay", "Préparer un séjour en famille", "Organizzare un soggiorno in famiglia", "Сплануйте сімейну поїздку");
sections[9].guideLinkSlug = "public-transport-in-menton";
sections[9].guideLinkLabel = t("Local transport options", "Transports locaux", "Trasporti locali", "Місцевий транспорт");
sections[11].guideLinkSlug = "museums-in-menton-nice-monaco";
sections[11].guideLinkLabel = t("Compare indoor cultural options", "Comparer les visites culturelles à l'intérieur", "Confrontare le visite culturali al coperto", "Порівняйте культурні варіанти в приміщенні");

export const februaryGuide: GuideArticle = {
  id: "nice-carnival-menton-lemon-festival-itinerary", slug: "nice-carnival-menton-lemon-festival-itinerary",
  title: t("February on the French Riviera: Menton's Lemon Festival and Nice Carnival", "Février sur la Riviera : Fête du Citron et Carnaval de Nice", "Febbraio in Riviera: Festa del Limone e Carnevale di Nizza", "Лютий на Рив'єрі: Свято лимона й карнавал Ніцци"),
  seoTitle: t("Nice Carnival & Menton Lemon Festival: 2027 Itinerary", "Fête du Citron et Carnaval de Nice : séjour 2027", "Nizza e Mentone: itinerario dei festival di febbraio 2027", "Ментон і Ніцца: маршрут лютневими фестивалями 2027"),
  seoDescription: t("Combine Nice Carnival and Menton's Lemon Festival over 4–6 nights in February 2027. Published sessions, family plans, ticket limits and SNCF night-work warnings.", "Combinez les fêtes de Menton et Nice en 4–6 nuits en février 2027 : séances publiées, familles, limites de billetterie et travaux SNCF nocturnes.", "Quattro–sei notti tra Nizza e la Festa del Limone di Mentone: eventi pubblicati, famiglie, limiti dei biglietti e lavori ferroviari serali.", "Поєднайте свята Ментона й Ніцци за 4–6 ночей у лютому 2027: опубліковані сеанси, сімейні плани, квитки та нічні роботи SNCF."),
  excerpt: t("Four, five or six nights for citrus sculptures, flower parades and proper pauses, with published 2027 sessions and a realistic return plan.", "Quatre, cinq ou six nuits entre agrumes, fleurs et vraies pauses, avec les séances publiées de 2027 et un retour réaliste.", "Quattro, cinque o sei notti tra agrumi, fiori e vere pause, con appuntamenti 2027 pubblicati e un rientro realistico.", "Чотири, п'ять або шість ночей між цитрусами, квітами й відпочинком: опубліковані сеанси 2027 та реалістичне повернення."),
  category: "events", duration: "reference", publishedOn: "2026-11-04", sourceStatus: "editorial", locationTags: ["menton", "nice"],
  coverImage: "/images/guide/nice-carnival-menton-lemon-festival-itinerary.png",
  coverImageAlt: t("Supplied imagined illustration combining Menton citrus sculptures and Nice Carnival costumes; not verified 2027 floats or both events in one location", "Illustration imaginée associant agrumes de Menton et costumes du Carnaval de Nice ; ni chars 2027 vérifiés ni deux fêtes dans un même lieu", "Illustrazione immaginata con agrumi di Mentone e costumi di Nizza; non carri 2027 verificati né due feste nello stesso luogo", "Надана уявна ілюстрація цитрусових композицій Ментона й костюмів Ніцци; не перевірені платформи 2027 чи обидва свята в одному місці"),
  visualTheme: "event", visualStatus: "project_illustration",
  tags: [t("February 2027", "Février 2027", "Febbraio 2027", "Лютий 2027"), t("Festival planning", "Préparer les fêtes", "Organizzare i festival", "Планування фестивалів")],
  bestFor: [t("Four to six nights", "Quatre à six nuits", "Quattro–sei notti", "Чотири–шість ночей"), t("Families and winter travellers", "Familles et voyageurs d'hiver", "Famiglie e viaggiatori invernali", "Родини й зимові мандрівники")],
  relatedPlaces: ["jardins-bioves", "promenade-du-soleil", "halles-du-marche", "cours-saleya-nice", "menton-station", "nice-ville-station"],
  relatedArticles: ["fete-du-citron-menton-practical-guide", "menton-in-winter", "menton-in-autumn", "menton-with-kids-family-guide", "public-transport-in-menton", "menton-without-a-car", "where-to-stay-in-menton", "halles-du-marche-menton", "museums-in-menton-nice-monaco"],
  relatedEvents: ["menton-lemon-festival", "nice-carnival"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  practicalTips: [t("Checked 4 November 2026. Programmes may change. Menton grandstands for 21 and 28 February were marked full; check current categories. SNCF announces 22:00–06:00 interruptions Sunday–Thursday nights until 10 December 2027: arrange a non-rail return or Nice overnight after Tuesday 23 February. No tickets, trains or accommodation are reserved by this guide.", "Vérifié le 4 novembre 2026. Programmes modifiables. Tribunes des 21 et 28 février indiquées complètes : contrôler les catégories actuelles. SNCF annonce des interruptions 22 h–6 h du dimanche au jeudi jusqu'au 10 décembre 2027 : autre retour ou nuit à Nice après le mardi 23. Aucun billet, train ou hébergement réservé par ce guide.", "Verificato il 4 novembre 2026. Programmi modificabili. Tribune del 21 e 28 febbraio indicate esaurite: controllare le categorie attuali. SNCF annuncia interruzioni 22:00–06:00 domenica–giovedì fino al 10 dicembre 2027: altro rientro o notte a Nizza dopo martedì 23. Nessuna prenotazione inclusa.", "Перевірено 4 листопада 2026 року. Програми можуть змінитися. Трибуни 21 і 28 лютого позначені як заповнені: перевірте категорії. SNCF повідомляє про перерви 22:00–06:00 у ночі неділя–четвер до 10 грудня 2027: інше повернення або ночівля в Ніцці після вівторка 23-го. Гайд нічого не бронює.")],
  sections,
};

import type { GuideArticle, LocalizedText } from "./guide";
import { formattedMarkdownGuideBody, markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/winter-walks-menton-sunshine-short-routes.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("Short walks, flexible returns", "Petites promenades, retours faciles", "Percorsi brevi, rientri flessibili", "Короткі виходи, просте повернення"));
sections.forEach((section, index) => {
  const body = (locale: keyof typeof records[number]) => formattedMarkdownGuideBody(records[index][locale]);
  section.body = [t(body("en"), body("fr"), body("it"), body("uk"))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
sections[2].relatedPlaceIds = ["promenade-du-soleil", "plage-casino", "plage-du-marche-menton"];
sections[3].relatedPlaceIds = ["jardins-bioves"];
sections[4].relatedPlaceIds = ["halles-du-marche"];
sections[5].relatedPlaceIds = ["esplanade-des-sablettes-menton"];
sections[6].relatedPlaceIds = ["port-de-garavan", "promenade-de-la-mer-menton"];
sections[3].guideLinkSlug = "fete-du-citron-menton-practical-guide";
sections[3].guideLinkLabel = t("Check festival access separately", "Vérifier l'accès pendant le festival", "Verificare l'accesso durante il festival", "Перевірте доступ під час фестивалю");
sections[4].guideLinkSlug = "halles-du-marche-menton";
sections[4].guideLinkLabel = t("Explore the market district", "Découvrir le quartier du marché", "Esplorare il quartiere del mercato", "Дізнайтеся про район ринку");
sections[9].guideLinkSlug = "where-to-stay-in-menton";
sections[9].guideLinkLabel = t("Choose a base for your stay", "Choisir votre quartier de séjour", "Scegliere una base per il soggiorno", "Оберіть район для проживання");
sections[12].guideLinkSlug = "menton-accessible-step-free-walks";
sections[12].guideLinkLabel = t("Read the qualified accessibility guide", "Consulter le guide d'accessibilité et ses limites", "Leggere il percorso accessibile e i suoi limiti", "Перегляньте гайд про доступність та її обмеження");

export const winterWalksGuide: GuideArticle = {
  id: "winter-walks-menton-sunshine-short-routes", slug: "winter-walks-menton-sunshine-short-routes",
  title: t("Winter Walks in Menton: Sunshine, Short Routes and Places to Pause", "Promenades d'hiver à Menton : soleil, petits parcours et pauses", "Passeggiate invernali a Menton: sole, percorsi brevi e soste", "Зимові прогулянки в Ментоні: сонце, короткі маршрути й паузи"),
  seoTitle: t("Winter Walks in Menton: 5 Short Routes and Rest Stops", "Promenades d'hiver à Menton : 5 petits parcours", "Menton in inverno: 5 passeggiate brevi e soste", "Зимові прогулянки в Ментоні: 5 коротких маршрутів"),
  seoDescription: t("Compare five short winter walks in Menton, with flexible returns, documented seating and clear limits on unverified sunshine, gradients and access.", "Cinq petites promenades d'hiver à Menton : retours faciles, mobilier documenté et limites claires sur le soleil, les pentes et l'accessibilité.", "Cinque passeggiate brevi a Menton in inverno: rientri flessibili, sedute documentate e limiti chiari su sole, pendenze e accessibilità.", "П'ять коротких зимових прогулянок у Ментоні: просте повернення, описані сидіння й чіткі застереження про сонце, ухили та доступність."),
  excerpt: t("Soleil, Biovès, the lower town, Sablettes or Garavan: choose a short outing that suits the day, with practical pauses and an easy way back. Research edition, not a field-verified sun map.", "Soleil, Biovès, ville basse, Sablettes ou Garavan : une sortie selon la météo, des pauses et un retour simple. Édition de recherche, pas une carte du soleil vérifiée sur place.", "Soleil, Biovès, città bassa, Sablettes o Garavan: scegliete secondo il tempo, con soste e ritorno facile. Edizione di ricerca, non una mappa del sole verificata sul posto.", "Soleil, Biovès, нижнє місто, Sablettes або Garavan: вихід за погодою, з паузами й простим поверненням. Дослідницька версія, не перевірена на місці карта сонця."),
  category: "walks-views", duration: "flexible", publishedOn: "2026-11-04", sourceStatus: "editorial", locationTags: ["menton"],
  coverImage: "/images/guide/winter-walks-menton-sunshine-short-routes.png",
  coverImageAlt: t("Artistic illustration of a Menton seafront walk with a bench and blanket; not a dated photograph or evidence of actual winter sunshine or access", "Illustration artistique du littoral de Menton avec banc et couverture ; ni photo datée ni preuve de soleil ou d'accès en hiver", "Illustrazione artistica del lungomare di Menton con panchina e coperta; non foto datata o prova del sole e dell'accesso invernali", "Художня ілюстрація набережної Ментона з лавкою й пледом; не датоване фото чи доказ зимового сонця або доступу"),
  visualTheme: "itinerary", visualStatus: "project_illustration",
  tags: [t("Winter walks", "Promenades d'hiver", "Passeggiate invernali", "Зимові прогулянки"), t("Short outings", "Sorties courtes", "Uscite brevi", "Короткі виходи"), t("Longer stays", "Séjours longs", "Soggiorni lunghi", "Тривале проживання")],
  bestFor: [t("Flexible seafront and town walks", "Promenades souples en ville et au bord de mer", "Passeggiate flessibili in città e sul mare", "Гнучкі міські й прибережні прогулянки"), t("Winter visitors who want easy returns", "Visiteurs d'hiver privilégiant un retour facile", "Ospiti invernali che cercano rientri facili", "Зимові гості, яким важливе просте повернення")],
  relatedPlaces: ["promenade-du-soleil", "plage-casino", "plage-du-marche-menton", "jardins-bioves", "halles-du-marche", "esplanade-des-sablettes-menton", "port-de-garavan", "promenade-de-la-mer-menton"],
  relatedArticles: ["menton-in-winter", "menton-in-autumn", "best-walks-and-hikes-around-menton", "menton-accessible-step-free-walks", "halles-du-marche-menton", "where-to-stay-in-menton", "fete-du-citron-menton-practical-guide"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  practicalTips: [t("Sources checked 4 November 2026; no field observation yet. Times are suggested allowances, not measured routes. Sunshine, gradients, crossfall, bench condition and indoor opening remain unverified on site. Biovès sections have stairs and external alternatives; tourist-office accessibility labels are not our certification. Check current weather warnings and municipal restrictions. Never bypass barriers. Cover art is not documentary evidence.", "Sources vérifiées le 4 novembre 2026, sans observation sur place. Durées indicatives ; soleil, pentes, dévers, sièges et ouvertures non vérifiés sur le terrain. Biovès comporte des escaliers entre sections et des alternatives extérieures ; le classement touristique n'est pas notre certification. Consultez vigilance et restrictions actuelles. Ne contournez pas les barrières. Couverture artistique non documentaire.", "Fonti controllate il 4 novembre 2026, senza sopralluogo. Tempi indicativi; sole, pendenze, inclinazione trasversale, sedute e aperture non verificati sul posto. Biovès ha scale tra sezioni e alternative esterne; la classificazione turistica non è nostra certificazione. Controllate allerte e restrizioni attuali. Non aggirate barriere. Copertina artistica non documentaria.", "Джерела звірено 4 листопада 2026, без огляду на місці. Час орієнтовний; сонце, ухили, сидіння й робота приміщень не перевірені на місці. У Biovès між секціями є сходи й зовнішні альтернативи; туристична класифікація не є нашою сертифікацією. Перевіряйте актуальні попередження й обмеження. Не обходьте бар'єри. Обкладинка художня, не документальна.")],
  sections,
};

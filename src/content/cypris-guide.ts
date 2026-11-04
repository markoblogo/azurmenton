import type { GuideArticle, LocalizedText } from "./guide";
import { formattedMarkdownGuideBody, markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/mortelle-randonnee-villa-cypris-filming-location.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("A beautiful villa and an unsettling film", "Une belle villa et un film inquiétant", "Una bella villa e un film inquietante", "Красива вілла й тривожний фільм"));
sections.forEach((section, index) => {
  const body = (locale: keyof typeof records[number]) => formattedMarkdownGuideBody(records[index][locale]);
  section.body = [t(body("en"), body("fr"), body("it"), body("uk"))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
sections[2].relatedPlaceIds = ["villa-cypris-roquebrune-cap-martin"];
sections[7].relatedPlaceIds = ["roquebrune-cap-martin-coastal-walk"];
sections[11].relatedPlaceIds = ["villa-ephrussi-de-rothschild"];
sections[7].guideLinkSlug = "best-walks-and-hikes-around-menton";
sections[7].guideLinkLabel = t("Compare other public walks", "Comparer d'autres promenades publiques", "Confrontare altre passeggiate pubbliche", "Порівняйте інші громадські прогулянки");
sections[11].guideLinkSlug = "museums-in-menton-nice-monaco";
sections[11].guideLinkLabel = t("Plan a separate museum outing", "Préparer une sortie au musée distincte", "Organizzare una gita separata al museo", "Сплануйте окремий музейний вихід");
sections[12].guideLinkSlug = "public-transport-in-menton";
sections[12].guideLinkLabel = t("Check transport options", "Vérifier les transports", "Verificare i trasporti", "Перевірте транспорт");

export const cyprisGuide: GuideArticle = {
  id: "mortelle-randonnee-villa-cypris-filming-location", slug: "mortelle-randonnee-villa-cypris-filming-location",
  title: t("Villa Cypris on Screen: Mortelle Randonnée and the Darker Riviera", "Villa Cypris à l'écran : Mortelle Randonnée et la Riviera inquiétante", "Villa Cypris sullo schermo: Mortelle Randonnée e la Riviera inquietante", "Villa Cypris на екрані: Mortelle Randonnée та тривожна Рив'єра"),
  seoTitle: t("Mortelle Randonnée: Villa Cypris Filming Location", "Mortelle Randonnée : Villa Cypris au Cap Martin", "Mortelle Randonnée: Villa Cypris sul Cap Martin", "Mortelle Randonnée: Villa Cypris на Cap Martin"),
  seoDescription: t("Explore Villa Cypris, the documented Mortelle Randonnée filming location near Menton: architecture, private-estate limits and conditional public coastal-path views.", "Villa Cypris, décor documenté de Mortelle Randonnée : architecture, domaine privé et vues depuis le sentier public, sous réserve d'ouverture.", "Villa Cypris, location documentata di Mortelle Randonnée: architettura, proprietà privata e vedute dal sentiero pubblico quando aperto.", "Villa Cypris — документована локація Mortelle Randonnée: архітектура, приватний маєток і види з громадської стежки, коли вона відкрита."),
  excerpt: t("Claude Miller's thriller meets Cap Martin's Byzantine-inspired architecture. Discover the real villa from authorised public paths, without promising private access or exact camera positions.", "Le thriller de Claude Miller rencontre l'architecture du Cap Martin. Découvrez la villa depuis les chemins publics autorisés, sans entrée privée ni cadrages prétendument exacts.", "Il thriller di Claude Miller incontra l'architettura del Cap Martin. La villa dai percorsi pubblici autorizzati, senza ingresso privato o inquadrature presunte.", "Трилер Клода Міллера й архітектура Cap Martin. Вілла з дозволених громадських шляхів, без обіцянки приватного входу чи точних ракурсів."),
  category: "walks-views", duration: "45 to 90 minutes", publishedOn: "2026-11-04", sourceStatus: "editorial", locationTags: ["roquebrune-cap-martin"],
  coverImage: "/images/guide/mortelle-randonnee-villa-cypris-filming-location.png",
  coverImageAlt: t("Supplied artistic illustration evoking Villa Cypris with brick arcades, Mediterranean coast and a vintage film camera; not a documentary photograph or verified film still", "Illustration artistique évoquant Cypris, ses arcades, le littoral et une caméra ancienne ; ni photographie documentaire ni photogramme vérifié", "Illustrazione artistica ispirata a Cypris con arcate, costa e cinepresa d'epoca; non fotografia documentaria o fotogramma verificato", "Надана художня ілюстрація Cypris з аркадами, узбережжям і старою кінокамерою; не документальне фото чи перевірений кадр"),
  visualTheme: "itinerary", visualStatus: "project_illustration",
  tags: [t("French cinema", "Cinéma français", "Cinema francese", "Французьке кіно"), t("Architecture", "Architecture", "Architettura", "Архітектура"), t("Coastal walk", "Sentier littoral", "Sentiero costiero", "Прибережна стежка")],
  bestFor: [t("Film and architecture enthusiasts", "Amateurs de cinéma et d'architecture", "Appassionati di cinema e architettura", "Шанувальники кіно й архітектури"), t("A short selected coastal outing", "Une courte portion du littoral", "Un tratto costiero breve", "Коротка обрана ділянка узбережжя")],
  relatedPlaces: ["villa-cypris-roquebrune-cap-martin", "roquebrune-cap-martin-coastal-walk", "villa-ephrussi-de-rothschild"],
  relatedArticles: ["best-walks-and-hikes-around-menton", "films-shot-in-menton", "heartbreaker-larnacoeur-monaco-filming-locations", "to-catch-a-thief-hitchcock-villefranche-sur-mer", "museums-in-menton-nice-monaco", "public-transport-in-menton", "where-to-stay-in-menton"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  practicalTips: [t("Checked 4 November 2026. Private estate: no regular public visits verified. Use only the marked public trail when open; do not bypass barriers. Opening and dated train stops are not guaranteed. Uneven ground and steps: not continuously step-free. The 45–90 minutes is an editorial allowance for a short selected segment, not a measured station-to-gallery route. Exact film shots remain unverified; illustrations are not documentary evidence.", "Vérifié le 4 novembre 2026. Domaine privé : aucune visite régulière vérifiée. Sentier public balisé uniquement lorsqu'il est ouvert ; ne contournez pas les barrières. Ouverture et arrêts de trains non garantis. Sol irrégulier et marches. Les 45–90 minutes sont une estimation de courte portion, pas un trajet gare–galerie mesuré. Plans exacts non vérifiés ; illustrations non documentaires.", "Verificato il 4 novembre 2026. Proprietà privata: nessuna visita regolare verificata. Solo sentiero pubblico segnalato quando aperto; non aggirare barriere. Apertura e fermate datate non garantite. Fondo irregolare e gradini. I 45–90 minuti sono una stima per un tratto breve, non un percorso stazione–galleria misurato. Fotogrammi non verificati; immagini non documentarie.", "Перевірено 4 листопада 2026. Приватний маєток: регулярні відвідини не підтверджено. Лише відкрита позначена громадська стежка, без обходу бар'єрів. Відкриття й зупинки поїздів не гарантовані. Нерівності й сходи. 45–90 хвилин — оцінка короткої ділянки, не виміряний шлях станція–галерея. Точні кадри не перевірені; ілюстрації не документальні.")],
  sections,
};

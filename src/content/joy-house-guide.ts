import type { GuideArticle, LocalizedText } from "./guide";
import { formattedMarkdownGuideBody, markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/joy-house-les-felins-villa-torre-clementina.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("A beautiful refuge and a dangerous game", "Un beau refuge et un jeu dangereux", "Un bel rifugio e un gioco pericoloso", "Красивий прихисток і небезпечна гра"));
sections.forEach((section, index) => {
  const body = (locale: keyof typeof records[number]) => formattedMarkdownGuideBody(records[index][locale]);
  section.body = [t(body("en"), body("fr"), body("it"), body("uk"))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
sections[2].relatedPlaceIds = ["villa-torre-clementina-roquebrune-cap-martin"];
sections[9].relatedPlaceIds = ["roquebrune-cap-martin-coastal-walk"];
sections[12].relatedPlaceIds = ["villa-e-1027-roquebrune-cap-martin"];
sections[14].relatedPlaceIds = ["villa-cypris-roquebrune-cap-martin"];
sections[9].guideLinkSlug = "best-walks-and-hikes-around-menton";
sections[9].guideLinkLabel = t("Compare public coastal walks", "Comparer les promenades littorales publiques", "Confrontare le passeggiate costiere pubbliche", "Порівняйте громадські прибережні прогулянки");
sections[11].guideLinkSlug = "public-transport-in-menton";
sections[11].guideLinkLabel = t("Check transport before setting out", "Vérifier les transports avant de partir", "Verificare i mezzi prima di partire", "Перевірте транспорт перед виходом");
sections[14].guideLinkSlug = "mortelle-randonnee-villa-cypris-filming-location";
sections[14].guideLinkLabel = t("Another private villa on screen: Cypris", "Une autre villa privée à l'écran : Cypris", "Un'altra villa privata sullo schermo: Cypris", "Інша приватна вілла на екрані: Cypris");

export const joyHouseGuide: GuideArticle = {
  id: "joy-house-les-felins-villa-torre-clementina", slug: "joy-house-les-felins-villa-torre-clementina",
  title: t("Joy House on Cap Martin: Alain Delon, Jane Fonda and Villa Torre Clementina", "Les Félins au Cap Martin : Alain Delon, Jane Fonda et Torre Clementina", "Joy House sul Cap Martin: Alain Delon, Jane Fonda e Torre Clementina", "Joy House на Cap Martin: Ален Делон, Джейн Фонда та Torre Clementina"),
  seoTitle: t("Joy House Filming Location: Villa Torre Clementina", "Les Félins : la villa Torre Clementina au Cap Martin", "Joy House: Villa Torre Clementina sul Cap Martin", "Joy House: Villa Torre Clementina на Cap Martin"),
  seoDescription: t("Discover the documented Joy House filming villa near Menton: Delon, Fonda, architecture and public coastal walks, with clear private-access and seasonal limits.", "Le décor documenté des Félins près de Menton : Delon, Fonda, architecture et sentier public, sans promesse d'entrée privée ni de vue exacte.", "La villa documentata di Joy House vicino a Mentone: Delon, Fonda, architettura e costa pubblica, con limiti chiari su accesso e stagioni.", "Документована вілла Joy House біля Ментона: Делон, Фонда, архітектура й громадське узбережжя, з чіткими межами приватного доступу та сезонності."),
  excerpt: t("A writer's Venetian-inspired house became a René Clément thriller location. Read its history, then choose an authorised coastal outing without expecting entry to the private estate.", "Une maison d'écrivaine inspirée de Venise devient décor d'un thriller de Clément. Son histoire accompagne une sortie littorale autorisée, sans accès au domaine privé.", "Una casa di scrittrice ispirata a Venezia diventa set di Clément. La storia accompagna un'uscita costiera autorizzata, senza ingresso nella proprietà privata.", "Будинок письменниці з венеційськими мотивами став локацією трилера Клемана. Його історія доповнює дозволену прибережну прогулянку, без входу в приватний маєток."),
  category: "walks-views", duration: "1-2 hours", publishedOn: "2026-11-05", sourceStatus: "editorial", locationTags: ["roquebrune-cap-martin"],
  coverImage: "/images/guide/joy-house-les-felins-villa-torre-clementina.png",
  coverImageAlt: t("Artistic illustration evoking a historic Cap Martin villa and vintage car; not a documentary view, verified film still or public entrance", "Illustration artistique évoquant une villa du Cap Martin et une voiture ancienne ; ni vue documentaire, ni photogramme vérifié, ni entrée publique", "Illustrazione artistica di una villa sul Cap Martin e un'auto d'epoca; non vista documentaria, fotogramma verificato o ingresso pubblico", "Художня ілюстрація історичної вілли Cap Martin і старого автомобіля; не документальний вид, перевірений кадр чи громадський вхід"),
  visualTheme: "itinerary", visualStatus: "project_illustration",
  tags: [t("French cinema", "Cinéma français", "Cinema francese", "Французьке кіно"), t("Villa architecture", "Architecture des villas", "Architettura delle ville", "Архітектура вілл"), t("Public coastal paths", "Sentiers littoraux publics", "Sentieri costieri pubblici", "Громадські прибережні стежки")],
  bestFor: [t("Film and architecture enthusiasts", "Amateurs de cinéma et d'architecture", "Appassionati di cinema e architettura", "Шанувальники кіно й архітектури"), t("A selected short coastal outing", "Une courte portion du littoral", "Un breve tratto di costa", "Коротка обрана ділянка узбережжя")],
  relatedPlaces: ["villa-torre-clementina-roquebrune-cap-martin", "roquebrune-cap-martin-coastal-walk", "villa-e-1027-roquebrune-cap-martin", "villa-cypris-roquebrune-cap-martin"],
  relatedArticles: ["mortelle-randonnee-villa-cypris-filming-location", "best-walks-and-hikes-around-menton", "films-shot-in-menton", "grace-of-monaco-filming-locations-menton", "james-bond-menton-never-say-never-again-filming-locations", "the-houses-that-remember-riviera-book-route", "public-transport-in-menton", "where-to-stay-in-menton"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  practicalTips: [t("Reviewed 4–5 November 2026. Torre Clementina is private; no ordinary public visit or clear public viewpoint verified. Stay on authorised paths when open, respect barriers, steps and weather. 60–120 minutes is a short-outing estimate, not a measured station-to-villa route. Cap Moderne's published 2026 season ended 31 October; future visits unconfirmed. Exact film angles not audited; supplied images are artistic, not documentary.", "Vérifié les 4–5 novembre 2026. Torre Clementina est privée ; visite régulière et vue publique dégagée non établies. Chemins autorisés ouverts uniquement, barrières et météo à respecter, présence de marches. 60–120 minutes : estimation de courte sortie, pas trajet gare–villa mesuré. Saison 2026 de Cap Moderne terminée le 31 octobre ; dates futures non confirmées. Plans exacts non audités ; illustrations artistiques.", "Verificato 4–5 novembre 2026. Torre Clementina è privata: visita regolare e punto pubblico libero non accertati. Solo percorsi autorizzati aperti, rispettando barriere, gradini e meteo. 60–120 minuti: stima di breve uscita, non percorso stazione–villa misurato. Stagione 2026 di Cap Moderne terminata 31 ottobre; visite future non confermate. Inquadrature non auditate; immagini artistiche.", "Перевірено 4–5 листопада 2026. Torre Clementina приватна; звичайні відвідини й відкрита громадська точка огляду не встановлені. Лише відкриті дозволені шляхи, з повагою до бар'єрів, сходів і погоди. 60–120 хвилин — оцінка короткого виходу, не виміряний шлях станція–вілла. Сезон Cap Moderne 2026 завершився 31 жовтня; майбутні візити не підтверджені. Ракурси не перевірені; ілюстрації художні.")],
  sections,
};

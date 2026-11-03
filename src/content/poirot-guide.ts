import type { GuideArticle, LocalizedText } from "./guide";
import { formattedMarkdownGuideBody, markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/poirot-blue-train-filming-locations-menton.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("When Menton became somewhere else", "Quand Menton devient un autre lieu", "Quando Mentone diventa un altro luogo", "Коли Ментон стає іншим місцем"));
sections.forEach((section, index) => {
  const body = (locale: keyof typeof records[number]) => formattedMarkdownGuideBody(records[index][locale]);
  section.body = [t(body("en"), body("fr"), body("it"), body("uk"))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
sections[3].relatedPlaceIds = ["palais-carnoles-menton"];
sections[4].relatedPlaceIds = ["rue-de-brea-menton"];
sections[5].relatedPlaceIds = ["basilica-saint-michel-archange"];
sections[6].relatedPlaceIds = ["villa-maria-serena"];
sections[6].guideLinkSlug = "best-gardens-menton";
sections[6].guideLinkLabel = t("Compare gardens and current access", "Comparer jardins et accès actuels", "Confronta giardini e accessi attuali", "Порівняйте сади та нинішній доступ");
sections[9].guideLinkSlug = "public-transport-in-menton";
sections[9].guideLinkLabel = t("Plan local transport and returns", "Préparer les transports et le retour", "Organizza trasporti e ritorno", "Сплануйте місцевий транспорт і повернення");

export const poirotGuide: GuideArticle = {
  id: "poirot-blue-train-filming-locations-menton", slug: "poirot-blue-train-filming-locations-menton",
  title: t("Poirot in Menton: The Mystery of the Blue Train Filming Locations", "Poirot à Menton : les lieux du Mystère du Train bleu", "Poirot a Mentone: le location del Mistero del treno azzurro", "Пуаро в Ментоні: місця зйомок «Таємниці “Блакитного потяга”»"),
  seoTitle: t("Poirot's Blue Train: Menton Filming Locations", "Poirot : les lieux du Train bleu à Menton", "Poirot: le location del Treno azzurro a Mentone", "Пуаро: локації «Блакитного потяга» в Ментоні"),
  seoDescription: t("Explore four Menton places attributed to Poirot's Blue Train episode, with two practical outings, current garden restrictions and clear limits on exact scene evidence.", "Quatre lieux mentonnais attribués au Train bleu de Poirot, deux sorties pratiques et les restrictions actuelles, sans promettre des angles de caméra authentifiés.", "Quattro luoghi di Mentone attribuiti al Treno azzurro di Poirot, due uscite e accessi attuali, distinguendo ricerca e inquadrature non verificate.", "Чотири ментонські локації, атрибутовані епізоду про Блакитний потяг: дві прогулянки, чинні обмеження доступу й непідтверджені точні ракурси."),
  excerpt: t("A palace becomes Nice station and a Riviera villa becomes Villa Marguerite. Explore the real Menton behind Poirot's screen geography, without revealing the mystery's solution.", "Un palais devient la gare de Nice, une villa devient Villa Marguerite. Découvrez le Menton réel derrière Poirot, sans révéler la solution.", "Un palazzo diventa la stazione di Nizza e una villa diventa Villa Marguerite. Scopri la Mentone reale dietro Poirot senza svelare la soluzione.", "Палац стає вокзалом Ніцци, а вілла — Villa Marguerite. Відкрийте справжній Ментон за екранною географією Пуаро без спойлера розв'язки."),
  category: "walks-views", duration: "half-day", publishedOn: "2026-11-03", sourceStatus: "editorial",
  coverImage: "/images/guide/poirot-blue-train-filming-locations-menton.png",
  coverImageAlt: t("Project illustration of a period visitor and vintage car beside an imagined Menton palace; not a Poirot film still, cast photograph, exact Carnolès facade or verified camera position", "Illustration d'un visiteur et d'une voiture d'époque devant un palais imaginaire à Menton ; ni photogramme de Poirot, ni photo d'acteur, façade exacte de Carnolès ou angle vérifié", "Illustrazione di un visitatore e un'auto d'epoca presso un palazzo immaginato a Mentone; non fotogramma di Poirot, foto del cast, facciata esatta di Carnolès o punto verificato", "Ілюстрація відвідувача й ретроавто біля уявного ментонського палацу; не кадр Пуаро, фото акторів, точний фасад Carnolès чи перевірена точка камери"),
  visualTheme: "itinerary", visualStatus: "project_illustration", locationTags: ["menton"],
  tags: [t("Poirot", "Poirot", "Poirot", "Пуаро"), t("Agatha Christie", "Agatha Christie", "Agatha Christie", "Аґата Крісті"), t("Screen locations", "Lieux de tournage", "Location televisive", "Кінолокації")],
  bestFor: [t("Christie and television fans", "Amateurs de Christie et de télévision", "Appassionati di Christie e televisione", "Прихильники Крісті й телесеріалів"), t("Architecture and cultural walks", "Architecture et promenades culturelles", "Architettura e passeggiate culturali", "Архітектура й культурні прогулянки")],
  relatedPlaces: ["palais-carnoles-menton", "rue-de-brea-menton", "basilica-saint-michel-archange", "villa-maria-serena"],
  relatedArticles: ["films-shot-in-menton", "menton-old-town", "belle-epoque-menton-architecture-walk", "best-gardens-menton", "james-bond-menton-never-say-never-again-filming-locations", "to-catch-a-thief-hitchcock-villefranche-sur-mer", "public-transport-in-menton", "menton-without-a-car"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  practicalTips: [t("Checked 3 November 2026. Old-town outing: 1–2 hours; palace/villa outing: half-day or longer with transport and confirmed access. These are editorial estimates, not a step-free audit. Carnolès museum is closed; the municipality limits its garden to weekends. Maria Serena's displayed October sessions have ended and no later session is confirmed here. Published filming attributions are not authenticated camera angles or entry permission.", "Vérifié le 3 novembre 2026. Vieille ville : 1–2 h ; palais/villa : demi-journée ou plus avec transport et accès confirmé. Estimations, pas audit sans marches. Musée Carnolès fermé, jardin limité au week-end par la ville. Séances d'octobre Maria Serena terminées, aucune suivante confirmée ici. Attribution de tournage n'est ni angle authentifié ni autorisation d'entrée.", "Verificato il 3 novembre 2026. Centro storico: 1–2 ore; palazzo/villa: mezza giornata o più con trasporti e accesso confermato. Stime, non audit senza gradini. Museo Carnolès chiuso, giardino limitato ai fine settimana dal Comune. Date di ottobre Maria Serena trascorse, nessuna successiva confermata qui. Attribuzione non significa angolo autenticato o permesso d'ingresso.", "Перевірено 3 листопада 2026. Старе місто: 1–2 години; палац/вілла: пів дня або більше з транспортом і підтвердженим доступом. Оцінки, не аудит без сходів. Музей Carnolès закритий, сад місто обмежує вихідними. Жовтневі сеанси Maria Serena минули, наступні тут не підтверджені. Атрибуція зйомок не є точним ракурсом чи дозволом на вхід.")],
  sections,
};

import type { GuideArticle, LocalizedText } from "./guide";
import { formattedMarkdownGuideBody, markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/rebecca-monte-carlo-daphne-du-maurier-literary-walk.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("Before Manderley, sunshine in Monte Carlo", "Avant Manderley, le soleil de Monte-Carlo", "Prima di Manderley, il sole di Monte Carlo", "До Мандерлі — сонячне Монте-Карло"));
sections.forEach((section, index) => {
  const body = (locale: keyof typeof records[number]) => formattedMarkdownGuideBody(records[index][locale]);
  section.body = [t(body("en"), body("fr"), body("it"), body("uk"))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
sections[5].relatedPlaceIds = ["casino-square-monaco"];
sections[6].relatedPlaceIds = ["hotel-de-paris-monte-carlo"];
sections[7].relatedPlaceIds = ["casino-de-monte-carlo"];
sections[8].relatedPlaceIds = ["jardins-petite-afrique-monaco"];
sections[10].relatedPlaceIds = ["cafe-de-paris-monte-carlo"];
sections[11].guideLinkSlug = "menton-without-a-car";
sections[11].guideLinkLabel = t("Plan your car-free Riviera stay", "Préparer un séjour sans voiture", "Organizza un soggiorno senza auto", "Сплануйте перебування без автомобіля");
sections[14].guideLinkSlug = "the-houses-that-remember-riviera-book-route";
sections[14].guideLinkLabel = t("Explore the real houses in The Houses That Remember", "Découvrir les vraies maisons de The Houses That Remember", "Scopri le case reali di The Houses That Remember", "Відкрийте реальні будинки The Houses That Remember");

export const rebeccaGuide: GuideArticle = {
  id: "rebecca-monte-carlo-daphne-du-maurier-literary-walk", slug: "rebecca-monte-carlo-daphne-du-maurier-literary-walk",
  title: t("Before Manderley: Rebecca's Monte Carlo and the Romance of the Riviera", "Avant Manderley : Rebecca à Monte-Carlo et le romanesque de la Riviera", "Prima di Manderley: la Monte Carlo di Rebecca e il fascino della Riviera", "До Мандерлі: Монте-Карло «Ребекки» й романтика Рив'єри"),
  seoTitle: t("Rebecca by Daphne du Maurier: Monte Carlo Literary Walk", "Rebecca de Daphne du Maurier : promenade à Monte-Carlo", "Rebecca di Daphne du Maurier: passeggiata a Monte Carlo", "«Ребекка» Дафни дю Мор'є: літературне Монте-Карло"),
  seoDescription: t("Explore Rebecca's Monte Carlo opening on a spoiler-free walk from Menton: Casino Square, historic hotel exteriors and gardens, with fiction and filming locations kept distinct.", "Explorez le début de Rebecca à Monte-Carlo depuis Menton : place du Casino, façades d'hôtels et jardins, sans révélations majeures ni confusion avec les lieux de tournage.", "Esplora l'inizio di Rebecca a Monte Carlo da Mentone: Place du Casino, esterni degli hotel e giardini, senza grandi spoiler e distinguendo romanzo e set cinematografici.", "Початок «Ребекки» в Монте-Карло: площа казино, фасади готелів і сади з Ментона, без великих спойлерів та змішування вигадки зі знімальними місцями."),
  excerpt: t("Before Manderley, there was Monte Carlo: a paid companion, a grand hotel and the promise of another life. Follow a literary half-day from Menton without inventing the fictional hotel's address.", "Avant Manderley, Monte-Carlo : une dame de compagnie, un grand hôtel et la promesse d'une autre vie. Une demi-journée littéraire depuis Menton sans inventer l'adresse de l'hôtel fictif.", "Prima di Manderley c'era Monte Carlo: una dama di compagnia, un grande hotel e la promessa di un'altra vita. Mezza giornata letteraria da Mentone senza inventare l'indirizzo dell'albergo fittizio.", "До Мандерлі було Монте-Карло: компаньйонка, розкішний готель та обіцянка іншого життя. Літературні пів дня з Ментона без вигаданої адреси готелю."),
  category: "day-trips", duration: "half-day", publishedOn: "2026-11-03", sourceStatus: "editorial",
  coverImage: "/images/guide/rebecca-monte-carlo-daphne-du-maurier-literary-walk.png",
  coverImageAlt: t("Project illustration of Rebecca beside an imagined period café on Casino Square; not a historical photograph, film still or the fictional hotel's identified address", "Illustration de Rebecca dans un café d'époque imaginé place du Casino ; ni photo historique, ni image du film, ni adresse identifiée de l'hôtel fictif", "Illustrazione di Rebecca presso un immaginario caffè d'epoca in Place du Casino; non foto storica, fotogramma o indirizzo identificato dell'hotel fittizio", "Ілюстрація «Ребекки» біля уявного історичного кафе на площі казино; не історичне фото, кадр фільму чи встановлена адреса вигаданого готелю"),
  visualTheme: "itinerary", visualStatus: "project_illustration", locationTags: ["monaco", "day-trip"],
  tags: [t("Daphne du Maurier", "Daphne du Maurier", "Daphne du Maurier", "Дафна дю Мор'є"), t("Literary Riviera", "Riviera littéraire", "Riviera letteraria", "Літературна Рив'єра"), t("Monte Carlo", "Monte-Carlo", "Monte Carlo", "Монте-Карло")],
  bestFor: [t("Readers and literary travellers", "Lecteurs et voyageurs littéraires", "Lettori e viaggiatori letterari", "Читачі й літературні мандрівники"), t("Architecture and a cultural half-day", "Architecture et demi-journée culturelle", "Architettura e mezza giornata culturale", "Архітектура й культурні пів дня")],
  relatedPlaces: [...new Set(sections.flatMap(section => section.relatedPlaceIds ?? []))],
  relatedArticles: ["tender-is-the-night-fitzgerald-french-riviera", "romain-gary-nice-promise-at-dawn-literary-walk", "the-houses-that-remember-riviera-book-route", "bookshops-libraries-menton", "day-trips-from-menton", "menton-without-a-car", "public-transport-in-menton"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  showTransportHelper: true, transportHelperAfterSectionIndex: 11,
  practicalTips: [t("Allow 1–2 hours walking or 2–3 with a café pause, plus station access and travel. Editorial estimates, not a step-free certification. Checked 3 November 2026: historical and transport sources support the context, but detailed operator pages could not be independently read. Confirm current hotel/casino/café rules, train returns and garden closures. Every stop is contextual, not an identified fictional hotel or verified book scene.", "Prévoyez 1–2 h à pied ou 2–3 h avec café, plus gare et transport : estimations, pas certification d'accessibilité. Vérifié le 3 novembre 2026 : histoire et transport documentés, pages détaillées de l'opérateur non lisibles. Confirmez règles, retours et jardins. Étapes de contexte, pas hôtel fictif identifié ni scènes vérifiées.", "Prevedi 1–2 ore a piedi o 2–3 con caffè, più stazione e viaggio: stime, non accessibilità certificata. Verificato il 3 novembre 2026: storia e trasporti documentati, pagine dettagliate dell'operatore non leggibili. Conferma regole, ritorni e giardini. Tappe contestuali, non hotel fittizio identificato o scene verificate.", "Плануйте 1–2 години ходьби або 2–3 із кафе, плюс станція й дорога: оцінки, не сертифікат доступності. Перевірено 3 листопада 2026: історія й транспорт підтверджені, докладні сторінки оператора не прочитані. Уточнюйте правила, повернення й сади. Зупинки контекстні, не адреса вигаданого готелю чи перевірені сцени.")],
  sections,
};

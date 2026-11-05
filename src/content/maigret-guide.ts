import type { GuideArticle, LocalizedText } from "./guide";
import { formattedMarkdownGuideBody, markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/maigret-liberty-bar-antibes-cannes.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("A murder investigation beneath the holiday sunshine", "Une enquête sous le soleil des vacances", "Un'indagine sotto il sole delle vacanze", "Розслідування під відпускним сонцем"));
sections.forEach((section, index) => {
  const body = (locale: keyof typeof records[number]) => formattedMarkdownGuideBody(records[index][locale]);
  section.body = [t(body("en"), body("fr"), body("it"), body("uk"))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
sections[3].relatedPlaceIds = ["antibes-station"];
sections[4].relatedPlaceIds = ["vieil-antibes"];
sections[5].relatedPlaceIds = ["port-vauban-antibes"];
sections[8].relatedPlaceIds = ["la-croisette-cannes"];
sections[9].relatedPlaceIds = ["rue-meynadier-cannes"];
sections[10].relatedPlaceIds = ["vieux-port-cannes", "le-suquet-cannes"];
sections[11].guideLinkSlug = "menton-without-a-car";
sections[11].guideLinkLabel = t("Plan a car-free day", "Préparer une journée sans voiture", "Organizzare una giornata senza auto", "Сплануйте день без автомобіля");
sections[12].guideLinkSlug = "long-stay-menton-apartment-living";
sections[12].guideLinkLabel = t("Make room for slower visits", "Garder du temps pour des visites lentes", "Lasciare spazio a visite lente", "Залиште час для неспішних поїздок");
sections[15].guideLinkSlug = "tender-is-the-night-fitzgerald-french-riviera";
sections[15].guideLinkLabel = t("Compare Fitzgerald's Riviera", "Comparer la Riviera de Fitzgerald", "Confrontare la Riviera di Fitzgerald", "Порівняйте Рив'єру Фіцджеральда");

export const maigretGuide: GuideArticle = {
  id: "maigret-liberty-bar-antibes-cannes", slug: "maigret-liberty-bar-antibes-cannes",
  title: t("Maigret on the Riviera: Antibes and Cannes in Liberty Bar", "Maigret sur la Riviera : Antibes et Cannes dans Liberty Bar", "Maigret sulla Riviera: Antibes e Cannes in Liberty Bar", "Мегре на Рив'єрі: Антиб і Канни в Liberty Bar"),
  seoTitle: t("Liberty Bar: A Maigret Literary Walk in Antibes and Cannes", "Liberty Bar : promenade littéraire avec Maigret à Antibes et Cannes", "Liberty Bar: percorso letterario di Maigret ad Antibes e Cannes", "Liberty Bar: літературна прогулянка Мегре Антибом і Каннами"),
  seoDescription: t("Explore Simenon's Liberty Bar through Antibes and Cannes. A spoiler-light literary day trip from Menton, with fictional addresses and real public stops distinguished.", "Explorez Liberty Bar de Simenon entre Antibes et Cannes : journée littéraire depuis Menton, sans solution révélée, lieux fictifs et étapes publiques distingués.", "Scopri Liberty Bar di Simenon fra Antibes e Cannes: gita letteraria da Mentone senza rivelare la soluzione, distinguendo finzione e tappe pubbliche.", "Liberty Bar Сіменона через Антиб і Канни: літературний день із Ментона без розв'язки, з розмежуванням вигаданих адрес і громадських зупинок."),
  excerpt: t("Follow the novel's two Riviera towns, not an invented surviving bar. A thematic railway day trip through old streets, ports and resort glamour, or two slower visits.", "Suivre les deux villes du roman, pas un bar survivant inventé : train, ruelles, ports et façade balnéaire en une journée ou deux visites tranquilles.", "Segui le due città del romanzo, non un bar sopravvissuto inventato: treno, vicoli, porti e lusso in una giornata o due visite lente.", "Два міста роману, не вигаданий збережений бар: потяг, провулки, порти й курортна розкіш за день або дві неспішні поїздки."),
  category: "day-trips", duration: "full-day", publishedOn: "2026-11-05", sourceStatus: "editorial", locationTags: ["day-trip", "antibes", "cannes"],
  coverImage: "/images/guide/maigret-liberty-bar-antibes-cannes.png",
  coverImageAlt: t("Supplied artistic composition of Liberty Bar and an imagined Riviera café; not a verified edition, historical photograph or the fictional bar's established address", "Composition artistique fournie de Liberty Bar et d'un café imaginé ; ni édition vérifiée, ni photo historique, ni adresse établie du bar fictif", "Composizione artistica fornita con Liberty Bar e caffè immaginato; non edizione verificata, foto storica o indirizzo accertato del bar", "Надана художня композиція Liberty Bar й уявного кафе; не перевірене видання, історична фотографія чи встановлена адреса вигаданого бару"),
  visualTheme: "itinerary", visualStatus: "project_illustration",
  tags: [t("Georges Simenon", "Georges Simenon", "Georges Simenon", "Жорж Сіменон"), t("Literary Riviera", "Riviera littéraire", "Riviera letteraria", "Літературна Рив'єра")],
  bestFor: [t("Crime-fiction readers and cultural travellers", "Lecteurs de polar et voyageurs culturels", "Lettori di gialli e viaggiatori culturali", "Читачі детективів і культурні мандрівники")],
  relatedPlaces: [...new Set(sections.flatMap(section => section.relatedPlaceIds ?? []))],
  relatedArticles: ["tender-is-the-night-fitzgerald-french-riviera", "bonjour-tristesse-francoise-sagan-french-riviera", "day-trips-from-menton", "menton-without-a-car", "public-transport-in-menton", "long-stay-menton-apartment-living", "bookshops-libraries-menton"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  showTransportHelper: true, transportHelperAfterSectionIndex: 11,
  practicalTips: [t("Sources checked 5 November 2026. An 8–10 hour thematic day, not a measured reconstruction of every scene; split into two visits for more time. No verified real address for Liberty Bar or Brown's house, and no adaptation filming locations established. SNCF pages displayed past October dates; ranges are illustrative, so check actual services and the Cannes-to-Menton return. Le Suquet has slopes and steps; use permitted public routes only.", "Sources vérifiées le 5 novembre 2026. Journée thématique de 8–10 h, pas reconstitution mesurée ; deux visites pour ralentir. Ni adresse vérifiée du bar ou de la maison de Brown ni tournages établis. Pages SNCF sur des dates d'octobre passées : vérifiez vos trains et le retour Cannes–Menton. Pentes et marches au Suquet ; espaces publics autorisés uniquement.", "Fonti verificate il 5 novembre 2026. Giornata tematica di 8–10 ore, non ricostruzione misurata; due visite per rallentare. Nessun indirizzo accertato del bar, della casa di Brown o dei set. SNCF mostrava date di ottobre passate: verifica i tuoi treni e il ritorno Cannes–Mentone. Salite e gradini al Suquet; solo percorsi pubblici consentiti.", "Джерела перевірено 5 листопада 2026. Тематичний день 8–10 годин, не виміряне відтворення сцен; можна розділити на дві поїздки. Адрес бару, будинку Брауна й знімальних місць не встановлено. SNCF показував минулі жовтневі дати: перевірте власні рейси й повернення Канни–Ментон. Сюке має схили й сходи; лише дозволені громадські шляхи.")],
  sections,
};

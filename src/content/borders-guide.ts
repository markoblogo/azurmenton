import type { GuideArticle, LocalizedText } from "./guide";
import { formattedMarkdownGuideBody, markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/france-monaco-italy-travel-from-menton.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("Three countries, different rules", "Trois pays, des règles différentes", "Tre paesi, regole diverse", "Три країни, різні правила"));
sections.forEach((section, index) => {
  const body = (locale: keyof typeof records[number]) => formattedMarkdownGuideBody(records[index][locale]);
  section.body = [t(body("en"), body("fr"), body("it"), body("uk"))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
sections[6].relatedPlaceIds = ["menton-station", "menton-garavan-station", "monaco-monte-carlo-station"];
sections[7].relatedPlaceIds = ["ventimiglia-station"];
sections[13].relatedPlaceIds = ["monaco-monte-carlo", "ventimiglia", "sanremo"];
sections[7].guideLinkSlug = "italian-riviera-day-trip-from-menton";
sections[7].guideLinkLabel = t("Plan the Italian part of your day", "Préparer la journée italienne", "Organizzare la giornata italiana", "Сплануйте італійську частину дня");
sections[9].guideLinkSlug = "public-transport-in-menton";
sections[9].guideLinkLabel = t("Check transport and return options", "Vérifier transports et retours", "Verificare trasporti e rientro", "Перевірте транспорт і повернення");
sections[10].guideLinkSlug = "car-rental-menton-nice-airport-convertibles";
sections[10].guideLinkLabel = t("Read the local car-rental guide", "Consulter le guide de location", "Leggere la guida al noleggio", "Перегляньте гайд про оренду авто");

export const bordersGuide: GuideArticle = {
  id: "france-monaco-italy-travel-from-menton", slug: "france-monaco-italy-travel-from-menton",
  title: t("France, Monaco and Italy from Menton: Borders, Roaming, Money and Transport", "France, Monaco et Italie depuis Menton : frontières, téléphone, argent et transports", "Francia, Monaco e Italia da Mentone: confini, roaming, denaro e trasporti", "Франція, Монако й Італія з Ментона: кордони, роумінг, гроші та транспорт"),
  seoTitle: t("Menton Border Travel: France, Monaco and Italy", "Depuis Menton : frontières, roaming, Monaco et Italie", "Da Mentone: confini, roaming, Monaco e Italia", "Із Ментона до Монако й Італії: кордони та роумінг"),
  seoDescription: t("Plan Monaco and Italy trips from Menton: documents, roaming exceptions, euros, separate train tickets, regional passes and dated SNCF works, with official sources.", "Depuis Menton vers Monaco et l'Italie : documents, roaming, euros, billets, pass et travaux SNCF datés, avec sources officielles et limites individuelles.", "Da Mentone a Monaco e in Italia: documenti, roaming, euro, biglietti, pass e lavori SNCF datati, con fonti ufficiali e limiti personali.", "Поїздки з Ментона до Монако й Італії: документи, роумінг, євро, квитки, проїзні й датовані роботи SNCF з офіційними джерелами."),
  excerpt: t("Short distances do not mean identical rules. Check your documents, mobile plan, rail tickets and return before crossing to Monaco or Italy from your Menton base.", "Des distances courtes, mais des règles différentes. Vérifiez documents, forfait mobile, billets et retour avant une excursion depuis Menton.", "Distanze brevi, ma regole diverse. Controllate documenti, piano mobile, biglietti e rientro prima di una gita da Mentone.", "Короткі відстані не означають однакових правил. Перевірте документи, мобільний тариф, квитки й повернення перед поїздкою з Ментона."),
  category: "practical", duration: "flexible", publishedOn: "2026-11-04", sourceStatus: "editorial", locationTags: ["menton", "monaco", "ventimiglia", "sanremo"],
  coverImage: "/images/guide/france-monaco-italy-travel-from-menton.png",
  coverImageAlt: t("Artistic composite of France, Monaco and Italy direction signs above a Riviera railway; not a real border junction, map or verified railway location", "Composition artistique de panneaux France, Monaco et Italie au-dessus d'une voie côtière ; ni carrefour réel, ni carte ou lieu ferroviaire vérifié", "Composizione artistica con cartelli Francia, Monaco e Italia sopra una ferrovia costiera; non incrocio reale, mappa o luogo ferroviario verificato", "Художня композиція вказівників Франції, Монако й Італії над прибережною залізницею; не реальне перехрестя, карта чи перевірена залізнична локація"),
  visualTheme: "itinerary", visualStatus: "project_illustration",
  tags: [t("Border travel", "Voyages transfrontaliers", "Viaggi oltre confine", "Транскордонні поїздки"), t("Roaming", "Roaming", "Roaming", "Роумінг"), t("Rail tickets", "Billets de train", "Biglietti ferroviari", "Залізничні квитки")],
  bestFor: [t("First-time and international visitors", "Premiers séjours et visiteurs internationaux", "Prime visite e ospiti internazionali", "Перші візити й міжнародні гості"), t("Car-free day trips and longer stays", "Excursions sans voiture et séjours longs", "Gite senza auto e soggiorni lunghi", "Поїздки без авто й тривале проживання")],
  relatedPlaces: [...new Set(sections.flatMap(section => section.relatedPlaceIds ?? []))],
  relatedArticles: ["public-transport-in-menton", "menton-without-a-car", "italian-riviera-day-trip-from-menton", "day-trips-from-menton", "useful-apps-websites-menton-monaco-italian-riviera", "car-rental-menton-nice-airport-convertibles", "where-to-stay-in-menton"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  showTransportHelper: true, transportHelperAfterSectionIndex: 9,
  practicalTips: [t("Checked 4 November 2026. General guidance, not an individual visa, insurance or tariff decision. Monaco roaming is plan- and call-destination-specific. France's notified controls include Italy through 30 April 2027; SNCF lists night works through 10 December 2027 and additional dated interruptions. Verify documents, exact ticket coverage and the actual return before travel. The cover is an artistic composite, not a map.", "Vérifié le 4 novembre 2026. Conseils généraux, pas décision individuelle sur visa, assurance ou tarif. Roaming à Monaco selon forfait et destination des appels. Contrôles français notifiés jusqu'au 30 avril 2027, travaux nocturnes SNCF jusqu'au 10 décembre 2027 et autres interruptions datées. Vérifiez documents, billets et retour réel. Couverture artistique, pas une carte.", "Verificato il 4 novembre 2026. Indicazioni generali, non decisioni su visto, assicurazione o tariffa personale. Roaming a Monaco secondo piano e destinazione delle chiamate. Controlli francesi notificati fino al 30 aprile 2027, lavori notturni SNCF fino al 10 dicembre 2027 e altre interruzioni datate. Verificate documenti, titoli e ritorno effettivo. Copertina artistica, non mappa.", "Перевірено 4 листопада 2026. Загальні поради, не особисте рішення щодо візи, страховки чи тарифу. Роумінг у Монако залежить від пакета й напрямку дзвінків. Французькі перевірки повідомлені до 30 квітня 2027, нічні роботи SNCF — до 10 грудня 2027, можливі інші датовані перерви. Звірте документи, квитки й реальне повернення. Обкладинка художня, не карта.")],
  sections,
};

import type { GuideArticle, LocalizedText } from "./guide";
import { formattedMarkdownGuideBody, markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/les-derniers-feux-de-la-royaute-menton.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("A portraitist, a revolutionary and a town between worlds", "Une portraitiste, un révolutionnaire et une ville entre deux mondes", "Una ritrattista, un rivoluzionario e una città tra due mondi", "Портретистка, революціонер і місто між двома світами"));
sections.forEach((section, index) => {
  const body = (locale: keyof typeof records[number]) => formattedMarkdownGuideBody(records[index][locale]);
  section.body = [t(body("en"), body("fr"), body("it"), body("uk"))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
sections[2].relatedPlaceIds = ["odyssee-bibliotheque-menton"];
sections[7].relatedPlaceIds = ["rue-longue-menton", "basilica-saint-michel-archange", "halles-du-marche", "esplanade-des-sablettes-menton"];
sections[6].guideLinkSlug = "menton-lemons-producers-orchards-tastings";
sections[6].guideLinkLabel = t("Explore Menton's citrus heritage", "Découvrir le patrimoine des agrumes", "Scopri il patrimonio degli agrumi", "Дізнайтеся про цитрусову спадщину Ментона");
sections[7].guideLinkSlug = "menton-old-town";
sections[7].guideLinkLabel = t("Explore the old town", "Explorer le centre ancien", "Esplora il centro antico", "Дослідіть старе місто");
sections[8].guideLinkSlug = "menton-accessible-step-free-walks";
sections[8].guideLinkLabel = t("Compare lower-town, step-free alternatives", "Comparer les alternatives du bas de la ville", "Confronta le alternative nella parte bassa", "Порівняйте нижні маршрути без сходів");
sections[11].guideLinkSlug = "belle-epoque-menton-architecture-walk";
sections[11].guideLinkLabel = t("Continue into Belle Époque Menton", "Poursuivre dans le Menton Belle Époque", "Prosegui nella Mentone della Belle Époque", "Продовжте знайомство з Ментоном Belle Époque");

export const platelGuide: GuideArticle = {
  id: "les-derniers-feux-de-la-royaute-menton", slug: "les-derniers-feux-de-la-royaute-menton",
  title: t("Revolution and Romance in Menton: Les Derniers Feux de la royauté", "Menton à l'heure de la Révolution : Les Derniers Feux de la royauté", "Rivoluzione e amore a Mentone: Les Derniers Feux de la royauté", "Революція й кохання в Ментоні: Les Derniers Feux de la royauté"),
  seoTitle: t("Les Derniers Feux de la royauté: Historic Menton Walk", "Virginie Platel : Menton à l'heure de la Révolution", "Virginie Platel: rivoluzione e passeggiata a Mentone", "Віржині Платель: революція та історичний Ментон"),
  seoDescription: t("Discover Virginie Platel's French historical romance, Menton's Monaco-era past and a five-stop old-town walk. A spoiler-free interpretation, not a scene map.", "Le roman de Virginie Platel, Menton sous les Grimaldi et cinq étapes dans le centre ancien. Sans dénouement dévoilé ni fausses adresses de scènes.", "Il romanzo francese di Virginie Platel, il passato monegasco e cinque tappe nel centro antico. Senza spoiler né indirizzi inventati delle scene.", "Французький роман Віржині Платель, Ментон часів Грімальді та п'ять зупинок старим містом. Без спойлерів і вигаданих адрес сцен."),
  excerpt: t("A royal portraitist meets revolutionary ideas in Menton, 1789. Read Virginie Platel's premise, then explore the real old town without confusing fiction and history.", "Une portraitiste de cour rencontre les idées révolutionnaires à Menton en 1789. Découvrez le roman de Virginie Platel, puis le centre ancien, sans confondre fiction et histoire.", "Una ritrattista di corte incontra le idee rivoluzionarie nella Mentone del 1789. Il romanzo di Virginie Platel e il centro antico, distinguendo narrativa e storia.", "Придворна портретистка зустрічає революційні ідеї в Ментоні 1789 року. Роман Віржині Платель і старе місто без змішування вигадки та історії."),
  category: "walks-views", duration: "1-2 hours", publishedOn: "2026-11-04", sourceStatus: "editorial", locationTags: ["menton"], showTransportHelper: false,
  coverImage: "/images/guide/les-derniers-feux-de-la-royaute-menton.png",
  coverImageAlt: t("Supplied artistic illustration of a book representing Virginie Platel's novel beside an imagined Menton view; not the verified publisher's cover or a documentary image of 1789", "Illustration artistique fournie représentant le roman de Virginie Platel devant une vue imaginée de Menton ; ni couverture éditoriale vérifiée ni document de 1789", "Illustrazione artistica fornita con un libro che rappresenta il romanzo di Virginie Platel e una veduta immaginata di Mentone; non copertina editoriale verificata o documento del 1789", "Надана художня ілюстрація з книжкою, що представляє роман Віржині Платель, та уявним видом Ментона; не перевірена видавнича обкладинка чи документ 1789 року"),
  visualTheme: "itinerary", visualStatus: "project_illustration",
  tags: [t("Virginie Platel", "Virginie Platel", "Virginie Platel", "Віржині Платель"), t("Historical romance", "Romance historique", "Romanzo storico sentimentale", "Історичний любовний роман"), t("Literary walk", "Promenade littéraire", "Passeggiata letteraria", "Літературна прогулянка")],
  bestFor: [t("French-language readers", "Lecteurs francophones", "Lettori in francese", "Читачі французькою"), t("History and old-town walks", "Histoire et centre ancien", "Storia e centro antico", "Історія та старе місто")],
  relatedPlaces: ["odyssee-bibliotheque-menton", "rue-longue-menton", "basilica-saint-michel-archange", "halles-du-marche", "esplanade-des-sablettes-menton"],
  relatedArticles: ["menton-old-town", "menton-lemons-producers-orchards-tastings", "belle-epoque-menton-architecture-walk", "janet-frame-menton-in-the-memorial-room", "bookshops-libraries-menton", "menton-accessible-step-free-walks"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  practicalTips: [t("Checked 4 November 2026. French-language fiction; synopsis and municipal article checked, not a full-text reading. Five editorial stops, approximately 60–90 minutes excluding longer visits, not measured on foot. Steep stairs and uneven surfaces: the full route is not step-free. Visit the market while open; check basilica access around services. No specific fictional scene address is verified.", "Vérifié le 4 novembre 2026. Fiction en français ; annotation et article municipal vérifiés, pas de lecture intégrale. Cinq étapes éditoriales, environ 60–90 minutes hors visites prolongées, non chronométrées sur place. Escaliers et sols irréguliers : parcours complet non accessible sans marches. Marché à visiter pendant l'ouverture ; accès à l'église à vérifier selon les offices. Aucune adresse précise de scène n'est attestée.", "Verificato il 4 novembre 2026. Narrativa in francese; sinossi e articolo comunale controllati, non lettura integrale. Cinque tappe editoriali, circa 60–90 minuti senza visite lunghe, non misurati sul campo. Scale ripide e fondo irregolare: il percorso completo non è senza gradini. Mercato durante l'apertura; verifica la basilica secondo le funzioni. Nessun indirizzo preciso delle scene è accertato.", "Перевірено 4 листопада 2026 року. Художній твір французькою; перевірено анотацію й міську статтю, не повний текст. П'ять редакційних зупинок, приблизно 60–90 хвилин без довгих відвідувань, не виміряні на місцевості. Круті сходи й нерівне покриття: повний маршрут не безсходинковий. Ринок — під час роботи, доступ до базиліки уточнюйте з огляду на служби. Точні адреси сцен не підтверджено.")],
  sections,
};

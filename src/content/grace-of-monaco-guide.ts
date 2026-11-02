import type { GuideArticle, LocalizedText } from "./guide";
import { formattedMarkdownGuideBody, markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/grace-of-monaco-filming-locations-menton.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("The Monaco marketplace that was actually in Menton", "Le marché monégasque qui était à Menton", "Il mercato monegasco che era a Mentone", "Ринок Монако, який насправді був у Ментоні"));
sections.forEach((section, index) => {
  const body = (locale: keyof typeof records[number]) => formattedMarkdownGuideBody(records[index][locale]);
  section.body = [t(body("en"), body("fr"), body("it"), body("uk"))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
sections[2].guideLinkSlug = "films-shot-in-menton";
sections[2].guideLinkLabel = t("Explore Menton's other screen locations", "Découvrir les autres lieux de cinéma de Menton", "Scopri le altre location di Mentone", "Відкрийте інші кінолокації Ментона");
sections[3].relatedPlaceIds = ["basilica-saint-michel-archange"];
sections[4].relatedPlaceIds = ["rampes-saint-michel"];
sections[4].guideLinkSlug = "menton-accessible-step-free-walks";
sections[4].guideLinkLabel = t("Choose a step-free alternative instead", "Choisir plutôt une alternative sans marches", "Scegli invece un'alternativa senza gradini", "Натомість оберіть альтернативу без сходинок");
sections[9].relatedPlaceIds = ["rue-longue-menton", "esplanade-des-sablettes-menton"];
sections[9].guideLinkSlug = "menton-old-town";
sections[9].guideLinkLabel = t("Explore the old town beyond the film", "Explorer la vieille ville au-delà du film", "Esplora il centro storico oltre il film", "Дослідіть старе місто поза фільмом");
sections[11].guideLinkSlug = "james-bond-menton-never-say-never-again-filming-locations";
sections[11].guideLinkLabel = t("Follow another film walk: James Bond", "Suivre une autre promenade de cinéma : James Bond", "Segui un'altra passeggiata: James Bond", "Спробуйте іншу кінопрогулянку: Джеймс Бонд");

export const graceOfMonacoGuide: GuideArticle = {
  id: "grace-of-monaco-filming-locations-menton", slug: "grace-of-monaco-filming-locations-menton",
  title: t("When Menton Played Monaco: Grace of Monaco Filming Locations", "Quand Menton jouait Monaco : les lieux de tournage de Grace de Monaco", "Quando Mentone interpretava Monaco: i luoghi di Grace di Monaco", "Коли Ментон грав Монако: місця зйомок «Принцеси Монако»"),
  seoTitle: t("Grace of Monaco Filming Locations: Menton's Saint-Michel Square", "Grace de Monaco : tournage sur le parvis Saint-Michel à Menton", "Grace di Monaco: location e passeggiata Saint-Michel a Mentone", "«Принцеса Монако»: кінолокації та площа Saint-Michel у Ментоні"),
  seoDescription: t("Explore the Menton square that became a Monaco market in Grace of Monaco (2014). A 45–90-minute walk separating verified filming sites, screen geography and history.", "Découvrez le parvis de Menton devenu marché de Monaco dans le film avec Nicole Kidman : promenade de 45–90 minutes, lieux vérifiés et histoire distinguée de la fiction.", "Scopri la piazza di Mentone che interpreta un mercato di Monaco nel film con Nicole Kidman. Passeggiata di 45–90 minuti fra location verificate, cinema e storia.", "Відвідайте площу Ментона, що стала ринком Монако у фільмі з Ніколь Кідман. Прогулянка на 45–90 хвилин: підтверджені зйомки, екранна географія й історія."),
  excerpt: t("One real square, an imagined Monaco and a disputed historical drama. Follow Grace of Monaco to Saint-Michel without mistaking nearby streets for verified scenes.", "Une vraie place, un Monaco imaginé et un drame historique contesté : découvrir Saint-Michel sans attribuer aux rues voisines des scènes non vérifiées.", "Una piazza reale, una Monaco immaginata e un dramma storico contestato: scopri Saint-Michel senza attribuire scene non verificate alle strade vicine.", "Справжня площа, уявне Монако й суперечлива історична драма. Знайдіть Saint-Michel, не приймаючи сусідні вулиці за підтверджені сцени."),
  category: "walks-views", duration: "45 to 90 minutes", publishedOn: "2026-11-02", sourceStatus: "editorial",
  coverImage: "/images/guide/grace-of-monaco-filming-locations-menton.png",
  coverImageAlt: t("Project illustration imagining a period market beside Saint-Michel in Menton, not a film still, historical photograph or verified camera view", "Illustration d'un marché d'époque imaginé près de Saint-Michel à Menton, ni photogramme du film, ni photo historique, ni angle de caméra vérifié", "Illustrazione di un mercato d'epoca immaginato presso Saint-Michel a Mentone, non un fotogramma, una foto storica o un'inquadratura verificata", "Ілюстрація уявного давнього ринку біля Saint-Michel у Ментоні, не кадр фільму, історичне фото чи перевірений ракурс камери"),
  visualTheme: "itinerary", visualStatus: "project_illustration", locationTags: ["old-town", "menton-centre", "seafront"],
  tags: [t("Grace of Monaco", "Grace de Monaco", "Grace di Monaco", "Принцеса Монако"), t("Film locations", "Lieux de tournage", "Location cinematografiche", "Кінолокації"), t("Saint-Michel", "Saint-Michel", "Saint-Michel", "Saint-Michel")],
  bestFor: [t("Film and architecture enthusiasts", "Amateurs de cinéma et d'architecture", "Appassionati di cinema e architettura", "Любителі кіно й архітектури"), t("A short old-town walk", "Une courte promenade dans la vieille ville", "Una breve passeggiata nel centro storico", "Коротка прогулянка старим містом")],
  relatedPlaces: [...new Set(sections.flatMap(section => section.relatedPlaceIds ?? []))],
  relatedArticles: ["films-shot-in-menton", "james-bond-menton-never-say-never-again-filming-locations", "menton-old-town", "menton-accessible-step-free-walks", "jean-cocteau-menton-walking-route"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  practicalTips: [t("Allow approximately 45–90 minutes. The traditional route has substantial stairs, slopes and uneven surfaces; it is not step-free. The square is public, while basilica access depends on worship and opening arrangements. Only the parvis is identified as the marketplace scene; exact frame timestamps and camera positions remain unverified.", "Prévoyez environ 45–90 minutes. Escaliers importants, pentes et sols irréguliers : ce n'est pas un parcours sans marches. Parvis public ; intérieur selon offices et ouvertures. Seul le parvis est identifié pour le marché ; minutage et positions exactes restent non vérifiés.", "Prevedi circa 45–90 minuti. Scale importanti, pendenze e superfici irregolari: non è un itinerario senza gradini. Piazza pubblica; basilica secondo funzioni e aperture. Solo il parvis è identificato per il mercato; minutaggi e posizioni esatte restano non verificati.", "Передбачте приблизно 45–90 хвилин. Значні сходи, ухили й нерівності: це не безсходинковий маршрут. Площа громадська, базиліка доступна залежно від служб і відкриття. Лише площа підтверджена як ринок; точні таймкоди й позиції камер не перевірені.")],
  sections,
};

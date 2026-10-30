import type { GuideArticle, LocalizedText } from "./guide";
import { markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/jean-cocteau-menton-walking-route.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("Follow Cocteau from the town hall to the sea", "Suivre Cocteau de la mairie à la mer", "Segui Cocteau dal municipio al mare", "Пройдіть слідами Кокто від мерії до моря"));
sections.forEach((section, index) => {
  const body = (locale: keyof typeof records[number]) => records[index][locale].split("\n").slice(1).map(line => line.trim()).filter(line => line && !line.startsWith("|")).map(line => line.replace(/^###\s+(.+)$/, "**$1**").replace(/^[-*]\s+/, "")).join("\n");
  section.body = [t(body("en"), body("fr"), body("it"), body("uk"))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
sections[2].relatedPlaceIds = ["salle-des-mariages-jean-cocteau"];
sections[3].relatedPlaceIds = ["rue-saint-michel-menton"];
sections[4].relatedPlaceIds = ["musee-jean-cocteau-wunderman-menton", "palais-de-leurope-menton"];
sections[5].relatedPlaceIds = ["vieux-port-menton"];
sections[6].relatedPlaceIds = ["musee-jean-cocteau-bastion"];
sections[7].relatedPlaceIds = ["plage-sablettes"];
sections[3].guideLinkSlug = "belle-epoque-menton-architecture-walk";
sections[3].guideLinkLabel = t("Explore Menton's architectural details", "Explorer les détails architecturaux de Menton", "Scopri i dettagli architettonici di Mentone", "Відкрийте архітектурні деталі Ментона");
sections[7].guideLinkSlug = "menton-old-town";
sections[7].guideLinkLabel = t("Continue through Menton's old town", "Continuer dans la vieille ville", "Prosegui nel centro storico", "Продовжіть старим містом Ментона");
sections[13].guideLinkSlug = "menton-without-a-car";
sections[13].guideLinkLabel = t("Plan a stay without a car", "Préparer un séjour sans voiture", "Organizza un soggiorno senza auto", "Сплануйте відпочинок без авто");

export const cocteauMentonGuide: GuideArticle = {
  id: "jean-cocteau-menton-walking-route", slug: "jean-cocteau-menton-walking-route",
  title: t("Jean Cocteau in Menton: an artist's journey through the city", "Jean Cocteau à Menton : le parcours d'un artiste à travers la ville", "Jean Cocteau a Mentone: il viaggio di un artista attraverso la città", "Жан Кокто в Ментоні: мистецька подорож містом"),
  seoTitle: t("Jean Cocteau in Menton: Self-Guided Walking Route & Museums", "Jean Cocteau à Menton : parcours à pied et musées", "Jean Cocteau a Mentone: itinerario a piedi e musei", "Жан Кокто в Ментоні: пішохідний маршрут і музеї"),
  seoDescription: t("Follow Jean Cocteau through Menton on a self-guided walk: the Wedding Hall, Le Bastion, the closed Wunderman museum exterior and Sablettes. Check hours and tickets.", "Parcours Cocteau à Menton : Salle des Mariages, Bastion, extérieur du musée Wunderman fermé et Sablettes. Horaires, billets et conseils de visite.", "Segui Cocteau a Mentone: sala dei matrimoni, Bastion, esterno del museo Wunderman chiuso e Sablettes. Orari, biglietti e consigli pratici.", "Пройдіть Ментоном слідами Кокто: весільна зала, Bastion, екстер'єр закритого музею Wunderman і Sablettes. Години, квитки й поради."),
  excerpt: t("A two-to-three-hour cultural walk from Cocteau's Wedding Hall to his intimate Bastion museum and the Mediterranean, with clear advice on which sites are open.", "Deux à trois heures de promenade, de la Salle des Mariages au Bastion et à la Méditerranée, avec des indications claires sur les lieux ouverts.", "Una passeggiata di due o tre ore dalla sala dei matrimoni al Bastion e al Mediterraneo, distinguendo i luoghi visitabili da quelli chiusi.", "Культурна прогулянка на дві-три години від весільної зали до Bastion і Середземного моря, з чітким розрізненням відкритих та закритих місць."),
  category: "itineraries", duration: "half-day", publishedOn: "2026-10-30", sourceStatus: "editorial",
  coverImage: "/images/guide/jean-cocteau-menton-walking-route.png",
  coverImageAlt: t("Illustration inspired by Cocteau's line drawings overlooking Menton and its old port", "Illustration inspirée des lignes de Cocteau face à Menton et à son vieux port", "Illustrazione ispirata alle linee di Cocteau con Mentone e il porto vecchio", "Ілюстрація за мотивами ліній Кокто з краєвидом Ментона та Старого порту"),
  visualTheme: "museum", visualStatus: "project_illustration",
  tags: [t("Jean Cocteau", "Jean Cocteau", "Jean Cocteau", "Жан Кокто"), t("Art and cinema", "Art et cinéma", "Arte e cinema", "Мистецтво й кіно"), t("Walking route", "Parcours à pied", "Itinerario a piedi", "Пішохідний маршрут")],
  bestFor: [t("Art lovers", "Amateurs d'art", "Amanti dell'arte", "Поціновувачі мистецтва"), t("Couples and cultural travellers", "Couples et voyageurs culturels", "Coppie e viaggiatori culturali", "Пари та культурні мандрівники")],
  locationTags: ["menton-centre", "seafront"],
  relatedArticles: ["museums-in-menton-nice-monaco", "menton-old-town", "belle-epoque-menton-architecture-walk", "famous-paintings-of-menton", "menton-without-a-car", "where-to-stay-in-menton"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  showTransportHelper: false, sections,
};

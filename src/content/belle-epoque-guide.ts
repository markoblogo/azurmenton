import type { GuideArticle, LocalizedText } from "./guide";
import { markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/belle-epoque-menton-architecture-walk.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("Look up: Menton's grand-hotel heritage", "Levez les yeux : le patrimoine des grands hôtels", "Alzate lo sguardo: il patrimonio dei grandi hotel", "Погляд угору: спадщина гранд-готелів Ментона"));
sections[3].relatedPlaceIds = ["palais-de-leurope-menton"];
sections[4].relatedPlaceIds = ["jardins-bioves"];
sections[5].relatedPlaceIds = ["le-majestic-menton", "ancien-hotel-louvre-menton"];
sections[6].relatedPlaceIds = ["hotel-lorangeraie-mileade-spa"];
sections[7].relatedPlaceIds = ["royal-westminster-menton", "le-balmoral-menton"];
sections[9].relatedPlaceIds = ["winter-palace-menton"];
sections[10].relatedPlaceIds = ["riviera-palace-menton"];
sections[11].relatedPlaceIds = ["villa-maria-serena"];

export const belleEpoqueGuide: GuideArticle = {
  id: "belle-epoque-menton-architecture-walk", slug: "belle-epoque-menton-architecture-walk",
  title: t("Belle Époque in Menton: villas, grand hotels and an architectural walking tour", "La Belle Époque à Menton : villas, grands hôtels et promenade architecturale", "Belle Époque a Mentone: ville, grandi alberghi e passeggiata architettonica", "Прекрасна епоха в Ментоні: вілли, гранд-готелі та архітектурна прогулянка"),
  seoTitle: t("Belle Époque Menton: Historic Villas & Grand Hotels Walking Tour", "Belle Époque à Menton : villas, palaces et promenade", "Belle Époque a Mentone: ville, palaces e itinerario a piedi", "Прекрасна епоха в Ментоні: вілли й готелі-палаци"),
  seoDescription: t("Explore Menton's Belle Époque architecture on a self-guided walking tour. Discover former grand hotels, ornate façades, gardens and villas, with practical access information.", "Découvrez les villas et anciens palaces de Menton à pied : façades, jardins, histoire et accès publics ou privés clairement distingués.", "Scopri a piedi ville e grandi alberghi storici di Mentone: facciate, giardini, storia e distinzione tra spazi pubblici e proprietà private.", "Відкрийте вілли й колишні гранд-готелі Ментона пішки: фасади, сади, історія та чіткі пояснення громадського й приватного доступу."),
  excerpt: t("Read Menton's winter-resort history in its grand façades, then choose a central walk or an uphill extension to the former palace hotels.", "Lisez l'histoire de la villégiature hivernale dans les façades, au centre ou sur les hauteurs des anciens palaces.", "Leggi la storia della villeggiatura invernale nelle facciate del centro e degli ex palaces in collina.", "Прочитайте історію зимового курорту у фасадах центру та колишніх палацових готелів на схилах."),
  category: "walks-views", duration: "flexible", publishedOn: "2026-10-28", sourceStatus: "verified",
  coverImage: "/images/guide/belle-epoque-menton-architecture-walk.png",
  coverImageAlt: t("Illustration of a Belle Époque hotel façade above Menton's seafront", "Illustration d'une façade Belle Époque sur le front de mer de Menton", "Illustrazione di una facciata Belle Époque sul lungomare di Mentone", "Ілюстрація фасаду доби Прекрасної епохи над набережною Ментона"),
  visualTheme: "itinerary", visualStatus: "project_illustration",
  tags: [t("Architecture", "Architecture", "Architettura", "Архітектура"), t("Belle Époque", "Belle Époque", "Belle Époque", "Прекрасна епоха"), t("Self-guided walk", "Promenade autonome", "Passeggiata autonoma", "Самостійна прогулянка")],
  bestFor: [t("Architecture and history", "Architecture et histoire", "Architettura e storia", "Архітектура та історія"), t("Couples and photographers", "Couples et photographes", "Coppie e fotografi", "Пари та фотографи")],
  locationTags: ["menton-centre", "garavan"],
  relatedArticles: ["menton-old-town", "best-walks-and-hikes-around-menton", "best-photo-spots-menton", "museums-in-menton-nice-monaco", "menton-in-winter", "menton-three-day-itinerary", "where-to-stay-in-menton"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  showTransportHelper: false,
  sections,
};

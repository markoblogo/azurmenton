import type { GuideArticle, LocalizedText } from "./guide";
import { markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/roya-valley-day-trip-from-menton.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("Plan one good day in the valley", "Préparer une belle journée dans la vallée", "Organizzare una bella giornata nella valle", "Сплануйте вдалий день у долині"));
sections[3].relatedPlaceIds = ["breil-sur-roya", "santa-maria-in-albis-breil", "ecomusee-transports-breil"];
sections[4].relatedPlaceIds = ["saorge", "monastere-saorge"];
sections[5].relatedPlaceIds = ["tende", "musee-departemental-des-merveilles-tende"];
sections[5].relatedEventIds = ["cest-pas-classique-riviera-2026"];
sections[6].relatedPlaceIds = ["la-brigue", "notre-dame-fontaines-la-brigue"];
sections[7].relatedPlaceIds = ["fontan"];
sections[14].relatedPlaceIds = ["sospel-bevera-valley", "gorbio", "roquebrune-medieval-village"];

export const royaGuide: GuideArticle = {
  id: "roya-valley-day-trip-from-menton", slug: "roya-valley-day-trip-from-menton",
  title: t("A day trip to the Roya Valley from Menton: villages, culture and practical routes", "Une journée dans la vallée de la Roya depuis Menton : villages, culture et itinéraires", "Una gita nella Valle Roya da Mentone: borghi, cultura e itinerari pratici", "Одноденна поїздка в долину Роя з Ментона: села, культура та маршрути"),
  seoTitle: t("Roya Valley from Menton: Day Trip, Villages, Trains & Road Access", "Vallée de la Roya depuis Menton : villages, trains et accès", "Valle Roya da Mentone: borghi, treni e accessi stradali", "Долина Роя з Ментона: села, потяги та дороги"),
  seoDescription: t("Plan a realistic day trip from Menton to the Roya Valley. Compare Breil-sur-Roya, Saorge, Tende and La Brigue, check transport, walking difficulty, museum hours and backup plans.", "Préparez une journée dans la Roya depuis Menton : Breil, Saorge, Tende ou La Brigue, transports, difficultés de marche, musées et solutions de repli.", "Organizza una gita nella Roya da Mentone: Breil, Saorge, Tende o La Brigue, trasporti, difficoltà a piedi, musei e alternative.", "Сплануйте день у долині Роя з Ментона: Брей, Саорж, Тенд чи Ла-Бріг, транспорт, складність ходьби, музеї та запасні плани."),
  excerpt: t("Choose one mountain village, confirm the journey home and enjoy the Roya's heritage without rushing between every stop.", "Choisissez un village, confirmez le retour et découvrez le patrimoine de la Roya sans multiplier les étapes.", "Scegli un borgo, conferma il ritorno e scopri il patrimonio della Roya senza troppe tappe.", "Оберіть одне гірське село, перевірте повернення й відкрийте спадщину Рої без поспіху."),
  category: "day-trips", duration: "full-day", publishedOn: "2026-10-28", sourceStatus: "verified",
  coverImage: "/images/guide/roya-valley-day-trip-from-menton.png",
  coverImageAlt: t("Illustration of a mountain village and river in the Roya Valley", "Illustration d'un village et d'une rivière dans la vallée de la Roya", "Illustrazione di un borgo e un fiume nella Valle Roya", "Ілюстрація гірського села й річки в долині Роя"),
  visualTheme: "itinerary", visualStatus: "project_illustration",
  tags: [t("Roya Valley", "Vallée de la Roya", "Valle Roya", "Долина Роя"), t("Villages and heritage", "Villages et patrimoine", "Borghi e patrimonio", "Села та спадщина"), t("Transport planning", "Préparer les transports", "Pianificare i trasporti", "Планування транспорту")],
  bestFor: [t("Couples", "Couples", "Coppie", "Пари"), t("History and photography", "Histoire et photographie", "Storia e fotografia", "Історія та фотографія")],
  locationTags: ["roya-valley"],
  relatedArticles: ["day-trips-from-menton", "public-transport-in-menton", "mountains-snow-skiing-near-menton", "best-walks-and-hikes-around-menton", "car-rental-menton-nice-airport-convertibles", "menton-in-winter", "where-to-stay-in-menton"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  relatedEvents: ["cest-pas-classique-riviera-2026"],
  showTransportHelper: false,
  sections,
};

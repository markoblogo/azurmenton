import type { GuideArticle, LocalizedText } from "./guide";
import { markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/menton-lemons-producers-orchards-tastings.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("Discover the fruit beyond the festival", "Découvrir le fruit au-delà de la fête", "Scoprire il frutto oltre la festa", "Відкрийте плід поза фестивалем"));
sections.forEach((section, index) => {
  const body = (locale: keyof typeof records[number]) => records[index][locale].split("\n").slice(1).map(line => line.trim()).filter(line => line && !line.startsWith("|")).map(line => line.replace(/^###\s+(.+)$/, "**$1**").replace(/^[-*]\s+/, "")).join("\n");
  section.body = [t(body("en"), body("fr"), body("it"), body("uk"))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
sections[3].relatedPlaceIds = ["domaine-gannac-menton"];
sections[4].relatedPlaceIds = ["emilie-citrons-de-pepe-menton"];
sections[5].relatedPlaceIds = ["sacchelli-citrus-growers-menton"];
sections[6].relatedPlaceIds = ["la-ferme-des-citrons-menton"];
sections[7].relatedPlaceIds = ["maison-herbin-menton"];
sections[8].relatedPlaceIds = ["pasta-piemonte-menton", "maison-gannac-menton", "au-pays-du-citron-menton", "la-tarte-mentonnaise"];
sections[13].relatedEventIds = ["menton-lemon-festival"];
sections[13].guideLinkSlug = "fete-du-citron-menton-practical-guide";
sections[13].guideLinkLabel = t("Plan the Lemon Festival separately", "Préparer la Fête du Citron séparément", "Organizza separatamente la Festa del Limone", "Окремо сплануйте Свято лимона");
sections[14].relatedPlaceIds = ["palais-carnoles-menton"];
sections[14].guideLinkSlug = "menton-without-a-car";
sections[14].guideLinkLabel = t("Plan your car-free stay", "Préparer un séjour sans voiture", "Organizza un soggiorno senza auto", "Сплануйте відпочинок без авто");

export const mentonLemonsGuide: GuideArticle = {
  id: "menton-lemons-producers-orchards-tastings", slug: "menton-lemons-producers-orchards-tastings",
  title: t("Beyond the Lemon Festival: meet Menton's lemon growers, orchards and local flavours", "Au-delà de la Fête du Citron : producteurs, vergers et saveurs de Menton", "Oltre la Festa del Limone: produttori, agrumeti e sapori di Mentone", "Поза Святом лимона: виробники, цитрусові сади та смаки Ментона"),
  seoTitle: t("Menton Lemons: Visit Growers, Orchards & Taste Local Products", "Citrons de Menton : producteurs, vergers et dégustations", "Limoni di Mentone: produttori, agrumeti e degustazioni", "Лимони Ментона: виробники, сади та дегустації"),
  seoDescription: t("Discover Citron de Menton beyond the Lemon Festival: orchard tours, local growers, artisan tastings, IGP provenance and practical booking advice.", "Découvrez le Citron de Menton au-delà de la fête : vergers, producteurs, dégustations artisanales, origine IGP et conseils de réservation.", "Scopri il Citron de Menton oltre la festa: agrumeti, produttori, assaggi artigianali, origine IGP e consigli per prenotare.", "Відкрийте лимони Ментона поза фестивалем: сади, виробники, ремісничі дегустації, походження IGP та практичні поради з бронювання."),
  excerpt: t("Meet citrus growers on the hills, visit an artisan jam workshop or follow a tasting walk through the old town. Distinguish a real orchard visit from a shop and the festival.", "Rencontrez les agrumiculteurs, visitez une confiturerie ou suivez une balade gourmande. Distinguez verger, boutique et Fête du Citron.", "Incontra agrumicoltori, visita un laboratorio di confetture o passeggia tra assaggi in centro. Distingui agrumeto, negozio e festa.", "Зустріньтеся з виробниками на схилах, завітайте до майстерні джемів або пройдіть дегустаційним маршрутом. Розрізняйте сад, крамницю й фестиваль."),
  category: "food-markets", duration: "half-day", publishedOn: "2026-10-31", sourceStatus: "editorial",
  coverImage: "/images/guide/menton-lemons-producers-orchards-tastings.png",
  coverImageAlt: t("Illustration of Menton citrus terraces, fresh lemons, preserves and a lemon tart above the sea", "Illustration des terrasses d'agrumes de Menton, citrons, confitures et tarte au-dessus de la mer", "Illustrazione di terrazze di agrumi a Mentone, limoni, conserve e torta sul mare", "Ілюстрація цитрусових терас Ментона, лимонів, джему й лимонного тарта над морем"),
  visualTheme: "food", visualStatus: "project_illustration",
  tags: [t("Menton lemons", "Citrons de Menton", "Limoni di Mentone", "Лимони Ментона"), t("Growers and orchards", "Producteurs et vergers", "Produttori e agrumeti", "Виробники й сади"), t("Local tastings", "Dégustations locales", "Degustazioni locali", "Місцеві дегустації")],
  bestFor: [t("Food lovers", "Gourmands", "Appassionati di gastronomia", "Любителі гастрономії"), t("Couples and slow travellers", "Couples et voyageurs curieux", "Coppie e viaggiatori lenti", "Пари й прихильники неквапливих подорожей"), t("Garden enthusiasts", "Amateurs de jardins", "Appassionati di giardini", "Любителі садів")],
  locationTags: ["menton-centre", "old-town"],
  relatedArticles: ["local-food-menton", "best-souvenir-shops-menton-monaco-nice", "fete-du-citron-menton-practical-guide", "menton-in-winter", "best-pastries-desserts-cakes-menton", "menton-without-a-car", "where-to-stay-in-menton"],
  relatedEvents: ["menton-lemon-festival"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  showTransportHelper: false,
  practicalTips: [t("Book working-farm visits and check the entrance, terrain, tour language and current programme directly. Price bands are not minimum-age rules.", "Réservez les fermes et confirmez entrée, terrain, langue et programme actuel. Un tarif enfant n'est pas un âge minimum.", "Prenota le aziende agricole e verifica ingresso, terreno, lingua e programma. Le fasce tariffarie non sono età minime.", "Бронюйте господарства й уточнюйте вхід, рельєф, мову та поточну програму. Дитячі тарифи не є мінімальним віком.")],
  sections,
};

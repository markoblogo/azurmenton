import type { GuideArticle, LocalizedText } from "./guide";
import { markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/naturist-nudist-beaches-near-menton.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("Choose the right place, not just a quiet beach", "Choisir le bon lieu, pas seulement une plage calme", "Scegli il luogo giusto, non solo una spiaggia tranquilla", "Оберіть правильне місце, а не просто тихий пляж"));
sections.forEach((section, index) => {
  const body = (locale: keyof typeof records[number]) => records[index][locale].split("\n").slice(1).map(line => line.trim()).filter(line => line && !line.startsWith("|")).map(line => line.replace(/^###\s+(.+)$/, "**$1**").replace(/^[-*]\s+/, "")).join("\n");
  section.body = [t(body("en"), body("fr"), body("it"), body("uk"))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
sections[3].relatedPlaceIds = ["pissarelles-beach-cap-dail"];
sections[4].relatedPlaceIds = ["balzi-rossi-area-ventimiglia"];
sections[5].relatedPlaceIds = ["plage-sablettes", "plage-casino", "plage-fossan", "rondelli-garavan-side"];
sections[5].guideLinkSlug = "best-beaches-in-menton";
sections[5].guideLinkLabel = t("Choose a conventional beach in Menton", "Choisir une plage classique à Menton", "Scegli una spiaggia classica a Mentone", "Оберіть звичайний пляж Ментона");
sections[12].guideLinkSlug = "public-transport-in-menton";
sections[12].guideLinkLabel = t("Plan your transport and return", "Préparer le trajet et le retour", "Organizza trasporti e rientro", "Сплануйте дорогу й повернення");

export const naturistBeachesGuide: GuideArticle = {
  id: "naturist-nudist-beaches-near-menton", slug: "naturist-nudist-beaches-near-menton",
  title: t("Naturist beaches near Menton: where you can sunbathe nude and what to know", "Plages naturistes près de Menton : où se baigner nu et ce qu'il faut savoir", "Spiagge naturiste vicino a Mentone: dove prendere il sole nudi e cosa sapere", "Натуристські пляжі поблизу Ментона: де засмагати без одягу та що варто знати"),
  seoTitle: t("Naturist Beaches Near Menton: Nudist Beaches, Rules & Access", "Plages naturistes près de Menton : règles et accès", "Spiagge naturiste vicino a Mentone: regole e accessi", "Натуристські пляжі біля Ментона: правила й доступ"),
  seoDescription: t("Compare Les Pissarelles and Balzi Rossi near Menton: tolerated versus authorised naturism, difficult access, etiquette and sea safety.", "Les Pissarelles et Balzi Rossi depuis Menton : naturisme toléré ou autorisé, accès difficiles, respect des autres et sécurité en mer.", "Les Pissarelles e Balzi Rossi da Mentone: naturismo tollerato o autorizzato, accessi difficili, galateo e sicurezza in mare.", "Les Pissarelles і Balzi Rossi з Ментона: толерований та дозволений натуризм, складні підходи, етикет і безпека на морі."),
  excerpt: t("A practical guide to Les Pissarelles and the Italian border coves: what tolerated naturism means, where not to assume permission, and how to plan a wild-beach day.", "Les Pissarelles et les criques italiennes : comprendre la tolérance, vérifier les règles et préparer une journée sur une plage sauvage.", "Les Pissarelles e le calette italiane: capire la tolleranza, verificare le regole e preparare una giornata su una spiaggia selvaggia.", "Les Pissarelles та італійські бухти: що означає терпиме ставлення, як перевірити правила й підготувати день на дикому пляжі."),
  category: "beaches", duration: "half-day", publishedOn: "2026-10-30", sourceStatus: "editorial",
  coverImage: "/images/guide/naturist-nudist-beaches-near-menton.png",
  coverImageAlt: t("Illustration of a secluded rocky Mediterranean cove near Menton", "Illustration d'une crique rocheuse méditerranéenne près de Menton", "Illustrazione di una caletta rocciosa mediterranea vicino a Mentone", "Ілюстрація затишної скелястої середземноморської бухти поблизу Ментона"),
  visualTheme: "beach", visualStatus: "project_illustration",
  tags: [t("Naturism", "Naturisme", "Naturismo", "Натуризм"), t("Wild beaches", "Plages sauvages", "Spiagge selvagge", "Дикі пляжі"), t("Rules and access", "Règles et accès", "Regole e accessi", "Правила й доступ")],
  bestFor: [t("Naturist travellers", "Voyageurs naturistes", "Viaggiatori naturisti", "Натуристи-мандрівники"), t("Experienced beachgoers", "Habitués des plages sauvages", "Visitatori esperti delle spiagge", "Досвідчені відвідувачі пляжів")],
  locationTags: ["seafront"],
  relatedArticles: ["lgbtq-menton-nice-monaco-french-riviera", "best-beaches-in-menton", "water-sports-in-menton-paddleboard-kayak-sailing-and-snorkelling", "public-transport-in-menton", "italian-riviera-day-trip-from-menton", "where-to-stay-in-menton"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  showTransportHelper: false, sections,
};

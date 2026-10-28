import type { GuideArticle, LocalizedText } from "./guide";
import { markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/lgbtq-menton-nice-monaco-french-riviera.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("A quiet base, a wider Riviera", "Une base tranquille, toute la Riviera", "Una base tranquilla, tutta la Riviera", "Спокійна база й уся Рив'єра поруч"));
sections.forEach((section, index) => {
  const lines = (locale: keyof typeof records[number]) => records[index][locale].split("\n").slice(1).map(line => line.trim()).filter(line => line && !line.startsWith("|")).map(line => line.replace(/^###\s+(.+)$/, "**$1**").replace(/^[-*]\s+/, ""));
  section.body = [t(lines("en").join("\n"), lines("fr").join("\n"), lines("it").join("\n"), lines("uk").join("\n"))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
sections[2].relatedPlaceIds = ["plage-sablettes", "promenade-du-soleil", "halles-du-marche"];
sections[4].relatedPlaceIds = ["ramdam-bar-nice", "le-swing-nice", "coco-bar-nice", "rainbow-bar-nice", "le-couloir-nice"];
sections[5].relatedPlaceIds = ["le-glam-nice", "omega-club-nice", "le-six-nice", "le-klubber-nice"];
sections[8].relatedPlaceIds = ["coco-beach-nice", "castel-public-beach-nice", "saint-laurent-eze-coastal-area", "pissarelles-beach-cap-dail"];
sections[10].relatedPlaceIds = ["centre-lgbtqia-cote-azur-nice"];
sections[6].guideLinkSlug = "monaco-events-from-menton";
sections[6].guideLinkLabel = t("Planning event trips from Menton", "Préparer ses sorties depuis Menton", "Organizza le uscite da Mentone", "Сплануйте поїздки на події з Ментона");
sections[8].guideLinkSlug = "best-beaches-in-menton";
sections[8].guideLinkLabel = t("Choose a beach in Menton", "Choisir une plage à Menton", "Scegli una spiaggia a Mentone", "Оберіть пляж у Ментоні");
sections[13].guideLinkSlug = "public-transport-in-menton";
sections[13].guideLinkLabel = t("Plan your return journey", "Préparer le retour", "Organizza il rientro", "Сплануйте повернення");

export const lgbtqRivieraGuide: GuideArticle = {
  id: "lgbtq-menton-nice-monaco-french-riviera", slug: "lgbtq-menton-nice-monaco-french-riviera",
  title: t("LGBTQ+ guide to Menton and the French Riviera: beaches, bars, Pride and local life", "Guide LGBTQ+ de Menton et de la Côte d'Azur : plages, bars, Pride et vie locale", "Guida LGBTQ+ a Mentone e alla Costa Azzurra: spiagge, bar, Pride e vita locale", "ЛГБТК+ гід Ментоном і Французькою Рив'єрою: пляжі, бари, прайди та місцеве життя"),
  seoTitle: t("LGBTQ+ Menton & French Riviera: Gay Beaches, Bars and Events", "Menton et Côte d'Azur LGBTQ+ : bars, plages et Pride", "Mentone e Costa Azzurra LGBTQ+: bar, spiagge e Pride", "ЛГБТК+ Ментон і Рив'єра: пляжі, бари та прайди"),
  seoDescription: t("Explore the LGBTQ+ French Riviera from Menton: Nice's bars and clubs, gay-popular beaches, Pride, queer culture, Monaco and practical night-transport advice.", "Explorez la Côte d'Azur LGBTQ+ depuis Menton : bars et clubs niçois, plages, Pride, culture queer, Monaco et conseils pour rentrer le soir.", "Scopri la Costa Azzurra LGBTQ+ da Mentone: locali di Nizza, spiagge, Pride, cultura queer, Monaco e consigli per i rientri notturni.", "Відкрийте ЛГБТК+ Рив'єру з Ментона: бари й клуби Ніцци, пляжі, прайди, квір-культуру, Монако та нічний транспорт."),
  excerpt: t("Menton for a relaxed seaside stay, Nice for LGBTQ+ nightlife and culture: a practical guide to venues, beaches, events and the journey home.", "Menton pour le calme, Nice pour les sorties et la culture LGBTQ+ : adresses, plages, événements et retour pratique.", "Mentone per il relax, Nizza per vita notturna e cultura LGBTQ+: locali, spiagge, eventi e rientri.", "Ментон для спокійного відпочинку, Ніцца для ЛГБТК+ вечорів і культури: заклади, пляжі, події та повернення."),
  category: "nightlife-drinks", duration: "flexible", publishedOn: "2026-10-28", sourceStatus: "editorial",
  coverImage: "/images/guide/lgbtq-menton-nice-monaco-french-riviera.png",
  coverImageAlt: t("Illustration of a couple and rainbow flag overlooking Menton's seafront", "Illustration d'un couple et d'un drapeau arc-en-ciel face à Menton", "Illustrazione di una coppia e una bandiera arcobaleno sul mare di Mentone", "Ілюстрація пари та райдужного прапора на тлі набережної Ментона"),
  visualTheme: "itinerary", visualStatus: "project_illustration",
  tags: [t("LGBTQ+", "LGBTQ+", "LGBTQ+", "ЛГБТК+"), t("Nice nightlife", "Sorties à Nice", "Locali di Nizza", "Нічне життя Ніцци"), t("Queer culture", "Culture queer", "Cultura queer", "Квір-культура")],
  bestFor: [t("Couples and solo travellers", "Couples et voyageurs seuls", "Coppie e viaggiatori soli", "Пари та самостійні мандрівники"), t("Friends and cultural travellers", "Amis et amateurs de culture", "Amici e appassionati di cultura", "Друзі та поціновувачі культури")],
  locationTags: ["menton-centre", "seafront"],
  relatedArticles: ["nightlife-in-menton", "best-beaches-in-menton", "public-transport-in-menton", "menton-without-a-car", "day-trips-from-menton", "monaco-events-from-menton", "where-to-stay-in-menton"],
  relatedEvents: ["nice-carnival"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  showTransportHelper: true, sections,
};

import type { GuideArticle, LocalizedText } from "./guide";
import { markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/creative-workshops-menton-french-riviera.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("Make a personal Riviera souvenir", "Créer un souvenir personnel de la Riviera", "Creare un ricordo personale della Riviera", "Створіть особистий сувенір із Рив'єри"));
sections.forEach((section, index) => {
  const body = (locale: keyof typeof records[number]) => records[index][locale].split("\n").slice(1).map(line => line.trim()).filter(line => line && !line.startsWith("|")).map(line => line.replace(/^###\s+(.+)$/, "**$1**").replace(/^[-*]\s+/, "")).join("\n");
  section.body = [t(body("en"), body("fr"), body("it"), body("uk"))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
sections[2].relatedPlaceIds = ["kairos-lab-menton"];
sections[3].relatedPlaceIds = ["pasta-piemonte-menton"];
sections[4].relatedPlaceIds = ["said-berkane-atelier-menton"];
sections[5].relatedPlaceIds = ["atelier-cuisine-nicoise-nice"];
sections[6].relatedPlaceIds = ["cuisine-sur-cours-nice"];
sections[7].relatedPlaceIds = ["les-petits-farcis-nice"];
sections[8].relatedPlaceIds = ["fragonard-perfume-workshop-eze", "fragonard-fabrique-des-fleurs-grasse"];
sections[9].relatedPlaceIds = ["galimard-studio-des-fragrances-grasse"];
sections[10].relatedPlaceIds = ["molinard-atelier-parfums-grasse"];
sections[12].guideLinkSlug = "menton-with-kids-family-guide";
sections[12].guideLinkLabel = t("More family activities", "Autres activités en famille", "Altre attività per famiglie", "Більше сімейних занять");
sections[13].guideLinkSlug = "menton-without-a-car";
sections[13].guideLinkLabel = t("Plan a car-free stay", "Préparer un séjour sans voiture", "Organizza un soggiorno senza auto", "Сплануйте відпочинок без авто");

export const creativeWorkshopsGuide: GuideArticle = {
  id: "creative-workshops-menton-french-riviera", slug: "creative-workshops-menton-french-riviera",
  title: t("Creative workshops in Menton and nearby: make something to take home", "Ateliers créatifs à Menton et aux alentours : un souvenir fait main", "Laboratori creativi a Mentone e dintorni: qualcosa da portare a casa", "Творчі майстер-класи в Ментоні та поруч: створіть власний сувенір"),
  seoTitle: t("Creative Workshops in Menton: Pottery, Cooking & Perfume", "Ateliers à Menton : poterie, cuisine et parfum sur la Riviera", "Laboratori a Mentone: ceramica, cucina e profumi sulla Riviera", "Майстер-класи в Ментоні: кераміка, кулінарія та парфуми"),
  seoDescription: t("Book creative workshops in Menton, Nice, Èze and Grasse: pottery, ravioli, painting, cooking and perfume, with languages, ages and practical collection advice.", "Poterie, raviolis, peinture, cuisine et parfum à Menton, Nice, Èze et Grasse : langues, âges, réservations et conseils pour emporter vos créations.", "Ceramica, ravioli, pittura, cucina e profumi a Mentone, Nizza, Èze e Grasse: lingue, età, prenotazioni e ritiro delle creazioni.", "Кераміка, равіолі, живопис, кулінарія й парфуми в Ментоні, Ніцці, Езі та Грассі: мови, вік, запис і отримання готових виробів."),
  excerpt: t("Make pottery in Menton, learn fresh ravioli or create a personal fragrance. Compare nine workshop programmes, child-age rules, languages and what you can actually take home.", "Façonnez une poterie, préparez des raviolis ou créez un parfum. Comparez neuf programmes, les âges, les langues et les conditions pour emporter votre création.", "Modella la ceramica, prepara ravioli o crea un profumo. Confronta nove programmi, età, lingue e condizioni per portare a casa la tua creazione.", "Зліпіть кераміку, приготуйте равіолі або створіть аромат. Порівняйте дев'ять програм, вікові умови, мови й можливість забрати результат."),
  category: "day-trips", duration: "flexible", publishedOn: "2026-10-31", sourceStatus: "editorial",
  coverImage: "/images/guide/creative-workshops-menton-french-riviera.png",
  coverImageAlt: t("Illustration of pottery tools, fresh ravioli and lemons on a terrace above Menton", "Illustration d'outils de poterie, raviolis et citrons sur une terrasse au-dessus de Menton", "Illustrazione di strumenti ceramici, ravioli e limoni su una terrazza sopra Mentone", "Ілюстрація гончарних інструментів, равіолі й лимонів на терасі над Ментоном"),
  visualTheme: "food", visualStatus: "project_illustration",
  tags: [t("Creative workshops", "Ateliers créatifs", "Laboratori creativi", "Творчі заняття"), t("Pottery and painting", "Poterie et peinture", "Ceramica e pittura", "Кераміка й живопис"), t("Cooking and perfume", "Cuisine et parfum", "Cucina e profumi", "Кулінарія й парфуми")],
  bestFor: [t("Couples", "Couples", "Coppie", "Пари"), t("Families choosing age-appropriate classes", "Familles choisissant un atelier adapté", "Famiglie con corsi adatti all'età", "Родини із заняттями відповідного віку"), t("Rainy days and longer stays", "Jours de pluie et longs séjours", "Pioggia e soggiorni lunghi", "Дощові дні й тривалі візити")],
  locationTags: ["menton-centre", "old-town", "nice"],
  relatedPlaces: sections.flatMap(section => section.relatedPlaceIds ?? []),
  relatedArticles: ["menton-with-kids-family-guide", "best-souvenir-shops-menton-monaco-nice", "menton-lemons-producers-orchards-tastings", "menton-in-winter", "day-trips-from-menton", "menton-without-a-car", "local-food-menton", "useful-apps-websites-menton-monaco-italian-riviera"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  showTransportHelper: true,
  practicalTips: [t("Reserve the exact date, language and age-appropriate format. Agree pottery collection before paying; shipping and food takeaway are not automatically included.", "Réservez date, langue et format adapté à l'âge. Confirmez le retrait des poteries ; livraison et portions à emporter ne sont pas automatiquement incluses.", "Prenota data, lingua e formato adatto all'età. Concorda il ritiro delle ceramiche: spedizione e cibo da asporto non sono automaticamente inclusi.", "Бронюйте точну дату, мову й відповідний віку формат. Погодьте отримання кераміки: доставка й їжа із собою не включені автоматично.")],
  sections,
};

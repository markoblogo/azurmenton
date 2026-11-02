import type { GuideArticle, LocalizedText } from "./guide";
import { formattedMarkdownGuideBody, markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/menton-with-a-dog.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("A Riviera stay with your dog", "Un séjour sur la Riviera avec votre chien", "Un soggiorno in Riviera con il cane", "Відпочинок на Рив'єрі із собакою"));
sections.forEach((section, index) => {
  const body = (locale: keyof typeof records[number]) => formattedMarkdownGuideBody(records[index][locale]);
  section.body = [t(body("en"), body("fr"), body("it"), body("uk"))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
sections[2].relatedPlaceIds = ["promenade-du-soleil", "promenade-reine-astrid"];
sections[3].relatedPlaceIds = ["plage-du-gorbio-menton", "plage-casino", "plage-hawai-menton"];
sections[4].relatedPlaceIds = ["dog-park-garavan-menton", "dog-park-serres-madone-menton", "dog-park-pian-menton"];
sections[2].guideLinkSlug = "menton-accessible-step-free-walks";
sections[2].guideLinkLabel = t("Plan lower-town walks without stairs", "Préparer des promenades sans escaliers", "Pianifica passeggiate senza scale", "Сплануйте прогулянки без сходів");
sections[8].guideLinkSlug = "public-transport-in-menton";
sections[8].guideLinkLabel = t("Plan the coastal transport connection", "Préparer les trajets sur le littoral", "Organizza i collegamenti costieri", "Сплануйте прибережний транспорт");

export const dogGuide: GuideArticle = {
  id: "menton-with-a-dog", slug: "menton-with-a-dog",
  title: t("Menton with a Dog: Walks, Beaches, Transport and Practical Tips", "Menton avec un chien : promenades, plages, transports et conseils", "Mentone con un cane: passeggiate, spiagge, trasporti e consigli", "Ментон із собакою: прогулянки, пляжі, транспорт і поради"),
  seoTitle: t("Menton with a Dog: Beaches, Walks and Travel Rules", "Menton avec un chien : plages, promenades et transports", "Mentone con un cane: spiagge, passeggiate e regole", "Ментон із собакою: пляжі, прогулянки й правила подорожі"),
  seoDescription: t("Plan Menton with your dog: three designated beach areas, enclosed dog parks, TER and bus conditions, veterinary contacts and France–Monaco–Italy travel documents.", "Préparez Menton avec votre chien : trois secteurs de plage, parcs canins clos, conditions TER et bus, vétérinaires et documents France–Monaco–Italie.", "Organizza Mentone con il cane: tre settori di spiaggia, aree recintate, condizioni TER e bus, veterinari e documenti per Francia, Monaco e Italia.", "Ментон із собакою: три пляжні ділянки, огороджені майданчики, умови TER та автобусів, ветеринари й документи для Франції, Монако та Італії."),
  excerpt: t("Seafront walks, the right beach areas and a comfortable daily routine, with checked transport conditions and local veterinary contacts. Confirm permission for your specific accommodation before booking.", "Promenades, secteurs de plage adaptés et routine confortable, avec transports vérifiés et contacts vétérinaires. Confirmez l'accord de votre logement avant réservation.", "Passeggiate, settori di spiaggia adatti e routine comoda, con trasporti verificati e contatti veterinari. Conferma il permesso dell'alloggio prima di prenotare.", "Прогулянки, правильні пляжні зони й зручний режим, перевірені умови транспорту та контакти ветеринарів. До бронювання отримайте згоду конкретного житла."),
  category: "practical", duration: "reference", publishedOn: "2026-11-02", sourceStatus: "editorial",
  coverImage: "/images/guide/menton-with-a-dog.png",
  coverImageAlt: t("Project illustration of a woman walking a dog on an imagined Menton seafront; not evidence of access permission or a verified route", "Illustration d'une promenade avec un chien sur un littoral imaginé de Menton ; pas une preuve d'autorisation ou un itinéraire vérifié", "Illustrazione di una passeggiata con un cane su un lungomare immaginato di Mentone; non prova di accesso o percorso verificato", "Ілюстрація прогулянки із собакою на уявній набережній Ментона; не доказ дозволу чи перевіреного маршруту"),
  visualTheme: "walk", visualStatus: "project_illustration", locationTags: ["menton"],
  tags: [t("With a dog", "Avec un chien", "Con un cane", "Із собакою"), t("Practical stay", "Séjour pratique", "Soggiorno pratico", "Практичне проживання")],
  bestFor: [t("Dog owners", "Voyageurs avec un chien", "Viaggiatori con un cane", "Власники собак"), t("Longer stays with confirmed pet permission", "Longs séjours avec accord pour l'animal", "Soggiorni lunghi con animali autorizzati", "Тривалі перебування з дозволом на тварину")],
  relatedPlaces: [...new Set(sections.flatMap(section => section.relatedPlaceIds ?? []))],
  relatedArticles: ["best-beaches-in-menton", "menton-without-a-car", "public-transport-in-menton", "menton-accessible-step-free-walks", "useful-apps-websites-menton-monaco-italian-riviera"],
  relatedApartments: [],
  showTransportHelper: true, transportHelperAfterSectionIndex: 9,
  practicalTips: [t("Checked 2 November 2026. Only signed dog beach sectors are permitted. Pian is for dogs under 10 kg; published 2023 hours are not a current gate check. Confirm Zest rules, cross-border fares and your accommodation's pet permission. Call veterinary practices before travelling; no 24-hour opening or medical treatment is guaranteed here.", "Vérifié le 2 novembre 2026. Seuls les secteurs de plage signalés sont autorisés. Pian : chiens de moins de 10 kg ; horaires 2023 non inspectés aujourd'hui. Confirmez Zest, tarifs transfrontaliers et accord du logement. Appelez le vétérinaire avant déplacement ; aucune ouverture 24 h/24 garantie.", "Verificato il 2 novembre 2026. Solo settori di spiaggia segnalati. Pian per cani sotto 10 kg; orari 2023 non verificati ai cancelli. Conferma Zest, tariffe internazionali e permesso dell'alloggio. Telefona al veterinario prima di partire; nessuna apertura 24 ore garantita.", "Перевірено 2 листопада 2026. Лише позначені собачі пляжні ділянки. Pian для ваги менш як 10 кг; години 2023 року не є поточною перевіркою. Уточнюйте Zest, міжнародні тарифи й дозвіл житла. Телефонуйте ветеринару до виїзду; цілодобову роботу не гарантовано.")],
  sections,
};

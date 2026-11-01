import type { GuideArticle, LocalizedText } from "./guide";
import { markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/romain-gary-nice-promise-at-dawn-literary-walk.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("A literary day in Nice", "Une journée littéraire à Nice", "Una giornata letteraria a Nizza", "Літературний день у Ніцці"));
sections.forEach((section, index) => {
  const body = (locale: keyof typeof records[number]) => records[index][locale].split("\n").slice(1)
    .map(line => line.trim()).filter(line => line && !line.startsWith("|"))
    .map(line => line.replace(/^###\s+(.+)$/, "**$1**").replace(/^[-*]\s+/, "")
      .replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, "_$1_")).join("\n");
  section.body = [t(body("en"), body("fr"), body("it"), body("uk"))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
sections[5].relatedPlaceIds = ["rue-shakespeare-nice"];
sections[6].relatedPlaceIds = ["hotel-pension-mermonts-nice"];
sections[7].relatedPlaceIds = ["buffa-dante-neighbourhood-nice"];
sections[8].relatedPlaceIds = ["hotel-negresco-nice"];
sections[9].relatedPlaceIds = ["lycee-massena-nice"];
sections[10].relatedPlaceIds = ["cours-saleya-nice"];
sections[10].guideLinkSlug = "best-markets-near-menton-market-days-in-france-and-italy";
sections[10].guideLinkLabel = t("Check market days before your visit", "Vérifier les jours de marché", "Controlla i giorni di mercato", "Перевірте ринкові дні до поїздки");
sections[11].relatedPlaceIds = ["promenade-des-anglais-nice"];
sections[13].guideLinkSlug = "menton-without-a-car";
sections[13].guideLinkLabel = t("Plan a car-free stay in Menton", "Préparer un séjour sans voiture", "Organizza un soggiorno senza auto", "Сплануйте відпочинок у Ментоні без авто");
sections[14].relatedPlaceIds = ["roquebrune-medieval-village"];
sections[18].guideLinkSlug = "bookshops-libraries-menton";
sections[18].guideLinkLabel = t("Find bookshops and reading spots", "Trouver des librairies et lieux de lecture", "Trova librerie e luoghi per leggere", "Знайдіть книгарні та місця для читання");

export const romainGaryGuide: GuideArticle = {
  id: "romain-gary-nice-promise-at-dawn-literary-walk", slug: "romain-gary-nice-promise-at-dawn-literary-walk",
  title: t("Romain Gary's Nice: Reading Promise at Dawn Before Your Visit", "Le Nice de Romain Gary : lire La Promesse de l'aube avant la visite", "La Nizza di Romain Gary: leggere La promessa dell'alba prima della visita", "Ніцца Ромена Гарі: прочитати «Обіцянку на світанку» перед подорожжю"),
  seoTitle: t("Romain Gary in Nice: Promise at Dawn Literary Walking Guide", "Romain Gary à Nice : promenade autour de La Promesse de l'aube", "Romain Gary a Nizza: itinerario di La promessa dell'alba", "Ромен Гарі в Ніцці: літературна прогулянка «Обіцянкою на світанку»"),
  seoDescription: t("Explore the real Nice behind Romain Gary's Promise at Dawn: Mermonts, Lycée Masséna, Negresco and Cours Saleya. A literary day trip from Menton.", "Découvrez le Nice de Romain Gary : Mermonts, lycée Masséna, Negresco et cours Saleya. Une excursion littéraire depuis Menton, avec conseils d'accès.", "Scopri la Nizza di Romain Gary: Mermonts, Lycée Masséna, Negresco e Cours Saleya. Gita letteraria da Mentone con indicazioni per la visita.", "Відкрийте Ніццу Ромена Гарі: Mermonts, Lycée Masséna, Negresco та Cours Saleya. Літературна поїздка з Ментона з порадами щодо доступу."),
  excerpt: t("A mother and son, a former pension and a new life in France. Read Promise at Dawn, then explore Gary's real Nice without confusing biography, fiction and filming locations.", "Une mère, son fils, une pension et une nouvelle vie en France : lire La Promesse de l'aube puis explorer Nice en distinguant biographie, fiction et cinéma.", "Una madre, un figlio, una pensione e una nuova vita in Francia: leggere La promessa dell'alba, poi esplorare Nizza distinguendo biografia, finzione e cinema.", "Мати й син, колишній пансіон і нове життя у Франції. Прочитайте «Обіцянку на світанку» й відкрийте Ніццу Гарі, розрізняючи біографію, вигадку та кінолокації."),
  category: "day-trips", duration: "full-day", publishedOn: "2026-11-02", sourceStatus: "editorial",
  coverImage: "/images/guide/romain-gary-nice-promise-at-dawn-literary-walk.png",
  coverImageAlt: t("Project illustration of Promise at Dawn on a Riviera café table, not a historical photograph or an exact location record", "Illustration de La Promesse de l'aube sur une table de café de la Riviera, ni photographie historique ni relevé d'un lieu exact", "Illustrazione di La promessa dell'alba su un tavolo di caffè della Riviera, non una foto storica né una documentazione di un luogo preciso", "Ілюстрація «Обіцянки на світанку» на столику кафе Рив'єри, не історична фотографія чи точне зображення локації"),
  visualTheme: "itinerary", visualStatus: "project_illustration", locationTags: ["nice", "roquebrune-cap-martin"],
  tags: [t("Romain Gary", "Romain Gary", "Romain Gary", "Ромен Гарі"), t("Literary places", "Lieux littéraires", "Luoghi letterari", "Літературні місця"), t("Nice by train", "Nice en train", "Nizza in treno", "До Ніцци потягом")],
  bestFor: [t("Readers and literary travellers", "Lecteurs et voyageurs littéraires", "Lettori e viaggiatori letterari", "Читачі й літературні мандрівники"), t("History and car-free cultural days", "Histoire et journées culturelles sans voiture", "Storia e giornate culturali senza auto", "Історія та культурні поїздки без авто")],
  relatedPlaces: [...new Set(sections.flatMap(section => section.relatedPlaceIds ?? []))],
  relatedArticles: ["janet-frame-menton-in-the-memorial-room", "the-houses-that-remember-riviera-book-route", "a-week-in-menton-book-walking-route", "jean-cocteau-menton-walking-route", "bookshops-libraries-menton", "day-trips-from-menton", "menton-without-a-car", "best-markets-near-menton-market-days-in-france-and-italy"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  showTransportHelper: true, transportHelperAfterSectionIndex: 13,
  practicalTips: [t("Allow 3–4 hours in Nice or a full day from Menton with lunch and travel. The two shorter walks are editorial estimates, not measured or accessibility-certified routes. Mermonts and the lycée are exterior-only stops; hotel interiors require permission. Confirm TER return times and current market days.", "Prévoyez 3–4 heures à Nice ou une journée depuis Menton avec repas et transport. Les deux promenades sont estimatives, sans parcours mesuré ni certification d'accessibilité. Mermonts et le lycée se voient de l'extérieur ; l'hôtel exige une autorisation. Vérifiez retour TER et jours de marché.", "Prevedi 3–4 ore a Nizza o una giornata da Mentone con pranzo e viaggio. Le due passeggiate sono stime editoriali, non percorsi misurati o certificati accessibili. Mermonts e liceo: solo esterni; per gli interni dell'hotel serve permesso. Verifica ritorno TER e giorni di mercato.", "Передбачте 3–4 години в Ніцці або цілий день із Ментона з обідом і дорогою. Дві прогулянки — редакційні оцінки, не виміряні чи сертифіковані доступні маршрути. Mermonts і ліцей оглядають зовні; готельні інтер'єри потребують дозволу. Перевірте зворотний TER і ринкові дні.")],
  sections,
};

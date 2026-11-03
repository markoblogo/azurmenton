import type { GuideArticle, LocalizedText } from "./guide";
import { formattedMarkdownGuideBody, markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/bonjour-tristesse-francoise-sagan-french-riviera.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("Sunshine and unease on the Riviera", "Soleil et malaise sur la Riviera", "Sole e inquietudine sulla Riviera", "Сонце й неспокій Рив'єри"));
sections.forEach((section, index) => {
  const body = (locale: keyof typeof records[number]) => formattedMarkdownGuideBody(records[index][locale]);
  section.body = [t(body("en"), body("fr"), body("it"), body("uk"))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
sections[8].relatedPlaceIds = ["promenade-du-soleil", "plage-casino", "royal-westminster-menton", "jardins-bioves"];
sections[8].guideLinkSlug = "belle-epoque-menton-architecture-walk";
sections[8].guideLinkLabel = t("Explore Menton's Belle Époque architecture", "Explorer l'architecture Belle Époque de Menton", "Esplora l'architettura Belle Époque di Mentone", "Відкрийте архітектуру Прекрасної епохи Ментона");
sections[11].guideLinkSlug = "rebecca-monte-carlo-daphne-du-maurier-literary-walk";
sections[11].guideLinkLabel = t("Before Manderley: Rebecca's Monte Carlo", "Avant Manderley : Rebecca à Monte-Carlo", "Prima di Manderley: Rebecca a Monte Carlo", "До Мандерлі: Монте-Карло «Ребекки»");

export const bonjourTristesseGuide: GuideArticle = {
  id: "bonjour-tristesse-francoise-sagan-french-riviera", slug: "bonjour-tristesse-francoise-sagan-french-riviera",
  title: t("Bonjour Tristesse: The French Riviera's Most Uneasy Summer", "Bonjour Tristesse : l'été le plus inquiet de la Riviera", "Bonjour Tristesse: l'estate più inquieta della Riviera", "Bonjour Tristesse: найтривожніше літо Французької Рив'єри"),
  seoTitle: t("Bonjour Tristesse by Françoise Sagan: The Riviera Behind the Novel", "Bonjour Tristesse de Françoise Sagan : la Riviera du roman", "Bonjour Tristesse di Françoise Sagan: la Riviera del romanzo", "Bonjour Tristesse Франсуази Саган: Рив'єра за романом"),
  seoDescription: t("Discover Sagan's 1954 novel, its film adaptations and a thematic Menton walk: beaches, Belle Époque façades and gardens, without inventing the fictional villa's address.", "Découvrez le roman de Sagan, ses adaptations et une promenade thématique à Menton : plages, façades Belle Époque et jardins, sans inventer l'adresse de la villa fictive.", "Scopri il romanzo di Sagan, gli adattamenti e una passeggiata tematica a Mentone: spiagge, facciate Belle Époque e giardini, senza inventare l'indirizzo della villa.", "Роман Саган, екранізації та тематична прогулянка Ментоном: пляжі, фасади Прекрасної епохи й сади без вигаданої адреси вілли."),
  excerpt: t("A beautiful villa, an apparently carefree summer and a deeply uneasy household. Read Françoise Sagan's debut alongside a gentle Menton afternoon, keeping literary atmosphere distinct from real plot or filming locations.", "Une belle villa, un été apparemment insouciant et un foyer inquiet. Lisez le premier Sagan pendant un après-midi à Menton, sans confondre atmosphère, récit et tournage.", "Una bella villa, un'estate apparentemente spensierata e una famiglia inquieta. Leggi l'esordio di Sagan durante un pomeriggio a Mentone, distinguendo atmosfera, trama e set.", "Прекрасна вілла, начебто безтурботне літо й тривожні стосунки. Читайте дебют Саган під час неквапливого дня в Ментоні, не плутаючи атмосферу, сюжет і місця зйомок."),
  category: "walks-views", duration: "half-day", publishedOn: "2026-11-03", sourceStatus: "editorial",
  coverImage: "/images/guide/bonjour-tristesse-francoise-sagan-french-riviera.png",
  coverImageAlt: t("Project illustration of Bonjour Tristesse on an imagined Riviera villa terrace; not a historical photograph, film still or identified fictional house", "Illustration de Bonjour Tristesse sur une terrasse de villa imaginée ; ni photographie historique, ni image de film, ni maison fictive identifiée", "Illustrazione di Bonjour Tristesse su una terrazza immaginaria della Riviera; non foto storica, fotogramma o villa del romanzo identificata", "Ілюстрація Bonjour Tristesse на уявній терасі Рив'єри; не історичне фото, кадр фільму чи встановлений будинок роману"),
  visualTheme: "itinerary", visualStatus: "project_illustration", locationTags: ["menton"],
  tags: [t("Françoise Sagan", "Françoise Sagan", "Françoise Sagan", "Франсуаза Саган"), t("Literary Riviera", "Riviera littéraire", "Riviera letteraria", "Літературна Рив'єра"), t("Thematic walk", "Promenade thématique", "Passeggiata tematica", "Тематична прогулянка")],
  bestFor: [t("Readers and cultural travellers", "Lecteurs et voyageurs culturels", "Lettori e viaggiatori culturali", "Читачі й культурні мандрівники"), t("A slow seafront afternoon", "Un après-midi sans hâte face à la mer", "Un pomeriggio lento sul mare", "Неквапливий день біля моря")],
  relatedPlaces: sections[8].relatedPlaceIds,
  relatedArticles: ["rebecca-monte-carlo-daphne-du-maurier-literary-walk", "tender-is-the-night-fitzgerald-french-riviera", "the-houses-that-remember-riviera-book-route", "bookshops-libraries-menton", "belle-epoque-menton-architecture-walk", "best-beaches-in-menton", "menton-without-a-car"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  practicalTips: [t("Allow around 90 minutes–2 hours with pauses; estimates, not measured timings or a step-free certification. Checked 3 November 2026: bibliography and screen sources support the context, not exact novel addresses. View hotel façades from public space; confirm beach signs, weather and event restrictions in the gardens. Cover is an imagined illustration, not the villa or a film location.", "Comptez environ 90 min–2 h avec pauses : estimations, pas accessibilité certifiée. Vérifié le 3 novembre 2026 : les sources documentent le contexte, pas des adresses du roman. Façades depuis l'espace public ; confirmez météo, panneaux des plages et restrictions des jardins. Couverture imaginaire, pas la villa ni un décor vérifié.", "Prevedi circa 90 min–2 ore con pause: stime, non accessibilità certificata. Verificato il 3 novembre 2026: fonti per il contesto, non indirizzi del romanzo. Guarda le facciate dallo spazio pubblico; verifica meteo, cartelli e limitazioni nei giardini. Copertina immaginaria, non villa o set verificato.", "Плануйте 90 хв–2 години з паузами: оцінки, не виміряний час чи сертифікат доступності. Перевірено 3 листопада 2026: джерела підтверджують контекст, не адреси роману. Фасади — з громадського простору; уточнюйте погоду, пляжні знаки й обмеження садів. Обкладинка уявна, не вілла чи перевірений кінодекор.")],
  sections,
};

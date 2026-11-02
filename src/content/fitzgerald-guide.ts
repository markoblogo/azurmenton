import type { GuideArticle, LocalizedText } from "./guide";
import { formattedMarkdownGuideBody, markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/tender-is-the-night-fitzgerald-french-riviera.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("The beautiful people on the beach had problems of their own", "Les belles personnes de la plage avaient aussi leurs difficultés", "Anche i bei volti sulla spiaggia avevano i loro problemi", "Красиві люди на пляжі теж мали свої проблеми"));
sections.forEach((section, index) => {
  const body = (locale: keyof typeof records[number]) => formattedMarkdownGuideBody(records[index][locale]);
  section.body = [t(body("en"), body("fr"), body("it"), body("uk"))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
sections[4].relatedPlaceIds = ["hotel-belles-rives-juan-les-pins"];
sections[5].relatedPlaceIds = ["juan-les-pins-seafront"];
sections[6].relatedPlaceIds = ["plage-la-garoupe-antibes"];
sections[7].relatedPlaceIds = ["hotel-du-cap-eden-roc-antibes"];
sections[11].relatedPlaceIds = ["sentier-tirepoil-cap-antibes"];
sections[10].guideLinkSlug = "menton-without-a-car";
sections[10].guideLinkLabel = t("Plan travel without a car", "Préparer les trajets sans voiture", "Organizza i viaggi senza auto", "Сплануйте дорогу без автомобіля");
sections[13].guideLinkSlug = "the-houses-that-remember-riviera-book-route";
sections[13].guideLinkLabel = t("Explore the real houses in The Houses That Remember", "Découvrir les vraies maisons de The Houses That Remember", "Scopri le case reali di The Houses That Remember", "Відкрийте справжні будинки The Houses That Remember");

export const fitzgeraldGuide: GuideArticle = {
  id: "tender-is-the-night-fitzgerald-french-riviera", slug: "tender-is-the-night-fitzgerald-french-riviera",
  title: t("Tender Is the Night: Fitzgerald's Riviera Beyond the Glamour", "Tendre est la nuit : la Riviera de Fitzgerald au-delà du glamour", "Tenera è la notte: la Riviera di Fitzgerald oltre il glamour", "«Ніч лагідна»: Рив'єра Фіцджеральда за блиском гламуру"),
  seoTitle: t("Tender Is the Night: Fitzgerald's French Riviera Literary Route", "Tendre est la nuit : itinéraire Fitzgerald sur la Riviera", "Tenera è la notte: itinerario di Fitzgerald sulla Riviera", "«Ніч лагідна»: літературна Рив'єра Фіцджеральда"),
  seoDescription: t("Explore the real Riviera behind Tender Is the Night: Juan-les-Pins, Belles Rives and Cap d'Antibes. Separate private addresses, fictional villas and public coastal walks.", "Explorez Juan-les-Pins, les Belles Rives et le Cap d'Antibes derrière Tendre est la nuit : lieux réels, villas fictives, accès privés et promenades publiques distingués.", "Esplora Juan-les-Pins, Belles Rives e Cap d'Antibes dietro Tenera è la notte: residenze reali, ville immaginarie, accessi privati e passeggiate pubbliche distinti.", "Жуан-ле-Пен, Belles Rives і мис Антіб за романом «Ніч лагідна»: реальні оселі, вигадані вілли, приватні території та публічні прогулянки окремо."),
  excerpt: t("Follow Fitzgerald west from Menton to Juan-les-Pins and Cap d'Antibes: the real Villa Saint-Louis, the Murphys' social world and the fragile glamour behind the Divers.", "Depuis Menton, suivre Fitzgerald vers Juan-les-Pins et le Cap d'Antibes : la vraie Villa Saint-Louis, le cercle des Murphy et le fragile glamour des Diver.", "Da Mentone segui Fitzgerald a Juan-les-Pins e Cap d'Antibes: la vera Villa Saint-Louis, il mondo dei Murphy e il fragile glamour dei Diver.", "Із Ментона на захід до Жуан-ле-Пен і мису Антіб: справжня Villa Saint-Louis, коло Мерфі та крихкий блиск світу Дайверів."),
  category: "day-trips", duration: "full-day", publishedOn: "2026-11-02", sourceStatus: "editorial",
  coverImage: "/images/guide/tender-is-the-night-fitzgerald-french-riviera.png",
  coverImageAlt: t("Project illustration of Tender Is the Night beside an imagined Belles Rives waterfront, not a historical photograph or verified viewpoint", "Illustration de Tendre est la nuit devant un front de mer imaginé des Belles Rives, pas une photo historique ni un point de vue vérifié", "Illustrazione di Tenera è la notte presso un lungomare immaginato del Belles Rives, non foto storica o punto di vista verificato", "Ілюстрація книжки «Ніч лагідна» біля уявного узбережжя Belles Rives, не історичне фото чи перевірений ракурс"),
  visualTheme: "itinerary", visualStatus: "project_illustration", locationTags: ["day-trip"],
  tags: [t("F. Scott Fitzgerald", "F. Scott Fitzgerald", "F. Scott Fitzgerald", "Ф. Скотт Фіцджеральд"), t("Literary Riviera", "Riviera littéraire", "Riviera letteraria", "Літературна Рив'єра"), t("Juan-les-Pins", "Juan-les-Pins", "Juan-les-Pins", "Жуан-ле-Пен")],
  bestFor: [t("Readers and literary travellers", "Lecteurs et voyageurs littéraires", "Lettori e viaggiatori letterari", "Читачі й літературні мандрівники"), t("Jazz Age and Riviera history", "Années folles et histoire de la Riviera", "Età del jazz e storia della Riviera", "Доба джазу й історія Рив'єри")],
  relatedPlaces: [...new Set(sections.flatMap(section => section.relatedPlaceIds ?? []))],
  relatedArticles: ["romain-gary-nice-promise-at-dawn-literary-walk", "janet-frame-menton-in-the-memorial-room", "the-houses-that-remember-riviera-book-route", "bookshops-libraries-menton", "day-trips-from-menton", "menton-without-a-car", "public-transport-in-menton"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  showTransportHelper: true, transportHelperAfterSectionIndex: 10,
  practicalTips: [t("Plan a full day, or a shorter Juan-les-Pins visit. The two coastal areas need a planned local transfer, not a mandatory continuous walk. Checked 2 November 2026: Garoupe works affect road/path access; Cap-Eden-Roc announces seasonal closure until 18 April 2027. Belles Rives facilities require confirmation; private villas are not museums. Tirepoil is weather-dependent and not assumed step-free.", "Prévoyez une journée ou une version courte à Juan-les-Pins. Organisez le transport entre les deux secteurs. Vérifié le 2 novembre 2026 : travaux à La Garoupe ; Cap-Eden-Roc fermé jusqu'au 18 avril 2027. Confirmez l'accès aux Belles Rives ; les villas privées ne sont pas des musées. Tirepoil dépend de la météo et n'est pas présumé sans marches.", "Prevedi una giornata o la versione breve a Juan-les-Pins. Organizza il trasporto fra i settori. Verificato il 2 novembre 2026: lavori alla Garoupe; Cap-Eden-Roc chiuso fino al 18 aprile 2027. Conferma l'accesso al Belles Rives; le ville private non sono musei. Tirepoil dipende dal meteo e non è presunto senza gradini.", "Плануйте день або коротшу версію в Жуан-ле-Пен. Між частинами передбачте транспорт. Перевірено 2 листопада 2026: роботи La Garoupe впливають на доступ, Cap-Eden-Roc закритий до 18 квітня 2027. Уточнюйте Belles Rives; приватні вілли не музеї. Tirepoil залежить від погоди й не вважається безсходинковим.")],
  sections,
};

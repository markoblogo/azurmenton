import type { GuideArticle, LocalizedText } from "./guide";
import { markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/the-houses-that-remember-riviera-book-route.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("Beautiful houses, extraordinary lives", "De belles maisons, des vies extraordinaires", "Case bellissime, vite straordinarie", "Прекрасні будинки, незвичайні життя"));
sections.forEach((section, index) => {
  const body = (locale: keyof typeof records[number]) => records[index][locale].split("\n").slice(1)
    .map(line => line.trim()).filter(line => line && !line.startsWith("|")).map(line => line.replace(/^###\s+(.+)$/, "**$1**").replace(/^[-*]\s+/, "")).join("\n");
  section.body = [t(body("en"), body("fr"), body("it"), body("uk"))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
sections[0].image = "/images/guide/the-houses-that-remember-book-cover.png";
sections[0].imageLayout = "portrait";
sections[0].imageAlt = t("Cover of The Houses That Remember by Anton Biletskyi-Volokh", "Couverture de The Houses That Remember, d'Anton Biletskyi-Volokh", "Copertina di The Houses That Remember di Anton Biletskyi-Volokh", "Обкладинка The Houses That Remember Антона Білецького-Волоха");
sections[3].relatedPlaceIds = ["villa-isola-bella-menton"];
sections[4].relatedPlaceIds = ["jardin-val-rahmeh"];
sections[5].relatedPlaceIds = ["jardin-fontana-rosa-menton"];
sections[6].relatedPlaceIds = ["villa-e-1027-roquebrune-cap-martin"];
sections[7].relatedPlaceIds = ["les-colombieres-menton"];
sections[8].relatedPlaceIds = ["villa-ephrussi-de-rothschild"];
sections[9].relatedPlaceIds = ["villa-kerylos-beaulieu-sur-mer"];
sections[10].relatedPlaceIds = ["le-regina-nice", "musee-matisse-nice"];
sections[11].guideLinkSlug = "public-transport-in-menton";
sections[11].guideLinkLabel = t("Plan trains and local transport", "Préparer les trajets en transport", "Organizza i trasporti locali", "Сплануйте місцевий транспорт");
sections[16].guideLinkSlug = "a-week-in-menton-book-walking-route";
sections[16].guideLinkLabel = t("Walk through A Week in Menton", "La promenade A Week in Menton", "La passeggiata A Week in Menton", "Прогулянка місцями A Week in Menton");

export const housesRememberGuide: GuideArticle = {
  id: "the-houses-that-remember-riviera-book-route", slug: "the-houses-that-remember-riviera-book-route",
  title: t("The Houses That Remember: discover eight remarkable lives on the French Riviera", "The Houses That Remember : huit vies remarquables sur la Côte d'Azur", "The Houses That Remember: otto vite straordinarie sulla Costa Azzurra", "The Houses That Remember: вісім незвичайних життів на Французькій Рив'єрі"),
  seoTitle: t("The Houses That Remember: Eight Historic Riviera Homes to Explore", "The Houses That Remember : huit maisons historiques de la Riviera", "The Houses That Remember: otto dimore storiche della Riviera", "The Houses That Remember: вісім історичних осель Рив'єри"),
  seoDescription: t("Discover the real villas and gardens behind The Houses That Remember by Anton Biletskyi-Volokh. Explore Mansfield, Eileen Gray, Matisse and more, with practical visitor information.", "Découvrez les villas et jardins de The Houses That Remember : Mansfield, Eileen Gray, Matisse, accès publics ou privés et conseils de visite depuis Menton.", "Scopri ville e giardini di The Houses That Remember: Mansfield, Eileen Gray, Matisse, accessi pubblici o privati e visite da Mentone.", "Вілли й сади з The Houses That Remember: Менсфілд, Ейлін Ґрей, Матісс, публічні й приватні місця та практичні поради для поїздок із Ментона."),
  excerpt: t("Eight historic houses, the lives behind them and what you can actually visit. A literary and cultural companion to the new AzurBooks nonfiction book.", "Huit demeures, leurs habitants et ce que l'on peut réellement visiter : le parcours culturel du nouveau récit AzurBooks.", "Otto dimore, le persone che le abitarono e cosa si può davvero visitare: il percorso culturale del nuovo libro AzurBooks.", "Вісім історичних осель, їхні мешканці й реальні умови відвідування: культурний супровід до нової книги AzurBooks."),
  category: "walks-views", duration: "flexible", publishedOn: "2026-10-31", sourceStatus: "editorial",
  coverImage: "/images/guide/the-houses-that-remember-riviera-book-route.png",
  coverImageAlt: t("The Houses That Remember paperback displayed on a Riviera terrace", "Le livre The Houses That Remember sur une terrasse de la Riviera", "Il libro The Houses That Remember su una terrazza della Riviera", "Книга The Houses That Remember на терасі Рив'єри"),
  visualTheme: "itinerary", visualStatus: "project_illustration",
  tags: [t("AzurBooks", "AzurBooks", "AzurBooks", "AzurBooks"), t("Historic villas", "Villas historiques", "Ville storiche", "Історичні вілли"), t("Literary routes", "Parcours littéraires", "Percorsi letterari", "Літературні маршрути")],
  bestFor: [t("Readers and history lovers", "Lecteurs et amateurs d'histoire", "Lettori e appassionati di storia", "Читачі й шанувальники історії"), t("Architecture and gardens", "Architecture et jardins", "Architettura e giardini", "Архітектура й сади")],
  locationTags: ["garavan", "menton-centre", "nice"],
  relatedArticles: ["a-week-in-menton-book-walking-route", "belle-epoque-menton-architecture-walk", "jean-cocteau-menton-walking-route", "museums-in-menton-nice-monaco", "menton-in-winter", "day-trips-from-menton", "public-transport-in-menton", "menton-without-a-car", "where-to-stay-in-menton"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  showTransportHelper: false,
  practicalTips: [t("Choose one or two confirmed visits per day. Private residences are exterior context only; published 2026 tour dates are not a promise of future opening.", "Choisissez une ou deux visites confirmées par jour. Les résidences privées se regardent depuis l'extérieur ; un programme 2026 ne garantit pas l'ouverture future.", "Scegli una o due visite confermate al giorno. Le residenze private sono solo contesto esterno; le date 2026 non garantiscono aperture future.", "Оберіть одне-два підтверджені відвідування на день. Приватні оселі — лише зовнішній контекст; розклад 2026 року не гарантує майбутнього відкриття.")],
  sections,
};

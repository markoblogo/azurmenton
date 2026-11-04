import type { GuideArticle, LocalizedText } from "./guide";
import { formattedMarkdownGuideBody, markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/rebecca-2020-riviera-filming-locations.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("Monte Carlo assembled on screen", "Monte-Carlo assemblé à l'écran", "Monte-Carlo costruita sullo schermo", "Монте-Карло, створене на екрані"));
sections.forEach((section, index) => {
  const body = (locale: keyof typeof records[number]) => formattedMarkdownGuideBody(records[index][locale]);
  section.body = [t(body("en"), body("fr"), body("it"), body("uk"))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
sections[3].relatedPlaceIds = ["le-regina-nice"];
sections[5].relatedPlaceIds = ["villa-eilenroc-antibes"];
sections[6].relatedPlaceIds = ["jardin-exotique-monaco"];
sections[11].relatedPlaceIds = ["musee-matisse-nice"];
sections[10].guideLinkSlug = "rebecca-monte-carlo-daphne-du-maurier-literary-walk";
sections[10].guideLinkLabel = t("Read the separate guide to the novel", "Lire le guide distinct du roman", "Leggere la guida separata al romanzo", "Окремий гайд за романом");
sections[12].guideLinkSlug = "public-transport-in-menton";
sections[12].guideLinkLabel = t("Plan transport from Menton", "Préparer les transports depuis Menton", "Organizzare i trasporti da Mentone", "Сплануйте транспорт із Ментона");

export const rebeccaFilmGuide: GuideArticle = {
  id: "rebecca-2020-riviera-filming-locations", slug: "rebecca-2020-riviera-filming-locations",
  title: t("Rebecca's Riviera: Where the 2020 Film Created Monte Carlo", "La Riviera de Rebecca : où le film de 2020 a créé Monte-Carlo", "La Riviera di Rebecca: dove il film del 2020 ha creato Monte-Carlo", "Рив'єра «Ребекки»: де фільм 2020 року створив Монте-Карло"),
  seoTitle: t("Rebecca (2020): Nice, Monaco and Villa Eilenroc Film Locations", "Rebecca (2020) : tournage à Nice, Monaco et Villa Eilenroc", "Rebecca (2020): location a Nizza, Monaco e Villa Eilenroc", "«Ребекка» (2020): локації Ніцци, Монако й Villa Eilenroc"),
  seoDescription: t("Explore Le Régina in Nice, Villa Eilenroc and Monaco's Exotic Garden: how Rebecca (2020) assembled Monte Carlo, what is documented and what you can visit from Menton.", "Le Régina à Nice, Villa Eilenroc et le Jardin Exotique : le Monte-Carlo de Rebecca (2020), les preuves de tournage et les visites possibles depuis Menton.", "Le Régina a Nizza, Villa Eilenroc e il Jardin Exotique: la Monte-Carlo di Rebecca (2020), riprese documentate e visite possibili da Mentone.", "Le Régina в Ніцці, Villa Eilenroc та Jardin Exotique: як «Ребекка» (2020) створила Монте-Карло, докази зйомок і можливі поїздки з Ментона."),
  excerpt: t("A Monte Carlo hotel in Nice, an Antibes villa and English interiors. Separate the novel, the screen geography and today's visitor access before choosing your Riviera outing.", "Un hôtel de Monte-Carlo à Nice, une villa d'Antibes et des intérieurs anglais : distinguer roman, géographie du film et accès actuel avant de choisir sa sortie.", "Un albergo di Monte-Carlo a Nizza, una villa di Antibes e interni inglesi: distinguere romanzo, geografia del film e accesso attuale prima della gita.", "Готель Монте-Карло в Ніцці, вілла Антіба й англійські інтер'єри: розрізняємо роман, екранну географію та нинішній доступ перед поїздкою."),
  category: "day-trips", duration: "full-day", publishedOn: "2026-11-04", sourceStatus: "editorial", locationTags: ["nice", "monaco", "antibes"],
  coverImage: "/images/guide/rebecca-2020-riviera-filming-locations.png",
  coverImageAlt: t("Artistic Riviera hotel evocation supplied for the Rebecca guide; not a film still, documentary photograph or verified depiction of Le Régina", "Évocation artistique d'un hôtel de la Riviera ; ni photogramme, ni photographie documentaire, ni représentation vérifiée du Régina", "Evocazione artistica di un albergo della Riviera; non fotogramma, fotografia documentaria o rappresentazione verificata del Régina", "Художній образ готелю Рив'єри; не кадр фільму, документальне фото чи перевірене зображення Le Régina"),
  visualTheme: "itinerary", visualStatus: "project_illustration",
  tags: [t("Film locations", "Lieux de tournage", "Location cinematografiche", "Знімальні локації"), t("Rebecca", "Rebecca", "Rebecca", "Ребекка")],
  bestFor: [t("Film and architecture lovers", "Cinéma et architecture", "Cinema e architettura", "Кіно й архітектура"), t("Selective cultural day trips", "Excursions culturelles choisies", "Gite culturali selettive", "Неквапливі культурні поїздки")],
  relatedPlaces: ["le-regina-nice", "villa-eilenroc-antibes", "jardin-exotique-monaco", "musee-matisse-nice"],
  relatedArticles: ["rebecca-monte-carlo-daphne-du-maurier-literary-walk", "the-houses-that-remember-riviera-book-route", "museums-in-menton-nice-monaco", "day-trips-from-menton", "public-transport-in-menton", "where-to-stay-in-menton"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  practicalTips: [t("Checked 4 November 2026. Documentary research, not a claim of full viewing or a site inspection. Le Régina is private; Eilenroc has limited openings and conflicting winter fee listings. Jardin Exotique closes on 19 November and 25 December; only its upper plateau is wheelchair-accessible. Exact frames and coastal access remain unverified. Choose one outing and check current transport. Supplied images are artistic illustrations.", "Vérifié le 4 novembre 2026. Recherche documentaire, sans visionnage intégral ou visite revendiqués. Régina privé ; ouvertures limitées et tarif hivernal divergent à Eilenroc. Jardin Exotique fermé les 19 novembre et 25 décembre ; seul le plateau supérieur est accessible en fauteuil. Cadrages et accès côtier non vérifiés. Choisissez une sortie, vérifiez les transports. Illustrations artistiques.", "Verificato il 4 novembre 2026. Ricerca documentale, senza dichiarare visione integrale o sopralluogo. Régina privato; aperture limitate e prezzi invernali discordanti a Eilenroc. Jardin Exotique chiuso il 19 novembre e il 25 dicembre; accessibile in carrozzina solo il pianoro superiore. Inquadrature e accesso costiero non verificati. Scegliete una gita e controllate i trasporti. Illustrazioni artistiche.", "Перевірено 4 листопада 2026. Документальне дослідження без заяви про повний перегляд чи відвідування. Le Régina приватний; Eilenroc має обмежені відкриття й суперечливі зимові тарифи. Jardin Exotique закритий 19 листопада й 25 грудня; для крісел колісних доступний лише верхній майданчик. Ракурси й прибережний доступ не перевірені. Оберіть одну поїздку та перевірте транспорт. Зображення художні.")],
  sections,
};

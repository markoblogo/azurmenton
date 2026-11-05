import type { GuideArticle, LocalizedText } from "./guide";
import { formattedMarkdownGuideBody, markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/in-the-name-of-my-daughter-villa-maria-serena-menton.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("A villa on screen", "Une villa à l'écran", "Una villa sullo schermo", "Вілла на екрані"));
sections.forEach((section, index) => {
  const body = (locale: keyof typeof records[number]) => formattedMarkdownGuideBody(records[index][locale]);
  section.body = [t(body("en"), body("fr"), body("it"), body("uk"))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
sections[3].relatedPlaceIds = ["villa-maria-serena"];
sections[7].relatedPlaceIds = ["menton-garavan-station"];
sections[8].relatedPlaceIds = ["promenade-reine-astrid"];
sections[9].relatedPlaceIds = ["promenade-des-anglais-nice"];
sections[7].guideLinkSlug = "best-gardens-menton";
sections[7].guideLinkLabel = t("Compare Menton's gardens", "Comparer les jardins de Menton", "Confronta i giardini di Mentone", "Порівняйте сади Ментона");
sections[8].guideLinkSlug = "public-transport-in-menton";
sections[8].guideLinkLabel = t("Plan transport and return", "Préparer transports et retour", "Organizza trasporti e ritorno", "Сплануйте дорогу й повернення");
sections[15].guideLinkSlug = "films-shot-in-menton";
sections[15].guideLinkLabel = t("More films shot in Menton", "Autres films tournés à Menton", "Altri film girati a Mentone", "Інші фільми, зняті в Ментоні");

export const mariaSerenaFilmGuide: GuideArticle = {
  id: "in-the-name-of-my-daughter-villa-maria-serena-menton", slug: "in-the-name-of-my-daughter-villa-maria-serena-menton",
  title: t("Villa Maria Serena on Screen: In the Name of My Daughter", "Villa Maria Serena à l'écran : L'Homme qu'on aimait trop", "Villa Maria Serena sullo schermo: In the Name of My Daughter", "Villa Maria Serena на екрані: In the Name of My Daughter"),
  seoTitle: t("In the Name of My Daughter: Maria Serena, Menton", "L'Homme qu'on aimait trop : Maria Serena à Menton", "In the Name of My Daughter: Maria Serena a Mentone", "In the Name of My Daughter: Maria Serena в Ментоні"),
  seoDescription: t("Discover the documented garden filming location of André Téchiné's 2014 drama: Villa Maria Serena, Garavan's public waterfront and the limits of current tour access.", "Les jardins de Maria Serena, décor documenté du film de Téchiné : histoire réelle, promenade de Garavan et limites des visites actuellement confirmées.", "I giardini Maria Serena nel film di Téchiné: storia reale, lungomare di Garavan e limiti delle visite attualmente confermate.", "Сади Maria Serena у фільмі Тешіне: справжня історія, набережна Garavan і межі нині підтвердженого доступу."),
  excerpt: t("A real Menton garden and a cinematic identity: separate the confirmed filming location from the Le Roux family's history in Nice, without promising unverified interiors or future tours.", "Un jardin réel et une identité de cinéma : distinguez le tournage mentonnais de l'histoire niçoise des Le Roux, sans promettre intérieurs ni prochaines visites.", "Un giardino reale e un'identità cinematografica: separa il set di Mentone dalla storia nizzarda dei Le Roux, senza promettere interni o nuove visite.", "Справжній сад і кінообраз: відокремте зйомки в Ментоні від історії Ле Ру в Ніцці, без обіцянки інтер'єрів чи майбутніх екскурсій."),
  category: "walks-views", duration: "reference", publishedOn: "2026-11-05", sourceStatus: "editorial",
  coverImage: "/images/guide/in-the-name-of-my-daughter-villa-maria-serena-menton.png",
  coverImageAlt: t("Supplied artistic illustration evoking Maria Serena with a Riviera villa, palms and a period car; not a verified film still or documentary access photograph", "Illustration artistique évoquant Maria Serena, palmiers et voiture ancienne ; ni photogramme vérifié ni photographie documentaire de l'accès", "Illustrazione artistica ispirata a Maria Serena con palme e auto d'epoca; non fotogramma verificato o foto documentaria dell'accesso", "Надана художня ілюстрація Maria Serena з пальмами й ретроавтомобілем; не перевірений кадр чи документальне фото доступу"),
  visualTheme: "itinerary", visualStatus: "project_illustration", locationTags: ["menton", "nice"],
  tags: [t("French cinema", "Cinéma français", "Cinema francese", "Французьке кіно"), t("Gardens and villas", "Jardins et villas", "Giardini e ville", "Сади та вілли")],
  bestFor: [t("Film and garden enthusiasts", "Amateurs de cinéma et de jardins", "Appassionati di cinema e giardini", "Шанувальники кіно й садів")],
  relatedPlaces: ["villa-maria-serena", "menton-garavan-station", "promenade-reine-astrid", "promenade-des-anglais-nice"],
  relatedArticles: ["films-shot-in-menton", "best-gardens-menton", "belle-epoque-menton-architecture-walk", "mortelle-randonnee-villa-cypris-filming-location", "joy-house-les-felins-villa-torre-clementina", "public-transport-in-menton", "menton-without-a-car"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  practicalTips: [t("Checked 5 November 2026: gardens confirmed as a filming location; exact interiors and shots unverified. October tour dates have expired; the annual listing is not proof of a new bookable session. Assisted access only as published, not a step-free guarantee. Nice's historical casino is a separate outing. The film is not a judicial record.", "Vérifié le 5 novembre 2026 : jardins confirmés, intérieurs et plans non vérifiés. Séances d'octobre terminées ; fiche annuelle sans preuve de nouvelle disponibilité. Accès avec aide selon fiche, pas de garantie sans marches. Casino historique de Nice : sortie distincte. Le film n'est pas un dossier judiciaire.", "Verificato il 5 novembre 2026: giardini confermati, interni e inquadrature non verificati. Sessioni d'ottobre scadute; scheda annuale non prova nuova disponibilità. Accesso con assistenza, non garanzia senza gradini. Casinò storico a Nizza: uscita separata. Il film non è un atto giudiziario.", "Перевірено 5 листопада 2026: сади підтверджені, інтер'єри й ракурси не перевірено. Жовтневі сеанси завершилися; річна картка не доводить нової доступності. Зазначена допомога, не гарантія відсутності сходів. Ніццьке історичне казино — окрема поїздка. Фільм не судовий документ.")],
  sections,
};

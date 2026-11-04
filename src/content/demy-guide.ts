import type { GuideArticle, LocalizedText } from "./guide";
import { formattedMarkdownGuideBody, markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/la-baie-des-anges-jacques-demy-riviera-filming-locations.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("Sunshine, roulette and chance", "Soleil, roulette et hasard", "Sole, roulette e caso", "Сонце, рулетка й випадок"));
sections.forEach((section, index) => {
  const body = (locale: keyof typeof records[number]) => formattedMarkdownGuideBody(records[index][locale]);
  section.body = [t(body("en"), body("fr"), body("it"), body("uk"))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
sections[4].relatedPlaceIds = ["promenade-des-anglais-nice"];
sections[6].relatedPlaceIds = ["jardin-albert-premier-nice", "place-massena-nice", "vieux-nice", "quai-des-etats-unis-nice"];
sections[7].relatedPlaceIds = ["casino-square-monaco", "casino-de-monte-carlo", "hotel-de-paris-monte-carlo", "jardins-petite-afrique-monaco"];
sections[8].relatedPlaceIds = ["quai-amiral-courbet-villefranche", "rue-obscure-villefranche", "chapelle-saint-pierre-villefranche"];
sections[8].guideLinkSlug = "to-catch-a-thief-hitchcock-villefranche-sur-mer";
sections[8].guideLinkLabel = t("Plan the separate Villefranche outing", "Préparer la sortie distincte à Villefranche", "Preparare l'uscita separata a Villefranche", "Сплануйте окрему поїздку до Вільфранша");
sections[11].guideLinkSlug = "public-transport-in-menton";
sections[11].guideLinkLabel = t("Check transport before travelling", "Vérifier les transports avant de partir", "Verificare i trasporti prima di partire", "Перевірте транспорт перед поїздкою");

export const demyGuide: GuideArticle = {
  id: "la-baie-des-anges-jacques-demy-riviera-filming-locations", slug: "la-baie-des-anges-jacques-demy-riviera-filming-locations",
  title: t("La Baie des Anges: Jacques Demy's Riviera Beyond the Postcard", "La Baie des Anges : la Riviera de Jacques Demy au-delà de la carte postale", "La Baie des Anges: la Riviera di Jacques Demy oltre la cartolina", "La Baie des Anges: Рив'єра Жака Демі поза листівкою"),
  seoTitle: t("La Baie des Anges: Demy's Nice and Monaco Film Locations", "La Baie des Anges : lieux de tournage à Nice et Monaco", "La Baie des Anges: location a Nizza e Monte-Carlo", "La Baie des Anges: локації в Ніцці й Монте-Карло"),
  seoDescription: t("Discover the Nice and Monte Carlo behind Jacques Demy's La Baie des Anges: confirmed filming areas, a public waterfront walk and a realistic outing from Menton.", "Nice et Monte-Carlo dans La Baie des Anges de Jacques Demy : lieux documentés, promenade publique et excursion depuis Menton, sans fausses correspondances de plans.", "Nizza e Monte-Carlo in La Baie des Anges di Jacques Demy: luoghi documentati, passeggiata pubblica e gita da Mentone, distinguendo riprese e tappe tematiche.", "Ніцца й Монте-Карло у La Baie des Anges Жака Демі: документовані місця, громадська набережна й поїздка з Ментона, без вигаданих точних ракурсів."),
  excerpt: t("Jeanne Moreau, roulette and a luminous black-and-white Riviera. Explore Nice first, Monte Carlo separately, and distinguish documented production geography from thematic walking stops.", "Jeanne Moreau, la roulette et une Riviera lumineuse en noir et blanc. Nice d'abord, Monte-Carlo séparément, en distinguant tournage documenté et étapes thématiques.", "Jeanne Moreau, roulette e una Riviera luminosa in bianco e nero. Prima Nizza, poi Monte-Carlo separatamente, fra riprese documentate e tappe tematiche.", "Жанна Моро, рулетка й світла чорно-біла Рив'єра. Спершу Ніцца, окремо Монте-Карло: документовані зйомки та чітко позначені тематичні зупинки."),
  category: "walks-views", duration: "full-day", publishedOn: "2026-11-04", sourceStatus: "editorial", locationTags: ["nice", "monaco"],
  coverImage: "/images/guide/la-baie-des-anges-jacques-demy-riviera-filming-locations.png",
  coverImageAlt: t("Supplied artistic colour evocation of Nice's waterfront with a period car and couple; not a La Baie des Anges still, documentary photograph or verified camera position", "Évocation artistique en couleur du front de mer niçois, avec voiture ancienne et couple ; ni photogramme de La Baie des Anges, ni photographie documentaire, ni cadrage vérifié", "Evocazione artistica a colori del lungomare di Nizza con auto d'epoca e coppia; non fotogramma del film, fotografia documentaria o posizione verificata", "Надана кольорова художня ілюстрація набережної Ніцци з ретроавто й парою; не кадр La Baie des Anges, документальне фото чи перевірений ракурс"),
  visualTheme: "itinerary", visualStatus: "project_illustration",
  tags: [t("French cinema", "Cinéma français", "Cinema francese", "Французьке кіно"), t("Nice", "Nice", "Nizza", "Ніцца"), t("Monaco", "Monaco", "Monaco", "Монако")],
  bestFor: [t("Classic cinema and architecture", "Cinéma classique et architecture", "Cinema classico e architettura", "Класичне кіно й архітектура"), t("Car-free cultural outings", "Sorties culturelles sans voiture", "Gite culturali senza auto", "Культурні поїздки без авто")],
  relatedPlaces: ["promenade-des-anglais-nice", "jardin-albert-premier-nice", "place-massena-nice", "vieux-nice", "quai-des-etats-unis-nice", "casino-square-monaco", "casino-de-monte-carlo", "hotel-de-paris-monte-carlo", "jardins-petite-afrique-monaco", "quai-amiral-courbet-villefranche", "rue-obscure-villefranche", "chapelle-saint-pierre-villefranche"],
  relatedArticles: ["romain-gary-nice-promise-at-dawn-literary-walk", "to-catch-a-thief-hitchcock-villefranche-sur-mer", "heartbreaker-larnacoeur-monaco-filming-locations", "casinos-near-menton", "day-trips-from-menton", "public-transport-in-menton", "where-to-stay-in-menton"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  practicalTips: [t("Checked 4 November 2026. Nice and Monte Carlo are documented production locations; Villefranche is only an optional thematic extension. Exact room addresses and camera positions remain unverified. Walk durations are editorial estimates, not a step-free assessment. Check current TER disruptions and public-space closures. No gambling or indoor casino visit is needed; current admission was not confirmed. The supplied colour illustration is not a film still.", "Vérifié le 4 novembre 2026. Nice et Monte-Carlo sont documentés ; Villefranche est une extension thématique. Adresses de chambres et cadrages non vérifiés. Durées estimatives, sans évaluation de parcours sans marches. Vérifiez travaux TER et fermetures. Ni jeu ni visite intérieure nécessaires ; admission actuelle non confirmée. L'illustration couleur n'est pas un photogramme.", "Verificato il 4 novembre 2026. Nizza e Monte-Carlo documentati; Villefranche è un'estensione tematica. Indirizzi e inquadrature non verificati. Tempi stimati, nessuna valutazione senza gradini. Controllate lavori TER e chiusure. Non occorre giocare né entrare; ingresso attuale non confermato. Illustrazione a colori, non fotogramma.", "Перевірено 4 листопада 2026. Ніцца й Монте-Карло документовані; Вільфранш — тематичне продовження. Адреси кімнат і ракурси не перевірені. Час — оцінка, без перевірки безсходинкового шляху. Уточніть роботи TER і закриття. Грати чи заходити не потрібно; нинішній вхід не підтверджено. Кольорова ілюстрація — не кадр фільму.")],
  sections,
};

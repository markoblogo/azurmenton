import type { GuideArticle, LocalizedText } from "./guide";
import { markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/a-week-in-menton-book-walking-route.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("A week by the sea", "Une semaine au bord de la mer", "Una settimana sul mare", "Тиждень біля моря"));
// Keep the source's inline emphasis and links for this literary guide.
sections.forEach((section, index) => {
  const source = records[index];
  const lines = (locale: keyof typeof source) => source[locale].split("\n").slice(1)
    .map(line => line.trim())
    .filter(line => line && !line.startsWith("|"))
    .map(line => line.replace(/^#{1,6}\s+/, "").replace(/^[-*]\s+/, ""));
  const localized = { en: lines("en"), fr: lines("fr"), it: lines("it"), uk: lines("uk") };
  section.body = [t(localized.en.join("\n"), localized.fr.join("\n"), localized.it.join("\n"), localized.uk.join("\n"))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
sections[0].image = "/images/guide/a-week-in-menton-book-cover.jpeg";
sections[0].imageAlt = t("Cover of A Week in Menton: A Novella by the Sea", "Couverture de A Week in Menton: A Novella by the Sea", "Copertina di A Week in Menton: A Novella by the Sea", "Обкладинка книги A Week in Menton: A Novella by the Sea");
sections[0].imageLayout = "portrait";
sections[1].image = "/images/guide/a-week-in-menton-book-walking-route.png";
sections[1].imageAlt = t("A Week in Menton book displayed on a terrace overlooking the sea", "Le livre A Week in Menton sur une terrasse face à la mer", "Il libro A Week in Menton su una terrazza affacciata sul mare", "Книга A Week in Menton на терасі з видом на море");
const bookLinks = [
  { url: "https://www.amazon.com/dp/B0HPKXPCPV", label: t("Kindle edition on Amazon", "Édition Kindle sur Amazon", "Edizione Kindle su Amazon", "Видання Kindle на Amazon") },
  { url: "https://www.amazon.com/dp/B0HPLDC157", label: t("Illustrated paperback on Amazon", "Livre illustré sur Amazon", "Edizione illustrata cartacea su Amazon", "Ілюстроване паперове видання на Amazon") },
  { url: "https://abvx.xyz/books/a-week-in-menton", label: t("About the book and its editions", "Le livre et ses éditions", "Il libro e le sue edizioni", "Про книгу та її видання") },
];
sections[1].officialLinks = [bookLinks[2]];
sections[3].relatedPlaceIds = ["promenade-du-soleil"];
sections[4].relatedPlaceIds = ["rue-saint-michel-menton"];
sections[4].guideLinkSlug = "best-breakfast-menton";
sections[4].guideLinkLabel = t("Breakfast in Menton", "Petit-déjeuner à Menton", "Colazione a Mentone", "Сніданки в Ментоні");
sections[5].relatedPlaceIds = ["halles-du-marche"];
sections[5].guideLinkSlug = "halles-du-marche-menton";
sections[5].guideLinkLabel = t("Plan a visit to Les Halles", "Préparer sa visite des Halles", "Organizza la visita alle Halles", "Сплануйте відвідування Les Halles");
sections[5].officialLinks = [{ url: "https://www.menton.fr/Marche-des-Halles-Municipales.html", label: t("Town of Menton: market hours", "Ville de Menton : horaires du marché", "Comune di Mentone: orari del mercato", "Місто Ментон: години роботи ринку") }];
sections[6].relatedPlaceIds = ["basilica-saint-michel-archange"];
sections[6].guideLinkSlug = "menton-old-town";
sections[6].guideLinkLabel = t("Explore Menton's old town", "Explorer la vieille ville de Menton", "Esplora il centro storico di Mentone", "Дослідіть старе місто Ментона");
sections[7].relatedPlaceIds = ["plage-sablettes"];
sections[8].relatedPlaceIds = ["cimetiere-vieux-chateau"];
sections[9].relatedPlaceIds = ["villefranche-sur-mer"];
sections[9].guideLinkSlug = "public-transport-in-menton";
sections[9].guideLinkLabel = t("Train and bus planning", "Préparer son trajet en train et bus", "Organizza i viaggi in treno e autobus", "Планування поїздок потягом та автобусом");
sections[14].officialLinks = [bookLinks[2], { url: "https://abvx.xyz/writing/a-week-in-menton-first-novella-french-riviera", label: t("The author's story behind the novella", "L'auteur présente sa nouvelle", "L'autore racconta la novella", "Автор про створення повісті") }];

export const aWeekInMentonGuide: GuideArticle = {
  id: "a-week-in-menton-book-walking-route", slug: "a-week-in-menton-book-walking-route",
  title: t("A Week in Menton: Walk Through the Places Behind the Story", "A Week in Menton : promenade dans les lieux de l'histoire", "A Week in Menton: passeggiata nei luoghi della storia", "A Week in Menton: прогулянка місцями з історії"),
  seoTitle: t("A Week in Menton: A Literary Walking Guide Inspired by the Novella", "A Week in Menton : promenade littéraire à Menton", "A Week in Menton: itinerario letterario a Mentone", "A Week in Menton: літературна прогулянка Ментоном"),
  seoDescription: t("Discover A Week in Menton and explore the real streets, market, beaches and viewpoints behind the story. A spoiler-free literary walk.", "Découvrez A Week in Menton et les rues, le marché et les vues qui inspirent ce parcours littéraire sans divulgâcher l'histoire.", "Scopri A Week in Menton e percorri strade, mercato e panorami reali in un itinerario letterario senza anticipazioni.", "Відкрийте A Week in Menton і пройдіть реальними вулицями, ринком та оглядовими місцями з книги без спойлерів."),
  excerpt: t("Explore the real streets, market and seafront behind the novella on a spoiler-free literary walk.", "Découvrez les rues, le marché et le front de mer de la nouvelle lors d'une promenade sans divulgâchage.", "Scopri le strade, il mercato e il lungomare della novella con una passeggiata senza anticipazioni.", "Пройдіть вулицями, ринком і набережною з повісті під час літературної прогулянки без спойлерів."),
  category: "walks-views", duration: "flexible", publishedOn: "2026-10-28", sourceStatus: "editorial",
  tags: [t("Books", "Livres", "Libri", "Книги"), t("Walking", "Promenade", "Passeggiata", "Прогулянка"), t("Literary Menton", "Menton littéraire", "Mentone letteraria", "Літературний Ментон")],
  bestFor: [t("Readers and walkers", "Lecteurs et promeneurs", "Lettori e passeggiatori", "Читачі та любителі прогулянок"), t("Couples and solo travellers", "Couples et voyageurs seuls", "Coppie e viaggiatori solitari", "Пари та самостійні мандрівники")],
  locationTags: ["menton-centre", "seafront"], visualTheme: "itinerary", visualStatus: "project_illustration",
  coverImage: "/images/guide/a-week-in-menton-book-walking-route.png",
  coverImageAlt: t("A Week in Menton book displayed above the Riviera coastline", "Le livre A Week in Menton face à la côte de Menton", "Il libro A Week in Menton davanti alla costa di Mentone", "Книга A Week in Menton на тлі узбережжя Ментона"),
  relatedPlaces: ["promenade-du-soleil", "rue-saint-michel-menton", "halles-du-marche", "basilica-saint-michel-archange", "plage-sablettes", "cimetiere-vieux-chateau", "villefranche-sur-mer"],
  relatedArticles: ["menton-old-town", "halles-du-marche-menton", "best-breakfast-menton", "best-walks-and-hikes-around-menton", "menton-without-a-car", "public-transport-in-menton", "day-trips-from-menton", "menton-in-autumn", "where-to-stay-in-menton"],
  relatedEvents: ["menton-lemon-festival"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  showTransportHelper: false,
  sections,
};

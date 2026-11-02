import type { GuideArticle, LocalizedText } from "./guide";
import { formattedMarkdownGuideBody, markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/flea-markets-brocantes-vintage-menton.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("Leave room for a vintage discovery", "Laisser une place aux trouvailles", "Lascia spazio a una scoperta vintage", "Залиште місце для вінтажної знахідки"));
sections.forEach((section, index) => {
  const body = (locale: keyof typeof records[number]) => formattedMarkdownGuideBody(records[index][locale]);
  section.body = [t(body("en"), body("fr"), body("it"), body("uk"))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
sections[3].relatedPlaceIds = ["menton-brocante-mail-du-bastion"];
sections[4].relatedPlaceIds = ["place-du-cap-menton", "quai-bonaparte-menton"];
sections[5].relatedPlaceIds = ["cours-saleya-antiques"];
sections[6].relatedPlaceIds = ["marche-aux-puces-nice"];
sections[7].relatedPlaceIds = ["ventimiglia-friday-market"];
sections[7].guideLinkSlug = "italian-riviera-day-trip-from-menton";
sections[7].guideLinkLabel = t("Plan the Italian part of your day", "Préparer la partie italienne de votre journée", "Organizza la parte italiana della giornata", "Сплануйте італійську частину дня");
sections[15].relatedPlaceIds = ["halles-du-marche"];
sections[15].guideLinkSlug = "best-markets-near-menton-market-days-in-france-and-italy";
sections[15].guideLinkLabel = t("Compare food markets and other market days", "Comparer les marchés alimentaires et les autres jours", "Confronta i mercati alimentari e gli altri giorni", "Порівняйте продуктові ринки й інші ринкові дні");

export const fleaMarketsGuide: GuideArticle = {
  id: "flea-markets-brocantes-vintage-menton", slug: "flea-markets-brocantes-vintage-menton",
  title: t("Flea Markets, Brocantes and Vintage Shopping Near Menton", "Brocantes, antiquités et shopping vintage près de Menton", "Mercatini delle pulci, brocante e shopping vintage vicino a Mentone", "Блошині ринки, brocante та вінтажний шопінг поблизу Ментона"),
  seoTitle: t("Best Flea Markets Near Menton: Brocante, Antiques & Vintage", "Brocantes près de Menton : antiquités, marchés et vintage", "Mercatini vicino a Mentone: antiquariato, brocante e vintage", "Блошині ринки біля Ментона: антикваріат, brocante та вінтаж"),
  seoDescription: t("Discover flea markets, antique stalls and vintage shopping in Menton, Nice and Ventimiglia. Compare market days, payment tips, buying checks and shipping advice.", "Découvrez brocantes et shopping vintage à Menton, Nice et Vintimille : jours de marché, horaires à confirmer, paiement, contrôle des objets et transport.", "Scopri brocante e shopping vintage a Mentone, Nizza e Ventimiglia: giorni di mercato, orari da verificare, pagamento, controlli e trasporto degli acquisti.", "Блошині ринки й вінтаж у Ментоні, Ніцці та Вентимільї: ринкові дні, години для уточнення, оплата, огляд речей і перевезення покупок."),
  excerpt: t("Know your brocante from your food market. Compare Menton's vintage finds, Nice's Monday antiques and Ventimiglia's different markets, then plan payment and the journey home.", "Distinguer brocante et marché alimentaire, comparer Menton, les antiquités du lundi à Nice et les marchés de Vintimille, puis préparer paiement et retour des achats.", "Distingui brocante e mercato alimentare, confronta Mentone, il lunedì d'antiquariato a Nizza e i mercati di Ventimiglia, poi organizza pagamento e rientro degli acquisti.", "Відрізніть brocante від продуктового ринку, порівняйте Ментон, понеділковий антикваріат Ніцци й ринки Вентимільї та підготуйте оплату й перевезення покупок."),
  category: "food-markets", duration: "reference", publishedOn: "2026-11-02", sourceStatus: "editorial",
  coverImage: "/images/guide/flea-markets-brocantes-vintage-menton.png",
  coverImageAlt: t("Project illustration of vintage stalls beside Menton's waterfront, not a documentary photograph of a particular market", "Illustration de stands vintage près du front de mer de Menton, pas une photographie documentaire d'un marché précis", "Illustrazione di banchi vintage sul lungomare di Mentone, non una fotografia documentaria di un mercato specifico", "Ілюстрація вінтажних прилавків біля набережної Ментона, не документальне фото конкретного ринку"),
  visualTheme: "food", visualStatus: "project_illustration", locationTags: ["menton-centre", "seafront"],
  tags: [t("Brocante", "Brocante", "Brocante", "Brocante"), t("Vintage shopping", "Shopping vintage", "Shopping vintage", "Вінтажні покупки"), t("Antiques", "Antiquités", "Antiquariato", "Антикваріат")],
  bestFor: [t("Vintage lovers and collectors", "Amateurs de vintage et collectionneurs", "Appassionati di vintage e collezionisti", "Любителі вінтажу й колекціонери"), t("A slow market morning", "Une matinée de marché sans se presser", "Una mattinata al mercato senza fretta", "Неспішний ранок на ринку")],
  relatedPlaces: [...new Set(sections.flatMap(section => section.relatedPlaceIds ?? []))],
  relatedArticles: ["best-markets-near-menton-market-days-in-france-and-italy", "best-souvenir-shops-menton-monaco-nice", "bookshops-libraries-menton", "italian-riviera-day-trip-from-menton", "day-trips-from-menton", "menton-old-town"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  showTransportHelper: true, transportHelperAfterSectionIndex: 7,
  practicalTips: [t("Market schedules checked 2 November 2026. Menton's published brocante hours conflict; Ventimiglia Alta's next antiques-market date is unconfirmed. Confirm special editions before travelling. Payment, authenticity, packing and export requirements depend on the seller and object.", "Calendriers vérifiés le 2 novembre 2026. Les horaires de la brocante de Menton divergent ; la prochaine date d'antiquités à Ventimiglia Alta reste non confirmée. Vérifiez les éditions avant de partir. Paiement, authenticité, emballage et exportation dépendent du vendeur et de l'objet.", "Calendari verificati il 2 novembre 2026. Gli orari della brocante di Mentone divergono; la prossima data d'antiquariato a Ventimiglia Alta non è confermata. Verifica le edizioni prima di partire. Pagamento, autenticità, imballaggio ed esportazione dipendono dal venditore e dall'oggetto.", "Розклади перевірено 2 листопада 2026 року. Години brocante Ментона розходяться, наступна антикварна дата Ventimiglia Alta не підтверджена. Уточніть випуски перед поїздкою. Оплата, автентичність, пакування й вивезення залежать від продавця та предмета.")],
  sections,
};

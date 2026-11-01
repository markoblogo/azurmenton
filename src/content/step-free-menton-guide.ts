import type { GuideArticle, LocalizedText } from "./guide";
import { markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/menton-accessible-step-free-walks.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("Enjoy Menton without the climb", "Profiter de Menton sans gravir les escaliers", "Scoprire Mentone senza salire le scale", "Насолоджуйтеся Ментоном без підйому"));
sections.forEach((section, index) => {
  const body = (locale: keyof typeof records[number]) => records[index][locale].split("\n").slice(1)
    .map(line => line.trim()).filter(line => line && !line.startsWith("|"))
    .map(line => line.replace(/^###\s+(.+)$/, "**$1**").replace(/^[-*]\s+/, "")
      .replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, "_$1_")).join("\n");
  section.body = [t(body("en"), body("fr"), body("it"), body("uk"))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
sections[3].relatedPlaceIds = ["promenade-du-soleil"];
sections[4].relatedPlaceIds = ["jardins-bioves", "office-tourisme-menton-riviera-merveilles"];
sections[5].relatedPlaceIds = ["halles-du-marche"];
sections[6].relatedPlaceIds = ["esplanade-des-sablettes-menton"];
sections[7].relatedPlaceIds = ["promenade-de-la-mer-menton", "port-de-garavan"];
sections[8].relatedPlaceIds = ["handiplage-menton", "plage-casino", "plage-du-marche-menton"];
sections[9].relatedPlaceIds = ["palais-de-leurope-menton"];
sections[9].guideLinkSlug = "public-toilets-menton";
sections[9].guideLinkLabel = t("Public toilets: practical information", "Toilettes publiques : informations pratiques", "Bagni pubblici: informazioni pratiche", "Громадські туалети: практична інформація");
sections[10].relatedPlaceIds = ["menton-station"];
sections[10].guideLinkSlug = "public-transport-in-menton";
sections[10].guideLinkLabel = t("Plan local transport", "Préparer les déplacements locaux", "Organizza gli spostamenti locali", "Сплануйте місцеві поїздки");
sections[11].relatedPlaceIds = ["jardin-val-rahmeh", "jardin-serre-de-la-madone"];

export const stepFreeMentonGuide: GuideArticle = {
  id: "menton-accessible-step-free-walks", slug: "menton-accessible-step-free-walks",
  title: t("Menton Without Stairs: Accessible Walks and Step-Free Routes", "Menton sans escaliers : promenades accessibles et parcours sans marches", "Mentone senza scale: passeggiate accessibili e percorsi senza gradini", "Ментон без сходів: доступні прогулянки й безсходинкові маршрути"),
  seoTitle: t("Menton Without Stairs: Accessible Walks & Step-Free Routes", "Menton sans escaliers : balades et accès sans marches", "Mentone senza scale: passeggiate e percorsi accessibili", "Ментон без сходів: доступні прогулянки й маршрути"),
  seoDescription: t("Five Menton walks with published accessibility information: seafront, Biovès, lower town and Sablettes. Toilets, transport and step-free access limits explained.", "Cinq balades à Menton : front de mer, Biovès, ville basse et Sablettes. Sources, toilettes, transports et limites réelles de l'accès sans marches.", "Cinque passeggiate a Mentone: lungomare, Biovès, città bassa e Sablettes. Fonti, bagni, trasporti e limiti dell'accesso senza gradini.", "П'ять прогулянок Ментоном: море, Biovès, нижнє місто й Sablettes. Джерела, туалети, транспорт і реальні обмеження безсходинкового доступу."),
  excerpt: t("Enjoy the seafront and lower town without the old-town climb. Five flexible outings, with operator-reported access, practical facilities and clear limits on what has not been checked.", "Profiter du littoral et de la ville basse sans gravir la vieille ville : cinq sorties, des sources d'opérateurs et les limites de ce qui n'a pas été vérifié.", "Lungomare e città bassa senza la salita al centro storico: cinque uscite, informazioni degli operatori e limiti delle verifiche effettuate.", "Узбережжя й нижнє місто без підйому в старий центр: п'ять прогулянок, відомості операторів і чіткі межі неперевіреного."),
  category: "practical", duration: "flexible", publishedOn: "2026-11-01", sourceStatus: "editorial",
  coverImage: "/images/guide/menton-accessible-step-free-walks.png",
  coverImageAlt: t("Illustration of a wheelchair user on a Menton seafront promenade; not a surveyed access photograph", "Illustration d'une personne en fauteuil sur le littoral de Menton, sans valeur de relevé d'accessibilité", "Illustrazione di una persona in carrozzina sul lungomare di Mentone, non una verifica fotografica dell'accessibilità", "Ілюстрація людини в кріслі колісному на набережній Ментона, не фотодоказ доступності"),
  visualTheme: "itinerary", visualStatus: "project_illustration",
  tags: [t("Step-free planning", "Préparer un accès sans marches", "Organizzare percorsi senza gradini", "Планування без сходів"), t("Limited mobility", "Mobilité réduite", "Mobilità ridotta", "Обмежена мобільність")],
  bestFor: [t("Wheelchair users and walking-aid users", "Fauteuils roulants et aides à la marche", "Carrozzine e ausili per camminare", "Крісла колісні й засоби для ходьби"), t("Pushchairs and shorter outings", "Poussettes et sorties courtes", "Passeggini e uscite brevi", "Дитячі візки й короткі прогулянки")],
  locationTags: ["menton-centre", "garavan"],
  relatedPlaces: [...new Set(sections.flatMap(section => section.relatedPlaceIds ?? []))],
  relatedArticles: ["menton-without-a-car", "public-transport-in-menton", "public-toilets-menton", "best-beaches-in-menton", "menton-with-kids-family-guide", "where-to-stay-in-menton", "best-walks-and-hikes-around-menton", "menton-old-town"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  showTransportHelper: false,
  practicalTips: [t("No complete route was personally surveyed for this guide. Confirm slopes, crossings, lifts and essential toilets. This guide does not certify any apartment as wheelchair-accessible: ask the host about steps, lift dimensions, thresholds and bathroom layout before booking.", "Aucun parcours complet n'a été mesuré sur place pour ce guide. Confirmez pentes, traversées, ascenseurs et toilettes indispensables. Aucun appartement n'est certifié accessible ici : demandez au propriétaire marches, dimensions de l'ascenseur, seuils et salle de bains avant de réserver.", "Nessun percorso completo è stato rilevato sul posto per questa guida. Confermate pendenze, attraversamenti, ascensori e bagni essenziali. Nessun appartamento è certificato accessibile qui: chiedete al proprietario gradini, dimensioni dell'ascensore, soglie e bagno prima di prenotare.", "Жоден повний маршрут не обстежено на місці для цього гайда. Перевірте ухили, переходи, ліфти й потрібні туалети. Гайд не сертифікує доступність апартаментів: перед бронюванням уточніть у господаря сходи, розміри ліфта, пороги й ванну кімнату.")],
  sections,
};

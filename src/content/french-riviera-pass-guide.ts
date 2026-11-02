import type { GuideArticle, LocalizedText } from "./guide";
import { formattedMarkdownGuideBody, markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/french-riviera-pass-worth-it-from-menton.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("Compare the trip, not the marketing total", "Comparer la sortie, pas le total publicitaire", "Confrontare la gita, non il totale pubblicitario", "Порівнюйте поїздку, а не рекламну суму"));
sections.forEach((section, index) => {
  const body = (locale: keyof typeof records[number]) => formattedMarkdownGuideBody(records[index][locale]);
  section.body = [t(body("en"), body("fr"), body("it"), body("uk"))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
sections[3].relatedPlaceIds = ["villa-kerylos-beaulieu-sur-mer", "villa-ephrussi-de-rothschild"];
sections[3].guideLinkSlug = "the-houses-that-remember-riviera-book-route";
sections[3].guideLinkLabel = t("Explore the historic houses behind the route", "Découvrir les demeures historiques du parcours", "Scopri le dimore storiche del percorso", "Дізнайтеся про історичні будинки маршруту");
sections[4].relatedPlaceIds = ["musee-matisse-nice"];
sections[4].guideLinkSlug = "museums-in-menton-nice-monaco";
sections[4].guideLinkLabel = t("Compare other museums and visit conditions", "Comparer les autres musées et leurs conditions", "Confronta altri musei e condizioni di visita", "Порівняйте інші музеї й умови відвідування");
sections[5].relatedPlaceIds = ["galimard-pause-cologne-eze"];
sections[5].guideLinkSlug = "creative-workshops-menton-french-riviera";
sections[5].guideLinkLabel = t("Find other creative workshops", "Trouver d'autres ateliers créatifs", "Trova altri laboratori creativi", "Знайдіть інші творчі майстер-класи");
sections[6].relatedPlaceIds = ["oceanographic-museum-monaco"];
sections[10].guideLinkSlug = "public-transport-in-menton";
sections[10].guideLinkLabel = t("Plan public transport from Menton", "Préparer les transports depuis Menton", "Organizza i trasporti da Mentone", "Сплануйте громадський транспорт із Ментона");
sections[12].guideLinkSlug = "menton-with-kids-family-guide";
sections[12].guideLinkLabel = t("Plan a family stay", "Préparer un séjour en famille", "Organizza una vacanza in famiglia", "Сплануйте сімейний відпочинок");

export const frenchRivieraPassGuide: GuideArticle = {
  id: "french-riviera-pass-worth-it-from-menton", slug: "french-riviera-pass-worth-it-from-menton",
  title: t("Is the French Riviera Pass Worth It When Staying in Menton?", "Le French Riviera Pass est-il intéressant quand on séjourne à Menton ?", "Conviene il French Riviera Pass soggiornando a Mentone?", "Чи вигідний French Riviera Pass, якщо ви зупинилися в Ментоні?"),
  seoTitle: t("French Riviera Pass from Menton: Costs, Tickets & Itineraries", "French Riviera Pass depuis Menton : prix et comparatif", "French Riviera Pass da Mentone: prezzi e itinerari a confronto", "French Riviera Pass із Ментона: ціни, квитки й маршрути"),
  seoDescription: t("Compare the €30, €45 and €65 French Riviera Pass with villa tickets, Nice museums and Galimard's actual Pause Cologne price. TER fares from Menton included.", "Comparez les pass à €30, €45 et €65 aux billets des villas, musées de Nice et au vrai prix Pause Cologne. Transports depuis Menton et conseils pratiques.", "Confronta i pass da €30, €45 e €65 con ville, musei e il vero prezzo Pause Cologne. Tariffe TER da Mentone e consigli per scegliere senza spese inutili.", "Порівняйте паси за €30, €45 і €65 із квитками вілл, музеїв Ніцци й реальною ціною Pause Cologne. Тарифи TER із Ментона та практичні поради."),
  excerpt: t("Six realistic trips from Menton, cheaper combined tickets and the transport costs a sightseeing pass does not cover. Includes a corrected Galimard workshop comparison.", "Six sorties réalistes depuis Menton, billets jumelés moins chers et transports non inclus. Avec une comparaison corrigée de l'atelier Galimard.", "Sei gite realistiche da Mentone, biglietti combinati più economici e trasporti esclusi. Con il confronto corretto del laboratorio Galimard.", "Шість реалістичних поїздок із Ментона, дешевші спільні квитки й транспорт поза пасом. Із виправленим порівнянням заняття Galimard."),
  category: "practical", duration: "reference", publishedOn: "2026-11-02", sourceStatus: "editorial",
  coverImage: "/images/guide/french-riviera-pass-worth-it-from-menton.png",
  coverImageAlt: t("Project illustration of a French Riviera Pass beside a Menton map overlooking the Riviera, not an official ticket or exact location photograph", "Illustration d'un French Riviera Pass et d'un plan de Menton face à la Riviera, ni billet officiel ni photographie d'un lieu exact", "Illustrazione di un French Riviera Pass e una mappa di Mentone sulla Riviera, non un biglietto ufficiale o una fotografia esatta del luogo", "Ілюстрація French Riviera Pass і карти Ментона на тлі Рив'єри, не офіційний квиток і не точне фото локації"),
  visualTheme: "itinerary", visualStatus: "project_illustration", locationTags: ["menton-centre", "nice", "monaco", "eze"],
  tags: [t("French Riviera Pass", "French Riviera Pass", "French Riviera Pass", "French Riviera Pass"), t("Travel budget", "Budget de voyage", "Budget di viaggio", "Бюджет подорожі"), t("Museums and villas", "Musées et villas", "Musei e ville", "Музеї та вілли")],
  bestFor: [t("First-time and car-free visitors", "Première visite et séjour sans voiture", "Prima visita e soggiorno senza auto", "Перша поїздка та відпочинок без авто"), t("Couples, families and museum lovers", "Couples, familles et amateurs de musées", "Coppie, famiglie e appassionati di musei", "Пари, родини й любителі музеїв")],
  relatedPlaces: [...new Set(sections.flatMap(section => section.relatedPlaceIds ?? []))],
  relatedArticles: ["museums-in-menton-nice-monaco", "the-houses-that-remember-riviera-book-route", "creative-workshops-menton-french-riviera", "day-trips-from-menton", "public-transport-in-menton", "menton-without-a-car", "menton-with-kids-family-guide"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  showTransportHelper: true, transportHelperAfterSectionIndex: 10,
  practicalTips: [t("Prices checked 2 November 2026, per adult. Transport is extra. Compare the exact included activity with its provider's cheapest valid ticket; confirm bookings, children's ages, closures and return journeys before purchasing.", "Tarifs vérifiés le 2 novembre 2026, par adulte, hors transports. Comparez la prestation exacte au meilleur billet valable du prestataire ; confirmez réservations, âges, fermetures et retours avant l'achat.", "Prezzi verificati il 2 novembre 2026, per adulto, trasporti esclusi. Confronta l'attività esatta con il biglietto valido più economico del fornitore; conferma prenotazioni, età, chiusure e ritorni.", "Ціни перевірені 2 листопада 2026 року для дорослого, без транспорту. Порівняйте конкретне заняття з найдешевшим чинним квитком організатора; перевірте бронювання, вік дітей, закриття та повернення.")],
  sections,
};

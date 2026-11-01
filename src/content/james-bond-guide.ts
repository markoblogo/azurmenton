import type { GuideArticle, LocalizedText } from "./guide";
import { markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/james-bond-menton-never-say-never-again-filming-locations.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("James Bond, a motorcycle and a very unexpected Menton", "James Bond, une moto et un Menton inattendu", "James Bond, una moto e una Mentone inattesa", "Джеймс Бонд, мотоцикл і несподіваний Ментон"));
sections.forEach((section, index) => {
  const body = (locale: keyof typeof records[number]) => records[index][locale].split("\n").slice(1)
    .map(line => line.trim()).filter(line => line && !line.startsWith("|"))
    .map(line => line.replace(/^###\s+(.+)$/, "**$1**").replace(/^[-*]\s+/, "")
      .replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, "_$1_")).join("\n");
  section.body = [t(body("en"), body("fr"), body("it"), body("uk"))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
sections[3].relatedPlaceIds = ["cimetiere-vieux-chateau"];
sections[4].relatedPlaceIds = ["rampes-saint-michel"];
sections[5].relatedPlaceIds = ["basilica-saint-michel-archange"];
sections[6].relatedPlaceIds = ["rue-longue-menton"];
sections[7].relatedPlaceIds = ["place-du-cap-menton"];
sections[8].relatedPlaceIds = ["quai-bonaparte-menton"];
// The road tunnel is documentary context only, never a recommended walking stop.
sections[10].relatedPlaceIds = ["port-de-la-darse-villefranche", "quai-amiral-courbet-villefranche", "villefranche-sur-mer"];
sections[10].guideLinkSlug = "day-trips-from-menton";
sections[10].guideLinkLabel = t("Plan a separate Riviera day trip", "Préparer une excursion distincte", "Organizza una gita separata sulla Riviera", "Сплануйте окрему поїздку Рив'єрою");
sections[13].guideLinkSlug = "menton-accessible-step-free-walks";
sections[13].guideLinkLabel = t("Choose a step-free alternative", "Choisir une alternative sans escaliers", "Scegli un'alternativa senza gradini", "Оберіть альтернативу без сходів");

export const jamesBondGuide: GuideArticle = {
  id: "james-bond-menton-never-say-never-again-filming-locations", slug: "james-bond-menton-never-say-never-again-filming-locations",
  title: t("James Bond in Menton: The Never Say Never Again Location Walk", "James Bond à Menton : les lieux de tournage de Jamais plus jamais", "James Bond a Mentone: passeggiata nei luoghi di Mai dire mai", "Джеймс Бонд у Ментоні: прогулянка місцями зйомок «Ніколи не кажи ніколи»"),
  seoTitle: t("James Bond Filming Locations in Menton: Never Say Never Again", "James Bond à Menton : lieux de tournage de Jamais plus jamais", "James Bond a Mentone: le location di Mai dire mai", "Джеймс Бонд у Ментоні: кінолокації Never Say Never Again"),
  seoDescription: t("Discover Sean Connery's Never Say Never Again filming locations in Menton: Saint-Michel, the old town and a separate Villefranche harbour excursion.", "Découvrez les lieux de Jamais plus jamais à Menton : Saint-Michel, vieille ville et excursion distincte au port de Villefranche. Parcours et précautions.", "Scopri le location di Mai dire mai a Mentone: Saint-Michel, città vecchia e una gita separata al porto di Villefranche, con consigli pratici.", "Місця зйомок Never Say Never Again у Ментоні: Saint-Michel, старе місто й окрема поїздка до порту Вільфранша. Маршрут і застереження."),
  excerpt: t("Discover the real places behind Bond's motorcycle chase, at walking pace. Saint-Michel, old-town lanes and a separate Villefranche visit, with clear filming-evidence and access limits.", "Les vrais lieux de la poursuite de Bond, au rythme de la marche : Saint-Michel, ruelles et Villefranche en visite distincte, avec les limites des preuves et de l'accès.", "I luoghi reali della fuga di Bond, a passo lento: Saint-Michel, vicoli e una visita separata a Villefranche, distinguendo prove e limiti d'accesso.", "Справжні місця мотоциклетної погоні Бонда в пішому темпі: Saint-Michel, старі вулиці й окремий Вільфранш із чіткими межами доказів та доступу."),
  category: "walks-views", duration: "1-2 hours", publishedOn: "2026-11-01", sourceStatus: "editorial",
  coverImage: "/images/guide/james-bond-menton-never-say-never-again-filming-locations.png",
  coverImageAlt: t("Illustration inspired by a Bond motorcycle chase in Menton, not a film still or safe riding route", "Illustration inspirée d'une poursuite de Bond à Menton, ni photogramme ni parcours sûr à moto", "Illustrazione ispirata alla fuga di Bond a Mentone, non un fotogramma né un percorso sicuro in moto", "Ілюстрація за мотивами погоні Бонда в Ментоні, не кадр фільму й не безпечний шлях для мотоцикла"),
  visualTheme: "itinerary", visualStatus: "project_illustration",
  tags: [t("James Bond", "James Bond", "James Bond", "Джеймс Бонд"), t("Filming locations", "Lieux de tournage", "Location cinematografiche", "Місця зйомок"), t("Old-town walk", "Balade dans la vieille ville", "Passeggiata nel centro storico", "Прогулянка старим містом")],
  bestFor: [t("Film fans and photographers", "Cinéphiles et photographes", "Appassionati di cinema e fotografia", "Шанувальники кіно й фотографії"), t("Historic streets and architecture", "Rues historiques et architecture", "Strade storiche e architettura", "Історичні вулиці й архітектура")],
  locationTags: ["menton-centre", "old-town"],
  relatedPlaces: [...new Set(sections.flatMap(section => section.relatedPlaceIds ?? []))],
  relatedArticles: ["films-shot-in-menton", "menton-old-town", "best-photo-spots-menton", "day-trips-from-menton", "menton-without-a-car", "menton-accessible-step-free-walks", "jean-cocteau-menton-walking-route"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  showTransportHelper: false,
  practicalTips: [t("Allow 60–90 minutes for Menton's pedestrian walk; Villefranche is a separate half-day outing. Steep steps exclude a fully step-free route. Never enter the road tunnel on foot, recreate stunts or enter working harbour buildings without permission. Exact timestamps and camera positions have not been independently frame-matched by AzurMenton.", "Prévoyez 60–90 minutes à Menton et une demi-journée distincte à Villefranche. Le parcours comporte des marches raides. N'entrez jamais à pied dans le tunnel routier, ne reproduisez pas de cascades et respectez les zones portuaires fermées. AzurMenton n'a pas vérifié chaque repère temporel et angle image par image.", "Prevedi 60–90 minuti a Mentone e mezza giornata separata a Villefranche. Le scale ripide escludono un percorso completamente senza gradini. Non entrare a piedi nel tunnel, non imitare acrobazie e rispetta le aree portuali riservate. AzurMenton non ha verificato ogni tempo e angolo fotogramma per fotogramma.", "Передбачте 60–90 хвилин у Ментоні й окремі пів дня у Вільфранші. Круті сходи виключають повністю безсходинковий шлях. Не заходьте пішки до дорожнього тунелю, не повторюйте трюки й не входьте до робочих портових будівель без дозволу. AzurMenton не звіряв кожен таймкод і ракурс покадрово.")],
  sections,
};

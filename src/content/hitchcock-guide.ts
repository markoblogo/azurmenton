import type { GuideArticle, LocalizedText } from "./guide";
import { formattedMarkdownGuideBody, markdownGuideSections } from "@/lib/guide-markdown";
import records from "./guide-data/to-catch-a-thief-hitchcock-villefranche-sur-mer.json";

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });
const sections = markdownGuideSections(records, t("Hitchcock's Riviera and the real town", "La Riviera d'Hitchcock et la ville réelle", "La Riviera di Hitchcock e la città reale", "Рив'єра Гічкока й справжнє місто"));
sections.forEach((section, index) => {
  const body = (locale: keyof typeof records[number]) => formattedMarkdownGuideBody(records[index][locale]);
  section.body = [t(body("en"), body("fr"), body("it"), body("uk"))];
  section.formattedBody = true;
  section.officialLinks = undefined;
});
sections[4].relatedPlaceIds = ["villefranche-sur-mer-station"];
sections[5].relatedPlaceIds = ["villefranche-sur-mer"];
sections[6].relatedPlaceIds = ["rue-obscure-villefranche"];
sections[7].relatedPlaceIds = ["quai-amiral-courbet-villefranche"];
sections[8].relatedPlaceIds = ["chapelle-saint-pierre-villefranche"];
sections[8].guideLinkSlug = "jean-cocteau-menton-walking-route";
sections[8].guideLinkLabel = t("Explore Cocteau's Menton", "Découvrir le Menton de Cocteau", "Scopri la Mentone di Cocteau", "Відкрийте Ментон Кокто");
sections[9].relatedPlaceIds = ["citadelle-saint-elme-villefranche"];
sections[14].guideLinkSlug = "public-transport-in-menton";
sections[14].guideLinkLabel = t("Plan trains, works and returns", "Préparer trains, travaux et retours", "Organizza treni, lavori e ritorno", "Сплануйте потяги, роботи й повернення");

export const hitchcockGuide: GuideArticle = {
  id: "to-catch-a-thief-hitchcock-villefranche-sur-mer", slug: "to-catch-a-thief-hitchcock-villefranche-sur-mer",
  title: t("To Catch a Thief: Hitchcock's Riviera and a Day in Villefranche-sur-Mer", "La Main au collet : la Riviera d'Hitchcock et une journée à Villefranche-sur-Mer", "Caccia al ladro: la Riviera di Hitchcock e una giornata a Villefranche-sur-Mer", "Спіймати злодія: Рив'єра Гічкока й день у Вільфранш-сюр-Мер"),
  seoTitle: t("To Catch a Thief: A Villefranche Day from Menton", "La Main au collet : Villefranche depuis Menton", "Caccia al ladro: Villefranche da Mentone", "Спіймати злодія: Вільфранш із Ментона"),
  seoDescription: t("Explore Hitchcock's Riviera and a Villefranche day from Menton: old town, Rue Obscure, Cocteau chapel and citadel, with filming uncertainty and current access clearly separated.", "Une journée à Villefranche inspirée de La Main au collet : vieille ville, Rue Obscure, chapelle et citadelle, sans confondre tournage documenté et promenade.", "Una giornata a Villefranche ispirata a Caccia al ladro: vicoli, Rue Obscure, Cocteau e cittadella, distinguendo riprese, visita e accessi attuali.", "Вільфранш за мотивами «Спіймати злодія»: старе місто, Rue Obscure, Кокто й цитадель із розмежуванням зйомок, прогулянки та чинного доступу."),
  excerpt: t("Cary Grant, Grace Kelly and a Riviera assembled through editing. Visit Villefranche for its real streets and harbour, without turning a historical filming attribution into invented scene markers.", "Cary Grant, Grace Kelly et une Riviera créée par le montage. Découvrez rues et rade de Villefranche sans inventer de positions de caméra.", "Cary Grant, Grace Kelly e una Riviera costruita dal montaggio. Scopri vicoli e rada di Villefranche senza inventare posizioni di ripresa.", "Кері Ґрант, Ґрейс Келлі й Рив'єра, створена монтажем. Відкрийте вулиці та бухту Вільфранша без вигаданих точок камери."),
  category: "day-trips", duration: "half-day", publishedOn: "2026-11-03", sourceStatus: "editorial",
  coverImage: "/images/guide/to-catch-a-thief-hitchcock-villefranche-sur-mer.png",
  coverImageAlt: t("Project illustration of a couple and a convertible overlooking Villefranche bay; not a To Catch a Thief film still, cast photograph, verified camera position or permitted parking location", "Illustration d'un couple et d'un cabriolet face à la rade ; ni photogramme de La Main au collet, ni photo des acteurs, ni position de caméra ou stationnement vérifié", "Illustrazione di una coppia e una cabriolet sulla rada; non fotogramma di Caccia al ladro, foto del cast, posizione verificata o parcheggio autorizzato", "Ілюстрація пари й кабріолета над бухтою; не кадр «Спіймати злодія», фото акторів, перевірений ракурс чи дозволена стоянка"),
  visualTheme: "itinerary", visualStatus: "project_illustration", locationTags: ["nice", "day-trip"],
  tags: [t("Hitchcock", "Hitchcock", "Hitchcock", "Гічкок"), t("Classic cinema", "Cinéma classique", "Cinema classico", "Класичне кіно"), t("Villefranche-sur-Mer", "Villefranche-sur-Mer", "Villefranche-sur-Mer", "Вільфранш-сюр-Мер")],
  bestFor: [t("Cinema fans and couples", "Cinéphiles et couples", "Cinefili e coppie", "Кіномани й пари"), t("A cultural coastal day trip", "Une excursion culturelle sur la côte", "Una gita culturale sulla costa", "Культурна прибережна поїздка")],
  relatedPlaces: [...new Set(sections.flatMap(section => section.relatedPlaceIds ?? []))],
  relatedArticles: ["james-bond-menton-never-say-never-again-filming-locations", "jean-cocteau-menton-walking-route", "grace-of-monaco-filming-locations-menton", "rebecca-monte-carlo-daphne-du-maurier-literary-walk", "day-trips-from-menton", "menton-without-a-car", "public-transport-in-menton"],
  relatedApartments: ["sea-view-balcony-studio", "panoramic-sea-view-studio", "beachside-family-apartment"],
  showTransportHelper: true, transportHelperAfterSectionIndex: 14,
  practicalTips: [t("Allow 3–4 hours in Villefranche, or a full day with breaks: editorial estimates plus travel, not a measured or step-free audit. Checked 3 November 2026. This is a thematic walk, not authenticated Hitchcock camera positions. The chapel lists mid-November–mid-December closure; the permanent museum route is closed for renovation. Confirm actual access, works and return trains. The helper below describes the wider Nice direction; use the direct Villefranche SNCF link in section 14 for this trip.", "Prévoyez 3–4 h, ou une journée avec pauses, plus trajet : estimations, pas audit sans marches. Vérifié le 3 novembre 2026. Promenade thématique, pas positions de caméra authentifiées. Chapelle fermée de mi-novembre à mi-décembre selon la fiche ; parcours muséal permanent fermé. Confirmez accès, travaux et retours. Le bloc Nice est général ; utilisez le lien SNCF Villefranche en section 14.", "Prevedi 3–4 ore o una giornata con pause, più viaggio: stime, non audit senza gradini. Verificato il 3 novembre 2026. Visita tematica, non punti di ripresa autenticati. Cappella chiusa da metà novembre a metà dicembre secondo la scheda; percorso museale permanente chiuso. Conferma accessi, lavori e ritorni. Il blocco Nizza è generale: usa il link SNCF Villefranche nella sezione 14.", "Плануйте 3–4 години або день із паузами плюс дорога: оцінки, не аудит без сходів. Перевірено 3 листопада 2026. Тематична прогулянка, не підтверджені точки камери. Каплиця має закриття із середини листопада до середини грудня; постійний музейний маршрут закритий. Уточнюйте доступ, роботи й повернення. Блок Ніцци — загальний; для цієї поїздки використовуйте посилання SNCF у розділі 14.")],
  sections,
};

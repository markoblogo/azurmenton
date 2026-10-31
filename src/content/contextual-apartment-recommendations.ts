import type { Locale } from "@/i18n/locales";
import type { RivieraEvent } from "./riviera-events";
import type { GuideArticle } from "./guide";

export type LocalizedText = Record<Locale, string>;

export type ContextualApartmentRecommendation = {
  apartmentSlug: string;
  reason: LocalizedText;
  keyFeature: LocalizedText;
};

export type ContextualApartmentScenario = {
  title: LocalizedText;
  intro?: LocalizedText;
  checkLabel?: LocalizedText;
  recommendations: ContextualApartmentRecommendation[];
};

const t = (en: string, fr = en, it = en, uk = en): LocalizedText => ({ en, fr, it, uk });

const title = t(
  "Best Azur Menton apartment for this plan",
  "Meilleur appartement Azur Menton pour ce sejour",
  "Miglior appartamento Azur Menton per questo viaggio",
  "Найкращі апартаменти Azur Menton для цього плану",
);

const seaViewBalcony = {
  apartmentSlug: "sea-view-balcony-studio",
  reason: t(
    "Best for couples who want a beachfront base, sea air and a private balcony between plans.",
    "Ideal pour les couples qui veulent une base en front de mer, l'air marin et un balcon prive entre deux sorties.",
    "Ideale per coppie che cercano una base fronte mare, aria di mare e balcone privato tra un programma e l'altro.",
    "Найкраще для пар, яким потрібна база біля моря, морське повітря й приватний балкон між планами.",
  ),
  keyFeature: t("Private balcony with sea view", "Balcon prive avec vue mer", "Balcone privato vista mare", "Приватний балкон із видом на море"),
};

const beachsideFamily = {
  apartmentSlug: "beachside-family-apartment",
  reason: t(
    "Best for families or longer stays needing more space, a terrace and parking by reservation.",
    "Ideal pour les familles ou les sejours plus longs avec plus d'espace, terrasse et parking sur reservation.",
    "Ideale per famiglie o soggiorni piu lunghi con piu spazio, terrazza e parcheggio su prenotazione.",
    "Найкраще для сімей або довших перебувань, коли потрібні простір, тераса й паркінг за бронюванням.",
  ),
  keyFeature: t("Terrace and parking by reservation", "Terrasse et parking sur reservation", "Terrazza e parcheggio su prenotazione", "Тераса й паркінг за бронюванням"),
};

const panoramicSeaView = {
  apartmentSlug: "panoramic-sea-view-studio",
  reason: t(
    "Best when you prefer a quieter Garavan setting and wide Mediterranean views.",
    "Ideal si vous preferez le calme de Garavan et de larges vues mediterraneennes.",
    "Ideale se preferisci la tranquillita di Garavan e ampie viste sul Mediterraneo.",
    "Найкраще, якщо хочеться тихішого Garavan і широких середземноморських краєвидів.",
  ),
  keyFeature: t("Panoramic sea view", "Vue mer panoramique", "Vista mare panoramica", "Панорамний вид на море"),
};

const centralWalkable = {
  apartmentSlug: "sea-view-balcony-studio",
  reason: t(
    "A compact central beachfront choice for guests who want to walk to beaches, restaurants and transport.",
    "Un choix compact en front de mer central pour rejoindre plages, restaurants et transports a pied.",
    "Una scelta compatta sul lungomare centrale per raggiungere spiagge, ristoranti e trasporti a piedi.",
    "Компактний варіант біля центральної набережної для пішого доступу до пляжів, ресторанів і транспорту.",
  ),
  keyFeature: t("Central beachfront location", "Emplacement central en front de mer", "Posizione centrale fronte mare", "Центральне розташування біля моря"),
};

const monacoBase = {
  apartmentSlug: "panoramic-sea-view-studio",
  reason: t(
    "A quieter sea-view base for event days when you want to leave the Monaco crowds behind.",
    "Une base plus calme avec vue mer apres les journees d'evenement a Monaco.",
    "Una base piu tranquilla con vista mare dopo le giornate di eventi a Monaco.",
    "Тихіша база з видом на море після подій і натовпів у Монако.",
  ),
  keyFeature: t("Quieter Garavan side", "Cote Garavan plus calme", "Zona Garavan piu tranquilla", "Тихіший район Garavan"),
};

const allByTripStyle = [seaViewBalcony, beachsideFamily, monacoBase];
const festivalPair = [seaViewBalcony, beachsideFamily];
const seaViewPair = [seaViewBalcony, panoramicSeaView];

export const guideApartmentScenarios: Record<string, ContextualApartmentScenario> = {
  "fete-du-citron-menton-practical-guide": { title, recommendations: festivalPair },
  "monaco-events-from-menton": { title, recommendations: allByTripStyle },
  "menton-without-a-car": { title, recommendations: [centralWalkable, beachsideFamily, panoramicSeaView] },
  "menton-with-kids-family-guide": {
    title: t("Space for a family stay", "De l'espace pour un séjour en famille", "Spazio per un soggiorno in famiglia", "Простір для сімейної поїздки"),
    intro: t("The terrace apartment accommodates up to four guests and has a separate bedroom, a sofa bed and a full kitchen. Tell us your group size and any cot or access needs; these arrangements require confirmation.", "L'appartement avec terrasse accueille jusqu'à quatre personnes et dispose d'une chambre séparée, d'un canapé-lit et d'une cuisine complète. Précisez la taille du groupe et tout besoin de lit bébé ou d'accessibilité ; ces dispositions sont à confirmer.", "L'appartamento con terrazza accoglie fino a quattro ospiti, con camera separata, divano letto e cucina completa. Indicate il numero di ospiti ed eventuali esigenze di culla o accessibilità; gli accordi richiedono conferma.", "Апартаменти з терасою вміщують до чотирьох гостей і мають окрему спальню, диван-ліжко та повноцінну кухню. Повідомте склад групи й потребу в дитячому ліжечку чи доступності; ці умови потребують підтвердження."),
    recommendations: [beachsideFamily],
  },
  "menton-in-winter": {
    title: t("A base for a longer winter stay", "Une base pour un séjour hivernal prolongé", "Una base per un soggiorno invernale più lungo", "База для тривалішого зимового перебування"),
    intro: t("Compare space, cooking facilities and laundry for everyday life, not just a weekend. Send your dates, length of stay and practical needs. Availability, price and any longer-stay terms are confirmed individually; no monthly rate or discount is promised.", "Comparez espace, cuisine et lave-linge pour le quotidien, pas seulement un week-end. Envoyez dates, durée et besoins pratiques. Disponibilité, prix et conditions de long séjour sont confirmés individuellement ; aucun tarif mensuel ni réduction n'est garanti.", "Confrontate spazio, cucina e lavatrice per la vita quotidiana, non solo per un weekend. Inviate date, durata ed esigenze pratiche. Disponibilità, prezzo e condizioni per soggiorni lunghi vengono confermati individualmente; nessuna tariffa mensile o sconto è garantito.", "Порівняйте простір, кухню й пральну машину для щоденного життя, а не лише вихідних. Надішліть дати, тривалість і побутові потреби. Наявність, ціна й умови тривалого проживання підтверджуються індивідуально; місячного тарифу чи знижки не обіцяємо."),
    checkLabel: t("Ask about a longer stay", "Demander un séjour prolongé", "Chiedi un soggiorno più lungo", "Запитати про тривале проживання"),
    recommendations: [
      { ...beachsideFamily, reason: t("Up to four guests, a separate bedroom, full kitchen, dishwasher and washing machine for everyday routines.", "Jusqu'à quatre personnes, chambre séparée, cuisine complète, lave-vaisselle et lave-linge pour le quotidien.", "Fino a quattro ospiti, camera separata, cucina completa, lavastoviglie e lavatrice per la quotidianità.", "До чотирьох гостей, окрема спальня, повноцінна кухня, посудомийна й пральна машини для щоденного побуту."), keyFeature: t("Full kitchen and separate bedroom", "Cuisine complète et chambre séparée", "Cucina completa e camera separata", "Повноцінна кухня й окрема спальня") },
      { ...panoramicSeaView, reason: t("A compact option for up to two guests, with a kitchenette, washing machine and private sea-view balcony. No parking.", "Une option compacte pour deux personnes maximum, avec kitchenette, lave-linge et balcon privé vue mer. Sans parking.", "Un'opzione compatta per massimo due ospiti, con angolo cottura, lavatrice e balcone privato vista mare. Senza parcheggio.", "Компактний варіант для двох гостей із мінікухнею, пральною машиною й приватним балконом з видом на море. Без паркінгу.") },
    ],
  },
  "day-trips-from-menton": { title, recommendations: allByTripStyle },
  "stay-cool-in-menton-summer": { title, recommendations: allByTripStyle },
  "italian-riviera-day-trip-from-menton": { title, recommendations: [centralWalkable, panoramicSeaView] },
  "where-to-stay-in-menton": { title, recommendations: allByTripStyle },
  "best-beaches-in-menton": { title, recommendations: [seaViewBalcony, beachsideFamily] },
};

export const eventApartmentScenarios: Record<string, ContextualApartmentScenario> = {
  "menton-lemon-festival": { title, recommendations: festivalPair },
  "monaco-grand-prix": { title, recommendations: allByTripStyle },
  "monaco-yacht-show": { title, recommendations: allByTripStyle },
  "monaco-e-prix": { title, recommendations: allByTripStyle },
  "rolex-monte-carlo-masters": { title, recommendations: allByTripStyle },
  "nice-carnival": { title, recommendations: [beachsideFamily, seaViewBalcony, panoramicSeaView] },
  "sanremo-music-festival": { title, recommendations: [centralWalkable, panoramicSeaView] },
  "monte-carlo-circus-festival": { title, recommendations: [beachsideFamily, seaViewBalcony] },
  "rallye-automobile-monte-carlo": { title, recommendations: allByTripStyle },
  "menton-music-festival": { title, recommendations: seaViewPair },
};

export function getEventApartmentScenario(event: RivieraEvent, apartmentKeys: string[]): ContextualApartmentScenario {
  const existing = eventApartmentScenarios[event.slug];
  const choices = [seaViewBalcony, beachsideFamily, panoramicSeaView];
  return existing ?? {
    title: t("A Menton base for this event", "Une base à Menton pour cet événement", "Una base a Mentone per questo evento", "База в Ментоні для цієї події"),
    recommendations: [...new Set(apartmentKeys)].flatMap(key => choices.filter(choice => choice.apartmentSlug === key)),
  };
}

export function getGuideApartmentScenario(article: GuideArticle): ContextualApartmentScenario | undefined {
  const existing = guideApartmentScenarios[article.slug];
  if (existing) return existing;
  const keys = [...new Set([...(article.relatedApartments ?? []), ...article.sections.flatMap(section => section.relatedApartmentKeys ?? [])])];
  const choices = [seaViewBalcony, beachsideFamily, panoramicSeaView];
  const recommendations = keys.flatMap(key => choices.filter(choice => choice.apartmentSlug === key));
  return recommendations.length ? {
    title: t("Apartments for your Menton stay", "Appartements pour votre séjour à Menton", "Appartamenti per il soggiorno a Mentone", "Апартаменти для вашого перебування в Ментоні"),
    recommendations,
  } : undefined;
}

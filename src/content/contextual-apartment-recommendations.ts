import type { Locale } from "@/i18n/locales";

export type LocalizedText = Record<Locale, string>;

export type ContextualApartmentRecommendation = {
  apartmentSlug: string;
  reason: LocalizedText;
  keyFeature: LocalizedText;
};

export type ContextualApartmentScenario = {
  title: LocalizedText;
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
  "menton-with-kids-family-guide": { title, recommendations: [beachsideFamily, seaViewBalcony] },
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

import type { Locale } from "@/i18n/locales";

type LocalizedText = Record<Locale, string>;

export type RadioTenantOrRegion = "menton" | "loire";

export type RadioStation = {
  id: string;
  tenant: RadioTenantOrRegion;
  name: LocalizedText;
  fmFrequency?: string;
  languages?: string[];
  contentTypes?: string[];
  musicStyles?: string[];
  onlineStreamUrl?: string;
  websiteUrl?: string;
  shortLabel?: LocalizedText;
  notes?: LocalizedText;
  usefulFor?: string[];
};

export const radioStations: RadioStation[] = [
  {
    id: "france-bleu-cote-azur",
    tenant: "menton",
    name: {
      en: "France Bleu Côte d'Azur",
      fr: "France Bleu Côte d'Azur",
      it: "France Bleu Côte d'Azur",
      uk: "France Bleu Côte d'Azur",
    },
    contentTypes: ["local news", "current affairs", "music"],
    languages: ["French"],
    onlineStreamUrl: "https://www.francebleu.fr/",
    websiteUrl: "https://www.francebleu.fr/",
    shortLabel: {
      en: "Useful for local weather, road and event updates",
      fr: "Infos pratiques locales: météo, routes, agenda",
      it: "Per aggiornamenti locali: meteo, traffico, eventi",
      uk: "Місцеві новини: погода, дороги, події",
    },
    notes: {
      en: "Official regional public-service station with broad Riviera coverage and practical updates.",
      fr: "Station public-service régionale avec couverture Rivière large et informations pratiques.",
      it: "Radio pubblica regionale con ampia copertura rivierasco e aggiornamenti pratici.",
      uk: "Публічна регіональна радіостанція з широким покриттям Рив’єри й практичними оновленнями.",
    },
    usefulFor: ["practical planning", "travel", "commute"],
  },
  {
    id: "rmc-azur",
    tenant: "menton",
    name: {
      en: "RMC",
      fr: "RMC",
      it: "RMC",
      uk: "RMC",
    },
    contentTypes: ["news", "lifestyle", "music"],
    languages: ["French"],
    onlineStreamUrl: "https://www.rmc.fr/stream",
    websiteUrl: "https://www.rmc.fr/",
    shortLabel: {
      en: "General news, sports and travel-safe updates",
      fr: "Actualités générales, sports et mises à jour utiles",
      it: "Notizie, sport e aggiornamenti pratici",
      uk: "Новини, спорт і корисні поінформування",
    },
    notes: {
      en: "Useful for trip timing and general headlines alongside dedicated local sources.",
      fr: "Pratique pour la gestion des horaires de voyage, en complément des sources locales.",
      it: "Utile per orari e aggiornamenti di viaggio, insieme alle fonti locali dedicate.",
      uk: "Корисна для орієнтації за подіями та новинами, поряд із локальними джерелами.",
    },
    usefulFor: ["trip headlines", "trip prep"],
  },
  {
    id: "radio-classique",
    tenant: "loire",
    name: {
      en: "Radio Classique",
      fr: "Radio Classique",
      it: "Radio Classique",
      uk: "Radio Classique",
    },
    contentTypes: ["classical music"],
    languages: ["French"],
    musicStyles: ["classical", "jazz"],
    websiteUrl: "https://www.radioclassique.fr/",
    shortLabel: {
      en: "Classical and jazz for quieter evening plans",
      fr: "Classique et jazz pour des soirées douces",
      it: "Classica e jazz per serate più tranquille",
      uk: "Класика й джаз для спокійних вечорів",
    },
    notes: {
      en: "Not transport-critical; useful when planning evening breaks and downtime in Menton.",
      fr: "Non critique pour les transports; utile pour préparer des soirées plus calmes.",
      it: "Non prioritario per il trasporto; utile per pianificare serate tranquille.",
      uk: "Не критична для транспорту, корисна для планування спокійних вечорів.",
    },
    usefulFor: ["evening downtime", "weekend planning"],
  },
  {
    id: "monaco-mondiale-radio",
    tenant: "menton",
    name: {
      en: "Monaco Info Radio",
      fr: "Monaco Info Radio",
      it: "Monaco Info Radio",
      uk: "Monaco Info Radio",
    },
    contentTypes: ["city updates", "events", "traffic"],
    languages: ["French", "English"],
    websiteUrl: "https://www.mairie.mc/",
    shortLabel: {
      en: "Crossing toward Monaco? Useful for city-level updates.",
      fr: "Vers Monaco: infos officielles utiles.",
      it: "Per Monaco: informazioni utili sul territorio cittadino.",
      uk: "Для подорожей до Монако: актуальні відомості по місту.",
    },
    usefulFor: ["day trips", "family visits", "event timing"],
  },
];

export function getRadioStationById(id: string): RadioStation | undefined {
  return radioStations.find((station) => station.id === id);
}

export function getRadioStationsForTenant(region: RadioTenantOrRegion, stationIds?: string[]): RadioStation[] {
  const set = stationIds ? new Set(stationIds) : undefined;

  return radioStations.filter((station) => {
    if (station.tenant !== region) return false;
    if (!set || set.size === 0) return true;
    return set.has(station.id);
  });
}

export function getRadioStationLabel(station: RadioStation, locale: Locale): string {
  return station.name[locale] ?? station.name.en;
}

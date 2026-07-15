import type { Locale } from "@/i18n/locales";

type LocalizedText = Record<Locale, string>;

export type AirportBoardEmbedMode = "supported" | "blocked" | "unreliable" | "external_only";

export type AirportLiveBoard = {
  id: string;
  code: string;
  name: LocalizedText;
  summary: LocalizedText;
  transportNote: LocalizedText;
  arrivalsUrl: string;
  departuresUrl: string;
  embedMode: AirportBoardEmbedMode;
};

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });

export const airportLiveBoards: AirportLiveBoard[] = [
  {
    id: "nice-cote-dazur-airport",
    code: "NCE",
    name: t("Nice Cote d'Azur Airport", "Aeroport Nice Cote d'Azur", "Aeroporto Nice Cote d'Azur", "Аеропорт Nice Cote d'Azur"),
    summary: t("The normal, lowest-friction airport for Menton stays.", "L'aeroport le plus simple pour un sejour a Menton.", "L'aeroporto piu semplice per un soggiorno a Mentone.", "Найпростіший аеропорт для перебування в Ментоні."),
    transportNote: t("Use the airport-side rail area, coach, taxi or a pre-arranged transfer; check the final connection before travel.", "Utilisez le secteur ferroviaire de l'aeroport, le car, le taxi ou un transfert prevu; verifiez la derniere correspondance.", "Usa l'area ferroviaria dell'aeroporto, coach, taxi o transfer prenotato; controlla l'ultima coincidenza.", "Скористайтеся залізничною зоною аеропорту, автобусом, таксі або заздалегідь замовленим трансфером; перевірте останнє сполучення."),
    arrivalsUrl: "https://www.nice.aeroport.fr/en/flights/arrivals",
    departuresUrl: "https://www.nice.aeroport.fr/en/flights/departures",
    embedMode: "supported",
  },
  {
    id: "genoa-cristoforo-colombo-airport",
    code: "GOA",
    name: t("Genoa Cristoforo Colombo Airport", "Aeroport de Genes Cristoforo Colombo", "Aeroporto di Genova Cristoforo Colombo", "Аеропорт Генуя Крістофоро Коломбо"),
    summary: t("The strongest Italian alternative when a direct flight or Ligurian itinerary makes sense.", "La meilleure alternative italienne lorsqu'un vol direct ou un itineraire ligure le justifie.", "La migliore alternativa italiana quando convengono un volo diretto o un itinerario ligure.", "Найкраща італійська альтернатива, коли підходить прямий рейс або маршрут Лігурією."),
    transportNote: t("Airlink and onward rail can work, but compare the whole journey to Menton before booking.", "Airlink et train peuvent convenir, mais comparez tout le trajet vers Menton avant de reserver.", "Airlink e treno possono funzionare, ma confronta l'intero viaggio verso Mentone prima di prenotare.", "Airlink і подальша поїздка потягом можливі, але перед бронюванням порівняйте весь маршрут до Ментона."),
    arrivalsUrl: "https://www.airport.genova.it/en/to-fly-2-2/",
    departuresUrl: "https://www.airport.genova.it/en/to-fly-2-2/",
    embedMode: "blocked",
  },
  {
    id: "cuneo-levaldigi-airport",
    code: "CUF",
    name: t("Cuneo Levaldigi Airport", "Aeroport de Cuneo Levaldigi", "Aeroporto di Cuneo Levaldigi", "Аеропорт Кунео Левальдіджі"),
    summary: t("A small, seasonal special case rather than a default Menton airport.", "Un petit cas saisonnier, pas un aeroport par defaut pour Menton.", "Un piccolo caso stagionale, non l'aeroporto predefinito per Mentone.", "Невеликий сезонний варіант, а не типовий аеропорт для Ментона."),
    transportNote: t("Choose it only with a confirmed onward plan, rental car or transfer.", "Choisissez-le seulement avec un trajet confirme, une voiture ou un transfert.", "Sceglilo solo con proseguimento confermato, auto a noleggio o transfer.", "Обирайте лише з підтвердженим подальшим маршрутом, орендованим авто чи трансфером."),
    arrivalsUrl: "https://www.aeroporto.cuneo.it/en/",
    departuresUrl: "https://www.aeroporto.cuneo.it/en/",
    embedMode: "external_only",
  },
  {
    id: "torino-airport",
    code: "TRN",
    name: t("Torino Airport", "Aeroport de Turin", "Aeroporto di Torino", "Аеропорт Турин"),
    summary: t("A northern Italian fallback when the flight is materially better than Nice or Genoa.", "Une solution de repli du nord de l'Italie si le vol est nettement meilleur que Nice ou Genes.", "Un'alternativa del nord Italia se il volo e nettamente migliore di Nizza o Genova.", "Північноіталійський запасний варіант, якщо рейс суттєво кращий, ніж до Ніцци чи Генуї."),
    transportNote: t("Expect a longer onward day through Turin or by rental car.", "Prevoir une journee de transfert plus longue via Turin ou en voiture de location.", "Prevedi una giornata di trasferimento piu lunga via Torino o in auto a noleggio.", "Плануйте довший день у дорозі через Турин або на орендованому авто."),
    arrivalsUrl: "https://www.aeroportoditorino.it/en/tofly/flights/departs-arrivals",
    departuresUrl: "https://www.aeroportoditorino.it/en/tofly/flights/departs-arrivals",
    embedMode: "unreliable",
  },
  {
    id: "marseille-provence-airport",
    code: "MRS",
    name: t("Marseille Provence Airport", "Aeroport Marseille Provence", "Aeroporto di Marsiglia Provenza", "Аеропорт Марсель Прованс"),
    summary: t("A large but distant western backup for a particularly useful direct flight.", "Une grande solution de repli a l'ouest pour un vol direct particulierement utile, mais lointaine.", "Una grande alternativa occidentale per un volo diretto particolarmente utile, ma distante.", "Великий, але далекий західний запасний варіант для особливо зручного прямого рейсу."),
    transportNote: t("Only consider it after comparing the extra transfer time and cost with Nice.", "Ne le considerez qu'apres comparaison du temps et du cout supplementaires avec Nice.", "Consideralo solo dopo aver confrontato tempo e costo aggiuntivi con Nizza.", "Розглядайте лише після порівняння додаткового часу й витрат на трансфер із Ніццою."),
    arrivalsUrl: "https://www.marseille-airport.com/flights-and-destinations/flights/todays-arrivals",
    departuresUrl: "https://www.marseille-airport.com/flights-and-destinations/flights/todays-departures",
    embedMode: "unreliable",
  },
];

export function getAirportLiveBoards(ids?: string[]) {
  if (!ids?.length) return airportLiveBoards;
  const requested = new Set(ids);
  return airportLiveBoards.filter((airport) => requested.has(airport.id));
}

import type { Locale } from "@/i18n/locales";

export type LocalizedText = Record<Locale, string>;
export type TransportOptionType = "walking" | "local-bus" | "navette" | "train" | "regional-bus" | "taxi";
export type TransportMode = "train" | "bus" | "taxi" | "car";
export type SourceStatus = "editorial" | "needs_verification";

export type TransportOption = {
  id: string;
  name: LocalizedText;
  type: TransportOptionType;
  bestFor: LocalizedText[];
  note: LocalizedText;
  sourceStatus: SourceStatus;
};

export type DestinationTransport = {
  id: string;
  destination: LocalizedText;
  options: {
    mode: TransportMode;
    timeLabel: LocalizedText;
    note: LocalizedText;
    sourceStatus: SourceStatus;
  }[];
  practicalNote: LocalizedText;
};

const t = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });

export const transportOptionLabels: Record<TransportOptionType, LocalizedText> = {
  walking: t("Walking", "A pied", "A piedi", "Пішки"),
  "local-bus": t("Local buses", "Bus locaux", "Autobus locali", "Місцеві автобуси"),
  navette: t("Free city navette", "Navette gratuite", "Navetta gratuita", "Безкоштовний міський шатл"),
  train: t("Regional trains", "Trains regionaux", "Treni regionali", "Регіональні потяги"),
  "regional-bus": t("Regional buses", "Bus regionaux", "Autobus regionali", "Регіональні автобуси"),
  taxi: t("Taxis and ride-hailing", "Taxis et VTC", "Taxi e ride-hailing", "Таксі та сервіси виклику авто"),
};

export const transportModeLabels: Record<TransportMode, LocalizedText> = {
  train: t("Train", "Train", "Treno", "Потяг"),
  bus: t("Bus", "Bus", "Autobus", "Автобус"),
  taxi: t("Taxi", "Taxi", "Taxi", "Таксі"),
  car: t("Taxi / car", "Taxi / voiture", "Taxi / auto", "Таксі / авто"),
};

export const transportOptions: TransportOption[] = [
  {
    id: "walking",
    name: transportOptionLabels.walking,
    type: "walking",
    bestFor: [t("old town", "vieille ville", "centro storico", "старе місто"), t("seafront", "front de mer", "lungomare", "набережна"), t("beaches", "plages", "spiagge", "пляжі"), t("market and cafes", "marche et cafes", "mercato e caffe", "ринок і кав'ярні")],
    note: t("Menton is linear and walkable along the sea, with the promenade as the easiest orientation line.", "Menton est lineaire et se parcourt facilement le long de la mer, avec la promenade comme repere principal.", "Mentone e lineare e facile da percorrere lungo il mare, con il lungomare come riferimento principale.", "Ментон лінійний і зручний уздовж моря, а набережна є найпростішою лінією орієнтації."),
    sourceStatus: "editorial",
  },
  {
    id: "local-buses",
    name: transportOptionLabels["local-bus"],
    type: "local-bus",
    bestFor: [t("neighbourhoods", "quartiers", "quartieri", "райони"), t("residential areas", "zones residentielles", "zone residenziali", "житлові райони"), t("nearby villages", "villages proches", "borghi vicini", "найближчі села")],
    note: t("Local buses are useful beyond the central seafront. Operator names, routes and schedules should be checked before relying on a trip.", "Les bus locaux sont utiles au-dela du front de mer central. Operateurs, lignes et horaires doivent etre verifies avant de planifier.", "Gli autobus locali sono utili oltre il lungomare centrale. Operatori, linee e orari vanno verificati prima di pianificare.", "Місцеві автобуси корисні поза центральною набережною. Оператора, маршрути й розклад варто перевіряти перед поїздкою."),
    sourceStatus: "needs_verification",
  },
  {
    id: "free-navette",
    name: transportOptionLabels.navette,
    type: "navette",
    bestFor: [t("station links", "liaisons gare", "collegamenti stazione", "зв'язок із вокзалом"), t("central stops", "arrets centraux", "fermate centrali", "центральні зупинки"), t("port areas", "zones portuaires", "zone porto", "портові райони")],
    note: t("Menton has operated a free electric shuttle/navette linking key central points. Check current stops and operating hours locally.", "Menton a exploite une navette electrique gratuite reliant des points centraux. Verifiez les arrets et horaires actuels sur place.", "Mentone ha utilizzato una navetta elettrica gratuita tra punti centrali. Controlla fermate e orari aggiornati sul posto.", "У Ментоні працював безкоштовний електричний шатл між ключовими центральними точками. Перевіряйте актуальні зупинки й години на місці."),
    sourceStatus: "needs_verification",
  },
  {
    id: "regional-trains",
    name: transportOptionLabels.train,
    type: "train",
    bestFor: [t("Monaco", "Monaco", "Monaco", "Монако"), t("Nice", "Nice", "Nizza", "Ніцца"), t("Ventimiglia", "Vintimille", "Ventimiglia", "Вентімілья"), t("coastal day trips", "excursions cotieres", "gite costiere", "поїздки узбережжям")],
    note: t("Regional trains are often the most practical option along the Riviera, especially when traffic or events make roads slower.", "Les trains regionaux sont souvent l'option la plus pratique sur la Riviera, surtout quand trafic ou evenements ralentissent la route.", "I treni regionali sono spesso l'opzione piu pratica lungo la Riviera, soprattutto quando traffico o eventi rallentano le strade.", "Регіональні потяги часто найпрактичніші на Рив'єрі, особливо коли трафік або події сповільнюють дороги."),
    sourceStatus: "needs_verification",
  },
  {
    id: "regional-buses",
    name: transportOptionLabels["regional-bus"],
    type: "regional-bus",
    bestFor: [t("lower-cost routes", "trajets economiques", "percorsi economici", "дешевші маршрути"), t("coastal scenery", "route cotiere", "panorami costieri", "краєвиди узбережжя"), t("Monaco and Nice links", "liaisons Monaco et Nice", "collegamenti Monaco e Nizza", "сполучення з Монако й Ніццою")],
    note: t("Regional bus lines connect Menton with Monaco and Nice; route numbers and timetables should be checked before travel.", "Des lignes de bus regionales relient Menton a Monaco et Nice; numeros de lignes et horaires doivent etre verifies avant le depart.", "Linee bus regionali collegano Mentone con Monaco e Nizza; numeri e orari vanno controllati prima di partire.", "Регіональні автобуси з'єднують Ментон із Монако та Ніццою; номери маршрутів і розклад треба перевіряти перед поїздкою."),
    sourceStatus: "needs_verification",
  },
  {
    id: "taxi",
    name: transportOptionLabels.taxi,
    type: "taxi",
    bestFor: [t("late arrivals", "arrivees tardives", "arrivi tardi", "пізні прибуття"), t("luggage", "bagages", "bagagli", "багаж"), t("airport transfers", "transferts aeroport", "transfer aeroporto", "трансфер з аеропорту"), t("late returns", "retours tardifs", "rientri tardi", "пізні повернення")],
    note: t("Taxis and ride-hailing are usually more expensive than buses or trains, but can make sense for luggage, late hours or routes with low frequency.", "Taxis et VTC sont generalement plus chers que bus ou trains, mais utiles avec bagages, horaires tardifs ou lignes peu frequentes.", "Taxi e ride-hailing sono di solito piu costosi di bus o treni, ma utili con bagagli, orari tardi o linee poco frequenti.", "Таксі та сервіси виклику авто зазвичай дорожчі за автобуси чи потяги, але зручні з багажем, пізно ввечері або на рідкісних маршрутах."),
    sourceStatus: "editorial",
  },
];

export const destinationTransport: DestinationTransport[] = [
  {
    id: "monaco",
    destination: t("Menton to Monaco", "Menton a Monaco", "Da Mentone a Monaco", "Ментон - Монако"),
    options: [
      { mode: "train", timeLabel: t("usually fastest", "souvent le plus rapide", "di solito piu veloce", "зазвичай найшвидше"), note: t("Often one of the simplest options, especially during busy event periods.", "Souvent l'une des options les plus simples, surtout pendant les periodes d'evenements.", "Spesso una delle opzioni piu semplici, soprattutto durante eventi affollati.", "Часто один із найпростіших варіантів, особливо під час великих подій."), sourceStatus: "needs_verification" },
      { mode: "bus", timeLabel: t("often slower", "souvent plus lent", "spesso piu lento", "часто повільніше"), note: t("Coastal and scenic, but route numbers and schedules should be checked.", "Cotiere et panoramique, mais lignes et horaires sont a verifier.", "Costiera e panoramica, ma linee e orari vanno controllati.", "Мальовничий маршрут узбережжям, але номери й розклад треба перевіряти."), sourceStatus: "needs_verification" },
      { mode: "car", timeLabel: t("traffic-dependent", "selon trafic", "dipende dal traffico", "залежить від трафіку"), note: t("Fast in light traffic, but events and congestion can change access.", "Rapide si trafic fluide, mais evenements et bouchons changent l'acces.", "Veloce con poco traffico, ma eventi e congestione cambiano l'accesso.", "Швидко за легкого трафіку, але події й затори змінюють доступ."), sourceStatus: "needs_verification" },
    ],
    practicalNote: t("During Monaco Grand Prix and major Monaco weekends, plan transport and access early.", "Pendant le Grand Prix et les grands week-ends a Monaco, prevoyez transport et acces tot.", "Durante il Grand Prix e i grandi weekend a Monaco, pianifica trasporti e accesso in anticipo.", "Під час Гран-прі Монако та великих вікендів плануйте транспорт і доступ заздалегідь."),
  },
  {
    id: "nice",
    destination: t("Menton to Nice", "Menton a Nice", "Da Mentone a Nizza", "Ментон - Ніцца"),
    options: [
      { mode: "train", timeLabel: t("often most convenient", "souvent le plus pratique", "spesso piu comodo", "часто найзручніше"), note: t("Good for museums, events, Jazz Fest, Carnival and airport access planning.", "Pratique pour musees, evenements, Jazz Fest, Carnaval et acces aeroport.", "Comodo per musei, eventi, Jazz Fest, Carnevale e accesso aeroporto.", "Зручно для музеїв, подій, Jazz Fest, Карнавалу й планування аеропорту."), sourceStatus: "needs_verification" },
      { mode: "bus", timeLabel: t("usually longer", "generalement plus long", "di solito piu lungo", "зазвичай довше"), note: t("Possible, but usually less direct for most day-trip plans.", "Possible, mais souvent moins direct pour la plupart des excursions.", "Possibile, ma spesso meno diretto per molte gite.", "Можливо, але часто менш прямо для більшості поїздок."), sourceStatus: "needs_verification" },
    ],
    practicalNote: t("For evening events in Nice, check the return before you go.", "Pour les evenements du soir a Nice, verifiez le retour avant de partir.", "Per eventi serali a Nizza, controlla il rientro prima di partire.", "Для вечірніх подій у Ніцці перевірте повернення заздалегідь."),
  },
  {
    id: "ventimiglia",
    destination: t("Menton to Ventimiglia / Italy", "Menton a Vintimille / Italie", "Da Mentone a Ventimiglia / Italia", "Ментон - Вентімілья / Італія"),
    options: [
      { mode: "train", timeLabel: t("usually simplest", "souvent le plus simple", "di solito piu semplice", "зазвичай найпростіше"), note: t("A practical choice for markets, Italian food and a short cross-border trip.", "Pratique pour marches, cuisine italienne et courte sortie transfrontaliere.", "Pratico per mercati, cibo italiano e breve uscita oltre confine.", "Практично для ринків, італійської їжі й короткої поїздки через кордон."), sourceStatus: "needs_verification" },
      { mode: "bus", timeLabel: t("less central", "moins central", "meno centrale", "менш центрально"), note: t("Possible, but often less central for guests staying near the seafront.", "Possible, mais souvent moins central pour les clients pres du front de mer.", "Possibile, ma spesso meno centrale per chi soggiorna vicino al mare.", "Можливо, але часто менш зручно для гостей біля набережної."), sourceStatus: "needs_verification" },
    ],
    practicalNote: t("Check current train schedules before planning a market visit.", "Verifiez les horaires de train actuels avant une visite au marche.", "Controlla gli orari dei treni prima di pianificare il mercato.", "Перед поїздкою на ринок перевірте актуальний розклад потягів."),
  },
  {
    id: "villages",
    destination: t("Menton to nearby villages / mountains", "Menton vers villages proches / montagnes", "Da Mentone a borghi vicini / montagne", "Ментон - найближчі села / гори"),
    options: [
      { mode: "bus", timeLabel: t("limited frequency", "frequence limitee", "frequenza limitata", "обмежена частота"), note: t("Local and regional buses may serve places such as Castellar, Sospel and Sainte-Agnès. Check return times.", "Des bus locaux et regionaux peuvent desservir Castellar, Sospel et Sainte-Agnes. Verifiez les retours.", "Bus locali e regionali possono servire Castellar, Sospel e Sainte-Agnès. Controlla i rientri.", "Місцеві та регіональні автобуси можуть їхати до Castellar, Sospel і Sainte-Agnès. Перевіряйте повернення."), sourceStatus: "needs_verification" },
      { mode: "taxi", timeLabel: t("useful backup", "solution utile", "utile alternativa", "корисний запасний варіант"), note: t("Consider a taxi when bus frequency is low, especially with children or luggage.", "Envisagez taxi si la frequence bus est faible, surtout avec enfants ou bagages.", "Valuta taxi se la frequenza bus e bassa, soprattutto con bambini o bagagli.", "Розгляньте таксі, якщо автобуси ходять рідко, особливо з дітьми чи багажем."), sourceStatus: "editorial" },
    ],
    practicalNote: t("Plan hill-village returns before you leave Menton.", "Planifiez le retour des villages avant de quitter Menton.", "Pianifica il ritorno dai borghi prima di lasciare Mentone.", "Повернення з гірських сіл плануйте ще до виїзду з Ментона."),
  },
];

export const transportDecision = [
  {
    mode: "train" as const,
    chooseIf: [
      t("going to Monaco, Nice or Ventimiglia", "vous allez a Monaco, Nice ou Vintimille", "vai a Monaco, Nizza o Ventimiglia", "їдете до Монако, Ніцци чи Вентімільї"),
      t("avoiding traffic", "vous voulez eviter le trafic", "vuoi evitare il traffico", "хочете уникнути трафіку"),
      t("travelling during daytime", "vous voyagez en journee", "viaggi di giorno", "подорожуєте вдень"),
    ],
  },
  {
    mode: "bus" as const,
    chooseIf: [
      t("you want a lower-cost route", "vous cherchez un trajet economique", "cerchi un percorso economico", "потрібен бюджетніший маршрут"),
      t("you are comfortable with longer journeys", "un trajet plus long vous convient", "accetti tempi piu lunghi", "вам підходить довша дорога"),
      t("the line matches your destination", "la ligne dessert votre destination", "la linea serve la destinazione", "маршрут підходить до вашої локації"),
    ],
  },
  {
    mode: "taxi" as const,
    chooseIf: [
      t("arriving late", "vous arrivez tard", "arrivi tardi", "прибуваєте пізно"),
      t("travelling with luggage", "vous voyagez avec bagages", "viaggi con bagagli", "їдете з багажем"),
      t("returning after regular services", "vous rentrez apres les services reguliers", "rientri dopo i servizi regolari", "повертаєтеся після регулярного транспорту"),
      t("going to areas with low bus frequency", "vous allez dans des zones peu desservies", "vai in zone con pochi bus", "їдете туди, де автобуси ходять рідко"),
    ],
  },
];

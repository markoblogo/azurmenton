import type { Place } from "./places";

const t = (en: string, fr: string, it: string, uk: string) => ({ en, fr, it, uk });
const guide = "maigret-liberty-bar-antibes-cannes";
const illustration = (name: string) => t(`Supplied artistic illustration of ${name}; not a documentary photograph or a verified Liberty Bar scene`, `Illustration artistique fournie de ${name} ; ni photographie documentaire ni scène vérifiée de Liberty Bar`, `Illustrazione artistica fornita di ${name}; non fotografia documentaria o scena verificata di Liberty Bar`, `Надана художня ілюстрація ${name}; не документальна фотографія чи перевірена сцена Liberty Bar`);
const maps = (name: string, town: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name}, ${town}, France`)}`;

export const maigretPlaces: Place[] = [
  {
    id: "antibes-station", name: "Gare d'Antibes", type: "station", area: t("Antibes", "Antibes", "Antibes", "Антиб"),
    image: "/images/guide/antibes-station.png", imageAlt: illustration("Gare d'Antibes"),
    googleMapsSearchUrl: maps("Gare SNCF", "Antibes"), programmeUrl: "https://www.sncf-connect.com/en-en/train/timetables/menton/antibes",
    sourceStatus: "editorial", requiresMapReview: true,
    shortNote: t("Practical railway arrival for the literary walk, not an unchanged 1932 set. Check actual trains and passenger access; no platform or step-free guarantee.", "Arrivée ferroviaire pratique, pas un décor de 1932 intact. Vérifiez trains et accès voyageurs ; aucun quai ni accès sans marches garanti.", "Arrivo ferroviario pratico, non set del 1932 intatto. Verifica treni e accessi; nessuna garanzia di binario o percorso senza gradini.", "Практичний початок від вокзалу, не незмінні декорації 1932 року. Перевірте потяги й доступ; платформа та шлях без сходів не гарантовані."),
    bestFor: [t("Train arrivals", "Arrivée en train", "Arrivo in treno", "Приїзд потягом")], relatedArticleIds: [guide, "day-trips-from-menton"],
  },
  {
    id: "vieil-antibes", name: "Vieil Antibes", type: "neighbourhood", area: t("Antibes", "Antibes", "Antibes", "Антиб"),
    image: "/images/guide/vieil-antibes.png", imageAlt: illustration("Vieil Antibes"),
    googleMapsSearchUrl: maps("Vieil Antibes", "Antibes"), programmeUrl: "https://www.antibes-juanlespins.com/decouvrir-antibes/cartes-postales-dhier-et-aujourdhui",
    sourceStatus: "editorial",
    shortNote: t("Historic streets and everyday town life: a thematic stop, not a verified doorway from Liberty Bar. Use public streets and respect residents.", "Rues historiques et vie quotidienne : étape thématique, pas une porte vérifiée du roman. Restez sur les rues publiques et respectez les habitants.", "Strade storiche e vita quotidiana: tappa tematica, non porta verificata del romanzo. Usa vie pubbliche e rispetta chi abita qui.", "Історичні вулиці й повсякденне місто: тематична зупинка, не перевірені двері роману. Гуляйте громадськими вулицями й поважайте мешканців."),
    bestFor: [t("Historic streets", "Rues historiques", "Strade storiche", "Історичні вулиці")], relatedArticleIds: [guide],
  },
  {
    id: "port-vauban-antibes", name: "Port Vauban", type: "port", area: t("Antibes", "Antibes", "Antibes", "Антиб"),
    image: "/images/guide/port-vauban-antibes.png", imageAlt: illustration("Port Vauban"),
    googleMapsSearchUrl: maps("Port Vauban", "Antibes"), programmeUrl: "https://leportvauban.com/en/parking-at-port-vauban/",
    sourceStatus: "editorial", requiresMapReview: true,
    shortNote: t("Modern marina and maritime work beside the old town; thematic comparison, not a confirmed novel scene. Public areas only; docks and working zones may be restricted.", "Marina moderne et travail maritime près de la vieille ville : comparaison thématique, pas scène confirmée. Espaces publics seulement ; pontons et zones de travail parfois réservés.", "Marina moderna e lavoro marittimo accanto al centro: confronto tematico, non scena confermata. Solo aree pubbliche; pontili e zone operative possono essere riservati.", "Сучасна марина й морська праця біля старого міста: тематичне порівняння, не підтверджена сцена. Лише громадські зони; понтони й робочі ділянки можуть бути закриті."),
    bestFor: [t("Harbour contrasts", "Contrastes du port", "Contrasti del porto", "Портові контрасти")], relatedArticleIds: [guide, "day-trips-from-menton"],
  },
  {
    id: "la-croisette-cannes", name: "La Croisette", type: "walk", area: t("Cannes", "Cannes", "Cannes", "Канни"),
    image: "/images/guide/la-croisette-cannes.png", imageAlt: illustration("La Croisette"),
    googleMapsSearchUrl: maps("Boulevard de la Croisette", "Cannes"), programmeUrl: "https://www.cannes-france.com/app/uploads/cannes-tourisme/2024/01/PLAN-PEDESTRE.pdf",
    sourceStatus: "editorial",
    shortNote: t("Public seafront and luxury-hotel context, not an exact Liberty Bar scene. Modern development and the post-war film festival differ from the 1932 setting. Check event restrictions.", "Front de mer public et contexte hôtelier, pas scène exacte. Aménagements modernes et festival d'après-guerre diffèrent de 1932. Vérifiez les restrictions événementielles.", "Lungomare pubblico e contesto alberghiero, non scena esatta. Sviluppo moderno e festival del dopoguerra differiscono dal 1932. Controlla restrizioni per eventi.", "Громадська набережна й готельний контекст, не точна сцена. Сучасні зміни й повоєнний фестиваль відрізняються від 1932 року. Перевірте обмеження подій."),
    bestFor: [t("Seafront walk", "Promenade en bord de mer", "Passeggiata sul mare", "Прогулянка набережною")], relatedArticleIds: [guide],
  },
  {
    id: "rue-meynadier-cannes", name: "Rue Meynadier", type: "walk", area: t("Cannes", "Cannes", "Cannes", "Канни"),
    image: "/images/guide/rue-meynadier-cannes.png", imageAlt: illustration("Rue Meynadier"),
    googleMapsSearchUrl: maps("Rue Meynadier", "Cannes"), programmeUrl: "https://www.cannes-france.com/app/uploads/cannes-tourisme/2024/01/PLAN-PEDESTRE.pdf",
    sourceStatus: "editorial",
    shortNote: t("Pedestrian shopping street towards Le Suquet: everyday-life context, not the verified address of Jaja's fictional bar. Individual shop hours vary.", "Rue commerçante piétonne vers Le Suquet : contexte quotidien, pas adresse vérifiée du bar fictif de Jaja. Horaires propres à chaque commerce.", "Via commerciale pedonale verso Le Suquet: contesto quotidiano, non indirizzo verificato del bar di Jaja. Orari dei negozi variabili.", "Пішохідна торгова вулиця до Сюке: повсякденний контекст, не перевірена адреса бару Жажі. Крамниці мають власні години."),
    bestFor: [t("Everyday Cannes", "Cannes au quotidien", "Cannes quotidiana", "Повсякденні Канни")], relatedArticleIds: [guide],
  },
  {
    id: "vieux-port-cannes", name: "Vieux Port de Cannes", type: "port", area: t("Cannes", "Cannes", "Cannes", "Канни"),
    image: "/images/guide/vieux-port-cannes.png", imageAlt: illustration("Vieux Port de Cannes"),
    googleMapsSearchUrl: maps("Vieux Port", "Cannes"), programmeUrl: "https://www.cannes-france.com/decouvrir-visiter/quartiers/le-vieux-port/",
    sourceStatus: "editorial", requiresMapReview: true,
    shortNote: t("Historic maritime setting below Le Suquet, not the established site of Liberty Bar. Follow permitted waterfront routes; events, works and marina security can limit access.", "Cadre maritime historique sous Le Suquet, pas emplacement établi du Liberty Bar. Suivez les quais autorisés ; événements, travaux et sécurité peuvent limiter l'accès.", "Contesto marittimo storico sotto Le Suquet, non sito accertato di Liberty Bar. Segui percorsi autorizzati; eventi, lavori e sicurezza possono limitare accessi.", "Історичний морський простір під Сюке, не встановлене місце Liberty Bar. Дозволені набережні; події, роботи й охорона можуть обмежити доступ."),
    bestFor: [t("Harbour pause", "Pause au port", "Pausa al porto", "Пауза біля порту")], relatedArticleIds: [guide],
  },
  {
    id: "le-suquet-cannes", name: "Le Suquet", type: "neighbourhood", area: t("Cannes", "Cannes", "Cannes", "Канни"),
    image: "/images/guide/le-suquet-cannes.png", imageAlt: illustration("Le Suquet"),
    googleMapsSearchUrl: maps("Le Suquet", "Cannes"), programmeUrl: "https://en.cannes-france.com/discover-visit/disctricts/the-suquet/",
    sourceStatus: "editorial",
    shortNote: t("Historic hillside quarter: thematic extension, not a located fictional bar. Slopes and steps; staying by the port is an alternative. No step-free or museum-entry promise.", "Quartier historique en hauteur : prolongement thématique, pas bar fictif localisé. Pentes et marches ; alternative près du port. Ni accès sans marches ni musée promis.", "Quartiere storico in salita: estensione tematica, non bar localizzato. Pendenze e gradini; alternativa al porto. Nessuna promessa senza gradini o ingresso museale.", "Історичний квартал на пагорбі: тематичне продовження, не знайдений вигаданий бар. Схили й сходи; можна лишитися біля порту. Без обіцянок безсходинкового доступу чи музею."),
    bestFor: [t("Historic hillside", "Quartier historique en hauteur", "Quartiere storico collinare", "Історичний пагорб")], relatedArticleIds: [guide, "day-trips-from-menton"],
  },
];

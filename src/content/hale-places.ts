import type { Place } from "./places";

const t = (en: string, fr: string, it: string, uk: string) => ({ en, fr, it, uk });
const guide = "julian-hale-french-riviera-cultural-history";

export const halePlaces: Place[] = [
  {
    id: "trophee-auguste-la-turbie", name: "Trophée d'Auguste", type: "museum",
    image: "/images/guide/trophee-auguste-la-turbie.png",
    imageAlt: t("Project illustration representing the restored Trophy of Augustus at La Turbie; not an exact architectural record or evidence of current access", "Illustration du Trophée d'Auguste restauré à La Turbie ; ni relevé architectural exact ni preuve d'accès actuel", "Illustrazione del Trofeo di Augusto restaurato a La Turbie; non rilievo architettonico esatto né prova di accesso attuale", "Ілюстрація реставрованого Трофея Августа в Ла-Тюрбі; не точний архітектурний запис чи доказ нинішнього доступу"),
    address: "Cours Albert 1er, 06320 La Turbie",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Trophee%20Auguste%20Cours%20Albert%201er%20La%20Turbie",
    programmeUrl: "https://www.trophee-auguste.fr/visiter/informations-pratiques",
    sourceStatus: "editorial", requiresMapReview: true,
    openingHoursLabel: t("September–April: 10–13 / 14–17, closed Mondays and specified holidays, including 11 November", "Septembre–avril : 10 h–13 h / 14 h–17 h, fermé lundi et certains jours fériés dont le 11 novembre", "Settembre–aprile: 10–13 / 14–17, chiuso lunedì e festività indicate, compreso 11 novembre", "Вересень–квітень: 10–13 / 14–17, вихідний понеділок і зазначені свята, зокрема 11 листопада"),
    priceLabel: t("Individual adult €7; recheck date and concessions", "Adulte individuel 7 € ; revérifier date et réductions", "Adulto individuale 7 €; ricontrolla data e riduzioni", "Індивідуальний дорослий 7 €; уточніть дату та пільги"),
    shortNote: t("Roman remains with later restoration, museum and park above Monaco. Checked 4 November 2026: last admission 30 minutes before closing. Plan return transport separately; no verified step-free route or precise map marker.", "Vestiges romains et restaurations ultérieures, musée et parc au-dessus de Monaco. Vérifié le 4 novembre 2026 : dernier accès 30 min avant fermeture. Préparer le retour ; ni parcours sans marches ni point précis vérifiés.", "Resti romani con restauri successivi, museo e parco sopra Monaco. Verificato il 4 novembre 2026: ultimo ingresso 30 minuti prima della chiusura. Organizza il ritorno; percorso senza gradini e punto preciso non verificati.", "Римські залишки з пізнішими реставраціями, музей і парк над Монако. Перевірено 4 листопада 2026: вхід за 30 хв до закриття. Плануйте повернення окремо; шлях без сходів і точну позначку не перевірено."),
    bestFor: [t("Roman history and views", "Histoire romaine et panoramas", "Storia romana e panorami", "Римська історія й панорами")],
    visitRules: { conditions: [{ checkedOn: "2026-11-04", sourceUrl: "https://www.trophee-auguste.fr/visiter/informations-pratiques", value: t("Closed 11 November; last admission 30 minutes before closing", "Fermé le 11 novembre ; dernier accès 30 min avant fermeture", "Chiuso 11 novembre; ultimo ingresso 30 minuti prima della chiusura", "Закрито 11 листопада; останній вхід за 30 хвилин до закриття") }] },
    relatedArticleIds: [guide],
  },
  {
    id: "cathedrale-saint-nicolas-nice", name: "Cathédrale Saint-Nicolas de Nice", type: "museum",
    image: "/images/guide/cathedrale-saint-nicolas-nice.png",
    imageAlt: t("Project illustration representing Nice's Saint-Nicolas Orthodox Cathedral; not a verified facade survey, current visitor photograph or accessibility assessment", "Illustration de la cathédrale orthodoxe Saint-Nicolas à Nice ; ni relevé de façade vérifié, photo actuelle de visite ou audit d'accessibilité", "Illustrazione della cattedrale ortodossa Saint-Nicolas di Nizza; non rilievo verificato, foto attuale o valutazione di accessibilità", "Ілюстрація православного собору Saint-Nicolas у Ніцці; не перевірена зйомка фасаду, актуальне фото відвідування чи оцінка доступності"),
    address: "Avenue Nicolas II, 06000 Nice",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Cathedrale%20Saint%20Nicolas%20Avenue%20Nicolas%20II%20Nice",
    programmeUrl: "https://sobor.fr/index.php?content=visitors&lang=fr",
    sourceStatus: "editorial", requiresMapReview: true,
    openingHoursLabel: t("Tourist access excludes Sunday 9–12, weekday services and sacraments; use the operator's schedule", "Visites exclues dimanche 9 h–12 h, offices de semaine et sacrements ; consulter l'opérateur", "Visite escluse domenica 9–12, funzioni feriali e sacramenti; consulta l'operatore", "Туристам недоступно в неділю 9–12, під час буденних служб і таїнств; дивіться розклад оператора"),
    shortNote: t("Active Orthodox place of worship with visitor arrangements, not an unrestricted museum. Checked 4 November 2026: operator's October schedule overrides unreliable Google hours. Group and historic chapel visits require arrangements; respect posted rules. No step-free assessment.", "Lieu de culte orthodoxe avec accueil des visiteurs, pas un musée librement accessible. Vérifié le 4 novembre 2026 : horaire d'octobre de l'opérateur plutôt que Google. Groupes et chapelle historique sur organisation préalable ; respecter les règles. Pas d'audit sans marches.", "Luogo di culto ortodosso con visite, non museo ad accesso libero. Verificato il 4 novembre 2026: orari di ottobre dell'operatore, non Google. Gruppi e cappella storica richiedono accordi; rispetta le regole. Nessuna valutazione senza gradini.", "Чинний православний храм із порядком відвідування, не музей із необмеженим входом. Перевірено 4 листопада 2026: жовтневий розклад оператора, не Google. Групи й історична каплиця потребують погодження; дотримуйтеся правил. Доступ без сходів не оцінено."),
    bestFor: [t("Religious architecture and cultural history", "Architecture religieuse et histoire culturelle", "Architettura religiosa e storia culturale", "Сакральна архітектура й культурна історія")],
    visitRules: { conditions: [{ checkedOn: "2026-11-04", sourceUrl: "https://sobor.fr/index.php?content=visitors&lang=fr", value: t("No tourist visits Sunday 9–12 or during services and sacraments", "Pas de visites dimanche 9 h–12 h ni pendant offices et sacrements", "Niente visite domenica 9–12 o durante funzioni e sacramenti", "Немає туристичних відвідувань у неділю 9–12 або під час служб і таїнств") }] },
    relatedArticleIds: [guide],
  },
];

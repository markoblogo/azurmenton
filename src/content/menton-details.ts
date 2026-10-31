import type { Locale } from "@/i18n/locales";

type Text=Record<Locale,string>;
const t=(en:string,fr:string,it:string,uk:string):Text=>({en,fr,it,uk});
export const mentonDetails = [{
  id:"cocteau-wedding-room",
  placeId:"salle-des-mariages-jean-cocteau",
  guideSlug:"jean-cocteau-menton-walking-route",
  checkedOn:"2026-10-30",
  sourceUrl:"https://portail-savoirs.departement06.fr/annuaire-general/la-salle-des-mariages-de-lhotel-de-ville-de-menton-par-jean-cocteau",
  title:t("A wedding room designed as a whole work of art","Une salle des mariages conçue comme une œuvre totale","Una sala per matrimoni concepita come opera d'arte totale","Весільна зала як цілісний мистецький твір"),
  paragraphs:[
    t("Inside Menton's town hall, the interesting detail is not just a painting. The departmental arts resource describes the wedding room as a complete work conceived by Jean Cocteau, from the murals to the furniture. He worked on the decoration in 1957–1958. Look at how the room works together, rather than treating each wall as a separate picture.","À l'hôtel de ville de Menton, le détail intéressant n'est pas simplement une peinture. Le portail artistique du Département décrit la salle des mariages comme une œuvre totale conçue par Jean Cocteau, des fresques au mobilier. Il en réalise le décor en 1957–1958. Regardez leurs correspondances plutôt que chaque mur comme un tableau isolé.","Nel municipio di Mentone, il dettaglio interessante non è soltanto un dipinto. La risorsa artistica del Dipartimento descrive la sala dei matrimoni come un'opera totale concepita da Jean Cocteau, dagli affreschi agli arredi. La decorazione risale al 1957–1958. Osserva il rapporto tra gli elementi, non ogni parete come un quadro separato.","У мерії Ментона цікава деталь — не лише розпис. Мистецький портал департаменту описує весільну залу як цілісний твір Жана Кокто: від фресок до меблів. Він працював над декором у 1957–1958 роках. Придивіться до взаємозв'язку елементів, а не сприймайте кожну стіну як окрему картину."),
    t("This is a working municipal room, not a promise of unrestricted museum access. Check the current visiting arrangements before making it the centre of your day. The larger Cocteau walk connects it with the waterfront and the separate Bastion museum; the Wunderman museum remains an exterior-only stop.","C'est une salle municipale en activité, pas un musée garanti en accès libre. Vérifiez les modalités de visite avant d'organiser votre journée autour d'elle. La promenade Cocteau la relie au front de mer et au musée distinct du Bastion ; le musée Wunderman reste une étape extérieure uniquement.","È una sala comunale in uso, non un museo con accesso libero garantito. Verifica le modalità di visita prima di organizzare la giornata attorno ad essa. La passeggiata Cocteau la collega al lungomare e al distinto museo Bastion; il museo Wunderman rimane una tappa solo esterna.","Це діюча муніципальна зала, а не музей із гарантованим вільним доступом. Перевірте умови відвідування, перш ніж будувати навколо неї день. Прогулянка Кокто поєднує її з набережною та окремим музеєм Bastion; музей Wunderman залишається зупинкою лише для огляду зовні."),
  ],
}, {
  id: "halles-ceramic-facade",
  placeId: "halles-du-marche",
  guideSlug: "halles-du-marche-menton",
  checkedOn: "2026-10-31",
  sourceUrl: "https://www.menton-riviera-merveilles.fr/menton-et-le-littoral/nos-incontournables/marche-des-halles/",
  title: t("Look above the stalls: the Halles facade", "Au-dessus des étals : la façade des Halles", "Sopra i banchi: la facciata delle Halles", "Над ятками: фасад Halles"),
  paragraphs: [
    t("Before going inside, look for 1898 on the pediment. The tourist office credits architect Adrien Rey and Menton's Saïssi manufacture for the building's colourful brick-and-ceramic decoration.", "Avant d'entrer, cherchez 1898 sur le fronton. L'office de tourisme attribue à l'architecte Adrien Rey et à la manufacture mentonnaise Saïssi le décor coloré de briques et de céramiques.", "Prima di entrare, cerca 1898 sul frontone. L'ufficio turistico attribuisce all'architetto Adrien Rey e alla manifattura mentonasca Saïssi la decorazione colorata in mattoni e ceramica.", "Перед входом знайдіть 1898 на фронтоні. Туристичний офіс пов'язує барвистий цегляно-керамічний декор з архітектором Adrien Rey та ментонською мануфактурою Saïssi."),
    t("Make this a short looking stop before your market walk, rather than a separate attraction to book. Check the current market arrangements in the linked guide; a view of the facade does not establish access conditions inside.", "Faites-en une courte pause d'observation avant votre promenade au marché, plutôt qu'une attraction distincte à réserver. Consultez les informations pratiques du guide ; voir la façade ne garantit pas les conditions d'accès intérieur.", "Considerala una breve sosta di osservazione prima della passeggiata al mercato, non un'attrazione separata da prenotare. Consulta le informazioni pratiche nella guida: vedere la facciata non garantisce le condizioni di accesso all'interno.", "Зробіть тут коротку зупинку перед прогулянкою ринком, а не окремий атракціон для бронювання. Уточніть практичні умови в пов'язаному гіді: огляд фасаду не підтверджує доступність приміщень."),
  ],
}, {
  id: "fontana-rosa-ceramic-garden",
  placeId: "jardin-fontana-rosa-menton",
  guideSlug: "the-houses-that-remember-riviera-book-route",
  checkedOn: "2026-10-31",
  sourceUrl: "https://pop.culture.gouv.fr/notice/merimee/PA00080766",
  title: t("Fontana Rosa: a literary garden in ceramics", "Fontana Rosa : un jardin littéraire en céramique", "Fontana Rosa: un giardino letterario in ceramica", "Fontana Rosa: літературний сад у кераміці"),
  paragraphs: [
    t("Fontana Rosa is a tribute to Vicente Blasco Ibáñez's favourite writers. The national heritage record identifies ceramic-covered benches and a Cervantes rotunda: the garden's literary theme extends into its furniture and architecture.", "Fontana Rosa rend hommage aux écrivains préférés de Vicente Blasco Ibáñez. La notice patrimoniale nationale mentionne des bancs revêtus de céramique et une rotonde de Cervantès : le thème littéraire se prolonge dans le mobilier et l'architecture.", "Fontana Rosa rende omaggio agli scrittori preferiti di Vicente Blasco Ibáñez. La scheda nazionale del patrimonio cita panchine rivestite di ceramica e una rotonda di Cervantes: il tema letterario entra negli arredi e nell'architettura.", "Fontana Rosa присвячений улюбленим письменникам Vicente Blasco Ibáñez. Національний реєстр спадщини згадує керамічні лави та ротонду Сервантеса: літературна тема переходить у меблі й архітектуру саду."),
    t("Look for those details if you join an authorised visit. A heritage listing is not an opening timetable or permission to enter; check current visiting arrangements before adding the garden to a Garavan walk.", "Repérez ces détails lors d'une visite autorisée. Une notice patrimoniale ne vaut ni horaires d'ouverture ni autorisation d'entrer ; vérifiez les modalités actuelles avant d'ajouter le jardin à une promenade à Garavan.", "Cerca questi dettagli durante una visita autorizzata. Una scheda patrimoniale non è un orario di apertura né un permesso di ingresso: verifica le visite attuali prima di aggiungere il giardino a una passeggiata a Garavan.", "Придивіться до цих деталей під час дозволеного відвідування. Запис у реєстрі спадщини — не розклад роботи й не дозвіл на вхід; перевірте умови, перш ніж додавати сад до прогулянки Гараваном."),
  ],
}];

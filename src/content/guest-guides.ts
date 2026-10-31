import { getApartment, type LocalizedText } from "./apartments";
import { apartmentSupportsParking } from "@/lib/booking-request";

const text = (en: string, fr: string, it: string, uk: string): LocalizedText => ({ en, fr, it, uk });

export const guestGuideCopy = {
  title: text("Your stay, step by step", "Votre séjour, étape par étape", "Il soggiorno, passo dopo passo", "Ваше перебування, крок за кроком"),
  link: text("Guest guide", "Guide de séjour", "Guida al soggiorno", "Путівник для гостей"),
  intro: text("Practical reading for this apartment, from arrival to departure. Confirm your personal arrangements with your host in your booking conversation.", "Les informations pratiques pour cet appartement, de l'arrivée au départ. Confirmez votre organisation personnelle avec votre hôte dans votre échange de réservation.", "Informazioni pratiche per questo appartamento, dall'arrivo alla partenza. Confermate gli accordi personali con l'host nella conversazione della prenotazione.", "Практична добірка для цих апартаментів, від прибуття до виїзду. Особисті домовленості підтверджуйте з господарями в листуванні щодо бронювання."),
  privacy: text("Public guide only. Access codes, key collection details and guest information are shared privately by your host, never on this page.", "Guide public uniquement. Codes d'accès, remise des clés et informations personnelles sont communiqués en privé par votre hôte, jamais sur cette page.", "Questa guida è pubblica. Codici di accesso, consegna delle chiavi e informazioni personali vengono comunicati privatamente dall'host, mai su questa pagina.", "Це відкритий путівник. Коди доступу, деталі отримання ключів і особисті дані господарі передають приватно, ніколи не на цій сторінці."),
  contact: text("Contact your host", "Contacter votre hôte", "Contatta l'host", "Зв'язатися з господарями"),
  apartment: text("Back to the apartment", "Retour à l'appartement", "Torna all'appartamento", "До сторінки апартаментів"),
  places: text("Central shopping options", "Commerces du centre", "Negozi in centro", "Магазини в центрі"),
  hours: text("Check current opening hours and the route from your confirmed arrival point. These are central options, not a ranking by walking distance.", "Vérifiez les horaires actuels et l'itinéraire depuis votre point d'arrivée confirmé. Ce sont des commerces du centre, pas un classement par distance à pied.", "Controllate orari aggiornati e percorso dal punto di arrivo confermato. Sono opzioni in centro, non una classifica per distanza a piedi.", "Перевірте актуальні години роботи й маршрут від узгодженої точки прибуття. Це варіанти в центрі, а не рейтинг за відстанню пішки."),
  parkingYes: text("Parking is by prior arrangement, subject to availability and possible charges. Confirm it with your host before arrival.", "Le parking se prévoit à l'avance, selon disponibilité et avec supplément éventuel. Confirmez-le avec votre hôte avant l'arrivée.", "Il parcheggio è su accordo preventivo, soggetto a disponibilità e possibili costi. Confermatelo con l'host prima dell'arrivo.", "Паркування узгоджується заздалегідь, залежить від наявності й може оплачуватися окремо. Підтвердьте його з господарями до прибуття."),
  parkingNo: text("This apartment has no parking. If arriving by car, plan public parking separately; do not expect an allocated space at the apartment.", "Cet appartement ne dispose pas de parking. Si vous venez en voiture, prévoyez un parking public séparément ; aucune place n'est attribuée avec l'appartement.", "Questo appartamento non dispone di parcheggio. Se arrivate in auto, organizzate separatamente il parcheggio pubblico; non è previsto un posto riservato presso l'appartamento.", "Ці апартаменти не мають паркінгу. Якщо прибуваєте автомобілем, окремо сплануйте міське паркування; закріпленого місця біля апартаментів немає."),
};

type GuestSection = {
  id: "arrival" | "check-in" | "shopping" | "first-evening" | "check-out";
  title: LocalizedText;
  body: LocalizedText;
  guideSlugs: string[];
  placeIds: string[];
};

export function getGuestGuide(slug: string) {
  const apartment = getApartment(slug);
  if (!apartment) return undefined;
  const family = slug === "beachside-family-apartment";
  const sections: GuestSection[] = [
    {
      id: "arrival",
      title: text("Arrival", "Arrivée", "Arrivo", "Прибуття"),
      body: text("Send your host your expected arrival time and whether you are coming by train, airport transfer or car. Use the confirmed meeting point, not a general building or neighbourhood pin. For late arrivals, agree the practical arrangements before travelling.", "Indiquez à votre hôte votre heure d'arrivée prévue et votre moyen de transport : train, transfert aéroport ou voiture. Utilisez le point de rendez-vous confirmé, pas un repère général du quartier. Pour une arrivée tardive, convenez de l'organisation avant le voyage.", "Comunicate all'host l'orario di arrivo previsto e se viaggiate in treno, transfer dall'aeroporto o auto. Usate il punto di incontro confermato, non un segnaposto generico del quartiere. Concordate eventuali arrivi tardivi prima di partire.", "Повідомте господарям орієнтовний час прибуття й вид транспорту: потяг, трансфер з аеропорту чи авто. Користуйтеся підтвердженою точкою зустрічі, а не загальною позначкою району. Пізнє прибуття узгодьте до подорожі."),
      guideSlugs: ["how-to-get-to-menton-from-nice-airport", "menton-without-a-car"], placeIds: [],
    },
    {
      id: "check-in",
      title: text("Check-in", "Installation", "Check-in", "Заселення"),
      body: text("Confirm the check-in time and key handover with your host in your booking conversation. Keep that conversation available when travelling. Tell your host about delays; this guide does not promise early check-in, unattended access or luggage storage.", "Confirmez l'heure d'installation et la remise des clés avec votre hôte dans votre échange de réservation. Gardez cet échange accessible pendant le trajet. Signalez les retards ; ce guide ne garantit ni arrivée anticipée, ni accès autonome, ni consigne à bagages.", "Confermate orario di check-in e consegna delle chiavi con l'host nella conversazione della prenotazione. Tenetela a disposizione durante il viaggio. Segnalate i ritardi; questa guida non garantisce check-in anticipato, accesso autonomo o deposito bagagli.", "Підтвердьте час заселення та передачу ключів з господарями в листуванні щодо бронювання. Збережіть доступ до цього листування в дорозі. Повідомляйте про затримки: путівник не гарантує раннього заселення, самостійного доступу чи зберігання багажу."),
      guideSlugs: [], placeIds: [],
    },
    {
      id: "shopping",
      title: text("First groceries", "Premières courses", "La prima spesa", "Перші покупки"),
      body: family
        ? text("The apartment has a full kitchen, oven, microwave and dishwasher. Start with breakfast, water and a simple first meal rather than a large shop on arrival. The supermarket guide covers central shops and larger alternatives.", "L'appartement dispose d'une cuisine complète, d'un four, d'un micro-ondes et d'un lave-vaisselle. Prévoyez d'abord petit-déjeuner, eau et repas simple plutôt qu'un gros plein à l'arrivée. Le guide présente commerces centraux et grandes surfaces.", "L'appartamento ha cucina completa, forno, microonde e lavastoviglie. Iniziate con colazione, acqua e un pasto semplice, invece di una grande spesa all'arrivo. La guida presenta negozi centrali e alternative più grandi.", "В апартаментах є повноцінна кухня, духовка, мікрохвильовка й посудомийна машина. Спочатку купіть воду, продукти для сніданку й простої вечері, а не робіть великі закупи одразу після дороги. Гід містить центральні магазини й більші альтернативи.")
        : text("The studio has an equipped kitchenette. Pick up water, breakfast ingredients and something easy for the first evening. Use the supermarket guide to choose a central shop; a market visit can wait until another morning.", "Le studio dispose d'une kitchenette équipée. Prévoyez eau, petit-déjeuner et repas simple pour le premier soir. Choisissez un commerce central dans le guide ; la visite du marché peut attendre un autre matin.", "Il monolocale ha un angolo cottura attrezzato. Acquistate acqua, ingredienti per la colazione e qualcosa di semplice per la prima sera. Scegliete un negozio centrale nella guida; il mercato può aspettare un'altra mattina.", "У студії є обладнана мінікухня. Купіть воду, продукти для сніданку й щось просте на перший вечір. Оберіть центральний магазин у гіді; відвідини ринку можна залишити на інший ранок."),
      guideSlugs: ["supermarkets-in-menton"], placeIds: ["u-express-menton-centre", "carrefour-city-felix-faure"],
    },
    {
      id: "first-evening",
      title: text("Your first evening", "Votre première soirée", "La prima sera", "Перший вечір"),
      body: family
        ? text("Keep the first evening light: settle in, have a meal on the private terrace if the weather suits, then choose a short seafront walk. Leave a longer family outing for the next day; check the family guide for weather alternatives.", "Gardez une première soirée simple : installez-vous, dînez sur la terrasse privée si le temps le permet, puis choisissez une courte balade en bord de mer. Réservez la grande sortie familiale au lendemain ; le guide propose aussi des alternatives selon la météo.", "Organizzate una prima sera tranquilla: sistematevi, cenate sulla terrazza privata se il tempo lo permette e scegliete una breve passeggiata sul lungomare. Rimandate le uscite più lunghe al giorno dopo; la guida per famiglie offre alternative meteo.", "Не перевантажуйте перший вечір: облаштуйтеся, повечеряйте на приватній терасі, якщо дозволяє погода, й оберіть коротку прогулянку набережною. Довший сімейний вихід залиште на завтра; у сімейному гіді є варіанти для різної погоди.")
        : text("Start with the view from your private balcony, then a short seafront walk if the weather suits. The quiet-evening guide offers ideas without making the arrival day a full sightseeing itinerary. Check restaurant opening and booking arrangements separately.", "Commencez par la vue depuis votre balcon privé, puis une courte promenade en bord de mer si le temps le permet. Le guide des soirées tranquilles donne des idées sans transformer l'arrivée en journée de visites. Vérifiez séparément l'ouverture et les réservations des restaurants.", "Iniziate con la vista dal balcone privato, poi una breve passeggiata sul lungomare se il tempo lo permette. La guida alle serate tranquille offre idee senza trasformare l'arrivo in un itinerario impegnativo. Verificate a parte apertura e prenotazioni dei ristoranti.", "Почніть із краєвиду з приватного балкона, а потім, якщо дозволяє погода, коротко прогуляйтеся набережною. Гід тихих вечорів пропонує ідеї без насиченої екскурсійної програми в день прибуття. Роботу ресторанів і потребу бронювання перевіряйте окремо."),
      guideSlugs: family ? ["quiet-evening-in-menton", "menton-with-kids-family-guide"] : ["quiet-evening-in-menton"], placeIds: [],
    },
    {
      id: "check-out",
      title: text("Before departure", "Avant le départ", "Prima della partenza", "Перед виїздом"),
      body: text("Confirm your departure time, key return and any apartment-specific instructions with your host. Plan the onward journey separately and allow time for luggage. Late check-out and luggage storage are not included unless your host has explicitly agreed them.", "Confirmez avec votre hôte l'heure de départ, la restitution des clés et les consignes propres à l'appartement. Préparez votre trajet et prévoyez du temps pour les bagages. Départ tardif et consigne ne sont pas inclus sans accord explicite de votre hôte.", "Confermate con l'host orario di partenza, restituzione delle chiavi e istruzioni specifiche dell'appartamento. Pianificate il viaggio successivo e il tempo per i bagagli. Check-out tardivo e deposito bagagli non sono inclusi senza accordo esplicito dell'host.", "Підтвердьте з господарями час виїзду, повернення ключів і правила саме цих апартаментів. Окремо сплануйте подальшу дорогу й залиште час на багаж. Пізній виїзд і зберігання багажу не входять у домовленості без прямого підтвердження господарів."),
      guideSlugs: ["how-to-get-to-menton-from-nice-airport"], placeIds: [],
    },
  ];
  return { apartment, parkingAvailable: apartmentSupportsParking(slug), sections };
}

import type { Locale } from "@/i18n/locales";
import { destinationTransport, transportDecision, transportModeLabels, transportOptions } from "@/content/transport";

const labels = {
  en: { quick: "Can you stay in Menton without a car?", quickAnswer: "Yes. If you stay in central Menton, most beach, market, old-town and restaurant plans are easy on foot. For Monaco, Nice and Ventimiglia, regional trains are often the simplest option. Buses can be useful and inexpensive, while taxis or ride-hailing are better for late arrivals, luggage or less frequent routes.", options: "What transport is available in Menton?", bestFor: "Best for", verify: "Check current details", tickets: "Tickets and schedules", evening: "Evening note", routes: "Main day-trip routes from Menton", choose: "Train, bus or taxi: what to choose?", airport: "Getting from Nice Airport to Menton", tips: "Practical tips for guests", check: "Check current schedules before travelling", ticketBody: "Bus and train fares depend on the network, route and ticket type. Single tickets, multi-ride tickets and day/week passes may be available depending on the operator. Some tickets can be bought from drivers, machines, stations or transport apps, but rules vary by line.", eveningBody: "Many regular daytime services reduce or stop in the evening. For late returns from Monaco or Nice, check night buses, last trains or taxi options in advance.", airportBody: "Nice Côte d’Azur Airport is the main airport for Menton. Guests can reach Menton by a combination of train, bus, taxi or private transfer depending on arrival time and luggage. Some regional coach or airport connections may operate between Nice Airport and Menton or Monaco, but routes and prices change.", practical: ["Stay central if you want to avoid a car.", "Use the train for Monaco, Nice and Ventimiglia when possible.", "Check last return options before evening events.", "During festivals and parades, local access and traffic can change.", "For gardens and hill villages, check bus frequency or consider a taxi.", "If travelling with children or luggage, allow more time.", "Ask the host for practical arrival advice before your stay."] },
  fr: { quick: "Peut-on sejourner a Menton sans voiture?", quickAnswer: "Oui. Si vous logez au centre de Menton, la plupart des plans plage, marche, vieille ville et restaurants se font facilement a pied. Pour Monaco, Nice et Vintimille, les trains regionaux sont souvent l'option la plus simple. Les bus peuvent etre utiles et economiques, tandis que taxis ou VTC conviennent mieux aux arrivees tardives, bagages ou trajets peu frequents.", options: "Quels transports sont disponibles a Menton?", bestFor: "Ideal pour", verify: "Verifier les details", tickets: "Billets et horaires", evening: "Note du soir", routes: "Principales excursions depuis Menton", choose: "Train, bus ou taxi: que choisir?", airport: "Aller de l'aeroport de Nice a Menton", tips: "Conseils pratiques pour les voyageurs", check: "Verifiez les horaires actuels avant de partir", ticketBody: "Les tarifs bus et train dependent du reseau, du trajet et du type de billet. Billets simples, carnets ou forfaits jour/semaine peuvent exister selon l'operateur. Certains billets s'achetent aupres des conducteurs, machines, gares ou applications, mais les regles varient selon les lignes.", eveningBody: "Beaucoup de services de jour diminuent ou s'arretent le soir. Pour un retour tardif de Monaco ou Nice, verifiez bus de nuit, derniers trains ou taxis a l'avance.", airportBody: "L'aeroport Nice Cote d'Azur est le principal aeroport pour Menton. Les voyageurs peuvent rejoindre Menton par combinaison de train, bus, taxi ou transfert prive selon l'heure d'arrivee et les bagages. Certaines liaisons regionales ou aeroport peuvent exister vers Menton ou Monaco, mais routes et prix changent.", practical: ["Restez au centre si vous voulez eviter la voiture.", "Utilisez le train pour Monaco, Nice et Vintimille quand c'est possible.", "Verifiez les derniers retours avant les evenements du soir.", "Pendant festivals et parades, acces et circulation peuvent changer.", "Pour jardins et villages en hauteur, verifiez la frequence des bus ou envisagez taxi.", "Avec enfants ou bagages, prevoyez plus de temps.", "Demandez conseil a l'hote avant votre sejour."] },
  it: { quick: "Si puo stare a Mentone senza auto?", quickAnswer: "Si. Se soggiorni nel centro di Mentone, spiagge, mercato, centro storico e ristoranti sono facili a piedi. Per Monaco, Nizza e Ventimiglia, i treni regionali sono spesso l'opzione piu semplice. Gli autobus possono essere utili ed economici, mentre taxi o ride-hailing sono migliori per arrivi tardi, bagagli o tratte poco frequenti.", options: "Quali trasporti ci sono a Mentone?", bestFor: "Ideale per", verify: "Controlla dettagli", tickets: "Biglietti e orari", evening: "Nota serale", routes: "Principali gite da Mentone", choose: "Treno, bus o taxi: cosa scegliere?", airport: "Da Aeroporto di Nizza a Mentone", tips: "Consigli pratici per gli ospiti", check: "Controlla gli orari aggiornati prima di partire", ticketBody: "Tariffe di bus e treni dipendono da rete, percorso e tipo di biglietto. Biglietti singoli, carnet e pass giornalieri o settimanali possono essere disponibili secondo l'operatore. Alcuni biglietti si acquistano da autisti, macchine, stazioni o app, ma le regole variano per linea.", eveningBody: "Molti servizi diurni si riducono o terminano la sera. Per rientri tardi da Monaco o Nizza, controlla bus notturni, ultimi treni o taxi in anticipo.", airportBody: "Nice Côte d’Azur e l'aeroporto principale per Mentone. Si puo raggiungere Mentone combinando treno, bus, taxi o transfer privato secondo orario di arrivo e bagagli. Alcuni collegamenti regionali o aeroportuali possono operare verso Mentone o Monaco, ma percorsi e prezzi cambiano.", practical: ["Soggiorna in centro se vuoi evitare l'auto.", "Usa il treno per Monaco, Nizza e Ventimiglia quando possibile.", "Controlla gli ultimi rientri prima degli eventi serali.", "Durante festival e parate, accessi e traffico possono cambiare.", "Per giardini e borghi collinari, controlla frequenza bus o valuta taxi.", "Con bambini o bagagli, lascia piu tempo.", "Chiedi all'host consigli pratici prima del soggiorno."] },
  uk: { quick: "Чи можна жити в Ментоні без авто?", quickAnswer: "Так. Якщо зупинитися в центрі Ментона, пляжі, ринок, старе місто й ресторани легко доступні пішки. Для Монако, Ніцци та Вентімільї регіональні потяги часто є найпростішим варіантом. Автобуси можуть бути корисними й недорогими, а таксі або сервіси виклику авто краще підходять для пізніх прибуттів, багажу чи менш частих маршрутів.", options: "Який транспорт є в Ментоні?", bestFor: "Підходить для", verify: "Перевірити деталі", tickets: "Квитки та розклад", evening: "Вечірня нотатка", routes: "Основні поїздки з Ментона", choose: "Потяг, автобус чи таксі: що обрати?", airport: "Як дістатися з аеропорту Ніцци до Ментона", tips: "Практичні поради для гостей", check: "Перед поїздкою перевіряйте актуальний розклад", ticketBody: "Вартість автобусів і потягів залежить від мережі, маршруту та типу квитка. Залежно від оператора можуть бути разові квитки, багаторазові квитки або денні/тижневі проїзні. Деякі квитки можна купити у водія, в автоматах, на станціях або в транспортних додатках, але правила різняться за лініями.", eveningBody: "Багато денних сервісів увечері скорочуються або зупиняються. Для пізнього повернення з Монако чи Ніцци заздалегідь перевіряйте нічні автобуси, останні потяги або таксі.", airportBody: "Nice Côte d’Azur Airport — головний аеропорт для Ментона. До Ментона можна дістатися комбінацією потяга, автобуса, таксі або приватного трансферу залежно від часу прибуття й багажу. Деякі регіональні або аеропортові сполучення можуть працювати між Ніццою, Ментоном і Монако, але маршрути й ціни змінюються.", practical: ["Зупиняйтеся в центрі, якщо хочете уникнути авто.", "За можливості використовуйте потяг до Монако, Ніцци й Вентімільї.", "Перед вечірніми подіями перевіряйте варіанти останнього повернення.", "Під час фестивалів і парадів місцевий доступ і рух можуть змінюватися.", "Для садів і гірських сіл перевіряйте частоту автобусів або розгляньте таксі.", "З дітьми або багажем закладайте більше часу.", "Перед поїздкою попросіть господаря про практичну пораду щодо прибуття."] },
};

const icons: Record<string, string> = { walking: "→", "local-bus": "B", navette: "N", train: "T", "regional-bus": "R", taxi: "TX" };

export function PublicTransportGuide({ locale }: { locale: Locale }) {
  const copy = labels[locale];

  return (
    <div className="space-y-5">
      <section className="border border-[#dfd2b8] bg-[#fffaf0] p-5 sm:p-7">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#b49353]">Quick answer</p>
        <h2 className="mt-3 serif-heading text-3xl leading-none text-[#173f36]">{copy.quick}</h2>
        <p className="mt-4 text-base leading-8 text-[#5c5044]">{copy.quickAnswer}</p>
      </section>

      <section className="border border-[#dfd2b8] bg-[#fffaf0] p-5 sm:p-7">
        <h2 className="serif-heading text-4xl leading-none text-[#173f36]">{copy.options}</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {transportOptions.map((option) => (
            <article key={option.id} className="border border-[#eadfc9] bg-white/60 p-4">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-[#c6a66a] text-[0.65rem] font-bold text-[#173f36]">{icons[option.type]}</span>
                <div>
                  <h3 className="font-semibold leading-snug text-[#173f36]">{option.name[locale]}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5c5044]">{option.note[locale]}</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {option.bestFor.slice(0, 3).map((item) => <span key={item[locale]} className="border border-[#dfd2b8] px-2 py-1 text-[0.62rem] text-[#71665b]">{item[locale]}</span>)}
              </div>
              {option.sourceStatus === "needs_verification" ? <p className="mt-3 text-xs italic text-[#71665b]">{copy.verify}</p> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-[1fr_0.65fr]">
        <div className="border border-[#dfd2b8] bg-[#fffaf0] p-5 sm:p-6">
          <h2 className="serif-heading text-3xl leading-none text-[#173f36]">{copy.tickets}</h2>
          <p className="mt-4 text-sm leading-7 text-[#5c5044]">{copy.ticketBody}</p>
          <ul className="mt-4 grid gap-2 text-sm leading-6 text-[#5c5044] sm:grid-cols-2">
            {[copy.check, "TER / SNCF", "Regional bus network", "Plan night returns"].map((item) => <li key={item} className="border-l-2 border-[#c6a66a] pl-3">{item}</li>)}
          </ul>
        </div>
        <div className="border border-[#173f36] bg-[#173f36] p-5 text-white sm:p-6">
          <h2 className="serif-heading text-3xl leading-none">{copy.evening}</h2>
          <p className="mt-4 text-sm leading-7 text-[#e8dcc9]">{copy.eveningBody}</p>
        </div>
      </section>

      <section className="border border-[#dfd2b8] bg-[#fffaf0] p-5 sm:p-7">
        <h2 className="serif-heading text-4xl leading-none text-[#173f36]">{copy.routes}</h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {destinationTransport.map((destination) => (
            <article key={destination.id} className="border border-[#eadfc9] bg-white/60 p-4">
              <h3 className="serif-heading text-2xl leading-none text-[#173f36]">{destination.destination[locale]}</h3>
              <div className="mt-4 grid gap-3">
                {destination.options.map((option) => (
                  <div key={`${destination.id}-${option.mode}`} className="border-l-2 border-[#c6a66a] pl-3">
                    <p className="text-sm font-semibold text-[#173f36]">{transportModeLabels[option.mode][locale]} · {option.timeLabel[locale]}</p>
                    <p className="mt-1 text-sm leading-6 text-[#5c5044]">{option.note[locale]}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs italic leading-5 text-[#71665b]">{destination.practicalNote[locale]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.75fr_1fr]">
        <div className="border border-[#dfd2b8] bg-[#fffaf0] p-5 sm:p-6">
          <h2 className="serif-heading text-3xl leading-none text-[#173f36]">{copy.choose}</h2>
          <div className="mt-4 grid gap-4">
            {transportDecision.map((decision) => (
              <div key={decision.mode}>
                <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[#b49353]">{transportModeLabels[decision.mode][locale]}</p>
                <ul className="mt-2 grid gap-2 text-sm leading-6 text-[#5c5044]">
                  {decision.chooseIf.map((item) => <li key={item[locale]} className="border-l-2 border-[#c6a66a] pl-3">{item[locale]}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4">
          <div className="border border-[#dfd2b8] bg-[#fffaf0] p-5 sm:p-6">
            <h2 className="serif-heading text-3xl leading-none text-[#173f36]">{copy.airport}</h2>
            <p className="mt-4 text-sm leading-7 text-[#5c5044]">{copy.airportBody}</p>
            <p className="mt-3 text-xs italic text-[#71665b]">{copy.check}</p>
          </div>
          <div className="border border-[#dfd2b8] bg-[#fffaf0] p-5 sm:p-6">
            <h2 className="serif-heading text-3xl leading-none text-[#173f36]">{copy.tips}</h2>
            <ul className="mt-4 grid gap-2 text-sm leading-6 text-[#5c5044] sm:grid-cols-2">
              {copy.practical.map((tip) => <li key={tip} className="border-l-2 border-[#c6a66a] pl-3">{tip}</li>)}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

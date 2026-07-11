import { TrackedLink } from "@/components/analytics/TrackedLink";
import { buttonVariants } from "@/components/ui/Button";
import type { Locale } from "@/i18n/locales";
import {
  bookingAttributionHref,
  compactBookingAttributionProps,
  type BookingFunnelEvent,
  type BookingSourceAttribution,
} from "@/lib/analytics";

type ArrivalParkingContext = "default" | "carFree" | "booking";

type ArrivalParkingBlockProps = {
  locale: Locale;
  sourceAttribution?: BookingSourceAttribution;
  trackingEventName?: BookingFunnelEvent;
  context?: ArrivalParkingContext;
  className?: string;
};

const text = (en: string, fr: string, it: string, uk: string) => ({ en, fr, it, uk });

const copy = {
  eyebrow: text("Arrival & parking", "Arrivee et parking", "Arrivo e parcheggio", "Прибуття й паркування"),
  title: text(
    "Arrive with a clear parking plan",
    "Arriver avec un plan parking clair",
    "Arrivare con un piano parcheggio chiaro",
    "Прибути з чітким планом паркування",
  ),
  carFreeTitle: text(
    "Arrive without relying on a car",
    "Arriver sans dependre de la voiture",
    "Arrivare senza dipendere dall'auto",
    "Прибути без залежності від авто",
  ),
  bookingTitle: text(
    "Tell us how you plan to arrive",
    "Dites-nous comment vous arrivez",
    "Dicci come pensi di arrivare",
    "Розкажіть, як плануєте прибути",
  ),
  intro: text(
    "Private underground parking can be requested with Azur Menton stays. Public city car parks are useful context for arrival day, but they are a fallback, not a replacement for confirming apartment parking directly.",
    "Un parking souterrain prive peut etre demande avec les sejours Azur Menton. Les parkings publics de la ville sont utiles pour le jour d'arrivee, mais restent une solution de secours, pas un remplacement de la confirmation du parking de l'appartement.",
    "Il parcheggio sotterraneo privato puo essere richiesto per i soggiorni Azur Menton. I parcheggi pubblici cittadini sono utili per il giorno di arrivo, ma sono un'alternativa, non un sostituto della conferma del parcheggio dell'appartamento.",
    "Приватне підземне паркування можна запросити для перебування в Azur Menton. Міські паркінги корисні для дня прибуття, але це запасний варіант, а не заміна підтвердження паркування апартаментів.",
  ),
  carFreeIntro: text(
    "Menton works well without a car. If you arrive by train or airport transfer, choose the apartment by walking distance and train access; if you still bring a car, request parking before confirming dates.",
    "Menton fonctionne bien sans voiture. Si vous arrivez en train ou transfert aeroport, choisissez l'appartement selon les distances a pied et l'acces train; si vous venez quand meme en voiture, demandez le parking avant de confirmer les dates.",
    "Mentone funziona bene senza auto. Se arrivi in treno o transfer dall'aeroporto, scegli l'appartamento in base alle distanze a piedi e all'accesso al treno; se vieni comunque in auto, richiedi il parcheggio prima di confermare le date.",
    "Ментон добре працює без авто. Якщо прибуваєте потягом або трансфером з аеропорту, обирайте апартаменти за пішою доступністю і доступом до потягів; якщо все ж їдете авто, запросіть паркування до підтвердження дат.",
  ),
  privateTitle: text("Private guest parking", "Parking prive invite", "Parcheggio privato ospiti", "Приватне паркування для гостей"),
  privateBody: text(
    "Ask for underground parking when sending your dates. We confirm the practical arrangement with the apartment and stay period.",
    "Demandez le parking souterrain avec vos dates. Nous confirmons l'organisation pratique selon l'appartement et la periode.",
    "Richiedi il parcheggio sotterraneo quando invii le date. Confermiamo l'organizzazione pratica in base all'appartamento e al periodo.",
    "Запитайте підземне паркування разом із датами. Ми підтвердимо практичні умови відповідно до апартаментів і періоду.",
  ),
  publicTitle: text("Public parking fallback", "Solution parking publique", "Alternativa parcheggi pubblici", "Запасний міський паркінг"),
  publicBody: text(
    "Menton city car parks help with errands, meeting points or busy arrival windows. Always check current access and rates before relying on them.",
    "Les parkings publics de Menton aident pour les courses, rendez-vous ou arrivees chargees. Verifiez toujours acces et tarifs actuels.",
    "I parcheggi pubblici di Mentone aiutano per commissioni, punti d'incontro o arrivi affollati. Controlla sempre accesso e tariffe aggiornate.",
    "Міські паркінги Ментона корисні для справ, зустрічей або завантаженого прибуття. Завжди перевіряйте актуальний доступ і тарифи.",
  ),
  transportTitle: text("Train, airport or car", "Train, aeroport ou voiture", "Treno, aeroporto o auto", "Потяг, аеропорт або авто"),
  transportBody: text(
    "Tell us whether you arrive by train, transfer or car. That helps us suggest the apartment and access plan that fits your stay.",
    "Indiquez si vous arrivez en train, transfert ou voiture. Cela nous aide a proposer l'appartement et le plan d'acces adaptes.",
    "Dicci se arrivi in treno, transfer o auto. Questo aiuta a suggerire l'appartamento e il piano d'accesso piu adatti.",
    "Повідомте, чи прибуваєте потягом, трансфером або авто. Це допоможе підібрати апартаменти й план доступу.",
  ),
  cta: text("Ask with availability request", "Demander avec disponibilite", "Chiedi con la disponibilita", "Запитати з доступністю"),
  map: text("Open useful places map", "Ouvrir la carte utile", "Apri la mappa utile", "Відкрити корисну карту"),
};

export function ArrivalParkingBlock({
  className = "",
  context = "default",
  locale,
  sourceAttribution,
  trackingEventName,
}: ArrivalParkingBlockProps) {
  const isCarFree = context === "carFree";
  const isBooking = context === "booking";
  const title = isBooking ? copy.bookingTitle[locale] : isCarFree ? copy.carFreeTitle[locale] : copy.title[locale];
  const intro = isCarFree ? copy.carFreeIntro[locale] : copy.intro[locale];
  const href = isBooking ? `/${locale}/check-availability#direct-request-form` : bookingAttributionHref(locale, sourceAttribution);
  const props = {
    locale,
    ...compactBookingAttributionProps(sourceAttribution),
    arrivalParkingContext: context,
  };
  const ctaClassName = `inline-flex min-h-10 items-center justify-center px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${buttonVariants.primary}`;

  return (
    <section className={`border border-[#dfd4c1] bg-[#fffaf0] p-5 sm:p-6 ${className}`}>
      <div className="grid gap-5 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
        <div>
          <p className="editorial-label">{copy.eyebrow[locale]}</p>
          <h2 className="serif-heading mt-3 text-3xl leading-tight text-[#173f36] sm:text-4xl">{title}</h2>
          <p className="mt-4 text-sm leading-7 text-[#5f574c]">{intro}</p>
        </div>
        <div>
          <div className="grid gap-px overflow-hidden border border-[#dfd4c1] bg-[#dfd4c1] md:grid-cols-3">
            <ArrivalItem title={copy.privateTitle[locale]} body={copy.privateBody[locale]} />
            {!isCarFree ? <ArrivalItem title={copy.publicTitle[locale]} body={copy.publicBody[locale]} /> : null}
            <ArrivalItem title={copy.transportTitle[locale]} body={copy.transportBody[locale]} />
          </div>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            {trackingEventName ? (
              <TrackedLink className={ctaClassName} eventName={trackingEventName} href={href} props={props}>
                {copy.cta[locale]}
              </TrackedLink>
            ) : (
              <a className={ctaClassName} href={href}>
                {copy.cta[locale]}
              </a>
            )}
            <a
              className="inline-flex min-h-10 items-center justify-center border border-[#c6a66a] px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#173f36] transition hover:bg-[#f3ead7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c6a66a]"
              href={`/${locale}/map`}
            >
              {copy.map[locale]}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrivalItem({ body, title }: { body: string; title: string }) {
  return (
    <div className="bg-[#fffdf8] p-4">
      <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-[#173f36]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#5f574c]">{body}</p>
    </div>
  );
}

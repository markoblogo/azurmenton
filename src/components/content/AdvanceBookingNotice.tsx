import type { Locale } from "@/i18n/locales";
import {
  bookingFunnelEvents,
  compactBookingAttributionProps,
  type BookingSourceAttribution,
} from "@/lib/analytics";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { Card } from "@/components/ui/Card";

export const advanceBookingNoticeCopy = {
  en: {
    defaultLabel: "Plan your stay early",
    defaultHeading: "Popular dates are often booked months ahead",
    defaultBody:
      "Our apartments are in demand throughout the year, especially during summer, school holidays and major Riviera events. Planning ahead gives you the best choice, while occasional shorter gaps may still become available.",
    compactBody:
      "Popular dates may be reserved several months ahead. Flexible travel dates give us the best chance of finding a suitable stay.",
    availabilityLabel: "A quick note about availability",
    availabilityHeading: "Planning ahead is recommended",
    availabilityBody:
      "Azur Menton apartments are often reserved several months in advance, and some returning guests book for the following year. If your dates are flexible, please include alternative periods in your request. Short-notice gaps occasionally appear, but availability for the nearest weeks is usually limited.",
    availabilitySupporting: "Every request is checked personally before a stay is confirmed.",
    helper:
      "Travelling soon? Adding alternative dates can significantly improve the chance of finding an available apartment.",
    cta: "Check availability",
  },
  fr: {
    defaultLabel: "Planifiez votre séjour à l’avance",
    defaultHeading: "Les dates les plus demandées sont souvent réservées plusieurs mois à l’avance",
    defaultBody:
      "Nos appartements sont très demandés tout au long de l’année, en particulier pendant l’été, les vacances scolaires et les grands événements de la Côte d’Azur. En réservant tôt, vous aurez davantage de choix, même si de courts créneaux peuvent parfois se libérer.",
    compactBody:
      "Les dates les plus demandées peuvent être réservées plusieurs mois à l’avance. Des dates de voyage flexibles nous donnent davantage de possibilités pour vous proposer un séjour adapté.",
    availabilityLabel: "À savoir concernant les disponibilités",
    availabilityHeading: "Il est recommandé de planifier votre séjour à l’avance",
    availabilityBody:
      "Les appartements Azur Menton sont souvent réservés plusieurs mois à l’avance, et certains voyageurs habitués réservent déjà leur prochain séjour pour l’année suivante. Si vos dates sont flexibles, veuillez indiquer d’autres périodes possibles dans votre demande. De courts créneaux peuvent parfois se libérer à la dernière minute, mais les prochaines semaines sont généralement très demandées.",
    availabilitySupporting: "Chaque demande est vérifiée personnellement avant la confirmation du séjour.",
    helper:
      "Vous voyagez prochainement ? Indiquer d’autres dates possibles peut considérablement augmenter vos chances de trouver un appartement disponible.",
    cta: "Vérifier la disponibilité",
  },
  it: {
    defaultLabel: "Pianifica il soggiorno in anticipo",
    defaultHeading: "Le date più richieste vengono spesso prenotate con mesi di anticipo",
    defaultBody:
      "I nostri appartamenti sono richiesti durante tutto l’anno, soprattutto in estate, durante le vacanze scolastiche e nei principali eventi della Riviera. Pianificare in anticipo offre la scelta migliore, anche se a volte si liberano brevi finestre.",
    compactBody:
      "Le date più richieste possono essere prenotate con diversi mesi di anticipo. Date di viaggio flessibili ci danno più possibilità di proporti un soggiorno adatto.",
    availabilityLabel: "Una nota rapida sulla disponibilità",
    availabilityHeading: "Consigliamo di pianificare in anticipo",
    availabilityBody:
      "Gli appartamenti Azur Menton vengono spesso prenotati con diversi mesi di anticipo, e alcuni ospiti abituali prenotano già per l’anno successivo. Se le tue date sono flessibili, indica periodi alternativi nella richiesta. A volte compaiono brevi disponibilità sotto data, ma nelle prossime settimane la disponibilità è di solito limitata.",
    availabilitySupporting: "Ogni richiesta viene verificata personalmente prima che il soggiorno sia confermato.",
    helper:
      "Viaggi a breve? Aggiungere date alternative può aumentare sensibilmente le possibilità di trovare un appartamento disponibile.",
    cta: "Controlla disponibilità",
  },
  uk: {
    defaultLabel: "Плануйте проживання заздалегідь",
    defaultHeading: "Популярні дати часто бронюють за кілька місяців",
    defaultBody:
      "Наші апартаменти користуються попитом протягом усього року, особливо влітку, під час шкільних канікул і великих подій на Лазуровому узбережжі. Завчасне планування дає найбільший вибір, хоча іноді можуть з’являтися короткі вільні проміжки.",
    compactBody:
      "Популярні дати можуть бути заброньовані за кілька місяців. Гнучкі дати подорожі дають нам більше можливостей запропонувати відповідний варіант проживання.",
    availabilityLabel: "Коротко про наявність вільних дат",
    availabilityHeading: "Рекомендуємо планувати проживання заздалегідь",
    availabilityBody:
      "Апартаменти Azur Menton часто бронюють за кілька місяців, а деякі постійні гості планують наступне проживання вже на наступний рік. Якщо ваші дати гнучкі, зазначте в запиті альтернативні періоди. Іноді з’являються короткі вільні проміжки на найближчі дати, але найближчі тижні зазвичай уже зайняті.",
    availabilitySupporting: "Кожен запит перевіряється особисто перед підтвердженням проживання.",
    helper:
      "Плануєте приїхати найближчим часом? Альтернативні дати можуть значно підвищити шанси знайти вільний апартамент.",
    cta: "Перевірити доступність",
  },
} satisfies Record<Locale, Record<string, string>>;

type AdvanceBookingNoticeProps = {
  locale: Locale;
  variant: "default" | "compact" | "availability";
  ctaHref?: string;
  sourceAttribution?: BookingSourceAttribution;
};

export function AdvanceBookingNotice({
  locale,
  variant,
  ctaHref,
  sourceAttribution,
}: AdvanceBookingNoticeProps) {
  const copy = advanceBookingNoticeCopy[locale];

  if (variant === "compact") {
    return (
      <div className="border border-[#dfd4c1] bg-[#f8f2e7] px-4 py-3 text-sm leading-6 text-[#5f574c]">
        {copy.compactBody}
      </div>
    );
  }

  if (variant === "availability") {
    return (
      <Card className="p-6 sm:p-7">
        <p className="editorial-label">{copy.availabilityLabel}</p>
        <h2 className="serif-heading mt-3 text-3xl leading-tight text-[#173f36] sm:text-4xl">
          {copy.availabilityHeading}
        </h2>
        <p className="mt-4 text-base leading-7 text-[#5f574c]">{copy.availabilityBody}</p>
        <p className="mt-4 border-l border-[#c6a66a] pl-4 text-sm leading-6 text-[#6b5f50]">
          {copy.availabilitySupporting}
        </p>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl p-5 sm:p-6">
      <p className="editorial-label">{copy.defaultLabel}</p>
      <h2 className="serif-heading mt-3 text-3xl leading-tight text-[#173f36] sm:text-[2.15rem]">
        {copy.defaultHeading}
      </h2>
      <p className="mt-4 text-base leading-7 text-[#5f574c]">{copy.defaultBody}</p>
      {ctaHref ? (
        <div className="mt-5">
          <TrackedLink
            className="inline-flex items-center text-[0.78rem] font-bold uppercase tracking-[0.14em] text-[#173f36] underline decoration-[#c6a66a] underline-offset-4 transition hover:text-[#0b6f8f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c6a66a]"
            eventName={bookingFunnelEvents.advanceBookingNoticeCtaClick}
            href={ctaHref}
            props={{
              locale,
              ...compactBookingAttributionProps(sourceAttribution),
            }}
          >
            {copy.cta}
          </TrackedLink>
        </div>
      ) : null}
    </Card>
  );
}

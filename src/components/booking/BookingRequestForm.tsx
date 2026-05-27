"use client";

import Link from "next/link";
import type { Route } from "next";
import { useActionState } from "react";
import { submitBookingRequest, type BookingRequestState } from "@/app/actions/booking-request";
import { Button } from "@/components/ui/Button";
import type { Apartment } from "@/content/apartments";
import { localeLabels, locales, type Locale } from "@/i18n/locales";

const initialState: BookingRequestState = {
  status: "idle",
  message: "",
};

const formCopy = {
  en: {
    formLabel: "Direct booking request form",
    stayDetails: "Stay details",
    preferences: "Preferences",
    contactDetails: "Contact details",
    apartment: "Apartment",
    selectApartment: "Select an apartment",
    notSure: "Not sure, please recommend",
    apartmentHelp: "Not sure yet? We can help you choose.",
    checkIn: "Check-in date",
    checkOut: "Check-out date",
    adults: "Adults",
    children: "Children",
    parking: "Need parking?",
    yes: "Yes",
    no: "No",
    notSureShort: "Not sure",
    language: "Preferred language",
    name: "Name",
    email: "Email",
    phone: "Phone or WhatsApp",
    message: "Message",
    parkingHelp: "Useful mostly for longer stays, arrival by car or Riviera day trips.",
    messageHelp: "You can mention Riviera events, arrival time or apartment preferences.",
    manual:
      "Azur Menton currently confirms requests manually to ensure accurate availability and apartment matching.",
    privacy: "I agree that Azur Menton may use my details to respond to this booking request.",
    privacyLink: "Privacy Policy",
    sending: "Sending request...",
    send: "Send request",
  },
  fr: {
    formLabel: "Formulaire de demande directe",
    stayDetails: "Détails du séjour",
    preferences: "Préférences",
    contactDetails: "Coordonnées",
    apartment: "Appartement",
    selectApartment: "Choisir un appartement",
    notSure: "Je ne sais pas, conseillez-moi",
    apartmentHelp: "Pas encore sûr ? Nous pouvons vous aider à choisir.",
    checkIn: "Date d'arrivee",
    checkOut: "Date de depart",
    adults: "Adultes",
    children: "Enfants",
    parking: "Besoin de parking ?",
    yes: "Oui",
    no: "Non",
    notSureShort: "Pas sur",
    language: "Langue preferee",
    name: "Nom",
    email: "Email",
    phone: "Telephone ou WhatsApp",
    message: "Message",
    parkingHelp: "Surtout utile pour les longs séjours, une arrivée en voiture ou des excursions Riviera.",
    messageHelp: "Vous pouvez mentionner un événement Riviera, l’heure d’arrivée ou vos préférences.",
    manual:
      "Azur Menton confirme actuellement les demandes manuellement afin de garantir une disponibilité fiable et le bon choix d’appartement.",
    privacy: "J'accepte qu'Azur Menton utilise mes informations pour repondre a cette demande de reservation.",
    privacyLink: "Politique de confidentialite",
    sending: "Envoi en cours...",
    send: "Envoyer la demande",
  },
  it: {
    formLabel: "Modulo richiesta diretta",
    stayDetails: "Dettagli del soggiorno",
    preferences: "Preferenze",
    contactDetails: "Contatti",
    apartment: "Appartamento",
    selectApartment: "Scegli un appartamento",
    notSure: "Non sono sicuro, consigliatemi voi",
    apartmentHelp: "Non sei sicuro? Possiamo aiutarti a scegliere.",
    checkIn: "Data di arrivo",
    checkOut: "Data di partenza",
    adults: "Adulti",
    children: "Bambini",
    parking: "Serve parcheggio?",
    yes: "Si",
    no: "No",
    notSureShort: "Non so",
    language: "Lingua preferita",
    name: "Nome",
    email: "Email",
    phone: "Telefono o WhatsApp",
    message: "Messaggio",
    parkingHelp: "Utile soprattutto per soggiorni lunghi, arrivo in auto o gite in Riviera.",
    messageHelp: "Puoi indicare eventi Riviera, orario di arrivo o preferenze sull’appartamento.",
    manual:
      "Azur Menton conferma attualmente le richieste manualmente per garantire disponibilità accurata e scelta corretta dell’appartamento.",
    privacy: "Accetto che Azur Menton usi i miei dati per rispondere a questa richiesta di prenotazione.",
    privacyLink: "Informativa privacy",
    sending: "Invio in corso...",
    send: "Invia richiesta",
  },
  uk: {
    formLabel: "Форма прямого запиту",
    stayDetails: "Деталі перебування",
    preferences: "Побажання",
    contactDetails: "Контактні дані",
    apartment: "Апартаменти",
    selectApartment: "Оберіть апартаменти",
    notSure: "Не впевнений/впевнена, порадьте",
    apartmentHelp: "Ще не впевнені? Ми допоможемо обрати.",
    checkIn: "Дата заїзду",
    checkOut: "Дата виїзду",
    adults: "Дорослі",
    children: "Діти",
    parking: "Потрібен паркінг?",
    yes: "Так",
    no: "Ні",
    notSureShort: "Не впевнений/впевнена",
    language: "Бажана мова",
    name: "Ім'я",
    email: "Email",
    phone: "Телефон або WhatsApp",
    message: "Повідомлення",
    parkingHelp: "Особливо корисно для довших перебувань, приїзду авто або поїздок Рив’єрою.",
    messageHelp: "Можна згадати події Рив’єри, час прибуття або побажання щодо апартаментів.",
    manual:
      "Azur Menton наразі підтверджує запити вручну, щоб точно перевірити доступність і підібрати апартаменти.",
    privacy: "Я погоджуюся, що Azur Menton може використати мої дані, щоб відповісти на цей запит.",
    privacyLink: "Політика конфіденційності",
    sending: "Надсилаємо запит...",
    send: "Надіслати запит",
  },
} satisfies Record<Locale, Record<string, string>>;

export function BookingRequestForm({
  apartments,
  locale,
}: {
  apartments: Apartment[];
  locale: Locale;
}) {
  const [state, formAction, pending] = useActionState(submitBookingRequest, initialState);
  const today = new Date().toISOString().slice(0, 10);
  const labels = formCopy[locale];

  return (
    <form action={formAction} className="grid gap-6" aria-busy={pending} aria-label={labels.formLabel}>
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <fieldset className="grid gap-4 border-t border-[#dfd4c1] pt-5">
        <legend className="serif-heading text-3xl leading-tight text-[#173f36]">{labels.stayDetails}</legend>
        <label className="grid gap-2 text-base font-semibold text-[#17313a]">
          {labels.apartment}
          <select className="field" name="apartment" defaultValue="" required>
            <option value="" disabled>
              {labels.selectApartment}
            </option>
            {apartments.map((apartment) => (
              <option key={apartment.slug} value={apartment.slug}>
                {apartment.shortName[locale]}
              </option>
            ))}
            <option value="not-sure">{labels.notSure}</option>
          </select>
          <span className="text-sm font-normal leading-6 text-[#756a5d]">{labels.apartmentHelp}</span>
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-base font-semibold text-[#17313a]">
            {labels.checkIn}
            <input className="field" min={today} name="checkIn" type="date" required />
          </label>
          <label className="grid gap-2 text-base font-semibold text-[#17313a]">
            {labels.checkOut}
            <input className="field" min={today} name="checkOut" type="date" required />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-base font-semibold text-[#17313a]">
            {labels.adults}
            <input className="field" inputMode="numeric" max="8" min="1" name="adults" type="number" defaultValue="2" required />
          </label>
          <label className="grid gap-2 text-base font-semibold text-[#17313a]">
            {labels.children}
            <input className="field" inputMode="numeric" max="8" min="0" name="children" type="number" defaultValue="0" required />
          </label>
        </div>
      </fieldset>

      <fieldset className="grid gap-4 border-t border-[#dfd4c1] pt-5">
        <legend className="serif-heading text-3xl leading-tight text-[#173f36]">{labels.preferences}</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-base font-semibold text-[#17313a]">
            {labels.parking}
            <select className="field" name="parking" defaultValue="not-sure" required>
              <option value="yes">{labels.yes}</option>
              <option value="no">{labels.no}</option>
              <option value="not-sure">{labels.notSureShort}</option>
            </select>
            <span className="text-sm font-normal leading-6 text-[#756a5d]">{labels.parkingHelp}</span>
          </label>
          <label className="grid gap-2 text-base font-semibold text-[#17313a]">
            {labels.language}
            <select className="field" name="preferredLanguage" defaultValue={locale} required>
              {locales.map((item) => (
                <option key={item} value={item}>
                  {localeLabels[item]}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="grid gap-2 text-base font-semibold text-[#17313a]">
          {labels.message}
          <textarea
            className="field min-h-28"
            maxLength={2000}
            name="message"
          />
          <span className="text-sm font-normal leading-6 text-[#756a5d]">{labels.messageHelp}</span>
        </label>
      </fieldset>

      <fieldset className="grid gap-4 border-t border-[#dfd4c1] pt-5">
        <legend className="serif-heading text-3xl leading-tight text-[#173f36]">{labels.contactDetails}</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-base font-semibold text-[#17313a]">
            {labels.name}
            <input className="field" autoComplete="name" maxLength={120} name="name" required />
          </label>
          <label className="grid gap-2 text-base font-semibold text-[#17313a]">
            {labels.email}
            <input className="field" autoComplete="email" inputMode="email" maxLength={254} name="email" type="email" />
          </label>
        </div>

        <label className="grid gap-2 text-base font-semibold text-[#17313a]">
          {labels.phone}
          <input className="field" autoComplete="tel" inputMode="tel" maxLength={80} name="phone" />
        </label>
      </fieldset>

      <div className="border border-[#dfd4c1] bg-[#fbf7ef] p-4 text-base leading-7 text-[#5c5044]">
        {labels.manual}
      </div>

      <label className="flex items-start gap-3 border border-[#d9cdbd] bg-white/70 p-4 text-base leading-7 text-[#5c5044]">
        <input
          className="mt-1.5 h-4 w-4 rounded border-[#d9cdbd] text-[#0b6f8f]"
          name="privacyAcknowledgement"
          required
          type="checkbox"
          value="accepted"
        />
        <span>
          {labels.privacy}{" "}
          <Link
            className="font-semibold text-[#0b6f8f] underline-offset-4 hover:underline"
            href={`/${locale}/privacy` as Route}
          >
            {labels.privacyLink}
          </Link>
        </span>
      </label>

      {state.message ? (
        <div
          className={
            state.status === "success"
              ? "border border-[#8ab59b] bg-[#eef8f1] p-4 text-base font-semibold leading-7 text-[#27553a]"
              : "border border-[#d9a08f] bg-[#fff0eb] p-4 text-base font-semibold leading-7 text-[#8a3b26]"
          }
          role="status"
          aria-live="polite"
        >
          {state.message}
        </div>
      ) : null}

      <Button type="submit" disabled={pending}>{pending ? labels.sending : labels.send}</Button>
    </form>
  );
}

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
    apartment: "Apartment",
    selectApartment: "Select an apartment",
    notSure: "Not sure, please recommend",
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
    manual:
      "To avoid double bookings while we connect our channel manager, all direct requests are confirmed manually by the host.",
    privacy: "I agree that Azur Menton may use my details to respond to this booking request.",
    privacyLink: "Privacy Policy",
    sending: "Sending request...",
    send: "Send request",
  },
  fr: {
    apartment: "Appartement",
    selectApartment: "Choisir un appartement",
    notSure: "Je ne sais pas, conseillez-moi",
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
    manual:
      "Pour eviter les doubles reservations pendant la connexion du channel manager, toutes les demandes directes sont confirmees manuellement par l'hote.",
    privacy: "J'accepte qu'Azur Menton utilise mes informations pour repondre a cette demande de reservation.",
    privacyLink: "Politique de confidentialite",
    sending: "Envoi en cours...",
    send: "Envoyer la demande",
  },
  it: {
    apartment: "Appartamento",
    selectApartment: "Scegli un appartamento",
    notSure: "Non sono sicuro, consigliatemi voi",
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
    manual:
      "Per evitare doppie prenotazioni mentre colleghiamo il channel manager, tutte le richieste dirette sono confermate manualmente dall'host.",
    privacy: "Accetto che Azur Menton usi i miei dati per rispondere a questa richiesta di prenotazione.",
    privacyLink: "Informativa privacy",
    sending: "Invio in corso...",
    send: "Invia richiesta",
  },
  uk: {
    apartment: "Апартаменти",
    selectApartment: "Оберіть апартаменти",
    notSure: "Не впевнений/впевнена, порадьте",
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
    manual:
      "Щоб уникнути подвійних бронювань до підключення channel manager, усі прямі запити підтверджує господар вручну.",
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
    <form action={formAction} className="grid gap-5" aria-label="Booking request form">
      <label className="grid gap-2 text-sm font-semibold text-[#17313a]">
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
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-[#17313a]">
          {labels.checkIn}
          <input className="field" min={today} name="checkIn" type="date" required />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-[#17313a]">
          {labels.checkOut}
          <input className="field" min={today} name="checkOut" type="date" required />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-[#17313a]">
          {labels.adults}
          <input className="field" max="8" min="1" name="adults" type="number" defaultValue="2" required />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-[#17313a]">
          {labels.children}
          <input className="field" max="8" min="0" name="children" type="number" defaultValue="0" required />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-[#17313a]">
          {labels.parking}
          <select className="field" name="parking" defaultValue="not-sure" required>
            <option value="yes">{labels.yes}</option>
            <option value="no">{labels.no}</option>
            <option value="not-sure">{labels.notSureShort}</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-[#17313a]">
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

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-[#17313a]">
          {labels.name}
          <input className="field" name="name" required />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-[#17313a]">
          {labels.email}
          <input className="field" name="email" type="email" />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-semibold text-[#17313a]">
        {labels.phone}
        <input className="field" name="phone" />
      </label>

      <label className="grid gap-2 text-sm font-semibold text-[#17313a]">
        {labels.message}
        <textarea
          className="field min-h-32"
          name="message"
        />
      </label>

      <div className="rounded-md border border-[#d9cdbd] bg-[#fff3df] p-4 text-sm leading-6 text-[#5c5044]">
        {labels.manual}
      </div>

      <label className="flex items-start gap-3 rounded-md border border-[#d9cdbd] bg-white/70 p-4 text-sm leading-6 text-[#5c5044]">
        <input
          className="mt-1 h-4 w-4 rounded border-[#d9cdbd] text-[#0b6f8f]"
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
              ? "rounded-md border border-[#8ab59b] bg-[#eef8f1] p-4 text-sm font-semibold text-[#27553a]"
              : "rounded-md border border-[#d9a08f] bg-[#fff0eb] p-4 text-sm font-semibold text-[#8a3b26]"
          }
          role="status"
        >
          {state.message}
        </div>
      ) : null}

      <Button type="submit">{pending ? labels.sending : labels.send}</Button>
    </form>
  );
}

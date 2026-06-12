"use server";

import { headers } from "next/headers";
import {
  createBookingRequestLog,
  formDataToBookingPayload,
  isHoneypotTriggeredFromFormData,
  validateBookingRequest,
} from "@/lib/booking-request";
import { checkBookingRequestRateLimit, getClientIdentifierFromHeaders } from "@/lib/rate-limit";
import { sendBookingRequestEmail } from "@/lib/resend";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { isLocale, type Locale } from "@/i18n/locales";

export type BookingRequestState = {
  status: "idle" | "success" | "error";
  message: string;
};

const messages = {
  en: {
    check: "Please check your request and try again.",
    failed:
      "We could not send your request right now. Please contact us by email or WhatsApp and include your dates.",
    success:
      "Thank you. We received your request and will confirm availability and the best direct offer shortly.",
    tooMany: "Too many booking requests. Please wait a few minutes and try again.",
    botCheck: "Please complete the anti-spam check and try again.",
  },
  fr: {
    check: "Veuillez verifier votre demande et reessayer.",
    failed:
      "Nous ne pouvons pas envoyer votre demande pour le moment. Contactez-nous par email ou WhatsApp avec vos dates.",
    success:
      "Merci. Nous avons bien recu votre demande et confirmerons rapidement la disponibilite et la meilleure offre directe.",
    tooMany: "Trop de demandes envoyees. Veuillez attendre quelques minutes puis reessayer.",
    botCheck: "Veuillez completer la verification anti-spam puis reessayer.",
  },
  it: {
    check: "Controlla la richiesta e riprova.",
    failed:
      "Non possiamo inviare la richiesta in questo momento. Contattaci via email o WhatsApp indicando le date.",
    success:
      "Grazie. Abbiamo ricevuto la richiesta e confermeremo presto disponibilita e migliore offerta diretta.",
    tooMany: "Troppe richieste inviate. Attendi qualche minuto e riprova.",
    botCheck: "Completa il controllo anti-spam e riprova.",
  },
  uk: {
    check: "Перевірте запит і спробуйте ще раз.",
    failed:
      "Зараз не вдалося надіслати запит. Зв'яжіться з нами email або WhatsApp і вкажіть дати.",
    success:
      "Дякуємо. Ми отримали ваш запит і незабаром підтвердимо доступність та найкращу пряму пропозицію.",
    tooMany: "Забагато запитів. Зачекайте кілька хвилин і спробуйте ще раз.",
    botCheck: "Пройдіть антиспам-перевірку й спробуйте ще раз.",
  },
} satisfies Record<Locale, Record<string, string>>;

const validationMessages: Record<Locale, Record<string, string>> = {
  en: {},
  fr: {
    "Please complete the required fields before sending your request.":
      "Veuillez completer les champs obligatoires avant d'envoyer votre demande.",
    "Please provide either an email address or a phone/WhatsApp number.":
      "Veuillez indiquer une adresse email ou un numero de telephone / WhatsApp.",
    "Please shorten your name field.": "Veuillez raccourcir le champ nom.",
    "Please enter a shorter email address.": "Veuillez indiquer une adresse email plus courte.",
    "Please enter a shorter phone/WhatsApp number.": "Veuillez indiquer un numero de telephone / WhatsApp plus court.",
    "Please shorten your message before sending.": "Veuillez raccourcir votre message avant l'envoi.",
    "Please enter a valid email address.": "Veuillez indiquer une adresse email valide.",
    "Please choose a valid apartment option.": "Veuillez choisir une option d'appartement valide.",
    "Please choose a valid parking option.": "Veuillez choisir une option de parking valide.",
    "Please choose a valid preferred language.": "Veuillez choisir une langue valide.",
    "Please confirm that Azur Menton may use your details to respond to this request.":
      "Veuillez confirmer qu'Azur Menton peut utiliser vos informations pour repondre a cette demande.",
    "Please enter a valid number of adults.": "Veuillez indiquer un nombre d'adultes valide.",
    "Please enter a valid number of children.": "Veuillez indiquer un nombre d'enfants valide.",
    "Please enter valid check-in and check-out dates.": "Veuillez indiquer des dates d'arrivee et de depart valides.",
    "Check-out must be after check-in.": "La date de depart doit etre apres la date d'arrivee.",
    "Check-in cannot be in the past.": "La date d'arrivee ne peut pas etre dans le passe.",
    "Please send a message for stays longer than 90 nights so we can review them manually.":
      "Pour les sejours de plus de 90 nuits, envoyez un message afin que nous puissions verifier manuellement.",
  },
  it: {
    "Please complete the required fields before sending your request.":
      "Completa i campi obbligatori prima di inviare la richiesta.",
    "Please provide either an email address or a phone/WhatsApp number.":
      "Indica un indirizzo email o un numero di telefono / WhatsApp.",
    "Please shorten your name field.": "Riduci la lunghezza del nome.",
    "Please enter a shorter email address.": "Inserisci un indirizzo email piu corto.",
    "Please enter a shorter phone/WhatsApp number.": "Inserisci un numero di telefono / WhatsApp piu corto.",
    "Please shorten your message before sending.": "Accorcia il messaggio prima dell'invio.",
    "Please enter a valid email address.": "Inserisci un indirizzo email valido.",
    "Please choose a valid apartment option.": "Scegli un appartamento valido.",
    "Please choose a valid parking option.": "Scegli un'opzione parcheggio valida.",
    "Please choose a valid preferred language.": "Scegli una lingua valida.",
    "Please confirm that Azur Menton may use your details to respond to this request.":
      "Conferma che Azur Menton possa usare i tuoi dati per rispondere alla richiesta.",
    "Please enter a valid number of adults.": "Inserisci un numero valido di adulti.",
    "Please enter a valid number of children.": "Inserisci un numero valido di bambini.",
    "Please enter valid check-in and check-out dates.": "Inserisci date di arrivo e partenza valide.",
    "Check-out must be after check-in.": "La partenza deve essere successiva all'arrivo.",
    "Check-in cannot be in the past.": "La data di arrivo non puo essere nel passato.",
    "Please send a message for stays longer than 90 nights so we can review them manually.":
      "Per soggiorni oltre 90 notti, invia un messaggio: li verificheremo manualmente.",
  },
  uk: {
    "Please complete the required fields before sending your request.":
      "Заповніть обов'язкові поля перед надсиланням запиту.",
    "Please provide either an email address or a phone/WhatsApp number.":
      "Вкажіть email або номер телефону / WhatsApp.",
    "Please shorten your name field.": "Скоротіть поле з іменем.",
    "Please enter a shorter email address.": "Вкажіть коротшу email-адресу.",
    "Please enter a shorter phone/WhatsApp number.": "Вкажіть коротший номер телефону / WhatsApp.",
    "Please shorten your message before sending.": "Скоротіть повідомлення перед надсиланням.",
    "Please enter a valid email address.": "Вкажіть коректну email-адресу.",
    "Please choose a valid apartment option.": "Оберіть коректний варіант апартаментів.",
    "Please choose a valid parking option.": "Оберіть коректний варіант паркінгу.",
    "Please choose a valid preferred language.": "Оберіть коректну бажану мову.",
    "Please confirm that Azur Menton may use your details to respond to this request.":
      "Підтвердьте, що Azur Menton може використати ваші дані для відповіді на цей запит.",
    "Please enter a valid number of adults.": "Вкажіть коректну кількість дорослих.",
    "Please enter a valid number of children.": "Вкажіть коректну кількість дітей.",
    "Please enter valid check-in and check-out dates.": "Вкажіть коректні дати заїзду та виїзду.",
    "Check-out must be after check-in.": "Дата виїзду має бути після дати заїзду.",
    "Check-in cannot be in the past.": "Дата заїзду не може бути в минулому.",
    "Please send a message for stays longer than 90 nights so we can review them manually.":
      "Для перебувань довше 90 ночей надішліть повідомлення, щоб ми перевірили запит вручну.",
  },
};

function localizedValidationMessage(error: string | undefined, locale: Locale) {
  if (!error) {
    return messages[locale].check;
  }

  return validationMessages[locale][error] ?? error;
}

export async function submitBookingRequest(
  _previousState: BookingRequestState,
  formData: FormData,
): Promise<BookingRequestState> {
  const submittedLocale = String(formData.get("preferredLanguage") ?? "").trim();
  const locale: Locale = isLocale(submittedLocale) ? submittedLocale : "en";

  if (isHoneypotTriggeredFromFormData(formData)) {
    return {
      status: "success",
      message: messages[locale].success,
    };
  }

  const requestHeaders = await headers();
  const clientIdentifier = getClientIdentifierFromHeaders(requestHeaders);
  const rateLimit = checkBookingRequestRateLimit(clientIdentifier);

  if (!rateLimit.ok) {
    return {
      status: "error",
      message: messages[locale].tooMany,
    };
  }

  const payload = formDataToBookingPayload(formData);
  const validation = validateBookingRequest(payload);

  if (!validation.ok) {
    return {
      status: "error",
      message: localizedValidationMessage(validation.error, locale),
    };
  }

  const turnstileResult = await verifyTurnstileToken(
    String(formData.get("cf-turnstile-response") ?? "").trim(),
    clientIdentifier,
  );

  if (!turnstileResult.ok) {
    return {
      status: "error",
      message: messages[locale].botCheck,
    };
  }

  console.info("Azur Menton booking request received", createBookingRequestLog(payload));

  const emailResult = await sendBookingRequestEmail(payload);

  if (!emailResult.ok) {
    console.error("Azur Menton booking request email failed", {
      attempted: emailResult.attempted,
      error: emailResult.error,
    });

    return {
      status: "error",
      message: messages[locale].failed,
    };
  }

  return {
    status: "success",
    message: messages[locale].success,
  };
}

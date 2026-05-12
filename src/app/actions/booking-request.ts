"use server";

import {
  createBookingRequestLog,
  formDataToBookingPayload,
  validateBookingRequest,
} from "@/lib/booking-request";
import { sendBookingRequestEmail } from "@/lib/resend";
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
  },
  fr: {
    check: "Veuillez verifier votre demande et reessayer.",
    failed:
      "Nous ne pouvons pas envoyer votre demande pour le moment. Contactez-nous par email ou WhatsApp avec vos dates.",
    success:
      "Merci. Nous avons bien recu votre demande et confirmerons rapidement la disponibilite et la meilleure offre directe.",
  },
  it: {
    check: "Controlla la richiesta e riprova.",
    failed:
      "Non possiamo inviare la richiesta in questo momento. Contattaci via email o WhatsApp indicando le date.",
    success:
      "Grazie. Abbiamo ricevuto la richiesta e confermeremo presto disponibilita e migliore offerta diretta.",
  },
  uk: {
    check: "Перевірте запит і спробуйте ще раз.",
    failed:
      "Зараз не вдалося надіслати запит. Зв'яжіться з нами email або WhatsApp і вкажіть дати.",
    success:
      "Дякуємо. Ми отримали ваш запит і незабаром підтвердимо доступність та найкращу пряму пропозицію.",
  },
} satisfies Record<Locale, Record<string, string>>;

export async function submitBookingRequest(
  _previousState: BookingRequestState,
  formData: FormData,
): Promise<BookingRequestState> {
  const payload = formDataToBookingPayload(formData);
  const locale: Locale = isLocale(payload.preferredLanguage) ? payload.preferredLanguage : "en";
  const validation = validateBookingRequest(payload);

  if (!validation.ok) {
    return {
      status: "error",
      message: validation.error ?? messages[locale].check,
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

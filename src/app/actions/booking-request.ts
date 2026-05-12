"use server";

import {
  createBookingRequestLog,
  formDataToBookingPayload,
  validateBookingRequest,
} from "@/lib/booking-request";
import { sendBookingRequestEmail } from "@/lib/resend";

export type BookingRequestState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function submitBookingRequest(
  _previousState: BookingRequestState,
  formData: FormData,
): Promise<BookingRequestState> {
  const payload = formDataToBookingPayload(formData);
  const validation = validateBookingRequest(payload);

  if (!validation.ok) {
    return {
      status: "error",
      message: validation.error ?? "Please check your request and try again.",
    };
  }

  console.info("Azur Menton booking request placeholder", createBookingRequestLog(payload));

  const emailResult = await sendBookingRequestEmail(payload);

  if (!emailResult.ok) {
    console.error("Azur Menton booking request email failed", {
      attempted: emailResult.attempted,
      error: emailResult.error,
    });

    return {
      status: "error",
      message:
        "We could not send your request right now. Please contact us by email or WhatsApp and include your dates.",
    };
  }

  return {
    status: "success",
    message:
      "Thank you. We received your request and will confirm availability and the best direct offer shortly.",
  };
}

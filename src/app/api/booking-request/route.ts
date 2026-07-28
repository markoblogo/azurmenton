import { NextResponse } from "next/server";
import {
  createBookingRequestLog,
  isHoneypotTriggeredFromUnknown,
  unknownToBookingPayload,
  validateBookingRequest,
} from "@/lib/booking-request";
import { validateRequestedApartmentDates } from "@/lib/availability/service";
import { checkBookingRequestRateLimit, getClientIdentifierFromHeaders } from "@/lib/rate-limit";
import { sendBookingRequestEmail } from "@/lib/resend";
import { verifyTurnstileToken } from "@/lib/turnstile";

const maxRequestBytes = 32_000;

function jsonResponse(body: Record<string, unknown>, init?: ResponseInit) {
  return NextResponse.json(body, {
    ...init,
    headers: {
      "Cache-Control": "no-store",
      ...init?.headers,
    },
  });
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");

  if (contentLength > maxRequestBytes) {
    return jsonResponse({ error: "Booking request is too large." }, { status: 413 });
  }

  const body = await request.json().catch(() => null);

  if (isHoneypotTriggeredFromUnknown(body)) {
    return jsonResponse({
      ok: true,
      message:
        "Thank you. We have received your request and will personally check the latest availability before replying. Your stay is not confirmed until you receive our confirmation.",
      });
  }

  const clientIdentifier = getClientIdentifierFromHeaders(request.headers);
  const rateLimit = checkBookingRequestRateLimit(clientIdentifier);

  if (!rateLimit.ok) {
    return jsonResponse(
      { error: "Too many booking requests. Please wait a few minutes and try again." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000)),
        },
      },
    );
  }

  const payload = unknownToBookingPayload(body);

  if (!payload) {
    return jsonResponse({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const validation = validateBookingRequest(payload);

  if (!validation.ok) {
    return jsonResponse({ error: validation.error }, { status: 400 });
  }

  const token =
    body && typeof body === "object"
      ? String((body as Record<string, unknown>)["cf-turnstile-response"] ?? "").trim()
      : "";
  const turnstileResult = await verifyTurnstileToken(token, clientIdentifier);

  if (!turnstileResult.ok) {
    return jsonResponse({ error: "Please complete the anti-spam check and try again." }, { status: 400 });
  }

  if (payload.apartment !== "not-sure" && payload.availabilityOverride !== "accepted") {
    const availabilityCheck = await validateRequestedApartmentDates(payload.apartment, {
      start: payload.checkIn,
      end: payload.checkOut,
    });

    if (!availabilityCheck.ok && availabilityCheck.reason === "occupied") {
      return jsonResponse(
        {
          error:
            "These dates no longer appear fully available. Please choose one of the nearby alternatives or send the request with flexible dates so we can check personally.",
          code: "dates_unavailable",
          alternatives: availabilityCheck.alternatives,
        },
        { status: 409 },
      );
    }
  }

  console.info("Azur Menton booking request API received", createBookingRequestLog(payload));

  const emailResult = await sendBookingRequestEmail(payload);

  if (!emailResult.ok) {
    console.error("Azur Menton booking request API email failed", {
      attempted: emailResult.attempted,
      error: emailResult.error,
    });

    return jsonResponse(
      { error: "Email delivery is not configured or failed. Please contact the host directly by email or WhatsApp." },
      { status: 502 },
    );
  }

  return jsonResponse({
    ok: true,
    message:
      "Thank you. We have received your request and will personally check the latest availability before replying. Your stay is not confirmed until you receive our confirmation.",
  });
}

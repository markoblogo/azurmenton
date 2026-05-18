import { NextResponse } from "next/server";
import {
  createBookingRequestLog,
  isHoneypotTriggeredFromUnknown,
  unknownToBookingPayload,
  validateBookingRequest,
} from "@/lib/booking-request";
import { checkBookingRequestRateLimit, getClientIdentifierFromHeaders } from "@/lib/rate-limit";
import { sendBookingRequestEmail } from "@/lib/resend";

export async function POST(request: Request) {
  const rateLimit = checkBookingRequestRateLimit(getClientIdentifierFromHeaders(request.headers));

  if (!rateLimit.ok) {
    return NextResponse.json(
      { error: "Too many booking requests. Please wait a few minutes and try again." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000)),
        },
      },
    );
  }

  const body = await request.json().catch(() => null);

  if (isHoneypotTriggeredFromUnknown(body)) {
    return NextResponse.json({
      ok: true,
      message:
        "Thank you. We received your request and will confirm availability and the best direct offer shortly.",
    });
  }

  const payload = unknownToBookingPayload(body);

  if (!payload) {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const validation = validateBookingRequest(payload);

  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  console.info("Azur Menton booking request API received", createBookingRequestLog(payload));

  const emailResult = await sendBookingRequestEmail(payload);

  if (!emailResult.ok) {
    console.error("Azur Menton booking request API email failed", {
      attempted: emailResult.attempted,
      error: emailResult.error,
    });

    return NextResponse.json(
      { error: "Email delivery is not configured or failed. Please contact the host directly by email or WhatsApp." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    message:
      "Thank you. We received your request and will confirm availability and the best direct offer shortly.",
  });
}

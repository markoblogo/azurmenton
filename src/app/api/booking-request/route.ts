import { NextResponse } from "next/server";
import {
  createBookingRequestLog,
  unknownToBookingPayload,
  validateBookingRequest,
} from "@/lib/booking-request";
import { sendBookingRequestEmail } from "@/lib/resend";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
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

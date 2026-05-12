import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  if (!payload) {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  console.info("Azur Menton booking request API placeholder", {
    payload,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({
    ok: true,
    message:
      "Thank you. We received your request and will confirm availability and the best direct offer shortly.",
  });
}

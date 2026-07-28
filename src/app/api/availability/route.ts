import { NextResponse } from "next/server";
import { getPublicAllApartmentAvailability } from "@/lib/availability/service";

function jsonResponse(body: unknown, init?: ResponseInit) {
  return NextResponse.json(body, {
    ...init,
    headers: {
      "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600",
      "X-Robots-Tag": "noindex, nofollow",
      ...init?.headers,
    },
  });
}

export async function GET() {
  const availability = await getPublicAllApartmentAvailability();
  return jsonResponse({ apartments: availability });
}

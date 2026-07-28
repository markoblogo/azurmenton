import { NextResponse } from "next/server";
import { getPublicApartmentAvailability } from "@/lib/availability/service";

type RouteProps = {
  params: Promise<{ apartmentSlug: string }>;
};

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

export async function GET(_: Request, { params }: RouteProps) {
  const { apartmentSlug } = await params;
  const availability = await getPublicApartmentAvailability(apartmentSlug);

  if (!availability) {
    return jsonResponse({ error: "Unknown apartment slug." }, { status: 404 });
  }

  return jsonResponse(availability);
}

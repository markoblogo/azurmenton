import { createGuidePublisher } from "@/lib/guide-publisher-api";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function GET(request: Request) { return createGuidePublisher()(request); }
export async function POST(request: Request) { return createGuidePublisher()(request); }

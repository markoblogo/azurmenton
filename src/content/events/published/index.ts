import type { RivieraEvent } from "@/content/riviera-events";
import publishedEvents from "./events.json";

export const publishedEventRecords = publishedEvents as unknown as RivieraEvent[];

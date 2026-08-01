import { eventSources } from "@/content/event-sources";
import type { EventSourceAdapter } from "@/lib/events-ingestion/types";
import { niceMajorEventsAdapter } from "@/lib/events-ingestion/adapters/nice-major-events";
import { sanremoComuneAdapter } from "@/lib/events-ingestion/adapters/sanremo-comune";
import { sanremoLiveLoveAdapter } from "@/lib/events-ingestion/adapters/sanremo-live-love";

const adapters = [niceMajorEventsAdapter, sanremoComuneAdapter, sanremoLiveLoveAdapter];

export function getEventSourceAdapters(sourceId?: string) {
  const enabledAutomatedSourceIds = new Set(eventSources.filter((source) => source.enabled && source.automated).map((source) => source.id));
  return adapters.filter((adapter) => enabledAutomatedSourceIds.has(adapter.sourceId)).filter((adapter) => !sourceId || adapter.sourceId === sourceId);
}

export function getEventSourceAdapter(sourceId: string): EventSourceAdapter | undefined {
  return getEventSourceAdapters(sourceId)[0];
}

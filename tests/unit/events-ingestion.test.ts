import { mkdtemp } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { parseNiceMajorEvents } from "../../src/lib/events-ingestion/adapters/nice-major-events";
import { parseSanremoComuneEvents } from "../../src/lib/events-ingestion/adapters/sanremo-comune";
import { parseSanremoLiveLoveEvents } from "../../src/lib/events-ingestion/adapters/sanremo-live-love";
import { candidateFromRaw, validateRawEvent } from "../../src/lib/events-ingestion/normalize";
import { FileEventCandidateRepository } from "../../src/lib/events-ingestion/repository";
import { isAuthorizedEventsIngestRequest } from "../../src/lib/events-ingestion/runner";

const niceFixture = `
<li class="iris-card" data-layer-wpet-offer-id="7605938" data-layer-wpet-offer-title="Vikings : L&#8217;Odyssée" data-layer-wpet-offer-location="Nice">
  <span class="iris-card__period__day">06</span>
  <span class="iris-card__period__monthName">February</span>
  <span class="iris-card__period__day">30</span>
  <span class="iris-card__period__monthName">August</span>
  <span class="iris-card__period__year">2026</span>
  <p class="iris-card__content__title"><a class="stretched-link" href="https://www.explorenicecotedazur.com/en/event/vikings/">Vikings</a></p>
  <span class="content">Exhibition</span>
  <img src="https://cdn.iris-etourism.io/media/nice/7605938/example.webp" alt="Vikings">
</li>`;

const sanremoFixture = `
<li class="splide__slide lined_slide">
  <h1 class="card-title h3"><span class="pt-1 pb-2 pl-0">Agosto 2026</span> 06</h1>
  <div class="card-text"><a href="https://www.comune.sanremo.im.it/it/events/pina-festival-2026"><strong>Pina Festival 2026</strong></a></div>
</li>`;

const sanremoLiveLoveFixture = `
<section id="eventi">
  <li>
    <span class="block text-xs uppercase">27/07/2026</span>
    <h3 class="text-2xl">MEMORIAL FRANCESCO PREVOSTO 2026&nbsp;&nbsp;</h3>
    <a href="https://www.sanremoliveandlove.it/memorial-francesco-prevosto-2026/">Scopri</a>
  </li>
</section>`;

describe("events ingestion", () => {
  it("parses Nice major-event cards from official tourism HTML", () => {
    const events = parseNiceMajorEvents(niceFixture);
    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({
      sourceId: "explore-nice-major-events",
      sourceEventId: "7605938",
      title: "Vikings : L’Odyssée",
      sourceUrl: "https://www.explorenicecotedazur.com/en/event/vikings/",
      startDate: "2026-02-06",
      endDate: "2026-08-30",
      city: "nice",
      categoryLabel: "Exhibition",
    });
  });

  it("parses Sanremo municipality calendar cards with Italian dates", () => {
    const events = parseSanremoComuneEvents(sanremoFixture);
    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({
      sourceId: "comune-sanremo-events",
      title: "Pina Festival 2026",
      startDate: "2026-08-06",
      city: "sanremo",
    });
  });

  it("parses Sanremo Live & Love homepage cards with numeric Italian dates", () => {
    const events = parseSanremoLiveLoveEvents(sanremoLiveLoveFixture);
    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({
      sourceId: "sanremo-live-love",
      title: "MEMORIAL FRANCESCO PREVOSTO 2026",
      sourceUrl: "https://www.sanremoliveandlove.it/memorial-francesco-prevosto-2026/",
      startDate: "2026-07-27",
      city: "sanremo",
    });
  });

  it("rejects malformed records without inventing missing fields", () => {
    expect(validateRawEvent({ sourceId: "x", title: "", sourceUrl: "not-a-url", startDate: "2026-1-1" })).toEqual([
      "missing title",
      "invalid sourceUrl",
      "invalid startDate",
    ]);
  });

  it("preserves edited summaries while flagging material source updates", async () => {
    const dir = await mkdtemp(path.join(os.tmpdir(), "azur-events-"));
    const repository = new FileEventCandidateRepository(dir);
    const first = candidateFromRaw(
      { sourceId: "source", sourceEventId: "event-1", title: "Nice Jazz Fest", sourceUrl: "https://example.com/1", startDate: "2026-07-01", city: "nice" },
      "2026-08-01T10:00:00.000Z",
    );
    await repository.upsertCandidate({ ...first, reviewStatus: "published", publicSummary: "Edited public summary." });
    const changed = candidateFromRaw(
      { sourceId: "source", sourceEventId: "event-1", title: "Nice Jazz Fest", sourceUrl: "https://example.com/1", startDate: "2026-07-02", city: "nice" },
      "2026-08-02T10:00:00.000Z",
    );
    expect(await repository.upsertCandidate(changed)).toBe("updated");
    const saved = await repository.findBySourceIdentity("source", "event-1");
    expect(saved?.publicSummary).toBe("Edited public summary.");
    expect(saved?.reviewStatus).toBe("needs_review");
    expect(saved?.materialChanges).toContain("startDate");
  });

  it("marks disappeared unpublished candidates outdated only after repeated source misses", async () => {
    const dir = await mkdtemp(path.join(os.tmpdir(), "azur-events-"));
    const repository = new FileEventCandidateRepository(dir);
    const candidate = candidateFromRaw(
      { sourceId: "source", sourceEventId: "event-1", title: "Event", sourceUrl: "https://example.com/1", startDate: "2026-07-01", city: "nice" },
      "2026-08-01T10:00:00.000Z",
    );
    await repository.upsertCandidate(candidate);
    await repository.markMissingFromRun("source", [], "2026-08-02T10:00:00.000Z");
    await repository.markMissingFromRun("source", [], "2026-08-03T10:00:00.000Z");
    let saved = await repository.findBySourceIdentity("source", "event-1");
    expect(saved?.reviewStatus).toBe("new");
    await repository.markMissingFromRun("source", [], "2026-08-04T10:00:00.000Z");
    saved = await repository.findBySourceIdentity("source", "event-1");
    expect(saved?.reviewStatus).toBe("outdated");
  });

  it("requires a cron secret for ingestion routes", () => {
    const request = new Request("https://azurmenton.com/api/cron/events-ingest?secret=good");
    expect(isAuthorizedEventsIngestRequest(request, { EVENT_INGEST_SECRET: "good" })).toBe(true);
    expect(isAuthorizedEventsIngestRequest(request, { EVENT_INGEST_SECRET: "other" })).toBe(false);
    expect(isAuthorizedEventsIngestRequest(request, {})).toBe(false);
  });
});

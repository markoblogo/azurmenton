#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("node:fs");
const path = require("node:path");
const cheerio = require("cheerio");
require("./lib/register-ts-content.cjs").registerTypescriptContent(path.resolve(__dirname, ".."));
const { rivieraEvents, summerOnTheRivieraEvent } = require("../src/content/riviera-events.ts");

async function main() {
  const fetchSources = process.argv.includes("--fetch-sources");
  const cache = new Map();
  async function inspect(url) {
    if (!url || !fetchSources) return { state: url ? "not_fetched" : "no_source", candidates: [] };
    if (cache.has(url)) return cache.get(url);
    const job = (async () => {
      try {
        const response = await fetch(url, { signal: AbortSignal.timeout(8000), headers: { "User-Agent": "AzurMentonEditorialReview/1.0" } });
        if (!response.ok) return { state: `http_${response.status}`, candidates: [] };
        const text = await response.text();
        if (text.length > 3000000) return { state: "page_too_large", candidates: [] };
        const $ = cheerio.load(text);
        const candidates = [];
        function walk(node) {
          if (!node || typeof node !== "object") return;
          if (Array.isArray(node)) { node.forEach(walk); return; }
          if (String(node["@type"] ?? "").includes("Event") && typeof node.startDate === "string" && /T\d{2}:\d{2}/.test(node.startDate)) candidates.push({ name: node.name, startDate: node.startDate, endDate: node.endDate, location: typeof node.location === "object" ? node.location?.name : node.location });
          Object.values(node).forEach(walk);
        }
        $('script[type="application/ld+json"]').each((_, el) => { try { walk(JSON.parse($(el).text())); } catch { /* Non-JSON scripts are not evidence. */ } });
        return { state: "retrieved", candidates: candidates.slice(0, 30) };
      } catch { return { state: "access_failed", candidates: [] }; }
    })();
    cache.set(url, job);
    return job;
  }
  const results = [];
  const queue = [...rivieraEvents, summerOnTheRivieraEvent].filter((event, index, all) => all.findIndex(e => e.id === event.id) === index);
  async function worker() {
    while (queue.length) {
      const e = queue.shift();
      const source = e.programmeUrl ?? e.sourceUrl;
      const probe = await inspect(source);
      results.push({ id: e.id, title: e.title, startDate: e.startDate, endDate: e.endDate, dateStatus: e.dateStatus, source,
        coverage: e.sessions?.length ? "structured_sessions" : e.schedule ? "structured_time" : e.dateStatus !== "confirmed" ? "dates_unconfirmed" : e.startDate !== e.endDate ? "date_range_requires_programme" : "time_requires_review",
        publishedLabel: e.dateLabel, venue: e.venue?.name ?? null, sourceProbe: probe,
        matchingDateCandidates: probe.candidates.filter(c => c.startDate.slice(0, 10) === e.startDate),
      });
    }
  }
  await Promise.all(Array.from({ length: 5 }, worker));
  results.sort((a, b) => (a.startDate ?? "9999").localeCompare(b.startDate ?? "9999") || a.id.localeCompare(b.id));
  const counts = results.reduce((acc, row) => { acc[row.coverage] = (acc[row.coverage] ?? 0) + 1; return acc; }, {});
  const report = { checkedAt: new Date().toISOString(), total: results.length, counts, note: "Source retrieval and same-date JSON-LD candidates are NOT editorial verification. No automatic content updates. Missing JSON-LD does not establish that no times are published. Past occurrences must not supply next year's times.", results };
  const target = path.join(__dirname, "../docs/reports/event-timing-audit.json");
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({ total: report.total, counts, fetched: fetchSources, candidateEvents: results.filter(r => r.matchingDateCandidates.length).length, report: "docs/reports/event-timing-audit.json" }));
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });

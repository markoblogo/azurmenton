import { describe, expect, it } from "vitest";
import { mkdtemp, mkdir, writeFile, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { buildEditorialReport, parseEditorialRegistry, type EditorialSnapshot } from "@/lib/editorial-queue";
const { collectSnapshots, renderMarkdown } = createRequire(import.meta.url)("../../scripts/editorial-report.cjs");

const asOf = "2026-10-31";
const guide: EditorialSnapshot = { kind: "guide", targetId: "new-guide", action: "publish", title: "New guide", refs: ["build/guide-intake/new-guide/intake.json"], reportedReady: true };
const registry = { version: 1, items: [] };

describe("single editorial registry and report", () => {
  it("separates pipeline readiness, owner approval and actual publication", () => {
    const report = buildEditorialReport(registry, [guide], [], asOf);
    expect(report.items[0]).toMatchObject({ status: "new", technical: "reported-ready", bucket: "active", liveStatus: "not-checked" });
    expect(report.items[0].nextAction).toMatch(/Re-run/);
    expect(report.counts.active).toBe(1);
  });
  it("does not requeue repository content or call it verified live", () => {
    const report = buildEditorialReport(registry, [guide], [{ kind: "guide", targetId: "new-guide", title: "Existing guide" }], asOf);
    expect(report.items[0]).toMatchObject({ repositoryPresent: true, status: "new", bucket: "repository-present", liveStatus: "not-checked" });
    expect(report.counts.active).toBe(0);
  });
  it("keeps deliberate updates active even when the guide exists", () => {
    const report = buildEditorialReport({ version: 1, items: [{ id: "guide:new-guide:update", kind: "guide", targetId: "new-guide", action: "update", status: "in-progress", priority: "high", refs: ["docs/guide-maintenance-review.md"], nextAction: "Check winter opening times" }] }, [], [{ kind: "guide", targetId: "new-guide", title: "Existing guide" }], asOf);
    expect(report.items[0]).toMatchObject({ bucket: "active", status: "in-progress", nextAction: "Check winter opening times" });
  });
  it("keeps an explicitly approved staged edition visible until public verification", () => {
    const item = { id: "weekly:2026-11-06:publish", kind: "weekly", targetId: "2026-11-06", action: "publish", status: "approved", priority: "high", refs: ["source.ts"], notBefore: "2026-11-06", approval: { by: "owner", on: asOf, reference: "Approved this specific edition" } };
    const target = { kind: "weekly" as const, targetId: "2026-11-06", title: "Staged edition" };
    const before = buildEditorialReport({ ...registry, items: [item] }, [], [target], asOf).items[0];
    expect(before).toMatchObject({ bucket: "active", repositoryPresent: true, status: "approved", liveStatus: "not-checked" });
    expect(before.blockers).toContain("Publication window starts on 2026-11-06; do not publish early");
    const opening = buildEditorialReport({ ...registry, items: [item] }, [], [target], "2026-11-06").items[0];
    expect(opening.bucket).toBe("active");
    expect(opening.blockers).toEqual([]);
    expect(opening.status).toBe("approved");
    const draft=buildEditorialReport({ ...registry, items: [{...item,status:"new",nextAction:"Prepare translations now"}] },[],[target],asOf).items[0];
    expect(draft.nextAction).toBe("Prepare translations now");
    expect(draft.blockers).toContain("Publication window starts on 2026-11-06; do not publish early");
  });
  it("merges repeated artifacts but not different actions or event years", () => {
    const snapshots = [guide, { ...guide, refs: ["other/intake.json"], reportedReady: false }, { ...guide, action: "illustrations" as const }, { kind: "event" as const, action: "publish" as const, targetId: "concert-2026", title: "Concert", refs: ["batch-a.json"], startDate: "2026-12-01", sourceUrl: "https://organiser.test/concert" }, { kind: "event" as const, action: "publish" as const, targetId: "concert-2027", title: "Concert", refs: ["batch-b.json"], startDate: "2027-12-01", sourceUrl: "https://organiser.test/concert" }];
    const report = buildEditorialReport(registry, snapshots, [], asOf);
    expect(report.items).toHaveLength(4);
    expect(report.items.find(item => item.id === "guide:new-guide:publish")).toMatchObject({ technical: "unknown", refs: [guide.refs[0], "other/intake.json"] });
  });
  it("matches event source/date/title conservatively and never title alone", () => {
    const snapshots: EditorialSnapshot[] = [
      { kind: "event", action: "publish", targetId: "source-concert", title: "Concert", sourceUrl: "https://org.test/event?utm_source=x", startDate: "2026-11-04", refs: ["batch.json"] },
      { kind: "event", action: "publish", targetId: "different-concert", title: "Concert", sourceUrl: "https://other.test/event", startDate: "2026-11-04", refs: ["batch.json"] },
    ];
    const report = buildEditorialReport(registry, snapshots, [{ kind: "event", targetId: "canonical-concert", title: "Concert", sourceUrl: "https://org.test/event", startDate: "2026-11-04" }], asOf);
    expect(report.items.find(item => item.targetId === "canonical-concert")?.repositoryPresent).toBe(true);
    expect(report.items.find(item => item.targetId === "different-concert")?.repositoryPresent).toBe(false);
  });
  it("withdraws past candidates without inventing dates for undated ones", () => {
    const report = buildEditorialReport(registry, [{ ...guide, kind: "event", targetId: "past", startDate: "2026-09-01" }, { ...guide, kind: "event", targetId: "undated", reportedReady: null }], [], asOf);
    expect(report.items.find(item => item.targetId === "past")?.bucket).toBe("past");
    expect(report.items.find(item => item.targetId === "undated")?.blockers).toContain("Confirm official event dates");
  });
  it("requires explicit evidence for approved/published and rejects bad registry data", () => {
    const item = { id: "guide:new-guide:publish", kind: "guide", targetId: "new-guide", action: "publish", status: "approved", priority: "normal", refs: ["source.md"] };
    expect(() => parseEditorialRegistry({ version: 1, items: [item] })).toThrow(/approval/);
    const approved = { ...item, approval: { by: "owner", on: asOf, reference: "Owner review in project chat" } };
    expect(() => parseEditorialRegistry({ version: 1, items: [approved] })).not.toThrow();
    expect(() => parseEditorialRegistry({ version: 1, items: [{ ...approved, status: "published" }] })).toThrow(/publication/);
    expect(() => parseEditorialRegistry({ version: 1, items: [approved, approved] })).toThrow(/Duplicate/);
    expect(() => parseEditorialRegistry({ version: 1, items: [{ ...approved, status: "ready-to-send" }] })).toThrow(/status/);
    expect(() => parseEditorialRegistry({ version: 1, items: [{ ...approved, notBefore: "2026-02-30" }] })).toThrow(/date/);
    expect(() => parseEditorialRegistry({ version: 1, items: [{ ...approved, notBefore: "2026-99-99" }] })).toThrow(/Invalid date/);
  });
  it("preserves owner decisions, blockers and planned dates without publishing", () => {
    const item = { id: "guide:new-guide:publish", kind: "guide", targetId: "new-guide", action: "publish", status: "approved", priority: "high", refs: ["source.md"], notBefore: "2026-11-06", blockers: ["Need owner illustration"], approval: { by: "owner", on: asOf, reference: "Explicit approval" } };
    const report = buildEditorialReport({ version: 1, items: [item] }, [guide], [], asOf);
    expect(report.items[0]).toMatchObject({ status: "approved", notBefore: "2026-11-06", liveStatus: "not-checked" });
    expect(report.items[0].blockers).toContain("Need owner illustration");
    expect(report.items[0].nextAction).not.toMatch(/^Publish/);
  });
  it("requires unambiguous existing targets for explicit historical aliases", () => {
    const targetAliases = [{ kind: "guide", alias: "new-guide", targetId: "canonical-guide", reference: "Verified source preamble" }];
    const repository = [{ kind: "guide" as const, targetId: "canonical-guide", title: "Canonical" }];
    expect(buildEditorialReport({ ...registry, targetAliases }, [guide], repository, asOf).items[0]).toMatchObject({ targetId: "canonical-guide", bucket: "repository-present" });
    expect(() => buildEditorialReport({ ...registry, targetAliases }, [], [], asOf)).toThrow(/Unknown/);
    expect(() => buildEditorialReport({ ...registry, targetAliases }, [], [...repository, { kind: "guide", targetId: "new-guide", title: "Other" }], asOf)).toThrow(/conflicts/);
  });
  it("keeps different canonical aliases ambiguous instead of guessing", () => {
    const report = buildEditorialReport(registry, [{ ...guide, aliases: ["other-guide"] }], [{ kind: "guide", targetId: "new-guide", title: "One" }, { kind: "guide", targetId: "other-guide", title: "Two" }], asOf);
    expect(report.items[0].blockers.join()).toMatch(/Ambiguous/);
    expect(report.items[0].repositoryPresent).toBe(false);
  });
  it("retains explicit completion evidence without claiming a new live verification", () => {
    const item = { id: "guide:new-guide:publish", kind: "guide", targetId: "new-guide", action: "publish", status: "published", priority: "normal", refs: ["source.md"], approval: { by: "owner", on: asOf, reference: "Owner review" }, publication: { url: "https://azurmenton.com/en/guide/new-guide", verifiedOn: asOf, reference: "Public route checked" } };
    const report = buildEditorialReport({ ...registry, items: [item] }, [guide], [], asOf);
    expect(report.items[0]).toMatchObject({ bucket: "completed", publication: item.publication, liveStatus: "not-checked" });
    expect(() => parseEditorialRegistry({ ...registry, items: [{ ...item, body: "Do not store content here" }] })).toThrow(/Unknown/);
  });
  it("reads real workflow shapes without rewriting sources or promoting borderline events", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "menton-editorial-"));
    try {
      const intake = "build/guide-intake/sample/intake.json";
      const batch = "src/content/events/batches/sample";
      await mkdir(path.dirname(path.join(root, intake)), { recursive: true });
      await mkdir(path.join(root, batch), { recursive: true });
      const input = JSON.stringify({ slug: "sample", title: "Sample", sectionHeadings: ["Visit"] });
      await writeFile(path.join(root, intake), input);
      await writeFile(path.join(root, batch, "batch.json"), JSON.stringify({ candidates: [{ id: "concert-id", slug: "concert", titleCanonical: "Concert", startDate: "2026-11-06", endDate: "2026-11-07" }], borderline: [{ id: "not-approved" }], excluded: [] }));
      await writeFile(path.join(root, batch, "publishing-queue.json"), JSON.stringify([{ id: "concert-id", slug: "concert", title: "Concert", action: "publish" }, { id: "old", action: "skip-unchanged" }]));
      const first = await collectSnapshots(root);
      expect(first).toEqual(await collectSnapshots(root));
      expect(first.snapshots).toHaveLength(2);
      expect(first.ignored).toEqual({ borderline: 1, excluded: 0, unchanged: 1 });
      expect(first.snapshots[1]).toMatchObject({ targetId: "concert", endDate: "2026-11-07", reportedReady: null });
      expect(await readFile(path.join(root, intake), "utf8")).toBe(input);
      expect(renderMarkdown({ ...buildEditorialReport(registry, first.snapshots, [], asOf), targetAliases: [] })).toContain("No source refresh");
      await writeFile(path.join(root, "build/guide-intake/sample/publication-plan.json"), "{broken");
      await expect(collectSnapshots(root)).rejects.toThrow(/publication-plan.json/);
    } finally { await rm(root, { recursive: true, force: true }); }
  });
});

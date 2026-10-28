import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { validateEditorialSubmission } from "@/lib/editorial-submission";
import { POST } from "@/app/api/editorial-submission/route";
vi.mock("@/lib/turnstile", () => ({ verifyTurnstileToken: vi.fn(async () => ({ ok: true })) }));
vi.mock("@/lib/rate-limit", () => ({ checkBookingRequestRateLimit: vi.fn(() => ({ ok: true })), getClientIdentifierFromHeaders: () => "test" }));
const valid = { type: "event", name: "Editor test", email: "editor@example.com", title: "Concert", date: "2026-11-09", venue: "Hall", organiser: "Organisation", source: "https://example.com/programme", message: "Official programme to review", privacy: "accepted" };
const req = (body: unknown, origin = "https://azurmenton.com") => new Request("https://azurmenton.com/api/editorial-submission", { method: "POST", headers: { Origin: origin }, body: JSON.stringify(body) });
beforeEach(() => { vi.stubEnv("RESEND_API_KEY", "test"); vi.stubEnv("BOOKING_REQUEST_TO_EMAIL", "editor@example.com"); });
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); vi.clearAllMocks(); });
describe("manual editorial intake", () => {
  it("requires event provenance, consent and real dates", () => {
    expect(validateEditorialSubmission(valid)).not.toBeNull();
    for (const update of [{ date: "2026-02-30" }, { source: "javascript:alert(1)" }, { organiser: "" }, { privacy: "" }, { email: "bad" }]) expect(validateEditorialSubmission({ ...valid, ...update })).toBeNull();
    expect(validateEditorialSubmission({ ...valid, type: "correction", page: "https://azurmenton.com/en/events" })).not.toBeNull();
    expect(validateEditorialSubmission({ ...valid, type: "correction", page: "https://example.com" })).toBeNull();
  });
  it("blocks cross-origin and oversized submissions", async () => {
    expect((await POST(req(valid, "https://example.com"))).status).toBe(403);
    expect((await POST(req({ ...valid, message: "a".repeat(25000) }))).status).toBe(413);
  });
  it("sends only a moderation email and never reports failed delivery as success", async () => {
    const fetch = vi.fn<typeof globalThis.fetch>(async () => Response.json({ id: "test-id" })); vi.stubGlobal("fetch", fetch);
    expect((await POST(req(valid))).status).toBe(200);
    expect(fetch).toHaveBeenCalledTimes(1);
    const body = JSON.parse(fetch.mock.calls[0][1]!.body as string);
    expect(body.text).toContain("MANUAL REVIEW ONLY");
    expect(body.reply_to).toBe(valid.email);
    fetch.mockImplementation(async () => new Response("failure", { status: 500 }));
    expect((await POST(req(valid))).status).toBe(502);
    expect((await POST(req({ ...valid, website: "spam" }))).status).toBe(200);
    expect(fetch).toHaveBeenCalledTimes(2);
  });
});

import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";

const id = "00000000-0000-4000-8000-000000000001";
function run(args: string[], response?: object) {
  const stub = `globalThis.fetch = async (url, options) => {
    if (url !== 'https://api.resend.com/emails/${id}' || options.method && options.method !== 'GET') throw Error('unexpected request');
    return Response.json(${JSON.stringify(response)});
  };`;
  try {
    return { code: 0, output: execFileSync(process.execPath, ["--import", `data:text/javascript,${encodeURIComponent(stub)}`, "scripts/booking-email-status.mjs", ...args], {
      encoding: "utf8", env: { ...process.env, RESEND_READ_API_KEY: response ? "test-only" : "" }, stdio: "pipe",
    }) };
  } catch (error) {
    const result = error as { status: number; stdout: string; stderr: string };
    return { code: result.status, output: `${result.stdout}${result.stderr}` };
  }
}

describe("booking email status operator command", () => {
  it("rejects invalid identifiers and missing credentials", () => {
    expect(run(["invalid"]).code).toBe(1);
    expect(run([id]).output).toContain("NOT_CONFIGURED");
  });
  it("reports delivery evidence without printing recipients or content", () => {
    const result = run([id], { last_event: "delivered", to: ["private@example.com"], bcc: ["owner@example.com"], html: "PRIVATE BODY" });
    expect(result.code).toBe(0);
    expect(JSON.parse(result.output)).toMatchObject({ state: "delivered", toCount: 1, bccCount: 1 });
    expect(result.output).not.toContain("@example.com");
    expect(result.output).not.toContain("PRIVATE BODY");
  });
  it.each(["bounced", "delivery_delayed", "new_unknown_state"])("flags %s for investigation", (last_event) => {
    expect(run([id], { last_event }).code).toBe(1);
  });
});

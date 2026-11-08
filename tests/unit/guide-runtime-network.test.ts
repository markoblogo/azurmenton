import { createRequire } from "node:module";
import { expect, it, vi } from "vitest";

const { preflightGuideWrite } = createRequire(import.meta.url)("../../scripts/lib/guide-runtime-network.cjs");

it("skips the network for offline/read-only commands", async () => {
  const fetcher = vi.fn();
  for (const command of ["check", "status", "export"]) await preflightGuideWrite(command, {}, fetcher);
  expect(fetcher).not.toHaveBeenCalled();
});

it("checks the write endpoint without credentials and bounds default SDK retries", async () => {
  const env = { BLOB_READ_WRITE_TOKEN: "never-send-in-probe" } as Record<string, string>;
  const fetcher = vi.fn().mockResolvedValue({ status: 404 });
  await preflightGuideWrite("stage", env, fetcher);
  const [url, options] = fetcher.mock.calls[0];
  expect(url).toBe("https://vercel.com/api/blob");
  expect(options).toMatchObject({ method: "HEAD", redirect: "error" });
  expect(options.headers).toBeUndefined();
  expect(options.signal).toBeInstanceOf(AbortSignal);
  expect(env.VERCEL_BLOB_RETRIES).toBe("1");
});

it("reports captive TLS and timeouts without leaking secrets", async () => {
  for (const error of [new TypeError("fetch failed", { cause: { code: "ERR_TLS_CERT_ALTNAME_INVALID" } }), new DOMException("timeout", "TimeoutError")]) {
    const env = { BLOB_READ_WRITE_TOKEN: "private-token" };
    await expect(preflightGuideWrite("activate", env, vi.fn().mockRejectedValue(error))).rejects.toThrow(/no publication attempted/);
    expect(env).not.toHaveProperty("VERCEL_BLOB_RETRIES");
  }
});

it("preserves explicit retry settings and rejects unavailable endpoints", async () => {
  const env = { VERCEL_BLOB_RETRIES: "0" };
  await preflightGuideWrite("image", env, vi.fn().mockResolvedValue({ status: 401 }));
  expect(env.VERCEL_BLOB_RETRIES).toBe("0");
  for (const status of [429, 503, 511]) await expect(preflightGuideWrite("rollback", {}, vi.fn().mockResolvedValue({ status }))).rejects.toThrow(/no publication attempted/);
});

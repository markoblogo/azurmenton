import { afterEach, describe, expect, it, vi } from "vitest";
import { createCspHeader } from "../../src/lib/security-headers";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("security headers", () => {
  it("keeps the production CSP nonce-based without unsafe-inline", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC", "");

    const csp = createCspHeader("test-nonce");

    expect(csp).toContain("script-src 'self' 'nonce-test-nonce' 'strict-dynamic'");
    expect(csp).toContain("https://plausible.io");
    expect(csp).not.toContain("'unsafe-inline'");
  });

  it("allows the origin of a managed Plausible script URL", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_PLAUSIBLE_API_HOST", "https://plausible.io");
    vi.stubEnv("NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC", "https://analytics.example.com/js/script.js");

    const csp = createCspHeader("test-nonce");

    expect(csp).toContain("https://plausible.io");
    expect(csp).toContain("https://analytics.example.com");
  });
});

import { afterEach, describe, expect, it, vi } from "vitest";
import { createCspHeader } from "../../src/lib/security-headers";
import { radioStations } from "../../src/content/utility/radio";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("security headers", () => {
  it("keeps production scripts nonce-based while allowing framework style attributes", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC", "");

    const csp = createCspHeader("test-nonce");
    const scriptDirective = csp.split(";").find((directive) => directive.trim().startsWith("script-src"));

    expect(scriptDirective).toContain("script-src 'self' 'nonce-test-nonce' 'strict-dynamic'");
    expect(scriptDirective).not.toContain("'unsafe-inline'");
    expect(csp).toContain("style-src-attr 'unsafe-inline'");
    expect(csp).toContain("https://plausible.io");
  });

  it("allows the origin of a managed Plausible script URL", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_PLAUSIBLE_API_HOST", "https://plausible.io");
    vi.stubEnv("NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC", "https://analytics.example.com/js/script.js");

    const csp = createCspHeader("test-nonce");

    expect(csp).toContain("https://plausible.io");
    expect(csp).toContain("https://analytics.example.com");
  });

  it("allows configured radio streams as media and HLS connections", () => {
    const csp = createCspHeader("test-nonce");
    const streamOrigins = new Set(
      radioStations.flatMap((station) => station.audioStreamUrl ? [new URL(station.audioStreamUrl).origin] : []),
    );

    expect(csp).toContain("media-src 'self' blob:");
    expect(csp).toContain("https://streaming-ice.audiomeans.fr");

    for (const origin of streamOrigins) {
      const allowed = csp.includes(origin) || (origin.endsWith(".rcs.revma.com") && csp.includes("https://*.rcs.revma.com"));
      expect(allowed, `${origin} missing from CSP`).toBe(true);
    }
  });
});

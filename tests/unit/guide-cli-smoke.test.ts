import { afterEach, describe, expect, it } from "vitest";
import { execFileSync } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const repoRoot = "/Volumes/Work/Work/menton";
const createdPaths: string[] = [];

async function safeRemove(targetPath: string) {
  await fs.rm(targetPath, { recursive: true, force: true });
}

afterEach(async () => {
  await Promise.all(createdPaths.splice(0).reverse().map((targetPath) => safeRemove(targetPath)));
});

describe("guide CLI smoke", () => {
  it("runs guide:new and guide:assets report-only on a draft with service preamble", { timeout: 15000 }, async () => {
    const stamp = `${Date.now()}`;
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), `guide-cli-smoke-${stamp}-`));
    createdPaths.push(tempDir);

    const draftPath = path.join(tempDir, "draft.txt");
    const coverPath = path.join(tempDir, "cover.png");
    const assetsDir = path.join(tempDir, "assets");
    await fs.mkdir(assetsDir, { recursive: true });

    const raw = `
# **SEO**

- **SEO title:** Post offices in Menton
- **Meta description:** Postal planning guide for travellers in Menton.
- **Canonical slug:** /en/guide/post-offices-smoke

# **Post Offices in Menton**

Short practical intro for smoke testing.

## **Menton**

### **Main Post Office (La Poste Menton)**

Useful for stamps and parcels.
`;

    await Promise.all([
      fs.writeFile(draftPath, raw),
      fs.writeFile(coverPath, "fake-cover"),
      fs.writeFile(path.join(assetsDir, "Main Post Office (La Poste Menton).png"), "fake-place"),
    ]);

    const slug = "post-offices-smoke";
    const intakeDir = path.join(repoRoot, "build", "guide-intake", slug);
    createdPaths.push(intakeDir);

    execFileSync("/usr/bin/env", ["node", "scripts/guide-new.cjs", "--from", draftPath, "--cover", coverPath], {
      cwd: repoRoot,
      stdio: "pipe",
    });

    const intake = JSON.parse(await fs.readFile(path.join(intakeDir, "intake.json"), "utf8"));
    const preamble = JSON.parse(await fs.readFile(path.join(intakeDir, "preamble.json"), "utf8"));
    const draftBody = await fs.readFile(path.join(intakeDir, "draft-body.md"), "utf8");

    expect(intake.slug).toBe(slug);
    expect(preamble.hasPreamble).toBe(true);
    expect(draftBody.startsWith("# **Post Offices in Menton**")).toBe(true);
    expect(draftBody).not.toContain("# **SEO**");

    execFileSync("/usr/bin/env", ["node", "scripts/guide-assets.cjs", "--slug", slug, "--assets-dir", assetsDir, "--report-only"], {
      cwd: repoRoot,
      stdio: "pipe",
    });

    const assetsReport = JSON.parse(await fs.readFile(path.join(intakeDir, "assets-report.json"), "utf8"));
    expect(assetsReport.slug).toBe(slug);
    expect(assetsReport.reportOnly).toBe(true);
    expect(assetsReport.operations.length).toBeGreaterThan(0);
  });
});

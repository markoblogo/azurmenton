import { execFileSync } from "node:child_process";
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { expect, it } from "vitest";

it("rejects missing translations and unknown references without modifying the project", () => {
  const temp = mkdtempSync(path.join(tmpdir(), "guide-package-test-"));
  const slug = "in-the-name-of-my-daughter-villa-maria-serena-menton";
  const fixture = path.join(temp, slug);
  const invoke = () => execFileSync(process.execPath, ["-e", "require('./scripts/guide-package.cjs').compile(process.argv[1])", temp], { cwd: process.cwd(), encoding: "utf8", stdio: "pipe" });
  try {
    cpSync(path.join(process.cwd(), "src/content/guide-packages", slug), fixture, { recursive: true });
    writeFileSync(path.join(fixture, "fr.md"), "");
    expect(invoke).toThrow(/section count differs|no body/);
    cpSync(path.join(process.cwd(), "src/content/guide-packages", slug, "fr.md"), path.join(fixture, "fr.md"));
    const metadata = JSON.parse(readFileSync(path.join(fixture, "metadata.json"), "utf8"));
    metadata.article.relatedPlaces.push("not-a-real-place");
    writeFileSync(path.join(fixture, "metadata.json"), JSON.stringify(metadata));
    expect(invoke).toThrow(/unknown place not-a-real-place/);
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
}, 60000);

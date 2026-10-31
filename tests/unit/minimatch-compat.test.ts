import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { Linter } from "eslint";
import { describe, expect, it } from "vitest";

const require = createRequire(import.meta.url);
const matcher = require("minimatch");
const importPlugin = require("eslint-plugin-import");

describe("patched development glob matching", () => {
  it("delegates both callable and named APIs to the fixed upstream engine", () => {
    const core = require("minimatch-core");
    expect(require("minimatch-core/package.json").version).toBe("11.0.3");
    expect(matcher).toBe(core.minimatch);
    expect(matcher.minimatch).toBe(matcher);
    expect(matcher.Minimatch).toBe(core.Minimatch);
    const consumers = ["eslint", "@eslint/config-array", "@eslint/eslintrc", "eslint-plugin-import", "eslint-plugin-react", "eslint-plugin-jsx-a11y"];
    for (const consumer of consumers) {
      const fromConsumer = createRequire(require.resolve(consumer));
      expect(fromConsumer("minimatch"), consumer).toBe(matcher);
    }
    const modern = createRequire(require.resolve("@typescript-eslint/typescript-estree"))("minimatch");
    expect(modern.minimatch("a.ts", "*.ts")).toBe(true);
    expect(modern.Minimatch).toBeDefined();
  });

  it("preserves the glob options and helpers used by lint tooling", () => {
    expect(matcher("src/app/page.tsx", "**/*.{ts,tsx}")).toBe(true);
    expect(matcher("src/.private.ts", "**/*.ts")).toBe(false);
    expect(matcher("src/.private.ts", "**/*.ts", { dot: true })).toBe(true);
    expect(matcher("src/page.ts", "*.ts", { matchBase: true })).toBe(true);
    expect(matcher("test.js", "!*.ts")).toBe(true);
    expect(matcher("a.tsx", "*.@(ts|tsx)")).toBe(true);
    expect(matcher("README.MD", "*.md", { nocase: true })).toBe(true);
    expect(new matcher.Minimatch("src/**", { dot: true }).match("src/.hidden/a")).toBe(true);
    expect(matcher.makeRe("src/**").test("src/page.ts")).toBe(true);
    expect(matcher.makeRe("src/**").test("other/page.ts")).toBe(false);
    expect(["a.ts", "a.js"].filter(matcher.filter("*.ts"))).toEqual(["a.ts"]);
    expect(matcher.match(["a.ts", "a.js"], "*.ts")).toEqual(["a.ts"]);
    expect(matcher.braceExpand("*.{js,ts}")).toEqual(["*.js", "*.ts"]);
    expect(matcher.defaults({ nocase: true })("A.TS", "*.ts")).toBe(true);
    expect(new (matcher.defaults({ dot: true }).Minimatch)("*").match(".hidden")).toBe(true);
  });

  it("runs real import plugin rules using callable and makeRe APIs", () => {
    const linter = new Linter();
    const config: Linter.Config[] = [{ plugins: { import: importPlugin }, rules: {
      "import/no-unassigned-import": ["error", { allow: ["**/*.css"] }],
      "import/no-internal-modules": ["error", { forbid: ["private/**"] }],
    } }];
    expect(linter.verify('import "theme/styles.css";', config)).toEqual([]);
    const messages = linter.verify('import "private/module";', config);
    expect(messages.map(message => message.ruleId).sort()).toEqual(["import/no-internal-modules", "import/no-unassigned-import"]);
    expect(messages.some(message => message.fatal)).toBe(false);
  });

  it("does not lock an old matcher under another dependency path", () => {
    const lock = JSON.parse(readFileSync(new URL("../../package-lock.json", import.meta.url), "utf8"));
    const engines = Object.entries(lock.packages).filter(([path]) => /node_modules\/minimatch(?:-core)?$/.test(path));
    expect(engines.length).toBeGreaterThan(0);
    for (const [, entry] of engines) {
      const pkg = entry as { link?: boolean; version?: string };
      if (!pkg.link) expect(pkg.version).toBe("11.0.3");
    }
    expect(lock.packages["tools/minimatch-compat"].dev).toBe(true);
  });

  it("bounds adversarial preprocessing in an isolated process", () => {
    const result = spawnSync(process.execPath, ["-e", `
      const assert = require("node:assert/strict");
      const { Minimatch } = require(${JSON.stringify(require.resolve("minimatch-core"))});
      const match = new Minimatch("**/../".repeat(16) + "target", { optimizationLevel: 2 });
      assert.equal(typeof match.match("target"), "boolean");
    `], { timeout: 3000, encoding: "utf8" });
    expect(result.error).toBeUndefined();
    expect(result.status, result.stderr).toBe(0);
  });
});

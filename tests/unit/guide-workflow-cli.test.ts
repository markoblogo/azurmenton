import { describe, expect, it } from "vitest";
import { execFileSync } from "node:child_process";

const parse = (args: string[]) => JSON.parse(execFileSync(process.execPath, ["-e", "const {parseArgs}=require('./scripts/guide-workflow.cjs');console.log(JSON.stringify(parseArgs(JSON.parse(process.argv[1]))));", JSON.stringify(args)], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }));

describe("single guide verification command", () => {
  it("accepts verify with the normal bundler and an explicit webpack fallback", () => {
    expect(parse(["verify", "--slug", "example-guide"])).toEqual({ stage: "verify", slug: "example-guide" });
    expect(parse(["verify", "--slug", "example-guide", "--webpack"])).toEqual({ stage: "verify", slug: "example-guide", webpack: true });
    expect(() => parse(["verify", "--slug", "../private"])).toThrow();
    expect(() => parse(["verify", "--slug", "example", "--public"])).toThrow();
  });
});

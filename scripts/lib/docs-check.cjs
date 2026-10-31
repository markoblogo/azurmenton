/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("node:fs");
const path = require("node:path");

function checkDocumentation(root, files, scripts) {
  const failures = [];
  for (const file of files) {
    const content = fs.readFileSync(path.join(root, file), "utf8");
    const prose = content.replace(/^```[^\n]*\n[\s\S]*?^```\s*$/gm, "").replace(/`[^`\n]+`/g, "");
    for (const match of prose.matchAll(/!?\[[^\]\n]*\]\(\s*(<[^>]+>|[^\s)]+)(?:\s+"[^"]*")?\s*\)/g)) {
      const target = match[1].replace(/^<|>$/g, "");
      if (/^(?:[a-z][a-z\d+.-]*:|#|\/)/i.test(target)) continue;
      let destination;
      try { destination = decodeURIComponent(target.split(/[?#]/)[0]); }
      catch { failures.push(`${file}: invalid link encoding ${target}`); continue; }
      if (!fs.existsSync(path.resolve(root, path.dirname(file), destination))) failures.push(`${file}: missing link target ${target}`);
    }
    // Only npm script names, not shell flags or command arguments, are checked.
    for (const match of content.matchAll(/\bnpm run ([a-z][a-z\d_-]*(?::[a-z\d_-]+)*)/gi)) {
      if (!Object.hasOwn(scripts, match[1])) failures.push(`${file}: unknown npm script ${match[1]}`);
    }
  }
  return [...new Set(failures)].sort();
}

function documentationFiles(root, prefix = "") {
  const result = [];
  for (const entry of fs.readdirSync(path.join(root, prefix), { withFileTypes: true })) {
    const relative = path.posix.join(prefix, entry.name);
    if (entry.isFile() && entry.name.endsWith(".md")) result.push(relative);
    if (entry.isDirectory() && (relative === "docs" || relative.startsWith("docs/")) && relative !== "docs/archive") result.push(...documentationFiles(root, relative));
  }
  return result;
}
module.exports = { checkDocumentation, documentationFiles };

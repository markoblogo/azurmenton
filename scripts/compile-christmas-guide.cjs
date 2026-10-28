/* eslint-disable @typescript-eslint/no-require-imports */
/* Compile the reviewed locale sources; never translate or publish. */
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const folder = path.join(root, 'src/content/guide-data');
const locales = ['en', 'fr', 'it', 'uk'];
const sources = Object.fromEntries(locales.map(locale => {
  const raw = fs.readFileSync(path.join(folder, `christmas-${locale}.md`), 'utf8')
    .replace(/^(SEO title|Meta description|Suggested URL|Category|Best for|Season covered|Programme last checked):.*\n/gm, '');
  return [locale, raw.split(/(?=^## )/m).map(part => part.trim()).filter(Boolean)];
}));
for (const locale of locales) {
  if (sources[locale].length !== 20) throw new Error(`${locale}: expected introduction and 19 sections`);
  if (sources[locale].filter(section => /^## \d+\./.test(section)).length !== 16) throw new Error(`${locale}: missing numbered section`);
}
const records = sources.en.map((_, index) => Object.fromEntries(locales.map(locale => [locale, sources[locale][index]])));
fs.writeFileSync(path.join(folder, 'christmas-french-riviera-from-menton.json'), JSON.stringify(records, null, 2) + '\n');
console.log('Compiled 20 blocks in EN/FR/IT/UK; source markdown retained.');

/* eslint-disable @typescript-eslint/no-require-imports */
const ts = require("typescript");

function applyGuideCover(source, slug, image, title) {
  if (!/^\/images\/guide\/[a-z0-9-]+\.(png|jpe?g|webp)$/i.test(image)) throw new Error("Invalid guide cover path");
  const file = ts.createSourceFile("guide.ts", source, ts.ScriptTarget.Latest, true);
  const matches = [];
  function visit(node) {
    if (ts.isObjectLiteralExpression(node)) {
      const prop = (key) => node.properties.find((item) => ts.isPropertyAssignment(item) && item.name.getText(file) === key);
      const id = prop("id");
      const slugProp = prop("slug");
      if (id && slugProp && ts.isStringLiteral(id.initializer) && ts.isStringLiteral(slugProp.initializer) && id.initializer.text === slug && slugProp.initializer.text === slug) matches.push({ node, prop });
    }
    ts.forEachChild(node, visit);
  }
  visit(file);
  if (matches.length !== 1) throw new Error(`Expected one guide with matching id and slug: ${slug}`);
  const { prop } = matches[0];
  if (prop("coverImage") || prop("coverImageAlt")) throw new Error(`Guide ${slug} already has cover metadata`);
  const status = prop("visualStatus");
  if (!status || !ts.isStringLiteral(status.initializer) || status.initializer.text !== "editorial_placeholder") throw new Error(`Guide ${slug} does not have a replaceable placeholder`);
  const locales = ["en", "fr", "it", "uk"];
  if (locales.some((locale) => typeof title[locale] !== "string" || !title[locale].trim())) throw new Error("Missing localized guide title");
  const prefixes = ["Illustration: ", "Illustration : ", "Illustrazione: ", "Ілюстрація: "];
  const alt = locales.map((locale, index) => JSON.stringify(prefixes[index] + title[locale])).join(", ");
  const insertion = `coverImage: ${JSON.stringify(image)},\n    coverImageAlt: t(${alt}),\n    `;
  return source.slice(0, status.getStart(file)) + insertion + source.slice(status.getStart(file), status.initializer.getStart(file)) + '"project_illustration"' + source.slice(status.initializer.end);
}

module.exports = { applyGuideCover };

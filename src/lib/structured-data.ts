export type JsonLd = Record<string, unknown>;

export function renderJsonLd(data: JsonLd) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}

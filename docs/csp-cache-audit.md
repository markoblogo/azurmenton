# CSP and Cache Performance Audit

Azur Menton currently uses a nonce-based Content Security Policy generated in `src/proxy.ts`. The nonce is passed through `x-nonce` and consumed by inline JSON-LD, Plausible setup, Vercel Analytics integration and Turnstile scripts.

This is the current trade-off:

- Page HTML responses are dynamic because nonce consumers read `headers()`.
- Static assets remain cacheable.
- `/images/:path*` is configured with `Cache-Control: public, max-age=31536000, immutable`.
- Production scripts do not use `unsafe-inline`; they remain nonce-protected with `strict-dynamic`.
- `style-src-attr 'unsafe-inline'` is scoped to style attributes required by React and `next/image`. It does not relax `script-src`.
- Development permits inline styles because Next.js development tooling injects them dynamically; production `style-src` remains nonce-based.
- Approved radio stream origins are explicit in `media-src` and `connect-src`; adding a station requires updating the policy and tests together.
- `hls.js` is dynamically imported only for an HLS stream when the browser lacks native HLS support, so ordinary guide pages do not include the player engine in their initial JavaScript.

Run the repeatable audit after `npm run build`:

```bash
npm run perf:csp
```

The report reads the build manifests and source files, then prints dynamic/prerendered route counts, nonce consumers, CSP safety checks and the HLS on-demand loading guard.

Future optimization should not weaken CSP. Safer options to test first:

- split CSP handling for pages that do not render inline scripts or JSON-LD;
- move selected structured data to cacheable route handlers where practical;
- keep Turnstile and analytics script loading behind nonce-compatible paths.

External radio streams remain third-party dependencies and can be temporarily unavailable even when the site is healthy. Keep the station website link as the non-audio fallback and never proxy an unreviewed stream through the booking application.

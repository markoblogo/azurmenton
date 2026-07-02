# CSP and Cache Performance Audit

Azur Menton currently uses a nonce-based Content Security Policy generated in `src/proxy.ts`. The nonce is passed through `x-nonce` and consumed by inline JSON-LD, Plausible setup, Vercel Analytics integration and Turnstile scripts.

This is the current trade-off:

- Page HTML responses are dynamic because nonce consumers read `headers()`.
- Static assets remain cacheable.
- `/images/:path*` is configured with `Cache-Control: public, max-age=31536000, immutable`.
- The CSP does not use production `unsafe-inline`.

Run the repeatable audit after `npm run build`:

```bash
npm run perf:csp
```

The report reads the build manifests and source files, then prints dynamic/prerendered route counts, nonce consumers and CSP safety checks.

Future optimization should not weaken CSP. Safer options to test first:

- split CSP handling for pages that do not render inline scripts or JSON-LD;
- move selected structured data to cacheable route handlers where practical;
- keep Turnstile and analytics script loading behind nonce-compatible paths.

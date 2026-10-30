# Guide Catalogue: Mobile Loading Pass

30 October 2026. Baseline: `3864a111a5f44f269ffb8d198d2eb19182c6bfed`.

## Diagnosis And Changes

The mobile LCP element is the main heading, not a cover image. The previous isolated 3.9s result was not treated as a stable baseline. Three fresh runs showed substantial variation.

The root layout preloaded four font files, including monospace and Cyrillic resources not needed for the English catalogue's first screen. Monospace now loads on demand. Cormorant only preloads its Latin subset; Cyrillic remains in the generated font CSS and loads for Ukrainian text. No font family or weight was removed.

Hero thumbnails previously advertised the shared image default of up to 100vw on mobile despite occupying roughly half the container. `GuideVisual` now accepts an optional `sizes` prop, with the previous default retained for other callers. The four hero thumbnails, catalogue grid and fixed-width collection thumbnails declare their actual responsive slots. Original images, quality 90, layout, four hero picks, NEW slot, article order, SSR text and search/filter behaviour are unchanged. No extra image preloads were added below the first mobile viewport.

## Comparable Lab Runs

- Same local production webpack build mode, machine, URL `http://127.0.0.1:3131/en/guide` and Lighthouse 12.8.2, Chromium 153.0.0.0.
- Mobile 412x823, DPR 1.75, simulated throttling: 150ms RTT, 1638.4Kbps throughput, 4x CPU slowdown; other Lighthouse defaults retained.
- Three sequential runs before and three after, fresh browser storage, warm server/image cache. No concurrent builds, tests or other agent-launched benchmarks during each series. Other activity on the host was not controlled.
- Same config blocked Plausible, external Vercel analytics, Resend and Telegram hosts in both phases. No real booking or email was submitted. Local `/_vercel/insights/script.js` is unavailable in both phases; this is not a production failure claim.

| Metric | Before | After |
| --- | --- | --- |
| LCP runs | 3.79 / 3.27 / 2.39s | 2.69 / 3.88 / 3.06s |
| Median LCP | 3.27s | 3.06s |
| Median Performance score | 91 | 94 |
| Median FCP | 1.59s | 1.54s |
| Median TBT | 99.5ms | 94ms |
| CLS, every run | 0 | 0 |
| Accessibility / SEO, every run | 100 / 100 | 100 / 100 |
| Font transfer, every run | 113,900 bytes | 68,362 bytes |
| Image transfer, every run | 506,004 bytes | 265,122 bytes |

Font transfer fell 40%; image transfer fell 48%. Those are repeatable reductions in this setup. The median LCP improved by 0.21s (6.4%), but ranges overlap: **these six runs do not prove a large or statistically reliable LCP improvement**. The 2.5s good-LCP target is not consistently reached, and no field Core Web Vitals improvement is claimed.

Raw reports: `/private/tmp/menton-guide-{before,after}-{1,2,3}.json`; summaries: `/private/tmp/menton-guide-{before,after}-summary.json`. Reproduction uses `npm exec --yes --package=lighthouse@12.8.2 -- lighthouse <url> --config-path=<same-config> --chrome-flags="--headless --no-sandbox" --quiet --output=json --output-path=<report>`, with `CHROME_PATH` set to the same Playwright Chromium executable. Do not compare against a different port/build mode, viewport, cache protocol, throttling or Lighthouse version as if it were the same experiment.

## Regression And Visual Checks

`tests/e2e/guide-performance.spec.ts` guards two critical font preloads, successful real hero-image loading with image candidates no wider than 384px at the tested mobile DPR, Ukrainian Cyrillic font availability, and the monospace font on Travel Tools. The font-budget test failed with four preloads before the fix and passed after it. First-time image optimisation may need more than five seconds locally; the image readiness assertion allows fifteen seconds and still rejects a failed image.

The 412x900 first-viewport screenshots before/after are byte-identical. Desktop 1440x900 was visually inspected, with the same layout and smaller image candidates. Screenshots: `/private/tmp/guide-perf-{before,after}-{412,1440}.png`.

Unit suite: 398 tests passed. All 56 browser scenarios passed, including the three new performance guards. Lint, production build, content/SEO/weekly/funnel preflight and post-build CSP checks passed. Public-release checks remain a separate gate; CI must cover the published commit. No content records, existing covers or private trip data were changed.

### Linux CI Follow-Up

The first publication exposed a 7px overflow in the Italian contextual-correction form on Linux, despite the complete local suite passing. Its native type selector had unconstrained intrinsic sizing. A separate long-option regression reproduced the mechanism locally (307px overflow), without relaxing the existing zero-overflow assertion. The form now has an explicit single mobile grid track and the selector/textarea wrappers have `min-width: 0` and constrained widths. This fixes the field layout instead of hiding page overflow. All 57 browser scenarios passed on the rebuilt follow-up, including the long-option case. Linux CI and domain checks remain separate release gates. This form-only repair does not change the guide performance configuration above.

The synthetic long-option fixture waits for `document.fonts.ready` before changing option text, to test settled native-control sizing rather than race a platform font swap. It retains an exact zero-overflow assertion and logs control/page geometry on failure. The original four-locale contextual scenario keeps its immediate zero-overflow check unchanged.

## Remaining Work

If continuing performance work, profile the heading's render delay, render-blocking CSS and initial JavaScript before considering larger catalogue changes. Do not remove useful content, weaken CSP, change the typeface or claim real-user speed gains merely to improve a single lab score. Collect field evidence where traffic permits.

References: [LCP diagnosis and lab/field limits](https://web.dev/articles/optimize-lcp), [Next.js font subsets/preloading](https://nextjs.org/docs/app/api-reference/components/font#subsets). Installed Next.js 16.4.3 documentation was also checked before implementation.

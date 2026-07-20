---
title: fallback-provider-pool
scope: local-notes
---

# Fallback-provider pool (session checklist)

Use this as a local reference only when model/provider selection is blocked and no stable primary is available.

## 1) Candidate scan

- [ ] Identify `provider_candidate` and `provider_class`.
- [ ] Route candidates by class:
  - `free-api` (openrouter, google-ai-studio, huggingface, cloudflare-workers-ai, vercel-ai-gateway)
  - `trial-credit` (fireworks, nebius, baseten, ai21, upstage, modal)
  - `local` (existing local model stack)
- [ ] Ensure no mandatory production approval path is bypassed.

## 2) Validation before use

- [ ] Check region/geo and signup constraints.
- [ ] Confirm quotas/rate limits against expected workload.
- [ ] Confirm privacy/training/retention policy.
- [ ] Check canary cost impact even for free tiers.

## 3) Decision record

- [ ] `fallback_provider`: _____
- [ ] `selection_rationale`: _____
- [ ] `fallback_reason`: _____ (outage / quota / deny / experiment)
- [ ] `tested_at` (UTC): _____
- [ ] `owner_approval` for prod-bound switch: yes/no
- [ ] `re-entry_condition`: when/what restores primary provider

## 4) Run rules

- [ ] Treat entries as `potential` until confirmed by local checks.
- [ ] No automatic production routing.
- [ ] On failure, log error class and evidence link.

## 5) Close state

- [ ] Mark provider as `CONFIRMED` / `DEPRECATED` / `SUPERSEDED` with evidence.

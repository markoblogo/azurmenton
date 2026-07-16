# CortexABV guest-AI boundary

## Status

AzurMenton has no guest chat, AI endpoint, model integration, retrieval service, or automated booking action today. This document records the boundary for a future project tenant; it does not authorize implementation or public claims that a chat exists.

## Intended scope

The future surface may provide read-only, guide-grounded help from a reviewed versioned source pack built from the typed guide, FAQ, and place content. Every factual answer must be traceable to that pack. If the pack cannot support a claim, the surface must abstain rather than infer or invent it.

## Hard limits

- No booking mutation, availability confirmation, price or payment assertion, payment handling, or external messaging.
- No access to personal context, another CortexABV tenant, partner-project data, credentials, or internal workflow state.
- No retention of guest messages or identity in the Source Pack or evaluation fixtures.
- No use of live opening hours, events, transport, prices, availability, or safety details unless a separately reviewed source and policy explicitly permit it.
- No automatic public-site edits, social publishing, or changes to the manual booking flow.

Availability, booking, price/payment, emergency/safety, and any unverifiable request must hand off to the existing human-operated route or abstain as the policy requires.

## Required gates before any implementation

1. A read-only versioned guide/FAQ/place source manifest with file-level provenance.
2. A guest-chat policy that requires citations, abstention, and handoff behavior.
3. A shadow-only evaluation pack covering grounded answers, abstentions, and handoffs.
4. A human-reviewed candidate-answer run against that pack.
5. Explicit owner approval for any runtime, data retention, or user-facing change.

The first three are private CortexABV contracts, not application code in this repository. A future implementation must add its own privacy, security, consent, retention, and production-review design before it can receive guest messages.

#!/usr/bin/env node
// Read-only: retrieve delivery evidence for one known Resend message, without PII.
const id = process.argv[2];
if (!id || !/^[a-f0-9-]{36}$/i.test(id)) {
  console.error("Usage: node scripts/booking-email-status.mjs <Resend message UUID>");
  process.exitCode = 1;
} else if (!process.env.RESEND_READ_API_KEY) {
  console.error("NOT_CONFIGURED: provide RESEND_READ_API_KEY with permission to retrieve sent email.");
  process.exitCode = 1;
} else {
  try {
    const response = await fetch(`https://api.resend.com/emails/${id}`, {
      headers: { Authorization: `Bearer ${process.env.RESEND_READ_API_KEY}` },
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    const known = new Set(["sent", "delivered", "delivery_delayed", "bounced", "complained", "opened", "clicked", "failed", "queued", "scheduled", "suppressed"]);
    const state = known.has(data.last_event) ? data.last_event : "unknown";
    console.log(JSON.stringify({ providerMessageId: id, state,
      toCount: Array.isArray(data.to) ? data.to.length : null,
      bccCount: Array.isArray(data.bcc) ? data.bcc.length : null,
      scope: "message-level provider evidence; does not prove every recipient received the message in Inbox" }, null, 2));
    if (["unknown", "failed", "bounced", "complained", "suppressed", "delivery_delayed"].includes(state)) process.exitCode = 1;
  } catch {
    console.error("ACCESS_FAILED: delivery status unavailable; check read permission and provider availability.");
    process.exitCode = 1;
  }
}

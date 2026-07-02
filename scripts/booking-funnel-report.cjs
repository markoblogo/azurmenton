#!/usr/bin/env node

const events = [
  "check_availability_view",
  "booking_form_start",
  "booking_request_submit_success",
  "booking_request_submit_error",
];

const props = [
  "locale",
  "page_type",
  "page_path",
  "apartment",
  "parking",
  "preferred_language",
  "has_dates",
  "has_email",
  "has_phone",
  "has_message",
  "guests",
  "stay_nights",
  "lead_time_days",
];

const dashboardViews = [
  "Funnel by locale: check_availability_view -> booking_form_start -> booking_request_submit_success",
  "Funnel by page_type: check_availability_view -> booking_form_start -> booking_request_submit_success",
  "Submission error rate: booking_request_submit_error / booking_form_start by locale and apartment",
  "Apartment demand: booking_request_submit_success by apartment, stay_nights and lead_time_days",
  "Contact preference quality: success/error by has_email and has_phone",
];

console.log("Azur Menton booking funnel report spec");
console.log("");
console.log("Canonical events");
for (const event of events) console.log(`- ${event}`);
console.log("");
console.log("Tracked properties");
for (const prop of props) console.log(`- ${prop}`);
console.log("");
console.log("Recommended dashboard views");
for (const view of dashboardViews) console.log(`- ${view}`);
console.log("");
console.log("Privacy note: tracked properties are aggregate booking context only; names, emails, phone numbers and message text are never sent as analytics props.");

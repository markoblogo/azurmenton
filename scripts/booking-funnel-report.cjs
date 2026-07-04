#!/usr/bin/env node

const events = [
  "check_availability_view",
  "guide_cta_click",
  "event_cta_click",
  "apartment_cta_click",
  "booking_form_start",
  "booking_request_submit_success",
  "booking_request_submit_error",
  "whatsapp_click",
  "email_click",
];

const props = [
  "locale",
  "page_type",
  "page_path",
  "sourcePageType",
  "sourceSlug",
  "sourceGuideSlug",
  "sourceEventSlug",
  "sourceApartmentSlug",
  "apartment",
  "apartmentPreference",
  "visitingForEvent",
  "dateFlexibility",
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
  "Source conversion: guide_cta_click/event_cta_click/apartment_cta_click -> check_availability_view -> booking_request_submit_success by sourceSlug",
  "Guide impact: guide_cta_click and booking_request_submit_success by sourceGuideSlug",
  "Event impact: event_cta_click and booking_request_submit_success by sourceEventSlug",
  "Submission error rate: booking_request_submit_error / booking_form_start by locale and apartment",
  "Apartment demand: booking_request_submit_success by apartmentPreference, stay_nights and lead_time_days",
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

"use client";

import { useActionState } from "react";
import { submitBookingRequest, type BookingRequestState } from "@/app/actions/booking-request";
import { Button } from "@/components/ui/Button";
import type { Apartment } from "@/content/apartments";
import { localeLabels, locales, type Locale } from "@/i18n/locales";

const initialState: BookingRequestState = {
  status: "idle",
  message: "",
};

export function BookingRequestForm({
  apartments,
  locale,
}: {
  apartments: Apartment[];
  locale: Locale;
}) {
  const [state, formAction, pending] = useActionState(submitBookingRequest, initialState);
  const today = new Date().toISOString().slice(0, 10);

  return (
    <form action={formAction} className="grid gap-5" aria-label="Booking request form">
      <label className="grid gap-2 text-sm font-semibold text-[#17313a]">
        Apartment
        <select className="field" name="apartment" defaultValue="" required>
          <option value="" disabled>
            Select an apartment
          </option>
          {apartments.map((apartment) => (
            <option key={apartment.slug} value={apartment.slug}>
              {apartment.shortName[locale]}
            </option>
          ))}
          <option value="not-sure">Not sure, please recommend</option>
        </select>
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-[#17313a]">
          Check-in date
          <input className="field" min={today} name="checkIn" type="date" required />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-[#17313a]">
          Check-out date
          <input className="field" min={today} name="checkOut" type="date" required />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-[#17313a]">
          Adults
          <input className="field" max="8" min="1" name="adults" type="number" defaultValue="2" required />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-[#17313a]">
          Children
          <input className="field" max="8" min="0" name="children" type="number" defaultValue="0" required />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-[#17313a]">
          Need parking?
          <select className="field" name="parking" defaultValue="not-sure" required>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="not-sure">Not sure</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-[#17313a]">
          Preferred language
          <select className="field" name="preferredLanguage" defaultValue={locale} required>
            {locales.map((item) => (
              <option key={item} value={item}>
                {localeLabels[item]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-[#17313a]">
          Name
          <input className="field" name="name" placeholder="Guest name" required />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-[#17313a]">
          Email
          <input className="field" name="email" placeholder="guest@example.com" type="email" />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-semibold text-[#17313a]">
        Phone or WhatsApp
        <input className="field" name="phone" placeholder="+33..." />
      </label>

      <label className="grid gap-2 text-sm font-semibold text-[#17313a]">
        Message
        <textarea
          className="field min-h-32"
          name="message"
          placeholder="Tell us who is travelling and any questions."
        />
      </label>

      <div className="rounded-md border border-[#d9cdbd] bg-[#fff3df] p-4 text-sm leading-6 text-[#5c5044]">
        To avoid double bookings while we connect our channel manager, all direct requests are confirmed manually by the host.
      </div>

      {state.message ? (
        <div
          className={
            state.status === "success"
              ? "rounded-md border border-[#8ab59b] bg-[#eef8f1] p-4 text-sm font-semibold text-[#27553a]"
              : "rounded-md border border-[#d9a08f] bg-[#fff0eb] p-4 text-sm font-semibold text-[#8a3b26]"
          }
          role="status"
        >
          {state.message}
        </div>
      ) : null}

      <Button type="submit">{pending ? "Sending request..." : "Send request"}</Button>
    </form>
  );
}

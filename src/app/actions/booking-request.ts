"use server";

export type BookingRequestState = {
  status: "idle" | "success" | "error";
  message: string;
};

const requiredFields = [
  "apartment",
  "checkIn",
  "checkOut",
  "adults",
  "children",
  "parking",
  "preferredLanguage",
  "name",
  "email",
] as const;

function formDataToObject(formData: FormData) {
  return Object.fromEntries(
    Array.from(formData.entries()).map(([key, value]) => [key, String(value)]),
  );
}

export async function submitBookingRequest(
  _previousState: BookingRequestState,
  formData: FormData,
): Promise<BookingRequestState> {
  const payload = formDataToObject(formData);
  const missingField = requiredFields.find((field) => !payload[field]?.trim());

  if (missingField) {
    return {
      status: "error",
      message: "Please complete the required fields before sending your request.",
    };
  }

  console.info("Azur Menton booking request placeholder", {
    ...payload,
    receivedAt: new Date().toISOString(),
  });

  return {
    status: "success",
    message:
      "Thank you. We received your request and will confirm availability and the best direct offer shortly.",
  };
}

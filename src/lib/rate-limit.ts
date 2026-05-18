const bookingWindowMs = 15 * 60 * 1000;
const bookingMaxRequests = 5;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const bookingRequestBuckets = new Map<string, RateLimitEntry>();

function firstForwardedIp(value: string | null) {
  return value?.split(",")[0]?.trim() || "";
}

export function getClientIdentifierFromHeaders(headersList: Headers) {
  return (
    firstForwardedIp(headersList.get("x-forwarded-for")) ||
    headersList.get("x-real-ip") ||
    headersList.get("cf-connecting-ip") ||
    "unknown"
  );
}

export function checkBookingRequestRateLimit(identifier: string) {
  const now = Date.now();
  const key = identifier || "unknown";
  const current = bookingRequestBuckets.get(key);

  if (!current || current.resetAt <= now) {
    bookingRequestBuckets.set(key, {
      count: 1,
      resetAt: now + bookingWindowMs,
    });
    return { ok: true, remaining: bookingMaxRequests - 1, resetAt: now + bookingWindowMs };
  }

  if (current.count >= bookingMaxRequests) {
    return { ok: false, remaining: 0, resetAt: current.resetAt };
  }

  current.count += 1;

  if (bookingRequestBuckets.size > 500) {
    for (const [bucketKey, bucket] of bookingRequestBuckets) {
      if (bucket.resetAt <= now) {
        bookingRequestBuckets.delete(bucketKey);
      }
    }
  }

  return {
    ok: true,
    remaining: Math.max(bookingMaxRequests - current.count, 0),
    resetAt: current.resetAt,
  };
}

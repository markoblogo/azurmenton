type TurnstileVerifyResponse = {
  success: boolean;
  "error-codes"?: string[];
};

const turnstileVerifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export function isTurnstileEnabled() {
  return Boolean(process.env.TURNSTILE_SECRET_KEY);
}

export async function verifyTurnstileToken(token: string | null | undefined, remoteIp?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    return { ok: true, skipped: true };
  }

  if (!token) {
    return { ok: false, skipped: false, error: "missing-token" };
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });

  if (remoteIp && remoteIp !== "unknown") {
    body.set("remoteip", remoteIp);
  }

  try {
    const response = await fetch(turnstileVerifyUrl, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return { ok: false, skipped: false, error: `verify-http-${response.status}` };
    }

    const result = (await response.json()) as TurnstileVerifyResponse;

    return {
      ok: result.success,
      skipped: false,
      error: result.success ? undefined : result["error-codes"]?.join(",") || "verify-failed",
    };
  } catch {
    return { ok: false, skipped: false, error: "verify-error" };
  }
}

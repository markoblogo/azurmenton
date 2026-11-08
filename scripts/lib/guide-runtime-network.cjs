const writeCommands = new Set(["stage", "image", "activate", "rollback"]);

async function preflightGuideWrite(command, env = process.env, fetcher = fetch) {
  if (!writeCommands.has(command)) return;
  const endpoint = env.VERCEL_BLOB_API_URL || env.NEXT_PUBLIC_VERCEL_BLOB_API_URL || "https://vercel.com/api/blob";
  try {
    // No credentials: check TLS/connectivity before the SDK can retry uploads.
    const response = await fetcher(endpoint, { method: "HEAD", redirect: "error", signal: AbortSignal.timeout(10_000) });
    if (response.status === 429 || response.status >= 500) throw Error("Write endpoint unavailable");
  } catch (error) {
    const code = error.cause?.code || error.name || "NETWORK_ERROR";
    throw Error(`Blob write connectivity check failed (${code}); no publication attempted. Restore trusted connectivity before retrying.`);
  }
  env.VERCEL_BLOB_RETRIES ??= "1";
}

module.exports = { preflightGuideWrite };

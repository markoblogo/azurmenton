export const editorialKinds = ["guide", "event", "weekly", "detail", "place"] as const;
export const editorialActions = ["publish", "update", "illustrations", "verify"] as const;
export const editorialStatuses = ["new", "in-progress", "review", "approved", "published", "deferred", "rejected"] as const;
type Kind = typeof editorialKinds[number];
type Action = typeof editorialActions[number];
type Status = typeof editorialStatuses[number];
type Evidence = { by: string; on: string; reference: string };
type TargetAlias = { kind: Kind; alias: string; targetId: string; reference: string };
export type EditorialItem = {
  id: string; kind: Kind; targetId: string; action: Action; status: Status;
  priority: "high" | "normal" | "low"; refs: string[]; title?: string;
  nextAction?: string; blockers?: string[]; notBefore?: string; decisionReason?: string;
  approval?: Evidence; publication?: { url: string; verifiedOn: string; reference: string };
};
export type EditorialSnapshot = {
  kind: Kind; targetId: string; action: Action; title: string; refs: string[];
  aliases?: string[]; sourceUrl?: string; startDate?: string; endDate?: string;
  reportedReady?: boolean | null; blockers?: string[];
};
export type RepositoryEditorialTarget = {
  kind: Kind; targetId: string; title: string; aliases?: string[];
  sourceUrl?: string; startDate?: string; endDate?: string;
};

function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Expected an object");
  return value as Record<string, unknown>;
}
function knownFields(value: Record<string, unknown>, fields: string[]) {
  for (const field of Object.keys(value)) if (!fields.includes(field)) throw new Error(`Unknown registry field: ${field}`);
}
function text(value: unknown, field: string) {
  if (typeof value !== "string" || !value.trim() || value.length > 2000) throw new Error(`Invalid ${field}`);
}
export function editorialDate(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T12:00:00Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}
function date(value: unknown, field: string) {
  if (!editorialDate(value)) throw new Error(`Invalid date: ${field}`);
}
function evidence(value: unknown) {
  const record = object(value);
  knownFields(record, ["by", "on", "reference"]);
  for (const field of ["by", "reference"]) text(record[field], `approval.${field}`);
  date(record.on, "approval.on");
}
export function parseEditorialRegistry(value: unknown): { version: 1; items: EditorialItem[]; targetAliases: TargetAlias[] } {
  const registry = object(value);
  knownFields(registry, ["version", "items", "targetAliases"]);
  if (registry.version !== 1 || !Array.isArray(registry.items) || registry.items.length > 10000) throw new Error("Invalid editorial registry version/items");
  const aliases = registry.targetAliases ?? [];
  if (!Array.isArray(aliases)) throw new Error("Invalid targetAliases");
  const aliasKeys = new Set<string>();
  for (const value of aliases) {
    const alias = object(value);
    knownFields(alias, ["kind", "alias", "targetId", "reference"]);
    if (!editorialKinds.includes(alias.kind as Kind)) throw new Error("Invalid alias kind");
    for (const field of ["alias", "targetId"]) {
      if (typeof alias[field] !== "string" || !/^[a-z0-9][a-z0-9-]*$/.test(alias[field] as string)) throw new Error(`Invalid alias ${field}`);
    }
    text(alias.reference, "alias.reference");
    const key = `${alias.kind}:${alias.alias}`;
    if (aliasKeys.has(key)) throw new Error(`Duplicate target alias: ${key}`);
    aliasKeys.add(key);
  }
  const ids = new Set<string>();
  const allowed = new Set(["id", "kind", "targetId", "action", "status", "priority", "refs", "title", "nextAction", "blockers", "notBefore", "decisionReason", "approval", "publication"]);
  for (const value of registry.items) {
    const item = object(value);
    for (const key of Object.keys(item)) if (!allowed.has(key)) throw new Error(`Unknown registry field: ${key}`);
    if (!editorialKinds.includes(item.kind as Kind) || !editorialActions.includes(item.action as Action)) throw new Error("Invalid kind/action");
    if (!editorialStatuses.includes(item.status as Status)) throw new Error("Invalid status");
    if (!["high", "normal", "low"].includes(item.priority as string)) throw new Error("Invalid priority");
    if (typeof item.targetId !== "string" || !/^[a-z0-9][a-z0-9-]*$/.test(item.targetId)) throw new Error("Invalid targetId");
    if (item.id !== `${item.kind}:${item.targetId}:${item.action}`) throw new Error("Invalid task id");
    if (ids.has(item.id as string)) throw new Error(`Duplicate task id: ${item.id}`);
    ids.add(item.id as string);
    if (!Array.isArray(item.refs) || !item.refs.length || item.refs.length > 100) throw new Error("Invalid refs");
    for (const ref of item.refs) text(ref, "ref");
    for (const field of ["title", "nextAction", "decisionReason"]) if (item[field] !== undefined) text(item[field], field);
    if (item.blockers !== undefined) {
      if (!Array.isArray(item.blockers) || item.blockers.length > 50) throw new Error("Invalid blockers");
      for (const blocker of item.blockers) text(blocker, "blocker");
    }
    if (item.notBefore !== undefined) date(item.notBefore, "notBefore");
    if (item.approval !== undefined) evidence(item.approval);
    if (item.status === "approved" || item.status === "published") {
      if (!item.approval) throw new Error("Explicit approval evidence required");
    }
    if (["deferred", "rejected"].includes(item.status as string) && !item.decisionReason) throw new Error("decisionReason required");
    if (item.publication !== undefined) {
      const publication = object(item.publication);
      knownFields(publication, ["url", "verifiedOn", "reference"]);
      text(publication.reference, "publication.reference");
      date(publication.verifiedOn, "publication.verifiedOn");
      const url = new URL(String(publication.url));
      if (url.protocol !== "https:" || url.hostname !== "azurmenton.com" || url.username || url.password) throw new Error("Invalid publication URL");
    }
    if (item.status === "published" && !item.publication) throw new Error("Explicit publication evidence required");
  }
  return { version: 1, items: registry.items as EditorialItem[], targetAliases: aliases as TargetAlias[] };
}

function sourceKey(value: { sourceUrl?: string; startDate?: string; title: string }) {
  if (!value.sourceUrl || !editorialDate(value.startDate)) return undefined;
  try {
    const url = new URL(value.sourceUrl);
    url.hash = "";
    for (const key of [...url.searchParams.keys()]) if (key.startsWith("utm_")) url.searchParams.delete(key);
    url.searchParams.sort();
    return `${url.toString().replace(/\/$/, "")}|${value.startDate}|${value.title.trim().toLowerCase().replace(/\s+/g, " ")}`;
  } catch { return undefined; }
}

export function buildEditorialReport(rawRegistry: unknown, snapshots: EditorialSnapshot[], repository: RepositoryEditorialTarget[], asOf: string) {
  date(asOf, "asOf");
  const registry = parseEditorialRegistry(rawRegistry);
  const targetIndex = new Map<string, RepositoryEditorialTarget[]>();
  const sourceIndex = new Map<string, RepositoryEditorialTarget[]>();
  for (const target of repository) {
    for (const alias of new Set([target.targetId, ...(target.aliases ?? [])])) {
      const key = `${target.kind}:${alias}`;
      targetIndex.set(key, [...(targetIndex.get(key) ?? []), target]);
    }
    const source = sourceKey(target);
    if (target.kind === "event" && source) sourceIndex.set(source, [...(sourceIndex.get(source) ?? []), target]);
  }
  for (const alias of registry.targetAliases) {
    const target = repository.filter(item => item.kind === alias.kind && item.targetId === alias.targetId);
    if (target.length !== 1) throw new Error(`Unknown/ambiguous canonical alias target: ${alias.targetId}`);
    const key = `${alias.kind}:${alias.alias}`;
    if ((targetIndex.get(key) ?? []).some(item => item.targetId !== alias.targetId)) throw new Error(`Alias conflicts with canonical record: ${key}`);
    targetIndex.set(key, target);
  }
  function resolve(input: { kind: Kind; targetId: string; aliases?: string[]; sourceUrl?: string; startDate?: string; title?: string }) {
    const matches = new Map<string, RepositoryEditorialTarget>();
    for (const alias of [input.targetId, ...(input.aliases ?? [])]) for (const item of targetIndex.get(`${input.kind}:${alias}`) ?? []) matches.set(item.targetId, item);
    if (!matches.size && input.kind === "event" && input.title) {
      const key = sourceKey({ ...input, title: input.title });
      for (const item of key ? sourceIndex.get(key) ?? [] : []) matches.set(item.targetId, item);
    }
    return { target: matches.size === 1 ? [...matches.values()][0] : undefined, ambiguous: matches.size > 1 };
  }
  type Group = { snapshots: EditorialSnapshot[]; item?: EditorialItem; repository?: RepositoryEditorialTarget; ambiguous: boolean };
  const groups = new Map<string, Group>();
  const eventAliases = new Map<string, string>();
  for (const snapshot of [...snapshots].sort((a, b) => `${a.kind}:${a.targetId}:${a.refs.join()}`.localeCompare(`${b.kind}:${b.targetId}:${b.refs.join()}`))) {
    const resolved = resolve(snapshot);
    const source = snapshot.kind === "event" ? sourceKey(snapshot) : undefined;
    const targetId = resolved.target?.targetId ?? (source ? eventAliases.get(source) : undefined) ?? snapshot.targetId;
    if (source) eventAliases.set(source, targetId);
    const key = `${snapshot.kind}:${targetId}:${snapshot.action}`;
    const group = groups.get(key) ?? { snapshots: [], repository: resolved.target, ambiguous: false };
    group.snapshots.push({ ...snapshot, targetId });
    group.ambiguous ||= resolved.ambiguous;
    groups.set(key, group);
  }
  for (const item of registry.items) {
    const resolved = resolve(item);
    const targetId = resolved.target?.targetId ?? item.targetId;
    const key = `${item.kind}:${targetId}:${item.action}`;
    const group = groups.get(key) ?? { snapshots: [], repository: resolved.target, ambiguous: resolved.ambiguous };
    if (group.item) throw new Error(`Duplicate canonical registry task: ${key}`);
    group.item = item;
    group.repository ??= resolved.target;
    group.ambiguous ||= resolved.ambiguous;
    groups.set(key, group);
  }
  const items = [...groups.entries()].map(([id, group]) => {
    const owner = group.item;
    const snapshot = group.snapshots[0];
    const [kind, targetId, action] = id.split(":") as [Kind, string, Action];
    const status = owner?.status ?? "new";
    const readiness = new Set(group.snapshots.map(value => value.reportedReady ?? null));
    const technical = readiness.size === 1 && readiness.has(true) ? "reported-ready" : readiness.size === 1 && readiness.has(false) ? "reported-blocked" : "unknown";
    const blockers = [...new Set([...(owner?.blockers ?? []), ...group.snapshots.flatMap(value => value.blockers ?? [])])];
    if (owner?.notBefore && owner.notBefore > asOf) blockers.push(`Publication window starts on ${owner.notBefore}; do not publish early`);
    if (group.ambiguous) blockers.push("Ambiguous canonical target; choose the existing record manually");
    if (readiness.has(true) && readiness.has(false)) blockers.push("Conflicting pipeline reports; re-run checks");
    const startDate = group.repository?.startDate ?? snapshot?.startDate;
    const endDate = group.repository?.endDate ?? snapshot?.endDate ?? startDate;
    if (kind === "event" && !editorialDate(startDate)) blockers.push("Confirm official event dates");
    const past = kind === "event" && editorialDate(endDate) && endDate < asOf;
    // An explicit publishing task may be staged in code but still await its public window.
    const bucket = status === "published" ? "completed" : status === "deferred" || status === "rejected" ? status : action === "publish" && group.repository && !owner ? "repository-present" : action === "publish" && past ? "past" : "active";
    const nextAction = owner?.status === "approved" && owner.notBefore && owner.notBefore > asOf
      ? `Wait until ${owner.notBefore}; ${owner.nextAction ?? "re-run checks before publication"}`
      : owner?.nextAction ?? blockers[0] ?? (bucket === "repository-present" ? "Already in repository; inspect the public page separately" : bucket === "past" ? "Archive or explicitly request a historical correction" : status === "approved" ? "Re-run current checks and confirm the publication window; no automatic publishing" : "Re-run the source workflow checks, then request owner review");
    return {
      id, kind, targetId, action, title: group.repository?.title ?? owner?.title ?? snapshot?.title ?? targetId,
      status, priority: owner?.priority ?? "normal", bucket, technical,
      repositoryPresent: Boolean(group.repository), liveStatus: "not-checked" as const,
      refs: [...new Set([...(owner?.refs ?? []), ...group.snapshots.flatMap(value => value.refs)])].sort(),
      blockers, nextAction, ...(owner?.notBefore ? { notBefore: owner.notBefore } : {}),
      ...(owner?.approval ? { approval: owner.approval } : {}), ...(owner?.publication ? { publication: owner.publication } : {}),
      ...(owner?.decisionReason ? { decisionReason: owner.decisionReason } : {}),
    };
  }).sort((a, b) => ({ high: 0, normal: 1, low: 2 }[a.priority] - { high: 0, normal: 1, low: 2 }[b.priority]) || a.id.localeCompare(b.id));
  return {
    version: 1, asOf, registered: registry.items.length,
    counts: { total: items.length, active: items.filter(item => item.bucket === "active").length, repositoryPresent: items.filter(item => item.bucket === "repository-present").length, past: items.filter(item => item.bucket === "past").length, completed: items.filter(item => item.bucket === "completed").length, deferred: items.filter(item => item.bucket === "deferred").length, rejected: items.filter(item => item.bucket === "rejected").length },
    items,
  };
}

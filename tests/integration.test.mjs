import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { createServer } from "node:net";
import { spawn } from "node:child_process";
import { randomBytes, scryptSync, createHash } from "node:crypto";
import { once } from "node:events";
import { setTimeout as delay } from "node:timers/promises";
import { createClient } from "@libsql/client";
import { applyMigrations } from "../scripts/migration-runner.mjs";

let directory, db, child, origin, cookie, document;
let serverOutput = "";
const email = "integration@example.test";
const password = randomBytes(24).toString("hex");
const salt = randomBytes(16).toString("hex");
const hash = `scrypt:${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
async function request(path, { method = "GET", body, session = cookie, source = origin } = {}) {
  return fetch(`${origin}${path}`, { method, signal: AbortSignal.timeout(10000), headers: {
    ...(source ? { Origin: source } : {}), ...(session ? { Cookie: session } : {}),
    ...(body === undefined ? {} : { "Content-Type": "application/json" }),
  }, body: body === undefined ? undefined : typeof body === "string" ? body : JSON.stringify(body) });
}
async function login() {
  const response = await request("/api/admin/login", { method: "POST", body: { email, password }, session: "" });
  assert.equal(response.status, 200, await response.text());
  const header = response.headers.get("set-cookie");
  assert.match(header, /HttpOnly/i);
  assert.match(header, /Secure/i);
  assert.match(header, /SameSite=strict/i);
  cookie = header.split(";")[0];
}
before(async () => {
  directory = await mkdtemp(join(tmpdir(), "portfolio-integration-"));
  const url = `file:${join(directory, "test.db").replaceAll("\\", "/")}`;
  db = createClient({ url });
  await applyMigrations(db, resolve("prisma/migrations"));
  const server = createServer();
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const port = server.address().port;
  await new Promise((resolve) => server.close(resolve));
  origin = `http://127.0.0.1:${port}`;
  child = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-H", "127.0.0.1", "-p", String(port)], {
    cwd: process.cwd(), windowsHide: true,
    env: { ...process.env, NODE_ENV: "production", TURSO_DATABASE_URL: url, TURSO_AUTH_TOKEN: "integration-only", ADMIN_EMAIL: email, ADMIN_PASSWORD_HASH: hash },
    stdio: ["ignore", "pipe", "pipe"],
  });
  // Drain output without logging credentials, cookies, or request bodies.
  const capture = (chunk) => { serverOutput = (serverOutput + chunk.toString()).slice(-3000); };
  child.stdout.on("data", capture);
  child.stderr.on("data", capture);
  for (let i = 0; i < 100; i++) {
    if (child.exitCode !== null) throw new Error("Server exited before becoming ready; run npm run build first.");
    try { if ((await request("/api/content", { session: "" })).ok) return; } catch { /* Server starting. */ }
    await delay(200);
  }
  throw new Error(`Server startup timed out: ${serverOutput.replaceAll(password, "[redacted]").replaceAll(hash, "[redacted]")}`);
});
after(async () => {
  if (child && child.exitCode === null) {
    const exited = once(child, "exit");
    child.kill();
    await exited;
  }
  db?.close();
  if (directory) await rm(directory, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
});

test("migrations can be rerun without losing data", async () => {
  const migrationCount = Number((await db.execute("SELECT count(*) AS n FROM _portfolio_migrations")).rows[0].n);
  await applyMigrations(db, resolve("prisma/migrations"));
  assert.equal(Number((await db.execute("SELECT count(*) AS n FROM _portfolio_migrations")).rows[0].n), migrationCount);
});
test("failed migration rolls back tables and migration record", async () => {
  const migrations = join(directory, "broken-migrations");
  await mkdir(join(migrations, "999_broken"), { recursive: true });
  await writeFile(join(migrations, "999_broken/migration.sql"), "CREATE TABLE rollback_probe (id TEXT); INSERT INTO missing_table VALUES (1);");
  await assert.rejects(applyMigrations(db, migrations));
  assert.equal((await db.execute("SELECT name FROM sqlite_master WHERE name='rollback_probe'")).rows.length, 0);
  assert.equal((await db.execute("SELECT name FROM _portfolio_migrations WHERE name='999_broken'")).rows.length, 0);
});
test("modified applied migration is rejected", async () => {
  const migrations = join(directory, "checksum-migrations");
  await mkdir(join(migrations, "checksum_probe"), { recursive: true });
  const path = join(migrations, "checksum_probe/migration.sql");
  await writeFile(path, "CREATE TABLE checksum_probe (id TEXT);");
  await applyMigrations(db, migrations);
  await writeFile(path, "DROP TABLE checksum_probe;");
  await assert.rejects(applyMigrations(db, migrations), /berubah setelah diterapkan/);
  assert.equal((await db.execute("SELECT name FROM sqlite_master WHERE name='checksum_probe'")).rows.length, 1);
});
test("public page and anonymous admin render", async () => {
  assert.equal((await request("/")).status, 200);
  assert.match(await (await request("/admin", { session: "" })).text(), /Masuk ke admin/);
  document = await (await request("/api/content")).json();
  assert.ok(document.profile.name);
});
test("language preference changes the rendered copy and document language", async () => {
  const expected = new Map([["en", ["en", "View case studies", "Projects"]], ["ko", ["ko", "사례 연구 보기", "프로젝트"]], ["ja", ["ja", "事例を見る", "事例"]], ["zh", ["zh-CN", "查看案例", "项目"]], ["id", ["id", "Lihat Studi Kasus", "Proyek"]]]);
  for (const [language, [htmlLanguage, translatedText, tabLabel]] of expected) {
    const response = await request("/", { session: `site-language=${language}` });
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, new RegExp(`<html lang="${htmlLanguage}"(?:\\s|>)`), `document language for ${language}`);
    assert.ok(html.includes(translatedText), `translated text for ${language}`);
    assert.ok(html.includes("mobile-tab-bar"), "mobile navigation renders");
    assert.ok(html.includes(tabLabel), `mobile tab translation for ${language}`);
  }
});
test("unauthenticated save and cross-origin login are blocked", async () => {
  assert.equal((await request("/api/admin/content", { method: "PUT", body: document, session: "" })).status, 401);
  assert.equal((await request("/api/admin/login", { method: "POST", body: { email, password }, source: "https://attacker.invalid" })).status, 403);
  assert.equal((await request("/api/admin/login", { method: "POST", body: { email, password }, source: "" })).status, 403);
});
test("malformed, oversized, and incorrect logins are rejected", async () => {
  assert.equal((await request("/api/admin/login", { method: "POST", body: "{" })).status, 400);
  assert.equal((await request("/api/admin/login", { method: "POST", body: { email, password: "x".repeat(5000) } })).status, 413);
  assert.equal((await request("/api/admin/login", { method: "POST", body: { email, password: "wrong" } })).status, 401);
});
test("valid login issues protected cookie and loads editor", async () => {
  await login();
  assert.match(await (await request("/admin")).text(), /Dashboard/);
  assert.match(await (await request("/admin/content?section=labs")).text(), /Editor konten/);
  assert.match(await (await request("/admin/content?section=labs")).text(), /Lab otomasi/);
});
test("save persists JSON through Prisma and public page reload", async () => {
  document.profile.name = "Integration Portfolio";
  const response = await request("/api/admin/content", { method: "PUT", body: document });
  assert.equal(response.status, 200, await response.text());
  const content = await (await request("/api/content")).json();
  assert.equal(content.profile.name, document.profile.name);
  assert.match(await (await request("/")).text(), /Integration/);
});
test("invalid content and oversized save cannot replace stored content", async () => {
  assert.equal((await request("/api/admin/content", { method: "PUT", body: { ...document, profile: { ...document.profile, email: "bad" } } })).status, 400);
  assert.equal((await request("/api/admin/content", { method: "PUT", body: "x".repeat(2_000_001) })).status, 413);
  assert.equal((await (await request("/api/content")).json()).profile.name, document.profile.name);
});
test("chunked oversized request is rejected without Content-Length", async () => {
  const response = await fetch(`${origin}/api/admin/content`, {
    method: "PUT", duplex: "half", signal: AbortSignal.timeout(10000),
    headers: { Origin: origin, Cookie: cookie, "Content-Type": "application/json" },
    body: new ReadableStream({ start(controller) {
      controller.enqueue(new TextEncoder().encode('"' + "x".repeat(2_000_001) + '"'));
      controller.close();
    } }),
  });
  assert.equal(response.status, 413);
});
test("corrupt stored content disables editor instead of exposing fallback for save", async () => {
  await db.execute("UPDATE portfolio_content SET document = '{}' WHERE id = 'main'");
  assert.equal((await request("/admin")).status, 200, "the QA dashboard remains available");
  assert.match(await (await request("/admin/content?section=labs")).text(), /Konten belum dapat dimuat/);
  await db.execute({ sql: "UPDATE portfolio_content SET document = ? WHERE id = 'main'", args: [JSON.stringify(document)] });
});
test("forged session cannot save", async () => {
  assert.equal((await request("/api/admin/content", { method: "PUT", body: document, session: `portfolio_admin_session=${"a".repeat(64)}` })).status, 401);
});
test("logout revokes the session even if an old cookie is replayed", async () => {
  assert.equal((await request("/api/admin/logout", { method: "POST" })).status, 200);
  assert.equal((await request("/api/admin/content", { method: "PUT", body: document })).status, 401);
});
test("expired sessions cannot save", async () => {
  await login();
  const tokenHash = createHash("sha256").update(cookie.split("=")[1]).digest("hex");
  await db.execute({ sql: "UPDATE admin_session SET expires_at = ? WHERE token_hash = ?", args: [new Date(0).toISOString(), tokenHash] });
  assert.equal((await request("/api/admin/content", { method: "PUT", body: document })).status, 401);
});
test("changed credential version invalidates a session", async () => {
  await login();
  await db.execute("UPDATE admin_session SET credential_version = 'old-version'");
  assert.equal((await request("/api/admin/content", { method: "PUT", body: document })).status, 401);
});
test("rate limit survives separate HTTP requests", async () => {
  const bucket = String(Math.floor(Date.now() / 900000) * 900000);
  await db.execute({ sql: "UPDATE login_attempt SET count = 20 WHERE bucket = ?", args: [bucket] });
  const response = await request("/api/admin/login", { method: "POST", body: { email, password }, session: "" });
  assert.equal(response.status, 429);
  assert.ok(Number(response.headers.get("retry-after")) > 0);
});

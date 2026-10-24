import { randomBytes, scryptSync } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { createInterface } from "node:readline/promises";
import { Writable } from "node:stream";

if (!process.stdin.isTTY) {
  console.error("Jalankan npm run admin:setup di terminal interaktif.");
  process.exit(1);
}
let muted = false;
const output = new Writable({ write(chunk, encoding, callback) {
  if (!muted) process.stdout.write(chunk, encoding);
  callback();
} });
const rl = createInterface({ input: process.stdin, output, terminal: true });
rl.on("SIGINT", () => { rl.close(); process.exit(130); });
async function hiddenQuestion(prompt) {
  const answer = rl.question(prompt);
  muted = true;
  try { return await answer; }
  finally { muted = false; process.stdout.write("\n"); }
}
try {
  const email = (await rl.question("Email admin: ")).trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Email tidak valid.");
  const password = await hiddenQuestion("Password (minimal 12 karakter, input disembunyikan): ");
  if (password.length < 12 || password.length > 1024) throw new Error("Password harus 12–1024 karakter.");
  if (password !== await hiddenQuestion("Ulangi password: ")) throw new Error("Password tidak sama.");
  const salt = randomBytes(16).toString("hex");
  const hash = `scrypt:${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
  let env = existsSync(".env") ? readFileSync(".env", "utf8") : readFileSync(".env.example", "utf8");
  for (const [key, value] of Object.entries({ ADMIN_EMAIL: email, ADMIN_PASSWORD_HASH: hash })) {
    const pattern = new RegExp(`^${key}=.*$`, "m");
    const line = `${key}=${JSON.stringify(value)}`;
    env = pattern.test(env) ? env.replace(pattern, () => line) : `${env.trimEnd()}\n${line}\n`;
  }
  writeFileSync(".env", env, { mode: 0o600 });
  console.log("Akun admin dikonfigurasi di .env. Password asli tidak disimpan. Restart server setelah mengubah akun.");
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally { rl.close(); }

import { createHash, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";
import { getPrisma } from "./prisma";

const deriveKey = promisify(scrypt);
const cookieName = "portfolio_admin_session";
const sessionSeconds = 60 * 60 * 8;
const digest = (value: string) => createHash("sha256").update(value).digest("hex");
const cookieOptions = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict" as const, path: "/" };

function credentials() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!email || !hash || !/^scrypt:[a-f0-9]{32}:[a-f0-9]{128}$/.test(hash)) {
    throw new Error("Jalankan npm run admin:setup untuk mengatur akun admin.");
  }
  return { email, hash, version: digest(`${email}:${hash}`) };
}

/** One database-backed limit shared by all instances: 20 attempts / 15 minutes. */
export async function consumeLoginAttempt() {
  credentials();
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const start = Math.floor(now / windowMs) * windowMs;
  const prisma = getPrisma();
  await prisma.loginAttempt.deleteMany({ where: { expiresAt: { lt: new Date(now) } } });
  const attempt = await prisma.loginAttempt.upsert({
    where: { bucket: String(start) },
    create: { bucket: String(start), count: 1, expiresAt: new Date(start + windowMs) },
    update: { count: { increment: 1 } },
  });
  return { allowed: attempt.count <= 20, retryAfter: Math.ceil((start + windowMs - now) / 1000) };
}

export async function verifyAdminPassword(email: string, password: string) {
  const configured = credentials();
  const [, salt, key] = configured.hash.split(":");
  const derived = await deriveKey(password, salt, 64) as Buffer;
  return timingSafeEqual(derived, Buffer.from(key, "hex")) && email.trim().toLowerCase() === configured.email;
}

export async function createAdminSession() {
  const configured = credentials();
  const token = randomBytes(32).toString("hex");
  const prisma = getPrisma();
  await prisma.adminSession.deleteMany({ where: { expiresAt: { lt: new Date() } } });
  await prisma.adminSession.create({ data: {
    tokenHash: digest(token), email: configured.email, credentialVersion: configured.version,
    expiresAt: new Date(Date.now() + sessionSeconds * 1000),
  } });
  (await cookies()).set(cookieName, token, { ...cookieOptions, maxAge: sessionSeconds });
}

export async function getAuthenticatedAdminUser() {
  try {
    const token = (await cookies()).get(cookieName)?.value;
    if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;
    const configured = credentials();
    const session = await getPrisma().adminSession.findUnique({ where: { tokenHash: digest(token) } });
    if (!session || session.expiresAt <= new Date() || session.email !== configured.email || session.credentialVersion !== configured.version) return null;
    return { id: session.email, email: session.email };
  } catch { return null; }
}

export async function deleteAdminSession() {
  const store = await cookies();
  const token = store.get(cookieName)?.value;
  if (token) await getPrisma().adminSession.deleteMany({ where: { tokenHash: digest(token) } });
  store.set(cookieName, "", { ...cookieOptions, maxAge: 0 });
}

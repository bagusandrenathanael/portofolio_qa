import { consumeLoginAttempt, createAdminSession, verifyAdminPassword } from "../../../../lib/admin-auth";
import { BodyTooLargeError, readLimitedJson } from "../../../../lib/request-body";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  const length = Number(request.headers.get("content-length") || 0);
  if (length > 4_096) return Response.json({ error: "Permintaan terlalu besar." }, { status: 413 });

  let body: unknown;
  try {
    body = await readLimitedJson(request, 4_096);
  } catch (error) {
    if (error instanceof BodyTooLargeError) return Response.json({ error: "Permintaan terlalu besar." }, { status: 413 });
    return Response.json({ error: "Format login tidak valid." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ error: "Format login tidak valid." }, { status: 400 });
  }

  const { email, password } = body as { email?: unknown; password?: unknown };
  if (typeof email !== "string" || typeof password !== "string" || !email.trim() || !password) {
    return Response.json({ error: "Email dan password wajib diisi." }, { status: 400 });
  }

  try {
    const limit = await consumeLoginAttempt();
    if (!limit.allowed) {
      return Response.json({ error: "Terlalu banyak percobaan. Tunggu hingga 15 menit lalu coba lagi." }, { status: 429, headers: { "Retry-After": String(limit.retryAfter) } });
    }
    if (!await verifyAdminPassword(email, password)) return Response.json({ error: "Email atau password salah." }, { status: 401 });
    await createAdminSession();
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Login belum tersedia. Periksa konfigurasi admin, koneksi Turso, dan migrasi database." }, { status: 503 });
  }
}

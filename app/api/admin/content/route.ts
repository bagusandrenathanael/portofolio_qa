import { getAuthenticatedAdminUser } from "../../../../lib/admin-auth";
import { portfolioContentSchema } from "../../../../lib/content-schema";
import { getPortfolioContent, savePortfolioContent } from "../../../../lib/portfolio-store";
import { BodyTooLargeError, readLimitedJson } from "../../../../lib/request-body";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const user = await getAuthenticatedAdminUser();
  if (!user) return Response.json({ error: "Silakan masuk sebagai admin terlebih dahulu." }, { status: 401 });
  try {
    return Response.json(await getPortfolioContent(true), { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "Konten situs gagal dimuat." }, { status: 503 });
  }
}

export async function PUT(request: Request) {
  const user = await getAuthenticatedAdminUser();
  if (!user) {
    return Response.json({ error: "Silakan masuk sebagai admin terlebih dahulu." }, { status: 401 });
  }

  const length = Number(request.headers.get("content-length") || 0);
  if (length > 2_000_000) return Response.json({ error: "Konten melebihi batas 2 MB." }, { status: 413 });

  let payload: unknown;
  try {
    payload = await readLimitedJson(request, 2_000_000);
  } catch (error) {
    if (error instanceof BodyTooLargeError) return Response.json({ error: "Konten melebihi batas 2 MB." }, { status: 413 });
    return Response.json({ error: "Format konten tidak valid." }, { status: 400 });
  }
  const parsed = portfolioContentSchema.safeParse(payload);
  if (!parsed.success) {
    return Response.json({ error: "Ada kolom yang belum sesuai format.", fields: parsed.error.issues.map((issue) => issue.path.join(".")) }, { status: 400 });
  }

  try {
    const updatedAt = await savePortfolioContent(parsed.data, user.email ?? user.id);
    return Response.json({ ok: true, updatedAt });
  } catch {
    return Response.json({ error: "Konten gagal disimpan. Periksa koneksi database dan migrasi, lalu coba lagi. Draft Anda tetap di editor." }, { status: 503 });
  }
}

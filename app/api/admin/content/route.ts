import { getChatGPTUser } from "../../../chatgpt-auth";
import { isPortfolioSuperadmin } from "../../../../lib/admin-auth";
import { portfolioContentSchema } from "../../../../lib/content-schema";
import { savePortfolioContent } from "../../../../lib/portfolio-store";

export const dynamic = "force-dynamic";

export async function PUT(request: Request) {
  const user = await getChatGPTUser();
  if (!isPortfolioSuperadmin(user)) {
    return Response.json({ error: "Akses superadmin diperlukan." }, { status: user ? 403 : 401 });
  }

  const length = Number(request.headers.get("content-length") || 0);
  if (length > 100_000) return Response.json({ error: "Konten melebihi batas 100 KB." }, { status: 413 });

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Format konten tidak valid." }, { status: 400 });
  }
  const parsed = portfolioContentSchema.safeParse(payload);
  if (!parsed.success) {
    return Response.json({ error: "Ada kolom yang belum sesuai format.", fields: parsed.error.issues.map((issue) => issue.path.join(".")) }, { status: 400 });
  }

  try {
    const updatedAt = await savePortfolioContent(parsed.data, user!.userId);
    return Response.json({ ok: true, updatedAt });
  } catch {
    return Response.json({ error: "Database belum siap. Coba lagi setelah deployment selesai." }, { status: 503 });
  }
}

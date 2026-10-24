import { deleteAdminSession } from "../../../../lib/admin-auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST() {
  try {
    await deleteAdminSession();
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Tidak dapat mengakhiri sesi." }, { status: 503 });
  }
}

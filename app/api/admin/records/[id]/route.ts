import { z } from "zod";
import { getAuthenticatedAdminUser } from "../../../../../lib/admin-auth";
import { getPrisma } from "../../../../../lib/prisma";
import { BodyTooLargeError, readLimitedJson } from "../../../../../lib/request-body";
import { adminModules, syncRecordRelations } from "../../../../../lib/admin-records";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const updateSchema = z.object({
  module: z.enum(adminModules),
  title: z.string().trim().min(1).max(180),
  status: z.string().trim().min(1).max(40),
  priority: z.string().trim().min(1).max(40),
  data: z.record(z.string(), z.unknown()),
}).strict();

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await getAuthenticatedAdminUser()) return Response.json({ error: "Silakan masuk sebagai admin." }, { status: 401 });
  const { id } = await params;
  try {
    const payload = await readLimitedJson(request, 2_500_000);
    const parsed = updateSchema.safeParse(payload);
    if (!parsed.success) return Response.json({ error: "Data belum lengkap atau formatnya tidak sesuai." }, { status: 400 });
    if (JSON.stringify(parsed.data.data).length > 2_000_000) return Response.json({ error: "Data terlalu besar (maksimum 2 MB)." }, { status: 413 });
    const result = await getPrisma().$transaction(async (tx) => {
      const current = await tx.adminRecord.findUnique({ where: { id }, select: { id: true, module: true } });
      if (!current) return false;
      if (current.module !== parsed.data.module) throw new Error("Modul record tidak dapat diganti saat mengedit.");
      await tx.adminRecord.update({ where: { id }, data: { title: parsed.data.title, status: parsed.data.status, priority: parsed.data.priority, data: parsed.data.data as never } });
      await syncRecordRelations(tx, id, current.module, parsed.data.data);
      return true;
    });
    if (!result) return Response.json({ error: "Data tidak ditemukan." }, { status: 404 });
    return Response.json({ ok: true });
  } catch (error) {
    if (error instanceof BodyTooLargeError) return Response.json({ error: "Data terlalu besar (maksimum 2,5 MB)." }, { status: 413 });
    if (error instanceof Error && /modul record|relasi melebihi|pilihan relasi/i.test(error.message)) return Response.json({ error: error.message }, { status: 400 });
    return Response.json({ error: "Perubahan gagal disimpan." }, { status: 503 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await getAuthenticatedAdminUser()) return Response.json({ error: "Silakan masuk sebagai admin." }, { status: 401 });
  const { id } = await params;
  try {
    const result = await getPrisma().adminRecord.deleteMany({ where: { id } });
    if (!result.count) return Response.json({ error: "Data tidak ditemukan." }, { status: 404 });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Data gagal dihapus." }, { status: 503 });
  }
}

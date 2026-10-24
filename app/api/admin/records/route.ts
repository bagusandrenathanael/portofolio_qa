import { z } from "zod";
import { getAuthenticatedAdminUser } from "../../../../lib/admin-auth";
import { getPrisma } from "../../../../lib/prisma";
import { BodyTooLargeError, readLimitedJson } from "../../../../lib/request-body";
import { adminModules, syncRecordRelations } from "../../../../lib/admin-records";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const recordSchema = z.object({
  module: z.enum(adminModules),
  title: z.string().trim().min(1).max(180),
  status: z.string().trim().min(1).max(40).default("Draft"),
  priority: z.string().trim().min(1).max(40).default("Normal"),
  data: z.record(z.string(), z.unknown()).default({}),
}).strict();

export async function GET(request: Request) {
  if (!await getAuthenticatedAdminUser()) return Response.json({ error: "Silakan masuk sebagai admin." }, { status: 401 });
  const moduleKey = new URL(request.url).searchParams.get("module");
  if (moduleKey && !adminModules.includes(moduleKey as typeof adminModules[number])) return Response.json({ error: "Modul tidak dikenal." }, { status: 400 });
  try {
    const rows = await getPrisma().adminRecord.findMany({ where: moduleKey ? { module: moduleKey } : undefined, orderBy: [{ module: "asc" }, { updatedAt: "desc" }], take: 500, include: { relationsFrom: true } });
    const records = rows.map(({ relationsFrom, ...row }) => {
      const data = row.data && typeof row.data === "object" && !Array.isArray(row.data) ? row.data as Record<string, unknown> : {};
      return { ...row, data: { ...data, skillIds: relationsFrom.filter((relation) => relation.relation.endsWith("-skill")).map((relation) => relation.targetId), projectIds: relationsFrom.filter((relation) => relation.relation === "experience-project").map((relation) => relation.targetId) } };
    });
    return Response.json({ records });
  } catch {
    return Response.json({ error: "Data QA belum tersedia. Jalankan migrasi database terlebih dahulu." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  if (!await getAuthenticatedAdminUser()) return Response.json({ error: "Silakan masuk sebagai admin." }, { status: 401 });
  try {
    const body = await readLimitedJson(request, 2_500_000);
    const parsed = recordSchema.safeParse(body);
    if (!parsed.success) return Response.json({ error: "Data belum lengkap atau formatnya tidak sesuai.", fields: parsed.error.issues.map((issue) => issue.path.join(".")) }, { status: 400 });
    if (JSON.stringify(parsed.data.data).length > 2_000_000) return Response.json({ error: "Lampiran atau data terlalu besar (maksimum 2 MB)." }, { status: 413 });
    if (parsed.data.module === "setting" && await getPrisma().adminRecord.count({ where: { module: "setting" } })) return Response.json({ error: "Site Settings hanya memiliki satu record. Edit record yang sudah ada." }, { status: 409 });
    const record = await getPrisma().$transaction(async (tx) => {
      const created = await tx.adminRecord.create({ data: { ...parsed.data, data: parsed.data.data as never } });
      await syncRecordRelations(tx, created.id, created.module, parsed.data.data);
      return created;
    });
    return Response.json({ record }, { status: 201 });
  } catch (error) {
    if (error instanceof BodyTooLargeError) return Response.json({ error: "Data terlalu besar (maksimum 2,5 MB)." }, { status: 413 });
    if (error instanceof Error && /relasi melebihi|pilihan relasi/i.test(error.message)) return Response.json({ error: error.message }, { status: 400 });
    return Response.json({ error: "Data gagal disimpan. Pastikan migrasi database sudah dijalankan." }, { status: 503 });
  }
}

import { z } from "zod";
import { getPrisma } from "../../../lib/prisma";
import { BodyTooLargeError, readLimitedJson } from "../../../lib/request-body";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const messageSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(320),
  message: z.string().trim().min(5).max(4000),
  website: z.string().max(300).optional(),
}).strict();
const rateWindow = new Map<string, { count: number; expiresAt: number }>();

export async function POST(request: Request) {
  try {
    const payload = await readLimitedJson(request, 12_000);
    const parsed = messageSchema.safeParse(payload);
    if (!parsed.success) return Response.json({ error: "Periksa nama, email, dan pesan Anda." }, { status: 400 });
    if (parsed.data.website) return Response.json({ ok: true });
    const now = Date.now();
    for (const [key, value] of rateWindow) if (value.expiresAt <= now) rateWindow.delete(key);
    const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const bucket = rateWindow.get(forwarded);
    if (bucket && bucket.count >= 5) return Response.json({ error: "Terlalu banyak pesan. Coba lagi dalam beberapa menit." }, { status: 429 });
    rateWindow.set(forwarded, { count: (bucket?.count ?? 0) + 1, expiresAt: bucket?.expiresAt ?? now + 10 * 60_000 });
    await getPrisma().adminRecord.create({ data: { module: "message", title: parsed.data.name, status: "Unread", priority: "Normal", data: { senderName: parsed.data.name, senderEmail: parsed.data.email, message: parsed.data.message, receivedAt: new Date(now).toISOString() } } });
    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    if (error instanceof BodyTooLargeError) return Response.json({ error: "Pesan terlalu besar." }, { status: 413 });
    return Response.json({ error: "Pesan belum dapat disimpan. Silakan coba lagi nanti." }, { status: 503 });
  }
}

import { randomUUID } from "node:crypto";
import { createClient } from "@libsql/client";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;
if (!url || !authToken) throw new Error("TURSO_DATABASE_URL dan TURSO_AUTH_TOKEN harus tersedia di .env.");

const db = createClient({ url, authToken });
const now = new Date().toISOString();
const tx = await db.transaction("write");
try {
  const rows = await tx.execute("SELECT id, title, data FROM admin_record WHERE module = 'skill'");
  const current = rows.rows.find((row) => String(row.title).toLowerCase() === "jenkins");
  const prior = current ? (typeof current.data === "string" ? JSON.parse(current.data) : current.data) : {};
  const data = JSON.stringify({ ...prior, category: "Automation", description: "CI/CD automation and build pipeline orchestration.", sortOrder: Number(prior.sortOrder) || 6, visible: true });
  if (current) {
    await tx.execute({ sql: "UPDATE admin_record SET status = 'Published', data = ?, updated_at = ? WHERE id = ?", args: [data, now, current.id] });
  } else {
    await tx.execute({ sql: "INSERT INTO admin_record (id, module, title, status, priority, data, created_at, updated_at) VALUES (?, 'skill', 'Jenkins', 'Published', 'Normal', ?, ?, ?)", args: [randomUUID(), data, now, now] });
  }
  await tx.commit();
  console.log("Jenkins skill is published in the Automation category.");
} catch (error) {
  await tx.rollback();
  throw error;
} finally {
  tx.close();
  db.close();
}

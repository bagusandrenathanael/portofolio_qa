import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
export async function applyMigrations(client, directory) {
  await client.execute("CREATE TABLE IF NOT EXISTS _portfolio_migrations (name TEXT PRIMARY KEY, checksum TEXT NOT NULL, applied_at TEXT NOT NULL)");
  
  for (const entry of readdirSync(directory, { withFileTypes: true }).filter((entry) => entry.isDirectory()).sort((a, b) => a.name.localeCompare(b.name))) {
    const sql = readFileSync(join(directory, entry.name, "migration.sql"), "utf8").replace(/\r\n/g, "\n");
    const checksum = createHash("sha256").update(sql).digest("hex");
    const transaction = await client.transaction("write");
    try {
      const previous = await transaction.execute({ sql: "SELECT checksum FROM _portfolio_migrations WHERE name = ?", args: [entry.name] });
      if (previous.rows.length) {
        if (previous.rows[0].checksum !== checksum) throw new Error(`Migrasi ${entry.name} berubah setelah diterapkan.`);
        await transaction.rollback();
        console.log(`Sudah diterapkan: ${entry.name}`);
        continue;
      }
      await transaction.executeMultiple(sql);
      await transaction.execute({ sql: "INSERT INTO _portfolio_migrations (name, checksum, applied_at) VALUES (?, ?, ?)", args: [entry.name, checksum, new Date().toISOString()] });
      await transaction.commit();
      console.log(`Migrasi diterapkan: ${entry.name}`);
    } catch (error) {
      if (!transaction.closed) await transaction.rollback();
      throw error;
    } finally { transaction.close(); }
  }
}

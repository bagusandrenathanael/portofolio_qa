import { DatabaseSync } from "node:sqlite";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { tursoConfig } from "./turso-config.mjs";

const directory = join(process.cwd(), ".wrangler/state/v3/d1/miniflare-D1DatabaseObject");
let legacyRow;

try {
  for (const filename of readdirSync(directory).filter((name) => name.endsWith(".sqlite") && name !== "metadata.sqlite")) {
    const database = new DatabaseSync(join(directory, filename), { readOnly: true });
    try {
      const table = database.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'portfolio_content'").get();
      if (table) {
        legacyRow = database.prepare("SELECT id, document, updated_at, updated_by FROM portfolio_content WHERE id = 'main'").get();
        if (legacyRow) break;
      }
    } finally {
      database.close();
    }
  }
} catch (error) {
  console.error("Tidak dapat membaca database D1 lokal lama:", error.message);
  process.exit(1);
}

if (!legacyRow) {
  console.log("Tidak ada konten portofolio tersimpan di database D1 lokal.");
  process.exit(0);
}

let prisma;
try {
  prisma = new PrismaClient({ adapter: new PrismaLibSQL(tursoConfig()) });
  const document = JSON.parse(legacyRow.document);
  await prisma.portfolioContent.upsert({
    where: { id: legacyRow.id },
    create: {
      id: legacyRow.id,
      document,
      updatedAt: new Date(legacyRow.updated_at),
      updatedBy: legacyRow.updated_by,
    },
    update: process.argv.includes("--replace") ? {
      document,
      updatedAt: new Date(legacyRow.updated_at),
      updatedBy: legacyRow.updated_by,
    } : {},
  });
  console.log(process.argv.includes("--replace") ? "Konten lama diimpor dengan mengganti konten yang sudah ada." : "Impor selesai. Konten yang sudah ada dipertahankan; hanya database kosong yang diisi.");
} catch {
  console.error("Impor konten gagal. Periksa konfigurasi Turso, migrasi, dan format data lama.");
  process.exitCode = 1;
} finally {
  await prisma?.$disconnect();
}

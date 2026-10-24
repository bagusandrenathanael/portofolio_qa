import { createClient } from "@libsql/client";
import { applyMigrations } from "./migration-runner.mjs";

import { join } from "node:path";
import { tursoConfig } from "./turso-config.mjs";

let client;
try {
  client = createClient(tursoConfig());
  await applyMigrations(client, join(process.cwd(), "prisma/migrations"));
} catch (error) {
  // Do not print driver errors that might include connection credentials.
  console.error("Migrasi Turso gagal. Periksa setup:check, token, koneksi, dan riwayat migrasi.");
  if (error && typeof error === "object") {
    const code = "code" in error && typeof error.code === "string" && /^[A-Z0-9_]+$/.test(error.code) ? error.code : "";
    const name = "name" in error && typeof error.name === "string" && /^[A-Za-z]+Error$/.test(error.name) ? error.name : "";
    if (code || name) console.error(`Jenis error aman: ${code || name}`);
  }
  if (error.message?.startsWith("Migrasi ") || error.message?.startsWith("Isi TURSO")) console.error(error.message);
  process.exitCode = 1;
} finally { client?.close(); }

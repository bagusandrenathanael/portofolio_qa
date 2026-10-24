import { existsSync } from "node:fs";
import { loadEnvFile } from "node:process";

if (existsSync(".env")) loadEnvFile(".env");

export function tursoConfig() {
  const url = process.env.TURSO_DATABASE_URL?.trim();
  const authToken = process.env.TURSO_AUTH_TOKEN?.trim();
  if (!url?.startsWith("libsql://") || url.includes("YOUR_DATABASE") || !authToken || authToken === "your-turso-token") {
    throw new Error("Isi TURSO_DATABASE_URL dan TURSO_AUTH_TOKEN di .env terlebih dahulu.");
  }
  return { url, authToken };
}

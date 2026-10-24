import "./turso-config.mjs";

const checks = {
  LOCAL_DATABASE_URL: (value) => value.startsWith("file:"),
  TURSO_DATABASE_URL: (value) => { try { return new URL(value).protocol === "libsql:" && !value.includes("YOUR_DATABASE"); } catch { return false; } },
  TURSO_AUTH_TOKEN: (value) => value.length > 20 && value !== "your-turso-token",
  ADMIN_EMAIL: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  ADMIN_PASSWORD_HASH: (value) => /^scrypt:[a-f0-9]{32}:[a-f0-9]{128}$/.test(value),
};
let failed = false;
for (const [name, check] of Object.entries(checks)) {
  const valid = check(process.env[name]?.trim() ?? "");
  console.log(`${valid ? "OK" : "PERLU DIISI/DIPERBAIKI"} ${name}`);
  failed ||= !valid;
}
console.log("Hanya memeriksa format konfigurasi; tidak menghubungi Turso atau menampilkan rahasia.");
process.exitCode = failed ? 1 : 0;

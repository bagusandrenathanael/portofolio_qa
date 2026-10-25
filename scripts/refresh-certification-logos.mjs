import { createClient } from "@libsql/client";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;
if (!url || !authToken) throw new Error("TURSO_DATABASE_URL dan TURSO_AUTH_TOKEN harus tersedia di .env.");

const logoFor = (issuer = "") => /linkedin learning/i.test(issuer)
  ? "/issuer-linkedin-learning.svg"
  : /cisco/i.test(issuer)
    ? "/issuer-cisco.svg"
    : /british council|etsr/i.test(issuer)
      ? "/issuer-british-council.svg"
      : "/issuer-credential.svg";
const db = createClient({ url, authToken });
const now = new Date().toISOString();
const tx = await db.transaction("write");

try {
  let updatedRecords = 0;
  const certificationRows = await tx.execute("SELECT id, data FROM admin_record WHERE module = 'certification'");
  for (const row of certificationRows.rows) {
    const data = typeof row.data === "string" ? JSON.parse(row.data) : row.data;
    if (!data || typeof data !== "object" || Array.isArray(data)) continue;
    const image = logoFor(typeof data.issuer === "string" ? data.issuer : "");
    await tx.execute({ sql: "UPDATE admin_record SET data = ?, updated_at = ? WHERE id = ?", args: [JSON.stringify({ ...data, image }), now, row.id] });
    updatedRecords += 1;
  }

  const documentResult = await tx.execute("SELECT document FROM portfolio_content WHERE id = 'main'");
  if (!documentResult.rows[0]) throw new Error("Dokumen portfolio_content/main belum ada.");
  const raw = documentResult.rows[0].document;
  const document = typeof raw === "string" ? JSON.parse(raw) : raw;
  if (!Array.isArray(document.certifications)) throw new Error("Daftar sertifikasi pada CMS tidak ditemukan.");
  document.certifications = document.certifications.map((item) => ({ ...item, logo: logoFor(typeof item.issuer === "string" ? item.issuer : "") }));
  await tx.execute({ sql: "UPDATE portfolio_content SET document = ?, updated_at = ?, updated_by = 'issuer-logo-refresh' WHERE id = 'main'", args: [JSON.stringify(document), now] });
  await tx.commit();
  console.log(`Logo sertifikasi diperbarui pada CMS: ${updatedRecords} record dan ${document.certifications.length} item konten.`);
} catch (error) {
  await tx.rollback();
  throw error;
} finally {
  tx.close();
  db.close();
}

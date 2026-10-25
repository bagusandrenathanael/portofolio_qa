import { randomUUID } from "node:crypto";
import { createClient } from "@libsql/client";
import { articleBodies } from "./qa-note-article-bodies.mjs";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;
if (!url || !authToken) throw new Error("TURSO_DATABASE_URL dan TURSO_AUTH_TOKEN harus tersedia di .env.");

const db = createClient({ url, authToken });
const now = new Date().toISOString();
const publishDate = now.slice(0, 10);
const posts = [
  {
    slug: "qa-test-planning-by-risk",
    title: "Uji berdasarkan risiko, bukan sekadar jumlah test case",
    titleEn: "Plan tests around risk, not just test case counts",
    category: "Strategi Pengujian", categoryEn: "Test Strategy",
    readTime: "5 menit", readTimeEn: "5 min read", sortOrder: 1, date: publishDate,
    excerpt: "Petakan dampak ke pengguna, nilai transaksi, dan peluang kegagalan. Prioritaskan alur kritis lalu tautkan setiap risiko ke skenario, hasil uji, dan tindak lanjut yang jelas.",
    excerptEn: "Assess customer impact, transaction criticality, and likelihood of failure. Prioritize critical journeys, then connect each risk to a scenario, evidence, and a clear follow-up.",
    body: "Test planning yang efektif dimulai dari cara produk digunakan dan kerugian yang mungkin terjadi saat alur gagal. Pada produk finansial dan enterprise, saya memetakan perjalanan penting, titik integrasi, validasi data, dan kondisi batas sebelum menyusun cakupan pengujian.\n\nGunakan kemungkinan dan dampak sebagai panduan untuk menentukan kedalaman uji. Pastikan kebutuhan dapat ditelusuri ke test case, hasil aktual, dan defect yang ditemukan. Pendekatan ini membantu tim membahas risiko yang tersisa secara konkret saat menilai kesiapan rilis.",
    bodyEn: "Effective test planning starts with how people use a product and what a failure could cost. For financial and enterprise products, map critical journeys, integration points, data validation, and boundary conditions before deciding the test scope.\n\nUse likelihood and impact to guide testing depth. Keep requirements traceable to test cases, actual results, and defects. This gives the team concrete evidence when discussing remaining risk and release readiness.",
    seoTitle: "Risk-Based QA Test Planning | Andre Nathanael",
    seoDescription: "A practical approach to prioritizing QA coverage by user impact, critical journeys, integrations, and data risk.",
  },
  {
    slug: "choosing-regression-automation",
    title: "Memilih alur yang tepat untuk otomasi regression",
    titleEn: "Choosing the right flows for regression automation",
    category: "Test Automation", categoryEn: "Test Automation",
    readTime: "5 menit", readTimeEn: "5 min read", sortOrder: 2, date: publishDate,
    excerpt: "Otomasi paling bernilai pada alur yang stabil, sering diulang, dan berisiko tinggi. Tetap gunakan eksplorasi manual untuk pengalaman baru dan kondisi yang belum dipahami.",
    excerptEn: "Automation pays off on stable, frequently repeated, high-risk flows. Keep exploratory testing for new experiences and behavior the team has not fully understood.",
    body: "Tidak semua pemeriksaan perlu menjadi skrip. Kandidat otomasi yang baik memiliki hasil yang dapat diprediksi, sering dijalankan kembali, dan memberi sinyal cepat ketika fungsi penting mengalami regresi. Mulai dari alur utama dengan data uji yang terkendali dan assertion yang menjelaskan perilaku yang diharapkan.\n\nPage Object Model membantu memisahkan tindakan halaman dari skenario, sehingga perubahan UI lebih mudah dirawat. Dari pengalaman dengan Playwright, Katalon Studio, dan Selenium, saya menjaga skrip tetap fokus pada risiko yang ingin dicegah. Eksplorasi manual tetap penting untuk menemukan masalah baru yang belum tercakup oleh asumsi skrip.",
    bodyEn: "Not every check needs to become a script. Strong automation candidates have predictable outcomes, run frequently, and provide a fast signal when an important function regresses. Start with a critical journey, controlled test data, and assertions that describe the expected behavior.\n\nThe Page Object Model separates page actions from scenarios, making UI changes easier to maintain. Drawing on work with Playwright, Katalon Studio, and Selenium, I keep each script focused on a risk it is meant to prevent. Manual exploration remains essential for finding behavior that existing scripts do not anticipate.",
    seoTitle: "Choosing Regression Tests to Automate | Andre Nathanael",
    seoDescription: "How to select maintainable, repeatable regression checks and balance automation with exploratory testing.",
  },
  {
    slug: "bug-reports-that-help-teams",
    title: "Bug report yang membantu tim bergerak cepat",
    titleEn: "Bug reports that help teams move faster",
    category: "Kolaborasi Tim", categoryEn: "Team Collaboration",
    readTime: "4 menit", readTimeEn: "4 min read", sortOrder: 3, date: publishDate,
    excerpt: "Sertakan lingkungan, langkah reproduksi, hasil aktual dan yang diharapkan, serta bukti relevan. Jelaskan dampak pengguna agar perbaikan dan verifikasi lebih terarah.",
    excerptEn: "Include the environment, reproducible steps, expected and actual results, and useful evidence. Explain user impact so fixes and verification stay focused.",
    body: "Defect report yang baik mengurangi tebakan. Mulai dengan judul yang menyebut perilaku dan area terdampak, lalu catat build atau environment, prasyarat, dan langkah reproduksi yang singkat. Pisahkan hasil aktual dari hasil yang diharapkan; tambahkan screenshot, log, respons API, atau query data hanya ketika bukti tersebut membantu menjelaskan masalah.\n\nJelaskan dampak terhadap pengguna dan frekuensi kejadian agar tim dapat menentukan prioritas dengan konteks yang cukup. Setelah perbaikan tersedia, ulangi langkah yang sama, cek area terkait untuk regresi, dan perbarui status dengan hasil verifikasi. Format yang konsisten membuat handoff antara QA, developer, dan pemilik produk lebih efisien.",
    bodyEn: "A useful defect report removes guesswork. Start with a title that identifies the behavior and affected area, then record the build or environment, prerequisites, and concise reproduction steps. Separate actual from expected results; attach a screenshot, log, API response, or data query only when it helps explain the issue.\n\nDescribe user impact and frequency so the team can prioritize with enough context. Once a fix is available, repeat the same steps, check related areas for regression, and update the status with the verification result. A consistent format makes handoffs between QA, developers, and product owners more efficient.",
    seoTitle: "Writing Actionable Bug Reports | Andre Nathanael",
    seoDescription: "A clear defect report template covering reproduction, expected behavior, evidence, user impact, and verification.",
  },
].map((post) => ({ ...post, ...articleBodies[post.slug], image: `/qa-notes/${post.slug}.svg`, visible: true }));

const tx = await db.transaction("write");
try {
  const existing = await tx.execute("SELECT id, title, data FROM admin_record WHERE module = 'blog'");
  const legacyTitles = {
    "qa-test-planning-by-risk": "Mulai test planning dari risiko pengguna",
    "choosing-regression-automation": "Kapan sebuah test layak diotomasi?",
    "bug-reports-that-help-teams": "Bug report yang mempercepat perbaikan",
  };
  for (const post of posts) {
    const match = existing.rows.find((row) => {
      const raw = row.data;
      const data = typeof raw === "string" ? JSON.parse(raw) : raw;
      return Boolean(data && typeof data === "object" && data.slug === post.slug) || row.title === post.title || row.title === legacyTitles[post.slug];
    });
    const data = JSON.stringify(post);
    if (match) {
      await tx.execute({ sql: "UPDATE admin_record SET title = ?, status = 'Published', priority = 'Normal', data = ?, updated_at = ? WHERE id = ?", args: [post.title, data, now, match.id] });
    } else {
      await tx.execute({ sql: "INSERT INTO admin_record (id, module, title, status, priority, data, created_at, updated_at) VALUES (?, 'blog', ?, 'Published', 'Normal', ?, ?, ?)", args: [randomUUID(), post.title, data, now, now] });
    }
  }
  await tx.commit();
  console.log(`CMS QA notes updated: ${posts.length} bilingual articles published.`);
} catch (error) {
  await tx.rollback();
  throw error;
} finally {
  tx.close();
  db.close();
}

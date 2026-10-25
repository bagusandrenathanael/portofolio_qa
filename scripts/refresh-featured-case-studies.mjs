import { createClient } from "@libsql/client";
import { randomUUID } from "node:crypto";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;
if (!url || !authToken) throw new Error("TURSO_DATABASE_URL dan TURSO_AUTH_TOKEN harus tersedia di .env.");

const db = createClient({ url, authToken });
const now = new Date().toISOString();
const projects = [
  {
    title: "Pugindo Web App", titleEn: "Pugindo Web App", slug: "pugindo-web-app", thumbnail: "/case-studies/pugindo-web-app.webp", gallery: ["/case-studies/pugindo-web-app.webp"],
    category: "Web · Quality Assurance", categoryEn: "Web · Quality Assurance",
    summary: "Quality assurance untuk aplikasi web Pugindo, dari analisis kebutuhan hingga verifikasi perbaikan, dengan pengujian eksploratori dan otomasi Playwright POM yang dapat digunakan kembali.",
    summaryEn: "Quality assurance for Pugindo’s web application, from requirement analysis to verified fixes, combining exploratory testing with reusable Playwright POM automation.",
    description: "Menyusun dan menjalankan skenario pengujian web berdasarkan kebutuhan fungsional dan bisnis. Menggabungkan pengujian manual dengan otomasi Playwright POM untuk cakupan functional, regression, integration, UAT, dan end-to-end. Mendokumentasikan kasus dan hasil uji, lalu menindaklanjuti defect melalui ClickUp dan Jam.dev.",
    descriptionEn: "Plan and execute web test scenarios based on functional and business requirements. Combine manual testing with Playwright POM automation across functional, regression, integration, UAT, and end-to-end coverage. Document test cases and results, then track and verify defects using ClickUp and Jam.dev.",
    context: "Memvalidasi aplikasi web Pugindo terhadap kebutuhan fungsional dan bisnis pada setiap perubahan yang diuji.",
    contextEn: "Validate Pugindo Web App against functional and business requirements across planned releases.",
    strategy: "Mengubah kebutuhan menjadi skenario yang dapat ditelusuri. Menguji alur fungsional, regression, integrasi, UAT, dan end-to-end; menggunakan eksplorasi manual untuk menemukan risiko, lalu Playwright POM untuk pemeriksaan regression berulang.",
    strategyEn: "Translate requirements into traceable scenarios; cover functional, regression, integration, UAT, and end-to-end flows. Use manual exploration to uncover risk and Playwright POM for repeatable regression checks.",
    result: "Kasus dan hasil uji terdokumentasi; defect disertai bukti melalui ClickUp atau Jam.dev, kemudian diuji ulang untuk mendukung kesiapan rilis.",
    resultEn: "Document test cases and outcomes, report actionable defects through ClickUp and Jam.dev, and verify fixes as part of release readiness.",
    tags: ["Manual Testing", "Playwright (POM)", "Functional & Regression", "ClickUp", "Jam.dev"],
    date: "2025 — Present", sortOrder: 1,
  },
  {
    title: "GAOL Mobile", titleEn: "GAOL Mobile", slug: "gaol-mobile", thumbnail: "/case-studies/gaol-mobile.webp", gallery: ["/case-studies/gaol-mobile.webp"],
    category: "Aplikasi Android & iOS · Quality Assurance", categoryEn: "Android & iOS · Quality Assurance",
    summary: "Pengujian QA untuk GAOL Mobile di Android dan iOS, mencakup alur pengguna utama, integrasi layanan, perilaku API, dan pemeriksaan performa.",
    summaryEn: "Release-focused QA for GAOL Mobile on Android and iOS, covering core user journeys, service integration, API behavior, and performance checks.",
    description: "Menguji aplikasi GAOL Mobile berdasarkan kebutuhan produk di Android dan iOS. Menjalankan skenario functional, regression, integration, UAT, dan end-to-end secara manual maupun otomatis sesuai alur yang diuji. Memvalidasi layanan melalui Postman dan melakukan pemeriksaan performa menggunakan JMeter.",
    descriptionEn: "Test the GAOL Mobile application against product requirements on Android and iOS. Execute functional, regression, integration, UAT, and end-to-end scenarios using manual and automated checks appropriate to each flow. Validate services with Postman and perform performance checks with JMeter.",
    context: "Menilai alur penting GAOL Mobile dan interaksinya dengan layanan pendukung pada platform Android dan iOS.",
    contextEn: "Assess GAOL Mobile’s key user journeys and service integrations across Android and iOS.",
    strategy: "Menggabungkan pengujian fungsional, regression, integrasi, UAT, dan end-to-end. Memeriksa request serta response API dengan Postman, lalu menggunakan JMeter untuk mengamati perilaku performa pada skenario yang relevan.",
    strategyEn: "Combine functional, regression, integration, UAT, and end-to-end checks. Inspect API requests and responses with Postman, then use JMeter to observe performance behavior under relevant scenarios.",
    result: "Hasil pengujian dan temuan dicatat untuk ditindaklanjuti; pemeriksaan layanan dan performa memberi bukti tambahan dalam evaluasi kesiapan rilis.",
    resultEn: "Document test outcomes and findings for follow-up; service and performance checks provide additional evidence for release-readiness reviews.",
    tags: ["Manual Testing", "Postman", "JMeter", "API Testing", "Functional & Regression"],
    date: "2025 — Present", sortOrder: 2,
  },
  {
    title: "ND6 & Nexchief", titleEn: "ND6 & Nexchief", slug: "nd6-nexchief", thumbnail: "/case-studies/nd6-nexchief.webp", gallery: ["/case-studies/nd6-nexchief.webp"],
    category: "Enterprise · QA & Otomasi", categoryEn: "Enterprise · QA & Test Automation",
    summary: "QA aplikasi enterprise ND6 dan Nexchief dengan 300+ test case manual dan otomatis yang diturunkan dari FSD serta change request, dilengkapi pemeriksaan API, database, dan log.",
    summaryEn: "Enterprise QA for ND6 and Nexchief: 300+ manual and automated test cases derived from functional specifications and change requests, supported by API, database, and log checks.",
    description: "Menjalankan 300+ test case manual dan otomatis untuk ND6 dan Nexchief, mencakup pengujian functional, regression, dan UAT. Menurunkan skenario dari FSD dan change request; menguji API melalui Postman, memantau log JBoss, dan memvalidasi data dengan SQL/SQLYog. Mengotomasi skenario terpilih menggunakan Katalon Studio (Groovy) dan Selenium, serta mengelola defect di Redmine.",
    descriptionEn: "Execute 300+ manual and automated test cases for ND6 and Nexchief across functional, regression, and UAT coverage. Derive scenarios from functional specifications and change requests; test APIs with Postman, review JBoss logs, and validate data with SQL/SQLYog. Automate selected scenarios with Katalon Studio (Groovy) and Selenium, and track defects in Redmine.",
    context: "Memastikan perubahan pada ND6 Distribution Management System dan Nexchief sesuai dengan spesifikasi fungsional dan change request yang disetujui.",
    contextEn: "Verify changes to the ND6 Distribution Management System and Nexchief against approved functional specifications and change requests.",
    strategy: "Menelusuri FSD dan change request ke test case, lalu mencakup functional, regression, dan UAT. Memeriksa API dengan Postman, log aplikasi melalui JBoss, konsistensi data dengan SQL/SQLYog, serta mengotomasi skenario yang sesuai dengan Katalon Studio dan Selenium.",
    strategyEn: "Trace functional specifications and change requests to test cases across functional, regression, and UAT coverage. Check APIs with Postman, application logs in JBoss, and data consistency with SQL/SQLYog; automate suitable scenarios with Katalon Studio and Selenium.",
    result: "Lebih dari 300 test case manual dan otomatis dijalankan. Temuan dicatat di Redmine dan hasilnya mendukung tindak lanjut UAT serta evaluasi kesiapan rilis.",
    resultEn: "More than 300 manual and automated test cases were executed. Findings were tracked in Redmine, supporting UAT follow-up and release-readiness reviews.",
    tags: ["Manual Testing", "Katalon Studio", "Selenium", "Groovy", "Postman", "SQL / SQLYog", "JBoss", "Redmine"],
    date: "Aug 2024 — Apr 2025", sortOrder: 3,
  },
].map((project) => ({ ...project, isPublished: true, featured: true, visible: true }));

const asPortfolioProject = (project) => ({
  title: project.title, titleEn: project.titleEn,
  category: project.category, categoryEn: project.categoryEn,
  isPublished: true, tools: project.tags,
  thumbnail: project.thumbnail, gallery: project.gallery,
  summary: project.summary, summaryEn: project.summaryEn,
  description: project.description, descriptionEn: project.descriptionEn,
  context: project.context, contextEn: project.contextEn,
  strategy: project.strategy, strategyEn: project.strategyEn,
  result: project.result, resultEn: project.resultEn,
});

const tx = await db.transaction("write");
try {
  const existing = await tx.execute("SELECT id, title, data FROM admin_record WHERE module = 'project'");
  for (const project of projects) {
    const match = existing.rows.find((row) => {
      const raw = row.data;
      const data = typeof raw === "string" ? JSON.parse(raw) : raw;
      return Boolean(data && typeof data === "object" && data.slug === project.slug) || row.title === project.title;
    });
    const data = JSON.stringify({ ...project, demoUrl: "", repoUrl: "" });
    if (match) {
      await tx.execute({ sql: "UPDATE admin_record SET title = ?, status = 'Published', priority = 'Normal', data = ?, updated_at = ? WHERE id = ?", args: [project.title, data, now, match.id] });
    } else {
      await tx.execute({ sql: "INSERT INTO admin_record (id, module, title, status, priority, data, created_at, updated_at) VALUES (?, 'project', ?, 'Published', 'Normal', ?, ?, ?)", args: [randomUUID(), project.title, data, now, now] });
    }
  }

  const maverick = existing.rows.find((row) => row.title === "Maverick Operational Data Store");
  if (maverick) {
    const raw = maverick.data;
    const data = typeof raw === "string" ? JSON.parse(raw) : raw;
    if (data && typeof data === "object") {
      const thumbnail = "/case-studies/maverick-ods.webp";
      const gallery = [thumbnail];
      const reordered = { ...data, thumbnail, gallery, sortOrder: 4 };
      await tx.execute({ sql: "UPDATE admin_record SET data = ?, updated_at = ? WHERE id = ?", args: [JSON.stringify(reordered), now, maverick.id] });
    }
  }

  const contentResult = await tx.execute("SELECT document FROM portfolio_content WHERE id = 'main'");
  if (!contentResult.rows[0]) throw new Error("Dokumen portfolio_content/main belum ditemukan.");
  const rawDocument = contentResult.rows[0].document;
  const document = typeof rawDocument === "string" ? JSON.parse(rawDocument) : rawDocument;
  const additions = projects.map(asPortfolioProject);
  const targetTitles = new Set(additions.map((project) => project.title));
  const current = Array.isArray(document.projects) ? document.projects : [];
  const updatedMaverick = current.map((project) => project?.title === "Maverick Operational Data Store"
    ? { ...project, thumbnail: "/case-studies/maverick-ods.webp", gallery: ["/case-studies/maverick-ods.webp"] }
    : project);
  const remaining = updatedMaverick.filter((project) => !targetTitles.has(project?.title));
  const ranks = new Map([["Pugindo Web App", 1], ["GAOL Mobile", 2], ["ND6 & Nexchief", 3], ["Maverick Operational Data Store", 4]]);
  document.projects = [...remaining, ...additions].sort((a, b) => (ranks.get(a?.title) ?? Number.MAX_SAFE_INTEGER) - (ranks.get(b?.title) ?? Number.MAX_SAFE_INTEGER));
  await tx.execute({ sql: "UPDATE portfolio_content SET document = ?, updated_at = ?, updated_by = 'case-study-refresh' WHERE id = 'main'", args: [JSON.stringify(document), now] });
  const published = await tx.execute("SELECT title, data FROM admin_record WHERE module = 'project' AND status = 'Published'");
  const publishedOrder = published.rows.map((row) => ({ title: String(row.title), data: typeof row.data === "string" ? JSON.parse(row.data) : row.data })).sort((a, b) => Number(a.data?.sortOrder) - Number(b.data?.sortOrder));
  console.log("Published project order:", publishedOrder.map(({ title }) => title).join(" → "));
  await tx.commit();
  console.log(`CMS and public content updated: ${projects.map((project) => project.title).join(", ")}.`);
} catch (error) {
  await tx.rollback();
  throw error;
} finally {
  tx.close();
  db.close();
}

import { randomUUID } from "node:crypto";
import { createClient } from "@libsql/client";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;
if (!url || !authToken) throw new Error("TURSO_DATABASE_URL dan TURSO_AUTH_TOKEN harus tersedia di .env.");

const db = createClient({ url, authToken });
const now = new Date().toISOString();
const projects = [
  {
    title: "Pugindo Web App", slug: "pugindo-web-app", summary: "Quality assurance for Pugindo’s web experience, from requirement analysis to verified fixes—combining exploratory testing with reusable Playwright POM checks.",
    description: "Plan and execute web test scenarios based on functional and business requirements. Combine manual testing and Playwright POM automation across functional, regression, integration, UAT, and end-to-end coverage. Document test cases and results, then track and verify defects using ClickUp and Jam.dev.",
    context: "Validate Pugindo Web App against functional and business requirements across planned releases.",
    strategy: "Translate requirements into traceable scenarios; cover functional, regression, integration, UAT, and end-to-end flows. Use manual exploration to uncover risk and Playwright POM for repeatable regression checks.",
    result: "Document test cases and outcomes, report actionable defects through ClickUp and Jam.dev, and verify fixes as part of release readiness.",
    category: "Web · Quality Assurance", tags: ["Manual Testing", "Playwright (POM)", "Functional & Regression", "ClickUp", "Jam.dev"], date: "2025 — Present", sortOrder: 1,
  },
  {
    title: "GAOL Mobile", slug: "gaol-mobile", summary: "Release-focused QA for GAOL on Android and iOS, covering core user journeys, service integration, API behavior, and performance checks.",
    description: "Test the mobile application against functional and business requirements at Pusat Gadai Indonesia. Cover functional, regression, integration, UAT, and end-to-end scenarios using manual and automated testing. Validate service integrations with Postman and use JMeter for performance testing.",
    context: "Assess the GAOL Mobile app against product requirements across supported Android and iOS experiences.",
    strategy: "Combine manual and automated functional, regression, integration, UAT, and end-to-end checks. Validate API behavior with Postman and use JMeter for performance testing.",
    result: "Keep findings and test outcomes documented, validate service responses, and provide focused evidence for follow-up and release decisions.",
    category: "Android & iOS · Quality Assurance", tags: ["Manual Testing", "Playwright (POM)", "Postman", "JMeter"], date: "2025 — Present", sortOrder: 2,
  },
  {
    title: "Maverick Operational Data Store", slug: "maverick-ods-bni", summary: "Data-focused QA for BNI’s Maverick Operational Data Store, validating backend workflows and source-to-target ETL with SQL across 500+ test cases.",
    description: "Prepare test plans and scenarios for the Maverick Operational Data Store. Execute 500+ functional, integration, performance, security, and data validation cases for backend services and database queries. Validate ETL processes across banking platforms using SQL.",
    context: "Support data quality checks for an operational data store within a banking environment.",
    strategy: "Plan coverage across functional, integration, performance, security, backend-service, and database-query scenarios; validate ETL data flows with SQL.",
    result: "Executed 500+ test cases and validated ETL processes across banking platforms using SQL.",
    category: "Banking · Data Quality", tags: ["SQL", "Data Validation", "ETL Validation", "Integration", "Performance"], date: "Dec 2023 — Jul 2024", sortOrder: 3,
  },
  {
    title: "ND6 & Nexchief", slug: "nd6-nexchief", summary: "Enterprise QA for ND6 and Nexchief: 300+ manual and automated test cases derived from FSDs and change requests, backed by API, database, and log checks.",
    description: "Execute 300+ manual and automated test cases for ND6 and Nexchief, covering functional, regression, and UAT testing. Derive tests from FSD and change request requirements; test APIs with Postman, monitor JBoss logs, and validate data with SQL/SQLYog. Automate with Katalon Studio (Groovy) and Selenium, manage defects in Redmine, and support UAT and release readiness.",
    context: "Verify enterprise application changes against functional specifications and change-request requirements.",
    strategy: "Execute 300+ manual and automated cases across functional, regression, and UAT coverage. Validate APIs with Postman, review JBoss logs, check data with SQL/SQLYog, and automate with Katalon Studio (Groovy) and Selenium.",
    result: "Track defects in Redmine, document test outcomes, and support UAT and release-readiness reviews.",
    category: "Enterprise · Test Automation", tags: ["Katalon Studio", "Selenium", "Groovy", "Postman", "SQLYog", "Redmine"], date: "Aug 2024 — Apr 2025", sortOrder: 4,
  },
].map((project) => ({ ...project, thumbnail: "", gallery: [], demoUrl: "", repoUrl: "", featured: true, visible: true }));

const labs = [
  { title: "Page Object Model · UI smoke test", description: "A self-contained Playwright POM example: isolate page actions, assert the user journey, and read the target URL and test credentials from environment variables.", tool: "Playwright · TypeScript", example: `import { test, expect, type Page } from "@playwright/test";

class LoginPage {
  constructor(private readonly page: Page) {}
  async open() { await this.page.goto(process.env.QA_BASE_URL!); }
  async signIn(username: string, password: string) {
    await this.page.getByLabel("Username").fill(username);
    await this.page.getByLabel("Password").fill(password);
    await this.page.getByRole("button", { name: "Sign in" }).click();
  }
}

test("authenticated user can access the dashboard", async ({ page }) => {
  test.skip(!process.env.QA_BASE_URL || !process.env.QA_USERNAME || !process.env.QA_PASSWORD, "Set QA_BASE_URL, QA_USERNAME, and QA_PASSWORD in the test environment.");
  const login = new LoginPage(page);
  await login.open();
  await login.signIn(process.env.QA_USERNAME!, process.env.QA_PASSWORD!);
  await expect(page).toHaveURL(/dashboard/);
});`, url: "" },
  { title: "API contract · response checks", description: "Validate successful HTTP responses and the required JSON shape to catch service contract changes early.", tool: "Postman · REST API", example: `pm.test("HTTP response is successful", () => {
  pm.expect(pm.response.code).to.be.within(200, 299);
});

pm.test("response follows the contract", () => {
  pm.response.to.have.jsonSchema({
    type: "object",
    required: ["data"],
    properties: { data: { type: "object" } },
  });
});`, url: "" },
  { title: "ETL reconciliation · data quality", description: "Reconcile source and target records, including null handling, to identify missing rows and data mismatches during ETL validation.", tool: "SQL · Data Validation", example: `SELECT s.record_id, s.amount AS source_amount, t.amount AS target_amount
FROM source_records AS s
LEFT JOIN target_records AS t
  ON t.record_id = s.record_id
WHERE t.record_id IS NULL
   OR s.amount <> t.amount
   OR (s.amount IS NULL AND t.amount IS NOT NULL)
   OR (s.amount IS NOT NULL AND t.amount IS NULL);`, url: "" },
  { title: "Performance run · JMeter", description: "Run a version-controlled JMeter plan in non-GUI mode and generate an HTML report for response-time, throughput, and error analysis.", tool: "JMeter · Load Testing", example: `jmeter -n \\
  -t tests/performance/checkout-flow.jmx \\
  -l artifacts/checkout-flow.jtl \\
  -e -o artifacts/jmeter-html`, url: "" },
];

const tx = await db.transaction("write");
try {
  for (const project of projects) {
    const result = await tx.execute({ sql: "SELECT id FROM admin_record WHERE module = 'project' AND title = ? ORDER BY updated_at DESC LIMIT 1", args: [project.title] });
    const data = JSON.stringify(project);
    if (result.rows[0]) {
      await tx.execute({ sql: "UPDATE admin_record SET status = 'Published', priority = 'Normal', data = ?, updated_at = ? WHERE id = ?", args: [data, now, result.rows[0].id] });
    } else {
      await tx.execute({ sql: "INSERT INTO admin_record (id, module, title, status, priority, data, created_at, updated_at) VALUES (?, 'project', ?, 'Published', 'Normal', ?, ?, ?)", args: [randomUUID(), project.title, data, now, now] });
    }
  }

  const contentResult = await tx.execute("SELECT document FROM portfolio_content WHERE id = 'main'");
  if (!contentResult.rows[0]) throw new Error("Dokumen portfolio_content/main belum ada. Simpan konten CMS sekali, lalu jalankan ulang perintah ini.");
  const raw = contentResult.rows[0].document;
  const document = typeof raw === "string" ? JSON.parse(raw) : raw;
  document.labs = labs;
  await tx.execute({ sql: "UPDATE portfolio_content SET document = ?, updated_at = ?, updated_by = 'showcase-refresh' WHERE id = 'main'", args: [JSON.stringify(document), now] });
  await tx.commit();
  console.log(`Konten showcase diperbarui: ${projects.length} studi kasus dan ${labs.length} demo lab.`);
} catch (error) {
  await tx.rollback();
  throw error;
} finally {
  tx.close();
  db.close();
}

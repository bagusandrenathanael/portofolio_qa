import { createClient } from "@libsql/client";

const db = createClient({ url: process.env.TURSO_DATABASE_URL, authToken: process.env.TURSO_AUTH_TOKEN });
const now = new Date().toISOString();
const certificationLogo = (issuer) => /linkedin learning/i.test(issuer) ? "/issuer-linkedin-learning.svg" : /cisco/i.test(issuer) ? "/issuer-cisco.svg" : /british council|etsr/i.test(issuer) ? "/issuer-british-council.svg" : "/issuer-credential.svg";
const employerLogo = (company) => /Pusat Gadai/i.test(company) ? "/pusat-gadai-logo.png" : /nexSoft/i.test(company) ? "/nexsoft-logo.png" : /Ideaco/i.test(company) ? "/ideaco-logo.png" : /Metrodata/i.test(company) ? "/metrodata-logo.png" : "";
const experiences = [
  { title: "Software Quality Assurance Engineer — Pusat Gadai Indonesia (PGI)", role: "Software Quality Assurance Engineer", company: "Pusat Gadai Indonesia (PGI)", logo: employerLogo("Pusat Gadai Indonesia"), startDate: "April 2025", endDate: "", current: true, description: "Plan and execute web and mobile test scenarios for Pugindo Web App and GAOL Mobile (Android and iOS). Perform manual and Playwright POM automation across functional, regression, integration, UAT, and end-to-end testing. Track defects with ClickUp and Jam.dev; validate APIs with Postman and performance with JMeter; inspect HTTP and JSON behavior using Chrome DevTools.", skillNames: ["Playwright (POM)", "Postman / API Testing", "JMeter", "Regression Testing"], sortOrder: 1, visible: true },
  { title: "Software Quality Assurance Engineer — PT Paramadaksa Teknologi Nusantara (nexSoft)", role: "Software Quality Assurance Engineer", company: "PT Paramadaksa Teknologi Nusantara (nexSoft)", logo: employerLogo("nexSoft"), startDate: "August 2024", endDate: "April 2025", current: false, description: "Executed 300+ manual and automated test cases for ND6 and Nexchief. Created tests from FSD and change request requirements; tested APIs with Postman, monitored JBoss logs, and validated data with SQL/SQLYog. Automated with Katalon Studio (Groovy) and Selenium, managed defects in Redmine, and supported UAT and release readiness.", skillNames: ["Katalon Studio", "Selenium", "Postman / API Testing", "SQL", "Regression Testing"], sortOrder: 2, visible: true },
  { title: "Quality Assurance & Data Engineer — PT Idea Kolaborasi Utama (Ideaco) / BNI", role: "Quality Assurance & Data Engineer", company: "PT Idea Kolaborasi Utama (Ideaco) — Bank Negara Indonesia (BNI)", logo: employerLogo("Ideaco"), startDate: "December 2023", endDate: "July 2024", current: false, description: "Prepared test plans and scenarios for the Maverick Operational Data Store. Executed 500+ functional, integration, performance, security, and data validation cases for backend services and database queries. Validated ETL processes across banking platforms using SQL.", skillNames: ["SQL", "JMeter", "Data Validation", "ETL Validation"], sortOrder: 3, visible: true },
  { title: "Oracle Administrator & System Support — PT Mitra Integrasi Informatika", role: "Oracle Administrator & System Support", company: "PT Mitra Integrasi Informatika (Metrodata Group)", logo: employerLogo("Metrodata"), startDate: "June 2023", endDate: "December 2023", current: false, description: "Maintained Oracle Exadata and ILOM-OS, automated health checks with Bash/Shell, and managed Oracle Support incidents for the Sakti application across DC/DRC Kemenkeu DJPB RI.", skillNames: ["Oracle Exadata", "Shell Scripting"], sortOrder: 4, visible: true },
];
const education = [{ title: "Bachelor of Information Systems — Stikubank University Semarang", institution: "Stikubank University Semarang", degree: "Bachelor of Information Systems", startYear: "2019", endYear: "2023", description: "GPA 3.62/4.00", logo: "/unisb-logo.png", sortOrder: 1, visible: true }];
const projects = [
  { title: "Pugindo Web App", slug: "pugindo-web-app", summary: "Quality assurance for the Pugindo web application at Pusat Gadai Indonesia.", description: "Plan and execute web test scenarios based on functional and business requirements. Combine manual testing and Playwright POM automation across functional, regression, integration, UAT, and end-to-end coverage. Document test cases and results, and track and verify defects using ClickUp and Jam.dev.", context: "Testing is planned and executed against functional and business requirements.", strategy: "Combine manual checks and Playwright POM automation across the end-to-end testing lifecycle.", result: "Test cases and results are documented; defects are tracked and verified with ClickUp and Jam.dev.", category: "Web · Quality Assurance", tags: ["Manual Testing", "Playwright (POM)", "ClickUp", "Jam.dev"], thumbnail: "", gallery: [], demoUrl: "", repoUrl: "", date: "2025 — Present", featured: true, sortOrder: 1, visible: true },
  { title: "GAOL Mobile", slug: "gaol-mobile", summary: "Quality assurance for the GAOL Mobile application on Android and iOS.", description: "Test the mobile application against functional and business requirements at Pusat Gadai Indonesia. Cover functional, regression, integration, UAT, and end-to-end scenarios using manual and automated testing. Validate service integrations with Postman and use JMeter for performance testing.", context: "The mobile application supports Android and iOS users and is tested against functional and business requirements.", strategy: "Combine manual and automated testing across core functional, regression, integration, UAT, and end-to-end scenarios.", result: "Test findings are documented; service integrations are checked with Postman and performance with JMeter.", category: "Android & iOS · Quality Assurance", tags: ["Manual Testing", "Playwright (POM)", "Postman", "JMeter"], thumbnail: "", gallery: [], demoUrl: "", repoUrl: "", date: "2025 — Present", featured: true, sortOrder: 2, visible: true },
  { title: "Maverick Operational Data Store", slug: "maverick-ods-bni", summary: "Quality assurance and data validation for Maverick ODS at BNI.", description: "Prepare test plans and scenarios for an operational data store supporting accurate real-time analytics. Execute 500+ functional, integration, performance, security, and data validation cases for backend services and database queries. Validate ETL processes across banking platforms using SQL.", context: "Maverick ODS is a critical data integration system at BNI designed for high-accuracy real-time analytics.", strategy: "Test backend services, database queries, functional and integration behavior, performance, security, and ETL data flows.", result: "Executed 500+ test cases and validated ETL processes using SQL across banking platforms.", category: "Banking · Data Quality", tags: ["SQL", "Data Validation", "ETL", "Performance Testing"], thumbnail: "", gallery: [], demoUrl: "", repoUrl: "", date: "Dec 2023 — Jul 2024", featured: true, sortOrder: 3, visible: true },
  { title: "ND6 & Nexchief", slug: "nd6-nexchief", summary: "Enterprise application testing at PT Paramadaksa Teknologi Nusantara (nexSoft).", description: "Execute 300+ manual and automated test cases for ND6 and Nexchief, covering functional, regression, and UAT testing. Derive tests from FSD and change request requirements; test APIs with Postman, monitor JBoss logs, and validate data with SQL/SQLYog. Automate with Katalon Studio (Groovy) and Selenium, manage defects in Redmine, and prepare QA reports before deployment.", context: "Feature testing follows FSD and change request requirements for enterprise applications.", strategy: "Combine manual and automated testing, API validation, log monitoring, database checks, and UAT.", result: "300+ test cases executed; QA reports prepared for release readiness and defects managed in Redmine.", category: "Enterprise · Test Automation", tags: ["Katalon Studio", "Selenium", "Postman", "SQLYog", "Redmine"], thumbnail: "", gallery: [], demoUrl: "", repoUrl: "", date: "Aug 2024 — Apr 2025", featured: true, sortOrder: 4, visible: true },
];
const skillGroups = [
  ["Manual & Functional Testing", "Testing"], ["Regression Testing", "Testing"], ["Smoke Testing", "Testing"], ["Sanity Testing", "Testing"], ["User Acceptance Testing (UAT)", "Testing"], ["System Integration Testing (SIT)", "Testing"], ["Black Box Testing", "Testing"], ["Test Planning", "Testing"], ["Test Case Creation", "Testing"], ["Quality Assurance Testing", "Testing"],
  ["Playwright (POM)", "Automation"], ["Selenium", "Automation"], ["Katalon Studio", "Automation"], ["Cucumber BDD", "Automation"], ["Appium", "Automation"],
  ["Postman / API Testing", "API & Performance"], ["JMeter", "API & Performance"], ["SQL", "Data & Development"], ["SQLYog", "Data & Development"], ["ETL Validation", "Data & Development"], ["Data Validation", "Data & Development"], ["Java", "Data & Development"], ["JavaScript", "Data & Development"], ["Groovy", "Data & Development"], ["Shell Scripting", "Data & Development"],
  ["Jira", "Tools & Platforms"], ["ClickUp", "Tools & Platforms"], ["Redmine", "Tools & Platforms"], ["Jam.dev", "Tools & Platforms"], ["Chrome DevTools", "Tools & Platforms"], ["JBoss", "Tools & Platforms"], ["Oracle Exadata", "Tools & Platforms"], ["IBM DataStage", "Tools & Platforms"], ["Apache Kafka", "Tools & Platforms"], ["Apache Spark", "Tools & Platforms"], ["Git", "Tools & Platforms"], ["GitHub Actions", "Tools & Platforms"], ["Microsoft Office", "Tools & Platforms"], ["Google Workspace", "Tools & Platforms"],
  ["Agile/Scrum", "Methods & Professional Skills"], ["SDLC", "Methods & Professional Skills"], ["STLC", "Methods & Professional Skills"], ["Business Analysis", "Methods & Professional Skills"], ["Problem Solving", "Methods & Professional Skills"], ["Analytical Skills", "Methods & Professional Skills"], ["Attention to Detail", "Methods & Professional Skills"], ["Teamwork", "Methods & Professional Skills"], ["Communication", "Methods & Professional Skills"],
].map(([title, category], index) => ({ title, category, level: "", icon: "", sortOrder: index + 1, visible: true }));
const certifications = [
  ["Advanced Playwright Techniques: Optimizing Speed, Stability, and Cloud Testing", "LinkedIn Learning", "2026"],
  ["Get Started with Databricks for Machine Learning", "LinkedIn Learning", "2026"],
  ["Certified Business Analysis Professional (CBAP) Cert Prep", "LinkedIn Learning", "2026"],
  ["Test-Driven Development in Spring Boot with JUnit and Mockito", "LinkedIn Learning", "2026"],
  ["Software Testing Foundations: Continuous Testing and DevOps", "LinkedIn Learning", "2026"],
  ["Mobile Testing with Appium", "LinkedIn Learning", "2026"],
  ["Programming Foundations: Software Testing/QA", "LinkedIn Learning", "2026"],
  ["Software Testing Foundations: Bug Writing and Management", "LinkedIn Learning", "2026"],
  ["Practical GitHub Actions", "LinkedIn Learning", "2026"],
  ["Self-Paced Cybersecurity · PCAP: Programming Essentials in Python", "Cisco", "2022"],
  ["English Proficiency Score (223) · TOEFL Score Report (430)", "British Council · ETSR", "2023"],
].map(([title, issuer, issuedAt], index) => ({ title, issuer, issuedAt, credentialUrl: "", image: certificationLogo(issuer), sortOrder: index + 1, visible: true }));

function parseDocument(value) {
  if (typeof value === "string") return JSON.parse(value);
  return value;
}

async function upsertRecord(module, title, data) {
  const found = await db.execute({ sql: "SELECT id FROM admin_record WHERE module = ? AND title = ? ORDER BY updated_at DESC LIMIT 1", args: [module, title] });
  const existing = found.rows[0];
  if (existing) {
    const id = String(existing.id);
    await db.execute({ sql: "UPDATE admin_record SET status = 'Published', priority = 'Normal', data = ?, updated_at = ? WHERE id = ?", args: [JSON.stringify(data), now, id] });
    return id;
  }
  const id = `cv-${module}-${crypto.randomUUID()}`;
  await db.execute({ sql: "INSERT INTO admin_record (id, module, title, status, priority, data, created_at, updated_at) VALUES (?, ?, ?, 'Published', 'Normal', ?, ?, ?)", args: [id, module, title, JSON.stringify(data), now, now] });
  return id;
}

try {
  const result = await db.execute("SELECT document FROM portfolio_content WHERE id = 'main'");
  const content = result.rows[0] ? parseDocument(result.rows[0].document) : {};
  const previousProfile = content.profile ?? {};
  content.profile = {
    ...previousProfile,
    role: "Software Quality Assurance Engineer",
    location: "Kebon Jeruk, West Jakarta, Indonesia",
    phone: "+62895359517463",
    headline: "Software Quality Assurance Engineer with experience in web, mobile, API, and data validation.",
    summary: "Experienced in banking, financial, and enterprise systems. Skilled in Playwright (POM), Selenium, Katalon Studio, Cucumber BDD, manual testing, SQL validation, and backend verification. I work across the testing lifecycle with cross-functional teams to align product quality with business requirements.",
    email: "bagusandrenathanael@gmail.com",
    cvUrl: "/Andre-Nathanael-CV.pdf",
    experienceYears: 3,
    projectsSupported: 20,
    testCasesCreated: 500,
  };
  content.about = {
    ...(content.about ?? {}),
    title: "Quality assurance across banking, finance, and enterprise products.",
    paragraphs: [
      "Software Quality Assurance Engineer experienced in web and mobile applications, API testing, and data validation across banking, financial, and enterprise systems.",
      "I manage end-to-end testing activities, collaborate with cross-functional teams, and help ensure product quality aligns with business requirements. My approach combines risk-focused manual testing with maintainable automation and clear defect reporting.",
    ],
    experience: experiences.map((item) => ({ period: `${item.startDate} — ${item.current ? "Present" : item.endDate}`, role: item.role, company: item.company, description: item.description })),
  };
  content.education = [{ institution: "Stikubank University Semarang", degree: "Bachelor of Information Systems · GPA 3.62/4.00", period: "2019 — 2023", description: "Information Systems", logo: "/unisb-logo.png" }];
  content.projects = projects.map((item) => ({ title: item.title, category: item.category, isPublished: true, tools: item.tags, description: item.summary, context: item.context, strategy: item.strategy, result: item.result }));
  content.skills = [
    { title: "Quality Assurance & Testing", category: "testing", description: "Manual, automation, and risk-based testing across web and mobile products.", items: ["Manual Testing", "Functional Testing", "Regression Testing", "Smoke & Sanity Testing", "UAT", "SIT", "Black Box Testing", "Test Planning", "Test Case Creation"] },
    { title: "Automation", category: "automation", description: "Automated checks for reliable regression and end-to-end coverage.", items: ["Playwright (POM)", "Selenium", "Katalon Studio", "Cucumber BDD", "Appium"] },
    { title: "API, Performance & Data", category: "api", description: "Service integration, load behavior, and database data validation.", items: ["Postman", "API Testing", "JMeter", "SQL", "SQLYog", "ETL Validation"] },
    { title: "Tools & Platforms", category: "tools", description: "QA collaboration, development, and enterprise data platforms.", items: ["Jira", "ClickUp", "Redmine", "Jam.dev", "Chrome DevTools", "JBoss", "Oracle Exadata", "IBM DataStage", "Apache Kafka", "Apache Spark", "Git", "GitHub Actions", "Microsoft Office", "Google Workspace"] },
    { title: "Programming & Ways of Working", category: "process", description: "Technical foundations and cross-functional delivery practices.", items: ["Java", "JavaScript", "Groovy", "Shell Scripting", "Agile/Scrum", "SDLC", "STLC", "Business Analysis", "Problem Solving", "Analytical Skills", "Attention to Detail", "Teamwork", "Communication"] },
  ];
  content.certifications = certifications.map(({ title, issuer, issuedAt, image }) => ({ title, issuer, year: issuedAt, url: "", logo: image }));
  const serialized = JSON.stringify(content);
  if (result.rows[0]) await db.execute({ sql: "UPDATE portfolio_content SET document = ?, updated_at = ?, updated_by = 'cv-import' WHERE id = 'main'", args: [serialized, now] });
  else await db.execute({ sql: "INSERT INTO portfolio_content (id, document, updated_at, updated_by) VALUES ('main', ?, ?, 'cv-import')", args: [serialized, now] });

  // Keep old records recoverable in CMS, but stop showing records that do not
  // belong to the supplied CV; matching CV items are republished below.
  await db.execute({ sql: "UPDATE admin_record SET status = 'Draft', data = json_set(data, '$.visible', json('false')), updated_at = ? WHERE module IN ('experience', 'education', 'skill', 'certification', 'project')", args: [now] });
  const skillIds = new Map();
  for (const item of skillGroups) skillIds.set(item.title, await upsertRecord("skill", item.title, item));
  const experienceIds = [];
  for (const item of experiences) experienceIds.push({ id: await upsertRecord("experience", item.title, item), skillTitles: item.skillNames });
  for (const item of education) await upsertRecord("education", item.title, item);
  for (const item of projects) await upsertRecord("project", item.title, item);
  for (const item of certifications) await upsertRecord("certification", item.title, item);
  for (const item of experienceIds) {
    await db.execute({ sql: "DELETE FROM content_relation WHERE source_id = ? AND relation = 'experience-skill'", args: [item.id] });
    for (const title of item.skillTitles) {
      const targetId = skillIds.get(title);
      if (targetId) await db.execute({ sql: "INSERT OR IGNORE INTO content_relation (id, relation, source_id, target_id, created_at) VALUES (?, 'experience-skill', ?, ?, ?)", args: [`cv-rel-${crypto.randomUUID()}`, item.id, targetId, now] });
    }
  }
  console.log("CV profile, experience, education, skills, certifications, 4 project case studies, and CV download were synchronized.");
} finally {
  await db.close();
}

export type PortfolioContent = {
  profile: {
    name: string;
    role: string;
    photoUrl: string;
    bannerUrl: string;
    location: string;
    openToWork: boolean;
    phone: string;
    headline: string;
    summary: string;
    email: string;
    linkedin: string;
    whatsapp: string;
    github: string;
    cvUrl: string;
    seoTitle: string;
    seoDescription: string;
    experienceYears: number;
    projectsSupported: number;
    testCasesCreated: number;
  };
  about: {
    title: string;
    paragraphs: string[];
    principles: { title: string; description: string }[];
    experience: { period: string; role: string; company: string; description: string }[];
  };
  education: { institution: string; degree: string; period: string; description: string; logo: string }[];
  skills: { title: string; category: string; description: string; items: string[] }[];
  projects: {
    title: string;
    titleEn?: string;
    category: string;
    categoryEn?: string;
    isPublished: boolean;
    tools: string[];
    thumbnail?: string;
    gallery?: string[];
    summary?: string;
    summaryEn?: string;
    description: string;
    descriptionEn?: string;
    context: string;
    contextEn?: string;
    strategy: string;
    strategyEn?: string;
    result: string;
    resultEn?: string;
  }[];
  labs: { title: string; description: string; tool: string; example: string; url: string }[];
  certifications: { title: string; issuer: string; year: string; url: string; logo?: string }[];
  posts: { title: string; category: string; readTime: string; description: string; isPublished: boolean }[];
  navigation: { key: string; target: string; visible: boolean }[];
  contact: { heading: string; message: string; email: string; phone: string; socialLinks: { platform: string; url: string; icon: string; visible: boolean; sortOrder: number }[] };
  siteSettings: { siteTitle: string; logo: string; favicon: string; seoTitle: string; seoDescription: string; themeColor: string };
};

export const defaultPortfolioContent: PortfolioContent = {
  profile: {
    name: "Bagus Andre Nathanael",
    role: "Software Quality Assurance Engineer",
    photoUrl: "",
    bannerUrl: "",
    location: "Kebon Jeruk, West Jakarta, Indonesia",
    openToWork: true,
    phone: "+62895359517463",
    headline: "Software Quality Assurance Engineer with experience in web, mobile, API, and data validation.",
    summary: "Experienced in banking, financial, and enterprise systems. Skilled in Playwright (POM), Selenium, Katalon Studio, Cucumber BDD, manual testing, SQL validation, and backend verification. I work across the testing lifecycle with cross-functional teams to align product quality with business requirements.",
    email: "bagusandrenathanael@gmail.com",
    linkedin: "https://linkedin.com/in/bagusandrenathanael",
    whatsapp: "",
    github: "https://github.com/bagusandrenathanael",
    cvUrl: "/Andre-Nathanael-CV.pdf",
    seoTitle: "Andre Nathanael — Software Quality Assurance Engineer Specialist",
    seoDescription: "Quality assurance engineer focused on software testing, automation, and product quality.",
    experienceYears: 3,
    projectsSupported: 20,
    testCasesCreated: 500,
  },
  about: {
    title: "Quality assurance across banking, finance, and enterprise products.",
    paragraphs: [
      "Software Quality Assurance Engineer experienced in web and mobile applications, API testing, and data validation across banking, financial, and enterprise systems.",
      "I manage end-to-end testing activities, collaborate with cross-functional teams, and help ensure product quality aligns with business requirements. My approach combines risk-focused manual testing with maintainable automation and clear defect reporting.",
    ],
    principles: [
      { title: "Risk-focused", description: "Plan scenarios and test coverage around business requirements and user impact." },
      { title: "Collaborative", description: "Work with developers, business analysts, customer service, and product teams." },
      { title: "Evidence-based", description: "Document test results and defects with clear reproduction details." },
    ],
    experience: [
      { period: "Apr 2025 — Present", role: "Software Quality Assurance Engineer", company: "Pusat Gadai Indonesia (PGI)", description: "Plan and execute web and mobile test scenarios for Pugindo Web App and GAOL Mobile. Perform manual and Playwright POM automation across functional, regression, integration, UAT, and end-to-end testing. Track defects with ClickUp and Jam.dev; validate APIs with Postman and performance with JMeter; inspect HTTP and JSON behavior using Chrome DevTools." },
      { period: "Aug 2024 — Apr 2025", role: "Software Quality Assurance Engineer", company: "PT Paramadaksa Teknologi Nusantara (nexSoft)", description: "Executed 300+ manual and automated test cases for ND6 and Nexchief. Created tests from FSD and change request requirements; tested APIs with Postman, monitored JBoss logs, and validated data with SQL/SQLYog. Automated with Katalon Studio (Groovy) and Selenium, managed defects in Redmine, and supported UAT and release readiness." },
      { period: "Dec 2023 — Jul 2024", role: "Quality Assurance & Data Engineer", company: "PT Idea Kolaborasi Utama (Ideaco) — Bank Negara Indonesia (BNI)", description: "Prepared test plans and scenarios for the Maverick Operational Data Store. Executed 500+ functional, integration, performance, security, and data validation cases for backend services and database queries. Validated ETL processes across banking platforms using SQL." },
      { period: "Jun 2023 — Dec 2023", role: "Oracle Administrator & System Support", company: "PT Mitra Integrasi Informatika (Metrodata Group)", description: "Maintained Oracle Exadata and ILOM-OS, automated health checks with Bash/Shell, and managed Oracle Support incidents for the Sakti application across DC/DRC Kemenkeu DJPB RI." },
    ],
  },
  education: [{ institution: "Stikubank University Semarang", degree: "Bachelor of Information Systems · GPA 3.62/4.00", period: "2019 — 2023", description: "Information Systems", logo: "/unisb-logo.png" }],
  skills: [
    { title: "Quality Assurance & Testing", category: "testing", description: "Manual, automation, and risk-based testing across web and mobile products.", items: ["Manual Testing", "Functional Testing", "Regression Testing", "Smoke & Sanity Testing", "UAT", "SIT", "Black Box Testing", "Test Planning", "Test Case Creation"] },
    { title: "Automation", category: "automation", description: "Automated checks and CI pipelines for reliable regression and end-to-end coverage.", items: ["Playwright (POM)", "Selenium", "Katalon Studio", "Cucumber BDD", "Appium", "Jenkins"] },
    { title: "API, Performance & Data", category: "api", description: "Service integration, load behavior, and database data validation.", items: ["Postman", "API Testing", "JMeter", "SQL", "SQLYog", "Data Validation", "ETL Validation"] },
    { title: "Tools & Platforms", category: "tools", description: "QA collaboration, development, and enterprise data platforms.", items: ["Jira", "ClickUp", "Redmine", "Jam.dev", "Chrome DevTools", "JBoss", "Oracle Exadata", "IBM DataStage", "Apache Kafka", "Apache Spark", "Git", "GitHub Actions", "Microsoft Office", "Google Workspace"] },
    { title: "Programming & Ways of Working", category: "process", description: "Technical foundations and cross-functional delivery practices.", items: ["Java", "JavaScript", "Groovy", "Shell Scripting", "Agile/Scrum", "SDLC", "STLC", "Business Analysis", "Problem Solving", "Analytical Skills", "Attention to Detail", "Teamwork", "Communication"] },
  ],
  projects: [
    { title: "Pugindo Web App", titleEn: "Pugindo Web App", category: "Web · Quality Assurance", categoryEn: "Web · Quality Assurance", isPublished: true, tools: ["Manual Testing", "Playwright (POM)", "Functional & Regression", "ClickUp", "Jam.dev"], thumbnail: "/case-studies/pugindo-web-app.webp", gallery: ["/case-studies/pugindo-web-app.webp"], summary: "Quality assurance untuk aplikasi web Pugindo, dari analisis kebutuhan hingga verifikasi perbaikan, dengan pengujian eksploratori dan otomasi Playwright POM yang dapat digunakan kembali.", summaryEn: "Quality assurance for Pugindo’s web application, from requirement analysis to verified fixes, combining exploratory testing with reusable Playwright POM automation.", description: "Menyusun dan menjalankan skenario pengujian web berdasarkan kebutuhan fungsional dan bisnis. Menggabungkan pengujian manual dengan otomasi Playwright POM untuk cakupan functional, regression, integration, UAT, dan end-to-end. Mendokumentasikan kasus dan hasil uji, lalu menindaklanjuti defect melalui ClickUp dan Jam.dev.", descriptionEn: "Plan and execute web test scenarios based on functional and business requirements. Combine manual testing with Playwright POM automation across functional, regression, integration, UAT, and end-to-end coverage. Document test cases and results, then track and verify defects using ClickUp and Jam.dev.", context: "Memvalidasi aplikasi web Pugindo terhadap kebutuhan fungsional dan bisnis pada setiap perubahan yang diuji.", contextEn: "Validate Pugindo Web App against functional and business requirements across planned releases.", strategy: "Mengubah kebutuhan menjadi skenario yang dapat ditelusuri. Menguji alur fungsional, regression, integrasi, UAT, dan end-to-end; menggunakan eksplorasi manual untuk menemukan risiko, lalu Playwright POM untuk pemeriksaan regression berulang.", strategyEn: "Translate requirements into traceable scenarios; cover functional, regression, integration, UAT, and end-to-end flows. Use manual exploration to uncover risk and Playwright POM for repeatable regression checks.", result: "Kasus dan hasil uji terdokumentasi; defect disertai bukti melalui ClickUp atau Jam.dev, kemudian diuji ulang untuk mendukung kesiapan rilis.", resultEn: "Document test cases and outcomes, report actionable defects through ClickUp and Jam.dev, and verify fixes as part of release readiness." },
    { title: "GAOL Mobile", titleEn: "GAOL Mobile", category: "Aplikasi Android & iOS · Quality Assurance", categoryEn: "Android & iOS · Quality Assurance", isPublished: true, tools: ["Manual Testing", "Postman", "JMeter", "API Testing", "Functional & Regression"], thumbnail: "/case-studies/gaol-mobile.webp", gallery: ["/case-studies/gaol-mobile.webp"], summary: "Pengujian QA untuk GAOL Mobile di Android dan iOS, mencakup alur pengguna utama, integrasi layanan, perilaku API, dan pemeriksaan performa.", summaryEn: "Release-focused QA for GAOL Mobile on Android and iOS, covering core user journeys, service integration, API behavior, and performance checks.", description: "Menguji aplikasi GAOL Mobile berdasarkan kebutuhan produk di Android dan iOS. Menjalankan skenario functional, regression, integration, UAT, dan end-to-end secara manual maupun otomatis sesuai alur yang diuji. Memvalidasi layanan melalui Postman dan melakukan pemeriksaan performa menggunakan JMeter.", descriptionEn: "Test the GAOL Mobile application against product requirements on Android and iOS. Execute functional, regression, integration, UAT, and end-to-end scenarios using manual and automated checks appropriate to each flow. Validate services with Postman and perform performance checks with JMeter.", context: "Menilai alur penting GAOL Mobile dan interaksinya dengan layanan pendukung pada platform Android dan iOS.", contextEn: "Assess GAOL Mobile’s key user journeys and service integrations across Android and iOS.", strategy: "Menggabungkan pengujian fungsional, regression, integrasi, UAT, dan end-to-end. Memeriksa request serta response API dengan Postman, lalu menggunakan JMeter untuk mengamati perilaku performa pada skenario yang relevan.", strategyEn: "Combine functional, regression, integration, UAT, and end-to-end checks. Inspect API requests and responses with Postman, then use JMeter to observe performance behavior under relevant scenarios.", result: "Hasil pengujian dan temuan dicatat untuk ditindaklanjuti; pemeriksaan layanan dan performa memberi bukti tambahan dalam evaluasi kesiapan rilis.", resultEn: "Document test outcomes and findings for follow-up; service and performance checks provide additional evidence for release-readiness reviews." },
    { title: "ND6 & Nexchief", titleEn: "ND6 & Nexchief", category: "Enterprise · QA & Otomasi", categoryEn: "Enterprise · QA & Test Automation", isPublished: true, tools: ["Manual Testing", "Katalon Studio", "Selenium", "Groovy", "Postman", "SQL / SQLYog", "JBoss", "Redmine"], thumbnail: "/case-studies/nd6-nexchief.webp", gallery: ["/case-studies/nd6-nexchief.webp"], summary: "QA aplikasi enterprise ND6 dan Nexchief dengan 300+ test case manual dan otomatis yang diturunkan dari FSD serta change request, dilengkapi pemeriksaan API, database, dan log.", summaryEn: "Enterprise QA for ND6 and Nexchief: 300+ manual and automated test cases derived from functional specifications and change requests, supported by API, database, and log checks.", description: "Menjalankan 300+ test case manual dan otomatis untuk ND6 dan Nexchief, mencakup pengujian functional, regression, dan UAT. Menurunkan skenario dari FSD dan change request; menguji API melalui Postman, memantau log JBoss, dan memvalidasi data dengan SQL/SQLYog. Mengotomasi skenario terpilih menggunakan Katalon Studio (Groovy) dan Selenium, serta mengelola defect di Redmine.", descriptionEn: "Execute 300+ manual and automated test cases for ND6 and Nexchief across functional, regression, and UAT coverage. Derive scenarios from functional specifications and change requests; test APIs with Postman, review JBoss logs, and validate data with SQL/SQLYog. Automate selected scenarios with Katalon Studio (Groovy) and Selenium, and track defects in Redmine.", context: "Memastikan perubahan pada ND6 Distribution Management System dan Nexchief sesuai dengan spesifikasi fungsional dan change request yang disetujui.", contextEn: "Verify changes to the ND6 Distribution Management System and Nexchief against approved functional specifications and change requests.", strategy: "Menelusuri FSD dan change request ke test case, lalu mencakup functional, regression, dan UAT. Memeriksa API dengan Postman, log aplikasi melalui JBoss, konsistensi data dengan SQL/SQLYog, serta mengotomasi skenario yang sesuai dengan Katalon Studio dan Selenium.", strategyEn: "Trace functional specifications and change requests to test cases across functional, regression, and UAT coverage. Check APIs with Postman, application logs in JBoss, and data consistency with SQL/SQLYog; automate suitable scenarios with Katalon Studio and Selenium.", result: "Lebih dari 300 test case manual dan otomatis dijalankan. Temuan dicatat di Redmine dan hasilnya mendukung tindak lanjut UAT serta evaluasi kesiapan rilis.", resultEn: "More than 300 manual and automated test cases were executed. Findings were tracked in Redmine, supporting UAT follow-up and release-readiness reviews." },
    { title: "Maverick Operational Data Store", category: "Banking · Data Quality", isPublished: true, tools: ["SQL", "Data Validation", "ETL Validation", "Integration", "Performance"], thumbnail: "/case-studies/maverick-ods.webp", gallery: ["/case-studies/maverick-ods.webp"], description: "Data-focused QA for BNI’s Maverick Operational Data Store, validating backend workflows and source-to-target ETL with SQL across 500+ test cases.", context: "Support data quality checks for an operational data store within a banking environment.", strategy: "Plan coverage across functional, integration, performance, security, backend-service, and database-query scenarios; validate ETL data flows with SQL.", result: "Executed 500+ test cases and validated ETL processes across banking platforms using SQL." },
  ],
  labs: [
    { title: "Page Object Model · UI smoke test", description: "A self-contained Playwright POM example: isolate page actions, assert the user journey, and read the target URL and test credentials from environment variables.", tool: "Playwright · TypeScript", example: "import { test, expect, type Page } from \"@playwright/test\";\n\nclass LoginPage {\n  constructor(private readonly page: Page) {}\n  async open() { await this.page.goto(process.env.QA_BASE_URL!); }\n  async signIn(username: string, password: string) {\n    await this.page.getByLabel(\"Username\").fill(username);\n    await this.page.getByLabel(\"Password\").fill(password);\n    await this.page.getByRole(\"button\", { name: \"Sign in\" }).click();\n  }\n}\n\ntest(\"authenticated user can access the dashboard\", async ({ page }) => {\n  test.skip(!process.env.QA_BASE_URL || !process.env.QA_USERNAME || !process.env.QA_PASSWORD, \"Set QA_BASE_URL, QA_USERNAME, and QA_PASSWORD in the test environment.\");\n  const login = new LoginPage(page);\n  await login.open();\n  await login.signIn(process.env.QA_USERNAME!, process.env.QA_PASSWORD!);\n  await expect(page).toHaveURL(/dashboard/);\n});", url: "" },
    { title: "API contract · response checks", description: "Validate successful HTTP responses and the required JSON shape to catch service contract changes early.", tool: "Postman · REST API", example: "pm.test(\"HTTP response is successful\", () => {\n  pm.expect(pm.response.code).to.be.within(200, 299);\n});\n\npm.test(\"response follows the contract\", () => {\n  pm.response.to.have.jsonSchema({\n    type: \"object\",\n    required: [\"data\"],\n    properties: { data: { type: \"object\" } },\n  });\n});", url: "" },
    { title: "ETL reconciliation · data quality", description: "Reconcile source and target records, including null handling, to identify missing rows and data mismatches during ETL validation.", tool: "SQL · Data Validation", example: "SELECT s.record_id, s.amount AS source_amount, t.amount AS target_amount\nFROM source_records AS s\nLEFT JOIN target_records AS t\n  ON t.record_id = s.record_id\nWHERE t.record_id IS NULL\n   OR s.amount <> t.amount\n   OR (s.amount IS NULL AND t.amount IS NOT NULL)\n   OR (s.amount IS NOT NULL AND t.amount IS NULL);", url: "" },
    { title: "Performance run · JMeter", description: "Run a version-controlled JMeter plan in non-GUI mode and generate an HTML report for response-time, throughput, and error analysis.", tool: "JMeter · Load Testing", example: "jmeter -n \\\n  -t tests/performance/checkout-flow.jmx \\\n  -l artifacts/checkout-flow.jtl \\\n  -e -o artifacts/jmeter-html", url: "" },
  ],
  certifications: [
    { title: "Advanced Playwright Techniques: Optimizing Speed, Stability, and Cloud Testing", issuer: "LinkedIn Learning", year: "2026", url: "", logo: "/issuer-linkedin-learning.svg" },
    { title: "Get Started with Databricks for Machine Learning", issuer: "LinkedIn Learning", year: "2026", url: "", logo: "/issuer-linkedin-learning.svg" },
    { title: "Certified Business Analysis Professional (CBAP) Cert Prep", issuer: "LinkedIn Learning", year: "2026", url: "", logo: "/issuer-linkedin-learning.svg" },
    { title: "Test-Driven Development in Spring Boot with JUnit and Mockito", issuer: "LinkedIn Learning", year: "2026", url: "", logo: "/issuer-linkedin-learning.svg" },
    { title: "Software Testing Foundations: Continuous Testing and DevOps", issuer: "LinkedIn Learning", year: "2026", url: "", logo: "/issuer-linkedin-learning.svg" },
    { title: "Mobile Testing with Appium", issuer: "LinkedIn Learning", year: "2026", url: "", logo: "/issuer-linkedin-learning.svg" },
    { title: "Programming Foundations: Software Testing/QA", issuer: "LinkedIn Learning", year: "2026", url: "", logo: "/issuer-linkedin-learning.svg" },
    { title: "Software Testing Foundations: Bug Writing and Management", issuer: "LinkedIn Learning", year: "2026", url: "", logo: "/issuer-linkedin-learning.svg" },
    { title: "Practical GitHub Actions", issuer: "LinkedIn Learning", year: "2026", url: "", logo: "/issuer-linkedin-learning.svg" },
    { title: "Cisco Self-Paced Cybersecurity · PCAP: Programming Essentials in Python", issuer: "Cisco", year: "2022", url: "", logo: "/issuer-cisco.svg" },
    { title: "English Proficiency Score (223) · TOEFL Score Report (430)", issuer: "British Council · ETSR", year: "2023", url: "", logo: "/issuer-british-council.svg" },
  ],
  posts: [
    { title: "Uji berdasarkan risiko, bukan sekadar jumlah test case", category: "Strategi Pengujian", readTime: "5 menit", description: "Petakan dampak ke pengguna, nilai transaksi, dan peluang kegagalan. Prioritaskan alur kritis lalu tautkan setiap risiko ke skenario, hasil uji, dan tindak lanjut yang jelas.", isPublished: true },
    { title: "Memilih alur yang tepat untuk otomasi regression", category: "Test Automation", readTime: "5 menit", description: "Otomasi paling bernilai pada alur yang stabil, sering diulang, dan berisiko tinggi. Gunakan struktur yang mudah dirawat; tetap eksplorasi manual untuk pengalaman baru dan kondisi yang belum dipahami.", isPublished: true },
    { title: "Bug report yang membantu tim bergerak cepat", category: "Kolaborasi Tim", readTime: "4 menit", description: "Sertakan lingkungan, langkah reproduksi, hasil aktual dan yang diharapkan, serta bukti yang relevan. Jelaskan dampak pengguna agar prioritas dan verifikasi perbaikan lebih terarah.", isPublished: true },
  ],
  navigation: [
    { key: "home", target: "home", visible: true }, { key: "about", target: "about", visible: true },
    { key: "skillsNav", target: "skills", visible: true }, { key: "casesNav", target: "work", visible: true },
    { key: "labNav", target: "lab", visible: true }, { key: "credentialsNav", target: "credentials", visible: true },
    { key: "blogNav", target: "notes", visible: true }, { key: "contactNav", target: "contact", visible: true },
  ],
  contact: { heading: "Mari bikin produk lebih bisa diandalkan.", message: "Saya terbuka berdiskusi tentang QA, otomasi, atau peluang kerja sama.", email: "bagusandrenathanael@gmail.com", phone: "+62895359517463", socialLinks: [] },
  siteSettings: { siteTitle: "Andre Nathanael — Software Quality Assurance Engineer Specialist", logo: "", favicon: "/favicon.svg", seoTitle: "Andre Nathanael — Software Quality Assurance Engineer Specialist", seoDescription: "Quality assurance engineer focused on software testing, automation, and product quality.", themeColor: "#294c8a" },
};

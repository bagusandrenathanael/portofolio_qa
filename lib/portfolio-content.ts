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
    category: string;
    isPublished: boolean;
    tools: string[];
    description: string;
    context: string;
    strategy: string;
    result: string;
  }[];
  labs: { title: string; description: string; tool: string; example: string; url: string }[];
  certifications: { title: string; issuer: string; year: string; url: string }[];
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
    { title: "Automation", category: "automation", description: "Automated checks for reliable regression and end-to-end coverage.", items: ["Playwright (POM)", "Selenium", "Katalon Studio", "Cucumber BDD", "Appium"] },
    { title: "API, Performance & Data", category: "api", description: "Service integration, load behavior, and database data validation.", items: ["Postman", "API Testing", "JMeter", "SQL", "SQLYog", "Data Validation", "ETL Validation"] },
    { title: "Tools & Platforms", category: "tools", description: "QA collaboration, development, and enterprise data platforms.", items: ["Jira", "ClickUp", "Redmine", "Jam.dev", "Chrome DevTools", "JBoss", "Oracle Exadata", "IBM DataStage", "Apache Kafka", "Apache Spark", "Git", "GitHub Actions", "Microsoft Office", "Google Workspace"] },
    { title: "Programming & Ways of Working", category: "process", description: "Technical foundations and cross-functional delivery practices.", items: ["Java", "JavaScript", "Groovy", "Shell Scripting", "Agile/Scrum", "SDLC", "STLC", "Business Analysis", "Problem Solving", "Analytical Skills", "Attention to Detail", "Teamwork", "Communication"] },
  ],
  projects: [
    { title: "Pugindo Web App", category: "Web · Quality Assurance", isPublished: true, tools: ["Manual Testing", "Playwright (POM)", "ClickUp", "Jam.dev"], description: "Quality assurance untuk aplikasi web Pugindo di Pusat Gadai Indonesia.", context: "Pengujian direncanakan dan dijalankan berdasarkan kebutuhan fungsional serta bisnis.", strategy: "Menggabungkan pengujian manual dan otomasi Playwright POM untuk cakupan functional, regression, integration, UAT, dan end-to-end.", result: "Test case dan hasil pengujian didokumentasikan; defect dilacak dan diverifikasi menggunakan ClickUp dan Jam.dev." },
    { title: "GAOL Mobile", category: "Android & iOS · Quality Assurance", isPublished: true, tools: ["Manual Testing", "Playwright (POM)", "Postman", "JMeter"], description: "Pengujian aplikasi GAOL Mobile untuk platform Android dan iOS.", context: "Aplikasi mobile diuji berdasarkan kebutuhan fungsional dan bisnis di Pusat Gadai Indonesia.", strategy: "Menjalankan functional, regression, integration, UAT, dan end-to-end testing dengan kombinasi manual dan otomasi.", result: "Temuan dan hasil tes dicatat dengan presisi; integrasi layanan divalidasi melalui Postman dan JMeter digunakan untuk pengujian performa." },
    { title: "Maverick Operational Data Store", category: "Banking · Data Quality", isPublished: true, tools: ["SQL", "Data Validation", "ETL", "Performance Testing"], description: "Quality assurance dan validasi data untuk sistem Maverick ODS di BNI.", context: "Operational Data Store mendukung integrasi data dan kebutuhan analitik real-time yang akurat.", strategy: "Menyusun test plan dan skenario, lalu menguji fungsionalitas, integrasi, performa, keamanan, layanan backend, dan query database.", result: "Lebih dari 500 test case dieksekusi dan proses ETL divalidasi menggunakan SQL pada platform perbankan." },
    { title: "ND6 & Nexchief", category: "Enterprise · Test Automation", isPublished: true, tools: ["Katalon Studio", "Selenium", "Postman", "SQLYog", "Redmine"], description: "Pengujian aplikasi enterprise ND6 dan Nexchief di nexSoft.", context: "Validasi fitur dibuat berdasarkan dokumen FSD dan change request untuk mendukung kesiapan rilis.", strategy: "Mengeksekusi 300+ test case manual dan otomatis untuk functional, regression, dan UAT; memvalidasi API, log JBoss, serta data database.", result: "Defect dikelola di Redmine, otomasi dijalankan dengan Katalon Studio (Groovy) dan Selenium, serta laporan QA disiapkan sebelum deployment." },
  ],
  labs: [
    { title: "UI test starter", description: "Struktur Playwright untuk smoke test dan laporan pengujian.", tool: "Playwright · TypeScript", example: "test('user can sign in', async ({ page }) => {\n  await page.goto('/login');\n  await expect(page).toHaveURL(/login/);\n});", url: "https://github.com/andre" },
    { title: "API testing collection", description: "Pemeriksaan status, struktur data, dan validasi respons.", tool: "Postman · REST API", example: "pm.test('status is OK', () => {\n  pm.response.to.have.status(200);\n});", url: "https://github.com/andre" },
  ],
  certifications: [
    { title: "Advanced Playwright Techniques: Optimizing Speed, Stability, and Cloud Testing", issuer: "LinkedIn Learning", year: "2026", url: "" },
    { title: "Get Started with Databricks for Machine Learning", issuer: "LinkedIn Learning", year: "2026", url: "" },
    { title: "Certified Business Analysis Professional (CBAP) Cert Prep", issuer: "LinkedIn Learning", year: "2026", url: "" },
    { title: "Test-Driven Development in Spring Boot with JUnit and Mockito", issuer: "LinkedIn Learning", year: "2026", url: "" },
    { title: "Software Testing Foundations: Continuous Testing and DevOps", issuer: "LinkedIn Learning", year: "2026", url: "" },
    { title: "Mobile Testing with Appium", issuer: "LinkedIn Learning", year: "2026", url: "" },
    { title: "Programming Foundations: Software Testing/QA", issuer: "LinkedIn Learning", year: "2026", url: "" },
    { title: "Software Testing Foundations: Bug Writing and Management", issuer: "LinkedIn Learning", year: "2026", url: "" },
    { title: "Practical GitHub Actions", issuer: "LinkedIn Learning", year: "2026", url: "" },
    { title: "Cisco Self-Paced Cybersecurity · PCAP: Programming Essentials in Python", issuer: "Cisco", year: "2022", url: "" },
    { title: "English Proficiency Score (223) · TOEFL Score Report (430)", issuer: "British Council · ETSR", year: "2023", url: "" },
  ],
  posts: [
    { title: "Mulai test planning dari risiko pengguna", category: "Test strategy", readTime: "6 menit", description: "Memilih area uji berdasarkan dampak, bukan jumlah test case.", isPublished: true },
    { title: "Kapan sebuah test layak diotomasi?", category: "Automation", readTime: "5 menit", description: "Pertanyaan sebelum menambahkan skrip ke suite regression.", isPublished: true },
    { title: "Bug report yang mempercepat perbaikan", category: "Kolaborasi", readTime: "4 menit", description: "Bukti dan konteks yang membuat temuan lebih berguna.", isPublished: true },
  ],
  navigation: [
    { key: "home", target: "home", visible: true }, { key: "about", target: "about", visible: true },
    { key: "skillsNav", target: "skills", visible: true }, { key: "casesNav", target: "work", visible: true },
    { key: "labNav", target: "lab", visible: true }, { key: "credentialsNav", target: "credentials", visible: true },
    { key: "blogNav", target: "notes", visible: true }, { key: "contactNav", target: "contact", visible: true },
  ],
  contact: { heading: "Mari bikin produk lebih bisa diandalkan.", message: "Saya terbuka berdiskusi tentang QA, otomasi, atau peluang kerja sama.", email: "bagusandrenathanael@gmail.com", phone: "+62895359517463", socialLinks: [] },
  siteSettings: { siteTitle: "Andre Nathanael — Software Quality Assurance Engineer Specialist", logo: "", favicon: "/favicon.ico", seoTitle: "Andre Nathanael — Software Quality Assurance Engineer Specialist", seoDescription: "Quality assurance engineer focused on software testing, automation, and product quality.", themeColor: "#294c8a" },
};

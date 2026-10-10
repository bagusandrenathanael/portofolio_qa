export type PortfolioContent = {
  profile: {
    name: string;
    role: string;
    headline: string;
    summary: string;
    email: string;
    linkedin: string;
    github: string;
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
  skills: { title: string; category: string; description: string; items: string[] }[];
  projects: {
    title: string;
    category: string;
    tools: string[];
    description: string;
    context: string;
    strategy: string;
    result: string;
  }[];
  labs: { title: string; description: string; tool: string; example: string; url: string }[];
  certifications: { title: string; issuer: string; year: string; url: string }[];
  posts: { title: string; category: string; readTime: string; description: string }[];
  contact: { heading: string; message: string };
};

export const defaultPortfolioContent: PortfolioContent = {
  profile: {
    name: "Andre Boy Pratama",
    role: "QA Engineer · Product Quality",
    headline: "QA Engineer yang berfokus pada kualitas produk dan otomasi pengujian.",
    summary: "Saya membantu tim merilis produk digital yang stabil lewat pengujian terarah, laporan bug yang jelas, dan kolaborasi yang terbuka.",
    email: "andre@example.com",
    linkedin: "https://linkedin.com/in/andre",
    github: "https://github.com/andre",
    experienceYears: 3,
    projectsSupported: 20,
    testCasesCreated: 500,
  },
  about: {
    title: "Kualitas terasa saat semua berjalan lancar.",
    paragraphs: [
      "Saya senang memahami bagaimana orang menggunakan produk, menemukan risiko sebelum menjadi masalah, lalu bekerja bersama tim untuk memperbaikinya.",
      "Bagi saya, QA membantu tim mengambil keputusan rilis dengan lebih yakin dan memberi pengalaman konsisten kepada pengguna.",
    ],
    principles: [
      { title: "Kolaboratif", description: "Berbagi konteks lebih awal dengan developer, PM, dan designer." },
      { title: "Berpikir kritis", description: "Menguji asumsi, alur utama, dan kondisi tepi yang berisiko." },
      { title: "Berorientasi solusi", description: "Menyampaikan temuan dengan bukti dan langkah reproduksi jelas." },
    ],
    experience: [
      { period: "2023 — Sekarang", role: "QA Engineer", company: "Produk digital · Web & Mobile", description: "Menguji fitur dan membantu meningkatkan otomasi regression." },
      { period: "2022 — 2023", role: "QA Engineer", company: "Produk fintech", description: "Pengujian aplikasi, API testing, dan dukungan siklus rilis." },
      { period: "2020 — 2022", role: "QA / Software Tester", company: "Produk web", description: "Membuat test case, regression test, dan dokumentasi defect." },
    ],
  },
  skills: [
    { title: "Testing", category: "testing", description: "Menguji dari sudut pandang pengguna dan risiko bisnis.", items: ["Manual & exploratory", "Regression & smoke test", "UAT dan cross-browser"] },
    { title: "Automation", category: "automation", description: "Menjaga alur penting di setiap perubahan.", items: ["Playwright", "Cypress & Selenium", "JavaScript / TypeScript"] },
    { title: "API & Data", category: "api", description: "Validasi layanan, kontrak API, dan integritas data.", items: ["Postman & REST API", "SQL dasar", "Validasi respons dan skema"] },
    { title: "Proses QA", category: "process", description: "Membuat aktivitas QA transparan dan mudah diikuti.", items: ["Test planning & design", "Defect triage & bug report", "Risk-based testing"] },
  ],
  projects: [
    { title: "Redogg Food Ordering Platform", category: "Web & Mobile · Playwright", tools: ["Manual testing", "Playwright", "Regression"], description: "Pengujian pemesanan makanan untuk aplikasi client, outlet, dan backoffice.", context: "Platform memiliki aplikasi client, outlet, dan backoffice. Saya memetakan risiko pada pencarian menu, checkout, voucher, pembayaran, dan status pesanan.", strategy: "Exploratory testing membantu menemukan kasus batas, lalu automation menjaga jalur utama dari client hingga outlet.", result: "Test case dan bug report mendokumentasikan cakupan alur agar regresi dapat ditinjau bersama." },
    { title: "Gadai Operasional System", category: "Web · Test Case & Bug Report", tools: ["Test case", "Exploratory", "Jira"], description: "Pengujian fitur operasional, alur pengajuan, dan laporan untuk pengguna internal.", context: "Alur operasional perlu konsisten dari pengajuan sampai pelaporan.", strategy: "Pengujian eksploratori dan validasi alur berdasarkan peran pengguna.", result: "Temuan didokumentasikan dengan langkah reproduksi dan bukti yang dapat ditindaklanjuti." },
    { title: "Fintech Application", category: "Mobile · API Testing", tools: ["API testing", "UAT", "Mobile"], description: "Pengujian onboarding, pembayaran, dan notifikasi pada aplikasi fintech.", context: "Proses onboarding dan transaksi melibatkan beberapa respons layanan.", strategy: "Memvalidasi alur pengguna dan respons API pada kondisi berhasil maupun gagal.", result: "Cakupan UAT dan API membantu tim meninjau kesiapan rilis." },
  ],
  labs: [
    { title: "UI test starter", description: "Struktur Playwright untuk smoke test dan laporan pengujian.", tool: "Playwright · TypeScript", example: "test('user can sign in', async ({ page }) => {\n  await page.goto('/login');\n  await expect(page).toHaveURL(/login/);\n});", url: "https://github.com/andre" },
    { title: "API testing collection", description: "Pemeriksaan status, struktur data, dan validasi respons.", tool: "Postman · REST API", example: "pm.test('status is OK', () => {\n  pm.response.to.have.status(200);\n});", url: "https://github.com/andre" },
  ],
  certifications: [
    { title: "Tambahkan nama sertifikasi", issuer: "Penerbit sertifikasi", year: "Tahun", url: "" },
    { title: "Tambahkan pelatihan QA", issuer: "Topik pelatihan", year: "Tahun", url: "" },
  ],
  posts: [
    { title: "Mulai test planning dari risiko pengguna", category: "Test strategy", readTime: "6 menit", description: "Memilih area uji berdasarkan dampak, bukan jumlah test case." },
    { title: "Kapan sebuah test layak diotomasi?", category: "Automation", readTime: "5 menit", description: "Pertanyaan sebelum menambahkan skrip ke suite regression." },
    { title: "Bug report yang mempercepat perbaikan", category: "Kolaborasi", readTime: "4 menit", description: "Bukti dan konteks yang membuat temuan lebih berguna." },
  ],
  contact: { heading: "Mari bikin produk lebih bisa diandalkan.", message: "Saya terbuka berdiskusi tentang QA, otomasi, atau peluang kerja sama." },
};

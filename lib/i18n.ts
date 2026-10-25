export const languages = [
  { code: "en", label: "English", short: "EN", html: "en" },
  { code: "id", label: "Bahasa Indonesia", short: "ID", html: "id" },
  { code: "ko", label: "한국어", short: "한국어", html: "ko" },
  { code: "ja", label: "日本語", short: "日本語", html: "ja" },
  { code: "zh", label: "简体中文", short: "中文", html: "zh-CN" },
] as const;
export type Language = (typeof languages)[number]["code"];
export function isLanguage(value: string | undefined): value is Language {
  return languages.some((language) => language.code === value);
}

const copy: Record<Exclude<Language, "id">, Record<string, string>> = {
  en: {
    home: "Home", about: "About", skillsNav: "Skills", casesNav: "Case Studies", labNav: "QA Lab", credentialsNav: "Certifications", blogNav: "Blog", contactNav: "Contact", contactMe: "Contact me", downloadCv: "Download CV", openNavigation: "Open navigation",
    seeCases: "View case studies", getInTouch: "Contact me", openForWork: "Open to QA opportunities", years: "Years of QA experience", projectsCount: "Projects supported", casesCount: "Test cases created", productQuality: "Building quality with product teams.", toolsHeading: "TOOLS I USE", aboutHeading: "MY APPROACH", collaborate: "Let's collaborate", journey: "MY JOURNEY", experience: "Experience", requestCv: "Request my CV", skillsEyebrow: "WHAT I DO", skillsTitle: "Skills", skillsSpan: "& tools", skillsDescription: "Methods and tools for focused testing.", workEyebrow: "QA EXPERIENCE", workTitle: "Selected", workSpan: "case studies", workDescription: "Testing processes and how I help teams improve product quality.", readCase: "Read case study", context: "Context & goals", strategy: "Testing strategy", outcome: "Results & learnings", labEyebrow: "LEARNING BY BUILDING", labTitle: "Automation lab", labSpan: "& demos", labDescription: "Practical examples of clear, maintainable tests.", viewCode: "View code", experiments: "QA experiments worth trying.", linkRepo: "Link a repository to share sample tests and instructions.", visitGithub: "Visit GitHub", learning: "CONTINUOUS LEARNING", certifications: "Certifications", certificationSpan: "& learning", notesEyebrow: "NOTES FROM QA", notesTitle: "Ideas I share", notesSpan: "", contactEyebrow: "HAVE A PRODUCT TO TEST?", emailMe: "Email me", openLink: "Open", connect: "Let's build more reliable products.", openDiscuss: "I'm open to conversations about QA, automation, and collaboration.", collaborationText: "For collaboration, consulting, or career discussions, contact me by email or professional network.", backTop: "Back to top", manage: "Manage content", footer: "Designed with a focus on product quality.", qualityFirst: "Quality first", betterProducts: "Better products for real people", everyStep: "Quality in every step", planTestImprove: "Plan · Test · Improve",
    headline: "A QA Engineer focused on product quality and test automation.", summary: "I help teams release stable digital products through focused testing, clear bug reports, and open collaboration.", aboutTitle: "Quality is felt when everything works smoothly.", about1: "I enjoy understanding how people use products, finding risks before they become problems, and working with teams to fix them.", about2: "QA helps teams make confident release decisions and deliver a consistent experience to users.", principle1: "Collaborative", principle1d: "Share context early with developers, product managers, and designers.", principle2: "Critical thinking", principle2d: "Challenge assumptions and test core flows and edge cases.", principle3: "Solution oriented", principle3d: "Report findings with evidence and clear reproduction steps.",
    ctaHeading: "Let's make products more reliable.", ctaMessage: "I'm happy to discuss QA, automation, or opportunities to work together.",
  },
  ko: {
    home: "홈", about: "소개", skillsNav: "기술", casesNav: "사례 연구", labNav: "QA 실험실", credentialsNav: "자격증", blogNav: "블로그", contactNav: "연락처", contactMe: "문의하기", downloadCv: "이력서 다운로드", openNavigation: "내비게이션 열기",
    seeCases: "사례 연구 보기", getInTouch: "문의하기", openForWork: "QA 업무 기회를 찾고 있습니다", years: "QA 경력 연수", projectsCount: "참여 프로젝트", casesCount: "작성한 테스트 케이스", productQuality: "제품 팀과 함께 품질을 만들어 갑니다.", toolsHeading: "사용 도구", aboutHeading: "저의 접근 방식", collaborate: "함께 협업해요", journey: "경력 여정", experience: "경력", requestCv: "이력서 요청", skillsEyebrow: "전문 분야", skillsTitle: "기술", skillsSpan: "및 도구", skillsDescription: "집중적인 테스트를 위한 방법과 도구.", workEyebrow: "QA 경험", workTitle: "주요", workSpan: "사례 연구", workDescription: "테스트 과정과 제품 품질 향상을 위한 팀 협업 방식.", readCase: "사례 보기", context: "배경 및 목표", strategy: "테스트 전략", outcome: "결과 및 배운 점", labEyebrow: "만들며 배우기", labTitle: "자동화 실험실", labSpan: "및 데모", labDescription: "명확하고 유지하기 쉬운 테스트 예제.", viewCode: "코드 보기", experiments: "시도해 볼 만한 QA 실험.", linkRepo: "테스트 예제와 실행 방법을 공유할 저장소를 연결하세요.", visitGithub: "GitHub 방문", learning: "지속적인 학습", certifications: "자격증", certificationSpan: "및 학습", notesEyebrow: "QA 노트", notesTitle: "공유하는 아이디어", notesSpan: "", contactEyebrow: "테스트할 제품이 있으신가요?", emailMe: "이메일 보내기", openLink: "열기", connect: "더 신뢰할 수 있는 제품을 함께 만들어요.", openDiscuss: "QA, 자동화, 협업 기회에 대해 이야기하고 싶습니다.", collaborationText: "협업, 컨설팅 또는 커리어 상담은 이메일이나 전문 네트워크로 연락해 주세요.", backTop: "맨 위로", manage: "콘텐츠 관리", footer: "제품 품질에 집중해 만들었습니다.", qualityFirst: "품질 우선", betterProducts: "사람을 위한 더 나은 제품", everyStep: "모든 단계에서 품질을", planTestImprove: "계획 · 테스트 · 개선",
    headline: "제품 품질과 테스트 자동화에 집중하는 QA 엔지니어입니다.", summary: "집중적인 테스트와 명확한 버그 보고, 열린 협업으로 안정적인 디지털 제품 출시를 돕습니다.", aboutTitle: "모든 것이 원활하게 작동할 때 품질이 느껴집니다.", about1: "사람들이 제품을 사용하는 방식을 이해하고 문제가 되기 전에 위험을 찾아 팀과 함께 해결하는 일을 좋아합니다.", about2: "QA는 팀이 더 확신을 갖고 출시를 결정하고 사용자에게 일관된 경험을 제공하도록 돕습니다.", principle1: "협업", principle1d: "개발자, 제품 관리자, 디자이너와 초기에 맥락을 공유합니다.", principle2: "비판적 사고", principle2d: "가정을 점검하고 핵심 흐름과 예외 상황을 테스트합니다.", principle3: "해결 중심", principle3d: "증거와 명확한 재현 단계로 문제를 전달합니다.",
    ctaHeading: "제품을 더 신뢰할 수 있게 만들어요.", ctaMessage: "QA, 자동화 또는 협업 기회에 대해 이야기 나누고 싶습니다.",
  },
  ja: {
    home: "ホーム", about: "プロフィール", skillsNav: "スキル", casesNav: "事例", labNav: "QAラボ", credentialsNav: "資格", blogNav: "ブログ", contactNav: "お問い合わせ", contactMe: "お問い合わせ", downloadCv: "履歴書をダウンロード", openNavigation: "ナビゲーションを開く",
    seeCases: "事例を見る", getInTouch: "お問い合わせ", openForWork: "QAの仕事を募集中", years: "QA経験年数", projectsCount: "参加プロジェクト", casesCount: "作成したテストケース", productQuality: "プロダクトチームと品質を築きます。", toolsHeading: "使用ツール", aboutHeading: "私のアプローチ", collaborate: "一緒に取り組みましょう", journey: "これまでの経験", experience: "職務経験", requestCv: "履歴書を依頼", skillsEyebrow: "得意分野", skillsTitle: "スキル", skillsSpan: "とツール", skillsDescription: "的を絞ったテストのための手法とツール。", workEyebrow: "QAの経験", workTitle: "主な", workSpan: "事例", workDescription: "テストの進め方と、チームの製品品質向上への取り組み。", readCase: "事例を読む", context: "背景と目標", strategy: "テスト戦略", outcome: "成果と学び", labEyebrow: "作りながら学ぶ", labTitle: "自動化ラボ", labSpan: "とデモ", labDescription: "分かりやすく保守しやすいテストの例。", viewCode: "コードを見る", experiments: "試してみたいQAの実験。", linkRepo: "テスト例と実行方法を共有するリポジトリを設定してください。", visitGithub: "GitHubを見る", learning: "継続的な学び", certifications: "資格", certificationSpan: "と学習", notesEyebrow: "QAのメモ", notesTitle: "共有するアイデア", notesSpan: "", contactEyebrow: "テストしたい製品はありますか？", emailMe: "メールを送る", openLink: "開く", connect: "より信頼できる製品を一緒に作りましょう。", openDiscuss: "QA、自動化、協業の機会についてお話しできます。", collaborationText: "協業、コンサルティング、キャリア相談はメールまたは専門ネットワークからご連絡ください。", backTop: "トップへ戻る", manage: "コンテンツ管理", footer: "製品品質を重視して制作しました。", qualityFirst: "品質を第一に", betterProducts: "人々のためのより良い製品", everyStep: "すべての段階に品質を", planTestImprove: "計画 · テスト · 改善",
    headline: "製品品質とテスト自動化に取り組むQAエンジニアです。", summary: "的を絞ったテスト、明確なバグ報告、オープンな連携を通じて、安定したデジタル製品のリリースを支援します。", aboutTitle: "すべてがスムーズに動くとき、品質が実感できます。", about1: "人々の製品の使い方を理解し、問題になる前にリスクを見つけ、チームと一緒に解決することが好きです。", about2: "QAはチームが自信を持ってリリースを判断し、ユーザーに一貫した体験を届ける手助けをします。", principle1: "協調性", principle1d: "開発者、PM、デザイナーと早い段階で情報を共有します。", principle2: "批判的思考", principle2d: "前提を問い直し、主要なフローや例外ケースをテストします。", principle3: "解決志向", principle3d: "根拠と明確な再現手順を添えて報告します。",
    ctaHeading: "製品をより信頼できるものに。", ctaMessage: "QA、自動化、協業の機会について気軽にご相談ください。",
  },
  zh: {
    home: "首页", about: "关于我", skillsNav: "技能", casesNav: "案例研究", labNav: "QA 实验室", credentialsNav: "认证", blogNav: "博客", contactNav: "联系", contactMe: "联系我", downloadCv: "下载简历", openNavigation: "打开导航",
    seeCases: "查看案例", getInTouch: "联系我", openForWork: "欢迎 QA 工作机会", years: "QA 工作年限", projectsCount: "参与项目", casesCount: "编写的测试用例", productQuality: "与产品团队共同打造高质量产品。", toolsHeading: "常用工具", aboutHeading: "我的工作方式", collaborate: "期待合作", journey: "职业经历", experience: "工作经验", requestCv: "索取简历", skillsEyebrow: "专业领域", skillsTitle: "技能", skillsSpan: "与工具", skillsDescription: "用于有针对性测试的方法和工具。", workEyebrow: "QA 项目经验", workTitle: "精选", workSpan: "案例", workDescription: "测试流程，以及我如何帮助团队提升产品质量。", readCase: "阅读案例", context: "背景与目标", strategy: "测试策略", outcome: "成果与收获", labEyebrow: "边做边学", labTitle: "自动化实验室", labSpan: "与演示", labDescription: "清晰且易于维护的测试示例。", viewCode: "查看代码", experiments: "值得尝试的 QA 实验。", linkRepo: "添加代码库以分享测试示例和运行说明。", visitGithub: "访问 GitHub", learning: "持续学习", certifications: "认证", certificationSpan: "与学习", notesEyebrow: "QA 随笔", notesTitle: "分享的想法", notesSpan: "", contactEyebrow: "有产品需要测试吗？", emailMe: "发送邮件", openLink: "打开", connect: "一起打造更可靠的产品。", openDiscuss: "欢迎交流 QA、自动化和合作机会。", collaborationText: "如需合作、咨询或职业交流，请通过电子邮件或职业社交平台联系我。", backTop: "返回顶部", manage: "管理内容", footer: "以产品质量为核心设计。", qualityFirst: "质量优先", betterProducts: "为真实用户打造更好的产品", everyStep: "每一步都注重质量", planTestImprove: "规划 · 测试 · 改进",
    headline: "专注于产品质量与测试自动化的 QA 工程师。", summary: "通过有针对性的测试、清晰的缺陷报告和开放协作，帮助团队发布稳定的数字产品。", aboutTitle: "一切顺畅运行时，质量便能被感受到。", about1: "我喜欢了解用户如何使用产品，在风险变成问题前发现它们，并与团队一起解决。", about2: "QA 帮助团队更有信心地决定发布，并为用户提供一致的体验。", principle1: "协作", principle1d: "尽早与开发人员、产品经理和设计师共享背景信息。", principle2: "批判性思维", principle2d: "验证假设，并测试核心流程和边界情况。", principle3: "以解决方案为导向", principle3d: "提供证据和清晰的复现步骤来说明问题。",
    ctaHeading: "让产品变得更可靠。", ctaMessage: "欢迎交流 QA、自动化或合作机会。",
  },
};

Object.assign(copy.ko, { skillsSpan: "및 도구", workSpan: "사례 연구", labSpan: "및 데모", certificationSpan: "및 학습", notesSpan: "", experiments: "시도해 볼 만한 QA 실험.", years: "QA 경력 연수", projectsCount: "참여 프로젝트", casesCount: "작성한 테스트 케이스", productQuality: "제품 팀과 함께 품질을 만들어 갑니다.", linkRepo: "테스트 예제와 실행 방법을 공유할 저장소를 연결하세요.", experimentsTail: "", connect: "더 신뢰할 수 있는 제품을 함께 만들어요.", aboutTitle: "모든 것이 원활하게 작동할 때 품질이 느껴집니다.", about1: "사람들이 제품을 사용하는 방식을 이해하고 문제가 되기 전에 위험을 찾아 팀과 함께 해결하는 일을 좋아합니다.", about2: "QA는 팀이 더 확신을 갖고 출시를 결정하고 사용자에게 일관된 경험을 제공하도록 돕습니다.", principle1: "협업", principle1d: "개발자, 제품 관리자, 디자이너와 초기에 맥락을 공유합니다.", principle2: "비판적 사고", principle2d: "가정을 점검하고 핵심 흐름과 예외 상황을 테스트합니다.", principle3: "해결 중심", principle3d: "증거와 명확한 재현 단계로 문제를 전달합니다.", ctaHeading: "제품을 더 신뢰할 수 있게 만들어요.", ctaMessage: "QA, 자동화 또는 협업 기회에 대해 이야기 나누고 싶습니다." });
Object.assign(copy.ja, { skillsTitle: "スキル", skillsSpan: "とツール", workTitle: "主な", workSpan: "事例", labSpan: "とデモ", certificationSpan: "と学習", notesSpan: "", experiments: "試してみたいQAの実験。", years: "QA経験年数", projectsCount: "参加プロジェクト", casesCount: "作成したテストケース", productQuality: "プロダクトチームと品質を築きます。", linkRepo: "テスト例と実行方法を共有するリポジトリを設定してください。", connect: "より信頼できる製品を一緒に作りましょう。", aboutTitle: "すべてがスムーズに動くとき、品質が実感できます。", about1: "人々の製品の使い方を理解し、問題になる前にリスクを見つけ、チームと一緒に解決することが好きです。", about2: "QAはチームが自信を持ってリリースを判断し、ユーザーに一貫した体験を届ける手助けをします。", principle1: "協調性", principle1d: "開発者、PM、デザイナーと早い段階で情報を共有します。", principle2: "批判的思考", principle2d: "前提を問い直し、主要なフローや例外ケースをテストします。", principle3: "解決志向", principle3d: "根拠と明確な再現手順を添えて報告します。", ctaHeading: "製品をより信頼できるものに。", ctaMessage: "QA、自動化、協業の機会について気軽にご相談ください。" });
Object.assign(copy.zh, { skillsTitle: "技能", skillsSpan: "与工具", workTitle: "精选", workSpan: "案例", labSpan: "与演示", certificationSpan: "与学习", notesSpan: "", experiments: "值得尝试的 QA 实验。", years: "QA 工作年限", projectsCount: "参与项目", casesCount: "编写的测试用例", productQuality: "与产品团队共同打造高质量产品。", linkRepo: "添加代码库以分享测试示例和运行说明。", connect: "一起打造更可靠的产品。", aboutTitle: "一切顺畅运行时，质量便能被感受到。", about1: "我喜欢了解用户如何使用产品，在风险变成问题前发现它们，并与团队一起解决。", about2: "QA 帮助团队更有信心地决定发布，并为用户提供一致的体验。", principle1: "协作", principle1d: "尽早与开发人员、产品经理和设计师共享背景信息。", principle2: "批判性思维", principle2d: "验证假设，并测试核心流程和边界情况。", principle3: "以解决方案为导向", principle3d: "提供证据和清晰的复现步骤来说明问题。", ctaHeading: "让产品变得更可靠。", ctaMessage: "欢迎交流 QA、自动化或合作机会。" });
Object.assign(copy.en, { mobileNavigation: "Main navigation", tabHome: "Home", tabAbout: "About", tabSkills: "Skills", tabWork: "Projects", tabContact: "Contact" });
Object.assign(copy.ko, { mobileNavigation: "주요 내비게이션", tabHome: "홈", tabAbout: "소개", tabSkills: "기술", tabWork: "프로젝트", tabContact: "연락처" });
Object.assign(copy.ja, { mobileNavigation: "メインナビゲーション", tabHome: "ホーム", tabAbout: "紹介", tabSkills: "スキル", tabWork: "事例", tabContact: "連絡先" });
Object.assign(copy.zh, { mobileNavigation: "主导航", tabHome: "首页", tabAbout: "关于", tabSkills: "技能", tabWork: "项目", tabContact: "联系" });

export function t(language: Language, key: string): string {
  if (language === "id") return idLabels[key] ?? key;
  return copy[language][key] ?? idLabels[key] ?? key;
}

const idLabels: Record<string, string> = {
  home: "Beranda", about: "Tentang", skillsNav: "Keahlian", casesNav: "Studi Kasus", labNav: "Lab Otomasi", credentialsNav: "Sertifikasi", blogNav: "Blog", contactNav: "Kontak", contactMe: "Hubungi Saya", openNavigation: "Buka navigasi", seeCases: "Lihat Studi Kasus", getInTouch: "Hubungi Saya", openForWork: "Terbuka untuk peluang QA", years: "Tahun pengalaman di bidang QA", projectsCount: "Proyek yang didukung", casesCount: "Test case dirancang", productQuality: "Membangun kualitas bersama tim produk.", toolsHeading: "TOOLS YANG SAYA GUNAKAN", aboutHeading: "KENALI PENDEKATAN SAYA", collaborate: "Mari berkolaborasi", journey: "PERJALANAN", experience: "Pengalaman singkat", requestCv: "Minta CV", skillsEyebrow: "AREA YANG SAYA KUASAI", skillsTitle: "Keahlian", skillsSpan: "& tools", skillsDescription: "Perangkat dan metode untuk menguji lebih terarah.", workEyebrow: "CONTOH PENGALAMAN QA", workTitle: "Studi", workSpan: "kasus", workDescription: "Proses pengujian dan cara saya membantu tim menjaga kualitas.", readCase: "Baca studi kasus", context: "Konteks & tujuan", strategy: "Strategi pengujian", outcome: "Hasil & pembelajaran", labEyebrow: "BELAJAR SAMBIL MEMBANGUN", labTitle: "Lab otomasi", labSpan: "& demo", labDescription: "Contoh kecil cara menyusun pengujian yang mudah dipahami.", viewCode: "Lihat kode", experiments: "Eksperimen QA yang bisa dicoba.", linkRepo: "Tautkan repositori untuk menunjukkan contoh uji dan cara menjalankannya.", visitGithub: "Kunjungi GitHub", learning: "BELAJAR BERKELANJUTAN", certifications: "Sertifikasi", certificationSpan: "& pembelajaran", notesEyebrow: "CATATAN DARI PROSES QA", notesTitle: "Ide yang saya bagikan", notesSpan: "", contactEyebrow: "PUNYA PRODUK UNTUK DIUJI?", emailMe: "Kirim email", openLink: "Buka", connect: "Mari bikin produk lebih bisa diandalkan.", collaborationText: "Untuk kolaborasi, konsultasi, atau diskusi karier, hubungi saya lewat email atau media profesional.", backTop: "Kembali ke atas", manage: "Kelola konten", footer: "Dirancang dengan fokus pada kualitas produk.", qualityFirst: "Quality first", betterProducts: "Better products for real people", everyStep: "Quality in every step", planTestImprove: "Plan · Test · Improve", headline: "QA Engineer yang berfokus pada kualitas produk dan otomasi pengujian.", summary: "Saya membantu tim merilis produk digital yang stabil lewat pengujian terarah, laporan bug yang jelas, dan kolaborasi yang terbuka.", aboutTitle: "Kualitas terasa saat semua berjalan lancar.", about1: "Saya senang memahami bagaimana orang menggunakan produk, menemukan risiko sebelum menjadi masalah, lalu bekerja bersama tim untuk memperbaikinya.", about2: "Bagi saya, QA membantu tim mengambil keputusan rilis dengan lebih yakin dan memberi pengalaman konsisten kepada pengguna.", principle1: "Kolaboratif", principle1d: "Berbagi konteks lebih awal dengan developer, PM, dan designer.", principle2: "Berpikir kritis", principle2d: "Menguji asumsi, alur utama, dan kondisi tepi yang berisiko.", principle3: "Berorientasi solusi", principle3d: "Menyampaikan temuan dengan bukti dan langkah reproduksi jelas.", ctaHeading: "Mari bikin produk lebih bisa diandalkan.", ctaMessage: "Saya terbuka berdiskusi tentang QA, otomasi, atau peluang kerja sama.", mobileNavigation: "Navigasi utama", tabHome: "Beranda", tabAbout: "Tentang", tabSkills: "Keahlian", tabWork: "Proyek", tabContact: "Kontak",
};

Object.assign(idLabels, {
  downloadCv: "Unduh CV",
  projectFilters: "Filter kategori proyek", filterAll: "Semua", filterWeb: "Web", filterMobile: "Mobile", filterApi: "API", filterAutomation: "Otomasi", filterPerformance: "Performa", filterDataQuality: "Kualitas Data", qualityChecked: "Kualitas teruji", noProjectsInCategory: "Belum ada studi kasus pada kategori ini.",
  qaRecordsEyebrow: "PRAKTIK QA DALAM KONTEKS", testShowcaseTitle: "Test Case Showcase", testShowcaseDescription: "Cakupan pengujian terpilih untuk menunjukkan cara kerja dan perhatian pada detail.", bugShowcaseTitle: "Bug Report Showcase", bugShowcaseDescription: "Temuan ditulis dengan konteks yang jelas agar mudah dipahami dan ditindaklanjuti.", apiShowcaseTitle: "API Testing", apiShowcaseDescription: "Validasi endpoint, kontrak respons, dan hasil pemeriksaan yang dipilih untuk publik.", automationShowcaseTitle: "Automation Testing", automationShowcaseDescription: "Framework dan suite otomasi yang dipilih untuk ditampilkan.", performanceShowcaseTitle: "Performance Testing", performanceShowcaseDescription: "Ringkasan metrik dari laporan performa yang dipublikasikan.", noPublicItems: "Belum ada item publikasi.", noPublicItemsDescription: "Pilih item QA di CMS admin dan aktifkan opsi tampil di website publik untuk menampilkannya di sini.", testIdLabel: "ID", testScenarioLabel: "Skenario pengujian", projectLabel: "Proyek", priorityLabel: "Prioritas", statusLabel: "Status", bugReportLabel: "BUG REPORT", bugEnvironmentPrivate: "Detail lingkungan tersedia sesuai permintaan.", endpointNotShared: "Endpoint tidak dipublikasikan", apiValidationPrivate: "Detail validasi tersedia sesuai permintaan.", automationFramework: "Automation framework", automationSuite: "QA automation suite", viewRepository: "Lihat repositori", performanceScenario: "Skenario performa", virtualUsersLabel: "Virtual users", responseTimeLabel: "Response time", throughputLabel: "Throughput", errorRateLabel: "Error rate",
});

Object.assign(copy.en, {
  projectFilters: "Filter projects", filterAll: "All", filterWeb: "Web", filterMobile: "Mobile", filterApi: "API", filterAutomation: "Automation", filterPerformance: "Performance", filterDataQuality: "Data Quality", qualityChecked: "Quality checked", noProjectsInCategory: "No case studies in this category yet.",
  qaRecordsEyebrow: "QA PRACTICE IN CONTEXT", testShowcaseTitle: "Test Case Showcase", testShowcaseDescription: "Selected test coverage that shows how I work and where I focus on detail.", bugShowcaseTitle: "Bug Report Showcase", bugShowcaseDescription: "Findings are captured with clear context so teams can understand and act on them.", apiShowcaseTitle: "API Testing", apiShowcaseDescription: "Selected endpoint, response-contract, and validation examples.", automationShowcaseTitle: "Automation Testing", automationShowcaseDescription: "Automation frameworks and suites selected for public viewing.", performanceShowcaseTitle: "Performance Testing", performanceShowcaseDescription: "Metrics from performance reports selected for publication.", noPublicItems: "No public items yet.", noPublicItemsDescription: "Choose QA records in the admin CMS and enable the public showcase option to display them here.", testIdLabel: "ID", testScenarioLabel: "Test scenario", projectLabel: "Project", priorityLabel: "Priority", statusLabel: "Status", bugReportLabel: "BUG REPORT", bugEnvironmentPrivate: "Environment details available on request.", endpointNotShared: "Endpoint not shared", apiValidationPrivate: "Validation details available on request.", automationFramework: "Automation framework", automationSuite: "QA automation suite", viewRepository: "View repository", performanceScenario: "Performance scenario", virtualUsersLabel: "Virtual users", responseTimeLabel: "Response time", throughputLabel: "Throughput", errorRateLabel: "Error rate",
});

Object.assign(copy.ko, {
  projectFilters: "프로젝트 필터", filterAll: "전체", filterWeb: "웹", filterMobile: "모바일", filterApi: "API", filterAutomation: "자동화", filterPerformance: "성능", filterDataQuality: "데이터 품질", qualityChecked: "품질 확인", noProjectsInCategory: "이 카테고리에는 아직 사례가 없습니다.",
  qaRecordsEyebrow: "실제 QA 사례", testShowcaseTitle: "테스트 케이스", testShowcaseDescription: "업무 방식과 세부 사항에 대한 집중을 보여주는 테스트 범위입니다.", bugShowcaseTitle: "버그 보고서", bugShowcaseDescription: "팀이 쉽게 이해하고 조치할 수 있도록 명확한 맥락으로 기록합니다.", apiShowcaseTitle: "API 테스트", apiShowcaseDescription: "공개하도록 선택한 엔드포인트와 응답 검증 사례입니다.", automationShowcaseTitle: "테스트 자동화", automationShowcaseDescription: "공개하도록 선택한 자동화 프레임워크와 테스트 모음입니다.", performanceShowcaseTitle: "성능 테스트", performanceShowcaseDescription: "공개된 성능 보고서의 주요 지표입니다.", noPublicItems: "공개된 항목이 없습니다.", noPublicItemsDescription: "관리자 CMS에서 QA 항목을 선택하고 공개 표시 옵션을 켜면 여기에 표시됩니다.", testIdLabel: "ID", testScenarioLabel: "테스트 시나리오", projectLabel: "프로젝트", priorityLabel: "우선순위", statusLabel: "상태", bugReportLabel: "버그 보고서", bugEnvironmentPrivate: "환경 세부 정보는 요청 시 제공됩니다.", endpointNotShared: "엔드포인트 비공개", apiValidationPrivate: "검증 세부 정보는 요청 시 제공됩니다.", automationFramework: "자동화 프레임워크", automationSuite: "QA 자동화 테스트", viewRepository: "저장소 보기", performanceScenario: "성능 시나리오", virtualUsersLabel: "가상 사용자", responseTimeLabel: "응답 시간", throughputLabel: "처리량", errorRateLabel: "오류율",
});

Object.assign(copy.ja, {
  projectFilters: "プロジェクトを絞り込む", filterAll: "すべて", filterWeb: "Web", filterMobile: "モバイル", filterApi: "API", filterAutomation: "自動化", filterPerformance: "パフォーマンス", filterDataQuality: "データ品質", qualityChecked: "品質を確認済み", noProjectsInCategory: "このカテゴリの事例はまだありません。",
  qaRecordsEyebrow: "QAの実践例", testShowcaseTitle: "テストケース", testShowcaseDescription: "仕事の進め方と細部への配慮を示すテスト範囲です。", bugShowcaseTitle: "バグレポート", bugShowcaseDescription: "チームが理解して対応しやすいよう、明確な背景とともに記録します。", apiShowcaseTitle: "APIテスト", apiShowcaseDescription: "公開対象として選択されたエンドポイントとレスポンス検証の例です。", automationShowcaseTitle: "テスト自動化", automationShowcaseDescription: "公開対象として選択された自動化フレームワークとテストスイートです。", performanceShowcaseTitle: "パフォーマンステスト", performanceShowcaseDescription: "公開されたパフォーマンスレポートの指標です。", noPublicItems: "公開項目はまだありません。", noPublicItemsDescription: "管理CMSでQA項目を選び、公開表示を有効にするとここに表示されます。", testIdLabel: "ID", testScenarioLabel: "テストシナリオ", projectLabel: "プロジェクト", priorityLabel: "優先度", statusLabel: "ステータス", bugReportLabel: "バグレポート", bugEnvironmentPrivate: "環境の詳細はお問い合わせください。", endpointNotShared: "エンドポイントは非公開です", apiValidationPrivate: "検証の詳細はお問い合わせください。", automationFramework: "自動化フレームワーク", automationSuite: "QA自動化スイート", viewRepository: "リポジトリを見る", performanceScenario: "パフォーマンスシナリオ", virtualUsersLabel: "仮想ユーザー", responseTimeLabel: "応答時間", throughputLabel: "スループット", errorRateLabel: "エラー率",
});

Object.assign(copy.zh, {
  projectFilters: "筛选项目", filterAll: "全部", filterWeb: "网页", filterMobile: "移动端", filterApi: "API", filterAutomation: "自动化", filterPerformance: "性能", filterDataQuality: "数据质量", qualityChecked: "质量已验证", noProjectsInCategory: "此类别暂无案例。",
  qaRecordsEyebrow: "QA实践案例", testShowcaseTitle: "测试用例展示", testShowcaseDescription: "精选测试范围，展示工作方式和对细节的关注。", bugShowcaseTitle: "缺陷报告展示", bugShowcaseDescription: "以清晰背景记录问题，方便团队理解和跟进。", apiShowcaseTitle: "API测试", apiShowcaseDescription: "精选公开的端点、响应契约和验证示例。", automationShowcaseTitle: "自动化测试", automationShowcaseDescription: "精选公开展示的自动化框架和测试套件。", performanceShowcaseTitle: "性能测试", performanceShowcaseDescription: "来自已发布性能报告的指标摘要。", noPublicItems: "暂无公开内容。", noPublicItemsDescription: "在管理后台选择QA记录并开启公开展示后，内容会显示在这里。", testIdLabel: "编号", testScenarioLabel: "测试场景", projectLabel: "项目", priorityLabel: "优先级", statusLabel: "状态", bugReportLabel: "缺陷报告", bugEnvironmentPrivate: "环境详情可按需提供。", endpointNotShared: "端点未公开", apiValidationPrivate: "验证详情可按需提供。", automationFramework: "自动化框架", automationSuite: "QA自动化套件", viewRepository: "查看代码库", performanceScenario: "性能场景", virtualUsersLabel: "虚拟用户", responseTimeLabel: "响应时间", throughputLabel: "吞吐量", errorRateLabel: "错误率",
});

Object.assign(idLabels, { contactFormHeading: "Kirim pesan", contactFormDescription: "Form ini akan membuka aplikasi email untuk mengirim pesan.", yourName: "Nama", yourEmail: "Email", yourMessage: "Pesan", sendMessage: "Kirim pesan" });
Object.assign(copy.en, { contactFormHeading: "Send a message", contactFormDescription: "This form opens your email app to send the message.", yourName: "Name", yourEmail: "Email", yourMessage: "Message", sendMessage: "Send message" });
Object.assign(copy.ko, { contactFormHeading: "메시지 보내기", contactFormDescription: "이 양식은 이메일 앱을 열어 메시지를 보냅니다.", yourName: "이름", yourEmail: "이메일", yourMessage: "메시지", sendMessage: "메시지 보내기" });
Object.assign(copy.ja, { contactFormHeading: "メッセージを送る", contactFormDescription: "このフォームからメールアプリを開いて送信します。", yourName: "お名前", yourEmail: "メールアドレス", yourMessage: "メッセージ", sendMessage: "送信する" });
Object.assign(copy.zh, { contactFormHeading: "发送消息", contactFormDescription: "此表单会打开邮件应用来发送消息。", yourName: "姓名", yourEmail: "邮箱", yourMessage: "消息", sendMessage: "发送消息" });

Object.assign(idLabels, {
  workDescription: "Lihat bagaimana saya menerjemahkan kebutuhan menjadi cakupan tes yang terarah, temuan yang dapat ditindaklanjuti, dan dasar keputusan rilis.",
  labDescription: "Eksplorasi pola QA yang saya gunakan untuk menguji alur pengguna, kontrak API, dan kualitas data secara terukur.",
  labDemoLabel: "POLA PENGUJIAN",
  labCtaEyebrow: "PRAKTIK QA",
  viewCredential: "Lihat kredensial",
  experiments: "Kualitas produk dimulai dari pengujian yang terarah.",
  linkRepo: "Jelajahi GitHub saya untuk melihat proyek dan eksperimen QA lainnya.",
});
Object.assign(copy.en, {
  workDescription: "See how I turn requirements into focused test coverage, actionable findings, and evidence for release decisions.",
  labDescription: "Explore the QA patterns I use to validate user journeys, API contracts, and data quality with clear evidence.",
  labDemoLabel: "TEST PATTERN",
  labCtaEyebrow: "QA PRACTICE",
  viewCredential: "View credential",
  experiments: "Product quality starts with focused testing.",
  linkRepo: "Explore my GitHub for more QA projects and experiments.",
});
Object.assign(copy.ko, {
  workDescription: "요구사항을 집중도 높은 테스트 범위와 실행 가능한 발견 사항, 릴리스 판단 근거로 발전시키는 과정을 확인하세요.",
  labDescription: "사용자 흐름, API 계약, 데이터 품질을 명확한 근거와 함께 검증하는 QA 패턴을 확인하세요.",
  labDemoLabel: "테스트 패턴",
  labCtaEyebrow: "QA 실무",
  viewCredential: "자격 증명 보기",
  experiments: "제품 품질은 집중도 높은 테스트에서 시작됩니다.",
  linkRepo: "GitHub에서 더 많은 QA 프로젝트와 실험을 확인해 보세요.",
});
Object.assign(copy.ja, {
  workDescription: "要件を的確なテスト範囲、対応可能な発見事項、リリース判断の根拠へつなげる方法をご覧ください。",
  labDescription: "ユーザー操作、API契約、データ品質を明確な根拠とともに検証するQAパターンをご覧ください。",
  labDemoLabel: "テストパターン",
  labCtaEyebrow: "QAの実践",
  viewCredential: "資格情報を見る",
  experiments: "製品の品質は、的を絞ったテストから始まります。",
  linkRepo: "GitHubでQAプロジェクトや実験をご覧ください。",
});
Object.assign(copy.zh, {
  workDescription: "了解我如何将需求转化为有针对性的测试覆盖、可执行的问题发现和发布决策依据。",
  labDescription: "了解我如何通过清晰的依据验证用户流程、API 契约和数据质量。",
  labDemoLabel: "测试模式",
  labCtaEyebrow: "QA 实践",
  viewCredential: "查看凭证",
  experiments: "产品质量始于有针对性的测试。",
  linkRepo: "欢迎在 GitHub 查看更多 QA 项目和实验。",
});

Object.assign(idLabels, { idCardHintTitle: "↕ Tarik ke bawah · Geser ke samping", idCardHintBody: "Lepaskan talinya untuk melihat ID card memantul" });
Object.assign(copy.en, { idCardHintTitle: "↕ Pull down · Swipe sideways", idCardHintBody: "Release the strap to see the ID card bounce" });
Object.assign(copy.ko, { idCardHintTitle: "↕ 아래로 당기기 · 좌우로 밀기", idCardHintBody: "끈을 놓으면 ID 카드가 튕깁니다" });
Object.assign(copy.ja, { idCardHintTitle: "↕ 下に引く · 横にスワイプ", idCardHintBody: "ストラップを離すとIDカードが跳ねます" });
Object.assign(copy.zh, { idCardHintTitle: "↕ 向下拖动 · 左右滑动", idCardHintBody: "松开挂绳，查看证件卡弹跳效果" });

export function translateText(language: Language, text: string): string {
  if (language === "id") return text;
  const key = Object.keys(idLabels).find((label) => idLabels[label] === text);
  return (key && copy[language][key]) || text;
}

export function translateContent<T>(language: Language, value: T): T {
  if (typeof value === "string") return translateText(language, value) as T;
  if (Array.isArray(value)) return value.map((item) => translateContent(language, item)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, key === "navigation" ? item : translateContent(language, item)])) as T;
  }
  return value;
}

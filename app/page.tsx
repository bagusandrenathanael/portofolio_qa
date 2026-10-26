import { getPortfolioContent } from "../lib/portfolio-store";
import PortfolioHeader from "./portfolio-header";
import ProfileIdCard from "./profile-id-card";
import { cookies } from "next/headers";
import { isLanguage, t, translateContent } from "../lib/i18n";
import MobileTabBar from "./mobile-tab-bar";
import ToolsMarquee from "./tools-marquee";
import ProjectShowcase from "./project-showcase";
import PublicQaShowcase from "./public-qa-showcase";
import { getPublicQaShowcases } from "../lib/public-showcase";
import { getPublicContentRecords } from "../lib/public-content-records";
import LabShowcase from "./lab-showcase";
import BlogShowcase from "./blog-showcase";
import CredentialsShowcase from "./credentials-showcase";
import SkillsShowcase from "./skills-showcase";
import { Bug, ClipboardCheck, FolderOpen, Users, MapPin } from "lucide-react";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const safeLink = (value: string) => /^(https:\/\/|mailto:)/i.test(value) ? value : "#home";
const safeCvLink = (value: string) => value.startsWith("/") && !value.startsWith("//") || /^https:\/\//i.test(value) || /^data:application\/pdf;base64,/i.test(value) ? value : "#home";
const safeBrandImage = (value: string) => /^(https:\/\/|\/(?!\/)|data:image\/(?:png|jpeg|webp);base64,)/i.test(value) ? value : "";
const safeEvidenceImage = (value: string) => /^(https:\/\/|\/(?!\/)|data:image\/(?:png|jpeg|webp);base64,)/i.test(value) ? value : "";
const value = (data: Record<string, unknown>, key: string) => typeof data[key] === "string" ? data[key] as string : "";
const list = (data: Record<string, unknown>, key: string) => Array.isArray(data[key]) ? (data[key] as unknown[]).filter((item): item is string => typeof item === "string") : value(data, key).split(/[\n,]/).map((item) => item.trim()).filter(Boolean);
const order = (data: Record<string, unknown>) => typeof data.sortOrder === "number" ? data.sortOrder : Number(data.sortOrder) || 0;
const preview = (text: string, length = 220) => text.length > length ? `${text.slice(0, length).trimEnd()}…` : text;
export default async function Home() {
  const cookieValue = (await cookies()).get("site-language")?.value;
  const language = isLanguage(cookieValue) ? cookieValue : "en";
  const [savedContent, qaRecords, records] = await Promise.all([getPortfolioContent(), getPublicQaShowcases(), getPublicContentRecords()]);
  const content = translateContent(language, savedContent);
  const tr = (key: string) => t(language, key);
  const p = content.profile;
  const savedProfilePhoto = safeBrandImage(p.photoUrl);
  const profilePhoto = savedProfilePhoto && !/^\/(?:andre-avatar(?:-manga)?\.(?:png|jpe?g)|andre-favicon\.svg)$/i.test(savedProfilePhoto)
    ? savedProfilePhoto
    : "/andre-id-photo.png";
  const skillTitles = new Map(records.filter((record) => record.module === "skill").map((record) => [record.id, record.title]));
  const structuredProjects = records.filter((record) => record.module === "project").map(({ title, data, skillIds }) => ({ title: language === "en" ? value(data, "titleEn") || title : title, category: (language === "en" ? value(data, "categoryEn") : "") || value(data, "category") || "QA Project", isPublished: true, tools: list(data, "tags"), description: preview((language === "en" ? value(data, "summaryEn") || value(data, "descriptionEn") : "") || value(data, "summary") || value(data, "description")), context: (language === "en" ? value(data, "contextEn") : "") || value(data, "context") || value(data, "description"), strategy: (language === "en" ? value(data, "strategyEn") : "") || value(data, "strategy"), result: (language === "en" ? value(data, "resultEn") : "") || value(data, "result"), slug: value(data, "slug"), thumbnail: value(data, "thumbnail"), gallery: list(data, "gallery"), demoUrl: value(data, "demoUrl"), repoUrl: value(data, "repoUrl"), featured: data.featured === true, sortOrder: order(data), skillNames: skillIds.flatMap((id) => skillTitles.has(id) ? [skillTitles.get(id)!] : []) }));
  const fallbackProjects = content.projects.filter((project) => project.isPublished).map((project) => ({ ...project, title: language === "en" ? project.titleEn || project.title : project.title, category: (language === "en" ? project.categoryEn : "") || project.category, description: preview((language === "en" ? project.summaryEn || project.descriptionEn : "") || project.summary || project.description), context: (language === "en" ? project.contextEn : "") || project.context, strategy: (language === "en" ? project.strategyEn : "") || project.strategy, result: (language === "en" ? project.resultEn : "") || project.result }));
  const publicProjects = (structuredProjects.length ? structuredProjects : fallbackProjects).sort((a, b) => Number((b as { featured?: unknown }).featured === true) - Number((a as { featured?: unknown }).featured === true) || Number((a as { sortOrder?: unknown }).sortOrder ?? 0) - Number((b as { sortOrder?: unknown }).sortOrder ?? 0));
  const structuredPosts = records.filter((record) => record.module === "blog").map(({ title, data }) => ({ title: language === "en" ? value(data, "titleEn") || title : title, category: (language === "en" ? value(data, "categoryEn") : "") || value(data, "category") || "QA Notes", readTime: (language === "en" ? value(data, "readTimeEn") : "") || value(data, "readTime") || "5 min read", description: preview((language === "en" ? value(data, "excerptEn") || value(data, "bodyEn") : "") || value(data, "excerpt") || value(data, "body")), body: (language === "en" ? value(data, "bodyEn") || value(data, "body") : value(data, "body")), image: safeEvidenceImage(value(data, "image")), date: value(data, "date"), isPublished: true, sortOrder: order(data) }));
  const publicPosts = (structuredPosts.length ? structuredPosts : content.posts.filter((post) => post.isPublished).map((post) => ({ ...post, body: "", image: "" }))).sort((a, b) => Number((a as { sortOrder?: unknown }).sortOrder ?? 0) - Number((b as { sortOrder?: unknown }).sortOrder ?? 0));
  const projectTitles = new Map(records.filter((record) => record.module === "project").map((record) => [record.id, record.title]));
  const experiences = records.filter((record) => record.module === "experience").map(({ title, data, skillIds, projectIds }) => {
    const company = value(data, "company");
    const companyLogo = /pusat gadai/i.test(company) ? "/pusat-gadai-logo.png" : /nexsoft/i.test(company) ? "/nexsoft-logo.png" : /ideaco/i.test(company) ? "/ideaco-logo.png" : /metrodata/i.test(company) ? "/metrodata-logo.png" : "";
    const storedLogo = value(data, "logo");
    const logo = companyLogo && (!storedLogo || ["/ideaco-logo.svg", "/metrodata-logo.svg"].includes(storedLogo)) ? companyLogo : storedLogo || companyLogo;
    return { period: `${value(data, "startDate")}${data.current === true ? " — Present" : value(data, "endDate") ? ` — ${value(data, "endDate")}` : ""}`, role: value(data, "role") || title, company, current: data.current === true, description: value(data, "description"), logo, relatedSkills: skillIds.flatMap((id) => skillTitles.has(id) ? [skillTitles.get(id)!] : []), relatedProjects: projectIds.flatMap((id) => projectTitles.has(id) ? [projectTitles.get(id)!] : []), sortOrder: order(data) };
  }).sort((a, b) => a.sortOrder - b.sortOrder);
  const fallbackExperiences = content.about.experience.map((item) => ({ ...item, logo: /pusat gadai/i.test(item.company) ? "/pusat-gadai-logo.png" : /nexsoft/i.test(item.company) ? "/nexsoft-logo.png" : /ideaco/i.test(item.company) ? "/ideaco-logo.png" : /metrodata/i.test(item.company) ? "/metrodata-logo.png" : "", current: /present/i.test(item.period), relatedSkills: [] as string[], relatedProjects: [] as string[], sortOrder: 0 }));
  const educationRecords = records.filter((record) => record.module === "education").map(({ title, data }) => ({ period: `${value(data, "startYear")}${value(data, "endYear") ? ` — ${value(data, "endYear")}` : ""}`, degree: value(data, "degree") || title, institution: value(data, "institution"), description: value(data, "description"), logo: value(data, "logo"), sortOrder: order(data) })).sort((a, b) => a.sortOrder - b.sortOrder);
  const skillGroups = new Map<string, string[]>();
  records.filter((record) => record.module === "skill").sort((a, b) => order(a.data) - order(b.data)).forEach(({ title, data }) => { const category = value(data, "category") || "Skills"; skillGroups.set(category, [...(skillGroups.get(category) ?? []), title]); });
  const structuredSkills = [...skillGroups.entries()].map(([title, items]) => ({ title, category: title.toLowerCase(), description: items.join(" · "), items }));
  const sourceSkills = structuredSkills.length ? structuredSkills : content.skills;
  const publicSkills = sourceSkills.some((group) => group.items.some((item) => item.toLowerCase() === "jenkins"))
    ? sourceSkills
    : sourceSkills.some((group) => /automation/i.test(`${group.title} ${group.category}`))
      ? sourceSkills.map((group) => /automation/i.test(`${group.title} ${group.category}`) ? { ...group, items: [...group.items, "Jenkins"] } : group)
      : [...sourceSkills, { title: "Automation", category: "automation", description: "CI/CD automation", items: ["Jenkins"] }];
  const structuredCertifications = records.filter((record) => record.module === "certification").sort((a, b) => order(a.data) - order(b.data)).map(({ title, data }) => ({ title, issuer: value(data, "issuer"), year: value(data, "issuedAt"), url: value(data, "credentialUrl"), logo: value(data, "image") || value(data, "logo") }));
  const publicCertifications = structuredCertifications.length ? structuredCertifications : content.certifications.filter((item) => item.title.trim() && !/^tambahkan\b/i.test(item.title));
  const testimonials = records.filter((record) => record.module === "testimonial").sort((a, b) => order(a.data) - order(b.data));
  const evidenceRecords = records.filter((record) => record.module === "evidence").map(({ id, title, data, projectIds }) => ({ id, title, before: value(data, "before"), after: value(data, "after"), notes: value(data, "notes"), projects: projectIds.flatMap((projectId) => projectTitles.has(projectId) ? [projectTitles.get(projectId)!] : []), sortOrder: order(data) })).sort((a, b) => a.sortOrder - b.sortOrder);
  return (
    <>
      <PortfolioHeader language={language} email={p.email} linkedin={p.linkedin} whatsapp={p.whatsapp} cvUrl={p.cvUrl ? safeCvLink(p.cvUrl) : undefined} navigation={content.navigation} brandName={content.siteSettings.siteTitle.split(/[—|]/)[0].trim() || "Andre"} brandLogo={profilePhoto} photoUrl={profilePhoto} />
      <main>
        <section className="hero hero-city" id="home">
          <div className="hero-copy"><p className="eyebrow">● {p.role}</p>{p.location && <p className="hero-location"><MapPin size={15} strokeWidth={2}/><span>{p.location}</span></p>}<h1>{p.name.split(" ").slice(0, -1).join(" ")}<br /><span>{p.name.split(" ").slice(-1)}</span></h1><p className="lead">{p.headline}</p><p className="muted">{p.summary}</p><div className="actions"><a className="button" href="#work">{tr('seeCases')} →</a></div><div className="social"><a href={safeLink(p.github)} aria-label="GitHub">GH</a><a href={safeLink(p.linkedin)} aria-label="LinkedIn">in</a><a href={`mailto:${p.email}`} aria-label="Email">✉</a></div></div>
          <ProfileIdCard name={p.name} role={p.role} location={p.location} openToWork={p.openToWork} openLabel={tr('openForWork')} photoUrl={profilePhoto} hintTitle={tr('idCardHintTitle')} hintBody={tr('idCardHintBody')} />
          <div className="metrics"><div><i className="metric-icon"><Users size={23}/></i><b>{p.experienceYears}<span>+</span></b><small>{tr('years')}</small></div><div><i className="metric-icon"><FolderOpen size={23}/></i><b>{p.projectsSupported}<span>+</span></b><small>{tr('projectsCount')}</small></div><div><i className="metric-icon"><ClipboardCheck size={23}/></i><b>{p.testCasesCreated}<span>+</span></b><small>{tr('casesCount')}</small></div><div><i className="metric-icon"><Bug size={23}/></i><b>360°</b><small>{tr('everyStep')}</small></div></div>
          <ToolsMarquee language={language} />
        </section>

        <section className="section wrap" id="about"><div className="section-title"><div><p className="eyebrow">{tr('journey')}</p><h2>{tr('experience')}</h2><p className="muted">{language === "id" ? "Perjalanan profesional di bidang kualitas perangkat lunak, data, dan dukungan sistem." : "My professional journey in software quality, data, and system support across industries."}</p></div><small className="index">03 — CAREER</small></div><div className="experience"><div className="timeline">{(experiences.length ? experiences : fallbackExperiences).map((item) => <article key={`${item.period}-${item.role}`}><div className="experience-logo-wrap">{item.logo ? <img className="experience-logo" src={safeBrandImage(item.logo)} alt={`${item.company} logo`} loading="lazy"/> : <span>{item.company?.slice(0, 2).toUpperCase() || "QA"}</span>}</div><div className="experience-copy"><div className="experience-meta"><time>{item.period}</time>{item.current && <span className="current-badge">{language === "id" ? "Saat ini" : "Current"}</span>}</div><b>{item.role}<small>{item.company}</small></b><p>{item.description}</p>{item.relatedSkills.length > 0 && <div className="experience-tags">{item.relatedSkills.map((skill) => <span key={skill}>{skill}</span>)}</div>}{item.relatedProjects.length > 0 && <small className="experience-relations">Projects: {item.relatedProjects.join(" · ")}</small>}</div></article>)}</div><aside className="cv"><div className="summary-card-title"><span><Users size={17}/></span><b>{language === "id" ? "Ringkasan Profesional" : "Professional Summary"}</b></div><div className="summary-stats"><div><b>{p.experienceYears}+</b><small>{language === "id" ? "Tahun pengalaman" : "Years of experience"}</small></div><div><b>{new Set(experiences.map((item) => item.company)).size || 4}</b><small>{language === "id" ? "Perusahaan" : "Companies"}</small></div></div><p>{language === "id" ? "Berfokus pada kualitas perangkat lunak, otomasi pengujian, API, dan validasi data di sistem finansial serta enterprise." : "Focused on software quality, test automation, API testing, and data validation across financial and enterprise systems."}</p><div className="cv-download"><b>Curriculum Vitae</b><small>{tr('requestCv')}</small>{p.cvUrl && <a className="text-link" href={safeCvLink(p.cvUrl)} target={p.cvUrl.startsWith("https://") || p.cvUrl.startsWith("data:application/pdf") ? "_blank" : undefined} rel={p.cvUrl.startsWith("https://") || p.cvUrl.startsWith("data:application/pdf") ? "noreferrer" : undefined}>{language === "id" ? "Lihat CV" : "View CV"} →</a>}</div></aside></div>{(educationRecords.length ? educationRecords : content.education).length > 0 && <div className="education-list"><p className="eyebrow">EDUCATION</p>{(educationRecords.length ? educationRecords : content.education).map((item) => <article key={`${item.period}-${item.institution}`}>{"logo" in item && safeBrandImage(item.logo) && <img className="education-logo" src={safeBrandImage(item.logo)} alt={`${item.institution} logo`} loading="lazy"/>}<div className="education-copy"><div className="education-meta"><time>{item.period}</time><span>{language === "id" ? "Pendidikan" : "Education"}</span></div><b>{item.degree}</b><small className="education-institution">{item.institution}</small>{item.description && <p className="education-description">{item.description}</p>}</div></article>)}</div>}</section>

        <section className="section wrap" id="skills"><div className="section-title"><div><p className="eyebrow">{tr('skillsEyebrow')}</p><h2>{tr('skillsTitle')} <span>{tr('skillsSpan')}</span></h2><p className="muted">{tr('skillsDescription')}</p></div><small className="index">01 — CAPABILITIES</small></div><SkillsShowcase groups={publicSkills}/></section>

        <section className="section wrap" id="work"><div className="section-title"><div><p className="eyebrow">{tr('workEyebrow')}</p><h2>{tr('workTitle')} <span>{tr('workSpan')}</span></h2><p className="muted">{tr('workDescription')}</p></div><small className="index">02 — SELECTED WORK</small></div><ProjectShowcase projects={publicProjects} language={language} /></section>

        <PublicQaShowcase language={language} records={qaRecords} />

        {evidenceRecords.length > 0 && <section className="section wrap" id="evidence"><div className="section-title"><div><p className="eyebrow">QUALITY EVIDENCE</p><h2>Testing evidence</h2><p className="muted">Selected before and after screenshots from published QA work.</p></div><small className="index">08 — EVIDENCE</small></div><div className="public-evidence-grid">{evidenceRecords.map((item) => <article className="public-evidence-card" key={item.id}><h3>{item.title}</h3>{item.projects.length > 0 && <small>{item.projects.join(" · ")}</small>}<div>{safeEvidenceImage(item.before) && <figure><img src={safeEvidenceImage(item.before)} alt={`${item.title} — before`} loading="lazy"/><figcaption>Before</figcaption></figure>}{safeEvidenceImage(item.after) && <figure><img src={safeEvidenceImage(item.after)} alt={`${item.title} — after`} loading="lazy"/><figcaption>After</figcaption></figure>}</div>{item.notes && <p>{item.notes}</p>}</article>)}</div></section>}

        {testimonials.length > 0 && <section className="section wrap" id="testimonials"><div className="section-title"><div><p className="eyebrow">RECOMMENDATIONS</p><h2>What colleagues say</h2></div></div><div className="testimonial-grid">{testimonials.map(({ id, title, data }) => <article className="testimonial-card" key={id}>{typeof data.photo === "string" && data.photo && <img src={data.photo} alt="" /> }<blockquote>{value(data, "quote")}</blockquote><b>{value(data, "name") || title}</b><small>{value(data, "position")}</small>{value(data, "sourceUrl").startsWith("https://") && <a href={value(data, "sourceUrl")} target="_blank" rel="noreferrer">View recommendation ↗</a>}</article>)}</div></section>}

        <section className="section wrap" id="lab"><div className="section-title"><div><p className="eyebrow">{tr('labEyebrow')}</p><h2>{tr('labTitle')} <span>{tr('labSpan')}</span></h2><p className="muted">{tr('labDescription')}</p></div><small className="index">08 — QA LAB</small></div><LabShowcase labs={content.labs} language={language} github={p.github}/></section>

        <section className="section wrap" id="credentials"><div className="section-title"><div><p className="eyebrow">{tr('learning')}</p><h2>{tr('certifications')} <span>{tr('certificationSpan')}</span></h2></div><small className="index">09 — CREDENTIALS</small></div><CredentialsShowcase items={publicCertifications} language={language}/></section>

        <section className="section wrap" id="notes"><div className="section-title"><div><p className="eyebrow">{tr('notesEyebrow')}</p><h2>{tr('notesTitle')} <span>{tr('notesSpan')}</span></h2></div><small className="index">10 — NOTES</small></div><BlogShowcase posts={publicPosts} language={language} author={p.name} avatar={profilePhoto}/></section>

      </main>
      <footer className="footer"><a className="brand" href="#home"><img className="brand-avatar" src={profilePhoto} alt="" aria-hidden="true" />{content.siteSettings.siteTitle.split(/[—|]/)[0].trim() || "Andre"}<span>.</span></a><p>{tr('footer')}</p><small>© {new Date().getFullYear()} {p.name}</small><a href="#home">{tr('backTop')} ↑</a><a href="/admin">{tr('manage')}</a></footer>
      <MobileTabBar language={language} navigation={content.navigation} />
    </>
  );
}

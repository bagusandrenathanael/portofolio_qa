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
import SkillFilterLink from "./skill-filter-link";
import { Bug, ClipboardCheck, FolderOpen, Users, FlaskConical, Bot, Network, Database, Wrench, Workflow, Sparkles } from "lucide-react";

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
const categoryIcon = (category: string) => {
  const key = category.toLowerCase();
  if (/automat|framework/.test(key)) return Bot;
  if (/api|performance/.test(key)) return Network;
  if (/data|develop|database/.test(key)) return Database;
  if (/tool|platform/.test(key)) return Wrench;
  if (/method|professional/.test(key)) return Workflow;
  return FlaskConical;
};
const toolMarks: Record<string, { text: string; color: string }> = {
  playwright: { text: "Pw", color: "#2ead6e" }, selenium: { text: "Se", color: "#43b02a" }, katalon: { text: "K", color: "#1769ff" }, cucumber: { text: "C", color: "#23a566" }, postman: { text: "P", color: "#ff6c37" }, jmeter: { text: "JM", color: "#d22128" }, jenkins: { text: "J", color: "#d24939" }, github: { text: "GH", color: "#202938" }, "vs code": { text: "</>", color: "#007acc" }, vscode: { text: "</>", color: "#007acc" }, sql: { text: "DB", color: "#294c8a" }, jira: { text: "J", color: "#2684ff" }, clickup: { text: "Cu", color: "#7656e8" }, redmine: { text: "R", color: "#b32024" }, "jam.dev": { text: "JD", color: "#536dfe" }, appium: { text: "A", color: "#6944bc" }, typescript: { text: "TS", color: "#3178c6" }, javascript: { text: "JS", color: "#a98900" }, java: { text: "♨", color: "#007396" }, bruno: { text: "B", color: "#f16a37" }, k6: { text: "k6", color: "#7d64ff" }, swagger: { text: "Sw", color: "#62a626" }, "oracle exadata": { text: "O", color: "#c74634" }, groovy: { text: "G", color: "#4298b8" }, "apache kafka": { text: "K", color: "#242424" }, "apache spark": { text: "S", color: "#e25a1c" }, "microsoft office": { text: "M", color: "#d83b01" }, "google workspace": { text: "G", color: "#4285f4" }, "black box testing": { text: "BB", color: "#345" }, "api testing": { text: "API", color: "#e87936" }, "manual testing": { text: "MT", color: "#4383bb" }, "regression testing": { text: "RT", color: "#c85b6d" }, "performance testing": { text: "PT", color: "#7b62c7" }, "test planning": { text: "TP", color: "#3462a8" }, "test case creation": { text: "TC", color: "#3462a8" }, "data validation": { text: "DV", color: "#24836c" }, "etl validation": { text: "ETL", color: "#24836c" }, "shell scripting": { text: "$", color: "#454d5b" }, "chrome devtools": { text: "C", color: "#4285f4" }, "ibm datastage": { text: "IBM", color: "#1261fe" }, "git hub actions": { text: "GH", color: "#202938" }, "git": { text: "Git", color: "#f05032" }, "agile/scrum": { text: "Ag", color: "#178e78" }, sdlc: { text: "SD", color: "#6954aa" }, stlc: { text: "ST", color: "#6954aa" }, communication: { text: "Co", color: "#4176c5" }, "problem solving": { text: "PS", color: "#4176c5" }, "attention to detail": { text: "QA", color: "#294c8a" }, teamwork: { text: "TW", color: "#4176c5" },
};
const getToolMark = (label: string) => {
  const key = label.toLowerCase().replace(/\s+/g, " ").trim();
  return toolMarks[key] ?? { text: label.slice(0, 2).toUpperCase(), color: "#456da8" };
};

export default async function Home() {
  const cookieValue = (await cookies()).get("site-language")?.value;
  const language = isLanguage(cookieValue) ? cookieValue : "en";
  const [savedContent, qaRecords, records] = await Promise.all([getPortfolioContent(), getPublicQaShowcases(), getPublicContentRecords()]);
  const content = translateContent(language, savedContent);
  const tr = (key: string) => t(language, key);
  const p = content.profile;
  const skillTitles = new Map(records.filter((record) => record.module === "skill").map((record) => [record.id, record.title]));
  const structuredProjects = records.filter((record) => record.module === "project").map(({ title, data, skillIds }) => ({ title, category: value(data, "category") || "QA Project", isPublished: true, tools: list(data, "tags"), description: preview(value(data, "summary") || value(data, "description")), context: value(data, "context") || value(data, "description"), strategy: value(data, "strategy"), result: value(data, "result"), slug: value(data, "slug"), thumbnail: value(data, "thumbnail"), gallery: list(data, "gallery"), demoUrl: value(data, "demoUrl"), repoUrl: value(data, "repoUrl"), featured: data.featured === true, sortOrder: order(data), skillNames: skillIds.flatMap((id) => skillTitles.has(id) ? [skillTitles.get(id)!] : []) }));
  const publicProjects = (structuredProjects.length ? structuredProjects : content.projects.filter((project) => project.isPublished)).sort((a, b) => Number((b as { featured?: unknown }).featured === true) - Number((a as { featured?: unknown }).featured === true) || Number((a as { sortOrder?: unknown }).sortOrder ?? 0) - Number((b as { sortOrder?: unknown }).sortOrder ?? 0));
  const structuredPosts = records.filter((record) => record.module === "blog").map(({ title, data }) => ({ title, category: value(data, "category") || "QA Notes", readTime: value(data, "readTime") || "5 min read", description: preview(value(data, "excerpt") || value(data, "body")), isPublished: true, sortOrder: order(data) }));
  const publicPosts = (structuredPosts.length ? structuredPosts : content.posts.filter((post) => post.isPublished)).sort((a, b) => Number((a as { sortOrder?: unknown }).sortOrder ?? 0) - Number((b as { sortOrder?: unknown }).sortOrder ?? 0));
  const projectTitles = new Map(records.filter((record) => record.module === "project").map((record) => [record.id, record.title]));
  const experiences = records.filter((record) => record.module === "experience").map(({ title, data, skillIds, projectIds }) => ({ period: `${value(data, "startDate")}${data.current === true ? " — Present" : value(data, "endDate") ? ` — ${value(data, "endDate")}` : ""}`, role: value(data, "role") || title, company: value(data, "company"), description: value(data, "description"), relatedSkills: skillIds.flatMap((id) => skillTitles.has(id) ? [skillTitles.get(id)!] : []), relatedProjects: projectIds.flatMap((id) => projectTitles.has(id) ? [projectTitles.get(id)!] : []), sortOrder: order(data) })).sort((a, b) => a.sortOrder - b.sortOrder);
  const educationRecords = records.filter((record) => record.module === "education").map(({ title, data }) => ({ period: `${value(data, "startYear")}${value(data, "endYear") ? ` — ${value(data, "endYear")}` : ""}`, degree: value(data, "degree") || title, institution: value(data, "institution"), description: value(data, "description"), logo: value(data, "logo"), sortOrder: order(data) })).sort((a, b) => a.sortOrder - b.sortOrder);
  const skillGroups = new Map<string, string[]>();
  records.filter((record) => record.module === "skill").sort((a, b) => order(a.data) - order(b.data)).forEach(({ title, data }) => { const category = value(data, "category") || "Skills"; skillGroups.set(category, [...(skillGroups.get(category) ?? []), title]); });
  const structuredSkills = [...skillGroups.entries()].map(([title, items]) => ({ title, category: title.toLowerCase(), description: items.join(" · "), items }));
  const publicSkills = structuredSkills.length ? structuredSkills : content.skills;
  const structuredCertifications = records.filter((record) => record.module === "certification").sort((a, b) => order(a.data) - order(b.data)).map(({ title, data }) => ({ title, issuer: value(data, "issuer"), year: value(data, "issuedAt"), url: value(data, "credentialUrl") }));
  const publicCertifications = structuredCertifications.length ? structuredCertifications : content.certifications.filter((item) => item.title.trim() && !/^tambahkan\b/i.test(item.title));
  const testimonials = records.filter((record) => record.module === "testimonial").sort((a, b) => order(a.data) - order(b.data));
  const evidenceRecords = records.filter((record) => record.module === "evidence").map(({ id, title, data, projectIds }) => ({ id, title, before: value(data, "before"), after: value(data, "after"), notes: value(data, "notes"), projects: projectIds.flatMap((projectId) => projectTitles.has(projectId) ? [projectTitles.get(projectId)!] : []), sortOrder: order(data) })).sort((a, b) => a.sortOrder - b.sortOrder);
  return (
    <>
      <PortfolioHeader language={language} email={p.email} linkedin={p.linkedin} whatsapp={p.whatsapp} cvUrl={p.cvUrl ? safeCvLink(p.cvUrl) : undefined} navigation={content.navigation} brandName={content.siteSettings.siteTitle.split(/[—|]/)[0].trim() || "Andre"} brandLogo={safeBrandImage(content.siteSettings.logo) || "/andre-avatar-manga.jpg"} photoUrl={p.photoUrl || "/andre-avatar.png"} />
      <main>
        <section className="hero hero-city" id="home">
          <div className="hero-copy"><p className="eyebrow">● {p.role}{p.location ? ` · ${p.location}` : ""}</p><h1>{p.name.split(" ").slice(0, -1).join(" ")}<br /><span>{p.name.split(" ").slice(-1)}</span></h1><p className="lead">{p.headline}</p><p className="muted">{preview(p.summary, 220)}</p><div className="actions"><a className="button" href="#work">{tr('seeCases')} →</a></div><div className="social"><a href={safeLink(p.github)} aria-label="GitHub">GH</a><a href={safeLink(p.linkedin)} aria-label="LinkedIn">in</a><a href={`mailto:${p.email}`} aria-label="Email">✉</a><small>{p.openToWork ? tr('openForWork') : ""}</small></div></div>
          <ProfileIdCard name={p.name} role={p.role} photoUrl="/andre-id-photo.png" />
          <div className="metrics"><div><i className="metric-icon"><Users size={23}/></i><b>{p.experienceYears}<span>+</span></b><small>{tr('years')}</small></div><div><i className="metric-icon"><FolderOpen size={23}/></i><b>{p.projectsSupported}<span>+</span></b><small>{tr('projectsCount')}</small></div><div><i className="metric-icon"><ClipboardCheck size={23}/></i><b>{p.testCasesCreated}<span>+</span></b><small>{tr('casesCount')}</small></div><div><i className="metric-icon"><Bug size={23}/></i><b>{qaRecords.filter((record) => record.module === "bug-report").length}<span>+</span></b><small>Bug reports</small></div></div>
          <ToolsMarquee language={language} />
        </section>

        <section className="section wrap" id="about"><div className="section-heading"><p className="eyebrow">{tr('aboutHeading')}</p><h2>{content.about.title}</h2></div><div className="about-grid"><div>{content.about.paragraphs.map((paragraph) => <p className="muted" key={paragraph}>{paragraph}</p>)}</div><div className="principles">{content.about.principles.map((item, i) => <article key={item.title}><i>{["◎", "⌕", "↗"][i % 3]}</i><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></div><div className="experience"><div><p className="eyebrow">{tr('journey')}</p><h3>{tr('experience')}</h3></div><div className="timeline">{(experiences.length ? experiences : content.about.experience).map((item) => <article key={`${item.period}-${item.role}`}><time>{item.period}</time><b>{item.role}<small>{item.company}</small></b><p>{item.description}</p>{"relatedSkills" in item && Array.isArray(item.relatedSkills) && item.relatedSkills.length > 0 && <small className="experience-relations">Skills: {item.relatedSkills.join(" · ")}</small>}{"relatedProjects" in item && Array.isArray(item.relatedProjects) && item.relatedProjects.length > 0 && <small className="experience-relations">Projects: {item.relatedProjects.join(" · ")}</small>}</article>)}</div><div className="cv"><b>Curriculum Vitae</b><small>{tr('requestCv')}</small><a className="text-link" href={p.cvUrl ? safeCvLink(p.cvUrl) : "#home"} target={p.cvUrl.startsWith("https://") || p.cvUrl.startsWith("data:application/pdf") ? "_blank" : undefined} rel={p.cvUrl.startsWith("https://") || p.cvUrl.startsWith("data:application/pdf") ? "noreferrer" : undefined}>{p.cvUrl ? "View CV" : `${tr('requestCv')} →`}</a></div></div>{(educationRecords.length ? educationRecords : content.education).length > 0 && <div className="education-list"><p className="eyebrow">EDUCATION</p>{(educationRecords.length ? educationRecords : content.education).map((item) => <article key={`${item.period}-${item.institution}`}>{"logo" in item && safeBrandImage(item.logo) && <img className="education-logo" src={safeBrandImage(item.logo)} alt={`${item.institution} logo`} loading="lazy"/>}<div className="education-copy"><div className="education-meta"><time>{item.period}</time><span>Education</span></div><b>{item.degree}</b><small className="education-institution">{item.institution}</small>{item.description && <p className="education-description">{item.description}</p>}</div></article>)}</div>}</section>

        <section className="section wrap" id="skills"><div className="section-title"><div><p className="eyebrow">{tr('skillsEyebrow')}</p><h2>{tr('skillsTitle')} <span>{tr('skillsSpan')}</span></h2><p className="muted">{tr('skillsDescription')}</p></div><small className="index">01 — CAPABILITIES</small></div><div className="skill-grid">{publicSkills.map((skill) => { const CategoryIcon = categoryIcon(skill.category || skill.title); return <article className="skill" key={skill.title}><div className="skill-heading"><i className="skill-category-icon"><CategoryIcon size={19} strokeWidth={1.8}/></i><div><h3>{skill.title}</h3><small>{skill.items.length} skills &amp; tools</small></div></div><ul>{skill.items.map((item) => { const mark = getToolMark(item); return <li key={item}><span className="skill-tool-icon" style={{ "--tool-mark-color": mark.color } as React.CSSProperties} aria-hidden="true">{mark.text || <Sparkles size={13}/>}</span><SkillFilterLink skill={item}/></li>; })}</ul></article>; })}</div></section>

        <section className="section wrap" id="work"><div className="section-title"><div><p className="eyebrow">{tr('workEyebrow')}</p><h2>{tr('workTitle')} <span>{tr('workSpan')}</span></h2><p className="muted">{tr('workDescription')}</p></div><small className="index">02 — SELECTED WORK</small></div><ProjectShowcase projects={publicProjects} language={language} /></section>

        <PublicQaShowcase language={language} records={qaRecords} />

        {evidenceRecords.length > 0 && <section className="section wrap" id="evidence"><div className="section-title"><div><p className="eyebrow">QUALITY EVIDENCE</p><h2>Testing evidence</h2><p className="muted">Selected before and after screenshots from published QA work.</p></div><small className="index">08 — EVIDENCE</small></div><div className="public-evidence-grid">{evidenceRecords.map((item) => <article className="public-evidence-card" key={item.id}><h3>{item.title}</h3>{item.projects.length > 0 && <small>{item.projects.join(" · ")}</small>}<div>{safeEvidenceImage(item.before) && <figure><img src={safeEvidenceImage(item.before)} alt={`${item.title} — before`} loading="lazy"/><figcaption>Before</figcaption></figure>}{safeEvidenceImage(item.after) && <figure><img src={safeEvidenceImage(item.after)} alt={`${item.title} — after`} loading="lazy"/><figcaption>After</figcaption></figure>}</div>{item.notes && <p>{item.notes}</p>}</article>)}</div></section>}

        {testimonials.length > 0 && <section className="section wrap" id="testimonials"><div className="section-title"><div><p className="eyebrow">RECOMMENDATIONS</p><h2>What colleagues say</h2></div></div><div className="testimonial-grid">{testimonials.map(({ id, title, data }) => <article className="testimonial-card" key={id}>{typeof data.photo === "string" && data.photo && <img src={data.photo} alt="" /> }<blockquote>{value(data, "quote")}</blockquote><b>{value(data, "name") || title}</b><small>{value(data, "position")}</small>{value(data, "sourceUrl").startsWith("https://") && <a href={value(data, "sourceUrl")} target="_blank" rel="noreferrer">View recommendation ↗</a>}</article>)}</div></section>}

        <section className="section wrap" id="lab"><div className="section-title"><div><p className="eyebrow">{tr('labEyebrow')}</p><h2>{tr('labTitle')} <span>{tr('labSpan')}</span></h2><p className="muted">{tr('labDescription')}</p></div><small className="index">08 — QA LAB</small></div><div className="lab-grid">{content.labs.map((lab) => <article className="lab" key={lab.title}><i>⌘</i><h3>{lab.title}</h3><p>{lab.description}</p><pre>{lab.example}</pre><small>{lab.tool} <a href={safeLink(lab.url)}>{tr('viewCode')} ↗</a></small></article>)}<article className="lab cta"><p className="eyebrow">REPOSITORY</p><h3>{tr('experiments')}</h3><p>{tr('linkRepo')}</p><a className="button light" href={safeLink(p.github)}>{tr('visitGithub')} ↗</a></article></div></section>

        <section className="section wrap" id="credentials"><div className="section-title"><div><p className="eyebrow">{tr('learning')}</p><h2>{tr('certifications')} <span>{tr('certificationSpan')}</span></h2></div><small className="index">09 — CREDENTIALS</small></div><div className="credential-grid">{publicCertifications.map((item) => <article key={item.title}><i>QA</i><div><b>{item.title}</b><small>{item.issuer} · {item.year}</small></div>{item.url && <a href={safeLink(item.url)}>↗</a>}</article>)}</div></section>

        <section className="section wrap" id="notes"><div className="section-title"><div><p className="eyebrow">{tr('notesEyebrow')}</p><h2>{tr('notesTitle')} <span>{tr('notesSpan')}</span></h2></div><small className="index">10 — NOTES</small></div><div className="post-grid">{publicPosts.map((post, i) => <article key={post.title}><div className="post-art">{["RISK\n≠\nBUG", "MAKE\nIT\nREPEATABLE", "BUG REPORT\nTHAT HELPS"][i % 3]}</div><div><small>{post.category.toUpperCase()} · {post.readTime.toUpperCase()}</small><h3>{post.title}</h3><p>{post.description}</p></div></article>)}</div></section>

      </main>
      <footer className="footer"><a className="brand" href="#home"><img className="brand-avatar" src={safeBrandImage(content.siteSettings.logo) || "/andre-avatar.png"} alt="" aria-hidden="true" />{content.siteSettings.siteTitle.split(/[—|]/)[0].trim() || "Andre"}<span>.</span></a><p>{tr('footer')}</p><small>© {new Date().getFullYear()} {p.name}</small><a href="#home">{tr('backTop')} ↑</a><a href="/admin">{tr('manage')}</a></footer>
      <MobileTabBar language={language} navigation={content.navigation} />
    </>
  );
}

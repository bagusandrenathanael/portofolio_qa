"use client";

import { useMemo, useState } from "react";
import { Activity, Check, Clipboard, Database, GitBranch, Network, Search, Smartphone, Workflow, type LucideIcon } from "lucide-react";
import LabCodeEditor from "./lab-code-editor";

type Lab = { title: string; description: string; tool: string; example: string; url: string };
type Category = { label: string; match: RegExp; icon: LucideIcon; tone: string };

const categories: Category[] = [
  { label: "Web Automation", match: /playwright|selenium|web|pom/i, icon: Workflow, tone: "green" },
  { label: "API Testing", match: /postman|api|rest/i, icon: Network, tone: "orange" },
  { label: "Data Validation", match: /sql|etl|data/i, icon: Database, tone: "purple" },
  { label: "Performance Testing", match: /jmeter|performance|load/i, icon: Activity, tone: "violet" },
  { label: "Mobile Automation", match: /appium|mobile|android|ios/i, icon: Smartphone, tone: "green" },
  { label: "CI/CD", match: /jenkins|github actions|ci\/cd|pipeline/i, icon: GitBranch, tone: "blue" },
  { label: "Tools & Utilities", match: /.*/, icon: Clipboard, tone: "blue" },
];

function categoryFor(lab: Lab) {
  return categories.find((category) => category.match.test(`${lab.title} ${lab.tool}`)) ?? categories[categories.length - 1];
}

function tagsFor(lab: Lab) {
  return lab.tool.split(/[·,/]/).map((tag) => tag.trim()).filter(Boolean).slice(0, 4);
}

export default function LabShowcase({ labs, language, github }: { labs: Lab[]; language: string; github: string }) {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState("");
  const isId = language === "id";
  const filterLabels = useMemo(() => ["All", ...new Set(labs.map((lab) => categoryFor(lab).label))], [labs]);
  const filtered = labs.filter((lab) => {
    const matchesCategory = active === "All" || categoryFor(lab).label === active;
    const matchesQuery = `${lab.title} ${lab.description} ${lab.tool}`.toLowerCase().includes(query.trim().toLowerCase());
    return matchesCategory && matchesQuery;
  });

  async function copyExample(lab: Lab) {
    try {
      await navigator.clipboard.writeText(lab.example);
      setCopied(lab.title);
      window.setTimeout(() => setCopied((current) => current === lab.title ? "" : current), 1800);
    } catch {
      setCopied("");
    }
  }

  return <div className="lab-showcase">
    <div className="lab-toolbar">
      <div className="lab-filters" role="group" aria-label={isId ? "Filter kategori demo" : "Filter demo categories"}>
        {filterLabels.map((label) => <button key={label} type="button" className={active === label ? "active" : ""} onClick={() => setActive(label)}>{label === "All" ? (isId ? "Semua" : "All") : label}</button>)}
      </div>
      <label className="lab-search"><Search size={15}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={isId ? "Cari demo..." : "Search demos..."} /></label>
    </div>
    <div className="lab-grid">
      {filtered.map((lab) => {
        const category = categoryFor(lab);
        const Icon = category.icon;
        const isCopied = copied === lab.title;
        const hasRepo = /^https:\/\//i.test(lab.url);
        return <article className={`lab lab-demo-card tone-${category.tone}`} key={lab.title}>
          <div className="lab-card-heading"><i className="lab-category-icon" aria-hidden="true"><Icon size={19}/></i><div className="lab-card-title"><h3>{lab.title}</h3><p>{lab.description}</p></div><span className="lab-category-pill">{category.label}</span></div>
          <div className="lab-tags">{tagsFor(lab).map((tag) => <span key={tag}>{tag}</span>)}</div>
          <LabCodeEditor title={lab.title} tool={lab.tool} source={lab.example}/>
          <div className="lab-card-actions"><button type="button" onClick={() => void copyExample(lab)}><Clipboard size={14}/>{isCopied ? (isId ? "Tersalin" : "Copied") : (isId ? "Salin contoh" : "Copy example")}</button>{hasRepo ? <a href={lab.url} target="_blank" rel="noreferrer"><GitBranch size={14}/>{isId ? "Lihat GitHub" : "View on GitHub"} ↗</a> : github.startsWith("https://") ? <a href={github} target="_blank" rel="noreferrer"><GitBranch size={14}/>{isId ? "Repositori" : "Repository"} ↗</a> : <span className="lab-action-note"><Check size={14}/>{isId ? "Contoh ilustratif" : "Illustrative example"}</span>}</div>
        </article>;
      })}
      {filtered.length === 0 && <p className="lab-empty">{isId ? "Demo tidak ditemukan. Coba kata kunci lain." : "No demos found. Try another search."}</p>}
      <article className="lab cta"><div><p className="eyebrow">{isId ? "REPOSITORI" : "REPOSITORY"}</p><h3>{isId ? "Eksperimen QA yang bisa dicoba." : "QA experiments worth exploring."}</h3><p>{isId ? "Lihat contoh pengujian dan pola otomasi yang dapat dikembangkan lebih lanjut." : "Explore testing examples and automation patterns you can build on."}</p></div>{github.startsWith("https://") && <a className="button light" href={github} target="_blank" rel="noreferrer">{isId ? "Kunjungi GitHub" : "Visit GitHub"} ↗</a>}</article>
    </div>
  </div>;
}

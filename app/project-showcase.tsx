"use client";

import { useEffect, useMemo, useState } from "react";
import { type Language, t } from "../lib/i18n";
import type { PortfolioContent } from "../lib/portfolio-content";

type Project = PortfolioContent["projects"][number] & { slug?: string; thumbnail?: string; gallery?: string[]; demoUrl?: string; repoUrl?: string; featured?: boolean; skillNames?: string[] };
type Filter = "all" | "web" | "mobile" | "api" | "automation" | "performance";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "filterAll" }, { id: "web", label: "filterWeb" },
  { id: "mobile", label: "filterMobile" }, { id: "api", label: "filterApi" },
  { id: "automation", label: "filterAutomation" }, { id: "performance", label: "filterPerformance" },
];

function matches(project: Project, filter: Filter) {
  if (filter === "all") return true;
  const text = `${project.category} ${project.tools.join(" ")} ${project.title}`.toLowerCase();
  if (filter === "mobile") return /mobile|android|ios/.test(text);
  if (filter === "api") return /api|postman|swagger/.test(text);
  if (filter === "automation") return /automation|playwright|selenium|katalon|cypress/.test(text);
  if (filter === "performance") return /performance|load test|jmeter|k6/.test(text);
  return /web|website|platform/.test(text);
}
const safeProjectImage = (url?: string) => url && /^(https:\/\/|\/|data:image\/)/i.test(url) ? url : "";
const safeProjectLink = (url?: string) => url && /^(https:\/\/|mailto:)/i.test(url) ? url : "";
const matchesSkill = (project: Project, selectedSkill: string) => {
  const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const selected = normalize(selectedSkill);
  return [...(project.skillNames ?? []), ...project.tools].some((label) => {
    const candidate = normalize(label);
    return candidate === selected || (selected.length >= 4 && (candidate.includes(selected) || selected.includes(candidate)));
  });
};

export default function ProjectShowcase({ projects, language }: { projects: Project[]; language: Language }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedSkill, setSelectedSkill] = useState("");
  useEffect(() => {
    const syncSkill = () => setSelectedSkill(new URLSearchParams(window.location.hash.split("?")[1] ?? "").get("skill") ?? "");
    syncSkill();
    window.addEventListener("portfolio-skill-filter", syncSkill);
    window.addEventListener("hashchange", syncSkill);
    return () => { window.removeEventListener("portfolio-skill-filter", syncSkill); window.removeEventListener("hashchange", syncSkill); };
  }, []);
  const visibleProjects = useMemo(() => projects.filter((project) => matches(project, filter) && (!selectedSkill || matchesSkill(project, selectedSkill))), [projects, filter, selectedSkill]);

  return <>
    <div className="filters project-filters" role="group" aria-label={t(language, "projectFilters")}>
      {filters.map((item) => <button key={item.id} className={`chip${filter === item.id ? " selected" : ""}`} type="button" aria-pressed={filter === item.id} onClick={() => { setFilter(item.id); setSelectedSkill(""); }}>{t(language, item.label)}</button>)}
      {selectedSkill && <button className="chip selected" type="button" onClick={() => { setSelectedSkill(""); window.history.pushState(null, "", "#work"); }}>{selectedSkill} ×</button>}
    </div>
    {visibleProjects.length ? <div className="case-grid">
      {visibleProjects.map((project, index) => <article className="case" key={project.title}>
        <div className={`visual ${["checkout", "banking", "api"][index % 3]}`} style={safeProjectImage(project.thumbnail) ? { backgroundImage: `linear-gradient(145deg,#13284844,#13284899),url("${safeProjectImage(project.thumbnail)}")`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}><span>{project.category.toUpperCase()}</span>{project.featured && <b className="featured-project-badge">FEATURED</b>}<div className="case-art"><b>{project.title.split(" ").slice(0, 2).join(" ")}</b><small>{project.tools.slice(0, 2).join(" · ")}</small><i>✓ {t(language, "qualityChecked")}</i></div></div>
        <div className="case-body"><small>{project.category.toUpperCase()}</small><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.tools.map((tool) => <i key={tool}>{tool}</i>)}</div>{project.skillNames?.length ? <div className="tags related-skill-tags">{project.skillNames.map((skill) => <i key={skill}>{skill}</i>)}</div> : null}<div className="project-actions"><a className="text-link" href={`#case-${projects.indexOf(project)}`}>{t(language, "readCase")} →</a>{safeProjectLink(project.demoUrl) && <a className="text-link" href={safeProjectLink(project.demoUrl)} target="_blank" rel="noreferrer">Demo ↗</a>}{safeProjectLink(project.repoUrl) && <a className="text-link" href={safeProjectLink(project.repoUrl)} target="_blank" rel="noreferrer">Repository ↗</a>}</div></div>
      </article>)}
    </div> : <p className="qa-public-empty">{t(language, "noProjectsInCategory")}</p>}
    <div className="case-details">{projects.map((project, index) => <article id={`case-${index}`} className="case-detail" key={`${project.title}-detail`}><p className="eyebrow">{t(language, "workTitle")} · {project.category}</p><h3>{project.title}</h3><div className="two-col"><div><b>{t(language, "context")}</b><p>{project.context}</p></div><div><b>{t(language, "strategy")}</b><p>{project.strategy}</p></div><div><b>{t(language, "outcome")}</b><p>{project.result}</p></div></div>{project.gallery?.filter(safeProjectImage).length ? <div className="project-gallery">{project.gallery.filter(safeProjectImage).map((image, galleryIndex) => <img src={image} key={`${image}-${galleryIndex}`} alt={`${project.title} screenshot ${galleryIndex + 1}`} loading="lazy" />)}</div> : null}</article>)}</div>
  </>;
}

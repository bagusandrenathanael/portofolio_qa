"use client";

import { useMemo, useState } from "react";
import { Activity, ArrowRight, ClipboardCheck, Database, FlaskConical, Search, Workflow, Wrench } from "lucide-react";
import ToolIcon from "./tool-icon";
import SkillFilterLink from "./skill-filter-link";

type SkillGroup = { title: string; items: string[] };
type Section = { id: string; title: string; icon: typeof ClipboardCheck; match: RegExp };

const sections: Section[] = [
  { id: "testing", title: "Testing & QA", icon: ClipboardCheck, match: /manual|functional|regression|smoke|sanity|uat|sit|black box|test planning|test case|exploratory|quality assurance/i },
  { id: "automation", title: "Test Automation", icon: Workflow, match: /automation|playwright|selenium|katalon|cucumber|appium|jenkins/i },
  { id: "api", title: "API & Performance", icon: Activity, match: /postman|bruno|jmeter|api testing|\bk6\b/i },
  { id: "database", title: "Database & Data Quality", icon: Database, match: /sql|data validation|etl|oracle exadata|datastage|kafka|spark/i },
  { id: "tools", title: "Tools & Platforms", icon: Wrench, match: /jira|clickup|redmine|jam\.dev|chrome devtools|jboss|git|github|browserstack|microsoft office|google workspace/i },
  { id: "methods", title: "Methodologies & Development", icon: FlaskConical, match: /agile|scrum|sdlc|stlc|java|javascript|groovy|shell scripting|business analysis|problem solving|analytical|attention to detail|teamwork|communication/i },
];

const featured = [
  { name: "Playwright", category: "automation", label: "AUTOMATION TESTING", description: "End-to-end browser checks with TypeScript, reusable page actions, and regression coverage.", tags: ["TypeScript", "POM", "Regression", "Cross-browser"] },
  { name: "Jenkins", category: "automation", label: "CI/CD AUTOMATION", description: "Automate build pipelines and connect repeatable QA checks to continuous integration.", tags: ["Build Pipeline", "CI/CD", "Continuous Integration"] },
  { name: "Postman", category: "api", label: "API TESTING", description: "API functional and integration checks using collections, environments, and assertions.", tags: ["API Testing", "Collections", "Environment", "CI/CD"] },
  { name: "JMeter", category: "api", label: "PERFORMANCE TESTING", description: "Load and performance checks to review service stability, throughput, and response time.", tags: ["Load Test", "Stress Test", "Performance", "Reporting"] },
];

function sectionFor(item: string, parentTitle: string) {
  return sections.find((section) => section.match.test(item)) ?? sections.find((section) => section.match.test(parentTitle)) ?? sections[5];
}

export default function SkillsShowcase({ groups }: { groups: SkillGroup[] }) {
  const [selected, setSelected] = useState("all");
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const groupedItems = useMemo(() => {
    const map = new Map(sections.map((section) => [section.id, new Map<string, string>()]));
    for (const group of groups) for (const item of group.items) {
      const section = sectionFor(item, group.title);
      map.get(section.id)?.set(item.toLowerCase(), item);
    }
    return sections.map((section) => ({ ...section, items: [...(map.get(section.id)?.values() ?? [])].filter((item) => !normalizedQuery || item.toLowerCase().includes(normalizedQuery)) }))
      .filter((section) => section.items.length && (selected === "all" || section.id === selected));
  }, [groups, normalizedQuery, selected]);
  const visibleFeatured = featured.filter((item) => (selected === "all" || selected === item.category) && (!normalizedQuery || `${item.name} ${item.description} ${item.tags.join(" ")}`.toLowerCase().includes(normalizedQuery)));
  const allCount = groups.reduce((sum, group) => sum + new Set(group.items.map((item) => item.toLowerCase())).size, 0);
  return <div className="skills-showcase">
    <div className="skills-toolbar" aria-label="Filter skills and tools">
      <div className="skill-filters">{[{ id: "all", title: "All" }, ...sections].map((item) => <button type="button" key={item.id} className={selected === item.id ? "active" : ""} aria-pressed={selected === item.id} onClick={() => setSelected(item.id)}>{item.title}</button>)}</div>
      <label className="skill-search"><Search size={17} aria-hidden="true"/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search skills & tools…" aria-label="Search skills and tools"/>{query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search">×</button>}</label>
    </div>
    {visibleFeatured.length > 0 && <div className="featured-skills">{visibleFeatured.map((item) => <article className={`featured-skill featured-${item.category}${item.name === "Jenkins" ? " featured-jenkins" : ""}`} key={item.name}><div className="featured-skill-icon"><ToolIcon name={item.name} size={42}/></div><div className="featured-skill-copy"><small>{item.label}</small><h3>{item.name}</h3><p>{item.description}</p><div className="skill-tag-row">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><ArrowRight size={18} className="featured-skill-arrow" aria-hidden="true"/></article>)}</div>}
    {groupedItems.length ? <div className="skill-groups">{groupedItems.map((section) => { const Icon = section.icon; return <article className="skill-group-card" key={section.id}>
      <header><i><Icon size={20}/></i><div><h3><span>{String(sections.findIndex((item) => item.id === section.id) + 1).padStart(2, "0")}.</span> {section.title}</h3><small>{section.items.length} skills &amp; tools</small></div><button type="button" onClick={() => setSelected(section.id)}>View all <ArrowRight size={13}/></button></header>
      <ul>{section.items.map((item) => <li key={`${section.id}-${item}`}><span className="group-tool-icon"><ToolIcon name={item} size={20}/></span><SkillFilterLink skill={item}/></li>)}</ul>
    </article>; })}</div> : <p className="skills-empty">No skills or tools found. Try another search.</p>}
    <p className="skills-total"><span>{allCount} skills &amp; tools in this profile</span></p>
  </div>;
}

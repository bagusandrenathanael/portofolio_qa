"use client";

import { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";

export type Credential = { title: string; issuer: string; year: string; url: string; logo?: string };

function categoryFor(item: Credential) {
  const text = `${item.title} ${item.issuer}`.toLowerCase();
  if (/playwright|appium|automation|selenium|devops|github actions/.test(text)) return "Automation";
  if (/testing|software testing|qa|quality assurance|bug writing/.test(text)) return "QA & Testing";
  if (/development|java|spring|programming|databricks|machine learning/.test(text)) return "Development";
  if (/english|toefl|cisco|cybersecurity|business analysis|cbap/.test(text)) return "Other";
  return "Other";
}

export default function CredentialsShowcase({ items, language }: { items: Credential[]; language: string }) {
  const [active, setActive] = useState("all");
  const isId = language === "id";
  const groups = useMemo(() => ["QA & Testing", "Automation", "Development", "Other"].map((name) => ({ name, count: items.filter((item) => categoryFor(item) === name).length })).filter((group) => group.count > 0), [items]);
  const filtered = active === "all" ? items : items.filter((item) => categoryFor(item) === active);
  const labelFor = (category: string) => isId ? ({ "QA & Testing": "QA & Pengujian", Automation: "Otomasi", Development: "Pengembangan", Other: "Lainnya" }[category] || category) : category;

  return <div className="credentials-showcase">
    <div className="credential-filters" role="group" aria-label={isId ? "Filter kredensial" : "Filter credentials"}>
      <button className={active === "all" ? "active" : ""} onClick={() => setActive("all")}>{isId ? "Semua Kredensial" : "All credentials"}<b>{items.length}</b></button>
      {groups.map((group) => <button key={group.name} className={active === group.name ? "active" : ""} onClick={() => setActive(group.name)}>{labelFor(group.name)}<b>{group.count}</b></button>)}
    </div>
    <div className="credential-grid">{filtered.map((item) => {
      const category = categoryFor(item);
      const logo = item.logo || (/linkedin/i.test(item.issuer) ? "/issuer-linkedin-learning.svg" : /cisco/i.test(item.issuer) ? "/issuer-cisco.svg" : /british council|etsr/i.test(item.issuer) ? "/issuer-british-council.svg" : "");
      return <article key={`${item.title}-${item.issuer}`}>
        <i className={logo ? "has-issuer-logo" : "issuer-fallback"}>{logo ? <img src={logo} alt={`${item.issuer || "Course provider"} logo`} loading="lazy"/> : <span>{item.issuer.slice(0, 2).toUpperCase() || "QA"}</span>}</i>
        <div className="credential-info"><b>{item.title}</b><small>{item.issuer}{item.year ? ` · ${item.year}` : ""}</small><span className="credential-category">{labelFor(category)}</span></div>
        {item.url && <a href={item.url} aria-label={`${isId ? "Lihat kredensial" : "View credential"}: ${item.title}`} target="_blank" rel="noreferrer"><ExternalLink size={16}/></a>}
      </article>;
    })}</div>
  </div>;
}

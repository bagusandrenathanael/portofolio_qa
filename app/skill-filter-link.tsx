"use client";

import type { MouseEvent } from "react";

export default function SkillFilterLink({ skill }: { skill: string }) {
  function select(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    window.history.pushState(null, "", `#work?skill=${encodeURIComponent(skill)}`);
    window.dispatchEvent(new Event("portfolio-skill-filter"));
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  return <a href="#work" className="skill-filter-link" onClick={select} aria-label={`Show projects using ${skill}`}>{skill}</a>;
}

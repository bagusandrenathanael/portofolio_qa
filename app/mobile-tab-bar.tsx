"use client";

import { useEffect, useState } from "react";
import { BriefcaseBusiness, House, Sparkles, UserRound } from "lucide-react";
import { type Language, t } from "../lib/i18n";

const tabs = [
  { id: "home", label: "tabHome", Icon: House },
  { id: "about", label: "tabAbout", Icon: UserRound },
  { id: "skills", label: "tabSkills", Icon: Sparkles },
  { id: "work", label: "tabWork", Icon: BriefcaseBusiness },
] as const;

export default function MobileTabBar({ language, navigation }: { language: Language; navigation: { target: string; visible: boolean }[] }) {
  const [active, setActive] = useState("home");
  const visibleTabs = tabs.filter(({ id }) => navigation.some((item) => item.target === id && item.visible));

  useEffect(() => {
    const sections = tabs.map(({ id }) => document.getElementById(id)).filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: "-15% 0px -65% 0px", threshold: [0, 0.2, 0.5] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return <div className="mobile-tab-bar" role="navigation" aria-label={t(language, "mobileNavigation")} style={{ gridTemplateColumns: `repeat(${visibleTabs.length || 1}, minmax(0, 1fr))` }}>
    {visibleTabs.map(({ id, label, Icon }) => <a key={id} href={`#${id}`} aria-current={active === id ? "page" : undefined} className={active === id ? "active" : ""} onClick={() => setActive(id)}>
      <Icon aria-hidden="true" size={20} strokeWidth={active === id ? 2.4 : 1.8} />
      <span>{t(language, label)}</span>
    </a>)}
  </div>;
}

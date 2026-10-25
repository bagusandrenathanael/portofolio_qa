"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { languages, type Language, t } from "../lib/i18n";
import { BadgeCheck, BookOpen, BriefcaseBusiness, Check, ChevronDown, Download, FlaskConical, House, Sparkles, UserRound } from "lucide-react";

const links = [
  ["home", "home", House], ["about", "about", UserRound], ["skillsNav", "skills", Sparkles],
  ["casesNav", "work", BriefcaseBusiness], ["labNav", "lab", FlaskConical],
  ["credentialsNav", "credentials", BadgeCheck], ["blogNav", "notes", BookOpen],
] as const;

function getWhatsAppHref(value: string | undefined) {
  const input = value?.trim() ?? "";
  if (/^https:\/\/(?:wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\//i.test(input)) return input;
  const phone = input.replace(/\D/g, "");
  if (phone.length >= 8 && phone.length <= 15) return `https://wa.me/${phone}`;
  return `https://wa.me/?text=${encodeURIComponent("Hi Andre, I found your portfolio and would like to connect.")}`;
}

function saveLanguagePreference(value: string) {
  document.cookie = `site-language=${value}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
}

export default function PortfolioHeader({ language, email, linkedin, whatsapp, cvUrl, navigation, brandName = "Andre", brandLogo = "", photoUrl = "/andre-avatar.png" }: { language: Language; email: string; linkedin: string; whatsapp?: string; cvUrl?: string; navigation: { key: string; target: string; visible: boolean }[]; brandName?: string; brandLogo?: string; photoUrl?: string }) {
  const [open, setOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const router = useRouter();
  function changeLanguage(value: string) {
    if (!languages.some((item) => item.code === value)) return;
    saveLanguagePreference(value);
    setLanguageOpen(false);
    router.refresh();
  }
  const visibleLinks = navigation.flatMap(({ key, target, visible }) => { const match = links.find((entry) => entry[0] === key && entry[1] === target); return visible && match ? [match] : []; });
  return <header className="header"><div className="brand-lockup"><a className="brand-avatar-link" href="#home" aria-label={brandName}><img className="brand-avatar" src={brandLogo || photoUrl} alt="" aria-hidden="true" /></a><a className="brand" href="#home">{brandName}<span>.</span></a></div><button className="menu" aria-label={t(language, "openNavigation")} aria-expanded={open} onClick={() => setOpen(!open)}>☰</button><nav className={open ? "open" : ""} aria-label={t(language, "home")}>{visibleLinks.map(([key, target, Icon]) => <a key={target} href={`#${target}`} onClick={() => setOpen(false)}><Icon className="nav-item-icon" size={15} strokeWidth={1.9} aria-hidden="true" /><span>{t(language, key)}</span></a>)}</nav><div className="header-actions"><a className="button small cv-download-button" href={cvUrl || "#home"} {...(cvUrl ? { download: "Andre-Nathanael-CV.pdf" } : {})} aria-label={t(language, "downloadCv")} title={cvUrl ? t(language, "downloadCv") : t(language, "requestCv")}><Download size={15} aria-hidden="true" /><span>{t(language, "downloadCv")}</span></a><details open={languageOpen} onToggle={(event) => setLanguageOpen(event.currentTarget.open)} className="language-control language-picker"><summary className="language-trigger" aria-label="Language / Bahasa" title="Language / Bahasa"><span className="language-globe" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 0 0 18M12 3a15 0 0 1 0 18" /></svg></span><span className="language-current">{languages.find((item) => item.code === language)?.short ?? "EN"}</span><ChevronDown size={14} aria-hidden="true" /></summary><div className="language-menu" role="group" aria-label="Language / Bahasa">{languages.map((item) => <button type="button" aria-pressed={language === item.code} className={language === item.code ? "selected" : ""} key={item.code} onClick={() => changeLanguage(item.code)}><span>{item.label}</span>{language === item.code && <Check size={15} aria-hidden="true" />}</button>)}</div></details><details className="contact-links"><summary className="button small contact-icon-button" aria-label={t(language, "contactMe")} title={t(language, "contactMe")}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg><span>{t(language, "contactMe")}</span></summary><div className="contact-links-menu"><a href={getWhatsAppHref(whatsapp)} target="_blank" rel="noreferrer"><span className="contact-option-icon whatsapp-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 11.5a8.4 8.4 0 0 1-12.4 7.4L4 20l1.2-3.5A8.4 8.4 0 1 1 20 11.5Z" /><path d="M9 8.5c.3 2.3 2.2 4.2 4.5 4.5l1.2-1.2 2 .8c-.2 1.3-1 2-2.3 2-3.5-.3-6.4-3.2-6.7-6.7 0-1.3.7-2.1 2-2.3l.8 2Z" /></svg></span>WhatsApp</a><a href={linkedin} target="_blank" rel="noreferrer"><span className="contact-option-icon linkedin-icon" aria-hidden="true">in</span>LinkedIn</a><a href={`mailto:${email}`}><span className="contact-option-icon email-icon" aria-hidden="true">✉</span>Email</a></div></details></div></header>;
}

"use client";

import { useState } from "react";

const links = [["Beranda", "home"], ["Tentang", "about"], ["Keahlian", "skills"], ["Studi Kasus", "work"], ["Lab Otomasi", "lab"], ["Sertifikasi", "credentials"], ["Blog", "notes"], ["Kontak", "contact"]];

export default function PortfolioHeader({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  return <header className="header"><a className="brand" href="#home"><span className="mark"><i /><i /><i /></span>{name.split(" ")[0]}<span>.</span></a><button className="menu" aria-label="Buka navigasi" aria-expanded={open} onClick={() => setOpen(!open)}>☰</button><nav className={open ? "open" : ""} aria-label="Navigasi utama">{links.map(([label, target]) => <a key={target} href={`#${target}`} onClick={() => setOpen(false)}>{label}</a>)}</nav><div className="header-actions"><a className="button small" href="#contact">Hubungi Saya ↗</a></div></header>;
}

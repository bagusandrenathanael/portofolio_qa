"use client";

import { useMemo, useState } from "react";
import type { PortfolioContent } from "../../lib/portfolio-content";

type Value = string | number | boolean | null | Value[] | { [key: string]: Value };
type SectionKey = keyof PortfolioContent;

const sections: { key: SectionKey; title: string; hint: string; icon: string }[] = [
  { key: "profile", title: "Profil & beranda", hint: "Nama, headline, kontak, dan angka ringkasan.", icon: "◈" },
  { key: "about", title: "Tentang & pengalaman", hint: "Cerita, prinsip kerja, dan riwayat karier.", icon: "◎" },
  { key: "skills", title: "Keahlian", hint: "Kategori testing, tools, dan metode QA.", icon: "⌘" },
  { key: "projects", title: "Studi kasus", hint: "Konteks, strategi, tools, dan hasil proyek.", icon: "▣" },
  { key: "labs", title: "Lab otomasi", hint: "Demo kode dan tautan repository.", icon: "⌗" },
  { key: "certifications", title: "Sertifikasi", hint: "Kredensial dan pelatihan yang dimiliki.", icon: "✳" },
  { key: "posts", title: "Tulisan", hint: "Artikel dan catatan tentang proses QA.", icon: "▤" },
  { key: "contact", title: "Kontak", hint: "Ajakan dan pesan di bagian kontak.", icon: "↗" },
];

function labelFor(value: string) {
  return value.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[-_]/g, " ").replace(/^./, (c) => c.toUpperCase());
}

function setAtPath(root: Value, path: (string | number)[], next: Value): Value {
  if (!path.length) return next;
  const [head, ...tail] = path;
  if (Array.isArray(root)) return root.map((item, index) => index === head ? setAtPath(item, tail, next) : item);
  if (root && typeof root === "object") return { ...root, [String(head)]: setAtPath(root[String(head)], tail, next) };
  return root;
}

function blankLike(value: Value): Value {
  if (Array.isArray(value)) return [];
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, blankLike(child)]));
  if (typeof value === "number") return 0;
  if (typeof value === "boolean") return false;
  return "";
}

function EditorNode({ label, value, path, update }: { label: string; value: Value; path: (string | number)[]; update: (path: (string | number)[], value: Value) => void }) {
  if (Array.isArray(value)) {
    const exemplar = value[0];
    const strings = value.every((item) => typeof item === "string");
    return <fieldset className="editor-array"><legend>{labelFor(label)}</legend>
      {value.map((item, index) => strings ? <div className="editor-list-row" key={`${path.join(".")}-${index}`}><input aria-label={`${labelFor(label)} ${index + 1}`} value={String(item)} onChange={(e) => update([...path, index], e.target.value)} /><button className="icon-button danger" type="button" onClick={() => update(path, value.filter((_, i) => i !== index))} aria-label="Hapus item">×</button></div> : <details className="editor-item" key={`${path.join(".")}-${index}`} open={index === 0}><summary>{(item && typeof item === "object" && !Array.isArray(item) && ("title" in item ? String(item.title) : "name" in item ? String(item.name) : "")) || `${labelFor(label)} ${index + 1}`}<button className="icon-button danger" type="button" aria-label="Hapus item" onClick={(e) => { e.preventDefault(); update(path, value.filter((_, i) => i !== index)); }}>×</button></summary><div className="editor-item-fields"><EditorNode label={`${label} ${index + 1}`} value={item} path={[...path, index]} update={update} /></div></details>)}
      <button className="add-row" type="button" onClick={() => update(path, [...value, exemplar === undefined ? "" : blankLike(exemplar)])}>＋ Tambah {labelFor(label).toLowerCase()}</button>
    </fieldset>;
  }
  if (value && typeof value === "object") return <fieldset className="editor-object"><legend>{labelFor(label)}</legend><div className="editor-fields">{Object.entries(value).map(([key, child]) => <EditorNode label={key} value={child} path={[...path, key]} update={update} key={[...path, key].join(".")} />)}</div></fieldset>;
  if (typeof value === "boolean") return <label className="editor-check"><input type="checkbox" checked={value} onChange={(e) => update(path, e.target.checked)} />{labelFor(label)}</label>;
  return <label className="editor-field"><span>{labelFor(label)}</span>{typeof value === "string" && (value.length > 90 || value.includes("\n")) ? <textarea rows={value.includes("\n") ? 6 : 3} value={value} onChange={(e) => update(path, e.target.value)} /> : <input type={typeof value === "number" ? "number" : "text"} value={String(value ?? "")} onChange={(e) => update(path, typeof value === "number" ? Number(e.target.value) : e.target.value)} />}</label>;
}

export default function AdminClient({ initialContent, displayName }: { initialContent: PortfolioContent; displayName: string }) {
  const [draft, setDraft] = useState<PortfolioContent>(initialContent);
  const [active, setActive] = useState<SectionKey>("profile");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [lastSaved, setLastSaved] = useState("");
  const current = useMemo(() => sections.find((section) => section.key === active)!, [active]);
  const update = (path: (string | number)[], value: Value) => setDraft((old) => setAtPath(old as unknown as Value, [active, ...path], value) as unknown as PortfolioContent);

  async function save() {
    setSaving(true); setStatus("");
    try {
      const response = await fetch("/api/admin/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(draft) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Simpan perubahan gagal.");
      setLastSaved(new Date(result.updatedAt).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" }));
      setStatus("Perubahan berhasil disimpan dan sudah tampil di portofolio.");
    } catch (error) { setStatus(error instanceof Error ? error.message : "Terjadi kesalahan saat menyimpan."); }
    finally { setSaving(false); }
  }

  return <main className="admin-shell"><aside className="admin-sidebar"><a className="admin-brand" href="/"> <span className="admin-mark">A</span><span>Andre<span className="admin-brand-dot">.</span><small>PORTFOLIO STUDIO</small></span></a><div className="admin-workspace"><span className="workspace-avatar">{displayName.slice(0, 1).toUpperCase()}</span><span><b>{displayName}</b><small>Superadmin</small></span><i>⌄</i></div><p className="sidebar-label">KONTEN WEBSITE</p><nav className="admin-nav" aria-label="Menu admin">{sections.map((section) => <button type="button" className={active === section.key ? "active" : ""} key={section.key} onClick={() => { setActive(section.key); setStatus(""); }}><span>{section.icon}</span>{section.title}{active === section.key && <i>•</i>}</button>)}</nav><div className="sidebar-bottom"><a href="/" target="_blank">↗ Lihat website</a><p>Autosave aktif setelah Anda menekan simpan.</p></div></aside><section className="admin-main"><header className="admin-topbar"><div><span className="admin-breadcrumb">Workspace <b>/</b> Konten</span><span className="admin-status-dot">● Terhubung sebagai superadmin</span></div><a className="button small" href="/" target="_blank">Pratinjau website ↗</a></header><div className="admin-content"><div className="admin-title-row"><div><p className="eyebrow">CONTENT MANAGEMENT</p><h1>{current.title}</h1><p>{current.hint} Perubahan akan langsung tersimpan ke database portofolio.</p></div><button className="button save-button" type="button" onClick={save} disabled={saving}>{saving ? "Menyimpan…" : "✓ Simpan perubahan"}</button></div><div className="admin-edit-card"><div className="admin-card-heading"><div><span className="section-icon">{current.icon}</span><div><h2>Editor konten</h2><p>Kelola informasi yang tampil pada bagian {current.title.toLowerCase()}.</p></div></div><span className="saved-badge">● Tersimpan ke database</span></div><div className="admin-editor"><EditorNode label={current.title} value={draft[active] as unknown as Value} path={[]} update={update} /></div><div className="admin-card-footer"><span>✓ Perubahan belum terlihat sebelum disimpan.</span><button className="button" type="button" onClick={save} disabled={saving}>{saving ? "Menyimpan…" : "Simpan bagian ini →"}</button></div></div><div className={`admin-message ${status.startsWith("Perubahan") ? "success" : status ? "error" : ""}`} role="status">{status || (lastSaved ? `Terakhir disimpan ${lastSaved}.` : "Tips: gunakan tombol + untuk menambah pengalaman, proyek, atau item lainnya.")}</div><div className="admin-help"><b>Perlu pratinjau?</b><span>Buka website untuk melihat perubahan langsung setelah disimpan.</span><a href="/" target="_blank">Buka pratinjau ↗</a></div></div></section></main>;
}

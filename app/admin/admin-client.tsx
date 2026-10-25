"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { defaultPortfolioContent, type PortfolioContent } from "../../lib/portfolio-content";

type Value = string | number | boolean | null | Value[] | { [key: string]: Value };
type SectionKey = keyof PortfolioContent;

const sections: { key: SectionKey; title: string; hint: string; icon: string }[] = [
  { key: "profile", title: "Profil & beranda", hint: "Nama, headline, kontak, dan angka ringkasan.", icon: "◈" },
  { key: "about", title: "Tentang & pengalaman", hint: "Cerita, prinsip kerja, dan riwayat karier.", icon: "◎" },
  { key: "education", title: "Pendidikan", hint: "Riwayat pendidikan dan pelatihan.", icon: "▤" },
  { key: "skills", title: "Keahlian", hint: "Kategori testing, tools, dan metode QA.", icon: "⌘" },
  { key: "projects", title: "Studi kasus", hint: "Konteks, strategi, tools, dan hasil proyek.", icon: "▣" },
  { key: "labs", title: "Lab otomasi", hint: "Demo kode dan tautan repository.", icon: "⌗" },
  { key: "certifications", title: "Sertifikasi", hint: "Kredensial dan pelatihan yang dimiliki.", icon: "✳" },
  { key: "posts", title: "Tulisan", hint: "Artikel dan catatan tentang proses QA.", icon: "▤" },
  { key: "navigation", title: "Navigasi", hint: "Urutan dan visibilitas tautan navigasi website.", icon: "☰" },
  { key: "contact", title: "Kontak", hint: "Ajakan dan pesan di bagian kontak.", icon: "↗" },
  { key: "siteSettings", title: "Pengaturan situs", hint: "Identitas website, favicon, SEO, dan warna tema.", icon: "⚙" },
];

function labelFor(value: string) {
  if (value === "photoUrl") return "Foto profil (URL/path)";
  if (value === "favicon") return "Favicon (path aset publik)";
  if (value === "location") return "Lokasi (hero dan ID card)";
  if (value === "openToWork") return "Open to QA opportunities (tampilkan di ID card)";
  if (value === "whatsapp") return "Link WhatsApp atau nomor telepon";
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

async function compressProfilePhoto(file: File) {
  if (!file.type.startsWith("image/")) throw new Error("Pilih file gambar JPG, PNG, atau WebP.");
  const image = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  let scale = Math.min(1, 1200 / Math.max(image.width, image.height));
  try {
    for (let resizeAttempt = 0; resizeAttempt < 7; resizeAttempt += 1) {
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Browser tidak dapat memproses gambar ini.");
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      for (const quality of [0.84, 0.74, 0.64, 0.54]) {
        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
        if (!blob || blob.size > 600_000) continue;
        const dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => typeof reader.result === "string" ? resolve(reader.result) : reject(new Error("Gambar tidak dapat dibaca."));
          reader.onerror = () => reject(new Error("Gambar tidak dapat dibaca."));
          reader.readAsDataURL(blob);
        });
        if (dataUrl.length <= 820_000) return dataUrl;
      }
      scale *= 0.78;
    }
    throw new Error("Ukuran foto belum bisa diperkecil. Coba gunakan gambar yang lebih kecil.");
  } finally {
    image.close();
  }
}

function PhotoEditor({ value, update, label = "Foto profil" }: { value: string; update: (value: string) => void; label?: string }) {
  const [error, setError] = useState("");
  const embedded = value.startsWith("data:image/");
  async function upload(file?: File) {
    if (!file) return;
    setError("");
    try { update(await compressProfilePhoto(file)); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Foto gagal diproses."); }
  }
  return <div className="editor-field editor-photo-field">
    <span>{label}</span>
    <div className="editor-photo-preview">{value ? <img src={value} alt="Pratinjau foto profil" /> : <span>BA</span>}</div>
    <div className="editor-photo-actions"><label className="editor-upload-button">{embedded ? "Ganti foto" : "Unggah foto"}<input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => { void upload(event.target.files?.[0]); event.currentTarget.value = ""; }} /></label>{value && <button className="editor-clear-photo" type="button" onClick={() => { update(""); setError(""); }}>Hapus foto</button>}</div>
    <span className="editor-hint">Unggah JPG/PNG/WebP atau isi URL/path lokal seperti <code>/profile.jpg</code>. Foto unggahan dioptimalkan otomatis.</span>
    <input aria-label="URL atau path foto profil" type="text" placeholder={embedded ? "Foto sudah diunggah — unggah ulang atau masukkan path" : "Contoh: /profile.jpg atau https://..."} value={embedded ? "" : value} onChange={(event) => update(event.target.value)} />
    {error && <small className="editor-photo-error" role="alert">{error}</small>}
  </div>;
}

function CvEditor({ value, update }: { value: string; update: (value: string) => void }) {
  const [error, setError] = useState("");
  async function upload(file?: File) {
    if (!file) return;
    if (file.type !== "application/pdf" || file.size > 900_000) { setError("Pilih file PDF dengan ukuran maksimal 900 KB."); return; }
    const dataUrl = await new Promise<string>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => typeof reader.result === "string" ? resolve(reader.result) : reject(new Error("File CV tidak dapat dibaca.")); reader.onerror = () => reject(new Error("File CV tidak dapat dibaca.")); reader.readAsDataURL(file); });
    update(dataUrl); setError("");
  }
  return <div className="editor-field"><span>File CV (PDF)</span><div className="editor-photo-actions"><label className="editor-upload-button">{value.startsWith("data:application/pdf") ? "Ganti file CV" : "Unggah file CV"}<input type="file" accept="application/pdf,.pdf" onChange={(event) => { void upload(event.target.files?.[0]); event.currentTarget.value = ""; }} /></label>{value && <button type="button" className="editor-clear-photo" onClick={() => update("")}>Hapus CV</button>}</div><input aria-label="URL CV" placeholder="Atau tempel link CV" value={value.startsWith("data:application/pdf") ? "" : value} onChange={(event) => update(event.target.value)} />{value && <a className="editor-cv-preview" href={value} target="_blank" rel="noreferrer">Lihat CV yang tersimpan ↗</a>}<small className="editor-hint">PDF maksimal 900 KB. Simpan perubahan agar CV tampil di navbar publik.</small>{error && <small className="editor-photo-error" role="alert">{error}</small>}</div>;
}

function EditorNode({ label, value, path, update, template }: { template?: Value; label: string; value: Value; path: (string | number)[]; update: (path: (string | number)[], value: Value) => void }) {
  if ((label === "photoUrl" || label === "bannerUrl" || label === "logo") && typeof value === "string") return <PhotoEditor label={labelFor(label)} value={value} update={(next) => update(path, next)} />;
  if (label === "cvUrl" && typeof value === "string") return <CvEditor value={value} update={(next) => update(path, next)} />;
  if (Array.isArray(value)) {
    const exemplar = value[0] ?? (Array.isArray(template) ? template[0] : undefined) ?? (label === "socialLinks" ? { platform: "", url: "", icon: "↗", visible: true, sortOrder: 0 } : undefined);
    const strings = value.every((item) => typeof item === "string");
    return <fieldset className="editor-array"><legend>{labelFor(label)}</legend>
      {value.map((item, index) => strings ? <div className="editor-list-row" key={`${path.join(".")}-${index}`}><input aria-label={`${labelFor(label)} ${index + 1}`} value={String(item)} onChange={(e) => update([...path, index], e.target.value)} /><button className="icon-button danger" type="button" onClick={() => update(path, value.filter((_, i) => i !== index))} aria-label="Hapus item">×</button></div> : <details className="editor-item" key={`${path.join(".")}-${index}`} open={index === 0}><summary>{(item && typeof item === "object" && !Array.isArray(item) && ("title" in item ? String(item.title) : "name" in item ? String(item.name) : "")) || `${labelFor(label)} ${index + 1}`}<button className="icon-button danger" type="button" aria-label="Hapus item" onClick={(e) => { e.preventDefault(); update(path, value.filter((_, i) => i !== index)); }}>×</button></summary><div className="editor-item-fields"><EditorNode label={`${label} ${index + 1}`} value={item} template={exemplar} path={[...path, index]} update={update} /></div></details>)}
      <button className="add-row" type="button" onClick={() => update(path, [...value, exemplar === undefined ? "" : blankLike(exemplar)])}>＋ Tambah {labelFor(label).toLowerCase()}</button>
    </fieldset>;
  }
  if (value && typeof value === "object") return <fieldset className="editor-object"><legend>{labelFor(label)}</legend><div className="editor-fields">{Object.entries(value).map(([key, child]) => <EditorNode label={key} value={child} template={template && typeof template === "object" && !Array.isArray(template) ? template[key] : undefined} path={[...path, key]} update={update} key={[...path, key].join(".")} />)}</div></fieldset>;
  if (typeof value === "boolean") return <label className="editor-check"><input type="checkbox" checked={value} onChange={(e) => update(path, e.target.checked)} /><span>{labelFor(label)}{label === "openToWork" && <small className="editor-hint">Aktifkan untuk menampilkan badge hijau di kartu ID publik.</small>}</span></label>;
  return <label className="editor-field"><span>{labelFor(label)}</span>{typeof value === "string" && (value.length > 90 || value.includes("\n")) ? <textarea rows={value.includes("\n") ? 6 : 3} value={value} onChange={(e) => update(path, e.target.value)} /> : <input type={typeof value === "number" ? "number" : "text"} placeholder={label === "photoUrl" ? "Contoh: /profile.jpg" : label === "favicon" ? "Contoh: /favicon.svg" : label === "location" ? "Contoh: Jakarta, Indonesia" : label === "whatsapp" ? "https://wa.me/6281234567890 atau 6281234567890" : undefined} value={String(value ?? "")} onChange={(e) => update(path, typeof value === "number" ? Number(e.target.value) : e.target.value)} />}{label === "location" && <small className="editor-hint">Tampil dengan ikon lokasi di bagian hero; lokasi ini juga tercetak pada ID card.</small>}{label === "photoUrl" && <small className="editor-hint">Letakkan foto di folder <code>public</code> (contoh <code>public/profile.jpg</code>), lalu isi <code>/profile.jpg</code>. URL gambar langsung juga bisa digunakan.</small>}{label === "favicon" && <small className="editor-hint">Favicon kustom <code>/favicon.svg</code> sudah ada di folder <code>public</code> dan ikut dalam deploy. Untuk menggantinya, tambahkan aset ke folder tersebut lalu isi path-nya di sini.</small>}{label === "whatsapp" && <small className="editor-hint">Tempel link WhatsApp lengkap atau nomor internasional dengan kode negara. Contoh <code>6281234567890</code>.</small>}</label>;
}

export default function AdminClient({ initialContent, displayName, initialSection = "profile", embedded = false, onDirtyChange }: { initialContent: PortfolioContent; displayName: string; initialSection?: SectionKey; embedded?: boolean; onDirtyChange?: (dirty: boolean) => void }) {
  const router = useRouter();
  const [draft, setDraft] = useState<PortfolioContent>(initialContent);
  const [saved, setSaved] = useState(JSON.stringify(initialContent));
  const dirty = JSON.stringify(draft) !== saved;
  useEffect(() => { onDirtyChange?.(dirty); return () => onDirtyChange?.(false); }, [dirty, onDirtyChange]);
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  const [active, setActive] = useState<SectionKey>(initialSection);
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
      if (!response.ok) throw new Error((result.error || "Simpan perubahan gagal.") + (result.fields?.length ? ` Kolom: ${result.fields.join(", ")}` : ""));
      setSaved(JSON.stringify(draft));
      setLastSaved(new Date(result.updatedAt).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" }));
      setStatus("Perubahan berhasil disimpan dan sudah tampil di portofolio.");
    } catch (error) { setStatus(error instanceof Error ? error.message : "Terjadi kesalahan saat menyimpan."); }
    finally { setSaving(false); }
  }

  async function logout() {
    if (dirty && !window.confirm("Ada perubahan belum disimpan. Tetap keluar?")) return;
    try {
      const response = await fetch("/api/admin/logout", { method: "POST" });
      if (!response.ok) throw new Error("Keluar gagal.");
      router.refresh();
    } catch { setStatus("Keluar gagal. Silakan coba lagi."); }
  }

  if (embedded) return <section className="qa-panel inline-content-editor"><div className="qa-panel-heading"><div><h2>{current.title}</h2><p>{current.hint}</p></div><button className="button" type="button" onClick={save} disabled={saving}>{saving ? "Menyimpan…" : "✓ Simpan perubahan"}</button></div><div className="admin-editor"><EditorNode label={current.title} value={draft[active] as unknown as Value} template={defaultPortfolioContent[active] as unknown as Value} path={[]} update={update} /></div><div className="admin-message" role="status">{status || (lastSaved ? `Terakhir disimpan ${lastSaved}.` : "Perubahan tampil di website setelah disimpan.")}</div></section>;

  return <main className="admin-shell"><aside className="admin-sidebar"><Link className="admin-brand" href="/"> <span className="admin-mark"><img src="/andre-avatar.png" alt="" /></span><span>Andre<span className="admin-brand-dot">.</span><small>PORTFOLIO STUDIO</small></span></Link><div className="admin-workspace"><span className="workspace-avatar">{displayName.slice(0, 1).toUpperCase()}</span><span><b>{displayName}</b><small>Superadmin</small></span><i>⌄</i></div><p className="sidebar-label">KONTEN WEBSITE</p><nav className="admin-nav" aria-label="Menu admin">{sections.map((section) => <button type="button" className={active === section.key ? "active" : ""} key={section.key} onClick={() => { setActive(section.key); setStatus(""); }}><span>{section.icon}</span>{section.title}{active === section.key && <i>•</i>}</button>)}</nav><div className="sidebar-bottom"><Link href="/" target="_blank">↗ Lihat website</Link><p>Klik Simpan untuk menerapkan perubahan.</p></div></aside><section className="admin-main"><header className="admin-topbar"><div><span className="admin-breadcrumb">Workspace <b>/</b> Konten</span><span className="admin-status-dot">● Terhubung sebagai superadmin</span></div><div className="admin-top-actions"><Link className="admin-logout" href="/admin" onClick={(event) => { if (dirty && !window.confirm("Ada perubahan belum disimpan. Tinggalkan editor?")) event.preventDefault(); }}>← Dashboard QA</Link><Link className="button small" href="/" target="_blank">Pratinjau website ↗</Link><button type="button" className="admin-logout" onClick={logout}>Keluar</button></div></header><div className="admin-content"><div className="admin-feed"><div className="admin-title-row"><div><p className="eyebrow">CONTENT MANAGEMENT</p><h1>{current.title}</h1><p>{current.hint} Sunting konten lalu simpan untuk menerapkan perubahan.</p></div><button className="button save-button" type="button" onClick={save} disabled={saving}>{saving ? "Menyimpan…" : "✓ Simpan perubahan"}</button></div><div className="admin-edit-card"><div className="admin-card-heading"><div><span className="section-icon">{current.icon}</span><div><h2>Editor konten</h2><p>Kelola informasi yang tampil pada bagian {current.title.toLowerCase()}.</p></div></div><span className="saved-badge">● Draft di editor</span></div><div className="admin-editor"><EditorNode label={current.title} value={draft[active] as unknown as Value} template={defaultPortfolioContent[active] as unknown as Value} path={[]} update={update} /></div><div className="admin-card-footer"><span>✓ Perubahan belum terlihat sebelum disimpan.</span><button className="button" type="button" onClick={save} disabled={saving}>{saving ? "Menyimpan…" : "Simpan semua perubahan →"}</button></div></div><div className={`admin-message ${status.startsWith("Perubahan") ? "success" : status ? "error" : ""}`} role="status">{status || (lastSaved ? `Terakhir disimpan ${lastSaved}.` : "Tips: gunakan tombol + untuk menambah pengalaman, proyek, atau item lainnya.")}</div><div className="admin-help"><b>Perlu pratinjau?</b><span>Buka website untuk melihat perubahan langsung setelah disimpan.</span><Link href="/" target="_blank">Buka pratinjau ↗</Link></div></div><aside className="admin-context-rail"><section className="context-card context-profile"><span className="context-avatar"><img src="/andre-avatar.png" alt="" /></span><small>WORKSPACE</small><h2>Andre Portfolio</h2><p>Kelola profil dan konten portofolio Anda.</p></section><section className="context-card"><h2>Bagian aktif</h2><p className="context-current">{current.title}</p><p>{current.hint}</p><div className="context-divider"/><p className="context-tip"><b>Tips</b><br/>Simpan perubahan lalu buka pratinjau untuk memastikan tampilannya sesuai.</p></section><Link className="context-preview" href="/" target="_blank">↗ Lihat website publik</Link></aside></div></section></main>;
}

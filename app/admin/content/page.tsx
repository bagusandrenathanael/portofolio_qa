import { redirect } from "next/navigation";
import AdminClient from "../admin-client";
import { getAuthenticatedAdminUser } from "../../../lib/admin-auth";
import { getPortfolioContent } from "../../../lib/portfolio-store";
import type { PortfolioContent } from "../../../lib/portfolio-content";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const allowed = ["profile", "about", "education", "skills", "projects", "labs", "certifications", "posts", "navigation", "contact", "siteSettings"] as const;

export default async function AdminContentPage({ searchParams }: { searchParams: Promise<{ section?: string }> }) {
  const user = await getAuthenticatedAdminUser();
  if (!user) redirect("/admin");
  let content: PortfolioContent;
  let section: (typeof allowed)[number] = "profile";
  try {
    const [loadedContent, query] = await Promise.all([getPortfolioContent(true), searchParams]);
    content = loadedContent;
    section = allowed.find((key) => key === query.section) ?? "profile";
  } catch {
    return <main className="auth-screen"><section className="auth-card"><h1>Konten belum dapat dimuat</h1><p>Periksa koneksi database. Editor dinonaktifkan untuk melindungi konten tersimpan.</p><a href="/admin">Kembali ke dashboard</a></section></main>;
  }
  return <AdminClient initialContent={content} displayName={user.email ?? "Admin"} initialSection={section} />;
}

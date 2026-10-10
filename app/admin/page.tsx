import { chatGPTSignInPath, chatGPTSignOutPath, getChatGPTUser } from "../chatgpt-auth";
import AdminClient from "./admin-client";
import { isPortfolioSuperadmin } from "../../lib/admin-auth";
import { getPortfolioContent } from "../../lib/portfolio-store";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await getChatGPTUser();
  if (!user) return <main className="auth-screen"><div className="auth-card"><span className="admin-mark">A</span><p className="eyebrow">PORTFOLIO STUDIO</p><h1>Masuk sebagai superadmin</h1><p>Login dengan akun pemilik situs untuk mengelola konten portofolio.</p><a className="button" href={chatGPTSignInPath("/admin")} target="_top">Masuk dengan ChatGPT ↗</a></div></main>;
  if (!isPortfolioSuperadmin(user)) return <main className="auth-screen"><div className="auth-card"><span className="admin-mark">!</span><p className="eyebrow">AKSES DIBATASI</p><h1>Akun ini bukan superadmin</h1><p>Gunakan akun pemilik situs yang terdaftar untuk mengubah konten.</p><a className="button outline" href={chatGPTSignOutPath("/admin")} target="_top">Ganti akun</a><a className="text-link" href="/">Kembali ke portofolio</a></div></main>;
  return <AdminClient initialContent={await getPortfolioContent()} displayName={user.displayName} />;
}

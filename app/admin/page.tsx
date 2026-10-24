import QaAdmin from "./qa-admin";
import AdminLoginForm from "./login-form";
import { getAuthenticatedAdminUser } from "../../lib/admin-auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function AdminPage() {
  const user = await getAuthenticatedAdminUser();
  if (!user) {
    return <main className="auth-screen"><section className="auth-card"><span className="admin-mark"><img src="/andre-avatar.png" alt="Andre" /></span><p className="eyebrow">ANDRE · PORTFOLIO STUDIO</p><h1>Masuk ke admin</h1><p>Kelola profil, studi kasus, dan konten portofolio Anda.</p><AdminLoginForm /></section></main>;
  }

  return <QaAdmin displayName={user.email ?? "Admin"} />;
}

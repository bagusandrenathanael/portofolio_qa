"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Tidak dapat masuk ke admin.");
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Terjadi kesalahan saat masuk.");
    } finally {
      setLoading(false);
    }
  }

  return <form className="admin-login-form" onSubmit={submit}>
    <label className="admin-login-field"><span>Email</span><input type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
    <label className="admin-login-field"><span>Password</span><input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
    {error && <p className="admin-login-error" role="alert">{error}</p>}
    <button className="button admin-login-submit" type="submit" disabled={loading}>{loading ? "Memeriksa…" : "Masuk ke dashboard →"}</button>
    <Link className="admin-login-back" href="/">← Kembali ke portofolio</Link>
  </form>;
}

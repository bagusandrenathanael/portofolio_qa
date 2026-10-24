"use client";

import { useState, type FormEvent } from "react";
import type { Language } from "../lib/i18n";
import { t } from "../lib/i18n";

export default function ContactForm({ language }: { language: Language }) {
  const [state, setState] = useState("");
  const [sending, setSending] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true); setState("");
    const form = event.currentTarget;
    const body = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Message could not be sent.");
      form.reset(); setState("Message sent. Thank you for reaching out.");
    } catch (error) { setState(error instanceof Error ? error.message : "Message could not be sent. Please try again."); }
    finally { setSending(false); }
  }
  return <form className="contact-form" onSubmit={submit}><h3>{t(language, "contactFormHeading")}</h3><p>{t(language, "contactFormDescription")}</p><label htmlFor="contact-name">{t(language, "yourName")}</label><input id="contact-name" name="name" autoComplete="name" required maxLength={120} /><label htmlFor="contact-email">{t(language, "yourEmail")}</label><input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={320} /><label htmlFor="contact-message">{t(language, "yourMessage")}</label><textarea id="contact-message" name="message" rows={4} required maxLength={4000} /><label className="contact-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label><button className="button" type="submit" disabled={sending}>{sending ? "Sending…" : `${t(language, "sendMessage")} ↗`}</button>{state && <p role="status" className="contact-form-status">{state}</p>}</form>;
}

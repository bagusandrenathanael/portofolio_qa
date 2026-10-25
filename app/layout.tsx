import type { Metadata, Viewport } from "next";
import "./globals.css";
import "../styles.css";
import "../styles-public.css";
import { cookies } from "next/headers";
import { isLanguage, languages } from "../lib/i18n";
import { getPortfolioContent } from "../lib/portfolio-store";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPortfolioContent();
  const settings = content.siteSettings;
  // The custom portfolio favicon is committed under /public and shipped with every deployment.
  // Older CMS records may still point at /favicon.ico, which is not present in this project.
  const configuredFavicon = settings.favicon.trim();
  const favicon = /^(https:\/\/|\/)/i.test(configuredFavicon) && configuredFavicon !== "/favicon.ico"
    ? configuredFavicon
    : "/favicon.svg";
  return {
    title: settings.seoTitle || content.profile.seoTitle || settings.siteTitle || "Andre Nathanael — QA Engineer",
    description: settings.seoDescription || content.profile.seoDescription || "Portofolio QA Engineer yang menguji produk dengan strategi dan otomasi.",
    icons: { icon: favicon, shortcut: favicon },
  };
}

export async function generateViewport(): Promise<Viewport> {
  const content = await getPortfolioContent();
  return { themeColor: content.siteSettings.themeColor };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const savedLanguage = (await cookies()).get("site-language")?.value;
  const content = await getPortfolioContent();
  const language = isLanguage(savedLanguage) ? savedLanguage : "en";
  const htmlLanguage = languages.find((item) => item.code === language)?.html ?? "en";
  return (
    <html lang={htmlLanguage} style={{ "--site-theme": content.siteSettings.themeColor } as React.CSSProperties}>
      <body className="antialiased">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Andre Boy Pratama — QA Engineer",
  description: "Portofolio QA Engineer yang menguji produk dengan strategi dan otomasi.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">{children}</body>
    </html>
  );
}

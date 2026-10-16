import type { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";
import Link from "next/link";
import { getProfile } from "@/lib/microcms";
import "./globals.css";

const font = Libre_Franklin({ subsets: ["latin"], variable: "--font", weight: ["400", "500", "700"] });

export const revalidate = 3600;
export const metadata: Metadata = { title: "Portfolio", description: "Digital artist portfolio" };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const p = await getProfile();
  const lines = p.siteTitleLines.split("\n");
  const social = (
    <>
      {p.behance && <a href={p.behance} aria-label="Behance" target="_blank" rel="noreferrer">Bē</a>}
      {p.facebook && <a href={p.facebook} aria-label="Facebook" target="_blank" rel="noreferrer">f</a>}
      {p.instagram && <a href={p.instagram} aria-label="Instagram" target="_blank" rel="noreferrer">IG</a>}
    </>
  );
  return (
    <html lang="ja" className={font.variable}>
      <body>
        <header className="header">
          <Link href="/" className="logo">
            {lines.map((l, i) => <span key={i} style={{ display: "block", textAlign: i === lines.length - 1 && lines.length > 2 ? "right" : "left" }}>{l}</span>)}
          </Link>
          <nav className="nav">
            <Link href="/">Projects</Link>
            <Link href="/contact">Contact</Link>
            {social}
          </nav>
        </header>
        <main>{children}</main>
        <footer className="footer">{social}</footer>
      </body>
    </html>
  );
}

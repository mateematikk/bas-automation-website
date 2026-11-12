import type { Metadata } from "next";
import localFont from "next/font/local";
import { siteConfig } from "@/lib/config";
import "./globals.css";

const manrope = localFont({ src: "./fonts/Manrope.ttf", variable: "--font-manrope", display: "swap", weight: "200 800" });
const onest = localFont({ src: "./fonts/Onest.ttf", variable: "--font-onest", display: "swap", weight: "100 900" });

export const metadata: Metadata = {
  metadataBase: siteConfig.url ? new URL(siteConfig.url) : undefined,
  title: { default: "BAS Expert — автоматизація бізнесу на BAS та ШІ-агенти", template: "%s | BAS Expert" },
  description: siteConfig.description,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: { type: "website", locale: siteConfig.locale, siteName: siteConfig.name, description: siteConfig.description },
  twitter: { card: "summary_large_image" },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined },
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }], shortcut: "/icon.svg" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk" className={`${manrope.variable} ${onest.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <a href="#main-content" className="fixed top-3 left-3 z-[100] -translate-y-24 rounded-lg bg-white px-4 py-3 font-semibold text-navy shadow-lg focus:translate-y-0">Перейти до вмісту</a>
        {children}
      </body>
    </html>
  );
}

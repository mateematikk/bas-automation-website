import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export function pageMetadata({ title, description, path, locale = "uk_UA" }: {
  title: string;
  description: string;
  path: string;
  locale?: string;
}): Metadata {
  const url = siteConfig.url ? `${siteConfig.url}${path}` : undefined;
  return {
    title,
    description,
    alternates: url ? { canonical: url } : undefined,
    openGraph: { title: `${title} | BAS Expert`, description, url, locale, type: "website", siteName: siteConfig.name },
    twitter: { card: "summary_large_image", title: `${title} | BAS Expert`, description },
  };
}

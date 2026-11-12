import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { services } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.url) return [];
  return ["/", ...services.map((service) => `/services/${service.slug}`), "/ru/uslugi"].map((path) => ({ url: `${siteConfig.url}${path}`, changeFrequency: "monthly", priority: path === "/" ? 1 : 0.8 }));
}

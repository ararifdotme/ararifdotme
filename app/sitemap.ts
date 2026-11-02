import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Bump when the content changes meaningfully.
const LAST_UPDATED = new Date("2026-11-02");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: LAST_UPDATED, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/plain`, lastModified: LAST_UPDATED, changeFrequency: "monthly", priority: 0.8 },
  ];
}

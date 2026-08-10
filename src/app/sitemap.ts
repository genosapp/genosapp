import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { getAllPostMeta } from "@/lib/insights";

const BASE = "https://genosapp.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const insightPages: MetadataRoute.Sitemap = getAllPostMeta().map((p) => ({
    url: `${BASE}/insights/${p.slug}`,
    lastModified: new Date(p.updated),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: BASE,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...servicePages,
    {
      url: `${BASE}/work/aura`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/insights`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...insightPages,
    {
      url: `${BASE}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}

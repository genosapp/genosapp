import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/search",
        "/opengraph-image",
        "/twitter-image",
        "/*/opengraph-image",
        "/*/twitter-image",
        "/api/",
      ],
    },
    sitemap: "https://genosapp.com/sitemap.xml",
    host: "https://genosapp.com",
  };
}

import { SITE_URL } from "./lib/site";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Keep admin, the API and personal pages out of search indexes.
        disallow: ["/admin", "/api/", "/cont", "/cos", "/favorite"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

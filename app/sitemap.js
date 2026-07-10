import { readDb } from "./lib/db";
import categorii from "../data/categorii.json";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://artyzawaz.vercel.app";

// Static, high-value routes that always exist.
const STATIC_ROUTES = [
  { path: "/", priority: 1.0, changeFrequency: "daily" },
  { path: "/stative", priority: 0.9, changeFrequency: "weekly" },
  { path: "/pusculate", priority: 0.9, changeFrequency: "weekly" },
  { path: "/populare", priority: 0.8, changeFrequency: "weekly" },
  { path: "/produse-noi", priority: 0.8, changeFrequency: "weekly" },
  { path: "/reduceri", priority: 0.8, changeFrequency: "weekly" },
  { path: "/fete", priority: 0.7, changeFrequency: "weekly" },
  { path: "/baieti", priority: 0.7, changeFrequency: "weekly" },
  { path: "/copii", priority: 0.7, changeFrequency: "weekly" },
  { path: "/sport", priority: 0.7, changeFrequency: "weekly" },
  { path: "/femei", priority: 0.6, changeFrequency: "weekly" },
  { path: "/barbati", priority: 0.6, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.6, changeFrequency: "weekly" },
  { path: "/despre-noi", priority: 0.5, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.5, changeFrequency: "monthly" },
];

export default async function sitemap() {
  const now = new Date();

  const staticEntries = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // Category landing pages from the live DB.
  const categoryEntries = (categorii || []).map((c) => ({
    url: `${SITE_URL}/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Individual product pages from the live DB.
  let productEntries = [];
  try {
    const produse = await readDb("produse");
    productEntries = (produse || []).map((p) => ({
      url: `${SITE_URL}/produse/${p.id}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
      images: p.img ? [p.img.startsWith("http") ? p.img : `${SITE_URL}${p.img}`] : undefined,
    }));
  } catch {
    productEntries = [];
  }

  // De-duplicate by URL (a few category slugs overlap with static routes).
  const seen = new Set();
  return [...staticEntries, ...categoryEntries, ...productEntries].filter((e) => {
    if (seen.has(e.url)) return false;
    seen.add(e.url);
    return true;
  });
}

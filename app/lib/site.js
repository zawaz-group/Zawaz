/*
 * Adresa canonică a site-ului, într-un singur loc.
 *
 * Era duplicată în layout.js, robots.js, sitemap.js și produse/[id]/layout.js,
 * iar toate patru copiile indicau spre un domeniu care nu există — sitemap-ul
 * publica zeci de URL-uri moarte. Cu o singură definiție, o schimbare de
 * domeniu nu mai poate lăsa copii nesincronizate în urmă.
 *
 * Fallback-ul e doar o plasă de siguranță: în producție setează
 * NEXT_PUBLIC_SITE_URL, altfel un domeniu propriu adăugat ulterior nu va apărea
 * în canonical, OpenGraph sau sitemap.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://zawaz-zeta.vercel.app";

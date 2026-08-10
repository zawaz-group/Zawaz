import { readDb } from "../../lib/db";
import { SITE_URL } from "../../lib/site";

export async function generateMetadata({ params }) {
  const { id } = await params;
  let produs = null;
  try {
    const produse = await readDb("produse");
    produs = (produse || []).find((p) => p.id === id) || null;
  } catch {
    produs = null;
  }

  if (!produs) {
    return {
      title: "Produs",
      description: "Descoperă produsele Paradox Craft din lemn natural.",
    };
  }

  const desc =
    (produs.descriere && produs.descriere.slice(0, 160)) ||
    `${produs.name} – produs Paradox Craft din lemn natural, lucrat manual.`;
  const img = produs.img
    ? produs.img.startsWith("http")
      ? produs.img
      : `${SITE_URL}${produs.img}`
    : "/hero-1.png";

  return {
    title: produs.name,
    description: desc,
    keywords: [
      produs.name,
      produs.category,
      ...(produs.culori || []),
      ...(produs.tema || []),
      "Paradox Craft",
      "lemn natural",
    ].filter(Boolean),
    alternates: { canonical: `/produse/${id}` },
    openGraph: {
      type: "website",
      title: `${produs.name} | Paradox Craft`,
      description: desc,
      url: `${SITE_URL}/produse/${id}`,
      images: [{ url: img, alt: produs.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${produs.name} | Paradox Craft`,
      description: desc,
      images: [img],
    },
  };
}

export default function ProdusLayout({ children }) {
  return children;
}

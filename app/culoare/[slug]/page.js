import FilteredPage from "../../components/FilteredPage";
import { getProduseByculoare, getAllCulori, slugify, deslugify } from "../../lib/produse";

// Produsele vin din MongoDB la fiecare cerere. Fără asta, pagina ar fi
// prerandată la build și modificările din admin n-ar apărea până la redeploy.
export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return getAllCulori().map(c => ({ slug: slugify(c) }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const value = deslugify(slug) || slug;
  return {
    title: `Produse ${value} | Paradox Craft`,
    description: `Explorează toate produsele Paradox Craft în culoarea ${value}.`,
  };
}

export default async function CuloarePage({ params }) {
  const { slug } = await params;
  const value = deslugify(slug) || slug;
  const produse = await getProduseByculoare(value);
  return <FilteredPage type="culoare" value={value} produse={produse} />;
}

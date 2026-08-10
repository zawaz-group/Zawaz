import FilteredPage from "../../components/FilteredPage";
import { getProduseByOcazie, getAllOcazii, slugify, deslugify } from "../../lib/produse";

// Produsele vin din MongoDB la fiecare cerere. Fără asta, pagina ar fi
// prerandată la build și modificările din admin n-ar apărea până la redeploy.
export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return getAllOcazii().map(o => ({ slug: slugify(o) }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const value = deslugify(slug) || slug;
  return {
    title: `${value} | Paradox Craft`,
    description: `Produse Paradox Craft perfecte pentru ${value}.`,
  };
}

export default async function OcaziePage({ params }) {
  const { slug } = await params;
  const value = deslugify(slug) || slug;
  const produse = await getProduseByOcazie(value);
  return <FilteredPage type="ocazie" value={value} produse={produse} />;
}

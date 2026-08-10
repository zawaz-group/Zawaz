import FilteredPage from "../../components/FilteredPage";
import { getProduseByTema, getAllTeme, slugify, deslugify } from "../../lib/produse";

// Produsele vin din MongoDB la fiecare cerere. Fără asta, pagina ar fi
// prerandată la build și modificările din admin n-ar apărea până la redeploy.
export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return getAllTeme().map(t => ({ slug: slugify(t) }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const value = deslugify(slug) || slug;
  return {
    title: `Stil ${value} | Paradox Craft`,
    description: `Descoperă produsele Paradox Craft cu stilul ${value}.`,
  };
}

export default async function TemaPage({ params }) {
  const { slug } = await params;
  const value = deslugify(slug) || slug;
  const produse = await getProduseByTema(value);
  return <FilteredPage type="tema" value={value} produse={produse} />;
}

import FilteredPage from "../../components/FilteredPage";
import { getProduseByOcazie, getAllOcazii, slugify, deslugify } from "../../lib/produse";

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

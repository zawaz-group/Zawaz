import FilteredPage from "../../components/FilteredPage";
import { getProduseByculoare, getAllCulori, slugify, deslugify } from "../../lib/produse";

export function generateStaticParams() {
  return getAllCulori().map(c => ({ slug: slugify(c) }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const value = deslugify(slug) || slug;
  return {
    title: `Produse ${value} | ArtyZawaz`,
    description: `Explorează toate produsele ArtyZawaz în culoarea ${value}.`,
  };
}

export default async function CuloarePage({ params }) {
  const { slug } = await params;
  const value = deslugify(slug) || slug;
  const produse = await getProduseByculoare(value);
  return <FilteredPage type="culoare" value={value} produse={produse} />;
}

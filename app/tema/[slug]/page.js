import FilteredPage from "../../components/FilteredPage";
import { getProduseByTema, getAllTeme, slugify, deslugify } from "../../lib/produse";

export function generateStaticParams() {
  return getAllTeme().map(t => ({ slug: slugify(t) }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const value = deslugify(slug) || slug;
  return {
    title: `Stil ${value} | ArtyZawaz`,
    description: `Descoperă produsele ArtyZawaz cu stilul ${value}.`,
  };
}

export default async function TemaPage({ params }) {
  const { slug } = await params;
  const value = deslugify(slug) || slug;
  const produse = await getProduseByTema(value);
  return <FilteredPage type="tema" value={value} produse={produse} />;
}

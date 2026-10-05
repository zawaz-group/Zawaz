import Link from "next/link";
import PageShell, { PageHeading } from "../components/PageShell";
import { Heart } from "../components/icons";

export default function FavoritePage() {
  return (
    <PageShell>
      <PageHeading crumbs={[{ label: "Acasă", href: "/" }, { label: "Favorite" }]} title="Produsele" accent="favorite" center />
      <div className="flex flex-col items-center gap-4 pt-12 text-center">
        <Heart className="h-14 w-14 text-gold/60" strokeWidth={1.2} />
        <p className="text-[0.9375rem] text-white/70">Nu ai salvat încă niciun produs la favorite.</p>
        <Link href="/produse" className="btn-gold h-11 px-8 text-[0.8125rem] uppercase tracking-[0.08em]">
          Descoperă produse
        </Link>
      </div>
    </PageShell>
  );
}

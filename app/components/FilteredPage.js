import Link from "next/link";
import PageShell, { PageHeading } from "./PageShell";
import ProdusCard from "./ProdusCard";
import { COLOR_MAP, GRADIENT_NEGRU_ALB, esteGradient } from "../lib/culori";

const TIPURI = { culoare: "Culoare", tema: "Temă", ocazie: "Ocazie" };

export default function FilteredPage({ type, value, produse }) {
  const tip = TIPURI[type] || type;

  const titlu =
    type === "culoare" ? { title: "Produse", accent: value } : type === "tema" ? { title: "Stil", accent: value } : { title: "", accent: value };

  const bulina = type === "culoare" ? (esteGradient(value) ? GRADIENT_NEGRU_ALB : COLOR_MAP[value]) : null;

  return (
    <PageShell>
      {bulina && (
        <span
          aria-hidden
          className="mb-4 block h-12 w-12 rounded-full border border-white/30 shadow-[0_0.25rem_1rem_rgba(0,0,0,0.5)]"
          style={{ background: bulina }}
        />
      )}
      <PageHeading
        crumbs={[{ label: "Acasă", href: "/" }, { label: "Produse", href: "/produse" }, { label: `${tip}: ${value}` }]}
        title={titlu.title}
        accent={titlu.accent}
        description={`${produse.length} ${produse.length === 1 ? "produs găsit" : "produse găsite"}`}
      />

      <div className="mt-8 lg:mt-[2.4vw]">
        {produse.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-[1.125rem] font-semibold text-white/80">Niciun produs găsit.</p>
            <Link href="/produse" className="btn-gold mt-5 h-11 px-7 text-[0.875rem]">
              Vezi toate produsele
            </Link>
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-x-4 gap-y-7 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-[1.3vw] lg:gap-y-[2.4vw]">
            {produse.map(p => (
              <li key={p.id}>
                <ProdusCard produs={p} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </PageShell>
  );
}

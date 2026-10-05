"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PageShell, { PageHeading } from "./PageShell";
import ProdusCard from "./ProdusCard";
import { ChipLink } from "./Chip";
import { ChevronDown } from "./icons";

const SUBCATEGORII = [
  { slug: "pentru-ia", label: "Pentru ia" },
  { slug: "pentru-el", label: "Pentru el" },
  { slug: "zile-de-nastere", label: "Zile de naștere" },
  { slug: "pentru-copii", label: "Pentru copii" },
  { slug: "primavara", label: "Primăvară" },
  { slug: "valentine-day", label: "Valentine Day" },
  { slug: "zile-speciale", label: "Zile speciale" },
];

const ETICHETE = {
  populare: "Best Seller",
  reduceri: "Reduceri",
  "produse-noi": "Produse noi",
  stative: "Stative",
  pusculite: "Pușculițe",
};

// Best Seller si Reduceri primesc subcategoriile intr-o coloana laterala, ca
// pe un catalog. Restul paginilor care refolosesc acest template (fete,
// baieti, sport, copii, femei, barbati, produse-noi) raman cu randul simplu
// de pastile de deasupra grilei.
const CU_SIDEBAR = ["populare", "reduceri"];

function eticheta(slug) {
  return ETICHETE[slug] || (slug.charAt(0).toUpperCase() + slug.slice(1)).replace(/-/g, " ");
}

export default function CategorieTemplate({ slug }) {
  const searchParams = useSearchParams();
  const categorieActiva = searchParams.get("categorie");
  const areSidebar = CU_SIDEBAR.includes(slug);

  const [toateProdusele, setToateProdusele] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtreDeschise, setFiltreDeschise] = useState(false);

  useEffect(() => {
    fetch("/api/produse")
      .then(r => r.json())
      .then(data => {
        const all = Array.isArray(data) ? data : [];
        // "produse-noi", "populare", "reduceri", "sport" etc. sunt taguri, nu
        // categorii: filtrarea doar dupa p.category lasa acele pagini goale.
        // Aceeasi regula ca in lib/produse.js getProduseByCategorie.
        setToateProdusele(
          slug === "copii"
            ? all.filter(p => p.tags?.includes("fete") || p.tags?.includes("baieti"))
            : all.filter(p => p.tags?.includes(slug) || p.category === slug)
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const produse = categorieActiva
    ? toateProdusele.filter(p => p.tags?.includes(categorieActiva) || p.subcategorie === categorieActiva)
    : toateProdusele;

  const produseAfisate = produse.length > 0 ? produse : (categorieActiva ? toateProdusele : []);
  const subcategorieLabel = SUBCATEGORII.find(s => s.slug === categorieActiva)?.label;

  const titlu = subcategorieLabel || eticheta(slug);
  const cuvinte = titlu.split(" ");
  const accent = cuvinte.pop();

  const pastile = (vertical) => (
    <div className={vertical ? "flex flex-col gap-2" : "flex flex-wrap gap-2.5"}>
      <ChipLink href={`/${slug}`} active={!categorieActiva} className={vertical ? "justify-start" : ""}>Toate</ChipLink>
      {SUBCATEGORII.map(s => (
        <ChipLink key={s.slug} href={`/${slug}?categorie=${s.slug}`} active={categorieActiva === s.slug} className={vertical ? "justify-start" : ""}>
          {s.label}
        </ChipLink>
      ))}
    </div>
  );

  const grid = loading ? (
    <div className="grid grid-cols-2 gap-x-4 gap-y-7 md:grid-cols-3 lg:gap-x-[1.3vw] lg:gap-y-[2.4vw] xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="aspect-[1336/1096] animate-pulse rounded-xl bg-forest-950/60" />
      ))}
    </div>
  ) : produseAfisate.length === 0 ? (
    <p className="py-16 text-center text-[1.0625rem] text-white/70">Nu există produse în această categorie momentan.</p>
  ) : (
    <ul className={`grid grid-cols-2 gap-x-4 gap-y-7 md:grid-cols-3 lg:gap-x-[1.3vw] lg:gap-y-[2.4vw] ${areSidebar ? "xl:grid-cols-4" : "lg:grid-cols-4"}`}>
      {produseAfisate.map(p => (
        <li key={p.id}>
          <ProdusCard produs={p} />
        </li>
      ))}
    </ul>
  );

  return (
    <PageShell>
      <PageHeading
        crumbs={[{ label: "Acasă", href: "/" }, { label: titlu }]}
        title={cuvinte.join(" ")}
        accent={accent}
        description={loading ? "Se încarcă…" : `${produseAfisate.length} ${produseAfisate.length === 1 ? "produs" : "produse"}`}
      />

      <div className="mt-8 lg:mt-[2.4vw]">
        {areSidebar ? (
          <div className="grid gap-6 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-[2vw]">
            <aside>
              <button
                type="button"
                onClick={() => setFiltreDeschise(o => !o)}
                aria-expanded={filtreDeschise}
                className="btn-outline h-11 w-full justify-between px-5 text-[0.875rem] lg:hidden"
              >
                <span>{filtreDeschise ? "Ascunde subcategoriile" : "Subcategorii"}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${filtreDeschise ? "rotate-180" : ""}`} />
              </button>
              <div className={`${filtreDeschise ? "block" : "hidden"} pt-5 lg:block lg:rounded-2xl lg:border lg:border-gold/20 lg:bg-forest-950/60 lg:p-5 lg:backdrop-blur-sm`}>
                <p className="mb-3 text-[0.75rem] font-extrabold uppercase tracking-[0.14em] text-gold-bright">Subcategorie</p>
                {pastile(true)}
              </div>
            </aside>
            <div className="min-w-0">{grid}</div>
          </div>
        ) : (
          <>
            <div className="mb-8">{pastile(false)}</div>
            {grid}
          </>
        )}
      </div>
    </PageShell>
  );
}

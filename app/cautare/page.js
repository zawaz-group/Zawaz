"use client";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PageShell, { PageHeading } from "../components/PageShell";
import ProdusCard from "../components/ProdusCard";
import { Search } from "../components/icons";

export default function CautarePage() {
  return (
    <Suspense>
      <CautareDinAdresa />
    </Suspense>
  );
}

// Casuta de cautare din header trimite aici cu ?q=... Cheia remonteaza formularul
// cand se schimba termenul din adresa (aceeasi ruta, deci altfel starea ar ramane veche).
function CautareDinAdresa() {
  const q = useSearchParams().get("q") ?? "";
  return <CautareContent key={q} initial={q} />;
}

function CautareContent({ initial }) {
  const [query, setQuery] = useState(initial);
  const [toateProdusele, setToateProdusele] = useState([]);

  useEffect(() => {
    fetch("/api/produse").then(r => r.json()).then(data => setToateProdusele(Array.isArray(data) ? data : [])).catch(() => {});
  }, []);

  const q = query.trim().toLowerCase();
  const rezultate = q.length > 1
    ? toateProdusele.filter(p =>
        p.name?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.tags?.some(t => t.toLowerCase().includes(q))
      )
    : [];

  return (
    <PageShell>
      <PageHeading crumbs={[{ label: "Acasă", href: "/" }, { label: "Căutare" }]} title="Caută" accent="produse" center />

      <div className="relative mx-auto mb-12 mt-8 max-w-[35rem]">
        <input
          type="search"
          autoFocus
          aria-label="Caută produse"
          placeholder="Caută după nume, categorie..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="field h-14 rounded-full pl-6 pr-14 text-[1rem]"
        />
        <Search className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gold-bright" />
      </div>

      <div aria-live="polite">
        {q.length > 1 && rezultate.length === 0 && (
          <p className="text-center text-[0.9375rem] text-white/70">Niciun produs găsit pentru „{query}”.</p>
        )}

        {rezultate.length > 0 && (
          <>
            <p className="mb-6 text-[0.8125rem] text-white/60">{rezultate.length} {rezultate.length === 1 ? "produs găsit" : "produse găsite"}</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-7 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-[1.3vw] lg:gap-y-[2.4vw]">
              {rezultate.map(p => (
                <li key={p.id}>
                  <ProdusCard produs={p} />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {q.length <= 1 && (
        <div className="mt-14 text-center text-white/60">
          <Search className="mx-auto h-12 w-12 text-gold/50" strokeWidth={1.2} />
          <p className="mt-4 text-[0.9375rem]">Introdu cel puțin 2 caractere pentru a căuta</p>
        </div>
      )}
    </PageShell>
  );
}

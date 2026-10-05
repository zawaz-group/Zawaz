"use client";
import { Suspense, useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import PageShell, { PageHeading } from "../components/PageShell";
import ProdusCard from "../components/ProdusCard";
import { ChipButton } from "../components/Chip";
import { Check, ChevronDown } from "../components/icons";
import { listeReunite, tipuriCunoscute } from "../lib/optiuni";
import { esteGradient, esteCuloareDeschisa, GRADIENT_NEGRU_ALB } from "../lib/culori";

/*
 * Catalogul complet, tinta butonului "Vezi toate produsele" din prima pagina.
 * Filtrele se construiesc din produsele primite, nu dintr-o lista
 * fixa: daca in admin apare o culoare sau o tema noua, apare si aici, fara
 * modificari in cod.
 */

const SORTARI = [
  { val: "recomandate", label: "Recomandate" },
  { val: "pret-crescator", label: "Preț crescător" },
  { val: "pret-descrescator", label: "Preț descrescător" },
  { val: "nume", label: "Nume A–Z" },
];

/* Categoria descrie tipul produsului, si sunt doar doua. Restul valorilor din
   p.category (fete, baieti, sport) descriu cui i se potriveste produsul, nu ce
   este, asa ca apar la Tema. */
const CATEGORII_LABEL = {
  stative: "Stative",
  pusculite: "Pușculițe",
};

/* Optiuni de tema care nu vin din p.tema, ci din categoria sau tagurile
   produsului. "Sport" apare in ambele locuri, deci ramane o singura optiune
   care le prinde pe amandoua — altfel s-ar dubla in lista. */
const TEME_DIN_CATEGORIE = { fete: "Fete", baieti: "Băieți", sport: "Sport" };

function potrivesteTema(p, tema) {
  if (p.tema?.includes(tema)) return true;
  const slug = Object.keys(TEME_DIN_CATEGORIE).find(k => TEME_DIN_CATEGORIE[k] === tema);
  return slug ? p.category === slug || !!p.tags?.includes(slug) : false;
}

const titluFiltru = "mb-2.5 text-[0.75rem] font-extrabold uppercase tracking-[0.14em] text-gold-bright";

/* Culorile se aleg din buline, nu din pastile cu text — la fel ca pe fisa
   produsului. Primesc {nume, hex} din optiunile definite in admin. */
function FiltruCulori({ culori, selectate, onToggle }) {
  if (culori.length === 0) return null;
  return (
    <div>
      <p className={titluFiltru}>Culoare</p>
      <div className="flex flex-wrap gap-2.5">
        {culori.map(({ nume, hex }) => {
          const activ = selectate.includes(nume);
          const fundal = esteGradient(nume) ? GRADIENT_NEGRU_ALB : hex;
          return (
            <button
              key={nume}
              type="button"
              onClick={() => onToggle(nume)}
              title={nume}
              aria-label={nume}
              aria-pressed={activ}
              style={{ background: fundal || "transparent" }}
              className={`grid h-8 w-8 cursor-pointer place-items-center rounded-full border p-0 text-[0.5625rem] font-bold text-white/70 outline-2 outline-offset-2 transition-[outline-color] ${
                fundal ? "border-white/30" : "border-white/40"
              } ${activ ? "outline-gold-bright" : "outline-transparent"}`}
            >
              {!fundal ? nume.slice(0, 3) : activ && <Check className={`h-3.5 w-3.5 ${esteCuloareDeschisa(nume) ? "text-forest-950" : "text-white"}`} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function GrupFiltre({ titlu, optiuni, selectate, onToggle, eticheta }) {
  if (optiuni.length === 0) return null;
  return (
    <div>
      <p className={titluFiltru}>{titlu}</p>
      <div className="flex flex-wrap gap-2">
        {optiuni.map(opt => {
          const activ = selectate.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onToggle(opt)}
              aria-pressed={activ}
              className={`rounded-full border px-3 py-1.5 text-[0.75rem] font-semibold transition ${
                activ
                  ? "border-gold-bright bg-gradient-to-b from-[#ffd868] to-[#e3a92a] text-forest-950"
                  : "border-gold/30 bg-forest-950/70 text-white hover:border-gold/70 hover:text-gold-bright"
              }`}
            >
              {eticheta ? eticheta(opt) : opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ProdusePage() {
  return (
    <Suspense>
      <ProdusePageContent />
    </Suspense>
  );
}

function ProdusePageContent() {
  const searchParams = useSearchParams();

  const [toate, setToate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eroare, setEroare] = useState(false);

  // Optiunile definite in admin (tipuri de produs, culori/teme/ocazii pe tip).
  // Filtrele de mai jos se construiesc din ele, nu din valorile brute gasite
  // pe produse: unele produse vechi au in p.category taguri ramase dintr-un
  // catalog anterior (fete/baieti/sport), care nu sunt tipuri de produs.
  const [optiuni, setOptiuni] = useState(null);
  useEffect(() => {
    fetch("/api/optiuni").then(r => r.json()).then(setOptiuni).catch(() => {});
  }, []);
  const tipuriCustom = optiuni?.tipuriProdus || [];
  const valoriTipCunoscute = useMemo(() => tipuriCunoscute(optiuni), [optiuni]);
  const etichetaCategorie = c => CATEGORII_LABEL[c] || tipuriCustom.find(t => t.value === c)?.label || c;

  // Header-ul trimite aici cu ?categorie=stative sau ?categorie=pusculite
  // (paginile dedicate /stative si /pusculite nu mai exista) — filtrul
  // porneste deja selectat, ca vizitatorul sa vada direct categoria aleasa.
  const [categorii, setCategorii] = useState(() => {
    const c = searchParams.get("categorie");
    return c && valoriTipCunoscute.includes(c) ? [c] : [];
  });
  // Meniul poate trimite si un filtru de culoare/tema/ocazie preselectat,
  // la fel ca la categorie.
  const [culori, setCulori] = useState(() => {
    const c = searchParams.get("culoare");
    return c ? [c] : [];
  });
  const [teme, setTeme] = useState(() => {
    const t = searchParams.get("tema");
    return t ? [t] : [];
  });
  const [ocazii, setOcazii] = useState(() => {
    const o = searchParams.get("ocazie");
    return o ? [o] : [];
  });

  const [subcategorii, setSubcategorii] = useState(() => {
    const sc = searchParams.get("subcategorie");
    return sc ? [sc] : [];
  });

  // Daca esti deja pe /produse si apesi o categorie din meniu, Next nu
  // remonteaza pagina (aceeasi ruta, doar query-ul se schimba) — fara acest
  // efect, useState de mai sus n-ar mai rula si filtrul ar ramane pe valoarea
  // veche pana la un refresh manual.
  //
  // Aplicam DOAR ce vine explicit in adresa. Un link fara ?categorie (de
  // exemplu "Toate produsele") nu sterge tipul deja ales — acesta ramane
  // pana cand vizitatorul il deselecteaza el insusi din filtre.
  useEffect(() => {
    const c = searchParams.get("categorie");
    if (c && valoriTipCunoscute.includes(c)) setCategorii([c]);
    const cu = searchParams.get("culoare");
    if (cu) setCulori([cu]);
    const te = searchParams.get("tema");
    if (te) setTeme([te]);
    const oc = searchParams.get("ocazie");
    if (oc) setOcazii([oc]);
    const sc = searchParams.get("subcategorie");
    if (sc) setSubcategorii([sc]);
  }, [searchParams, valoriTipCunoscute]);
  // Subcategoriile fiecarei categorii se creeaza din admin (colectia "categorii").
  const [detalii, setDetalii] = useState([]);
  useEffect(() => {
    fetch("/api/categorii").then(r => r.json()).then(d => setDetalii(Array.isArray(d) ? d : [])).catch(() => {});
  }, []);
  const [pretMax, setPretMax] = useState(null);
  const [sortare, setSortare] = useState("recomandate");
  const [filtreDeschise, setFiltreDeschise] = useState(false);

  useEffect(() => {
    fetch("/api/produse")
      .then(r => r.json())
      .then(data => {
        setToate(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => { setEroare(true); setLoading(false); });
  }, []);

  /* Filtrele de culoare / tema / ocazie vin din ce e definit in admin, nu din
     valorile gasite pe produse. Cand e ales un tip (Stative / Pușculițe),
     arata exact listele acelui tip; altfel, reuniunea tuturor tipurilor. */
  const listeAdmin = useMemo(() => {
    const tipuri = categorii.length > 0 ? categorii : valoriTipCunoscute;
    return listeReunite(optiuni, tipuri);
  }, [optiuni, categorii, valoriTipCunoscute]);

  const optiuniFiltre = useMemo(() => {
    // stative/pusculite + orice "Tip produs" custom creat din admin — nu
    // orice valoare bruta din p.category (unele produse vechi au acolo
    // taguri ramase dintr-un catalog anterior, ex. fete/baieti/sport).
    const categoriiGasite = new Set(toate.map(p => p.category).filter(Boolean));
    return {
      categorii: [...categoriiGasite].filter(c => valoriTipCunoscute.includes(c)).sort((a, b) => a.localeCompare(b, "ro")),
      culori: listeAdmin.culori,
      teme: [...listeAdmin.teme].sort((a, b) => a.localeCompare(b, "ro")),
      ocazii: [...listeAdmin.ocazii].sort((a, b) => a.localeCompare(b, "ro")),
    };
  }, [toate, valoriTipCunoscute, listeAdmin]);

  const limitePret = useMemo(() => {
    if (toate.length === 0) return { min: 0, max: 0 };
    const preturi = toate.map(p => p.price);
    return { min: Math.min(...preturi), max: Math.max(...preturi) };
  }, [toate]);

  /* pretMax === null inseamna "fara plafon". Tinem starea asa, in loc s-o
     initializam din date printr-un effect: nu depinde de momentul in care
     ajung produsele si nu declanseaza un al doilea render dupa fetch. */

  const toggle = (setter) => (val) =>
    setter(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);

  const reseteaza = () => {
    setCategorii([]); setSubcategorii([]); setCulori([]); setTeme([]); setOcazii([]);
    setPretMax(null); setSortare("recomandate");
  };

  const areFiltre = categorii.length || subcategorii.length || culori.length || teme.length || ocazii.length
    || (pretMax !== null && pretMax < limitePret.max);

  const rezultate = useMemo(() => {
    // Intre grupuri filtrele se aduna (categorie SI culoare), in interiorul
    // unui grup se aduna alternativele (rosu SAU verde) — altfel doua culori
    // selectate n-ar returna niciodata nimic.
    const lista = toate.filter(p => {
      if (categorii.length && !categorii.includes(p.category)) return false;
      if (subcategorii.length && !subcategorii.includes(p.subcategorie)) return false;
      if (culori.length && !culori.some(c => p.culori?.includes(c))) return false;
      if (teme.length && !teme.some(t => potrivesteTema(p, t))) return false;
      if (ocazii.length && !ocazii.some(o => p.ocazie?.includes(o))) return false;
      if (pretMax !== null && p.price > pretMax) return false;
      return true;
    });

    const sortat = [...lista];
    if (sortare === "pret-crescator") sortat.sort((a, b) => a.price - b.price);
    else if (sortare === "pret-descrescator") sortat.sort((a, b) => b.price - a.price);
    else if (sortare === "nume") sortat.sort((a, b) => a.name.localeCompare(b.name, "ro"));
    return sortat;
  }, [toate, categorii, subcategorii, culori, teme, ocazii, pretMax, sortare]);

  const panouFiltre = (
    <div className="space-y-6">
      {optiuniFiltre.categorii.length > 1 && (
        <GrupFiltre titlu="Categorie" optiuni={optiuniFiltre.categorii} selectate={categorii} onToggle={toggle(setCategorii)} eticheta={etichetaCategorie} />
      )}
      <FiltruCulori culori={optiuniFiltre.culori} selectate={culori} onToggle={toggle(setCulori)} />
      <GrupFiltre titlu="Temă" optiuni={optiuniFiltre.teme} selectate={teme} onToggle={toggle(setTeme)} />
      <GrupFiltre titlu="Ocazie" optiuni={optiuniFiltre.ocazii} selectate={ocazii} onToggle={toggle(setOcazii)} />

      {limitePret.max > limitePret.min && (
        <div>
          <p className={titluFiltru}>Preț maxim</p>
          <input
            type="range"
            min={limitePret.min}
            max={limitePret.max}
            value={pretMax ?? limitePret.max}
            onChange={e => setPretMax(Number(e.target.value))}
            className="w-full cursor-pointer accent-[#f4c84a]"
            aria-label="Preț maxim"
          />
          <p className="mt-1.5 text-[0.875rem] text-white/70">
            până la <strong className="text-gold-bright">{(pretMax ?? limitePret.max).toLocaleString("ro-RO")} lei</strong>
          </p>
        </div>
      )}

      {areFiltre ? (
        <button type="button" onClick={reseteaza} className="btn-outline h-9 px-5 text-[0.8125rem]">
          Șterge filtrele
        </button>
      ) : null}
    </div>
  );

  // Pastilele din design = subcategoriile categoriilor alese (sau ale tuturor, daca nu e aleasa
  // niciuna). O subcategorie fara produse nu apare. Celelalte filtre (categorie, culoare, tema,
  // ocazie, pret) sunt sub "Mai multe filtre", doar cand au optiuni.
  const categoriiAlese = categorii.length > 0 ? categorii : valoriTipCunoscute;
  const subcategoriiVizibile = [];
  for (const slug of categoriiAlese) {
    for (const sub of detalii.find(d => d.slug === slug)?.subcategorii || []) {
      if (!subcategoriiVizibile.includes(sub) && toate.some(p => p.category === slug && p.subcategorie === sub)) subcategoriiVizibile.push(sub);
    }
  }
  const chips = [{ id: "toate", label: "Toate" }, ...subcategoriiVizibile.map(t => ({ id: t, label: t }))];
  const areFiltreExtra = optiuniFiltre.categorii.length > 1 || optiuniFiltre.culori.length > 0 || optiuniFiltre.teme.length > 0 || optiuniFiltre.ocazii.length > 0 || limitePret.max > limitePret.min;

  return (
    <PageShell>
      <PageHeading
        crumbs={[{ label: "Acasă", href: "/" }, { label: "Produse" }]}
        title="Toate"
        accent="produsele"
        description="Pușculițe unice, realizate din materiale premium, cu design modern și detalii distinctive."
      />

      <div className="mt-8 lg:mt-[2.4vw]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="Filtrează după subcategorie" className="flex flex-wrap gap-2.5 lg:gap-[0.7vw]">
            {chips.map(c => (
              <ChipButton
                key={c.id}
                active={c.id === "toate" ? subcategorii.length === 0 : subcategorii.includes(c.id)}
                onClick={() => (c.id === "toate" ? setSubcategorii([]) : toggle(setSubcategorii)(c.id))}
              >
                {c.label}
              </ChipButton>
            ))}
          </div>

          <label className="relative flex items-center gap-3 text-[0.8125rem] text-white/70 lg:text-[max(13px,0.9vw)]">
            <span className="whitespace-nowrap">Sortează:</span>
            <select
              value={sortare}
              onChange={e => setSortare(e.target.value)}
              className="cursor-pointer appearance-none rounded-full border border-gold/30 bg-forest-950/80 py-2 pl-4 pr-10 font-semibold text-white outline-none transition hover:border-gold/70 focus:border-gold-bright lg:py-[0.5vw] lg:pl-[1.2vw] lg:pr-[2.6vw]"
            >
              {SORTARI.map(s => <option key={s.val} value={s.val} className="bg-forest-950">{s.label}</option>)}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-gold-bright" />
          </label>
        </div>

        <p className="mt-5 text-[0.8125rem] text-white/60 lg:text-[max(13px,0.85vw)]" aria-live="polite">
          {loading ? "Se încarcă…" : `${rezultate.length} ${rezultate.length === 1 ? "produs" : "produse"}`}
          {!loading && rezultate.length !== toate.length ? ` din ${toate.length}` : ""}
        </p>

        {areFiltreExtra && (
          <div className="mt-4">
            <button type="button" onClick={() => setFiltreDeschise(o => !o)} aria-expanded={filtreDeschise} className="btn-outline h-10 gap-2 px-5 text-[0.8125rem]">
              {filtreDeschise ? "Ascunde filtrele" : "Mai multe filtre"}{areFiltre ? " •" : ""}
              <ChevronDown className={`h-4 w-4 transition-transform ${filtreDeschise ? "rotate-180" : ""}`} />
            </button>
            {filtreDeschise && <div className="mt-4 rounded-2xl border border-gold/20 bg-forest-950/60 p-5 backdrop-blur-sm">{panouFiltre}</div>}
          </div>
        )}

        <div className="mt-6">
          <div className="min-w-0">
            {eroare ? (
              <p className="text-[0.9375rem] text-white/70">Produsele nu au putut fi încărcate. Reîncarcă pagina.</p>
            ) : loading ? (
              <div className="grid grid-cols-2 gap-x-4 gap-y-7 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-[1.3vw] lg:gap-y-[2.4vw]">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="aspect-[1336/1096] animate-pulse rounded-xl bg-forest-950/60" />
                ))}
              </div>
            ) : rezultate.length === 0 ? (
              <div className="py-12">
                <p className="mb-2 text-[1rem] font-bold text-white">Niciun produs nu corespunde filtrelor</p>
                <p className="mb-5 text-[0.875rem] text-white/70">Încearcă să elimini câteva criterii.</p>
                <button type="button" onClick={reseteaza} className="btn-gold h-10 px-6 text-[0.8125rem]">
                  Șterge filtrele
                </button>
              </div>
            ) : (
              <ul className="grid grid-cols-2 gap-x-4 gap-y-7 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-[1.3vw] lg:gap-y-[2.4vw]">
                {rezultate.map(p => (
                  <li key={p.id}>
                    <ProdusCard produs={p} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

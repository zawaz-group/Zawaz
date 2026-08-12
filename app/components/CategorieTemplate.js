"use client";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import NavBar from "./NavBar";
import Footer from "./Footer";
import ProdusCard from "./ProdusCard";

const SUBCATEGORII = [
  { slug: "pentru-ia", label: "Pentru ia" },
  { slug: "pentru-el", label: "Pentru el" },
  { slug: "zile-de-nastere", label: "Zile de naștere" },
  { slug: "pentru-copii", label: "Pentru copii" },
  { slug: "primavara", label: "Primăvară" },
  { slug: "valentine-day", label: "Valentine Day" },
  { slug: "zile-speciale", label: "Zile speciale" },
];

const SORTARI = [
  { val: "recomandate", label: "Recomandate" },
  { val: "pret-crescator", label: "Preț crescător" },
  { val: "pret-descrescator", label: "Preț descrescător" },
  { val: "nume", label: "Nume A–Z" },
];

// Pușculițe și stative sunt cele doua categorii principale de produse (ca in
// catalogul /produse) — doar acolo are sens panoul complet de filtre pe
// culoare/tema/ocazie. Restul paginilor care refolosesc acest template
// (fete, baieti, sport, populare, produse-noi, reduceri) sunt colectii mai
// inguste, unde randul simplu de subcategorii ramane suficient.
const CATEGORII_CU_FILTRE = ["stative", "pusculate"];

function unice(produse, camp) {
  const set = new Set();
  for (const p of produse) {
    const v = p[camp];
    if (Array.isArray(v)) v.forEach(x => x && set.add(x));
    else if (v) set.add(v);
  }
  return [...set].sort((a, b) => a.localeCompare(b, "ro"));
}

function GrupFiltre({ titlu, optiuni, selectate, onToggle }) {
  if (optiuni.length === 0) return null;
  return (
    <div style={{ marginBottom: 26 }}>
      <p style={{ fontSize: 13, fontWeight: 800, color: "#1D2820", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
        {titlu}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {optiuni.map(opt => {
          const activ = selectate.includes(opt);
          return (
            <button
              key={opt}
              onClick={() => onToggle(opt)}
              aria-pressed={activ}
              style={{
                padding: "7px 14px", borderRadius: 999, cursor: "pointer",
                fontSize: 13, fontWeight: 600, transition: "all 0.18s",
                border: "1.5px solid " + (activ ? "#2C662D" : "#DCE4D9"),
                background: activ ? "#2C662D" : "transparent",
                color: activ ? "#fff" : "#5D695F",
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function CategorieTemplate({ slug }) {
  const searchParams = useSearchParams();
  const categorieActiva = searchParams.get("categorie");
  const areFiltreExtinse = CATEGORII_CU_FILTRE.includes(slug);

  const [toateProdusele, setToateProdusele] = useState([]);
  const [loading, setLoading] = useState(true);

  const [culori, setCulori] = useState([]);
  const [teme, setTeme] = useState([]);
  const [ocazii, setOcazii] = useState([]);
  const [pretMax, setPretMax] = useState(null);
  const [sortare, setSortare] = useState("recomandate");
  const [filtreDeschise, setFiltreDeschise] = useState(false);

  useEffect(() => {
    fetch("/api/produse")
      .then(r => r.json())
      .then(all => {
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

  const produseSubcategorie = categorieActiva
    ? toateProdusele.filter(p => p.tags?.includes(categorieActiva) || p.subcategorie === categorieActiva)
    : toateProdusele;

  const produseDeBaza = produseSubcategorie.length > 0 ? produseSubcategorie : (categorieActiva ? toateProdusele : []);
  const subcategorieLabel = SUBCATEGORII.find(s => s.slug === categorieActiva)?.label;

  const optiuni = useMemo(() => ({
    culori: unice(produseDeBaza, "culori"),
    teme: unice(produseDeBaza, "tema"),
    ocazii: unice(produseDeBaza, "ocazie"),
  }), [produseDeBaza]);

  const limitePret = useMemo(() => {
    if (produseDeBaza.length === 0) return { min: 0, max: 0 };
    const preturi = produseDeBaza.map(p => p.price);
    return { min: Math.min(...preturi), max: Math.max(...preturi) };
  }, [produseDeBaza]);

  const toggle = (setter) => (val) =>
    setter(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);

  const reseteaza = () => {
    setCulori([]); setTeme([]); setOcazii([]);
    setPretMax(null); setSortare("recomandate");
  };

  const areFiltreActive = culori.length || teme.length || ocazii.length
    || (pretMax !== null && pretMax < limitePret.max);

  const produseAfisate = useMemo(() => {
    if (!areFiltreExtinse) return produseDeBaza;

    const lista = produseDeBaza.filter(p => {
      if (culori.length && !culori.some(c => p.culori?.includes(c))) return false;
      if (teme.length && !teme.some(t => p.tema?.includes(t))) return false;
      if (ocazii.length && !ocazii.some(o => p.ocazie?.includes(o))) return false;
      if (pretMax !== null && p.price > pretMax) return false;
      return true;
    });

    const sortat = [...lista];
    if (sortare === "pret-crescator") sortat.sort((a, b) => a.price - b.price);
    else if (sortare === "pret-descrescator") sortat.sort((a, b) => b.price - a.price);
    else if (sortare === "nume") sortat.sort((a, b) => a.name.localeCompare(b.name, "ro"));
    return sortat;
  }, [produseDeBaza, areFiltreExtinse, culori, teme, ocazii, pretMax, sortare]);

  const titlu = subcategorieLabel || (slug === "pusculate" ? "Pușculițe" : slug.charAt(0).toUpperCase() + slug.slice(1));

  const subcategoriiPills = (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: areFiltreExtinse ? 26 : 40 }}>
      <Link href={`/${slug}`}
        style={{
          padding: "7px 18px", borderRadius: 999, fontSize: 13, fontWeight: 600,
          background: !categorieActiva ? "#2C662D" : "#EEF2EC",
          color: !categorieActiva ? "#fff" : "#5D695F",
          textDecoration: "none", transition: "all 0.2s",
        }}
      >Toate</Link>
      {SUBCATEGORII.map(s => (
        <Link key={s.slug} href={`/${slug}?categorie=${s.slug}`}
          style={{
            padding: "7px 18px", borderRadius: 999, fontSize: 13, fontWeight: 600,
            background: categorieActiva === s.slug ? "#2C662D" : "#EEF2EC",
            color: categorieActiva === s.slug ? "#fff" : "#5D695F",
            textDecoration: "none", transition: "all 0.2s",
          }}
        >{s.label}</Link>
      ))}
    </div>
  );

  const panouFiltre = (
    <>
      <p style={{ fontSize: 13, fontWeight: 800, color: "#1D2820", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
        Categorie
      </p>
      {subcategoriiPills}
      <GrupFiltre titlu="Culoare" optiuni={optiuni.culori} selectate={culori} onToggle={toggle(setCulori)} />
      <GrupFiltre titlu="Temă" optiuni={optiuni.teme} selectate={teme} onToggle={toggle(setTeme)} />
      <GrupFiltre titlu="Ocazie" optiuni={optiuni.ocazii} selectate={ocazii} onToggle={toggle(setOcazii)} />

      {limitePret.max > limitePret.min && (
        <div style={{ marginBottom: 26 }}>
          <p style={{ fontSize: 13, fontWeight: 800, color: "#1D2820", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Preț maxim
          </p>
          <input
            type="range"
            min={limitePret.min}
            max={limitePret.max}
            value={pretMax ?? limitePret.max}
            onChange={e => setPretMax(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#2C662D", cursor: "pointer" }}
            aria-label="Preț maxim"
          />
          <p style={{ fontSize: 14, color: "#5D695F", margin: "6px 0 0" }}>
            până la <strong style={{ color: "#1D2820" }}>{(pretMax ?? limitePret.max).toLocaleString("ro-RO")} lei</strong>
          </p>
        </div>
      )}

      {areFiltreActive ? (
        <button
          onClick={reseteaza}
          style={{
            padding: "9px 18px", borderRadius: 999, cursor: "pointer",
            border: "1.5px solid #DCE4D9", background: "transparent",
            fontSize: 13, fontWeight: 700, color: "#5D695F",
          }}
        >
          Șterge filtrele
        </button>
      ) : null}
    </>
  );

  return (
    <div style={{ background: "#F7F7F4", minHeight: "100vh" }}>
      <NavBar />

      <section style={{ padding: "var(--section-padding)" }} className="page-content-top">
        <div style={{ maxWidth: "var(--container-inner)", margin: "0 auto" }}>

          <h1 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 6px", letterSpacing: "0.01em" }}>
            {titlu}
          </h1>
          <p style={{ fontSize: 14, color: "#5D695F", marginBottom: 32 }}>
            {loading ? "Se încarcă..." : `${produseAfisate.length} produse`}
          </p>

          {areFiltreExtinse ? (
            <div className="catalog-layout">
              <aside className="catalog-filtre">
                <button
                  className="catalog-filtre-toggle"
                  onClick={() => setFiltreDeschise(o => !o)}
                  aria-expanded={filtreDeschise}
                >
                  {filtreDeschise ? "Ascunde filtrele" : "Filtre"}
                  {areFiltreActive ? " •" : ""}
                </button>
                <div className={filtreDeschise ? "catalog-filtre-corp deschis" : "catalog-filtre-corp"}>
                  {panouFiltre}
                </div>
              </aside>

              <div style={{ minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 18 }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#5D695F" }}>
                    Sortează:
                    <select
                      value={sortare}
                      onChange={e => setSortare(e.target.value)}
                      style={{
                        padding: "8px 12px", borderRadius: 10, border: "1.5px solid #DCE4D9",
                        background: "#fff", fontSize: 13, fontWeight: 600, color: "#1D2820", cursor: "pointer",
                      }}
                    >
                      {SORTARI.map(s => <option key={s.val} value={s.val}>{s.label}</option>)}
                    </select>
                  </label>
                </div>

                {loading ? (
                  <div className="catalog-grid">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} style={{ borderRadius: 14, background: "#EEF2EC", aspectRatio: "1 / 1.35" }} />
                    ))}
                  </div>
                ) : produseAfisate.length === 0 ? (
                  <div style={{ padding: "48px 0" }}>
                    <p style={{ fontSize: 16, fontWeight: 700, color: "#1D2820", margin: "0 0 8px" }}>
                      Niciun produs nu corespunde filtrelor
                    </p>
                    <p style={{ fontSize: 14, color: "#5D695F", margin: "0 0 18px" }}>
                      Încearcă să elimini câteva criterii.
                    </p>
                    {areFiltreActive && (
                      <button
                        onClick={reseteaza}
                        style={{
                          padding: "10px 20px", borderRadius: 999, cursor: "pointer", border: "none",
                          background: "#2C662D", color: "#fff", fontSize: 13, fontWeight: 700,
                        }}
                      >
                        Șterge filtrele
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="catalog-grid">
                    {produseAfisate.map(p => <ProdusCard key={p.id} produs={p} />)}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              {subcategoriiPills}

              {loading ? (
                <div style={{ textAlign: "center", padding: "80px 0", color: "#5D695F", fontSize: 18 }}>Se încarcă...</div>
              ) : produseAfisate.length === 0 ? (
                <p style={{ textAlign: "center", color: "#5D695F", fontSize: 18, padding: "80px 0" }}>
                  Nu există produse în această categorie momentan.
                </p>
              ) : (
                <div className="grid-3">
                  {produseAfisate.map(p => <ProdusCard key={p.id} produs={p} />)}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

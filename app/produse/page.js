"use client";
import { useState, useEffect, useMemo } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ProdusCard from "../components/ProdusCard";

/*
 * Catalogul complet, tinta butonului "Comandă acum" din bannerul de pe prima
 * pagina. Filtrele se construiesc din produsele primite, nu dintr-o lista
 * fixa: daca in admin apare o culoare sau o tema noua, apare si aici, fara
 * modificari in cod.
 */

const SORTARI = [
  { val: "recomandate", label: "Recomandate" },
  { val: "pret-crescator", label: "Preț crescător" },
  { val: "pret-descrescator", label: "Preț descrescător" },
  { val: "nume", label: "Nume A–Z" },
];

const CATEGORII_LABEL = {
  stative: "Stative",
  pusculate: "Pușculițe",
  fete: "Fete",
  baieti: "Băieți",
  sport: "Sport",
};

function unice(produse, camp) {
  const set = new Set();
  for (const p of produse) {
    const v = p[camp];
    if (Array.isArray(v)) v.forEach(x => x && set.add(x));
    else if (v) set.add(v);
  }
  return [...set].sort((a, b) => a.localeCompare(b, "ro"));
}

function GrupFiltre({ titlu, optiuni, selectate, onToggle, eticheta }) {
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
              {eticheta ? eticheta(opt) : opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ProdusePage() {
  const [toate, setToate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eroare, setEroare] = useState(false);

  const [categorii, setCategorii] = useState([]);
  const [culori, setCulori] = useState([]);
  const [teme, setTeme] = useState([]);
  const [ocazii, setOcazii] = useState([]);
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

  const optiuni = useMemo(() => ({
    categorii: unice(toate, "category"),
    culori: unice(toate, "culori"),
    teme: unice(toate, "tema"),
    ocazii: unice(toate, "ocazie"),
  }), [toate]);

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
    setCategorii([]); setCulori([]); setTeme([]); setOcazii([]);
    setPretMax(null); setSortare("recomandate");
  };

  const areFiltre = categorii.length || culori.length || teme.length || ocazii.length
    || (pretMax !== null && pretMax < limitePret.max);

  const rezultate = useMemo(() => {
    // Intre grupuri filtrele se aduna (categorie SI culoare), in interiorul
    // unui grup se aduna alternativele (rosu SAU verde) — altfel doua culori
    // selectate n-ar returna niciodata nimic.
    const lista = toate.filter(p => {
      if (categorii.length && !categorii.includes(p.category)) return false;
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
  }, [toate, categorii, culori, teme, ocazii, pretMax, sortare]);

  const panouFiltre = (
    <>
      <GrupFiltre
        titlu="Categorie" optiuni={optiuni.categorii} selectate={categorii}
        onToggle={toggle(setCategorii)}
        eticheta={c => CATEGORII_LABEL[c] || c}
      />
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

      {areFiltre ? (
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

          <h1 style={{ fontSize: "clamp(28px, 3.2vw, 40px)", fontWeight: 900, margin: "0 0 6px", color: "#1D2820" }}>
            Toate produsele
          </h1>
          <p style={{ fontSize: 14, color: "#5D695F", margin: "0 0 28px" }}>
            {loading ? "Se încarcă…" : `${rezultate.length} ${rezultate.length === 1 ? "produs" : "produse"}`}
            {!loading && rezultate.length !== toate.length ? ` din ${toate.length}` : ""}
          </p>

          <div className="catalog-layout">
            <aside className="catalog-filtre">
              <button
                className="catalog-filtre-toggle"
                onClick={() => setFiltreDeschise(o => !o)}
                aria-expanded={filtreDeschise}
              >
                {filtreDeschise ? "Ascunde filtrele" : "Filtre"}
                {areFiltre ? " •" : ""}
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

              {eroare ? (
                <p style={{ fontSize: 15, color: "#5D695F" }}>
                  Produsele nu au putut fi încărcate. Reîncarcă pagina.
                </p>
              ) : loading ? (
                <div className="catalog-grid">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} style={{ borderRadius: 14, background: "#EEF2EC", aspectRatio: "1 / 1.35" }} />
                  ))}
                </div>
              ) : rezultate.length === 0 ? (
                <div style={{ padding: "48px 0" }}>
                  <p style={{ fontSize: 16, fontWeight: 700, color: "#1D2820", margin: "0 0 8px" }}>
                    Niciun produs nu corespunde filtrelor
                  </p>
                  <p style={{ fontSize: 14, color: "#5D695F", margin: "0 0 18px" }}>
                    Încearcă să elimini câteva criterii.
                  </p>
                  <button
                    onClick={reseteaza}
                    style={{
                      padding: "10px 20px", borderRadius: 999, cursor: "pointer", border: "none",
                      background: "#2C662D", color: "#fff", fontSize: 13, fontWeight: 700,
                    }}
                  >
                    Șterge filtrele
                  </button>
                </div>
              ) : (
                <div className="catalog-grid">
                  {rezultate.map(p => <ProdusCard key={p.id} produs={p} />)}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

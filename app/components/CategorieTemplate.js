"use client";
import { useState, useEffect } from "react";
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

// Best Seller si Reduceri primesc subcategoriile intr-o coloana laterala, ca
// pe un catalog. Restul paginilor care refolosesc acest template (fete,
// baieti, sport, copii, femei, barbati, produse-noi) raman cu randul simplu
// de pastile de deasupra grilei.
const CU_SIDEBAR = ["populare", "reduceri"];

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

  const produse = categorieActiva
    ? toateProdusele.filter(p => p.tags?.includes(categorieActiva) || p.subcategorie === categorieActiva)
    : toateProdusele;

  const produseAfisate = produse.length > 0 ? produse : (categorieActiva ? toateProdusele : []);
  const subcategorieLabel = SUBCATEGORII.find(s => s.slug === categorieActiva)?.label;

  const pillStyle = (activ) => ({
    padding: "7px 18px", borderRadius: 999, fontSize: 13, fontWeight: 600,
    background: activ ? "#2C662D" : "#EEF2EC",
    color: activ ? "#fff" : "#5D695F",
    textDecoration: "none", transition: "all 0.2s",
  });

  const subcategoriiListaVerticala = (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Link href={`/${slug}`} style={{ ...pillStyle(!categorieActiva), textAlign: "left" }}>Toate</Link>
      {SUBCATEGORII.map(s => (
        <Link key={s.slug} href={`/${slug}?categorie=${s.slug}`} style={{ ...pillStyle(categorieActiva === s.slug), textAlign: "left" }}>
          {s.label}
        </Link>
      ))}
    </div>
  );

  const subcategoriiRandOrizontal = (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
      <Link href={`/${slug}`} style={pillStyle(!categorieActiva)}>Toate</Link>
      {SUBCATEGORII.map(s => (
        <Link key={s.slug} href={`/${slug}?categorie=${s.slug}`} style={pillStyle(categorieActiva === s.slug)}>
          {s.label}
        </Link>
      ))}
    </div>
  );

  const grid = loading ? (
    <div style={{ textAlign: "center", padding: "80px 0", color: "#5D695F", fontSize: 18 }}>Se încarcă...</div>
  ) : produseAfisate.length === 0 ? (
    <p style={{ textAlign: "center", color: "#5D695F", fontSize: 18, padding: "80px 0" }}>
      Nu există produse în această categorie momentan.
    </p>
  ) : (
    <div className={areSidebar ? "catalog-grid" : "grid-3"}>
      {produseAfisate.map(p => <ProdusCard key={p.id} produs={p} />)}
    </div>
  );

  return (
    <div style={{ background: "#F7F7F4", minHeight: "100vh" }}>
      <NavBar />

      <section style={{ padding: "var(--section-padding)" }} className="page-content-top">
        <div style={{ maxWidth: "var(--container-inner)", margin: "0 auto" }}>

          <h1 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 6px", letterSpacing: "0.01em" }}>
            {subcategorieLabel || slug.charAt(0).toUpperCase() + slug.slice(1)}
          </h1>
          <p style={{ fontSize: 14, color: "#5D695F", marginBottom: 32 }}>
            {loading ? "Se încarcă..." : `${produseAfisate.length} produse`}
          </p>

          {areSidebar ? (
            <div className="catalog-layout">
              <aside className="catalog-filtre">
                <button
                  className="catalog-filtre-toggle"
                  onClick={() => setFiltreDeschise(o => !o)}
                  aria-expanded={filtreDeschise}
                >
                  {filtreDeschise ? "Ascunde subcategoriile" : "Subcategorii"}
                </button>
                <div className={filtreDeschise ? "catalog-filtre-corp deschis" : "catalog-filtre-corp"}>
                  <p style={{ fontSize: 13, fontWeight: 800, color: "#1D2820", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Subcategorie
                  </p>
                  {subcategoriiListaVerticala}
                </div>
              </aside>

              <div style={{ minWidth: 0 }}>{grid}</div>
            </div>
          ) : (
            <>
              {subcategoriiRandOrizontal}
              {grid}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

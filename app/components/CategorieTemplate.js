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

export default function CategorieTemplate({ slug }) {
  const searchParams = useSearchParams();
  const categorieActiva = searchParams.get("categorie");

  const [toateProdusele, setToateProdusele] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/produse")
      .then(r => r.json())
      .then(all => {
        setToateProdusele(all.filter(p => p.category === slug));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const produse = categorieActiva
    ? toateProdusele.filter(p => p.tags?.includes(categorieActiva) || p.subcategorie === categorieActiva)
    : toateProdusele;

  const produseAfisate = produse.length > 0 ? produse : (categorieActiva ? toateProdusele : []);
  const subcategorieLabel = SUBCATEGORII.find(s => s.slug === categorieActiva)?.label;

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <NavBar />

      <section style={{ padding: "var(--section-padding)" }} className="page-content-top">
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>

          <h1 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 6px", letterSpacing: "0.01em" }}>
            {subcategorieLabel || (slug === "pusculate" ? "Pușculițe" : slug.charAt(0).toUpperCase() + slug.slice(1))}
          </h1>
          <p style={{ fontSize: 14, color: "#888", marginBottom: 32 }}>
            {loading ? "Se încarcă..." : `${produseAfisate.length} produse`}
          </p>

          {/* Filter pills */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
            <Link href={`/${slug}`}
              style={{
                padding: "7px 18px", borderRadius: 999, fontSize: 13, fontWeight: 600,
                background: !categorieActiva ? "#2B652C" : "#f5f3ef",
                color: !categorieActiva ? "#fff" : "#555",
                textDecoration: "none", transition: "all 0.2s",
              }}
            >Toate</Link>
            {SUBCATEGORII.map(s => (
              <Link key={s.slug} href={`/${slug}?categorie=${s.slug}`}
                style={{
                  padding: "7px 18px", borderRadius: 999, fontSize: 13, fontWeight: 600,
                  background: categorieActiva === s.slug ? "#2B652C" : "#f5f3ef",
                  color: categorieActiva === s.slug ? "#fff" : "#555",
                  textDecoration: "none", transition: "all 0.2s",
                }}
              >{s.label}</Link>
            ))}
          </div>

          {/* Products grid */}
          {loading ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#aaa", fontSize: 18 }}>Se încarcă...</div>
          ) : produseAfisate.length === 0 ? (
            <p style={{ textAlign: "center", color: "#aaa", fontSize: 18, padding: "80px 0" }}>
              Nu există produse în această categorie momentan.
            </p>
          ) : (
            <div className="grid-3">
              {produseAfisate.map(p => <ProdusCard key={p.id} produs={p} />)}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

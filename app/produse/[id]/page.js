"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { use } from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import ProdusCard from "../../components/ProdusCard";
import categorii from "../../../data/categorii.json";
import { useCos } from "../../context/CosContext";

export default function ProdusDePage({ params }) {
  const { id } = use(params);
  const [produs, setProdus] = useState(null);
  const [similare, setSimilare] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCuloare, setSelectedCuloare] = useState(null);
  const [selectedMarime, setSelectedMarime] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const { adaugaInCos } = useCos();

  useEffect(() => {
    fetch("/api/produse").then(r => r.json()).then(data => {
      const found = data.find(p => p.id === id);
      setProdus(found || null);
      if (found) setSimilare(data.filter(p => p.category === found.category && p.id !== id).slice(0, 3));
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div style={{ background: "#fff", minHeight: "100vh" }}>
        <NavBar />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
          <p style={{ color: "#aaa", fontSize: 15 }}>Se încarcă…</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!produs) {
    return (
      <div style={{ background: "#fff", minHeight: "100vh" }}>
        <NavBar />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: 16 }}>
          <h1 style={{ fontSize: 48, fontWeight: 800, color: "#111" }}>Produs negăsit</h1>
          <Link href="/" style={{ color: "#111", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", fontSize: 13 }}>
            ← Înapoi acasă
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const hasDiscount = produs.oldPrice;
  const discountPct = hasDiscount ? Math.round((1 - produs.price / produs.oldPrice) * 100) : null;
  const categLabel = categorii.find(c => c.slug === produs.category)?.label || produs.category;

  const handleAddToCart = () => {
    adaugaInCos(produs, selectedCuloare, selectedMarime);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <NavBar />

      <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "var(--section-padding)" }} className="page-content-top">
        {/* Breadcrumb */}
        <nav style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 40, fontSize: 13, color: "#888" }}>
          <Link href="/" style={{ color: "#888", textDecoration: "none" }}>Acasă</Link>
          <span>›</span>
          <Link href={`/${produs.category}`} style={{ color: "#888", textDecoration: "none" }}>{categLabel}</Link>
          <span>›</span>
          <span style={{ color: "#111" }}>{produs.name}</span>
        </nav>

        {/* Main product layout */}
        <div className="produse-grid">
          {/* Image */}
          <div style={{ position: "sticky", top: 100 }}>
            <div style={{ width: "100%", aspectRatio: "1/1", overflow: "hidden", borderRadius: 16, background: "#f5f5f5" }}>
              <img
                src={produs.img}
                alt={produs.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            {hasDiscount && (
              <div style={{ position: "absolute", top: 20, left: 20, background: "#dc2626", color: "#fff", fontWeight: 700, fontSize: 14, padding: "6px 14px", borderRadius: 6 }}>
                -{discountPct}%
              </div>
            )}
          </div>

          {/* Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {/* Tags */}
            <div style={{ display: "flex", gap: 8 }}>
              {produs.tags?.includes("produse-noi") && (
                <span style={{ background: "#2B652C", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 4, textTransform: "uppercase", letterSpacing: "0.1em" }}>NOU</span>
              )}
              {hasDiscount && (
                <span style={{ background: "#dc2626", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 4, textTransform: "uppercase" }}>REDUCERE</span>
              )}
            </div>

            <div>
              <h1 style={{ fontSize: 34, fontWeight: 800, color: "#111", margin: 0, letterSpacing: "-0.01em" }}>{produs.name}</h1>
              <p style={{ fontSize: 13, color: "#aaa", marginTop: 6, textTransform: "uppercase", letterSpacing: "0.1em" }}>{categLabel}</p>
            </div>

            {/* Price */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ fontSize: 32, fontWeight: 800, color: hasDiscount ? "#dc2626" : "#2B652C" }}>
                {produs.price.toLocaleString("ro-RO")} lei
              </span>
              {hasDiscount && (
                <span style={{ fontSize: 20, color: "#bbb", textDecoration: "line-through" }}>
                  {produs.oldPrice.toLocaleString("ro-RO")} lei
                </span>
              )}
            </div>

            <p style={{ fontSize: 15, color: "#555", lineHeight: 1.7, margin: 0 }}>{produs.descriere}</p>

            {/* Culori */}
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "#111", marginBottom: 12 }}>
                Culoare: <span style={{ fontWeight: 400, color: "#555" }}>{selectedCuloare || "—"}</span>
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {(produs.culori || []).map(c => (
                  <button key={c} onClick={() => setSelectedCuloare(c)} style={{
                    padding: "8px 18px", border: selectedCuloare === c ? "2px solid #2B652C" : "1px solid #ddd",
                    background: selectedCuloare === c ? "#2B652C" : "#fff", color: selectedCuloare === c ? "#fff" : "#333",
                    fontSize: 13, fontWeight: 600, borderRadius: 6, cursor: "pointer", transition: "all 0.2s"
                  }}>{c}</button>
                ))}
              </div>
            </div>

            {/* Marimi */}
            {produs.marimi?.length > 0 && <div>
              <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "#111", marginBottom: 12 }}>
                Mărime: <span style={{ fontWeight: 400, color: "#555" }}>{selectedMarime || "—"}</span>
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {(produs.marimi || []).map(m => (
                  <button key={m} onClick={() => setSelectedMarime(m)} style={{
                    width: 52, height: 52, border: selectedMarime === m ? "2px solid #2B652C" : "1px solid #ddd",
                    background: selectedMarime === m ? "#2B652C" : "#fff", color: selectedMarime === m ? "#fff" : "#333",
                    fontSize: 14, fontWeight: 600, borderRadius: 8, cursor: "pointer", transition: "all 0.2s"
                  }}>{m}</button>
                ))}
              </div>
            </div>}

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              style={{
                width: "100%", padding: "18px 0", background: addedToCart ? "#16a34a" : "#2B652C",
                color: "#fff", fontSize: 15, fontWeight: 800, textTransform: "uppercase",
                letterSpacing: "0.15em", border: "none", borderRadius: 10, cursor: "pointer",
                transition: "background 0.3s"
              }}
            >
              {addedToCart ? "✓ Adăugat în coș!" : "Adaugă în coș"}
            </button>

            {/* Features */}
            <div style={{ borderTop: "1px solid #eee", paddingTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
              {["Livrare gratuită peste 500 lei", "Returnare gratuită în 30 de zile", "Garanție autenticitate Zawaz Wood"].map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#555" }}>
                  <span style={{ fontSize: 16 }}>✓</span> {f}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Similar products */}
        {similare.length > 0 && (
          <div style={{ marginTop: 96 }}>
            <h2 className="similare-heading" style={{ fontSize: 22, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.2em", color: "#111", marginBottom: 40 }}>
              Produse Similare
            </h2>
            <div className="similare-grid">
              {similare.map(p => <ProdusCard key={p.id} produs={p} />)}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

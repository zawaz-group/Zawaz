"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ProdusCard from "./ProdusCard";

export default function Reduceri() {
  const [products, setProducts] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    fetch("/api/produse")
      .then((r) => r.json())
      .then((data) => {
        const filtered = Array.isArray(data) ? data.filter((p) => p.tags?.includes("reduceri")) : [];
        setProducts(filtered);
        setStartIndex(0);
      })
      .catch(() => setProducts([]));
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 767);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const itemsPerPage = 10;
  const visibleProducts = products.length
    ? [...products, ...products].slice(startIndex, startIndex + itemsPerPage)
    : [];

  const goPrev = () => {
    if (!products.length) return;
    setStartIndex((prev) => (prev - itemsPerPage + products.length) % products.length);
  };

  const goNext = () => {
    if (!products.length) return;
    setStartIndex((prev) => (prev + itemsPerPage) % products.length);
  };

  return (
    <section style={{ background: "#F7F7F4", padding: isMobile ? "48px 16px" : "72px 16px", overflow: "hidden" }}>
      <div style={{ maxWidth: "var(--container-inner)", margin: "0 auto" }}>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 56px)", fontWeight: 900, lineHeight: 1.1, margin: "0 0 6px", color: "#1D2820" }}>Oferte Speciale</h2>
          <p style={{ fontSize: "clamp(13px, 1.1vw, 17px)", color: "#5D695F", margin: 0, lineHeight: 1.4 }}>Produse cu reduceri exclusive pentru tine</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, minmax(0, 1fr))" : "repeat(5, minmax(0, 1fr))", gap: isMobile ? 12 : 16 }}>
          {visibleProducts.map((p, i) => (
            <div key={`${p.id}-${i}`}>
              <ProdusCard produs={p} />
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
          <button
            onClick={goPrev}
            style={{ width: 44, height: 44, borderRadius: "50%", border: "2px solid #2C662D", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, transition: "all 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#214F27"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#2C662D"; }}
          >&#8249;</button>
          <Link href="/reduceri" style={{ padding: "12px 36px", border: "2px solid #2C662D", borderRadius: 999, fontSize: 14, fontWeight: 700, color: "#2C662D", textDecoration: "none", transition: "all 0.2s", background: "transparent" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#214F27"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#2C662D"; }}
          >Vezi toate</Link>
          <button
            onClick={goNext}
            style={{ width: 44, height: 44, borderRadius: "50%", border: "2px solid #2C662D", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, transition: "all 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#214F27"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#2C662D"; }}
          >&#8250;</button>
        </div>
      </div>
    </section>
  );
}

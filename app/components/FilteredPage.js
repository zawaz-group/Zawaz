"use client";
import Link from "next/link";
import NavBar from "./NavBar";
import Footer from "./Footer";
import ProdusCard from "./ProdusCard";

const COLOR_MAP = {
  "Negru": "#1a1a1a", "Alb": "#f5f5f5", "Gri": "#9e9e9e", "Argintiu": "#c0c0c0",
  "Roz": "#f48fb1", "Albastru": "#42a5f5", "Verde": "#66bb6a", "Portocaliu": "#ffa726",
  "Rosu": "#ef5350", "Galben": "#ffee58", "Mov": "#ab47bc", "Maro": "#8d6e63", "Bej": "#d7ccc8",
};

export default function FilteredPage({ type, value, produse }) {
  const typeLabels = { culoare: "Culoare", tema: "Temă", ocazie: "Ocazie" };
  const typeLabel = typeLabels[type] || type;

  const bannerBg =
    type === "culoare" ? (COLOR_MAP[value] || "#e8e4de") :
    type === "tema" ? "#1e2235" :
    "#f5f2ed";

  const bannerTextColor =
    type === "culoare"
      ? (["Alb", "Gri", "Bej", "Argintiu", "Galben"].includes(value) ? "#111" : "#fff")
      : type === "tema" ? "#fff" : "#111";

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <NavBar />

      {/* Banner */}
      <div style={{
        background: bannerBg,
        padding: "clamp(48px, 8vw, 80px) clamp(20px, 4vw, 64px) clamp(40px, 6vw, 64px)",
        position: "relative",
        overflow: "hidden",
      }}>
        {type === "culoare" && (
          <div style={{
            position: "absolute", inset: 0,
            background: `radial-gradient(ellipse at 70% 50%, ${COLOR_MAP[value] || "#e8e4de"} 0%, ${COLOR_MAP[value] || "#e8e4de"}88 60%, transparent 100%)`,
            opacity: 0.4,
          }} />
        )}
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <Link href="/" style={{ color: bannerTextColor, opacity: 0.6, fontSize: 13, textDecoration: "none" }}>Acasă</Link>
            <span style={{ color: bannerTextColor, opacity: 0.4, fontSize: 13 }}>/</span>
            <Link href={`/${type}`} style={{ color: bannerTextColor, opacity: 0.6, fontSize: 13, textDecoration: "none" }}>{typeLabel}</Link>
            <span style={{ color: bannerTextColor, opacity: 0.4, fontSize: 13 }}>/</span>
            <span style={{ color: bannerTextColor, fontSize: 13, fontWeight: 600 }}>{value}</span>
          </div>

          {type === "culoare" && (
            <span style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 56, height: 56, borderRadius: "50%", marginBottom: 16,
              background: COLOR_MAP[value] || "#ccc",
              border: value === "Alb" ? "2px solid #ddd" : "none",
              boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            }} />
          )}

          <h1 style={{
            fontSize: "clamp(32px, 5vw, 64px)",
            fontWeight: 900,
            color: bannerTextColor,
            margin: "0 0 12px",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}>
            {type === "culoare" && `Produse ${value}`}
            {type === "tema" && `Stil ${value}`}
            {type === "ocazie" && value}
          </h1>
          <p style={{ color: bannerTextColor, opacity: 0.7, fontSize: 16, margin: 0 }}>
            {produse.length} {produse.length === 1 ? "produs găsit" : "produse găsite"}
          </p>
        </div>
      </div>

      {/* Products */}
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(40px, 6vw, 64px) clamp(20px, 4vw, 64px)" }}>
        {produse.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#bbb" }}>
            <p style={{ fontSize: 18, fontWeight: 600 }}>Niciun produs găsit.</p>
            <Link href="/" style={{ marginTop: 16, display: "inline-block", padding: "12px 24px", background: "#2B652C", color: "#fff", borderRadius: 10, textDecoration: "none", fontWeight: 700 }}>Înapoi acasă</Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 32 }}>
            {produse.map(p => <ProdusCard key={p.id} produs={p} />)}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function BlogPage() {
  const [articole, setArticole] = useState([]);
  const [activ, setActiv] = useState(null);

  useEffect(() => {
    fetch("/api/blog").then(r => r.json()).then(setArticole).catch(() => {});
  }, []);

  if (activ) {
    const a = articole.find(x => x.slug === activ);
    return (
      <>
        <NavBar />
        <main style={{ minHeight: "70vh", maxWidth: 720, margin: "0 auto", padding: "var(--section-padding)" }}>
          <button onClick={() => setActiv(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#5D695F", marginBottom: 32, padding: 0, fontWeight: 600 }}>← Înapoi la blog</button>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#D5B358" }}>{a.categorie}</span>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: "#1D2820", margin: "12px 0 8px", lineHeight: 1.25 }}>{a.titlu}</h1>
          <p style={{ fontSize: 13, color: "#5D695F", marginBottom: 40 }}>{a.data} · {a.citire} citire</p>
          <div style={{ width: "100%", aspectRatio: "16/9", borderRadius: 16, overflow: "hidden", marginBottom: 40 }}>
            <img src={a.img} alt={a.titlu} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
          <p style={{ fontSize: 17, color: "#444", lineHeight: 1.8 }}>{a.continut}</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <main style={{ minHeight: "70vh" }}>
        <div className="page-hero" style={{ background: "#EEF2EC" }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D5B358", marginBottom: 12 }}>Blog</p>
          <h1 style={{ fontSize: 40, fontWeight: 800, color: "#1D2820", margin: 0 }}>Din atelierul nostru</h1>
        </div>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "60px var(--gutter) 80px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }}>
            {articole.map(a => (
              <div key={a.slug} onClick={() => setActiv(a.slug)} style={{ cursor: "pointer", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.07)", transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.07)"; }}
              >
                <div style={{ width: "100%", height: 220, overflow: "hidden" }}>
                  <img src={a.img} alt={a.titlu} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s" }}
                    onMouseOver={e => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
                  />
                </div>
                <div style={{ padding: "22px 22px 26px", background: "#fff", display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#D5B358" }}>{a.categorie}</span>
                    <span style={{ fontSize: 11, color: "#5D695F" }}>· {a.citire} citire</span>
                  </div>
                  <h2 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: "#1D2820", lineHeight: 1.35 }}>{a.titlu}</h2>
                  <p style={{ margin: 0, fontSize: 14, color: "#5D695F", lineHeight: 1.6 }}>{a.rezumat}</p>
                  <p style={{ margin: 0, fontSize: 12, color: "#5D695F" }}>{a.data}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

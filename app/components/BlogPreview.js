"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BlogPreview() {
  const [articole, setArticole] = useState([]);

  useEffect(() => {
    fetch("/api/blog").then(r => r.json()).then(data => setArticole(data.slice(0, 3))).catch(() => {});
  }, []);

  return (
    <section style={{ padding: "var(--section-padding)", background: "#F7F7F4" }}>
      <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
        <div className="blog-header" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D5B358", marginBottom: 10 }}>Blog</p>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: "#1D2820", margin: 0 }}>Din atelierul nostru</h2>
          </div>
          <Link href="/blog" style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1D2820", textDecoration: "none", borderBottom: "2px solid #1D2820", paddingBottom: 2 }}>
            Toate articolele →
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28 }}>
          {articole.map((a) => (
            <Link key={a.slug} href={`/blog/${a.slug}`} style={{ textDecoration: "none", display: "flex", flexDirection: "column", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.07)", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.07)"; }}
            >
              <div style={{ width: "100%", aspectRatio: "1/1", overflow: "hidden" }}>
                <img src={a.img} alt={a.titlu} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                />
              </div>
              <div style={{ padding: "22px 22px 26px", display: "flex", flexDirection: "column", gap: 10, flex: 1, background: "#fff" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#D5B358" }}>{a.categorie}</span>
                  <span style={{ fontSize: 11, color: "#5D695F" }}>·</span>
                  <span style={{ fontSize: 11, color: "#5D695F" }}>{a.citire} citire</span>
                </div>
                <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: "#1D2820", lineHeight: 1.35 }}>{a.titlu}</h3>
                <p style={{ margin: 0, fontSize: 14, color: "#5D695F", lineHeight: 1.6, flex: 1 }}>{a.rezumat}</p>
                <p style={{ margin: 0, fontSize: 12, color: "#5D695F" }}>{a.data}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

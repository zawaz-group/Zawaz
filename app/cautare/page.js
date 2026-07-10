"use client";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ProdusCard from "../components/ProdusCard";
import Link from "next/link";

export default function CautarePage() {
  const [query, setQuery] = useState("");
  const [toateProdusele, setToateProdusele] = useState([]);

  useEffect(() => {
    fetch("/api/produse").then(r => r.json()).then(setToateProdusele);
  }, []);

  const rezultate = query.trim().length > 1
    ? toateProdusele.filter(p =>
        p.name?.toLowerCase().includes(query.toLowerCase()) ||
        p.category?.toLowerCase().includes(query.toLowerCase()) ||
        p.tags?.some(t => t.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  return (
    <>
      <NavBar />
      <main style={{ minHeight: "80vh", maxWidth: "var(--container)", margin: "0 auto", padding: "var(--section-padding)" }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#111", marginBottom: 32, textAlign: "center" }}>Caută produse</h1>

        <div style={{ maxWidth: 560, margin: "0 auto 48px", position: "relative" }}>
          <input
            type="text"
            autoFocus
            placeholder="Caută după nume, categorie..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              width: "100%", padding: "14px 48px 14px 18px", fontSize: 16,
              border: "2px solid #e5e5e5", borderRadius: 12, outline: "none",
              boxSizing: "border-box", transition: "border-color 0.2s",
              fontFamily: "inherit", color: "#111"
            }}
            onFocus={e => e.target.style.borderColor = "#111"}
            onBlur={e => e.target.style.borderColor = "#e5e5e5"}
          />
          <svg style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "#999", pointerEvents: "none" }}
            xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <circle cx="11" cy="11" r="7" /><path strokeLinecap="round" d="M21 21l-4.35-4.35" />
          </svg>
        </div>

        {query.trim().length > 1 && rezultate.length === 0 && (
          <p style={{ textAlign: "center", color: "#888", fontSize: 15 }}>Niciun produs găsit pentru „{query}".</p>
        )}

        {rezultate.length > 0 && (
          <>
            <p style={{ color: "#888", fontSize: 13, marginBottom: 24 }}>{rezultate.length} {rezultate.length === 1 ? "produs găsit" : "produse găsite"}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 32 }}>
              {rezultate.map(p => <ProdusCard key={p.id} produs={p} />)}
            </div>
          </>
        )}

        {query.trim().length <= 1 && (
          <div style={{ textAlign: "center", color: "#bbb", marginTop: 60 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
              <circle cx="11" cy="11" r="7" /><path strokeLinecap="round" d="M21 21l-4.35-4.35" />
            </svg>
            <p style={{ marginTop: 16, fontSize: 15 }}>Introdu cel puțin 2 caractere pentru a căuta</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

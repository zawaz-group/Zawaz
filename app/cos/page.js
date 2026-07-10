"use client";
import { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Link from "next/link";
import { useCos } from "../context/CosContext";

const inputStyle = {
  width: "100%", padding: "12px 14px", border: "1.5px solid #e0e0e0",
  borderRadius: 8, fontSize: 15, outline: "none", boxSizing: "border-box",
  fontFamily: "inherit", transition: "border 0.2s",
};

export default function CosPage() {
  const { cos, stergeItem, actualizeazaCantitate, total, numarArticole, golesteCos } = useCos();
  const [etapa, setEtapa] = useState("cos"); // "cos" | "formular" | "confirmat"
  const [trimis, setTrimis] = useState(false);
  const [form, setForm] = useState({ nume: "", prenume: "", email: "", adresa: "" });
  const [erori, setErori] = useState({});

  function set(k, v) { setForm(f => ({ ...f, [k]: v })); }

  function valideaza() {
    const e = {};
    if (!form.nume.trim()) e.nume = "Câmp obligatoriu";
    if (!form.prenume.trim()) e.prenume = "Câmp obligatoriu";
    if (!form.adresa.trim()) e.adresa = "Câmp obligatoriu";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email invalid";
    setErori(e);
    return Object.keys(e).length === 0;
  }

  async function trimiteComanda() {
    if (!valideaza()) return;
    setTrimis(true);

    const orderId = Math.floor(100000 + Math.random() * 900000);

    const linii = cos.map(i =>
      `• ${i.produs.name}${i.culoare ? ` (${i.culoare})` : ""}${i.marime ? ` - ${i.marime}` : ""} x${i.cantitate} = ${(i.produs.price * i.cantitate).toLocaleString("ro-RO")} lei`
    ).join("\n");

    const mesaj = `🛒 <b>Comandă Nouă | NR: #${orderId}</b>\n===============================\n👤 <b>Nume &amp; Prenume:</b> ${form.nume} ${form.prenume}\n📍 <b>Adresa:</b> ${form.adresa}${form.email ? `\n📧 <b>Email:</b> ${form.email}` : ""}\n===============================\n<b>Produse:</b>\n${linii}\n\n💰 <b>Total: ${total.toLocaleString("ro-RO")} lei</b>\n===============================\n📌 Status: ⏳ În așteptare`;

    await fetch("/api/telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mesaj, orderId: String(orderId) }),
    });

    golesteCos();
    setEtapa("confirmat");
    setTrimis(false);
  }

  if (etapa === "confirmat") {
    return (
      <>
        <NavBar />
        <main style={{ minHeight: "70vh", maxWidth: 560, margin: "0 auto", padding: "var(--section-padding)", textAlign: "center" }}>
          <div style={{ marginBottom: 24, display: "flex", justifyContent: "center" }}><svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth={1.5} xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4"/></svg></div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#111", marginBottom: 12 }}>Comandă plasată!</h1>
          <p style={{ color: "#666", fontSize: 16, lineHeight: 1.7, marginBottom: 36 }}>
            Îți mulțumim, <b>{form.nume}</b>! Comanda ta a fost primită și te vom contacta în curând.
          </p>
          <Link href="/" style={{ display: "inline-block", background: "#2B652C", color: "#fff", padding: "14px 36px", borderRadius: 10, fontWeight: 700, fontSize: 14, textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Înapoi acasă
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  if (etapa === "formular") {
    return (
      <>
        <NavBar />
        <main style={{ minHeight: "70vh", maxWidth: 600, margin: "0 auto", padding: "var(--section-padding)" }}>
          <button onClick={() => setEtapa("cos")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#888", marginBottom: 32, padding: 0, fontWeight: 600 }}>
            ← Înapoi la coș
          </button>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#111", marginBottom: 8 }}>Detalii livrare</h1>
          <p style={{ color: "#888", fontSize: 14, marginBottom: 36 }}>Completează datele pentru a finaliza comanda</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="form-2col">
              <div>
                <label style={{ fontSize: 13, fontWeight: 700, color: "#111", display: "block", marginBottom: 6 }}>Nume *</label>
                <input style={{ ...inputStyle, borderColor: erori.nume ? "#dc2626" : "#e0e0e0" }} value={form.nume} onChange={e => set("nume", e.target.value)} placeholder="Popescu" />
                {erori.nume && <p style={{ color: "#dc2626", fontSize: 12, margin: "4px 0 0" }}>{erori.nume}</p>}
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 700, color: "#111", display: "block", marginBottom: 6 }}>Prenume *</label>
                <input style={{ ...inputStyle, borderColor: erori.prenume ? "#dc2626" : "#e0e0e0" }} value={form.prenume} onChange={e => set("prenume", e.target.value)} placeholder="Ion" />
                {erori.prenume && <p style={{ color: "#dc2626", fontSize: 12, margin: "4px 0 0" }}>{erori.prenume}</p>}
              </div>
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: "#111", display: "block", marginBottom: 6 }}>Email <span style={{ color: "#aaa", fontWeight: 400 }}>(opțional)</span></label>
              <input style={{ ...inputStyle, borderColor: erori.email ? "#dc2626" : "#e0e0e0" }} type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="ion@gmail.com" />
              {erori.email && <p style={{ color: "#dc2626", fontSize: 12, margin: "4px 0 0" }}>{erori.email}</p>}
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: "#111", display: "block", marginBottom: 6 }}>Adresă de livrare *</label>
              <textarea style={{ ...inputStyle, height: 90, resize: "vertical" }} value={form.adresa} onChange={e => set("adresa", e.target.value)} placeholder="Str. Exemplu nr. 10, București, jud. Ilfov" />
              {erori.adresa && <p style={{ color: "#dc2626", fontSize: 12, margin: "4px 0 0" }}>{erori.adresa}</p>}
            </div>

            <div style={{ background: "#faf9f7", borderRadius: 12, padding: "20px" }}>
              <p style={{ fontWeight: 700, fontSize: 14, color: "#111", marginBottom: 12 }}>Sumar comandă</p>
              {cos.map(i => (
                <div key={i.key} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#555", marginBottom: 6 }}>
                  <span>{i.produs.name} x{i.cantitate}</span>
                  <span>{(i.produs.price * i.cantitate).toLocaleString("ro-RO")} lei</span>
                </div>
              ))}
              <div style={{ borderTop: "1px solid #e0e0e0", marginTop: 12, paddingTop: 12, display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 15 }}>
                <span>Total</span>
                <span>{total.toLocaleString("ro-RO")} lei</span>
              </div>
            </div>

            <button
              onClick={trimiteComanda}
              disabled={trimis}
              style={{ background: trimis ? "#888" : "#2B652C", color: "#fff", padding: "16px", borderRadius: 10, fontWeight: 800, fontSize: 15, border: "none", cursor: trimis ? "not-allowed" : "pointer", letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              {trimis ? "Se trimite..." : `Plasează comanda — ${total.toLocaleString("ro-RO")} lei`}
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <main style={{ minHeight: "70vh", maxWidth: "var(--container)", margin: "0 auto", padding: "var(--section-padding)" }}>
        <h1 className="cos-title" style={{ fontSize: 28, fontWeight: 800, color: "#111", marginBottom: 40 }}>Coșul tău ({numarArticole})</h1>

        {cos.length === 0 ? (
          <div style={{ textAlign: "center", paddingTop: 60, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="none" viewBox="0 0 24 24" stroke="#ccc" strokeWidth={1.2}>
              <path strokeLinecap="round" d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <path strokeLinecap="round" d="M3 6h18" />
              <path strokeLinecap="round" d="M16 10a4 4 0 01-8 0" />
            </svg>
            <p style={{ color: "#888", fontSize: 15 }}>Coșul tău este gol.</p>
            <Link href="/" style={{ display: "inline-block", background: "#2B652C", color: "#fff", padding: "12px 32px", borderRadius: 8, fontWeight: 700, fontSize: 13, textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Continuă cumpărăturile
            </Link>
          </div>
        ) : (
          <div className="cos-main-grid">
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {cos.map(item => (
                <div key={item.key} style={{ display: "flex", gap: 20, padding: "20px 0", borderBottom: "1px solid #f0f0f0", alignItems: "flex-start" }}>
                  <img src={item.produs.img} alt={item.produs.name} style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 10, background: "#f5f5f5", flexShrink: 0 }} />
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: 16, color: "#111" }}>{item.produs.name}</p>
                    {item.culoare && <p style={{ margin: 0, fontSize: 13, color: "#888" }}>Culoare: {item.culoare}</p>}
                    {item.marime && <p style={{ margin: 0, fontSize: 13, color: "#888" }}>Mărime: {item.marime}</p>}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", border: "1px solid #e0e0e0", borderRadius: 6, overflow: "hidden" }}>
                        <button onClick={() => actualizeazaCantitate(item.key, item.cantitate - 1)} style={{ width: 32, height: 32, background: "none", border: "none", cursor: "pointer", fontSize: 16, fontWeight: 700 }}>−</button>
                        <span style={{ padding: "0 14px", fontSize: 14, fontWeight: 600 }}>{item.cantitate}</span>
                        <button onClick={() => actualizeazaCantitate(item.key, item.cantitate + 1)} style={{ width: 32, height: 32, background: "none", border: "none", cursor: "pointer", fontSize: 16, fontWeight: 700 }}>+</button>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <span style={{ fontWeight: 700, fontSize: 15 }}>{(item.produs.price * item.cantitate).toLocaleString("ro-RO")} lei</span>
                        <button onClick={() => stergeItem(item.key)} style={{ background: "none", border: "none", cursor: "pointer", color: "#bbb" }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" d="M18 6L6 18M6 6l12 12"/></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cos-sticky" style={{ background: "#faf9f7", borderRadius: 16, padding: 28, position: "sticky", top: 80 }}>
              <p style={{ fontWeight: 800, fontSize: 16, color: "#111", marginBottom: 20 }}>Sumar comandă</p>
              {cos.map(i => (
                <div key={i.key} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#555", marginBottom: 8 }}>
                  <span>{i.produs.name} x{i.cantitate}</span>
                  <span>{(i.produs.price * i.cantitate).toLocaleString("ro-RO")} lei</span>
                </div>
              ))}
              <div style={{ borderTop: "1px solid #e0e0e0", marginTop: 16, paddingTop: 16, display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 16, marginBottom: 24 }}>
                <span>Total</span>
                <span>{total.toLocaleString("ro-RO")} lei</span>
              </div>
              <button
                onClick={() => setEtapa("formular")}
                style={{ width: "100%", background: "#2B652C", color: "#fff", padding: "15px", borderRadius: 10, fontWeight: 800, fontSize: 14, border: "none", cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase" }}
              >
                Finalizează comanda
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

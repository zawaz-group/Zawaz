"use client";
import { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const inputStyle = {
  width: "100%", padding: "12px 14px", border: "1.5px solid #DCE4D9",
  borderRadius: 8, fontSize: 15, outline: "none", boxSizing: "border-box",
  fontFamily: "inherit",
};

export default function ContactPage() {
  const [form, setForm] = useState({ nume: "", email: "", mesaj: "" });
  const [trimis, setTrimis] = useState(false);

  function set(k, v) { setForm(f => ({ ...f, [k]: v })); }

  async function submit(e) {
    e.preventDefault();
    if (!form.nume || !form.email || !form.mesaj) return;
    setTrimis(true);

    await fetch("/api/telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mesaj: `📩 <b>Mesaj nou de contact!</b>\n\n👤 <b>Nume:</b> ${form.nume}\n📧 <b>Email:</b> ${form.email}\n\n💬 <b>Mesaj:</b>\n${form.mesaj}`,
      }),
    });

    setForm({ nume: "", email: "", mesaj: "" });
  }

  return (
    <>
      <NavBar />
      <main style={{ minHeight: "70vh" }}>
        <div className="page-hero" style={{ background: "#EEF2EC" }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D5B358", marginBottom: 12 }}>Contact</p>
          <h1 style={{ fontSize: 40, fontWeight: 800, color: "#1D2820", margin: "0 0 12px" }}>Scrie-ne</h1>
          <p style={{ color: "#5D695F", fontSize: 16, margin: 0 }}>Suntem aici pentru orice întrebare sau comandă specială.</p>
        </div>

        <div className="grid-2col" style={{ maxWidth: 900, margin: "0 auto", padding: "60px 24px 80px" }}>
          {/* Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {[
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D5B358" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>, titlu: "Adresă", text: "str. Sarmizegetusa 92, Chișinău, Moldova" },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D5B358" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline strokeLinecap="round" strokeLinejoin="round" points="22,6 12,13 2,6"/></svg>, titlu: "Email", text: "zawazwood@gmail.com" },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D5B358" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.12 2.18 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>, titlu: "Telefon", text: "068 559 911" },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D5B358" strokeWidth={1.8}><circle cx="12" cy="12" r="10"/><polyline strokeLinecap="round" strokeLinejoin="round" points="12,6 12,12 16,14"/></svg>, titlu: "Program", text: "Luni – Vineri: 9:00 – 18:00" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <span style={{ display: "flex", alignItems: "center", marginTop: 2 }}>{item.icon}</span>
                <div>
                  <p style={{ margin: "0 0 4px", fontWeight: 700, fontSize: 14, color: "#1D2820" }}>{item.titlu}</p>
                  <p style={{ margin: 0, fontSize: 15, color: "#5D695F" }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Formular */}
          {trimis ? (
            <div style={{ textAlign: "center", padding: "60px 24px" }}>
              <div style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}><svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth={1.5}><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4"/></svg></div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1D2820", marginBottom: 8 }}>Mesaj trimis!</h2>
              <p style={{ color: "#5D695F" }}>Te vom contacta în cel mai scurt timp.</p>
              <button onClick={() => setTrimis(false)} style={{ marginTop: 24, background: "#2C662D", color: "#fff", padding: "12px 28px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>Trimite alt mesaj</button>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 700, color: "#1D2820", display: "block", marginBottom: 6 }}>Nume *</label>
                <input style={inputStyle} value={form.nume} onChange={e => set("nume", e.target.value)} placeholder="Ion Popescu" required />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 700, color: "#1D2820", display: "block", marginBottom: 6 }}>Email *</label>
                <input style={inputStyle} type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="ion@gmail.com" required />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 700, color: "#1D2820", display: "block", marginBottom: 6 }}>Mesaj *</label>
                <textarea style={{ ...inputStyle, height: 130, resize: "vertical" }} value={form.mesaj} onChange={e => set("mesaj", e.target.value)} placeholder="Scrie mesajul tău..." required />
              </div>
              <button type="submit" style={{ background: "#2C662D", color: "#fff", padding: "15px", borderRadius: 10, fontWeight: 800, fontSize: 15, border: "none", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Trimite mesajul
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

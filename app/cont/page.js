import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Link from "next/link";

export default function ContPage() {
  return (
    <>
      <NavBar />
      <main style={{ minHeight: "70vh", maxWidth: 480, margin: "0 auto", padding: "var(--section-padding)" }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#1D2820", marginBottom: 8, textAlign: "center" }}>Contul meu</h1>
        <p style={{ color: "#5D695F", fontSize: 14, textAlign: "center", marginBottom: 40 }}>Autentifică-te pentru a accesa comenzile și setările contului.</p>

        <div style={{ background: "#fafafa", border: "1px solid #DCE4D9", borderRadius: 16, padding: "36px 32px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: "#5D695F", textTransform: "uppercase", letterSpacing: "0.08em" }}>Email</label>
            <input type="email" placeholder="adresa@email.com" style={{ padding: "11px 14px", border: "1.5px solid #DCE4D9", borderRadius: 8, fontSize: 14, outline: "none", fontFamily: "inherit", color: "#1D2820" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: "#5D695F", textTransform: "uppercase", letterSpacing: "0.08em" }}>Parolă</label>
            <input type="password" placeholder="••••••••" style={{ padding: "11px 14px", border: "1.5px solid #DCE4D9", borderRadius: 8, fontSize: 14, outline: "none", fontFamily: "inherit", color: "#1D2820" }} />
          </div>
          <button style={{ background: "#2C662D", color: "#fff", border: "none", borderRadius: 8, padding: "13px 0", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer", marginTop: 8 }}>
            Autentificare
          </button>
          <p style={{ textAlign: "center", fontSize: 13, color: "#5D695F", margin: 0 }}>
            Nu ai cont?{" "}
            <Link href="/cont/inregistrare" style={{ color: "#1D2820", fontWeight: 700, textDecoration: "none" }}>Înregistrează-te</Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

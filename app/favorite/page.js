import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Link from "next/link";

export default function FavoritePage() {
  return (
    <>
      <NavBar />
      <main style={{ minHeight: "70vh", maxWidth: "var(--container)", margin: "0 auto", padding: "var(--section-padding)", textAlign: "center" }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="none" viewBox="0 0 24 24" stroke="#ccc" strokeWidth={1.2} style={{ marginBottom: 20 }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#111", marginBottom: 12 }}>Favorite</h1>
        <p style={{ color: "#888", fontSize: 15, marginBottom: 32 }}>Nu ai salvat încă niciun produs la favorite.</p>
        <Link href="/" style={{ display: "inline-block", background: "#2B652C", color: "#fff", padding: "12px 32px", borderRadius: 8, fontWeight: 700, fontSize: 13, textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Descoperă produse
        </Link>
      </main>
      <Footer />
    </>
  );
}

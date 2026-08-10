import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import FAQ from "../components/FAQ";

export default function DespreNoi() {
  return (
    <>
      <NavBar />
      <main style={{ minHeight: "70vh" }}>
        {/* Hero */}
        <div className="page-hero" style={{ background: "#EEF2EC" }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D5B358", marginBottom: 12 }}>Povestea noastră</p>
          <h1 style={{ fontSize: 48, fontWeight: 800, color: "#1D2820", margin: "0 auto 20px", maxWidth: 700 }}>Creăm cu pasiune din lemn natural</h1>
          <p style={{ fontSize: 18, color: "#5D695F", maxWidth: 600, margin: "0 auto", lineHeight: 1.8 }}>
            Paradox Craft s-a născut din dragostea pentru materiale naturale și designul simplu, autentic. Fiecare produs este creat manual, cu atenție la detalii.
          </p>
        </div>

        {/* Valori */}
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "var(--section-padding)" }}>
          <div className="valori-grid">
            {[
              { icon: <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#D5B358" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6 8 4 12 4 15a8 8 0 0016 0c0-3-2-7-8-13z"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 12v8"/></svg>, titlu: "Lemn natural", text: "Folosim exclusiv lemn masiv de calitate superioară, selectat cu grijă pentru durabilitate și estetică." },
              { icon: <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#D5B358" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 11V6a3 3 0 116 0v5"/><rect x="5" y="11" width="14" height="10" rx="2"/></svg>, titlu: "Lucrat manual", text: "Fiecare produs trece prin mâinile meșterilor noștri. Nu există două piese identice — fiecare e unică." },
              { icon: <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#D5B358" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 22V12m0 0C10 8 6 7 3 9c0 5 4 9 9 10m0-10c2-4 6-5 9-3-1 5-5 9-9 10"/></svg>, titlu: "Sustenabil", text: "Ne aprovizionăm responsabil și minimizăm risipa. Ambalajele sunt 100% reciclabile." },
              { icon: <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#D5B358" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>, titlu: "Cu suflet", text: "Punem pasiune în tot ce facem. Satisfacția ta este cel mai important lucru pentru noi." },
            ].map((v, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <span>{v.icon}</span>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: "#1D2820", margin: 0 }}>{v.titlu}</h3>
                <p style={{ fontSize: 15, color: "#5D695F", lineHeight: 1.7, margin: 0 }}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>

        <FAQ />

        {/* CTA */}
        <div className="despre-cta" style={{ background: "#183A22", padding: "80px 24px", textAlign: "center" }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: "#fff", marginBottom: 16 }}>Descoperă colecțiile noastre</h2>
          <p style={{ color: "#5D695F", fontSize: 16, marginBottom: 36 }}>Stative și pușculițe create cu dragoste, pentru casa ta.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/stative" style={{ background: "#D5B358", color: "#fff", padding: "14px 32px", borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.08em" }}>Stative</a>
            <a href="/pusculate" style={{ background: "transparent", color: "#fff", padding: "14px 32px", borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.08em", border: "2px solid #fff" }}>Pușculițe</a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

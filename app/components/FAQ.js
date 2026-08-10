"use client";
import { useState } from "react";

const INTREBARI = [
  {
    q: "Din ce material sunt fabricate produsele Paradox Craft?",
    a: "Toate produsele noastre sunt fabricate din lemn masiv natural, selectat cu atenție pentru calitate și durabilitate. Nu folosim MDF sau materiale sintetice.",
  },
  {
    q: "Cât durează livrarea?",
    a: "Comenzile sunt procesate în 1-2 zile lucrătoare. Livrarea standard durează 3-5 zile lucrătoare pe teritoriul României. Oferim și livrare express în 24h în orașele mari.",
  },
  {
    q: "Produsele pot fi personalizate?",
    a: "Da! Oferim servicii de personalizare — gravare cu nume, mesaj sau dată specială. Contactați-ne pe WhatsApp sau email pentru detalii și prețuri.",
  },
  {
    q: "Care este politica de retur?",
    a: "Acceptăm retururi în termen de 30 de zile de la primirea comenzii, cu condiția ca produsul să fie în starea originală. Produsele personalizate nu pot fi returnate.",
  },
  {
    q: "Produsele sunt sigure pentru copii?",
    a: "Da, folosim lacuri și vopsele non-toxice, certificate pentru siguranța copiilor. Produsele sunt testate și respectă standardele europene EN 71.",
  },
  {
    q: "Cum îngrijesc produsul din lemn?",
    a: "Ștergeți cu o cârpă uscată sau ușor umezită. Evitați expunerea directă la apă sau umiditate excesivă. O dată pe an puteți aplica un strat subțire de ulei de lemn pentru a menține aspectul.",
  },
  {
    q: "Oferiți livrare internațională?",
    a: "Da, livrăm în toată Europa. Costul și termenul de livrare variază în funcție de țară. La finalizarea comenzii veți vedea opțiunile disponibile pentru adresa dvs.",
  },
  {
    q: "Pot să comand ca persoană juridică (factură fiscală)?",
    a: "Absolut. La plasarea comenzii selectați opțiunea 'Persoană juridică' și completați datele firmei. Factura fiscală se emite automat și se trimite pe email.",
  },
  {
    q: "Ce fac dacă produsul a ajuns deteriorat?",
    a: "Ne pare rău pentru inconvenient! Contactați-ne în 48h de la primire cu fotografii ale produsului și ambalajului. Vom înlocui produsul sau vom emite un rambursare completă.",
  },
  {
    q: "Puteți realiza comenzi de grup sau corporate?",
    a: "Da! Oferim discounturi speciale pentru comenzi de peste 10 bucăți. Suntem parteneri ideali pentru cadouri corporate, botezuri, nunți sau alte evenimente speciale. Contactați-ne pentru o ofertă personalizată.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "var(--section-padding)" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D5B358", marginBottom: 10 }}>Ai întrebări?</p>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, color: "#1D2820", margin: 0 }}>Întrebări frecvente</h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 0, maxWidth: 800, margin: "0 auto" }}>
        {INTREBARI.map((item, i) => (
          <div key={i} style={{ borderBottom: "1px solid #e8e4de" }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                width: "100%", background: "none", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "20px 4px", gap: 16, textAlign: "left",
              }}
            >
              <span style={{ fontSize: "clamp(15px, 2vw, 17px)", fontWeight: 700, color: "#1D2820", lineHeight: 1.4 }}>{item.q}</span>
              <svg
                width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D5B358" strokeWidth={2.5} strokeLinecap="round"
                style={{ flexShrink: 0, transition: "transform 0.3s ease", transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}
              >
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </button>
            <div style={{
              overflow: "hidden",
              maxHeight: open === i ? "400px" : "0",
              transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
            }}>
              <p style={{ fontSize: 15, color: "#5D695F", lineHeight: 1.75, margin: "0 4px 20px", fontWeight: 400 }}>
                {item.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

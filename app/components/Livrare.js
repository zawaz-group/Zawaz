"use client";
export default function Livrare() {
  return (
    <section style={{
      background: "linear-gradient(135deg, #f5ede0 0%, #f0e6d3 60%, #e8d8c0 100%)",
      paddingTop: 60,
      overflow: "hidden",
      position: "relative",
    }}>
      <div style={{
        maxWidth: "var(--container)",
        margin: "0 auto",
        padding: "0 var(--gutter)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "flex-end",
        gap: "clamp(32px, 5vw, 80px)",
        minHeight: 360,
      }} className="livrare-grid">

        {/* LEFT — mascot illustration */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          position: "relative",
          marginBottom: 0,
        }}>
          {/* City silhouette background */}
          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "60%",
            background: "rgba(210,195,175,0.25)",
            maskImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 200'%3E%3Crect x='0' y='80' width='60' height='120'/%3E%3Crect x='70' y='40' width='80' height='160'/%3E%3Crect x='160' y='60' width='50' height='140'/%3E%3Crect x='220' y='20' width='100' height='180'/%3E%3Crect x='330' y='50' width='70' height='150'/%3E%3Crect x='410' y='30' width='90' height='170'/%3E%3Crect x='510' y='70' width='60' height='130'/%3E%3Crect x='580' y='10' width='110' height='190'/%3E%3Crect x='700' y='55' width='100' height='145'/%3E%3C/svg%3E\")",
            maskSize: "cover",
            WebkitMaskImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 200'%3E%3Crect x='0' y='80' width='60' height='120'/%3E%3Crect x='70' y='40' width='80' height='160'/%3E%3Crect x='160' y='60' width='50' height='140'/%3E%3Crect x='220' y='20' width='100' height='180'/%3E%3Crect x='330' y='50' width='70' height='150'/%3E%3Crect x='410' y='30' width='90' height='170'/%3E%3Crect x='510' y='70' width='60' height='130'/%3E%3Crect x='580' y='10' width='110' height='190'/%3E%3Crect x='700' y='55' width='100' height='145'/%3E%3C/svg%3E\")",
            WebkitMaskSize: "cover",
          }} />

          {/* Delivery mascot — SVG cartoon coin character */}
          <svg
            viewBox="0 0 320 420"
            width="300"
            style={{ maxWidth: "100%", display: "block", position: "relative", zIndex: 1, filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.12))", marginBottom: -4 }}
          >
            {/* Shadow */}
            <ellipse cx="160" cy="415" rx="70" ry="8" fill="rgba(0,0,0,0.12)" />

            {/* Body */}
            <circle cx="160" cy="230" r="100" fill="#f0a830" />
            <circle cx="160" cy="230" r="88" fill="#f5b940" />

            {/* Face */}
            <circle cx="160" cy="215" r="72" fill="#f7c55a" />
            {/* Eyes */}
            <circle cx="140" cy="205" r="10" fill="#3a2a10" />
            <circle cx="180" cy="205" r="10" fill="#3a2a10" />
            <circle cx="143" cy="202" r="3.5" fill="#fff" />
            <circle cx="183" cy="202" r="3.5" fill="#fff" />
            {/* Eyebrows */}
            <path d="M130 192 Q140 186 150 192" stroke="#3a2a10" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <path d="M170 192 Q180 186 190 192" stroke="#3a2a10" strokeWidth="3" fill="none" strokeLinecap="round"/>
            {/* Smile */}
            <path d="M143 228 Q160 244 177 228" stroke="#3a2a10" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
            {/* Cheeks */}
            <circle cx="128" cy="228" r="10" fill="#f09020" opacity="0.5"/>
            <circle cx="192" cy="228" r="10" fill="#f09020" opacity="0.5"/>

            {/* Cap */}
            <ellipse cx="160" cy="152" rx="68" ry="14" fill="#c97820" />
            <path d="M100 152 Q120 110 160 108 Q200 110 220 152" fill="#e08820" />
            <circle cx="160" cy="108" r="12" fill="#d07818" />
            {/* Cap badge */}
            <circle cx="160" cy="108" r="8" fill="#f5c040" />
            <text x="160" y="112" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#c97820">$</text>

            {/* Left arm holding box */}
            <path d="M80 265 Q50 270 45 300 Q42 320 60 330" stroke="#e09030" strokeWidth="22" fill="none" strokeLinecap="round"/>

            {/* Box */}
            <rect x="20" y="295" width="70" height="60" rx="6" fill="#c97820" />
            <rect x="20" y="295" width="70" height="20" rx="6" fill="#b86c18" />
            <line x1="55" y1="295" x2="55" y2="355" stroke="#b86c18" strokeWidth="3"/>
            <rect x="40" y="300" width="30" height="10" rx="3" fill="#e8a030" />

            {/* Right arm with bag */}
            <path d="M240 265 Q265 275 268 305 Q270 325 258 335" stroke="#e09030" strokeWidth="22" fill="none" strokeLinecap="round"/>
            {/* Bag */}
            <rect x="248" y="310" width="44" height="44" rx="8" fill="#4a3820" />
            <path d="M256 310 Q256 298 270 298 Q284 298 284 310" stroke="#6a5438" strokeWidth="4" fill="none"/>
            <rect x="258" y="325" width="24" height="3" rx="2" fill="#6a5438"/>

            {/* Legs */}
            <rect x="138" y="320" width="22" height="55" rx="11" fill="#e08820" />
            <rect x="160" y="320" width="22" height="55" rx="11" fill="#d07818" />
            {/* Shoes */}
            <ellipse cx="149" cy="375" rx="18" ry="10" fill="#3a2a10" />
            <ellipse cx="171" cy="375" rx="18" ry="10" fill="#2a1a08" />

            {/* T-shirt text */}
            <text x="160" y="255" textAnchor="middle" fontSize="10" fontWeight="bold" fill="rgba(180,100,10,0.6)" transform="rotate(-5, 160, 255)">ZAWAZ</text>
            <text x="160" y="267" textAnchor="middle" fontSize="9" fontWeight="bold" fill="rgba(180,100,10,0.6)" transform="rotate(-5, 160, 267)">WOOD</text>
          </svg>
        </div>

        {/* RIGHT — text content */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          paddingBottom: 48,
        }}>
          <h2 style={{
            fontSize: "clamp(40px, 6vw, 80px)",
            fontWeight: 900,
            lineHeight: 1.05,
            color: "#1D2820",
            margin: "0 0 20px",
            letterSpacing: "-0.03em",
            fontFamily: "Inter, system-ui, sans-serif",
          }}>
            Livrare<br />gratuită!
          </h2>

          <p style={{
            fontSize: "clamp(15px, 1.6vw, 20px)",
            color: "#5D695F",
            lineHeight: 1.65,
            margin: "0 0 36px",
            maxWidth: 420,
            fontWeight: 500,
            fontFamily: "Inter, system-ui, sans-serif",
          }}>
            Trimitem produsele achiziționate<br />
            pe site-ul nostru direct la ușa ta!
          </p>

          <a
            href="/produse"
            style={{
              display: "inline-block",
              background: "#2C662D",
              color: "#fff",
              fontWeight: 700,
              fontSize: "clamp(14px, 1.4vw, 17px)",
              padding: "16px 40px",
              borderRadius: 50,
              textDecoration: "none",
              letterSpacing: "0.01em",
              fontFamily: "Inter, system-ui, sans-serif",
              boxShadow: "0 4px 20px rgba(44,102,45,0.35)",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#214F27"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#2C662D"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Comandă acum
          </a>
        </div>
      </div>

      {/* Bottom dark bar like in screenshot */}
      <div style={{
        marginTop: 0,
        background: "#4a3f38",
        height: 48,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div style={{
          width: "80%",
          height: 2,
          borderBottom: "2px dashed rgba(255,255,255,0.25)",
        }} />
      </div>
    </section>
  );
}

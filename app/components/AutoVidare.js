"use client";
import Image from "next/image";

export default function AutoVidare() {
  return (
    <section style={{
      background: "#f5f0eb",
      padding: "clamp(48px, 8vw, 80px) 0",
      overflow: "hidden",
    }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 clamp(24px, 4vw, 64px)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "center",
        gap: "clamp(32px, 5vw, 80px)",
      }} className="autovidare-grid">

        {/* LEFT — coins image */}
        <div style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <Image
            src="/monety2-1.png"
            alt="Monede"
            width={560}
            height={460}
            style={{ objectFit: "contain", width: "100%", height: "auto", maxWidth: 560 }}
            priority
          />
        </div>

        {/* RIGHT — text */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <h2 style={{
            fontSize: "clamp(36px, 5vw, 72px)",
            fontWeight: 900,
            color: "#111",
            lineHeight: 1.05,
            margin: "0 0 36px",
            letterSpacing: "-0.03em",
            fontFamily: "Inter, system-ui, sans-serif",
          }}>
            Golire<br />Automată
          </h2>

          {/* Icon + stats row */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 20 }}>
            {/* 294K image */}
            <div style={{ flexShrink: 0 }}>
              <Image
                src="/294k-1.png"
                alt="294K"
                width={100}
                height={100}
                style={{ objectFit: "contain", width: "auto", height: "auto", maxWidth: 100 }}
              />
            </div>

            {/* Highlighted text lines */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {[
                "Depui 10 lei zilnic și umpli toată pușculița.",
                "După un an iese 3650 lei — Pușculița Anului cu auto-golire.",
              ].map((line, i) => (
                <span key={i} style={{
                  display: "inline-block",
                  background: "transparent",
                  color: "#111",
                  fontWeight: 600,
                  fontSize: "clamp(14px, 3.8vw, 17px)",
                  padding: "3px 0",
                  borderRadius: 0,
                  lineHeight: 1.6,
                  fontFamily: "Inter, system-ui, sans-serif",
                  letterSpacing: "0.01em",
                }}>{line}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

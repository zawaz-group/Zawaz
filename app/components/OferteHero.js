"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

const INTERVAL = 5000;

// Fallback static, folosit doar daca nu exista niciun slide adaugat din admin
// (Hero Slider) — asa site-ul nu ramane fara banner cat timp baza de date e goala.
const SLIDE_FALLBACK = [
  { id: "fallback", img: "/oferta-monezi.png", alt: "Ofertă specială", link: "/produse" },
];

export default function OferteHero() {
  const [isMobile, setIsMobile] = useState(false);
  const [slides, setSlides] = useState(SLIDE_FALLBACK);
  const [slide, setSlide] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 767);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    fetch("/api/hero").then(r => r.json()).then(data => {
      if (Array.isArray(data) && data.length > 0) {
        setSlides(data);
        setSlide(0);
      }
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    timerRef.current = setInterval(() => {
      setSlide(s => (s + 1) % slides.length);
    }, INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [slides.length]);

  const goTo = (i) => {
    setSlide(i);
    if (timerRef.current) clearInterval(timerRef.current);
    if (slides.length > 1) {
      timerRef.current = setInterval(() => setSlide(s => (s + 1) % slides.length), INTERVAL);
    }
  };

  return (
    // padding orizontal 16px = acelasi cu al navbar-ului (NavBar.js:192),
    // ca marginile bannerului sa cada exact pe marginile continutului paginii.
    <section style={{
      padding: isMobile ? "24px 16px" : "40px 16px",
      // Bannerul in sine e acoperit de imagine (objectFit: cover pe desktop),
      // deci un fundal pus doar pe cutia rotunjita nu se vede aproape deloc —
      // gradientul viu trebuie sa fie in spatele intregii sectiuni, ca sa se
      // vada in jurul bannerului, nu doar pe margini pe mobil.
      background: "radial-gradient(120% 140% at 50% 0%, rgba(213,179,88,0.28) 0%, rgba(44,102,45,0.22) 42%, rgba(247,247,244,0) 78%)",
    }}>
      <div style={{ maxWidth: "var(--container-inner)", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
        <div style={{
          position: "relative", width: "100%",
          // 2/1 este raportul real al imaginilor (1774x887), deci objectFit:
          // cover le incadreaza fara sa taie nimic.
          aspectRatio: isMobile ? "16 / 9" : "2 / 1",
          borderRadius: 20,
          overflow: "hidden",
          background: "linear-gradient(135deg, #2C662D 0%, #214F27 45%, #D5B358 100%)",
        }}>
          {slides.map((s, i) => (
            <Link
              key={s.id}
              href={s.link || "/produse"}
              style={{
                position: "absolute", inset: 0,
                opacity: slide === i ? 1 : 0,
                transition: "opacity 0.6s ease",
                pointerEvents: slide === i ? "auto" : "none",
              }}
            >
              {s.img && (
                <img
                  src={s.img}
                  alt={s.alt || "Ofertă specială"}
                  style={{
                    position: "absolute", inset: 0, width: "100%", height: "100%",
                    objectFit: isMobile ? "contain" : "cover", objectPosition: "center",
                  }}
                />
              )}
            </Link>
          ))}
        </div>

        {slides.length > 1 && (
          <div style={{ display: "flex", gap: 8 }}>
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                aria-label={`Oferta ${i + 1}`}
                style={{
                  width: slide === i ? 22 : 8, height: 8, borderRadius: 999,
                  background: slide === i ? "#2C662D" : "#DCE4D9",
                  border: "none", cursor: "pointer", padding: 0,
                  transition: "width 0.3s ease, background 0.3s ease",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

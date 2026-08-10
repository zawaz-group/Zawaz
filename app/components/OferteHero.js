"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function OferteHero() {
  const [href, setHref] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    fetch("/api/produse")
      .then((r) => r.json())
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0) return;
        const randomProduct = data[Math.floor(Math.random() * data.length)];
        setHref(`/produse/${randomProduct.id}`);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 767);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!href) return null;

  return (
    <section style={{ padding: isMobile ? "24px 16px" : "40px 24px" }}>
      <div style={{ maxWidth: "var(--container)", margin: "0 auto", display: "flex", justifyContent: "center" }}>
        <Link
          href={href}
          style={{
            position: "relative", display: "block",
            width: isMobile ? "100%" : "50%",
            aspectRatio: isMobile ? "16 / 9" : "2 / 1",
            borderRadius: 20,
            overflow: "hidden",
            background: "#0d1f3c",
          }}
        >
          <Image
            src="/oferta-monezi.png"
            alt="Ofertă specială"
            fill
            priority
            sizes="(max-width: 767px) 100vw, 50vw"
            style={{ objectFit: isMobile ? "contain" : "cover", objectPosition: "center" }}
          />
        </Link>
      </div>
    </section>
  );
}

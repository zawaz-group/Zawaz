"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCos } from "../context/CosContext";
import { CATEGORII_PRINCIPALE } from "../lib/categorii-site";
import CategoryArt from "./CategoryArt";
import CosDrawer from "./CosDrawer";
import { Cart, ChevronDown, Close, Menu, Search, User } from "./icons";
import Logo from "./Logo";

const links = [
  { label: "Despre noi", href: "/despre-noi" },
  { label: "Contact", href: "/contact" },
];

const butonMeniu =
  "flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-gold/80 bg-gradient-to-b from-forest-900 to-forest-950 text-[0.8125rem] font-semibold text-white shadow-[0_0_0.875rem_rgba(31,106,54,0.6),inset_0_0_0.625rem_rgba(31,106,54,0.35)] transition hover:shadow-[0_0_1.25rem_rgba(31,106,54,0.9)]";

export default function Header({ defaultOpen = false, categorii: categoriiInitiale = null }) {
  // Pe prima pagină meniul e deschis implicit, ca în design; se închide la click în afară sau Escape.
  const [open, setOpen] = useState(defaultOpen);
  const menuRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  // Categoriile vin din admin: pe prima pagină gata calculate de pe server, în rest se încarcă o dată din API.
  const [categorii, setCategorii] = useState(categoriiInitiale || []);
  const router = useRouter();
  const { numarArticole, cosDeschis, deschideCos, inchideCos } = useCos();

  useEffect(() => {
    const onDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (categoriiInitiale) return;
    let anulat = false;
    fetch("/api/meniu-categorii")
      .then((r) => r.json())
      .then((d) => {
        if (!anulat && Array.isArray(d)) setCategorii(d);
      })
      .catch(() => {});
    return () => {
      anulat = true;
    };
  }, [categoriiInitiale]);

  useEffect(() => {
    const citeste = () => setIsAdmin(!!localStorage.getItem("adminLoggedIn"));
    citeste();
    window.addEventListener("storage", citeste);
    return () => window.removeEventListener("storage", citeste);
  }, []);

  const cauta = (e) => {
    e.preventDefault();
    const q = String(new FormData(e.currentTarget).get("q") ?? "").trim();
    setMobileOpen(false);
    router.push(q ? `/cautare?q=${encodeURIComponent(q)}` : "/cautare");
  };

  return (
    <>
      <CosDrawer open={cosDeschis} onClose={inchideCos} />

      <header className="absolute inset-x-0 top-0 z-50 flex items-start px-3 max-lg:h-12 max-lg:items-center max-lg:bg-[#050a08] lg:pl-[7.6vw] lg:pr-[4.95vw]">
        <Logo className="shrink-0 lg:mt-3" />

        {/* Bara întunecată: lipită de sus, colțuri inferioare rotunjite */}
        <div className="ml-4 flex h-20 flex-1 items-center max-lg:h-12 max-lg:rounded-none max-lg:bg-none max-lg:px-0 rounded-b-[2.4rem] bg-[linear-gradient(90deg,rgba(5,10,8,0)_0%,rgba(5,10,8,0.3)_14%,rgba(5,10,8,0.78)_55%,rgba(5,10,8,0.9)_100%)] pl-[1.0625rem] pr-6 max-lg:justify-end lg:ml-[2.4vw] lg:pr-12">
          <nav aria-label="Meniu principal" className="hidden items-center text-[0.75rem] font-medium text-white lg:flex">
            <div ref={menuRef} className="relative">
              {categorii.length < 2 ? (
                // O singură categorie: butonul îi poartă numele și duce direct la ea, fără dropdown.
                <Link href={categorii[0]?.href ?? "/produse"} className={`${butonMeniu} min-w-[6.5rem] px-4`}>
                  {categorii[0]?.title ?? "Produse"}
                </Link>
              ) : (
                <button
                  type="button"
                  aria-expanded={open}
                  aria-haspopup="true"
                  onClick={() => setOpen((v) => !v)}
                  className={`${butonMeniu} w-[6.5rem]`}
                >
                  Produse
                  <ChevronDown className={`h-4 w-4 text-gold-bright transition-transform ${open ? "rotate-180" : ""}`} />
                </button>
              )}

              {open && categorii.length > 1 && (
                <div style={{ width: `${Math.min(categorii.length, CATEGORII_PRINCIPALE) * 9.375}rem` }} className="absolute left-[-0.125rem] top-full mt-[0.6875rem] flex flex-wrap gap-[0.625rem] rounded-xl border border-white/15 bg-[#06100c]/90 p-2 shadow-[0_1.25rem_3.125rem_rgba(0,0,0,0.6),0_0_1.5rem_rgba(31,106,54,0.25)] backdrop-blur-xl">
                  {categorii.slice(0, CATEGORII_PRINCIPALE).map((c) => (
                    <Link
                      key={c.key}
                      href={c.href}
                      onClick={() => setOpen(false)}
                      className="group relative flex h-[7.625rem] min-w-0 flex-1 flex-col overflow-hidden rounded-lg border border-[#2f7a45]/70 bg-gradient-to-b from-[#0b1a12] to-[#050b08] transition hover:border-gold/70"
                    >
                      <div className="relative h-[4.625rem] shrink-0 overflow-hidden">
                        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
                          <CategoryArt image={c.image} />
                        </div>
                        <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[#0b1a12] to-transparent" />
                      </div>
                      <div className="px-2 pt-1.5">
                        <div className="truncate text-[0.8125rem] font-bold leading-tight text-white">{c.title}</div>
                        <div className="mt-[0.1875rem] line-clamp-2 text-[0.625rem] leading-tight text-white/70">{c.subtitle}</div>
                      </div>
                    </Link>
                  ))}
                  {categorii.length > CATEGORII_PRINCIPALE && (
                    <Link
                      href="/categorii"
                      onClick={() => setOpen(false)}
                      className="flex h-9 w-full items-center justify-center rounded-lg border border-gold/50 bg-brand/40 text-[0.75rem] font-bold text-gold-bright transition hover:bg-brand"
                    >
                      Toate categoriile →
                    </Link>
                  )}
                </div>
              )}
            </div>

            <div className="ml-[1.5625rem] flex items-center gap-[2.625rem]">
              {links.map((l) => (
                <Link key={l.label} href={l.href} className="whitespace-nowrap transition hover:text-gold-bright">
                  {l.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className="ml-auto flex items-center">
            {isAdmin && (
              <Link href="/admin" className="btn-gold mr-[1.5rem] hidden h-8 px-4 text-[0.6875rem] uppercase tracking-[0.06em] lg:inline-flex">
                Admin
              </Link>
            )}
            <form role="search" onSubmit={cauta} className="mr-[2.9375rem] hidden h-[2.375rem] w-[12.8125rem] items-center rounded-full bg-white/[0.13] pl-4 pr-3 text-[0.8125rem] transition focus-within:ring-1 focus-within:ring-gold/70 md:flex">
              <input type="search" name="q" aria-label="Caută produse" placeholder="Caută produse..." className="w-full bg-transparent text-white outline-none placeholder:text-white/45" />
              <button type="submit" aria-label="Caută" className="shrink-0 text-white">
                <Search className="h-5 w-5" />
              </button>
            </form>
            <button type="button" aria-label="Caută" onClick={() => setMobileOpen(true)} className="mr-4 text-white lg:hidden">
              <Search className="h-6 w-6" strokeWidth={1.6} />
            </button>
            <Link href="/cont" aria-label="Contul meu" className="mr-4 text-white transition hover:text-gold-bright lg:mr-[1.875rem]">
              <User className="h-6 w-6 lg:h-[1.875rem] lg:w-[1.875rem]" strokeWidth={1.4} />
            </Link>
            <button type="button" aria-label="Coșul de cumpărături" onClick={deschideCos} className="relative text-white transition hover:text-gold-bright">
              <Cart className="h-6 w-6 lg:h-[1.875rem] lg:w-[1.875rem]" strokeWidth={1.4} />
              <span className="absolute -right-2 -top-2 grid h-[1.125rem] min-w-[1.125rem] place-items-center rounded-full bg-gold-bright px-0.5 text-[0.625rem] font-extrabold text-forest-950">
                {numarArticole}
              </span>
            </button>
            <button
              type="button"
              aria-label={mobileOpen ? "Închide meniul" : "Deschide meniul"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((v) => !v)}
              className="ml-4 grid h-10 w-9 place-items-center text-white lg:hidden"
            >
              {mobileOpen ? <Close className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Meniu pe telefon */}
        {mobileOpen && (
          <nav
            id="mobile-menu"
            aria-label="Meniu principal"
            className="absolute inset-x-3 top-[3.25rem] max-h-[calc(100svh-4rem)] overflow-y-auto rounded-2xl border border-gold/30 bg-[#06100c]/95 p-4 shadow-[0_1.25rem_3rem_rgba(0,0,0,0.7)] backdrop-blur-xl lg:hidden"
          >
            <form role="search" onSubmit={cauta} className="flex h-12 items-center rounded-full bg-white/[0.12] pl-4 pr-3 text-[0.9375rem] focus-within:ring-1 focus-within:ring-gold/70">
              <input type="search" name="q" aria-label="Caută produse" placeholder="Caută produse..." className="w-full bg-transparent text-white outline-none placeholder:text-white/50" />
              <button type="submit" aria-label="Caută" className="shrink-0 text-white">
                <Search className="h-5 w-5" />
              </button>
            </form>

            <p className="mb-2 mt-5 text-[0.6875rem] font-extrabold uppercase tracking-[0.14em] text-gold-bright">Produse</p>
            <ul className="grid gap-2">
              {categorii.slice(0, CATEGORII_PRINCIPALE).map((c) => (
                <li key={c.key}>
                  <Link
                    href={c.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex min-h-12 flex-col justify-center rounded-xl border border-[#2f7a45]/60 bg-gradient-to-r from-[#0b1a12] to-[#050b08] px-4 py-2"
                  >
                    <span className="text-[0.9375rem] font-bold text-white">{c.title}</span>
                    <span className="text-[0.75rem] text-white/60">{c.subtitle}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="mt-4 divide-y divide-white/10 border-t border-white/10">
              {links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} onClick={() => setMobileOpen(false)} className="flex min-h-12 items-center text-[0.9375rem] font-semibold text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
              {isAdmin && (
                <li>
                  <Link href="/admin" onClick={() => setMobileOpen(false)} className="flex min-h-12 items-center text-[0.9375rem] font-extrabold text-gold-bright">
                    Admin Panel
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}

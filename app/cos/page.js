"use client";
import { useState } from "react";
import Link from "next/link";
import PageShell, { PageHeading } from "../components/PageShell";
import { ArrowLeft, Cart, Check, Close, Minus, Plus } from "../components/icons";
import { useCos } from "../context/CosContext";
import { imaginePrincipala } from "../lib/imagini";

const lbl = "mb-1.5 block text-[0.75rem] font-semibold text-white/80";
const eroareCls = "mt-1 text-[0.75rem] text-[#ff7a6e]";

export default function CosPage() {
  const { cos, stergeItem, actualizeazaCantitate, total, numarArticole, golesteCos } = useCos();
  const [etapa, setEtapa] = useState("cos"); // "cos" | "formular" | "confirmat"
  const [trimis, setTrimis] = useState(false);
  const [form, setForm] = useState({ nume: "", prenume: "", email: "", adresa: "" });
  const [erori, setErori] = useState({});

  function set(k, v) { setForm(f => ({ ...f, [k]: v })); }

  function valideaza() {
    const e = {};
    if (!form.nume.trim()) e.nume = "Câmp obligatoriu";
    if (!form.prenume.trim()) e.prenume = "Câmp obligatoriu";
    if (!form.adresa.trim()) e.adresa = "Câmp obligatoriu";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email invalid";
    setErori(e);
    return Object.keys(e).length === 0;
  }

  async function trimiteComanda() {
    if (!valideaza()) return;
    setTrimis(true);

    const orderId = Math.floor(100000 + Math.random() * 900000);

    const linii = cos.map(i =>
      `• ${i.produs.name}${i.culoare ? ` (${i.culoare})` : ""}${i.marime ? ` - ${i.marime}` : ""} x${i.cantitate} = ${(i.produs.price * i.cantitate).toLocaleString("ro-RO")} lei`
    ).join("\n");

    const mesaj = `🛒 <b>Comandă Nouă | NR: #${orderId}</b>\n===============================\n👤 <b>Nume &amp; Prenume:</b> ${form.nume} ${form.prenume}\n📍 <b>Adresa:</b> ${form.adresa}${form.email ? `\n📧 <b>Email:</b> ${form.email}` : ""}\n===============================\n<b>Produse:</b>\n${linii}\n\n💰 <b>Total: ${total.toLocaleString("ro-RO")} lei</b>\n===============================\n📌 Status: ⏳ În așteptare`;

    await fetch("/api/telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mesaj, orderId: String(orderId) }),
    });

    golesteCos();
    setEtapa("confirmat");
    setTrimis(false);
  }

  if (etapa === "confirmat") {
    return (
      <PageShell narrow>
        <div className="py-10 text-center">
          <span className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full border-2 border-gold-bright text-gold-bright shadow-[0_0_1.5rem_rgba(244,200,74,0.3)]">
            <Check className="h-10 w-10" />
          </span>
          <h1 className="font-display text-[max(34px,3.4vw)] font-extrabold italic uppercase leading-none">
            Comandă <span className="gold-text">plasată!</span>
          </h1>
          <p className="mx-auto mb-9 mt-4 max-w-[30rem] text-[1rem] leading-relaxed text-white/80">
            Îți mulțumim, <b className="text-white">{form.nume}</b>! Comanda ta a fost primită și te vom contacta în curând.
          </p>
          <Link href="/" className="btn-gold h-12 px-9 text-[0.875rem] uppercase tracking-[0.08em]">
            Înapoi acasă
          </Link>
        </div>
      </PageShell>
    );
  }

  if (etapa === "formular") {
    return (
      <PageShell narrow>
        <button type="button" onClick={() => setEtapa("cos")} className="mb-6 inline-flex cursor-pointer items-center gap-2 text-[0.875rem] font-semibold text-white/70 transition hover:text-gold-bright">
          <ArrowLeft className="h-4 w-4" /> Înapoi la coș
        </button>
        <PageHeading title="Detalii" accent="livrare" description="Completează datele pentru a finaliza comanda." />

        <div className="mt-8 flex flex-col gap-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="c-nume" className={lbl}>Nume *</label>
              <input id="c-nume" className="field" aria-invalid={!!erori.nume} value={form.nume} onChange={e => set("nume", e.target.value)} placeholder="Popescu" autoComplete="family-name" />
              {erori.nume && <p className={eroareCls}>{erori.nume}</p>}
            </div>
            <div>
              <label htmlFor="c-prenume" className={lbl}>Prenume *</label>
              <input id="c-prenume" className="field" aria-invalid={!!erori.prenume} value={form.prenume} onChange={e => set("prenume", e.target.value)} placeholder="Ion" autoComplete="given-name" />
              {erori.prenume && <p className={eroareCls}>{erori.prenume}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="c-email" className={lbl}>Email <span className="font-normal text-white/50">(opțional)</span></label>
            <input id="c-email" className="field" aria-invalid={!!erori.email} type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="ion@gmail.com" autoComplete="email" />
            {erori.email && <p className={eroareCls}>{erori.email}</p>}
          </div>

          <div>
            <label htmlFor="c-adresa" className={lbl}>Adresă de livrare *</label>
            <textarea id="c-adresa" className="field h-24 resize-y" aria-invalid={!!erori.adresa} value={form.adresa} onChange={e => set("adresa", e.target.value)} placeholder="Str. Exemplu nr. 10, Chișinău" autoComplete="street-address" />
            {erori.adresa && <p className={eroareCls}>{erori.adresa}</p>}
          </div>

          <div className="panel p-5">
            <p className="mb-3 text-[0.875rem] font-bold text-gold-bright">Sumar comandă</p>
            {cos.map(i => (
              <div key={i.key} className="mb-1.5 flex justify-between gap-4 text-[0.8125rem] text-white/75">
                <span>{i.produs.name} x{i.cantitate}</span>
                <span className="shrink-0">{(i.produs.price * i.cantitate).toLocaleString("ro-RO")} lei</span>
              </div>
            ))}
            <div className="mt-3 flex justify-between border-t border-gold/20 pt-3 text-[0.9375rem] font-extrabold">
              <span>Total</span>
              <span className="text-gold-bright">{total.toLocaleString("ro-RO")} lei</span>
            </div>
          </div>

          <button type="button" onClick={trimiteComanda} disabled={trimis} className="btn-gold h-14 px-6 text-[0.9375rem] uppercase tracking-[0.08em]">
            {trimis ? "Se trimite..." : `Plasează comanda — ${total.toLocaleString("ro-RO")} lei`}
          </button>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageHeading
        crumbs={[{ label: "Acasă", href: "/" }, { label: "Coș" }]}
        title="Coșul"
        accent={`tău (${numarArticole})`}
      />

      {cos.length === 0 ? (
        <div className="flex flex-col items-center gap-4 pt-14 text-center">
          <Cart className="h-14 w-14 text-gold/60" strokeWidth={1.2} />
          <p className="text-[0.9375rem] text-white/70">Coșul tău este gol.</p>
          <Link href="/produse" className="btn-gold h-11 px-8 text-[0.8125rem] uppercase tracking-[0.08em]">
            Continuă cumpărăturile
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid items-start gap-8 lg:mt-[2.4vw] lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-[3vw]">
          <ul className="flex flex-col">
            {cos.map(item => {
              const img = imaginePrincipala(item.produs);
              return (
                <li key={item.key} className="flex items-start gap-5 border-b border-white/10 py-5 first:pt-0">
                  {img && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <Link href={`/produse/${item.produs.id}`} className="block aspect-[1336/1096] w-32 shrink-0 overflow-hidden rounded-xl border border-gold/25 bg-[radial-gradient(70%_70%_at_50%_45%,rgba(244,200,74,0.1),transparent_75%),linear-gradient(180deg,#0b120e,#050a07)] sm:w-40">
                      <img src={img} alt={item.produs.name} className="h-full w-full object-contain p-[4%]" />
                    </Link>
                  )}
                  <div className="flex flex-1 flex-col gap-1.5">
                    <Link href={`/produse/${item.produs.id}`} className="text-[1rem] font-bold text-white transition hover:text-gold-bright">{item.produs.name}</Link>
                    {item.culoare && <p className="text-[0.8125rem] text-white/60">Culoare: {item.culoare}</p>}
                    {item.marime && <p className="text-[0.8125rem] text-white/60">Mărime: {item.marime}</p>}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center overflow-hidden rounded-lg border border-gold/30">
                        <button type="button" aria-label="Scade cantitatea" onClick={() => actualizeazaCantitate(item.key, item.cantitate - 1)} className="grid h-9 w-9 cursor-pointer place-items-center text-gold-bright transition hover:bg-brand/50">
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-9 text-center text-[0.875rem] font-semibold">{item.cantitate}</span>
                        <button type="button" aria-label="Crește cantitatea" onClick={() => actualizeazaCantitate(item.key, item.cantitate + 1)} className="grid h-9 w-9 cursor-pointer place-items-center text-gold-bright transition hover:bg-brand/50">
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[0.9375rem] font-extrabold text-gold-bright">{(item.produs.price * item.cantitate).toLocaleString("ro-RO")} lei</span>
                        <button type="button" aria-label={`Șterge ${item.produs.name} din coș`} onClick={() => stergeItem(item.key)} className="cursor-pointer text-white/60 transition hover:text-gold-bright">
                          <Close className="h-[1.125rem] w-[1.125rem]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="panel p-7 lg:sticky lg:top-8">
            <p className="mb-5 text-[1rem] font-extrabold uppercase tracking-[0.04em]">
              Sumar <span className="text-gold-bright">comandă</span>
            </p>
            {cos.map(i => (
              <div key={i.key} className="mb-2 flex justify-between gap-4 text-[0.875rem] text-white/75">
                <span>{i.produs.name} x{i.cantitate}</span>
                <span className="shrink-0">{(i.produs.price * i.cantitate).toLocaleString("ro-RO")} lei</span>
              </div>
            ))}
            <div className="mb-6 mt-4 flex justify-between border-t border-gold/20 pt-4 text-[1rem] font-extrabold">
              <span>Total</span>
              <span className="text-gold-bright">{total.toLocaleString("ro-RO")} lei</span>
            </div>
            <button type="button" onClick={() => setEtapa("formular")} className="btn-gold h-14 w-full text-[0.875rem] uppercase tracking-[0.08em]">
              Finalizează comanda
            </button>
          </div>
        </div>
      )}
    </PageShell>
  );
}

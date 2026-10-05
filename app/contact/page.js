"use client";
import { useState } from "react";
import PageShell, { PageHeading } from "../components/PageShell";
import { Check, Clock, Mail, Phone, Pin } from "../components/icons";
import { CONTACT } from "../lib/contact";
import { esc, trimiteTelegram } from "../lib/telegram-client";

const lbl = "mb-1.5 block text-[0.75rem] font-semibold text-white/80";

const info = [
  { Icon: Pin, titlu: "Adresă", text: CONTACT.address, href: CONTACT.mapsHref },
  { Icon: Mail, titlu: "Email", text: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { Icon: Phone, titlu: "Telefon", text: CONTACT.phone, href: CONTACT.phoneHref },
  { Icon: Clock, titlu: "Program", text: CONTACT.hours.join(", ") },
];

export default function ContactPage() {
  const [form, setForm] = useState({ nume: "", email: "", mesaj: "" });
  const [stare, setStare] = useState("idle"); // idle | sending | sent | error

  function set(k, v) { setForm(f => ({ ...f, [k]: v })); }

  async function submit(e) {
    e.preventDefault();
    if (!form.nume || !form.email || !form.mesaj) return;
    setStare("sending");

    const ok = await trimiteTelegram(
      `📩 <b>Mesaj nou de contact!</b>\n\n👤 <b>Nume:</b> ${esc(form.nume)}\n📧 <b>Email:</b> ${esc(form.email)}\n\n💬 <b>Mesaj:</b>\n${esc(form.mesaj)}`
    );

    if (ok) setForm({ nume: "", email: "", mesaj: "" });
    setStare(ok ? "sent" : "error");
  }

  return (
    <PageShell>
      <PageHeading
        crumbs={[{ label: "Acasă", href: "/" }, { label: "Contact" }]}
        title="Scrie-"
        accent="ne"
        description="Suntem aici pentru orice întrebare sau comandă specială."
      />

      <div className="mt-10 grid gap-10 lg:mt-[3vw] lg:grid-cols-[1fr_1.1fr] lg:gap-[3vw]">
        {/* Info */}
        <ul className="flex flex-col gap-4">
          {info.map(({ Icon, titlu, text, href }) => (
            <li key={titlu} className="panel flex items-center gap-4 p-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-gold/40 bg-forest-950/70 text-gold-bright shadow-[0_0_0.75rem_rgba(31,106,54,0.35)]">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <p className="text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-gold-bright">{titlu}</p>
                {href ? (
                  <a href={href} className="mt-0.5 block text-[0.9375rem] text-white/90 transition hover:text-gold-bright" {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    {text}
                  </a>
                ) : (
                  <p className="mt-0.5 text-[0.9375rem] text-white/90">{text}</p>
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* Formular */}
        {stare === "sent" ? (
          <div className="panel flex flex-col items-center justify-center p-10 text-center">
            <span className="mb-4 grid h-16 w-16 place-items-center rounded-full border-2 border-gold-bright text-gold-bright">
              <Check className="h-8 w-8" />
            </span>
            <h2 className="font-display text-[2rem] font-extrabold italic uppercase leading-none">
              Mesaj <span className="gold-text">trimis!</span>
            </h2>
            <p className="mt-3 text-white/75">Te vom contacta în cel mai scurt timp.</p>
            <button type="button" onClick={() => setStare("idle")} className="btn-outline mt-6 h-11 px-7 text-[0.875rem]">
              Trimite alt mesaj
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="panel flex flex-col gap-5 p-6 lg:p-[2vw]">
            <div>
              <label htmlFor="ct-nume" className={lbl}>Nume *</label>
              <input id="ct-nume" className="field" value={form.nume} onChange={e => set("nume", e.target.value)} placeholder="Ion Popescu" autoComplete="name" required />
            </div>
            <div>
              <label htmlFor="ct-email" className={lbl}>Email *</label>
              <input id="ct-email" className="field" type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="ion@gmail.com" autoComplete="email" required />
            </div>
            <div>
              <label htmlFor="ct-mesaj" className={lbl}>Mesaj *</label>
              <textarea id="ct-mesaj" className="field h-36 resize-y" value={form.mesaj} onChange={e => set("mesaj", e.target.value)} placeholder="Scrie mesajul tău..." required />
            </div>
            <button type="submit" disabled={stare === "sending"} className="btn-gold h-14 text-[0.9375rem] uppercase tracking-[0.08em]">
              {stare === "sending" ? "Se trimite..." : "Trimite mesajul"}
            </button>
            <p role="status" className="text-[0.8125rem] font-semibold text-[#ff7a6e]">
              {stare === "error" && "Mesajul nu a putut fi trimis. Încearcă din nou sau sună-ne."}
            </p>
          </form>
        )}
      </div>

      {/* Harta */}
      <div className="mt-12 overflow-hidden rounded-2xl border border-gold/25 shadow-[0_0_1.5rem_rgba(31,106,54,0.3)] lg:mt-[4vw]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2718.0!2d28.8817099!3d46.980252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c9794212f4da21%3A0x4f477090435505a0!2sSarmizegetusa+St+92%2C+Chi%C8%99in%C4%83u%2C+Moldova!5e0!3m2!1sro!2smd!4v1748900000000"
          width="100%"
          height="420"
          className="block border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Hartă Paradox Craft"
        />
      </div>
    </PageShell>
  );
}

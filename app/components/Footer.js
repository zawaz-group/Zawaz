import Link from "next/link";
import { CONTACT } from "../lib/contact";
import { Chat, Clock, Diamond, Facebook, Gift, Instagram, Mail, Shield, TikTok, Truck } from "./icons";
import Logo from "./Logo";
import Newsletter from "./Newsletter";

const socialIcons = { instagram: Instagram, tiktok: TikTok, facebook: Facebook };

const produse = [
  { label: "Toate produsele", href: "/produse" },
  { label: "Best Seller", href: "/populare" },
  { label: "Reduceri", href: "/reduceri" },
  { label: "Modele personalizate", href: "/#personalizate", badge: "NOU" },
];

const info = [
  { label: "Despre noi", href: "/despre-noi" },
  { label: "Cum funcționează", href: "/#cum-functioneaza" },
  { label: "Livrare și plată", href: "/#livrare" },
  { label: "Retur și garanție", href: "/#retur" },
  { label: "Întrebări frecvente", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];

const legal = [
  { label: "Termeni și condiții", href: "/#termeni" },
  { label: "Politica de confidențialitate", href: "/#confidentialitate" },
  { label: "Politica de cookie-uri", href: "/#cookies" },
];

const perks = [
  { Icon: Diamond, title: "Design unic", sub: "Modele exclusive" },
  { Icon: Shield, title: "Materiale premium", sub: "Rezistente și durabile" },
  { Icon: Gift, title: "Cadou perfect", sub: "Pentru orice vârstă" },
  { Icon: Truck, title: "Livrare rapidă", sub: "1-3 zile în toată Moldova" },
];

function Heading({ children }) {
  return (
    <div>
      <h3 className="text-[0.9375rem] font-extrabold uppercase tracking-[0.03em] text-white lg:text-[max(13px,1.17vw)]">{children}</h3>
      <span className="mt-2 block h-[2px] w-7 bg-gold-bright lg:mt-[0.55vw] lg:w-[1.8vw]" />
    </div>
  );
}

function LinkList({ items }) {
  return (
    <ul className="mt-4 space-y-2.5 lg:mt-[1.2vw] lg:space-y-[0.85vw]">
      {items.map((l) => (
        <li key={l.label} className="flex items-start gap-1">
          <Link href={l.href} className="text-[0.9375rem] text-white/90 transition hover:text-gold-bright lg:text-[max(13px,1.1vw)]">
            {l.label}
          </Link>
          {l.badge && (
            <span className="rounded-[0.2rem] bg-brand px-1.5 py-0.5 text-[0.5625rem] font-extrabold leading-none text-white lg:px-[0.35vw] lg:py-[0.18vw] lg:text-[max(8px,0.55vw)]">
              {l.badge}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="footer-bg relative isolate overflow-hidden bg-forest-950 bg-cover bg-bottom bg-no-repeat">
      {/* strat întunecat: păstrează textul lizibil, lasă pensulele sus și stâncile jos */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(2,12,9,0.2)_0%,rgba(2,12,9,0.5)_30%,rgba(2,12,9,0.62)_60%,rgba(2,12,9,0.68)_88%,rgba(2,12,9,0.5)_100%)] lg:bg-[linear-gradient(180deg,rgba(2,12,9,0.15)_0%,rgba(2,12,9,0.55)_30%,rgba(2,12,9,0.9)_45%,rgba(2,12,9,0.9)_74%,rgba(2,12,9,0.6)_86%,rgba(2,12,9,0.35)_100%)]"
      />

      {/* rând liber deasupra benzii de newsletter (din design) */}
      <div className="h-8 lg:h-[3vw]" aria-hidden />

      <Newsletter />

      {/* corp footer */}
      <div className="mx-5 grid gap-10 py-12 sm:grid-cols-2 lg:mx-0 lg:block lg:h-[27vw] lg:py-0">
        <div className="lg:absolute lg:left-[5.2vw] lg:top-[calc(3vw+15.8vw+4.7vw)] lg:w-[24vw]">
          <Logo large />
          <p className="mt-5 max-w-[24rem] text-[0.9375rem] leading-relaxed text-white/90 lg:mt-[1.6vw] lg:max-w-none lg:text-[max(13px,1.1vw)]">
            Pușculițe unice, create din materiale premium, cu design modern și detalii care fac diferența. Un cadou perfect pentru orice pasiune.
          </p>
          <ul className="mt-5 flex gap-3 lg:mt-[1.7vw] lg:gap-[0.9vw]">
            {CONTACT.social.map((s) => {
              const Icon = socialIcons[s.id];
              return (
                <li key={s.id}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-12 w-12 place-items-center rounded-xl border border-gold/40 bg-black/45 text-white transition hover:border-gold-bright hover:text-gold-bright lg:h-[3.45vw] lg:w-[3.45vw] lg:rounded-[0.8vw]"
                  >
                    <Icon className="h-[48%] w-[48%]" />
                  </a>
                </li>
              );
            })}
          </ul>
          <p className="mt-3 text-[0.9375rem] text-white/90 lg:mt-[0.7vw] lg:text-[max(13px,1.1vw)]">{CONTACT.handle}</p>
        </div>

        <div className="lg:absolute lg:left-[31.8vw] lg:top-[calc(3vw+15.8vw+5.9vw)]">
          <Heading>Produse</Heading>
          <LinkList items={produse} />
        </div>

        <div className="lg:absolute lg:left-[46.7vw] lg:top-[calc(3vw+15.8vw+5.9vw)]">
          <Heading>Informații</Heading>
          <LinkList items={info} />
        </div>

        <div className="lg:absolute lg:left-[60.3vw] lg:top-[calc(3vw+15.8vw+5.9vw)]">
          <Heading>Suport</Heading>
          <ul className="mt-4 space-y-5 lg:mt-[1.5vw] lg:space-y-[1.5vw]">
            <li className="flex items-start gap-4 lg:gap-[1.1vw]">
              <Chat className="h-8 w-8 shrink-0 text-gold-bright lg:h-[2.2vw] lg:w-[2.2vw]" />
              <div className="text-[0.9375rem] leading-snug text-white/90 lg:text-[max(13px,1.05vw)]">
                <b className="text-[0.8125rem] text-white lg:text-[max(12px,0.95vw)]">Scrie-ne pe WhatsApp</b>
                <br />
                <a href={CONTACT.whatsappHref} className="transition hover:text-gold-bright">{CONTACT.phone}</a>
              </div>
            </li>
            <li className="flex items-start gap-4 lg:gap-[1.1vw]">
              <Mail className="h-8 w-8 shrink-0 text-gold-bright lg:h-[2.2vw] lg:w-[2.2vw]" />
              <div className="text-[0.9375rem] leading-snug text-white/90 lg:text-[max(13px,1.05vw)]">
                <b className="text-[0.8125rem] text-white lg:text-[max(12px,0.95vw)]">Email</b>
                <br />
                <a href={`mailto:${CONTACT.email}`} className="transition hover:text-gold-bright">{CONTACT.email}</a>
              </div>
            </li>
            <li className="flex items-start gap-4 lg:gap-[1.1vw]">
              <Clock className="h-8 w-8 shrink-0 text-gold-bright lg:h-[2.2vw] lg:w-[2.2vw]" />
              <div className="text-[0.9375rem] leading-snug text-white/90 lg:text-[max(13px,1.05vw)]">
                <b className="text-[0.8125rem] text-white lg:text-[max(12px,0.95vw)]">Program</b>
                {CONTACT.hours.map((h) => (
                  <div key={h}>{h}</div>
                ))}
              </div>
            </li>
          </ul>
        </div>

        <ul className="space-y-5 lg:absolute lg:left-[78.4vw] lg:top-[calc(3vw+15.8vw+6vw)] lg:h-[17vw] lg:space-y-[1.8vw] lg:border-l lg:border-gold/40 lg:pl-[2.3vw] lg:pt-[1.2vw]">
          {perks.map(({ Icon, title, sub }) => (
            <li key={title} className="flex items-center gap-4 lg:gap-[1.2vw]">
              <Icon className="h-9 w-9 shrink-0 text-gold-bright lg:h-[2.6vw] lg:w-[2.6vw]" />
              <div className="leading-tight">
                <div className="text-[0.9375rem] font-bold text-white lg:text-[max(13px,1.05vw)]">{title}</div>
                <div className="mt-1 text-[0.8125rem] text-white/80 lg:text-[max(11px,0.95vw)]">{sub}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* bara de jos */}
      <div className="border-t border-gold/30 lg:h-[6vw]">
        <div className="mx-5 flex flex-col items-center justify-between gap-4 py-8 text-center lg:mx-0 lg:flex-row lg:items-start lg:px-[5.3vw] lg:pt-[1.4vw] lg:text-left">
          <p className="text-[0.8125rem] text-white/85 lg:text-[max(11px,0.95vw)]">© {new Date().getFullYear()} Paradox Craft. Toate drepturile rezervate.</p>
          <ul className="flex flex-wrap justify-center gap-y-2 text-[0.75rem] text-white/90 lg:text-[max(10px,0.78vw)]">
            {legal.map((l, i) => (
              <li key={l.label} className={`px-3 lg:px-[0.9vw] ${i > 0 ? "border-l border-white/30" : ""}`}>
                <Link href={l.href} className="transition hover:text-gold-bright">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

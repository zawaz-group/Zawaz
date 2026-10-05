import Link from "next/link";
import Faq from "../components/Faq";
import PageShell, { PageHeading } from "../components/PageShell";
import { Hammer, Heart, Leaf, Sprout } from "../components/icons";

const valori = [
  { Icon: Leaf, titlu: "Lemn natural", text: "Folosim exclusiv lemn masiv de calitate superioară, selectat cu grijă pentru durabilitate și estetică." },
  { Icon: Hammer, titlu: "Lucrat manual", text: "Fiecare produs trece prin mâinile meșterilor noștri. Nu există două piese identice — fiecare e unică." },
  { Icon: Sprout, titlu: "Sustenabil", text: "Ne aprovizionăm responsabil și minimizăm risipa. Ambalajele sunt 100% reciclabile." },
  { Icon: Heart, titlu: "Cu suflet", text: "Punem pasiune în tot ce facem. Satisfacția ta este cel mai important lucru pentru noi." },
];

const intrebari = [
  { q: "Din ce material sunt fabricate produsele Paradox Craft?", a: "Toate produsele noastre sunt fabricate din lemn masiv natural, selectat cu atenție pentru calitate și durabilitate. Nu folosim MDF sau materiale sintetice." },
  { q: "Cât durează livrarea?", a: "Comenzile sunt procesate în 1-2 zile lucrătoare. Livrarea standard durează 3-5 zile lucrătoare pe teritoriul României. Oferim și livrare express în 24h în orașele mari." },
  { q: "Produsele pot fi personalizate?", a: "Da! Oferim servicii de personalizare — gravare cu nume, mesaj sau dată specială. Contactați-ne pe WhatsApp sau email pentru detalii și prețuri." },
  { q: "Care este politica de retur?", a: "Acceptăm retururi în termen de 30 de zile de la primirea comenzii, cu condiția ca produsul să fie în starea originală. Produsele personalizate nu pot fi returnate." },
  { q: "Produsele sunt sigure pentru copii?", a: "Da, folosim lacuri și vopsele non-toxice, certificate pentru siguranța copiilor. Produsele sunt testate și respectă standardele europene EN 71." },
  { q: "Cum îngrijesc produsul din lemn?", a: "Ștergeți cu o cârpă uscată sau ușor umezită. Evitați expunerea directă la apă sau umiditate excesivă. O dată pe an puteți aplica un strat subțire de ulei de lemn pentru a menține aspectul." },
  { q: "Oferiți livrare internațională?", a: "Da, livrăm în toată Europa. Costul și termenul de livrare variază în funcție de țară. La finalizarea comenzii veți vedea opțiunile disponibile pentru adresa dvs." },
  { q: "Pot să comand ca persoană juridică (factură fiscală)?", a: "Absolut. La plasarea comenzii selectați opțiunea 'Persoană juridică' și completați datele firmei. Factura fiscală se emite automat și se trimite pe email." },
  { q: "Ce fac dacă produsul a ajuns deteriorat?", a: "Ne pare rău pentru inconvenient! Contactați-ne în 48h de la primire cu fotografii ale produsului și ambalajului. Vom înlocui produsul sau vom emite un rambursare completă." },
  { q: "Puteți realiza comenzi de grup sau corporate?", a: "Da! Oferim discounturi speciale pentru comenzi de peste 10 bucăți. Suntem parteneri ideali pentru cadouri corporate, botezuri, nunți sau alte evenimente speciale. Contactați-ne pentru o ofertă personalizată." },
];

export default function DespreNoi() {
  return (
    <PageShell>
      <PageHeading
        crumbs={[{ label: "Acasă", href: "/" }, { label: "Despre noi" }]}
        title="Creăm cu pasiune"
        accent="din lemn natural"
        description="Paradox Craft s-a născut din dragostea pentru materiale naturale și designul simplu, autentic. Fiecare produs este creat manual, cu atenție la detalii."
      />

      {/* Valori */}
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-[4vw] lg:grid-cols-4 lg:gap-[1.5vw]">
        {valori.map(({ Icon, titlu, text }) => (
          <li key={titlu} className="panel flex flex-col gap-3.5 p-6 lg:p-[1.6vw]">
            <span className="grid h-14 w-14 place-items-center rounded-xl border border-gold/40 bg-forest-950/70 text-gold-bright shadow-[0_0_0.75rem_rgba(31,106,54,0.35)] lg:h-[3.6vw] lg:w-[3.6vw]">
              <Icon className="h-[55%] w-[55%]" />
            </span>
            <h2 className="text-[1.25rem] font-extrabold text-white lg:text-[max(18px,1.4vw)]">{titlu}</h2>
            <p className="text-[0.9375rem] leading-relaxed text-white/75 lg:text-[max(13px,1vw)]">{text}</p>
          </li>
        ))}
      </ul>

      {/* Întrebări frecvente */}
      <div className="mx-auto mt-14 max-w-[50rem] lg:mt-[5vw]">
        <Faq items={intrebari} id="faq-despre" />
      </div>

      {/* CTA */}
      <div className="panel mt-14 px-6 py-12 text-center lg:mt-[5vw] lg:py-[4vw]">
        <h2 className="font-display text-[max(30px,2.7vw)] font-extrabold italic uppercase leading-[0.95]">
          Descoperă <span className="gold-text">colecțiile noastre</span>
        </h2>
        <p className="mb-8 mt-3 text-[1rem] text-white/75">Stative și pușculițe create cu dragoste, pentru casa ta.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/produse?categorie=stative" className="btn-gold h-12 px-8 text-[0.875rem] uppercase tracking-[0.08em]">
            Stative
          </Link>
          <Link href="/produse?categorie=pusculite" className="btn-outline h-12 px-8 text-[0.875rem] uppercase tracking-[0.08em]">
            Pușculițe
          </Link>
        </div>
      </div>
    </PageShell>
  );
}

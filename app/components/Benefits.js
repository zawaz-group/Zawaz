import { Diamond, Gear, Heart, Star } from "./icons";

const benefits = [
  { Icon: Diamond, title: "Design unic", sub: "Modele exclusive" },
  { Icon: Gear, title: "Materiale premium", sub: "Rezistente și durabile" },
  { Icon: Star, title: "Cadou ideal", sub: "Pentru orice pasionat" },
  { Icon: Heart, title: "Colecționează", sub: "Modele pentru toate gusturile" },
];

/**
 * Bandă cu 4 avantaje, între secțiuni. Pe desktop e o bandă centrată (nu pe toată lățimea),
 * cu linii subțiri verzui sus și jos, iar fiecare avantaj e aliniat la stânga, după un separator scurt.
 */
export default function Benefits() {
  return (
    <section aria-label="Avantaje" className="border-y border-[#8fae3c]/30 bg-[#02100b]/70">
      <ul className="mx-3 grid grid-cols-4 gap-1 py-1 lg:ml-[9.8vw] lg:mr-[9.7vw] lg:flex lg:justify-start lg:py-0">
        {benefits.map(({ Icon, title, sub }, i) => (
          <li
            key={title}
            className="relative flex items-center justify-center gap-1.5 px-0.5 py-3 sm:gap-3 sm:py-4 lg:justify-start lg:gap-[1.4vw] lg:px-[3.9vw] lg:py-[1.15vw]"
          >
            {i > 0 && <span aria-hidden className="absolute left-0 top-1/2 hidden h-[2.8vw] w-px -translate-y-1/2 bg-[#3f7a45]/70 lg:block" />}
            <Icon className="h-5 w-5 shrink-0 text-gold-bright sm:h-8 sm:w-8 lg:h-[2.4vw] lg:w-[2.4vw]" />
            <div className="leading-tight">
              <div className="text-[0.5625rem] font-bold text-white sm:text-[0.8125rem] lg:text-[max(12px,0.82vw)]">{title}</div>
              <div className="mt-px text-[0.5rem] text-white/70 sm:text-[0.6875rem] lg:mt-[0.2rem] lg:whitespace-nowrap lg:text-[max(10px,0.68vw)]">{sub}</div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

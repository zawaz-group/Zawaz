import Link from "next/link";

export default function Logo({ className = "", large = false }) {
  return (
    <Link href="/" aria-label="Paradox Craft" className={`inline-flex flex-col items-center ${className}`}>
      <span className={`flex items-end bg-gradient-to-b from-[#6ae38f] to-[#27a04c] bg-clip-text font-logo ${large ? "text-[max(30px,3.05vw)]" : "text-[1.2rem] sm:text-[1.6rem] lg:text-[max(24px,2.2vw)]"} font-extrabold leading-none tracking-[0.04em] text-transparent drop-shadow-[0_0_0.75rem_rgba(47,170,85,0.45)]`}>
        PAR
        <svg viewBox="0 0 44 44" className="mx-[0.05em] -mb-[0.02em] h-[1.5em] w-[1.5em]" aria-hidden>
          <path d="M22 3 41 40H3Z" fill="none" stroke="#f4c84a" strokeWidth="5" strokeLinejoin="round" />
          <path d="M22 17 29 32H15Z" fill="#f4c84a" />
        </svg>
        DOX
      </span>
      <span className={`mt-[0.35vw] flex w-[68%] justify-between font-logo ${large ? "text-[max(12px,1.15vw)]" : "text-[0.5rem] sm:text-[0.625rem] lg:text-[max(10px,0.85vw)]"} font-extrabold leading-none text-white`}>
        {"CRAFT".split("").map((ch, i) => (
          <span key={i}>{ch}</span>
        ))}
      </span>
    </Link>
  );
}

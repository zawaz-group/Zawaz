import Link from "next/link";

/** Pastila din design: aurie când e activă, contur auriu discret când nu. */
export const chipClass = (active) =>
  `inline-flex items-center rounded-full border px-4 py-2 text-[0.8125rem] font-semibold transition lg:px-[1.2vw] lg:py-[0.55vw] lg:text-[max(13px,0.9vw)] ${
    active
      ? "border-gold-bright bg-gradient-to-b from-[#ffd868] to-[#e3a92a] text-forest-950 shadow-[0_0.25rem_1rem_rgba(244,200,74,0.3)]"
      : "border-gold/30 bg-forest-950/70 text-white hover:border-gold/70 hover:text-gold-bright"
  }`;

export function ChipButton({ active, onClick, children, className = "", ...rest }) {
  return (
    <button type="button" aria-pressed={!!active} onClick={onClick} className={`${chipClass(active)} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function ChipLink({ active, href, children, className = "", ...rest }) {
  return (
    <Link href={href} aria-current={active ? "page" : undefined} className={`${chipClass(active)} ${className}`} {...rest}>
      {children}
    </Link>
  );
}

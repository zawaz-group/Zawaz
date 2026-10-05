import { Crown } from "./icons";

/** Poza unei categorii; fără poză rămâne un fundal cu coroana din design. */
export default function CategoryArt({ image }) {
  return (
    <div
      className="absolute inset-0 grid place-items-center"
      style={{ background: "radial-gradient(60% 70% at 40% 50%, rgba(244,200,74,0.16), transparent 70%), linear-gradient(180deg,#14130e,#0a0f0b)" }}
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt="" loading="lazy" className="h-full w-full object-cover" />
      ) : (
        <Crown className="h-1/3 w-1/3 opacity-60" />
      )}
    </div>
  );
}

const images = ["/categori_background.webp", "/background2.webp", "/background3.webp"];
const TILES = 12;
// cât din înălțimea unei plăci se suprapune cu cea de deasupra (crossfade)
const OVERLAP = 0.2;

/**
 * Fundal în plăci: categori_background, background2 și background3 la mărimea lor originală (1983×793),
 * alternate pe verticală. Plăcile se topesc una în alta (nu au margini care să se potrivească exact),
 * fără straturi de culoare adăugate. Părintele trebuie să fie `relative isolate`.
 */
export default function BackgroundStack() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {Array.from({ length: TILES }, (_, i) => (
        <div
          key={i}
          style={{
            height: "var(--bg-h)",
            marginTop: i === 0 ? 0 : `calc(var(--bg-h) * -${OVERLAP})`,
            backgroundImage: `url("${images[i % images.length]}")`,
            backgroundSize: "var(--bg-w) var(--bg-h)",
            backgroundPosition: "center top",
            backgroundRepeat: "no-repeat",
            ...(i === 0
              ? {}
              : { maskImage: `linear-gradient(to bottom, transparent 0, #000 ${OVERLAP * 100}%)` }),
          }}
        />
      ))}
    </div>
  );
}

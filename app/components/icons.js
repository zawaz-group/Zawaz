const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const ChevronDown = (p) => (
  <svg {...base} strokeWidth={2.2} {...p}><path d="m6 9 6 6 6-6" /></svg>
);
export const ChevronLeft = (p) => (
  <svg {...base} strokeWidth={2.2} {...p}><path d="m15 6-6 6 6 6" /></svg>
);
export const ChevronRight = (p) => (
  <svg {...base} strokeWidth={2.2} {...p}><path d="m9 6 6 6-6 6" /></svg>
);
export const ChevronUp = (p) => (
  <svg {...base} strokeWidth={2.4} {...p}><path d="m6 15 6-6 6 6" /></svg>
);
export const ArrowRight = (p) => (
  <svg {...base} strokeWidth={2} {...p}><path d="M4 12h16m-6-6 6 6-6 6" /></svg>
);
export const ArrowLeft = (p) => (
  <svg {...base} strokeWidth={2} {...p}><path d="M20 12H4m6-6-6 6 6 6" /></svg>
);
export const Search = (p) => (
  <svg {...base} {...p}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></svg>
);
export const User = (p) => (
  <svg {...base} {...p}><circle cx="12" cy="8" r="4.2" /><path d="M4 20.5c.6-4 3.8-6 8-6s7.4 2 8 6" /></svg>
);
export const Cart = (p) => (
  <svg {...base} {...p}><path d="M3 4h2.4l2.1 11h10.2l2-8H6.2" /><circle cx="9.5" cy="19.5" r="1.4" /><circle cx="17" cy="19.5" r="1.4" /></svg>
);
export const Heart = (p) => (
  <svg {...base} {...p}><path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20Z" /></svg>
);
export const Truck = (p) => (
  <svg {...base} strokeWidth={1.4} {...p}><path d="M2 6h11v10H2zM13 9.5h4.5L21 13v3h-8" /><circle cx="6.5" cy="17.5" r="1.8" /><circle cx="16.5" cy="17.5" r="1.8" /></svg>
);
export const Shield = (p) => (
  <svg {...base} strokeWidth={1.4} {...p}><path d="M12 2.5 4.5 5.5v6c0 4.6 3 8.2 7.5 10 4.5-1.8 7.5-5.4 7.5-10v-6z" /><path d="m8.6 12 2.5 2.5 4.3-4.8" /></svg>
);
export const Gift = (p) => (
  <svg {...base} strokeWidth={1.4} {...p}><rect x="3" y="8.5" width="18" height="4" rx=".8" /><path d="M5 12.5V21h14v-8.5M12 8.5V21M12 8.5C10 8.5 7.5 8 7.5 6a2.2 2.2 0 0 1 4.5 0c0-1.5 3.5-2.8 4.5 0 .6 2-2.5 2.5-4.5 2.5Z" /></svg>
);
export const Headset = (p) => (
  <svg {...base} strokeWidth={1.4} {...p}><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="13" width="4" height="6" rx="1.5" /><rect x="17" y="13" width="4" height="6" rx="1.5" /><path d="M19 19c0 1.8-1.6 2.5-4 2.5h-1.5" /></svg>
);

/** Coroană desenată de mână, accent auriu. */
export const Crown = (p) => (
  <svg viewBox="0 0 60 44" fill="none" stroke="#f4c84a" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M6 36 3 12l14 11L30 5l13 18 14-11-3 24Z" />
    <path d="M9 40h42" />
  </svg>
);

export const Diamond = (p) => (
  <svg {...base} strokeWidth={1.3} {...p}><path d="M6.5 3h11L22 9l-10 12L2 9z" /><path d="M2 9h20M9 3 7 9l5 12 5-12-2-6" /></svg>
);
export const Gear = (p) => (
  <svg {...base} strokeWidth={1.3} {...p}><circle cx="12" cy="12" r="3.2" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
);
export const Star = (p) => (
  <svg {...base} strokeWidth={1.3} {...p}><path d="m12 2.5 3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 18.3l-6.2 3.3L7 14.7 2 9.8l6.9-1z" /></svg>
);
export const Smile = (p) => (
  <svg {...base} strokeWidth={1.4} {...p}><circle cx="12" cy="12" r="9" /><path d="M8 14s1.5 2.2 4 2.2 4-2.2 4-2.2M9 9.5h.01M15 9.5h.01" /></svg>
);
export const Gamepad = (p) => (
  <svg {...base} strokeWidth={1.4} {...p}><rect x="2" y="6" width="20" height="12" rx="4" /><path d="M6 12h4M8 10v4M15 13h.01M18 11h.01" /></svg>
);
export const Car = (p) => (
  <svg {...base} strokeWidth={1.4} {...p}><path d="M3 15v-3l2-5h14l2 5v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" /><path d="M3 12h18M7 16v2.5M17 16v2.5M7.5 14h.01M16.5 14h.01" /></svg>
);
export const Palette = (p) => (
  <svg {...base} strokeWidth={1.4} {...p}><path d="M12 3a9 9 0 1 0 0 18c1.4 0 2-.9 2-1.8 0-1.2-1-1.5-1-2.7 0-1 .8-1.6 1.8-1.6H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3Z" /><path d="M7.5 11h.01M10 7.5h.01M14.5 7.5h.01" /></svg>
);
export const Sparkle = (p) => (
  <svg {...base} strokeWidth={1.4} {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" /></svg>
);

export const Leaf = (p) => (
  <svg {...base} strokeWidth={1.4} {...p}><path d="M12 2C6 8 4 12 4 15a8 8 0 0 0 16 0c0-3-2-7-8-13Z" /><path d="M12 12v8" /></svg>
);
export const Hammer = (p) => (
  <svg {...base} strokeWidth={1.4} {...p}><path d="m14 4 6 6-3 3-6-6 3-3Z" /><path d="m11 7-7 7 3 3 7-7" /><path d="m4 20 3-3" /></svg>
);
export const Sprout = (p) => (
  <svg {...base} strokeWidth={1.4} {...p}><path d="M12 22V12m0 0C10 8 6 7 3 9c0 5 4 9 9 10m0-10c2-4 6-5 9-3-1 5-5 9-9 10" /></svg>
);

export const Instagram = (p) => (
  <svg {...base} strokeWidth={1.7} {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></svg>
);
export const TikTok = (p) => (
  <svg {...base} strokeWidth={1.8} {...p}><path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5M14 4c.3 2.3 1.8 3.8 4.5 4" /></svg>
);
export const YouTube = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15V9l5.2 3Z" /></svg>
);
export const Facebook = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21Z" /></svg>
);

export const Play = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" /></svg>
);
export const Pause = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><rect x="6" y="5" width="4.2" height="14" rx="1" /><rect x="13.8" y="5" width="4.2" height="14" rx="1" /></svg>
);

export const Mail = (p) => (
  <svg {...base} strokeWidth={1.5} {...p}><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m3.5 7 8.5 6.5L20.5 7" /></svg>
);
export const Clock = (p) => (
  <svg {...base} strokeWidth={1.5} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.2 2" /></svg>
);
export const Chat = (p) => (
  <svg {...base} strokeWidth={1.5} {...p}><path d="M4 20l1.3-4.2A8.5 8.5 0 1 1 8.4 19Z" /><path d="M9 9.5c.4 2.2 2.3 4.1 4.5 4.5l1.3-1.3-1.8-1-.8.7c-.8-.3-1.6-1.1-1.9-1.9l.7-.8-1-1.8Z" /></svg>
);
export const Phone = (p) => (
  <svg {...base} strokeWidth={1.6} {...p}><path d="M5 4h3.5l1.8 4.5-2.2 1.4a11 11 0 0 0 5.5 5.5l1.4-2.2L20 15v3.5a1.5 1.5 0 0 1-1.5 1.5C10.5 20 4 13.5 4 5.5A1.5 1.5 0 0 1 5 4Z" /></svg>
);
export const Pin = (p) => (
  <svg {...base} strokeWidth={1.5} {...p}><path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z" /><circle cx="12" cy="10" r="2.3" /></svg>
);

export const Plus = (p) => (
  <svg {...base} strokeWidth={2} {...p}><path d="M12 5v14M5 12h14" /></svg>
);
export const Minus = (p) => (
  <svg {...base} strokeWidth={2} {...p}><path d="M5 12h14" /></svg>
);
export const Check = (p) => (
  <svg {...base} strokeWidth={2.4} {...p}><path d="m5 12.5 4.5 4.5L19 7" /></svg>
);
export const Menu = (p) => (
  <svg {...base} strokeWidth={2} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
export const Close = (p) => (
  <svg {...base} strokeWidth={2} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>
);

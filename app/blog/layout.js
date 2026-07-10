export const metadata = {
  title: "Blog – Ghiduri și inspirație pentru produse din lemn",
  description:
    "Articole, ghiduri și idei despre stative, pușculițe și decorațiuni din lemn natural. Sfaturi pentru alegerea și îngrijirea produselor ArtyZawaz.",
  keywords: [
    "blog lemn",
    "ghid stative",
    "îngrijire lemn",
    "idei cadouri din lemn",
    "lemn natural vs bambus",
    "ArtyZawaz blog",
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    title: "Blog ArtyZawaz – Ghiduri și inspirație",
    description:
      "Articole și ghiduri despre produse din lemn natural, lucrate manual.",
    url: "/blog",
  },
};

export default function BlogLayout({ children }) {
  return children;
}

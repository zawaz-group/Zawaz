import { Manrope, Barlow_Condensed, Caveat, Orbitron } from "next/font/google";
import "./globals.css";
import { CosProvider } from "./context/CosContext";
import FloatingCart from "./components/FloatingCart";
import FloatingWidgets from "./components/FloatingWidgets";
import { SITE_URL } from "./lib/site";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
});

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin", "latin-ext"],
  weight: ["800"],
  style: ["italic"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin", "latin-ext"],
  weight: ["600"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["800"],
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Paradox Craft — Pușculițe creative și produse handmade",
    template: "%s | Paradox Craft",
  },
  description:
    "Pușculițe unice, realizate din materiale premium, cu design modern și detalii distinctive. Cadoul perfect pentru pasiunile tale.",
  keywords: [
    "stative din lemn",
    "pușculițe din lemn",
    "suport telefon lemn",
    "pușculiță personalizată",
    "cadouri din lemn",
    "produse handmade Moldova",
    "stativ telefon birou",
    "decor din lemn natural",
    "cadou aniversare",
    "Paradox Craft",
    "lemn natural",
    "bambus",
  ],
  authors: [{ name: "Paradox Craft" }],
  creator: "Paradox Craft",
  publisher: "Paradox Craft",
  applicationName: "Paradox Craft",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: SITE_URL,
    siteName: "Paradox Craft",
    title: "Paradox Craft — Pușculițe creative și produse handmade",
    description:
      "Pușculițe unice, realizate din materiale premium, cu design modern și detalii distinctive.",
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
        alt: "Paradox Craft – pușculiță cu drapelul Moldovei",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paradox Craft — Pușculițe creative și produse handmade",
    description:
      "Pușculițe unice, realizate din materiale premium, cu design modern și detalii distinctive.",
    images: ["/hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "shopping",
};

export const viewport = {
  themeColor: "#03140f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ro"
      className={`${manrope.variable} ${barlow.variable} ${caveat.variable} ${orbitron.variable} antialiased`}
    >
      <body className="min-h-screen bg-forest-950 text-white" suppressHydrationWarning>
        <CosProvider>
          {children}
          <FloatingWidgets />
          <FloatingCart />
        </CosProvider>
      </body>
    </html>
  );
}

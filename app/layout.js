import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CosProvider } from "./context/CosContext";
import FloatingWidgets from "./components/FloatingWidgets";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://artyzawaz.vercel.app";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ArtyZawaz – Stative și pușculițe din lemn, create cu pasiune",
    template: "%s | ArtyZawaz",
  },
  description:
    "ArtyZawaz – stative pentru telefon și pușculițe din lemn natural, lucrate manual în Moldova. Design autentic, calitate premium, cadouri personalizate pentru orice ocazie.",
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
    "ArtyZawaz",
    "Zawaz Wood",
    "lemn natural",
    "bambus",
  ],
  authors: [{ name: "ArtyZawaz" }],
  creator: "ArtyZawaz",
  publisher: "ArtyZawaz",
  applicationName: "ArtyZawaz",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: SITE_URL,
    siteName: "ArtyZawaz",
    title: "ArtyZawaz – Stative și pușculițe din lemn, create cu pasiune",
    description:
      "Stative pentru telefon și pușculițe din lemn natural, lucrate manual. Design autentic, calitate premium, cadouri personalizate.",
    images: [
      {
        url: "/hero-1.png",
        width: 1200,
        height: 630,
        alt: "ArtyZawaz – produse din lemn",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ArtyZawaz – Stative și pușculițe din lemn",
    description:
      "Stative pentru telefon și pușculițe din lemn natural, lucrate manual cu pasiune.",
    images: ["/hero-1.png"],
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
  themeColor: "#1a1008",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ro"
      style={{ margin: 0, padding: 0, height: "100%" }}
    >
      <body style={{ margin: 0, padding: 0, height: "100%" }}>
        <CosProvider>
          <div style={{ overflowX: "hidden" }}>
            {children}
          </div>
          <FloatingWidgets />
        </CosProvider>
      </body>
    </html>
  );
}

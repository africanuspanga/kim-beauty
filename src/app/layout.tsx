import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { SITE_URL, absoluteUrl } from "@/lib/seo";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Kim Beauty — Braids, Lashes, Makeup & Spa in Arusha, Tanzania",
    template: "%s · Kim Beauty",
  },
  description:
    "Kim Beauty is a modern beauty studio on Pangani Street, Arusha — knotless braids, extensions, lash extensions, bridal makeup, spa packages, nails and Kim Academy training. See every style and price, then book on WhatsApp.",
  applicationName: "Kim Beauty",
  keywords: [
    "Kim Beauty",
    "Kim Beauty Salons",
    "beauty salon Arusha",
    "hair salon Arusha",
    "knotless braids Arusha",
    "braiding salon Arusha",
    "lash extensions Arusha",
    "bridal makeup Arusha",
    "makeup artist Arusha",
    "spa Arusha",
    "massage Arusha",
    "manicure pedicure Arusha",
    "hair extensions Tanzania",
    "beauty school Arusha",
    "Kim Academy Arusha",
  ],
  authors: [{ name: "Kim Beauty", url: SITE_URL }],
  creator: "Kim Beauty",
  publisher: "Kim Beauty",
  alternates: { canonical: "/" },
  category: "Beauty & Personal Care",
  formatDetection: { telephone: true, address: true, email: true },
  // Icons come from the app/ file convention: icon.svg + apple-icon.png
  openGraph: {
    title: "Kim Beauty — Braids, Lashes, Makeup & Spa in Arusha",
    description:
      "Braids, lashes, spa and glam by Arusha's most loved beauty team. Every style priced — book your chair today.",
    type: "website",
    locale: "en_TZ",
    siteName: "Kim Beauty",
    url: SITE_URL,
    images: [
      {
        url: absoluteUrl("/images/hero.jpg"),
        width: 2000,
        height: 1359,
        alt: "Kim Beauty studio on Pangani Street, Arusha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kim Beauty — Braids, Lashes, Makeup & Spa in Arusha",
    description:
      "Braids, lashes, spa and glam by Arusha's most loved beauty team. Every style priced — book your chair today.",
    images: [absoluteUrl("/images/hero.jpg")],
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
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: "#B8864B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-TZ" className={`${cormorant.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}

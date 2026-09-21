import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: "Kim Beauty — Hair, Lashes & Spa in Arusha",
    template: "%s · Kim Beauty",
  },
  description:
    "Kim Beauty is a modern beauty studio on Pangani Street, Arusha — braids, extensions, lashes, makeup, nails, spa packages and the Kim Collection.",
  keywords: [
    "Kim Beauty",
    "beauty salon Arusha",
    "braiding Arusha",
    "lashes Arusha",
    "spa Arusha",
    "hair extensions Tanzania",
  ],
  // Icons come from the app/ file convention: icon.svg + apple-icon.png
  openGraph: {
    title: "Kim Beauty — Hair, Lashes & Spa in Arusha",
    description:
      "Braids, lashes, spa and glam by Arusha's most loved beauty team. Book your chair today.",
    type: "website",
    locale: "en_TZ",
    siteName: "Kim Beauty",
  },
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
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}

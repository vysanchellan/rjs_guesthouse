import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { StayProvider } from "@/components/StayProvider";
import { siteConfig } from "@/data/siteConfig";

/**
 * Fraunces carries the design: a variable serif with optical size, softness
 * and a "wonk" axis, so the display type can be warm and slightly odd rather
 * than the default hotel-brochure Didone.
 */
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

/** Inter does interface work only — labels, numbers, body copy. */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://rjsguesthouse.com"
  ),
  title: "RJ's Guesthouse — Self-catering studios in Parlock, Durban",
  description:
    "Fully furnished self-catering studio apartments in Parlock, Durban. R550 a night, ten minutes from the Golden Mile. Pick your dates and book on WhatsApp.",
  keywords: [
    "guesthouse Durban",
    "self-catering Durban",
    "accommodation Parlock",
    "studio apartment Durban",
  ],
  openGraph: {
    title: "RJ's Guesthouse — Self-catering studios in Parlock, Durban",
    description:
      "Fully furnished self-catering studio apartments in Parlock, Durban. R550 a night, ten minutes from the Golden Mile.",
    type: "website",
    locale: "en_ZA",
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: "A studio apartment at RJ's Guesthouse in Parlock, Durban",
      },
    ],
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#0A1618",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brass focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-ink-900"
        >
          Skip to content
        </a>
        <StayProvider>{children}</StayProvider>
      </body>
    </html>
  );
}

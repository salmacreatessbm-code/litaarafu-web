import type { Metadata, Viewport } from "next";
import { Amiri, Lora } from "next/font/google";
import { brand, hero } from "@/data/siteContent";
import "./globals.css";

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${brand.nameLatin} · ${brand.tagline}`,
    template: `%s · ${brand.nameLatin}`,
  },
  description: `${hero.headline} ${brand.description}`,
  openGraph: {
    title: `${brand.nameLatin} · ${brand.tagline}`,
    description: brand.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#F7F3EB",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${amiri.variable} ${lora.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-lapis focus:px-4 focus:py-2 focus:text-papyrus"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}

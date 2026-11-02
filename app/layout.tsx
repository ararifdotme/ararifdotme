import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Hind_Siliguri } from "next/font/google";
import Analytics from "@/components/Analytics";
import { DESCRIPTION, KEYWORDS, SITE_URL, personJsonLd } from "@/lib/seo";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const bn = Hind_Siliguri({ variable: "--font-bn", subsets: ["bengali", "latin"], weight: ["400", "500", "600", "700"] });

const title = "Arifur Rahman Arif (A R Arif) · Full-Stack Developer · আরিফুর রহমান আরিফ";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: "%s · Arifur Rahman Arif" },
  description: DESCRIPTION,
  keywords: KEYWORDS,
  authors: [{ name: "Arifur Rahman Arif", url: SITE_URL }],
  creator: "Arifur Rahman Arif",
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Arifur Rahman Arif",
    type: "profile",
    locale: "en_US",
    alternateLocale: ["bn_BD"],
  },
  twitter: { card: "summary_large_image", title, description: DESCRIPTION },
  ...(process.env.GOOGLE_SITE_VERIFICATION && { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }),
};

export const viewport: Viewport = {
  themeColor: "#eef0f7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="light" className={`${geist.variable} ${geistMono.variable} ${bn.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // Escape "<" so the JSON can never close the script tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()).replace(/</g, "\\u003c") }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

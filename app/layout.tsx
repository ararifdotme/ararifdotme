import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Hind_Siliguri } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const bn = Hind_Siliguri({ variable: "--font-bn", subsets: ["bengali", "latin"], weight: ["400", "500", "600", "700"] });

const description =
  "Arifur Rahman Arif is a Full-Stack Software Developer and Laravel Certified Developer. 7+ years building Laravel, React, Node.js, Shopify and WordPress products.";

export const metadata: Metadata = {
  metadataBase: new URL("https://ararif.me"),
  title: "ArifOS · Arifur Rahman Arif",
  description,
  openGraph: {
    title: "ArifOS · Arifur Rahman Arif, Full-Stack Developer",
    description,
    url: "https://ararif.me",
    type: "website",
  },
  twitter: { card: "summary", title: "ArifOS · Arifur Rahman Arif", description },
};

export const viewport: Viewport = {
  themeColor: "#07070c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="dark" className={`${geist.variable} ${geistMono.variable} ${bn.variable}`}>
      <body>{children}</body>
    </html>
  );
}

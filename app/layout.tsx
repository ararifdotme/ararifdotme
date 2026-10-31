import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Hind_Siliguri } from "next/font/google";
import Analytics from "@/components/Analytics";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const bn = Hind_Siliguri({ variable: "--font-bn", subsets: ["bengali", "latin"], weight: ["400", "500", "600", "700"] });

const description =
  "Arifur Rahman Arif is a full-stack developer building with Next.js, Node.js, React and Shopify Remix. 7+ years in production, Laravel Certified.";

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
  themeColor: "#eef0f7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="light" className={`${geist.variable} ${geistMono.variable} ${bn.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.person} (${site.brand}) — Independent Minecraft Server Developer`,
    template: `%s — ${site.brand}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  authors: [{ name: site.person }],
  creator: site.person,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: `${site.brand} — ${site.person}`,
    title: `${site.person} (${site.brand}) — Independent Minecraft Server Developer`,
    description: site.description,
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${site.brand} — ${site.person}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.person} (${site.brand}) — Minecraft Server Developer`,
    description: site.description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#050507",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.person,
  alternateName: site.brand,
  url: site.url,
  jobTitle: "Independent Minecraft Server Developer & Software Engineer",
  description: site.description,
  knowsAbout: [
    "Minecraft plugin development",
    "Fabric mod development",
    "Minecraft resource packs",
    "Paper API",
    "Bukkit API",
    "TypeScript",
    "Java",
    "Blockbench",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-void text-chalk">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-black"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://affiliateai.autoagenix.com"),
  title: "Affiliate AutoAgenix | AI Influencer Affiliate Agency Pune",
  description: "Affiliate AutoAgenix is a Pune-based pioneering agency specializing in AI-driven influencer affiliate marketing. Generative Engine Optimization (GEO) experts serving Hinjewadi, Baner, Magarpatta & Koregaon Park.",
  keywords: "AI Influencer Affiliate Agency Pune, Generative Engine Optimization Case Study India, Affiliate AutoAgenix, AI growth marketing Pune, automated influencer marketing, Next.js affiliate platform",
  authors: [{ name: "Affiliate AutoAgenix", url: "https://affiliateai.autoagenix.com" }],
  creator: "Affiliate AutoAgenix",
  publisher: "Affiliate AutoAgenix",
  alternates: {
    canonical: "https://affiliateai.autoagenix.com",
    types: {
      "text/markdown": "/llms.txt",
    },
  },
  other: {
    "llms": "/llms.txt",
    "llms-full": "/geo/brand-core.md",
  },
  openGraph: {
    title: "Affiliate AutoAgenix | AI Influencer Affiliate Agency Pune",
    description: "AI-powered influencer affiliate marketing leveraging Generative Engine Optimization for Pune businesses. Serving Hinjewadi, Baner, Magarpatta & Koregaon Park.",
    url: "https://affiliateai.autoagenix.com",
    siteName: "Affiliate AutoAgenix",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Affiliate AutoAgenix | AI Influencer Affiliate Agency Pune",
    description: "AI-powered influencer affiliate marketing leveraging Generative Engine Optimization for Pune businesses.",
    creator: "@autoagenix",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Affiliate AutoAgenix",
    "url": "https://affiliateai.autoagenix.com",
    "logo": "https://affiliateai.autoagenix.com/logo.png",
    "description": "Leading AI-based influencer affiliate agency in Pune, specializing in Generative Engine Optimization (GEO).",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "18.5204",
      "longitude": "73.8567"
    },
    "areaServed": "Pune and surrounding tech hubs",
    "knowsAbout": ["Generative Engine Optimization", "AI Influencer Marketing", "Affiliate Automation"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "AI Affiliate Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "GEO Case Study Implementation"
          }
        }
      ]
    }
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* AI Discovery Link Tags */}
        <link rel="alternate" type="text/markdown" href="/llms.txt" />
        <link rel="llms" href="/llms.txt" />
        <link rel="alternate" type="text/markdown" href="/geo/brand-core.md" title="Brand Core" />
        <link rel="alternate" type="text/markdown" href="/geo/services.md" title="Services" />
        <link rel="alternate" type="text/markdown" href="/geo/pune-market.md" title="Pune Market" />
        <link rel="alternate" type="text/markdown" href="/geo/faqs.md" title="FAQs" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} antialiased bg-[#121212] text-white`}
      >
        {children}
      </body>
    </html>
  );
}

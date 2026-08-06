import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://genosapp.com"),
  title: {
    default: "GenOS — AI-native Product & Web Studio",
    template: "%s · GenOS",
  },
  description:
    "GenOS is an AI-native product & web studio. We build interactive 3D websites (React Three Fiber / WebGL), AI-powered apps, and lightweight CRMs — and ship our own products, like Aura, to prove it.",
  applicationName: "GenOS",
  keywords: [
    "3D website agency",
    "React Three Fiber developer",
    "WebGL agency",
    "AI app development",
    "AI voice agent development",
    "custom CRM development",
    "Next.js development studio",
    "interactive web design",
    "creative development studio",
  ],
  authors: [{ name: "GenOS", url: "https://genosapp.com" }],
  creator: "GenOS",
  publisher: "GenOS",
  alternates: {
    canonical: "https://genosapp.com",
  },
  category: "technology",
  openGraph: {
    title: "GenOS — AI-native Product & Web Studio",
    description:
      "Interactive 3D web experiences, AI-powered apps, and CRMs. We build our own products, like Aura, to prove it.",
    url: "https://genosapp.com",
    siteName: "GenOS",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GenOS — AI-native Product & Web Studio",
    description:
      "Interactive 3D web experiences, AI-powered apps, and CRMs. We build our own products to prove it.",
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
};

// Structured data: tells Google exactly who GenOS is (logo, socials, contact,
// services). Powers rich results + Knowledge Panel eligibility.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://genosapp.com/#organization",
      name: "GenOS",
      url: "https://genosapp.com",
      logo: "https://genosapp.com/logo.jpg",
      description:
        "AI-native product & web studio building interactive 3D websites, AI-powered apps, and lightweight CRMs.",
      email: "connect@genosapp.com",
      sameAs: [
        "https://aura.genosapp.com",
        "https://www.instagram.com/genos.infotech",
        "https://www.youtube.com/@GenOSTech",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-73054-48354",
        contactType: "sales",
        email: "connect@genosapp.com",
        availableLanguage: ["en"],
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://genosapp.com/#service",
      name: "GenOS",
      image: "https://genosapp.com/logo.jpg",
      url: "https://genosapp.com",
      priceRange: "$$$",
      parentOrganization: { "@id": "https://genosapp.com/#organization" },
      description:
        "Interactive 3D websites, AI-powered apps, and custom CRMs — shipped in 2–4 weeks with fixed scope and fixed price.",
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Interactive 3D Websites",
            description:
              "Real-time WebGL experiences built with React Three Fiber — dispersion glass, particle fields, scroll-driven camera rigs.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI-Powered Apps",
            description:
              "Production AI features — voice agents, RAG assistants, and generative tools shipped in 2–4 weeks.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "CRM & Internal Tools",
            description:
              "Lightweight, custom CRMs and dashboards — lead pipelines, automations, and reporting, managed for you.",
          },
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://genosapp.com/#website",
      url: "https://genosapp.com",
      name: "GenOS",
      publisher: { "@id": "https://genosapp.com/#organization" },
      inLanguage: "en",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://genosapp.com/search?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#05070f] text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
      {/* Google tag (gtag.js) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-Z0DSEPYLGF"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-Z0DSEPYLGF');
        `}
      </Script>
    </html>
  );
}

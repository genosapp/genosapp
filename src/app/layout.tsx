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
  title: "GenOS — AI-native Product & Web Studio",
  description:
    "We build interactive 3D web experiences, AI-powered apps, and lightweight CRMs — and we ship our own products, like Aura, to prove it.",
  keywords: [
    "3D website",
    "React Three Fiber",
    "WebGL agency",
    "AI app development",
    "CRM development",
    "creative studio",
  ],
  openGraph: {
    title: "GenOS — AI-native Product & Web Studio",
    description:
      "Interactive 3D web experiences, AI-powered apps, and CRMs. We build our own products to prove it.",
    url: "https://genosapp.com",
    siteName: "GenOS",
    type: "website",
    images: [{ url: "/logo.jpg", width: 864, height: 768, alt: "GenOS" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GenOS — AI-native Product & Web Studio",
    description:
      "Interactive 3D web experiences, AI-powered apps, and CRMs.",
    images: ["/logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#05070f] text-white">{children}</body>
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

import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#f59e0b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://gitchronicle.bharatdn.com"),
  alternates: {
    canonical: "./",
  },
  title: {
    default: "GitChronicle — Real-Time Developer Intelligence & Percentile Benchmark",
    template: "%s | GitChronicle",
  },
  description:
    "Free, open-source real-time GitHub developer intelligence observatory. Global percentile benchmarks, developer cadence rhythm matrix, and automated repo health auditing.",
  keywords: [
    "GitHub Analytics",
    "Developer Benchmarks",
    "Developer DNA",
    "Percentile Ranking",
    "GitChronicle",
    "Bharat Malhotra",
    "Cadence Heatmap",
    "Repo Health",
  ],
  authors: [{ name: "ErBharatMalhotra", url: "https://bharatdn.com" }],
  creator: "ErBharatMalhotra",
  publisher: "GitChronicle",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon-gitchronicle.svg", type: "image/svg+xml", sizes: "any" },
      { url: "/icon-gitchronicle.svg", type: "image/svg+xml", sizes: "32x32" },
      { url: "/icon-gitchronicle.svg", type: "image/svg+xml", sizes: "16x16" },
    ],
    shortcut: "/icon-gitchronicle.svg",
    apple: "/apple-touch-icon.svg",
    other: [
      { rel: "apple-touch-icon-precomposed", url: "/apple-touch-icon.svg" },
    ],
  },
  manifest: "/manifest.json",
  themeColor: "#f59e0b",
  colorScheme: "dark",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gitchronicle.bharatdn.com",
    title: "GitChronicle — Real-Time Developer Intelligence & Percentile Benchmark",
    description:
      "Inspect any GitHub developer's global percentile benchmark, 7×24 cadence rhythm matrix, and repo health index with zero setup.",
    siteName: "GitChronicle",
    images: [
      {
        url: "/og-gitchronicle.svg",
        width: 1200,
        height: 630,
        alt: "GitChronicle Developer Intelligence Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GitChronicle — Developer Intelligence & Percentile Benchmark",
    description:
      "Inspect any GitHub developer's global percentile benchmark, 7×24 cadence rhythm matrix, and repo health index.",
    creator: "@ErBharatMalhotra",
    site: "@ErBharatMalhotra",
    images: ["/og-gitchronicle.svg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400..700;1,400..700&family=Space+Grotesk:wght@300..700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "GitChronicle",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Cloud",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
              },
              author: {
                "@type": "Person",
                name: "Bharat Malhotra",
                url: "https://bharatdn.com",
                sameAs: ["https://github.com/ErBharatMalhotra", "https://twitter.com/ErBharatMalhotra"],
              },
              featureList: [
                "Global Percentile Benchmarks",
                "7×24 Cadence Rhythm Matrix",
                "Automated Repo Health Auditing",
                "Real-time GitHub Data",
                "Developer DNA Visualization",
                "Side-by-side Comparison",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-[#090d16] text-[#e6edf3] font-sans antialiased selection:bg-[#f59e0b]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
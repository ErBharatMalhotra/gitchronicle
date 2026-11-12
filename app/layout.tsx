import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0d1117",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://gitchronicle.bharatdn.com"),
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
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gitchronicle.bharatdn.com",
    title: "GitChronicle — Real-Time Developer Intelligence & Percentile Benchmark",
    description:
      "Inspect any GitHub developer's global percentile benchmark, 7x24 cadence rhythm matrix, and repo health index with zero setup.",
    siteName: "GitChronicle",
    images: [
      {
        url: "https://gitchronicle.bharatdn.com/api/og?username=ErBharatMalhotra",
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
      "Inspect any GitHub developer's global percentile benchmark, 7x24 cadence rhythm matrix, and repo health index.",
    creator: "@ErBharatMalhotra",
    images: ["https://gitchronicle.bharatdn.com/api/og?username=ErBharatMalhotra"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0d1117] text-[#e6edf3] font-sans antialiased selection:bg-[#58a6ff]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}

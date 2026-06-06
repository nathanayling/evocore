import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import EvoTopBar from "@/components/EvoTopBar";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://core.evosportsintelligence.com"),
  title: {
    default: "EvoCore | AI Sports Intelligence Engine",
    template: "%s | EvoCore",
  },
  description:
    "EvoCore is the AI intelligence layer powering football, horse racing, and odds analysis across the Evo Sports Intelligence ecosystem.",
  keywords: [
    "EvoCore",
    "Evo Sports Intelligence",
    "AI sports intelligence",
    "football predictions AI",
    "horse racing analysis AI",
    "odds intelligence",
    "sports analytics platform",
    "FootyEvo",
    "RaceEvo",
    "OddsEvo",
  ],
  authors: [{ name: "Evo Sports Intelligence" }],
  creator: "Evo Sports Intelligence",
  publisher: "Evo Sports Intelligence",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "EvoCore | AI Sports Intelligence Engine",
    description:
      "The AI intelligence layer powering football, horse racing, and odds analysis across FootyEvo, RaceEvo, and OddsEvo.",
    url: "https://core.evosportsintelligence.com",
    siteName: "EvoCore",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EvoCore AI Sports Intelligence Engine",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EvoCore | AI Sports Intelligence Engine",
    description:
      "AI-powered sports intelligence for football, horse racing, and odds analysis.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-[#07080D] text-white">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0TEFHNXD5E"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0TEFHNXD5E');
          `}
        </Script>

        <AuthProvider>
          <EvoTopBar />
          <Nav />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
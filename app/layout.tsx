import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
  title: "EvoCore | The Intelligence Engine for Evo Sports Intelligence",
  description:
    "EvoCore is the AI intelligence engine powering football, racing, and odds analysis across the Evo Sports Intelligence ecosystem.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-[#07080D] text-white">
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
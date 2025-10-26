import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from 'next-themes';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NutriVerse - Discover the Power of Nature",
  description: "Explore comprehensive nutrition information for fruits, vegetables, and herbs. Learn about health benefits, vitamins, and make informed dietary choices.",
  keywords: "nutrition, fruits, vegetables, herbs, health, vitamins, diet, wellness",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

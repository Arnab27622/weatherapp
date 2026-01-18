import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { UnitProvider } from "@/context/UnitContext";
import QueryProvider from "@/providers/QueryProvider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://weather-dashboard-opal-iota.vercel.app"),
  title: "Klimate - AI Powered Weather App",
  description: "Experience the next generation of weather forecasting with Klimate. Real-time updates, AI-driven insights, and detailed metrics for any location worldwide.",
  applicationName: "Klimate",
  authors: [{ name: "Arnab Dey" }],
  generator: "Next.js",
  keywords: ["weather", "forecast", "AI weather", "NEXT.js", "React", "Klimate", "weather app", "meteorology"],
  creator: "Arnab Dey",
  publisher: "Arnab Dey",
  openGraph: {
    title: "Klimate - AI Powered Weather App",
    description: "Real-time weather updates, AI-driven insights, and detailed environmental metrics.",
    url: "https://weather-dashboard-opal-iota.vercel.app/",
    siteName: "Klimate",
    images: [
      {
        url: "/og-image.png", // We should ideally ensure this exists or use a generic one
        width: 1200,
        height: 630,
        alt: "Klimate Weather App Interface",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Klimate - Next Gen Weather App",
    description: "Get precise weather forecasts with Klimate. AI-powered precision for your daily planning.",
    creator: "@arnabdey", // Placeholder handle
    images: ["/twitter-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Klimate",
              "description": "AI-powered weather application delivering real-time forecasts and insights.",
              "applicationCategory": "UtilitiesApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "author": {
                "@type": "Person",
                "name": "Arnab Dey"
              }
            })
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <QueryProvider>
            <UnitProvider>
              {children}
              <Toaster richColors closeButton position="top-right" />
            </UnitProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

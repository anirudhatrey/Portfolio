import type { Metadata } from "next";
import { Syne, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Font configurations
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// Metadata for SEO
export const metadata: Metadata = {
  title: {
    default: "Anirudh | Full-Stack Developer",
    template: "%s | Anirudh",
  },
  description:
    "Full-Stack Developer crafting AI-powered experiences for Gaming & Entertainment. Building the future with impact.",
  keywords: [
    "Full-Stack Developer",
    "React Developer",
    "Next.js Developer",
    "AI Integration",
    "Web Developer",
    "Gaming",
    "Entertainment",
    "Portfolio",
    "Anirudh",
  ],
  authors: [{ name: "Anirudh" }],
  creator: "Anirudh",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anirudh.dev",
    siteName: "Anirudh Portfolio",
    title: "Anirudh | Full-Stack Developer",
    description:
      "Full-Stack Developer crafting AI-powered experiences for Gaming & Entertainment.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Anirudh - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anirudh | Full-Stack Developer",
    description:
      "Full-Stack Developer crafting AI-powered experiences for Gaming & Entertainment.",
    images: ["/og-image.png"],
  },
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
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background text-text antialiased">
        {children}
      </body>
    </html>
  );
}

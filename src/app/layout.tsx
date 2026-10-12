import type { Metadata } from "next";
import { Ubuntu, Ubuntu_Mono } from "next/font/google";
import "./globals.css";

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-ubuntu",
  display: "swap",
});

const ubuntuMono = Ubuntu_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-ubuntu-mono",
  display: "swap",
});

import { profileData } from "@/data/profile";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL(profileData.website || "https://sojib.dev"),
  title: {
    default: `${profileData.name} — ${profileData.title}`,
    template: `%s | ${profileData.name}`,
  },
  description: `${profileData.name} is a ${profileData.title}. Interactive Ubuntu 24.04 Linux desktop web portfolio featuring software projects, architecture case studies, and live terminal.`,
  keywords: [
    profileData.name,
    profileData.title,
    "Full-Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Ubuntu Portfolio",
    "Software Engineer",
  ],
  authors: [{ name: profileData.name, url: profileData.website }],
  creator: profileData.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: profileData.website,
    title: `${profileData.name} — ${profileData.title}`,
    description: "Interactive Ubuntu 24.04 desktop environment running in your browser.",
    siteName: `${profileData.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profileData.name} — ${profileData.title}`,
    description: "Interactive Ubuntu 24.04 desktop environment developer portfolio.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ubuntu.variable} ${ubuntuMono.variable} h-full antialiased`}>
      <head>
        <JsonLd />
      </head>
      <body className="min-h-full w-full bg-[#111111] text-white font-sans">
        {children}
      </body>
    </html>
  );
}

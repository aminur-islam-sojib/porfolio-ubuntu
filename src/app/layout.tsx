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

export const metadata: Metadata = {
  title: "Sojib Ahmed — Full-Stack Developer",
  description: "Ubuntu-themed interactive developer portfolio featuring full-stack projects, skills, terminal, and experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ubuntu.variable} ${ubuntuMono.variable} h-full antialiased`}>
      <body className="h-full w-full overflow-hidden font-sans text-white">
        {children}
      </body>
    </html>
  );
}

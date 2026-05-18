import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Caio Rodrigues | UI/UX & Full Stack Developer",
  description: "Projetos ambiciosos merecem execução extraordinária. Portfólio de Caio Rodrigues.",
  icons: {
    icon: "/LogotipoAI.png",
    apple: "/LogotipoAI.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${outfit.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans selection:bg-gold/30 selection:text-white">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

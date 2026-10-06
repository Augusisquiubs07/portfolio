import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Overpass, Overpass_Mono } from "next/font/google";
import { LangProvider } from "@/components/LangProvider";
import "./globals.css";

const overpass = Overpass({ subsets: ["latin"], variable: "--font-sign", display: "swap" });
const overpassMono = Overpass_Mono({ subsets: ["latin"], variable: "--font-code", display: "swap" });

export const metadata: Metadata = {
  title: "Alejo Sureda Oteo · Portfolio",
  description: "Portfolio de Alejo Sureda Oteo, desarrollador backend en formación (2º DAM). Mis proyectos como un plano de metro.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#16181d" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1115" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`${overpass.variable} ${overpassMono.variable}`}>
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}

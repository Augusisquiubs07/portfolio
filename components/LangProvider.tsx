"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import es from "@/i18n/es.json";
import en from "@/i18n/en.json";

export type Lang = "es" | "en";
type Diccionario = Record<string, string>;
const TEXTOS: Record<Lang, Diccionario> = { es, en };

interface LangContext {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** Devuelve el texto de una clave, sustituyendo {0}, {1}… por los argumentos */
  t: (clave: string, ...args: (string | number)[]) => string;
}

const Ctx = createContext<LangContext | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  // Recupera el idioma elegido en la visita anterior
  useEffect(() => {
    try {
      const guardado = localStorage.getItem("lang");
      if (guardado === "es" || guardado === "en") setLangState(guardado);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {}
  }, []);

  const t = useCallback(
    (clave: string, ...args: (string | number)[]) => {
      const texto = TEXTOS[lang][clave] ?? TEXTOS.es[clave] ?? clave;
      return texto.replace(/\{(\d+)\}/g, (_m, i: string) => String(args[Number(i)] ?? ""));
    },
    [lang],
  );

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useLang() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang tiene que usarse dentro de <LangProvider>");
  return ctx;
}

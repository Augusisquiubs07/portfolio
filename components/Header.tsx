"use client";

import { useLang, type Lang } from "./LangProvider";
import { LogoA } from "./Logo";

export function Header() {
  const { t, lang, setLang } = useLang();
  return (
    <header className="top">
      <div className="top-in">
        <div className="sign">
          <LogoA className="logo-a" />
          <span>{t("net")}</span>
        </div>
        <nav className="nav" aria-label={lang === "es" ? "Secciones" : "Sections"}>
          <a href="#plano">
            <b style={{ background: "transparent", border: "2px solid currentColor", color: "inherit" }}>◎</b>
            <span>{t("n_map")}</span>
          </a>
          <a href="#lineas">
            <b className="b2">L2</b>
            <b className="b3">L3</b>
            <b className="b4">L4</b>
            <span>{t("l_projects")}</span>
          </a>
          <a href="#tecnologias">
            <b className="b5">L5</b>
            <span>{t("l_stack")}</span>
          </a>
          <a href="#contacto"><span>{t("l_contact")}</span></a>
        </nav>
        <div className="lang" role="group" aria-label="Idioma / Language">
          {(["es", "en"] as Lang[]).map((l) => (
            <button key={l} className={lang === l ? "on" : ""} onClick={() => setLang(l)} aria-pressed={lang === l}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

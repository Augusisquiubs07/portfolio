"use client";

import { useState } from "react";
import { useLang } from "./LangProvider";
import { EMAIL, GITHUB, LINKEDIN } from "@/lib/stations";

export function Contact() {
  const { t } = useLang();
  const [copiado, setCopiado] = useState(false);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 1500);
    } catch {}
  };

  return (
    <section className="block" id="contacto">
      <div className="sec-h">
        <span className="badge" style={{ background: "var(--ink)", color: "var(--paper)" }}>i</span>
        <div><h2>{t("l_contact")}</h2><p>{t("contact_p")}</p></div>
      </div>
      <div className="contact">
        <div>
          <small>Email</small>
          <b>{EMAIL}</b>
          <button onClick={copiar}>{copiado ? t("copied") : t("copy")}</button>
        </div>
        <div>
          <small>GitHub</small>
          <a href={GITHUB.url} target="_blank" rel="noopener noreferrer">{GITHUB.texto}</a>
        </div>
        <div>
          <small>LinkedIn</small>
          <a href={LINKEDIN.url} target="_blank" rel="noopener noreferrer">{LINKEDIN.texto}</a>
        </div>
      </div>
    </section>
  );
}

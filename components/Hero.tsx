"use client";

import { useLang } from "./LangProvider";

export function Hero() {
  const { t } = useLang();
  return (
    <section className="hero">
      <div>
        <h1>{t("name")}</h1>
        <p className="role">{t("role")}</p>
        <p>{t("bio1")}</p>
      </div>
      <div>
        <p style={{ margin: 0, color: "var(--ink-2)" }}>{t("hero_hint")}</p>
        <span className="here">
          <i />
          <span>{t("here")}</span>
        </span>
      </div>
    </section>
  );
}

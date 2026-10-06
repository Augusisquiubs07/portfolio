"use client";

import { useLang } from "./LangProvider";

export function Footer() {
  const { t } = useLang();
  return (
    <footer>
      <div className="wrap">
        <span>{t("foot")}</span>
        <span>2026</span>
      </div>
    </footer>
  );
}

"use client";

import { useLang } from "./LangProvider";
import { PARADAS, RAMAS, SUBLINEAS } from "@/lib/stations";

export function Technologies() {
  const { t, lang } = useLang();
  return (
    <section className="block" id="tecnologias">
      <div className="sec-h">
        <span className="badge b5">L5</span>
        <div><h2>{t("l_stack")}</h2><p>{t("tech_p")}</p></div>
      </div>
      <div className="sublines">
        {SUBLINEAS.map((s) => {
          const rama = RAMAS.find((r) => r.id === s.id)!;
          return (
            <div className="subline" key={s.id}>
              <div className="subline-h">
                <span className="badge b5">{rama.codigo}</span>
                <h3>{rama.nombre[lang]}</h3>
              </div>
              <ol className="strip-stops">
                {s.paradas.map((id) => {
                  const p = PARADAS.find((x) => x.id === id)!;
                  return (
                    <li key={id} title={p.info[lang]}>
                      <i aria-hidden="true" />
                      <span>{p.nombre[lang]}</span>
                    </li>
                  );
                })}
              </ol>
            </div>
          );
        })}
      </div>
    </section>
  );
}

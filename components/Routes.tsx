"use client";

import { useLang } from "./LangProvider";
import { CORRESPONDENCIAS, GITHUB, PARADAS, RECORRIDOS } from "@/lib/stations";

type LineaRuta = "l1" | "l2" | "l3" | "l4";

interface Ficha {
  id: LineaRuta;
  codigo: string;
  titulo: string | null; // null = se traduce con la clave del mismo nombre
  claveTitulo?: string;
  prefijo?: "cm" | "crm"; // textos de i18n del proyecto
  claveDesc?: string;
}

const FICHAS: Ficha[] = [
  { id: "l2", codigo: "L2", titulo: "Card Manager", prefijo: "cm" },
  { id: "l3", codigo: "L3", titulo: "CRM Mi Mascota", prefijo: "crm" },
  { id: "l4", codigo: "L4", titulo: "Nobu", claveDesc: "nobu_desc" },
  { id: "l1", codigo: "L1", titulo: null, claveTitulo: "l_path", claveDesc: "path_p" },
];

export function Routes() {
  const { t, lang } = useLang();

  const parada = (id: string) => {
    const p = PARADAS.find((x) => x.id === id);
    if (p) return { nombre: p.nombre[lang], info: p.info[lang], hub: false };
    const c = CORRESPONDENCIAS.find((x) => x.id === id)!;
    return { nombre: c.nombre, info: c.info[lang], hub: true };
  };

  return (
    <section className="block" id="lineas">
      <div className="sec-h">
        <span className="badge b2">L2</span>
        <div><h2>{t("l_projects")}</h2><p>{t("lines_p")}</p></div>
      </div>

      <div className="routes">
        {FICHAS.map((f) => {
          const desc = f.prefijo ? t(`${f.prefijo}_desc`) : f.claveDesc ? t(f.claveDesc) : "";
          return (
            <article className="route" key={f.id}>
              <div className="route-head">
                <div className="top-row">
                  <span className={`badge b${f.id.slice(1)}`}>{f.codigo}</span>
                  <h3>{f.titulo ?? t(f.claveTitulo!)}</h3>
                </div>
                {desc && <p>{desc}</p>}
                {f.prefijo && (
                  <>
                    <dl>
                      <dt>{t("l_role")}</dt><dd>{t(`${f.prefijo}_role`)}</dd>
                      <dt>{t("l_team")}</dt><dd>{t(`${f.prefijo}_team`)}</dd>
                      <dt>{t("l_tech")}</dt><dd>{t(`${f.prefijo}_stack`)}</dd>
                    </dl>
                    <a className="repo" href={GITHUB.url} target="_blank" rel="noopener noreferrer">{t("repo")}</a>
                  </>
                )}
              </div>
              <ol className="stops" style={{ ["--lc" as string]: `var(--${f.id})` }}>
                {RECORRIDOS[f.id].map((id) => {
                  const p = parada(id);
                  return (
                    <li key={id} className={p.hub ? "hub" : ""}>
                      <b>{p.nombre}</b>
                      {p.info && <span>{p.info}</span>}
                    </li>
                  );
                })}
              </ol>
            </article>
          );
        })}
      </div>
    </section>
  );
}

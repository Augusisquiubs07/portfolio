"use client";

import { useState, type KeyboardEvent } from "react";
import { useLang } from "./LangProvider";
import {
  CORRESPONDENCIAS, INFO_LINEA, INSIGNIAS, LEYENDA, LINEAS, ORDEN_DIBUJO, PARADAS, PLANO, RIO,
  type Lado, type Linea, type LineaId,
} from "@/lib/stations";

type P = [number, number];
const RADIO = 22; // radio de las curvas
const TICK = 13; // largo del "palito" de cada parada

/** Polilínea con las esquinas redondeadas, como en los planos de metro */
function rutaRedondeada(pts: P[], r = RADIO) {
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [px, py] = pts[i - 1], [cx, cy] = pts[i], [nx, ny] = pts[i + 1];
    const l1 = Math.hypot(cx - px, cy - py), l2 = Math.hypot(nx - cx, ny - cy);
    const rr = Math.min(r, l1 / 2, l2 / 2);
    const ax = cx - ((cx - px) / l1) * rr, ay = cy - ((cy - py) / l1) * rr;
    const bx = cx + ((nx - cx) / l2) * rr, by = cy + ((ny - cy) / l2) * rr;
    d += ` L${ax.toFixed(1)} ${ay.toFixed(1)} Q${cx} ${cy} ${bx.toFixed(1)} ${by.toFixed(1)}`;
  }
  const [lx, ly] = pts[pts.length - 1];
  return d + ` L${lx} ${ly}`;
}

const NORMAL: Record<Lado, P> = { a: [0, -1], b: [0, 1], l: [-1, 0], r: [1, 0] };

/** Posición y alineación de una etiqueta según el lado */
function etiqueta(x: number, y: number, lado: Lado, sep = 20) {
  switch (lado) {
    case "a": return { x, y: y - sep, anchor: "middle" as const };
    case "b": return { x, y: y + sep + 10, anchor: "middle" as const };
    case "l": return { x: x - sep, y: y + 5, anchor: "end" as const };
    case "r": return { x: x + sep, y: y + 5, anchor: "start" as const };
  }
}

const LINEA_POR_ID = Object.fromEntries(LINEAS.map((l) => [l.id, l])) as Record<LineaId, Linea>;

export function MetroMap() {
  const { t, lang } = useLang();
  const [sel, setSel] = useState("dam2");

  const onKey = (e: KeyboardEvent, id: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSel(id);
    }
  };

  const parada = PARADAS.find((p) => p.id === sel);
  const hub = CORRESPONDENCIAS.find((c) => c.id === sel);
  const lineas: LineaId[] = parada?.lineas ?? hub?.lineas ?? [];
  const nombre = parada ? parada.nombre[lang] : hub?.nombre ?? "";
  const info = parada ? parada.info[lang] : hub?.info[lang] ?? "";
  const esProyecto = lineas.some((l) => l === "l2" || l === "l3" || l === "l4");
  const esTecnologia = lineas.some((l) => l.startsWith("l5"));

  const leyenda: [LineaId, string][] = [
    ["l1", t("l_path")], ["l2", "Card Manager"], ["l3", "CRM Mi Mascota"],
    ["l4", "Nobu"], ["l5", t("l_stack")],
  ];
  const dam2 = PARADAS.find((p) => p.id === "dam2")!;
  let orden = 0;

  return (
    <section id="plano">
      <div className="mapbox">
        <div className="map-scroll">
          <svg className="map" viewBox={`0 0 ${PLANO.ancho} ${PLANO.alto}`} role="group" aria-label={t("map_label")}>
            {/* Río Ebro */}
            <path className="river" d={RIO.d} />
            <text className="river-label" x={RIO.etiqueta.x} y={RIO.etiqueta.y}>Ebro</text>

            {/* Líneas: en cada grupo, primero los bordes (dejan el hueco en los cruces) y luego el color */}
            {ORDEN_DIBUJO.map((grupo) => (
              <g key={grupo.join("-")}>
                {grupo.map((id) => (
                  <path key={`c-${id}`} className="casing" d={rutaRedondeada(LINEA_POR_ID[id].puntos)} />
                ))}
                {grupo.map((id) => (
                  <path key={id} className="ln draw" d={rutaRedondeada(LINEA_POR_ID[id].puntos)}
                    stroke={LINEA_POR_ID[id].color} pathLength={1}
                    style={{ animationDelay: `${Math.min(orden++, 8) * 0.1}s` }} />
                ))}
              </g>
            ))}

            {/* Insignias de línea en las terminales */}
            {INSIGNIAS.map((b) => {
              const w = b.codigo.length > 2 ? 42 : 32;
              // Frameworks va debajo de su insignia: a la derecha chocaría con L5.5
              const debajo = b.codigo === "L5.2";
              return (
                <g key={`${b.codigo}-${b.x}-${b.y}`} className="badge-map">
                  <rect x={b.x - w / 2} y={b.y - 11} width={w} height={22} rx={6} fill={b.color} />
                  <text x={b.x} y={b.y + 5} textAnchor="middle">{b.codigo}</text>
                  {b.texto && (
                    <text className="badge-name" x={debajo ? b.x : b.x + w / 2 + 8} y={debajo ? b.y + 30 : b.y + 5}
                      textAnchor={debajo ? "middle" : "start"} style={{ fill: b.color }}>{b.texto[lang]}</text>
                  )}
                </g>
              );
            })}

            {/* Estás aquí */}
            <circle className="pulse" cx={dam2.x} cy={dam2.y} r={12} />
            <g className="tag">
              <rect x={dam2.x + 26} y={dam2.y - 11} width={104} height={22} rx={5} />
              <text x={dam2.x + 78} y={dam2.y + 4} textAnchor="middle">{t("here_tag")}</text>
            </g>

            {/* Paradas */}
            {PARADAS.map((p) => {
              const [nx, ny] = NORMAL[p.etiqueta];
              const color = LINEA_POR_ID[p.linea].color;
              const e = etiqueta(p.x, p.y, p.etiqueta);
              const activa = p.id === sel || p.id === "dam2";
              return (
                <g key={p.id} className={`st${p.id === sel ? " sel" : ""}${p.terminal ? " term" : ""}`} tabIndex={0}
                  role="button" aria-label={p.nombre[lang]} aria-pressed={p.id === sel}
                  onClick={() => setSel(p.id)} onKeyDown={(ev) => onKey(ev, p.id)}>
                  <circle className="hit" cx={p.x} cy={p.y} r={18} />
                  {p.terminal ? (
                    <line className="tick" x1={p.x - nx * TICK} y1={p.y - ny * TICK} x2={p.x + nx * TICK} y2={p.y + ny * TICK}
                      stroke={color} strokeWidth={7} />
                  ) : (
                    <line className="tick" x1={p.x} y1={p.y} x2={p.x + nx * TICK} y2={p.y + ny * TICK} stroke={color} strokeWidth={6} />
                  )}
                  {activa && <circle className="dotc" cx={p.x} cy={p.y} r={9} />}
                  <text x={e.x} y={e.y} textAnchor={e.anchor}>{p.nombre[lang]}</text>
                </g>
              );
            })}

            {/* Correspondencias L2 + L3 */}
            {CORRESPONDENCIAS.map((c) => {
              const e = c.forma === "capsula" ? etiqueta(c.x, c.y, c.etiqueta, 30) : etiqueta(c.x, c.y, c.etiqueta, 38);
              return (
                <g key={c.id} className={`st hub${c.id === sel ? " sel" : ""}`} tabIndex={0} role="button"
                  aria-label={c.nombre} aria-pressed={c.id === sel}
                  onClick={() => setSel(c.id)} onKeyDown={(ev) => onKey(ev, c.id)}>
                  <circle className="hit" cx={c.x} cy={c.y} r={22} />
                  {c.forma === "capsula"
                    ? <rect x={c.x - 12} y={c.y - 19} width={24} height={38} rx={12} />
                    : <circle cx={c.x} cy={c.y} r={12} />}
                  <text x={e.x} y={e.y} textAnchor={e.anchor} className="lbl-hub">{c.nombre}</text>
                </g>
              );
            })}

            {/* Leyenda */}
            <g className="legend">
              <rect className="bg" x={LEYENDA.x} y={LEYENDA.y} width={LEYENDA.ancho} height={LEYENDA.alto} rx={10} />
              <text className="lg-title" x={LEYENDA.x + 18} y={LEYENDA.y + 32}>{t("map_title_short")}</text>
              <text className="lg-sub" x={LEYENDA.x + 18} y={LEYENDA.y + 52}>Alejo Sureda · 2026</text>
              {leyenda.map(([id, texto], i) => {
                const col = i < 3 ? 0 : 1;
                const x = LEYENDA.x + 18 + col * 160;
                const y = LEYENDA.y + 82 + (i % 3) * 24;
                return (
                  <g key={id}>
                    <rect x={x} y={y - 11} width={32} height={18} rx={4} fill={INFO_LINEA[id].color} />
                    <text x={x + 16} y={y + 3} textAnchor="middle" className="lg-code">{INFO_LINEA[id].codigo}</text>
                    <text x={x + 40} y={y + 4}>{texto}</text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        <aside className="info swap" key={sel + lang} aria-live="polite">
          <div className="info-head">
            <span className="kicker">{hub ? t("k_hub") : t("k_stop")}</span>
            <div className="lines">
              {lineas.map((l) => (
                <span key={l} className="badge" style={{ background: INFO_LINEA[l].color }}>{INFO_LINEA[l].codigo}</span>
              ))}
            </div>
          </div>
          <div className="info-body">
            <h3>{nombre}</h3>
            {info && <p>{info}</p>}
          </div>
          <div className="info-actions">
            {esProyecto && <button className="go" onClick={() => irA("lineas")}>{t("go_lines")}</button>}
            {esTecnologia && <button className="go" onClick={() => irA("tecnologias")}>{t("go_tech")}</button>}
            <span className="hint">{t("map_tip")}</span>
          </div>
        </aside>
      </div>
    </section>
  );
}

function irA(id: string) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
}

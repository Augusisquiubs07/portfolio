import type { SVGProps } from "react";

/**
 * Logo de la Red de Metro Alejo Sureda: una "A" dibujada como la línea L1,
 * con una cápsula de correspondencia como palo y remates de terminal en los pies.
 * Usa los colores de la cabecera (--bg y --ink), así funciona en tema claro y oscuro.
 */
export function LogoA(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" role="img" aria-label="A · Red de Metro Alejo Sureda" {...props}>
      <rect width={32} height={32} rx={7} fill="var(--bg)" />
      <path d="M8.5 25.5 L14.6 9.2 Q16 6 17.4 9.2 L23.5 25.5" fill="none" stroke="var(--l1)"
        strokeWidth={4.4} strokeLinejoin="round" />
      <path d="M5.5 25.5 H11 M21 25.5 H26.5" stroke="var(--l1)" strokeWidth={2.4} />
      <rect x={9} y={16} width={14} height={6.4} rx={3.2} fill="var(--bg)" stroke="var(--ink)" strokeWidth={1.7} />
    </svg>
  );
}

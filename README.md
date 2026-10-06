# Portfolio · Alejo Sureda Oteo

Portfolio personal con forma de **plano de metro**:

- **L1 · Trayectoria:** Grado Medio SMR → Prácticas FCT → 1º DAM → AZ-900 → 2º DAM
- **L2 · Card Manager** y **L3 · CRM Mi Mascota:** comparten las correspondencias Supabase, Next.js y Claude
- **L4 · Nobu**
- **L5 · Tecnologías:** se divide en cinco sublíneas (Lenguajes, Frameworks, Datos, Herramientas y Cloud) y no comparte paradas con ninguna otra línea

Español e inglés con un botón, y modo claro y oscuro según el sistema.

## Arrancar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # compilación de producción
npm start
```

## Estructura

```
portfolio-lineas/
├── app/
│   ├── layout.tsx         ← fuentes (Overpass), metadatos y LangProvider
│   ├── page.tsx           ← monta las secciones
│   └── globals.css        ← colores (claro / oscuro) y estilos
├── components/
│   ├── LangProvider.tsx   ← contexto de idioma: lang, setLang y t()
│   ├── Header.tsx  Hero.tsx  Footer.tsx
│   ├── MetroMap.tsx       ← plano SVG interactivo
│   ├── Routes.tsx         ← fichas de L2, L3, L4 y L1 con sus paradas
│   ├── Technologies.tsx   ← sublíneas de L5
│   ├── Contact.tsx
│   └── Rich.tsx           ← **negrita** y `código` en los textos
├── lib/
│   └── stations.ts        ← líneas, paradas, correspondencias, textos de cada parada y enlaces
└── i18n/
    ├── es.json
    └── en.json
```

## Qué cambiar

- **Texto de cada parada (lo que sale al pulsarla):** `lib/stations.ts`, campo `info` de cada parada (`es` y `en`).
  Si `info` está vacío, la parada solo muestra su nombre.
- **Enlaces de GitHub y LinkedIn:** `lib/stations.ts` (constantes `GITHUB` y `LINKEDIN`).
- **Resto de textos:** `i18n/es.json` y `i18n/en.json`.
- **Posición de las paradas:** `lib/stations.ts`. Las coordenadas van sobre un `viewBox` de 1400 × 1040 y los
  tramos son horizontales, verticales o a 45°. Si mueves una parada, mueve también los puntos de su línea.

## Documentación

### Diseño

Todo el portfolio es un plano de metro, dibujado con las convenciones de los planos reales (Londres, Madrid):

- **Tramos rectos a 0°, 45° y 90°** con las **esquinas redondeadas**.
- **Paradas con "palito"** del color de la línea, apuntando hacia su nombre. Las **terminales** llevan un remate
  perpendicular y la **insignia** de la línea (L1, L2, L5.1…).
- **Correspondencias** en blanco con borde negro: cápsula donde L2 y L3 van en paralelo (Supabase y Next.js)
  y círculo donde se cruzan (Claude).
- **Cruces con hueco**: cada línea lleva un borde del color del fondo, así que al pasar por encima de otra la corta,
  igual que en un plano impreso.
- **L5 se ramifica** desde un tronco en cinco sublíneas que se van separando una a una.
- **El Ebro** cruza el plano, como referencia a Zaragoza.

Un color por línea, mucho blanco y bordes negros gruesos, como los carteles de transporte. Tipografía **Overpass**
(inspirada en la señalética de carreteras) y **Overpass Mono** para los datos, cargadas con `next/font`. Los colores son
variables CSS con una versión clara y otra oscura (plano nocturno) que sigue la preferencia del sistema.

| Variable | Uso |
|---|---|
| `--l1` naranja | L1 · Trayectoria |
| `--l2` violeta | L2 · Card Manager |
| `--l3` verde | L3 · CRM Mi Mascota |
| `--l4` magenta | L4 · Nobu |
| `--l5` azul | L5 · Tecnologías y sus sublíneas |
| `--water` | Río Ebro |
| `--ink` / `--bg` | Texto, bordes y fondo |

### Animaciones

| Qué | Cómo | Duración |
|---|---|---|
| Las líneas del plano se dibujan al cargar | `stroke-dashoffset` con `pathLength="1"` | 1 s, escalonadas 150 ms |
| El punto «Estás aquí» late | `@keyframes pulse` (scale + opacity) | 2 s, infinito |
| El panel de la parada cambia | `@keyframes swap` (se vuelve a montar con `key`) | 250 ms |
| Una parada crece al pasar el ratón o con el foco | `transition: r` | 150 ms |

Con `prefers-reduced-motion` se desactivan todas y el plano aparece ya dibujado.

### Tecnologías y por qué

- **Next.js (App Router) + TypeScript:** es el framework de mis dos proyectos y el que más hemos usado en clase.
- **React:** el plano se genera a partir de los arrays de `lib/stations.ts`, así que añadir una parada es añadir un objeto.
- **SVG dibujado a mano:** cada línea es una polilínea con tramos a 45°, como en los planos de metro reales.
  Las paradas de una línea nunca quedan encima de otra línea; solo coinciden las correspondencias.
- **CSS con variables**, sin librerías: el diseño necesita SVG y animaciones muy concretas.
- **i18n con JSON + contexto de React:** dos ficheros de textos y una función `t()`; el idioma elegido se guarda en `localStorage`.
- **Vercel** para el despliegue.

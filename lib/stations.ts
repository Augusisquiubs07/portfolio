/**
 * Plano de metro (viewBox 1400 × 1040). Tramos horizontales, verticales o a 45°.
 * Las paradas de una línea nunca quedan encima de otra línea: solo coinciden las correspondencias.
 * L5 no comparte paradas con ninguna otra línea.
 */

export type LineaId = "l1" | "l2" | "l3" | "l4" | "l5" | "l5.1" | "l5.2" | "l5.3" | "l5.4" | "l5.5";
type Texto = { es: string; en: string };
export type Lado = "a" | "b" | "l" | "r"; // arriba, abajo, izquierda, derecha

export interface Linea { id: LineaId; color: string; puntos: [number, number][] }
export interface Parada { id: string; x: number; y: number; linea: LineaId; lineas: LineaId[]; etiqueta: Lado; terminal: boolean; nombre: Texto; info: Texto }
export interface Correspondencia { id: string; x: number; y: number; forma: "capsula" | "circulo"; etiqueta: Lado; lineas: LineaId[]; nombre: string; info: Texto }
export interface Insignia { codigo: string; color: string; x: number; y: number; texto?: Texto }
export interface Rama { id: LineaId; codigo: string; nombre: Texto }

export const PLANO = { ancho: 1400, alto: 1040 };

export const LINEAS: Linea[] = [
  { id: "l1", color: "var(--l1)", puntos: [[160, 120], [1120, 120]] },
  { id: "l2", color: "var(--l2)", puntos: [[110, 240], [200, 240], [340, 380], [700, 380], [820, 260], [980, 260], [1240, 520], [1330, 520]] },
  { id: "l3", color: "var(--l3)", puntos: [[100, 520], [250, 520], [376, 394], [700, 394], [820, 514], [1140, 514], [1240, 414], [1330, 414]] },
  { id: "l4", color: "var(--l4)", puntos: [[530, 60], [530, 560], [780, 810], [1230, 810]] },
  { id: "l5", color: "var(--l5)", puntos: [[64, 760], [270, 760]] },
  { id: "l5.2", color: "var(--l5)", puntos: [[120, 760], [120, 930]] },
  { id: "l5.5", color: "var(--l5)", puntos: [[180, 760], [240, 820], [240, 940]] },
  { id: "l5.4", color: "var(--l5)", puntos: [[230, 760], [310, 840], [890, 840]] },
  { id: "l5.1", color: "var(--l5)", puntos: [[270, 760], [330, 700], [1070, 700]] },
  { id: "l5.3", color: "var(--l5)", puntos: [[270, 760], [570, 760]] },
];

/** Grupos en orden de dibujo. Dentro de un grupo se pintan primero todos los bordes y luego las líneas. */
export const ORDEN_DIBUJO: LineaId[][] = [["l5", "l5.2", "l5.5", "l5.4", "l5.1", "l5.3"], ["l1"], ["l3"], ["l2"], ["l4"]];

export const PARADAS: Parada[] = [
  { id: "smr", x: 160, y: 120, linea: "l1", lineas: ["l1"], etiqueta: "a", terminal: true,
    nombre: { es: "Grado Medio SMR", en: "Intermediate degree (SMR)" },
    info: { es: "Sistemas Microinformáticos y Redes en Salesianos Zaragoza (2023 – 2025). Aquí empecé a programar con los proyectos de clase y me enganché.", en: "Microcomputer Systems and Networks at Salesianos Zaragoza (2023 – 2025). This is where I started programming in class projects and got hooked." } },
  { id: "fct", x: 400, y: 120, linea: "l1", lineas: ["l1"], etiqueta: "a", terminal: false,
    nombre: { es: "Prácticas FCT", en: "Internship (FCT)" },
    info: { es: "Tres meses en Informática Zaragoza diagnosticando, reparando y manteniendo portátiles y ordenadores de sobremesa.", en: "Three months at Informática Zaragoza diagnosing, repairing and maintaining laptops and desktop computers." } },
  { id: "dam1", x: 640, y: 120, linea: "l1", lineas: ["l1"], etiqueta: "a", terminal: false,
    nombre: { es: "1º DAM", en: "1st year DAM" },
    info: { es: "Primer curso de Desarrollo de Aplicaciones Multiplataforma en Salesianos Zaragoza: programación, bases de datos y lenguajes de marcas.", en: "First year of Multiplatform Application Development at Salesianos Zaragoza: programming, databases and markup languages." } },
  { id: "az900", x: 880, y: 120, linea: "l1", lineas: ["l1"], etiqueta: "a", terminal: false,
    nombre: { es: "AZ-900", en: "AZ-900" },
    info: { es: "Curso de Microsoft Azure Fundamentals durante 1º de DAM, con certificado de realización: conceptos de nube, servicios y seguridad.", en: "Microsoft Azure Fundamentals course during my first year of DAM, with certificate of completion: cloud concepts, services and security." } },
  { id: "dam2", x: 1120, y: 120, linea: "l1", lineas: ["l1"], etiqueta: "a", terminal: true,
    nombre: { es: "2º DAM", en: "2nd year DAM" },
    info: { es: "Estás aquí. Segundo curso de DAM, con Card Manager y el CRM Mi Mascota hechos con Next.js y Supabase.", en: "You are here. Second year of DAM, with Card Manager and the CRM Mi Mascota built with Next.js and Supabase." } },
  { id: "er", x: 110, y: 240, linea: "l2", lineas: ["l2"], etiqueta: "a", terminal: true,
    nombre: { es: "ER", en: "ER" },
    info: { es: "Modelo entidad-relación de Card Manager: 12 tablas, con una tabla pivote entre colecciones y cartas y las cartas de Pokémon y de fútbol como especializaciones.", en: "Card Manager's entity-relationship model: 12 tables, with a pivot table between collections and cards, and Pokémon and football cards as specialisations." } },
  { id: "figma", x: 900, y: 260, linea: "l2", lineas: ["l2"], etiqueta: "a", terminal: false,
    nombre: { es: "Figma", en: "Figma" },
    info: { es: "Las pantallas de Card Manager se diseñaron en Figma. El diseño lo hizo un compañero; yo me encargué del backend y la base de datos.", en: "Card Manager's screens were designed in Figma. A teammate did the design; I took care of the backend and the database." } },
  { id: "cm", x: 1330, y: 520, linea: "l2", lineas: ["l2"], etiqueta: "b", terminal: true,
    nombre: { es: "Card Manager", en: "Card Manager" },
    info: { es: "Red social para coleccionistas de cartas de Pokémon y de fútbol: perfiles, seguidores y colecciones. Hice todo el backend y la base de datos.", en: "A social network for Pokémon and football card collectors: profiles, followers and collections. I built the whole backend and database." } },
  { id: "empresa", x: 100, y: 520, linea: "l3", lineas: ["l3"], etiqueta: "b", terminal: true,
    nombre: { es: "Empresa", en: "Company" },
    info: { es: "El CRM está pensado para una empresa real: la clínica veterinaria Mi Mascota, con su parte comercial y su parte de recursos humanos.", en: "The CRM is built for a real business: the Mi Mascota veterinary clinic, covering both its sales side and its HR side." } },
  { id: "web", x: 200, y: 520, linea: "l3", lineas: ["l3"], etiqueta: "b", terminal: false,
    nombre: { es: "Web", en: "Website" },
    info: { es: "La web de la clínica envía su formulario de contacto al CRM con POST /api/contacto, que valida los datos, filtra bots y limita los envíos.", en: "The clinic's website sends its contact form to the CRM through POST /api/contacto, which validates the data, filters bots and rate-limits submissions." } },
  { id: "odoo", x: 880, y: 514, linea: "l3", lineas: ["l3"], etiqueta: "b", terminal: false,
    nombre: { es: "Odoo", en: "Odoo" },
    info: { es: "", en: "" } },
  { id: "opor", x: 990, y: 514, linea: "l3", lineas: ["l3"], etiqueta: "b", terminal: false,
    nombre: { es: "Oportunidades", en: "Opportunities" },
    info: { es: "Pipeline de ventas: Nuevo → Contactado → Presupuesto → Cita → Atendido o Descartado. La probabilidad y el historial los calculan triggers.", en: "Sales pipeline: New → Contacted → Quote → Appointment → Served or Discarded. Triggers work out the probability and the history." } },
  { id: "rrhh", x: 1100, y: 514, linea: "l3", lineas: ["l3"], etiqueta: "b", terminal: false,
    nombre: { es: "RRHH", en: "HR" },
    info: { es: "Fichajes, vacaciones con días laborables calculados, procesos de selección, evaluaciones y nóminas que el trabajador firma dibujando.", en: "Clock-ins, holidays with working days calculated, hiring processes, reviews and payslips employees sign by drawing." } },
  { id: "crm", x: 1330, y: 414, linea: "l3", lineas: ["l3"], etiqueta: "a", terminal: true,
    nombre: { es: "CRM Mi Mascota", en: "CRM Mi Mascota" },
    info: { es: "CRM y recursos humanos para la clínica: 16 tablas, 17 funciones y 8 triggers en PostgreSQL, con permisos por rol en la base de datos (RLS).", en: "CRM and HR for the clinic: 16 tables, 17 functions and 8 triggers in PostgreSQL, with role permissions enforced in the database (RLS)." } },
  { id: "inv", x: 530, y: 60, linea: "l4", lineas: ["l4"], etiqueta: "r", terminal: true,
    nombre: { es: "Invitación", en: "Invitation" },
    info: { es: "", en: "" } },
  { id: "npy", x: 530, y: 200, linea: "l4", lineas: ["l4"], etiqueta: "r", terminal: false,
    nombre: { es: "Python", en: "Python" },
    info: { es: "", en: "" } },
  { id: "npc", x: 530, y: 290, linea: "l4", lineas: ["l4"], etiqueta: "r", terminal: false,
    nombre: { es: "PyCharm", en: "PyCharm" },
    info: { es: "", en: "" } },
  { id: "ngl", x: 530, y: 470, linea: "l4", lineas: ["l4"], etiqueta: "r", terminal: false,
    nombre: { es: "GitLab", en: "GitLab" },
    info: { es: "", en: "" } },
  { id: "nday", x: 860, y: 810, linea: "l4", lineas: ["l4"], etiqueta: "a", terminal: false,
    nombre: { es: "Nobu Day", en: "Nobu Day" },
    info: { es: "", en: "" } },
  { id: "nint", x: 970, y: 810, linea: "l4", lineas: ["l4"], etiqueta: "a", terminal: false,
    nombre: { es: "International", en: "International" },
    info: { es: "", en: "" } },
  { id: "nmis", x: 1090, y: 810, linea: "l4", lineas: ["l4"], etiqueta: "a", terminal: false,
    nombre: { es: "Mission System", en: "Mission System" },
    info: { es: "", en: "" } },
  { id: "nxp", x: 1230, y: 810, linea: "l4", lineas: ["l4"], etiqueta: "a", terminal: true,
    nombre: { es: "XP Multipliers", en: "XP Multipliers" },
    info: { es: "", en: "" } },
  { id: "t-html", x: 380, y: 700, linea: "l5.1", lineas: ["l5.1"], etiqueta: "b", terminal: false,
    nombre: { es: "HTML", en: "HTML" },
    info: { es: "Estructura de las páginas web.", en: "Structure of web pages." } },
  { id: "t-css", x: 450, y: 700, linea: "l5.1", lineas: ["l5.1"], etiqueta: "b", terminal: false,
    nombre: { es: "CSS", en: "CSS" },
    info: { es: "Estilos, diseño adaptable y animaciones.", en: "Styles, responsive layout and animations." } },
  { id: "t-js", x: 535, y: 700, linea: "l5.1", lineas: ["l5.1"], etiqueta: "b", terminal: false,
    nombre: { es: "JavaScript", en: "JavaScript" },
    info: { es: "Interactividad en el navegador y en Node.js.", en: "Interactivity in the browser and in Node.js." } },
  { id: "t-java", x: 615, y: 700, linea: "l5.1", lineas: ["l5.1"], etiqueta: "b", terminal: false,
    nombre: { es: "Java", en: "Java" },
    info: { es: "El lenguaje principal de 1º de DAM: programación orientada a objetos.", en: "The main language in my first year of DAM: object-oriented programming." } },
  { id: "t-sql", x: 735, y: 700, linea: "l5.1", lineas: ["l5.1"], etiqueta: "b", terminal: false,
    nombre: { es: "SQL", en: "SQL" },
    info: { es: "Consultas, triggers, funciones y políticas de seguridad en PostgreSQL y MySQL.", en: "Queries, triggers, functions and security policies in PostgreSQL and MySQL." } },
  { id: "t-ts", x: 830, y: 700, linea: "l5.1", lineas: ["l5.1"], etiqueta: "b", terminal: false,
    nombre: { es: "TypeScript", en: "TypeScript" },
    info: { es: "El lenguaje de Card Manager, del CRM y de este portfolio.", en: "The language of Card Manager, the CRM and this portfolio." } },
  { id: "t-cs", x: 915, y: 700, linea: "l5.1", lineas: ["l5.1"], etiqueta: "b", terminal: false,
    nombre: { es: "C#", en: "C#" },
    info: { es: "Aplicaciones de escritorio con Visual Studio.", en: "Desktop applications with Visual Studio." } },
  { id: "t-dart", x: 985, y: 700, linea: "l5.1", lineas: ["l5.1"], etiqueta: "b", terminal: false,
    nombre: { es: "Dart", en: "Dart" },
    info: { es: "El lenguaje de Flutter, para aplicaciones móviles.", en: "Flutter's language, for mobile apps." } },
  { id: "t-py", x: 1070, y: 700, linea: "l5.1", lineas: ["l5.1"], etiqueta: "b", terminal: true,
    nombre: { es: "Python", en: "Python" },
    info: { es: "Scripts y programas de consola.", en: "Scripts and console programs." } },
  { id: "t-next", x: 120, y: 820, linea: "l5.2", lineas: ["l5.2"], etiqueta: "l", terminal: false,
    nombre: { es: "Next.js", en: "Next.js" },
    info: { es: "Framework de React con App Router, rutas de API y renderizado en servidor.", en: "React framework with App Router, API routes and server rendering." } },
  { id: "t-tw", x: 120, y: 875, linea: "l5.2", lineas: ["l5.2"], etiqueta: "l", terminal: false,
    nombre: { es: "Tailwind", en: "Tailwind" },
    info: { es: "Estilos con clases de utilidad y variables de tema.", en: "Styling with utility classes and theme variables." } },
  { id: "t-flutter", x: 120, y: 930, linea: "l5.2", lineas: ["l5.2"], etiqueta: "l", terminal: true,
    nombre: { es: "Flutter", en: "Flutter" },
    info: { es: "Aplicaciones multiplataforma con un solo código.", en: "Cross-platform apps from a single codebase." } },
  { id: "t-pma", x: 360, y: 760, linea: "l5.3", lineas: ["l5.3"], etiqueta: "b", terminal: false,
    nombre: { es: "PHPMyAdmin", en: "PHPMyAdmin" },
    info: { es: "Gestión visual de bases de datos MySQL.", en: "Visual management of MySQL databases." } },
  { id: "t-mysql", x: 470, y: 760, linea: "l5.3", lineas: ["l5.3"], etiqueta: "b", terminal: false,
    nombre: { es: "MySQL", en: "MySQL" },
    info: { es: "Bases de datos relacionales en clase.", en: "Relational databases in class." } },
  { id: "t-supa", x: 570, y: 760, linea: "l5.3", lineas: ["l5.3"], etiqueta: "b", terminal: true,
    nombre: { es: "Supabase", en: "Supabase" },
    info: { es: "PostgreSQL, Auth y Storage como servicio.", en: "PostgreSQL, Auth and Storage as a service." } },
  { id: "t-vsc", x: 370, y: 840, linea: "l5.4", lineas: ["l5.4"], etiqueta: "b", terminal: false,
    nombre: { es: "VS Code", en: "VS Code" },
    info: { es: "Mi editor de cada día.", en: "My everyday editor." } },
  { id: "t-gh", x: 470, y: 840, linea: "l5.4", lineas: ["l5.4"], etiqueta: "b", terminal: false,
    nombre: { es: "GitHub", en: "GitHub" },
    info: { es: "Repositorios, ramas y control de versiones con Git.", en: "Repositories, branches and version control with Git." } },
  { id: "t-pyc", x: 570, y: 840, linea: "l5.4", lineas: ["l5.4"], etiqueta: "b", terminal: false,
    nombre: { es: "PyCharm", en: "PyCharm" },
    info: { es: "IDE para proyectos en Python.", en: "IDE for Python projects." } },
  { id: "t-gl", x: 670, y: 840, linea: "l5.4", lineas: ["l5.4"], etiqueta: "b", terminal: false,
    nombre: { es: "GitLab", en: "GitLab" },
    info: { es: "Repositorios y trabajo en equipo con GitLab.", en: "Repositories and teamwork with GitLab." } },
  { id: "t-vs", x: 780, y: 840, linea: "l5.4", lineas: ["l5.4"], etiqueta: "b", terminal: false,
    nombre: { es: "Visual Studio", en: "Visual Studio" },
    info: { es: "IDE para C# y .NET.", en: "IDE for C# and .NET." } },
  { id: "t-vercel", x: 890, y: 840, linea: "l5.4", lineas: ["l5.4"], etiqueta: "b", terminal: true,
    nombre: { es: "Vercel", en: "Vercel" },
    info: { es: "Despliegue de aplicaciones Next.js.", en: "Deploying Next.js apps." } },
  { id: "t-az", x: 240, y: 940, linea: "l5.5", lineas: ["l5.5"], etiqueta: "r", terminal: true,
    nombre: { es: "AZ-900", en: "AZ-900" },
    info: { es: "Fundamentos de Microsoft Azure: nube, servicios, seguridad y precios.", en: "Microsoft Azure fundamentals: cloud, services, security and pricing." } },
];

export const CORRESPONDENCIAS: Correspondencia[] = [
  { id: "supabase", x: 420, y: 387, forma: "capsula", etiqueta: "a", lineas: ["l2", "l3"], nombre: "Supabase",
    info: { es: "PostgreSQL, Auth y Storage. Aquí viven las tablas, triggers, funciones y políticas RLS de Card Manager y del CRM: 28 tablas en total.", en: "PostgreSQL, Auth and Storage. This is where Card Manager's and the CRM's tables, triggers, functions and RLS policies live: 28 tables in total." } },
  { id: "next", x: 640, y: 387, forma: "capsula", etiqueta: "a", lineas: ["l2", "l3"], nombre: "Next.js",
    info: { es: "Los dos proyectos están hechos con Next.js y TypeScript (App Router): Card Manager con Next 14 y el CRM con Next 16 y React 19.", en: "Both projects are built with Next.js and TypeScript (App Router): Card Manager on Next 14 and the CRM on Next 16 with React 19." } },
  { id: "claude", x: 1187, y: 467, forma: "circulo", etiqueta: "l", lineas: ["l2", "l3"], nombre: "Claude",
    info: { es: "Asistente de IA que he usado en los dos proyectos durante el desarrollo.", en: "AI assistant I've used in both projects during development." } },
];

/** Insignias de línea en las terminales */
export const INSIGNIAS: Insignia[] = [
  { codigo: "L1", color: "var(--l1)", x: 128, y: 120 },
  { codigo: "L2", color: "var(--l2)", x: 76, y: 240 },
  { codigo: "L2", color: "var(--l2)", x: 1366, y: 520 },
  { codigo: "L3", color: "var(--l3)", x: 64, y: 520 },
  { codigo: "L3", color: "var(--l3)", x: 1366, y: 414 },
  { codigo: "L4", color: "var(--l4)", x: 530, y: 26 },
  { codigo: "L4", color: "var(--l4)", x: 1266, y: 810 },
  { codigo: "L5", color: "var(--l5)", x: 44, y: 760 },
  { codigo: "L5.1", color: "var(--l5)", x: 1112, y: 700, texto: { es: "Lenguajes", en: "Languages" } },
  { codigo: "L5.2", color: "var(--l5)", x: 120, y: 966, texto: { es: "Frameworks", en: "Frameworks" } },
  { codigo: "L5.3", color: "var(--l5)", x: 612, y: 760, texto: { es: "Datos", en: "Data" } },
  { codigo: "L5.4", color: "var(--l5)", x: 932, y: 840, texto: { es: "Herramientas", en: "Tools" } },
  { codigo: "L5.5", color: "var(--l5)", x: 240, y: 976, texto: { es: "Cloud", en: "Cloud" } },
];

export const RIO = { d: "M-20 600 C 220 560, 420 660, 640 615 S 1040 570, 1180 620 S 1360 650, 1420 610", etiqueta: { x: 1010, y: 612 } };
export const LEYENDA = { x: 1070, y: 880, ancho: 316, alto: 148 };

/** Sublíneas de L5 (para la sección de tecnologías) */
export const RAMAS: Rama[] = [
  { id: "l5.1", codigo: "L5.1", nombre: { es: "Lenguajes", en: "Languages" } },
  { id: "l5.2", codigo: "L5.2", nombre: { es: "Frameworks", en: "Frameworks" } },
  { id: "l5.3", codigo: "L5.3", nombre: { es: "Datos", en: "Data" } },
  { id: "l5.4", codigo: "L5.4", nombre: { es: "Herramientas", en: "Tools" } },
  { id: "l5.5", codigo: "L5.5", nombre: { es: "Cloud", en: "Cloud" } },
];

export const INFO_LINEA: Record<LineaId, { codigo: string; color: string }> = {
  l1: { codigo: "L1", color: "var(--l1)" }, l2: { codigo: "L2", color: "var(--l2)" }, l3: { codigo: "L3", color: "var(--l3)" },
  l4: { codigo: "L4", color: "var(--l4)" }, l5: { codigo: "L5", color: "var(--l5)" },
  "l5.1": { codigo: "L5.1", color: "var(--l5)" }, "l5.2": { codigo: "L5.2", color: "var(--l5)" }, "l5.3": { codigo: "L5.3", color: "var(--l5)" },
  "l5.4": { codigo: "L5.4", color: "var(--l5)" }, "l5.5": { codigo: "L5.5", color: "var(--l5)" },
};

export const RECORRIDOS: Record<"l1" | "l2" | "l3" | "l4", string[]> = {
  l1: ["smr", "fct", "dam1", "az900", "dam2"],
  l2: ["er", "supabase", "next", "figma", "claude", "cm"],
  l3: ["empresa", "web", "supabase", "next", "odoo", "opor", "rrhh", "claude", "crm"],
  l4: ["inv", "npy", "npc", "ngl", "nday", "nint", "nmis", "nxp"],
};

export const SUBLINEAS: { id: LineaId; paradas: string[] }[] = [
  { id: "l5.1", paradas: ["t-html", "t-css", "t-js", "t-java", "t-sql", "t-ts", "t-cs", "t-dart", "t-py"] },
  { id: "l5.2", paradas: ["t-next", "t-tw", "t-flutter"] },
  { id: "l5.3", paradas: ["t-pma", "t-mysql", "t-supa"] },
  { id: "l5.4", paradas: ["t-vsc", "t-gh", "t-pyc", "t-gl", "t-vs", "t-vercel"] },
  { id: "l5.5", paradas: ["t-az"] },
];

export const EMAIL = "alejosuredaoteo2007@gmail.com";
export const GITHUB = { url: "https://github.com/Panaiaio", texto: "github.com/alejo-sureda-oteo" };
export const LINKEDIN = { url: "www.linkedin.com/in/alejo-sureda-oteo-000b40394", texto: "linkedin.com/in/alejo-sureda-oteo" };

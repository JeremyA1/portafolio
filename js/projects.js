// ─────────────────────────────────────────────────────────────
// Datos del portafolio. Para añadir un proyecto, copia un objeto
// de `projects`, cambia sus campos y pon sus capturas en
// assets/projects/. El orden del array es el orden en la página.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "Jeremy",
  role: "Diseño y desarrollo web",
  email: "jeremya.peres@gmail.com",
  socials: [
    { label: "GitHub", url: "https://github.com/JeremyA1" },
    { label: "Vercel", url: "https://vercel.com/jeremya1s-projects" },
  ],
};

export const projects = [
  {
    slug: "jeremy-perez-portfolio",
    title: "Portafolio de Product Design",
    kicker: "Portafolio · 3D interactivo",
    year: "2026",
    url: "https://jeremy-perez-portfolio.vercel.app",
    accent: "#9fb7c9",
    icon: "layers-minimalistic",
    summary:
      "Mi portafolio como Senior Product Designer: un hero 3D de metal líquido que pasa de «complejo» a «claro» y cinco casos de producto, de fintech a hospitality.",
    description: [
      "El reto era contar en una sola página qué hago: convertir lógica operativa compleja —aranceles, permisos, precios, reportes— en interfaces claras. El hero lo muestra de forma literal: una masa de metal líquido rodeada de fragmentos que cambia cuando deslizas de «Complex» a «Clear».",
      "Debajo, cinco casos seleccionados entre 2024 y 2026 —OceanCar, Qadrao, Laid Back Llama, Seoopia y NCGVilla— con rol, año, plataforma y cliente, más una sección de capacidades y herramientas.",
    ],
    role: "Diseño, 3D y desarrollo",
    stack: ["Three.js", "Lenis", "Iconify", "Montserrat"],
    highlights: [
      "Escena 3D en Three.js que se gira arrastrando y reacciona al pasar el ratón por las palabras.",
      "Control deslizante «Complex → Clear» que transforma la escena en tiempo real.",
      "Cinco casos de estudio con rol, año, plataforma y cliente, y enlaces a los sitios en vivo.",
      "Pantalla de carga con contador y scroll suave.",
    ],
    stats: [
      { value: "5", label: "casos de estudio" },
      { value: "5", label: "clientes" },
      { value: "2024–26", label: "años de trabajo" },
    ],
    images: {
      cover: "assets/projects/jp-cover.jpg",
      // Al pasar el ratón cambia a la sección de trabajos
      hover: "assets/projects/jp-work.jpg",
      gallery: ["assets/projects/jp-work.jpg", "assets/projects/jp-qadrao.jpg", "assets/projects/jp-ncgvilla.jpg"],
    },
  },
  {
    slug: "ports-de-videojuegos",
    title: "Ports de videojuegos",
    kicker: "Directorio · Datos abiertos",
    year: "2026",
    url: "https://ports-de-videojuegos.vercel.app",
    accent: "#ff6a3d",
    icon: "gamepad",
    summary:
      "Un mapa de los ports, decompilaciones, recompilaciones y motores reimplementados de videojuegos, ordenados por estrellas de GitHub.",
    description: [
      "Cientos de proyectos de la comunidad para jugar clásicos en PC y otras plataformas estaban repartidos entre listas, wikis y repositorios sueltos. Este directorio los reúne en un solo sitio y los ordena por lo que más importa: popularidad y actividad.",
      "La portada propone dos recorridos —lo más popular y lo que se movió hace poco— y una exploración por consola donde cada «cartucho» muestra con una barra la mezcla de tipos de proyecto que tiene.",
    ],
    role: "Diseño, desarrollo y curación de datos",
    stack: ["Datos de GitHub", "ecosyste.ms", "Solar Icons", "Chakra Petch"],
    highlights: [
      "Búsqueda por juego, consola o repositorio, con filtros por consola y tipo, y orden por estrellas.",
      "Carruseles con los 12 repos más populares y los 12 con actividad más reciente.",
      "Exploración por consola con una barra que resume la mezcla de tipos de port.",
      "Selector de animaciones para quien prefiere menos movimiento.",
    ],
    stats: [
      { value: "1.192", label: "repositorios" },
      { value: "29", label: "consolas" },
      { value: "17.5k", label: "estrellas el más popular" },
    ],
    images: {
      cover: "assets/projects/ports-cover.jpg",
      // Captura alta: se desplaza al pasar el ratón por la tarjeta
      scroll: "assets/projects/ports-scroll.jpg",
      gallery: ["assets/projects/ports-detail.jpg"],
    },
  },
  {
    slug: "que-cenamos",
    title: "¿Qué cenamos?",
    kicker: "Web app · IA",
    year: "2026",
    url: "https://que-cenamos-omega.vercel.app",
    accent: "#f0844f",
    icon: "chef-hat",
    summary:
      "Sube fotos de tu compra o de tu factura y descubre qué cocinar con lo que ya tienes en casa.",
    description: [
      "La pregunta de cada noche, resuelta con lo que ya hay en la despensa. La app lee las fotos de la compra o del ticket, separa los alimentos de todo lo demás y propone tres cenas distintas con esos ingredientes.",
      "El flujo es Compra → Despensa → Cena: confirmas lo dudoso (nada se inventa), eliges una idea y la cocinas paso a paso con temporizadores. Un código de casa sincroniza la despensa entre dispositivos.",
    ],
    role: "Producto, diseño y desarrollo",
    stack: ["JavaScript", "Claude API", "Visión por IA", "Bricolage Grotesque"],
    highlights: [
      "Une varias fotos de una misma factura sin duplicar líneas.",
      "Aparta productos que no son comida, como los de limpieza.",
      "Tres ideas de cena distintas con lo que tienes, paso a paso y con temporizadores.",
      "Código de casa para usar la misma despensa en otro dispositivo.",
    ],
    stats: [
      { value: "4", label: "pasos de la compra a la cena" },
      { value: "3", label: "ideas de cena por despensa" },
      { value: "0", label: "ingredientes inventados" },
    ],
    images: {
      cover: "assets/projects/cenamos-cover.jpg",
      // Sin captura alta: al pasar el ratón cambia a la segunda imagen
      hover: "assets/projects/cenamos-demo.jpg",
      gallery: ["assets/projects/cenamos-demo.jpg"],
    },
  },
];

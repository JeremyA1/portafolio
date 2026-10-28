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
    slug: "sa3-barberia",
    title: "Sa3 Barbería",
    kicker: "Landing · Reservas por WhatsApp",
    year: "2026",
    url: "https://sa3-barberia.vercel.app",
    accent: "#ff5233",
    icon: "scissors",
    summary:
      "Landing para una barbería en República Dominicana: el cliente reserva su corte por WhatsApp en 30 segundos con un bot, sin llamadas ni filas.",
    description: [
      "Una web pensada para que reservar sea un solo gesto. Cada servicio abre WhatsApp con el mensaje ya escrito, y el bot de Sa3 pide el nombre, ofrece solo los huecos libres de verdad, confirma la cita y manda un recordatorio.",
      "El diseño se apoya en un titular enorme —«Tu corte sin espera», con el poste de barbero dentro de la O—, una lista de servicios con precio en RD$ y duración, un teléfono que reproduce la conversación con el bot paso a paso y un horario semanal que indica si está abierto y cuánto falta para cerrar.",
    ],
    role: "Diseño y desarrollo",
    stack: ["Vite", "Tailwind CSS", "Bot de WhatsApp", "Open Sans"],
    highlights: [
      "Cada servicio abre WhatsApp con el mensaje de reserva ya escrito.",
      "Demo del bot en un teléfono: saludo, servicio, día y hora, confirmación y recordatorio.",
      "Horario semanal con estado «Abierto ahora» y cuenta atrás hasta el cierre.",
      "Opción en el pie para reducir las animaciones.",
    ],
    stats: [
      { value: "6", label: "servicios con precio" },
      { value: "30 s", label: "para reservar" },
      { value: "4", label: "pasos con el bot" },
    ],
    images: {
      cover: "assets/projects/sa3-cover.jpg",
      // Al pasar el ratón cambia a la lista de servicios
      hover: "assets/projects/sa3-services.jpg",
      gallery: ["assets/projects/sa3-services.jpg", "assets/projects/sa3-booking.jpg"],
    },
  },
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
    kicker: "Catálogo · Guías para jugar",
    year: "2026",
    url: "https://ports-de-videojuegos.vercel.app",
    accent: "#ff6a3d",
    icon: "gamepad",
    summary:
      "Los clásicos de consola, nativos en tu PC: un catálogo de ports, decompilaciones y recompilaciones con guías para instalarlos y juegos que se abren en el navegador.",
    description: [
      "Cientos de proyectos de la comunidad para jugar clásicos de Nintendo 64, PlayStation, Xbox 360 y más sin emulador estaban repartidos entre listas, wikis y repositorios sueltos. Este catálogo los reúne en un solo sitio y responde a la pregunta que importa: ¿qué puedo jugar hoy y cómo?",
      "La portada empieza por un buscador y un mosaico de carátulas. Debajo, «Listos para jugar en PC» filtra los ports que ya funcionan de principio a fin o casi, cada uno con una ficha de qué necesitas, dónde descargarlo y cómo instalarlo; «Juega en el navegador» reúne los que se abren sin instalar nada, y el catálogo completo ordena todo por estrellas y por consola.",
    ],
    role: "Diseño, desarrollo y curación de datos",
    stack: ["Datos de GitHub", "ecosyste.ms", "Solar Icons", "Chakra Petch"],
    highlights: [
      "Fichas por juego con qué necesitas, enlaces de descarga y pasos de instalación.",
      "Juegos listos para PC con carátula, filtro por consola y estado «Completo» o «Jugable».",
      "Juegos que se abren en el navegador, solo con datos gratuitos o los archivos de tu copia.",
      "Catálogo completo con búsqueda, filtros por tipo y consola, lo más popular y lo más reciente.",
    ],
    stats: [
      { value: "1.597", label: "proyectos" },
      { value: "247", label: "listos para jugar en PC" },
      { value: "12", label: "se juegan en el navegador" },
    ],
    images: {
      cover: "assets/projects/ports-cover.jpg",
      // Captura alta: se desplaza al pasar el ratón por la tarjeta
      scroll: "assets/projects/ports-scroll.jpg",
      gallery: ["assets/projects/ports-game.jpg", "assets/projects/ports-web.jpg"],
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

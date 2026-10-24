# Portafolio

Sitio estático (HTML + CSS + JS, sin build). Animaciones con GSAP + ScrollTrigger y scroll suave con Lenis (desde CDN). Iconos: [Solar](https://solar-icons.dev/icons?style=line-duotone), estilo line-duotone.

## Ver en local

```bash
node scripts/serve.mjs
```

Abre http://localhost:5173.

## Añadir un proyecto

1. Guarda sus capturas en `assets/projects/` (1440×900 para la portada; opcional una captura alta para el efecto de scroll al pasar el ratón).
2. Copia un objeto del array `projects` en `js/projects.js` y cambia sus campos.

Tu nombre, correo y redes están en `site`, en ese mismo archivo.

## Añadir iconos

Añade el nombre a la lista de `scripts/build-icons.mjs` (sin el sufijo `-line-duotone`) y ejecuta:

```bash
node scripts/build-icons.mjs
```

Se usan como `<svg class="icon"><use href="#i-nombre" /></svg>`.

## Publicar en Vercel

Es un sitio estático: importa la carpeta en Vercel sin framework ni comando de build.

Referencias de diseño: `docs/inspiration.md`.

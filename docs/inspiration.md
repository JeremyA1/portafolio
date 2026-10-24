# Inspiración — MotionSites

Fuente: https://motionsites.ai/ (visitada el 2026-10-24). Solo referencia: no se copió código ni assets.

## Qué es
Una galería de plantillas de landing pages con mucho movimiento (heros 3D, partículas, vídeo de fondo).
Lo útil no es una plantilla concreta sino el lenguaje visual que comparten.

## Patrones que vale la pena tomar

### Hero
- Titular enorme, peso 900, tracking negativo (~-0.03em), en dos líneas cortas y centrado.
- Una palabra en cursiva y otra con degradado + brillo suave (glow) para crear ritmo dentro del titular.
- Etiqueta tipo "pill" pequeña encima del titular (ej. "FRESH DROPS EVERYDAY") con borde fino.
- Subtítulo corto en gris medio, máx. ~2 líneas.
- Un único CTA en forma de píldora blanca con degradado sutil y flecha →.
- Fondo casi negro (#121212), sin ruido: el contraste lo pone la tipografía.

### Galería / tarjetas
- Layout tipo masonry de 3–4 columnas con alturas distintas: rompe la monotonía de una cuadrícula.
- Cada tarjeta es una miniatura con radio grande (~16px) y, debajo, título en negrita + categoría en gris.
- Las miniaturas son vídeos `autoplay muted loop`: la página "respira" sin que el usuario haga nada.
- Filtros en grupos de píldoras (Featured / Popular / Recent · All / Apps / Sections) con el activo en un fondo más claro.
- Bloques "intercalados" dentro del grid (p. ej. una tarjeta promocional) para cortar el ritmo.

### Vista de detalle
- Al abrir un proyecto no se cambia de página: el grid se reordena y el proyecto ocupa una tarjeta grande
  (2/3 de ancho) con panel lateral oscuro: nombre, categoría, likes y acciones. La URL cambia con `?prompt=slug`
  para que sea enlazable.
- Botón circular de "volver" flotando sobre la miniatura.

### Navegación
- Barra superior fina: logo a la izquierda, enlaces en gris claro, buscador como icono y CTA en píldora blanca a la derecha.
- Banner superior de color sólido (lila) para avisos.

### Tipografía y color
- Fuente del sistema (San Francisco / Segoe UI) en todos los textos: rápida y nítida.
- Paleta neutra oscura; el color lo aportan las miniaturas. Acentos lila → rosa → melocotón en degradados.

### Ritmo de animación
- Movimiento continuo y lento en el contenido (vídeos en bucle, partículas), interfaz quieta.
- Transiciones de UI cortas y suaves; nada rebota.

## Cómo lo aplicamos en el portafolio
- Hero con titular gigante, una palabra en cursiva y otra con degradado + glow.
- Proyectos en tarjetas grandes con miniatura viva (captura del sitio con desplazamiento lento al pasar el ratón).
- Vista de detalle en el mismo documento, enlazable con `#slug`.
- Fondo casi negro, interfaz neutra, color aportado por los proyectos.
- Animaciones de entrada con scroll (revelado por líneas) y desplazamiento suave.

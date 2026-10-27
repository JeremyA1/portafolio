// ─────────────────────────────────────────────────────────────
// Onda de partículas del hero: una malla de puntos vista en
// perspectiva que ondula como una tela. El cursor la levanta y
// la tiñe, y al hacer scroll la onda crece y se desvanece.
// ─────────────────────────────────────────────────────────────

const LEVELS = 10; // niveles de opacidad para agrupar los puntos y pintar por lotes
const BASE = "236, 236, 242"; // puntos: blanco frío
const ACCENT = "255, 180, 138"; // puntos bajo el cursor: melocotón

export function initWave(canvas) {
  const ctx = canvas.getContext("2d");
  const hero = canvas.parentElement;

  let w = 0, h = 0, dpr = 1, cols = 0, rows = 0;
  const pointer = { x: 0, y: 0, tx: 0, ty: 0, power: 0, target: 0 };
  const start = performance.now();
  let visible = true;
  let frame = 0;

  // Un lote de rectángulos por nivel de opacidad y por color
  const batches = [BASE, ACCENT].map(() => Array.from({ length: LEVELS }, () => []));

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    // El tamaño visible lo pone el CSS (ancho completo × una pantalla). Aquí solo se ajusta
    // la resolución interna: fijar width/height en línea lo dejaría congelado al redimensionar.
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    const small = w < 700;
    cols = small ? 96 : 176;
    rows = small ? 36 : 58;
  }

  // Altura de la tela en (x, z) para el instante t
  function height(x, z, t) {
    return (
      0.34 * Math.sin(x * 1.5 + t * 0.45 + z * 0.9) * (0.65 + 0.35 * Math.sin(z * 2.1 - t * 0.3)) +
      0.17 * Math.sin(x * 3.2 - t * 0.7 + z * 2.4) +
      0.1 * Math.cos(z * 4.2 + x * 0.8 + t * 0.85)
    );
  }

  function draw(now) {
    frame = requestAnimationFrame(draw);
    // Sin tamaño (panel oculto, CSS aún sin cargar) no hay nada que pintar, y dividir entre h daría NaN
    if (!visible || !w || !h) return;

    const t = (now - start) / 1000;
    const intro = 1 - Math.pow(1 - Math.min(1, t / 2.8), 3); // la onda nace plana y se levanta
    const rect = hero.getBoundingClientRect();
    const scroll = Math.min(1, Math.max(0, -rect.top / h));

    pointer.x += (pointer.tx - pointer.x) * 0.12;
    pointer.y += (pointer.ty - pointer.y) * 0.12;
    pointer.power += (pointer.target - pointer.power) * 0.06;

    const amp = intro * (1 + scroll * 1.4);
    const fade = 1 - scroll * 0.85;
    const lift = scroll * h * 0.18;
    const radius = Math.max(120, w * 0.11);
    const r2 = radius * radius;
    const camera = 1.7;
    const spanX = 1.75;
    const depth = 2.4;

    for (const group of batches) for (const list of group) list.length = 0;

    for (let j = 0; j < rows; j++) {
      const z = (j / (rows - 1)) * depth; // 0 = cerca, depth = lejos
      const persp = camera / (camera + z);
      const near = (persp - camera / (camera + depth)) / (1 - camera / (camera + depth)); // 0..1
      const baseY = h * 0.1 + persp * h * 0.36 - lift;

      for (let i = 0; i < cols; i++) {
        const x = (i / (cols - 1) - 0.5) * 2 * spanX;
        const y = height(x, z, t) * amp;

        let sx = w / 2 + x * persp * w * 0.36;
        let sy = baseY - y * persp * h * 0.3;
        if (sx < -10 || sx > w + 10) continue;

        // El cursor levanta la tela a su alrededor
        let touch = 0;
        if (pointer.power > 0.01) {
          const dx = sx - pointer.x;
          const dy = sy - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < r2 * 4) {
            touch = Math.exp(-d2 / r2) * pointer.power;
            sy -= touch * 38 * persp;
            sx += (dx / radius) * touch * 10;
          }
        }

        const crest = Math.min(1, Math.max(0, (y / Math.max(amp, 0.001) + 0.45) / 0.9));
        const edge = Math.min(1, (spanX - Math.abs(x)) / 0.55);
        let alpha = (0.1 + 0.9 * near) * (0.28 + 0.72 * crest) * edge * fade;
        alpha = Math.min(1, alpha + touch * 0.55);
        if (!(alpha >= 0.04)) continue; // también descarta NaN

        const size = (0.7 + 1.7 * near + touch * 1.4) * dpr;
        const level = Math.min(LEVELS - 1, Math.floor(alpha * LEVELS));
        batches[touch > 0.22 ? 1 : 0][level].push(sx * dpr - size / 2, sy * dpr - size / 2, size);
      }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    [BASE, ACCENT].forEach((rgb, c) => {
      batches[c].forEach((list, level) => {
        if (!list.length) return;
        ctx.fillStyle = `rgba(${rgb}, ${(level + 1) / LEVELS})`;
        for (let k = 0; k < list.length; k += 3) ctx.fillRect(list[k], list[k + 1], list[k + 2], list[k + 2]);
      });
    });
  }

  hero.addEventListener("pointermove", (e) => {
    const r = hero.getBoundingClientRect();
    pointer.tx = e.clientX - r.left;
    pointer.ty = e.clientY - r.top;
    if (pointer.target === 0) {
      pointer.x = pointer.tx;
      pointer.y = pointer.ty;
    }
    pointer.target = 1;
  });
  hero.addEventListener("pointerleave", () => (pointer.target = 0));

  // No dibujar cuando el hero no se ve o la pestaña está oculta
  new IntersectionObserver(([entry]) => (visible = entry.isIntersecting)).observe(canvas);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimationFrame(frame);
    else frame = requestAnimationFrame(draw);
  });
  new ResizeObserver(resize).observe(canvas);

  resize();
  frame = requestAnimationFrame(draw);
}

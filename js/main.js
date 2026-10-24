import { site, projects } from "./projects.js";
import { initWave } from "./wave.js";

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const icon = (name, cls = "") => `<svg class="icon ${cls}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
const host = (url) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");
const pad = (n) => String(n).padStart(2, "0");
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
const hasGsap = () => typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";

let lenis = null;

/* ───────────── Iconos (sprite Solar line-duotone) ───────────── */
async function loadSprite() {
  try {
    const res = await fetch("assets/icons.svg");
    const holder = document.createElement("div");
    holder.innerHTML = await res.text();
    document.body.prepend(holder.firstElementChild);
  } catch {
    // Sin sprite la página sigue funcionando, solo sin iconos
  }
}

/* ───────────── Datos del sitio ───────────── */
function fillSite() {
  $$('[data-site="name"]').forEach((el) => (el.textContent = site.name));
  $$('[data-site="email"]').forEach((el) => (el.textContent = site.email));
  $$('[data-site="email-link"]').forEach((el) => (el.href = `mailto:${site.email}`));
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
  document.title = `${site.name} — Portafolio`;

  $("[data-socials]").innerHTML = site.socials
    .map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)} ${icon("arrow-right-up")}</a></li>`)
    .join("");

  $("[data-copy-email]").addEventListener("click", async (e) => {
    const label = $("[data-copy-label]", e.currentTarget);
    try {
      await navigator.clipboard.writeText(site.email);
      label.textContent = "¡Copiado!";
    } catch {
      label.textContent = site.email;
    }
    setTimeout(() => (label.textContent = "Copiar correo"), 2200);
  });
}

/* ───────────── Marquee ───────────── */
function renderMarquee() {
  const items = [
    ["palette", "Diseño de interfaces"],
    ["stars", "Movimiento con intención"],
    ["code-square", "Front-end"],
    ["magic-stick-3", "IA aplicada"],
    ["monitor-smartphone", "Responsive"],
    ["bolt", "Rendimiento"],
    ["eye", "Accesibilidad"],
    ["rocket-2", "Deploy en Vercel"],
  ];
  const group = `<div class="marquee__group" aria-hidden="true">${items
    .map(([i, t]) => `<span class="marquee__item">${icon(i)}${t}</span>`)
    .join("")}</div>`;
  $("[data-marquee]").innerHTML = group + group;
}

/* ───────────── Showcase del hero ───────────── */
function renderShowcase() {
  const frame = $("[data-showcase-frame]");
  const screen = $("[data-showcase-screen]");
  const url = $("[data-showcase-url]");
  screen.innerHTML = projects
    .map((p, i) => `<img src="${esc(p.images.cover)}" alt="" ${i ? 'loading="lazy"' : 'fetchpriority="high"'} decoding="async">`)
    .join("");
  const imgs = $$("img", screen);
  let current = 0;
  const show = (i) => {
    imgs.forEach((img, j) => img.classList.toggle("is-active", j === i));
    url.textContent = host(projects[i].url);
  };
  show(0);
  if (imgs.length > 1) {
    setInterval(() => {
      if (document.hidden) return;
      current = (current + 1) % imgs.length;
      show(current);
    }, 3800);
  }
  // Clic en la ventana: abre el proyecto que se está viendo
  frame.addEventListener("click", () => (location.hash = `#/proyecto/${projects[current].slug}`));
  frame.setAttribute("data-cursor", "");
}

/* ───────────── Proyectos ───────────── */
function screenFor(p) {
  const { cover, scroll, hover } = p.images;
  if (scroll) return `<img class="is-scroll" src="${esc(scroll)}" alt="Captura de ${esc(p.title)}" loading="lazy" decoding="async">`;
  return `<img class="is-cover" src="${esc(cover)}" alt="Captura de ${esc(p.title)}" loading="lazy" decoding="async">${
    hover ? `<img class="is-hover" src="${esc(hover)}" alt="" loading="lazy" decoding="async">` : ""
  }`;
}

function browser(url, inner) {
  return `<div class="browser">
    <div class="browser__bar">
      <span class="browser__dots"><i></i><i></i><i></i></span>
      <span class="browser__url">${icon("global")}<span>${esc(host(url))}</span></span>
      <span class="browser__spacer"></span>
    </div>
    <div class="browser__screen">${inner}</div>
  </div>`;
}

function renderProjects() {
  const total = pad(projects.length);
  $("[data-project-count]").textContent = `(${total})`;
  $("[data-project-total]").textContent = total;
  $("[data-projects]").innerHTML = projects
    .map(
      (p, i) => `
    <article class="project" style="--accent:${p.accent};--i:${i}" data-project>
      <div class="project__card">
        <a class="project__media" href="#/proyecto/${p.slug}" data-cursor aria-label="Ver detalles de ${esc(p.title)}">
          ${browser(p.url, screenFor(p))}
        </a>
        <div class="project__info">
          <div class="project__top">
            <span class="project__index"><b>${pad(i + 1)}</b> / ${total}</span>
            <span class="project__badge">${icon(p.icon || "widget-5")}</span>
          </div>
          <p class="project__kicker">${esc(p.kicker)} · ${esc(p.year)}</p>
          <h3 class="project__title">${esc(p.title)}</h3>
          <p class="project__summary">${esc(p.summary)}</p>
          <div class="project__stats">
            ${p.stats.map((s) => `<div><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></div>`).join("")}
          </div>
          <div class="project__actions">
            <a class="btn btn--light btn--sm magnetic" href="#/proyecto/${p.slug}">Ver caso ${icon("arrow-right")}</a>
            <a class="btn btn--ghost btn--sm magnetic" href="${esc(p.url)}" target="_blank" rel="noopener">Visitar sitio ${icon("arrow-right-up")}</a>
          </div>
        </div>
        <div class="project__shade"></div>
      </div>
    </article>`
    )
    .join("");
}

/* ───────────── Vista de detalle ───────────── */
const detail = $("[data-detail]");
const detailScroll = $("[data-detail-scroll]");
let lastFocus = null;
let openedInPage = false;

function renderDetail(p) {
  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length];
  detail.style.setProperty("--accent", p.accent);
  detailScroll.innerHTML = `
    <div class="detail__bar">
      <span class="detail__crumb">Proyecto ${pad(i + 1)} / ${pad(projects.length)}</span>
      <button class="icon-btn" type="button" data-close aria-label="Cerrar">${icon("close-circle")}</button>
    </div>

    <section class="detail__hero container" style="--accent:${p.accent}">
      <p class="detail__kicker">${esc(p.kicker)} · ${esc(p.year)}</p>
      <h2 class="detail__title" id="detail-title">${esc(p.title)}</h2>
      <p class="detail__summary">${esc(p.summary)}</p>
      <div class="detail__cta">
        <a class="btn btn--light magnetic" href="${esc(p.url)}" target="_blank" rel="noopener">Visitar sitio ${icon("arrow-right-up")}</a>
      </div>
      <div class="detail__shot">${browser(p.url, `<img src="${esc(p.images.cover)}" alt="Portada de ${esc(p.title)}">`)}</div>
    </section>

    <section class="detail__body container" style="--accent:${p.accent}">
      <dl class="detail__meta">
        <div><dt>Año</dt><dd>${esc(p.year)}</dd></div>
        <div><dt>Tipo</dt><dd>${esc(p.kicker)}</dd></div>
        <div><dt>Rol</dt><dd>${esc(p.role)}</dd></div>
        <div><dt>Enlace</dt><dd><a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(host(p.url))} ${icon("arrow-right-up")}</a></dd></div>
        <div><dt>Herramientas</dt><dd class="detail__tags">${p.stack.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</dd></div>
      </dl>
      <div class="detail__text">
        ${p.description.map((d) => `<p>${esc(d)}</p>`).join("")}
        <h3 class="detail__h">Lo destacado</h3>
        <ul class="detail__list">
          ${p.highlights.map((h) => `<li>${icon("check-circle")}<span>${esc(h)}</span></li>`).join("")}
        </ul>
        <div class="detail__stats">
          ${p.stats.map((s) => `<div><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></div>`).join("")}
        </div>
      </div>
    </section>

    ${
      p.images.gallery?.length
        ? `<section class="detail__gallery container">${p.images.gallery
            .map((src) => browser(p.url, `<img src="${esc(src)}" alt="Vista de ${esc(p.title)}" loading="lazy" decoding="async">`))
            .join("")}</section>`
        : ""
    }

    ${
      projects.length > 1
        ? `<a class="detail__next" href="#/proyecto/${next.slug}">
            <p>Siguiente proyecto</p>
            <strong>${esc(next.title)} ${icon("arrow-right-up")}</strong>
          </a>`
        : ""
    }`;
  detailScroll.scrollTop = 0;
  initMagnetic(detailScroll);
}

function openDetail(slug) {
  const p = projects.find((x) => x.slug === slug);
  if (!p) return closeDetail();
  const wasOpen = detail.classList.contains("is-open");
  renderDetail(p);
  if (wasOpen) return;
  lastFocus = document.activeElement;
  detail.hidden = false;
  document.body.classList.add("is-locked");
  lenis?.stop();
  requestAnimationFrame(() => requestAnimationFrame(() => detail.classList.add("is-open")));
  setTimeout(() => $("[data-close]", detail)?.focus({ preventScroll: true }), 50);
  document.title = `${p.title} — ${site.name}`;
}

function closeDetail() {
  if (!detail.classList.contains("is-open")) return;
  detail.classList.remove("is-open");
  document.body.classList.remove("is-locked");
  lenis?.start();
  document.title = `${site.name} — Portafolio`;
  const done = () => {
    if (!detail.classList.contains("is-open")) detail.hidden = true;
  };
  setTimeout(done, 900);
  lastFocus?.focus?.({ preventScroll: true });
}

function route() {
  const m = location.hash.match(/^#\/proyecto\/([\w-]+)/);
  m ? openDetail(m[1]) : closeDetail();
}

function initRouter() {
  window.addEventListener("hashchange", () => {
    if (/^#\/proyecto\//.test(location.hash)) openedInPage = true;
    route();
  });
  detail.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) requestClose();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && detail.classList.contains("is-open")) requestClose();
  });
  route();
}

function requestClose() {
  if (openedInPage) {
    openedInPage = false;
    history.back();
  } else {
    history.replaceState(null, "", location.pathname + location.search);
    closeDetail();
  }
}

/* ───────────── Navegación ───────────── */
function initNav() {
  const nav = $("[data-nav]");
  let lastY = scrollY;
  const onScroll = () => {
    const y = scrollY;
    nav.classList.toggle("is-scrolled", y > 20);
    nav.classList.toggle("is-hidden", y > 400 && y > lastY + 2);
    if (y < lastY - 2) nav.classList.remove("is-hidden");
    lastY = y;
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Enlace activo según la sección visible
  const links = $$(".nav__links a");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${en.target.id}`));
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  $$("main section[id]").forEach((s) => io.observe(s));

  // Anclas internas con desplazamiento suave
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute("href");
    if (href.startsWith("#/")) return; // rutas de proyecto
    const target = href === "#top" ? document.body : $(href);
    if (!target) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target, { offset: href === "#top" ? 0 : -20, duration: 1.4 });
    else target.scrollIntoView({ behavior: "smooth" });
  });
}

/* ───────────── Interacciones de puntero ───────────── */
function initMagnetic(root = document) {
  if (!finePointer) return;
  $$(".magnetic", root).forEach((el) => {
    if (el.dataset.magnetic) return;
    el.dataset.magnetic = "1";
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.28;
      const y = (e.clientY - r.top - r.height / 2) * 0.38;
      el.style.transform = `translate(${x}px, ${y}px)`;
      el.style.transition = "transform .15s linear";
    });
    el.addEventListener("pointerleave", () => {
      el.style.transform = "";
      el.style.transition = "transform .7s cubic-bezier(.22,1,.36,1)";
    });
  });
}

function initCursor() {
  if (!finePointer) return;
  const cursor = $(".cursor");
  let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;
  addEventListener("pointermove", (e) => {
    x = e.clientX;
    y = e.clientY;
    cursor.classList.add("is-visible");
    cursor.classList.toggle("is-view", !!e.target.closest("[data-cursor]"));
  });
  document.addEventListener("pointerleave", () => cursor.classList.remove("is-visible"));
  const tick = () => {
    cx += (x - cx) * 0.2;
    cy += (y - cy) * 0.2;
    cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
    requestAnimationFrame(tick);
  };
  tick();
}

/* ───────────── Movimiento (GSAP + Lenis) ───────────── */
function initMotion() {
  // Sin GSAP (CDN caído) se muestra todo sin animar
  if (!hasGsap()) {
    document.documentElement.classList.add("is-static");
    return;
  }
  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  // Las animaciones de entrada lucen desde arriba: no restaurar el scroll al recargar
  if (!location.hash) {
    history.scrollRestoration = "manual";
    scrollTo(0, 0);
  }

  if (window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.09, wheelMultiplier: 1 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // Entrada del hero
  const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
  intro
    .to(".hero__title .line__in", { y: 0, duration: 1.4, stagger: 0.12 }, 0.6)
    .to(".hero__lead, .hero__cta", { opacity: 1, y: 0, duration: 1.2, stagger: 0.1 }, 1.1)
    .from("[data-showcase]", { opacity: 0, y: 90, duration: 1.6 }, 1.3);

  // La ventana se endereza al hacer scroll
  gsap.to("[data-showcase-frame]", {
    rotateX: 0,
    scale: 1,
    ease: "none",
    scrollTrigger: { trigger: "[data-showcase]", start: "top 85%", end: "top 15%", scrub: 0.6 },
  });

  // Parallax suave del texto del hero al salir
  gsap.to(".hero__inner", {
    yPercent: -14,
    opacity: 0,
    ease: "none",
    scrollTrigger: { trigger: "[data-hero]", start: "top top", end: () => `+=${innerHeight * 0.75}`, scrub: true },
  });

  // Revelado de bloques
  gsap.set("[data-reveal]", { opacity: 0, y: 30 });
  ScrollTrigger.batch("[data-reveal]", {
    start: "top 88%",
    once: true,
    onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1.1, stagger: 0.09, ease: "expo.out" }),
  });

  // Tarjetas apiladas: la anterior se encoge y oscurece cuando llega la siguiente
  const mm = gsap.matchMedia();
  mm.add("(min-width: 901px)", () => {
    const items = $$("[data-project]");
    items.forEach((item, i) => {
      gsap.from($(".project__card", item), {
        y: 120,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: item, start: "top 92%", once: true },
      });
      const next = items[i + 1];
      if (!next) return;
      const st = { trigger: next, start: "top bottom", end: "top 20%", scrub: true };
      gsap.to($(".project__card", item), { scale: 0.92, ease: "none", scrollTrigger: st });
      gsap.to($(".project__shade", item), { opacity: 0.55, ease: "none", scrollTrigger: { ...st } });
    });
  });
  mm.add("(max-width: 900px)", () => {
    $$("[data-project]").forEach((item) =>
      gsap.from(item, { y: 60, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: item, start: "top 90%", once: true } })
    );
  });

  // Palabra gigante del footer
  gsap.fromTo(".footer__word", { yPercent: 40 }, {
    yPercent: 8,
    ease: "none",
    scrollTrigger: { trigger: ".footer", start: "top bottom", end: "bottom bottom", scrub: true },
  });

  // Recalcula cuando cargan las imágenes
  addEventListener("load", () => ScrollTrigger.refresh());
}

/* ───────────── Inicio ───────────── */
await loadSprite();
fillSite();
renderMarquee();
renderShowcase();
renderProjects();
initWave($("[data-wave]"));
initNav();
initMagnetic();
initCursor();
initMotion();
initRouter();

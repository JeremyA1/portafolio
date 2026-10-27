// Descarga iconos Solar (estilo line-duotone) desde la API de Iconify y genera assets/icons.svg
// Uso: node scripts/build-icons.mjs
import { writeFile } from "node:fs/promises";

const names = [
  "arrow-right-up", "arrow-right", "arrow-left", "arrow-down", "close-circle",
  "gamepad", "chef-hat", "letter", "code-square", "monitor-smartphone",
  "magic-stick-3", "palette", "rocket-2", "widget-5", "cursor", "stars",
  "global", "copy", "check-circle", "map-point", "programming",
  "layers-minimalistic", "bolt", "eye", "calendar", "user-circle",
  "chat-round-dots", "link-round", "cpu-bolt", "smartphone", "plain",
  "star", "magnifer", "camera", "clock-circle", "chart-2", "test-tube",
  "scissors",
];

const symbols = [];
for (const n of names) {
  const res = await fetch(`https://api.iconify.design/solar/${n}-line-duotone.svg`);
  const svg = await res.text();
  if (!res.ok || !svg.startsWith("<svg")) { console.warn("falta:", n); continue; }
  const viewBox = svg.match(/viewBox="([^"]+)"/)[1];
  const inner = svg.replace(/^<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
  symbols.push(`<symbol id="i-${n}" viewBox="${viewBox}">${inner}</symbol>`);
}
await writeFile("assets/icons.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">\n${symbols.join("\n")}\n</svg>\n`);
console.log(`${symbols.length}/${names.length} iconos`);

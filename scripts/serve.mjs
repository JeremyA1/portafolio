// Servidor estático mínimo para ver el portafolio en local: node scripts/serve.mjs
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const root = join(import.meta.dirname, "..");
const port = Number(process.env.PORT) || 5173;
const types = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript",
  ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp",
  ".md": "text/markdown; charset=utf-8",
};

createServer(async (req, res) => {
  let path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^[/\\]+/, "");
  if (!path || path.endsWith("/") || path.endsWith("\\")) path += "index.html";
  try {
    const body = await readFile(join(root, path));
    res.writeHead(200, {
      "content-type": types[extname(path)] || "application/octet-stream",
      "cache-control": "no-store", // en local, ver siempre los cambios al recargar
    });
    res.end(body);
  } catch {
    res.writeHead(404).end("No encontrado");
  }
}).listen(port, () => console.log(`Portafolio en http://localhost:${port}`));

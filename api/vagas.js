import { listarPagina } from "../server/inatelVagas.js";

// Função de API: GET /api/vagas?categoria=todas|estagio|emprego&pagina=1
// Na Vercel, todo arquivo da pasta "api" vira um endereço /api/<nome>.
// Em desenvolvimento, o vite.config.js usa esta mesma função.
const CATEGORIAS = ["todas", "estagio", "emprego"];

export default async function handler(req, res) {
  res.setHeader("Vary", "Accept-Encoding");
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    return res.end(JSON.stringify({ erro: "Método não permitido." }));
  }

  const url = new URL(req.url, "http://localhost");
  const categoria = url.searchParams.get("categoria") ?? "todas";
  const pagina = Number.parseInt(url.searchParams.get("pagina") ?? "1", 10);

  function responder(status, corpo) {
    res.statusCode = status;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    if (status === 200) {
      // a Vercel guarda a resposta por 10 min: o Inatel é consultado bem menos
      res.setHeader("Cache-Control", "public, s-maxage=600, stale-while-revalidate=300");
    }
    res.end(JSON.stringify(corpo));
  }

  if (!CATEGORIAS.includes(categoria) || !(pagina >= 1 && pagina <= 500)) {
    return responder(400, { erro: "Parâmetros inválidos." });
  }

  try {
    responder(200, await listarPagina(categoria, pagina));
  } catch (e) {
    console.error("Falha ao ler o site do Inatel:", e.message);
    responder(502, { erro: "Não foi possível obter as vagas do site do Inatel." });
  }
}
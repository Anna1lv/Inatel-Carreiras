import http from "node:http";
import { listarPagina } from "./inatelVagas.js";

// Servidor intermediário: o navegador não pode ler o site do Inatel direto
// (bloqueio de CORS), então ele pede ao nosso servidor, que lê o site.
const PORTA = process.env.PORT ?? 3001;
const CATEGORIAS = ["todas", "estagio", "emprego"];

http
  .createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const json = (status, corpo) => {
      res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify(corpo));
    };

    if (url.pathname !== "/api/vagas") return json(404, { erro: "Rota não encontrada." });

    const categoria = url.searchParams.get("categoria") ?? "todas";
    const pagina = Number.parseInt(url.searchParams.get("pagina") ?? "1", 10);
    if (!CATEGORIAS.includes(categoria) || !(pagina >= 1 && pagina <= 500)) {
      return json(400, { erro: "Parâmetros inválidos." });
    }

    try {
      json(200, await listarPagina(categoria, pagina));
    } catch (e) {
      console.error("Falha ao ler o site do Inatel:", e.message);
      json(502, { erro: "Não foi possível obter as vagas do site do Inatel." });
    }
  })
  .listen(PORTA, () => console.log(`Servidor de vagas em http://localhost:${PORTA}/api/vagas`));
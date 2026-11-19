import * as cheerio from "cheerio";

// Lê a LISTA PÚBLICA de vagas do site do Inatel (sem login).
// O endereço base pode ser trocado por variável de ambiente (usado nos testes).
const BASE = process.env.INATEL_BASE ?? "https://inatel.br";
const ORIGENS = {
  todas: "/estudante/vagas/",
  estagio: "/estudante/vagas/estagio",
  emprego: "/exaluno/vagas/",
};
const TEMPO_CACHE_MS = 10 * 60 * 1000; // não consulta o site mais de 1x a cada 10 min por página
const cache = new Map();

const REGEX_VAGA = /\/(?:estudante|exaluno)\/vagas\/([^/?#]+)\/?$/;
const IGNORAR = new Set(["estagio", "emprego", "pesquisar", "contato", "auth"]);
const REGEX_DATA = /(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2})/;

function inferirTipo(titulo) {
  const t = titulo.toLowerCase();
  if (t.includes("trainee")) return "Trainee";
  if (/est[aá]gi|\bintern(ship)?\b/.test(t)) return "Estágio";
  return "Emprego";
}

// Transforma o HTML da página em uma lista de vagas.
export function extrairVagas(html) {
  const $ = cheerio.load(html);
  const vagas = [];
  const vistos = new Set();

  // Cada vaga tem um título dentro de <h2><a href="/estudante/vagas/<slug>">
  $("h2 a[href]").each((_, el) => {
    let caminho;
    try {
      caminho = new URL($(el).attr("href"), BASE).pathname;
    } catch {
      return;
    }
    const m = caminho.match(REGEX_VAGA);
    const titulo = $(el).text().replace(/\s+/g, " ").trim();
    if (!m || IGNORAR.has(m[1]) || vistos.has(m[1]) || !titulo) return;
    vistos.add(m[1]);

    // Sobe até o "cartão": o maior elemento que contém só este título
    let cartao = $(el).closest("h2");
    while (
      cartao.parent().length &&
      !["body", "html"].includes(cartao.parent()[0].name) &&
      cartao.parent().find("h2").length === 1
    ) {
      cartao = cartao.parent();
    }
    const texto = cartao.text().replace(/\s+/g, " ");
    const d = texto.match(REGEX_DATA);

    const corte = titulo.lastIndexOf(" - "); // "Cargo - Empresa"
    vagas.push({
      id: m[1],
      titulo,
      cargo: corte > 0 ? titulo.slice(0, corte) : titulo,
      empresa: corte > 0 ? titulo.slice(corte + 3) : null,
      tipo: inferirTipo(titulo),
      dataPublicacao: d ? `${d[3]}-${d[2]}-${d[1]}T${d[4]}:${d[5]}:00` : null,
      encaminhadoPorParceiro: /encaminhado por parceiro/i.test(texto),
      url: `${BASE}${caminho}`,
    });
  });

  // Última página, vista nos links de paginação (?page=N)
  let ultima = 0;
  $("a[href*='page=']").each((_, a) => {
    const n = Number(($(a).attr("href") ?? "").match(/page=(\d+)/)?.[1]);
    if (n > ultima) ultima = n;
  });

  return { vagas, ultimaPagina: ultima || null };
}

export async function listarPagina(categoria, pagina) {
  const chave = `${categoria}:${pagina}`;
  const guardado = cache.get(chave);
  if (guardado && Date.now() - guardado.hora < TEMPO_CACHE_MS) return guardado.dados;

  const resposta = await fetch(`${BASE}${ORIGENS[categoria]}?page=${pagina}`, {
    headers: {
      "User-Agent": "App-Inatel-Prototipo (projeto academico de IHM)",
      "Accept-Language": "pt-BR",
    },
    signal: AbortSignal.timeout(8000),
  });
  if (!resposta.ok) throw new Error(`O site respondeu ${resposta.status}`);

  const { vagas, ultimaPagina } = extrairVagas(await resposta.text());
  if (vagas.length === 0 && pagina === 1) {
    console.warn("Nenhuma vaga encontrada: o HTML do site pode ter mudado.");
  }

  const dados = {
    categoria,
    pagina,
    vagas,
    temMais: ultimaPagina ? pagina < ultimaPagina : vagas.length > 0,
    atualizadoEm: new Date().toISOString(),
  };
  cache.set(chave, { hora: Date.now(), dados });
  return dados;
}
import { vagasDemo } from "../data/vagasDemo";
import { classificarCursos } from "../utils/classificarVaga";

const CHAVE_FONTE = "fonteVagas"; // "site" (padrão) ou "exemplo"
const CHAVE_CATALOGO = "catalogoVagas"; // últimas vagas vistas (para abrir detalhes após F5)
const LIMITE_CATALOGO = 200;

export function obterFonte() {
  try {
    return localStorage.getItem(CHAVE_FONTE) === "exemplo" ? "exemplo" : "site";
  } catch {
    return "site";
  }
}

export function definirFonte(fonte) {
  try {
    localStorage.setItem(CHAVE_FONTE, fonte);
  } catch {
    // localStorage bloqueado: a escolha vale só até recarregar
  }
}

function lerCatalogo() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_CATALOGO)) ?? [];
  } catch {
    return [];
  }
}

function registrarNoCatalogo(vagas) {
  const ids = new Set(vagas.map((v) => v.id));
  const novo = [...vagas, ...lerCatalogo().filter((v) => !ids.has(v.id))].slice(0, LIMITE_CATALOGO);
  try {
    localStorage.setItem(CHAVE_CATALOGO, JSON.stringify(novo));
  } catch {
    // armazenamento cheio: ignora
  }
}

// Converte a vaga do nosso servidor para o formato usado pelas telas
function normalizar(v) {
  return {
    id: v.id,
    cargo: v.cargo,
    empresa: v.empresa,
    tipo: v.tipo,
    dataPublicacao: v.dataPublicacao,
    encaminhadoPorParceiro: v.encaminhadoPorParceiro,
    linkCandidatura: v.url, // publicação original no site do Inatel
    cursos: classificarCursos(v.titulo),
    fonte: "Site do Inatel",
  };
}

// categoria: "todas" | "estagio" | "emprego". Retorna { vagas, temMais }.
export async function listarVagas({ categoria = "todas", pagina = 1 } = {}) {
  if (obterFonte() === "exemplo") {
    const vagas = vagasDemo.filter(
      (v) => categoria === "todas" || (categoria === "estagio") === (v.tipo === "Estágio"),
    );
    return { vagas, temMais: false };
  }

  let resposta;
  try {
    resposta = await fetch(`/api/vagas?categoria=${categoria}&pagina=${pagina}`);
  } catch {
    throw new Error("Não foi possível conectar ao servidor de vagas.");
  }
  if (!resposta.ok) {
    const detalhe = await resposta.json().catch(() => null);
    throw new Error(`${detalhe?.erro ?? "Não foi possível obter as vagas do site do Inatel."} (HTTP ${resposta.status})`);
  }

  const dados = await resposta.json();
  const vagas = dados.vagas.map(normalizar);
  registrarNoCatalogo(vagas);
  return { vagas, temMais: dados.temMais };
}

export async function buscarVagaPorId(id) {
  const vaga = [...lerCatalogo(), ...vagasDemo].find((v) => String(v.id) === String(id));
  if (!vaga) throw new Error("Vaga não encontrada. Volte à lista e abra a vaga novamente.");
  return vaga;
}
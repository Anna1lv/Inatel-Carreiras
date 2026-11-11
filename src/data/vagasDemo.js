import { cursos } from "./cursos";

// DADOS DEMONSTRATIVOS: não são vagas reais do Inatel.
// O formato (campos) é o que a integração real deverá entregar depois.
const [COMPUTACAO, AUTOMACAO, ELETRICA, SOFTWARE, TELECOM] = cursos;

const base = {
  fonte: "Dados de exemplo",
  linkCandidatura: "https://example.com", // endereço reservado para exemplos
};

export const vagasDemo = [
  {
    ...base,
    id: 1,
    cargo: "Estágio em desenvolvimento de software",
    empresa: "Empresa Exemplo A",
    tipo: "Estágio",
    modalidade: "Híbrido",
    localidade: "Santa Rita do Sapucaí, MG",
    area: "Tecnologia da Informação",
    dataPublicacao: "2026-11-06",
    prazoEncerramento: "2026-11-30",
    cargaHoraria: 30,
    descricao:
      "Apoio ao time de desenvolvimento na criação e manutenção de aplicações web. Vaga fictícia para demonstração.",
    requisitos: [
      "Cursando Engenharia de Software ou Computação",
      "A partir do 5º período",
      "Conhecimento de lógica de programação",
      "Inglês para leitura técnica",
    ],
    cursos: [SOFTWARE, COMPUTACAO],
    periodoMinimo: 5,
    encaminhadoPorParceiro: true,
  },
  {
    ...base,
    id: 2,
    cargo: "Estágio em testes de software",
    empresa: "Empresa Exemplo B",
    tipo: "Estágio",
    modalidade: "Remoto",
    localidade: "Remoto",
    area: "Qualidade de Software",
    dataPublicacao: "2026-11-05",
    prazoEncerramento: "2026-11-25",
    cargaHoraria: 30,
    descricao:
      "Elaboração e execução de casos de teste em aplicações móveis e web. Vaga fictícia para demonstração.",
    requisitos: [
      "Cursando Engenharia de Software ou Computação",
      "A partir do 4º período",
      "Noções de testes de software",
    ],
    cursos: [SOFTWARE, COMPUTACAO],
    periodoMinimo: 4,
    encaminhadoPorParceiro: false,
  },
  // ...as vagas 3 a 9 seguem o mesmo molde (veja a tabela)
];
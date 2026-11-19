// O site do Inatel exige login para mostrar os detalhes de cada vaga.
// Neste protótipo, os campos abaixo são ILUSTRATIVOS.
export function simularDetalhes(vaga) {
  return {
    area: "Conforme a publicação original",
    descricao:
      "Os detalhes desta oportunidade ficam na publicação original, que exige login com o CPF e a senha acadêmica do Inatel.",
    requisitos: [
      vaga.tipo === "Estágio"
        ? "Estar regularmente matriculado em curso de graduação"
        : "Formação compatível com a área da vaga",
      "Disponibilidade para o horário da vaga",
      "Demais requisitos conforme a publicação original",
    ],
  };
}
// REPRESENTAÇÕES ILUSTRATIVAS das telas do menu (dados fictícios, sem funcionalidade).
// A chave é o final da rota (/secao/<chave>). "titulo" substitui o nome do menu.
const tabela = (colunas, linhas, primeira = "teal") => ({ tipo: "tabela", colunas, linhas, primeira });
const sub = (texto) => ({ tipo: "subtitulo", texto });
const meses = ["Jul", "Ago", "Set"].map((m) => [m, "-", "-", "-"]);
const freq = [
  sub("X01 A - Disciplina Exemplo A"),
  { tipo: "linhas", itens: [["Aulas ministradas", "48"], ["Limite previsto", "15"], ["Total de faltas", "0"]] },
  tabela(["Mês", "Pri", "Lab", "Jus"], meses),
];

export const telasMenu = {
  notas: { blocos: [
    sub("X01 A - Disciplina Exemplo A"), tabela(["Avaliação", "Nota"], [["NP1", "90"], ["Prova 1", "75"]]),
    sub("X02 B - Disciplina Exemplo B"), tabela(["Avaliação", "Nota"], [["Exercício 1", "95"], ["Exercício 2", "100"], ["NP1", "88"]]),
  ] },
  frequencia: { blocos: freq },
  "material-didatico": { blocos: [
    { tipo: "select", texto: "Selecione" }, { tipo: "botao", texto: "O.S. de Impressão" },
    tabela(["O.S.", "Sigla", "Título"], []),
  ] },
  "plano-de-ensino": { blocos: [
    { tipo: "titulo", texto: "Disciplinas Matriculadas" },
    { tipo: "lista", itens: ["X01 - Disciplina Exemplo A", "X02 - Disciplina Exemplo B", "X03 - Disciplina Exemplo C", "AT04 - Atividade Complementar IV"] },
  ] },
  historico: { blocos: [
    tabela(["Disciplina", "Nota", "Semestre"], [["Introdução à Engenharia", "85", "2025/1"], ["Álgebra e Geometria", "78", "2025/1"], ["Programação I", "92", "2025/2"], ["Cálculo I", "80", "2025/2"]]),
  ] },
  coeficientes: { blocos: [
    { tipo: "titulo", texto: "LEGENDA" },
    { tipo: "linhas", itens: [["CRS", "Coeficiente de Rendimento no Semestre"], ["CRE", "Coeficiente de Rendimento Escolar"]] },
    tabela(["Semestre", "CRS", "CRE", "Mediana"], [["2026/1", "85,00", "84,00", "83,00"], ["2025/2", "84,00", "83,50", "82,00"], ["2025/1", "83,00", "83,00", "82,50"]]),
  ] },
  avaliacoes: { titulo: "Notas AC", blocos: [sub("AT04 - Atividade Complementar Exemplo"), tabela(["Avaliação", "Nota"], [["-", "-"]])] },
  "frequencia-complementar": { titulo: "Frequência AC", blocos: freq.slice(0, 1).concat(freq.slice(2)) },
  eletivas: { titulo: "Eletivas AC", blocos: [
    sub("2026/2"), tabela(["Atividade", "Horas pendentes", "Horas confirmadas"], [["Participação em evento exemplo", "0", "10"], ["Curso com carga horária de 02 horas", "0", "2"]]),
  ] },
  obrigatorias: { titulo: "Obrigatórias AC", blocos: [
    sub("Resumo de Horas"),
    { tipo: "linhas", itens: [["Nº de horas confirmadas", "95 horas"], ["Nº de horas consumidas", "60 horas"], ["Nº de horas previstas", "0 horas"], ["Nº de créditos", "35 horas"]] },
    sub("Grade Curricular de Atividades Complementares"),
    tabela(["Sigla", "Disciplina"], [["CP01", "Comportamento Profissional I"], ["FT01", "Feira Tecnológica"], ["TR01", "Trilha I"]]),
    sub("Dimensões Formativas"),
    tabela(["Sigla", "Dimensão", "Horas", "Qtde"], [["DP", "Desenvolvimento Pessoal", "10", "7"], ["EI", "Empreendedorismo e Inovação", "10", "25"]]),
  ] },
  "calendario-academico": { titulo: "Calendário", blocos: [{ tipo: "calendario" }] },
  "eventos-inatel": { blocos: [
    { tipo: "abas", itens: ["Atuais", "Todos", "Meus"] },
    { tipo: "cartoes", itens: [
      { titulo: "Minicurso", linhas: ["Minicurso Exemplo: introdução à simulação", "26/11/2026 10:00", "Local: Prédio 02", "Inscrições até 22/11/2026"] },
      { titulo: "Palestra", linhas: ["Palestra Exemplo: carreira em tecnologia", "24/11/2026 15:30", "Local: Auditório", "Inscrições até 20/11/2026"] },
    ] },
  ] },
  provas: { blocos: [
    { tipo: "abas", itens: ["Data", "Turma"] },
    sub("10/11/2026"), tabela(["Avaliação", "Turma", "Horário", "Local"], [["Prova 1", "X01 C", "17:30", "I-13"], ["Prova 1", "X01 C", "18:20", "I-13"]]),
    sub("28/11/2026"), tabela(["Avaliação", "Turma", "Horário", "Local"], [["Prova 1", "X02 A", "17:30", "I-11"]]),
  ] },
  reposicoes: { blocos: [{ tipo: "abas", itens: ["Data", "Turma"] }, { tipo: "titulo", texto: "Nenhuma reposição agendada." }] },
  "horarios-de-aula": { blocos: [
    tabela(["Hora", "S", "T", "Q", "Q", "S", "S"], [["07:00", "X01 - L1", "", "", "X03 - L6", "", ""], ["08:50", "", "", "", "", "", ""], ["10:00", "", "", "X02 - L1", "", "", ""], ["15:30", "", "", "X03 - A", "X04 - A", "", ""], ["17:30", "X02 - A", "X05 - C", "X01 - A", "X05 - C", "", ""]], "azul"),
  ] },
  "cronograma-de-aula": { blocos: [{ tipo: "titulo", texto: "Disciplinas do Cronograma" }, { tipo: "lista", itens: ["X01 L1", "X04 A"] }] },
  "horarios-de-monitores": { blocos: [
    sub("X01 - Monitor Exemplo A"), tabela(["Dia", "Horário", "Local"], [["Segunda-feira", "17:30-19:30", "III-3"]]),
    sub("X02 - Monitor Exemplo B"), tabela(["Dia", "Horário", "Local"], [["Quinta-feira", "17:30-19:30", "III-3"]]),
  ] },
  tesouraria: { blocos: [
    { tipo: "titulo", texto: "Identificador Bancário: 00000000000-0" }, sub("Débitos à Vencer"),
    tabela(["Descrição", "Vencto", "Total"], [["Parcela exemplo 1", "10/11/2026", "1.000,00"], ["Parcela exemplo 2", "10/12/2026", "1.000,00"], ["Total", "", "2.000,00"]]),
  ] },
  "consulta-de-pedidos": { blocos: [{ tipo: "titulo", texto: "Nenhum pedido encontrado." }] },
  "avaliacao-docente": { blocos: [
    tabela(["Docente", "Turma", "Situação"], [["Docente Exemplo A", "X01 C", "Avaliação será liberada em 16/11/2026"], ["Docente Exemplo B", "X02 A", "Avaliação será liberada em 16/11/2026"], ["Docente Exemplo C", "X03 A", "Avaliação será liberada em 16/11/2026"]]),
  ] },
  "pesquisa-institucional": { blocos: [
    tabela(["Título", ""], [["Avaliação de Coordenadores de Curso", "Responder"], ["Avaliação Institucional (CPA)", "Responder"]]),
  ] },
  "central-de-copias": { titulo: "Central de Cópia", blocos: [
    { tipo: "linhas", itens: [["Cota semestral aluno", "0 páginas"], ["Cota consumida", "0 páginas"]] },
    { tipo: "botao", texto: "Liberar O.S. para Central de Cópias" },
  ] },
  requerimentos: { blocos: [{ tipo: "select", texto: "Selecione o processo" }, { tipo: "botao", texto: "Criar Requerimento" }] },
  configuracoes: { blocos: [{ tipo: "conta" }] },
};
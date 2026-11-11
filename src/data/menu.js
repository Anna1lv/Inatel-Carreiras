import {
  Briefcase,
  Calendar,
  CalendarCheck,
  CalendarClock,
  CalendarDays,
  ChartColumn,
  CircleCheck,
  CircleDollarSign,
  ClipboardList,
  Clock,
  FileText,
  GraduationCap,
  Library,
  Mail,
  Pencil,
  PencilLine,
  Power,
  Rows3,
  Settings,
  SquareCheckBig,
  Upload,
} from "lucide-react";

// Itens com "rota" navegam; itens com "acao" executam algo (ex.: sair).
export const secoesMenu = [
  {
    titulo: "Mensagens Acadêmicas",
    itens: [{ nome: "Avisos", icone: Mail, rota: "/avisos" }],
  },
  {
    titulo: "Aproveitamento Escolar",
    itens: [
      { nome: "Notas", icone: ChartColumn, rota: "/secao/notas" },
      { nome: "Frequência", icone: CalendarCheck, rota: "/secao/frequencia" },
      { nome: "Material Didático", icone: Library, rota: "/secao/material-didatico" },
      { nome: "Plano de Ensino", icone: FileText, rota: "/secao/plano-de-ensino" },
      { nome: "Histórico", icone: GraduationCap, rota: "/secao/historico" },
      { nome: "Coeficientes", icone: ClipboardList, rota: "/secao/coeficientes" },
    ],
  },
  {
    titulo: "Atividades Complementares",
    itens: [
      { nome: "Avaliações", icone: ChartColumn, rota: "/secao/avaliacoes" },
      { nome: "Frequência", icone: CalendarCheck, rota: "/secao/frequencia-complementar" },
      { nome: "Eletivas", icone: CalendarDays, rota: "/secao/eletivas" },
      { nome: "Obrigatórias", icone: CalendarCheck, rota: "/secao/obrigatorias" },
    ],
  },
  {
    titulo: "Calendários e Horários",
    itens: [
      { nome: "Calendário Acadêmico", icone: CalendarDays, rota: "/secao/calendario-academico" },
      { nome: "Eventos Inatel", icone: CalendarDays, rota: "/secao/eventos-inatel" },
      { nome: "Provas", icone: Rows3, rota: "/secao/provas" },
      { nome: "Reposições", icone: Pencil, rota: "/secao/reposicoes" },
      { nome: "Horários de Aula", icone: Clock, rota: "/secao/horarios-de-aula" },
      { nome: "Cronograma de Aula", icone: CalendarClock, rota: "/secao/cronograma-de-aula" },
      { nome: "Horários de Monitores", icone: Clock, rota: "/secao/horarios-de-monitores" },
    ],
  },
  {
    titulo: "Financeiro",
    itens: [{ nome: "Tesouraria", icone: CircleDollarSign, rota: "/secao/tesouraria" }],
  },
  {
    titulo: "Serviços",
    itens: [
      { nome: "Mercado de Trabalho", icone: Briefcase, rota: "/mercado-de-trabalho", novo: true },
    ],
  },
  {
    titulo: "Outras Opções",
    itens: [
      { nome: "Consulta de Pedidos", icone: SquareCheckBig, rota: "/secao/consulta-de-pedidos" },
      { nome: "Avaliação Docente", icone: CircleCheck, rota: "/secao/avaliacao-docente" },
      { nome: "Pesquisa Institucional", icone: Calendar, rota: "/secao/pesquisa-institucional" },
      { nome: "Central de Cópias", icone: Upload, rota: "/secao/central-de-copias" },
      { nome: "Requerimentos", icone: PencilLine, rota: "/secao/requerimentos" },
      { nome: "Configurações", icone: Settings, rota: "/secao/configuracoes" },
      { nome: "Sair", icone: Power, acao: "sair" },
    ],
  },
];

export function buscarItemPorRota(caminho) {
  return secoesMenu.flatMap((s) => s.itens).find((i) => i.rota === caminho);
}
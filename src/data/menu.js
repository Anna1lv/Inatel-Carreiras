import {
  Briefcase,
  CalendarCheck,
  CalendarDays,
  ChartColumn,
  ClipboardList,
  FileText,
  GraduationCap,
  Library,
  Mail,
} from "lucide-react";

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
    ],
  },
  {
    titulo: "Serviços",
    itens: [
      { nome: "Mercado de Trabalho", icone: Briefcase, rota: "/mercado-de-trabalho", novo: true },
    ],
  },
];

export function buscarItemPorRota(caminho) {
  return secoesMenu.flatMap((s) => s.itens).find((i) => i.rota === caminho);
}
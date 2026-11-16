import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import Switch from "./Switch";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const celula = "border border-neutral-300 px-2 py-2 text-center dark:border-neutral-900";
const destaque = { teal: "bg-inatel-teal text-white", azul: "bg-inatel-azul text-white" };

function Calendario() {
  const dias = [...Array(30).keys()].map((i) => i + 1); // novembro de 2026 começa num domingo
  return (
    <div className="px-4 py-3">
      <div className="mb-2 flex items-center justify-between text-sm">
        <ChevronLeft size={18} /> <span>Novembro 2026</span> <ChevronRight size={18} />
      </div>
      <div className="grid grid-cols-7 gap-y-3 text-center text-sm">
        {["D", "S", "T", "Q", "Q", "S", "S"].map((d, i) => (
          <span key={i} className="font-medium">{d}</span>
        ))}
        {dias.map((dia) => (
          <span
            key={dia}
            className={dia === 9 ? "mx-auto h-8 w-8 rounded-full bg-inatel-azul pt-1 text-white" : "py-1"}
          >
            {dia}
          </span>
        ))}
      </div>
    </div>
  );
}

function Conta() {
  const { usuario } = useAuth();
  const { tema, alternarTema } = useTheme();
  return (
    <div className="space-y-4 px-6 py-4 text-sm">
      <p>{usuario.nome}</p>
      <p>Curso: {usuario.curso}</p>
      <p>Matrícula: {usuario.matricula}</p>
      <div className="flex items-center justify-between pt-4">
        <span>Dark mode</span>
        <Switch rotulo="Tema escuro" ligado={tema === "dark"} aoAlternar={alternarTema} />
      </div>
    </div>
  );
}

function Bloco({ bloco }) {
  switch (bloco.tipo) {
    case "titulo":
      return <h2 className="px-4 py-3 text-center text-lg">{bloco.texto}</h2>;
    case "subtitulo":
      return <h3 className="mt-4 bg-neutral-100 px-3 py-2 text-center text-sm font-medium dark:bg-neutral-800">{bloco.texto}</h3>;
    case "linhas":
      return (
        <dl className="space-y-1 px-4 py-3 text-sm">
          {bloco.itens.map(([rotulo, valor]) => (
            <div key={rotulo} className="flex justify-between gap-4">
              <dt className="text-neutral-500 dark:text-neutral-400">{rotulo}</dt>
              <dd className="text-right font-medium">{valor}</dd>
            </div>
          ))}
        </dl>
      );
    case "tabela":
      return (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>{bloco.colunas.map((c, i) => <th key={i} className={`${celula} bg-neutral-200 font-medium dark:bg-neutral-700`}>{c}</th>)}</tr>
            </thead>
            <tbody>
              {bloco.linhas.map((linha, i) => (
                <tr key={i}>
                  {linha.map((valor, j) => (
                    <td key={j} className={`${celula} ${j === 0 ? destaque[bloco.primeira] : "bg-neutral-100 dark:bg-neutral-700"}`}>{valor}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "abas":
      return (
        <div className="flex justify-center gap-0.5 py-3">
          {bloco.itens.map((nome, i) => (
            <span key={nome} className={`px-5 py-1.5 text-sm ${i === 0 ? "bg-inatel-botao-escuro text-white" : "bg-neutral-300 dark:bg-neutral-600"}`}>{nome}</span>
          ))}
        </div>
      );
    case "lista":
      return (
        <ul>
          {bloco.itens.map((texto) => (
            <li key={texto} className="flex items-center justify-between border-b border-neutral-300 bg-neutral-100 px-3 py-3 text-sm dark:border-neutral-900 dark:bg-neutral-700">
              {texto} <ChevronRight size={18} />
            </li>
          ))}
        </ul>
      );
    case "cartoes":
      return (
        <ul className="space-y-3 px-4 py-2">
          {bloco.itens.map((c) => (
            <li key={c.titulo + c.linhas[0]} className="border-l-4 border-cyan-400 pl-3 text-sm">
              <p className="font-medium">{c.titulo}</p>
              {c.linhas.map((l) => <p key={l} className="text-neutral-600 dark:text-neutral-300">{l}</p>)}
            </li>
          ))}
        </ul>
      );
    case "botao":
      return <div className="px-4 py-3"><span className="mx-auto block max-w-xs rounded-md bg-inatel-azul px-4 py-3 text-center text-sm text-white dark:bg-inatel-botao-escuro">{bloco.texto}</span></div>;
    case "select":
      return <div className="mx-4 my-3 flex items-center justify-between border-b border-neutral-400 px-1 py-2 text-sm">{bloco.texto} <ChevronDown size={16} /></div>;
    case "calendario":
      return <Calendario />;
    case "conta":
      return <Conta />;
    default:
      return null;
  }
}

// Desenha uma lista de blocos. Nada aqui é interativo (exceto o tema em "conta").
export default function TelaEstatica({ blocos }) {
  return blocos.map((bloco, i) => <Bloco key={i} bloco={bloco} />);
}
import { Briefcase, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { formatarDataHora } from "../utils/formatarData";

export default function AvisoCard({ aviso }) {
  const vaga = aviso.tipo === "vaga";
  const conteudo = (
    <>
      <div
        aria-hidden="true"
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
          vaga
            ? "bg-inatel-azul/10 text-inatel-azul dark:bg-inatel-azul/20 dark:text-blue-300"
            : "bg-inatel-laranja text-lg text-white"
        }`}
      >
        {vaga ? <Briefcase size={20} /> : aviso.setor[0]}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="flex items-center gap-1 text-base">
            {vaga && (
              <span className="rounded-full bg-inatel-azul/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-inatel-azul dark:bg-inatel-azul/20 dark:text-blue-300">
                Vaga nova
              </span>
            )}
            {aviso.importante && (
              <span className="font-bold text-red-600 dark:text-red-400">
                !<span className="sr-only">Importante</span>
              </span>
            )}
            {aviso.setor}
          </p>
          {aviso.data && (
            <time
              dateTime={aviso.data}
              className="shrink-0 text-xs text-neutral-500 dark:text-neutral-400"
            >
              {formatarDataHora(aviso.data)}
            </time>
          )}
        </div>
        <p className="truncate text-sm">{aviso.assunto}</p>
        <p className="line-clamp-2 text-xs text-neutral-500 dark:text-neutral-400">{aviso.resumo}</p>
      </div>
    </>
  );

  // Avisos com "rota" levam a outra tela (ex.: o aviso do Mercado de Trabalho)
  return aviso.rota ? (
    <li
      className={`border-b xl:overflow-hidden xl:rounded-lg xl:border ${
        vaga
          ? "border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/20"
          : "border-neutral-200 dark:border-neutral-800 xl:border-neutral-200 dark:xl:border-neutral-800"
      }`}
    >
      <Link
        to={aviso.rota}
        className={`flex items-center gap-3 px-4 py-3 ${
          vaga
            ? "hover:bg-blue-100/70 dark:hover:bg-blue-950/50"
            : "hover:bg-black/5 dark:hover:bg-white/5"
        }`}
      >
        {conteudo}
        <ChevronRight size={18} className="shrink-0 text-neutral-400" />
      </Link>
    </li>
  ) : (
    <li className="flex gap-3 border-b border-neutral-200 px-4 py-3 dark:border-neutral-800 xl:overflow-hidden xl:rounded-lg xl:border xl:border-neutral-200 dark:xl:border-neutral-800">
      {conteudo}
    </li>
  );
}
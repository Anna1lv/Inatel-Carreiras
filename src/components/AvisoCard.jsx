import { formatarDataHora } from "../utils/formatarData";

export default function AvisoCard({ aviso }) {
  return (
    <li className="flex gap-3 border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
      <div
        aria-hidden="true"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-inatel-laranja text-lg text-white"
      >
        {aviso.setor[0]}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="flex items-center gap-1 text-base">
            {aviso.importante && (
              <span className="font-bold text-red-600 dark:text-red-400">
                !<span className="sr-only">Importante</span>
              </span>
            )}
            {aviso.setor}
          </p>
          <time
            dateTime={aviso.data}
            className="shrink-0 text-xs text-neutral-500 dark:text-neutral-400"
          >
            {formatarDataHora(aviso.data)}
          </time>
        </div>
        <p className="truncate text-sm">{aviso.assunto}</p>
        <p className="truncate text-xs text-neutral-500 dark:text-neutral-400">
          {aviso.resumo}
        </p>
      </div>
    </li>
  );
}
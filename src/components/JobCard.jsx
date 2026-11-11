import { Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import { useJobs } from "../context/JobsContext";
import { formatarData } from "../utils/formatarData";
import Selo from "./Selo";

export default function JobCard({ vaga, compativel }) {
  const { estaSalva, alternarSalva, jaCandidatou } = useJobs();
  const salva = estaSalva(vaga.id);

  return (
    <li className="relative border-b border-neutral-200 dark:border-neutral-800">
      {/* O cartão inteiro leva aos detalhes... */}
      <Link
        to={`/mercado-de-trabalho/vaga/${vaga.id}`}
        className="block py-4 pl-4 pr-14 hover:bg-black/5 dark:hover:bg-white/5"
      >
        <p className="text-base font-medium leading-snug">{vaga.cargo}</p>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          {vaga.empresa} · {vaga.localidade}
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <Selo>{vaga.tipo}</Selo>
          <Selo>{vaga.modalidade}</Selo>
          {compativel && <Selo cor="verde">Compatível com seu curso</Selo>}
          {vaga.encaminhadoPorParceiro && <Selo cor="laranja">Encaminhado por parceiro</Selo>}
          {jaCandidatou(vaga.id) && <Selo cor="verde">Já me candidatei</Selo>}
          <Selo cor="contorno">Exemplo</Selo>
        </div>
        <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
          Publicada em {formatarData(vaga.dataPublicacao)} · Encerra em{" "}
          {formatarData(vaga.prazoEncerramento)}
        </p>
      </Link>

      {/* ...e o botão salvar fica FORA do Link, para não abrir os detalhes */}
      <button
        type="button"
        onClick={() => alternarSalva(vaga.id)}
        aria-pressed={salva}
        aria-label={salva ? `Remover ${vaga.cargo} das vagas salvas` : `Salvar ${vaga.cargo}`}
        className="absolute right-2 top-3 rounded-full p-2 text-inatel-azul hover:bg-black/5 dark:text-blue-400 dark:hover:bg-white/10"
      >
        <Bookmark size={22} fill={salva ? "currentColor" : "none"} />
      </button>
    </li>
  );
}
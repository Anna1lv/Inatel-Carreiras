import { Link } from "react-router-dom";
import { formatarData } from "../utils/formatarData";

export default function NotificationCard({ vaga }) {
  return (
    <li>
      <Link
        to={`/mercado-de-trabalho/vaga/${vaga.id}`}
        className="block rounded-md border border-neutral-300 p-3 hover:bg-black/5 dark:border-neutral-700 dark:hover:bg-white/5"
      >
        <p className="font-medium">Nova vaga de {vaga.tipo.toLowerCase()}</p>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          {vaga.cargo} · {vaga.empresa}
        </p>
        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
          {formatarData(vaga.dataPublicacao)} · {vaga.horaPublicacao}
        </p>
      </Link>
    </li>
  );
}
import { Bookmark, Briefcase, FileText } from "lucide-react";
import { NavLink } from "react-router-dom";

const abas = [
  { rota: "/mercado-de-trabalho", nome: "Vagas", icone: Briefcase, exata: true },
  { rota: "/mercado-de-trabalho/minhas-vagas", nome: "Minhas vagas", icone: Bookmark },
  { rota: "/mercado-de-trabalho/curriculo", nome: "Currículo", icone: FileText },
];

// Barra inferior do Mercado de Trabalho (como no wireframe)
export default function BottomNav() {
  return (
    <nav
      aria-label="Mercado de Trabalho"
      className="fixed inset-x-0 bottom-0 z-30 flex border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black lg:left-72"
    >
      {abas.map(({ rota, nome, icone: Icone, exata }) => (
        <NavLink
          key={rota}
          to={rota}
          end={exata} // "Vagas" só fica ativa na própria rota, não nas filhas
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center gap-0.5 py-2 text-xs ${
              isActive
                ? "font-medium text-inatel-azul dark:text-blue-400"
                : "text-neutral-500 dark:text-neutral-400"
            }`
          }
        >
          <Icone size={22} />
          {nome}
        </NavLink>
      ))}
    </nav>
  );
}
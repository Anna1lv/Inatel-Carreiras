import { CircleUserRound, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { secoesMenu } from "../data/menu";

export default function Sidebar({ aberto, aoFechar }) {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  function sair() {
    logout();
    navigate("/login");
  }

  return (
    <>
      {/* Fundo escurecido: só no celular, com o menu aberto */}
      {aberto && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={aoFechar}
          aria-hidden="true"
        />
      )}

      <aside
        aria-label="Menu principal"
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col overflow-y-auto bg-inatel-menu text-neutral-900 transition-transform dark:bg-inatel-menu-escuro dark:text-white lg:translate-x-0 ${
          aberto ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Identificação do aluno */}
        <div className="bg-linear-to-br from-inatel-menu-de to-inatel-menu-ate px-4 pb-4 pt-8 text-white">
          <CircleUserRound size={52} strokeWidth={1.5} />
          <p className="mt-3 text-lg font-medium">{usuario.nome}</p>
          <p className="text-sm opacity-90">{usuario.curso}</p>
          <p className="text-sm opacity-90">Matrícula: {usuario.matricula}</p>
        </div>

        <nav className="flex-1">
          {secoesMenu.map((secao) => (
            <div
              key={secao.titulo}
              className="border-b border-neutral-200 py-2 dark:border-neutral-600"
            >
              <p className="px-4 pb-1 pt-2 text-sm text-neutral-500 dark:text-neutral-400">
                {secao.titulo}
              </p>
              {secao.itens.map((item) => {
                const Icone = item.icone; // letra maiúscula: vira componente no JSX
                return (
                  <NavLink
                    key={item.rota}
                    to={item.rota}
                    onClick={aoFechar}
                    className={({ isActive }) =>
                      `flex items-center gap-5 px-4 py-3 text-[15px] ${
                        isActive
                          ? "bg-black/5 font-medium text-inatel-azul dark:bg-white/10 dark:text-white"
                          : "hover:bg-black/5 dark:hover:bg-white/10"
                      }`
                    }
                  >
                    <Icone size={22} className="shrink-0 text-neutral-600 dark:text-neutral-300" />
                    <span>{item.nome}</span>
                    {item.novo && (
                      <span className="ml-auto rounded bg-inatel-azul px-1.5 py-0.5 text-[10px] font-bold text-white dark:bg-inatel-botao-escuro">
                        NOVO
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>

        <button
          type="button"
          onClick={sair}
          className="flex items-center gap-5 px-4 py-4 text-[15px] hover:bg-black/5 dark:hover:bg-white/10"
        >
          <LogOut size={22} className="text-neutral-600 dark:text-neutral-300" />
          Sair
        </button>
      </aside>
    </>
  );
}
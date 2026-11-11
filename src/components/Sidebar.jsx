import { CircleUserRound } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { secoesMenu } from "../data/menu";
import Logo from "./Logo";

const baseItem = "flex w-full items-center gap-5 px-4 py-3 text-left text-[15px]";
const hover = "hover:bg-black/5 dark:hover:bg-white/10";

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
        {/* Logo e identificação do aluno */}
        <div className="bg-linear-to-br from-inatel-menu-de to-inatel-menu-ate px-4 pb-4 pt-6 text-white">
          <Logo largura={100} className="text-white" />
          <div className="mt-5 flex items-center gap-3">
            <CircleUserRound size={48} strokeWidth={1.5} className="shrink-0" />
            <div className="min-w-0">
              <p className="truncate text-lg font-medium">{usuario.nome}</p>
              <p className="truncate text-sm opacity-90">{usuario.curso}</p>
              <p className="text-sm opacity-90">Matrícula: {usuario.matricula}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1">
          {secoesMenu.map((secao) => (
            <div
              key={secao.titulo}
              className="border-b border-neutral-200 py-2 last:border-b-0 dark:border-neutral-600"
            >
              <p className="px-4 pb-1 pt-2 text-sm text-neutral-500 dark:text-neutral-400">
                {secao.titulo}
              </p>
              {secao.itens.map((item) => {
                const Icone = item.icone; // letra maiúscula: vira componente no JSX
                const conteudo = (
                  <>
                    <Icone size={22} className="shrink-0 text-neutral-600 dark:text-neutral-300" />
                    <span>{item.nome}</span>
                    {item.novo && (
                      <span className="ml-auto rounded bg-inatel-azul px-1.5 py-0.5 text-[10px] font-bold text-white dark:bg-inatel-botao-escuro">
                        NOVO
                      </span>
                    )}
                  </>
                );

                // Item de ação (Sair): é um botão, não uma rota
                if (item.acao === "sair") {
                  return (
                    <button key={item.nome} type="button" onClick={sair} className={`${baseItem} ${hover}`}>
                      {conteudo}
                    </button>
                  );
                }

                return (
                  <NavLink
                    key={item.rota}
                    to={item.rota}
                    onClick={aoFechar}
                    className={({ isActive }) =>
                      `${baseItem} ${
                        isActive
                          ? "bg-black/5 font-medium text-inatel-azul dark:bg-white/10 dark:text-white"
                          : hover
                      }`
                    }
                  >
                    {conteudo}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
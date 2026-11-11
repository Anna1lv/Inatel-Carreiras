import { ArrowLeft, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import BotaoTema from "./BotaoTema";

// Barra superior azul. "onMenu" só existe nas telas que têm menu lateral.
// "voltarPara" mostra uma seta de voltar. "children" são ações extras à direita.
export default function Header({ titulo, onMenu, voltarPara, children }) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-2 bg-inatel-azul px-2 text-white dark:bg-inatel-azul-escuro">
      {onMenu && (
        <button
          type="button"
          onClick={onMenu}
          aria-label="Abrir menu"
          className="rounded-full p-2 hover:bg-white/10 lg:hidden"
        >
          <Menu size={24} />
        </button>
      )}
      {voltarPara && (
        <Link
          to={voltarPara}
          aria-label="Voltar"
          className="rounded-full p-2 hover:bg-white/10"
        >
          <ArrowLeft size={24} />
        </Link>
      )}
      <h1 className={`flex-1 truncate text-lg font-medium ${onMenu || voltarPara ? "" : "pl-3"} lg:pl-4`}>
        {titulo}
      </h1>
      <div className="flex items-center">
        {children}
        <BotaoTema />
      </div>
    </header>
  );
}
import { Menu } from "lucide-react";
import BotaoTema from "./BotaoTema";

export default function Header({ titulo, onMenu, children }) {
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
      <h1 className={`flex-1 truncate text-lg font-medium ${onMenu ? "" : "pl-3"} lg:pl-4`}>
        {titulo}
      </h1>
      <div className="flex items-center">
        {children}
        <BotaoTema />
      </div>
    </header>
  );
}
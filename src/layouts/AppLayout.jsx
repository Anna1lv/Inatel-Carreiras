import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function AppLayout() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-black dark:text-white">
      <Sidebar aberto={menuAberto} aoFechar={() => setMenuAberto(false)} />

      {/* No computador (lg), o menu fica fixo e o conteúdo ganha margem */}
      <div className="lg:pl-72">
        <Outlet context={{ abrirMenu: () => setMenuAberto(true) }} />
      </div>
    </div>
  );
}
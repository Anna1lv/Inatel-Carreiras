import { Outlet, useOutletContext } from "react-router-dom";
import BottomNav from "../components/BottomNav";

// Layout interno do Mercado de Trabalho: páginas + barra inferior.
export default function MercadoLayout() {
  const contexto = useOutletContext(); // recebido do AppLayout
  return (
    <>
      <div className="pb-20">
        {/* repassa o contexto (abrirMenu) para as páginas filhas */}
        <Outlet context={contexto} />
      </div>
      <BottomNav />
    </>
  );
}
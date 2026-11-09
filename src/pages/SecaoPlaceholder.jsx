import { Construction } from "lucide-react";
import { Link, useLocation, useOutletContext } from "react-router-dom";
import Header from "../components/Header";
import { buscarItemPorRota } from "../data/menu";

export default function SecaoPlaceholder() {
  const { abrirMenu } = useOutletContext();
  const { pathname } = useLocation();
  const item = buscarItemPorRota(pathname);

  return (
    <>
      <Header titulo={item?.nome ?? "Seção"} onMenu={abrirMenu} />
      <main className="mx-auto flex max-w-md flex-col items-center px-6 py-16 text-center">
        <Construction size={48} className="text-neutral-400" />
        <p className="mt-4 text-lg font-medium">{item?.nome ?? "Seção"}</p>
        <p className="mt-2 text-neutral-500 dark:text-neutral-400">
          {item?.novo
            ? "Esta área será construída na próxima fase do projeto."
            : "Esta seção existe no app original, mas não faz parte do protótipo."}
        </p>
        <Link to="/avisos" className="mt-6 font-medium text-inatel-azul dark:text-blue-400">
          Voltar para Avisos
        </Link>
      </main>
    </>
  );
}
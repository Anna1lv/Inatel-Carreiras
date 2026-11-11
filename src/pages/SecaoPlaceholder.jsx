import { Construction } from "lucide-react";
import { Link, useLocation, useOutletContext } from "react-router-dom";
import Header from "../components/Header";
import { buscarItemPorRota } from "../data/menu";

// Tela provisória: para itens do menu que não existem no protótipo
// ou para telas que serão feitas em uma fase futura.
export default function SecaoPlaceholder({
  titulo,
  mensagem,
  voltarPara = "/avisos",
  voltarTexto = "Voltar para Avisos",
}) {
  const { abrirMenu } = useOutletContext();
  const { pathname } = useLocation();
  const item = buscarItemPorRota(pathname);

  const nome = titulo ?? item?.nome ?? "Seção";
  const texto =
    mensagem ?? "Esta seção existe no app original, mas não faz parte do protótipo.";

  return (
    <>
      <Header titulo={nome} onMenu={abrirMenu} />
      <main className="mx-auto flex max-w-md flex-col items-center px-6 py-16 text-center">
        <Construction size={48} className="text-neutral-400" />
        <p className="mt-4 text-lg font-medium">{nome}</p>
        <p className="mt-2 text-neutral-500 dark:text-neutral-400">{texto}</p>
        <Link to={voltarPara} className="mt-6 font-medium text-inatel-azul dark:text-blue-400">
          {voltarTexto}
        </Link>
      </main>
    </>
  );
}
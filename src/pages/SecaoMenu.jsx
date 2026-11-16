import { Info } from "lucide-react";
import { useLocation, useOutletContext, useParams } from "react-router-dom";
import Header from "../components/Header";
import TelaEstatica from "../components/TelaEstatica";
import { buscarItemPorRota } from "../data/menu";
import { telasMenu } from "../data/telasMenu";
import SecaoPlaceholder from "./SecaoPlaceholder";

// Mostra a representação ilustrativa de uma tela do menu (/secao/:nome).
export default function SecaoMenu() {
  const { abrirMenu } = useOutletContext();
  const { nome } = useParams();
  const { pathname } = useLocation();
  const tela = telasMenu[nome];

  if (!tela) return <SecaoPlaceholder />;

  return (
    <>
      <Header titulo={tela.titulo ?? buscarItemPorRota(pathname)?.nome} onMenu={abrirMenu} />
      <main className="mx-auto max-w-3xl pb-10">
        <div className="m-4 flex gap-2 rounded-md bg-neutral-100 p-3 text-sm text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
          <Info size={18} className="mt-0.5 shrink-0" />
          <p>
            <strong>Representação ilustrativa.</strong> Esta tela existe no app original;
            aqui ela não tem funcionalidade e usa dados fictícios.
          </p>
        </div>
        <TelaEstatica blocos={tela.blocos} />
      </main>
    </>
  );
}
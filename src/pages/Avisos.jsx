import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import AvisoCard from "../components/AvisoCard";
import Header from "../components/Header";
import { avisosDemo } from "../data/avisosDemo";

export default function Avisos() {
  const { abrirMenu } = useOutletContext(); // vem do AppLayout
  const [buscando, setBuscando] = useState(false);
  const [termo, setTermo] = useState("");

  // Só recalcula a lista quando o termo de busca muda
  const avisosFiltrados = useMemo(() => {
    const busca = termo.trim().toLowerCase();
    if (!busca) return avisosDemo;
    return avisosDemo.filter((aviso) =>
      `${aviso.setor} ${aviso.assunto} ${aviso.resumo}`.toLowerCase().includes(busca),
    );
  }, [termo]);

  function alternarBusca() {
    if (buscando) setTermo("");
    setBuscando(!buscando);
  }

  return (
    <>
      <Header titulo="Avisos" onMenu={abrirMenu}>
        <button
          type="button"
          onClick={alternarBusca}
          aria-label={buscando ? "Fechar busca" : "Buscar avisos"}
          className="rounded-full p-2 hover:bg-white/10"
        >
          {buscando ? <X size={22} /> : <Search size={22} />}
        </button>
      </Header>

      {buscando && (
        <div className="border-b border-neutral-200 p-3 dark:border-neutral-800">
          <input
            type="search"
            autoFocus
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
            placeholder="Buscar nos avisos"
            aria-label="Buscar nos avisos"
            className="mx-auto block w-full max-w-3xl rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900 outline-none focus:border-inatel-azul dark:border-neutral-600 dark:bg-black dark:text-white"
          />
        </div>
      )}

      <main className="mx-auto max-w-3xl">
        {avisosFiltrados.length === 0 ? (
          <p className="p-8 text-center text-neutral-500 dark:text-neutral-400">
            Nenhum aviso encontrado.
          </p>
        ) : (
          <ul>
            {avisosFiltrados.map((aviso) => (
              <AvisoCard key={aviso.id} aviso={aviso} />
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
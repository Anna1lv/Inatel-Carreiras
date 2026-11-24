import { LoaderCircle, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import AvisoCard from "../components/AvisoCard";
import Button from "../components/Button";
import Header from "../components/Header";
import { avisosDemo } from "../data/avisosDemo";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useVagas } from "../hooks/useVagas";

export default function Avisos() {
  const { abrirMenu } = useOutletContext(); // vem do AppLayout
  const [buscando, setBuscando] = useState(false);
  const [termo, setTermo] = useState("");
  const [preferencias] = useLocalStorage("prefsAvisos", { app: true });
  const receberAvisosDeVagas = preferencias?.app !== false;
  const { vagas, carregando, erro, fonte, recarregar } = useVagas("todas", receberAvisosDeVagas);

  const avisosVagas = useMemo(
    () =>
      [...vagas]
        .sort((a, b) => new Date(b.dataPublicacao) - new Date(a.dataPublicacao))
        .slice(0, 5)
        .map((vaga) => ({
          id: `vaga-${vaga.id}`,
          tipo: "vaga",
          setor: fonte === "exemplo" ? "Vaga de exemplo" : "Mercado de Trabalho",
          importante: false,
          assunto: `Nova vaga de ${vaga.tipo.toLowerCase()}`,
          resumo: [vaga.cargo, vaga.empresa].filter(Boolean).join(" · "),
          data: vaga.dataPublicacao,
          rota: `/mercado-de-trabalho/vaga/${vaga.id}`,
        })),
    [vagas, fonte],
  );
  const todosAvisos = useMemo(
    () => [...avisosDemo, ...(receberAvisosDeVagas ? avisosVagas : [])],
    [avisosVagas, receberAvisosDeVagas],
  );
  const avisosFiltrados = useMemo(() => {
    const busca = termo.trim().toLowerCase();
    if (!busca) return todosAvisos;
    return todosAvisos.filter((aviso) =>
      `${aviso.setor} ${aviso.assunto} ${aviso.resumo}`.toLowerCase().includes(busca),
    );
  }, [termo, todosAvisos]);

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
            className="mx-auto block w-full max-w-7xl rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900 outline-none focus:border-inatel-azul dark:border-neutral-600 dark:bg-black dark:text-white"
          />
        </div>
      )}

      <main className="conteudo-desktop">
        {receberAvisosDeVagas && carregando && (
          <div role="status" className="flex items-center justify-center gap-2 p-4 text-sm text-neutral-500 dark:text-neutral-400">
            <LoaderCircle size={18} className="animate-spin" />
            Buscando vagas recentes...
          </div>
        )}
        {receberAvisosDeVagas && erro && (
          <div role="alert" className="flex flex-wrap items-center justify-center gap-3 p-4 text-sm">
            <span>Não foi possível carregar os avisos de vagas: {erro}</span>
            <Button variante="secundario" className="w-auto px-3 py-2 text-sm" onClick={recarregar}>
              Tentar novamente
            </Button>
          </div>
        )}
        {avisosFiltrados.length === 0 ? (
          <p className="p-8 text-center text-neutral-500 dark:text-neutral-400">
            Nenhum aviso encontrado.
          </p>
        ) : (
          <ul className="xl:grid xl:grid-cols-2 xl:gap-4 xl:px-4 xl:py-4">
            {avisosFiltrados.map((aviso) => (
              <AvisoCard key={aviso.id} aviso={aviso} />
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
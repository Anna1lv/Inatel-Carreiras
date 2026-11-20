import { Bell, Info, LoaderCircle } from "lucide-react";
import { useMemo } from "react";
import { Link, useOutletContext } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import JobCard from "../components/JobCard";
import JobFilters from "../components/JobFilters";
import { useAuth } from "../context/AuthContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useVagas } from "../hooks/useVagas";

const FILTROS_PADRAO = { curso: true, tipo: "Todos", ordem: "recentes" };
const CATEGORIA = { Estágio: "estagio", Emprego: "emprego" }; // o resto usa "todas"

export default function MercadoTrabalho() {
  const { abrirMenu } = useOutletContext();
  const { usuario } = useAuth();

  // Os filtros ficam salvos: ao voltar para a tela, continuam como estavam
  const [filtros, setFiltros] = useLocalStorage("filtrosVagas", FILTROS_PADRAO);

  const {
    vagas, carregando, erro, temMais, carregarMais, carregandoMais, erroMais,
    fonte, trocarFonte, recarregar,
  } = useVagas(CATEGORIA[filtros.tipo] ?? "todas");

  // Vagas do site não informam curso/período: só escondemos quando sabemos que não servem
  const vagasVisiveis = useMemo(() => {
    const lista = vagas.filter(
      (vaga) =>
        (!filtros.curso || vaga.cursos.length === 0 || vaga.cursos.includes(usuario.curso)) &&
        (filtros.tipo === "Todos" || vaga.tipo === filtros.tipo),
    );

    return lista.sort((a, b) => {
      if (filtros.ordem === "compativeis") {
        const diferenca =
          Number(b.cursos.includes(usuario.curso)) - Number(a.cursos.includes(usuario.curso));
        if (diferenca !== 0) return diferenca;
      }
      return b.dataPublicacao.localeCompare(a.dataPublicacao); // mais recentes primeiro
    });
  }, [vagas, filtros, usuario]);

  function limparFiltros() {
    setFiltros({ curso: false, tipo: "Todos", ordem: "recentes" });
  }

  const doSite = fonte === "site";

  return (
    <>
      <Header titulo="Mercado de Trabalho" onMenu={abrirMenu}>
        <Link
          to="/mercado-de-trabalho/notificacoes"
          aria-label="Avisos de vagas"
          className="rounded-full p-2 hover:bg-white/10"
        >
          <Bell size={22} />
        </Link>
      </Header>

      <main className="mx-auto max-w-3xl">
        <div className="m-4 flex gap-2 rounded-md bg-neutral-100 p-3 text-sm text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
          <Info size={18} className="mt-0.5 shrink-0" />
          <div>
            <p>
              {doSite ? (
                <>
                  <strong>Vagas do site do Inatel</strong> (lista pública). Os detalhes de
                  cada vaga são ilustrativos, pois o site exige login.
                </>
              ) : (
                <>
                  <strong>Vagas de exemplo.</strong> Elas não vêm do site do Inatel.
                </>
              )}
            </p>
            <button
              type="button"
              onClick={() => trocarFonte(doSite ? "exemplo" : "site")}
              className="mt-1 font-medium text-inatel-azul underline dark:text-blue-400"
            >
              {doSite ? "Usar vagas de exemplo" : "Usar vagas do site"}
            </button>
          </div>
        </div>

        <JobFilters
          filtros={filtros}
          aoMudar={setFiltros}
          total={carregando || erro ? null : vagasVisiveis.length}
        />

        {carregando ? (
          <div role="status" className="flex flex-col items-center gap-2 p-12 text-neutral-500 dark:text-neutral-400">
            <LoaderCircle className="animate-spin" />
            Carregando vagas...
          </div>
        ) : erro ? (
          <div role="alert" className="space-y-3 p-8 text-center">
            <p>{erro}</p>
            <Button variante="secundario" className="mx-auto max-w-xs" onClick={recarregar}>
              Tentar novamente
            </Button>
            {doSite && (
              <Button variante="secundario" className="mx-auto max-w-xs" onClick={() => trocarFonte("exemplo")}>
                Usar vagas de exemplo
              </Button>
            )}
          </div>
        ) : (
          <>
            {vagasVisiveis.length === 0 ? (
              <div className="space-y-3 p-8 text-center text-neutral-600 dark:text-neutral-300">
                <p>Nenhuma vaga com esses filtros{temMais ? " nesta página" : ""}.</p>
                <Button variante="secundario" className="mx-auto max-w-xs" onClick={limparFiltros}>
                  Limpar filtros
                </Button>
              </div>
            ) : (
              <ul className="mt-2 border-t border-neutral-200 dark:border-neutral-800">
                {vagasVisiveis.map((vaga) => (
                  <JobCard key={vaga.id} vaga={vaga} compativel={vaga.cursos.includes(usuario.curso)} />
                ))}
              </ul>
            )}

            {erroMais && <p role="alert" className="px-4 pt-4 text-center text-sm">{erroMais}</p>}
            {temMais && (
              <div className="p-4">
                <Button variante="secundario" className="mx-auto max-w-xs" disabled={carregandoMais} onClick={carregarMais}>
                  {carregandoMais ? "Carregando..." : "Carregar mais vagas"}
                </Button>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}
import { Bell, Info, SearchX } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import JobCard from "../components/JobCard";
import JobFilters from "../components/JobFilters";
import SkeletonVagas from "../components/SkeletonVagas";
import Switch from "../components/Switch";
import { useAuth } from "../context/AuthContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useVagas } from "../hooks/useVagas";

const FILTROS_PADRAO = { curso: true, tipo: "Todos", ordem: "recentes" };
const CATEGORIA = { Estágio: "estagio", Emprego: "emprego" }; // o resto usa "todas"

export default function MercadoTrabalho() {
  const { abrirMenu } = useOutletContext();
  const { usuario } = useAuth();
  const [preferencias, setPreferencias] = useLocalStorage("prefsAvisos", { app: true });
  const receberAvisosDeVagas = preferencias?.app !== false;
  const [preferenciasAbertas, setPreferenciasAbertas] = useState(false);
  const painelPreferencias = useRef(null);

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

  useEffect(() => {
    if (!preferenciasAbertas) return undefined;

    function fecharAoClicarFora(evento) {
      if (!painelPreferencias.current?.contains(evento.target)) {
        setPreferenciasAbertas(false);
      }
    }

    function fecharAoPressionarEsc(evento) {
      if (evento.key === "Escape") setPreferenciasAbertas(false);
    }

    document.addEventListener("pointerdown", fecharAoClicarFora);
    document.addEventListener("keydown", fecharAoPressionarEsc);
    return () => {
      document.removeEventListener("pointerdown", fecharAoClicarFora);
      document.removeEventListener("keydown", fecharAoPressionarEsc);
    };
  }, [preferenciasAbertas]);

  return (
    <>
      <Header titulo="Mercado de Trabalho" onMenu={abrirMenu}>
        <div ref={painelPreferencias}>
          <button
            type="button"
            aria-label="Preferências de avisos"
            aria-expanded={preferenciasAbertas}
            aria-controls="preferencias-avisos"
            onClick={() => setPreferenciasAbertas((abertas) => !abertas)}
            className="rounded-full p-2 hover:bg-white/10"
          >
            <Bell size={22} />
          </button>
          {preferenciasAbertas && (
            <section
              id="preferencias-avisos"
              aria-label="Preferências de avisos"
              className="fixed right-2 top-16 z-40 w-80 max-w-[calc(100vw-2rem)] rounded-xl border border-neutral-200 bg-white p-4 text-neutral-900 shadow-xl dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="font-semibold">Avisos de vagas</h2>
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
                    {receberAvisosDeVagas
                      ? "Mostrar até cinco vagas recentes na aba Avisos."
                      : "Vagas recentes ocultas na aba Avisos."}
                  </p>
                </div>
                <Switch
                  rotulo="Receber avisos de vagas no app"
                  ligado={receberAvisosDeVagas}
                  aoAlternar={() =>
                    setPreferencias((atuais) => ({
                      ...(atuais && typeof atuais === "object" ? atuais : {}),
                      app: !receberAvisosDeVagas,
                    }))
                  }
                />
              </div>
              <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
                Os avisos aparecem somente no app; não enviam push nem e-mail.
              </p>
              <Link
                to="/avisos"
                onClick={() => setPreferenciasAbertas(false)}
                className="mt-3 inline-flex font-medium text-inatel-azul hover:underline dark:text-blue-400"
              >
                Ver avisos
              </Link>
            </section>
          )}
        </div>
      </Header>

      <main className="conteudo-desktop">
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
          <div role="status">
            <span className="sr-only">Carregando vagas...</span>
            <SkeletonVagas />
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
                <SearchX size={40} className="mx-auto text-neutral-400" />
                <p>Nenhuma vaga com esses filtros{temMais ? " nesta página" : ""}.</p>
                <Button variante="secundario" className="mx-auto max-w-xs" onClick={limparFiltros}>
                  Limpar filtros
                </Button>
              </div>
            ) : (
              <ul className="mt-2 border-t border-neutral-200 dark:border-neutral-800 xl:grid xl:grid-cols-2 xl:gap-4 xl:border-0 xl:px-4">
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
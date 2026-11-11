import { Bell, Info, LoaderCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import JobCard from "../components/JobCard";
import JobFilters from "../components/JobFilters";
import { useAuth } from "../context/AuthContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { listarVagas } from "../services/jobsService";

const FILTROS_PADRAO = { curso: true, periodo: true, tipo: "Todos", ordem: "recentes" };

export default function MercadoTrabalho() {
  const { abrirMenu } = useOutletContext();
  const { usuario } = useAuth();

  // Os filtros ficam salvos: ao voltar para a tela, continuam como estavam
  const [filtros, setFiltros] = useLocalStorage("filtrosVagas", FILTROS_PADRAO);

  const [vagas, setVagas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [tentativa, setTentativa] = useState(0); // muda para "tentar de novo"

  useEffect(() => {
    let requisicaoAtual = true; // ignora respostas de requisições antigas

    async function carregar() {
      setCarregando(true);
      setErro("");
      try {
        const dados = await listarVagas();
        if (requisicaoAtual) setVagas(dados);
      } catch {
        if (requisicaoAtual) setErro("Não foi possível carregar as vagas.");
      } finally {
        if (requisicaoAtual) setCarregando(false);
      }
    }

    carregar();
    return () => {
      requisicaoAtual = false;
    };
  }, [tentativa]);

  const ehCompativel = (vaga) => vaga.cursos.includes(usuario.curso);

  // Refaz a lista só quando vagas, filtros ou o curso do aluno mudam
  const vagasVisiveis = useMemo(() => {
    const lista = vagas.filter(
      (vaga) =>
        (!filtros.curso || vaga.cursos.includes(usuario.curso)) &&
        (!filtros.periodo || vaga.periodoMinimo <= usuario.periodo) &&
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
    setFiltros({ curso: false, periodo: false, tipo: "Todos", ordem: "recentes" });
  }

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
          <p>
            <strong>Vagas de exemplo.</strong> Elas ainda não vêm do site do Inatel.
          </p>
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
            <Button variante="secundario" className="mx-auto max-w-xs" onClick={() => setTentativa((n) => n + 1)}>
              Tentar novamente
            </Button>
          </div>
        ) : vagasVisiveis.length === 0 ? (
          <div className="space-y-3 p-8 text-center text-neutral-600 dark:text-neutral-300">
            <p>Nenhuma vaga com esses filtros.</p>
            <Button variante="secundario" className="mx-auto max-w-xs" onClick={limparFiltros}>
              Limpar filtros
            </Button>
          </div>
        ) : (
          <ul className="mt-2 border-t border-neutral-200 dark:border-neutral-800">
            {vagasVisiveis.map((vaga) => (
              <JobCard key={vaga.id} vaga={vaga} compativel={ehCompativel(vaga)} />
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
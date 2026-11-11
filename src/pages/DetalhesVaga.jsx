import { Bookmark, ExternalLink, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Selo from "../components/Selo";
import { useAuth } from "../context/AuthContext";
import { useJobs } from "../context/JobsContext";
import { buscarVagaPorId } from "../services/jobsService";
import { formatarData } from "../utils/formatarData";

export default function DetalhesVaga() {
  const { id } = useParams(); // número da vaga vem da URL
  const { usuario } = useAuth();
  const { estaSalva, alternarSalva, jaCandidatou, marcarCandidatura } = useJobs();

  const [vaga, setVaga] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [modalSaida, setModalSaida] = useState(false);
  const [modalCandidatura, setModalCandidatura] = useState(false);
  const [aguardandoRetorno, setAguardandoRetorno] = useState(false);

  useEffect(() => {
    let requisicaoAtual = true;

    async function carregar() {
      setCarregando(true);
      setErro("");
      try {
        const dados = await buscarVagaPorId(id);
        if (requisicaoAtual) setVaga(dados);
      } catch (e) {
        if (requisicaoAtual) setErro(e.message);
      } finally {
        if (requisicaoAtual) setCarregando(false);
      }
    }

    carregar();
    return () => {
      requisicaoAtual = false;
    };
  }, [id]);

  // Depois que o aluno sai para o link externo, quando a aba voltar a ficar
  // visível perguntamos "Conseguiu se candidatar?"
  useEffect(() => {
    if (!aguardandoRetorno) return;

    function aoVoltar() {
      if (document.visibilityState === "visible") {
        setAguardandoRetorno(false);
        setModalCandidatura(true);
      }
    }

    document.addEventListener("visibilitychange", aoVoltar);
    return () => document.removeEventListener("visibilitychange", aoVoltar);
  }, [aguardandoRetorno]);

  function continuarParaLinkExterno() {
    window.open(vaga.linkCandidatura, "_blank", "noopener,noreferrer");
    setModalSaida(false);
    setAguardandoRetorno(true);
  }

  function confirmarCandidatura() {
    marcarCandidatura(vaga.id);
    setModalCandidatura(false);
  }

  if (carregando || erro) {
    return (
      <>
        <Header titulo="Detalhes" voltarPara="/mercado-de-trabalho" />
        <main className="mx-auto max-w-3xl p-12 text-center text-neutral-500 dark:text-neutral-400">
          {carregando ? (
            <div role="status" className="flex flex-col items-center gap-2">
              <LoaderCircle className="animate-spin" />
              Carregando vaga...
            </div>
          ) : (
            <p role="alert">{erro}</p>
          )}
        </main>
      </>
    );
  }

  const salva = estaSalva(vaga.id);
  const candidatou = jaCandidatou(vaga.id);
  const compativel = vaga.cursos.includes(usuario.curso);

  return (
    <>
      <Header titulo="Detalhes" voltarPara="/mercado-de-trabalho" />

      <main className="mx-auto max-w-3xl px-4 pb-28 pt-4">
        <div className="flex flex-wrap gap-1.5">
          <Selo>{vaga.tipo}</Selo>
          <Selo>{vaga.modalidade}</Selo>
          {compativel && <Selo cor="verde">Compatível com seu curso</Selo>}
          {vaga.encaminhadoPorParceiro && <Selo cor="laranja">Encaminhado por parceiro</Selo>}
          <Selo cor="contorno">Exemplo</Selo>
        </div>

        <h2 className="mt-3 text-xl font-medium leading-snug">{vaga.cargo}</h2>
        <p className="text-neutral-600 dark:text-neutral-300">
          {vaga.empresa} · {vaga.localidade}
        </p>

        <dl className="my-4 grid grid-cols-3 gap-2 border-y border-neutral-200 py-3 text-sm dark:border-neutral-800">
          <div>
            <dt className="text-xs text-neutral-500 dark:text-neutral-400">Publicada</dt>
            <dd className="font-medium">{formatarData(vaga.dataPublicacao)}</dd>
          </div>
          <div>
            <dt className="text-xs text-neutral-500 dark:text-neutral-400">Encerra</dt>
            <dd className="font-medium">{formatarData(vaga.prazoEncerramento)}</dd>
          </div>
          <div>
            <dt className="text-xs text-neutral-500 dark:text-neutral-400">Carga</dt>
            <dd className="font-medium">{vaga.cargaHoraria} h/semana</dd>
          </div>
        </dl>

        <h3 className="font-medium">Área de atuação</h3>
        <p className="mb-4 mt-1 text-neutral-600 dark:text-neutral-300">{vaga.area}</p>

        <h3 className="font-medium">Sobre a oportunidade</h3>
        <p className="mb-4 mt-1 text-neutral-600 dark:text-neutral-300">{vaga.descricao}</p>

        <h3 className="font-medium">Requisitos</h3>
        <ul className="mb-6 mt-1 list-disc space-y-1 pl-5 text-neutral-600 dark:text-neutral-300">
          {vaga.requisitos.map((requisito) => (
            <li key={requisito}>{requisito}</li>
          ))}
        </ul>

        {candidatou ? (
          <Selo cor="verde">Você marcou: já me candidatei</Selo>
        ) : (
          <button
            type="button"
            onClick={() => setModalCandidatura(true)}
            className="text-sm font-medium text-inatel-azul underline dark:text-blue-400"
          >
            Já me candidatei (marcar manualmente)
          </button>
        )}

        <p className="mt-6 text-xs text-neutral-500 dark:text-neutral-400">
          Fonte: {vaga.fonte}. Esta não é uma vaga real.
        </p>
      </main>

      {/* Barra de ações fixa na parte de baixo */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-black lg:left-72">
        <button
          type="button"
          onClick={() => alternarSalva(vaga.id)}
          aria-pressed={salva}
          className="flex items-center gap-2 rounded-md border border-neutral-300 px-4 py-3 text-base font-medium text-inatel-azul dark:border-neutral-600 dark:text-blue-400"
        >
          <Bookmark size={20} fill={salva ? "currentColor" : "none"} />
          {salva ? "Salva" : "Salvar"}
        </button>
        <Button onClick={() => setModalSaida(true)} className="flex flex-1 items-center justify-center gap-2">
          <ExternalLink size={18} />
          Abrir link da candidatura
        </Button>
      </div>

      <Modal
        aberto={modalSaida}
        titulo="Você vai sair do App Inatel"
        onFechar={() => setModalSaida(false)}
        acoes={
          <>
            <Button onClick={continuarParaLinkExterno}>Continuar</Button>
            <Button variante="secundario" onClick={() => setModalSaida(false)}>
              Cancelar
            </Button>
          </>
        }
      >
        <p>
          O link da candidatura será aberto no navegador. Confira as orientações da
          empresa antes de enviar seus dados.
        </p>
        <p className="text-xs">Neste protótipo, o link abre uma página de exemplo (example.com).</p>
      </Modal>

      <Modal
        aberto={modalCandidatura}
        titulo="Conseguiu se candidatar?"
        onFechar={() => setModalCandidatura(false)}
        acoes={
          <>
            <Button onClick={confirmarCandidatura}>Já me candidatei</Button>
            <Button variante="secundario" onClick={() => setModalCandidatura(false)}>
              Ainda não
            </Button>
          </>
        }
      >
        <p>
          Marque para acompanhar esta vaga em Minhas Vagas. O App Inatel não confirma o
          envio feito no site da empresa.
        </p>
      </Modal>
    </>
  );
}
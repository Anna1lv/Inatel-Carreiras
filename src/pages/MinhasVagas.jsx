import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import JobCard from "../components/JobCard";
import { useAuth } from "../context/AuthContext";
import { useJobs } from "../context/JobsContext";
import { useVagas } from "../hooks/useVagas";

const vazio = {
  salvas: {
    titulo: "Nenhuma vaga salva.",
    texto: "Toque no marcador de uma vaga para guardá-la aqui.",
  },
  candidaturas: {
    titulo: "Nenhuma candidatura marcada.",
    texto:
      "Depois de se candidatar no site da empresa, marque a vaga para acompanhar por aqui.",
  },
};

export default function MinhasVagas() {
  const { abrirMenu } = useOutletContext();
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const { salvas, candidaturas } = useJobs();
  const { vagas, carregando, erro } = useVagas();
  const [aba, setAba] = useState("salvas");

  const ids = aba === "salvas" ? salvas : candidaturas;
  const lista = vagas
    .filter((vaga) => ids.includes(vaga.id))
    .sort((a, b) => b.dataPublicacao.localeCompare(a.dataPublicacao));

  const abas = [
    ["salvas", `Salvas (${salvas.length})`],
    ["candidaturas", `Já me candidatei (${candidaturas.length})`],
  ];

  return (
    <>
      <Header titulo="Minhas Vagas" onMenu={abrirMenu} />

      <main className="mx-auto max-w-3xl">
        <div role="tablist" className="flex border-b border-neutral-200 dark:border-neutral-800">
          {abas.map(([chave, nome]) => (
            <button
              key={chave}
              type="button"
              role="tab"
              aria-selected={aba === chave}
              onClick={() => setAba(chave)}
              className={`flex-1 border-b-2 py-3 text-sm ${
                aba === chave
                  ? "border-inatel-azul font-medium text-inatel-azul dark:border-blue-400 dark:text-blue-400"
                  : "border-transparent text-neutral-500 dark:text-neutral-400"
              }`}
            >
              {nome}
            </button>
          ))}
        </div>

        {carregando ? (
          <div role="status" className="flex justify-center p-12">
            <LoaderCircle className="animate-spin text-neutral-500" />
          </div>
        ) : erro ? (
          <p role="alert" className="p-8 text-center">{erro}</p>
        ) : lista.length === 0 ? (
          <div className="space-y-3 p-8 text-center">
            <p className="font-medium">{vazio[aba].titulo}</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">{vazio[aba].texto}</p>
            <Button variante="secundario" className="mx-auto max-w-xs" onClick={() => navigate("/mercado-de-trabalho")}>
              Explorar vagas
            </Button>
          </div>
        ) : (
          <ul>
            {lista.map((vaga) => (
              <JobCard key={vaga.id} vaga={vaga} compativel={vaga.cursos.includes(usuario.curso)} />
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
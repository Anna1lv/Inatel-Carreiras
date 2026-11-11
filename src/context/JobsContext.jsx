import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const JobsContext = createContext(null);

export function JobsProvider({ children }) {
  // Guardamos só os IDs das vagas
  const [salvas, setSalvas] = useLocalStorage("vagasSalvas", []);
  const [candidaturas, setCandidaturas] = useLocalStorage("vagasCandidatadas", []);

  function alternarSalva(id) {
    setSalvas((atual) =>
      atual.includes(id) ? atual.filter((x) => x !== id) : [...atual, id],
    );
  }

  // Marcação pessoal do aluno: o app NÃO envia candidatura
  function marcarCandidatura(id) {
    setCandidaturas((atual) => (atual.includes(id) ? atual : [...atual, id]));
  }

  const estaSalva = (id) => salvas.includes(id);
  const jaCandidatou = (id) => candidaturas.includes(id);

  return (
    <JobsContext.Provider
      value={{ salvas, candidaturas, alternarSalva, marcarCandidatura, estaSalva, jaCandidatou }}
    >
      {children}
    </JobsContext.Provider>
  );
}

export function useJobs() {
  const contexto = useContext(JobsContext);
  if (!contexto) {
    throw new Error("useJobs precisa estar dentro de <JobsProvider>");
  }
  return contexto;
}
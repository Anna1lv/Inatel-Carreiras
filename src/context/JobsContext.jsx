import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const JobsContext = createContext(null);

// Guardamos a VAGA INTEIRA (não só o id): vagas do site mudam de página,
// e assim "Minhas Vagas" continua mostrando o que o aluno salvou.
const alternar = (lista, vaga) =>
  lista.some((v) => v.id === vaga.id) ? lista.filter((v) => v.id !== vaga.id) : [vaga, ...lista];

export function JobsProvider({ children }) {
  const [salvas, setSalvas] = useLocalStorage("vagasSalvasV2", []);
  const [candidaturas, setCandidaturas] = useLocalStorage("vagasCandidatadasV2", []);

  const alternarSalva = (vaga) => setSalvas((atual) => alternar(atual, vaga));

  // Marcação pessoal do aluno: o app NÃO envia candidatura
  const marcarCandidatura = (vaga) =>
    setCandidaturas((atual) => (atual.some((v) => v.id === vaga.id) ? atual : [vaga, ...atual]));
  const desmarcarCandidatura = (id) =>
    setCandidaturas((atual) => atual.filter((v) => v.id !== id));

  const estaSalva = (id) => salvas.some((v) => v.id === id);
  const jaCandidatou = (id) => candidaturas.some((v) => v.id === id);

  return (
    <JobsContext.Provider
      value={{
        salvas,
        candidaturas,
        alternarSalva,
        marcarCandidatura,
        desmarcarCandidatura,
        estaSalva,
        jaCandidatou,
      }}
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
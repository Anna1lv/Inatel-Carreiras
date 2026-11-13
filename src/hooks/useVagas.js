import { useEffect, useState } from "react";
import { listarVagas } from "../services/jobsService";

// Carrega todas as vagas, com estados de carregando e erro.
export function useVagas() {
  const [vagas, setVagas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let atual = true;
    listarVagas()
      .then((dados) => {
        if (atual) setVagas(dados);
      })
      .catch(() => {
        if (atual) setErro("Não foi possível carregar as vagas.");
      })
      .finally(() => {
        if (atual) setCarregando(false);
      });
    return () => {
      atual = false;
    };
  }, []);

  return { vagas, carregando, erro };
}
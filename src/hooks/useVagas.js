import { useEffect, useState } from "react";
import { definirFonte, listarVagas, obterFonte } from "../services/jobsService";

// Carrega vagas por páginas (primeira página + "carregar mais").
export function useVagas(categoria = "todas", habilitado = true) {
  const [fonte, setFonte] = useState(obterFonte);
  const [vagas, setVagas] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [temMais, setTemMais] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [carregandoMais, setCarregandoMais] = useState(false);
  const [erro, setErro] = useState("");
  const [erroMais, setErroMais] = useState("");
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    let atual = true; // ignora respostas de pedidos antigos
    if (!habilitado) {
      setVagas([]);
      setTemMais(false);
      setErro("");
      setErroMais("");
      setCarregando(false);
      return () => {
        atual = false;
      };
    }

    setCarregando(true);
    setErro("");
    setErroMais("");
    setVagas([]);
    listarVagas({ categoria, pagina: 1 })
      .then((r) => {
        if (!atual) return;
        setVagas(r.vagas);
        setTemMais(r.temMais);
        setPagina(1);
      })
      .catch((e) => {
        if (atual) setErro(e.message);
      })
      .finally(() => {
        if (atual) setCarregando(false);
      });
    return () => {
      atual = false;
    };
  }, [categoria, fonte, tentativa, habilitado]);

  async function carregarMais() {
    setCarregandoMais(true);
    setErroMais("");
    try {
      const r = await listarVagas({ categoria, pagina: pagina + 1 });
      setVagas((atual) => [...atual, ...r.vagas.filter((n) => !atual.some((v) => v.id === n.id))]);
      setTemMais(r.temMais);
      setPagina(pagina + 1);
    } catch (e) {
      setErroMais(e.message);
    } finally {
      setCarregandoMais(false);
    }
  }

  function trocarFonte(nova) {
    definirFonte(nova);
    setFonte(nova);
  }

  return {
    vagas, carregando, erro, temMais, carregarMais, carregandoMais, erroMais, fonte, trocarFonte,
    recarregar: () => setTentativa((n) => n + 1),
  };
}
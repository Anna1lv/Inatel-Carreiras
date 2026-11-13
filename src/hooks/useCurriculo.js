import { useEffect, useState } from "react";
import { buscarCurriculo, salvarCurriculo } from "../utils/curriculoDB";

const TAMANHO_MAXIMO = 5 * 1024 * 1024; // 5 MB

// Todo PDF começa com os caracteres "%PDF-"
async function ehPdf(arquivo) {
  return (await arquivo.slice(0, 5).text()) === "%PDF-";
}

export function useCurriculo() {
  const [curriculo, setCurriculo] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let atual = true;
    buscarCurriculo()
      .then((registro) => {
        if (atual) setCurriculo(registro ?? null);
      })
      .catch(() => {
        if (atual) setErro("Não foi possível acessar o armazenamento do navegador.");
      })
      .finally(() => {
        if (atual) setCarregando(false);
      });
    return () => {
      atual = false;
    };
  }, []);

  async function anexar(arquivo) {
    setErro("");
    if (!arquivo.name.toLowerCase().endsWith(".pdf") || !(await ehPdf(arquivo))) {
      setErro("Formato inválido. Envie um arquivo PDF.");
      return;
    }
    if (arquivo.size > TAMANHO_MAXIMO) {
      setErro("Arquivo muito grande. O limite é 5 MB.");
      return;
    }
    const registro = {
      nome: arquivo.name,
      tamanho: arquivo.size,
      data: new Date().toISOString(),
      arquivo,
    };
    try {
      await salvarCurriculo(registro);
      setCurriculo(registro); // só substitui depois de validar e salvar
    } catch {
      setErro("Não foi possível salvar o arquivo neste navegador.");
    }
  }

  function baixar() {
    const url = URL.createObjectURL(curriculo.arquivo);
    const link = document.createElement("a");
    link.href = url;
    link.download = curriculo.nome;
    document.body.appendChild(link); // alguns navegadores exigem o link na página
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return { curriculo, carregando, erro, anexar, baixar };
}
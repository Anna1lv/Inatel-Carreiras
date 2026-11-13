import { Download, FileText, LoaderCircle } from "lucide-react";
import { useRef } from "react";
import { useOutletContext } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import { useCurriculo } from "../hooks/useCurriculo";
import { formatarDataHora } from "../utils/formatarData";
import { formatarTamanho } from "../utils/formatarTamanho";

export default function Curriculo() {
  const { abrirMenu } = useOutletContext();
  const { curriculo, carregando, erro, anexar, baixar } = useCurriculo();
  const campoArquivo = useRef(null); // referência ao <input type="file"> escondido

  async function aoEscolher(evento) {
    const arquivo = evento.target.files[0];
    evento.target.value = ""; // permite escolher o mesmo arquivo de novo
    if (arquivo) await anexar(arquivo);
  }

  return (
    <>
      <Header titulo="Currículo" onMenu={abrirMenu} />

      <main className="mx-auto max-w-3xl px-4 py-5">
        <h2 className="text-2xl font-medium">Meu currículo</h2>
        <p className="mt-1 text-neutral-600 dark:text-neutral-300">
          Guarde uma versão para poder consultar e baixar quando quiser.
        </p>

        <div className="my-4 rounded-md bg-neutral-100 p-4 text-sm dark:bg-neutral-900">
          <p className="font-medium">Seu currículo é opcional.</p>
          <p className="mt-1 text-neutral-600 dark:text-neutral-300">
            Você pode ver vagas e se candidatar pelo link externo sem enviar seu
            currículo aqui.
          </p>
        </div>

        {carregando ? (
          <div role="status" className="flex justify-center p-6">
            <LoaderCircle className="animate-spin text-neutral-500" />
          </div>
        ) : (
          curriculo && (
            <div className="mb-4 rounded-md border border-neutral-300 p-4 dark:border-neutral-700">
              <div className="flex items-start gap-3">
                <FileText className="mt-0.5 shrink-0 text-neutral-500" />
                <div className="min-w-0">
                  <p className="truncate font-medium">{curriculo.nome}</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    PDF · {formatarTamanho(curriculo.tamanho)} · anexado em{" "}
                    {formatarDataHora(curriculo.data)}
                  </p>
                </div>
              </div>
              <Button variante="secundario" onClick={baixar} className="mt-3 flex items-center justify-center gap-2">
                <Download size={18} />
                Baixar
              </Button>
            </div>
          )
        )}

        {erro && (
          <div role="alert" className="mb-4 rounded-md border-l-4 border-red-500 bg-red-50 p-3 text-sm text-red-800 dark:bg-red-950/40 dark:text-red-300">
            {erro}
          </div>
        )}

        <input
          ref={campoArquivo}
          type="file"
          accept=".pdf,application/pdf"
          onChange={aoEscolher}
          className="hidden"
          aria-label="Escolher arquivo PDF"
        />
        <Button onClick={() => campoArquivo.current.click()}>Anexar novo</Button>

        <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
          Somente PDF, até 5 MB. Um novo envio substitui o arquivo atual apenas após
          ser validado. O arquivo fica guardado só neste navegador.
        </p>
      </main>
    </>
  );
}
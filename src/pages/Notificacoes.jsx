import { LoaderCircle } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import Header from "../components/Header";
import NotificationCard from "../components/NotificationCard";
import Switch from "../components/Switch";
import { useAuth } from "../context/AuthContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useVagas } from "../hooks/useVagas";

const PADRAO = { app: true, email: false, frequencia: "Imediata" };
const FREQUENCIAS = ["Imediata", "Diária", "Semanal"];

export default function Notificacoes() {
  const { abrirMenu } = useOutletContext();
  const { usuario } = useAuth();
  const [prefs, setPrefs] = useLocalStorage("prefsAvisos", PADRAO);
  const { vagas, carregando } = useVagas();

  // Avisos recentes: as vagas mais novas compatíveis com o curso do aluno
  const recentes = vagas
    .filter((vaga) => vaga.cursos.includes(usuario.curso))
    .sort((a, b) => b.dataPublicacao.localeCompare(a.dataPublicacao))
    .slice(0, 3);

  const alterar = (campo, valor) => setPrefs({ ...prefs, [campo]: valor });

  return (
    <>
      <Header titulo="Avisos de vagas" onMenu={abrirMenu} />

      <main className="mx-auto max-w-3xl space-y-6 px-4 py-5">
        <section>
          <h2 className="font-medium">Onde receber</h2>
          <div className="flex items-center justify-between py-3">
            <span>Avisos no app</span>
            <Switch rotulo="Avisos no app" ligado={prefs.app} aoAlternar={() => alterar("app", !prefs.app)} />
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <span>Avisos por e-mail</span>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Preferência salva. O envio de e-mails não está ativo neste protótipo.
              </p>
            </div>
            <Switch rotulo="Avisos por e-mail" ligado={prefs.email} aoAlternar={() => alterar("email", !prefs.email)} />
          </div>
        </section>

        <section>
          <h2 className="font-medium">Frequência</h2>
          <div role="radiogroup" aria-label="Frequência dos avisos" className="mt-2 grid grid-cols-3 gap-2">
            {FREQUENCIAS.map((opcao) => (
              <button
                key={opcao}
                type="button"
                role="radio"
                aria-checked={prefs.frequencia === opcao}
                onClick={() => alterar("frequencia", opcao)}
                className={`rounded-md border py-2 text-sm ${
                  prefs.frequencia === opcao
                    ? "border-inatel-azul bg-inatel-azul text-white dark:border-inatel-botao-escuro dark:bg-inatel-botao-escuro"
                    : "border-neutral-300 dark:border-neutral-600"
                }`}
              >
                {opcao}
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-medium">Recentes</h2>
          {!prefs.app ? (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Os avisos no app estão desligados.
            </p>
          ) : carregando ? (
            <div role="status" className="flex justify-center p-6">
              <LoaderCircle className="animate-spin text-neutral-500" />
            </div>
          ) : recentes.length === 0 ? (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Nenhuma vaga nova para o seu curso.
            </p>
          ) : (
            <ul className="space-y-2">
              {recentes.map((vaga) => (
                <NotificationCard key={vaga.id} vaga={vaga} />
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  );
}
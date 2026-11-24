import { useEffect, useRef } from "react";

// Janela que sobe de baixo (celular) ou fica no centro (computador).
// "acoes" recebe os botões; os filhos (children) são o texto.
export default function Modal({ aberto, titulo, onFechar, acoes, children }) {
  const caixa = useRef(null);
  const fechar = useRef(onFechar);
  useEffect(() => {
    fechar.current = onFechar; // sempre a versão mais recente da função
  });

  useEffect(() => {
    if (!aberto) return;
    const quemTinhaFoco = document.activeElement;
    const focaveis = () => [...caixa.current.querySelectorAll("button, a[href]")];
    caixa.current.focus(); // leitores de tela anunciam a janela

    function aoTeclar(evento) {
      if (evento.key === "Escape") fechar.current();
      if (evento.key !== "Tab") return;
      // "Prende" o Tab dentro da janela
      const lista = focaveis();
      const primeiro = lista[0];
      const ultimo = lista[lista.length - 1];
      const noInicio = evento.shiftKey && [primeiro, caixa.current].includes(document.activeElement);
      if (noInicio) {
        evento.preventDefault();
        ultimo.focus();
      } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault();
        primeiro.focus();
      }
    }

    document.addEventListener("keydown", aoTeclar);
    document.body.style.overflow = "hidden"; // trava a rolagem da página
    return () => {
      document.removeEventListener("keydown", aoTeclar);
      document.body.style.overflow = "";
      quemTinhaFoco?.focus?.(); // devolve o foco ao botão que abriu a janela
    };
  }, [aberto]);

  if (!aberto) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 sm:items-center"
      onClick={onFechar}
    >
      <div
        ref={caixa}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-modal"
        onClick={(e) => e.stopPropagation()} // clique dentro não fecha
        className="w-full max-w-md rounded-t-2xl bg-white p-6 text-neutral-900 outline-none dark:bg-neutral-900 dark:text-white sm:rounded-2xl"
      >
        <h2 id="titulo-modal" className="text-lg font-medium">{titulo}</h2>
        <div className="mt-3 space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
          {children}
        </div>
        <div className="mt-5 space-y-2">{acoes}</div>
      </div>
    </div>
  );
}
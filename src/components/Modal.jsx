import { useEffect } from "react";

// Janela que sobe de baixo (celular) ou fica no centro (computador).
// "acoes" recebe os botões; os filhos (children) são o texto.
export default function Modal({ aberto, titulo, onFechar, acoes, children }) {
  // Fecha com a tecla Esc enquanto estiver aberta
  useEffect(() => {
    if (!aberto) return;
    function aoTeclar(evento) {
      if (evento.key === "Escape") onFechar();
    }
    document.addEventListener("keydown", aoTeclar);
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [aberto, onFechar]);

  if (!aberto) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 sm:items-center"
      onClick={onFechar}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-modal"
        onClick={(e) => e.stopPropagation()} // clique dentro não fecha
        className="w-full max-w-md rounded-t-2xl bg-white p-6 text-neutral-900 dark:bg-neutral-900 dark:text-white sm:rounded-2xl"
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
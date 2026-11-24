import { createContext, useCallback, useContext, useRef, useState } from "react";

const ToastContext = createContext(null);

// Mensagem rápida na parte de baixo da tela ("Vaga salva", etc.)
export function ToastProvider({ children }) {
  const [mensagem, setMensagem] = useState("");
  const temporizador = useRef(null);

  const mostrar = useCallback((texto) => {
    clearTimeout(temporizador.current);
    setMensagem(texto);
    temporizador.current = setTimeout(() => setMensagem(""), 2500);
  }, []);

  return (
    <ToastContext.Provider value={{ mostrar }}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-20 z-[70] flex justify-center px-4 lg:left-72"
      >
        {mensagem && (
          <p className="animate-[aparecer_0.2s_ease-out] rounded-md bg-neutral-800 px-4 py-2.5 text-sm text-white shadow-lg dark:bg-neutral-200 dark:text-neutral-900">
            {mensagem}
          </p>
        )}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const contexto = useContext(ToastContext);
  if (!contexto) {
    throw new Error("useToast precisa estar dentro de <ToastProvider>");
  }
  return contexto;
}
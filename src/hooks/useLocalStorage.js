import { useEffect, useState } from "react";

export function useLocalStorage(chave, valorInicial) {
  const [valor, setValor] = useState(() => {
    try {
      const salvo = localStorage.getItem(chave);
      if (salvo !== null) return JSON.parse(salvo);
    } catch {
      // JSON inválido ou localStorage bloqueado: usa o valor inicial
    }
    return typeof valorInicial === "function" ? valorInicial() : valorInicial;
  });

  useEffect(() => {
    try {
      localStorage.setItem(chave, JSON.stringify(valor));
    } catch {
      // localStorage cheio ou bloqueado: o app continua funcionando
    }
  }, [chave, valor]);

  return [valor, setValor];
}
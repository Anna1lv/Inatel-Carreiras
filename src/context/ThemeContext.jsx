import { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const ThemeContext = createContext(null);

function temaDoSistema() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({ children }) {
  const [tema, setTema] = useLocalStorage("tema", temaDoSistema);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", tema === "dark");
  }, [tema]);

  function alternarTema() {
    setTema((atual) => (atual === "dark" ? "light" : "dark"));
  }

  return (
    <ThemeContext.Provider value={{ tema, alternarTema }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const contexto = useContext(ThemeContext);
  if (!contexto) {
    throw new Error("useTheme precisa estar dentro de <ThemeProvider>");
  }
  return contexto;
}
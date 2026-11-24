import { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [tema, setTema] = useLocalStorage("tema", "light");

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
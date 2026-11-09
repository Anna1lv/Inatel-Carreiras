import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function BotaoTema() {
  const { tema, alternarTema } = useTheme();
  const escuro = tema === "dark";

  return (
    <button
      type="button"
      onClick={alternarTema}
      aria-label={escuro ? "Ativar tema claro" : "Ativar tema escuro"}
      className="rounded-full p-2 hover:bg-white/10"
    >
      {escuro ? <Sun size={22} /> : <Moon size={22} />}
    </button>
  );
}
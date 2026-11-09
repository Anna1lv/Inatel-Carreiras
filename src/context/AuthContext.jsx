import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useLocalStorage("sessao", null);

  // Login SIMULADO: não consulta o sistema do Inatel.
  // A senha NÃO é guardada em lugar nenhum.
  function login({ curso, matricula }) {
    setUsuario({ nome: "Joana Silva", curso, matricula, periodo: 6 });
  }

  function logout() {
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error("useAuth precisa estar dentro de <AuthProvider>");
  }
  return contexto;
}
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { useAuth } from "./context/AuthContext";

function Provisoria() {
  const { usuario, logout } = useAuth();
  if (!usuario) return <Navigate to="/login" replace />;
  return (
    <div className="min-h-screen bg-white p-6 text-neutral-900 dark:bg-black dark:text-white">
      <p>Logado como {usuario.nome} ({usuario.curso})</p>
      <button type="button" onClick={logout} className="mt-4 underline">Sair</button>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/avisos" element={<Provisoria />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
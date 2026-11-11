import { Navigate, Route, Routes } from "react-router-dom";
import RotaProtegida from "./components/RotaProtegida";
import AppLayout from "./layouts/AppLayout";
import MercadoLayout from "./layouts/MercadoLayout";
import Avisos from "./pages/Avisos";
import Login from "./pages/Login";
import MercadoTrabalho from "./pages/MercadoTrabalho";
import SecaoPlaceholder from "./pages/SecaoPlaceholder";

const volta = { voltarPara: "/mercado-de-trabalho", voltarTexto: "Voltar para as vagas" };

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<RotaProtegida />}>
        <Route element={<AppLayout />}>
          <Route path="/avisos" element={<Avisos />} />

          <Route path="/mercado-de-trabalho" element={<MercadoLayout />}>
            <Route index element={<MercadoTrabalho />} />
            <Route path="minhas-vagas" element={<SecaoPlaceholder titulo="Minhas Vagas" mensagem="Esta área será construída na Fase 5." {...volta} />} />
            <Route path="curriculo" element={<SecaoPlaceholder titulo="Currículo" mensagem="Esta área será construída na Fase 5." {...volta} />} />
            <Route path="notificacoes" element={<SecaoPlaceholder titulo="Avisos de vagas" mensagem="Esta área será construída na Fase 5." {...volta} />} />
          </Route>

          <Route path="/secao/:nome" element={<SecaoPlaceholder />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/avisos" replace />} />
    </Routes>
  );
}
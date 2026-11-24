import { Navigate, Route, Routes } from "react-router-dom";
import RotaProtegida from "./components/RotaProtegida";
import AppLayout from "./layouts/AppLayout";
import MercadoLayout from "./layouts/MercadoLayout";
import Avisos from "./pages/Avisos";
import Curriculo from "./pages/Curriculo";
import DetalhesVaga from "./pages/DetalhesVaga";
import Login from "./pages/Login";
import MercadoTrabalho from "./pages/MercadoTrabalho";
import MinhasVagas from "./pages/MinhasVagas";
import SecaoMenu from "./pages/SecaoMenu";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<RotaProtegida />}>
        <Route element={<AppLayout />}>
          <Route path="/avisos" element={<Avisos />} />

          {/* Telas do Mercado de Trabalho que têm a barra inferior */}
          <Route path="/mercado-de-trabalho" element={<MercadoLayout />}>
            <Route index element={<MercadoTrabalho />} />
            <Route path="minhas-vagas" element={<MinhasVagas />} />
            <Route path="curriculo" element={<Curriculo />} />
            <Route path="notificacoes" element={<Navigate to="/avisos" replace />} />
          </Route>

          {/* Detalhes ficam fora do layout: não têm barra inferior */}
          <Route path="/mercado-de-trabalho/vaga/:id" element={<DetalhesVaga />} />

          <Route path="/secao/:nome" element={<SecaoMenu />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/avisos" replace />} />
    </Routes>
  );
}
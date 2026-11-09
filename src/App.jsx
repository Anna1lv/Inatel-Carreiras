import { Navigate, Route, Routes } from "react-router-dom";
import RotaProtegida from "./components/RotaProtegida";
import AppLayout from "./layouts/AppLayout";
import Login from "./pages/Login";
import Avisos from "./pages/Avisos";
import SecaoPlaceholder from "./pages/SecaoPlaceholder";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Tudo dentro daqui exige login */}
      <Route element={<RotaProtegida />}>
        {/* ...e usa o menu lateral compartilhado */}
        <Route element={<AppLayout />}>
          <Route path="/avisos" element={<Avisos />} />
          <Route path="/mercado-de-trabalho" element={<SecaoPlaceholder />} />
          <Route path="/secao/:nome" element={<SecaoPlaceholder />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/avisos" replace />} />
    </Routes>
  );
}
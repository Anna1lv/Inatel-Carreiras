import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import handlerVagas from "./api/vagas.js";

// Em desenvolvimento (npm run dev) e no "preview", o próprio Vite responde
// /api/vagas usando a mesma função que a Vercel usará em produção.
function apiVagasLocal() {
  // Atenção: não retornar nada aqui (o Vite trataria o retorno como outro hook)
  const montar = (servidor) => {
    servidor.middlewares.use("/api/vagas", handlerVagas);
  };
  return {
    name: "api-vagas-local",
    configureServer: montar,
    configurePreviewServer: montar,
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), apiVagasLocal()],
});
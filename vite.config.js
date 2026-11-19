import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
    server: {
    // Em desenvolvimento, chamadas para /api vão para o servidor de vagas
    proxy: { "/api": "http://localhost:3001" },
  },
});
# Inatel Carreiras

Aplicacao React/Vite responsiva para avisos academicos e acompanhamento de vagas do Inatel.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Producao

```bash
npm run lint
npm run build
npm run preview
```

A pasta `api/` expoe `GET /api/vagas` na Vercel. A configuracao local em `vite.config.js`
executa a mesma funcao durante `npm run dev` e `npm run preview`.

Os dados de vagas do site podem exigir acesso externo. Quando o servico estiver
indisponivel, a interface permite trocar para vagas ficticias. Sessao, preferencias,
vagas salvas e o curriculo sao armazenados apenas no navegador.

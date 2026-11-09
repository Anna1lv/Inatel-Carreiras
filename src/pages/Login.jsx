import { useState } from "react";
import { Navigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { cursos } from "../data/cursos";

const campo =
  "w-full rounded-md border bg-white px-3 py-3 text-center text-base text-neutral-900 outline-none focus:border-inatel-azul focus:ring-2 focus:ring-inatel-azul/30 dark:bg-black dark:text-white";

function validar({ curso, matricula, senha }) {
  const erros = {};
  if (!curso) erros.curso = "Selecione seu curso.";
  if (!matricula.trim()) erros.matricula = "Informe sua matrícula.";
  else if (!/^\d{1,6}$/.test(matricula.trim()))
    erros.matricula = "Use apenas números (até 6 dígitos).";
  if (!senha) erros.senha = "Informe sua senha.";
  else if (senha.length < 4) erros.senha = "A senha deve ter ao menos 4 caracteres.";
  return erros;
}

export default function Login() {
  const { usuario, login } = useAuth();
  const [curso, setCurso] = useState("");
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [erros, setErros] = useState({});

  // Já está logado? Vai direto para os avisos.
  if (usuario) return <Navigate to="/avisos" replace />;

  function aoEnviar(evento) {
    evento.preventDefault(); // impede a página de recarregar
    const novosErros = validar({ curso, matricula, senha });
    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;

    login({ curso, matricula: matricula.trim() });
    // Com o usuário salvo, o "if (usuario)" acima redireciona sozinho.
  }

  const borda = (nome) =>
    erros[nome]
      ? "border-red-500"
      : "border-neutral-300 dark:border-neutral-600";

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-black dark:text-white md:bg-neutral-100 md:dark:bg-neutral-950">
      <Header titulo="Acadêmico" />

      <main className="mx-auto max-w-md px-6 pb-10 pt-12 md:mt-10 md:rounded-xl md:border md:border-neutral-200 md:bg-white md:dark:border-neutral-800 md:dark:bg-black">
        <p
          aria-label="Inatel"
          className="text-center text-6xl font-extrabold italic tracking-tight text-inatel-azul dark:text-blue-500"
        >
          Inatel
        </p>
        <p className="mb-8 mt-8 text-center text-neutral-500 dark:text-neutral-400">
          Entre com suas credenciais.
        </p>

        <form onSubmit={aoEnviar} noValidate className="space-y-4">
          <div>
            <label htmlFor="curso" className="sr-only">Curso</label>
            <select
              id="curso"
              value={curso}
              onChange={(e) => setCurso(e.target.value)}
              aria-invalid={!!erros.curso}
              className={`${campo} ${borda("curso")}`}
            >
              <option value="">Selecione seu curso</option>
              {cursos.map((nome) => (
                <option key={nome} value={nome}>{nome}</option>
              ))}
            </select>
            {erros.curso && <p role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400">{erros.curso}</p>}
          </div>

          <div>
            <label htmlFor="matricula" className="sr-only">Matrícula</label>
            <input
              id="matricula"
              inputMode="numeric"
              autoComplete="off"
              placeholder="Matrícula"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              aria-invalid={!!erros.matricula}
              className={`${campo} ${borda("matricula")}`}
            />
            {erros.matricula && <p role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400">{erros.matricula}</p>}
          </div>

          <div>
            <label htmlFor="senha" className="sr-only">Senha</label>
            <input
              id="senha"
              type="password"
              autoComplete="off"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              aria-invalid={!!erros.senha}
              className={`${campo} ${borda("senha")}`}
            />
            {erros.senha && <p role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400">{erros.senha}</p>}
          </div>

          <Button type="submit">Autenticar</Button>
        </form>

        <p className="mt-6 text-center text-xs text-neutral-500 dark:text-neutral-400">
          Protótipo com dados fictícios. Não digite suas credenciais reais do
          Inatel. Exemplo: matrícula 1234, senha 123456.
        </p>
      </main>
    </div>
  );
}
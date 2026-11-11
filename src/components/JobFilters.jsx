const TIPOS = ["Estágio", "Emprego", "Trainee"];

const chip = "rounded-full border px-3 py-1.5 text-sm";
const chipLigado =
  "border-inatel-azul bg-inatel-azul text-white dark:border-inatel-botao-escuro dark:bg-inatel-botao-escuro";
const chipDesligado =
  "border-neutral-300 bg-white text-neutral-800 dark:border-neutral-600 dark:bg-black dark:text-neutral-100";
const seletor =
  "rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-800 dark:border-neutral-600 dark:bg-black dark:text-neutral-100";

// Mostra os filtros e avisa a página (aoMudar) quando algo muda.
export default function JobFilters({ filtros, aoMudar, total }) {
  const mudar = (campo, valor) => aoMudar({ ...filtros, [campo]: valor });

  return (
    <section aria-label="Filtros de vagas" className="px-4 pb-2">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          aria-pressed={filtros.curso}
          onClick={() => mudar("curso", !filtros.curso)}
          className={`${chip} ${filtros.curso ? chipLigado : chipDesligado}`}
        >
          Meu curso
        </button>
        <button
          type="button"
          aria-pressed={filtros.periodo}
          onClick={() => mudar("periodo", !filtros.periodo)}
          className={`${chip} ${filtros.periodo ? chipLigado : chipDesligado}`}
        >
          Meu período
        </button>
        <label>
          <span className="sr-only">Tipo de oportunidade</span>
          <select
            value={filtros.tipo}
            onChange={(e) => mudar("tipo", e.target.value)}
            className={seletor}
          >
            <option value="Todos">Todos os tipos</option>
            {TIPOS.map((tipo) => (
              <option key={tipo} value={tipo}>{tipo}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-3 flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-300">
        <p aria-live="polite">
          {total === null ? "" : `${total} ${total === 1 ? "vaga" : "vagas"}`}
        </p>
        <label className="flex items-center gap-2">
          Ordenar:
          <select
            value={filtros.ordem}
            onChange={(e) => mudar("ordem", e.target.value)}
            className={seletor}
          >
            <option value="recentes">Mais recentes</option>
            <option value="compativeis">Compatíveis primeiro</option>
          </select>
        </label>
      </div>
    </section>
  );
}
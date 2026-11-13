// Interruptor liga/desliga
export default function Switch({ ligado, aoAlternar, rotulo }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={ligado}
      aria-label={rotulo}
      onClick={aoAlternar}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
        ligado ? "bg-inatel-azul dark:bg-inatel-botao-escuro" : "bg-neutral-300 dark:bg-neutral-600"
      }`}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${
          ligado ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}
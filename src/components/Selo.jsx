const cores = {
  neutro: "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
  verde: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  laranja: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
  contorno: "border border-neutral-300 text-neutral-500 dark:border-neutral-600 dark:text-neutral-400",
};

// Etiqueta pequena (tipo da vaga, modalidade, "Compatível"...)
export default function Selo({ children, cor = "neutro" }) {
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${cores[cor]}`}>
      {children}
    </span>
  );
}
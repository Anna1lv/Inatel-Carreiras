const estilos = {
  primario:
    "bg-inatel-azul text-white hover:brightness-110 dark:bg-inatel-botao-escuro",
  secundario:
    "border border-neutral-300 bg-transparent text-inatel-azul hover:bg-neutral-100 dark:border-neutral-600 dark:text-white dark:hover:bg-white/10",
};

export default function Button({
  children,
  variante = "primario",
  className = "",
  type = "button",
  ...resto
}) {
  return (
    <button
      type={type}
      className={`w-full rounded-md px-4 py-3 text-base font-medium ${estilos[variante]} ${className}`}
      {...resto}
    >
      {children}
    </button>
  );
}
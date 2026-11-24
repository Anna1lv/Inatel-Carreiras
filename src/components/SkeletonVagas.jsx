const bloco = "animate-pulse rounded bg-neutral-200 dark:bg-neutral-800";

// "Esqueleto" que aparece enquanto as vagas carregam
export default function SkeletonVagas() {
  return (
    <ul aria-hidden="true" className="mt-2 border-t border-neutral-200 dark:border-neutral-800">
      {[0, 1, 2, 3].map((i) => (
        <li key={i} className="space-y-2.5 border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
          <div className={`h-4 w-3/4 ${bloco}`} />
          <div className={`h-3 w-1/2 ${bloco}`} />
          <div className="flex gap-2">
            <div className={`h-5 w-16 rounded-full ${bloco}`} />
            <div className={`h-5 w-28 rounded-full ${bloco}`} />
          </div>
          <div className={`h-3 w-2/5 ${bloco}`} />
        </li>
      ))}
    </ul>
  );
}
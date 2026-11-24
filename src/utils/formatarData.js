// "2026-06-30T15:32:00" -> "30/06/2026 15:32"
export function formatarDataHora(iso) {
  return new Date(iso)
    .toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(",", "");
}


// "2026-11-06" -> "06/11/2026"
// O timeZone "UTC" evita que a data "volte um dia" no fuso do Brasil.
export function formatarData(iso) {
  return new Date(iso).toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

// Data com ou sem horário: "2026-11-13T21:53:00" -> "13/11/2026 21:53" | "2026-11-06" -> "06/11/2026"
export function formatarPublicacao(iso) {
  return iso.includes("T") ? formatarDataHora(iso) : formatarData(iso);
}


const relativo = new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" });

// "2026-11-18T15:54:00" -> "há 3 horas" | "ontem" | "há 4 dias"
export function tempoRelativo(iso) {
  const minutos = Math.round((new Date(iso) - Date.now()) / 60000); // negativo = passado
  if (minutos > -1) return "agora";
  const abs = Math.abs(minutos);
  if (abs < 60) return relativo.format(minutos, "minute");
  if (abs < 60 * 24) return relativo.format(Math.round(minutos / 60), "hour");
  if (abs < 60 * 24 * 30) return relativo.format(Math.round(minutos / 1440), "day");
  return relativo.format(Math.round(minutos / 43200), "month");
}

// Publicada nas últimas 24 horas?
export function ehRecente(iso) {
  const diferenca = Date.now() - new Date(iso);
  return diferenca >= 0 && diferenca < 24 * 60 * 60 * 1000;
}
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
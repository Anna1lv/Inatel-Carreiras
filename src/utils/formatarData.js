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
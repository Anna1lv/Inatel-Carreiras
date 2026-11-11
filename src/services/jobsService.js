import { vagasDemo } from "../data/vagasDemo";

// Por enquanto as vagas vêm de dados de exemplo. As páginas só conhecem
// estas funções: quando a integração real existir, troque o corpo delas
// por um fetch() e o resto do app continua igual.
const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function listarVagas() {
  await esperar(500); // simula o tempo de uma requisição
  return vagasDemo;
}

export async function buscarVagaPorId(id) {
  await esperar(250);
  const vaga = vagasDemo.find((v) => v.id === Number(id));
  if (!vaga) throw new Error("Vaga não encontrada.");
  return vaga;
}
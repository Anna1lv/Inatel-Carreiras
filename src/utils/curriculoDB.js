// IndexedDB: banco do navegador que aceita arquivos (o localStorage não).
const NOME_BANCO = "inatel-app";
const LOJA = "curriculo";

function abrirBanco() {
  return new Promise((resolve, reject) => {
    const pedido = indexedDB.open(NOME_BANCO, 1);
    pedido.onupgradeneeded = () => pedido.result.createObjectStore(LOJA);
    pedido.onsuccess = () => resolve(pedido.result);
    pedido.onerror = () => reject(pedido.error);
  });
}

async function executar(modo, operacao) {
  const banco = await abrirBanco();
  return new Promise((resolve, reject) => {
    const transacao = banco.transaction(LOJA, modo);
    const pedido = operacao(transacao.objectStore(LOJA));
    transacao.oncomplete = () => {
      banco.close();
      resolve(pedido.result);
    };
    transacao.onerror = () => {
      banco.close();
      reject(transacao.error);
    };
  });
}

// Guarda sempre na mesma chave: salvar um novo SUBSTITUI o anterior
export const salvarCurriculo = (registro) =>
  executar("readwrite", (loja) => loja.put(registro, "principal"));

export const buscarCurriculo = () =>
  executar("readonly", (loja) => loja.get("principal"));
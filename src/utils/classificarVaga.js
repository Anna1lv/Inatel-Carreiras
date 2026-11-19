import { cursos } from "../data/cursos";

const [COMPUTACAO, AUTOMACAO, ELETRICA, SOFTWARE, TELECOM, BIOMEDICA, PRODUCAO] = cursos;

// A lista do site não informa o curso: inferimos pelo TÍTULO da vaga (aproximação).
const REGRAS = [
  [/software|desenvolv|programacao|programador|mobile|android|\bios\b|front-?end|back-?end|full ?stack|dados|\bdata\b|\bia\b|inteligencia artificial|machine|devops|cloud|\bsap\b|abap|python|\bjava\b|\bqa\b|\bteste|sistemas|\bti\b|\bit\b|suporte tecnico/, [SOFTWARE, COMPUTACAO]],
  [/eletric|eletron|energia|potencia|subestac/, [ELETRICA]],
  [/automacao|controle|scada|\bclp\b|mecatron|robot/, [AUTOMACAO, ELETRICA]],
  [/telecom|\bredes?\b|\brf\b|radio|\b5g\b|\b6g\b|antena|fibra|\biot\b/, [TELECOM]],
  [/biomedic|hospitalar|clinic|saude/, [BIOMEDICA]],
  [/producao|logistica|supply|manufatura|melhoria continua|\blean\b|processos industriais/, [PRODUCAO]],
];

const semAcento = (texto) => texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export function classificarCursos(titulo) {
  const t = semAcento(titulo);
  return [...new Set(REGRAS.filter(([regex]) => regex.test(t)).flatMap(([, lista]) => lista))];
}
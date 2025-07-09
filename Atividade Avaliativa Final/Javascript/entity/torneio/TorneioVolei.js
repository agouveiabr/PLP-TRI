import { Torneio } from './Torneio.js';

export class TorneioVolei extends Torneio {
  constructor(nome) {
    super(nome);
  }

  getModalidade() {
    return 'Volei';
  }

  getPosicoes() {
    return ['Levantador', 'Oposto', 'Central', 'Ponteiro', 'Líbero'];
  }
}
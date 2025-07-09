import { Torneio } from './Torneio.js';

export class TorneioFutsal extends Torneio {
  constructor(nome) {
    super(nome);
  }

  getModalidade() {
    return 'Futsal';
  }

  getPosicoes() {
    return ['Goleiro', 'Fixo', 'Ala', 'Pivô'];
  }
}
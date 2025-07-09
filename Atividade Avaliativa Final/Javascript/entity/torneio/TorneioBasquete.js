import { Torneio } from './Torneio.js';

export class TorneioBasquete extends Torneio {
  constructor(nome) {
    super(nome);
  }

  getModalidade() {
    return 'Basquete';
  }

  getPosicoes() {
    return ['Armador', 'Ala', 'Pivô'];
  }
}
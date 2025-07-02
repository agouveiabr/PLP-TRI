import { Placar } from './Placar.js';

export class PlacarFutsal extends Placar {
  constructor() {
    super();
    this.pontosTime1 = 0;
    this.pontosTime2 = 0;
  }

  registrar(p1, p2) {
    this.pontosTime1 = p1;
    this.pontosTime2 = p2;
  }

  exibir() {
    return `${this.pontosTime1} x ${this.pontosTime2}`;
  }
}
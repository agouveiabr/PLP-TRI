import { Placar } from './Placar.js';

export class PlacarFutsal extends Placar {
  constructor() {
    super();
    this.golsTime1 = 0;
    this.golsTime2 = 0;
  }

  registrar(g1, g2) {
    this.golsTime1 = g1;
    this.golsTime2 = g2;
  }

  exibir() {
    return `${this.golsTime1} x ${this.golsTime2}`;
  }
}
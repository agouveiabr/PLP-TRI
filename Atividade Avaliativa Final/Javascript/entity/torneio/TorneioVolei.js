import { Torneio } from './Torneio.js';

export class TorneioVolei extends Torneio {
  constructor(nome) {
    super(nome, [], []);
  }

  gerarPartidas() {
    this.partidas = [];
    for (let i = 0; i < this.times.length; i++) {
      for (let j = i + 1; j < this.times.length; j++) {
        this.partidas.push({
          time1: this.times[i],
          time2: this.times[j],
          placar: null,
          finalizada: false
        });
      }
    }
  }

  getModalidade() {
    return 'Volei';
  }

  getPosicoes() {
    return ['Levantador', 'Oposto', 'Central', 'Ponteiro', 'Líbero'];
  }
}
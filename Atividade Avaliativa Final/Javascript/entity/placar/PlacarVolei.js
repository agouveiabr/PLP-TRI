import { Placar } from './Placar.js';
import { Set } from './Set.js'; //

export class PlacarVolei extends Placar {
  constructor() {
    super();
    this.sets = []; 
  }

  registrar(pontosTime1, pontosTime2) {
    const novoSet = new Set(pontosTime1, pontosTime2);
    this.sets.push(novoSet);
  }

  exibir() {
    if (this.sets.length === 0) return 'Nenhum set registrado ainda.';
    
    const resumoSets = this.sets
      .map((set, index) => `Set ${index + 1}: ${set.exibir()}`)
      .join(' | ');
    
    return `Pontuação dos Sets: ${resumoSets}`;
  }
}
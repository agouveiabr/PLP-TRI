export class Torneio {
  constructor(nome, times = []) {
    if (new.target === Torneio) {
      throw new TypeError("Cannot construct Torneio instances directly");
    }
    this.nome = nome;
    this.times = times;
  }

  adicionarTime(time) {
    if (time.modalidade !== this.getModalidade()) {
      throw new Error(`Este torneio é de ${this.getModalidade()}, não aceita times de ${time.esporte}`);
    }
    this.times.push(time);
  }

  gerarMataMata() {
    if (this.times.length < 2) {
      console.log("É necessário pelo menos 2 times para gerar mata-mata.\n");
      return [];
    }
  
    const timesCopia = [...this.times];
    if (timesCopia.length % 2 !== 0) {
      timesCopia.push({ nome: "BYE", jogadores: [], modalidade: this.getModalidade() });
    }
  
    const random = timesCopia.sort(() => Math.random() - 0.5);
  
    const confrontos = [];
    for (let i = 0; i < random.length; i += 2) {
      confrontos.push({
        time1: random[i].nome,
        time2: random[i + 1].nome
      });
    }
  
    return confrontos;
  }
  
  exibirMataMata() {
    const confrontos = this.gerarMataMata();
    if (confrontos.length === 0) return;
  
    const qtdTimes = confrontos.length * 2;
    const nomeFase = this._nomeFasePorQuantidadeTimes(qtdTimes);
    console.log(`\n=== ${nomeFase} ===`);
    confrontos.forEach((jogo, i) => {
      console.log(`Jogo ${i + 1}: ${jogo.time1} vs ${jogo.time2}`);
    });
  }
  
  _nomeFasePorQuantidadeTimes(qtd) {
    const fases = {
      16: "Oitavas de final",
      8: "Quartas de final",
      4: "Semifinal",
      2: "Final"
    };
    return fases[qtd] || `Fase eliminatória com ${qtd} times`;
  }
}

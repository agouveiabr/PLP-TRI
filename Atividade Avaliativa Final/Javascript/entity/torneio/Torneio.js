export class Torneio {
  constructor(nome, times = [], partidas = []) {
    if (new.target === Torneio) {
      throw new TypeError("Cannot construct Torneio instances directly");
    }
    this.nome = nome;
    this.times = times; // Array de objetos Time
    this.partidas = partidas; // Array de objetos Partida
  }

  adicionarTime(time) {
    if (time.modalidade !== this.getModalidade()) {
      throw new Error(`Este torneio é de ${this.getModalidade()}, não aceita times de ${time.esporte}`);
    }
    this.times.push(time);
  }

  gerarTabela() {
    const tabela = this.times.map(time => {
      return {
        nome: time.nome,
        jogadores: time.jogadores.map(jogador => jogador.exibirDados()).join(', '),
        modalidade: time.modalidade
      };
    });
    return tabela;
  }

  exibirPartidas() {
    return this.partidas.map(partida => {
      return `Partida: ${partida.time1.nome} vs ${partida.time2.nome}, Placar: ${partida.placar ? partida.placar.exibir() : 'N/A'}`;
    }).join('\n');
  }

  gerarPartidas() {
    throw new Error("Method 'gerarPartidas()' must be implemented.");
  }

}
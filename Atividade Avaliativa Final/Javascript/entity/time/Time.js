export class Time {
  constructor(nome, modalidade) {
    this.nome = nome;
    this.jogadores = [];
    this.modalidade = modalidade;
  }

  adicionarJogador(jogador) {
    this.jogadores.push(jogador);
  }

  removerJogador(jogador) {}

  exibirTime() {
    if (this.jogadores.length === 0) {
      return `O time ${this.nome} não possui jogadores.`;
    }

    const jogadoresInfo = this.jogadores
      .map((jogador) => jogador.exibirDados())
      .join(" || ");
    return `${this.nome} (${this.modalidade}) -> Jogadores: [${jogadoresInfo}]`;
  }
}

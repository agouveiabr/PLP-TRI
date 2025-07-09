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
    let dados = `Time: ${this.nome} (${this.modalidade})\n`;
    for (const jogador of this.jogadores) {
      dados += `  - ${jogador.exibirDados()}\n`;
    }
    return dados.trim();
  }
}

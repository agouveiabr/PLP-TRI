export class Jogador {
  constructor(nome, idade, posicao) {
    this.nome = nome;
    this.idade = idade;
    this.posicao = posicao;
  }

  exibirDados() {
    return `${this.nome}, ${this.idade} anos (${this.posicao})`;
  }
}
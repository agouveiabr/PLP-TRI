export class Jogador {
  constructor(nome, idade, posicao) {
    this.nome = nome;
    this.idade = idade;
    this.posicao = posicao;
    this.modalidade = modalidade;
  }

  exibirDados() {
    return `${this.nome}, ${this.idade} anos, posição: ${this.posicao}`;
  }
}
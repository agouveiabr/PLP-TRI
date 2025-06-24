export class Pessoa {
  constructor(identificador, endereco) {
    this.identificador = identificador;
    this.endereco = endereco;
  }

  getIdentificador() {
    return this.identificador;
  }

  getEndereco() {
    return this.endereco;
  }

  exibirDados() {
    return `Identificador: ${this.identificador}\nEndereço: ${this.endereco}`;
  }
}
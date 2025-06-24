import { Pessoa } from "./Pessoa.js";

export class PessoaJuridica extends Pessoa {
  constructor(identificador, endereco, nome) {
    super(identificador, endereco);
    this.nome = nome;
  }

  exibirDados() {
    return `${super.exibirDados()}\nNome (Pessoa Jurídica): ${this.nome}`;
  }
}
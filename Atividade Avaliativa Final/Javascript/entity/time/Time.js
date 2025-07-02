export class Time{
  constructor(nome, modalidade){
    this.nome = nome;
    this.jogadores = [];
    this.modalidade = modalidade; 
  }

  adicionarJogador(jogador) {
    this.jogadores.push(jogador);
  }


  exibirTime() {
    const jogadoresInfo = this.jogadores.map(jogador => jogador.exibirDados()).join(', ');
    return `Time: ${this.nome}, Modalidade: ${this.modalidade}, Jogadores: [${jogadoresInfo}]`;
  }
}
class Jogador:
    def __init__(self, nome: str, idade: int, posicao: str):
        self.nome = nome
        self.idade = idade
        self.posicao = posicao

    def exibir_dados(self) -> str:
        return f"Nome: {self.nome}, Idade: {self.idade}, Posição: {self.posicao}"

    def __repr__(self):
        return self.exibir_dados()

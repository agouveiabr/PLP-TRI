from pessoa import Pessoa

class PessoaFisica(Pessoa):
    def __init__(self, identificador: str, endereco: str, nome: str):
        super().__init__(identificador, endereco)
        self.nome = nome

    def exibir_dados(self):
        super().exibir_dados()
        print(f"Nome (Pessoa Física): {self.nome}")
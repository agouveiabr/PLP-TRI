class Pessoa:
    def __init__(self, identificador: str, endereco: str):
        self.identificador = identificador
        self.endereco = endereco

    def get_identificador(self):
        return self.identificador

    def get_endereco(self):
        return self.endereco

    def exibir_dados(self):
        print(f"Identificador: {self.identificador}")
        print(f"Endereço: {self.endereco}")
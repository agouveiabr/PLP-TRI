

from entity.torneio.torneio import Torneio

class TorneioVolei(Torneio):
    def get_modalidade(self) -> str:
        return "Volei"

    def get_posicoes(self) -> list:
        return ["Levantador", "Oposto", "Ponteiro", "Central", "Líbero"]
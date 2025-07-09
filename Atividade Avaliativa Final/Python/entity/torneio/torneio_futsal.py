from entity.torneio.torneio import Torneio

class TorneioFutsal(Torneio):
    def get_modalidade(self) -> str:
        return "Futsal"

    def get_posicoes(self) -> list:
        return ["Goleiro", "Fixo", "Ala", "Pivô"]


from entity.torneio.torneio import Torneio

class TorneioBasquete(Torneio):
    def get_modalidade(self) -> str:
        return "Basquete"

    def get_posicoes(self) -> list:
        return ["Armador", "Ala-armador", "Ala", "Ala-pivô", "Pivô"]
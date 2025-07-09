

from abc import ABC, abstractmethod
from typing import List
from entity.time import Time

class Torneio(ABC):
    def __init__(self, nome: str):
        self.nome = nome
        self.times: List[Time] = []

    def adicionar_time(self, time: Time):
        if time.modalidade != self.get_modalidade():
            raise ValueError(f"Este torneio é de {self.get_modalidade()}, não aceita times de {time.modalidade}")
        self.times.append(time)

    def gerar_mata_mata(self) -> List[tuple]:
        if len(self.times) < 2:
            print("É necessário pelo menos 2 times para gerar mata-mata.")
            return []

        times = self.times[:]
        if len(times) % 2 != 0:
            times.append(Time("BYE", self.get_modalidade()))

        import random
        random.shuffle(times)

        return [(times[i].nome, times[i+1].nome) for i in range(0, len(times), 2)]

    def exibir_mata_mata(self):
        confrontos = self.gerar_mata_mata()
        qtd_times = len(confrontos) * 2
        fase = self._nome_fase_por_quantidade_times(qtd_times)
        print(f"\n=== {fase} ===")
        for i, (t1, t2) in enumerate(confrontos, 1):
            print(f"Jogo {i}: {t1} vs {t2}")

    def _nome_fase_por_quantidade_times(self, qtd: int) -> str:
        fases = {
            16: "Oitavas de final",
            8: "Quartas de final",
            4: "Semifinal",
            2: "Final"
        }
        return fases.get(qtd, f"Fase eliminatória com {qtd} times")

    @abstractmethod
    def get_modalidade(self) -> str:
        pass

    @abstractmethod
    def get_posicoes(self) -> List[str]:
        pass
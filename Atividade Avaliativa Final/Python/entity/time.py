

from typing import List
from entity.jogador import Jogador

class Time:
    def __init__(self, nome: str, modalidade: str):
        self.nome = nome
        self.modalidade = modalidade
        self.jogadores: List[Jogador] = []

    def adicionar_jogador(self, jogador: Jogador):
        self.jogadores.append(jogador)

    def remover_jogador(self, jogador: Jogador):
        if jogador in self.jogadores:
            self.jogadores.remove(jogador)

    def exibir_time(self) -> str:
        dados = f"Time: {self.nome} ({self.modalidade})\n"
        for jogador in self.jogadores:
            dados += f"  - {jogador.exibir_dados()}\n"
        return dados.strip()
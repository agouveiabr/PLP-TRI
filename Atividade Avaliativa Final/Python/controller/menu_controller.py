import readline
from functools import reduce

from entity.jogador import Jogador
from entity.time import Time
from entity.torneio.torneio_futsal import TorneioFutsal
from entity.torneio.torneio_basquete import TorneioBasquete
from entity.torneio.torneio_volei import TorneioVolei

class MenuController:
    def __init__(self):
        self.torneios = []

    def exibir_menu(self):
        while True:
            print("\n=== Menu Principal ===")
            print("1. Criar torneio")
            print("2. Adicionar time ao torneio")
            print("3. Adicionar jogador a time")
            print("4. Exibir torneios, times e jogadores")
            print("5. Gerar mata-mata")
            print("6. Filtrar jogadores")
            print("7. Média de Idade do Torneio")
            print("99. Popular dados de exemplo")
            print("0. Sair")

            opcao = input("Escolha uma opção: ")

            if opcao == "1":
                self.criar_torneio()
            elif opcao == "2":
                self.adicionar_time()
            elif opcao == "3":
                self.adicionar_jogador()
            elif opcao == "4":
                self.exibir_torneios()
            elif opcao == "5":
                self.gerar_mata_mata()
            elif opcao == "6":
                self.filtrar_jogadores()
            elif opcao == "7":
                self.media_idade_torneio()
            elif opcao == "99":
                self.popular_dados()
            elif opcao == "0":
                print("Encerrando...\n")
                break
            else:
                print("Opção inválida.\n")

    def criar_torneio(self):
        modalidades = [TorneioBasquete, TorneioFutsal, TorneioVolei]
        print("Modalidades disponíveis:")
        for i, classe in enumerate(modalidades):
            print(f"{i}: {classe.__name__.replace('Torneio', '')}")

        idx = int(input("Índice da modalidade: "))
        nome = input("Nome do torneio: ")

        torneio = modalidades[idx](nome)
        self.torneios.append(torneio)
        print(f'Torneio de {torneio.get_modalidade()} "{nome}" criado com sucesso!')

    def adicionar_time(self):
        if not self.torneios:
            print("Nenhum torneio cadastrado.")
            return

        print("Torneios disponíveis:")
        for i, t in enumerate(self.torneios):
            print(f"{i}: {t.nome} ({t.get_modalidade()})")

        idx = int(input("Índice do torneio: "))
        torneio = self.torneios[idx]

        nome = input("Nome do time: ")
        time = Time(nome, torneio.get_modalidade())

        try:
            torneio.adicionar_time(time)
            print(f"Time '{nome}' adicionado ao torneio '{torneio.nome}'")
        except ValueError as e:
            print(f"Erro: {e}")

    def adicionar_jogador(self):
        if not self.torneios:
            print("Nenhum torneio disponível.")
            return

        times = [time for t in self.torneios for time in t.times]
        if not times:
            print("Nenhum time disponível.")
            return

        print("Times disponíveis:")
        for i, time in enumerate(times):
            print(f"{i}: {time.nome} ({time.modalidade})")

        idx = int(input("Índice do time: "))
        time = times[idx]

        posicoes = []
        for t in self.torneios:
            if t.get_modalidade() == time.modalidade:
                posicoes = t.get_posicoes()
                break

        print("Posições disponíveis:")
        for i, p in enumerate(posicoes):
            print(f"{i}: {p}")

        nome = input("Nome do jogador: ")
        idade = int(input("Idade do jogador: "))
        pos_idx = int(input("Índice da posição: "))
        jogador = Jogador(nome, idade, posicoes[pos_idx])

        time.adicionar_jogador(jogador)
        print(f"Jogador '{nome}' adicionado ao time '{time.nome}'.")

    def exibir_torneios(self):
        if not self.torneios:
            print("Nenhum torneio disponível.")
            return

        for t in self.torneios:
            print(f"\nTorneio: {t.nome} ({t.get_modalidade()})")
            for time in t.times:
                print(time.exibir_time())

    def gerar_mata_mata(self):
        if not self.torneios:
            print("Nenhum torneio disponível.")
            return

        print("Torneios disponíveis:")
        for i, t in enumerate(self.torneios):
            print(f"{i}: {t.nome} ({t.get_modalidade()})")

        idx = int(input("Índice do torneio: "))
        torneio = self.torneios[idx]

        torneio.exibir_mata_mata()

    def filtrar_jogadores(self):
        if not self.torneios:
            print("Nenhum torneio encontrado.\n")
            return

        print("\n=== Filtros disponíveis ===")
        print("1. Filtrar por idade mínima")
        print("2. Filtrar por posição")
        opcao = input("Escolha uma opção: ")

        if opcao == "1":
            idade_minima = int(input("Idade mínima: "))
            resultado = []

            for torneio in self.torneios:
                for time in torneio.times:
                    jogadores_filtrados = list(filter(lambda j: j.idade >= idade_minima, time.jogadores))
                    if jogadores_filtrados:
                        resultado.append({
                            "time": time.nome,
                            "jogadores": jogadores_filtrados
                        })

            if not resultado:
                print("Nenhum jogador encontrado com essa idade.\n")
            else:
                for item in resultado:
                    print(f"\nTime: {item['time']}")
                    jogadores_str = map(lambda j: f"  - {j.nome} ({j.posicao}, {j.idade} anos)", item["jogadores"])
                    print("\n".join(jogadores_str))
                    print()

        elif opcao == "2":
            posicao_busca = input("Nome da posição: ").lower()
            resultado = []

            for torneio in self.torneios:
                for time in torneio.times:
                    jogadores_filtrados = list(filter(lambda j: j.posicao.lower() == posicao_busca, time.jogadores))
                    if jogadores_filtrados:
                        resultado.append({
                            "time": time.nome,
                            "jogadores": jogadores_filtrados
                        })

            if not resultado:
                print("Nenhum jogador encontrado com essa posição.\n")
            else:
                for item in resultado:
                    print(f"\nTime: {item['time']}")
                    jogadores_str = map(lambda j: f"  - {j.nome} ({j.posicao}, {j.idade} anos)", item["jogadores"])
                    print("\n".join(jogadores_str))
                    print()
        else:
            print("Opção inválida.\n")

    def media_idade_torneio(self):
        if not self.torneios:
            print("Nenhum torneio disponível.")
            return

        print("Torneios disponíveis:")
        for i, t in enumerate(self.torneios):
            print(f"{i}: {t.nome} ({t.get_modalidade()})")

        idx = int(input("Índice do torneio: "))
        torneio = self.torneios[idx]

        jogadores = [j for time in torneio.times for j in time.jogadores]
        if not jogadores:
            print("Nenhum jogador neste torneio.")
            return

        media = reduce(lambda acc, j: acc + j.idade, jogadores, 0) / len(jogadores)
        print(f"Média de idade dos jogadores no torneio \"{torneio.nome}\": {media:.1f} anos")
        
    def popular_dados(self):
        print("Populando dados de exemplo...")
        exemplos = [
            (TorneioFutsal, "Futsal Stars"),
            (TorneioBasquete, "Basquete Stars"),
            (TorneioVolei, "Volei Stars")
        ]

        for classe, nome in exemplos:
            torneio = classe(nome)
            for i in range(3):
                time_nome = f"{torneio.get_modalidade()} Time {i+1}"
                time = Time(time_nome, torneio.get_modalidade())
                for j in range(5):
                    jogador = Jogador(
                        nome=f"Jogador {i+1}-{j+1}",
                        idade=20 + j,
                        posicao=torneio.get_posicoes()[j % len(torneio.get_posicoes())]
                    )
                    time.adicionar_jogador(jogador)
                torneio.adicionar_time(time)
            self.torneios.append(torneio)

        print("Dados populados com sucesso!")
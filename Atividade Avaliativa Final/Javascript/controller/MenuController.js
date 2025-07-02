import readline from "readline";
import { Jogador } from "../entity/jogador/Jogador.js";
import { Time } from "../entity/time/Time.js";
import { TorneioFutsal } from "../entity/torneio/TorneioFutsal.js";
import { TorneioBasquete } from "../entity/torneio/TorneioBasquete.js";
import { TorneioVolei } from "../entity/torneio/TorneioVolei.js";
import { PlacarFutsal } from "../entity/placar/PlacarFutsal.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const jogadores = [];
const times = [];
const torneios = [];

function exibirMenu() {
  console.log("\n=== Menu Principal ===");
  console.log("1. Criar torneio");
  console.log("2. Adicionar time ao torneio");
  console.log("3. Adicionar jogador a time");
  console.log("4. Exibir torneios, times e jogadores");
  console.log("5. Popular dados de exemplo");
  console.log("0. Sair");
}

function criarTorneio() {
  console.log("Modalidades disponíveis:");
  const modalidades = ["Basquete", "Futsal", "Volei"];
  modalidades.forEach((m, i) => console.log(`${i}: ${m}`));

  rl.question("Índice da modalidade: ", (iMod) => {
    const modalidade = modalidades[parseInt(iMod)];
    if (!modalidade) {
      console.log("Modalidade inválida.");
      return promptMenu();
    }

    rl.question("Nome do torneio: ", (nome) => {
      let novoTorneio;
      switch (modalidade) {
        case "Futsal":
          novoTorneio = new TorneioFutsal(nome);
          break;
        case "Basquete":
          novoTorneio = new TorneioBasquete(nome);
          break;
        case "Volei":
          novoTorneio = new TorneioVolei(nome);
          break;
      }
      torneios.push(novoTorneio);
      console.log(`Torneio de ${modalidade} "${nome}" criado com sucesso!`);
      promptMenu();
    });
  });
}

function adicionarTimeAoTorneio() {
  if (torneios.length === 0) {
    console.log("Crie um torneio primeiro!");
    return promptMenu();
  }

  console.log("Torneios disponíveis:");
  torneios.forEach((t, i) =>
    console.log(`${i}: ${t.nome} (${t.getModalidade()})`)
  );
  rl.question("Índice do torneio: ", (iT) => {
    const torneio = torneios[parseInt(iT)];
    if (!torneio) {
      console.log("Torneio inválido.");
      return promptMenu();
    }

    rl.question("Nome do time: ", (nomeTime) => {
      const esporte = torneio.getModalidade();
      const novoTime = new Time(nomeTime, esporte);
      torneio.adicionarTime(novoTime);
      console.log(`Time ${nomeTime} adicionado ao torneio ${torneio.nome}`);
      promptMenu();
    });
  });
}

function adicionarJogadorATime() {
  if (torneios.length === 0) {
    console.log("Nenhum torneio encontrado.");
    return promptMenu();
  }

  console.log("Torneios disponíveis:");
  torneios.forEach((t, i) => console.log(`${i}: ${t.nome}`));
  rl.question("Índice do torneio: ", (iT) => {
    const torneio = torneios[parseInt(iT)];
    if (!torneio) {
      console.log("Torneio inválido.");
      return promptMenu();
    }

    if (torneio.times.length === 0) {
      console.log("Este torneio ainda não tem times.");
      return promptMenu();
    }

    console.log("Times disponíveis:");
    torneio.times.forEach((time, i) => console.log(`${i}: ${time.nome}`));
    rl.question("Índice do time: ", (iTime) => {
      const time = torneio.times[parseInt(iTime)];
      if (!time) {
        console.log("Índice inválido.");
        return promptMenu();
      }

      const modalidade = time.esporte;
      const posicoes = torneio.getPosicoes();
      console.log(`Posições disponíveis para ${modalidade}:`);
      posicoes.forEach((pos, i) => console.log(`${i}: ${pos}`));

      rl.question("Índice da posição: ", (iPos) => {
        const posicao = posicoes[parseInt(iPos)];
        if (!posicao) {
          console.log("Posição inválida.");
          return promptMenu();
        }

        rl.question("Nome do jogador: ", (nome) => {
          rl.question("Idade: ", (idade) => {
            const novoJogador = new Jogador(nome, parseInt(idade), posicao);
            time.adicionarJogador(novoJogador);
            console.log(`Jogador ${nome} adicionado ao time ${time.nome}`);
            promptMenu();
          });
        });
      });
    });
  });
}

function exibirTorneios() {
  if (torneios.length === 0) {
    console.log("Nenhum torneio cadastrado.");
  } else {
    torneios.forEach((t, i) => {
      console.log(`\n${i}: Torneio ${t.nome} (${t.getModalidade()})`);
      if (t.times.length === 0) {
        console.log("  Nenhum time cadastrado.");
      } else {
        t.times.forEach((time, j) => {
          console.log(`  ${j}: Time ${time.nome}`);
          if (time.jogadores.length === 0) {
            console.log("    Nenhum jogador.");
          } else {
            time.jogadores.forEach((jogador, k) => {
              console.log(
                `    - ${jogador.nome} (${jogador.posicao}, ${jogador.idade} anos)`
              );
            });
          }
        });
      }
    });
  }
  promptMenu();
}

const menuOptions = {
  1: criarTorneio,
  2: adicionarTimeAoTorneio,
  3: adicionarJogadorATime,
  4: exibirTorneios,
  5: () => {
    console.log("Populando dados...");
    popularDados();
    promptMenu();
  },
  0: () => {
    console.log("Encerrando...");
    rl.close();
  },
};

function promptMenu() {
  exibirMenu();
  rl.question("Escolha uma opção: ", (opcao) => {
    const acao = menuOptions[opcao];
    if (acao) {
      acao();
    } else {
      console.log("Opção inválida!");
      promptMenu();
    }
  });
}

function popularDados() {
  const modalidades = ["Futsal", "Basquete", "Volei"];
  const posicoesPorModalidade = {
    Basquete: ["Armador", "Ala", "Pivô"],
    Futsal: ["Goleiro", "Fixo", "Ala", "Pivô"],
    Volei: ["Levantador", "Oposto", "Central", "Ponteiro", "Líbero"],
  };

  modalidades.forEach((modalidade) => {
    let torneio;
    switch (modalidade) {
      case "Futsal":
        torneio = new TorneioFutsal(`${modalidade} Stars`);
        break;
      case "Basquete":
        torneio = new TorneioBasquete(`${modalidade} Stars`);
        break;
      case "Volei":
        torneio = new TorneioVolei(`${modalidade} Stars`);
        break;
    }

    for (let t = 1; t <= 3; t++) {
      const time = new Time(`${modalidade} Time ${t}`, modalidade);
      const posicoes = posicoesPorModalidade[modalidade];

      for (let j = 1; j <= 5; j++) {
        const nome = `Jogador${modalidade[0]}${t}${j}`;
        const idade = 18 + j;
        const posicao = posicoes[j % posicoes.length];
        time.adicionarJogador(new Jogador(nome, idade, posicao));
      }

      torneio.adicionarTime(time);
    }

    torneios.push(torneio);
  });

  console.log("Dados populados com sucesso!\n");
}

export function iniciarMenu() {
  promptMenu();
}

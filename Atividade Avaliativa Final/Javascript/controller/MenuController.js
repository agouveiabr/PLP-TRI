import readline from "readline";
import { Jogador } from "../entity/jogador/Jogador.js";
import { Time } from "../entity/time/Time.js";
import { TorneioFutsal } from "../entity/torneio/TorneioFutsal.js";
import { TorneioBasquete } from "../entity/torneio/TorneioBasquete.js";
import { TorneioVolei } from "../entity/torneio/TorneioVolei.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const jogadores = [];
const times = [];
const torneios = [];

const modalidades = {
  Futsal: TorneioFutsal,
  Basquete: TorneioBasquete,
  Volei: TorneioVolei,
};

function exibirMenu() {
  console.log("\n=== Menu Principal ===");
  console.log("1. Criar torneio");
  console.log("2. Adicionar time ao torneio");
  console.log("3. Adicionar jogador a time");
  console.log("4. Exibir torneios, times e jogadores");
  console.log("5. Filtrar Jogadores");
  console.log("6. Media de Idade do Torneio");
  console.log("7. Gerar confrontos de mata-mata");
  console.log("99. Popular dados de exemplo");
  console.log("0. Sair");
  console.log("======================\n");
}

function criarTorneio() {
  const modalidadesArray = Object.keys(modalidades);
  console.log("Modalidades disponíveis:\n");
  modalidadesArray.forEach((m, i) => console.log(`${i}: ${m}`));

  rl.question("\nÍndice da modalidade: ", (iMod) => {
    const modalidade = modalidadesArray[parseInt(iMod)];
    const ClasseTorneio = modalidades[modalidade];
    if (!ClasseTorneio) {
      console.log("Modalidade inválida.\n");
      return promptMenu();
    }

    rl.question("Nome do torneio: ", (nome) => {
      const novoTorneio = new ClasseTorneio(nome);
      torneios.push(novoTorneio);
      console.log(`\nTorneio de ${modalidade} "${nome}" criado com sucesso!\n`);
      promptMenu();
    });
  });
}

function adicionarTimeAoTorneio() {
  if (torneios.length === 0) {
    console.log("Crie um torneio primeiro!\n");
    return promptMenu();
  }

  console.log("Torneios disponíveis:\n");
  torneios.forEach((t, i) =>
    console.log(`${i}: ${t.nome} (${t.getModalidade()})`)
  );
  rl.question("\nÍndice do torneio: ", (iT) => {
    const torneio = torneios[parseInt(iT)];
    if (!torneio) {
      console.log("Torneio inválido.\n");
      return promptMenu();
    }

    rl.question("Nome do time: ", (nomeTime) => {
      const modalidade = torneio.getModalidade();
      const novoTime = new Time(nomeTime, modalidade);
      torneio.adicionarTime(novoTime);
      console.log(`\nTime ${nomeTime} adicionado ao torneio ${torneio.nome}\n`);
      promptMenu();
    });
  });
}

function adicionarJogadorATime() {
  if (torneios.length === 0) {
    console.log("Nenhum torneio encontrado.\n");
    return promptMenu();
  }

  console.log("Torneios disponíveis:\n");
  torneios.forEach((t, i) => console.log(`${i}: ${t.nome}`));
  rl.question("\nÍndice do torneio: ", (iT) => {
    const torneio = torneios[parseInt(iT)];
    if (!torneio) {
      console.log("Torneio inválido.\n");
      return promptMenu();
    }

    if (torneio.times.length === 0) {
      console.log("Este torneio ainda não tem times.\n");
      return promptMenu();
    }

    console.log("\nTimes disponíveis:\n");
    torneio.times.forEach((time, i) => console.log(`${i}: ${time.nome}`));
    rl.question("\nÍndice do time: ", (iTime) => {
      const time = torneio.times[parseInt(iTime)];
      if (!time) {
        console.log("Índice inválido.\n");
        return promptMenu();
      }

      const modalidade = time.modalidade;
      const posicoes = torneio.getPosicoes();
      console.log(`\nPosições disponíveis para ${modalidade}:\n`);
      posicoes.forEach((pos, i) => console.log(`${i}: ${pos}`));

      rl.question("\nÍndice da posição: ", (iPos) => {
        const posicao = posicoes[parseInt(iPos)];
        if (!posicao) {
          console.log("Posição inválida.\n");
          return promptMenu();
        }

        rl.question("\nNome do jogador: ", (nome) => {
          const perguntarIdade = () => {
            rl.question("Idade: ", (idade) => {
              const idadeNumerica = parseInt(idade);
              if (isNaN(idadeNumerica) || idadeNumerica <= 0) {
                console.log(
                  "Por favor, insira uma idade válida (número positivo)."
                );
                return perguntarIdade();
              }

              const novoJogador = new Jogador(nome, idadeNumerica, posicao);
              time.adicionarJogador(novoJogador);
              console.log(
                `\nJogador ${nome} adicionado ao time ${time.nome}\n`
              );
              promptMenu();
            });
          };
          perguntarIdade(); 
        });
      });
    });
  });
}

function exibirTorneios() {
  if (torneios.length === 0) {
    console.log("Nenhum torneio cadastrado.\n");
  } else {
    torneios.forEach((t, i) => {
      console.log(`\n${i}: Torneio ${t.nome} (${t.getModalidade()})`);
      if (t.times.length === 0) {
        console.log("  Nenhum time cadastrado.");
      } else {
        t.times.forEach((time, j) => {
          console.log(`  ${j}: ${time.exibirTime()}`);
        });
      }
    });
    console.log("");
  }
  promptMenu();
}

function filtrarJogadores() {
  if (torneios.length === 0) {
    console.log("Nenhum torneio encontrado.\n");
    return promptMenu();
  }

  console.log("\n=== Filtros disponíveis ===");
  console.log("1. Filtrar por idade mínima");
  console.log("2. Filtrar por posição");
  rl.question("Escolha uma opção: ", (opcao) => {
    if (opcao === "1") {
      rl.question("Idade mínima: ", (idadeMinima) => {
        const resultado = [];
        torneios.forEach((torneio) => {
          torneio.times.forEach((time) => {
            const jogadoresFiltrados = time.jogadores.filter(
              (j) => j.idade >= parseInt(idadeMinima)
            );
            if (jogadoresFiltrados.length > 0) {
              resultado.push({
                time: time.nome,
                jogadores: jogadoresFiltrados,
              });
            }
          });
        });

        if (resultado.length === 0) {
          console.log("Nenhum jogador encontrado com essa idade.\n");
        } else {
          resultado
            .map((item) => {
              const jogadoresStr = item.jogadores
                .map((j) => `  - ${j.nome} (${j.posicao}, ${j.idade} anos)`)
                .join("\n");
              return `\nTime: ${item.time}\n${jogadoresStr}`;
            })
            .forEach((str) => console.log(str + "\n"));
        }
        promptMenu();
      });
    } else if (opcao === "2") {
      rl.question("Nome da posição: ", (posicaoBusca) => {
        const resultado = [];
        torneios.forEach((torneio) => {
          torneio.times.forEach((time) => {
            const jogadoresFiltrados = time.jogadores.filter(
              (j) => j.posicao.toLowerCase() === posicaoBusca.toLowerCase()
            );
            if (jogadoresFiltrados.length > 0) {
              resultado.push({
                time: time.nome,
                jogadores: jogadoresFiltrados,
              });
            }
          });
        });

        if (resultado.length === 0) {
          console.log("Nenhum jogador encontrado com essa posição.\n");
        } else {
          resultado
            .map((item) => {
              const jogadoresStr = item.jogadores
                .map((j) => `  - ${j.nome} (${j.posicao}, ${j.idade} anos)`)
                .join("\n");
              return `\nTime: ${item.time}\n${jogadoresStr}`;
            })
            .forEach((str) => console.log(str + "\n"));
        }
        promptMenu();
      });
    } else {
      console.log("Opção inválida.\n");
      promptMenu();
    }
  });
}

function idadeMediaTorneio() {
  if (torneios.length === 0) {
    console.log("Nenhum torneio cadastrado.\n");
    return promptMenu();
  }

  console.log("Torneios disponíveis:");
  torneios.forEach((t, i) =>
    console.log(`${i}: ${t.nome} (${t.getModalidade()})`)
  );

  rl.question("Índice do torneio: ", (iT) => {
    const torneio = torneios[parseInt(iT)];
    if (!torneio) {
      console.log("Índice inválido.\n");
      return promptMenu();
    }

    const jogadores = torneio.times.flatMap((time) => time.jogadores);
    if (jogadores.length === 0) {
      console.log("Este torneio não possui jogadores.\n");
      return promptMenu();
    }

    const somaIdades = jogadores.reduce((acc, j) => acc + j.idade, 0);
    const media = somaIdades / jogadores.length;

    console.log(
      `Média de idade dos jogadores no torneio "${
        torneio.nome
      }": ${media.toFixed(1)} anos\n`
    );
    promptMenu();
  });
}

function gerarMataMata() {
  if (torneios.length === 0) {
    console.log("Nenhum torneio cadastrado.\n");
    return promptMenu();
  }

  console.log("Torneios disponíveis:");
  torneios.forEach((t, index) => {
    console.log(`${index}: ${t.nome} (${t.getModalidade()})`);
  });

  rl.question("Índice do torneio: ", (indice) => {
    const torneio = torneios[indice];
    if (!torneio) {
      console.log("Índice inválido.\n");
      return promptMenu();
    }

    torneio.exibirMataMata();

    console.log("");
    promptMenu();
  });
}

const menuOptions = {
  1: criarTorneio,
  2: adicionarTimeAoTorneio,
  3: adicionarJogadorATime,
  4: exibirTorneios,
  5: filtrarJogadores,
  6: idadeMediaTorneio,
  7: gerarMataMata,
  99: () => {
    console.log("Populando dados...\n");
    popularDados();
    promptMenu();
  },
  0: () => {
    console.log("Encerrando...\n");
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
      console.log("Opção inválida!\n");
      promptMenu();
    }
  });
}

function popularDados() {
  const modalidadesArray = Object.keys(modalidades);
  const posicoesPorModalidade = {
    Basquete: ["Armador", "Ala", "Pivô"],
    Futsal: ["Goleiro", "Fixo", "Ala", "Pivô"],
    Volei: ["Levantador", "Oposto", "Central", "Ponteiro", "Líbero"],
  };

  modalidadesArray.forEach((modalidade) => {
    const ClasseTorneio = modalidades[modalidade];
    const torneio = new ClasseTorneio(`${modalidade} Stars`);

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

  console.log("Dados populados com sucesso!\n\n");
}

export function iniciarMenu() {
  promptMenu();
}

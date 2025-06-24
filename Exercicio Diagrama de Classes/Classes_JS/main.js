import { PessoaFisica } from "./PessoaFisica.js";
import { PessoaJuridica } from "./PessoaJuridica.js";

const pf = new PessoaFisica("123", "Rua A", "João");
const pj = new PessoaJuridica("456", "Av. B", "Empresa XYZ");

document.getElementById("btnPF").addEventListener("click", () => {
  document.getElementById("output").textContent = pf.exibirDados();
});

document.getElementById("btnPJ").addEventListener("click", () => {
  document.getElementById("output").textContent = pj.exibirDados();
});
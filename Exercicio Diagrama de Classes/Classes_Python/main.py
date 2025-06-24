from pessoa_fisica import PessoaFisica
from pessoa_juridica import PessoaJuridica

pf = PessoaFisica("123", "Rua A", "João da Silva")
pj = PessoaJuridica("456", "Av. B", "Empresa XYZ")

print("Pessoa Física:")
pf.exibir_dados()

print("\nPessoa Jurídica:")
pj.exibir_dados()
export default interface IOrderDTO {
  desconto: string;
  observacoes: string;
  observacaointerna: string;
  data: string;
  numero: string;
  numeroOrdemCompra: string;
  vendedor: string;
  valorfrete: string;
  outrasdespesas: string;
  totalprodutos: string;
  totalvenda: string;
  situacao: string;
  tipoIntegracao: string;
  cliente: {
    id: string;
    nome: string;
    cnpj: string;
    ie: string | null;
    rg: string;
    endereco: string;
    numero: string;
    complemento: string;
    cidade: string;
    bairro: string;
    cep: string;
    uf: string;
    email: string;
    celular: string;
    fone: string;
  };
}

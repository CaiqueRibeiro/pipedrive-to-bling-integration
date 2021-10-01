export interface IFilledItemsDTO {
  codigo: number;
  vlr_unit: number;
  qtde: number;
}

export interface IClientDTO {
  nome: string;
  endereco?: string;
  id?: number;
  email?: string;
  fone?: string;
}

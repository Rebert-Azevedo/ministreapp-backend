export class UpdateItemInventarioDto {
  nome?: string;
  descricao?: string;
  quantidade?: number;
  condicao?: 'bom' | 'reparo_necessario' | 'quebrado';
  localizacao?: string;
  dataAquisicao?: Date;
  valorAquisicao?: number;
}
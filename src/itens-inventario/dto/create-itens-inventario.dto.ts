export class CreateItemInventarioDto {
  nome: string;
  descricao?: string;
  quantidade?: number;
  condicao?: 'bom' | 'reparo_necessario' | 'quebrado';
  localizacao?: string;
  dataAquisicao?: Date;
  valorAquisicao?: number;
  ministerioId: number;
}
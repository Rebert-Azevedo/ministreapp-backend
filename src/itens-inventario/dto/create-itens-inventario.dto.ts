import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsEnum,
  IsPositive,
  IsDateString,
  IsInt,
} from 'class-validator';

export class CreateItemInventarioDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsInt({ message: 'A quantidade deve ser um número inteiro.' })
  @IsPositive({ message: 'A quantidade deve ser um número positivo.' })
  quantidade?: number;

  @IsOptional()
  @IsEnum(['bom', 'reparo_necessario', 'quebrado'])
  condicao?: 'bom' | 'reparo_necessario' | 'quebrado';

  @IsOptional()
  @IsString()
  localizacao?: string;

  @IsOptional()
  @IsDateString()
  dataAquisicao?: Date;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  valorAquisicao?: number;

  @IsNumber()
  @IsNotEmpty()
  ministerioId: number;
}
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class CreateDespesaDto {
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsOptional()
  @IsString()
  categoria?: string;

  @IsNumber()
  @IsPositive()
  valor: number;

  @IsNumber()
  @IsNotEmpty()
  ministerioId: number;

  @IsString()
  @IsNotEmpty()
  solicitanteUsuarioId: string;
}
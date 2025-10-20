import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateMinisterioDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsNumber()
  @IsNotEmpty()
  igrejaId: number;
}
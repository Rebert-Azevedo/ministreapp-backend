import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateIndisponibilidadeDto {
  @IsDateString()
  @IsNotEmpty()
  dataInicio: Date;

  @IsDateString()
  @IsNotEmpty()
  dataFim: Date;

  @IsOptional()
  @IsString()
  motivo?: string;
}
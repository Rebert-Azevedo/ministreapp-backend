import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFuncaoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsNumber()
  @IsNotEmpty()
  igrejaId: number;
}
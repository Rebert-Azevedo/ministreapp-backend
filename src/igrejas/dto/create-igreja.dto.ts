import { IsString, IsNotEmpty, IsOptional, MaxLength, IsEnum } from 'class-validator';

export class CreateIgrejaDto {
  @IsString({ message: 'O nome deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @MaxLength(255)
  nome: string;

  @IsOptional()
  @IsString()
  @MaxLength(18)
  cnpj?: string;

  @IsOptional()
  @IsString()
  endereco?: string;

  @IsOptional()
  @IsEnum(['ativo', 'inativo', 'teste'])
  status?: string;
}
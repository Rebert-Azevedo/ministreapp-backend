import { IsString, IsNotEmpty, IsEmail, IsNumber } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  id: string; 

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEmail({}, { message: 'Formato de e-mail inválido.' })
  @IsNotEmpty()
  email: string;

  @IsNumber({}, { message: 'O ID da igreja deve ser um número.' })
  @IsNotEmpty()
  igrejaId: number;
}
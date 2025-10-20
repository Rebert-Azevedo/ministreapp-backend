import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class AddMembroDto {
  @IsString()
  @IsNotEmpty()
  usuarioId: string;

  @IsEnum(['lider', 'membro'], { message: 'O perfil deve ser "lider" ou "membro".' })
  @IsNotEmpty()
  perfil: 'lider' | 'membro';
}
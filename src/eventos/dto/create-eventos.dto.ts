import { IsString, IsNotEmpty, IsOptional, IsDateString, IsNumber, IsEnum } from 'class-validator';

export class CreateEventoDto {
  @IsString()
  @IsNotEmpty({ message: 'O título não pode ser vazio.' })
  titulo: string;

  @IsDateString({}, { message: 'A data do evento deve estar em um formato de data válido.' })
  @IsNotEmpty({ message: 'A data do evento não pode ser vazia.' })
  data_evento: Date;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsEnum(['planejado', 'confirmado', 'cancelado'])
  status?: 'planejado' | 'confirmado' | 'cancelado';

  @IsNumber({}, { message: 'O ID do ministério deve ser um número.' })
  @IsNotEmpty({ message: 'O ID do ministério não pode ser vazio.' })
  ministerioId: number;
}
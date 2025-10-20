export class UpdateDespesaDto {
  status: 'aprovada' | 'rejeitada';
  aprovadorUsuarioId: string; // O ID do líder que está aprovando/rejeitando
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateDespesaDto } from './create-despesa.dto';

export class UpdateEventoDto extends PartialType(CreateDespesaDto) {}
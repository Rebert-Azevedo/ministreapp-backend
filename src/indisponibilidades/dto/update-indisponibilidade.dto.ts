import { PartialType } from '@nestjs/mapped-types';
import { CreateIndisponibilidadeDto } from './create-indisponibilidade.dto';

export class UpdateEventoDto extends PartialType(CreateIndisponibilidadeDto) {}
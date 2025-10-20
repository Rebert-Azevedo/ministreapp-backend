import { PartialType } from '@nestjs/mapped-types';
import { CreateIgrejaDto } from './create-igreja.dto';

export class UpdateEventoDto extends PartialType(CreateIgrejaDto) {}
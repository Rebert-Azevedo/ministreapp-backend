import { PartialType } from '@nestjs/swagger';
import { CreateIndisponibilidadeDto } from './create-indisponibilidade.dto';

export class UpdateIndisponibilidadeDto extends PartialType(CreateIndisponibilidadeDto) {}

import { PartialType } from '@nestjs/mapped-types';
import { CreateMinisterioDto } from './create-ministerio.dto';

export class UpdateMinisterioDto extends PartialType(CreateMinisterioDto) {}
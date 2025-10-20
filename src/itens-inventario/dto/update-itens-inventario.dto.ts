import { PartialType } from '@nestjs/mapped-types';
import { CreateItemInventarioDto } from './create-itens-inventario.dto';

export class UpdateItemInventarioDto extends PartialType(CreateItemInventarioDto) {}
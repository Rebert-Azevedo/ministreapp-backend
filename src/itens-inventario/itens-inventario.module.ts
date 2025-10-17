import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItensInventarioService } from './itens-inventario.service';
import { ItensInventarioController } from './itens-inventario.controller';
import { ItemInventario } from './entities/itens-inventario.entity';
import { Ministerio } from '../ministerios/entities/ministerio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ItemInventario, Ministerio])],
  controllers: [ItensInventarioController],
  providers: [ItensInventarioService],
})
export class ItensInventarioModule {}
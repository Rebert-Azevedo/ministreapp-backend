import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DespesasService } from './despesas.service';
import { DespesasController } from './despesas.controller';
import { Despesa } from './entities/despesa.entity';
import { Ministerio } from '../ministerios/entities/ministerio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Despesa, Ministerio])],
  controllers: [DespesasController],
  providers: [DespesasService],
})
export class DespesasModule {}
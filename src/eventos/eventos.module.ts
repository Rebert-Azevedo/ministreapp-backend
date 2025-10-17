import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventosService } from './eventos.service';
import { EventosController } from './eventos.controller';
import { Evento } from './entities/eventos.entity';
import { Ministerio } from '../ministerios/entities/ministerio.entity';
import { EscalaMembro } from './entities/escala-membro.entity';
import { RepertorioEvento } from './entities/repertorio-evento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Evento, Ministerio, EscalaMembro, RepertorioEvento])],
  controllers: [EventosController],
  providers: [EventosService],
})
export class EventosModule {}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FuncoesService } from './funcoes.service';
import { FuncoesController } from './funcoes.controller';
import { Funcao } from './entities/funcao.entity'; // CORRIGIDO
import { Igreja } from '../igrejas/entities/igreja.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Funcao, Igreja])], // CORRIGIDO
  controllers: [FuncoesController],
  providers: [FuncoesService],
})
export class FuncoesModule {}
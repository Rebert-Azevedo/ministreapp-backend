import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicasService } from './musicas.service';
import { MusicasController } from './musicas.controller';
import { Musica } from './entities/musica.entity';
import { Igreja } from '../igrejas/entities/igreja.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Musica, Igreja])],
  controllers: [MusicasController],
  providers: [MusicasService],
})
export class MusicasModule {}
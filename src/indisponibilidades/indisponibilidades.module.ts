import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndisponibilidadesService } from './indisponibilidades.service';
import { IndisponibilidadesController } from './indisponibilidades.controller';
import { Indisponibilidade } from './entities/indisponibilidade.entity';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [TypeOrmModule.forFeature([Indisponibilidade]), FirebaseModule],
  controllers: [IndisponibilidadesController],
  providers: [IndisponibilidadesService],
})
export class IndisponibilidadesModule {}
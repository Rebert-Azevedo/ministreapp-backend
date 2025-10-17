// src/ministerios/ministerios.module.ts (CORRIGIDO)

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MinisteriosService } from './ministerios.service';
import { MinisteriosController } from './ministerios.controller';
import { Ministerio } from './entities/ministerio.entity';
import { Igreja } from '../igrejas/entities/igreja.entity';
import { MembroMinisterio } from './entities/membro-ministerio.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { FirebaseModule } from '../firebase/firebase.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Ministerio, Igreja, Usuario, MembroMinisterio]),
    FirebaseModule, 
  ],
  controllers: [MinisteriosController],
  providers: [MinisteriosService],
})
export class MinisteriosModule {}
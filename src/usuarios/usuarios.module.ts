import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Usuario } from './entities/usuario.entity';
import { Igreja } from '../igrejas/entities/igreja.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Igreja])], 
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
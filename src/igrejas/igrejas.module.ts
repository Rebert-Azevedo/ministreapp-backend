import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IgrejasService } from './igrejas.service';
import { IgrejasController } from './igrejas.controller';
import { Igreja } from './entities/igreja.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Igreja])],
  controllers: [IgrejasController],
  providers: [IgrejasService],
})
export class IgrejasModule {}
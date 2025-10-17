import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { MinisteriosService } from './ministerios.service';
import { CreateMinisterioDto } from './dto/create-ministerio.dto';
import { UpdateMinisterioDto } from './dto/update-ministerio.dto';
import { AddMembroDto } from './dto/add-membro.dto';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum';

@Controller('ministerios')
@UseGuards(FirebaseAuthGuard)
export class MinisteriosController {
  constructor(private readonly ministeriosService: MinisteriosService) {}

  @Post()
  @UseGuards(RolesGuard) 
  @Roles(Role.Lider)
  create(@Body() createMinisterioDto: CreateMinisterioDto) {
    return this.ministeriosService.create(createMinisterioDto);
  }

  @Get('por-igreja/:igrejaId')
  findAllByIgreja(@Param('igrejaId', ParseIntPipe) igrejaId: number) {
    return this.ministeriosService.findAllByIgreja(igrejaId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ministeriosService.findOne(id);
  }
  
  @Get(':id/membros')
  listarMembros(@Param('id', ParseIntPipe) id: number) {
    return this.ministeriosService.listarMembros(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.Lider)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMinisterioDto: UpdateMinisterioDto,
  ) {
    return this.ministeriosService.update(id, updateMinisterioDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.Lider)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ministeriosService.remove(id);
  }

  @Post(':id/membros')
  @UseGuards(RolesGuard)
  @Roles(Role.Lider)
  adicionarMembro(
    @Param('id', ParseIntPipe) id: number,
    @Body() addMembroDto: AddMembroDto,
  ) {
    return this.ministeriosService.adicionarMembro(id, addMembroDto);
  }

  @Delete(':id/membros/:usuarioId')
  @UseGuards(RolesGuard)
  @Roles(Role.Lider)
  removerMembro(
    @Param('id', ParseIntPipe) id: number,
    @Param('usuarioId') usuarioId: string,
  ) {
    return this.ministeriosService.removerMembro(id, usuarioId);
  }
}
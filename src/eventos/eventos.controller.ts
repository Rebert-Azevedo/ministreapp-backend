import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { EventosService } from './eventos.service';
import { CreateEventoDto } from './dto/create-eventos.dto';
import { UpdateEventoDto } from './dto/update-eventos.dto';
import { AddMembroEscalaDto } from './dto/add-membro-escala.dto';
import { AddMusicaRepertorioDto } from './dto/add-musica-repertorio.dto';

@Controller('eventos')
export class EventosController {
  constructor(private readonly eventosService: EventosService) {}

  @Post()
  create(@Body() createEventoDto: CreateEventoDto) {
    return this.eventosService.create(createEventoDto);
  }

  @Get('por-ministerio/:ministerioId')
  findAllByMinisterio(@Param('ministerioId', ParseIntPipe) ministerioId: number) {
    return this.eventosService.findAllByMinisterio(ministerioId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.eventosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateEventoDto: UpdateEventoDto) {
    return this.eventosService.update(id, updateEventoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.eventosService.remove(id);
  }

  @Post(':id/escala')
  adicionarMembroEscala(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AddMembroEscalaDto,
  ) {
    return this.eventosService.adicionarMembroEscala(id, dto);
  }

  @Get(':id/escala')
  listarMembrosEscala(@Param('id', ParseIntPipe) id: number) {
    return this.eventosService.listarMembrosEscala(id);
  }

  @Delete('escala/:escalaMembroId')
  removerMembroEscala(@Param('escalaMembroId', ParseIntPipe) escalaMembroId: number) {
    return this.eventosService.removerMembroEscala(escalaMembroId);
  }

  @Post(':id/repertorio')
  adicionarMusicaRepertorio(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AddMusicaRepertorioDto,
  ) {
    return this.eventosService.adicionarMusicaRepertorio(id, dto);
  }

  @Get(':id/repertorio')
  listarRepertorio(@Param('id', ParseIntPipe) id: number) {
    return this.eventosService.listarRepertorio(id);
  }

  @Delete('repertorio/:repertorioId')
  removerMusicaRepertorio(@Param('repertorioId', ParseIntPipe) repertorioId: number) {
    return this.eventosService.removerMusicaRepertorio(repertorioId);
  }
}
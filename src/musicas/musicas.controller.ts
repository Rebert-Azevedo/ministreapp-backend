import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { MusicasService } from './musicas.service';
import { CreateMusicaDto } from './dto/create-musica.dto';
import { UpdateMusicaDto } from './dto/update-musica.dto';

@Controller('musicas')
export class MusicasController {
  constructor(private readonly musicasService: MusicasService) {}

  @Post()
  create(@Body() createMusicaDto: CreateMusicaDto) {
    return this.musicasService.create(createMusicaDto);
  }

  @Get('por-igreja/:igrejaId')
  findAllByIgreja(@Param('igrejaId', ParseIntPipe) igrejaId: number) {
    return this.musicasService.findAllByIgreja(igrejaId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.musicasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMusicaDto: UpdateMusicaDto) {
    return this.musicasService.update(id, updateMusicaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.musicasService.remove(id);
  }
}
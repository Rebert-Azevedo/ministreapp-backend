import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { FuncoesService } from './funcoes.service';
import { CreateFuncaoDto } from './dto/create-funcao.dto';
import { UpdateFuncaoDto } from './dto/update-funcao.dto';

@Controller('funcoes')
export class FuncoesController {
  constructor(private readonly funcoesService: FuncoesService) {}

  @Post()
  create(@Body() createFuncaoDto: CreateFuncaoDto) { // CORRIGIDO
    return this.funcoesService.create(createFuncaoDto);
  }

  @Get('por-igreja/:igrejaId')
  findAllByIgreja(@Param('igrejaId', ParseIntPipe) igrejaId: number) {
    return this.funcoesService.findAllByIgreja(igrejaId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.funcoesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateFuncaoDto: UpdateFuncaoDto) { // CORRIGIDO
    return this.funcoesService.update(id, updateFuncaoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.funcoesService.remove(id);
  }
}
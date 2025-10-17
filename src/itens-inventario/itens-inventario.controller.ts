import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ItensInventarioService } from './itens-inventario.service';
import { CreateItemInventarioDto } from './dto/create-itens-inventario.dto';
import { UpdateItemInventarioDto } from './dto/update-itens-inventario.dto';

@Controller('itens-inventario')
export class ItensInventarioController {
  constructor(private readonly itensInventarioService: ItensInventarioService) {}

  @Post()
  create(@Body() createDto: CreateItemInventarioDto) {
    return this.itensInventarioService.create(createDto);
  }

  @Get('por-ministerio/:ministerioId')
  findAllByMinisterio(@Param('ministerioId', ParseIntPipe) ministerioId: number) {
    return this.itensInventarioService.findAllByMinisterio(ministerioId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.itensInventarioService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateItemInventarioDto) {
    return this.itensInventarioService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.itensInventarioService.remove(id);
  }
}
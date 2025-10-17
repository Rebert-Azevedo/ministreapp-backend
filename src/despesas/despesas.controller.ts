import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { DespesasService } from './despesas.service';
import { CreateDespesaDto } from './dto/create-despesa.dto';
import { UpdateDespesaDto } from './dto/update-despesa.dto';

@Controller('despesas')
export class DespesasController {
  constructor(private readonly despesasService: DespesasService) {}

  @Post()
  create(@Body() createDto: CreateDespesaDto) {
    return this.despesasService.create(createDto);
  }

  @Get('por-ministerio/:ministerioId')
  findAllByMinisterio(@Param('ministerioId', ParseIntPipe) ministerioId: number) {
    return this.despesasService.findAllByMinisterio(ministerioId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.despesasService.findOne(id);
  }

  @Patch(':id/status')
  updateStatus(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateDespesaDto) {
    return this.despesasService.updateStatus(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.despesasService.remove(id);
  }
}
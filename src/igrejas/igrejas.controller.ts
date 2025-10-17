// src/igrejas/igrejas.controller.ts (COMPLETO)

import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { IgrejasService } from './igrejas.service';
import { CreateIgrejaDto } from './dto/create-igreja.dto';
import { UpdateIgrejaDto } from './dto/update-igreja.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth() // Indica que todas as rotas aqui precisam de um Bearer Token
@ApiTags('Igrejas') // Agrupa todos os endpoints de igreja sob a tag "Igrejas"
@Controller('igrejas')
export class IgrejasController {
  constructor(private readonly igrejasService: IgrejasService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova igreja' })
  @ApiResponse({ status: 201, description: 'A igreja foi criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos fornecidos.' })
  @ApiResponse({ status: 401, description: 'Não autorizado. Token inválido ou ausente.' })
  create(@Body() createIgrejaDto: CreateIgrejaDto) {
    return this.igrejasService.create(createIgrejaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as igrejas do sistema' })
  @ApiResponse({ status: 200, description: 'Lista de igrejas retornada com sucesso.' })
  findAll() {
    return this.igrejasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma igreja específica pelo ID' })
  @ApiResponse({ status: 200, description: 'Dados da igreja retornados com sucesso.' })
  @ApiResponse({ status: 404, description: 'Igreja não encontrada.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.igrejasService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza os dados de uma igreja' })
  @ApiResponse({ status: 200, description: 'Igreja atualizada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Igreja não encontrada.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateIgrejaDto: UpdateIgrejaDto) {
    return this.igrejasService.update(id, updateIgrejaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclui uma igreja' })
  @ApiResponse({ status: 200, description: 'Igreja excluída com sucesso.' })
  @ApiResponse({ status: 404, description: 'Igreja não encontrada.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.igrejasService.remove(id);
  }
}
// src/ministerios/ministerios.controller.ts (COMPLETO COM AUTENTICAÇÃO E AUTORIZAÇÃO)

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards, // Import para aplicar os "porteiros"
} from '@nestjs/common';
import { MinisteriosService } from './ministerios.service';
import { CreateMinisterioDto } from './dto/create-ministerio.dto';
import { UpdateMinisterioDto } from './dto/update-ministerio.dto';
import { AddMembroDto } from './dto/add-membro.dto';

// --- Imports de Segurança ---
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum';
// -------------------------

@Controller('ministerios')
// Aplica os dois "porteiros" a TODAS as rotas deste controlador.
// 1º: FirebaseAuthGuard verifica se o usuário está logado.
// 2º: RolesGuard verifica se o usuário tem o perfil necessário (se a rota exigir um).
@UseGuards(FirebaseAuthGuard, RolesGuard)
export class MinisteriosController {
  constructor(private readonly ministeriosService: MinisteriosService) {}

  // Apenas um Líder pode criar um novo ministério.
  @Post()
  @Roles(Role.Lider)
  create(@Body() createMinisterioDto: CreateMinisterioDto) {
    return this.ministeriosService.create(createMinisterioDto);
  }

  // Qualquer membro autenticado pode listar os ministérios de uma igreja.
  // Não precisa de @Roles() porque o RolesGuard permite o acesso se nenhuma role for exigida.
  @Get('por-igreja/:igrejaId')
  findAllByIgreja(@Param('igrejaId', ParseIntPipe) igrejaId: number) {
    return this.ministeriosService.findAllByIgreja(igrejaId);
  }

  // Qualquer membro autenticado pode ver os detalhes de um ministério.
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ministeriosService.findOne(id);
  }

  // Apenas um Líder pode editar os detalhes de um ministério.
  @Patch(':id')
  @Roles(Role.Lider)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMinisterioDto: UpdateMinisterioDto,
  ) {
    return this.ministeriosService.update(id, updateMinisterioDto);
  }

  // Apenas um Líder pode excluir um ministério.
  @Delete(':id')
  @Roles(Role.Lider)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ministeriosService.remove(id);
  }

  // --- Endpoints para Gerenciar Membros (com permissões) ---

  @Post(':id/membros')
  @Roles(Role.Lider)
  adicionarMembro(
    @Param('id', ParseIntPipe) id: number,
    @Body() addMembroDto: AddMembroDto,
  ) {
    return this.ministeriosService.adicionarMembro(id, addMembroDto);
  }

  @Get(':id/membros')
  listarMembros(@Param('id', ParseIntPipe) id: number) {
    return this.ministeriosService.listarMembros(id);
  }

  @Delete(':id/membros/:usuarioId')
  @Roles(Role.Lider)
  removerMembro(
    @Param('id', ParseIntPipe) id: number,
    @Param('usuarioId') usuarioId: string,
  ) {
    return this.ministeriosService.removerMembro(id, usuarioId);
  }
}
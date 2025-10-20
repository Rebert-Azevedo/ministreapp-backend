import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { IndisponibilidadesService } from './indisponibilidades.service';
import { CreateIndisponibilidadeDto } from './dto/create-indisponibilidade.dto';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';

interface AuthenticatedRequest extends Request {
  user: { uid: string };
}

@Controller('indisponibilidades')
@UseGuards(FirebaseAuthGuard) 
export class IndisponibilidadesController {
  constructor(private readonly indisponibilidadesService: IndisponibilidadesService) {}

  @Post()
  create(@Body() createDto: CreateIndisponibilidadeDto, @Req() request: AuthenticatedRequest) {
    const usuarioId = request.user.uid;
    return this.indisponibilidadesService.create(createDto, usuarioId);
  }

  @Get('/me')
  findAllForUser(@Req() request: AuthenticatedRequest) {
    const usuarioId = request.user.uid;
    return this.indisponibilidadesService.findAllForUser(usuarioId);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() request: AuthenticatedRequest) {
    const usuarioId = request.user.uid;
    return this.indisponibilidadesService.remove(id, usuarioId);
  }
}
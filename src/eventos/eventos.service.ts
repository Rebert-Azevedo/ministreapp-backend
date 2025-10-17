import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evento } from './entities/eventos.entity';
import { CreateEventoDto } from './dto/create-eventos.dto';
import { UpdateEventoDto } from './dto/update-eventos.dto';
import { Ministerio } from '../ministerios/entities/ministerio.entity';
import { ConflictException } from '@nestjs/common';
import { EscalaMembro } from './entities/escala-membro.entity';
import { RepertorioEvento } from './entities/repertorio-evento.entity';
import { AddMembroEscalaDto } from './dto/add-membro-escala.dto';
import { AddMusicaRepertorioDto } from './dto/add-musica-repertorio.dto';

@Injectable()
export class EventosService {
  constructor(
    @InjectRepository(Evento)
    private readonly eventoRepository: Repository<Evento>,
    @InjectRepository(Ministerio)
    private readonly ministerioRepository: Repository<Ministerio>,
    @InjectRepository(EscalaMembro)
    private readonly escalaMembroRepository: Repository<EscalaMembro>,
    @InjectRepository(RepertorioEvento)
    private readonly repertorioEventoRepository: Repository<RepertorioEvento>,
  ) {}

  async create(createEventoDto: CreateEventoDto): Promise<Evento> {
    const { ministerioId, ...restoDoDto } = createEventoDto;

    const ministerio = await this.ministerioRepository.findOne({ where: { id: ministerioId } });
    if (!ministerio) {
      throw new BadRequestException(`Ministério com ID #${ministerioId} não encontrado.`);
    }

    const novoEvento = this.eventoRepository.create({
      ...restoDoDto,
      ministerio: ministerio,
    });

    return this.eventoRepository.save(novoEvento);
  }

  async findAllByMinisterio(ministerioId: number): Promise<Evento[]> {
    return this.eventoRepository.find({
      where: { ministerioId },
      order: { data_evento: 'DESC' }, // Eventos mais recentes primeiro
    });
  }

  async findOne(id: number): Promise<Evento> {
    const evento = await this.eventoRepository.findOne({
      where: { id },
      relations: ['ministerio'], // Traz os dados do ministério junto
    });
    if (!evento) {
      throw new NotFoundException(`Evento com ID #${id} não encontrado.`);
    }
    return evento;
  }

  async update(id: number, updateEventoDto: UpdateEventoDto): Promise<Evento> {
    const evento = await this.eventoRepository.preload({
      id,
      ...updateEventoDto,
    });
    if (!evento) {
      throw new NotFoundException(`Evento com ID #${id} não encontrado.`);
    }
    return this.eventoRepository.save(evento);
  }

  async remove(id: number): Promise<{ message: string }> {
    const resultado = await this.eventoRepository.delete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException(`Evento com ID #${id} não encontrado.`);
    }
    return { message: `Evento removido com sucesso.` };
  }

  async adicionarMembroEscala(eventoId: number, dto: AddMembroEscalaDto): Promise<EscalaMembro> {
    await this.findOne(eventoId); // Garante que o evento existe
    
    const novaEntrada = this.escalaMembroRepository.create({
      eventoId,
      usuarioId: dto.usuarioId,
      funcaoId: dto.funcaoId,
    });

    try {
      return await this.escalaMembroRepository.save(novaEntrada);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Este usuário já está escalado para este evento.');
      }
      throw error;
    }
  }

  async listarMembrosEscala(eventoId: number): Promise<EscalaMembro[]> {
    return this.escalaMembroRepository.find({ where: { eventoId } });
  }

  async removerMembroEscala(escalaMembroId: number): Promise<{ message: string }> {
    const resultado = await this.escalaMembroRepository.delete(escalaMembroId);
    if (resultado.affected === 0) {
      throw new NotFoundException(`Entrada de escala com ID #${escalaMembroId} não encontrada.`);
    }
    return { message: 'Membro removido da escala com sucesso.' };
  }

  // --- MÉTODOS PARA GERENCIAR REPERTÓRIO ---

  async adicionarMusicaRepertorio(eventoId: number, dto: AddMusicaRepertorioDto): Promise<RepertorioEvento> {
    await this.findOne(eventoId); // Garante que o evento existe

    const novaMusica = this.repertorioEventoRepository.create({
      eventoId,
      ...dto,
    });
    
    try {
      return await this.repertorioEventoRepository.save(novaMusica);
    } catch (error) {
       if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Esta música já está neste repertório.');
      }
      throw error;
    }
  }

  async listarRepertorio(eventoId: number): Promise<RepertorioEvento[]> {
    return this.repertorioEventoRepository.find({
      where: { eventoId },
      order: { ordemMusica: 'ASC' },
    });
  }

  async removerMusicaRepertorio(repertorioId: number): Promise<{ message: string }> {
    const resultado = await this.repertorioEventoRepository.delete(repertorioId);
    if (resultado.affected === 0) {
      throw new NotFoundException(`Música do repertório com ID #${repertorioId} não encontrada.`);
    }
    return { message: 'Música removida do repertório com sucesso.' };
  }
}
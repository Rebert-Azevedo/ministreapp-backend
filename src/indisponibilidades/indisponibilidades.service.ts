import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Indisponibilidade } from './entities/indisponibilidade.entity';
import { CreateIndisponibilidadeDto } from './dto/create-indisponibilidade.dto';

@Injectable()
export class IndisponibilidadesService {
  constructor(
    @InjectRepository(Indisponibilidade)
    private readonly indisponibilidadeRepository: Repository<Indisponibilidade>,
  ) {}

  async create(createDto: CreateIndisponibilidadeDto, usuarioId: string): Promise<Indisponibilidade> {
    const novaIndisponibilidade = this.indisponibilidadeRepository.create({
      ...createDto,
      usuarioId,
    });
    return this.indisponibilidadeRepository.save(novaIndisponibilidade);
  }

  async findAllForUser(usuarioId: string): Promise<Indisponibilidade[]> {
    return this.indisponibilidadeRepository.find({
      where: { usuarioId },
      order: { dataInicio: 'ASC' },
    });
  }

  async remove(id: number, usuarioId: string): Promise<{ message: string }> {
    const indisponibilidade = await this.indisponibilidadeRepository.findOne({ where: { id } });

    if (!indisponibilidade) {
      throw new NotFoundException(`Registro de indisponibilidade com ID #${id} não encontrado.`);
    }

    if (indisponibilidade.usuarioId !== usuarioId) {
      throw new ForbiddenException('Você não tem permissão para remover este registro.');
    }

    await this.indisponibilidadeRepository.remove(indisponibilidade);
    return { message: 'Registro de indisponibilidade removido com sucesso.' };
  }
}
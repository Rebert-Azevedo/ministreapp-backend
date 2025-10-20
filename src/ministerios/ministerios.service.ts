import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ministerio } from './entities/ministerio.entity';
import { CreateMinisterioDto } from './dto/create-ministerio.dto';
import { UpdateMinisterioDto } from './dto/update-ministerio.dto';
import { Igreja } from '../igrejas/entities/igreja.entity';
import { MembroMinisterio } from './entities/membro-ministerio.entity';
import { AddMembroDto } from './dto/add-membro.dto';
import { Usuario } from '../usuarios/entities/usuario.entity';


@Injectable()
export class MinisteriosService {
  constructor(
    @InjectRepository(Ministerio)
    private readonly ministerioRepository: Repository<Ministerio>,
    @InjectRepository(Igreja)
    private readonly igrejaRepository: Repository<Igreja>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(MembroMinisterio)
    private readonly membroMinisterioRepository: Repository<MembroMinisterio>,
  ) {}

  async create(createMinisterioDto: CreateMinisterioDto): Promise<Ministerio> {
    const { igrejaId, ...restoDoDto } = createMinisterioDto;

    const igreja = await this.igrejaRepository.findOne({ where: { id: igrejaId } });
    if (!igreja) {
      throw new BadRequestException(`A Igreja com o ID #${igrejaId} não foi encontrada.`);
    }

    const novoMinisterio = this.ministerioRepository.create({
      ...restoDoDto,
      igreja: igreja,
    });

    return this.ministerioRepository.save(novoMinisterio);
  }

  async findAllByIgreja(igrejaId: number): Promise<Ministerio[]> {
    return this.ministerioRepository.find({
      where: { igrejaId: igrejaId },
    });
  }

  async findOne(id: number): Promise<Ministerio> {
    const ministerio = await this.ministerioRepository.findOne({
      where: { id },
      relations: ['igreja'],
    });

    if (!ministerio) {
      throw new NotFoundException(`Ministério com o ID #${id} não encontrado.`);
    }
    return ministerio;
  }

  async update(id: number, updateMinisterioDto: UpdateMinisterioDto): Promise<Ministerio> {
    const ministerio = await this.ministerioRepository.preload({
      id: id,
      ...updateMinisterioDto,
    });
    if (!ministerio) {
      throw new NotFoundException(`Ministério com o ID #${id} não encontrado.`);
    }
    return this.ministerioRepository.save(ministerio);
  }

  async remove(id: number): Promise<{ message: string }> {
    const ministerio = await this.findOne(id);
    await this.ministerioRepository.remove(ministerio);
    return { message: `Ministério ${ministerio.nome} (ID: ${id}) foi removido com sucesso.` };
  }

  // --- MÉTODOS PARA GERENCIAR MEMBROS ---

  async adicionarMembro(
    ministerioId: number,
    addMembroDto: AddMembroDto,
  ): Promise<MembroMinisterio> {
    const { usuarioId, perfil } = addMembroDto;

    const ministerio = await this.findOne(ministerioId);
    const usuario = await this.usuarioRepository.findOne({ where: { id: usuarioId } });
    if (!usuario) {
      throw new NotFoundException(`Usuário com ID #${usuarioId} não encontrado.`);
    }

    const jaEhMembro = await this.membroMinisterioRepository.findOne({
      where: { ministerioId, usuarioId },
    });
    if (jaEhMembro) {
      throw new BadRequestException(`Usuário já pertence a este ministério.`);
    }

    const novaAssociacao = this.membroMinisterioRepository.create({
      ministerioId,
      usuarioId,
      perfil,
    });

    return this.membroMinisterioRepository.save(novaAssociacao);
  }

  async listarMembros(ministerioId: number): Promise<MembroMinisterio[]> {
    return this.membroMinisterioRepository.find({
      where: { ministerioId },
      relations: ['usuario'],
    });
  }

  async removerMembro(
    ministerioId: number,
    usuarioId: string,
  ): Promise<{ message: string }> {
    const resultado = await this.membroMinisterioRepository.delete({
      ministerioId,
      usuarioId,
    });

    if (resultado.affected === 0) {
      throw new NotFoundException(`Membro com ID #${usuarioId} não encontrado neste ministério.`);
    }
    return { message: `Membro removido com sucesso do ministério.` };
  }

  async findMemberProfile(ministerioId: number, usuarioId: string): Promise<{ perfil: string } | null> {
    const membership = await this.membroMinisterioRepository.findOne({
      where: { ministerioId, usuarioId },
      select: ['perfil'],
    });
    return membership ? { perfil: membership.perfil } : null;
  }
}
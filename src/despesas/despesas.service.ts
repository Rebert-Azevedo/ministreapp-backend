import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Despesa } from './entities/despesa.entity';
import { CreateDespesaDto } from './dto/create-despesa.dto';
import { UpdateDespesaDto } from './dto/update-despesa.dto';
import { Ministerio } from '../ministerios/entities/ministerio.entity';

@Injectable()
export class DespesasService {
  constructor(
    @InjectRepository(Despesa)
    private readonly despesaRepository: Repository<Despesa>,
    @InjectRepository(Ministerio)
    private readonly ministerioRepository: Repository<Ministerio>,
  ) {}

  async create(createDto: CreateDespesaDto): Promise<Despesa> {
    const { ministerioId } = createDto;

    const ministerio = await this.ministerioRepository.findOne({ where: { id: ministerioId } });
    if (!ministerio) {
      throw new BadRequestException(`Ministério com ID #${ministerioId} não encontrado.`);
    }
    // Em um sistema real, verificaríamos se o solicitante existe também.

    const novaDespesa = this.despesaRepository.create({
      ...createDto,
      status: 'pendente', // Garante que comece como pendente
    });

    return this.despesaRepository.save(novaDespesa);
  }

  async findAllByMinisterio(ministerioId: number): Promise<Despesa[]> {
    return this.despesaRepository.find({
      where: { ministerioId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Despesa> {
    const despesa = await this.despesaRepository.findOne({ where: { id } });
    if (!despesa) {
      throw new NotFoundException(`Despesa com ID #${id} não encontrada.`);
    }
    return despesa;
  }

  async updateStatus(id: number, updateDto: UpdateDespesaDto): Promise<Despesa> {
    const despesa = await this.findOne(id); // Reutiliza a busca

    if (despesa.status !== 'pendente') {
        throw new BadRequestException(`Esta despesa já foi ${despesa.status} e não pode ser alterada.`);
    }

    despesa.status = updateDto.status;
    despesa.aprovadorUsuarioId = updateDto.aprovadorUsuarioId;

    return this.despesaRepository.save(despesa);
  }

  async remove(id: number): Promise<{ message: string }> {
    const despesa = await this.findOne(id);
    if(despesa.status !== 'pendente'){
        throw new BadRequestException('Apenas despesas pendentes podem ser removidas.');
    }
    await this.despesaRepository.delete(id);
    return { message: `Despesa removida com sucesso.` };
  }
}
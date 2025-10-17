import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Igreja } from './entities/igreja.entity';
import { CreateIgrejaDto } from './dto/create-igreja.dto';
import { UpdateIgrejaDto } from './dto/update-igreja.dto';

@Injectable()
export class IgrejasService {
  constructor(
    @InjectRepository(Igreja)
    private readonly igrejaRepository: Repository<Igreja>,
  ) {}

  async create(createIgrejaDto: CreateIgrejaDto): Promise<Igreja> {
    const igreja = this.igrejaRepository.create(createIgrejaDto);
    return this.igrejaRepository.save(igreja);
  }

  async findAll(): Promise<Igreja[]> {
    return this.igrejaRepository.find();
  }

  async findOne(id: number): Promise<Igreja> {
    const igreja = await this.igrejaRepository.findOne({ where: { id } });
    if (!igreja) {
      throw new NotFoundException(`Igreja com o ID #${id} não encontrada.`);
    }
    return igreja;
  }

  async update(id: number, updateIgrejaDto: UpdateIgrejaDto): Promise<Igreja> {
    const igreja = await this.igrejaRepository.preload({
      id: id,
      ...updateIgrejaDto,
    });
    if (!igreja) {
      throw new NotFoundException(`Igreja com o ID #${id} não encontrada.`);
    }
    return this.igrejaRepository.save(igreja);
  }

  async remove(id: number): Promise<{ message: string }> {
    const igreja = await this.findOne(id);
    await this.igrejaRepository.remove(igreja);
    return { message: `Igreja ${igreja.nome} (ID: ${id}) foi removida com sucesso.` };
  }
}
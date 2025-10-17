import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Funcao } from './entities/funcao.entity';
import { CreateFuncaoDto } from './dto/create-funcao.dto';
import { UpdateFuncaoDto } from './dto/update-funcao.dto';
import { Igreja } from '../igrejas/entities/igreja.entity';

@Injectable()
export class FuncoesService {
  constructor(
    @InjectRepository(Funcao) // CORRIGIDO
    private readonly funcaoRepository: Repository<Funcao>, // CORRIGIDO
    @InjectRepository(Igreja)
    private readonly igrejaRepository: Repository<Igreja>,
  ) {}

  async create(createFuncaoDto: CreateFuncaoDto): Promise<Funcao> { // CORRIGIDO
    const { igrejaId, nome } = createFuncaoDto;
    const igreja = await this.igrejaRepository.findOne({ where: { id: igrejaId } });
    if (!igreja) {
      throw new BadRequestException(`Igreja com ID #${igrejaId} não encontrada.`);
    }
    try {
      const novaFuncao = this.funcaoRepository.create({ nome, igreja });
      return await this.funcaoRepository.save(novaFuncao);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException(`A função "${nome}" já existe nesta igreja.`);
      }
      throw error;
    }
  }

  async findAllByIgreja(igrejaId: number): Promise<Funcao[]> { // CORRIGIDO
    return this.funcaoRepository.find({ where: { igrejaId }, order: { nome: 'ASC' } });
  }

  async findOne(id: number): Promise<Funcao> { // CORRIGIDO
    const funcao = await this.funcaoRepository.findOne({ where: { id } });
    if (!funcao) {
      throw new NotFoundException(`Função com ID #${id} não encontrada.`);
    }
    return funcao;
  }

  async update(id: number, updateFuncaoDto: UpdateFuncaoDto): Promise<Funcao> { // CORRIGIDO
    const funcao = await this.funcaoRepository.preload({ id, ...updateFuncaoDto });
    if (!funcao) {
      throw new NotFoundException(`Função com ID #${id} não encontrada.`);
    }
    return this.funcaoRepository.save(funcao);
  }

  async remove(id: number): Promise<{ message: string }> {
    const resultado = await this.funcaoRepository.delete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException(`Função com ID #${id} não encontrada.`);
    }
    return { message: `Função removida com sucesso.` };
  }
}
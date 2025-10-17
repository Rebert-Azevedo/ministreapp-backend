import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemInventario } from './entities/itens-inventario.entity';
import { CreateItemInventarioDto } from './dto/create-itens-inventario.dto';
import { UpdateItemInventarioDto } from './dto/update-itens-inventario.dto';
import { Ministerio } from '../ministerios/entities/ministerio.entity';

@Injectable()
export class ItensInventarioService {
  constructor(
    @InjectRepository(ItemInventario)
    private readonly itemRepository: Repository<ItemInventario>,
    @InjectRepository(Ministerio)
    private readonly ministerioRepository: Repository<Ministerio>,
  ) {}

  async create(createDto: CreateItemInventarioDto): Promise<ItemInventario> {
    const { ministerioId, ...restoDoDto } = createDto;

    const ministerio = await this.ministerioRepository.findOne({ where: { id: ministerioId } });
    if (!ministerio) {
      throw new BadRequestException(`Ministério com ID #${ministerioId} não encontrado.`);
    }

    const novoItem = this.itemRepository.create({
      ...restoDoDto,
      ministerio,
    });

    return this.itemRepository.save(novoItem);
  }

  async findAllByMinisterio(ministerioId: number): Promise<ItemInventario[]> {
    return this.itemRepository.find({
      where: { ministerioId },
      order: { nome: 'ASC' },
    });
  }

  async findOne(id: number): Promise<ItemInventario> {
    const item = await this.itemRepository.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Item de inventário com ID #${id} não encontrado.`);
    }
    return item;
  }

  async update(id: number, updateDto: UpdateItemInventarioDto): Promise<ItemInventario> {
    const item = await this.itemRepository.preload({ id, ...updateDto });
    if (!item) {
      throw new NotFoundException(`Item de inventário com ID #${id} não encontrado.`);
    }
    return this.itemRepository.save(item);
  }

  async remove(id: number): Promise<{ message: string }> {
    const resultado = await this.itemRepository.delete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException(`Item de inventário com ID #${id} não encontrado.`);
    }
    return { message: `Item de inventário removido com sucesso.` };
  }
}
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Musica } from './entities/musica.entity';
import { CreateMusicaDto } from './dto/create-musica.dto';
import { UpdateMusicaDto } from './dto/update-musica.dto';
import { Igreja } from '../igrejas/entities/igreja.entity';

@Injectable()
export class MusicasService {
  constructor(
    @InjectRepository(Musica)
    private readonly musicaRepository: Repository<Musica>,
    @InjectRepository(Igreja)
    private readonly igrejaRepository: Repository<Igreja>,
  ) {}

  async create(createMusicaDto: CreateMusicaDto): Promise<Musica> {
    const { igrejaId, ...restoDoDto } = createMusicaDto;

    const igreja = await this.igrejaRepository.findOne({ where: { id: igrejaId } });
    if (!igreja) {
      throw new BadRequestException(`Igreja com ID #${igrejaId} não encontrada.`);
    }

    const novaMusica = this.musicaRepository.create({
      ...restoDoDto,
      igreja,
    });

    return this.musicaRepository.save(novaMusica);
  }

  async findAllByIgreja(igrejaId: number): Promise<Musica[]> {
    return this.musicaRepository.find({
      where: { igrejaId },
      order: { titulo: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Musica> {
    const musica = await this.musicaRepository.findOne({ where: { id } });
    if (!musica) {
      throw new NotFoundException(`Música com ID #${id} não encontrada.`);
    }
    return musica;
  }

  async update(id: number, updateMusicaDto: UpdateMusicaDto): Promise<Musica> {
    const musica = await this.musicaRepository.preload({ id, ...updateMusicaDto });
    if (!musica) {
      throw new NotFoundException(`Música com ID #${id} não encontrada.`);
    }
    return this.musicaRepository.save(musica);
  }

  async remove(id: number): Promise<{ message: string }> {
    const resultado = await this.musicaRepository.delete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException(`Música com ID #${id} não encontrada.`);
    }
    return { message: `Música removida com sucesso.` };
  }
}
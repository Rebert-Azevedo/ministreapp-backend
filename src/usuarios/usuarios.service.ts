import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Igreja } from '../igrejas/entities/igreja.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    @InjectRepository(Igreja)
    private readonly igrejaRepository: Repository<Igreja>,
  ) { }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const { igrejaId, ...restoDoDto } = createUsuarioDto;

    const igreja = await this.igrejaRepository.findOne({ where: { id: igrejaId } });
    if (!igreja) {
      throw new BadRequestException(`A Igreja com o ID #${igrejaId} não foi encontrada.`);
    }

    const novoUsuario = this.usuarioRepository.create({
      ...restoDoDto,
      igreja: igreja,
    });

    return this.usuarioRepository.save(novoUsuario);
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find({ relations: ['igreja'] });
  }

  async findOne(id: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
      relations: ['igreja'],
    });
    if (!usuario) {
      throw new NotFoundException(`Usuário com o ID #${id} não encontrado.`);
    }
    return usuario;
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.usuarioRepository.preload({
      id: id,
      ...updateUsuarioDto,
    });
    if (!usuario) {
      throw new NotFoundException(`Usuário com o ID #${id} não encontrado.`);
    }
    return this.usuarioRepository.save(usuario);
  }

  async remove(id: string): Promise<{ message: string }> {
    const usuario = await this.findOne(id);
    await this.usuarioRepository.remove(usuario);
    return { message: `Usuário ${usuario.nome} (ID: ${id}) foi removido com sucesso.` };
  }
}
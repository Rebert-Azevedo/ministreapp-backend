import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Ministerio } from './ministerio.entity';

@Entity({ name: 'membros_ministerio' })
export class MembroMinisterio {
  @PrimaryColumn({ name: 'usuario_id' })
  usuarioId: string;

  @PrimaryColumn({ name: 'ministerio_id' })
  ministerioId: number;

  @Column({
    type: 'enum',
    enum: ['lider', 'membro'],
    default: 'membro',
  })
  perfil: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.participacoes)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @ManyToOne(() => Ministerio, (ministerio) => ministerio.membros, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ministerio_id' })
  ministerio: Ministerio;
}